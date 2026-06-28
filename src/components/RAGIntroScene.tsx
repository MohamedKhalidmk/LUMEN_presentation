import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Database, FileCheck2, Search, ShieldCheck, Sparkles } from 'lucide-react';

const metrics = [
  ['RAG', '0.938'],
  ['Faithful', '0.952'],
  ['BERT', '0.823'],
];

const pipelineNodes = [
  { icon: Search, label: 'Query' },
  { icon: Database, label: 'Weaviate' },
  { icon: FileCheck2, label: 'MedCPT' },
  { icon: ShieldCheck, label: 'PMID' },
];

export default function RAGIntroScene() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      <div className="absolute top-[10%] right-[-12%] w-[580px] h-[580px] bg-blue-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[6%] left-[-10%] w-[540px] h-[540px] bg-indigo-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[32%] left-[38%] w-[420px] h-[420px] bg-cyan-50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-left">
            <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-5">
              Biomedical Grounding Module
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-light text-[#1D1D1F] tracking-tight leading-[0.98]">
              Meet{' '}
              <span className="font-semibold bg-gradient-to-r from-[#0071E3] via-[#5856D6] to-[#00A676] bg-clip-text text-transparent">
                MediLink RAG.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setIsRunning((current) => !current)}
              className="group w-full cursor-pointer text-left focus:outline-none"
              aria-label="Activate MediLink RAG processor visual"
            >
              <div className="rounded-[36px] border border-neutral-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
                <div className="relative h-[430px] overflow-hidden rounded-[30px] bg-[#0B0C10] p-7 [perspective:1200px]">
                  <div className="absolute inset-0 bg-[radial-gradient(#2A2B31_1px,transparent_1px)] [background-size:18px_18px] opacity-45" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_34%,rgba(0,113,227,0.24),transparent_34%),radial-gradient(circle_at_70%_58%,rgba(88,86,214,0.22),transparent_30%)]" />

                  <motion.div
                    data-rag-processor
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ rotateX: 5, rotateY: -7, y: -5 }}
                    whileTap={{ scale: 0.96, rotateX: 9, rotateY: 4 }}
                    animate={{
                      rotateX: isRunning ? 7 : 0,
                      rotateY: isRunning ? -10 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 18 }}
                    className="relative z-10 h-full rounded-[28px] border border-white/10 bg-gradient-to-br from-[#202126] via-[#141519] to-[#07080B] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_60px_rgba(0,0,0,0.38)]"
                  >
                    <div className="absolute left-8 top-7 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.07] flex items-center justify-center text-blue-300 shadow-inner">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                          RAG processor
                        </span>
                        <span className="block font-display text-lg font-semibold text-white">
                          Evidence engine
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-8 top-8 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200">
                      0.938 score
                    </div>

                    <div className="absolute left-1/2 top-[52%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-[42px] border border-white/10 bg-[#050607] shadow-[0_22px_60px_rgba(0,0,0,0.6),inset_0_0_35px_rgba(255,255,255,0.08)]">
                      <motion.div
                        animate={{ rotate: isRunning ? 360 : 0 }}
                        transition={{ duration: 8, ease: 'linear', repeat: isRunning ? Infinity : 0 }}
                        className="absolute inset-5 rounded-[34px] border border-blue-300/25 bg-[conic-gradient(from_90deg,rgba(0,113,227,0.2),rgba(88,86,214,0.18),rgba(0,166,118,0.16),rgba(0,113,227,0.2))]"
                      />
                      <div className="absolute inset-12 rounded-3xl border border-white/10 bg-[#111827] shadow-inner" />
                      <BookOpen className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-blue-200 drop-shadow-[0_0_20px_rgba(96,165,250,0.75)]" />

                      {[0, 1, 2, 3].map((index) => (
                        <motion.div
                          key={index}
                          animate={{
                            opacity: isRunning ? [0.2, 1, 0.2] : 0.35,
                            scale: isRunning ? [0.9, 1.08, 0.9] : 1,
                          }}
                          transition={{ duration: 1.4, delay: index * 0.18, repeat: isRunning ? Infinity : 0 }}
                          className={`absolute h-3 w-3 rounded-full shadow-[0_0_18px_rgba(96,165,250,0.7)] ${
                            index === 0
                              ? 'left-8 top-8 bg-blue-300'
                              : index === 1
                                ? 'right-8 top-10 bg-violet-300'
                                : index === 2
                                  ? 'bottom-8 left-10 bg-emerald-300'
                                  : 'bottom-10 right-8 bg-blue-200'
                          }`}
                        />
                      ))}

                      <motion.div
                        animate={{ opacity: isRunning ? [0, 0.9, 0] : 0 }}
                        transition={{ duration: 1.3, repeat: isRunning ? Infinity : 0 }}
                        className="absolute left-[-52px] right-[-52px] top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                      />
                    </div>

                    <div className="absolute bottom-7 left-7 right-7 grid grid-cols-4 gap-2">
                      {pipelineNodes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                          <motion.div
                            key={node.label}
                            animate={{
                              y: isRunning ? [0, -5, 0] : 0,
                              borderColor: isRunning ? 'rgba(147,197,253,0.42)' : 'rgba(255,255,255,0.1)',
                            }}
                            transition={{ duration: 1.2, delay: index * 0.1, repeat: isRunning ? Infinity : 0 }}
                            className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center"
                          >
                            <Icon className="mx-auto mb-2 h-4 w-4 text-blue-300" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                              {node.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {metrics.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
                      <span className="block text-[10px] font-mono text-neutral-500">{label}</span>
                      <span className="block text-xl font-mono font-bold text-[#0071E3]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
