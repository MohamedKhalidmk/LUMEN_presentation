"""
Answer generation.

advanced_rag_answer() runs the full query path:
  1. Retrieve all sources
  2. Haiku gate: is this context sufficient? (skipped if USE_GATE=false)
       pass  -> generate with Sonnet
       drop  -> return coverage gap response

OOS is NOT checked here — the gateway router already confirmed scope
before the RAG service was called.

Haiku/Gemini fallback: try Anthropic -> try Gemini Flash -> fail open (pass).
"""

from __future__ import annotations

import logging
import re

from app import config
from app.llm import client as llm_client
from app.llm.fallback import call_small_model
from app.llm.prompts import CITATION_SYSTEM, MEDICAL_DISCLAIMER
from app.rag import retrieval

logger = logging.getLogger("medilink.rag")

COVERAGE_GAP = (
    "I don't have sufficient information in my knowledge base to answer that "
    "specific question confidently. Please consult a qualified healthcare "
    "professional or check a trusted source such as NHS.uk or Cancer.gov."
)

_GATE_SYSTEM = (
    "You are a quality gate for a medical AI pipeline. "
    "Reply with one word only: pass or drop. Nothing else."
)

_GATE_PROMPT = """A biomedical retrieval pipeline returned these passages after full augmentation
(retrieval, reranking, MMR diversity, dedup, contextual compression). This is the
SAME context the answer model will receive.

Question: {question}

Augmented context ({n_docs} passages):
{context}

Is this context — taken together — sufficient and relevant to give a medically
accurate answer? Judge the whole set, not any single passage.
Reply: pass or drop"""

_GATE_CONTEXT_DOCS = 5
_GATE_DOC_CHARS = 800


def _gate(docs: list[dict], question: str) -> bool:
    """True = pass, False = drop. Gate sees the same top passages Sonnet will."""
    if not config.USE_GATE:
        logger.info("RAG gate: DISABLED — passing all docs")
        return bool(docs)

    if not docs:
        return False

    blocks = []
    for i, d in enumerate(docs[:_GATE_CONTEXT_DOCS], 1):
        pmid = d.get("pmid", "")
        tag = f"[PMID:{pmid}]" if pmid else f"[{d.get('source','?')}-{i}]"
        text = d.get("text", "")[:_GATE_DOC_CHARS]
        blocks.append(f"{tag} {d.get('title','')}\n{text}".strip())
    context = "\n\n---\n\n".join(blocks)

    prompt = _GATE_PROMPT.format(
        question=question or "medical question",
        n_docs=len(docs),
        context=context,
    )
    raw = call_small_model(
        prompt=prompt,
        system=_GATE_SYSTEM,
        max_tokens=5,
        fallback="pass",
        task_name="quality_gate",
    )
    result = raw.strip().lower().split()[0] != "drop" if raw.strip() else True
    logger.info("RAG gate: %s on %d docs (raw=%r)", "PASS" if result else "DROP", len(docs), raw)
    return result


def verify_citations(answer: str, docs: list[dict]) -> dict:
    valid_pmids = {d.get("pmid", "") for d in docs if d.get("pmid")}
    cited_pmids = set(re.findall(r"\[PMID:(\d+)\]", answer))
    fabricated = sorted(cited_pmids - valid_pmids)
    return {
        "cited_pmids": sorted(cited_pmids),
        "valid_pmids": sorted(valid_pmids),
        "fabricated_pmids": fabricated,
        "all_valid": len(fabricated) == 0,
        "num_citations": len(re.findall(r"\[(?:PMID|SOURCE):", answer)),
    }


