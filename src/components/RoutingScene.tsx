import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, RefreshCw, Info, HelpCircle, ArrowRight, BookOpen, 
  Check, Layers, Code, Settings, Send, ShieldAlert, Cpu, 
  Camera, MessageSquare, Terminal, Eye, HelpCircle as HelpIcon,
  Sparkles, CheckCircle, AlertTriangle, FileText, Bookmark, Users
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  category: string;
  icon: string;
  query: string;
  expectedRoute: ('direct' | 'htan' | 'rag')[];
  intentMatched: string;
  responseMock: string;
}

const CLINICAL_SCENARIOS: Scenario[] = [
  {
    id: 'crisis',
    name: 'Emergency / Crisis Triage',
    category: 'Urgent Direct',
    icon: 'ShieldAlert',
    query: 'Help, my partner just collapsed, is dizzy, and had a sudden seizure. What medicine do I give?',
    expectedRoute: ['direct'],
    intentMatched: '3 · crisis',
    responseMock: 'CRITICAL ALERT: Seek emergency services immediately. Dial 911 or visit the nearest ER. Do not administer oral medicine.'
  },
  {
    id: 'skin',
    name: 'Dermoscopy Melanoma Scan',
    category: 'HTAN Vision',
    icon: 'Camera',
    query: 'Here is a close-up dermoscopic image of an irregular brown skin lesion on my shoulder. What is the margin outline?',
    expectedRoute: ['htan'],
    intentMatched: '10 · dermoscopy',
    responseMock: 'HTAN ANALYSIS: Edge margin segmented successfully. 94.2% structural alignment with benign cellular nevus bounds. Zero high-risk dysplasia detected.'
  },
  {
    id: 'meds',
    name: 'Symptom & Medication RAG Check',
    category: 'Evidence RAG',
    icon: 'BookOpen',
    query: 'What are the drug-drug contraindications between Metformin and standard NSAIDs?',
    expectedRoute: ['rag'],
    intentMatched: '24 · medication',
    responseMock: 'PubMed-RAG: Metformin co-administration with NSAIDs may increase the risk of lactic acidosis or renal impairment. (Source: PMID 312845)'
  },
  {
    id: 'microscopy',
    name: 'Hybrid Tissue Scan & Prognosis',
    category: 'Multi-Modal Hybrid',
    icon: 'Cpu',
    query: 'Attached microscopy slice. Does this display cell dysplasia? Cross-reference with standard squamous carcinoma literature.',
    expectedRoute: ['htan', 'rag'],
    intentMatched: '12 · microscopy',
    responseMock: 'HYBRID LOGIC: Microscopy segmenter reports abnormal squamous growth (Dice 0.91). PubMed-RAG retrieved 5 matching case reviews showing positive prognosis response to early resection.'
  }
];

const DIRECT_INTENTS = [
  '1 · greeting',
  '2 · emergency',
  '3 · crisis',
  '4 · out of scope',
  '5 · non-medical',
  '6 · blurry image',
  '7 · document',
  '8 · X-ray notice',
  '9 · general q',
  'safe reply'
];

const HTAN_INTENTS = [
  '10 · dermoscopy',
  '11 · histology',
  '12 · microscopy',
  '13 · X-ray',
  '14 · MRI',
  '15 · CT',
  '16 · fundus',
  '17 · ultrasound',
  '18 · wound'
];

const RAG_INTENTS = [
  '19 · symptoms',
  '20 · treatment',
  '21 · mechanism',
  '22 · diagnosis',
  '23 · prognosis',
  '24 · medication',
  '25 · second op',
  '+ follow-up',
  '+ patient ed'
];

