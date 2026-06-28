# MediLink — RAG Service

Biomedical retrieval-augmented generation over the MediLink corpus (melanoma,
skin cancer, multiple myeloma). Hybrid retrieval → MedCPT reranking → contextual
compression → citation-constrained generation → citation + grounding checks.

Runs on the **CPU EC2** box (`:8002`) alongside Weaviate. Internal service — only
the gateway calls it.

## Pipeline (per query)

```
intent classification (Haiku)
  → query rewrite (intent-preserving; skipped for symptom queries)
  → multi-query expansion  [+ optional HyDE]
  → hybrid search per query (Weaviate, per-intent alpha) + dedup
  → MMR diversity
  → MedCPT cross-encoder rerank
  → contextual compression (symptom-aware)
  → OOS gate (retrieval relevance + Haiku scope check)
  → generation (Sonnet, CITATION_SYSTEM)
  → verify citations are real + grounding judge (Haiku) [+ optional NLI]
```

Defaults reproduce the **validated notebook configuration** (the one behind your
benchmark). Where the deployment handoff suggested different numbers, the
alternative is noted inline in `.env.example` (`SEARCH_K` 4↔6, `N_MULTI_QUERIES`
2↔4, `ALPHA_SYMPTOMS` 0.20↔0.35).

## API

```
GET  /health
POST /api/v1/query
```

Request:

```json
{
  "question": "What are the early signs of melanoma?",
  "intent": null,
  "patient_mode": false,
  "retrieve_only": false,
  "history": [{"role": "user", "content": "..."}],
  "top_k": null
}
```

`patient_mode=true` restricts retrieval to patient-friendly sources
(NHS / Cancer.gov / MedlinePlus / PDF guidelines). `retrieve_only=true` returns
evidence without calling Sonnet. Response includes `answer`, `evidence[]`,
`citations` (with any `fabricated_pmids`), and a `grounding` verdict.

## One-time setup: load the corpus

The chunk text and precomputed embeddings live on Google Drive (they are **not**
in this repo). Download both into `./data`, then ingest:

```
data/chunks_spubmedbert.json      # list of chunk dicts
data/embeddings_spubmedbert.npy   # N x 768, aligned by index
```

```bash
cp .env.example .env              # set ANTHROPIC_API_KEY
docker compose up -d weaviate
pip install -r requirements.txt
python scripts/ingest.py          # add --recreate to rebuild
```

Ingest uses your precomputed vectors (no re-embedding) and sets BM25 `b=0.85,
k1=1.5` on the collection.

## Run

```bash
docker compose up --build         # starts Weaviate + the RAG service
curl -s http://localhost:8002/health | jq
```

## Layout

```
app/
  main.py            FastAPI app + startup (load embedder, connect Weaviate, warm CE)
  config.py          All tunables (env-overridable; defaults = validated notebook)
  deps.py            Singletons: embedder, Weaviate client, cross-encoder, NLI
  schemas.py         Request/response models
  routes/query.py
  llm/
    client.py        Stateless call_haiku / call_sonnet
    prompts.py       CITATION_SYSTEM, REWRITER_SYSTEM, HyDE/multi-query, scope, etc.
  rag/
    intent.py        intent classification + per-intent alpha
    rewrite.py       intent-preserving query rewrite
    expansion.py     HyDE, multi-query, decomposition
    retrieval.py     hybrid search, MMR, dedup, advanced_retrieve, prompt builder
    rerank.py        MedCPT cross-encoder + optional NLI filter
    compression.py   sentence-level relevance filtering (symptom-aware)
    oos.py           out-of-scope gating
    generation.py    advanced_rag_answer + citation/grounding verification
scripts/ingest.py
tests/               fully-stubbed (no models/network)
```

## Notes

- **Grounding is LLM-based at runtime** (Haiku GROUNDED/HALLUCINATED). The
  embedding-similarity hallucination metric only exists in the offline eval
  harness; it is not in this service path.
- Without `ANTHROPIC_API_KEY`, intent/rewrite/scope fall back to regex/rules and
  generation is unavailable (the service still retrieves).
- First request after boot downloads the embedder + MedCPT into the `hf_cache`
  volume; subsequent boots are fast.

## Tests

```bash
pip install -r requirements.txt
pytest -q          # all external deps stubbed
```
