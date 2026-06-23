import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Zap, Cpu, Database, HelpCircle, Activity } from 'lucide-react';

export default function RoutingScene() {
  const [activeRoute, setActiveRoute] = useState<number | null>(null);

  const routes = [
    {
      id: 0,
      name: 'Route A: Direct Administrative',
      target: 'CPU Gateway',
      color: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.15)]',
      routeColor: '#FBBF24',
      latency: 'Sub 40ms',
      desc: 'Dispatched for conversational administrative inquiries, scheduling, maps or directories, bypassing deep neural layers to maximize resource efficiency.'
    },
    {
      id: 1,
      name: 'Route B: HTAN Segmentation',
      target: 'GPU Cluster',
      color: 'text-sky-400 border-sky-400/20 bg-sky-400/5',
      glow: 'shadow-[0_0_15px_rgba(56,189,248,0.15)]',
      routeColor: '#38BDF8',
      latency: '180ms',
      desc: 'Triggered upon dermatological image uploads. Invokes the multi-scale Swin-Transformer segmentation model to extract lesion margin geometries.'
    },
    {
      id: 2,
      name: 'Route C: RAG Fact Retrieval',
      target: 'Weaviate Dense DB',
      color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.15)]',
      routeColor: '#34D399',
      latency: '90ms',
      desc: 'Initiated when patients inquire about clinical terminologies. Conducts PubMedBERT vector matches to inject literature abstracts.'
    },
    {
      id: 3,
      name: 'Route D: Joint Hybrid Pipeline',
      target: 'Unified GPU/Weaviate Stack',
      color: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
      glow: 'shadow-[0_0_15px_rgba(192,132,252,0.15)]',
      routeColor: '#C084FC',
      latency: '340ms',
      desc: 'Executed for complex clinical submissions requiring simultenous spatial margin analysis and fact-checked citation embedding into Claude Sonnet.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-28 px-6 md:px-12 select-none border-b border-white/5 overflow-hidden">
      {/* Background ambient noise */}
      <div className="absolute top-[25%] left-[25%] w-[500px] h-[300px] bg-[#0071E3]/2 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context, Science, Optimization details */}
          <div className="lg:col-span-4 text-left space-y-8">
            <div>
              <span className="text-[10px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3">STATEFUL GATEWAY ROUTING</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.15] mb-5">
                Intelligent routing. <br />
                <span className="text-neutral-500 font-normal">Maximum throughput.</span>
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed font-sans font-light">
                Under the hood, Lumen utilizes dual state machine routing built in LangGraph. By parsing query intent at the edge API gateway, requests are immediately targeted to dedicated micro-clusters. This prevents redudant GPU computations and guarantees sub-second response delivery.
              </p>
            </div>

            {/* Micro Latency telemetry */}
            <div className="bg-[#111112] p-6 rounded-2xl border border-white/10 space-y-4">
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold block">GATEWAY METRICS STATUS</span>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-sans">Edge Gateway Classification:</span>
                  <span className="font-mono text-emerald-400 font-bold ml-2">~14ms</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-sans">Pipeline Routing Decision:</span>
                  <span className="font-mono text-white">~6ms</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-sans">GPU Peak VRAM Footprint:</span>
                  <span className="font-mono text-[#0071E3] font-bold">Optimized -30%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful interactive SVG flow workspace */}
          <div className="lg:col-span-8 bg-[#111112] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider">LANGGRAPH CONDITIONAL WORKFLOW DIAGRAM</span>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#0071E3] font-bold uppercase">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>State Stream Active</span>
              </div>
            </div>

            {/* Interactive Flow Visual Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch relative">
              
              {/* Left Box: Central Router Gate */}
              <div className="md:col-span-4 flex flex-col justify-center items-center p-6 bg-black border border-white/5 rounded-2xl relative min-h-[160px] group">
                {/* Micro glow behind router */}
                <div className="absolute inset-0 bg-[#0071E3]/2 filter blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="w-12 h-12 rounded-full bg-[#1C1C1E] border border-white/12 flex items-center justify-center mb-4 text-[#0071E3] relative z-10 shadow-lg">
                  <Network className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h4 className="text-xs font-mono font-bold text-white relative z-10">Lumen Router</h4>
                <p className="text-[10px] text-neutral-500 text-center font-sans mt-2 relative z-10 leading-normal">
                  Classifies semantics, schedules specific GPU/Weaviate pods.
                </p>
              </div>

              {/* Middle Connecting Column: Animated SVG Line paths */}
              <div className="hidden md:col-span-3 md:flex items-center justify-center relative">
                <svg className="w-full h-full min-h-[220px]" viewBox="0 0 120 220" fill="none">
                  {/* Route Paths */}
                  {routes.map((rt) => {
                    const isSelected = activeRoute === rt.id;
                    const pathD = `M 10 110 C 50 110, 70 ${40 + rt.id * 46}, 110 ${40 + rt.id * 46}`;
                    
                    return (
                      <g key={rt.id}>
                        {/* Static Path line */}
                        <path
                          d={pathD}
                          stroke={isSelected ? rt.routeColor : '#222224'}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {/* Particle traveling along paths when active */}
                        {isSelected && (
                          <motion.circle
                            r="4"
                            fill={rt.routeColor}
                            animate={{ cx: [10, 110], cy: [110, 40 + rt.id * 46] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Right Boxes: The micro-cluster targets */}
              <div className="md:col-span-5 space-y-3 flex flex-col justify-center">
                {routes.map((rt) => {
                  const isSelected = activeRoute === rt.id;

                  return (
                    <div
                      key={rt.id}
                      onMouseEnter={() => setActiveRoute(rt.id)}
                      onMouseLeave={() => setActiveRoute(null)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? `bg-[#1D1D20]/50 border-white/20 ${rt.glow}` 
                          : 'bg-black border-white/5 hover:border-white/10'
                      }`}
                      id={`route-card-visual-${rt.id}`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-mono font-bold tracking-tight text-white">{rt.name}</span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${rt.color}`}>
                          {rt.latency}
                        </span>
                      </div>
                      
                      {isSelected ? (
                        <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mt-1 animate-fade-in">
                          {rt.desc}
                        </p>
                      ) : (
                        <div className="flex justify-between items-center text-[9.5px] font-mono text-neutral-500">
                          <span>Target: {rt.target}</span>
                          <span>Hover to inspect path</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            <span className="block text-center text-[9px] font-mono text-neutral-500 uppercase tracking-widest leading-loose">
              Hover route cards to engage diagnostic packets and trace pipeline connections
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
