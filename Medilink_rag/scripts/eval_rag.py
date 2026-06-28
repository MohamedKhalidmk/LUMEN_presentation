"""
Local RAG evaluation script.

Run inside the rag container:
    docker compose exec rag python scripts/eval_rag.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
from nltk.tokenize import sent_tokenize
from sklearn.metrics.pairwise import cosine_similarity

from app import config, deps
from app.rag.retrieval import semantic_search

# ── Boot the same models/connections the app uses ─────────────────────
deps.init_embedder()
deps.init_weaviate()
embed_model = deps.embed_model


def context_relevance(question: str, contexts: list) -> float:
    """How relevant are retrieved chunks to the question?"""
    q_emb  = embed_model.encode([question])
    c_embs = embed_model.encode(contexts)
    return float(cosine_similarity(q_emb, c_embs)[0].mean())


def context_coverage(answer: str, contexts: list) -> float:
    """Does the retrieved context cover the answer?"""
    answer_sents = sent_tokenize(answer)
    if not answer_sents:
        return 0.0
    a_embs = embed_model.encode(answer_sents)
    c_embs = embed_model.encode(contexts)
    return float(cosine_similarity(a_embs, c_embs).max(axis=1).mean())


def answer_faithfulness(answer: str, contexts: list) -> float:
    """Is the answer semantically grounded in the context?"""
    a_emb  = embed_model.encode([answer])
    c_embs = embed_model.encode(contexts)
    return float(cosine_similarity(a_emb, c_embs)[0].max())


def chunk_diversity(contexts: list) -> float:
    """Are retrieved chunks diverse (not repetitive)?"""
    if len(contexts) < 2:
        return 1.0
    embs  = embed_model.encode(contexts)
    sims  = cosine_similarity(embs)
    upper = sims[np.triu_indices(len(sims), k=1)]
    return float(1.0 - np.mean(upper))


# ── Test questions + ground truth answers ─────────────────────────────
test_data = [
    {
        "question": "What are the main treatments for multiple myeloma?",
        "answer":   "Multiple myeloma is treated with proteasome inhibitors, IMiDs, stem cell transplant, and CAR-T cell therapy.",
    },
    {
        "question": "What are immune checkpoint inhibitors in melanoma?",
        "answer":   "Anti-PD1 and anti-CTLA4 antibodies are checkpoint inhibitors that improve survival in advanced melanoma.",
    },
    {
        "question": "What causes skin cancer?",
        "answer":   "UV radiation, genetic mutations in BRAF and NRAS, and immune suppression are main causes of skin cancer.",
    },
    {
        "question": "What is BRAF mutation role in melanoma?",
        "answer":   "BRAF V600E mutation occurs in 50% of melanomas and is targeted by vemurafenib and dabrafenib.",
    },
    {
        "question": "What are side effects of CAR-T therapy?",
        "answer":   "CAR-T therapy causes cytokine release syndrome, neurotoxicity, and prolonged low blood counts.",
    },
]

# ── Run evaluation ────────────────────────────────────────────────────
print("Evaluating RAG pipeline (free, local) …\n")
all_results = []

for item in test_data:
    docs     = semantic_search(item["question"], k=config.SEARCH_K)
    contexts = [d["text"] for d in docs]
    all_results.append({
        "question":          item["question"][:50],
        "context_relevance": context_relevance(item["question"], contexts),
        "context_coverage":  context_coverage(item["answer"],   contexts),
        "faithfulness":      answer_faithfulness(item["answer"], contexts),
        "chunk_diversity":   chunk_diversity(contexts),
    })

# ── Print results ─────────────────────────────────────────────────────
print(f"{'Question':<52} {'Relevance':>10} {'Coverage':>10} {'Faithful':>10} {'Diversity':>10}")
print("─" * 95)
for r in all_results:
    print(f"  {r['question']:<50} "
          f"{r['context_relevance']:>10.3f} "
          f"{r['context_coverage']:>10.3f} "
          f"{r['faithfulness']:>10.3f} "
          f"{r['chunk_diversity']:>10.3f}")
print("─" * 95)
print(f"  {'AVERAGE':<50} "
      f"{np.mean([r['context_relevance'] for r in all_results]):>10.3f} "
      f"{np.mean([r['context_coverage']  for r in all_results]):>10.3f} "
      f"{np.mean([r['faithfulness']      for r in all_results]):>10.3f} "
      f"{np.mean([r['chunk_diversity']   for r in all_results]):>10.3f}")

print("\n── Score Guide ──────────────────────────────────────")
print("  Context Relevance : how well chunks match the question  (target > 0.6)")
print("  Context Coverage  : how well chunks support the answer  (target > 0.6)")
print("  Faithfulness      : how grounded the answer is          (target > 0.7)")
print("  Chunk Diversity   : are chunks varied not repetitive    (target > 0.3)")
print("────────────────────────────────────────────────────────")

overall = np.mean([
    np.mean([r["context_relevance"] for r in all_results]),
    np.mean([r["context_coverage"]  for r in all_results]),
    np.mean([r["faithfulness"]      for r in all_results]),
])
print(f"\n🏆 Overall RAG Score : {overall:.3f} / 1.000")
if overall > 0.75:
    print("   ✅ Excellent — pipeline performing well")
elif overall > 0.60:
    print("   ⚠️  Good — consider tuning chunk size or alpha")
else:
    print("   ❌  Needs improvement — try different chunking strategy")

deps.close()