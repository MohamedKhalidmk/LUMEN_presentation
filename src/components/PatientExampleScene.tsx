import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Eye, Search, ShieldCheck, Mail, ArrowRight, Clock, Sparkles } from 'lucide-react';

export default function PatientExampleScene() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '01. Patient Query Input',
      sub: 'MediLink App Entry',
      latency: '0ms',
      icon: Mail,
      color: 'bg-blue-50 text-[#0071E3] border-blue-100',
      desc: 'The patient loads the MediLink app, inputs conversational symptom queries with raw skin imagery, and initiates high-speed edge secure packaging.',
      output: 'Raw Input: Encoded photo payload + colloquial query text'
    },
    {
      id: 1,
      title: '02. Dual Route Selection',
      sub: 'LangGraph State Classification',
      latency: '24ms',
      icon: Network,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      desc: 'Lumen LangGraph checks query intent at the API gateway, identifies dermatological triggers, schedules GPU resources, and isolates medical tasks.',
      output: 'Route selected: Redirect to Swin-T & Weaviate Index'
    },
    {
      id: 2,
      title: '03. Visual Lesion Analysis',
      sub: 'HTAN Segmentation GPU Cluster',
      latency: '180ms',
      icon: Eye,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      desc: 'The multi-scale vision model isolated continuous boundary margins on the skin photograph using Test-Time-Augmentation to omit rotational bias.',
      output: 'Spatial Vectors: Binary contour array generated successfully'
    },
    {
      id: 3,
      title: '04. dense Fact Matching',
      sub: 'PubMedBERT Literature RAG',
      latency: '90ms',
      icon: Search,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      desc: 'The database searches millions of verified academic abstracts in real-time, fetching peer-reviewed grounding files on the identified margin shapes.',
      output: 'Grounded: PMID:34910231 citation inserted into context chain'
    },
    {
      id: 4,
      title: '05. Final Safety Cleanse',
      sub: 'Quality Gate Filtering',
      latency: '20ms',
      icon: ShieldCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      desc: 'All auxiliary metrics, redundant coordinates, and noisy general web forum claims are purged to secure synthesis from hallucinations.',
      output: 'Cleared: Secured medical context forwarded to Claude Sonnet'
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      
      {/* Visual background spot */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-50/40 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Explanatory Header */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3.5">END-TO-END PATIENT SIMULATOR</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.12] mb-6">
                Trace the request. <br />
                <span className="text-[#86868B] font-normal">From phone to specialist.</span>
              </h2>
              <p className="text-[#424245] text-sm leading-relaxed font-sans font-light">
                This end-to-end dashboard maps the medical data payload at each point in the Lumen process. Notice how the user query is safely processed, structured, matched with evidence, and cleansed.
              </p>
            </div>

            {/* Quick Controllers */}
            <div className="space-y-3.5">
              <span className="text-[9px] font-mono text-[#86868B] block uppercase tracking-wider font-bold">CHOOSE ACTIVE PIPELINE SEGMENT</span>
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
                    0{st.id + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage with Card Detail */}
          <div className="lg:col-span-7 bg-[#FAF9FB] border border-[#D2D2D7]/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[440px] shadow-lg">
            
            {/* Header telemetry info */}
            <div className="flex justify-between items-center border-b border-neutral-200/50 pb-4 mb-6">
              <span className="text-[10px] font-mono text-[#86868B] tracking-wider font-bold">LUMEN CORE GRAPH PIPESTEP CONSOLE</span>
              <div className="flex gap-2 items-center font-mono text-[#0071E3] font-bold text-xs bg-blue-50/60 px-3 py-1.5 rounded-full border border-blue-100">
                <Clock className="w-3.5 h-3.5" />
                <span>CUMULATIVE STACK TIME:</span>
                <span>{steps.slice(0, activeStep + 1).reduce((acc, st) => acc + parseInt(st.latency), 0)}ms</span>
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
                STAGE {activeStep + 1} OF 5 TRACED
              </span>
              <button
                onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                className="px-5 py-2.5 bg-[#1D1D1F] hover:bg-neutral-800 text-white text-xs font-mono rounded-xl transition-colors flex items-center gap-1.5 font-bold shadow-sm"
              >
                <span>NEXT PIPESTEP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