def verify_answer_grounding(answer: str, docs: list[dict]) -> dict:
    if not config.USE_HALLUC_CHECK or not docs:
        return {"enabled": False, "verdict": "skipped", "unsupported": []}

    evidence = "\n\n".join(
        f"[PMID:{d.get('pmid','?')}] {d.get('text','')[:600]}" for d in docs
    )
    raw = call_small_model(
        prompt=f"""You are a fact-checking judge. Decide whether the ANSWER is fully supported
by the EVIDENCE.

EVIDENCE:
{evidence}

ANSWER:
{answer}

Reply on the first line with exactly GROUNDED or HALLUCINATED, then list any
unsupported claims (one per line, '-' prefix). If none, write none.""",
        system="You are a strict biomedical fact-checking judge.",
        max_tokens=300,
        fallback=None,
        task_name="grounding_check",
    )
    if not raw:
        return {"enabled": False, "verdict": "no-llm", "unsupported": []}

    lines = [ln.strip() for ln in raw.splitlines() if ln.strip()]
    verdict = "hallucinated" if lines and "HALLUC" in lines[0].upper() else "grounded"
    unsupported = [
        ln.lstrip("-• ").strip()
        for ln in lines[1:]
        if ln.lstrip("-• ").strip().lower() != "none"
    ]
    return {"enabled": True, "verdict": verdict, "unsupported": unsupported}


def _generate(question: str, docs: list[dict], history: list | None) -> dict:
    if not llm_client.available():
        raise RuntimeError("Claude API is not configured; cannot generate an answer.")

    prompt = retrieval.build_advanced_rag_prompt(question, docs)
    answer = llm_client.call_sonnet(
        prompt, max_tokens=1500, system=CITATION_SYSTEM, history=history
    )

    citations = verify_citations(answer, docs)
    grounding = verify_answer_grounding(answer, docs)

    if not answer.rstrip().endswith(MEDICAL_DISCLAIMER.strip()[-20:]):
        answer = answer.rstrip() + MEDICAL_DISCLAIMER

    return {"answer": answer, "citations": citations, "grounding": grounding}


def advanced_rag_answer(
    question: str,
    intent: str | None = None,
    patient_mode: bool = False,
    history: list | None = None,
    retrieve_only: bool = False,
    k: int | None = None,
) -> dict:
    """
    Full RAG path with Haiku quality gate.
    OOS checking is the gateway router's responsibility — not done here.
    patient_mode restricts retrieval to patient-friendly sources with escalation fallback.
    """
    def _retrieve(sources):
        return retrieval.advanced_retrieve(question, intent=intent, k=k, sources=sources)

    def _gap_response(meta):
        return {
            "answer": COVERAGE_GAP,
            "in_scope": True,
            "intent": meta["intent"],
            "evidence": [],
            "queries": meta["queries"],
            "citations": {
                "cited_pmids": [], "valid_pmids": [],
                "fabricated_pmids": [], "all_valid": True, "num_citations": 0,
            },
            "grounding": {"enabled": False, "verdict": "n/a", "unsupported": []},
        }

    if patient_mode:
        retrieved = _retrieve(config.PATIENT_SOURCES)
        docs = retrieved["docs"]
        if not _gate(docs, question):
            logger.info("Patient sources dropped; retrying with all sources.")
            retrieved = _retrieve(None)
            docs = retrieved["docs"]
            if not _gate(docs, question):
                return _gap_response(retrieved)
    else:
        retrieved = _retrieve(None)
        docs = retrieved["docs"]
        if not _gate(docs, question):
            return _gap_response(retrieved)

    evidence = [
        {
            "pmid": d.get("pmid", ""),
            "source": d.get("source", ""),
            "title": d.get("title", ""),
            "text": d.get("text", ""),
            "ce_score": d.get("ce_score"),
        }
        for d in docs
    ]

    if retrieve_only:
        return {
            "answer": None,
            "in_scope": True,
            "intent": retrieved["intent"],
            "evidence": evidence,
            "queries": retrieved["queries"],
            "citations": None,
            "grounding": None,
        }

    gen = _generate(question, docs, history)
    return {
        "answer": gen["answer"],
        "in_scope": True,
        "intent": retrieved["intent"],
        "evidence": evidence,
        "queries": retrieved["queries"],
        "citations": gen["citations"],
        "grounding": gen["grounding"],
    }