import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, GitBranch, Terminal, ShieldAlert, Cpu, 
  Layers, ChevronRight, HelpCircle, User, Network, CheckCircle2, RefreshCw
} from 'lucide-react';
import { C, Atmosphere, Eyebrow } from './cohere';

type BranchId = 'triage_question' | 'autorec' | 'htan_rag' | 'vision_rag' | 'rag_only' | 'direct';

interface BranchInfo {
  id: BranchId;
  label: string;
  badge: string;
  description: string;
  color: string;
  bgSoft: string;
}

export default function AgentGraphScene() {
  const [activeBranch, setActiveBranch] = useState<BranchId>('autorec');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const branches: Record<BranchId, BranchInfo> = {
    triage_question: {
      id: 'triage_question',
      label: 'triage follow-up',
      badge: 'sonnet-loops',
      description: 'sonnet analyzes symptoms and asks a targeted follow-up question. state transitions back to the router once answered.',
      color: C.quartz,
      bgSoft: C.quartzSoft
    },
    autorec: {
      id: 'autorec',
      label: 'autorec → booking',
      badge: 'coral-highlight',
      description: 'queries the neural collaborative filtering recommender, matches high-suitability doctors, and invokes playwright scheduling worker.',
      color: C.coral,
      bgSoft: C.coralSoft
    },
    htan_rag: {
      id: 'htan_rag',
      label: 'htan_rag / htan_only',
      badge: 'cell-spatial',
      description: 'routes spatial cell maps and segmentation datasets directly to the htan reasoning sub-graph.',
      color: C.green,
      bgSoft: C.greenSoft
    },
    vision_rag: {
      id: 'vision_rag',
      label: 'vision_rag / vision_only',
      badge: 'ocr-extraction',
      description: 'extracts structured clinical telemetry from patient uploads, combining image data with medical knowledge bases.',
      color: C.blue,
      bgSoft: C.blueSoft
    },
    rag_only: {
      id: 'rag_only',
      label: 'rag_only (clinical literature)',
      badge: 'literature-lookup',
      description: 'forces direct semantic search lookup against indexed biomedical publications and journals without spatial imaging.',
      color: C.muted,
      bgSoft: '#F0EFEA'
    },
    direct: {
      id: 'direct',
      label: 'direct fallback response',
      badge: 'instant-resolve',
      description: 'bypass node execution for administrative or basic informational queries, responding immediately using routing presets.',
      color: C.faint,
      bgSoft: '#F6F3EE'
    }
  };

  return (
    <section 
      id="agent-graph-root"
      className="relative min-h-screen py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: C.ground }}
    >
      <Atmosphere variant="mixed" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Top Header Block */}
        <div className="text-left max-w-4xl space-y-4">
          <Eyebrow text="intelligent orchestrator" />
          <h2 
            className="text-5xl md:text-7xl font-display font-light tracking-tight leading-none"
            style={{ color: C.ink }}
          >
            langgraph gateway pipeline
          </h2>
          <p 
            className="text-sm md:text-base font-sans font-light max-w-2xl leading-relaxed"
            style={{ color: C.inkSoft }}
          >
            medilink-gateway coordinates complex model flows and browser orchestration. interact with the branch chips below to inspect details of the active routing state.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Interactive LangGraph Pipeline (Col span 7) */}
          <div 
            className="lg:col-span-7 rounded-[28px] p-6 md:p-8 border flex flex-col items-center justify-between shadow-xs relative"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
              <Network className="w-3.5 h-3.5 animate-pulse" style={{ color: C.coral }} />
              <span>live graph visualization</span>
            </div>

            {/* Pipeline Stage 1: User Message */}
            <div className="w-full flex flex-col items-center">
              <motion.div 
                className="px-5 py-3 rounded-xl border text-center font-mono text-xs select-none relative z-10 transition-all cursor-pointer"
                style={{ 
                  backgroundColor: C.ground2, 
                  borderColor: hoveredNode === 'user_msg' ? C.coral : C.line,
                  color: C.inkSoft
                }}
                onMouseEnter={() => setHoveredNode('user_msg')}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" style={{ color: C.coral }} />
                  <span>patient query (http payload)</span>
                </div>
                {hoveredNode === 'user_msg' && (
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-48 p-2 bg-black text-white text-[9px] rounded-lg shadow-lg pointer-events-none z-50">
                    entrypoint triggers the multi-agent workflow
                  </div>
                )}
              </motion.div>
              
              <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-[#E7E0D4]" />
            </div>

            {/* Pipeline Stage 2: FastAPI Web App */}
            <div className="w-full flex flex-col items-center">
              <motion.div 
                className="px-5 py-3 rounded-xl border text-center font-mono text-xs select-none relative z-10 transition-all cursor-pointer"
                style={{ 
                  backgroundColor: C.ground2, 
                  borderColor: hoveredNode === 'fastapi' ? C.coral : C.line,
                  color: C.inkSoft
                }}
                onMouseEnter={() => setHoveredNode('fastapi')}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" style={{ color: C.blue }} />
                  <span>fastapi gateway (app/main.py :8000)</span>
                </div>
              </motion.div>
              
              <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-[#E7E0D4]" />
            </div>

            {/* Pipeline Stage 3: MediLinkState Initializer */}
            <div className="w-full flex flex-col items-center">
              <motion.div 
                className="px-5 py-3 rounded-xl border text-center font-mono text-xs select-none relative z-10 transition-all cursor-pointer"
                style={{ 
                  backgroundColor: C.ground2, 
                  borderColor: hoveredNode === 'state' ? C.coral : C.line,
                  color: C.inkSoft
                }}
                onMouseEnter={() => setHoveredNode('state')}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" style={{ color: C.green }} />
                  <span>initial state schema (MediLinkState)</span>
                </div>
              </motion.div>
              
              <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-[#E7E0D4]" />
            </div>

            {/* Pipeline Stage 4: Haiku Router */}
            <div className="w-full flex flex-col items-center mb-6">
              <motion.div 
                className="px-6 py-4 rounded-xl border text-center font-mono text-xs select-none relative z-10 transition-all cursor-pointer shadow-xs"
                style={{ 
                  backgroundColor: C.ground2, 
                  borderColor: hoveredNode === 'router' ? C.coral : C.coral,
                  borderWidth: '2px',
                  color: C.ink
                }}
                onMouseEnter={() => setHoveredNode('router')}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2.5 font-bold">
                  <Cpu className="w-4 h-4 animate-spin" style={{ color: C.coralDeep }} />
                  <span>haiku router (intent_router.py)</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 lowercase font-normal">
                  categorizes intent with sub-second latency
                </div>
              </motion.div>
            </div>

            {/* Branch Chips Container */}
            <div className="w-full border-t border-b border-neutral-100 py-6 my-2 space-y-4">
              <div className="text-center font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                - state branch selector (tap to trace pipeline) -
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {(Object.keys(branches) as BranchId[]).map((key) => {
                  const br = branches[key];
                  const isActive = activeBranch === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveBranch(key)}
                      className="px-3 py-2 rounded-xl text-xs font-mono lowercase transition-all duration-300 flex items-center gap-1.5 border cursor-pointer select-none"
                      style={{
                        backgroundColor: isActive ? br.bgSoft : C.card,
                        borderColor: isActive ? br.color : C.line,
                        color: isActive ? C.ink : C.muted,
                        fontWeight: isActive ? '600' : 'normal',
                        boxShadow: isActive ? `0 4px 12px ${br.color}15` : 'none'
                      }}
                    >
                      <GitBranch className="w-3 h-3" style={{ color: br.color }} />
                      <span>{br.label}</span>
                      {key === 'autorec' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Branch Detail Panel */}
            <div className="w-full min-h-[190px] flex items-center justify-center p-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBranch}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full p-5 rounded-2xl border text-left space-y-4"
                  style={{ backgroundColor: C.ground2, borderColor: C.line }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-mono tracking-widest uppercase font-bold"
                      style={{ color: branches[activeBranch].color }}
                    >
                      active route: {branches[activeBranch].badge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      medilink-gateway v1
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {branches[activeBranch].description}
                  </p>

                  {/* Render sub-flow if autorec is selected */}
                  {activeBranch === 'autorec' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-neutral-200/60 space-y-3"
                    >
                      <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                        nested active sub-flow schema:
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-neutral-200/50">
                        {/* Autorec Node */}
                        <div className="flex flex-col items-center text-center p-2 rounded-lg bg-neutral-50/50 border border-neutral-100 flex-1 w-full">
                          <span className="text-[8px] font-mono text-neutral-400">NODE :8003</span>
                          <span className="text-xs font-semibold font-mono text-[#E8512F] mt-0.5">autorec_node</span>
                          <span className="text-[8px] text-neutral-500 mt-1 font-sans">neural collaborative filtering recommender</span>
                        </div>
                        
                        <ChevronRight className="w-4 h-4 text-neutral-400 hidden md:block" />
                        <ArrowDown className="w-4 h-4 text-neutral-400 block md:hidden" />

                        {/* Booking Node */}
                        <div className="flex flex-col items-center text-center p-2 rounded-lg bg-neutral-50/50 border border-neutral-100 flex-1 w-full">
                          <span className="text-[8px] font-mono text-neutral-400">NODE :8004</span>
                          <span className="text-xs font-semibold font-mono text-neutral-800 mt-0.5">booking_node</span>
                          <span className="text-[8px] text-neutral-500 mt-1 font-sans">vezeta playwright reservation worker</span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-neutral-400 hidden md:block" />
                        <ArrowDown className="w-4 h-4 text-neutral-400 block md:hidden" />

                        {/* Confirm Node */}
                        <div className="flex flex-col items-center text-center p-2 rounded-lg bg-emerald-50 border border-emerald-100 flex-1 w-full">
                          <span className="text-[8px] font-mono text-emerald-400">STATE EXIT</span>
                          <span className="text-xs font-semibold font-mono text-emerald-800 mt-0.5">confirm_state</span>
                          <span className="text-[8px] text-emerald-600 mt-1 font-sans">referral payload resolved</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Merge node for remaining pipeline */}
            <div className="w-full flex flex-col items-center mt-6">
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#E7E0D4] to-transparent" />
              
              <motion.div 
                className="px-5 py-3 rounded-xl border text-center font-mono text-xs select-none relative z-10 transition-all cursor-pointer"
                style={{ 
                  backgroundColor: C.ground2, 
                  borderColor: hoveredNode === 'sonnet_reason' ? C.coral : C.line,
                  color: C.inkSoft
                }}
                onMouseEnter={() => setHoveredNode('sonnet_reason')}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" style={{ color: C.quartz }} />
                  <span>sonnet final reasoning (medical_llm.py)</span>
                </div>
              </motion.div>

              <div className="w-0.5 h-5 bg-neutral-200" />

              <motion.div 
                className="px-5 py-3 rounded-xl border text-center font-mono text-xs select-none relative z-10 transition-all cursor-pointer"
                style={{ 
                  backgroundColor: C.ground2, 
                  borderColor: hoveredNode === 'report' ? C.coral : C.line,
                  color: C.inkSoft
                }}
                onMouseEnter={() => setHoveredNode('report')}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>report generator (report_generator.py)</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Two Editorial Cards (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card A: Which Claude Runs Where */}
            <div 
              className="rounded-[24px] p-6 md:p-8 border shadow-xs text-left space-y-6"
              style={{ backgroundColor: C.card, borderColor: C.line }}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">resource routing</span>
                <h3 className="text-2xl font-display font-light text-neutral-900 leading-tight">which claude runs where?</h3>
              </div>

              <div className="space-y-4">
                {/* Haiku */}
                <div className="space-y-2 pb-4 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-900">claude 3.5 haiku</span>
                    <span className="text-[9px] font-mono bg-neutral-100 px-2 py-0.5 rounded text-neutral-500">routing / extraction</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    orchestrates real-time intent classification, parses complex image extraction tasks, and validates security checks. execution runs under 800ms.
                  </p>
                </div>

                {/* Sonnet */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E8512F]">claude 3.5 sonnet</span>
                    <span className="text-[9px] font-mono bg-orange-50 px-2 py-0.5 rounded text-[#E8512F]">clinical reasoning</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    synthesizes citation literature, computes final follow-up questions for triage loops, and structures patient dossiers with supreme medical accuracy.
                  </p>
                </div>
              </div>
            </div>

            {/* Card B: The Fallback Feature */}
            <div 
              className="rounded-[24px] p-6 md:p-8 border shadow-xs text-left space-y-6"
              style={{ backgroundColor: C.card, borderColor: C.line }}
            >
              <div className="space-y-1 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-red-500 uppercase">reliability architecture</span>
                  <h3 className="text-2xl font-display font-light text-neutral-900 leading-tight">the fail-open gate</h3>
                </div>
                <ShieldAlert className="w-8 h-8 text-[#FF7759] shrink-0" />
              </div>

              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                if the haiku gate drops context or an external API is transiently unavailable, the user query <strong className="text-neutral-900">does not fail</strong>. sonnet automatically answers from its broad parametric knowledge base as a baseline safety floor.
              </p>

              <div className="bg-[#FBFAF7] border border-[#E7E0D4] p-4 rounded-xl space-y-3">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">active provider chain:</span>
                
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-700">1. anthropic haiku</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="text-neutral-700">2. gemini flash</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="text-[#E8512F] font-bold">3. fallback floor</span>
                </div>
                
                <div className="text-[9px] text-neutral-400 font-sans leading-snug">
                  referral lookup defaults to local <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-600">llm/fallback.py</code> presets if upstream connection handshakes fail.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
