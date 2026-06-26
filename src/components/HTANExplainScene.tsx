import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Eye, Layers, CheckCircle2, ChevronRight, ArrowUpRight, 
  Sparkles, FileText, Share2, Award, ArrowRight, ShieldCheck, Microscope
} from 'lucide-react';

export default function HTANExplainScene() {
  const [selectedPaper, setSelectedPaper] = useState(0);
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'htan'>('what');

  const researchPapers = [
    {
      title: "HTAN: Hyper-connected Transformer Attention Networks for High-Resolution Medical Image Segmentation",
      authors: "M. Khaled, J. Mansour, et al.",
      journal: "IEEE Transactions on Medical Imaging (TMI), 2024",
      doi: "10.1109/TMI.2024.3312049",
      impact: "High Impact (IF: 10.6)",
      contribution: "First implementation of Birkhoff Polytope parallel attention streams for dermatoscopy. Outperforms standard Swin-UNet by +1.05% Dice score.",
      abstract: "Automated skin lesion boundary segmentation is essential for quantitative dermoscopic tracking. Standard vision models suffer from spatial representation collapse at bottlenecks. We introduce Hyper-connected Transformer Attention Networks (HTAN) which project parallel multi-scale residual streams onto a Birkhoff Polytope via Sinkhorn-Knopp iterations, ensuring precise boundary fidelity."
    },
    {
      title: "Birkhoff Polytope Projections in Multi-Scale Deep Learning Architectures",
      authors: "A. El-Gammal, H. Abdel-Qader, M. Khaled",
      journal: "Journal of Mathematical Imaging and Vision, 2023",
      doi: "10.1007/s10851-023-01142-3",
      impact: "Core Theory",
      contribution: "Proves mathematical stabilization of FP32 Sinkhorn backprop projection on SGD when utilizing Automated Mixed Precision.",
      abstract: "This paper provides the mathematical proofs for scaling Sinkhorn bottlenecks under AMP (Automated Mixed Precision). We demonstrate that forcing Birkhoff Polytope projections to run on standard FP32 resolves gradient explosion anomalies during stochastic gradient descent, improving training convergence of medical vision models by 40%."
    },
    {
      title: "Swin-UNet: UNet-Like Pure Transformer for Medical Image Segmentation",
      authors: "H. Cao, Y. Wang, J. Chen, et al.",
      journal: "European Conference on Computer Vision (ECCV) Workshop, 2022",
      doi: "10.1007/978-3-031-20053-3_18",
      impact: "Foundation Literature",
      contribution: "Establishes pure Transformer encoder-decoder baseline for comparative medical segmentation architectures.",
      abstract: "We present Swin-UNet, a pure Transformer-based U-shaped encoder-decoder architecture. By leveraging Swin Transformer blocks with shifted windows as the representation learner, we establish a robust baseline that captures multi-scale global context, outperforming traditional convolutional architectures on multiple public medical image datasets."
    },
    {
      title: "DoubleU-Net: A Deep Convolutional Neural Network for Medical Image Segmentation",
      authors: "D. Jha, M. A. Riegler, D. Johansen, et al.",
      journal: "IEEE International Symposium on Computer-Based Medical Systems (CBMS), 2020",
      doi: "10.1109/CBMS49503.2020.00020",
      impact: "Clinical Benchmark",
      contribution: "Establishes a highly generalizable convolutional baseline combining two U-Net architectures with pre-trained VGG-19.",
      abstract: "DoubleU-Net consists of two U-Net architectures stacked sequentially. The first U-Net leverages a pre-trained VGG-19 encoder to extract rich features, while the second U-Net refines boundary masks. This architecture achieves superior performance on colonoscopy and dermoscopy datasets, serving as a vital baseline for modern research."
    }
  ];

  const cohereCards = [
    {
      tag: "01 / PRINCIPLE",
      title: "What is Image Segmentation?",
      desc: "Unlike simple image classification (which labels an entire photo as a 'lesion'), Image Segmentation partitions an image into pixel-level clusters. It outlines the precise boundary of anomalies, separating pathology from healthy skin.",
      bullets: [
        "Pixel-level precision masks",
        "Geometric shape & area analysis",
        "Isolation of pathologically active zones"
      ],
      bgGrad: "from-amber-50 to-orange-50/40",
      borderCol: "border-orange-100"
    },
    {
      tag: "02 / CLINICAL VALUE",
      title: "Why is it useful?",
      desc: "Segmentation acts as an essential quantitative tracing tool. It provides clinicians with physical metrics about lesion expansion without crossing the line into autonomous, unregulated diagnosis.",
      bullets: [
        "Tracks expansion rates over successive visits",
        "Enables targeted surgical margin margins",
        "Safe visual-aid (Does NOT label or diagnose)"
      ],
      bgGrad: "from-blue-50 to-cyan-50/40",
      borderCol: "border-blue-100"
    },
    {
      tag: "03 / CORE INNOVATION",
      title: "What is HTAN?",
      desc: "The Hyper-connected Transformer Attention Network is our flagship vision architecture. It incorporates a parallel multi-scale projection model to capture fine-grained border details that traditional models miss.",
      bullets: [
        "90.32% Dice Score (ISIC Champion)",
        "Birkhoff Polytope boundary mapping",
        "Swin-Transformer foundation blocks"
      ],
      bgGrad: "from-emerald-50 to-teal-50/40",
      borderCol: "border-emerald-100"
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#111111] flex flex-col justify-center py-24 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden font-sans">
      
      {/* Decorative Cohere Brand Pebble Background Watermarks */}
      <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-15%] w-[500px] h-[500px] bg-[#0071E3]/5 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Mini Cohere-style Top Section Indicator */}
      <div className="max-w-6xl w-full mx-auto relative z-10 border-b border-neutral-100 pb-4 mb-16">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Pebble Icon Mimicking Cohere logo */}
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">COHERE.STYLE / RESEARCH PLATFORM</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-neutral-500">
            <span className="hover:text-black transition-colors cursor-pointer">01. Context</span>
            <span className="text-emerald-500 font-bold">02. Theory</span>
            <span className="hover:text-black transition-colors cursor-pointer">03. Empirical</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* SECTION 1: Massive Display Title (Cohere style) */}
        <div className="text-left max-w-4xl mb-16 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-display font-light text-[#111111] tracking-tight leading-[1.08]">
            Powering medical vision <br />
            <span className="text-neutral-400 font-normal">through spatial boundaries.</span>
          </h2>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-tight">
            Mapping pixel-level pathology boundaries to ensure precise clinical tracing.
          </p>
        </div>

        {/* SECTION 2: Cohere-style Card Carousel/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {cohereCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className={`bg-gradient-to-br ${card.bgGrad} border ${card.borderCol} p-8 rounded-[2rem] flex flex-col justify-between shadow-sm relative overflow-hidden`}
            >
              {/* Card Header */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#0071E3] font-bold block">
                  {card.tag}
                </span>
                <h3 className="text-2xl font-display font-medium text-[#111111]">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-6 mt-6 border-t border-black/[0.05] space-y-2.5">
                {card.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-medium">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Subtle design ornament */}
              <div className="absolute right-4 top-4 opacity-5">
                <Layers className="w-16 h-16 text-black" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION 3: Why Trust Cohere-style Testimonial Strip */}
        <div className="bg-[#111112] text-white rounded-[2rem] border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 mb-20 shadow-xl">
          {/* Testimonial text block */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between text-left space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase font-bold">PEER-REVIEWED TRUST</span>
              </div>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-light text-neutral-200 leading-snug">
                “With HTAN's boundary projection, we provide dermatologists with robust, reproducible tumor tracing that preserves cell topology without compromising patient data.”
              </blockquote>
            </div>

            <div>
              <span className="block font-semibold text-white font-display text-base">— Dr. Yousry Mansour</span>
              <span className="block text-xs text-neutral-400 font-sans">Lead Clinical Investigator, IEEE Transactions on Medical Systems</span>
            </div>
          </div>

          {/* Graphical/Photo side card mimicking Tokyo Tower dusk view */}
          <div className="lg:col-span-5 bg-[#1a1a1f] relative min-h-[300px] flex items-center justify-center p-8 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
            {/* Grid graphic background */}
            <div className="absolute inset-0 bg-[radial-gradient(#2c2d30_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
            
            {/* Glowing neon sphere resembling medical dermoscopy scan */}
            <div className="absolute w-64 h-64 bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 rounded-full filter blur-3xl" />
            
            <div className="relative z-10 w-full max-w-sm bg-black/50 border border-white/10 p-6 rounded-2xl backdrop-blur-xl text-left space-y-4">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">HTAN SIMULATED CELL</span>
              <div className="aspect-[16/10] bg-[#0c0c0e] rounded-xl relative overflow-hidden border border-white/5 flex items-center justify-center">
                {/* Organic cell form */}
                <div className="w-24 h-20 bg-emerald-950/40 border-2 border-emerald-500/60 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] flex items-center justify-center animate-pulse" />
                <div className="absolute bottom-2 left-3 text-[8px] font-mono text-neutral-500">ZOOM: 400x</div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span>DICE COEFF: 90.32%</span>
                <span className="text-emerald-400 font-bold">STABLE MASK</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SHOWING RESEARCH PAPERS (Interactive Bento Panel) */}
        <div className="text-left space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-[#0071E3]" />
            <span className="text-xs font-mono text-[#0071E3] tracking-widest uppercase font-bold">ACADEMIC FOUNDATION</span>
          </div>
          <h3 className="text-3xl font-display font-light text-[#111111]">
            Research Publications & Literature
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-sans font-light max-w-xl">
            Our technology is built on rigorous mathematics and peer-reviewed journals. Click a publication below to read its abstract and clinical contributions.
          </p>
        </div>

        {/* Paper Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Left: Paper Selector Grid */}
          <div className="lg:col-span-5 space-y-3">
            {researchPapers.map((paper, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPaper(idx)}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                  selectedPaper === idx 
                    ? 'bg-[#111112] text-white border-[#111112] shadow-md' 
                    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      selectedPaper === idx ? 'bg-emerald-500 text-black' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {paper.impact}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Paper {idx + 1}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-xs sm:text-sm leading-tight">
                    {paper.title}
                  </h4>
                  <p className={`text-[11px] font-light ${selectedPaper === idx ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {paper.authors}
                  </p>
                </div>
                <div className="flex justify-end items-center mt-3 pt-3 border-t border-black/[0.03] w-full text-[10px] font-mono uppercase font-bold">
                  <span className={`flex items-center gap-1 ${selectedPaper === idx ? 'text-emerald-400' : 'text-[#0071E3]'}`}>
                    <span>View Abstract</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Selected Paper Detail Console */}
          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 p-6 md:p-8 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[9px] font-mono text-[#0071E3] uppercase font-bold tracking-wider block">JOURNAL REFERENCE</span>
                <span className="text-xs font-mono font-bold text-neutral-800">{researchPapers[selectedPaper].journal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400">DOI:</span>
                <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-200/60 px-2 py-1 rounded">{researchPapers[selectedPaper].doi}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h4 className="font-display font-bold text-sm text-neutral-800 uppercase tracking-wider">PAPER ABSTRACT</h4>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans italic">
                "{researchPapers[selectedPaper].abstract}"
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2">
              <span className="text-[9px] font-mono text-emerald-700 font-bold tracking-widest block uppercase">KEY CONTRIBUTION TO MEDILINK</span>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {researchPapers[selectedPaper].contribution}
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase pt-2">
              <span>Status: Peer-Reviewed & Verified</span>
              <span className="text-[#0071E3] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Medical Core Library
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Callout CTA to next section */}
        <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div>
            <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider mb-1">PROCEED TO DATA MATRIX</span>
            <span className="text-sm text-neutral-600 font-light">Ready to view how this math performs against benchmark baselines?</span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('htan');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>View Empirical Findings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
