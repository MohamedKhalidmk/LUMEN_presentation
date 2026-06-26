import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Stethoscope, Building2, Pill, Activity, Sliders, Check, Star, ArrowRight, ShieldCheck, MapPin
} from 'lucide-react';

export default function ConnectedCareScene() {
  const [activeNode, setActiveNode] = useState<'patient' | 'doctor' | 'hospital' | 'pharmacy' | 'medilink'>('medilink');
  
  // AutoRec simulator states
  const [selectedSymptom, setSelectedSymptom] = useState<'rash' | 'cough' | 'fever'>('rash');
  const [selectedLocation, setSelectedLocation] = useState<'cairo' | 'alex' | 'giza'>('cairo');
  const [hasHistory, setHasHistory] = useState<boolean>(true);
  const [minRating, setMinRating] = useState<number>(4.5);

  const nodes = [
    {
      id: 'patient' as const,
      icon: User,
      title: 'Patient Node',
      description: 'The point of origin. Logs symptoms, captures photos, and queries guidance.',
      details: 'Transmits clinical intent, raw files, and geographic coordinates to the care routing matrix.',
      position: 'top-1/2 left-4 -translate-y-1/2',
      color: 'from-blue-500 to-sky-400',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
    },
    {
      id: 'doctor' as const,
      icon: Stethoscope,
      title: 'Physician Node',
      description: 'Verified medical specialists and general practitioners.',
      details: 'Receives fully structured pre-consultation digests, reducing administrative intake and maximizing face-to-face care.',
      position: 'top-6 left-1/2 -translate-x-1/2',
      color: 'from-purple-500 to-indigo-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]'
    },
    {
      id: 'hospital' as const,
      icon: Building2,
      title: 'Hospital Node',
      description: 'Regional clinics, medical groups, and diagnostic labs.',
      details: 'Synchronizes patient scheduling, referrals, and high-fidelity diagnostic imagery securely across locations.',
      position: 'bottom-6 left-1/2 -translate-x-1/2',
      color: 'from-emerald-500 to-teal-400',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]'
    },
    {
      id: 'pharmacy' as const,
      icon: Pill,
      title: 'Pharmacy Node',
      description: 'Local pharmacies and pharmaceutical centers.',
      details: 'Maintains drug safety audits and coordinates automated digital prescription fulfillment based on doctor approvals.',
      position: 'top-1/2 right-4 -translate-y-1/2',
      color: 'from-amber-500 to-yellow-400',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
    }
  ];

  // AutoRec scoring logic simulation
  const doctors = [
    { name: 'Dr. Yousry Mansour', specialty: 'Dermatologist', rating: 4.9, location: 'cairo', symptoms: ['rash'], baseScore: 92 },
    { name: 'Dr. Mona El-Shazly', specialty: 'Dermatologist', rating: 4.7, location: 'alex', symptoms: ['rash'], baseScore: 88 },
    { name: 'Dr. Kareem Hegazi', specialty: 'General Physician', rating: 4.4, location: 'cairo', symptoms: ['cough', 'fever'], baseScore: 82 },
    { name: 'Dr. Farida Salem', specialty: 'Pulmonologist', rating: 4.8, location: 'giza', symptoms: ['cough'], baseScore: 95 },
    { name: 'Dr. Tarek Hegazi', specialty: 'Pediatrician', rating: 4.6, location: 'cairo', symptoms: ['fever'], baseScore: 85 }
  ];

  const calculateScore = (doc: typeof doctors[0]) => {
    let score = doc.baseScore;
    
    // Symptom match bonus
    if (doc.symptoms.includes(selectedSymptom)) {
      score += 15;
    } else {
      score -= 30;
    }
    
    // Location match
    if (doc.location === selectedLocation) {
      score += 10;
    } else {
      score -= 15;
    }
    
    // User history match
    if (hasHistory && doc.name.includes('Yousry')) {
      score += 12; // simulated historical physician preference
    }
    
    // Rating filter adjustment
    if (doc.rating < minRating) {
      score -= 25;
    }

    return Math.max(0, Math.min(100, score));
  };

  const scoredDoctors = doctors
    .map(doc => ({ ...doc, score: calculateScore(doc) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-32 px-6 md:px-12 select-none border-b border-white/5" id="connected-care-root">
      {/* Dynamic ambient grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute left-[10%] bottom-1/4 w-[500px] h-[300px] bg-sky-500/[0.015] rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Apple slide header */}
        <div className="text-left mb-20 max-w-3xl">
          <span className="text-[10px] font-mono text-neutral-400 tracking-[0.25em] uppercase font-bold block mb-3">COORDINATED ECOSYSTEM</span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.1] mb-6">
            A connected care network. <br />
            <span className="text-neutral-500">From symptoms to the right provider.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans">
            Patients, doctors, hospitals, and pharmacies should not operate in separate silos. 
            MediLink links patient needs with localized clinical nodes, then uses intelligent recommendation logic to coordinate the entire journey.
          </p>
        </div>

        {/* Coordinated interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Interactive Connected Care Diagram */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-2 lg:order-1">
            <div className="relative w-full aspect-square max-w-[420px] bg-[#08090c] border border-white/[0.04] rounded-3xl p-8 shadow-2xl flex items-center justify-center overflow-hidden">
              
              {/* Dynamic lines between central MediLink node and outer nodes */}
              <svg className="absolute inset-0 w-full h-full text-neutral-800" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="net-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0071E3" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Cross connecting circuit lines */}
                <line x1="50" y1="50" x2="15" y2="50" stroke="url(#net-glow)" strokeWidth="0.75" />
                <line x1="50" y1="50" x2="50" y2="15" stroke="url(#net-glow)" strokeWidth="0.75" />
                <line x1="50" y1="50" x2="50" y2="85" stroke="url(#net-glow)" strokeWidth="0.75" />
                <line x1="50" y1="50" x2="85" y2="50" stroke="url(#net-glow)" strokeWidth="0.75" />

                {/* Pulsating signals along lines */}
                {['patient', 'doctor', 'hospital', 'pharmacy'].includes(activeNode) && (
                  <circle r="1" className="fill-[#0071E3]">
                    <animateMotion 
                      dur="1.5s" 
                      repeatCount="indefinite"
                      path={
                        activeNode === 'patient' ? "M 15,50 L 50,50" :
                        activeNode === 'doctor' ? "M 50,15 L 50,50" :
                        activeNode === 'hospital' ? "M 50,85 L 50,50" :
                        "M 85,50 L 50,50"
                      }
                    />
                  </circle>
                )}
              </svg>

              {/* CENTER NODE: MediLink Platform */}
              <div 
                onClick={() => setActiveNode('medilink')}
                className={`absolute w-24 h-24 rounded-2xl bg-neutral-900 border transition-all duration-300 flex flex-col items-center justify-center cursor-pointer z-20 ${
                  activeNode === 'medilink' 
                    ? 'border-[#0071E3] shadow-[0_0_25px_rgba(0,113,227,0.4)] bg-neutral-950 scale-105' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                id="node-medilink"
              >
                <div className="w-8 h-8 rounded-full bg-[#0071E3]/15 flex items-center justify-center mb-1">
                  <Activity className="w-4 h-4 text-[#0071E3]" />
                </div>
                <span className="text-[9px] font-mono text-[#F5F5F7] tracking-wider uppercase font-bold">medilink</span>
                <span className="text-[7px] font-mono text-neutral-500 uppercase font-bold">INTEGRATOR</span>
              </div>

              {/* OUTER NODES */}
              {nodes.map((node) => {
                const isSelected = activeNode === node.id;
                const NodeIcon = node.icon;

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={`absolute p-4 rounded-xl border bg-neutral-950 transition-all duration-300 flex items-center justify-center cursor-pointer z-10 ${node.position} ${
                      isSelected 
                        ? `border-white/40 scale-110 ${node.glow}` 
                        : 'border-white/5 hover:border-white/10 opacity-70'
                    }`}
                    id={`node-${node.id}`}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${node.color} bg-opacity-20 flex items-center justify-center mb-1.5`}>
                        <NodeIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[8px] font-mono text-[#A1A1A6] font-bold uppercase tracking-wider">
                        {node.id}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Details Box */}
            <div className="w-full max-w-[420px] mt-6 min-h-[100px]" id="node-details-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0f1013] border border-white/5 p-5 rounded-2xl text-left"
                >
                  {activeNode === 'medilink' ? (
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#0071E3] uppercase mb-1.5 tracking-wider">MediLink Hub Centralizer</h4>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                        Acts as the orchestration layer of the care journey. Seamlessly directs data packages between patient inputs, doctor portals, clinic channels, and partner endpoints.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase mb-1.5 tracking-wider">
                        {nodes.find(n => n.id === activeNode)?.title}
                      </h4>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed mb-1.5">
                        {nodes.find(n => n.id === activeNode)?.description}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-sans italic">
                        {nodes.find(n => n.id === activeNode)?.details}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Block: AutoRec Scoring Engine Simulator */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <div className="bg-[#08090c] border border-white/[0.05] p-6 rounded-3xl shadow-xl">
              
              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/5">
                <div className="p-2 rounded-lg bg-[#0071E3]/15 text-[#0071E3]">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[#F5F5F7]">
                    AutoRec Recommendation Simulator
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    Combines patient symptoms, geographic data, and history to score relevancy.
                  </p>
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="grid grid-cols-2 gap-4 mb-6" id="autorec-controls">
                {/* Symptom selection */}
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-2">Patient Symptom</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'rash', label: 'Skin Rash' },
                      { id: 'cough', label: 'Persistent Cough' },
                      { id: 'fever', label: 'High Fever' }
                    ].map(sym => (
                      <button
                        key={sym.id}
                        onClick={() => setSelectedSymptom(sym.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-left text-xs font-mono transition-colors border ${
                          selectedSymptom === sym.id 
                            ? 'bg-[#0071E3]/10 border-[#0071E3] text-[#F5F5F7]' 
                            : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/10'
                        }`}
                      >
                        {sym.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Selection */}
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-2">Location Availability</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'cairo', label: 'Cairo' },
                      { id: 'alex', label: 'Alexandria' },
                      { id: 'giza', label: 'Giza' }
                    ].map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-left text-xs font-mono transition-colors border ${
                          selectedLocation === loc.id 
                            ? 'bg-[#0071E3]/10 border-[#0071E3] text-[#F5F5F7]' 
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

              {/* Secondary toggles */}
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/40 border border-white/5 rounded-xl mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono text-neutral-300 font-bold block">Historical Care Affinity</span>
                    <span className="text-[8px] font-sans text-neutral-500">Prioritize doctors with previous interactions</span>
                  </div>
                </div>
                <button
                  onClick={() => setHasHistory(!hasHistory)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${hasHistory ? 'bg-[#0071E3]' : 'bg-neutral-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${hasHistory ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Render computed scored doctors list */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                  Active Ranked Scoring Results (AutoRec scoring logic)
                </span>
                
                {scoredDoctors.map((doc, idx) => {
                  const scoreColor = doc.score > 85 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : doc.score > 60 ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' : 'text-neutral-500 border-white/5 bg-neutral-900/20';

                  return (
                    <div 
                      key={doc.name}
                      className={`p-3 rounded-xl border flex justify-between items-center transition-all duration-300 ${scoreColor}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#F5F5F7]">{doc.name}</span>
                          <span className="text-[8.5px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-neutral-400">{doc.specialty}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-[10px] font-sans text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {doc.rating}
                          </span>
                          <span className="capitalize">{doc.location}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase block font-bold">Match Score</span>
                        <span className="text-sm font-mono font-bold">{doc.score}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Small informational note */}
              <div className="mt-5 p-3.5 border border-amber-500/15 bg-amber-500/5 rounded-2xl flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                <p className="text-[10.5px] text-amber-400 leading-relaxed font-sans">
                  <strong>AutoRec Mini-Card:</strong> AutoRec combines symptom features, geolocation affinity, ratings, and past clinic interactions to instantly weight and sort doctor relevance.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
