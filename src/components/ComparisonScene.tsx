import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Info, Sparkles } from 'lucide-react';

export default function ComparisonScene() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const competitors = [
    { 
      name: 'Vezeeta', 
      highlight: false, 
      desc: 'Booking directory listings',
      color: 'bg-[#F5F5F7] text-[#1D1D1F]', 
      badge: 'Listing Directory'
    },
    { 
      name: 'Altibbi', 
      highlight: false, 
      desc: 'Telemedicine advice hotlines',
      color: 'bg-[#F5F5F7] text-[#1D1D1F]', 
      badge: 'Advice Hotlines'
    },
    { 
      name: 'WebTeb', 
      highlight: false, 
      desc: 'Static medical articles',
      color: 'bg-[#F5F5F7] text-[#1D1D1F]', 
      badge: 'Static Wikipedia'
    },
    { 
      name: 'MediLink Platform', 
      highlight: true, 
      desc: 'End-to-end coordinated flow',
      color: 'bg-[#0071E3] text-white ring-4 ring-[#0071E3]/20', 
      badge: 'Continuous Care Pathway'
    }
  ];

  const features = [
    {
      name: 'Directory Specialist Scheduling',
      vezeeta: true,
      altibbi: false,
      webteb: false,
      medilink: true,
      details: 'Connects patients directly with local Egyptian clinic consulting directories for face-to-face appointments.',
      category: 'Care Access'
    },
    {
      name: 'Symptom AI Integration',
      vezeeta: false,
      altibbi: true,
      webteb: false,
      medilink: true,
      details: 'Instant conversational symptom tracking built into the core interface to assist with initial assessments.',
      category: 'Symptom Analysis'
    },
    {
      name: 'HTAN Segmentation',
      vezeeta: false,
      altibbi: false,
      webteb: false,
      medilink: true,
      details: 'Advanced computer vision that traces and outlines anomalous skin lesion margins to enrich diagnostic context.',
      category: 'Clinical Computer Vision'
    },
    {
      name: 'RAG Grounding',
      vezeeta: false,
      altibbi: false,
      webteb: false,
      medilink: true,
      details: 'Semantic search of 25M+ medical journals, forcing system guidance to cite peer-reviewed academic evidence.',
      category: 'Clinical Proof Layer'
    },
    {
      name: 'Secure Patient Dossier Export',
      vezeeta: false,
      altibbi: false,
      webteb: false,
      medilink: true,
      details: 'Compiles e-scans, symptoms, and citations into a structured folder sent securely to physical doctors.',
      category: 'Physician Handoff'
    },
    {
      name: 'Local Arabic Dialect Support',
      vezeeta: false,
      altibbi: false,
      webteb: false,
      medilink: true,
      details: 'Engineered specifically for Egyptian colloquial dialects, translating informal feedback into formal clinical descriptors.',
      category: 'Accessibility'
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center py-28 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      {/* Soft gradient blur for Apple style premium background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#F5F5F7] rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-[350px] h-[350px] bg-sky-50 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header Title block */}
        <div className="text-left mb-16 max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3.5"
          >
            PLATFORM COMPARISON
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.1] mb-6"
          >
            Existing widgets solve parts. <br />
            <span className="text-[#86868B] font-normal">MediLink unifies the care cycle.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#424245] text-sm md:text-base font-light leading-relaxed font-sans"
          >
            A comparison of digital health utilities in the Egyptian market. While directories and hotlines are useful for logistics, MediLink introduces a self-contained, medically grounded clinical pathway.
          </motion.p>
        </div>

        {/* Dynamic Card Grid (Apple Macbook Pro Style Compare Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {competitors.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-6 rounded-3xl text-left flex flex-col justify-between min-h-[190px] transition-all duration-300 border border-[#D2D2D7]/30 shadow-sm ${
                comp.highlight 
                  ? 'bg-gradient-to-br from-[#0071E3] to-[#0051B3] text-white border-transparent shadow-md' 
                  : 'bg-[#F5F5F7] hover:bg-neutral-100'
              }`}
            >
              <div>
                <span className={`text-[9px] font-mono tracking-wider font-bold uppercase py-1 px-2.5 rounded-full inline-block mb-4 ${
                  comp.highlight ? 'bg-white/15 text-white' : 'bg-white text-neutral-600 border border-[#D2D2D7]/40'
                }`}>
                  {comp.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight">{comp.name}</h3>
                <p className={`text-xs mt-2 font-sans font-light ${comp.highlight ? 'text-sky-100' : 'text-[#86868B]'}`}>{comp.desc}</p>
              </div>

              {comp.highlight ? (
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold pt-4 text-white">
                  <span>UNIFIED ENGINE</span>
                  <Sparkles className="w-3.5 h-3.5 fill-white text-emerald-300" />
                </div>
              ) : (
                <div className="text-[10px] font-mono text-neutral-400 pt-4">Siloed System</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Crisp High-Contrast Feature matrix */}
        <div className="bg-[#FAF9FB] border border-[#D2D2D7]/40 rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#D2D2D7]/40 bg-[#F5F5F7]">
                  <th className="p-6 text-[10px] font-mono text-[#424245] uppercase tracking-widest font-bold">Clinical Capabilities</th>
                  <th className="p-6 text-center text-xs font-mono text-[#86868B]">Vezeeta</th>
                  <th className="p-6 text-center text-xs font-mono text-[#86868B]">Altibbi</th>
                  <th className="p-6 text-center text-xs font-mono text-[#86868B]">WebTeb</th>
                  <th className="p-6 text-center text-xs font-mono text-[#0071E3] font-bold">MediLink Platform</th>
                </tr>
              </thead>
              
              <tbody>
                {features.map((feat, fIdx) => (
                  <tr 
                    key={fIdx} 
                    onClick={() => setSelectedFeature(selectedFeature === fIdx ? null : fIdx)}
                    className="border-b border-[#D2D2D7]/20 hover:bg-white transition-all cursor-pointer"
                  >
                    {/* Feature description column with Category Pill */}
                    <td className="p-5 md:p-6 w-[40%]">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase font-bold mb-1">{feat.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] md:text-sm text-[#1D1D1F] font-semibold">{feat.name}</span>
                          <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        </div>
                        
                        {/* Interactive Accordion detail */}
                        <AnimatePresence>
                          {selectedFeature === fIdx && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-[#6E6E73] mt-2 font-sans font-light leading-relaxed bg-white border border-neutral-100 p-3 rounded-lg overflow-hidden"
                            >
                              {feat.details}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>

                    {/* Vezeeta check */}
                    <td className="p-6 text-center">
                      <div className="flex justify-center">
                        {feat.vezeeta ? (
                          <Check className="w-5 h-5 text-neutral-500 bg-neutral-100 p-1 rounded-full" strokeWidth={2.5} />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300" strokeWidth={2} />
                        )}
                      </div>
                    </td>

                    {/* Altibbi check */}
                    <td className="p-6 text-center">
                      <div className="flex justify-center">
                        {feat.altibbi ? (
                          <Check className="w-5 h-5 text-neutral-500 bg-neutral-100 p-1 rounded-full" strokeWidth={2.5} />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300" strokeWidth={2} />
                        )}
                      </div>
                    </td>

                    {/* WebTeb check */}
                    <td className="p-6 text-center">
                      <div className="flex justify-center">
                        {feat.webteb ? (
                          <Check className="w-5 h-5 text-neutral-500 bg-neutral-100 p-1 rounded-full" strokeWidth={2.5} />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300" strokeWidth={2} />
                        )}
                      </div>
                    </td>

                    {/* MediLink check */}
                    <td className="p-6 text-center bg-[#0071E3]/5">
                      <div className="flex justify-center">
                        {feat.medilink ? (
                          <motion.div 
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            className="w-8 h-8 rounded-full bg-[#0071E3] flex items-center justify-center text-white border-2 border-white shadow-md"
                          >
                            <Check className="w-4 h-4" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <X className="w-4 h-4 text-red-500" strokeWidth={2} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#F5F5F7] p-4 text-center border-t border-[#D2D2D7]/40 text-[10px] font-mono text-[#6E6E73] flex justify-center items-center gap-1.5 leading-relaxed">
            <span>Click any individual capability row to inspect detailed specifications & clinical utility.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
