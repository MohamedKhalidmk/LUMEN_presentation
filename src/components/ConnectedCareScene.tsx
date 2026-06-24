import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Stethoscope,
  Building2,
  Pill,
  Activity,
  Sliders,
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

type NodeId = 'patient' | 'doctor' | 'hospital' | 'pharmacy';
type SymptomId = 'rash' | 'cough' | 'fever';
type LocationId = 'cairo' | 'alex' | 'giza';

const nodes = [
  {
    id: 'patient' as const,
    icon: User,
    title: 'Patient',
    description: 'Starts the journey with symptoms, questions, records, or uploaded files.',
    detail: 'MediLink keeps the patient request attached to context instead of leaving it as a disconnected message.',
    position: 'left-[5%] top-1/2 -translate-y-1/2',
    line: { x1: 18, y1: 50, x2: 50, y2: 50 },
  },
  {
    id: 'doctor' as const,
    icon: Stethoscope,
    title: 'Doctor',
    description: 'Receives a clearer pre-visit picture before the consultation begins.',
    detail: 'Symptoms, bookings, and records can become a structured handoff instead of repeated patient explanations.',
    position: 'left-1/2 top-[5%] -translate-x-1/2',
    line: { x1: 50, y1: 18, x2: 50, y2: 50 },
  },
  {
    id: 'hospital' as const,
    icon: Building2,
    title: 'Hospital',
    description: 'Coordinates appointments, departments, reports, and follow-up steps.',
    detail: 'The hospital becomes part of the same care loop instead of a separate offline step.',
    position: 'left-1/2 bottom-[5%] -translate-x-1/2',
    line: { x1: 50, y1: 82, x2: 50, y2: 50 },
  },
  {
    id: 'pharmacy' as const,
    icon: Pill,
    title: 'Pharmacy',
    description: 'Supports prescriptions, availability, and medication follow-through.',
    detail: 'The care path continues after the visit, linking prescriptions and follow-up reminders back to the record.',
    position: 'right-[5%] top-1/2 -translate-y-1/2',
    line: { x1: 82, y1: 50, x2: 50, y2: 50 },
  },
];

const doctors = [
  { name: 'Dr. Yousry Mansour', specialty: 'Dermatologist', rating: 4.9, location: 'cairo', symptoms: ['rash'], baseScore: 72 },
  { name: 'Dr. Mona El-Shazly', specialty: 'Dermatologist', rating: 4.7, location: 'alex', symptoms: ['rash'], baseScore: 70 },
  { name: 'Dr. Kareem Hegazi', specialty: 'General Physician', rating: 4.4, location: 'cairo', symptoms: ['cough', 'fever'], baseScore: 66 },
  { name: 'Dr. Farida Salem', specialty: 'Pulmonologist', rating: 4.8, location: 'giza', symptoms: ['cough'], baseScore: 74 },
  { name: 'Dr. Tarek Hegazi', specialty: 'Pediatrician', rating: 4.6, location: 'cairo', symptoms: ['fever'], baseScore: 68 },
];

