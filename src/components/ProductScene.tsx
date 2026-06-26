import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Calendar, ClipboardCheck, Pill, StickyNote, 
  RefreshCw, Shield, Lock, ArrowRight, CheckCircle
} from 'lucide-react';

type RecordId = 'symptoms' | 'appointments' | 'reports' | 'prescriptions' | 'notes' | 'followups';

export default function ProductScene() {
  const [selectedRecordId, setSelectedRecordId] = useState<RecordId>('symptoms');

  const records = [
    {
      id: 'symptoms' as const,
      icon: FileText,
      title: 'Symptoms Logged',
      time: 'Day 01 • 14:20',
      badge: 'INTAKE ASSESS',
      badgeColor: 'text-blue-600 bg-blue-50 border-blue-100',
      shortText: 'Patient records lower back fatigue and dull local discomfort.',
      longText: 'Patient describes acute stiffness and a continuous dull ache in the lumbar area following light physical strain. Captured via simple text input. Translated into clinical metadata descriptors to prepare for physician review.',
      metadata: [
        { label: 'Origin Channel', value: 'Medi AI Chat Portal' },
        { label: 'Indication Class', value: 'Musculoskeletal / Lumbar' },
        { label: 'Onset Duration', value: '24-36 Hours' }
      ]
    },
    {
      id: 'appointments' as const,
      icon: Calendar,
      title: 'Specialist Booking',
      time: 'Day 01 • 14:45',
      badge: 'COORDINATION',
      badgeColor: 'text-purple-600 bg-purple-50 border-purple-100',
      shortText: 'Appointment scheduled with top-rated local Orthopedist.',
      longText: 'AutoRec matching algorithm scanned proximity, specialty, and provider ratings. Appointment booked with Dr. Yousry Mansour at Cairo Specialty Clinics. Complete pre-consultation case file securely transmitted to the clinic.',
      metadata: [
        { label: 'Provider Match', value: 'Dr. Yousry Mansour (MD)' },
        { label: 'Facility', value: 'Cairo Specialty Clinics' },
        { label: 'Dossier State', value: 'Transmitted (HL7 Encrypted)' }
      ]
    },
    {
      id: 'reports' as const,
      icon: ClipboardCheck,
      title: 'Diagnostic Reports',
      time: 'Day 03 • 10:15',
      badge: 'CLINICAL LABS',
      badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      shortText: 'Laboratory and diagnostic reports compiled.',
      longText: 'Clinical diagnostic records and local assessment files consolidated. Patient lumbar mobility range and regional bone alignment profiles are checked, registered, and appended to the patient’s unified master dossier.',
      metadata: [
        { label: 'Registry Type', value: 'Clinical Mobility Report' },
        { label: 'Lab Origin', value: 'Cairo Central Diagnostic Hub' },
        { label: 'File Hash', value: 'SHA256: 8a3f9d8c...' }
      ]
    },
    {
      id: 'prescriptions' as const,
      icon: Pill,
      title: 'Active Prescriptions',
      time: 'Day 03 • 11:30',
      badge: 'FULFILLMENT',
      badgeColor: 'text-amber-600 bg-amber-50 border-amber-100',
      shortText: 'E-Prescription transmitted to partner pharmacy.',
      longText: 'Approved prescription for localized anti-inflammatory therapeutic gel transmitted directly to the partner pharmacy node. Dispensing and dosage verification registered under patient ID.',
      metadata: [
        { label: 'Prescription Item', value: 'Diclofenac 1% Topical Gel' },
        { label: 'Dispenser Node', value: 'Cairo Central Pharmacy' },
        { label: 'Fulfillment State', value: 'Ready for Collection' }
      ]
    },
    {
      id: 'notes' as const,
      icon: StickyNote,
      title: 'Doctor Progress Notes',
      time: 'Day 03 • 11:45',
      badge: 'PHYSICIAN DATA',
      badgeColor: 'text-sky-600 bg-sky-50 border-sky-100',
      shortText: 'Dr. Yousry’s clinical feedback registered.',
      longText: 'Physician verifies localized muscular strain. Confirms mild lower back inflammation without signs of skeletal alignment deviation. Recommends simple localized therapy and rest, and signs off on the clinical case dossier.',
      metadata: [
        { label: 'Signing Physician', value: 'Dr. Yousry Mansour' },
        { label: 'Clinical Finding', value: 'Acute Muscular Strain' },
        { label: 'Signature Lock', value: 'Verified Digital Sign-Off' }
      ]
    },
    {
      id: 'followups' as const,
      icon: RefreshCw,
      title: 'Care Follow-Ups',
      time: 'Day 10 • 09:00',
      badge: 'MONITORING',
      badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      shortText: 'Automated 7-day care recovery check triggered.',
      longText: 'Care coordination loop triggers a standard recovery check-in. System prompts patient to verify symptom resolution progress and logs localized physical feedback directly back into the secure dossier timeline.',
      metadata: [
        { label: 'Trigger Type', value: 'Coordinated Care Interval' },
        { label: 'Interval Step', value: '7-Day Post Consultation' },
        { label: 'Recovery Status', value: 'Resolving (Patient logged)' }
      ]
    }
  ];

  const currentRecord = records.find(r => r.id === selectedRecordId) || records[0];

  const scrollToNextSection = () => {
    const el = document.getElementById('chat-reveal-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 select-none overflow-hidden border-b border-neutral-200" id="patient-timeline-root">
      
      {/* Soft gradient spotlights */}
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[350px] bg-gradient-radial from-blue-100/35 to-transparent rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[300px] bg-gradient-radial from-purple-100/25 to-transparent rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="text-[10px] font-mono text-neutral-500 tracking-[0.25em] uppercase font-bold block mb-3">
            MEDICAL RECORDS DOSSIER
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.1] mb-6">
            One record, one journey. <br />
            <span className="text-neutral-500 font-light">Every interaction becomes context.</span>
          </h2>
          <p className="text-xs font-mono text-[#86868B] uppercase tracking-tight">
            Unifying symptoms, appointments, diagnostics, and prescriptions in a single secure timeline.
          </p>
        </div>

        {/* Dynamic Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Sleek vertical clinical timeline */}
          <div className="lg:col-span-6 space-y-4 text-left relative">
            {/* Vertical timeline rail */}
            <div className="absolute left-7 top-6 bottom-6 w-[1.5px] bg-neutral-200" />

            {records.map((rec) => {
              const isSelected = selectedRecordId === rec.id;
              const RecordIcon = rec.icon;

              return (
                <button
                  key={rec.id}
                  onClick={() => setSelectedRecordId(rec.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl cursor-pointer border transition-all duration-300 relative z-10 text-left ${
                    isSelected
                      ? 'bg-white border-neutral-300 shadow-[0_12px_32px_rgba(0,0,0,0.06)] scale-[1.01]'
                      : 'bg-transparent border-transparent hover:bg-neutral-200/50'
                  }`}
                  id={`record-item-${rec.id}`}
                >
                  {/* Left Timeline dot containing custom icon */}
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#0071E3] text-white shadow-md' 
                        : 'bg-white border border-neutral-200 text-neutral-400 shadow-2xs'
                    }`}
                  >
                    <RecordIcon className="w-3.5 h-3.5" />
                  </div>

                  {/* Text labels */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">{rec.time}</span>
                      <span className={`text-[8.5px] font-mono border px-2 py-0.5 rounded-md font-bold uppercase tracking-wide shrink-0 ${rec.badgeColor}`}>
                        {rec.badge}
                      </span>
                    </div>
                    
                    <h3 className={`text-xs sm:text-sm font-semibold transition-colors ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {rec.title}
                    </h3>
                    
                    <p className={`text-xs mt-1 font-sans leading-relaxed ${isSelected ? 'text-[#424245]' : 'text-neutral-400'}`}>
                      {rec.shortText}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Secure Dossier File / Sheet viewer */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xl text-left relative overflow-hidden transition-all duration-300">
              
              {/* Folder header representing official case record */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0071E3]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700">
                    SECURE CLINICAL CASE DOSSIER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 font-bold uppercase">
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>REF-2026.06</span>
                </div>
              </div>

              {/* Patient Basic Profile bar */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 border border-neutral-200/60 rounded-2xl mb-6">
                <div>
                  <span className="text-[8.5px] font-mono text-neutral-400 font-bold uppercase block">SUBJECT RECORD ID</span>
                  <span className="text-xs font-semibold text-neutral-800">MK-9907-EGYPT</span>
                </div>
                <div>
                  <span className="text-[8.5px] font-mono text-neutral-400 font-bold uppercase block">COORDINATION STATE</span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    UNIFIED PROFILE
                  </span>
                </div>
              </div>

              {/* Event detail animations */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRecordId}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Detailed Description */}
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider block mb-1.5">Case Document Transcript</span>
                    <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 border border-neutral-200/60 p-4 rounded-xl font-sans">
                      {currentRecord.longText}
                    </p>
                  </div>

                  {/* Metadata key/value details */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">Registry Metadata Details</span>
                    <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-200 overflow-hidden">
                      {currentRecord.metadata.map((meta, i) => (
                        <div key={i} className="flex justify-between items-center p-3 text-xs bg-white hover:bg-neutral-50/40 transition-colors">
                          <span className="text-neutral-400 font-mono text-[9.5px]">{meta.label}</span>
                          <span className="text-neutral-800 font-sans font-semibold text-right">{meta.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Stack completion check-off footer */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono text-[#6E6E73] uppercase">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  6/6 CARDS COHESIVE
                </span>
                <button 
                  onClick={scrollToNextSection}
                  className="text-[#0071E3] font-bold flex items-center gap-1 cursor-pointer hover:text-[#147CE5] transition-colors border-none bg-transparent uppercase text-[10px] font-mono font-bold"
                >
                  Unlock AI Chat
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
