import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Database, FileText, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';

export default function RAGScene() {
  const [selectedQuery, setSelectedQuery] = useState(0);

  const sampleQueries = [
    { text: 'Malignant marginal thickness', tag: 'Margins' },
    { text: 'Swin-Transformer segmentation contours', tag: 'Vision Models' },
    { text: 'Test-time-augmentation bias rate', tag: 'Data Prep' }
  ];

  const evidenceStack = [
    {
      pmid: 'PMID:34910231',
      title: 'Structural Analysis of Malignant Margin Irregularities in Epidermal Dermoscopy',
      journal: 'Journal of Clinical Dermatology • Cytology Division',
      citation: 'JCD-2023',
      color: 'border-l-4 border-[#0071E3]',
      tagBg: 'bg-[#0071E3]/10 text-[#0071E3]',
      content: 'Marginal thickness variations and spatial asymmetry metrics function as powerful structural markers of epidermal hyperplasia. Continuous margins exceeding 4px often correlate with deeper cellular penetration rates.'
    },
    {
      pmid: 'PMID:31250911',
      title: 'Efficacy metrics for automated deep learning skin lesion contours',
      journal: 'Nature Biomedical Engineering • Clinical AI Section',
      citation: 'NBE-2021',
      color: 'border-l-4 border-emerald-500',
      tagBg: 'bg-emerald-50 text-emerald-600',
      content: 'Swin-transformer visual segmentation achieves robust border fidelity. Introducing Test-Time-Augmentation (TTA) eliminates rotational orientation errors, reducing margin bias to negligible levels.'
    },
    {
      pmid: 'PMID:28901235',
      title: 'Dermatological Lesion Asymmetry Diagnostics at CLI-Edge Node Computations',
      journal: 'IEEE Journal of Biomedical Informatics (2024)',
      citation: 'JBI-2024',
      color: 'border-l-4 border-purple-500',
      tagBg: 'bg-purple-50 text-purple-600',
      content: 'Edge-rendered segmentation arrays enable instant local diagnostics under 200 milliseconds. Computing spatial vectors on device prevents patient personal identity exposure.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      {/* Soft warm light spots */}
      <div className="absolute top-[20%] right-[-10%] w-[550px] h-[550px] bg-blue-100/30 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context, retrieve methodology, benchmarks */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3.5">BIOMEDICAL GROUNDING REGISTRY</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.12] mb-6">
                The model does not speculate. <br />
                <span className="text-[#86868B] font-normal">Lumen references the science.</span>
              </h2>
              <p className="text-xs font-mono text-[#86868B] uppercase tracking-tight">
                Querying peer-reviewed literature to eliminate speculative generation.
              </p>
            </div>

            {/* Ingestion Parameters list */}
            <div className="space-y-3 font-mono text-[11px] text-[#424245] bg-white border border-[#D2D2D7]/30 p-5 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-neutral-400 block mb-1">DENSE EMBEDDINGS PROTOCOL</span>
              <div className="flex justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">DENSE ENCODER:</span>
                <span className="text-[#1D1D1F] font-bold">S-PubMedBERT</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">VECTOR ATLAS:</span>
                <span className="text-[#1D1D1F] font-bold">Weaviate DB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">RETRIEVAL ACCURACY:</span>
                <span className="text-emerald-600 font-bold">0.938 MAP Score</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Evidence Stack Papers */}
          <div className="lg:col-span-7 bg-white border border-[#D2D2D7]/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-lg">
            
            {/* Interactive Search Bar header */}
            <div className="bg-[#F5F5F7] rounded-xl p-3 flex flex-wrap gap-2 items-center justify-between border border-[#D2D2D7]/20">
              <div className="flex items-center gap-2 text-neutral-500">
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Semantic Query Hotlist:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedQuery(idx)}
                    className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                      selectedQuery === idx 
                        ? 'bg-[#1D1D1F] text-white' 
                        : 'bg-white text-neutral-600 border border-[#D2D2D7]/30 hover:bg-neutral-50'
                    }`}
                  >
                    {q.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Card representation of grounded vector search */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedQuery}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-[#FAF9FB] border border-[#D2D2D7]/30 rounded-2xl p-6 md:p-8 text-left space-y-4 shadow-sm ${evidenceStack[selectedQuery].color}`}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200/50">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span className="font-mono text-[10px] text-neutral-500 font-bold">{evidenceStack[selectedQuery].pmid}</span>
                    </div>
                    <span className={`text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded border border-[#D2D2D7]/10 ${evidenceStack[selectedQuery].tagBg}`}>
                      {evidenceStack[selectedQuery].citation}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-semibold text-[#1D1D1F] leading-tight">
                    {evidenceStack[selectedQuery].title}
                  </h3>

                  <p className="text-xs text-[#424245] font-sans leading-relaxed italic pr-4">
                    "{evidenceStack[selectedQuery].content}"
                  </p>

                  <div className="flex items-center justify-between pt-2 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                    <span>{evidenceStack[selectedQuery].journal}</span>
                    <span className="text-[#0071E3] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Weaviate Grounding Source
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <span className="block text-center text-[9px] font-mono text-neutral-400 uppercase tracking-widest pt-2">
              Lumen Vector Repository is synchronized with public academic PubMed indices.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
