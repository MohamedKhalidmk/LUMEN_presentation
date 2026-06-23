import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, X, Volume2, VolumeX, SkipForward, SkipBack, Compass, Menu, 
  CheckCircle2, Info, ArrowUpRight
} from 'lucide-react';

// Import modular scene components
import HeroScene from './components/HeroScene';
import ProblemScene from './components/ProblemScene';
import ProductScene from './components/ProductScene';
import ComparisonScene from './components/ComparisonScene';
import LumenCoreScene from './components/LumenCoreScene';
import HTANScene from './components/HTANScene';
import RAGScene from './components/RAGScene';
import RoutingScene from './components/RoutingScene';
import QualityGateScene from './components/QualityGateScene';
import PatientExampleScene from './components/PatientExampleScene';
import DeploymentScene from './components/DeploymentScene';
import MarketFutureScene from './components/MarketFutureScene';

const ALL_CHAPTERS = [
  { id: 'hero', name: '01. Recrystallization', title: 'Lumen Reveal' },
  { id: 'problem', name: '02. Care Gap', title: 'The Problem' },
  { id: 'product', name: '03. Patient Portal', title: 'MediLink App' },
  { id: 'comparison', name: '04. Comparison', title: 'Platform Delta' },
  { id: 'core', name: '05. Architecture', title: 'Lumen Core' },
  { id: 'htan', name: '06. Segmentation', title: 'HTAN Vision' },
  { id: 'rag', name: '07. Evidence Vault', title: 'Biomedical RAG' },
  { id: 'routing', name: '08. Router', title: 'Routing Gateway' },
  { id: 'gate', name: '09. Quality Edge', title: 'Context Filter' },
  { id: 'example', name: '10. Case Study', title: 'Patient Example' },
  { id: 'deployment', name: '11. Cloud EC2', title: 'Cloud Deploy' },
  { id: 'market', name: '12. Roadmap', title: 'Future Strategy' }
];

