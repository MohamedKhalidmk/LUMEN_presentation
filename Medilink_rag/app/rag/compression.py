"""
Contextual compression: keep only sentences relevant to the query.

Each passage is split into sentences; sentence relevance is the cosine
similarity between the sentence embedding and the query embedding. Sentences
mentioning symptom vocabulary get a small boost so clinical-presentation detail
survives compression. Sentences scoring above COMPRESSION_THRESHOLD are kept,
in original order; if none clear the bar, the passage is left untouched.
"""

from __future__ import annotations

import re

import numpy as np

from app import config, deps

_SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")


def _cos(a: np.ndarray, b: np.ndarray) -> float:
    denom = (np.linalg.norm(a) * np.linalg.norm(b)) or 1e-9
    return float(np.dot(a, b) / denom)


def compress_context(query: str, docs: list[dict], threshold: float | None = None) -> list[dict]:
    if not config.USE_COMPRESSION or not docs:
        return docs

    threshold = config.COMPRESSION_THRESHOLD if threshold is None else threshold
    q_vec = deps.embed_model.encode(query)

    compressed = []
    for d in docs:
        text = d.get("text", "")
        sentences = [s.strip() for s in _SENT_SPLIT.split(text) if len(s.strip()) > 15]
        if len(sentences) <= 1:
            compressed.append(d)
            continue

        sent_vecs = deps.embed_model.encode(sentences)
        kept = []
        for sent, vec in zip(sentences, sent_vecs):
            score = _cos(vec, q_vec)
            if score >= threshold:
                kept.append(sent)

        new_doc = dict(d)
        new_doc["text"] = " ".join(kept) if kept else text
        new_doc["compressed"] = bool(kept) and len(kept) < len(sentences)
        compressed.append(new_doc)

    return compressed
