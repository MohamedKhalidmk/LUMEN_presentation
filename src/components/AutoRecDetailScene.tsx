import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, ChevronRight, Cpu, Sparkles, Brain, 
  Activity, Layers, Stethoscope, ArrowRight, Pill, User
} from 'lucide-react';

type NeoColor = 'citrus' | 'ocean' | 'teal' | 'silver';

export default function AutoRecDetailScene() {
  // Color mode inspired by MacBook Neo colors
  const [selectedColor, setSelectedColor] = useState<NeoColor>('citrus');
  
  // Interactive slide index for the mock screen presentation
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideProgressRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      title: "Symptom Multi-Vector Parsing",
      subtitle: "Parsing raw clinical notes into dense NLP embeddings",
      description: "Our neural layer extracts patient-reported symptom arrays, mapping severity, anatomy, and urgency into high-dimensional vector embeddings within 14ms.",
      color: "from-amber-400 to-lime-400",
      icon: <Brain className="w-5 h-5 text-lime-400" />
    },
    {
      title: "Latent Collaborative Matrix",
      subtitle: "Filling consultation gaps via deep autoencoders",
      description: "AutoRec bypasses the cold-start problem by predicting affinity indexes across the entire practitioner index, projecting patients with similar histories onto overlapping clusters.",
      color: "from-sky-400 to-blue-500",
      icon: <Cpu className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Real-time Affinity Fusion",
      subtitle: "Synthesizing history, proximity, and availability",
      description: "The final prediction layer scores each practitioner, applying real-time proximity rules and consulting history matches to render optimal matches instantly.",
      color: "from-teal-400 to-emerald-500",
      icon: <Sparkles className="w-5 h-5 text-teal-400" />
    }
  ];

  // Auto-play interval for slides
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const scrollToNextSection = () => {
    const el = document.getElementById('records-reveal-root');
    if (!el) {
      // Fallback if ID is records_intro
      const altEl = document.getElementById('records_intro');
      if (altEl) altEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get current color palette styles
  const getColorStyles = (color: NeoColor) => {
    switch (color) {
      case 'citrus':
        return {
          bgAccent: 'bg-[#A3E635]', // Lime-400
          textAccent: 'text-[#84CC16]',
          gradient: 'from-[#A3E635] via-[#84CC16] to-[#4D7C0F]',
          glow: 'rgba(163,230,53,0.15)',
          circle: 'fill-[#A3E635] drop-shadow-[0_0_8px_#A3E635]',
          primaryNode: 'border-lime-500/40 bg-lime-950/20 text-lime-400'
        };
      case 'ocean':
        return {
          bgAccent: 'bg-[#0EA5E9]', // Sky-500
          textAccent: 'text-[#0284C7]',
          gradient: 'from-[#38BDF8] via-[#0EA5E9] to-[#0369A1]',
          glow: 'rgba(14,165,233,0.15)',
          circle: 'fill-[#0EA5E9] drop-shadow-[0_0_8px_#0EA5E9]',
          primaryNode: 'border-sky-500/40 bg-sky-950/20 text-sky-400'
        };
      case 'teal':
        return {
          bgAccent: 'bg-[#14B8A6]', // Teal-500
          textAccent: 'text-[#0D9488]',
          gradient: 'from-[#2DD4BF] via-[#14B8A6] to-[#0F766E]',
          glow: 'rgba(20,184,166,0.15)',
          circle: 'fill-[#14B8A6] drop-shadow-[0_0_8px_#14B8A6]',
          primaryNode: 'border-teal-500/40 bg-teal-950/20 text-teal-400'
        };
      case 'silver':
        return {
          bgAccent: 'bg-[#E2E8F0]', // Slate-200
          textAccent: 'text-[#94A3B8]',
          gradient: 'from-[#F1F5F9] via-[#CBD5E1] to-[#64748B]',
          glow: 'rgba(226,232,240,0.15)',
          circle: 'fill-[#E2E8F0] drop-shadow-[0_0_8px_#E2E8F0]',
          primaryNode: 'border-slate-400/40 bg-slate-950/20 text-slate-300'
        };
    }
  };

  const currentStyles = getColorStyles(selectedColor);

  return (
    <section className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none overflow-hidden border-b border-[#D2D2D7]/50" id="autorec-detail-root">
      
      {/* Dynamic ambient backlights based on color theme */}
      <div 
        className="absolute top-[25%] left-[15%] w-[500px] h-[500px] rounded-full filter blur-[150px] pointer-events-none transition-all duration-1000 ease-in-out" 
        style={{ 
          backgroundColor: selectedColor === 'citrus' ? 'rgba(163,230,53,0.06)' : 
                           selectedColor === 'ocean' ? 'rgba(14,165,233,0.06)' : 
                           selectedColor === 'teal' ? 'rgba(20,184,166,0.06)' : 
                           'rgba(226,232,240,0.06)' 
        }} 
      />
      <div 
        className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full filter blur-[130px] pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundColor: selectedColor === 'citrus' ? 'rgba(77,124,15,0.04)' : 
                           selectedColor === 'ocean' ? 'rgba(3,105,161,0.04)' : 
                           selectedColor === 'teal' ? 'rgba(15,118,110,0.04)' : 
                           'rgba(100,116,139,0.04)' 
        }} 
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Apple Style Top Header Block */}
        <div className="text-center mb-10 max-w-3xl space-y-3">
          <span className="text-[11px] font-mono text-neutral-500 tracking-[0.22em] uppercase font-bold block">
            AutoRec Intelligence
          </span>
          
          <h2 className="text-5xl sm:text-7xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05]">
            Hello, <span className={`font-semibold bg-gradient-to-r ${currentStyles.gradient} bg-clip-text text-transparent transition-all duration-700`}>AutoRec.</span>
          </h2>

          <p className="text-xs font-mono text-[#86868B] uppercase tracking-tight">
            Deep neural matchmaking projecting symptoms to treatment plans.
          </p>

          <div className="pt-2 flex justify-center">
            <button 
              onClick={scrollToNextSection}
              className="px-6 py-2 bg-[#1D1D1F] hover:bg-[#323236] text-white rounded-full text-xs font-sans tracking-wide transition-all shadow-sm hover:scale-[1.02] active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <span>See clinical records</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MacBook Neo Hardware Reveal Mockup */}
        <div className="w-full max-w-[840px] relative mt-4">
          
          {/* Glass display chassis bezel */}
          <div className="w-full aspect-[16/10] bg-[#17181C] rounded-2xl p-3.5 shadow-2xl border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
            
            {/* Screen Inner Glass Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 to-neutral-800/10 pointer-events-none z-10" />
            
            {/* Camera Bezel Dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center z-20">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-500/50" />
            </div>

            {/* SCREEN CONTENT AREA */}
            <div className="w-full h-full bg-[#0D0E11] rounded-lg relative overflow-hidden flex flex-col justify-between p-6">
              
              {/* Floating ambient glow corresponding to color */}
              <div 
                className="absolute -top-[10%] -left-[10%] w-[250px] h-[250px] rounded-full filter blur-[60px] pointer-events-none transition-all duration-1000" 
                style={{ backgroundColor: currentStyles.glow }}
              />

              {/* Top Bar Navigation / System Indicator */}
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[10px] font-mono text-neutral-500 ml-2">neural_recommender.bin</span>
                </div>
                <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`px-3 py-1 rounded text-[9px] font-mono font-bold transition-all ${
                        activeSlide === idx 
                          ? 'bg-[#1E2024] text-white' 
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      Step 0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Interactive Slide View */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4 z-10">
                
                {/* Left side: Interactive vector flow */}
                <div className="md:col-span-6 h-full flex flex-col justify-center relative min-h-[160px]">
                  
                  {/* Dynamic Render Screen based on Slide */}
                  <AnimatePresence mode="wait">
                    {activeSlide === 0 && (
                      <motion.div
                        key="parsing"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full h-full flex flex-col justify-center space-y-3"
                      >
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                          <span>Input Stream Matrix</span>
                        </div>
                        
                        {/* NLP Parsing Animation */}
                        <div className="space-y-2 bg-neutral-900/60 p-3.5 rounded-xl border border-white/5 font-mono text-[9px]">
                          <div className="flex justify-between items-center text-neutral-500 border-b border-white/5 pb-1">
                            <span>Symptom Lexicon</span>
                            <span className="text-lime-400">active</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-neutral-400">"backpain" → regional</span>
                            <span className="text-lime-400">Embedding vector match</span>
                          </div>
                          <div className="w-full bg-neutral-950 h-1.5 rounded overflow-hidden">
                            <motion.div className="bg-lime-400 h-full rounded" initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ duration: 1 }} />
                          </div>

                          <div className="flex justify-between">
                            <span className="text-neutral-400">"chronic" → severity</span>
                            <span className="text-lime-400">High rank penalty</span>
                          </div>
                          <div className="w-full bg-neutral-950 h-1.5 rounded overflow-hidden">
                            <motion.div className="bg-lime-400 h-full rounded" initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 0.2 }} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSlide === 1 && (
                      <motion.div
                        key="latent"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full h-full flex items-center justify-center relative"
                      >
                        <svg className="w-full h-full min-h-[140px] text-neutral-800" viewBox="0 0 200 120">
                          {/* Inner grid lines */}
                          <line x1="20" y1="20" x2="180" y2="100" stroke="rgba(255,255,255,0.03)" />
                          <line x1="20" y1="100" x2="180" y2="20" stroke="rgba(255,255,255,0.03)" />
                          
                          {/* Dynamic colored connectors */}
                          <line x1="40" y1="30" x2="100" y2="60" stroke="#3b82f6" strokeWidth="1.2" className="transition-all" />
                          <line x1="40" y1="90" x2="100" y2="60" stroke="#14b8a6" strokeWidth="1" className="transition-all" />
                          <line x1="100" y1="60" x2="160" y2="30" stroke="#10b981" strokeWidth="1.5" className="transition-all" />
                          <line x1="100" y1="60" x2="160" y2="90" stroke="#f59e0b" strokeWidth="0.8" className="transition-all" />

                          {/* Animated signals */}
                          <circle r="2.5" fill="#3b82f6">
                            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 40,30 L 100,60" />
                          </circle>
                          <circle r="2.5" fill="#10b981">
                            <animateMotion dur="2s" repeatCount="indefinite" path="M 100,60 L 160,30" />
                          </circle>

                          {/* Nodes */}
                          <circle cx="40" cy="30" r="4.5" className="fill-blue-500" />
                          <circle cx="40" cy="90" r="4.5" className="fill-teal-500" />
                          <circle cx="100" cy="60" r="6" className={
                            selectedColor === 'citrus' ? 'fill-lime-400' : 
                            selectedColor === 'ocean' ? 'fill-sky-400' : 
                            selectedColor === 'teal' ? 'fill-teal-400' : 
                            'fill-slate-400'
                          } />
                          <circle cx="160" cy="30" r="4.5" className="fill-emerald-500" />
                          <circle cx="160" cy="90" r="4.5" className="fill-amber-500" />
                        </svg>
                      </motion.div>
                    )}

                    {activeSlide === 2 && (
                      <motion.div
                        key="fusion"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full h-full flex flex-col justify-center space-y-3"
                      >
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                          Affinity Match output rankings
                        </div>

                        <div className="space-y-2">
                          <div className="p-2.5 bg-neutral-900/60 border border-white/5 rounded-xl flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span className="text-[10px] font-mono text-white">Dr. Yousry Mansour</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-400">96% match score</span>
                          </div>

                          <div className="p-2.5 bg-neutral-900/40 border border-white/5 rounded-xl flex justify-between items-center opacity-60">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-neutral-400" />
                              <span className="text-[10px] font-mono text-white">Dr. Kareem Hegazi</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-400">78% match score</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Right side: Dynamic text info card */}
                <div className="md:col-span-6 flex flex-col justify-center space-y-4 text-left pl-0 md:pl-4">
                  <div className="inline-flex items-center gap-1.5">
                    <div className="p-1.5 rounded-lg bg-white/5 text-neutral-300">
                      {slides[activeSlide].icon}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      Slide 0{activeSlide + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-medium text-white tracking-tight leading-snug">
                    {slides[activeSlide].title}
                  </h3>

                  <p className="text-[11px] font-mono text-neutral-400 leading-none">
                    {slides[activeSlide].subtitle}
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {slides[activeSlide].description}
                  </p>

                  {/* Progress slide indicator bar */}
                  <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden">
                    <motion.div 
                      key={activeSlide}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isPlaying ? 5 : 0, ease: "linear" }}
                      className="bg-[#0071E3] h-full"
                    />
                  </div>
                </div>

              </div>

              {/* Bottom Play/Pause & Carousel Controls */}
              <div className="flex justify-between items-center border-t border-white/[0.05] pt-3 z-10">
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  {/* Dynamic Apple-style indicator dots */}
                  <div className="flex gap-1.5">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          activeSlide === idx ? 'bg-[#0071E3] w-3' : 'bg-neutral-600 hover:bg-neutral-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 uppercase">
                  <span>94.8% ndcg accuracy score</span>
                </div>
              </div>

            </div>

          </div>

          {/* Aluminium base frame lip representing bottom of screen hinge */}
          <div className="w-[86%] h-1 bg-[#1F2024] mx-auto rounded-b-md shadow-lg border-t border-white/5" />
        </div>

        {/* Apple Style "Silver, Teal, Citrus, and Ocean" Color Selector */}
        <div className="mt-8 flex flex-col items-center space-y-2">
          <span className="text-xs font-sans font-medium text-neutral-500">
            Available in four stunning color schemes.
          </span>
          <div className="flex items-center gap-3">
            {(['citrus', 'ocean', 'teal', 'silver'] as NeoColor[]).map((col) => {
              const bgDot = col === 'citrus' ? 'bg-[#A3E635]' : 
                            col === 'ocean' ? 'bg-[#0EA5E9]' : 
                            col === 'teal' ? 'bg-[#14B8A6]' : 
                            'bg-[#CBD5E1]';
              return (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    selectedColor === col 
                      ? 'ring-2 ring-offset-2 ring-offset-[#F5F5F7] ring-[#0071E3]' 
                      : 'hover:scale-[1.1]'
                  }`}
                  title={`View in ${col}`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full ${bgDot} shadow-inner`} />
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
