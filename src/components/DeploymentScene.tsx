import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, Cpu, Activity, ArrowRight, Check, Play, 
  Settings, Terminal, GitMerge, FileCode, AlertCircle, ShieldCheck
} from 'lucide-react';
import { C, Atmosphere, Eyebrow } from './cohere';

interface Microservice {
  name: string;
  port: string;
  instance: string;
  type: 'PUBLIC' | 'PRIVATE';
  hardware: string;
  role: string;
  color: string;
}

interface BugFix {
  title: string;
  problem: string;
  solution: string;
  status: 'resolved';
}

export default function DeploymentScene() {
  const [activeService, setActiveService] = useState<string>('medilink-gateway');
  const [selectedBug, setSelectedBug] = useState<number | null>(0);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  const services: Microservice[] = [
    {
      name: 'medilink-gateway',
      port: ':8000',
      instance: 't3.medium',
      type: 'PUBLIC',
      hardware: '2 vCPUs • 4GB RAM',
      role: 'entrypoint routing, LangGraph orchestrator, API Gateway and rate limiting.',
      color: C.coral
    },
    {
      name: 'medilink-htan',
      port: ':8001',
      instance: 'g4dn.xlarge',
      type: 'PRIVATE',
      hardware: 'GPU T4 (16GB vRAM) • 4 vCPUs • 16GB RAM',
      role: 'executes heavy hyper-transformer spatial segmentations and matrix multipliers.',
      color: C.quartz
    },
    {
      name: 'medilink-rag',
      port: ':8002',
      instance: 't3.large',
      type: 'PRIVATE',
      hardware: '2 vCPUs • 8GB RAM',
      role: 'runs vector embeddings, PubMedBert synonym matcher, and semantic database maps.',
      color: C.green
    },
    {
      name: 'medilink-autorec',
      port: ':8003',
      instance: 't3.medium',
      type: 'PRIVATE',
      hardware: '2 vCPUs • 4GB RAM',
      role: 'neural collaborative filtering doctor matching engine.',
      color: C.blue
    },
    {
      name: 'medilink-agent',
      port: ':8004',
      instance: 't3.medium',
      type: 'PRIVATE',
      hardware: '2 vCPUs • 4GB RAM',
      role: 'autonomous reservation scheduler powered by Playwright browser agents.',
      color: C.faint
    }
  ];

  const pipelineSteps = [
    { title: 'git push', action: 'triggering pipeline from main branch commits.' },
    { title: 'docker build', action: 'bundling python:3.11-slim, torch-cpu, and caching weights.' },
    { title: 'docker push', action: 'pushing tagged image (:latest + :git-sha) to DockerHub registry.' },
    { title: 'ssh deploy', action: 'initiating secure handshake using appleboy/ssh-action on target node.' },
    { title: 'compose pull/up', action: 'running docker compose pull & up -d --remove-orphans & prune.' }
  ];

  const bugsFixed: BugFix[] = [
    {
      title: 'weaviate leader-not-found',
      problem: 'cluster split-brain state during multi-container restarts inside isolated docker subnets.',
      solution: 'disabled raft consensus clustering, co-deploying a standalone weaviate 1.27 container with no external vectorizer.',
      status: 'resolved'
    },
    {
      title: 'cd *** missing secret',
      problem: 'CI/CD pipeline failed to establish ssh handshake due to masked secret parsing errors.',
      solution: 'refactored github workflow action parameters to cleanly serialize standard SSH private keys without shell expansion issues.',
      status: 'resolved'
    },
    {
      title: 'quality gate always dropping',
      problem: 'Haiku router flagged positive clinical terms as unverified content, discarding matches.',
      solution: 'loosened the context validation thresholds and added a deterministic regex bypass for pre-verified credentials.',
      status: 'resolved'
    },
    {
      title: 'corrupt .npy embeddings',
      problem: 'numpy float-truncations during fast disk saves corrupted reference vector weights.',
      solution: 'swapped storage to structured safetensors files to enforce strict type assertions on float32 weights.',
      status: 'resolved'
    },
    {
      title: 'tta sigmoid-before-averaging',
      problem: 'taking sigmoids on augmentations before averaging diluted predictions, reducing Dice scores.',
      solution: 'realigned the Test-Time Augmentation loop to average raw logit tensors first, then apply the final sigmoid threshold.',
      status: 'resolved'
    }
  ];

  return (
    <section 
      id="deployment-root"
      className="relative min-h-screen py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: C.ground }}
    >
      <Atmosphere variant="mixed" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Title Block */}
        <div className="text-left max-w-4xl space-y-4">
          <Eyebrow text="cloud orchestration and pipelines" />
          <h2 
            className="text-5xl md:text-7xl font-display font-light tracking-tight leading-none text-neutral-900"
          >
            production microservices topology
          </h2>
          <p 
            className="text-sm md:text-base font-sans font-light max-w-2xl leading-relaxed"
            style={{ color: C.inkSoft }}
          >
            explore our secure cloud infrastructure. medilink distributes complex clinical workloads across 5 isolated containers, deployed continuously from github actions.
          </p>
        </div>

        {/* TOPOLOGY & MICROSERVICES (Grid Col 12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Service Topology Map (Col span 7) */}
          <div 
            className="lg:col-span-7 rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6 relative"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">infrastructure mapping</span>
                <h3 className="text-2xl font-display font-light text-neutral-900">microservice clusters</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
                <span>all nodes online</span>
              </span>
            </div>

            {/* Interactive Visual Network Topology Map */}
            <div className="bg-[#FBFAF7] border border-[#E7E0D4]/60 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-[300px]">
              
              {/* Connected Dots Network Layer */}
              <div className="flex-1 flex flex-col justify-around relative">
                {services.map((srv, idx) => {
                  const isActive = activeService === srv.name;
                  return (
                    <div 
                      key={srv.name}
                      onClick={() => setActiveService(srv.name)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive ? 'bg-white shadow-2xs' : 'bg-transparent border-transparent hover:bg-white/40'
                      }`}
                      style={{ 
                        borderColor: isActive ? srv.color : 'transparent',
                        paddingLeft: idx * 24 + 10
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <Server className="w-4 h-4 shrink-0" style={{ color: srv.color }} />
                        <span className="font-mono text-xs font-semibold text-neutral-800">
                          {srv.name} <span className="text-neutral-400 font-normal">{srv.port}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] font-mono">
                        <span className="text-neutral-400">{srv.instance}</span>
                        <span 
                          className="px-2 py-0.5 rounded-md border text-[9px]"
                          style={{ 
                            color: srv.type === 'PUBLIC' ? C.coralDeep : C.muted,
                            backgroundColor: srv.type === 'PUBLIC' ? C.coralSoft : '#E7E0D410',
                            borderColor: srv.type === 'PUBLIC' ? C.coral : C.line
                          }}
                        >
                          {srv.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Active Service Detail Panel */}
            <div className="min-h-[100px] flex items-center justify-center p-1">
              <AnimatePresence mode="wait">
                {activeService && (
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="w-full p-4 rounded-xl border space-y-2 text-xs"
                    style={{ 
                      backgroundColor: C.ground2, 
                      borderColor: services.find(s => s.name === activeService)?.color || C.line 
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-neutral-900 uppercase">
                        node specifications: {activeService}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {services.find(s => s.name === activeService)?.hardware}
                      </span>
                    </div>
                    <p className="text-neutral-500 font-sans leading-relaxed">
                      {services.find(s => s.name === activeService)?.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Block: Image Design & Safety Guarantee (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Image Design Specs */}
            <div 
              className="rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6"
              style={{ backgroundColor: C.card, borderColor: C.line }}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">image design</span>
                <h3 className="text-2xl font-display font-light text-neutral-900">container specifications</h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                  <span className="text-neutral-500">base image</span>
                  <span className="text-neutral-900 font-bold bg-[#FBFAF7] px-2 py-0.5 rounded border border-[#E7E0D4]">python:3.11-slim</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                  <span className="text-neutral-500">deep learning</span>
                  <span className="text-neutral-900 font-bold">cpu-only torch compiler</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                  <span className="text-neutral-500">vector engine</span>
                  <span className="text-neutral-900 font-bold">weaviate 1.27 (co-deployed)</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                  <span className="text-neutral-500">weights cache</span>
                  <span className="text-neutral-900 font-bold">shared huggingface mount</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">cold start limit</span>
                  <span className="text-neutral-900 font-bold text-[#E8512F]">~120s container spinup</span>
                </div>
              </div>
            </div>

            {/* Safety Guarantee */}
            <div 
              className="rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-4"
              style={{ backgroundColor: C.card, borderColor: C.line }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" style={{ color: C.green }} />
                <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-bold">
                  safety guarantee metric
                </span>
              </div>

              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                <strong className="text-neutral-900">reliability guarantee:</strong> our clinical validation layer enforces a strict routing floor. if the weaviate context gate drops mid-session, Claude 3.5 Sonnet gracefully drops back to parametric medical reasoning. the gate can only <span className="text-emerald-700 font-bold">improve never degrade</span> baseline performance.
              </p>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: CI/CD Pipeline & Interactive Bugs List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: CI/CD Pipeline (Col span 6) */}
          <div 
            className="lg:col-span-6 rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6 flex flex-col justify-between"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">continuous integration</span>
              <h3 className="text-2xl font-display font-light text-neutral-900">pipeline (rag-ci-cd.yml)</h3>
              <p className="text-xs text-neutral-500 font-sans font-light">
                automated jobs running on commit pushes to the production main branch.
              </p>
            </div>

            {/* Pipeline Step List */}
            <div className="space-y-3 pt-4">
              {pipelineSteps.map((step, idx) => {
                const isActive = activePipelineStep === idx;
                return (
                  <div 
                    key={step.title}
                    onClick={() => setActivePipelineStep(idx)}
                    className="flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer"
                    style={{ 
                      backgroundColor: isActive ? C.ground2 : 'transparent',
                      borderColor: isActive ? C.coral : 'transparent' 
                    }}
                  >
                    <span 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono"
                      style={{ 
                        backgroundColor: isActive ? C.coralSoft : '#E7E0D430',
                        color: isActive ? C.coralDeep : C.muted
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-neutral-900">{step.title}</span>
                      <p className="text-[11px] text-neutral-500 font-sans">{step.action}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Interactive Bugs Fixed List (Col span 6) */}
          <div 
            className="lg:col-span-6 rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6 flex flex-col justify-between"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">diagnostic records</span>
              <h3 className="text-2xl font-display font-light text-neutral-900">interactive bug register</h3>
              <p className="text-xs text-neutral-500 font-sans font-light">
                records of critical pipeline resolutions during testing phases. select a record to review details.
              </p>
            </div>

            {/* Switcher list */}
            <div className="space-y-2 pt-2 flex-1">
              {bugsFixed.map((bug, idx) => {
                const isSelected = selectedBug === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedBug(idx)}
                    className="w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-mono transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? C.ground2 : 'transparent',
                      borderColor: isSelected ? C.coral : C.line,
                      color: isSelected ? C.ink : C.muted
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" style={{ color: isSelected ? C.coral : C.muted }} />
                      <span>{bug.title}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">
                      {bug.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Display Detail */}
            <div className="h-[96px] pt-4 border-t border-neutral-100">
              <AnimatePresence mode="wait">
                {selectedBug !== null && (
                  <motion.div
                    key={selectedBug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1 text-xs"
                  >
                    <div>
                      <span className="font-mono text-red-500 uppercase tracking-wider text-[9px] font-bold block">problem identifier:</span>
                      <p className="text-neutral-500 font-sans font-light leading-snug">{bugsFixed[selectedBug].problem}</p>
                    </div>
                    <div className="pt-1.5">
                      <span className="font-mono text-emerald-600 uppercase tracking-wider text-[9px] font-bold block">resolution fix:</span>
                      <p className="text-neutral-900 font-sans leading-snug">{bugsFixed[selectedBug].solution}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
