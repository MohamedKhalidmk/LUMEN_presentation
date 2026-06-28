"""
Configuration for the RAG service.

Defaults match the validated notebook configuration. Every value is
env-overridable. .env only needs secrets + anything you want to override.
"""

from __future__ import annotations

import os


def _s(key: str, default: str) -> str:
    return os.environ.get(key, default).strip()


def _i(key: str, default: int) -> int:
    return int(os.environ.get(key, str(default)))


def _f(key: str, default: float) -> float:
    return float(os.environ.get(key, str(default)))


def _b(key: str, default: bool) -> bool:
    return os.environ.get(key, str(default)).strip().lower() in ("1", "true", "yes", "on")


# --- service ---
RAG_HOST   = _s("RAG_HOST", "0.0.0.0")
RAG_PORT   = _i("RAG_PORT", 8002)
API_PREFIX = "/api/v1"

# --- secrets / external ---
ANTHROPIC_API_KEY = _s("ANTHROPIC_API_KEY", "")
GEMINI_API_KEY    = _s("GEMINI_API_KEY", "")
GEMINI_MODEL      = _s("GEMINI_MODEL", "gemini-2.0-flash")
HF_TOKEN          = _s("HF_TOKEN", "")

# --- models ---
EMBEDDING_MODEL     = _s("EMBEDDING_MODEL", "pritamdeka/S-PubMedBert-MS-MARCO")
EMBEDDING_DIM       = _i("EMBEDDING_DIM", 768)
HAIKU_MODEL         = _s("HAIKU_MODEL", "claude-haiku-4-5-20251001")
SONNET_MODEL        = _s("SONNET_MODEL", "claude-sonnet-4-6")
CROSS_ENCODER_MODEL = _s("CROSS_ENCODER_MODEL", "ncbi/MedCPT-Cross-Encoder")
EMBED_DEVICE        = _s("EMBED_DEVICE", "")

# --- retrieval values ---
SEARCH_ALPHA   = _f("SEARCH_ALPHA", 0.60)
SEARCH_K       = _i("SEARCH_K", 4)
FETCH_K_MULT   = _i("FETCH_K_MULT", 20)
MMR_LAMBDA     = _f("MMR_LAMBDA", 0.40)
CE_SOFT_CUTOFF = _f("CE_SOFT_CUTOFF", 0.01)

# per-intent hybrid alpha (0 = BM25 only, 1 = dense only)
INTENT_ALPHA = {
    "symptoms":   _f("ALPHA_SYMPTOMS",  0.20),
    "treatment":  _f("ALPHA_TREATMENT", 0.70),
    "mechanism":  _f("ALPHA_MECHANISM", 0.75),
    "diagnosis":  _f("ALPHA_DIAGNOSIS", 0.45),
    "prognosis":  _f("ALPHA_PROGNOSIS", 0.65),
    "medication": _f("ALPHA_MEDICATION", 0.50),
    "general":    _f("ALPHA_GENERAL",   0.60),
}

PATIENT_SOURCES       = _s("PATIENT_SOURCES", "nhs,cancer_gov,medlineplus,pdf").split(",")
COMPRESSION_THRESHOLD = _f("COMPRESSION_THRESHOLD", 0.25)

# --- pipeline toggles ---
USE_QUERY_REWRITER = _b("USE_QUERY_REWRITER", True)
USE_HYDE           = _b("USE_HYDE", True)
USE_MULTI_QUERY    = _b("USE_MULTI_QUERY", True)
USE_DEDUP          = _b("USE_DEDUP", True)
USE_MMR            = _b("USE_MMR", True)
USE_CROSS_ENCODER  = _b("USE_CROSS_ENCODER", True)
USE_COMPRESSION    = _b("USE_COMPRESSION", True)
USE_GATE           = _b("USE_GATE", True)
USE_HALLUC_CHECK   = _b("USE_HALLUC_CHECK", False)  # enable after pipeline verified

N_MULTI_QUERIES   = _i("N_MULTI_QUERIES", 2)

# --- Weaviate ---
WEAVIATE_HOST   = _s("WEAVIATE_HOST", "localhost")
WEAVIATE_PORT   = _i("WEAVIATE_PORT", 8080)
WEAVIATE_GRPC   = _i("WEAVIATE_GRPC", 50051)
COLLECTION_NAME = _s("COLLECTION_NAME", "PubMedChunksSPubMedBert")
BM25_B          = _f("BM25_B", 0.85)
BM25_K1         = _f("BM25_K1", 1.5)

# --- conversation ---
MAX_HISTORY_TURNS = _i("MAX_HISTORY_TURNS", 10)

# --- aliases for retrieval.py compatibility ---
SEARCH_MMR    = USE_MMR
SEARCH_LAMBDA = MMR_LAMBDA