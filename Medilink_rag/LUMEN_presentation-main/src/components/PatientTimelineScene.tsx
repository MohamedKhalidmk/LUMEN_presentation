import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Scan, Calendar, ClipboardCheck, Pill, ArrowRight, UserCheck, Shield, Clock, HelpCircle, Activity
} from 'lucide-react';

export default function PatientTimelineScene() {
  const [selectedEventId, setSelectedEventId] = useState<string>('symptoms');

  const timelineEvents = [
    {
      id: 'symptoms',
      title: 'Symptoms Logged',
      time: 'Day 01 • 14:22',
      icon: FileText,
      badge: 'INITIATION',
      color: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
      accentColor: '#3b82f6',
      shortText: 'Patient records irregular persistent lesion in Arabic.',
      longText: 'Patient describes a flat, dark red lesion on the upper left arm that has changed slightly in size over 4 weeks. Logged via voice input in Egyptian colloquial Arabic. System processes text and creates structured primary dossier notes.',
      metadata: [
        { label: 'Origin', value: 'Medi AI Chat Portal' },
        { label: 'Primary Class', value: 'Dermatology / Epidermal' },
        { label: 'Symptom Duration', value: '28-32 Days' }
      ]
    },
    {
      id: 'scan',
      title: 'Macro Image Scan',
      time: 'Day 01 • 14:25',
      icon: Scan,
      badge: 'VISION METRIC',
      color: 'border-purple-500/20 text-purple-400 bg-purple-500/5',
      accentColor: '#a855f7',
      shortText: 'Image uploaded. Anomaly border isolated by HTAN.',
      longText: 'Macro photo of the arm lesion uploaded. The HTAN computer vision segmentation model executes instantly. Outlines anomalous margin limits with 90.32% Dice metric accuracy. Tracing is registered purely as physician context.',
      metadata: [
        { label: 'Segmentation Score', value: '90.32% Dice Coefficient' },
        { label: 'TTA Averaging', value: 'Enabled (5-way crop)' },
        { label: 'Output Type', value: 'High-Fidelity Binary Boundary Mask' }
      ]
    },
    {
      id: 'appointment',
      title: 'Specialist Booking',
      time: 'Day 02 • 09:00',
      icon: Calendar,
      badge: 'COORDINATION',
      color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
      accentColor: '#10b981',
      shortText: 'Specialist matched via AutoRec; appointment booked.',
      longText: 'AutoRec scans dermatologist availability, geolocation proximity, and patient preference. Appointment scheduled with Dr. Yousry Mansour at Cairo Dermatology Clinic. Structured medical dossier transmitted securely.',
      metadata: [
        { label: 'Provider Matching', value: 'AutoRec System (Score: 92%)' },
        { label: 'Facility', value: 'Cairo Specialist Clinics' },
        { label: 'Dossier Transfer', value: 'Encrypted HL7 FHIR Protocol' }
      ]
    },
    {
      id: 'report',
      title: 'Clinical Assessment',
      time: 'Day 05 • 11:30',
      icon: ClipboardCheck,
      badge: 'VERIFICATION',
      color: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
      accentColor: '#f59e0b',
      shortText: 'Consultation completed. Case details confirmed.',
      longText: 'Dr. Yousry reviews the pre-populated MediLink case files. Validates the HTAN segmentation boundaries directly on his terminal. Confirms benign local inflammation with mild atypical melanocytic proliferation.',
      metadata: [
        { label: 'Consulting Physician', value: 'Dr. Yousry Mansour (Derm. MD)' },
        { label: 'Diagnosis Class', value: 'Benign Melanocytic Proliferation' },
        { label: 'Physician Validation', value: 'Confirmed & Digitally Signed' }
      ]
    },
    {
      id: 'prescription',
      title: 'E-Prescription & Follow-up',
      time: 'Day 05 • 11:45',
      icon: Pill,
      badge: 'FULFILLMENT',
      color: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
      accentColor: '#0ea5e9',
      shortText: 'Prescription generated and 30-day review set.',
      longText: 'Digital prescription for topical cream transmitted to partner pharmacy node automatically. Standard 30-day follow-up checkpoint created in the patient app to track resolution progress.',
      metadata: [
        { label: 'Prescribed Medication', value: 'Mometasone Furoate 0.1% Cream' },
        { label: 'Pharmacy Delivery', value: 'Automated Hub Delivery (Cairo Central)' },
        { label: 'Next Checkpoint', value: '30-Day Auto Reminder' }
      ]
    }
  ];

  const currentEvent = timelineEvents.find(e => e.id === selectedEventId) || timelineEvents[0];

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center py-32 px-6 md:px-12 select-none border-b border-white/5" id="patient-timeline-root">
      {/* Dynamic ambient lights */}
      <div className="absolute right-[10%] bottom-1/3 w-[450px] h-[300px] bg-purple-500/[0.015] rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Apple slide header */}
        <div className="text-left mb-20 max-w-3xl">
          <span className="text-[10px] font-mono text-neutral-400 tracking-[0.25em] uppercase font-bold block mb-3">PATIENT CASE CHRONICLE</span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-[#F5F5F7] tracking-tight leading-[1.1] mb-6">
            One record, one journey. <br />
            <span className="text-neutral-500">Every interaction becomes context.</span>
          </h2>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-tight">
            Organizing symptoms, image scans, and specialist assessments into a single record.
          </p>
        </div>

        {/* Dynamic Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Sleek Vertical Timeline Axis */}
          <div className="lg:col-span-6 space-y-4 text-left relative">
            {/* Timeline center line */}
            <div className="absolute left-7 top-6 bottom-6 w-[1.5px] bg-[#1a1c22]" />

            {timelineEvents.map((evt) => {
              const isSelected = selectedEventId === evt.id;
              const EvtIcon = evt.icon;

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`flex items-start gap-5 p-4 rounded-2xl cursor-pointer border transition-all duration-300 relative z-10 ${
                    isSelected
                      ? 'bg-[#111216] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-[1.01]'
                      : 'bg-transparent border-transparent hover:bg-neutral-900/30'
                  }`}
                  id={`timeline-event-${evt.id}`}
                >
                  {/* Left Timeline Dot with Icon */}
                  <div 
                    className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <EvtIcon className="w-3.5 h-3.5" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-wider">{evt.time}</span>
                      <span className={`text-[8.5px] font-mono border px-2 py-0.5 rounded font-bold uppercase tracking-wide shrink-0 ${evt.color}`}>
                        {evt.badge}
                      </span>
                    </div>
                    
                    <h3 className={`text-sm font-semibold transition-colors ${isSelected ? 'text-[#F5F5F7]' : 'text-neutral-400'}`}>
                      {evt.title}
                    </h3>
                    
                    <p className={`text-xs mt-1.5 font-sans leading-relaxed ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {evt.shortText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Block: Structured Case Record Dossier Sheet */}
          <div className="lg:col-span-6">
            <div className="bg-[#08090c] border border-white/[0.04] rounded-3xl p-6 shadow-xl text-left">
              
              {/* Card Title Header representing the Active Medical dossier */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4.5 h-4.5 text-[#0071E3]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                    SECURE MEDILINK CASE DOSSIER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 font-bold uppercase">
                  <Clock className="w-3 h-3 text-neutral-600" />
                  <span>REF-2026.06</span>
                </div>
              </div>

              {/* Patient Basic Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-900/30 border border-white/5 rounded-2xl mb-6">
                <div>
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase block">SUBJECT ID</span>
                  <span className="text-xs font-semibold text-neutral-200">MK-9907-EGYPT</span>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase block">DATA STATUS</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                    COORDINATED
                  </span>
                </div>
              </div>

              {/* Event detail animation container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedEventId}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Detailed Description */}
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-2">Event Comprehensive Transcript</span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed bg-[#111216] border border-white/5 p-4 rounded-xl">
                      {currentEvent.longText}
                    </p>
                  </div>

                  {/* Metadata key/value details list */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-2">Technical Registry Details</span>
                    <div className="border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden">
                      {currentEvent.metadata.map((meta, i) => (
                        <div key={i} className="flex justify-between items-center p-3 text-xs bg-neutral-950/20">
                          <span className="text-neutral-500 font-mono text-[10px]">{meta.label}</span>
                          <span className="text-neutral-300 font-sans font-medium text-right">{meta.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Stack compilation prompt bar */}
              <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                <span className="text-neutral-500">5/5 EVENTS LINKED</span>
                <span className="text-[#0071E3] font-bold flex items-center gap-1 cursor-pointer hover:text-sky-300 transition-colors">
                  VIEW FULL FILE
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
