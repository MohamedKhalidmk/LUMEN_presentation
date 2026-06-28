"""
Retrieval core.

advanced_retrieve() orchestrates: intent -> (rewrite) -> (multi-query / HyDE) ->
hybrid search per query -> merge + dedup -> (MMR diversity) -> cross-encoder
rerank -> (compression) -> top-K. build_advanced_rag_prompt() formats the kept
passages into the evidence block the generator cites against.
"""

from __future__ import annotations

import numpy as np

from app import config, deps
from app.rag import expansion
from app.rag.compression import compress_context
from app.rag.intent import classify_intent, get_alpha_for_intent
from app.rag.rerank import cross_encoder_rerank
from app.rag.rewrite import rewrite_query


# ---------------------------------------------------------------------------
# Filters
# ---------------------------------------------------------------------------
def _source_filter(sources: list[str] | None):
    if not sources:
        return None
    from weaviate.classes.query import Filter

    return Filter.by_property("source").contains_any(list(sources))


# ---------------------------------------------------------------------------
# Hybrid search
# ---------------------------------------------------------------------------
def _doc_from_obj(obj) -> dict:
    props = obj.properties or {}
    vec = None
    if getattr(obj, "vector", None):
        vec = obj.vector.get("default") if isinstance(obj.vector, dict) else obj.vector
    return {
        "text": props.get("text", ""),
        "pmid": str(props.get("pmid", "") or ""),
        "source": props.get("source", ""),
        "title": props.get("title", ""),
        "section": props.get("section", ""),
        "score": float(getattr(obj.metadata, "score", 0.0) or 0.0),
        "uuid": str(obj.uuid),
        "_vector": vec,
    }


def hybrid_search(query_text: str, query_vec: np.ndarray, alpha: float, k: int,
                  sources: list[str] | None = None, want_vectors: bool = False) -> list[dict]:
    from weaviate.classes.query import MetadataQuery

    response = deps.collection().query.hybrid(
        query=query_text,
        vector=query_vec.tolist(),
        alpha=alpha,
        limit=k,
        filters=_source_filter(sources),
        return_metadata=MetadataQuery(score=True),
        include_vector=want_vectors,
    )
    return [_doc_from_obj(o) for o in response.objects]


def semantic_search(query: str, k: int | None = None, alpha: float | None = None,
                    sources: list[str] | None = None) -> list[dict]:
    """Single-query hybrid search convenience wrapper."""
    k = k or config.SEARCH_K
    alpha = config.SEARCH_ALPHA if alpha is None else alpha
    vec = deps.embed_model.encode(query)
    return hybrid_search(query, vec, alpha, k, sources)


# ---------------------------------------------------------------------------
# MMR + dedup
# ---------------------------------------------------------------------------
def _cos(a: np.ndarray, b: np.ndarray) -> float:
    denom = (np.linalg.norm(a) * np.linalg.norm(b)) or 1e-9
    return float(np.dot(a, b) / denom)


def mmr_select(query_vec: np.ndarray, candidates: list[dict], k: int,
               lambda_mult: float | None = None) -> list[dict]:
    """Maximal Marginal Relevance: trade query relevance against novelty."""
    lambda_mult = config.SEARCH_LAMBDA if lambda_mult is None else lambda_mult
    pool = [c for c in candidates if c.get("_vector") is not None]
    if not pool:
        return candidates[:k]

    selected: list[dict] = []
    remaining = pool[:]
    while remaining and len(selected) < k:
        best, best_score = None, -1e9
        for cand in remaining:
            cv = np.asarray(cand["_vector"], dtype=float)
            relevance = _cos(query_vec, cv)
            novelty = max(
                (_cos(cv, np.asarray(s["_vector"], dtype=float)) for s in selected),
                default=0.0,
            )
            score = lambda_mult * relevance - (1 - lambda_mult) * novelty
            if score > best_score:
                best, best_score = cand, score
        selected.append(best)
        remaining.remove(best)
    return selected


