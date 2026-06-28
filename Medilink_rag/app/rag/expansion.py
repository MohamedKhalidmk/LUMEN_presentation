"""Intent-conditioned HyDE, multi-query expansion, and query decomposition."""

from __future__ import annotations

import re

from app import config, deps
from app.llm import client
from app.llm.prompts import HYDE_PROMPTS, MULTI_QUERY_SYSTEM
from app.rag.intent import classify_intent

_DISEASES = [
    "melanoma", "skin cancer", "multiple myeloma", "basal cell carcinoma",
    "squamous cell carcinoma", "myeloma", "BCC", "SCC",
]


def _extract_disease(question: str) -> str:
    q = question.lower()
    for d in _DISEASES:
        if d.lower() in q:
            return d
    return "cancer"


def generate_hypothetical_doc(question: str, intent: str | None = None) -> str:
    if intent is None:
        intent = classify_intent(question)
    disease = _extract_disease(question)

    if client.available():
        template = HYDE_PROMPTS.get(intent, HYDE_PROMPTS["general"])
        hypo = client.call_haiku(template.format(disease=disease, question=question), max_tokens=150)
        return hypo if len(hypo) > 30 else question

    topic = re.sub(r"\?$", "", question.lower()).strip()
    return (
        f"Clinical studies have investigated {topic}. "
        f"Evidence demonstrates specific {intent}-related findings for {disease}. "
        f"Treatment approaches and clinical outcomes are well-characterized."
    )


def hyde_query_vector(question: str, intent: str | None = None):
    return deps.embed_model.encode(generate_hypothetical_doc(question, intent))


def generate_multi_queries(question: str, n: int | None = None, intent: str | None = None) -> list:
    n = n or config.N_MULTI_QUERIES
    if intent is None:
        intent = classify_intent(question)

    if client.available():
        response = client.call_haiku(
            f"Intent: {intent}\nOriginal: {question}\n\nGenerate {n} queries:",
            max_tokens=200,
            system=MULTI_QUERY_SYSTEM.format(n=n),
        )
        queries = [q.strip() for q in response.strip().split("\n") if len(q.strip()) > 10]
        if queries:
            return [question] + queries[: n - 1]

    q = question.strip().rstrip("?")
    disease = _extract_disease(question)
    if intent == "symptoms":
        templates = [
            question,
            f"clinical manifestations and presentation of {disease}",
            f"warning signs {disease} patients experience",
            f"{disease} ABCDE criteria clinical features diagnosis",
        ]
    elif intent == "treatment":
        templates = [
            question,
            f"mechanism of action {q}",
            f"clinical trial outcomes {q}",
            f"combination therapy resistance {disease}",
        ]
    else:
        templates = [
            question,
            f"What is the mechanism of {q}?",
            f"Clinical outcomes related to {q}?",
            f"Recent advances in {q}?",
        ]
    return templates[: max(n, 1)]


def decompose_query(question: str) -> list:
    if client.available():
        response = client.call_haiku(
            f"""If this question contains multiple distinct medical sub-questions, split them.
If single question, return as-is.
Return questions one per line.

Question: {question}""",
            max_tokens=150,
        )
        parts = [
            p.strip().rstrip("?").strip() + "?"
            for p in response.strip().split("\n")
            if len(p.strip()) > 15
        ]
        if len(parts) > 1:
            return parts

    for pat in [r"(?i)\s+and\s+how\s+", r"(?i)\s+and\s+what\s+", r"(?i)\s+as\s+well\s+as\s+"]:
        parts = re.split(pat, question)
        if len(parts) > 1:
            return [p.strip().rstrip("?") + "?" for p in parts if len(p.strip()) > 15]
    return [question]
