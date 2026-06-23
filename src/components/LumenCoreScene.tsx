import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, BookOpen, Layers, Cpu, Play, CheckCircle, RefreshCw, Activity } from 'lucide-react';

export default function LumenCoreScene() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [runPipeline, setRunPipeline] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(-1);

  const modules = [
    {
      id: 'htan',
      icon: Eye,
      title: 'HTAN (Computer Vision)',
      label: 'IMAGE LAYER',
      color: 'border-l-4 border-blue-500',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
      neonBorder: 'group-hover:border-blue-500/30',
      activeColor: 'bg-blue-500/10 text-blue-400',
      desc: 'Hyper-connected Transformer Attention Network. Isolates bounds and contours raw lesion photos. Designed strictly for spatial segmentation without performing autonomous clinical diagnostic decisions.'
    },
    {
      id: 'rag',
      icon: BookOpen,
      title: 'Biomedical RAG',
      label: 'GROUNDING LAYER',
      color: 'border-l-4 border-emerald-500',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      neonBorder: 'group-hover:border-emerald-500/30',
      activeColor: 'bg-emerald-500/10 text-emerald-400',
      desc: 'Retrieves and integrates fact-checked medical abstracts using S-PubMedBERT, MedCPT dense representations, and local Weaviate coordinate structures, preventing predictive hallucinations.'
    },
    {
      id: 'langgraph',
      icon: Layers,
      title: 'LangGraph (Router)',
      label: 'STATEFUL ROUTING',
      color: 'border-l-4 border-amber-500',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]',
      neonBorder: 'group-hover:border-amber-500/30',
      activeColor: 'bg-amber-500/10 text-amber-400',
      desc: 'Handles pipeline state machines. Intelligently classifies conversational input intent, driving the patient query to the specific analytical tools or bypassing heavy operations entirely.'
    },
    {
      id: 'claude',
      icon: Cpu,
      title: 'Claude Sonnet Synthesis',
      label: 'EXPLAINER LAYER',
      color: 'border-l-4 border-purple-500',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
      neonBorder: 'group-hover:border-purple-500/30',
      activeColor: 'bg-purple-500/10 text-purple-400',
      desc: 'Translates raw segmented details, verified literature quotations, and context logs into a clear, patient-friendly consult summary that avoids dry jargon.'
    }
  ];

  // Simulator flow running sequence
  const startSimulation = () => {
    setRunPipeline(true);
    setPipelineStep(0);
    
    // Stagger step activations representation
    const intervals = [1000, 2200, 3400, 4600];
    intervals.forEach((time, index) => {
      setTimeout(() => {
        setPipelineStep((prev) => index);
        if (index === 3) {
          setTimeout(() => {
            setPipelineStep(4); // Fully complete representation
          }, 1200);
        }
      }, time);
    });
  };

  const resetSimulation = () => {
    setRunPipeline(false);
    setPipelineStep(-1);
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-24 px-6 md:px-12 select-none border-b border-white/5 overflow-hidden">
      {/* Background neon lines representation */}
      <div className="absolute top-[30%] left-[25%] w-[600px] h-[300px] bg-sky-500/[0.015] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Dynamic header stage layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8 text-left">
            <span className="text-[10px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3">LUMEN ARCHITECTURE MODULE</span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.15] mb-5">
              Lumen is not a model. <br />
              <span className="text-neutral-500 font-normal">It is a multi-layer clinical ecosystem.</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans max-w-2xl">
              Underneath standard conversational interfaces exist several safety-audited execution layers. We delegate operations cleanly across four optimized domains to build high-performance medical technology.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            {/* Interactive pipeline runner */}
            {!runPipeline ? (
              <button
                onClick={startSimulation}
                className="group flex items-center gap-2 px-5 py-3 bg-[#0071E3] hover:bg-[#147CE5] text-white font-mono text-xs font-bold rounded-full transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
                <span>SIMULATE DATA PASS</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-4 py-2 bg-neutral-900 border border-white/10 rounded-full text-xs text-[#0071E3] font-mono">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>
                    {pipelineStep === 4 ? 'Analysis Done' : `Step ${pipelineStep + 1}/4 Running`}
                  </span>
                </div>
                <button
                  onClick={resetSimulation}
                  className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-full transition-all"
                  title="Reset Sandbox"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2x2 Interactive Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            const isHovered = activeModule === mod.id;
            const isSimulatedActive = runPipeline && pipelineStep >= index;
            const isSimulatedCurrent = runPipeline && pipelineStep === index;
            
            return (
              <div 
                key={mod.id}
                onMouseEnter={() => setActiveModule(mod.id)}
                onMouseLeave={() => setActiveModule(null)}
                className={`group relative bg-[#111112] border rounded-3xl p-8 flex flex-col justify-between min-h-[240px] transition-all duration-300 ${mod.color} ${
                  isSimulatedCurrent 
                    ? 'border-white bg-[#1C1C1E]' 
                    : isSimulatedActive
                      ? 'border-white/20 bg-neutral-900/40'
                      : isHovered
                        ? `border-white/25 bg-[#161618] ${mod.glow}` 
                        : 'border-white/5 bg-[#111112]'
                }`}
                id={`tech-tile-${mod.id}`}
              >
                {/* Backdrop ambient color flare during interaction */}
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-white/[0.015] to-transparent`} />

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase font-bold">{mod.label}</span>
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isSimulatedCurrent 
                        ? mod.activeColor 
                        : isSimulatedActive
                          ? 'text-neutral-300 bg-neutral-800'
                          : 'text-neutral-400 bg-neutral-900 group-hover:text-white'
                    }`}>
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-display font-medium text-neutral-200 mb-3 group-hover:text-white transition-colors">
                    {mod.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    {mod.desc}
                  </p>
                </div>

                {/* Simulated Signal Progress Bar */}
                {runPipeline && (
                  <div className="mt-6 w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isSimulatedCurrent ? '100%' : isSimulatedActive ? '100%' : '0%' 
                      }}
                      transition={{ duration: isSimulatedCurrent ? 1 : 0.2 }}
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-emerald-500' :
                        index === 2 ? 'bg-amber-500' : 'bg-purple-500'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Global check states */}
        <AnimatePresence>
          {pipelineStep === 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs font-mono uppercase"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Pipeline Pass test completed: HTAN margin logs validated, PubMed dense citation matched, token generated safely.</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
