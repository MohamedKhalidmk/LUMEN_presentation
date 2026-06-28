"""RAG service — FastAPI entrypoint."""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI

from app import deps
from app.llm import client
from app.routes import query_router

# LOG_LEVEL=DEBUG in .env to see full pipeline trace, INFO for production
_log_level = os.environ.get("LOG_LEVEL", "INFO").upper()

logging.basicConfig(
    level=_log_level,
    format="%(asctime)s %(levelname)s %(name)s | %(message)s",
)
logger = logging.getLogger("medilink.rag")
logger.info("Log level: %s", _log_level)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("=== MediLink RAG startup ===")

    logger.info("startup | initializing embedding model")
    deps.init_embedder()

    logger.info("startup | initializing Claude client")
    client.init_client()

    logger.info("startup | connecting to Weaviate")
    try:
        deps.init_weaviate()
    except Exception as exc:
        logger.warning("startup | Weaviate not reachable — retrieval will fail: %s", exc)

    logger.info("startup | warming cross-encoder")
    try:
        deps.ensure_cross_encoder()
    except Exception as exc:
        logger.warning("startup | cross-encoder warmup failed — reranking disabled: %s", exc)

    logger.info("=== RAG service ready ===")
    yield
    logger.info("=== RAG service shutting down ===")
    deps.close()


app = FastAPI(
    title="MediLink RAG Service",
    version="1.0.0",
    description="Biomedical retrieval-augmented generation over the MediLink corpus.",
    lifespan=lifespan,
)
app.include_router(query_router)