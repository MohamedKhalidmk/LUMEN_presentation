import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Aperture, Camera, Focus, ScanLine } from 'lucide-react';

const gains = [
  ['ISIC', '+1.05%'],
  ['GlaS', '+3.57%'],
  ['Bowl', '+1.07%'],
];

export default function HTANIntroScene() {
  const [isCapturing, setIsCapturing] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      <div className="absolute top-[10%] right-[-12%] w-[580px] h-[580px] bg-emerald-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[2%] left-[-10%] w-[540px] h-[540px] bg-orange-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[28%] left-[40%] w-[420px] h-[420px] bg-sky-50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-left">
            <span className="text-[11px] font-mono text-emerald-700 tracking-[0.25em] uppercase font-bold block mb-5">
              Computer Vision Module
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-light text-[#1D1D1F] tracking-tight leading-[0.98]">
              Meet{' '}
              <span className="font-semibold bg-gradient-to-r from-[#00A676] via-[#0071E3] to-[#FF6B4A] bg-clip-text text-transparent">
                HTAN.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setIsCapturing((current) => !current)}
              className="group w-full cursor-pointer text-left focus:outline-none"
              aria-label="Activate HTAN camera visual"
            >
              <div className="rounded-[36px] border border-neutral-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
                <div className="relative h-[430px] overflow-hidden rounded-[30px] bg-[#0D0E10] p-7 [perspective:1200px]">
                  <div className="absolute inset-0 bg-[radial-gradient(#2A2B31_1px,transparent_1px)] [background-size:18px_18px] opacity-45" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(0,166,118,0.24),transparent_34%),radial-gradient(circle_at_70%_24%,rgba(0,113,227,0.22),transparent_28%)]" />

                  <motion.div
                    data-htan-camera
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ rotateX: 5, rotateY: -7, y: -5 }}
                    whileTap={{ scale: 0.96, rotateX: 9, rotateY: 4 }}
                    animate={{
                      rotateX: isCapturing ? 7 : 0,
                      rotateY: isCapturing ? -10 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 18 }}
                    className="relative z-10 h-full rounded-[28px] border border-white/10 bg-gradient-to-br from-[#202126] via-[#141519] to-[#08090B] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_60px_rgba(0,0,0,0.38)]"
                  >
                    <div className="absolute left-8 top-7 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.07] flex items-center justify-center text-emerald-300 shadow-inner">
                        <Camera className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                          HTAN capture
                        </span>
                        <span className="block font-display text-lg font-semibold text-white">
                          Medical mask engine
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-8 top-8 flex gap-2">
                      <div className="h-5 w-16 rounded-full bg-white/10 shadow-inner" />
                      <motion.div
                        animate={{ opacity: isCapturing ? [0.3, 1, 0.3] : 0.45 }}
                        transition={{ duration: 1.1, repeat: isCapturing ? Infinity : 0 }}
                        className="h-5 w-5 rounded-full bg-[#00A676] shadow-[0_0_24px_rgba(0,166,118,0.9)]"
                      />
                    </div>

                    <div className="absolute left-1/2 top-[52%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#050607] shadow-[0_22px_60px_rgba(0,0,0,0.6),inset_0_0_35px_rgba(255,255,255,0.08)]">
                      <motion.div
                        animate={{ rotate: isCapturing ? 360 : 0 }}
                        transition={{ duration: 7, ease: 'linear', repeat: isCapturing ? Infinity : 0 }}
                        className="absolute inset-4 rounded-full border border-emerald-300/30 bg-[conic-gradient(from_0deg,rgba(0,166,118,0.16),rgba(0,113,227,0.2),rgba(255,107,74,0.16),rgba(0,166,118,0.16))]"
                      />
                      <motion.div
                        animate={{ scale: isCapturing ? [1, 0.88, 1] : 1 }}
                        transition={{ duration: 1.3, repeat: isCapturing ? Infinity : 0 }}
                        className="absolute inset-12 rounded-full border border-white/20 bg-[radial-gradient(circle_at_35%_30%,#475569,#0F172A_48%,#020617_72%)] shadow-[inset_0_0_28px_rgba(0,113,227,0.35)]"
                      />
                      <div className="absolute inset-[92px] rounded-full bg-emerald-300/80 shadow-[0_0_32px_rgba(52,211,153,0.8)]" />
                      <motion.div
                        animate={{ opacity: isCapturing ? [0, 0.9, 0] : 0 }}
                        transition={{ duration: 1.4, repeat: isCapturing ? Infinity : 0 }}
                        className="absolute left-[-44px] right-[-44px] top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
                      />
                      <motion.div
                        animate={{ opacity: isCapturing ? [0.15, 0.55, 0.15] : 0.18 }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300/30"
                      />
                    </div>

                    <div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 gap-3">
                      {[
                        [ScanLine, 'Input'],
                        [Aperture, 'mHC'],
                        [Focus, 'Mask'],
                      ].map(([Icon, label], index) => {
                        const IconComponent = Icon as typeof ScanLine;
                        return (
                          <motion.div
                            key={label as string}
                            animate={{
                              y: isCapturing ? [0, -5, 0] : 0,
                              borderColor: isCapturing ? 'rgba(52,211,153,0.42)' : 'rgba(255,255,255,0.1)',
                            }}
                            transition={{ duration: 1.2, delay: index * 0.12, repeat: isCapturing ? Infinity : 0 }}
                            className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center"
                          >
                            <IconComponent className="mx-auto mb-2 h-4 w-4 text-emerald-300" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                              {label as string}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {gains.map(([label, gain]) => (
                    <div key={label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
                      <span className="block text-[10px] font-mono text-neutral-500">{label}</span>
                      <span className="block text-xl font-mono font-bold text-emerald-700">{gain}</span>
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
