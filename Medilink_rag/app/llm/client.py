"""
Claude client wrappers.

Stateless by design: conversation history is passed in per request (the gateway
owns history), rather than held in a module global as in the notebook.
"""

from __future__ import annotations

import logging

from app import config

logger = logging.getLogger("medilink.llm")

_client = None


def init_client():
    """Create the Anthropic client if a key is configured; else stay None."""
    global _client
    if not config.ANTHROPIC_API_KEY:
        logger.error("ANTHROPIC_API_KEY is not set — Claude calls will fail.")
        _client = None
        return None
    import anthropic

    _client = anthropic.Anthropic(
        api_key=config.ANTHROPIC_API_KEY,
        timeout=45.0,
        max_retries=1,
    )
    logger.info("Anthropic client initialized (model haiku=%s sonnet=%s)",
                config.HAIKU_MODEL, config.SONNET_MODEL)
    return _client


def get_client():
    return _client


def available() -> bool:
    return _client is not None


def _text(response) -> str:
    blocks = getattr(response, "content", None) or []
    return "\n".join(getattr(b, "text", "") for b in blocks if getattr(b, "text", "")).strip()


def _messages(prompt: str, history: list | None) -> list:
    messages: list = []
    if history:
        messages.extend(history[-config.MAX_HISTORY_TURNS * 2:])
    messages.append({"role": "user", "content": str(prompt)})
    return messages


def call_haiku(prompt: str, max_tokens: int = 200, system: str | None = None,
               history: list | None = None) -> str:
    if _client is None:
        raise RuntimeError("Claude API is not configured — ANTHROPIC_API_KEY missing or init_client() not called.")

    logger.debug("call_haiku | model=%s max_tokens=%d prompt_chars=%d",
                 config.HAIKU_MODEL, max_tokens, len(prompt))
    try:
        kwargs = {
            "model": config.HAIKU_MODEL,
            "max_tokens": int(max_tokens),
            "messages": _messages(prompt, history),
        }
        if system:
            kwargs["system"] = system

        response = _client.messages.create(**kwargs)
        result = _text(response)

        logger.debug("call_haiku | stop_reason=%s output_chars=%d result_preview=%r",
                     getattr(response, "stop_reason", "?"), len(result), result[:80])

        if not result:
            logger.warning("call_haiku | empty response — model=%s stop_reason=%s",
                           config.HAIKU_MODEL, getattr(response, "stop_reason", "?"))
        return result

    except Exception as exc:
        logger.error("call_haiku | FAILED model=%s error=%s: %s",
                     config.HAIKU_MODEL, type(exc).__name__, exc)
        raise


def call_sonnet(prompt: str, max_tokens: int = 1500, system: str | None = None,
                history: list | None = None) -> str:
    if _client is None:
        raise RuntimeError("Claude API is not configured — ANTHROPIC_API_KEY missing or init_client() not called.")

    logger.debug("call_sonnet | model=%s max_tokens=%d prompt_chars=%d",
                 config.SONNET_MODEL, max_tokens, len(prompt))
    try:
        kwargs = {
            "model": config.SONNET_MODEL,
            "max_tokens": int(max_tokens),
            "messages": _messages(prompt, history),
        }
        if system:
            kwargs["system"] = system

        response = _client.messages.create(**kwargs)
        result = _text(response)

        logger.debug("call_sonnet | stop_reason=%s output_chars=%d",
                     getattr(response, "stop_reason", "?"), len(result))

        if not result:
            logger.warning("call_sonnet | empty response — model=%s stop_reason=%s",
                           config.SONNET_MODEL, getattr(response, "stop_reason", "?"))
        return result

    except Exception as exc:
        logger.error("call_sonnet | FAILED model=%s error=%s: %s",
                     config.SONNET_MODEL, type(exc).__name__, exc)
        raise