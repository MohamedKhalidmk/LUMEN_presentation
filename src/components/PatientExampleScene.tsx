import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BrainCircuit,
  Clock,
  CopyX,
  FileSearch,
  GitBranch,
  Layers,
  ListFilter,
  Scissors,
  Search,
  ShieldCheck,
  Shuffle,
  Sparkles,
} from 'lucide-react';

export default function PatientExampleScene() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '01. Intent Classification',
      sub: 'app/rag/intent.py',
      latency: '0ms',
      icon: BrainCircuit,
      color: 'bg-blue-50 text-[#0071E3] border-blue-100',
      does: 'Classifies the question as symptoms, treatment, mechanism, diagnosis, prognosis, medication, or general. That label controls the hybrid alpha used during retrieval.',
      example: 'User: "What warning signs of melanoma should I watch for?" -> intent: symptoms',
      before: 'Before: the system only has a plain user sentence.',
      after: 'After: the sentence has a retrieval intent, and symptoms uses a BM25-heavy alpha of 0.20.',
      output: 'Intent selected: symptoms -> alpha 0.20',
    },
    {
      id: 1,
      title: '02. Intent-Preserving Rewrite',
      sub: 'app/rag/rewrite.py',
      latency: '24ms',
      icon: FileSearch,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      does: 'For non-symptom queries, a small model rewrites the question into concise PubMed-style language while preserving the original intent words.',
      example: '"How does bortezomib work in MM?" -> "bortezomib mechanism proteasome inhibitor multiple myeloma"',
      before: 'Before: abbreviations and casual wording may miss biomedical matches.',
      after: 'After: abbreviations are expanded and the search phrase fits the corpus vocabulary.',
      output: 'Rewrite prepared for PubMed vocabulary',
    },
    {
      id: 2,
      title: '03. Multi-Query Expansion',
      sub: 'app/rag/expansion.py',
      latency: '180ms',
      icon: GitBranch,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      does: 'Creates extra biomedical search queries for different angles of the same question. The default is two queries.',
      example: '"melanoma symptoms" -> "warning signs melanoma patients experience" plus "melanoma ABCDE criteria clinical features diagnosis"',
      before: 'Before: one phrasing may retrieve only one narrow set of chunks.',
      after: 'After: multiple phrasings pull evidence from patient, clinical, and technical wording.',
      output: 'Query set expanded before retrieval',
    },
    {
      id: 3,
      title: '04. HyDE Query Vector',
      sub: 'Hypothetical Document Embeddings',
      latency: '90ms',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      does: 'Generates a short hypothetical clinical excerpt, then embeds that excerpt for the primary query vector.',
      example: 'Question: "How is melanoma diagnosed?" -> hypothetical guideline-style passage about biopsy, staging, and diagnostic criteria.',
      before: 'Before: the embedding represents a short user question.',
      after: 'After: the embedding represents the kind of evidence passage the system wants to find.',
      output: 'Primary vector built from HyDE text',
    },
    {
      id: 4,
      title: '05. Hybrid Retrieval',
      sub: 'Weaviate BM25 + S-PubMedBERT',
      latency: '20ms',
      icon: Search,
      color: 'bg-violet-50 text-violet-600 border-violet-100',
      does: 'Runs Weaviate hybrid search with both keyword matching and dense S-PubMedBERT vectors. In patient mode, it can filter to sources such as NHS, Cancer.gov, MedlinePlus, and PDFs.',
      example: 'Keyword match catches "ABCDE"; vector match catches chunks about asymmetry, border, color, diameter, and evolution.',
      before: 'Before: retrieval would be either exact-word search or semantic search alone.',
      after: 'After: the system combines both, with alpha adjusted by intent.',
      output: 'Hybrid candidates fetched from PubMedChunksSPubMedBert',
    },
    {
      id: 5,
      title: '06. Deduplication',
      sub: 'UUID + PMID/Text Signature',
      latency: '6ms',
      icon: CopyX,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      does: 'Removes repeated passages by UUID, then by PMID plus the first 80 characters of text.',
      example: 'Two chunks from the same PMID begin with the same sentence -> keep one copy.',
      before: 'Before: repeated chunks can crowd out useful evidence.',
      after: 'After: the candidate pool has fewer duplicates before ranking.',
      output: 'Duplicate passages removed from candidate pool',
    },
    {
      id: 6,
      title: '07. MMR Diversity Selection',
      sub: 'Maximal Marginal Relevance',
      latency: '12ms',
      icon: Shuffle,
      color: 'bg-teal-50 text-teal-600 border-teal-100',
      does: 'Selects chunks that are relevant to the query but not too similar to already selected chunks. Lambda defaults to 0.40.',
      example: 'Keep one chunk about ABCDE signs and another about biopsy, instead of three near-identical ABCDE chunks.',
      before: 'Before: top candidates may all say almost the same thing.',
      after: 'After: the evidence set covers more angles of the medical question.',
      output: 'Diverse candidate set selected before rerank',
    },
    {
      id: 7,
      title: '08. MedCPT Cross-Encoder Rerank',
      sub: 'app/rag/rerank.py',
      latency: '38ms',
      icon: ListFilter,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      does: 'Scores each original-question and passage pair with the NCBI MedCPT cross-encoder, normalizes the score, sorts results, and applies a soft cutoff.',
      example: 'Question asks about side effects; a passage specifically listing adverse events ranks above a general treatment overview.',
      before: 'Before: retrieval scores are fast but approximate.',
      after: 'After: the best-matching biomedical passages move to the top-K set.',
      output: 'Top evidence sorted by ce_score',
    },
    {
      id: 8,
      title: '09. Contextual Compression',
      sub: 'Sentence-Level Similarity Filter',
      latency: '14ms',
      icon: Scissors,
      color: 'bg-orange-50 text-orange-600 border-orange-100',
      does: 'Splits passages into sentences, embeds each sentence, and keeps sentences above the similarity threshold. If nothing passes, it leaves the passage intact.',
      example: 'A long abstract has one sentence about melanoma warning signs -> keep that sentence for the final prompt.',
      before: 'Before: the generator receives long chunks with extra unrelated text.',
      after: 'After: the prompt carries the most relevant sentence-level evidence.',
      output: 'Final passages shortened around relevant sentences',
    },
    {
      id: 9,
      title: '10. Gate + Grounded Generation',
      sub: 'app/rag/generation.py',
      latency: '32ms',
      icon: ShieldCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      does: 'A quality gate checks whether retrieved evidence is sufficient. If it passes, Claude Sonnet answers using only retrieved evidence, exact PMID/source citations, and a medical disclaimer.',
      example: 'If evidence is weak -> coverage gap response. If evidence is strong -> answer with citations like [PMID:12345678].',
      before: 'Before: the model might answer even when retrieval is poor.',
      after: 'After: weak retrieval is blocked, and generated medical claims must cite retrieved identifiers.',
      output: 'Evidence approved for cited answer, or coverage gap returned',
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center py-16 md:py-20 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-50/40 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3">MEDILINK RAG PIPELINE TRACE</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.08] mb-5">
                Trace the request. <br />
                <span className="text-[#86868B] font-normal">From question to cited answer.</span>
              </h2>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] font-mono text-[#86868B] block uppercase tracking-wider font-bold">Choose active RAG technique</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(st.id)}
                    className={`group min-h-[78px] p-3.5 border rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                      activeStep === st.id
                        ? 'bg-[#0071E3] border-transparent text-white shadow-md scale-[1.01]'
                        : 'bg-[#F5F5F7] border-[#D2D2D7]/40 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <span className={`h-11 w-11 rounded-lg border flex items-center justify-center shrink-0 ${
                      activeStep === st.id ? 'border-white/20 bg-white/15 text-white' : st.color
                    }`}>
                      {React.createElement(st.icon, { className: 'w-5 h-5 stroke-[1.8]' })}
                    </span>
                    <span>
                      <span className={`block font-mono text-[10px] font-bold ${activeStep === st.id ? 'text-blue-100' : 'text-[#86868B]'}`}>
                        {String(st.id + 1).padStart(2, '0')}
                      </span>
                      <span className="block text-sm font-display font-semibold leading-tight">
                        {st.title.replace(/^\d+\.\s*/, '')}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAF9FB] border border-[#D2D2D7]/40 rounded-lg p-5 md:p-6 flex flex-col justify-between min-h-[500px] shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-neutral-200/50 pb-3 mb-4">
              <span className="text-[10px] font-mono text-[#86868B] tracking-wider font-bold">MEDILINK RAG TECHNIQUE CONSOLE</span>
              <div className="flex gap-2 items-center font-mono text-[#0071E3] font-bold text-xs bg-blue-50/60 px-3 py-1.5 rounded-full border border-blue-100 w-fit">
                <Clock className="w-3.5 h-3.5" />
                <span>TRACE MARKER:</span>
                <span>{steps.slice(0, activeStep + 1).reduce((acc, st) => acc + parseInt(st.latency), 0)}ms</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-5 rounded-2xl border ${steps[activeStep].color} shadow-sm`}>
                      {React.createElement(steps[activeStep].icon, { className: 'w-9 h-9 stroke-[1.7]' })}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#0071E3] uppercase tracking-widest font-bold">
                        Technique {String(activeStep + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-display font-semibold text-[#1D1D1F] leading-tight">
                        {steps[activeStep].title.replace(/^\d+\.\s*/, '')}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white border border-[#D2D2D7]/30 rounded-lg font-mono text-xs shadow-inner">
                      <span className="text-neutral-400 text-[8px] font-bold uppercase tracking-widest block mb-1.5">
                        Simple text example
                      </span>
                      <span className="text-[#1D1D1F] font-semibold block leading-relaxed">{steps[activeStep].example}</span>
                    </div>
                    <div className="p-3.5 bg-white border border-[#D2D2D7]/30 rounded-lg font-mono text-xs shadow-inner">
                      <span className="text-neutral-400 text-[8px] font-bold uppercase tracking-widest block mb-1.5">
                        Before / after
                      </span>
                      <span className="text-[#1D1D1F] font-semibold block leading-relaxed">{steps[activeStep].before}</span>
                      <span className="text-[#1D1D1F] font-semibold block leading-relaxed mt-2">{steps[activeStep].after}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-[#D2D2D7]/30 rounded-lg font-mono text-xs shadow-inner">
                    <span className="text-neutral-400 text-[8px] font-bold uppercase tracking-widest block mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#0071E3]" />
                      Actual pipeline output
                    </span>
                    <span className="text-[#1D1D1F] font-semibold block">{steps[activeStep].output}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center border-t border-neutral-200/50 pt-3 mt-4">
              <span className="text-[9px] font-mono text-[#86868B] uppercase tracking-widest font-bold">
                TECHNIQUE {activeStep + 1} OF {steps.length} TRACED
              </span>
              <button
                onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                className="px-5 py-2.5 bg-[#1D1D1F] hover:bg-neutral-800 text-white text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 font-bold shadow-sm"
              >
                <span>NEXT TECHNIQUE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
