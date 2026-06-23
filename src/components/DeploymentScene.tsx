import React from 'react';
import { Server, Cpu } from 'lucide-react';

export default function DeploymentScene() {
  const instances = [
    {
      id: 'instance-htan',
      title: 'AWS EC2 instances: HTAN (GPU)',
      type: 'g4dn.xlarge Dedicated GPU cluster',
      task: 'Loads and runs Swin-Transformer segmentation models in parallel, executing spatial flips and calculations within milliseconds.',
      status: 'Active',
      spec: 'NVIDIA T4 Tensor Core • 16GB vRAM • 4 vCPUs'
    },
    {
      id: 'instance-rag',
      title: 'AWS EC2 instances: Biomedical RAG (CPU)',
      type: 'r6i.large Memory-Optimized CPU nodes',
      task: 'Handles high density PubMed abstract search vectors, mapping S-PubMedBERT, MedCPT Synonym synch and Weaviate indexes.',
      status: 'Active',
      spec: 'Intel Xeon Processor • 16GB RAM • 2 vCPUs'
    },
    {
      id: 'instance-gateway',
      title: 'AWS EC2 instances: Routing Gateway (CPU)',
      type: 't3.large General Purpose CPU gateway',
      task: 'Mounts the LangGraph stateful orchestrators, managing API routers, HTTP requests, session memories, and safety audits.',
      status: 'Active',
      spec: 'Burstable AMD Processor • 8GB RAM • 2 vCPUs'
    }
  ];

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-32 px-6 md:px-12 select-none border-b border-white/5">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-left mb-20 max-w-3xl">
          <span className="text-[10px] font-mono text-[#A1A1A6] tracking-[0.25em] uppercase font-bold block mb-3">CLOUD SERVICE ARCHITECTURE</span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.1] mb-6">
            Isolated cloud computing. <br />
            <span className="text-neutral-500">FastAPI distributed endpoints.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans">
            To ensure high horizontal scalability and absolute patient isolation, Lumen is containerized into physical distributed CPU and GPU instance nodes on AWS EC2. Each service communicates securely over verified HTTPS tunnels.
          </p>
        </div>

        {/* 3 Clean Server Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {instances.map((inst, idx) => (
            <div 
              key={inst.id}
              className="bg-[#111111] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
              id={`instance-card-${idx}`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <Server className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
                  <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded text-emerald-400 font-mono">
                    {inst.status}
                  </span>
                </div>
                
                <h3 className="text-base font-display font-medium text-[#F5F5F7] mb-1">{inst.title}</h3>
                <p className="text-[10px] font-mono text-[#0071E3] mb-4">{inst.type}</p>
                
                <p className="text-xs text-[#A1A1A6] leading-relaxed font-sans">{inst.task}</p>
              </div>

              {/* Hardware specifications details block */}
              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">INSTANCE SPECIFICATION</span>
                <span className="text-[10px] font-mono text-[#F5F5F7] block leading-normal">{inst.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
