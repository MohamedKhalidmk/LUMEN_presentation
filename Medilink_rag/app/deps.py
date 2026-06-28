"""
Shared runtime singletons (loaded once at startup): the sentence-transformer
embedder, the Weaviate client/collection, and the lazily-loaded cross-encoder.
Functions in app.rag reference these via the module-level
accessors so the ported notebook logic stays close to the original.
"""

from __future__ import annotations

import logging

from app import config

logger = logging.getLogger("medilink.rag")

embed_model    = None   # SentenceTransformer
weaviate_client = None  # weaviate.WeaviateClient
cross_encoder  = None   # sentence_transformers.CrossEncoder (lazy)
_loaded_ce_name = None


def _device() -> str:
    if config.EMBED_DEVICE:
        logger.debug("device | using forced device=%s", config.EMBED_DEVICE)
        return config.EMBED_DEVICE
    try:
        import torch
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.debug("device | auto-detected device=%s", device)
        return device
    except Exception:
        logger.debug("device | torch not available — defaulting to cpu")
        return "cpu"


def init_embedder():
    global embed_model
    from sentence_transformers import SentenceTransformer

    device = _device()
    logger.info("embedder | loading model=%s device=%s", config.EMBEDDING_MODEL, device)
    try:
        embed_model = SentenceTransformer(config.EMBEDDING_MODEL, device=device)
        logger.info("embedder | loaded successfully: %s on %s",
                    config.EMBEDDING_MODEL, device)
    except Exception as exc:
        logger.error("embedder | FAILED to load %s (%s: %s)",
                     config.EMBEDDING_MODEL, type(exc).__name__, exc)
        raise
    return embed_model


def init_weaviate():
    """Connect to Weaviate (v4 client). Raises if unreachable."""
    global weaviate_client
    import weaviate

    logger.info("weaviate | connecting to %s:%d", config.WEAVIATE_HOST, config.WEAVIATE_PORT)
    try:
        weaviate_client = weaviate.connect_to_custom(
            http_host=config.WEAVIATE_HOST,
            http_port=config.WEAVIATE_PORT,
            http_secure=False,
            grpc_host=config.WEAVIATE_HOST,
            grpc_port=config.WEAVIATE_GRPC,
            grpc_secure=False,
            skip_init_checks=False,
        )
        logger.info("weaviate | connected successfully to %s:%d",
                    config.WEAVIATE_HOST, config.WEAVIATE_PORT)
    except Exception as exc:
        logger.error("weaviate | FAILED to connect to %s:%d (%s: %s)",
                     config.WEAVIATE_HOST, config.WEAVIATE_PORT, type(exc).__name__, exc)
        raise

    if not weaviate_client.collections.exists(config.COLLECTION_NAME):
        logger.warning("weaviate | collection '%s' does not exist — run scripts/ingest.py",
                       config.COLLECTION_NAME)
    else:
        count = weaviate_client.collections.get(config.COLLECTION_NAME)\
                    .aggregate.over_all(total_count=True).total_count
        logger.info("weaviate | collection '%s' exists with %d objects",
                    config.COLLECTION_NAME, count)

    return weaviate_client


def collection():
    return weaviate_client.collections.get(config.COLLECTION_NAME)


def ensure_cross_encoder(model_name: str | None = None):
    """Load or reuse the selected cross-encoder, with a MiniLM fallback."""
    global cross_encoder, _loaded_ce_name
    model_name = model_name or config.CROSS_ENCODER_MODEL

    if cross_encoder is not None and _loaded_ce_name == model_name:
        logger.debug("cross-encoder | already loaded: %s", model_name)
        return cross_encoder

    from sentence_transformers import CrossEncoder

    device = _device()
    logger.info("cross-encoder | loading model=%s device=%s", model_name, device)
    try:
        cross_encoder = CrossEncoder(model_name, device=device, max_length=512)
        _loaded_ce_name = model_name
        logger.info("cross-encoder | loaded successfully: %s on %s", model_name, device)
    except Exception as error:
        fallback = "cross-encoder/ms-marco-MiniLM-L-12-v2"
        if model_name == fallback:
            logger.error("cross-encoder | fallback also failed to load: %s", fallback)
            raise RuntimeError(f"Could not load cross-encoder '{model_name}'.") from error
        logger.warning("cross-encoder | could not load %s (%s: %s) — falling back to %s",
                       model_name, type(error).__name__, error, fallback)
        cross_encoder = CrossEncoder(fallback, device=device, max_length=512)
        _loaded_ce_name = fallback
        logger.info("cross-encoder | fallback loaded successfully: %s on %s", fallback, device)

    return cross_encoder


def close():
    global weaviate_client
    if weaviate_client is not None:
        logger.info("weaviate | closing connection")
        try:
            weaviate_client.close()
            logger.info("weaviate | connection closed")
        except Exception as exc:
            logger.warning("weaviate | error during close: %s", exc)
        weaviate_client = None