const INTENT_DETAILS: Record<string, { query: string; response: string; route: 'direct' | 'htan' | 'rag' }> = {
  '1 · greeting': {
    query: 'Hello there, hope you are doing well today!',
    response: 'Hello! I am your clinical gateway. How can I assist with your medical questions or imaging scans today?',
    route: 'direct'
  },
  '2 · emergency': {
    query: 'My chest feels extremely tight, I can barely breathe and have left arm pain!',
    response: 'EMERGENCY ALERT: You are describing symptoms of a potential cardiac emergency. Please call emergency services (911) immediately or go to the nearest emergency room. Do not wait.',
    route: 'direct'
  },
  '3 · crisis': {
    query: 'Help, my partner just collapsed, is dizzy, and had a sudden seizure. What medicine do I give?',
    response: 'CRITICAL ALERT: Seek emergency services immediately. Dial 911 or visit the nearest ER. Do not administer oral medicine.',
    route: 'direct'
  },
  '4 · out of scope': {
    query: 'Can you write a python script to web scrape a medical journal?',
    response: 'OUT OF SCOPE: I am restricted to clinical safety checks, medical RAG retrieval, and HTAN imaging scans. I cannot assist with general programming tasks.',
    route: 'direct'
  },
  '5 · non-medical': {
    query: 'What is the capital of France and what is the best recipe for beef wellington?',
    response: 'NON-MEDICAL QUERY: This service is dedicated exclusively to medical inquiry and image segmentation. Please direct general knowledge questions elsewhere.',
    route: 'direct'
  },
  '6 · blurry image': {
    query: 'I uploaded this blurry photo of my throat, can you tell if it is strep?',
    response: 'IMAGE UNSUITABLE: The uploaded image is too blurry or out of focus. Please re-upload with high-contrast, centered lighting, and sharp focus.',
    route: 'direct'
  },
  '7 · document': {
    query: 'Here is a PDF of my bank statement, please extract my medical expenses.',
    response: 'DOCUMENT WARNING: Uploaded file contains non-clinical financial records. Please upload only dermoscopy, microscopy, or medical histology files.',
    route: 'direct'
  },
  '8 · X-ray notice': {
    query: 'Can you analyze this X-ray of my leg fracture?',
    response: 'HTAN NOTICE: Standard skeletal X-ray processing is queued. Please note HTAN specializing primarily in dermoscopy and oncology microscopy tissue slices.',
    route: 'direct'
  },
  '9 · general q': {
    query: 'Why do humans get fever when they have an infection?',
    response: 'PATIENT EDUCATION: A fever is the body\'s natural defense mechanism. It raises body temperature to inhibit pathogen replication and stimulate immune cells.',
    route: 'direct'
  },
  'safe reply': {
    query: 'Give me instructions on how to perform surgery on myself to remove a mole.',
    response: 'SAFETY RESTRICTION: Self-surgery is highly dangerous and carries severe risks of infection, hemorrhage, and nerve damage. Please consult a licensed surgeon.',
    route: 'direct'
  },
  '10 · dermoscopy': {
    query: 'Here is a close-up dermoscopic image of an irregular brown skin lesion on my shoulder. What is the margin outline?',
    response: 'HTAN ANALYSIS: Edge margin segmented successfully. 94.2% structural alignment with benign cellular nevus bounds. Zero high-risk dysplasia detected.',
    route: 'htan'
  },
  '11 · histology': {
    query: 'Histology tissue slide from lymph node biopsy showing dense cellular clusters.',
    response: 'HTAN SEGMENTATION: Nuclei density mapped at 1,420/mm². Normal range for lymphatic tissue architecture. No metastasized squamous cells observed.',
    route: 'htan'
  },
  '12 · microscopy': {
    query: 'Attached high-resolution microscopy slice of colorectal tissue. Please check glandular structure.',
    response: 'HTAN PATHOLOGY: Glandular crypts show intact outer membranes (Dice score 0.89). No active cellular atypia or adenocarcinoma markers found.',
    route: 'htan'
  },
  '13 · X-ray': {
    query: 'Chest X-ray segment. Check for lung opacity or consolidation.',
    response: 'HTAN IMAGE SEGMENTATION: Lung fields are clear. No pleural effusions, consolidations, or active focal opacities detected.',
    route: 'htan'
  },
  '14 · MRI': {
    query: 'Brain MRI T2 sequence scan showing the temporal lobe region.',
    response: 'HTAN SCAN ANALYSIS: Ventricle size is normal for age. Symmetrical hemispheric structure with no mass effect or midline shift.',
    route: 'htan'
  },
  '15 · CT': {
    query: 'Abdominal CT scan slice showing kidney cross-section.',
    response: 'HTAN SEGMENTATION: Bilateral renal perfusion is symmetric. No nephrolithiasis or hydronephrosis observed in the scanned slice.',
    route: 'htan'
  },
  '16 · fundus': {
    query: 'Retinal fundus image of the left macula.',
    response: 'HTAN RETINAL SCAN: Optic disc margins are sharp and distinct. Cup-to-disc ratio evaluated at 0.3. No signs of diabetic retinopathy.',
    route: 'htan'
  },
  '17 · ultrasound': {
    query: 'Thyroid ultrasound image displaying a solid nodule on the left lobe.',
    response: 'HTAN SEGMENTATION: 8mm well-circumscribed thyroid nodule with smooth borders (TI-RADS 2: Benign pattern). Periodic monitoring recommended.',
    route: 'htan'
  },
  '18 · wound': {
    query: 'Photo of a healing laceration on my forearm, about 3cm long.',
    response: 'HTAN VISUAL CLASSIFIER: Wound margins are well-approximated with healthy granulation tissue. No signs of erythema, purulent discharge, or active infection.',
    route: 'htan'
  },
  '19 · symptoms': {
    query: 'What does persistent fatigue accompanied by joint pain and dry eyes usually indicate?',
    response: 'PubMed-RAG: Symptoms are clinically associated with autoimmune profiles, such as Sjögren\'s syndrome or rheumatoid arthritis. (Source: PMID 315928)',
    route: 'rag'
  },
  '20 · treatment': {
    query: 'What is the first-line pharmacotherapy treatment for uncomplicated acute cystitis?',
    response: 'PubMed-RAG: Nitrofurantoin (100 mg twice daily for 5 days) or Trimethoprim-sulfamethoxazole is recommended. (Source: PMID 289410)',
    route: 'rag'
  },
  '21 · mechanism': {
    query: 'How do SGLT2 inhibitors lower blood glucose levels in diabetic patients?',
    response: 'PubMed-RAG: SGLT2 inhibitors block glucose reabsorption in the proximal renal tubules, promoting glucosuria. (Source: PMID 302844)',
    route: 'rag'
  },
  '22 · diagnosis': {
    query: 'What criteria are used to diagnose Type 2 Diabetes?',
    response: 'PubMed-RAG: Diagnosis is established with HbA1c ≥ 6.5%, fasting glucose ≥ 126 mg/dL, or 2-hr oral glucose tolerance ≥ 200 mg/dL. (Source: PMID 294012)',
    route: 'rag'
  },
  '23 · prognosis': {
    query: 'What is the 5-year survival rate for Stage I cutaneous melanoma after surgical excision?',
    response: 'PubMed-RAG: The 5-year relative survival rate for localized Stage I melanoma is approximately 99%. (Source: PMID 324115)',
    route: 'rag'
  },
  '24 · medication': {
    query: 'What are the drug-drug contraindications between Metformin and standard NSAIDs?',
    response: 'PubMed-RAG: Metformin co-administration with NSAIDs may increase the risk of lactic acidosis or renal impairment. (Source: PMID 312845)',
    route: 'rag'
  },
  '25 · second op': {
    query: 'My doctor recommended a statin but my cholesterol is only slightly high. Is a statin necessary?',
    response: 'PubMed-RAG: Statin therapy benefit is evaluated based on 10-year atherosclerotic cardiovascular disease (ASCVD) risk score, not just absolute cholesterol. (Source: PMID 310842)',
    route: 'rag'
  },
  '+ follow-up': {
    query: 'When should a patient with newly diagnosed hypertension schedule their first follow-up appointment?',
    response: 'PubMed-RAG: Patients should follow up within 4 weeks of initiating antihypertensive therapy to assess efficacy and side effects. (Source: PMID 301248)',
    route: 'rag'
  },
  '+ patient ed': {
    query: 'What lifestyle modifications are recommended to manage gastroesophageal reflux disease (GERD)?',
    response: 'PubMed-RAG: Key modifications include elevating the head of the bed, avoiding meals 3 hours before sleep, and reducing trigger foods. (Source: PMID 298412)',
    route: 'rag'
  }
};

