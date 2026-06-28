import React from 'react';
import { ArrowRight, ScanLine, Table2, Workflow } from 'lucide-react';

export default function HTANIntroScene() {
  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      <div className="absolute top-[12%] right-[-12%] w-[560px] h-[560px] bg-emerald-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[4%] left-[-10%] w-[520px] h-[520px] bg-orange-50 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-left">
            <span className="text-[11px] font-mono text-emerald-700 tracking-[0.25em] uppercase font-bold block mb-4">
              Computer Vision Module
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-light leading-[1.02] tracking-tight">
              Meet HTAN.
              <br />
              <span className="text-[#86868B]">Topology-aware medical segmentation.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base text-neutral-600 leading-relaxed font-light">
              HTAN is the computer vision research path in MediLink: it starts with pixel-level segmentation, inserts manifold-constrained hyper-connections into TransAttUNet, then proves the gain on ISIC-2018, GlaS, and Data Science Bowl.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-[32px] border border-neutral-200 bg-white p-6 shadow-lg">
            <div className="rounded-3xl bg-[#111112] text-white p-6 overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#2b2c32_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
              <div className="relative z-10 space-y-5">
                {[
                  { icon: ScanLine, title: 'Input image', text: 'Dermoscopic, histology, or nuclei image.' },
                  { icon: Workflow, title: 'HTAN bottleneck', text: 'TransAttUNet plus mHC routing.' },
                  { icon: Table2, title: 'Measured result', text: 'Dice, IoU, ACC, REC, and PRE.' },
                ].map((item, index) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500">0{index + 1}</span>
                      <h3 className="font-display font-semibold">{item.title}</h3>
                      <p className="text-xs text-neutral-400">{item.text}</p>
                    </div>
                    {index < 2 && <ArrowRight className="ml-auto h-4 w-4 text-neutral-600" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                ['ISIC', '+1.05%'],
                ['GlaS', '+3.57%'],
                ['Bowl', '+1.07%'],
              ].map(([label, gain]) => (
                <div key={label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
                  <span className="block text-[10px] font-mono text-neutral-500">{label}</span>
                  <span className="block text-xl font-mono font-bold text-emerald-700">{gain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
