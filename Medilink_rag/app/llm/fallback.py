# app/llm/fallback.py

from __future__ import annotations

import logging
from typing import Literal

from app import config
from app.llm import client

logger = logging.getLogger("medilink.rag")


def call_small_model(
    prompt: str,
    system: str = "",
    max_tokens: int = 200,
    fallback: str | None = None,
    task_name: str = "small_model_call",
) -> str | None:
    """
    Shared small-model fallback chain.

    Order:
        Claude Haiku -> Gemini -> fallback

    Use this for:
        intent classification
        query rewriting
        quality gates
        grounding checks
        lightweight judges
    """

    # 1. Try Claude Haiku.
    if client.available():
        try:
            return client.call_haiku(
                prompt,
                system=system,
                max_tokens=max_tokens,
            )
        except Exception as exc:  # noqa: BLE001
            logger.warning("%s: Haiku failed, trying Gemini: %s", task_name, exc)

    # 2. Try Gemini.
    api_key = getattr(config, "GEMINI_API_KEY", None)
    model_name = getattr(config, "GEMINI_MODEL", "gemini-2.5-flash")

    if api_key:
        try:
            from google import genai

            gemini_client = genai.Client(api_key=api_key)

            contents = f"{system}\n\n{prompt}" if system else prompt

            response = gemini_client.models.generate_content(
                model=model_name,
                contents=contents,
                config={
                    "max_output_tokens": max_tokens,
                },
            )

            text = getattr(response, "text", "") or ""
            if text.strip():
                return text.strip()

        except Exception as exc:  # noqa: BLE001
            logger.warning("%s: Gemini failed: %s", task_name, exc)

    # 3. Final fallback.
    logger.warning("%s: all small-model providers failed.", task_name)
    return fallback