"""Intent-preserving query rewriter. Expands intent vocabulary; never strips it."""

from __future__ import annotations

import logging
import re

from app import config
from app.llm.fallback import call_small_model
from app.llm.prompts import REWRITER_SYSTEM
from app.rag.intent import classify_intent

logger = logging.getLogger("medilink.rag")


def rewrite_query(question: str, verbose: bool = False, intent: str | None = None) -> str:
    if not config.USE_QUERY_REWRITER:
        logger.debug("rewrite | skipped (USE_QUERY_REWRITER=false)")
        return question

    if intent is None:
        intent = classify_intent(question)

    # Symptom queries: skip rewriting — BM25-heavy alpha already preserves patient language.
    if intent == "symptoms":
        logger.debug("rewrite | skipped for intent=symptoms — preserving original query")
        return question

    logger.debug("rewrite | rewriting question=%r intent=%s", question[:80], intent)

    result = call_small_model(
        prompt=f"Intent detected: {intent}\n\nRewrite for PubMed: {question}",
        system=REWRITER_SYSTEM,
        max_tokens=60,
        task_name="query_rewrite",
        fallback=None,
    )

    if result:
        # Strip any preamble the model added e.g. "Rewritten: ..."
        cleaned = re.sub(r"^(rewritten:?|query:?|result:?)\s*", "", result,
                         flags=re.IGNORECASE).strip()
        if 5 <= len(cleaned) <= 200:
            logger.debug("rewrite | original=%r → rewritten=%r", question[:60], cleaned[:60])
            return cleaned
        logger.warning("rewrite | result length out of range (len=%d) — using original question",
                       len(cleaned))

    logger.warning("rewrite | all providers failed — using original question")
    return question