export default function ConnectedCareScene() {
  const [activeNodes, setActiveNodes] = useState<NodeId[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomId>('rash');
  const [selectedLocation, setSelectedLocation] = useState<LocationId>('cairo');
  const [hasHistory, setHasHistory] = useState(true);
  const [availableToday, setAvailableToday] = useState(true);

  const toggleNode = (id: NodeId) => {
    setActiveNodes((prev) =>
      prev.includes(id) ? prev.filter((node) => node !== id) : [...prev, id]
    );
  };

  const calculateScore = (doc: (typeof doctors)[number]) => {
    let score = doc.baseScore;

    if (doc.symptoms.includes(selectedSymptom)) score += 18;
    else score -= 20;

    if (doc.location === selectedLocation) score += 12;
    else score -= 8;

    if (hasHistory && doc.name.includes('Yousry')) score += 12;
    if (availableToday && ['cairo', 'giza'].includes(doc.location)) score += 8;
    if (!availableToday && doc.location === 'alex') score += 7;

    return Math.max(12, Math.min(99, score));
  };

  const scoredDoctors = doctors
    .map((doc) => ({ ...doc, score: calculateScore(doc) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const selectedSummary =
    activeNodes.length === 0
      ? 'Select nodes to build the care network.'
      : `${activeNodes.length} care node${activeNodes.length > 1 ? 's' : ''} connected to MediLink.`;

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 border-b border-neutral-200"
      id="connected-care-root"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-18%] right-[-12%] h-[560px] w-[560px] rounded-full bg-blue-200/35 blur-[130px]" />
        <div className="absolute bottom-[-22%] left-[-10%] h-[520px] w-[520px] rounded-full bg-white blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="text-[10px] font-mono text-[#86868B] tracking-[0.25em] uppercase font-bold block mb-3">
            Coordinated ecosystem
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-semibold text-[#1D1D1F] tracking-[-0.055em] leading-[1.05] mb-5">
            A connected care network.
            <br />
            <span className="text-[#86868B] font-light">From symptoms to the right provider.</span>
          </h2>
          <p className="text-[#6E6E73] text-sm md:text-base leading-relaxed max-w-2xl">
            MediLink connects the patient journey across doctors, clinics, hospitals, and pharmacies,
            then uses recommendation logic to help choose the most relevant next step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6">
            <div className="h-full rounded-[2.2rem] bg-white/80 border border-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.08)] p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B] mb-1">
                    Care graph
                  </p>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">Build the network</h3>
                </div>
                <div className="rounded-full bg-[#F5F5F7] border border-black/5 px-3 py-1.5 text-xs text-[#6E6E73]">
                  {selectedSummary}
                </div>
              </div>

              <div className="relative aspect-square max-w-[460px] mx-auto rounded-[2rem] bg-[#FBFBFD] border border-black/5 overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.11),transparent_42%)]" />

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="softCareLine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0071E3" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#7AB8FF" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                  {nodes.map((node) => {
                    const active = activeNodes.includes(node.id);
                    return (
                      <g key={node.id}>
                        <line
                          x1={node.line.x1}
                          y1={node.line.y1}
                          x2={node.line.x2}
                          y2={node.line.y2}
                          stroke={active ? 'url(#softCareLine)' : 'rgba(0,0,0,0.10)'}
                          strokeWidth={active ? 1.2 : 0.7}
                          strokeLinecap="round"
                        />
                        {active && (
                          <circle r="1.15" fill="#0071E3">
                            <animateMotion
                              dur="1.7s"
                              repeatCount="indefinite"
                              path={`M ${node.line.x1},${node.line.y1} L ${node.line.x2},${node.line.y2}`}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute left-1/2 top-1/2 z-20 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[1.75rem] bg-[#1D1D1F] text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0071E3]/20 text-[#7AB8FF]">
                    <Activity className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em]">MediLink</span>
                  <span className="text-[8px] font-mono uppercase tracking-[0.12em] text-white/45">hub</span>
                </div>

                {nodes.map((node) => {
                  const Icon = node.icon;
                  const active = activeNodes.includes(node.id);
                  return (
                    <button
                      key={node.id}
                      onClick={() => toggleNode(node.id)}
                      className={`absolute ${node.position} z-30 w-24 rounded-2xl border p-3 text-center transition-all duration-300 ${
                        active
                          ? 'scale-105 border-[#0071E3]/40 bg-white shadow-[0_18px_40px_rgba(0,113,227,0.16)]'
                          : 'border-black/5 bg-white/80 shadow-sm hover:-translate-y-0.5 hover:bg-white'
                      }`}
                    >
                      <div
                        className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          active ? 'bg-[#EAF3FF] text-[#0071E3]' : 'bg-[#F5F5F7] text-[#6E6E73]'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.13em] text-[#1D1D1F]">
                        {node.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.map((node) => {
                  const active = activeNodes.includes(node.id);
                  return (
                    <button
                      key={node.id}
                      onClick={() => toggleNode(node.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active ? 'border-[#0071E3]/30 bg-[#EAF3FF]' : 'border-black/5 bg-white hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {active && <CheckCircle2 className="h-4 w-4 text-[#0071E3]" />}
                        <h4 className="text-sm font-semibold tracking-[-0.02em]">{node.title}</h4>
                      </div>
                      <p className="text-xs leading-relaxed text-[#6E6E73]">{active ? node.detail : node.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full rounded-[2.2rem] bg-white/85 border border-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.08)] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-black/5">
                <div className="p-2.5 rounded-2xl bg-[#EAF3FF] text-[#0071E3]">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.035em] text-[#1D1D1F]">
                    AutoRec recommendation simulator
                  </h3>
                  <p className="text-sm text-[#6E6E73]">
                    Adjust symptoms, location, and context to see provider ranking change.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5" id="autorec-controls">
                <ControlGroup
                  label="Patient symptom"
                  options={[
                    { id: 'rash', label: 'Skin rash' },
                    { id: 'cough', label: 'Persistent cough' },
                    { id: 'fever', label: 'High fever' },
                  ]}
                  value={selectedSymptom}
                  onChange={(value) => setSelectedSymptom(value as SymptomId)}
                />

                <ControlGroup
                  label="Location"
                  options={[
                    { id: 'cairo', label: 'Cairo' },
                    { id: 'alex', label: 'Alexandria' },
                    { id: 'giza', label: 'Giza' },
                  ]}
                  value={selectedLocation}
                  onChange={(value) => setSelectedLocation(value as LocationId)}
                  withIcon
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <ToggleCard
                  title="Care affinity"
                  subtitle="Prefer doctors with prior context"
                  active={hasHistory}
                  onClick={() => setHasHistory((value) => !value)}
                />
                <ToggleCard
                  title="Available today"
                  subtitle="Weight doctors with near-term slots"
                  active={availableToday}
                  onClick={() => setAvailableToday((value) => !value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#86868B] font-bold uppercase tracking-[0.2em]">
                    Ranked recommendations
                  </span>
                  <span className="text-xs text-[#86868B]">Live scoring</span>
                </div>

                {scoredDoctors.map((doc, idx) => {
                  const strong = doc.score >= 86;
                  return (
                    <motion.div
                      key={doc.name}
                      layout
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      className={`rounded-2xl border p-4 transition-colors ${
                        strong ? 'border-emerald-500/20 bg-emerald-50' : 'border-black/5 bg-[#FBFBFD]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D1D1F] text-white text-[11px] font-mono">
                              {idx + 1}
                            </span>
                            <h4 className="text-sm font-semibold tracking-[-0.015em]">{doc.name}</h4>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6E6E73]">
                            <span>{doc.specialty}</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {doc.rating}
                            </span>
                            <span className="capitalize">{doc.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-[9px] font-mono uppercase text-[#86868B] font-bold">Match</span>
                          <span className={`text-lg font-mono font-bold ${strong ? 'text-emerald-600' : 'text-[#0071E3]'}`}>
                            {doc.score}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-amber-500/15 bg-amber-50 px-4 py-3 text-[11px] leading-relaxed text-amber-700">
                <strong>AutoRec:</strong> symptom features, location, availability, rating, and care history are combined into a relevance score, then ranked for the patient.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({
  label,
  options,
  value,
  onChange,
  withIcon = false,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  withIcon?: boolean;
}) {
  return (
    <div>
      <span className="text-[10px] font-mono text-[#86868B] font-bold uppercase tracking-[0.18em] block mb-2">
        {label}
      </span>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
              value === option.id
                ? 'border-[#0071E3]/40 bg-[#EAF3FF] text-[#1D1D1F]'
                : 'border-black/5 bg-[#FBFBFD] text-[#6E6E73] hover:bg-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {withIcon && <MapPin className="w-3.5 h-3.5 opacity-60" />}
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleCard({
  title,
  subtitle,
  active,
  onClick,
}: {
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-all ${
        active ? 'border-[#0071E3]/30 bg-[#EAF3FF]' : 'border-black/5 bg-[#FBFBFD] hover:bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="text-sm font-semibold tracking-[-0.02em]">{title}</span>
        <span className={`relative h-5 w-9 rounded-full transition-colors ${active ? 'bg-[#0071E3]' : 'bg-[#D1D1D6]'}`}>
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </span>
      </div>
      <p className="text-xs text-[#6E6E73] leading-relaxed">{subtitle}</p>
    </button>
  );
}
