import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, ChevronRight, ArrowRight, Star, MapPin, Info, Lock, ArrowLeft
} from 'lucide-react';

interface HeroSceneProps {
  onStartTour: () => void;
}

export default function HeroScene({ onStartTour }: HeroSceneProps) {
  const [activeFeature, setActiveFeature] = useState<'book' | null>(null);

  const handlePhoneBack = () => {
    setActiveFeature(null);
  };

  const scrollToNextSection = () => {
    const el = document.getElementById('connected-care-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center items-center px-6 md:px-12 py-24 select-none overflow-hidden border-b border-neutral-200">
      
      {/* Soft color radial spotlight mimicking a premium physical Apple keynote wall */}
      <div className="absolute top-[20%] w-[600px] h-[400px] bg-gradient-radial from-blue-100/40 to-transparent rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-50 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Block: Apple-style copy */}
        <div className="text-left max-w-xl flex-1 flex flex-col justify-center space-y-6">
          <h1 className="text-5xl sm:text-7xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05]">
            Meet MediLink.
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-display font-light text-neutral-500 tracking-tight">
            One connected layer for care.
          </h2>

          <p className="text-xs font-mono text-[#86868B] uppercase tracking-tight">
            Unifying symptom triage, computer vision tracing, and specialist booking.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={onStartTour}
              className="px-8 py-3.5 bg-[#0071E3] hover:bg-[#147CE5] font-semibold rounded-full text-white tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer font-sans"
              id="cta-start-presentation"
            >
              <span>Start Guided Presentation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToNextSection}
              className="px-6 py-3.5 bg-white/80 hover:bg-white border border-[#D2D2D7]/60 rounded-full text-[#1D1D1F] text-xs font-mono font-bold uppercase transition-all shadow-2xs cursor-pointer"
              id="cta-explore-clinical-logic"
            >
              Explore Clinical Logic
            </button>
          </div>
        </div>

        {/* Right Block: Elegant tactile centered phone mockup */}
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-sm">
          
          {/* Presentation Disclaimer */}
          <div className="mb-6 w-full max-w-[280px] p-3 bg-amber-50/50 border border-amber-200/30 rounded-2xl flex gap-2 items-start text-left shadow-2xs">
            <Info className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-[10px] font-sans font-light text-amber-800 leading-normal">
              <strong>Presentation Prototype:</strong> This is a simulation for presentation purposes only. The production-ready application and real case study workflow are showcased in detail at the end.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[300px] h-[600px] rounded-[50px] border-[12px] border-neutral-900 bg-[#F5F5F7] shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            id="hero-phone-mockup"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 inset-x-0 flex justify-center z-30">
              <div className="w-24 h-5.5 bg-neutral-900 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-950 ml-5" />
              </div>
            </div>

            {/* Screen Inner Container */}
            <div className="absolute inset-0 bg-[#F5F5F7] z-10 overflow-hidden flex flex-col justify-between pt-10 pb-6 px-4">
              
              <AnimatePresence mode="wait">
                {activeFeature === null ? (
                  /* HOME SCREEN SIMULATION */
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
                          <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                          <span className="font-display font-bold text-xs tracking-wider text-neutral-800">medilink</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">STAGE 1</span>
                      </div>

                      {/* Welcome message */}
                      <div className="text-left mb-6">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block mb-0.5">Welcome to care</span>
                        <h3 className="text-xl font-display font-light text-neutral-900">Your Health Journey</h3>
                      </div>

                      {/* Feature Selector Grid */}
                      <div className="space-y-3">
                        
                        {/* 1. Find & Book (Unlocked) */}
                        <button
                          onClick={() => setActiveFeature('book')}
                          className="w-full p-3.5 bg-white border border-neutral-200/60 rounded-2xl text-left hover:border-neutral-300 transition-all flex items-center gap-3.5 group shadow-2xs cursor-pointer relative"
                          id="phone-btn-find-book"
                        >
                          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:scale-105 duration-200">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-800 truncate">Find & Book</h4>
                            <p className="text-[10px] text-neutral-500 truncate">Direct local provider routes</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#0071E3] transition-colors" />
                          
                          <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                          </span>
                        </button>

                        {/* Locked placeholder - Medical Records */}
                        <div className="w-full p-3.5 bg-[#F5F5F7]/30 border border-neutral-200/40 rounded-2xl text-left flex items-center gap-3.5 opacity-40">
                          <div className="p-2.5 rounded-xl bg-neutral-200 text-neutral-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-400 truncate">Medical Records</h4>
                            <p className="text-[10px] text-neutral-300 truncate">Locked • Unlock by scrolling</p>
                          </div>
                        </div>

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
                      <span>ACTIVE</span>
                    </div>
                  </motion.div>
                ) : (
                  /* DETAILED FEATURE SIMULATIONS */
                  <motion.div
                    key="book-detail"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="flex flex-col h-full justify-between"
                  >
                    {/* Detail Header */}
                    <div className="flex items-center justify-between border-b border-neutral-200/50 pb-3 mb-4">
                      <button 
                        onClick={handlePhoneBack}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer"
                        id="phone-detail-back"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>HOME</span>
                      </button>
                      <span className="text-[9px] font-mono font-bold text-purple-600 uppercase tracking-wider">
                        Find & Book
                      </span>
                    </div>

                    {/* Simulation Inner Screen */}
                    <div className="flex-1 overflow-y-auto pr-1">
                      <div className="space-y-3 text-left">
                        <div className="bg-white border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                          <span className="text-[8px] font-mono text-purple-600 font-bold block mb-2 uppercase">RECOMMENDED CLINICIAN</span>
                          <div className="flex items-center gap-2.5 mb-2.5">
                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center font-bold text-xs text-purple-600">
                              YM
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-neutral-800">Dr. Yousry Mansour</h4>
                              <p className="text-[9px] text-neutral-500 font-mono">Orthopedics • Cairo</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-neutral-600 border-t border-neutral-100 pt-2">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              4.9 (184 Reviews)
                            </span>
                            <span className="font-semibold text-purple-600">92% Match Score</span>
                          </div>
                        </div>

                        <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-wider block">AVAILABLE TIMES</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-purple-50/50 border border-purple-100 rounded-xl text-center">
                            <span className="text-[9px] font-mono text-purple-700 font-bold">17:00 Today</span>
                          </div>
                          <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-center">
                            <span className="text-[9px] font-mono text-neutral-500 font-bold">10:30 Tomorrow</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detail Footer */}
                    <button 
                      onClick={scrollToNextSection}
                      className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-[10px] font-mono uppercase font-bold tracking-wider hover:bg-[#0071E3] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Network</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Edge reflections and camera button decoration */}
            <div className="absolute inset-x-0 inset-y-0 border border-black/[0.05] rounded-[38px] pointer-events-none z-20" />
          </motion.div>

          {/* Professional presentation disclaimer */}
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
        <span className="text-[9px] tracking-[0.25em] uppercase font-mono font-medium text-neutral-500">Scroll naturally to explore</span>
        <div className="w-[1px] h-5 bg-[#D2D2D7]" />
      </div>
    </div>
  );
}
