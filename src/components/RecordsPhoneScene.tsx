import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, ClipboardCheck, ArrowRight, Lock, ArrowLeft, Shield, Info, ChevronRight, Check
} from 'lucide-react';

export default function RecordsPhoneScene() {
  const [activeFeature, setActiveFeature] = useState<'records' | null>(null);

  const handlePhoneBack = () => {
    setActiveFeature(null);
  };

  const scrollToNextSection = () => {
    const el = document.getElementById('patient-timeline-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center items-center px-6 md:px-12 py-24 select-none overflow-hidden border-b border-neutral-200" id="records-reveal-root">
      
      {/* Background spotlights */}
      <div className="absolute top-[20%] w-[500px] h-[350px] bg-gradient-radial from-purple-100/35 to-transparent rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[300px] bg-gradient-radial from-blue-100/25 to-transparent rounded-full filter blur-[100px] pointer-events-none" />

      <div className="z-10 text-center max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Block: Apple-style copy */}
        <div className="text-left max-w-xl flex-1 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#E8E8ED] border border-[#D2D2D7]/50 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#1D1D1F] font-bold uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
            <span>UNLOCK RECORDS</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05]">
            Medical Records. <br />
            <span className="text-neutral-500">Unlocked.</span>
          </h2>

          <p className="text-xs font-mono text-[#86868B] uppercase tracking-tight">
            Access unified patient dossiers instantly on consult completion.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => {
                setActiveFeature('records');
              }}
              className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 font-semibold rounded-full text-white tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer font-sans"
              id="cta-explore-records"
            >
              <span>Explore Medical Records</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToNextSection}
              className="px-6 py-3.5 bg-white/80 hover:bg-white border border-[#D2D2D7]/60 rounded-full text-[#1D1D1F] text-xs font-mono font-bold uppercase transition-all shadow-2xs"
            >
              Skip to Timeline Details
            </button>
          </div>
        </div>

        {/* Right Block: Elegant phone mockup */}
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-sm">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-[300px] h-[600px] rounded-[50px] border-[12px] border-neutral-900 bg-[#F5F5F7] shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            id="records-phone-mockup"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 inset-x-0 flex justify-center z-30">
              <div className="w-24 h-5.5 bg-neutral-900 rounded-full flex items-center justify-center" />
            </div>

            {/* Screen Inner Container */}
            <div className="absolute inset-0 bg-[#F5F5F7] z-10 overflow-hidden flex flex-col justify-between pt-10 pb-6 px-4">
              
              <AnimatePresence mode="wait">
                {activeFeature === null ? (
                  /* HOME SCREEN WITH MULTIPLE UNLOCKED */
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div>
                      {/* Top App Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="font-display font-bold text-xs tracking-wider text-neutral-800">medilink</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">STAGE 2</span>
                      </div>

                      {/* Welcome message */}
                      <div className="text-left mb-6">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block mb-0.5">Care folder active</span>
                        <h3 className="text-xl font-display font-light text-neutral-900">Patient Case Files</h3>
                      </div>

                      {/* Feature Selector Grid */}
                      <div className="space-y-3">
                        
                        {/* 1. Find & Book (Unlocked) */}
                        <div className="w-full p-3.5 bg-white/60 border border-neutral-200/40 rounded-2xl text-left flex items-center gap-3.5 opacity-60">
                          <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-800 truncate">Find & Book</h4>
                            <p className="text-[10px] text-neutral-400 truncate">Consult completed • Day 1</p>
                          </div>
                        </div>

                        {/* 2. Medical Records (Newly Unlocked) */}
                        <button
                          onClick={() => setActiveFeature('records')}
                          className="w-full p-3.5 bg-white border border-neutral-200/60 rounded-2xl text-left hover:border-neutral-300 transition-all flex items-center gap-3.5 group shadow-2xs cursor-pointer relative"
                          id="phone-btn-records"
                        >
                          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:scale-105 duration-200">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-800 truncate">Medical Records</h4>
                            <p className="text-[10px] text-neutral-500 truncate">Unified Cairo dossier active</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-600 transition-colors" />
                          
                          <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                          </span>
                        </button>

                        {/* Locked placeholder - Medi AI Chat */}
                        <div className="w-full p-3.5 bg-[#F5F5F7]/30 border border-neutral-200/40 rounded-2xl text-left flex items-center gap-3.5 opacity-40">
                          <div className="p-2.5 rounded-xl bg-neutral-200 text-neutral-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-400 truncate">Medi AI Chat</h4>
                            <p className="text-[10px] text-neutral-300 truncate">Locked • Unlock in Stage 3</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Status Indicator */}
                    <div className="border-t border-neutral-200/50 pt-4 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                      <span>PATIENT PORTAL</span>
                      <span>SECURED BY SHIELD</span>
                    </div>
                  </motion.div>
                ) : (
                  /* MEDICAL RECORDS PREVIEW SCREEN */
                  <motion.div
                    key="records-detail"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="flex flex-col h-full justify-between animate-fade-in"
                  >
                    {/* Detail Header */}
                    <div className="flex items-center justify-between border-b border-neutral-200/50 pb-3 mb-4">
                      <button 
                        onClick={handlePhoneBack}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer"
                        id="phone-records-back"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>HOME</span>
                      </button>
                      <span className="text-[9px] font-mono font-bold text-purple-600 uppercase tracking-wider">
                        Cairo Dossier
                      </span>
                    </div>

                    {/* Record details */}
                    <div className="flex-1 overflow-y-auto pr-1">
                      <div className="space-y-3.5 text-left">
                        
                        <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-2xl flex items-start gap-3">
                          <Shield className="w-4.5 h-4.5 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-[11px] font-semibold text-neutral-800 leading-tight">Secure Case File Compiled</h4>
                            <p className="text-[9px] text-neutral-500 font-sans mt-0.5">Subject: Cairo Specialist consult file</p>
                          </div>
                        </div>

                        {/* Index elements */}
                        <div className="space-y-2">
                          <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-wider block">RECORD ITEMS</span>
                          
                          <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-xs flex justify-between items-center">
                            <span className="text-neutral-700 font-medium font-sans">Symptoms Intake</span>
                            <span className="text-[8px] font-mono text-neutral-400 uppercase font-semibold">DAY 01</span>
                          </div>

                          <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-xs flex justify-between items-center">
                            <span className="text-neutral-700 font-medium font-sans">Dr. Yousry Notes</span>
                            <span className="text-[8px] font-mono text-purple-600 bg-purple-50 px-1 rounded uppercase font-semibold">DAY 03</span>
                          </div>

                          <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-xs flex justify-between items-center">
                            <span className="text-neutral-700 font-medium font-sans">Mobility Report</span>
                            <span className="text-[8px] font-mono text-neutral-400 uppercase font-semibold">DAY 03</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Detail Footer */}
                    <button 
                      onClick={scrollToNextSection}
                      className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-[10px] font-mono uppercase font-bold tracking-wider hover:bg-[#0071E3] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Timeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Edge reflections and camera button decoration */}
            <div className="absolute inset-x-0 inset-y-0 border border-black/[0.05] rounded-[38px] pointer-events-none z-20" />
          </motion.div>

          {/* Presentation disclaimer */}
          <div className="mt-4 flex items-center gap-1.5 text-center">
            <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-[10px] font-sans font-light text-[#86868B]">
              Interactive simulation. Click phone screen features to preview live.
            </span>
          </div>

        </div>

      </div>

      {/* Static scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-neutral-400 pointer-events-none">
        <span className="text-[9px] tracking-[0.25em] uppercase font-mono font-medium text-neutral-500">Scroll down to view timeline</span>
        <div className="w-[1px] h-5 bg-[#D2D2D7]" />
      </div>
    </div>
  );
}
