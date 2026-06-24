import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, BookOpen, Layers, Cpu, Play, CheckCircle, RefreshCw, Activity, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck, Database, HelpCircle,
  CalendarDays, MessageCircle, FolderLock, Search, MapPin, Clock
} from 'lucide-react';

type PhoneMode = "home" | "find" | "records" | "chat" | "autorec";

export default function LumenCoreScene() {
  const [viewMode, setViewMode] = useState<'question' | 'reveal'>('question');
  const [phoneMode, setPhoneMode] = useState<PhoneMode>("home");
  const [activeModule, setActiveModule] = useState<string>('langgraph');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState(0);

  const modules = [
    {
      id: 'langgraph',
      icon: Layers,
      title: 'LangGraph Router',
      label: 'GATEWAY LAYER',
      color: '#0071E3',
      bgColor: 'rgba(0, 113, 227, 0.08)',
      desc: 'Monitors user intents to dynamically route clinical inputs. Chats bypass heavy vision model clusters to protect active server runtimes, maintaining immediate latencies.',
      specs: [
        { label: 'Router Latency', val: '< 45ms' },
        { label: 'Intent Accuracy', val: '98.4%' },
        { label: 'Routing Engine', val: 'Stateful DAG' }
      ],
      terminalLines: [
        '❯ Incoming prompt detected',
        '❯ Analyzing semantic tokens for symptom context',
        '❯ Intent class: [CLINICAL_DIAGNOSIS_REQUISITION]',
        '❯ Routing path: Active -> HTAN + RAG Pipeline',
        '❯ Activating specialized GPU clusters...'
      ]
    },
    {
      id: 'htan',
      icon: Eye,
      title: 'HTAN (Computer Vision)',
      label: 'IMAGE SEGMENTER',
      color: '#38BDF8',
      bgColor: 'rgba(56, 189, 248, 0.08)',
      desc: 'The Hyper-connected Transformer Attention Network isolates boundaries and contours raw lesion scans. Achieves 90.32% Dice score. Built solely for visual tracing, never diagnosing.',
      specs: [
        { label: 'Dice Similarity Score', val: '90.32%' },
        { label: 'Model Size', val: '45M parameters' },
        { label: 'Primary Function', val: 'Edge Outline' }
      ],
      terminalLines: [
        '❯ Loading raw image binary...',
        '❯ Applying HTAN attention masks across spatial coordinates',
        '❯ Executing visual boundary delineation',
        '❯ Margin contrast verified: 90.32% confidence interval',
        '❯ Exporting bounding vector array...'
      ]
    },
    {
      id: 'rag',
      icon: BookOpen,
      title: 'Biomedical Grounding',
      label: 'EVIDENCE SEARCH',
      color: '#14B8A6',
      bgColor: 'rgba(20, 184, 166, 0.08)',
      desc: 'Retrieves abstracts from 25M biomedical publications in Weaviate. Powered by S-PubMedBERT, it forces the system to quote real evidence, preventing hallucinated summaries.',
      specs: [
        { label: 'Knowledge Base', val: '25M PubMed Papers' },
        { label: 'Embedding Model', val: 'S-PubMedBERT' },
        { label: 'Accuracy Rate', val: '99.9% Grounded' }
      ],
      terminalLines: [
        '❯ Extracting semantic entity vectors from patient file',
        '❯ Querying Weaviate index with dense MedCPT coordinates',
        '❯ Retrieved 3 relevant clinical trials (PMC-1082531)',
        '❯ Computing S-PubMedBERT validation checks...',
        '❯ Grounding text chunk arrays verified.'
      ]
    },
    {
      id: 'claude',
      icon: Cpu,
      title: 'Claude Synthesis',
      label: 'EXPLAINER SYSTEM',
      color: '#A855F7',
      bgColor: 'rgba(168, 85, 247, 0.08)',
      desc: 'Translates raw segmentation dimensions, verified PubMed trials, and system triage coordinates into a clear, jargon-free patient consult report.',
      specs: [
        { label: 'Language Core', val: 'Claude 3.5 Sonnet' },
        { label: 'Safety Filters', val: 'Dual-gate checking' },
        { label: 'Consult Format', val: 'Human-friendly' }
      ],
      terminalLines: [
        '❯ Injecting HTAN visual vectors and PubMed citation nodes',
        '❯ Running dual-gate prompt validation checks',
        '❯ Prompt sanitized (no credentials, no medical overrides)',
        '❯ Drafting consult report structure...',
        '❯ Secure package sealed and delivered.'
      ]
    }
  ];

  const currentMod = modules.find(m => m.id === activeModule) || modules[0];

  const runTriageSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimProgress(0);
    setSimLog([]);

    const steps = currentMod.terminalLines;
    let index = 0;

    const interval = setInterval(() => {
      if (index < steps.length) {
        setSimLog(prev => [...prev, steps[index]]);
        setSimProgress(Math.round(((index + 1) / steps.length) * 100));
        index++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <div className={`relative min-h-screen flex flex-col justify-center py-20 px-6 md:px-12 select-none overflow-hidden border-b transition-colors duration-1000 ${
      viewMode === 'question' 
        ? 'bg-[#F5F5F7] text-neutral-900 border-neutral-200' 
        : 'bg-black text-[#F5F5F7] border-white/[0.05]'
    }`} id="lumen-scene-container">
      {/* Background spotlights for dark mode */}
      {viewMode === 'reveal' && (
        <>
          <div className="absolute top-[20%] left-[30%] w-[800px] h-[350px] bg-[#0071E3]/[0.02] rounded-full filter blur-[160px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[300px] bg-teal-500/[0.015] rounded-full filter blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="max-w-6xl w-full mx-auto relative z-10 flex-1 flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          {viewMode === 'question' ? (
            <motion.div
              key="question-mode"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full flex flex-col items-center text-center py-12 max-w-4xl mx-auto"
            >
              {/* Header Titles */}
              <div className="space-y-4 max-w-3xl mx-auto mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.08 }}
                  className="text-5xl sm:text-7xl lg:text-8xl font-display font-light text-neutral-900 tracking-tight leading-[1.05]"
                >
                  Powered by <span className="text-[#0071E3] font-semibold">Lumen</span>
                  <br />
                  <span className="text-[#0071E3] font-bold">AI</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.16 }}
                  className="text-base sm:text-lg md:text-xl leading-relaxed text-[#6E6E73] max-w-2xl mx-auto font-sans font-light"
                >
                  A cinematic product tour showing how multi-stage computer vision and fact-checked literature unify patient care.
                </motion.p>
              </div>

              {/* Centered Beautiful Chip Card */}
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.22 }}
                className="relative w-full max-w-[460px] px-4 my-8"
              >
                {/* 3D shadow and ambient glow behind the chip */}
                <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10 scale-95 animate-pulse" style={{ animationDuration: '4s' }} />
                
                {/* The Microchip Card */}
                <div className="relative w-full aspect-[1.58] bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0C] rounded-3xl p-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)] border border-neutral-800 flex flex-col justify-between overflow-hidden">
                  
                  {/* Physical Gold Pins at the top edge */}
                  <div className="absolute top-0 inset-x-8 flex justify-between -translate-y-1">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2.5 bg-gradient-to-b from-yellow-600/90 to-yellow-400/90 rounded-sm shadow-inner" />
                    ))}
                  </div>

                  {/* Physical Gold Pins at the bottom edge */}
                  <div className="absolute bottom-0 inset-x-8 flex justify-between translate-y-1">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2.5 bg-gradient-to-t from-yellow-600/90 to-yellow-400/90 rounded-sm shadow-inner" />
                    ))}
                  </div>

                  {/* Golden top-left indicator box (Pin 1 Indicator) */}
                  <div className="absolute top-4 left-4 w-3.5 h-3.5 border border-yellow-500/40 bg-yellow-500/10 rounded-[3px] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                  </div>

                  {/* Corner metallic trims */}
                  <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-neutral-700" />
                  <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-neutral-700" />

                  {/* Monospace Labels */}
                  <div className="flex justify-between items-start pt-2 px-1">
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-500">LUMEN-N26</span>
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-500">2026.06</span>
                  </div>

                  {/* Centered Targeting Box & Icon */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <div className="relative p-6 border border-blue-500/30 rounded-2xl bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.15)] group hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-500">
                      {/* Corner targeting brackets */}
                      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-blue-500 rounded-tl-md" />
                      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-blue-500 rounded-tr-md" />
                      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-blue-500 rounded-bl-md" />
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-blue-500 rounded-br-md" />
                      
                      {/* Central glowing CPU icon */}
                      <Cpu className="w-12 h-12 text-blue-500 animate-pulse drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>

                  {/* Bottom Monospace Labels */}
                  <div className="flex justify-between items-end pb-1 px-1">
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-500">DIFFUSED IN USA</span>
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-500">REV 4.2</span>
                  </div>

                </div>
              </motion.div>

              {/* Control Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.32 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-4 w-full"
              >
                <button
                  onClick={() => setViewMode('reveal')}
                  className="px-8 py-3.5 rounded-full bg-[#0071E3] text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-[#147CE5] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
                >
                  Start Guided Presentation
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('comparison');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="px-8 py-3.5 rounded-full bg-white/85 border border-black/10 text-[#1D1D1F] text-sm font-semibold shadow-sm hover:bg-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
                >
                  Explore Product Flow
                </button>
              </motion.div>

              {/* Mini Disclaimer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.48 }}
                className="mt-8 text-xs text-[#86868B]"
              >
                Concept interface for presentation purposes. Live product demo shown later.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="reveal-mode"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col space-y-12 w-full text-center"
            >
              {/* Apple-style Top Header Block */}
              <div className="space-y-3 max-w-3xl mx-auto pt-6">
                <span className="text-[10px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block">
                  LUMEN ARCHITECTURE
                </span>
                
                <h2 className="text-5xl sm:text-7xl font-display font-light text-white tracking-tight leading-[1.05]">
                  powered by the <span className="bg-gradient-to-r from-[#38BDF8] via-[#0071E3] to-[#2DD4BF] bg-clip-text text-transparent font-medium">LUMEN</span> system
                </h2>
                
                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                  An advanced multi-layer clinical engine that delegates tasks. It structures, segments, verifies, and sanitizes clinical information before exporting insights.
                </p>
              </div>

              {/* Main Content: Laptop on the left, details/modules on the right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 text-left">
                
                {/* Left Side: MacBook Pro Coming Out of Shadows */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[400px]">
                  
                  {/* Backdrop shadow illumination */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0071E3]/5 to-transparent rounded-full filter blur-[100px] pointer-events-none" />

                  {/* MacBook Pro angled perspective SVG drawing (High Fidelity) */}
                  <div className="w-full max-w-[500px] relative transition-transform duration-700 hover:scale-[1.02]">
                    <svg viewBox="0 0 600 420" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,113,227,0.18)]">
                      {/* Definitions */}
                      <defs>
                        {/* Metallic body gradient */}
                        <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2D2E33" />
                          <stop offset="50%" stopColor="#1E1F22" />
                          <stop offset="80%" stopColor="#111112" />
                          <stop offset="100%" stopColor="#212226" />
                        </linearGradient>

                        {/* Edge reflection */}
                        <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#18181B" />
                          <stop offset="30%" stopColor="#4B4C53" />
                          <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.8" />
                          <stop offset="70%" stopColor="#3F3F46" />
                          <stop offset="100%" stopColor="#111112" />
                        </linearGradient>

                        {/* Keycap gradient */}
                        <linearGradient id="key-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1C1C1E" />
                          <stop offset="100%" stopColor="#0B0B0C" />
                        </linearGradient>

                        {/* Screen border reflection */}
                        <linearGradient id="screen-border" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#27272A" />
                          <stop offset="100%" stopColor="#09090B" />
                        </linearGradient>
                      </defs>

                      {/* LAPTOP DISPLAY (Angled and open at 45deg, facing slightly left) */}
                      {/* Back Lid Panel */}
                      <path 
                        d="M 120,220 L 320,60 L 480,95 L 280,255 Z" 
                        fill="url(#body-grad)" 
                        stroke="#3F3F46" 
                        strokeWidth="1"
                      />

                      {/* Display Edge Highlights (Coming Out of shadows) */}
                      <path 
                        d="M 320,60 L 480,95 L 280,255" 
                        fill="none" 
                        stroke="url(#edge-grad)" 
                        strokeWidth="1.5" 
                        opacity="0.9"
                      />

                      {/* Screen Glare Overlay */}
                      <path 
                        d="M 130,215 L 315,67 L 465,100 L 280,248 Z" 
                        fill="#000000" 
                        stroke="url(#screen-border)" 
                        strokeWidth="1.5"
                      />

                      {/* Active Module Visual Screen Content */}
                      <foreignObject x="145" y="80" width="300" height="155" transform="rotate(2, 300, 160)">
                        <div className="w-full h-full p-3 flex flex-col justify-between font-mono text-[8px] text-white overflow-hidden rounded-md bg-black/80 border border-white/5 relative">
                          {/* Radial Ambient Backlight */}
                          <div 
                            className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-60"
                            style={{ 
                              background: `radial-gradient(circle at 50% 50%, ${currentMod.color}25, transparent 70%)` 
                            }} 
                          />

                          {/* Applet Top Header */}
                          <div className="flex justify-between items-center border-b border-white/10 pb-1.5 z-10">
                            <span className="text-[7px] text-neutral-400 uppercase tracking-widest font-bold">LUMEN CONSOLE v3.5</span>
                            <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                            </div>
                          </div>

                          {/* Core Terminal Logging Simulation */}
                          <div className="flex-1 my-2 space-y-1 z-10 overflow-hidden text-left font-mono">
                            <p className="text-neutral-500 uppercase text-[6px] tracking-wider mb-1">MODULE: {currentMod.title}</p>
                            {isSimulating ? (
                              <div className="space-y-1">
                                {simLog.map((log, i) => (
                                  <motion.p 
                                    initial={{ opacity: 0, x: -3 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i} 
                                    className="text-neutral-300 leading-tight truncate font-mono"
                                  >
                                    {log}
                                  </motion.p>
                                ))}
                                {isSimulating && (
                                  <span className="inline-block w-1.5 h-2.5 bg-[#0071E3] animate-pulse ml-0.5" />
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-center py-2 space-y-1.5">
                                <currentMod.icon className="w-6 h-6 animate-pulse" style={{ color: currentMod.color }} />
                                <span className="text-[7px] text-neutral-400">System Ready. Click "Execute Sandbox Pass" below.</span>
                              </div>
                            )}
                          </div>

                          {/* Terminal Progress Bar Footer */}
                          <div className="border-t border-white/10 pt-1.5 flex justify-between items-center z-10 font-mono">
                            <span className="text-neutral-500 text-[6px]">ENGINE INGRESS OK</span>
                            <span className="text-[7px]" style={{ color: currentMod.color }}>{isSimulating ? `${simProgress}%` : 'IDLE'}</span>
                          </div>
                        </div>
                      </foreignObject>

                      {/* Display Bezel Lower Chin Gloss */}
                      <path 
                        d="M 120,220 L 280,255" 
                        fill="none" 
                        stroke="#52525B" 
                        strokeWidth="2" 
                        opacity="0.8"
                      />

                      {/* LAPTOP KEYBOARD CHASSIS (Lower Deck extending forward) */}
                      {/* Keyboard Base Plate */}
                      <path 
                        d="M 280,255 L 120,220 L 15,260 L 220,335 Z" 
                        fill="url(#body-grad)" 
                        stroke="#27272A" 
                        strokeWidth="1"
                      />

                      {/* Keyboard Plate Top Highlights */}
                      <path 
                        d="M 120,220 L 15,260 L 220,335" 
                        fill="none" 
                        stroke="url(#edge-grad)" 
                        strokeWidth="1" 
                        opacity="0.6"
                      />

                      {/* Side Edge with USB-C and Audio Ports (Details in shadows) */}
                      <path 
                        d="M 15,260 L 20,270 L 220,345 L 220,335 Z" 
                        fill="#18181B" 
                        stroke="#3F3F46" 
                        strokeWidth="0.5"
                      />
                      <path 
                        d="M 220,335 L 225,341 L 430,285 L 280,255 Z" 
                        fill="#1F2023"
                      />

                      {/* Precision specular edge reflection lines */}
                      <path 
                        d="M 20,270 L 220,345 L 430,285" 
                        fill="none" 
                        stroke="url(#edge-grad)" 
                        strokeWidth="1.5" 
                        opacity="0.9"
                      />

                      {/* Side Port Indicators (Silver Specs) */}
                      <rect x="35" y="271" width="5" height="2" rx="0.5" fill="#52525B" transform="rotate(20, 35, 271)" />
                      <rect x="44" y="274" width="5" height="2" rx="0.5" fill="#52525B" transform="rotate(20, 44, 274)" />
                      <circle cx="58" cy="281" r="1" fill="#3F3F46" />

                      {/* Trackpad area representation */}
                      <path 
                        d="M 110,295 L 165,315 L 145,322 L 95,302 Z" 
                        fill="none" 
                        stroke="rgba(255,255,255,0.08)" 
                        strokeWidth="1"
                      />

                      {/* Keyboard Keys Block Representation (Sleek rows of keycaps in perspective) */}
                      <g opacity="0.85">
                        <path d="M 110,230 L 260,258 L 220,288 L 80,258 Z" fill="#0D0E10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        {/* Dummy keys lines */}
                        <line x1="120" y1="237" x2="90" y2="259" stroke="#1F2024" strokeWidth="2" />
                        <line x1="150" y1="243" x2="115" y2="269" stroke="#1F2024" strokeWidth="2" />
                        <line x1="180" y1="249" x2="140" y2="279" stroke="#1F2024" strokeWidth="2" />
                        <line x1="210" y1="255" x2="165" y2="289" stroke="#1F2024" strokeWidth="2" />
                        <line x1="240" y1="261" x2="195" y2="295" stroke="#1F2024" strokeWidth="2" />
                        
                        {/* Cross key gaps */}
                        <line x1="105" y1="238" x2="245" y2="265" stroke="#111215" strokeWidth="1" />
                        <line x1="100" y1="246" x2="235" y2="273" stroke="#111215" strokeWidth="1" />
                        <line x1="90" y1="254" x2="220" y2="281" stroke="#111215" strokeWidth="1" />
                        <line x1="82" y1="262" x2="205" y2="288" stroke="#111215" strokeWidth="1" />
                      </g>

                      {/* Dynamic light reflection sweep on metal shell */}
                      <path 
                        d="M 120,220 L 15,260" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="1" 
                        opacity="0.3" 
                        strokeDasharray="4 8"
                      />
                    </svg>

                    {/* Interactive Sandbox triggers under mockup */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                      <button
                        onClick={runTriageSimulation}
                        disabled={isSimulating}
                        className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 text-white font-mono text-[10px] font-bold rounded-full transition-all disabled:opacity-50"
                      >
                        <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-pulse text-[#0071E3]' : 'text-neutral-400'}`} />
                        <span>{isSimulating ? 'SIMULATING PASS...' : 'EXECUTE SANDBOX PASS'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Architecture Detail Panels */}
                <div className="lg:col-span-6 flex flex-col space-y-6">
                  
                  {/* Tabs Selector list */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
                    {modules.map(mod => {
                      const Icon = mod.icon;
                      const isActive = activeModule === mod.id;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => {
                            setActiveModule(mod.id);
                            setSimLog([]);
                            setSimProgress(0);
                          }}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg text-center transition-all ${
                            isActive 
                              ? 'bg-neutral-800 text-white shadow-sm border border-white/10' 
                              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
                          }`}
                        >
                          <Icon className="w-4 h-4 mb-1" style={{ color: isActive ? mod.color : 'inherit' }} />
                          <span className="text-[9px] font-mono font-medium tracking-wide block truncate w-full">{mod.title.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Module Details display */}
                  <motion.div
                    key={activeModule}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-neutral-950/80 border border-white/5 rounded-2xl p-6 relative overflow-hidden"
                  >
                    {/* Glowing highlight indicator */}
                    <div 
                      className="absolute top-0 left-0 w-1 h-full transition-all duration-300" 
                      style={{ backgroundColor: currentMod.color }}
                    />

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold block mb-1">
                          {currentMod.label}
                        </span>
                        <h3 className="text-xl font-display font-medium text-white">
                          {currentMod.title}
                        </h3>
                      </div>
                      
                      <div className="p-2 rounded-xl" style={{ backgroundColor: currentMod.bgColor }}>
                        <currentMod.icon className="w-5 h-5" style={{ color: currentMod.color }} />
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light mb-6">
                      {currentMod.desc}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
                      {currentMod.specs.map((spec, i) => (
                        <div key={i} className="space-y-1">
                          <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider block">
                            {spec.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-neutral-200">
                            {spec.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Safety Assurance footer callout */}
                  <div className="bg-neutral-900/30 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-sans font-medium text-neutral-200">Guaranteed Medical Context Alignment</p>
                      <p className="text-[9px] font-sans text-neutral-400 leading-none mt-0.5">Lumen forces rigorous deterministic validation on every patient transaction before saving report summaries.</p>
                    </div>
                  </div>

                  {/* Back button to question */}
                  <button 
                    onClick={() => setViewMode('question')}
                    className="self-start text-[10px] font-mono text-neutral-500 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest"
                  >
                    <span>← Return to Dilemma Overview</span>
                  </button>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function HomeScreen({ setMode }: { setMode: (mode: PhoneMode) => void }) {
  return (
    <div>
      <div className="rounded-[2rem] bg-white border border-black/5 shadow-sm p-4 mb-4 text-left">
        <p className="text-xs text-[#86868B] mb-2">Today</p>
        <h4 className="text-xl font-semibold tracking-[-0.035em] mb-1 text-neutral-900">
          Your care, connected.
        </h4>
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          Start with guidance, find care, and keep your health journey organized.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <FeatureButton
          icon={<CalendarDays className="h-5 w-5" />}
          title="Find & Book"
          subtitle="Find the right doctor and time"
          onClick={() => setMode("find")}
        />

        <FeatureButton
          icon={<Sparkles className="h-5 w-5" />}
          title="AutoRec Recommendations"
          subtitle="Rank doctors using case context"
          onClick={() => setMode("autorec")}
        />

        <FeatureButton
          icon={<FolderLock className="h-5 w-5" />}
          title="Medical Records"
          subtitle="A secure timeline of care"
          onClick={() => setMode("records")}
        />

        <FeatureButton
          icon={<MessageCircle className="h-5 w-5" />}
          title="Medi AI Chat"
          subtitle="Start with symptoms or questions"
          onClick={() => setMode("chat")}
        />
      </div>
    </div>
  );
}

function FeatureButton({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-3xl bg-white border border-black/5 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.99] cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-[#F5F5F7] group-hover:bg-[#EAF3FF] text-[#0071E3] flex items-center justify-center transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h5 className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-900">
            {title}
          </h5>
          <p className="text-xs text-[#86868B] mt-0.5">{subtitle}</p>
        </div>
        <span className="text-[#C7C7CC] group-hover:text-[#0071E3] transition-colors">
          →
        </span>
      </div>
    </button>
  );
}

function FindBookScreen({ setMode }: { setMode: (mode: PhoneMode) => void }) {
  return (
    <div>
      <BackButton onClick={() => setMode("home")} label="Find & Book" />

      <div className="rounded-[2rem] bg-[#0B1220] text-white p-5 mb-4 shadow-xl text-left">
        <div className="flex items-center gap-2 text-sky-300 text-xs font-mono uppercase tracking-[0.16em] mb-4">
          <Search className="h-4 w-4" />
          Provider match
        </div>
        <h4 className="text-2xl font-semibold tracking-[-0.04em] mb-2 text-white">
          Recommended care nearby.
        </h4>
        <p className="text-sm text-white/65 leading-relaxed">
          Find relevant clinicians based on specialty, distance, availability, and care context.
        </p>
      </div>

      <DoctorCard name="Dr. Yousry Adel" specialty="Orthopedics" score="94%" time="Today, 7:30 PM" />
      <DoctorCard name="Dr. Mariam Nabil" specialty="Internal Medicine" score="88%" time="Tomorrow, 10:00 AM" />
    </div>
  );
}

function AutoRecScreen({ setMode }: { setMode: (mode: PhoneMode) => void }) {
  return (
    <div>
      <BackButton onClick={() => setMode("home")} label="AutoRec" />

      <div className="rounded-[2rem] bg-white border border-black/5 p-5 shadow-sm mb-4 text-left">
        <div className="h-12 w-12 rounded-2xl bg-[#EAF3FF] text-[#0071E3] flex items-center justify-center mb-4">
          <Sparkles className="h-5 w-5" />
        </div>
        <h4 className="text-2xl font-semibold tracking-[-0.04em] mb-2 text-neutral-900">
          Why this doctor?
        </h4>
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          AutoRec combines symptoms, history, availability, distance, and doctor relevance.
        </p>
      </div>

      <div className="space-y-3">
        <ScoreRow label="Symptom match" value="42%" />
        <ScoreRow label="Care history" value="24%" />
        <ScoreRow label="Availability" value="19%" />
        <ScoreRow label="Location" value="15%" />
      </div>
    </div>
  );
}

function RecordsScreen({ setMode }: { setMode: (mode: PhoneMode) => void }) {
  return (
    <div>
      <BackButton onClick={() => setMode("home")} label="Medical Records" />

      <div className="rounded-[2rem] bg-white border border-black/5 p-5 shadow-sm mb-4 text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#F5F5F7] text-[#0071E3] flex items-center justify-center">
            <FolderLock className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Encrypted
          </div>
        </div>
        <h4 className="text-2xl font-semibold tracking-[-0.04em] mb-2 text-neutral-900">
          One record, one journey.
        </h4>
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          Symptoms, scans, appointments, reports, and follow-ups become structured care context.
        </p>
      </div>

      <div className="text-left">
        <TimelineItem title="Initial symptoms" meta="Today, 6:42 PM" />
        <TimelineItem title="Doctor booking" meta="Today, 7:10 PM" />
        <TimelineItem title="Clinical report" meta="Pending upload" />
      </div>
    </div>
  );
}

function ChatScreen({ setMode }: { setMode: (mode: PhoneMode) => void }) {
  return (
    <div>
      <BackButton onClick={() => setMode("home")} label="Medi AI Chat" />

      <div className="space-y-3 text-left">
        <ChatBubble side="user">
          I have lower back stiffness since yesterday. What should I do?
        </ChatBubble>
        <ChatBubble side="medi">
          I can help you understand possible next steps. Based on your symptoms, I can also help find a relevant doctor.
        </ChatBubble>
        <ChatBubble side="medi">
          Do you want me to look for available orthopedic doctors near you?
        </ChatBubble>
      </div>

      <div className="mt-5 rounded-full bg-white border border-black/5 px-4 py-3 text-sm text-[#86868B] shadow-sm text-left">
        Type a message...
      </div>
    </div>
  );
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-xs font-semibold text-[#0071E3] mb-5 cursor-pointer"
    >
      ← {label}
    </button>
  );
}

function DoctorCard({
  name,
  specialty,
  score,
  time,
}: {
  name: string;
  specialty: string;
  score: string;
  time: string;
}) {
  return (
    <div className="rounded-3xl bg-white border border-black/5 p-4 shadow-sm mb-3 text-left">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h5 className="text-[15px] font-semibold text-neutral-900">{name}</h5>
          <p className="text-xs text-[#86868B]">{specialty}</p>
        </div>
        <div className="text-sm font-bold text-[#0071E3]">{score}</div>
      </div>
      <div className="flex items-center gap-3 text-xs text-[#6E6E73]">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-[#86868B]" />
          Nearby
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-[#86868B]" />
          {time}
        </span>
      </div>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-black/5 px-4 py-3 shadow-sm text-left">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-neutral-900">{label}</span>
        <span className="font-semibold text-[#0071E3]">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E5E5EA] overflow-hidden">
        <div className="h-full rounded-full bg-[#0071E3]" style={{ width: value }} />
      </div>
    </div>
  );
}

function TimelineItem({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="relative pl-6 pb-4">
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#0071E3]" />
      <div className="absolute left-[5px] top-5 bottom-0 w-px bg-[#D2D2D7]" />
      <h5 className="text-sm font-semibold text-neutral-900">{title}</h5>
      <p className="text-xs text-[#86868B]">{meta}</p>
    </div>
  );
}

function ChatBubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "user" | "medi";
}) {
  const isUser = side === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-[#0071E3] text-white rounded-br-md"
            : "bg-white text-[#1D1D1F] border border-black/5 rounded-bl-md"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
