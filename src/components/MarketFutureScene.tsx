import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function MarketFutureScene() {
  const points = [
    { city: 'Cairo Clinical Hub', coord: '30.0444° N' },
    { city: 'Alexandria General Hospital', coord: '31.2001° N' },
    { city: 'Mansoura Medical Complex', coord: '31.0409° N' },
    { city: 'Giza Healthcare Clinic', coord: '30.0131° N' }
  ];

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-32 px-6 md:px-12 select-none border-b border-white/5">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Vision & Licensing */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="text-[10px] font-mono text-[#A1A1A6] tracking-[0.25em] uppercase font-bold block mb-3">CY 2026 ROADMAP</span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.1] mb-6">
                Sustainable scale. <br />
                <span className="text-neutral-500">Egypt's clinical network.</span>
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                Our operations rely on a balanced <strong>B2B2C business model</strong>. MediLink is entirely free for patients, eliminating economic access barriers. Local hospitals, private provider chains, and clinical labs pay for direct administrative integration to receive clean patient dossier exports, drastically reducing triage paperwork delays.
              </p>
            </div>

            {/* Financial Parameters pricing breakdown */}
            <div className="bg-[#111111] p-6 rounded-xl border border-white/10 space-y-4">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold block">LICENSING DISTRIBUTION</span>
              
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-neutral-300 font-medium">Egypt Patients:</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">100% Free Access</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-300 font-medium">Provider Dashboards:</span>
                <span className="font-mono text-xs text-[#0071E3] font-bold">Licence Subscription</span>
              </div>
            </div>
          </div>

          {/* Right Column: Egypt focused coordination dots */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between min-h-[360px]">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase block mb-4">REGIONAL COORDINATION NODES</span>
              
              {/* Soft low-contrast dots plot representing cities */}
              <div className="border border-white/5 bg-black rounded-xl aspect-[16/8] w-full relative flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Clean, simple graphite labels representing clinical nodes */}
                <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                  {points.map((pt, idx) => (
                    <div 
                      key={idx}
                      className="border border-white/5 bg-[#111111] p-3 rounded-lg flex items-center gap-3"
                    >
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      <div>
                        <span className="text-[11px] font-display font-medium text-neutral-300 block leading-tight">{pt.city}</span>
                        <span className="text-[9px] font-mono text-neutral-500 block mt-0.5">{pt.coord}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Closing slide signature */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5 text-[10px] font-mono text-neutral-500">
              <span className="uppercase tracking-widest">MediLink Tech Consortium • 2026</span>
              <span className="text-[#0071E3] flex items-center gap-1 font-bold">
                <span>Enterprise ready</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
