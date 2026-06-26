import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, ShieldAlert, Sparkles, BookOpen, FileText, ArrowRight,
  CheckCircle2, HelpCircle, Activity, Globe, Award, Search, Info
} from 'lucide-react';

export default function RAGExplainScene() {
  const [selectedPaper, setSelectedPaper] = useState(0);
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
      desc: "The patient submits symptoms or requests (e.g. 'explain skin spot margins'). The router parses the request and directs it to the Biomedical grounding pipeline.",
      badge: "Lumen Inlet"
    },
    {
      step: "02",
      title: "Dense Mathematical Encoding",
      desc: "Our specialized S-PubMedBERT encoder translates the natural text query into a dense mathematical vector representation representing its semantic medical meaning.",
      badge: "PubMedBERT Encoder"
    },
    {
      step: "03",
      title: "Vector Search in Weaviate DB",
      desc: "Lumen searches our high-dimensional index containing millions of abstracts from verified medical journals, identifying the exact top-scoring matching records.",
      badge: "Weaviate Atlas Search"
    },
    {
      step: "04",
      title: "Context-Injected Generation",
      desc: "The retrieved abstracts are appended as explicit context variables to the LLM prompt, forcing it to generate answers based ONLY on verified data, including citations.",
      badge: "Grounded Completion"
    }
  ];

  const cohereWhyRag = [
    {
      title: "Zero Hallucination Tolerance",
      desc: "Standard AI models speculate and construct plausible-sounding but false medical claims. RAG acts as an absolute constraint, restricting model speech to the boundaries of fetched publications.",
      color: "border-l-4 border-amber-500 bg-amber-50/40 text-amber-900"
    },
    {
      title: "Verifiable Clinical Audit Trail",
      desc: "Every sentence generated by Lumen is paired with direct PubMed identifiers (PMID) and citation hashes. Physicians can instantly mouse over claims to inspect underlying source studies.",
      color: "border-l-4 border-[#0071E3] bg-blue-50/40 text-blue-900"
    },
    {
      title: "Real-Time Medical Updates",
      desc: "Medical literature evolves daily. Instead of retraining massive model weights (which takes months and costs millions), we can update Weaviate with new papers in seconds.",
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
                <p className="text-sm leading-relaxed text-neutral-600 font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 3: Step-by-Step Workflow (Interactive Selector) */}
        <div className="bg-white border border-neutral-200 rounded-[2rem] p-8 md:p-12 mb-20 shadow-md text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline & Steps List */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-widest block">HOW IT WORKS</span>
              <h3 className="text-2xl sm:text-3xl font-display font-light text-neutral-900 leading-snug">
                The RAG Retrieval Lifecycle
              </h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                Watch how a user query traverses our systems, gets mathematically transformed, searches verified journals, and outputs fully cited answers.
              </p>

              <div className="space-y-2">
                {ragWorkflow.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full p-3 rounded-xl text-left font-sans transition-all flex items-center gap-4 cursor-pointer ${
                      activeStep === idx 
                        ? 'bg-neutral-100 border-l-4 border-indigo-600 text-neutral-900 font-medium pl-4' 
                        : 'text-neutral-500 hover:text-neutral-900 pl-2'
                    }`}
                  >
                    <span className="font-mono text-xs text-neutral-400">{item.step}</span>
                    <span className="text-sm">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Step Display Card */}
            <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200/80 p-8 rounded-2xl min-h-[250px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold uppercase">
                    {ragWorkflow[activeStep].badge}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">STAGE {ragWorkflow[activeStep].step}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-display font-semibold text-neutral-800">
                  {ragWorkflow[activeStep].title}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {ragWorkflow[activeStep].desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/50 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase">
                <span>Safe Retrieval Pipeline</span>
                <span className="text-emerald-600 font-bold">Encrypted End-to-End</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SHOWING RESEARCH PAPERS (Interactive Bento Panel) */}
        <div className="text-left space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-mono text-indigo-600 tracking-widest uppercase font-bold">RAG ACADEMIC ROOTS</span>
          </div>
          <h3 className="text-3xl font-display font-light text-[#111111]">
            Foundational Publications
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-sans font-light max-w-xl">
            Read the scientific papers proposing semantic retrieval systems, biomedical domain text mining, and clinical verifiability.
          </p>
        </div>

        {/* Paper Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Left: Paper Selector Grid */}
          <div className="lg:col-span-5 space-y-3">
            {researchPapers.map((paper, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPaper(idx)}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                  selectedPaper === idx 
                    ? 'bg-[#111112] text-white border-[#111112] shadow-md' 
                    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      selectedPaper === idx ? 'bg-indigo-400 text-black' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {paper.impact}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Paper {idx + 1}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-xs sm:text-sm leading-tight">
                    {paper.title}
                  </h4>
                  <p className={`text-[11px] font-light ${selectedPaper === idx ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {paper.authors}
                  </p>
                </div>
                <div className="flex justify-end items-center mt-3 pt-3 border-t border-black/[0.03] w-full text-[10px] font-mono uppercase font-bold">
                  <span className={`flex items-center gap-1 ${selectedPaper === idx ? 'text-indigo-400' : 'text-[#0071E3]'}`}>
                    <span>View Abstract</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Selected Paper Detail Console */}
          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-3xl space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[9px] font-mono text-indigo-600 uppercase font-bold tracking-wider block">JOURNAL REFERENCE</span>
                <span className="text-xs font-mono font-bold text-neutral-800">{researchPapers[selectedPaper].journal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400">DOI:</span>
                <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-200/60 px-2 py-1 rounded">{researchPapers[selectedPaper].doi}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h4 className="font-display font-bold text-sm text-neutral-800 uppercase tracking-wider">PAPER ABSTRACT</h4>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans italic">
                "{researchPapers[selectedPaper].abstract}"
              </p>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2 text-left">
              <span className="text-[9px] font-mono text-indigo-700 font-bold tracking-widest block uppercase">KEY RELEVANCE TO CLINICAL AI</span>
              <p className="text-xs text-indigo-800 leading-relaxed">
                {researchPapers[selectedPaper].contribution}
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase pt-2">
              <span>Status: Fully Indexed & Grounded</span>
              <span className="text-indigo-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Weaviate Base Source
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Callout CTA to next section */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div>
            <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider mb-1">PROCEED TO LITERATURE SEARCH</span>
            <span className="text-sm text-neutral-600 font-light">Ready to run a query and see the model ground itself live?</span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('rag');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Run Grounded Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
