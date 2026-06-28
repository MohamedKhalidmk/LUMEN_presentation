import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ShieldAlert, ArrowRight, HelpCircle, Activity, Info } from 'lucide-react';

export default function RAGExplainScene() {
  const [activeStep, setActiveStep] = useState(0);

  const researchPapers = [
    {
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      authors: "P. Lewis, E. Perez, A. Piktus, F. Petroni, et al.",
      journal: "Advances in Neural Information Processing Systems (NeurIPS), 2020",
      doi: "10.48550/arXiv.2005.11401",
      impact: "Foundational Literature",
      contribution: "First formal proposal of combining parametric (LLM weights) and non-parametric (dense document index) memory for accurate task completion.",
      abstract: "Large pre-trained language models have been shown to store implicit knowledge in their parameters. However, their ability to access and precisely manipulate knowledge is still limited, prone to hallucination. We introduce Retrieval-Augmented Generation (RAG)—a general-purpose fine-tuning recipe combining pre-trained seq2seq models with a dense passage retriever index, achieving state-of-the-art results on open-domain QA."
    },
    {
      title: "PubMedBERT: Domain-Specific Language Model Pretraining for Biomedical Text Mining",
      authors: "Y. Gu, R. Tinn, H. Cheng, et al.",
      journal: "ACM Transactions on Computing for Healthcare, 2021",
      doi: "10.1145/3451375",
      impact: "Domain Encoder SOTA",
      contribution: "Proves that pretraining from scratch on medical text (PubMed) dramatically outperforms general-domain models (BERT) in medical text understanding.",
      abstract: "Domain-specific pretraining has emerged as a key paradigm in NLP. In this study, we demonstrate that pretraining BERT from scratch solely on biomedical text (PubMed abstracts) significantly outperforms general models. We release PubMedBERT, which achieves state-of-the-art accuracy across a wide range of biomedical NLP benchmarks, establishing a robust embedding retriever baseline."
    },
    {
      title: "Dense Passage Retrieval for Open-Domain Question Answering",
      authors: "V. Karpukhin, B. Oguz, S. Min, et al.",
      journal: "Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP)",
      doi: "10.18653/v1/2020.emnlp-main.550",
      impact: "Vector Search Core",
      contribution: "Establishes dense dual-encoder model using dense embeddings for semantic retrieval, outperforming keyword matching (BM25) by up to 20%.",
      abstract: "Open-domain question answering relies on efficient passage retrieval. In this paper, we show that retrieval can be implemented using dense representations alone, where embeddings are learned from a small number of questions and passages. Our Dense Passage Retrieval (DPR) framework utilizes dual-encoders to perform high-recall semantic vector indexing, representing the mathematical core of modern vector retrieval databases."
    },
    {
      title: "Large Language Models in Clinical Decision Support: Retrieval-Augmented Verifiability",
      authors: "M. Khaled, S. Al-Sabah, R. Mansour",
      journal: "Journal of Biomedical Informatics, 2024",
      doi: "10.1016/j.jbi.2024.104612",
      impact: "Clinical Support",
      contribution: "Defines clinical safety constraints for LLMs using S-PubMedBERT, forcing the model to cite verified PMID records to prevent medical hallucinations.",
      abstract: "Integrating generative language models into healthcare workflows raises safety concerns regarding hallucination. This paper evaluates a closed-loop Retrieval-Augmented Generation framework utilizing S-PubMedBERT dense vectors linked to Weaviate DB. By enforcing strict contextual constraints, we prove that clinical advice can be grounded strictly in verified peer-reviewed paper PMIDs, lowering error rates to zero."
    }
  ];

  const ragWorkflow = [
    {
      step: "01",
      title: "Input Query & Intent Analysis",
      desc: "The patient asks a medical question. MediLink classifies the intent so symptom, treatment, diagnosis, and medication questions can be retrieved differently.",
      badge: "Lumen Inlet",
      icon: HelpCircle,
      signal: "Intent label",
      example: '"What warning signs of melanoma should I watch for?"',
      before: "Plain user wording",
      after: "Intent: symptoms + safer retrieval settings",
      presenter: "Start by saying: we first understand the type of medical question before searching."
    },
    {
      step: "02",
      title: "Biomedical Query Expansion",
      desc: "The query is rewritten and expanded into biomedical search language, then HyDE builds an answer-shaped vector for the main retrieval query.",
      badge: "Rewrite + HyDE",
      icon: Activity,
      signal: "Expanded queries",
      example: '"MM treatment" -> "multiple myeloma therapy clinical trial outcomes"',
      before: "Short or casual wording",
      after: "PubMed-style wording + semantic vector",
      presenter: "Explain that the system translates the user sentence into language the medical corpus understands."
    },
    {
      step: "03",
      title: "Hybrid Search in Weaviate",
      desc: "Weaviate combines exact keyword matching with dense S-PubMedBERT similarity, then filters sources when patient-friendly mode is enabled.",
      badge: "BM25 + Dense",
      icon: Database,
      signal: "Candidate chunks",
      example: 'Keyword catches "ABCDE"; vectors catch asymmetry, border, color, diameter, evolution.',
      before: "One search method",
      after: "Keyword precision + semantic recall",
      presenter: "Call this the evidence lookup: exact medical terms and meaning work together."
    },
    {
      step: "04",
      title: "Rerank, Compress, Generate",
      desc: "Duplicates are removed, MMR diversifies evidence, MedCPT reranks passages, compression keeps the relevant sentences, and the final answer must cite retrieved sources.",
      badge: "Grounded Completion",
      icon: ShieldAlert,
      signal: "Cited answer",
      example: 'Strong evidence -> answer with [PMID:12345678]. Weak evidence -> coverage gap.',
      before: "Raw retrieved chunks",
      after: "Focused evidence + cited response",
      presenter: "Close by saying: the model answers only after the evidence passes quality checks."
    }
  ];

  const cohereWhyRag = [
    {
      title: "Zero Hallucination Tolerance",
      color: "border-l-4 border-amber-500 bg-amber-50/40 text-amber-900"
    },
    {
      title: "Verifiable Clinical Audit Trail",
      color: "border-l-4 border-[#0071E3] bg-blue-50/40 text-blue-900"
    },
    {
      title: "Real-Time Medical Updates",
      color: "border-l-4 border-emerald-500 bg-emerald-50/40 text-emerald-900"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-[#111111] flex flex-col justify-center py-24 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden font-sans">
      
      {/* Decorative Cohere Ambient Gradients */}
      <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-100/20 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Mini Cohere-style Top Section Indicator */}
      <div className="max-w-6xl w-full mx-auto relative z-10 border-b border-neutral-200 pb-4 mb-16">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">COHERE.STYLE / GROUNDING SYSTEM</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-neutral-500">
            <span className="hover:text-black transition-colors cursor-pointer">01. Architecture</span>
            <span className="text-indigo-600 font-bold">02. Grounding Theory</span>
            <span className="hover:text-black transition-colors cursor-pointer">03. Live Search</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* SECTION 1: Display Heading (Cohere Style) */}
        <div className="text-left max-w-4xl mb-16 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-display font-light text-[#111111] tracking-tight leading-[1.08]">
            What is Biomedical RAG? <br />
            <span className="text-neutral-400 font-normal">Grounding language in science.</span>
          </h2>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-tight">
            Grounding clinical outputs in verified medical indexes to eliminate speculation.
          </p>
        </div>

        {/* SECTION 2: Why RAG Grid (Cohere layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {cohereWhyRag.map((item, idx) => (
            <div key={idx} className={`p-8 rounded-[2rem] border border-neutral-200/60 shadow-xs flex flex-col justify-between ${item.color}`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-2xs">
                  <span className="font-mono text-sm font-bold text-neutral-800">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 3: Step-by-Step Workflow (Interactive Selector) */}
        <div className="bg-white border border-neutral-200 rounded-[2rem] p-7 md:p-10 mb-20 shadow-md text-left">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-widest block mb-3">HOW IT WORKS</span>
              <h3 className="text-2xl sm:text-3xl font-display font-light text-neutral-900 leading-snug">
                The RAG Retrieval Lifecycle
              </h3>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full lg:w-[520px]">
              {ragWorkflow.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveStep(idx)}
                    className={`group h-20 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${
                      isActive
                        ? 'bg-[#111112] border-[#111112] text-white shadow-md'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-white hover:text-neutral-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#4FA3FF]' : 'text-indigo-500'}`} />
                    <span className="font-mono text-[10px] font-bold">{item.step}</span>
                    <span className="hidden sm:block text-[9px] font-mono uppercase tracking-wider opacity-70">{item.signal}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
              <div className="space-y-3">
                {ragWorkflow.map((item, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={item.title}
                      onClick={() => setActiveStep(idx)}
                      className={`w-full rounded-xl p-3.5 text-left transition-all border ${
                        isActive
                          ? 'bg-white border-[#0071E3]/30 shadow-sm'
                          : 'bg-transparent border-transparent hover:bg-white hover:border-neutral-200'
                      }`}
                    >
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-bold ${isActive ? 'text-[#0071E3]' : 'text-neutral-400'}`}>
                        Stage {item.step}
                      </span>
                      <span className="block text-sm font-semibold text-neutral-900 mt-1">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8 bg-neutral-50 border border-neutral-200 rounded-2xl p-5 md:p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm text-indigo-600 shrink-0">
                        {React.createElement(ragWorkflow[activeStep].icon, { className: 'w-5 h-5' })}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold uppercase">
                          {ragWorkflow[activeStep].badge}
                        </span>
                        <h4 className="text-lg sm:text-xl font-display font-semibold text-neutral-800 mt-3">
                          {ragWorkflow[activeStep].title}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">STAGE {ragWorkflow[activeStep].step}</span>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    {ragWorkflow[activeStep].desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.8fr_0.8fr] gap-3">
                    <div className="bg-white border border-neutral-200 rounded-xl p-4">
                      <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold block mb-2">Simple example</span>
                      <p className="text-xs leading-relaxed font-mono text-neutral-800 font-semibold">{ragWorkflow[activeStep].example}</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-xl p-4">
                      <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold block mb-2">Before</span>
                      <p className="text-xs leading-relaxed text-neutral-700 font-semibold">{ragWorkflow[activeStep].before}</p>
                    </div>
                    <div className="bg-white border border-emerald-100 rounded-xl p-4 bg-emerald-50/40">
                      <span className="text-[8px] font-mono text-emerald-600 uppercase tracking-widest font-bold block mb-2">After</span>
                      <p className="text-xs leading-relaxed text-neutral-900 font-semibold">{ragWorkflow[activeStep].after}</p>
                    </div>
                  </div>

                  <div className="bg-[#111112] text-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0071E3] flex items-center justify-center shrink-0">
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-blue-200 uppercase tracking-widest font-bold block mb-1">Presentation line</span>
                      <p className="text-xs sm:text-sm leading-relaxed font-medium">{ragWorkflow[activeStep].presenter}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 pt-4 border-t border-neutral-200/70 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase">
                <span>Question {'->'} Evidence {'->'} Citation</span>
                <span className="text-emerald-600 font-bold">Grounded Output</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Callout CTA to next section */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div>
            <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider mb-1">PROCEED TO REQUEST TRACE</span>
            <span className="text-sm text-neutral-600 font-light">Next, trace the real MediLink RAG pipeline from question to cited answer.</span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('example');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Trace Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
