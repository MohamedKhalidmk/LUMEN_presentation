import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowUpRight, TrendingUp, Users, ShieldAlert, Layers } from 'lucide-react';

export default function ProblemScene() {
  const fragments = [
    { 
      title: 'Symptom Inquiries', 
      desc: 'Conversational symptoms captured in standard disjointed chat bubbles with zero professional medical grounding references.',
      color: 'border-l-4 border-amber-500'
    },
    { 
      title: 'Dermoscopic Scans', 
      desc: 'Raw consumer skin photography stored unconnected to laboratory cases or medical files.',
      color: 'border-l-4 border-sky-500'
    },
    { 
      title: 'Academic Evidence', 
      desc: 'Millions of peer-reviewed clinical research files untouched by typical consumer triage apps or search portals.',
      color: 'border-l-4 border-emerald-500'
    },
    { 
      title: 'Specialist Triage', 
      desc: 'Disjointed directories force patients to locate and schedule appointments without clear pre-evaluated diagnostic records.',
      color: 'border-l-4 border-purple-500'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center items-center py-28 px-6 md:px-12 select-none overflow-hidden border-b border-neutral-200">
      {/* Delicate, warm top spotlight mimicking physical Apple presentation stages */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-5xl w-full z-10 flex flex-col justify-center text-left relative">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-mono text-[#86868B] tracking-[0.25em] uppercase font-bold mb-4 block"
        >
          THE CHALLENGE IN DIGITIZATION
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.1] mb-12 max-w-4xl"
        >
          Egyptian healthcare is digital. <br />
          <span className="text-[#86868B] font-normal">But care is still fragmented.</span>
        </motion.h2>

        {/* Spacious Factual Narrative */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#424245] text-base md:text-lg font-light leading-relaxed mb-16 max-w-3xl font-sans"
        >
          Clinical infrastructure in the MENA region is increasingly digital, yet the actual care loop remains profoundly disconnected. High-resolution diagnostic imagery, colloquial patient symptoms, verified clinical trials, and booking portals exist as isolated islands. MediLink unifies these steps into a singular patient flow.
        </motion.p>

        {/* Large visual statistic comparisons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-[#D2D2D7]/40 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[260px] shadow-sm transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#86868B] tracking-widest uppercase font-bold">DIGITAL ORCHESTRATION</span>
              <div className="bg-[#0071E3]/10 text-[#0071E3] p-1.5 rounded-full">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-6xl md:text-7xl font-extralight tracking-tighter text-[#1D1D1F]">6.67%</span>
                <span className="text-[#0071E3] font-mono text-sm font-bold">on-time care</span>
              </div>
              
              {/* Apple style progress slider */}
              <div className="w-full bg-[#F5F5F7] h-2 rounded-full overflow-hidden mt-6 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '6.67%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="bg-[#0071E3] h-full rounded-full"
                />
              </div>

              <p className="text-xs text-[#86868B] mt-5 font-sans leading-relaxed">
                The current digital orchestration rate for physical referrals. Rich diagnostics are generated on patient phones daily, but are rarely connected smoothly to the specialist at consultation time.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-[#D2D2D7]/40 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[260px] shadow-sm transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#86868B] tracking-widest uppercase font-bold">REGIONAL BOTTLENECK</span>
              <div className="bg-red-500/10 text-red-500 p-1.5 rounded-full">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-6xl md:text-7xl font-extralight tracking-tighter text-[#1D1D1F]">25M+</span>
                <span className="text-red-500 font-mono text-xs font-bold uppercase">Patients</span>
              </div>

              <div className="w-full bg-[#F5F5F7] h-2 rounded-full overflow-hidden mt-6 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="bg-red-500 h-full rounded-full"
                />
              </div>

              <p className="text-xs text-[#86868B] mt-5 font-sans leading-relaxed">
                Patients locked behind medical operational silos. Egyptian users navigating fragmented appointment pipelines with complex, unexplained skin biopsy and lab results.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Spacious structural cards displaying fragmented segments */}
        <div className="space-y-6 pt-4">
          <span className="text-[11px] font-mono text-[#86868B] tracking-widest uppercase block font-semibold">THE UNTUNED WORKFLOW SILOS IN TYPICAL SCRIPT-LEVEL CHATBOTS:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fragments.map((frag, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.01, border: '1px solid #D2D2D7' }}
                className={`bg-white border border-[#D2D2D7]/30 rounded-2xl p-5 shadow-sm transition-all text-left ${frag.color}`}
                id={`fragment-card-${idx}`}
              >
                <h4 className="text-sm font-display font-semibold text-[#1D1D1F] mb-2">{frag.title}</h4>
                <p className="text-xs text-[#6E6E73] leading-relaxed font-sans font-light">
                  {frag.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
