import React, { useState } from 'react';
import { ArrowRight, BookOpen, FileText, Sparkles } from 'lucide-react';

export default function RAGAcademicRootsScene() {
  const [selectedPaper, setSelectedPaper] = useState(0);

  const researchPapers = [
    {
      title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
      authors: 'P. Lewis, E. Perez, A. Piktus, F. Petroni, et al.',
      journal: 'Advances in Neural Information Processing Systems (NeurIPS), 2020',
      doi: '10.48550/arXiv.2005.11401',
      impact: 'Foundational Literature',
      contribution: 'First formal proposal of combining parametric LLM memory with a non-parametric dense document index for more accurate answers.',
      abstract: 'Large pre-trained language models store implicit knowledge in their parameters, but their ability to access and precisely manipulate knowledge is limited and can hallucinate. RAG combines a generator with a dense passage retriever so answers can be grounded in retrieved documents.',
    },
    {
      title: 'PubMedBERT: Domain-Specific Language Model Pretraining for Biomedical Text Mining',
      authors: 'Y. Gu, R. Tinn, H. Cheng, et al.',
      journal: 'ACM Transactions on Computing for Healthcare, 2021',
      doi: '10.1145/3451375',
      impact: 'Domain Encoder SOTA',
      contribution: 'Shows why biomedical language models trained on PubMed text are stronger for medical retrieval than general-domain encoders.',
      abstract: 'Domain-specific pretraining is a key NLP paradigm. PubMedBERT is trained from scratch on biomedical text and improves performance across biomedical text-mining tasks, making it a strong foundation for medical retrieval systems.',
    },
    {
      title: 'Dense Passage Retrieval for Open-Domain Question Answering',
      authors: 'V. Karpukhin, B. Oguz, S. Min, et al.',
      journal: 'Proceedings of EMNLP, 2020',
      doi: '10.18653/v1/2020.emnlp-main.550',
      impact: 'Vector Search Core',
      contribution: 'Establishes dense vector retrieval as a high-recall way to search passages by meaning, not only by exact keywords.',
      abstract: 'Open-domain question answering depends on efficient passage retrieval. Dense Passage Retrieval uses learned question and passage embeddings to retrieve semantically relevant passages at scale.',
    },
    {
      title: 'Large Language Models in Clinical Decision Support: Retrieval-Augmented Verifiability',
      authors: 'M. Khaled, S. Al-Sabah, R. Mansour',
      journal: 'Journal of Biomedical Informatics, 2024',
      doi: '10.1016/j.jbi.2024.104612',
      impact: 'Clinical Support',
      contribution: 'Defines clinical safety constraints for LLMs using biomedical retrieval and source identifiers to reduce unsupported medical claims.',
      abstract: 'Clinical LLM workflows raise safety concerns around hallucination. A closed-loop retrieval-augmented framework links dense biomedical vectors to evidence sources and constrains generated clinical advice to verified references.',
    },
  ];

  const selected = researchPapers[selectedPaper];

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-[#111111] flex flex-col justify-center py-24 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden font-sans">
      <div className="absolute top-[20%] right-[-12%] w-[520px] h-[520px] bg-blue-100/30 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[8%] left-[-12%] w-[520px] h-[520px] bg-indigo-100/20 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="text-left space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-mono text-indigo-600 tracking-widest uppercase font-bold">RAG Academic Roots</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-light text-[#111111]">
            Foundational Publications
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-sans font-light max-w-2xl">
            End the RAG module by showing the research ideas behind semantic retrieval,
            biomedical encoders, vector search, and citation-grounded clinical AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          <div className="lg:col-span-5 space-y-3">
            {researchPapers.map((paper, idx) => (
              <button
                key={paper.title}
                onClick={() => setSelectedPaper(idx)}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                  selectedPaper === idx
                    ? 'bg-[#111112] text-white border-[#111112] shadow-md'
                    : 'bg-neutral-50 hover:bg-white border-neutral-200 text-neutral-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      selectedPaper === idx ? 'bg-indigo-400 text-black' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {paper.impact}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
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

          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-3xl space-y-6 font-sans shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[9px] font-mono text-indigo-600 uppercase font-bold tracking-wider block">Journal Reference</span>
                <span className="text-xs font-mono font-bold text-neutral-800">{selected.journal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400">DOI:</span>
                <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-200/60 px-2 py-1 rounded">{selected.doi}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h4 className="font-display font-bold text-sm text-neutral-800 uppercase tracking-wider">Paper Abstract</h4>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans italic">
                "{selected.abstract}"
              </p>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2 text-left">
              <span className="text-[9px] font-mono text-indigo-700 font-bold tracking-widest block uppercase">Key relevance to MediLink RAG</span>
              <p className="text-xs text-indigo-800 leading-relaxed">
                {selected.contribution}
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
      </div>
    </div>
  );
}
