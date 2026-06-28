"""MedCPT cross-encoder reranking."""

from __future__ import annotations

import math
import re

from app import config, deps


def _sigmoid(x: float) -> float:
    try:
        return 1.0 / (1.0 + math.exp(-x))
    except OverflowError:
        return 0.0 if x < 0 else 1.0


def cross_encoder_rerank(query: str, docs: list[dict], top_k: int | None = None) -> list[dict]:
    """
    Re-score (query, passage) pairs with the cross-encoder. Scores are
    sigmoid-normalized to [0,1] and attached as `ce_score`; docs are returned
    sorted by it. Falls back to the input order if the model is unavailable.
    """
    if not docs:
        return docs
    try:
        model = deps.ensure_cross_encoder()
    except Exception:
        return docs[: top_k or len(docs)]

    pairs = [(query, d.get("text", "")) for d in docs]
    raw = model.predict(pairs, convert_to_numpy=True, show_progress_bar=False)

    out = []
    for d, score in zip(docs, raw):
        d = dict(d)
        d["ce_score"] = _sigmoid(float(score))
        out.append(d)

    out.sort(key=lambda d: d["ce_score"], reverse=True)
    if top_k is not None:
      if len(out) > top_k:
        cutoff_score = out[top_k - 1]["ce_score"]
        out = [d for d in out if d["ce_score"] >= cutoff_score - config.CE_SOFT_CUTOFF]
      out = out[: max(top_k, 0)] if top_k else out
    return out
