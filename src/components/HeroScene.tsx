import React from 'react';
import { motion } from 'motion/react';
import { Play, Shield, ArrowDown, Cpu, Sparkles, Activity, Terminal } from 'lucide-react';

interface HeroSceneProps {
  onEnterExperience: () => void;
  onStartTour: () => void;
}

export default function HeroScene({ onEnterExperience, onStartTour }: HeroSceneProps) {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [metrics, setMetrics] = React.useState({
    frequency: 4.82,
    utilization: 74,
    temp: 42.5,
    ops: 8.24
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const freqDiff = (Math.random() - 0.5) * 0.15;
        const utilDiff = Math.floor((Math.random() - 0.5) * 12);
        const tempDiff = (Math.random() - 0.5) * 1.8;
        const opsDiff = (Math.random() - 0.5) * 0.4;

        return {
          frequency: Math.min(5.1, Math.max(4.2, parseFloat((prev.frequency + freqDiff).toFixed(2)))),
          utilization: Math.min(100, Math.max(20, prev.utilization + utilDiff)),
          temp: Math.min(65.0, Math.max(35.0, parseFloat((prev.temp + tempDiff).toFixed(1)))),
          ops: Math.min(12.0, Math.max(4.0, parseFloat((prev.ops + opsDiff).toFixed(2))))
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Smooth responsive tilt scaling to 15 degrees max
    const factorX = -(y / (box.height / 2)) * 15;
    const factorY = (x / (box.width / 2)) * 15;
    
    setRotate({ x: factorX, y: factorY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center items-center px-6 md:px-12 py-24 select-none overflow-hidden border-b border-neutral-200">
      
      {/* Soft color radial spotlight mimicking a premium physical Apple keynote wall */}
      <div className="absolute top-[20%] w-[600px] h-[400px] bg-gradient-radial from-blue-100/50 to-transparent rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-50 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-4xl flex flex-col items-center">
        
        {/* Apple Style Premium Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 bg-[#F5F5F7] border border-[#D2D2D7]/60 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#6E6E73] mb-8 font-bold uppercase shadow-2xs"
        >
          <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full animate-pulse" />
          <span>CY 2026</span>
          <span className="text-[#D2D2D7]">|</span>
          <span>PRODUCT REVEAL</span>
          <span className="text-[#D2D2D7]">|</span>
          <span className="text-[#1D1D1F]">MEDILINK AI</span>
        </motion.div>

        {/* Brand Name */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#86868B] font-display tracking-[0.25em] uppercase text-xs sm:text-sm font-bold mb-3"
        >
          MediLink Healthcare
        </motion.h2>

        {/* High contrast Display Typography headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05] mb-6"
        >
          Powered by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-sky-600 to-[#0051B3]">Lumen AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-2xl font-light text-[#6E6E73] max-w-2xl mb-12 leading-relaxed font-sans"
        >
          A cinematic product tour showing how multi-stage computer vision and fact-checked literature unify patient care.
        </motion.p>

        {/* Fully Interactive 3D Perspective Processor Animation */}
        <div 
          className="w-full max-w-lg mb-12"
          style={{ perspective: 1400 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotateX: isHovered ? rotate.x * 1.5 : 0,
              rotateY: isHovered ? rotate.y * 1.5 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={isHovered ? { type: "spring", stiffness: 200, damping: 15, mass: 0.5 } : { duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[16/10] bg-[#07080a] border-4 border-[#16171a] rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
            style={{ 
              transformStyle: "preserve-3d",
            }}
          >
            {/* BACK LAYER: Motherboard matte black/gold silicon board substrate */}
            <div 
              className="absolute inset-0 bg-[#08090c] rounded-2xl overflow-hidden pointer-events-none"
              style={{ transform: "translateZ(-60px)" }}
            >
              {/* Fine sub-micron silicon chip grid */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0071E3_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Dense copper bus tracer routing lines that light up on hover */}
              <svg className="absolute inset-0 w-full h-full text-neutral-800 transition-all duration-700" viewBox="0 0 500 312">
                <defs>
                  <linearGradient id="trace-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0071E3" stopOpacity={isHovered ? "0.8" : "0.1"} />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity={isHovered ? "0.9" : "0.2"} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={isHovered ? "0.8" : "0.1"} />
                  </linearGradient>
                </defs>
                {/* Circuit paths spreading outwards */}
                <path 
                  d="M 50,50 L 180,50 L 210,80 L 210,130 L 250,156" 
                  fill="none" 
                  stroke="url(#trace-glow)" 
                  strokeWidth={isHovered ? "2.5" : "1"} 
                  strokeDasharray={isHovered ? "10 5" : "none"}
                  className="transition-all duration-500"
                />
                <path 
                  d="M 450,50 L 320,50 L 290,80 L 290,130 L 250,156" 
                  fill="none" 
                  stroke="url(#trace-glow)" 
                  strokeWidth={isHovered ? "2.5" : "1"} 
                  strokeDasharray={isHovered ? "10 5" : "none"}
                  className="transition-all duration-500"
                />
                <path 
                  d="M 50,262 L 180,262 L 210,232 L 210,182 L 250,156" 
                  fill="none" 
                  stroke="url(#trace-glow)" 
                  strokeWidth={isHovered ? "2.5" : "1"} 
                  strokeDasharray={isHovered ? "10 5" : "none"}
                  className="transition-all duration-500"
                />
                <path 
                  d="M 450,262 L 320,262 L 290,262 L 290,182 L 250,156" 
                  fill="none" 
                  stroke="url(#trace-glow)" 
                  strokeWidth={isHovered ? "2.5" : "1"} 
                  strokeDasharray={isHovered ? "10 5" : "none"}
                  className="transition-all duration-500"
                />
                {/* Horizontal data highways */}
                <path d="M 0,156 L 500,156" fill="none" stroke="url(#trace-glow)" strokeWidth="0.5" strokeDasharray="5 20" />
                <path d="M 250,0 L 250,312" fill="none" stroke="url(#trace-glow)" strokeWidth="0.5" strokeDasharray="5 20" />
              </svg>
            </div>

            {/* INTERMEDIATE LAYER: Motherboard Power Rails & Gold Capacitors */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: "translateZ(-30px)", transformStyle: "preserve-3d" }}
            >
              {/* Outer Golden Bus Connection Pins Ring */}
              <div className="w-[310px] h-[220px] rounded-[24px] border-2 border-dashed border-amber-500/20 flex items-center justify-center">
                <div className="absolute inset-1 border border-amber-500/10 rounded-[22px]" />
                {/* Simulated micro SMD capacitors surrounding the socket */}
                <div className="absolute -top-1.5 inset-x-8 flex justify-between">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-3 bg-[#1e2025] border-t border-amber-500/40 rounded-xs transition-all duration-300 ${isHovered ? 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''}`} />
                  ))}
                </div>
                <div className="absolute -bottom-1.5 inset-x-8 flex justify-between">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-3 bg-[#1e2025] border-t border-amber-500/40 rounded-xs transition-all duration-300 ${isHovered ? 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* CENTRAL INTERACTIVE LAYER: Elevated Silicon Socket & CPU Spreader */}
            <div 
              className="relative w-72 h-52 flex items-center justify-center pointer-events-none"
              style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
            >
              {/* Processor Socket Frame (Plastic bracket/Lever mechanism) */}
              <div className="absolute w-64 h-44 rounded-2xl bg-gradient-to-br from-[#1c1d22] to-[#0f1013] border border-[#2a2c35] shadow-lg flex items-center justify-center">
                <div className="absolute inset-1.5 border border-black/40 rounded-xl" />
                {/* Silver metal lever lock latch */}
                <div className="absolute right-2 inset-y-6 w-1.5 bg-gradient-to-b from-neutral-400 to-neutral-600 rounded-full border border-neutral-700" />
                <div className="absolute bottom-2 right-4 w-4 h-1 bg-neutral-500 rounded-sm" />
              </div>

              {/* The CPU Heatspreader Package (Metallic Dark Anodized Aluminum) */}
              <motion.div 
                animate={{ 
                  translateZ: isHovered ? 45 : 20,
                  rotateZ: isHovered ? 3 : 0,
                  boxShadow: isHovered 
                    ? "0 25px 50px -12px rgba(0, 113, 227, 0.4)" 
                    : "0 10px 25px -5px rgba(0,0,0,0.7)"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="absolute w-52 h-36 rounded-xl bg-gradient-to-br from-[#1e2025] via-[#121316] to-[#0a0a0c] border border-white/10 flex items-center justify-center overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Golden corner contact triangles */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-tl-sm opacity-80" />
                
                {/* CPU Die Silicon Engraving Markings */}
                <div className="absolute inset-2 border border-white/[0.03] rounded-lg pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between items-start font-mono text-[7px] text-neutral-500 tracking-wider">
                    <span>LUMEN-N26</span>
                    <span>2026.06</span>
                  </div>
                  <div className="flex justify-between items-end font-mono text-[6px] text-neutral-600">
                    <span>DIFFUSED IN USA</span>
                    <span>REV 4.2</span>
                  </div>
                </div>

                {/* Highly Active Central Core Die (Glossy Dark Mirror Core) */}
                <motion.div 
                  animate={{ 
                    scale: isHovered ? 1.08 : 1,
                    translateZ: isHovered ? 25 : 5,
                  }}
                  className="relative w-32 h-20 rounded-lg bg-gradient-to-tr from-[#0a0a0d] via-[#16171b] to-[#1d1f24] border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center"
                >
                  {/* Outer active silicon micro ring */}
                  <svg className="absolute inset-0 w-full h-full text-[#0071E3]/20" viewBox="0 0 128 80">
                    <rect x="14" y="10" width="100" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                    <motion.rect 
                      x="14" 
                      y="10" 
                      width="100" 
                      height="60" 
                      rx="6" 
                      fill="none" 
                      stroke={isHovered ? "#38BDF8" : "#0071E3"} 
                      strokeWidth="1.5"
                      animate={{
                        strokeDashoffset: isHovered ? [320, 0] : [0, 320]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: isHovered ? 2.5 : 8,
                        ease: "linear"
                      }}
                      strokeDasharray="40 80"
                    />
                  </svg>

                  {/* High Intensity Radiant Spotlight from CPU Core */}
                  <div 
                    className={`absolute w-20 h-20 bg-gradient-radial ${isHovered ? 'from-[#38BDF8]/40' : 'from-[#0071E3]/20'} to-transparent rounded-full filter blur-md transition-all duration-500`}
                  />

                  {/* Pulsing neon point light beam emitter */}
                  <motion.div
                    animate={{
                      scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
                      opacity: isHovered ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isHovered ? 0.6 : 2,
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#38BDF8]/30 shadow-[0_0_24px_#38BDF8]' : 'bg-[#0071E3]/20 shadow-[0_0_12px_#0071E3]'}`}
                  >
                    <Cpu className={`w-3.5 h-3.5 transition-colors duration-500 ${isHovered ? 'text-sky-300' : 'text-neutral-400'}`} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* FOREGROUND HOLOGRAPHIC LAYER: Floating Scanning Target HUD rings above the CPU */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ 
                  opacity: isHovered ? 0.95 : 0,
                  scale: isHovered ? 1.1 : 0.8,
                  rotate: isHovered ? 360 : 0
                }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                className="w-56 h-36 border border-[#38BDF8]/30 rounded-xl relative flex items-center justify-center"
              >
                {/* Rotating scanning target line */}
                <div className="absolute w-[95%] h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent animate-[bounce_1.8s_ease-in-out_infinite]" />
                
                {/* Angular corner reticles */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-sky-400" />

                {/* Dynamic holographic arcs */}
                <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-purple-500/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-16 h-16 rounded-full border border-double border-sky-500/40 animate-[spin_6s_linear_infinite_reverse]" />
              </motion.div>
            </div>

            {/* Dynamic floating light flares that sweep across on hover */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] transition-opacity duration-300 group-hover:opacity-100 opacity-30" 
              style={{ transform: "translateZ(100px)" }}
            />
          </motion.div>
        </div>

        {/* Clean Call-to-actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <button
            onClick={onStartTour}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0071E3] hover:bg-[#147CE5] font-semibold rounded-full text-white tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Guided Presentation</span>
          </button>

          <button
            onClick={onEnterExperience}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F5F5F7] hover:bg-[#E8E8ED] border border-[#D2D2D7]/60 font-semibold rounded-full text-[#1D1D1F] tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>Explore Clinical Logic</span>
          </button>
        </motion.div>
      </div>

      {/* Static scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-neutral-400 pointer-events-none">
        <span className="text-[9px] tracking-[0.25em] uppercase font-mono font-medium text-neutral-500">Scroll to begin</span>
        <div className="w-[1px] h-5 bg-[#D2D2D7]" />
      </div>
    </div>
  );
}