def dedup(docs: list[dict]) -> list[dict]:
    """Drop duplicate passages by uuid, then by (pmid, first 80 chars)."""
    seen_uuid, seen_text, out = set(), set(), []
    for d in docs:
        uid = d.get("uuid")
        sig = (d.get("pmid", ""), d.get("text", "")[:80])
        if uid in seen_uuid or sig in seen_text:
            continue
        seen_uuid.add(uid)
        seen_text.add(sig)
        out.append(d)
    return out


# ---------------------------------------------------------------------------
# advanced_retrieve
# ---------------------------------------------------------------------------
def advanced_retrieve(question: str, intent: str | None = None, k: int | None = None,
                      sources: list[str] | None = None, verbose: bool = False) -> dict:
    """
    Returns {"docs": [...], "intent": str, "alpha": float, "queries": [...],
             "n_candidates": int}.
    `sources` constrains the source filter (e.g. patient sources for patient mode).
    """
    intent = intent or classify_intent(question)
    alpha = get_alpha_for_intent(intent)
    k = k or config.SEARCH_K

    # Query set: rewrite + (multi-query expansion).
    primary = rewrite_query(question, intent=intent)
    queries = [primary]
    if config.USE_MULTI_QUERY:
        extra = expansion.generate_multi_queries(question, intent=intent)
        for q in extra:
            if q not in queries:
                queries.append(q)

    fetch_k = max(k * config.FETCH_K_MULT, k)
    per_query_k = max(fetch_k // max(len(queries), 1), k)

    # HyDE vector for the primary query (optional).
    candidates: list[dict] = []
    for i, q in enumerate(queries):
        if config.USE_HYDE and i == 0:
            q_vec = expansion.hyde_query_vector(question, intent)
        else:
            q_vec = deps.embed_model.encode(q)
        candidates.extend(
            hybrid_search(q, q_vec, alpha, per_query_k, sources=sources, want_vectors=config.SEARCH_MMR)
        )

    candidates = dedup(candidates)
    n_candidates = len(candidates)

    # Diversity (MMR) before reranking.
    if config.SEARCH_MMR and candidates:
        q_vec = deps.embed_model.encode(primary)
        candidates = mmr_select(q_vec, candidates, k=min(fetch_k, len(candidates)))

    # Cross-encoder rerank against the ORIGINAL question (intent-faithful).
    if config.USE_CROSS_ENCODER:
        candidates = cross_encoder_rerank(question, candidates, top_k=k)
    else:
        candidates = candidates[:k]

    # Contextual compression on the final set.
    docs = compress_context(question, candidates)

    return {
        "docs": docs,
        "intent": intent,
        "alpha": alpha,
        "queries": queries,
        "n_candidates": n_candidates,
    }


# ---------------------------------------------------------------------------
# Prompt building
# ---------------------------------------------------------------------------
def build_advanced_rag_prompt(question: str, docs: list[dict]) -> str:
    if not docs:
        return (
            f"Question: {question}\n\n"
            "No relevant evidence was retrieved. State that the available evidence "
            "is insufficient and recommend professional consultation."
        )

    blocks = []
    for i, d in enumerate(docs, 1):
        pmid = d.get("pmid", "")
        tag = f"[PMID:{pmid}]" if pmid else f"[SOURCE:{d.get('source','?')}-{i}]"
        title = d.get("title", "")
        header = f"{tag} {title}".strip()
        blocks.append(f"{header}\n{d.get('text','').strip()}")

    evidence = "\n\n---\n\n".join(blocks)
    return (
        f"Retrieved evidence:\n\n{evidence}\n\n"
        f"---\n\nQuestion: {question}\n\n"
        "Answer using ONLY the evidence above. Cite each medical claim with its "
        "exact identifier (prefer [PMID:...]). If the evidence is insufficient, say so."
    )
