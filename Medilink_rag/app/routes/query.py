"""RAG query + health endpoints."""

from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException

from app import config, deps
from app.llm import client
from app.rag.generation import advanced_rag_answer
from app.schemas import HealthResponse, QueryRequest, QueryResponse

logger = logging.getLogger("medilink.rag")
router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["meta"])
def health() -> HealthResponse:
    connected = deps.weaviate_client is not None
    exists = False
    count = None
    if connected:
        try:
            exists = deps.weaviate_client.collections.exists(config.COLLECTION_NAME)
            if exists:
                count = deps.collection().aggregate.over_all(total_count=True).total_count
        except Exception as exc:  # noqa: BLE001
            logger.warning("Weaviate health probe failed: %s", exc)
            connected = False
    return HealthResponse(
        status="ok",
        embedder_loaded=deps.embed_model is not None,
        weaviate_connected=connected,
        collection_exists=exists,
        collection_count=count,
        llm_configured=client.available(),
    )


@router.post(config.API_PREFIX + "/query", response_model=QueryResponse, tags=["rag"])
def query(req: QueryRequest) -> QueryResponse:
    if deps.embed_model is None or deps.weaviate_client is None:
        raise HTTPException(status_code=503, detail="RAG service not ready (models/Weaviate not loaded).")

    history = [{"role": t.role, "content": t.content} for t in req.history] or None
    try:
        result = advanced_rag_answer(
            question=req.question,
            intent=req.intent,
            patient_mode=req.patient_mode,
            history=history,
            retrieve_only=req.retrieve_only,
            k=req.top_k,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        logger.exception("RAG query failed")
        raise HTTPException(status_code=500, detail=f"RAG query failed: {exc}") from exc

    return QueryResponse(**result)
