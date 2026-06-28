"""Request/response schemas for the RAG service."""

from __future__ import annotations

from pydantic import BaseModel, Field


class Turn(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class QueryRequest(BaseModel):
    question: str = Field(..., min_length=1)
    intent: str | None = Field(default=None, description="Optional intent hint; the service classifies if omitted.")
    patient_mode: bool = Field(default=False, description="Restrict to patient-friendly sources.")
    retrieve_only: bool = Field(default=False, description="Skip generation; return evidence only.")
    history: list[Turn] = Field(default_factory=list, description="Prior conversation turns.")
    top_k: int | None = Field(default=None, description="Override number of passages.")


class Evidence(BaseModel):
    pmid: str = ""
    source: str = ""
    title: str = ""
    text: str = ""
    ce_score: float | None = None


class CitationReport(BaseModel):
    cited_pmids: list[str] = []
    valid_pmids: list[str] = []
    fabricated_pmids: list[str] = []
    all_valid: bool = True
    num_citations: int = 0


class GroundingReport(BaseModel):
    enabled: bool = False
    verdict: str = "skipped"
    unsupported: list[str] = []


class QueryResponse(BaseModel):
    answer: str | None
    in_scope: bool
    intent: str
    evidence: list[Evidence] = []
    queries: list[str] = []
    citations: CitationReport | None = None
    grounding: GroundingReport | None = None
    scope: dict | None = None


class HealthResponse(BaseModel):
    status: str
    embedder_loaded: bool
    weaviate_connected: bool
    collection_exists: bool
    collection_count: int | None = None
    llm_configured: bool
