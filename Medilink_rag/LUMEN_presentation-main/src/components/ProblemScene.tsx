import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Stethoscope, Building2, Pill, Activity, 
  Sliders, Star, MapPin, ShieldCheck, Clock, ArrowRight, Info
} from 'lucide-react';

type NodeId = 'patient' | 'doctor' | 'hospital' | 'pharmacy' | 'medilink';

export default function ProblemScene() {
  // Connected care nodes state - start with beautiful connected set
  const [activeNode, setActiveNode] = useState<NodeId>('medilink');
  const [connectedNodes, setConnectedNodes] = useState<NodeId[]>(['medilink']);
  
  // AutoRec simulator states
  const [selectedSymptom, setSelectedSymptom] = useState<'rash' | 'cough' | 'backpain'>('backpain');
  const [selectedLocation, setSelectedLocation] = useState<'cairo' | 'alex'>('cairo');
  const [hasHistory, setHasHistory] = useState<boolean>(true);
  const [onlyAvailableNow, setOnlyAvailableNow] = useState<boolean>(false);

  const nodes = [
    {
      id: 'patient' as const,
      icon: User,
      title: 'Patient Node',
      description: 'The care point of origin.',
      details: 'Patient registers initial symptoms, logs physical indicators, and queries local clinician routes.',
      color: 'from-blue-500 to-sky-400',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'doctor' as const,
      icon: Stethoscope,
      title: 'Physician Node',
      description: 'Verified clinical specialist.',
      details: 'Physicians receive structured patient summaries before consulting, eliminating intake admin.',
      color: 'from-purple-500 to-indigo-400',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'hospital' as const,
      icon: Building2,
      title: 'Hospital Node',
      description: 'Clinic and diagnostics portal.',
      details: 'Hospitals synchronize scheduling slots, medical records, and physician availability indexes.',
      color: 'from-emerald-500 to-teal-400',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      id: 'pharmacy' as const,
      icon: Pill,
      title: 'Pharmacy Node',
      description: 'Fulfillment network.',
      details: 'Fulfills digitally signed e-prescriptions instantly and records checkout states.',
      color: 'from-amber-500 to-yellow-400',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    }
  ];

  const handleNodeClick = (id: NodeId) => {
    setActiveNode(id);
    if (id === 'medilink') return;
    setConnectedNodes(prev => {
      if (prev.includes(id)) {
        return prev.filter(n => n !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // AutoRec scoring logic simulation
  const doctors = [
    { name: 'Dr. Yousry Mansour', specialty: 'Orthopedist', rating: 4.9, location: 'cairo', symptoms: ['backpain'], baseScore: 84, availableToday: true, hasHistoryWithUser: true },
    { name: 'Dr. Farida Salem', specialty: 'Pulmonologist', rating: 4.8, location: 'alex', symptoms: ['cough'], baseScore: 85, availableToday: false, hasHistoryWithUser: false },
    { name: 'Dr. Kareem Hegazi', specialty: 'General Physician', rating: 4.5, location: 'cairo', symptoms: ['cough', 'backpain'], baseScore: 78, availableToday: true, hasHistoryWithUser: true },
    { name: 'Dr. Mona El-Shazly', specialty: 'Dermatologist', rating: 4.7, location: 'alex', symptoms: ['rash'], baseScore: 80, availableToday: true, hasHistoryWithUser: false },
    { name: 'Dr. Tarek Hegazi', specialty: 'Orthopedist', rating: 4.6, location: 'cairo', symptoms: ['backpain'], baseScore: 81, availableToday: false, hasHistoryWithUser: false }
  ];

  const calculateScore = (doc: typeof doctors[0]) => {
    let score = doc.baseScore;
    
    // Symptom match bonus
    if (doc.symptoms.includes(selectedSymptom)) {
      score += 15;
    } else {
      score -= 20;
    }
    
    // Location match bonus
    if (doc.location === selectedLocation) {
      score += 10;
    } else {
      score -= 15;
    }
    
    // User history affinity modifier (gives dramatic +25 shift when enabled)
    if (hasHistory) {
      if (doc.hasHistoryWithUser) {
        score += 25;
      } else {
        score -= 5;
      }
    }
    
    // Availability modifier (heavy penalty to push unavailable down)
    if (onlyAvailableNow) {
      if (doc.availableToday) {
        score += 15;
      } else {
        score -= 40;
      }
    }

    return Math.max(0, Math.min(100, score));
  };

  const scoredDoctors = doctors
    .map(doc => ({ ...doc, score: calculateScore(doc) }))
    .sort((a, b) => b.score - a.score);

  const scrollToNextSection = () => {
    const el = document.getElementById('autorec-detail-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#141517] text-[#F5F5F7] flex flex-col justify-center py-28 px-6 md:px-12 select-none overflow-hidden border-b border-white/5" id="connected-care-root">
      
      {/* Subtle organic ambient highlights */}
      <div className="absolute top-[25%] right-[15%] w-[450px] h-[350px] bg-blue-500/[0.04] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-purple-500/[0.03] rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header content block */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="text-[10px] font-mono text-neutral-500 tracking-[0.25em] uppercase font-bold block mb-3">
            CONNECTED CARE SYSTEM
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.1] mb-6">
            A connected care network. <br />
            <span className="text-neutral-500 font-light">From symptoms to the right provider.</span>
          </h2>

        </div>

        {/* Coordinated interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Interactive Connected Care Network Diagram */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            <div className="relative w-full aspect-square max-w-[390px] bg-[#1E2024] border border-white/[0.06] rounded-3xl p-6 shadow-2xl flex items-center justify-center overflow-hidden">
              
              {/* Premium, clean vector-thin connection lines */}
              <svg className="absolute inset-0 w-full h-full text-neutral-800" viewBox="0 0 100 100">
                {/* Horizontal & vertical layout connector paths to center hub */}
                
                {/* Pharmacy Connector Path */}
                <line x1="50" y1="50" x2="50" y2="18" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="50" y2="18" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('pharmacy') ? '0.7' : '0'} strokeWidth="1" className="transition-all duration-500" />
                <line x1="50" y1="50" x2="50" y2="18" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('pharmacy') ? '0.18' : '0'} strokeWidth="3" className="transition-all duration-500 blur-[1px]" />

                {/* Hospital Connector Path */}
                <line x1="50" y1="50" x2="50" y2="82" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="50" y2="82" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('hospital') ? '0.7' : '0'} strokeWidth="1" className="transition-all duration-500" />
                <line x1="50" y1="50" x2="50" y2="82" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('hospital') ? '0.18' : '0'} strokeWidth="3" className="transition-all duration-500 blur-[1px]" />

                {/* Patient Connector Path */}
                <line x1="50" y1="50" x2="18" y2="50" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="18" y2="50" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('patient') ? '0.7' : '0'} strokeWidth="1" className="transition-all duration-500" />
                <line x1="50" y1="50" x2="18" y2="50" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('patient') ? '0.18' : '0'} strokeWidth="3" className="transition-all duration-500 blur-[1px]" />

                {/* Doctor Connector Path */}
                <line x1="50" y1="50" x2="82" y2="50" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="82" y2="50" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('doctor') ? '0.7' : '0'} strokeWidth="1" className="transition-all duration-500" />
                <line x1="50" y1="50" x2="82" y2="50" stroke="#3b82f6" strokeOpacity={connectedNodes.includes('doctor') ? '0.18' : '0'} strokeWidth="3" className="transition-all duration-500 blur-[1px]" />

                {/* Calm, animated blue signal dots moving along active lines towards center */}
                {connectedNodes.map((node) => (
                  node !== 'medilink' && (
                    <circle key={node} r="1.2" className="fill-[#3b82f6] filter drop-shadow-[0_0_3px_#3b82f6]">
                      <animateMotion 
                        dur="2.5s" 
                        repeatCount="indefinite"
                        path={
                          node === 'patient' ? "M 18,50 L 50,50" :
                          node === 'doctor' ? "M 82,50 L 50,50" :
                          node === 'hospital' ? "M 50,82 L 50,50" :
                          "M 50,18 L 50,50"
                        }
                      />
                    </circle>
                  )
                ))}
              </svg>

              {/* CENTER HUB: MediLink Integrator Hub */}
              <button 
                onClick={() => handleNodeClick('medilink')}
                className={`absolute w-24 h-24 rounded-2xl bg-[#17181C] border transition-all duration-300 flex flex-col items-center justify-center cursor-pointer z-20 ${
                  activeNode === 'medilink' 
                    ? 'border-[#0071E3] shadow-[0_0_20px_rgba(0,113,227,0.25)] bg-[#1B1D24] scale-[1.03]' 
                    : 'border-white/5 hover:border-white/10 hover:scale-[1.01]'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#0071E3]/15 flex items-center justify-center mb-1.5 animate-pulse">
                  <Activity className="w-4.5 h-4.5 text-[#0071E3]" />
                </div>
                <span className="text-[10px] font-mono text-white tracking-widest uppercase font-bold">medilink</span>
                <span className="text-[7px] font-mono text-neutral-400 uppercase font-bold tracking-wider">INTEGRATOR</span>
              </button>

              {/* Patient Node */}
              <button
                onClick={() => handleNodeClick('patient')}
                className={`absolute p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center cursor-pointer z-10 top-1/2 left-4 -translate-y-1/2 ${
                  connectedNodes.includes('patient') 
                    ? 'border-blue-500/40 bg-[#16171B] text-white opacity-100' 
                    : 'border-white/[0.04] bg-[#121316]/40 text-neutral-500 opacity-45 hover:opacity-75'
                } ${
                  activeNode === 'patient' 
                    ? 'shadow-[0_0_15px_rgba(59,130,246,0.25)] ring-1 ring-blue-500/30 scale-[1.03]' 
                    : 'hover:scale-[1.01]'
                }`}
              >
                <div className={`p-2 rounded-xl mb-1 transition-colors ${
                  connectedNodes.includes('patient') ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-800/20 text-neutral-500'
                }`}>
                  <User className="w-4.5 h-4.5" />
                </div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider">PATIENT</span>
              </button>

              {/* Doctor Node */}
              <button
                onClick={() => handleNodeClick('doctor')}
                className={`absolute p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center cursor-pointer z-10 top-1/2 right-4 -translate-y-1/2 ${
                  connectedNodes.includes('doctor') 
                    ? 'border-purple-500/40 bg-[#16171B] text-white opacity-100' 
                    : 'border-white/[0.04] bg-[#121316]/40 text-neutral-500 opacity-45 hover:opacity-75'
                } ${
                  activeNode === 'doctor' 
                    ? 'shadow-[0_0_15px_rgba(168,85,247,0.25)] ring-1 ring-purple-500/30 scale-[1.03]' 
                    : 'hover:scale-[1.01]'
                }`}
              >
                <div className={`p-2 rounded-xl mb-1 transition-colors ${
                  connectedNodes.includes('doctor') ? 'bg-purple-500/10 text-purple-400' : 'bg-neutral-800/20 text-neutral-500'
                }`}>
                  <Stethoscope className="w-4.5 h-4.5" />
                </div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider">DOCTOR</span>
              </button>

              {/* Hospital Node */}
              <button
                onClick={() => handleNodeClick('hospital')}
                className={`absolute p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center cursor-pointer z-10 bottom-4 left-1/2 -translate-x-1/2 ${
                  connectedNodes.includes('hospital') 
                    ? 'border-emerald-500/40 bg-[#16171B] text-white opacity-100' 
                    : 'border-white/[0.04] bg-[#121316]/40 text-neutral-500 opacity-45 hover:opacity-75'
                } ${
                  activeNode === 'hospital' 
                    ? 'shadow-[0_0_15px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/30 scale-[1.03]' 
                    : 'hover:scale-[1.01]'
                }`}
              >
                <div className={`p-2 rounded-xl mb-1 transition-colors ${
                  connectedNodes.includes('hospital') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800/20 text-neutral-500'
                }`}>
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider">HOSPITAL</span>
              </button>

              {/* Pharmacy Node */}
              <button
                onClick={() => handleNodeClick('pharmacy')}
                className={`absolute p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center cursor-pointer z-10 top-4 left-1/2 -translate-x-1/2 ${
                  connectedNodes.includes('pharmacy') 
                    ? 'border-amber-500/40 bg-[#16171B] text-white opacity-100' 
                    : 'border-white/[0.04] bg-[#121316]/40 text-neutral-500 opacity-45 hover:opacity-75'
                } ${
                  activeNode === 'pharmacy' 
                    ? 'shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/30 scale-[1.03]' 
                    : 'hover:scale-[1.01]'
                }`}
              >
                <div className={`p-2 rounded-xl mb-1 transition-colors ${
                  connectedNodes.includes('pharmacy') ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800/20 text-neutral-500'
                }`}>
                  <Pill className="w-4.5 h-4.5" />
                </div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider">PHARMACY</span>
              </button>
            </div>

            {/* Selected Node Details Box */}
            <div className="w-full max-w-[390px] mt-4 text-center min-h-[24px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest"
                >
                  {activeNode === 'medilink' ? (
                    <span className="text-neutral-500">MediLink Hub • Active handshakes: {connectedNodes.filter(n => n !== 'medilink').length}</span>
                  ) : (
                    <span>
                      {nodes.find(n => n.id === activeNode)?.title} •{' '}
                      <span className={connectedNodes.includes(activeNode) ? 'text-blue-400' : 'text-neutral-600'}>
                        {connectedNodes.includes(activeNode) ? 'Connected' : 'Click node to link'}
                      </span>
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Block: AutoRec Interactive Scoring Simulator */}
          <div className="lg:col-span-6 space-y-6 text-left w-full">
            <div className="bg-[#121318] border border-white/[0.04] rounded-3xl shadow-xl p-5 md:p-6 transition-all duration-300">
              
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <div className="p-2.5 rounded-lg bg-[#0071E3]/15 text-[#0071E3]">
                  <Sliders className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-[#F5F5F7]">
                      Clinical Referral Matching Simulator
                    </h3>
                    <span className="text-[8px] font-mono font-bold bg-[#0071E3] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Informatics Router</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    How the coordinator calculates provider suitability scores.
                  </p>
                </div>
              </div>

              {/* Interactive controls */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {/* Symptoms selector */}
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-1.5">Symptom Input</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'rash', label: 'Skin Rash' },
                      { id: 'cough', label: 'Persistent Cough' },
                      { id: 'backpain', label: 'Lower Back Pain' }
                    ].map(sym => (
                      <button
                        key={sym.id}
                        onClick={() => setSelectedSymptom(sym.id as any)}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-mono transition-colors border ${
                          selectedSymptom === sym.id 
                            ? 'bg-[#0071E3]/15 border-[#0071E3] text-white font-semibold shadow-[0_0_10px_rgba(0,113,227,0.1)]' 
                            : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/10'
                        }`}
                      >
                        {sym.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location selector */}
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-1.5">User Location</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'cairo', label: 'Cairo (Local)' },
                      { id: 'alex', label: 'Alexandria' }
                    ].map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id as any)}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-mono transition-colors border ${
                          selectedLocation === loc.id 
                            ? 'bg-[#0071E3]/15 border-[#0071E3] text-white font-semibold shadow-[0_0_10px_rgba(0,113,227,0.1)]' 
                            : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/10'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 opacity-60" />
                          {loc.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Patient history and availability toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {/* Historical care affinity */}
                <div className="flex items-center justify-between p-3.5 bg-neutral-900/60 border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[9.5px] font-mono text-neutral-300 font-bold block">Care Affinity</span>
                      <span className="text-[8px] font-sans text-neutral-500">Prioritize past specialists</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setHasHistory(!hasHistory)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${hasHistory ? 'bg-[#0071E3]' : 'bg-neutral-800'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${hasHistory ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Available Today toggle */}
                <div className="flex items-center justify-between p-3.5 bg-neutral-900/60 border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <span className="text-[9.5px] font-mono text-neutral-300 font-bold block">Available Today</span>
                      <span className="text-[8px] font-sans text-neutral-500">Only open slots today</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setOnlyAvailableNow(!onlyAvailableNow)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${onlyAvailableNow ? 'bg-[#0071E3]' : 'bg-neutral-800'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${onlyAvailableNow ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* Dynamic computed scoring list */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                  Computed Match Rankings:
                </span>
                
                {scoredDoctors.map((doc) => {
                  const isTop = doc.score >= 80;
                  const scoreColor = isTop 
                    ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' 
                    : 'text-neutral-400 bg-white/[0.02] border-white/5';

                  const isYousry = doc.name.includes('Yousry');

                  return (
                    <div 
                      key={doc.name}
                      className={`p-3 rounded-2xl border flex justify-between items-center transition-all duration-300 ${
                        isYousry ? 'ring-2 ring-purple-500 border-purple-500 bg-purple-950/10 scale-[1.01]' : scoreColor
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-200">{doc.name}</span>
                          <span className="text-[8px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-neutral-400 uppercase font-bold">{doc.specialty}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-neutral-500">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {doc.rating}
                          </span>
                          <span className="capitalize">{doc.location === 'cairo' ? 'Cairo' : 'Alexandria'}</span>
                          {doc.availableToday && (
                            <span className="text-emerald-500 font-mono text-[9px] font-bold bg-emerald-500/10 px-1 py-0.2 rounded">Today</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[8px] font-mono text-neutral-500 uppercase block font-bold">AutoRec Match</span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-white">{doc.score}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanatory summary card */}
              <div className="mt-5 p-3.5 border border-[#0071E3]/25 bg-[#0071E3]/5 rounded-2xl flex items-center gap-2.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 animate-pulse" />
                <p className="text-[10.5px] text-neutral-300 font-sans">
                  <strong>AutoRec Live Weights:</strong> Geolocation, specialty score, and clinical affinity are calculated dynamically.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Natural continuous scroll link indicator */}
        <div className="mt-16 flex justify-center">
          <button 
            onClick={scrollToNextSection}
            className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-white/5 rounded-full text-xs font-mono font-bold uppercase tracking-wide transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Next: AutoRec Engine</span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
