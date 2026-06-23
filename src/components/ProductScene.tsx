import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Scan, Calendar } from 'lucide-react';

export default function ProductScene() {
  const [activeTab, setActiveTab] = useState<'chat' | 'scan' | 'book'>('chat');

  const tabs = [
    {
      id: 'chat' as const,
      icon: MessageSquare,
      title: 'Medi AI Chat',
      summary: 'Conversational clinical intelligence at the patient’s fingertips.',
      description: 'Provides a clean conversational bridge. Patients can report concerns, describe symptoms in colloquial Arabic or English, and review immediate parameters transformed by Lumen into clear, patient-friendly insights.',
      image: '/input_file_3.png',
      caption: 'Real MediLink client screenshot'
    },
    {
      id: 'scan' as const,
      icon: Scan,
      title: 'HTAN Vision Scan',
      summary: 'Automated lesion boundary and margin isolation.',
      description: 'Enables patients to take macro or dermoscopic photos of skin irregularities. The system instantly routes the file through specialized neural segmenters to outline margin characteristics without offering high-risk autonomous diagnoses.',
      image: '/input_file_3.png', // Fallback to chat or overlay representation
      caption: 'Upload & analysis interface'
    },
    {
      id: 'book' as const,
      icon: Calendar,
      title: 'Find & Specialist Booking',
      summary: 'Transitioning clinical insights directly into professional care.',
      description: 'Matches patients to qualified clinical professionals (e.g. at Cairo Medical or Alexandria General). Generates and schedules a secure, structured medical dossier derived from the patient’s chat, preparing the provider for a highly optimized consultation.',
      image: '/input_file_2.png',
      caption: 'Real facilities discover screenshot'
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-32 px-6 md:px-12 select-none border-b border-white/5">
      {/* Refined side-lighting across the black canvas */}
      <div className="absolute right-[5%] top-1/4 w-[600px] h-[300px] bg-white/[0.015] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto">
        {/* Apple slide header format */}
        <div className="text-left mb-20 max-w-3xl">
          <span className="text-[10px] font-mono text-[#A1A1A6] tracking-[0.25em] uppercase font-bold block mb-3">THE MEDILINK APPLICATION</span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.1] mb-6">
            The Patient Portal. <br />
            <span className="text-neutral-500">Simple interface, rigorous system.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans">
            MediLink unifies the fragmented patient checkpoints. It matches professional clinical resources directly inside local circles, while managing raw imagery and inquiries through a safe multi-stage system.
          </p>
        </div>

        {/* Storytelling grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Block: Functional selectors */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComp = tab.icon;

              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#111111] border-white/15'
                      : 'bg-transparent border-transparent hover:bg-[#111111]/40'
                  }`}
                  id={`product-tab-${tab.id}`}
                >
                  <div className="flex items-center gap-3.5 mb-2">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#0071E3]/10 text-[#0071E3]' : 'bg-[#111111] text-neutral-500'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className={`font-display text-lg font-medium ${isActive ? 'text-[#F5F5F7]' : 'text-neutral-400'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  
                  <p className={`text-xs md:text-sm font-sans ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {tab.summary}
                  </p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-neutral-400 leading-relaxed font-sans pt-4 mt-3 border-t border-white/5"
                      >
                        {tab.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Block: Elegant Phone mockup with actual screenshot inside */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 z-10">
            {/* Elegant physical-looking phone capsule */}
            <div className="relative w-[280px] h-[580px] md:w-[310px] md:h-[630px] rounded-[50px] border-[11px] border-neutral-900 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between">
              {/* Dynamic Island Notch */}
              <div className="absolute top-2 inset-x-0 flex justify-center z-30">
                <div className="w-24 h-6 bg-neutral-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-950 ml-6" />
                </div>
              </div>

              {/* Display frame boundary */}
              <div className="absolute inset-x-0 inset-y-0 bg-black z-10 overflow-hidden rounded-[36px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full relative"
                  >
                    {/* Render screenshot image securely */}
                    <img
                      src={currentTab.image}
                      alt={currentTab.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Interactive overlay layer specifically for Scan tab to simulate outline */}
                    {activeTab === 'scan' && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 text-center animate-fade-in backdrop-blur-[1px]">
                        <div className="relative w-36 h-36 bg-[#111111] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                          {/* Irregular lesion simulated profile */}
                          <div className="absolute w-12 h-10 rounded-full bg-orange-950/40 filter blur-[3px]" />
                          {/* Segmentation mask line */}
                          <div className="absolute inset-6 border border-[#0071E3] rounded-full animate-pulse flex items-center justify-center">
                            <span className="text-[8px] font-mono text-[#0071E3] bg-[#111111] px-1 rounded">HTAN BOUNDS</span>
                          </div>
                        </div>
                        <div className="mt-4 space-y-1">
                          <div className="text-[10px] font-mono text-[#F5F5F7]">Irregular margin outline locked</div>
                          <div className="text-[8px] font-mono text-[#A1A1A6]">90.32% Dice • TTA-Averaged Logits</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Edge reflections */}
              <div className="absolute inset-x-0 inset-y-0 border border-white/10 rounded-[38px] pointer-events-none z-20" />
            </div>

            {/* Captions referencing real app files */}
            <span className="text-[10px] font-mono text-neutral-500 uppercase mt-4 block tracking-wider">
              {currentTab.caption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
