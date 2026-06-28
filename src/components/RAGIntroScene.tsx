import React from 'react';
import { BookOpen, Database, FileCheck2, ShieldCheck } from 'lucide-react';

export default function RAGIntroScene() {
  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      <div className="absolute top-[10%] right-[-12%] w-[560px] h-[560px] bg-blue-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[6%] left-[-10%] w-[520px] h-[520px] bg-indigo-50 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-left">
            <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-4">
              Biomedical Grounding Module
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-light leading-[1.02] tracking-tight">
              Meet MediLink RAG.
              <br />
              <span className="text-[#86868B]">Answers constrained by evidence.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base text-neutral-600 leading-relaxed font-light">
              The RAG system turns a patient question into biomedical search language, retrieves evidence from Weaviate, reranks it with medical models, compresses the context, and generates only citation-grounded answers.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-[32px] border border-neutral-200 bg-white p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, title: 'Query rewrite', text: 'Patient words to biomedical search terms.' },
                { icon: Database, title: 'Hybrid retrieval', text: 'BM25 plus dense S-PubMedBERT vectors.' },
                { icon: FileCheck2, title: 'MedCPT rerank', text: 'Medical pair scoring before context selection.' },
                { icon: ShieldCheck, title: 'PMID grounding', text: 'Claims must attach to retrieved sources.' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 min-h-[170px] flex flex-col justify-between">
                  <item.icon className="h-7 w-7 text-[#0071E3]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-3xl bg-[#111112] p-5 text-white">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-300">benchmark signal</span>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-mono text-5xl font-bold">0.938</span>
                <span className="pb-2 text-sm font-mono text-neutral-400 uppercase">overall RAG score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
