import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function QualityGateScene() {
  const [activeStep, setActiveStep] = useState(0);

  const rawOutputs = [
    { text: 'HTAN: Margin outline 1.4mm coordinates', valid: true, description: 'Spatial binary contour array', category: 'Vision' },
    { text: 'RAG: Pubmed citation on Nevus cells (PMID:349)', valid: true, description: 'Direct peer-reviewed source match', category: 'Literature' },
    { text: 'Server host node socket footprint 512MB active', valid: false, description: 'Redundant container diagnostic telemetry', category: 'Internal Log' },
    { text: 'Random comments from general health forums', valid: false, description: 'Unscientific unverified public inputs', category: 'Web Noise' }
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-emerald-50/30 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[450px] h-[450px] bg-[#0071E3]/2 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core clinical philosophy of context protection */}
          <div className="lg:col-span-4 text-left space-y-8">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3.5"
              >
                CONTEXT INTEGRITY BUFFER
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.12] mb-6"
              >
                The models can help. <br />
                <span className="text-[#86868B] font-normal">They shouldn't poison.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#424245] text-sm leading-relaxed font-sans font-light"
              >
                Retrieval nodes and vision models can occasionally generate auxiliary telemetry, memory metrics, or ungrounded comments. To seal the genAI synthesizers from hallucinations, all pipeline payloads pass through a deterministic validation gate before reaching Claude.
              </motion.p>
            </div>

            {/* Structured validation rule cards */}
            <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-[#D2D2D7]/40 space-y-4">
              <span className="text-[9px] font-mono text-[#86868B] uppercase tracking-widest font-bold block">SAFETY REJECTION LAWS</span>
              
              <div className="space-y-3 text-xs text-[#424245]">
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#0071E3] font-bold">•</span>
                  <span><strong>Embeddings Filter:</strong> Strip all items scoring under 0.70 cosine similarity.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#0071E3] font-bold">•</span>
                  <span><strong>Format Cleanse:</strong> Purge raw GPU memory registries and nested coordinates.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#0071E3] font-bold">•</span>
                  <span><strong>Anonymizer Layer:</strong> Scrub names, IP records, or identifiers (HIPAA compliant).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual safety checkpoint sandbox */}
          <div className="lg:col-span-8 bg-[#FAF9FB] border border-[#D2D2D7]/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
            
            <div className="flex justify-between items-center pb-4 border-b border-[#D2D2D7]/20 mb-6">
              <span className="text-[10px] font-mono text-[#86868B] tracking-wider font-bold">LUMEN PIPELINE ISOLATOR WORKBENCH</span>
              <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Gate Secured</span>
              </span>
            </div>

            {/* Dynamic Sandbox stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch min-h-[300px]">
              
              {/* Left Column: Raw unstructured payloads */}
              <div className="md:col-span-4 space-y-2 border border-[#D2D2D7]/30 p-4 rounded-2xl bg-white shadow-inner">
                <span className="text-[9px] font-mono text-[#86868B] block uppercase font-bold tracking-wider mb-2">RAW PAYLOAD INPUTS</span>
                
                <div className="space-y-2.5">
                  {rawOutputs.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-[#F5F5F7] border border-neutral-100 rounded-xl text-[10px] text-[#424245] font-mono text-left leading-relaxed relative overflow-hidden"
                    >
                      <span className="text-[8px] font-bold text-neutral-400 uppercase block mb-1">{item.category}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Column: Gate action card */}
              <div className="md:col-span-4 flex flex-col justify-center items-center p-5 border border-[#D2D2D7]/40 rounded-2xl bg-white space-y-4 shadow-sm text-center">
                <div className={`p-3 rounded-full transition-all duration-500 ${
                  activeStep === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-[#0071E3]'
                }`}>
                  {activeStep === 1 ? (
                    <ShieldCheck className="w-8 h-8" />
                  ) : (
                    <ShieldAlert className="w-8 h-8" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#1D1D1F]">Quality Isolation Gate</h4>
                  <p className="text-[10px] text-[#86868B] mt-1 font-sans leading-relaxed">
                    Evaluates metadata structures, rejects unverified or noisy telemetry datasets.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-neutral-100" />

                <button
                  onClick={() => setActiveStep(activeStep === 0 ? 1 : 0)}
                  className={`w-full py-2.5 font-mono text-2xs rounded-lg font-bold transition-all ${
                    activeStep === 1 
                      ? 'bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800' 
                      : 'bg-[#0071E3] text-white hover:bg-[#147CE5]'
                  }`}
                >
                  {activeStep === 0 ? 'ACTIVATE SAFETY FILTER' : 'RESET EXPERIMENT'}
                </button>
              </div>

              {/* Right Column: Cleaned payload output */}
              <div className="md:col-span-4 space-y-2 border border-[#D2D2D7]/30 p-4 rounded-2xl bg-white shadow-inner flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-[#86868B] block uppercase font-bold tracking-wider mb-2">FORWARDED DATA PACKS</span>
                  
                  <div className="space-y-2.5">
                    {rawOutputs.map((item, idx) => {
                      const filterFired = activeStep === 1;
                      const isApproved = item.valid;

                      return (
                        <div 
                          key={idx}
                          className={`p-3 rounded-xl text-[10px] font-mono text-left transition-all duration-500 overflow-hidden ${
                            filterFired 
                              ? isApproved 
                                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 scale-100 opacity-100' 
                                : 'bg-rose-50 border border-rose-100 text-rose-500 scale-95 opacity-20' 
                              : 'bg-[#F5F5F7] border border-transparent text-[#86868B] scale-100 opacity-100'
                          }`}
                        >
                          <div className="font-semibold truncate">{item.text}</div>
                          {filterFired && (
                            <span className={`block text-[8px] font-sans mt-1.5 ${isApproved ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-medium'}`}>
                              {isApproved ? '✓ Forwarded to Synthesizer' : '✗ Security Filter Blocked'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {activeStep === 1 && (
                  <div className="text-[9.5px] font-mono text-emerald-600 font-bold bg-emerald-50/25 p-2 rounded border border-emerald-200/30 text-center animate-fade-in mt-2 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Context perfectly pristine</span>
                  </div>
                )}
              </div>

            </div>

            <span className="block text-center text-[9px] font-mono text-[#86868B] uppercase tracking-widest mt-6">
              Ensuring medical advisory generation remains strictly anchored in scientific papers
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
