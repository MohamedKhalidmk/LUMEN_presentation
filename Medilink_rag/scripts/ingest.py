"""
Ingest the LUMEN corpus into Weaviate.

Downloads both data files directly from HuggingFace
(mohamedkhaledmk7/LUMEN-rag-data) so no manual file copying is needed.
Just set HF_TOKEN in your .env and run:

    python scripts/ingest.py
    python scripts/ingest.py --recreate    # drop + rebuild the collection

Files on HuggingFace:
    SpubMedBERT_chunks.json      60.2 MB   chunk text + metadata
    embeddings_spubmedbert.npy  116.0 MB   aligned float32 vectors (N x 768)
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import config  # noqa: E402

HF_DATASET_REPO  = "mohamedkhaledmk7/LUMEN-rag-data"
HF_CHUNKS_FILE   = "SpubMedBERT_chunks.json"
HF_EMBED_FILE    = "embeddings_spubmedbert.npy"

TEXT_KEYS = ("text", "chunk", "content", "passage")


def _get_text(chunk: dict) -> str:
    for key in TEXT_KEYS:
        if chunk.get(key):
            return str(chunk[key])
    return ""


def _download_data() -> tuple[str, str]:
    """Download both files from HuggingFace and return their local paths."""
    from huggingface_hub import hf_hub_download

    token = config.HF_TOKEN or None
    print(f"Downloading {HF_CHUNKS_FILE} from {HF_DATASET_REPO} ...")
    chunks_path = hf_hub_download(
        repo_id=HF_DATASET_REPO,
        filename=HF_CHUNKS_FILE,
        repo_type="dataset",
        token=token,
    )
    print(f"Downloading {HF_EMBED_FILE} from {HF_DATASET_REPO} ...")
    embed_path = hf_hub_download(
        repo_id=HF_DATASET_REPO,
        filename=HF_EMBED_FILE,
        repo_type="dataset",
        token=token,
    )
    print("Downloads complete.")
    return chunks_path, embed_path


def build_collection(client, recreate: bool):
    import weaviate.classes.config as wvc

    if client.collections.exists(config.COLLECTION_NAME):
        if recreate:
            client.collections.delete(config.COLLECTION_NAME)
            print(f"Deleted existing collection '{config.COLLECTION_NAME}'.")
        else:
            print(
                f"Collection '{config.COLLECTION_NAME}' exists; appending. "
                "Use --recreate to rebuild."
            )
            return client.collections.get(config.COLLECTION_NAME)

    client.collections.create(
        name=config.COLLECTION_NAME,
        vectorizer_config=wvc.Configure.Vectorizer.none(),
        inverted_index_config=wvc.Configure.inverted_index(
            bm25_b=config.BM25_B, bm25_k1=config.BM25_K1
        ),
        properties=[
            wvc.Property(name="text",    data_type=wvc.DataType.TEXT),
            wvc.Property(name="pmid",    data_type=wvc.DataType.TEXT),
            wvc.Property(name="source",  data_type=wvc.DataType.TEXT),
            wvc.Property(name="title",   data_type=wvc.DataType.TEXT),
            wvc.Property(name="section", data_type=wvc.DataType.TEXT),
            wvc.Property(name="disease", data_type=wvc.DataType.TEXT),
        ],
    )
    print(
        f"Created collection '{config.COLLECTION_NAME}' "
        f"(BM25 b={config.BM25_B}, k1={config.BM25_K1})."
    )
    return client.collections.get(config.COLLECTION_NAME)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--recreate", action="store_true",
        help="Drop and rebuild the Weaviate collection from scratch."
    )
    parser.add_argument(
        "--chunks", default=None,
        help="Local path to chunks JSON (skips HF download if provided)."
    )
    parser.add_argument(
        "--embeddings", default=None,
        help="Local path to embeddings .npy (skips HF download if provided)."
    )
    args = parser.parse_args()

    # Resolve data paths — local override or HF download.
    if args.chunks and args.embeddings:
        chunks_path = args.chunks
        embed_path  = args.embeddings
        print(f"Using local files: {chunks_path}, {embed_path}")
    else:
        chunks_path, embed_path = _download_data()

    print("Loading data ...")
    chunks  = json.loads(Path(chunks_path).read_text(encoding="utf-8"))
    vectors = np.load(embed_path, mmap_mode='r')

    if len(chunks) != len(vectors):
        raise SystemExit(
            f"Mismatch: {len(chunks)} chunks vs {len(vectors)} vectors."
        )
    if vectors.shape[1] != config.EMBEDDING_DIM:
        raise SystemExit(
            f"Embedding dim {vectors.shape[1]} != EMBEDDING_DIM {config.EMBEDDING_DIM}."
        )
    print(f"Loaded {len(chunks)} chunks, vectors shape {vectors.shape}.")

    import weaviate

    client = weaviate.connect_to_custom(
        http_host=config.WEAVIATE_HOST, http_port=config.WEAVIATE_PORT,
        http_secure=False,
        grpc_host=config.WEAVIATE_HOST, grpc_port=config.WEAVIATE_GRPC,
        grpc_secure=False,
    )
    try:
        collection = build_collection(client, args.recreate)
        inserted   = 0
        with collection.batch.dynamic() as batch:
            for chunk, vec in zip(chunks, vectors):
                batch.add_object(
                    properties={
                        "text":    _get_text(chunk),
                        "pmid":    str(chunk.get("pmid", "") or ""),
                        "source":  chunk.get("source", ""),
                        "title":   chunk.get("title", ""),
                        "section": chunk.get("section", ""),
                        "disease": chunk.get("disease", ""),
                    },
                    vector=vec.tolist(),
                )
                inserted += 1

        failed = collection.batch.failed_objects
        print(
            f"Ingested {inserted - len(failed)} / {inserted} objects "
            f"({len(failed)} failed)."
        )
        if failed:
            print("First failure:", failed[0].message)
    finally:
        client.close()


if __name__ == "__main__":
    main()