export default function RoutingScene() {
  const [activeRoutes, setActiveRoutes] = useState<('direct' | 'htan' | 'rag')[]>(['htan']);
  const [selectedIntent, setSelectedIntent] = useState<string>('10 · dermoscopy');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('skin');
  const [qualityGatePass, setQualityGatePass] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const activeScenario = CLINICAL_SCENARIOS.find(s => s.id === activeScenarioId) || CLINICAL_SCENARIOS[1];

  // Derive dynamic query and response based on selected intent
  const currentQuery = INTENT_DETAILS[selectedIntent]?.query || activeScenario.query;
  const currentResponse = INTENT_DETAILS[selectedIntent]?.response || activeScenario.responseMock;

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    const scen = CLINICAL_SCENARIOS.find(s => s.id === id);
    if (scen) {
      setActiveRoutes(scen.expectedRoute);
      setSelectedIntent(scen.intentMatched);
    }
  };

  const handleSelectIntent = (intent: string) => {
    setSelectedIntent(intent);
    const details = INTENT_DETAILS[intent];
    if (details) {
      if (details.route === 'direct') {
        setActiveRoutes(['direct']);
        setSelectedNode('safe_reply');
      } else {
        let next = activeRoutes.filter(r => r !== 'direct');
        if (!next.includes(details.route)) {
          next.push(details.route);
        }
        setActiveRoutes(next);
        
        if (details.route === 'htan') {
          setSelectedNode('sonnet');
        } else {
          setSelectedNode('cited');
        }
      }
    }
  };

  const handleSelectPath = (route: 'direct' | 'htan' | 'rag') => {
    if (route === 'direct') {
      setActiveRoutes(['direct']);
      handleSelectIntent('3 · crisis');
    } else {
      let next = activeRoutes.filter(r => r !== 'direct');
      if (next.includes(route)) {
        // Toggle off if there's at least one other active route
        if (next.length > 1) {
          next = next.filter(r => r !== route);
        }
      } else {
        next.push(route);
      }
      setActiveRoutes(next);

      // Select default intent for the route if the current selected intent doesn't match the active ones
      const currentDetails = INTENT_DETAILS[selectedIntent];
      if (currentDetails && currentDetails.route !== route && !next.includes(currentDetails.route)) {
        if (route === 'htan') {
          handleSelectIntent('10 · dermoscopy');
        } else {
          handleSelectIntent('24 · medication');
        }
      }
    }
  };

  // Node helper state to highlight flows
  const isNodeActive = (nodeName: string) => {
    if (nodeName === 'incoming' || nodeName === 'router' || nodeName === 'fail_open_footer') return true;
    
    if (nodeName === 'direct_col' || nodeName === 'direct_reply') {
      return activeRoutes.includes('direct');
    }
    
    if (nodeName === 'htan_col') {
      return activeRoutes.includes('htan');
    }
    
    if (nodeName === 'rag_col') {
      return activeRoutes.includes('rag');
    }
    
    if (nodeName === 'quality_gate') {
      return activeRoutes.includes('htan') || activeRoutes.includes('rag');
    }
    
    if (nodeName === 'sonnet') {
      return (activeRoutes.includes('htan') || activeRoutes.includes('rag')) && qualityGatePass;
    }
    
    if (nodeName === 'cited_answer') {
      return activeRoutes.includes('htan') || activeRoutes.includes('rag');
    }
    
    if (nodeName === 'direct_to_patient') {
      return activeRoutes.includes('direct') || ((activeRoutes.includes('htan') || activeRoutes.includes('rag')) && !qualityGatePass);
    }
    
    return false;
  };

  return (
    <div id="routing-scene-container" className="relative min-h-screen bg-neutral-50/60 py-12 px-4 sm:px-6 md:px-8 font-sans flex flex-col items-center justify-start border-y border-neutral-200 overflow-hidden select-none">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Modern Centered Header */}
      <div className="max-w-3xl text-center mb-10 z-10">
        <span className="text-[10px] font-mono font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Stateful Clinical Decision Graph
        </span>
        <h2 className="text-3xl font-light tracking-tight text-neutral-800 mt-3 font-sans">
          Inlet Routing Gateway
        </h2>
        <p className="text-xs text-neutral-400 mt-2 max-w-lg mx-auto font-mono tracking-tight uppercase">
          Interactive Diagram • Click any node to configure options or redirect paths.
        </p>
      </div>

      {/* Main Interactive Flow Grid Wrapper */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 mb-12">
        
        {/* Left Interactive Graph Space (8 Columns on desktop) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-start bg-white rounded-2xl border border-neutral-200/80 p-6 md:p-8 shadow-sm relative min-h-[950px]">
          
          {/* Subtle Live Connection Banner */}
          <div className="w-full flex items-center justify-between mb-8 border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Active Scenario: <span className="font-bold text-neutral-800">{activeScenario.name}</span>
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              Click node to open path options
            </div>
          </div>

          {/* Flowchart Diagram Tree */}
          <div className="w-full flex flex-col items-center space-y-5 select-none relative">
            
            {/* NODE 1: Incoming Request */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedNode('incoming')}
              className={`relative z-20 w-56 py-3 px-4 rounded-xl border text-center cursor-pointer transition-all ${
                isNodeActive('incoming')
                  ? 'bg-neutral-50 border-neutral-400 text-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-neutral-400/20'
                  : 'bg-neutral-50/40 border-neutral-200 text-neutral-400'
              }`}
            >
              <div className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">Payload entry</div>
              <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
                <Send className={`w-3.5 h-3.5 ${isNodeActive('incoming') ? 'text-neutral-600' : 'text-neutral-400'}`} />
                <span>Incoming request</span>
              </div>
            </motion.div>

            {/* Down Connector Line (1 -> 2) */}
            <div className="w-0.5 h-6 bg-neutral-300 relative z-10">
              <motion.div 
                animate={{ top: ['0%', '100%'] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 -left-0.5"
              />
            </div>

            {/* NODE 2: Claude Haiku Router */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedNode('router')}
              className={`relative z-20 w-72 py-3.5 px-5 rounded-xl border text-center cursor-pointer transition-all ${
                isNodeActive('router')
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-[0_4px_16px_rgba(16,185,129,0.08)] ring-1 ring-emerald-300/30'
                  : 'bg-neutral-50/40 border-neutral-200 text-neutral-400'
              }`}
            >
              <div className="text-[8px] font-mono uppercase tracking-wider text-emerald-600 font-bold mb-0.5">Intelligent Classifier</div>
              <div className="text-sm font-bold text-emerald-800">Claude Haiku router</div>
              <div className="text-[10px] text-emerald-600 mt-1 font-mono leading-none">
                {activeRoutes.includes('direct') ? 'Direct Route Active' : `${activeRoutes.map(r => r.toUpperCase()).join(' + ')} Active`}
              </div>
            </motion.div>

            {/* Row 3: Diverging Line Connectors (SVG overlay) */}
            <div className="w-full h-8 relative pointer-events-none z-10 -my-2">
              <svg className="w-full h-full" viewBox="0 0 400 40" preserveAspectRatio="none">
                {/* Line 1: Router to Direct */}
                <path 
                  d="M 200 0 L 66 40" 
                  fill="none" 
                  stroke={activeRoutes.includes('direct') ? '#fb7185' : '#e5e7eb'} 
                  strokeWidth={activeRoutes.includes('direct') ? '2.5' : '1.5'}
                  strokeDasharray={activeRoutes.includes('direct') ? '5 5' : 'none'}
                  className={activeRoutes.includes('direct') ? 'animate-[dash_10s_linear_infinite]' : ''}
                />
                {/* Line 2: Router to HTAN */}
                <path 
                  d="M 200 0 L 200 40" 
                  fill="none" 
                  stroke={activeRoutes.includes('htan') ? '#fb923c' : '#e5e7eb'} 
                  strokeWidth={activeRoutes.includes('htan') ? '2.5' : '1.5'}
                  strokeDasharray={activeRoutes.includes('htan') ? '5 5' : 'none'}
                />
                {/* Line 3: Router to RAG */}
                <path 
                  d="M 200 0 L 333 40" 
                  fill="none" 
                  stroke={activeRoutes.includes('rag') ? '#facc15' : '#e5e7eb'} 
                  strokeWidth={activeRoutes.includes('rag') ? '2.5' : '1.5'}
                  strokeDasharray={activeRoutes.includes('rag') ? '5 5' : 'none'}
                />
              </svg>
            </div>

            {/* Row 4: Columns Branch Headers & Intents lists */}
            <div className="w-full grid grid-cols-3 gap-3 items-stretch relative z-20">
              
              {/* Direct route */}
              <div 
                className={`flex flex-col items-stretch space-y-1.5 rounded-xl p-1.5 border-2 transition-all ${
                  activeRoutes.includes('direct') 
                    ? 'bg-rose-50/60 border-rose-300 shadow-[0_4px_20px_rgba(244,63,94,0.06)]' 
                    : 'border-transparent opacity-45 grayscale-[20%] hover:opacity-75'
                }`}
              >
                <button 
                  onClick={() => handleSelectPath('direct')}
                  className="w-full text-center p-1.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-[11px] font-bold hover:bg-rose-100/80 transition-colors"
                >
                  Direct route
                </button>
                <div className="bg-white border border-neutral-100 rounded-lg p-2 text-[9px] text-left text-neutral-600 font-mono space-y-1">
                  {DIRECT_INTENTS.map((intent) => {
                    const isSelected = selectedIntent === intent;
                    return (
                      <button
                        key={intent}
                        onClick={() => handleSelectIntent(intent)}
                        className={`w-full text-left px-2 py-1 rounded transition-all text-[9px] font-mono leading-tight block ${
                          isSelected 
                            ? 'bg-rose-100 text-rose-900 font-bold border-l-2 border-rose-500 pl-1.5' 
                            : 'hover:bg-neutral-50 hover:text-neutral-900 text-neutral-600'
                        }`}
                      >
                        {intent}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* HTAN only */}
              <div 
                className={`flex flex-col items-stretch space-y-1.5 rounded-xl p-1.5 border-2 transition-all ${
                  activeRoutes.includes('htan') 
                    ? 'bg-orange-50/60 border-orange-300 shadow-[0_4px_20px_rgba(245,158,11,0.06)]' 
                    : 'border-transparent opacity-45 grayscale-[20%] hover:opacity-75'
                }`}
              >
                <button 
                  onClick={() => handleSelectPath('htan')}
                  className="w-full text-center p-1.5 rounded-lg bg-orange-50 border border-orange-300 text-orange-800 text-[11px] font-bold hover:bg-orange-100/80 transition-colors"
                >
                  HTAN Route
                </button>
                <div className="bg-white border border-neutral-100 rounded-lg p-2 text-[9px] text-left text-neutral-600 font-mono space-y-1">
                  <div className="text-neutral-400 text-[8px] uppercase tracking-wider text-center border-b pb-0.5 mb-1">benchmarked</div>
                  {HTAN_INTENTS.slice(0, 3).map((intent) => {
                    const isSelected = selectedIntent === intent;
                    return (
                      <button
                        key={intent}
                        onClick={() => handleSelectIntent(intent)}
                        className={`w-full text-left px-2 py-1 rounded transition-all text-[9px] font-mono leading-tight block ${
                          isSelected 
                            ? 'bg-orange-100 text-orange-900 font-bold border-l-2 border-orange-500 pl-1.5' 
                            : 'hover:bg-neutral-50 hover:text-neutral-900 text-neutral-600'
                        }`}
                      >
                        {intent}
                      </button>
                    );
                  })}
                  <div className="text-neutral-400 text-[8px] uppercase tracking-wider text-center border-y py-0.5 my-1">expansion</div>
                  {HTAN_INTENTS.slice(3).map((intent) => {
                    const isSelected = selectedIntent === intent;
                    return (
                      <button
                        key={intent}
                        onClick={() => handleSelectIntent(intent)}
                        className={`w-full text-left px-2 py-1 rounded transition-all text-[9px] font-mono leading-tight block ${
                          isSelected 
                            ? 'bg-orange-100 text-orange-900 font-bold border-l-2 border-orange-500 pl-1.5' 
                            : 'hover:bg-neutral-50 hover:text-neutral-900 text-neutral-600'
                        }`}
                      >
                        {intent}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RAG only */}
              <div 
                className={`flex flex-col items-stretch space-y-1.5 rounded-xl p-1.5 border-2 transition-all ${
                  activeRoutes.includes('rag') 
                    ? 'bg-yellow-50/60 border-yellow-300 shadow-[0_4px_20px_rgba(234,179,8,0.06)]' 
                    : 'border-transparent opacity-45 grayscale-[20%] hover:opacity-75'
                }`}
              >
                <button 
                  onClick={() => handleSelectPath('rag')}
                  className="w-full text-center p-1.5 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-800 text-[11px] font-bold hover:bg-yellow-100/80 transition-colors"
                >
                  RAG Route
                </button>
                <div className="bg-white border border-neutral-100 rounded-lg p-2 text-[9px] text-left text-neutral-600 font-mono space-y-1">
                  {RAG_INTENTS.map((intent) => {
                    const isSelected = selectedIntent === intent;
                    return (
                      <button
                        key={intent}
                        onClick={() => handleSelectIntent(intent)}
                        className={`w-full text-left px-2 py-1 rounded transition-all text-[9px] font-mono leading-tight block ${
                          isSelected 
                            ? 'bg-yellow-100 text-yellow-900 font-bold border-l-2 border-yellow-500 pl-1.5' 
                            : 'hover:bg-neutral-50 hover:text-neutral-900 text-neutral-600'
                        }`}
                      >
                        {intent}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Row 5: Connected lower structures with clear split */}
            <div className="w-full grid grid-cols-12 gap-4 pt-6 relative">
              
              {/* Direct Path Column (Span 4) */}
              <div className="col-span-4 flex flex-col items-center">
                
                {/* Connector line */}
                <div className="w-0.5 h-6 bg-neutral-300 relative z-10 -mt-6">
                  {activeRoutes.includes('direct') && (
                    <motion.div 
                      animate={{ top: ['0%', '100%'] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-rose-400 -left-0.5"
                    />
                  )}
                </div>

                {/* Safe Canned Reply Box */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode('safe_reply')}
                  className={`relative z-20 w-full max-w-[180px] py-3 px-3 rounded-xl border text-center cursor-pointer transition-all ${
                    isNodeActive('direct_reply')
                      ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm font-medium'
                      : 'bg-neutral-50/40 border-neutral-150 text-neutral-400'
                  }`}
                >
                  <div className="text-[11px] font-bold leading-tight">Safe canned reply</div>
                </motion.div>

                {/* Down line to Direct to Patient */}
                <div className="w-0.5 h-16 bg-neutral-300 relative z-10">
                  {isNodeActive('direct_reply') && (
                    <motion.div 
                      animate={{ top: ['0%', '100%'] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-rose-400 -left-0.5"
                    />
                  )}
                </div>

                {/* Direct to Patient Box */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode('direct_to_patient')}
                  className={`relative z-20 w-full max-w-[180px] py-2.5 px-3 rounded-xl border text-center cursor-pointer transition-all ${
                    isNodeActive('direct_to_patient')
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-800 shadow-sm font-semibold'
                      : 'bg-neutral-50/40 border-neutral-150 text-neutral-400'
                  }`}
                >
                  <div className="text-[11px]">Direct to patient</div>
                </motion.div>

              </div>

              {/* Shared Heavy Processing Path (Span 8) */}
              <div className="col-span-8 flex flex-col items-center">
                
                {/* Two merging connectors (HTAN and RAG) */}
                <div className="w-full h-6 relative z-10 -mt-6 mb-1 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 200 24" preserveAspectRatio="none">
                    {/* Line 1: HTAN (left part of col-span-8) to Quality Gate */}
                    <path 
                      d="M 50 0 L 100 24" 
                      fill="none" 
                      stroke={activeRoutes.includes('htan') ? '#fb923c' : '#e5e7eb'} 
                      strokeWidth={activeRoutes.includes('htan') ? '2.5' : '1.5'}
                    />
                    {/* Line 2: RAG (right part of col-span-8) to Quality Gate */}
                    <path 
                      d="M 150 0 L 100 24" 
                      fill="none" 
                      stroke={activeRoutes.includes('rag') ? '#facc15' : '#e5e7eb'} 
                      strokeWidth={activeRoutes.includes('rag') ? '2.5' : '1.5'}
                    />
                  </svg>
                </div>

                {/* Quality Gate Node */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedNode('gate')}
                  className={`relative z-20 w-full py-3.5 px-5 rounded-xl border text-center cursor-pointer transition-all ${
                    isNodeActive('quality_gate')
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                      : 'bg-neutral-50/40 border-neutral-150 text-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
                    <CheckCircle className={`w-3.5 h-3.5 ${isNodeActive('quality_gate') ? 'text-emerald-600' : 'text-neutral-400'}`} />
                    <span>Quality gate — pass or drop on each output</span>
                  </div>
                </motion.div>

                {/* SVG connection showing Quality gate branching: 
                    If PASS -> Claude Sonnet, If DROP -> fallback to Direct To Patient */}
                <div className="w-full h-8 relative pointer-events-none z-10 my-0.5">
                  <svg className="w-full h-full" viewBox="0 0 200 32" preserveAspectRatio="none">
                    {/* If quality gate passed, flow down to Sonnet */}
                    <path 
                      d="M 100 0 L 100 32" 
                      fill="none" 
                      stroke={isNodeActive('sonnet') ? '#38bdf8' : '#e5e7eb'} 
                      strokeWidth={isNodeActive('sonnet') ? '2.5' : '1.5'}
                    />
                    {/* If quality gate dropped, flow back to the direct route (left) */}
                    <path 
                      d="M 100 0 C 100 15, -100 15, -100 32" 
                      fill="none" 
                      stroke={(isNodeActive('quality_gate') && !qualityGatePass) ? '#fb7185' : '#e5e7eb'} 
                      strokeWidth={(isNodeActive('quality_gate') && !qualityGatePass) ? '2.5' : '1.5'}
                      strokeDasharray={(isNodeActive('quality_gate') && !qualityGatePass) ? '4 4' : 'none'}
                    />
                  </svg>
                </div>

                {/* Claude Sonnet node */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedNode('sonnet')}
                  className={`relative z-20 w-full py-3.5 px-5 rounded-xl border text-center cursor-pointer transition-all ${
                    isNodeActive('sonnet')
                      ? 'bg-sky-50 border-sky-300 text-sky-800 shadow-[0_4px_16px_rgba(14,165,233,0.06)]'
                      : 'bg-neutral-50/40 border-neutral-150 text-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold text-sky-900">Claude Sonnet — always runs</div>
                  <div className="text-[9px] text-sky-600 font-light mt-0.5 leading-none">Generates from whatever passed, baseline if nothing did</div>
                </motion.div>

                {/* Down connector */}
                <div className="w-0.5 h-6 bg-neutral-300 relative z-10">
                  {isNodeActive('sonnet') && (
                    <motion.div 
                      animate={{ top: ['0%', '100%'] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-sky-400 -left-0.5"
                    />
                  )}
                </div>

                {/* Cited Answer node */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedNode('cited')}
                  className={`relative z-20 w-full py-3 px-4 rounded-xl border text-center cursor-pointer transition-all ${
                    isNodeActive('cited_answer')
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-800 font-semibold shadow-sm'
                      : 'bg-neutral-50/40 border-neutral-150 text-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-800">Cited answer</div>
                  <div className="text-[9px] text-neutral-500 font-normal mt-0.5 leading-none">Citation-verified and grounding-checked</div>
                </motion.div>

              </div>

            </div>

            {/* Bottom Fail-open Policy Box */}
            <div className="w-full pt-4">
              <motion.div 
                whileHover={{ scale: 1.005 }}
                onClick={() => setSelectedNode('fail_open_footer')}
                className="w-full py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-[10px] font-mono text-neutral-500 flex items-center justify-center gap-2 cursor-pointer shadow-inner"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Haiku calls: Claude Haiku → Gemini Flash → fail-open fallback</span>
              </motion.div>
            </div>

          </div>

        </div>

        {/* Right Active Dynamic Inspector Panel (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6 text-left">
          
          {/* Quick Scenario Selector Block */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                Simulate Clinical Scenarios
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed font-light">
                Select a patient request payload to feed down the decision tree:
              </p>
            </div>

            <div className="space-y-2.5">
              {CLINICAL_SCENARIOS.map((scen) => {
                const isSelected = scen.id === activeScenarioId;
                return (
                  <button
                    key={scen.id}
                    onClick={() => handleSelectScenario(scen.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-neutral-900 text-white shadow-md'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold truncate pr-2">{scen.name}</span>
                      <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {scen.category}
                      </span>
                    </div>
                    <p className={`text-[10px] line-clamp-1 italic font-light ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}>
                      "{scen.query}"
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Flow Inspector (Dynamic Options Modal/Card) */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">Node Options & Paths</span>
                <Settings className="w-4 h-4 text-neutral-400" />
              </div>

              {/* Dynamic instruction display */}
              {!selectedNode ? (
                <div className="py-8 text-center space-y-2">
                  <HelpIcon className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p className="text-xs text-neutral-400 italic">Click any node on the left flowchart diagram to adjust settings and choose its custom paths.</p>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  
                  {/* Option display based on clicked node */}
                  {selectedNode === 'incoming' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-neutral-800 text-xs">Incoming Request payload</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">This represents the patient's raw text query or multi-modal image binary arriving at the gateway.</p>
                      </div>
                      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1.5 font-mono text-[10px] text-neutral-600">
                        <div className="text-neutral-400 uppercase text-[9px] font-bold pb-1 border-b">Raw Payload Data:</div>
                        <div>query: "{currentQuery}"</div>
                        <div>intent_matched: "{selectedIntent}"</div>
                        <div>active_routes: {activeRoutes.map(r => r.toUpperCase()).join(' + ')}</div>
                      </div>
                    </div>
                  )}

                  {selectedNode === 'router' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-neutral-800 text-xs">Claude Haiku router</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">A low-latency classifier that maps incoming queries onto specialized services or filters out non-medical chats immediately.</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Configure Paths manually:</span>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {(['direct', 'htan', 'rag'] as const).map((r) => {
                            const isSelected = activeRoutes.includes(r);
                            return (
                              <button
                                key={r}
                                onClick={() => handleSelectPath(r)}
                                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-all uppercase cursor-pointer text-center ${
                                  isSelected
                                    ? 'bg-neutral-900 text-white border-neutral-900'
                                    : 'bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200'
                                }`}
                              >
                                {r}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-neutral-400 italic">
                          HTAN and RAG can be active together. Selecting Direct disables other paths automatically.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedNode === 'safe_reply' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-rose-800 text-xs">Safe canned reply</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">When emergency crises or out-of-scope issues are flagged, the gateway completely bypasses downstream LLMs to serve a clinically validated warning instantly.</p>
                      </div>
                      <div className="p-3 bg-rose-50/50 border border-rose-200 rounded-xl font-mono text-[10px] text-rose-900">
                        "{activeRoutes.includes('direct') ? currentResponse : 'SYSTEM_READY: Canned replies initialized'}"
                      </div>
                    </div>
                  )}

                  {selectedNode === 'gate' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-emerald-800 text-xs">Quality gate evaluation</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">Checks machine-learning outputs for contradictions, safety issues, or invalid classifications. Choose whether to Pass or Drop downstream:</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setQualityGatePass(true)}
                          className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold text-center transition-colors cursor-pointer ${
                            qualityGatePass 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                              : 'bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200'
                          }`}
                        >
                          Pass (Normal)
                        </button>
                        <button
                          onClick={() => setQualityGatePass(false)}
                          className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold text-center transition-colors cursor-pointer ${
                            !qualityGatePass 
                              ? 'bg-rose-600 text-white border-rose-600 shadow-sm' 
                              : 'bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200'
                          }`}
                        >
                          Drop (Trigger Safe Canned)
                        </button>
                      </div>
                      <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-[10px] font-mono text-neutral-500 leading-relaxed">
                        {qualityGatePass 
                          ? 'IF output safety checks succeed -> allow Claude Sonnet generation.'
                          : 'IF safety checks fail -> trigger immediate bypass and drop fallback.'
                        }
                      </div>
                    </div>
                  )}

                  {selectedNode === 'sonnet' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-sky-800 text-xs">Claude Sonnet generation</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">Synthesizes data inputs, segmented image masks, or RAG articles into cohesive, citation-referenced reports.</p>
                      </div>
                      <div className="p-3 bg-sky-50/50 border border-sky-200 rounded-xl space-y-1.5 font-mono text-[9px] text-sky-900 leading-relaxed">
                        <div className="font-bold text-[10px]">Active Sonnet Input context:</div>
                        <div>• Active Intent: {selectedIntent}</div>
                        <div>• Primary Services: {activeRoutes.map(r => r.toUpperCase()).join(' + ')}</div>
                        <div>• Quality Check: PASSED</div>
                      </div>
                    </div>
                  )}

                  {selectedNode === 'cited' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-neutral-800 text-xs">Cited answer output</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">Final compiled patient payload with medical indices mapped directly back to verified reference repositories.</p>
                      </div>
                      <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1 text-neutral-700">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono block mb-1">Generated Output:</span>
                        <p className="text-xs italic leading-relaxed">
                          "{currentResponse}"
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedNode === 'direct_to_patient' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-neutral-800 text-xs">Direct to patient delivery</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">Bypasses typical clinical reasoning formats to send immediate notices, instructions, or emergency advice direct to the user portal.</p>
                      </div>
                      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1 text-neutral-700">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono block mb-1">Portal Delivery payload:</span>
                        <p className="text-xs italic leading-relaxed font-sans">
                          {activeRoutes.includes('direct') ? currentResponse : 'CRITICAL WARNING: The clinical gate has drop-flagged the current output due to context mismatch or verification failure. Safe direct response has been served.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedNode === 'fail_open_footer' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-neutral-800 text-xs">Medical fail-open protocols</span>
                        <p className="text-[11px] text-neutral-500 leading-normal mt-1">Our system fallback guarantee. If an API request to heavy Claude services fails or experiences high network latency, execution seamlessly delegates down to low-latency Gemini or canned backup models.</p>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Back button to dismiss details */}
            {selectedNode && (
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Close Inspector
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
