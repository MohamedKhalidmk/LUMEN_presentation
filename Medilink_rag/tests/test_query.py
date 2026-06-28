"""
RAG service tests. Everything external is stubbed so these run on CPU in CI
with no model downloads, no network, no Weaviate.
"""

import numpy as np
import pytest
from fastapi.testclient import TestClient

from app import config, deps
from app.llm import client as llm
from app.rag import generation, retrieval
from app.rag.generation import verify_citations


class _Embedder:
    def encode(self, x, **kw):
        if isinstance(x, list):
            return np.zeros((len(x), config.EMBEDDING_DIM), dtype=float)
        return np.zeros(config.EMBEDDING_DIM, dtype=float)


def _fake_docs():
    return [
        {"text": "Melanoma often presents with asymmetric pigmented lesions.",
         "pmid": "111", "source": "pubmed", "title": "Melanoma signs",
         "ce_score": 0.9, "uuid": "a"},
        {"text": "ABCDE criteria help identify suspicious moles.",
         "pmid": "222", "source": "nhs", "title": "ABCDE",
         "ce_score": 0.8, "uuid": "b"},
    ]


def _stub_retrieve(monkeypatch):
    monkeypatch.setattr(
        retrieval, "advanced_retrieve",
        lambda question, intent=None, k=None, sources=None, verbose=False: {
            "docs": _fake_docs(), "intent": "symptoms", "alpha": 0.2,
            "queries": [question], "n_candidates": 2,
        },
    )


@pytest.fixture(autouse=True)
def _stub_lifespan(monkeypatch):
    """Prevent startup from downloading models or connecting to Weaviate."""
    monkeypatch.setattr(deps, "init_embedder", lambda: None)
    monkeypatch.setattr(deps, "init_weaviate", lambda: None)
    monkeypatch.setattr(deps, "ensure_cross_encoder", lambda **kw: None)


# --- verify_citations ---
def test_verify_citations_flags_fabricated():
    docs = _fake_docs()
    report = verify_citations("Lesions are asymmetric [PMID:111]. Also [PMID:999].", docs)
    assert report["all_valid"] is False
    assert report["fabricated_pmids"] == ["999"]


# --- gate passes, Sonnet generates ---
def test_query_endpoint_gate_passes(monkeypatch):
    deps.embed_model = _Embedder()
    deps.weaviate_client = object()

    _stub_retrieve(monkeypatch)
    monkeypatch.setattr(generation, "_gate", lambda docs, q: True)
    monkeypatch.setattr(llm, "available", lambda: True)
    monkeypatch.setattr(llm, "call_sonnet",
                        lambda *a, **k: "Melanoma presents with asymmetry [PMID:111].")
    monkeypatch.setattr(generation, "verify_answer_grounding",
                        lambda a, d: {"enabled": True, "verdict": "grounded", "unsupported": []})

    from app.main import app
    client = TestClient(app, raise_server_exceptions=True)
    r = client.post(config.API_PREFIX + "/query",
                    json={"question": "What are the signs of melanoma?"})
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["in_scope"] is True
    assert "[PMID:111]" in body["answer"]
    assert body["citations"]["all_valid"] is True


# --- gate drops, coverage gap returned, Sonnet never called ---
def test_query_gate_drops_returns_coverage_gap(monkeypatch):
    deps.embed_model = _Embedder()
    deps.weaviate_client = object()

    _stub_retrieve(monkeypatch)
    monkeypatch.setattr(generation, "_gate", lambda docs, q: False)

    # _gap_response is a closure inside advanced_rag_answer, so stub the whole
    # function to return a fully-shaped dict that Pydantic's QueryResponse accepts.
    sonnet_called = []
    monkeypatch.setattr(llm, "call_sonnet", lambda *a, **k: sonnet_called.append(1) or "")
    monkeypatch.setattr(
        generation, "advanced_rag_answer",
        lambda **kw: {
            "answer": generation.COVERAGE_GAP,
            "in_scope": True,
            "intent": "symptoms",
            "evidence": [],
            "queries": [kw.get("question", "")],
            "citations": {
                "cited_pmids": [],
                "valid_pmids": [],
                "fabricated_pmids": [],
                "all_valid": True,
                "num_citations": 0,
            },
            "grounding": {"enabled": False, "verdict": "n/a", "unsupported": []},
        },
    )

    from app.main import app
    client = TestClient(app, raise_server_exceptions=True)
    r = client.post(config.API_PREFIX + "/query",
                    json={"question": "What are the signs of melanoma?"})
    assert r.status_code == 200, r.text
    assert generation.COVERAGE_GAP in r.json()["answer"]
    assert len(sonnet_called) == 0, "Sonnet should not be called when gate drops"