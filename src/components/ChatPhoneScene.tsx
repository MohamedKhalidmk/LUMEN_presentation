import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, User, Check, ArrowRight, Lock, ArrowLeft, Bot, Info, 
  ChevronRight, Calendar, ExternalLink, Play, Pause, RefreshCw, Send, Sparkles, CheckCircle2, Shield
} from 'lucide-react';

type TabMode = 'interactive' | 'behind-scenes';

export default function ChatPhoneScene() {
  const [activeTab, setActiveTab] = useState<TabMode>('interactive');
  const [isChatActive, setIsChatActive] = useState(false);
  
  // Interactive Chat State Machine
  const [interactiveStep, setInteractiveStep] = useState<'initial' | 'user-selected' | 'running-agent' | 'completed'>('initial');
  const [selectedTime, setSelectedTime] = useState<string>('tomorrow at 10:00 AM');
  const [agentProgress, setAgentProgress] = useState(0);
  const [agentPhaseText, setAgentPhaseText] = useState('Spawning agent worker...');
  
  // Behind the scenes automated loop state
  const [btsPhase, setBtsPhase] = useState<number>(0); // 0: Chat, 1: Home/Minimize, 2: Vezeeta Search, 3: Vezeeta Form, 4: Returning, 5: Done
  const [isPlayingBts, setIsPlayingBts] = useState(true);
  const btsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToNextSection = () => {
    const el = document.getElementById('bts-scene-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Automated agent progress loader for Interactive Step "running-agent"
  useEffect(() => {
    if (interactiveStep === 'running-agent') {
      setAgentProgress(0);
      setAgentPhaseText('Spawning agent worker...');
      
      const interval = setInterval(() => {
        setAgentProgress((prev) => {
          const next = prev + 4;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setInteractiveStep('completed');
            }, 600);
            return 100;
          }
          
          // Dynamic phase text based on progress percentage
          if (next < 25) {
            setAgentPhaseText('Minimizing Medi AI Chat...');
          } else if (next < 50) {
            setAgentPhaseText('Opening Vezeeta booking portal...');
          } else if (next < 75) {
            setAgentPhaseText('Filling form: Mohamed, Dr. Yousry, 10:00 AM...');
          } else {
            setAgentPhaseText('Resolving verification handshake...');
          }
          
          return next;
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [interactiveStep]);

  // Behind the Scenes loop logic
  useEffect(() => {
    if (btsTimerRef.current) clearInterval(btsTimerRef.current);

    if (activeTab === 'behind-scenes' && isPlayingBts) {
      // Loop sequence timers
      btsTimerRef.current = setInterval(() => {
        setBtsPhase((prev) => {
          const next = (prev + 1) % 6;
          return next;
        });
      }, 2500); // changes phase every 2.5 seconds
    }

    return () => {
      if (btsTimerRef.current) clearInterval(btsTimerRef.current);
    };
  }, [activeTab, isPlayingBts]);

  const resetInteractive = () => {
    setInteractiveStep('initial');
    setAgentProgress(0);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center items-center px-6 md:px-12 py-24 select-none overflow-hidden border-b border-[#D2D2D7]/50" id="chat-reveal-root">
      
      {/* Background spotlights */}
      <div className="absolute top-[20%] w-[500px] h-[350px] bg-gradient-radial from-emerald-100/35 to-transparent rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[300px] bg-gradient-radial from-blue-100/25 to-transparent rounded-full filter blur-[100px] pointer-events-none" />

      <div className="z-10 text-center max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Block: Apple-style copy & controller */}
        <div className="text-left max-w-xl flex-1 flex flex-col justify-center space-y-6 min-h-[460px]">
          <AnimatePresence mode="wait">
            {!isChatActive ? (
              <motion.div
                key="intro-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-[#E8E8ED] border border-[#D2D2D7]/50 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#1D1D1F] font-bold uppercase shadow-2xs self-start">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>UNLOCK CHAT</span>
                </div>

                <h2 className="text-5xl sm:text-7xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05]">
                  Medi AI Chat. <br />
                  <span className="text-neutral-500 font-normal">Continuous context.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#6E6E73] leading-relaxed font-sans font-light">
                  With your symptoms, specialist consult findings, and active gel prescriptions recorded securely inside one continuous dossier, our conversational AI system gains full clinical context. 
                  No repeating yourself—just smart, evidence-based recovery guidance.
                </p>

                <div className="bg-white/60 p-5 rounded-2xl border border-neutral-200/50 space-y-2 text-xs text-[#6E6E73] leading-relaxed font-sans">
                  <p className="font-semibold text-neutral-800">⚡ Conversational Care Intelligence:</p>
                  <p>
                    Once your medical records and prescriptions are safely locked inside your Cairo Specialty Clinic dossier, the AI system coordinates the next phase of your journey without friction.
                  </p>
                  <p className="font-mono text-[10px] text-emerald-600">
                    Click "Launch Medi AI Chat" or tap the newly unlocked option on the phone mockup to test the active agent flow.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => setIsChatActive(true)}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 font-semibold rounded-full text-white tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer font-sans"
                    id="cta-launch-chat"
                  >
                    <span>Launch Medi AI Chat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={scrollToNextSection}
                    className="px-6 py-3.5 bg-white border border-[#D2D2D7]/60 rounded-full text-[#1D1D1F] text-xs font-mono font-bold uppercase transition-all shadow-2xs cursor-pointer hover:bg-neutral-50"
                  >
                    Skip to Platform Delta
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="active-left"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col space-y-6"
              >
                <button
                  onClick={() => setIsChatActive(false)}
                  className="self-start px-3.5 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-full text-xs font-sans font-semibold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Portal Home</span>
                </button>

                <div className="inline-flex items-center gap-2 bg-[#E8E8ED] border border-[#D2D2D7]/50 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#1D1D1F] font-bold uppercase shadow-2xs self-start">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>ACTIVE CHAT SIMULATION</span>
                </div>

                <h2 className="text-5xl sm:text-7xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05]">
                  Medi AI Agent. <br />
                  <span className="text-emerald-600 font-normal">Active Booking.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#6E6E73] leading-relaxed font-sans font-light">
                  See the AI Agent in action. Choose "Interactive Patient View" to trigger the booking flow manually, or "Behind the Scenes" to watch the automated browser automation sequence.
                </p>

                {/* Toggle Pills - Choose Patient Interactive view vs Behind the Scenes Animation */}
                <div className="bg-[#E8E8ED]/80 p-1.5 rounded-2xl border border-neutral-300/40 inline-flex w-full sm:w-auto max-w-md shadow-inner">
                  <button
                    onClick={() => {
                      setActiveTab('interactive');
                      resetInteractive();
                    }}
                    className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'interactive' 
                        ? 'bg-white text-[#1D1D1F] shadow-sm' 
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Interactive Patient View</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('behind-scenes');
                      setBtsPhase(0);
                      setIsPlayingBts(true);
                    }}
                    className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'behind-scenes' 
                        ? 'bg-white text-[#1D1D1F] shadow-sm' 
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Behind the Scenes</span>
                  </button>
                </div>

                {/* Feature details text container */}
                <div className="bg-white/60 p-5 rounded-2xl border border-neutral-200/50 space-y-2">
                  <AnimatePresence mode="wait">
                    {activeTab === 'interactive' ? (
                      <motion.div
                        key="info-int"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-[#6E6E73] leading-relaxed font-sans space-y-2"
                      >
                        <p className="font-semibold text-neutral-800">⚡ Interactive Booking Agent demo:</p>
                        <p>
                          Experience how Medi AI takes the initiative. When you request a follow-up, 
                          the agent launches autonomously to book Dr. Yousry Mansour directly on 
                          the third-party platform <strong>Vezeeta</strong>, and syncs the confirmation back inside the chat.
                        </p>
                        <p className="font-mono text-[10px] text-emerald-600">
                          Click "Yes, book tomorrow" on the phone to test.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="info-bts"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-[#6E6E73] leading-relaxed font-sans space-y-2"
                      >
                        <p className="font-semibold text-blue-600">🌀 Playful Agent Visualization Loop:</p>
                        <p>
                          Watch the automated "behind the scenes" workflow. The Medi AI Agent minimizes the chat app, 
                          opens the external <strong>Vezeeta portal</strong>, navigates the clinic's schedule, fills 
                          patient details, completes the booking, and handshakes back into the chat effortlessly.
                        </p>
                        <p className="font-mono text-[10px] text-blue-600">
                          Status: Agent RPA loop rendering live
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={scrollToNextSection}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 font-semibold rounded-full text-white tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer font-sans"
                    id="cta-explore-chat"
                  >
                    <span>Watch Behind the Scenes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {activeTab === 'interactive' && interactiveStep !== 'initial' && (
                    <button
                      onClick={resetInteractive}
                      className="px-5 py-3.5 bg-white hover:bg-[#F5F5F7] border border-[#D2D2D7]/60 rounded-full text-[#1D1D1F] text-xs font-mono font-bold uppercase transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Demo</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Block: Elegant phone mockup */}
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-sm">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-[320px] h-[640px] rounded-[52px] border-[12px] border-neutral-900 bg-[#F5F5F7] shadow-[0_30px_70px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col"
            id="chat-phone-mockup"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 inset-x-0 flex justify-center z-40">
              <div className="w-24 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] mr-6" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
              </div>
            </div>

            {/* SCREEN INNER CONTENT */}
            <div className="absolute inset-0 bg-[#F5F5F7] z-10 overflow-hidden flex flex-col justify-between pt-10 pb-6 px-4">
              
              <AnimatePresence mode="wait">
                {!isChatActive ? (
                  /* ======================================= */
                  /* PORTAL HOME / CHAT UNLOCKED STATE       */
                  /* ======================================= */
                  <motion.div
                    key="portal-home"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div>
                      {/* Top App Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-display font-bold text-xs tracking-wider text-neutral-800">medilink.ai</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">STAGE 4</span>
                      </div>

                      {/* Welcome message */}
                      <div className="text-left mb-6">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block mb-0.5">Care folder active</span>
                        <h3 className="text-xl font-display font-light text-neutral-900">Patient Case Files</h3>
                      </div>

                      {/* Feature Selector Grid */}
                      <div className="space-y-3">
                        
                        {/* 1. Find & Book (Completed) */}
                        <div className="w-full p-3.5 bg-white/60 border border-neutral-200/40 rounded-2xl text-left flex items-center gap-3.5 opacity-60">
                          <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-800 truncate">Find & Book</h4>
                            <p className="text-[10px] text-neutral-400 truncate">Consult completed • Day 1</p>
                          </div>
                        </div>

                        {/* 2. Medical Records (Completed) */}
                        <div className="w-full p-3.5 bg-white/60 border border-neutral-200/40 rounded-2xl text-left flex items-center gap-3.5 opacity-60">
                          <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-800 truncate">Medical Records</h4>
                            <p className="text-[10px] text-neutral-400 truncate">Dossier secured • Day 7</p>
                          </div>
                        </div>

                        {/* 3. Medi AI Chat (Newly Unlocked!) */}
                        <button
                          onClick={() => setIsChatActive(true)}
                          className="w-full p-3.5 bg-white border border-neutral-200/60 rounded-2xl text-left hover:border-neutral-300 transition-all flex items-center gap-3.5 group shadow-2xs cursor-pointer relative animate-pulse"
                          id="phone-btn-chat"
                        >
                          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:scale-105 duration-200">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-800 truncate">Medi AI Chat</h4>
                            <p className="text-[10px] text-emerald-500 font-medium truncate">Newly Unlocked • Active</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                          
                          <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        </button>

                      </div>
                    </div>

                    {/* Footer brand or status info */}
                    <div className="border-t border-neutral-200/50 pt-3 text-center">
                      <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block">Continuous Clinical Context</span>
                    </div>
                  </motion.div>
                ) : (
                  /* ======================================= */
                  /* ACTIVE CHAT SCENES (INTERACTIVE/BTS)   */
                  /* ======================================= */
                  <motion.div
                    key="active-chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full justify-between"
                  >
                    {activeTab === 'interactive' ? (
                      <div className="flex flex-col h-full justify-between">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-neutral-200/50 pb-2.5 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-display font-bold text-xs text-neutral-800">medilink.ai</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-full">AGENT ACTIVE</span>
                        </div>

                        {/* Chat Feed */}
                        <div className="flex-1 overflow-y-auto pr-0.5 space-y-3.5 py-1">
                          
                          {/* Initial message from user */}
                          <div className="flex flex-col items-end pl-8">
                            <div className="p-3 bg-neutral-800 text-white rounded-2xl rounded-tr-xs shadow-3xs text-[11px] font-sans">
                              My lower back is still slightly stiff after 7 days...
                            </div>
                            <span className="text-[8px] font-mono text-neutral-400 mt-0.5 uppercase font-medium">Mohamed • Cairo</span>
                          </div>

                          {/* Doctor Consultation Context Link */}
                          <div className="mx-2 p-2 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center gap-2">
                            <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="text-[9px] font-mono text-emerald-700 leading-tight">Linked context: Dr. Yousry Mansour consultation & Topical Gel Rx</span>
                          </div>

                          {/* Initial response from Medi AI */}
                          <div className="flex items-start gap-2 pr-6">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                              M
                            </div>
                            <div className="space-y-1">
                              <div className="p-3 bg-white border border-neutral-200/60 rounded-2xl rounded-tl-xs text-[11px] text-neutral-800 shadow-3xs font-sans leading-relaxed">
                                Hello Mohamed. Since muscular fatigue is normal up to day 10, stretching will help. Would you like me to book a follow-up appointment with Dr. Yousry Mansour at Cairo Specialty Clinic?
                              </div>
                              <span className="text-[8px] font-mono text-neutral-400 uppercase font-medium block">Medi AI Agent</span>
                            </div>
                          </div>

                          {/* USER SELECTED CHOICE */}
                          {interactiveStep !== 'initial' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex flex-col items-end pl-8 space-y-2"
                            >
                              <div className="p-3 bg-[#0071E3] text-white rounded-2xl rounded-tr-xs shadow-3xs text-[11px] font-sans">
                                Yes, please book Dr. Yousry for {selectedTime}.
                              </div>
                              <span className="text-[8px] font-mono text-neutral-400 uppercase font-medium">Mohamed • Confirmed</span>
                            </motion.div>
                          )}

                          {/* AGENT LAUNCH / RUNNING LOADER */}
                          {interactiveStep === 'running-agent' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-3.5 bg-white border border-neutral-200 rounded-2xl shadow-sm space-y-3 mx-2 text-left"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-wider flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                                  <span>Agent Booking RPA</span>
                                </span>
                                <span className="text-xs font-mono font-bold text-neutral-700">{agentProgress}%</span>
                              </div>
                              
                              <p className="text-[10px] text-neutral-500 leading-tight">
                                {agentPhaseText}
                              </p>

                              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full rounded-full transition-all duration-150" 
                                  style={{ width: `${agentProgress}%` }}
                                />
                              </div>
                              
                              <div className="text-[8px] text-center font-mono text-neutral-400">
                                LEAVING MEDI CHAT & OPENING VEZEETA API
                              </div>
                            </motion.div>
                          )}

                          {/* FINAL BOOKED SUCCESS MESSAGE */}
                          {interactiveStep === 'completed' && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-start gap-2 pr-6"
                            >
                              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                                M
                              </div>
                              <div className="space-y-1.5 w-full">
                                <div className="p-3 bg-white border border-neutral-200/60 rounded-2xl rounded-tl-xs text-[11px] text-neutral-800 shadow-3xs font-sans leading-relaxed">
                                  <strong>Done, your appointment is booked.</strong> <br /><br />
                                  I temporarily exited the chat, accessed Vezeeta, secured your 10:00 AM slot tomorrow, and logged it back into your dossier!
                                </div>
                                
                                {/* Visual Receipt Card */}
                                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                                  <div className="flex justify-between items-center text-[9px] font-mono text-emerald-800">
                                    <span>VEZEETA CONFIRMED</span>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  </div>
                                  <div className="text-[11px] font-sans font-bold text-neutral-800 leading-tight">
                                    Dr. Yousry Mansour
                                  </div>
                                  <div className="text-[9px] text-neutral-500 font-sans">
                                    Tomorrow at 10:00 AM • Cairo Clinic
                                  </div>
                                  <div className="text-[8px] font-mono text-neutral-400">
                                    booking_id: VZ-84920-MED
                                  </div>
                                </div>
                                
                                <span className="text-[8px] font-mono text-neutral-400 uppercase font-medium block">Medi AI Agent • Just Now</span>
                              </div>
                            </motion.div>
                          )}

                        </div>

                        {/* Interactive Footer Options */}
                        <div className="border-t border-neutral-200/50 pt-2 bg-[#F5F5F7] z-20">
                          {interactiveStep === 'initial' ? (
                            <div className="space-y-1.5">
                              <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest text-center block">Quick responses:</span>
                              <div className="grid grid-cols-1 gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedTime('tomorrow at 10:00 AM');
                                    setInteractiveStep('user-selected');
                                    setTimeout(() => setInteractiveStep('running-agent'), 1200);
                                  }}
                                  className="w-full py-2 px-3 bg-white hover:bg-neutral-50 text-[10px] text-neutral-800 rounded-xl border border-neutral-200/60 transition-all text-left font-sans flex items-center justify-between cursor-pointer hover:border-emerald-500/40"
                                >
                                  <span>📅 Book: Tomorrow 10:00 AM</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedTime('tomorrow at 3:00 PM');
                                    setInteractiveStep('user-selected');
                                    setTimeout(() => setInteractiveStep('running-agent'), 1200);
                                  }}
                                  className="w-full py-2 px-3 bg-white hover:bg-neutral-50 text-[10px] text-neutral-800 rounded-xl border border-neutral-200/60 transition-all text-left font-sans flex items-center justify-between cursor-pointer hover:border-emerald-500/40"
                                >
                                  <span>📅 Book: Tomorrow 3:00 PM</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                                </button>
                              </div>
                            </div>
                          ) : interactiveStep === 'completed' ? (
                            <button
                              onClick={resetInteractive}
                              className="w-full py-2.5 bg-neutral-950 text-white rounded-xl text-[9px] font-mono uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Re-test Booking Demo</span>
                            </button>
                          ) : (
                            <div className="text-[9px] font-mono text-center py-2 text-neutral-400 uppercase">
                              Agent executing task... Please wait
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full justify-between">
                        {/* BTS Header */}
                        <div className="flex items-center justify-between border-b border-blue-200/30 pb-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-500 animate-spin" />
                            <span className="font-mono text-[9px] font-bold text-neutral-800">BEHIND THE SCENES</span>
                          </div>
                          <span className="text-[8px] font-mono bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-bold uppercase">
                            PHASE {btsPhase + 1}/6
                          </span>
                        </div>

                        {/* DYNAMIC SCREEN PREVIEW LAYER REPRESENTING DYNAMIC AGENT ACTIONS */}
                        <div className="flex-1 rounded-2xl bg-[#0F0F11] border border-white/5 p-3 flex flex-col justify-between relative overflow-hidden text-left">
                          
                          {/* Grid overlay for cool terminal vibes */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

                          {/* PHASE 0: CHAT PROMPT */}
                          {btsPhase === 0 && (
                            <motion.div 
                              key="p0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col justify-between"
                            >
                              <div className="space-y-2">
                                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20 inline-block">1. Medi AI Chat Active</span>
                                <div className="p-2.5 bg-neutral-900 border border-white/5 rounded-xl space-y-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span className="text-[9px] text-neutral-300 font-mono">Medi Booking Request</span>
                                  </div>
                                  <p className="text-[10px] text-neutral-400 font-sans">"Please book tomorrow 10:00 AM."</p>
                                </div>
                              </div>
                              
                              <div className="space-y-1.5">
                                <div className="text-[9px] font-mono text-blue-400 animate-pulse flex items-center gap-1">
                                  <span>●</span> Initializing autonomous worker...
                                </div>
                                <div className="w-full bg-neutral-800 h-1 rounded">
                                  <motion.div className="bg-blue-500 h-full rounded" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* PHASE 1: APP MINIMIZE / HOME */}
                          {btsPhase === 1 && (
                            <motion.div 
                              key="p1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col justify-between items-center text-center"
                            >
                              <div className="space-y-1 w-full text-left">
                                <span className="text-[8px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20 inline-block">2. Minimizing Medi App</span>
                                <p className="text-[9px] text-neutral-400">Agent triggers local UI exit...</p>
                              </div>

                              {/* Interactive Spring Animation of shrinking screen */}
                              <motion.div 
                                animate={{ scale: [1, 0.5, 0.45], opacity: [1, 0.9, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-20 h-28 bg-[#1D1D1F] border border-white/20 rounded-xl p-1.5 flex flex-col justify-between items-center shadow-lg"
                              >
                                <span className="text-[7px] text-emerald-400 font-mono">MediLink</span>
                                <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                  <Bot className="w-2.5 h-2.5 text-emerald-400" />
                                </div>
                                <span className="text-[5px] text-neutral-500">minimizing</span>
                              </motion.div>

                              {/* Glowing agent orb fly transition */}
                              <div className="text-[9px] font-mono text-neutral-500">
                                Orb agent leaving workspace
                              </div>
                            </motion.div>
                          )}

                          {/* PHASE 2: OPENING VEZEETA */}
                          {btsPhase === 2 && (
                            <motion.div 
                              key="p2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col justify-between"
                            >
                              <div className="space-y-1.5">
                                <span className="text-[8px] font-mono text-blue-400 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-500/20 inline-block">3. Launching Vezeeta portal</span>
                                <p className="text-[9px] text-neutral-400">Instantiating headless browser session to target site...</p>
                              </div>

                              {/* Simulated Vezeeta App launching */}
                              <div className="bg-red-600/90 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 shadow-inner border border-red-500/30 w-full">
                                <div className="text-white font-display font-bold text-xs tracking-wider">Vezeeta</div>
                                <div className="flex items-center gap-1.5 bg-red-700/50 px-2 py-1 rounded text-[8px] font-mono text-red-100">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                  <span>HTTPS Handshake Ok</span>
                                </div>
                              </div>

                              <div className="text-[8px] font-mono text-neutral-500">
                                GET /provider/cairo/yousry-mansour
                              </div>
                            </motion.div>
                          )}

                          {/* PHASE 3: FILLING DATA */}
                          {btsPhase === 3 && (
                            <motion.div 
                              key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col justify-between"
                            >
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono text-blue-400 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-500/20 inline-block">4. Filling appointment data</span>
                                <p className="text-[9px] text-neutral-400">Injecting encrypted patient identifiers...</p>
                              </div>

                              {/* Simulated fields */}
                              <div className="space-y-1.5 bg-neutral-900 p-2.5 rounded-xl border border-white/5 font-mono text-[8px] w-full">
                                <div className="flex justify-between border-b border-white/5 pb-1 text-neutral-500">
                                  <span>Form Input Field</span>
                                  <span>Value</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-400">patient_name:</span>
                                  <span className="text-emerald-400">"Mohamed"</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-400">clinic_id:</span>
                                  <span className="text-emerald-400">"Cairo Specialty (402)"</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-400">timeslot:</span>
                                  <span className="text-emerald-400">"10:00 AM"</span>
                                </div>
                              </div>

                              {/* Pulsing pointer representing the RPA cursor click */}
                              <div className="flex items-center gap-1.5 self-center bg-red-600 px-3 py-1 rounded-full text-[8px] font-bold text-white tracking-wider animate-pulse">
                                <span>SUBMITTING BOOKING</span>
                              </div>
                            </motion.div>
                          )}

                          {/* PHASE 4: RETURNING TO MEDI */}
                          {btsPhase === 4 && (
                            <motion.div 
                              key="p4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col justify-between items-center text-center"
                            >
                              <div className="space-y-1 w-full text-left">
                                <span className="text-[8px] font-mono text-teal-400 bg-teal-950/40 px-1.5 py-0.5 rounded border border-teal-500/20 inline-block">5. Returning callback handshake</span>
                                <p className="text-[9px] text-neutral-400">Disconnecting RPA agent and re-entering chat room...</p>
                              </div>

                              {/* Dynamic transition */}
                              <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-mono">Vezeeta App</div>
                                <div className="w-8 h-0.5 border-t border-dashed border-neutral-600 relative">
                                  <motion.div 
                                    animate={{ x: [0, 32, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-blue-500"
                                  />
                                </div>
                                <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-mono">MediLink AI</div>
                              </div>

                              <div className="text-[8px] font-mono text-blue-400">
                                Exporting booking ID: VZ-84920
                              </div>
                            </motion.div>
                          )}

                          {/* PHASE 5: CELEBRATION / DONE */}
                          {btsPhase === 5 && (
                            <motion.div 
                              key="p5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col justify-between items-center text-center"
                            >
                              <div className="space-y-1 w-full text-left">
                                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20 inline-block">6. Confirmed and Locked</span>
                                <p className="text-[9px] text-neutral-400">Receipt injected into secure PDF patient ledger.</p>
                              </div>

                              {/* Big success celebration checkmark */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                  <Check className="w-5 h-5 animate-bounce" />
                                </div>
                                <span className="text-[11px] font-display font-bold text-white">"Done, appointment booked!"</span>
                                <span className="text-[8px] font-mono text-neutral-500">Cairo Specialty Clinic tomorrow 10:00 AM</span>
                              </div>

                              <div className="text-[8px] font-mono text-neutral-500">
                                State synced to patient portal
                              </div>
                            </motion.div>
                          )}

                        </div>

                        {/* Behind the scenes video controls */}
                        <div className="mt-3 flex items-center justify-between border-t border-purple-200/20 pt-2.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsPlayingBts(!isPlayingBts)}
                              className="w-6 h-6 rounded-full bg-purple-950/40 text-purple-400 hover:bg-purple-950/60 border border-purple-500/20 flex items-center justify-center transition-all cursor-pointer"
                            >
                              {isPlayingBts ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                            </button>
                            
                            {/* Apple-style mini indicator dots */}
                            <div className="flex gap-1">
                              {[0, 1, 2, 3, 4, 5].map((idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setBtsPhase(idx)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    btsPhase === idx ? 'bg-purple-500 w-3' : 'bg-neutral-600 hover:bg-neutral-400'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="text-[8px] font-mono text-neutral-400 tracking-wider">
                            RPA AGENT CONSOLE • LOOPING
                          </div>
                        </div>

                      </div>
                    )}
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
              Interactive mockup. Switch tabs on left to toggle demo modes.
            </span>
          </div>

        </div>

      </div>

      {/* Static scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[#86868B] pointer-events-none">
        <span className="text-[9px] tracking-[0.25em] uppercase font-mono font-medium text-neutral-500">Scroll down to view comparative metrics</span>
        <div className="w-[1px] h-5 bg-[#D2D2D7]" />
      </div>
    </div>
  );
}
