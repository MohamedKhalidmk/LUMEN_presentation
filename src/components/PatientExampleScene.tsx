import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Braces,
  Clock,
  FileText,
  Filter,
  GitBranch,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Split,
  Target,
} from 'lucide-react';

export default function PatientExampleScene() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '01. Intent Classification',
      sub: 'Haiku → Gemini → General Fallback',
      latency: '18ms',
      icon: Bot,
      color: 'bg-blue-50 text-[#0071E3] border-blue-100',
      desc: 'The question is classified into one medical intent: symptoms, treatment, mechanism, diagnosis, prognosis, medication, or general. That intent controls the retrieval balance before search begins.',
      output: 'intent = diagnosis  •  alpha = INTENT_ALPHA[intent]'
    },
    {
      id: 1,
      title: '02. Query Decomposition',
      sub: 'Compound Question Splitter',
      latency: '22ms',
      icon: Split,
      color: 'bg-slate-50 text-slate-700 border-slate-200',
      desc: 'If the user asks multiple medical questions at once, the pipeline splits them into standalone retrieval units. Single focused questions pass through unchanged.',
      output: 'sub_questions = decompose_query(question)'
    },
    {
      id: 2,
      title: '03. Query Rewrite',
      sub: 'Intent-Preserving PubMed Optimizer',
      latency: '34ms',
      icon: Braces,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      desc: 'The question is rewritten into a concise biomedical search query while preserving the original intent. If the rewrite looks broken, the original wording is kept.',
      output: 'primary_query = rewrite_query(sub_question, intent)'
    },
    {
      id: 3,
      title: '04. Multi-Query Expansion',
      sub: 'Multiple Retrieval Angles',
      latency: '41ms',
      icon: Layers3,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      desc: 'Extra biomedical query variants are generated so evidence retrieval is not dependent on one exact phrasing. Each query targets the same clinical intent from a different angle.',
      output: 'queries = [primary_query] + generated_queries'
    },
    {
      id: 4,
      title: '05. Hybrid Retrieval',
      sub: 'S-PubMedBERT + Weaviate Hybrid Search',
      latency: '96ms',
      icon: Search,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      desc: 'Each query is embedded and sent to Weaviate hybrid search. The intent-specific alpha balances dense semantic retrieval with keyword/BM25 matching.',
      output: 'hybrid_search(query, vector, alpha, k, sources)'
    },
    {
      id: 5,
      title: '06. Merge + Dedup',
      sub: 'Candidate Evidence Cleanup',
      latency: '12ms',
      icon: Filter,
      color: 'bg-zinc-50 text-zinc-700 border-zinc-200',
      desc: 'Results from all query variants are merged. Duplicate passages are removed by UUID first, then by PMID and passage signature so repeated chunks do not waste context space.',
      output: 'dedup by uuid + PMID + first 80 chars'
    },
    {
      id: 6,
      title: '07. MMR Diversity',
      sub: 'Relevant, But Not Repetitive',
      latency: '20ms',
      icon: Network,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      desc: 'Maximal Marginal Relevance selects passages that stay close to the query while avoiding near-duplicate evidence. The result is broader coverage of the medical topic.',
      output: 'score = λ × relevance − (1 − λ) × redundancy'
    },
    {
      id: 7,
      title: '08. MedCPT Rerank',
      sub: 'Cross-Encoder Evidence Ordering',
      latency: '84ms',
      icon: Target,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      desc: 'A cross-encoder scores every original-question and passage pair. This pushes directly useful evidence above passages that only looked similar in vector space.',
      output: 'ce_score = sigmoid(MedCPT(question, passage))'
    },
    {
      id: 8,
      title: '09. Context Compression',
      sub: 'Sentence-Level Evidence Packing',
      latency: '28ms',
      icon: FileText,
      color: 'bg-orange-50 text-orange-600 border-orange-100',
      desc: 'Long passages are reduced to the most relevant sentences, with a small neighbor window kept around them so the final evidence block remains readable and grounded.',
      output: 'compressed = relevant sentence window + source metadata'
    },
    {
      id: 9,
      title: '10. Quality Gate + Cited Answer',
      sub: 'Safety Check → Sonnet Generation',
      latency: '45ms',
      icon: ShieldCheck,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      desc: 'The final context is checked before answer generation. If evidence is sufficient, Sonnet answers using only the retrieved block, then citations and grounding are verified.',
      output: 'gate = pass  •  answer = Sonnet(evidence)  •  citations verified'
    }
  ];

  const totalLatency = steps
    .slice(0, activeStep + 1)
    .reduce((acc, st) => acc + parseInt(st.latency), 0);

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      {/* Visual background spot */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-50/40 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[420px] h-[420px] bg-neutral-100/60 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Explanatory Header */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3.5">BIOMEDICAL RAG PIPELINE</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.12] mb-6">
                Trace the evidence. <br />
                <span className="text-[#86868B] font-normal">From question to cited answer.</span>
              </h2>
              <p className="text-[#424245] text-sm leading-relaxed font-sans font-light">
                This dashboard follows one medical question through MediLink&apos;s retrieval pipeline: intent detection, decomposition, rewriting, hybrid Weaviate search, deduplication, MMR diversity, MedCPT reranking, compression, quality gating, and citation-verified answer generation.
              </p>
            </div>

            {/* Quick Controllers */}
            <div className="space-y-3.5">
              <span className="text-[9px] font-mono text-[#86868B] block uppercase tracking-wider font-bold">CHOOSE ACTIVE RAG STAGE</span>
              <div className="grid grid-cols-5 gap-2.5">
                {steps.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(st.id)}
                    className={`p-3.5 border rounded-2xl font-mono text-center text-xs transition-all duration-200 ${
                      activeStep === st.id
                        ? 'bg-[#0071E3] border-transparent text-white font-bold shadow-md scale-102'
                        : 'bg-[#F5F5F7] border-[#D2D2D7]/40 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    {String(st.id + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage with Card Detail */}
          <div className="lg:col-span-7 bg-[#FAF9FB] border border-[#D2D2D7]/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[440px] shadow-lg">
            {/* Header telemetry info */}
            <div className="flex justify-between items-center border-b border-neutral-200/50 pb-4 mb-6 gap-4">
              <span className="text-[10px] font-mono text-[#86868B] tracking-wider font-bold">LUMEN RAG EVIDENCE CONSOLE</span>
              <div className="flex gap-2 items-center font-mono text-[#0071E3] font-bold text-xs bg-blue-50/60 px-3 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5" />
                <span>STACK TIME:</span>
                <span>{totalLatency}ms</span>
              </div>
            </div>

            {/* Main Step Detail representation */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl border ${steps[activeStep].color} shadow-sm`}>
                      {React.createElement(steps[activeStep].icon, { className: 'w-6 h-6 stroke-[1.5]' })}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-semibold text-[#1D1D1F]">{steps[activeStep].title}</h3>
                      <p className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider">{steps[activeStep].sub} • latency: {steps[activeStep].latency}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#424245] font-sans leading-relaxed font-light">
                    {steps[activeStep].desc}
                  </p>

                  <div className="p-4 bg-white border border-[#D2D2D7]/30 rounded-2xl font-mono text-xs shadow-inner">
                    <span className="text-neutral-400 text-[8px] font-bold uppercase tracking-widest block mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#0071E3]" />
                      MODULE SPECIFIC LOG RESPONSE
                    </span>
                    <span className="text-[#1D1D1F] font-semibold block">{steps[activeStep].output}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center border-t border-neutral-200/50 pt-4 mt-6">
              <span className="text-[9px] font-mono text-[#86868B] uppercase tracking-widest font-bold">
                STAGE {activeStep + 1} OF {steps.length} TRACED
              </span>
              <button
                onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                className="px-5 py-2.5 bg-[#1D1D1F] hover:bg-neutral-800 text-white text-xs font-mono rounded-xl transition-colors flex items-center gap-1.5 font-bold shadow-sm"
              >
                <span>NEXT RAG STEP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