const TOUR_STEPS = [
  {
    id: 'hero',
    title: 'Lumen Introduction',
    voiceText: 'Welcome to MediLink, powered by Lumen. Here we present a patient-centered framework that unifies digitized medical workflows under a direct clinical intelligence pipeline.'
  },
  {
    id: 'problem',
    title: 'The care digitization gap',
    voiceText: 'Egyptian digital health holds key assets, yet with only a six point six seven percent care orchestration rate, twenty-five million patients grapple with disjointed folders, ungrounded bots, and uncoordinated specialists.'
  },
  {
    id: 'product',
    title: 'The unified patient dashboard',
    voiceText: 'MediLink offers three seamless customer pillars. Easy consultation AI chat, Swin-T skin mole boundary scanning, and direct physical doctor booking options linked to patients cases.'
  },
  {
    id: 'comparison',
    title: 'Platform comparatives',
    voiceText: 'Vezeeta, Altibbi, and WebTeb excel in specific pieces. Only MediLink unifies the care cycle, passing clinical case files seamlessly to physical physicians.'
  },
  {
    id: 'core',
    title: 'Lumen core architecture',
    voiceText: 'Lumen is a system of specialized components. It routes user tasks into image segmenters, vector literature grounders, and safety filters to prevent hallucinations.'
  },
  {
    id: 'htan',
    title: 'HTAN computer vision',
    voiceText: 'The Hyper-connected Transformer Attention Network outlines skin anomaly margins. Intended for visual tracing context, it achieves a ninety point three two percent Dice score; is segmentation only, never rendering diagnoses.'
  },
  {
    id: 'rag',
    title: 'Biomedical vector search',
    voiceText: 'Lumen retrieves abstracts from twenty-five million papers in Weaviate. Supported by S-PubMedBERT, it forces final outputs to cite real publications, ensuring evidence-based safety.'
  },
  {
    id: 'routing',
    title: 'LangGraph inlet router',
    voiceText: 'Our gateway router monitors user intents. Non-clinical chats bypass heavy visual model clusters, protecting active server instances and maintaining immediate response runtimes.'
  },
  {
    id: 'gate',
    title: 'Context protection gates',
    voiceText: 'All tool data passes our Quality Gate. Irrelevant logs are stripped to clean context packages. As we say: tools may help Sonnet, but they cannot poison it.'
  },
  {
    id: 'example',
    title: 'Request simulation',
    voiceText: 'Watch a clinical mole scan progress from upload, through routing, visual tracing, dense literature matching, and gate checks, into direct physician summary exports.'
  },
  {
    id: 'deployment',
    title: 'Distributed AWS slots',
    voiceText: 'Lumen is containerized as modular FastAPI slots on AWS EC2. Intricate GPU nodes run separate from general CPU endpoints, yielding high uptime.'
  },
  {
    id: 'market',
    title: 'Enterprise scaling',
    voiceText: 'MediLink remains free for patients. Hospitals and research groups support us through regional coordination hub subscriptions. This is medical AI built for the real world.'
  }
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guided Tour States
  const [tourActive, setTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [tourPlaying, setTourPlaying] = useState(false);
  const [tourMuted, setTourMuted] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Standard Scroll Event to detect Active Chapter
  useEffect(() => {
    if (tourActive) return; // Disable scroll override when tour is driving of the session

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const chapter of ALL_CHAPTERS) {
        const el = sectionRefs.current[chapter.id];
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.clientHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveChapter(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tourActive]);

  const scrollToSection = (id: string) => {
    const target = sectionRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Synchronize active tour step with scroll position and narration
  useEffect(() => {
    if (!tourActive) return;

    const currentStepObj = TOUR_STEPS[tourStepIndex];
    setActiveChapter(currentStepObj.id);
    scrollToSection(currentStepObj.id);

    // Cancel any existing TTS voice queues
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Trigger TTS read if unmuted
    if (!tourMuted && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentStepObj.voiceText);
      utterance.rate = 0.95; // Gentle professional pacing
      window.speechSynthesis.speak(utterance);
    }

    // Clean timer
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
    }

    // If active and playing, schedule auto-advanced transition (roughly 14 seconds)
    if (tourPlaying) {
      playbackTimerRef.current = setTimeout(() => {
        handleNextStep();
      }, 14000);
    }

    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
    };
  }, [tourActive, tourStepIndex, tourPlaying, tourMuted]);

  // Handle tour actions
  const startTour = () => {
    setTourActive(true);
    setTourStepIndex(0);
    setTourPlaying(true);
  };

  const pauseTour = () => {
    setTourPlaying(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const resumeTour = () => {
    setTourPlaying(true);
  };

  const exitTour = () => {
    setTourActive(false);
    setTourPlaying(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleNextStep = () => {
    if (tourStepIndex < TOUR_STEPS.length - 1) {
      setTourStepIndex((prev) => prev + 1);
    } else {
      exitTour(); // Cycle completed
    }
  };

  const handlePrevStep = () => {
    if (tourStepIndex > 0) {
      setTourStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F5F5F7] font-sans antialiased overflow-x-hidden selection:bg-[#0071E3] selection:text-white">
      
      {/* Global Apple top Navigation Bar */}
      <header className="fixed top-0 inset-x-0 h-14 bg-black/85 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="w-5 h-5 rounded bg-neutral-900 border border-white/10 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
          </div>
          <span className="font-display font-medium tracking-wider text-sm text-[#F5F5F7]">
            medilink <span className="text-neutral-500 font-light">lumen</span>
          </span>
        </div>

        {/* Desktop Step Index dots */}
        <nav className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
          <span className="text-neutral-600 mr-2 uppercase tracking-wide font-bold">CHAPTERS:</span>
          {ALL_CHAPTERS.map((ch, idx) => (
            <React.Fragment key={ch.id}>
              <span 
                onClick={() => {
                  if (tourActive) {
                    setTourStepIndex(idx);
                  } else {
                    scrollToSection(ch.id);
                  }
                }}
                className={`cursor-pointer hover:text-white transition-colors py-1 px-1.5 rounded ${
                  activeChapter === ch.id ? 'text-[#0071E3] font-bold bg-[#0071E3]/10' : ''
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              {idx < ALL_CHAPTERS.length - 1 && <span className="text-neutral-800">|</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Header CTA Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={startTour}
            className="px-4 py-1.5 bg-[#0071E3] hover:bg-[#147CE5] text-[10px] font-mono font-bold text-white rounded transition-colors"
          >
            PLAY PRESENTATION
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 px-2 text-neutral-400 hover:text-white border border-white/10 bg-neutral-950 rounded lg:hidden"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Guided Tour Remote Control (Bottom center Apple panel design) */}
      <AnimatePresence>
        {tourActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-40"
          >
            <div className="bg-[#111111]/95 border border-white/15 p-5 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono text-[#0071E3] uppercase font-bold tracking-widest flex items-center gap-2">
                  <Compass className={`w-3.5 h-3.5 ${tourPlaying ? 'animate-spin' : ''}`} />
                  LUMEN TOUR CO-PILOT
                </span>
                
                <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                  <span>STEP {String(tourStepIndex + 1).padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{String(TOUR_STEPS.length).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Narrated Transcript Subtitle box */}
              <div className="bg-black/60 border border-white/5 p-4 rounded-xl mb-4 text-left">
                <h4 className="text-xs font-mono font-bold text-[#F5F5F7] mb-1.5 uppercase">
                  {TOUR_STEPS[tourStepIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-light">
                  {TOUR_STEPS[tourStepIndex].voiceText}
                </p>
              </div>

              {/* Navigation Playback strip */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={tourStepIndex === 0}
                    className="p-2 bg-[#1C1C1F] hover:bg-[#2C2C2F] disabled:opacity-35 rounded-lg text-neutral-300 transition-colors"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  
                  {tourPlaying ? (
                    <button
                      onClick={pauseTour}
                      className="px-5 py-2 bg-[#0071E3] hover:bg-[#147CE5] text-white font-mono text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>PAUSE</span>
                    </button>
                  ) : (
                    <button
                      onClick={resumeTour}
                      className="px-5 py-2 bg-[#1C1C1F] hover:bg-[#2C2C2F] text-white font-mono text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>PLAY</span>
                    </button>
                  )}

                  <button
                    onClick={handleNextStep}
                    className="p-2 bg-[#1C1C1F] hover:bg-[#2C2C2F] rounded-lg text-neutral-300 transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setTourMuted(!tourMuted)}
                    className={`p-2 rounded-lg transition-colors ${
                      tourMuted ? 'bg-red-950/20 text-red-400 border border-red-900/10' : 'bg-[#1C1C1F] hover:bg-[#2C2C2F] text-neutral-300'
                    }`}
                    title={tourMuted ? 'Unmute voice' : 'Mute voice'}
                  >
                    {tourMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={exitTour}
                    className="px-4 py-2 bg-[#1C1C1F] hover:bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white rounded-lg text-xs font-mono transition-colors"
                  >
                    EXIT TOUR
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer header menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-64 bg-[#111111] border-l border-white/10 z-40 p-6 pt-20 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider font-bold">SELECT CHAPTER</span>
              <div className="space-y-2">
                {ALL_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      if (tourActive) {
                        setTourStepIndex(idx);
                        setMobileMenuOpen(false);
                      } else {
                        scrollToSection(ch.id);
                        setActiveChapter(ch.id);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-mono transition-colors block ${
                      activeChapter === ch.id 
                        ? 'bg-[#0071E3]/15 text-[#4FA3FF] font-bold' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {ch.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-4 border-t border-white/5 text-[9px] font-mono text-neutral-500 uppercase">
              <span>Cairo Egypt, 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mounting Section Pages */}
      <main className="pt-14 relative w-full">
        <div ref={el => { sectionRefs.current['hero'] = el; }} id="hero" className="scroll-mt-14">
          <HeroScene 
            onEnterExperience={() => {
              if (tourActive) {
                handleNextStep();
              } else {
                scrollToSection('problem');
                setActiveChapter('problem');
              }
            }}
            onStartTour={startTour}
          />
        </div>

        <div ref={el => { sectionRefs.current['problem'] = el; }} id="problem" className="scroll-mt-14">
          <ProblemScene />
        </div>

        <div ref={el => { sectionRefs.current['product'] = el; }} id="product" className="scroll-mt-14">
          <ProductScene />
        </div>

        <div ref={el => { sectionRefs.current['comparison'] = el; }} id="comparison" className="scroll-mt-14">
          <ComparisonScene />
        </div>

        <div ref={el => { sectionRefs.current['core'] = el; }} id="core" className="scroll-mt-14">
          <LumenCoreScene />
        </div>

        <div ref={el => { sectionRefs.current['htan'] = el; }} id="htan" className="scroll-mt-14">
          <HTANScene />
        </div>

        <div ref={el => { sectionRefs.current['rag'] = el; }} id="rag" className="scroll-mt-14">
          <RAGScene />
        </div>

        <div ref={el => { sectionRefs.current['routing'] = el; }} id="routing" className="scroll-mt-14">
          <RoutingScene />
        </div>

        <div ref={el => { sectionRefs.current['gate'] = el; }} id="gate" className="scroll-mt-14">
          <QualityGateScene />
        </div>

        <div ref={el => { sectionRefs.current['example'] = el; }} id="example" className="scroll-mt-14">
          <PatientExampleScene />
        </div>

        <div ref={el => { sectionRefs.current['deployment'] = el; }} id="deployment" className="scroll-mt-14">
          <DeploymentScene />
        </div>

        <div ref={el => { sectionRefs.current['market'] = el; }} id="market" className="scroll-mt-14">
          <MarketFutureScene />
        </div>
      </main>
    </div>
  );
}
