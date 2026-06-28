"""Intent classification with shared Haiku → Gemini → general fallback."""

from __future__ import annotations

import re

from app import config
from app.llm.fallback import call_small_model

INTENT_LABELS = [
    "symptoms",
    "treatment",
    "mechanism",
    "diagnosis",
    "prognosis",
    "medication",
    "general",
]

_INTENT_CACHE: dict[str, str] = {}

_INTENT_PROMPT = """You are an intent classifier for a biomedical RAG retrieval system.

Classify the user's primary information need.

Choose exactly ONE label:
symptoms, treatment, mechanism, diagnosis, prognosis, medication, general

Definitions:
- symptoms: signs, symptoms, warning signs, clinical presentation, what a disease or lesion looks/feels like
- treatment: treatment options, therapy, management, surgery, chemotherapy, immunotherapy, clinical trials
- mechanism: pathogenesis, molecular biology, pathways, mutations, genes, proteins, how a disease works
- diagnosis: tests, diagnostic criteria, detection, screening, biopsy, imaging, staging methods
- prognosis: survival, outcomes, recurrence risk, mortality, life expectancy, prognosis after diagnosis/stage
- medication: a specific drug, dose, dosage, side effects, adverse effects, interactions, contraindications, drug safety
- general: other medical question

Tie-break rules:
- Specific drug dose, side effects, interactions, or safety → medication
- Detection, confirmation, biopsy, imaging, screening, or staging method → diagnosis
- Survival, recurrence, mortality, life expectancy, or outcome after diagnosis/stage → prognosis
- What the patient notices, feels, sees, or should watch for → symptoms

Question:
{question}

Reply with exactly one lowercase label and nothing else."""


def _cache_key(question: str) -> str:
    return re.sub(r"\s+", " ", question.strip().lower())


def _parse_intent(raw: str | None) -> str:
    if not raw:
        return "general"

    text = raw.strip().lower()
    cleaned = text.strip(" .,:;`'\"")

    if cleaned in INTENT_LABELS:
        return cleaned

    tokens = re.findall(r"[a-z]+", text)
    for token in tokens:
        if token in INTENT_LABELS:
            return token

    return "general"


def classify_intent(question: str) -> str:
    key = _cache_key(question)

    if key in _INTENT_CACHE:
        return _INTENT_CACHE[key]

    raw = call_small_model(
        prompt=_INTENT_PROMPT.format(question=question),
        max_tokens=15,
        fallback="general",
        task_name="intent_classification",
    )

    intent = _parse_intent(raw)
    _INTENT_CACHE[key] = intent
    return intent


def get_alpha_for_intent(intent: str) -> float:
    return config.INTENT_ALPHA.get(intent, config.SEARCH_ALPHA)