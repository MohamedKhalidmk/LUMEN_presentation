import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart2, Info, CheckCircle, TrendingUp, AlertTriangle, 
  HelpCircle, ChevronRight, Minimize2, ZoomIn, Award
} from 'lucide-react';
import { C, Atmosphere, Eyebrow } from './cohere';

type DatasetId = 'isic' | 'glas' | 'bowl';
type DiagramId = 'architecture' | 'htan2_n2' | 'htan1_n2' | 'htan1_n4';

interface ModelResult {
  name: string;
  dice: number;
  iou: number;
  acc: number;
  rec: number;
  pre: number;
  params: string;
  isOurs?: boolean;
  isBest?: boolean;
}

export default function HtanResultsScene() {
  const [activeDataset, setActiveDataset] = useState<DatasetId>('glas');
  const [activeDiagram, setActiveDiagram] = useState<DiagramId>('architecture');
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Core gains information
  const datasetGains = {
    isic: {
      name: 'ISIC-2018 (Skin Lesion)',
      gain: '89.27 → 90.32',
      diff: '+1.05',
      variant: 'HTAN_2 n=2',
      desc: 'large skin carcinoma datasets with distinct boundary variations benefit from multi-level manifold constraints.'
    },
    glas: {
      name: 'GlaS (Gland Segmentation)',
      gain: '88.10 → 91.67',
      diff: '+3.57',
      variant: 'HTAN_1 n=2',
      desc: 'smaller, high-variance clinical datasets experience the most dramatic improvement due to constrained hypothesis space.'
    },
    bowl: {
      name: 'DSB2018 (Nuclei Bowl)',
      gain: '91.07 → 92.14',
      diff: '+1.07',
      variant: 'HTAN_1 n=2',
      desc: 'cellular structures with standard circular morphologies show tight, consistent segmentation overlaps.'
    }
  };

  // Full Model list comparison table data
  const tableData: Record<DatasetId, ModelResult[]> = {
    isic: [
      { name: 'U-Net', dice: 84.22, iou: 73.12, acc: 91.45, rec: 85.10, pre: 83.90, params: '34.5M' },
      { name: 'DoubleU-Net', dice: 85.90, iou: 75.40, acc: 92.10, rec: 86.40, pre: 85.50, params: '29.3M' },
      { name: 'Swin-UNet', dice: 87.12, iou: 77.20, acc: 93.40, rec: 88.02, pre: 86.80, params: '27.1M' },
      { name: 'SegFormer', dice: 86.85, iou: 76.90, acc: 93.10, rec: 87.50, pre: 86.40, params: '14.2M' },
      { name: 'MCTrans', dice: 88.05, iou: 78.95, acc: 94.20, rec: 89.10, pre: 87.90, params: '31.8M' },
      { name: 'ResUNet', dice: 85.10, iou: 74.30, acc: 91.90, rec: 85.90, pre: 84.80, params: '18.9M' },
      { name: 'MedT', dice: 84.95, iou: 74.10, acc: 91.80, rec: 85.50, pre: 84.50, params: '1.4M' },
      { name: 'KiU-Net', dice: 85.30, iou: 74.80, acc: 92.20, rec: 86.05, pre: 85.00, params: '22.4M' },
      { name: 'FANet', dice: 86.15, iou: 75.90, acc: 92.80, rec: 86.90, pre: 85.80, params: '15.6M' },
      { name: 'Channel-UNet', dice: 85.60, iou: 75.05, acc: 92.40, rec: 86.30, pre: 85.20, params: '31.2M' },
      { name: 'Attention U-Net', dice: 86.45, iou: 76.30, acc: 93.02, rec: 87.20, pre: 86.05, params: '34.8M' },
      { name: 'TransAttUNet_R* (direct baseline)', dice: 89.27, iou: 80.88, acc: 95.45, rec: 90.02, pre: 88.54, params: '31.5M' },
      { name: 'HTAN_1 n=2 (ours)', dice: 89.92, iou: 81.80, acc: 95.88, rec: 90.75, pre: 89.20, params: '32.1M', isOurs: true },
      { name: 'HTAN_1 n=4 (ours)', dice: 89.70, iou: 81.45, acc: 95.70, rec: 90.40, pre: 89.05, params: '32.9M', isOurs: true },
      { name: 'HTAN_2 n=2 (ours)', dice: 90.32, iou: 82.45, acc: 96.12, rec: 91.22, pre: 89.88, params: '32.4M', isOurs: true, isBest: true },
      { name: 'HTAN_2 n=4 (ours)', dice: 90.05, iou: 82.02, acc: 95.95, rec: 90.90, pre: 89.50, params: '33.2M', isOurs: true }
    ],
    glas: [
      { name: 'U-Net', dice: 81.30, iou: 68.50, acc: 90.10, rec: 82.00, pre: 80.90, params: '34.5M' },
      { name: 'DoubleU-Net', dice: 83.15, iou: 71.20, acc: 91.50, rec: 84.10, pre: 82.80, params: '29.3M' },
      { name: 'Swin-UNet', dice: 85.50, iou: 74.80, acc: 93.05, rec: 86.90, pre: 85.00, params: '27.1M' },
      { name: 'SegFormer', dice: 84.90, iou: 73.90, acc: 92.50, rec: 86.00, pre: 84.10, params: '14.2M' },
      { name: 'MCTrans', dice: 86.40, iou: 76.10, acc: 93.80, rec: 87.80, pre: 85.90, params: '31.8M' },
      { name: 'ResUNet', dice: 82.50, iou: 70.40, acc: 91.10, rec: 83.50, pre: 82.10, params: '18.9M' },
      { name: 'MedT', dice: 79.80, iou: 66.40, acc: 88.90, rec: 80.50, pre: 79.20, params: '1.4M' },
      { name: 'KiU-Net', dice: 81.90, iou: 69.50, acc: 90.50, rec: 82.80, pre: 81.40, params: '22.4M' },
      { name: 'FANet', dice: 83.40, iou: 71.60, acc: 91.80, rec: 84.60, pre: 83.00, params: '15.6M' },
      { name: 'Channel-UNet', dice: 82.80, iou: 70.80, acc: 91.30, rec: 83.90, pre: 82.50, params: '31.2M' },
      { name: 'Attention U-Net', dice: 84.10, iou: 72.80, acc: 92.20, rec: 85.20, pre: 83.70, params: '34.8M' },
      { name: 'TransAttUNet_R* (direct baseline)', dice: 88.10, iou: 80.05, acc: 94.80, rec: 89.20, pre: 87.50, params: '31.5M' },
      { name: 'HTAN_1 n=2 (ours)', dice: 91.67, iou: 84.70, acc: 97.20, rec: 92.10, pre: 91.30, params: '32.1M', isOurs: true, isBest: true },
      { name: 'HTAN_1 n=4 (ours)', dice: 90.95, iou: 83.60, acc: 96.65, rec: 91.40, pre: 90.50, params: '32.9M', isOurs: true },
      { name: 'HTAN_2 n=2 (ours)', dice: 91.44, iou: 84.35, acc: 97.05, rec: 91.85, pre: 91.05, params: '32.4M', isOurs: true },
      { name: 'HTAN_2 n=4 (ours)', dice: 90.72, iou: 83.20, acc: 96.45, rec: 91.10, pre: 90.20, params: '33.2M', isOurs: true }
    ],
    bowl: [
      { name: 'U-Net', dice: 86.50, iou: 76.20, acc: 93.10, rec: 87.20, pre: 86.10, params: '34.5M' },
      { name: 'DoubleU-Net', dice: 88.20, iou: 78.90, acc: 94.50, rec: 89.10, pre: 87.90, params: '29.3M' },
      { name: 'Swin-UNet', dice: 89.45, iou: 80.95, acc: 95.30, rec: 90.40, pre: 89.10, params: '27.1M' },
      { name: 'SegFormer', dice: 89.10, iou: 80.40, acc: 95.10, rec: 90.05, pre: 88.80, params: '14.2M' },
      { name: 'MCTrans', dice: 90.15, iou: 82.10, acc: 95.95, rec: 91.20, pre: 89.95, params: '31.8M' },
      { name: 'ResUNet', dice: 87.10, iou: 77.15, acc: 93.60, rec: 87.90, pre: 86.70, params: '18.9M' },
      { name: 'MedT', dice: 85.90, iou: 75.30, acc: 92.50, rec: 86.40, pre: 85.20, params: '1.4M' },
      { name: 'KiU-Net', dice: 86.80, iou: 76.70, acc: 93.30, rec: 87.50, pre: 86.40, params: '22.4M' },
      { name: 'FANet', dice: 88.05, iou: 78.70, acc: 94.35, rec: 88.90, pre: 87.65, params: '15.6M' },
      { name: 'Channel-UNet', dice: 87.50, iou: 77.85, acc: 93.90, rec: 88.35, pre: 87.10, params: '31.2M' },
      { name: 'Attention U-Net', dice: 88.70, iou: 79.80, acc: 94.80, rec: 89.60, pre: 88.40, params: '34.8M' },
      { name: 'TransAttUNet_R* (direct baseline)', dice: 91.07, iou: 83.80, acc: 96.90, rec: 91.80, pre: 90.40, params: '31.5M' },
      { name: 'HTAN_1 n=2 (ours)', dice: 92.14, iou: 85.50, acc: 97.80, rec: 93.20, pre: 91.10, params: '32.1M', isOurs: true, isBest: true },
      { name: 'HTAN_1 n=4 (ours)', dice: 91.55, iou: 84.40, acc: 97.25, rec: 92.40, pre: 90.60, params: '32.9M', isOurs: true },
      { name: 'HTAN_2 n=2 (ours)', dice: 91.95, iou: 85.20, acc: 97.60, rec: 92.95, pre: 90.95, params: '32.4M', isOurs: true },
      { name: 'HTAN_2 n=4 (ours)', dice: 91.30, iou: 84.10, acc: 97.05, rec: 92.10, pre: 90.35, params: '33.2M', isOurs: true }
    ]
  };

  // Sample-wise Dice delta data (represent individual patient slice metrics)
  const sampleDeltas = [
    { id: '#012', baseline: 87.4, htan: 91.8, diff: 4.4, type: 'gland_large' },
    { id: '#041', baseline: 89.1, htan: 92.6, diff: 3.5, type: 'gland_small' },
    { id: '#089', baseline: 85.2, htan: 90.1, diff: 4.9, type: 'gland_blurred' },
    { id: '#114', baseline: 92.0, htan: 93.4, diff: 1.4, type: 'gland_clean' },
    { id: '#132', baseline: 84.5, htan: 89.8, diff: 5.3, type: 'lesion_asymmetric' },
    { id: '#176', baseline: 90.8, htan: 92.1, diff: 1.3, type: 'nuclei_cluster' },
    { id: '#203', baseline: 88.0, htan: 91.2, diff: 3.2, type: 'lesion_dark' },
    { id: '#224', baseline: 91.5, htan: 92.9, diff: 1.4, type: 'nuclei_sparse' }
  ];

  return (
    <section 
      id="htan-results-root"
      className="relative min-h-screen py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: C.ground }}
    >
      <Atmosphere variant="coral" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Title Block */}
        <div className="text-left max-w-4xl space-y-4">
          <Eyebrow text="clinical segmentation results" />
          <h2 
            className="text-5xl md:text-7xl font-display font-light tracking-tight leading-none"
            style={{ color: C.ink }}
          >
            manifold-constrained hyper-connections
          </h2>
          <p 
            className="text-sm md:text-base font-sans font-light max-w-2xl leading-relaxed animate-fade-in"
            style={{ color: C.inkSoft }}
          >
            our manifold-constrained hyper-connection (mHC) module restricts spatial attention maps to biologically feasible structures. explore live benchmarks, architectural blueprints, and model statistics.
          </p>
        </div>

        {/* SECTION A: Benchmark Highlights (Tabs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(datasetGains) as DatasetId[]).map((key) => {
            const data = datasetGains[key];
            const isActive = activeDataset === key;
            return (
              <button
                key={key}
                onClick={() => setActiveDataset(key)}
                className="rounded-[24px] p-6 border text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden select-none cursor-pointer hover:shadow-xs"
                style={{ 
                  backgroundColor: isActive ? C.card : 'rgba(255,255,255,0.4)',
                  borderColor: isActive ? C.coral : C.line,
                  borderWidth: isActive ? '2px' : '1px',
                  boxShadow: isActive ? `0 10px 30px ${C.coral}0d` : 'none'
                }}
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                    {data.variant}
                  </span>
                  <h4 className="text-lg font-display font-bold text-neutral-950">
                    {data.name}
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans font-light">
                    {data.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-baseline justify-between pt-4 border-t border-dashed border-neutral-200">
                  <span className="text-sm font-mono text-neutral-400">Dice score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-mono text-neutral-900 line-through opacity-50">
                      {data.gain.split('→')[0].trim()}
                    </span>
                    <span className="text-2xl font-mono font-bold text-[#E8512F]">
                      {data.gain.split('→')[1].trim()}
                    </span>
                    <span className="text-xs font-mono font-bold bg-[#FFE9E2] text-[#E8512F] px-1.5 py-0.5 rounded">
                      {data.diff}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* SECTION B: Dual layout - Interactive Diagram vs Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Full Interactive Results Table (Col span 7) */}
          <div 
            className="lg:col-span-7 rounded-[28px] border p-6 md:p-8 shadow-xs space-y-6 text-left"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">empirical benchmarks</span>
                <h3 className="text-2xl font-display font-light text-neutral-900">dataset benchmarking</h3>
              </div>
              <div className="text-[10px] font-mono text-[#E8512F] flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>highlighting htan variants</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-neutral-100 rounded-xl bg-neutral-50/20">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200/60 bg-neutral-100/60 font-mono text-[10px] uppercase text-neutral-500">
                    <th className="p-3">model name</th>
                    <th className="p-3 text-center">dice (%)</th>
                    <th className="p-3 text-center">iou (%)</th>
                    <th className="p-3 text-center">acc (%)</th>
                    <th className="p-3 text-center">pre (%)</th>
                    <th className="p-3 text-center">params</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData[activeDataset].map((row, idx) => {
                    const isOurs = row.isOurs;
                    const isBest = row.isBest;
                    const isBaseline = row.name.includes('TransAttUNet_R*');
                    const isSelected = selectedRow === row.name;

                    let bg = 'transparent';
                    let borderCol = 'border-neutral-100';
                    if (isBest) {
                      bg = C.greenSoft + '20';
                      borderCol = C.green + '30';
                    } else if (isOurs) {
                      bg = C.coralSoft + '10';
                    } else if (isBaseline) {
                      bg = C.blueSoft + '15';
                      borderCol = C.blue + '20';
                    }

                    return (
                      <tr
                        key={idx}
                        onClick={() => setSelectedRow(isSelected ? null : row.name)}
                        className="border-b transition-colors cursor-pointer hover:bg-neutral-50/50"
                        style={{ 
                          backgroundColor: bg,
                          borderColor: borderCol,
                          fontWeight: isOurs ? '600' : 'normal'
                        }}
                      >
                        <td className="p-3 flex items-center gap-2">
                          <span 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ 
                              backgroundColor: isBest ? C.green : isOurs ? C.coral : isBaseline ? C.blue : C.faint 
                            }}
                          />
                          <span className={isBest ? 'text-emerald-800' : isOurs ? 'text-neutral-900' : 'text-neutral-600'}>
                            {row.name}
                          </span>
                        </td>
                        <td className={`p-3 text-center font-mono font-bold ${isBest ? 'text-emerald-700' : isOurs ? 'text-[#E8512F]' : ''}`}>
                          {row.dice.toFixed(2)}
                        </td>
                        <td className="p-3 text-center font-mono text-neutral-500">{row.iou.toFixed(2)}</td>
                        <td className="p-3 text-center font-mono text-neutral-500">{row.acc.toFixed(2)}</td>
                        <td className="p-3 text-center font-mono text-neutral-500">{row.pre.toFixed(2)}</td>
                        <td className="p-3 text-center font-mono text-neutral-400">{row.params}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Selected Row Detail Box */}
            <div className="h-[52px]">
              <AnimatePresence mode="wait">
                {selectedRow ? (
                  <motion.div
                    key={selectedRow}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 rounded-xl border flex items-center gap-2 text-[11px]"
                    style={{ backgroundColor: C.ground2, borderColor: C.line }}
                  >
                    <Info className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span className="text-neutral-600 font-sans font-light">
                      {selectedRow.includes('HTAN') ? (
                        <span><strong className="text-neutral-900">{selectedRow}</strong> restricts standard spatial attention pathways via a manifold-constrained Sinkhorn-Knopp parallel bypass, avoiding gradient collapses.</span>
                      ) : (
                        <span><strong className="text-neutral-900">{selectedRow}</strong> acts as an unconstrained comparator baseline. notice the lower baseline metrics on tight cells.</span>
                      )}
                    </span>
                  </motion.div>
                ) : (
                  <div className="text-[11px] text-neutral-400 font-sans italic text-center pt-3 select-none">
                    tap any row in the benchmark table above to inspect details of the corresponding architecture.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Block: Switchable Diagram Viewer (Col span 5) */}
          <div 
            className="lg:col-span-5 rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6 flex flex-col justify-between h-full min-h-[580px]"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">interactive schematic workbench</span>
              <h3 className="text-2xl font-display font-light text-neutral-900">paper architecture blueprints</h3>
            </div>

            {/* Blueprint Switcher Pills */}
            <div className="grid grid-cols-2 gap-1.5 bg-[#F6F3EE] p-1 rounded-xl border border-[#E7E0D4]/60">
              <button
                onClick={() => {
                  setActiveDiagram('architecture');
                  setSelectedBlock(null);
                }}
                className={`py-2 text-[9px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
                  activeDiagram === 'architecture' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                HTAN Backbone
              </button>
              <button
                onClick={() => {
                  setActiveDiagram('htan2_n2');
                  setSelectedBlock(null);
                }}
                className={`py-2 text-[9px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
                  activeDiagram === 'htan2_n2' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                mHC @ x4 → x5 (HTAN_2)
              </button>
              <button
                onClick={() => {
                  setActiveDiagram('htan1_n2');
                  setSelectedBlock(null);
                }}
                className={`py-2 text-[9px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
                  activeDiagram === 'htan1_n2' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                mHC Single n=2
              </button>
              <button
                onClick={() => {
                  setActiveDiagram('htan1_n4');
                  setSelectedBlock(null);
                }}
                className={`py-2 text-[9px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
                  activeDiagram === 'htan1_n4' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                mHC Single n=4
              </button>
            </div>

            {/* Interactive Vector Canvas Screen */}
            <div className="bg-[#090A0C] rounded-2xl p-4 flex flex-col justify-between items-center relative overflow-hidden h-[280px]">
              {/* Scanline mesh */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.15)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.03),_rgba(0,255,0,0.01),_rgba(0,0,255,0.03))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-10" />

              {/* Vector schematics based on selections */}
              <div className="w-full flex-1 flex items-center justify-center relative z-10">
                <AnimatePresence mode="wait">
                  {activeDiagram === 'architecture' && (
                    <motion.div 
                      key="architecture"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col items-center justify-center space-y-4"
                    >
                      <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">HTAN COMPLETE UNIFIED BACKBONE</span>
                      
                      {/* Unified flowchart structure */}
                      <div className="flex items-center gap-2 text-[9px] font-mono text-neutral-300">
                        <div 
                          onClick={() => setSelectedBlock('input')}
                          className="px-2 py-1.5 bg-neutral-900 border border-neutral-700 rounded cursor-pointer hover:border-[#FF7759]"
                        >
                          input (img)
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-500" />
                        <div 
                          onClick={() => setSelectedBlock('encoder')}
                          className="px-2 py-1.5 bg-neutral-900 border border-neutral-700 rounded cursor-pointer hover:border-[#FF7759]"
                        >
                          encoder (x1-x5)
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-500" />
                        <div 
                          onClick={() => setSelectedBlock('mhc')}
                          className="px-2 py-1.5 bg-orange-950/40 border border-orange-500/40 rounded cursor-pointer text-[#FF7759] hover:border-orange-500 font-bold"
                        >
                          mHC @ x4 / x5
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-500" />
                        <div 
                          onClick={() => setSelectedBlock('decoder')}
                          className="px-2 py-1.5 bg-neutral-900 border border-neutral-700 rounded cursor-pointer hover:border-[#FF7759]"
                        >
                          decoder + mask
                        </div>
                      </div>

                      <div className="text-[10px] text-neutral-500 font-sans text-center max-w-xs">
                        click on any pipeline stage block to inspect the geometric bounding mechanics.
                      </div>
                    </motion.div>
                  )}

                  {activeDiagram === 'htan2_n2' && (
                    <motion.div 
                      key="htan2_n2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col items-center justify-center space-y-4"
                    >
                      <span className="text-[8px] font-mono text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/20">HTAN_2 (MHC @ X4 → MHC @ X5 BOTTLENECK)</span>
                      
                      <div className="flex items-center gap-1.5 text-[9px] font-mono">
                        <div className="px-1.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-400">feat x4</div>
                        <ChevronRight className="w-3 h-3 text-neutral-600" />
                        <div 
                          onClick={() => setSelectedBlock('mhc_x4')}
                          className="px-2 py-1 bg-orange-950/40 border border-[#FF7759]/60 rounded text-[#FF7759] cursor-pointer"
                        >
                          mHC @ x4
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-600" />
                        <div className="px-1 py-1 text-[8px] bg-neutral-950 text-neutral-500 border border-neutral-900 rounded">max-pool</div>
                        <ChevronRight className="w-3 h-3 text-neutral-600" />
                        <div 
                          onClick={() => setSelectedBlock('mhc_x5')}
                          className="px-2 py-1 bg-orange-950/40 border border-[#FF7759] rounded text-[#FF7759] cursor-pointer font-bold animate-pulse"
                        >
                          mHC @ x5 (bottleneck)
                        </div>
                      </div>

                      <span className="text-[9px] font-mono text-neutral-500">n = 2 streams configuration</span>
                    </motion.div>
                  )}

                  {activeDiagram === 'htan1_n2' && (
                    <motion.div 
                      key="htan1_n2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col items-center justify-center space-y-4"
                    >
                      <span className="text-[8px] font-mono text-[#5B73C9] bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">HTAN_1 BLOCK (N = 2 STREAM FLOWS)</span>
                      
                      <div className="relative border border-dashed border-neutral-800 p-3 rounded-lg flex flex-col items-center space-y-2 w-64 bg-black/40">
                        <div className="text-[7px] font-mono uppercase text-neutral-500 absolute top-1 left-2">inside block:</div>
                        
                        <div className="flex items-center gap-1 text-[8px] font-mono">
                          <div className="px-1 py-0.5 bg-neutral-900 rounded">stream in</div>
                          <ChevronRight className="w-2.5 h-2.5 text-neutral-700" />
                          <div 
                            onClick={() => setSelectedBlock('saa')}
                            className="px-1.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-500/30 rounded cursor-pointer"
                          >
                            SAA (PAM/SDPA)
                          </div>
                          <ChevronRight className="w-2.5 h-2.5 text-neutral-700" />
                          <div className="px-1 py-0.5 bg-neutral-900 rounded">merge</div>
                        </div>

                        <div 
                          onClick={() => setSelectedBlock('sinkhorn')}
                          className="w-full py-1 bg-orange-950/30 border border-orange-500/40 text-orange-400 text-[8px] font-mono text-center rounded cursor-pointer hover:border-orange-500"
                        >
                          Sinkhorn-Knopp Bypass (2 Streams)
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDiagram === 'htan1_n4' && (
                    <motion.div 
                      key="htan1_n4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col items-center justify-center space-y-4"
                    >
                      <span className="text-[8px] font-mono text-[#FF7759] bg-orange-950/30 px-2 py-0.5 rounded border border-orange-500/20">HTAN_1 BLOCK (N = 4 STREAM FLOWS)</span>
                      
                      <div className="relative border border-dashed border-neutral-800 p-3 rounded-lg flex flex-col items-center space-y-2 w-64 bg-black/40">
                        <div className="text-[7px] font-mono uppercase text-neutral-500 absolute top-1 left-2">inside block:</div>
                        
                        <div className="flex items-center gap-1 text-[8px] font-mono">
                          <div className="px-1 py-0.5 bg-neutral-900 rounded">stream in</div>
                          <ChevronRight className="w-2.5 h-2.5 text-neutral-700" />
                          <div 
                            onClick={() => setSelectedBlock('saa')}
                            className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded cursor-pointer"
                          >
                            SAA (PAM/SDPA)
                          </div>
                          <ChevronRight className="w-2.5 h-2.5 text-neutral-700" />
                          <div className="px-1 py-0.5 bg-neutral-900 rounded">merge</div>
                        </div>

                        <div 
                          onClick={() => setSelectedBlock('sinkhorn_n4')}
                          className="w-full py-1 bg-[#1A1A1E] border border-neutral-800 text-neutral-400 text-[8px] font-mono text-center rounded cursor-pointer hover:border-[#FF7759]"
                        >
                          Sinkhorn-Knopp Bypass (4 streams, Birkhoff constraint)
                        </div>
                      </div>

                      <span className="text-[8px] text-neutral-500 font-sans max-w-xs text-center leading-tight">
                        higher lanes result in dimension dilution due to exponential Sinkhorn projections.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Details of clicked block */}
              <div className="h-10 text-[9px] font-mono text-neutral-400 text-center uppercase tracking-wide">
                {selectedBlock === 'input' && 'input stream handles high-resolution dual-contrast medical images.'}
                {selectedBlock === 'encoder' && 'encoder extracts local patterns via 3x3 conv structures.'}
                {selectedBlock === 'mhc' && 'manifold-constrained hyper-connections are mounted at depth x4 and x5.'}
                {selectedBlock === 'decoder' && 'decoder restores spatial dimensions through bilinear upsampling.'}
                {selectedBlock === 'mhc_x4' && 'mhc @ x4 constraints early convolutional layers before the bottleneck.'}
                {selectedBlock === 'mhc_x5' && 'mhc @ x5 handles the deep abstract features inside the bottleneck.'}
                {selectedBlock === 'saa' && 'self-attention aggregator extracts spatial dependencies.'}
                {selectedBlock === 'sinkhorn' && 'fp32 Sinkhorn-Knopp normalizes the attention logits to doubly-stochastic matrices.'}
                {selectedBlock === 'sinkhorn_n4' && 'n=4 parallel lanes suffer from high constraint overhead.'}
                {!selectedBlock && 'tap diagram nodes to show deep block-level operations.'}
              </div>
            </div>

            {/* macOS styled bar explanation */}
            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono text-neutral-400">
              <span>diagram target: {activeDiagram.toUpperCase()}</span>
              <span>interactive node mapping</span>
            </div>
          </div>

        </div>

        {/* SECTION C: Dice Delta strip & Why it improves */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Dice Delta Strip (Col span 6) */}
          <div 
            className="lg:col-span-6 rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6"
            style={{ backgroundColor: C.card, borderColor: C.line }}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">granularity study</span>
              <h3 className="text-2xl font-display font-light text-neutral-900">per-sample dice delta strip</h3>
              <p className="text-xs text-neutral-500 font-sans">
                comparison of individual sample slice dice score improvements (HTAN_2 n=2 vs baseline TransAttUNet_R*).
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {sampleDeltas.map((sample) => (
                <div key={sample.id} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400">{sample.id}</span>
                    <span className="text-neutral-700 text-[10px] lowercase bg-neutral-100 px-2 py-0.5 rounded">
                      {sample.type.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Horizontal visual slider of improvement */}
                  <div className="flex-1 mx-4 h-2 bg-neutral-100 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-neutral-300" 
                      style={{ width: `${sample.baseline}%` }}
                    />
                    <div 
                      className="absolute top-0 h-full bg-[#FF7759]" 
                      style={{ 
                        left: `${sample.baseline}%`, 
                        width: `${sample.htan - sample.baseline}%` 
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400 font-normal">{sample.baseline}%</span>
                    <ChevronRight className="w-3 h-3 text-neutral-300" />
                    <span className="text-neutral-900 font-bold">{sample.htan}%</span>
                    <span className="text-[#E8512F] font-bold text-[10px] pl-1">
                      +{sample.diff}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Why it improves / Dead Ends / Scope Guard (Col span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Why It Improves Cards Grid */}
            <div 
              className="rounded-[28px] border p-6 md:p-8 shadow-xs text-left space-y-6 flex-1"
              style={{ backgroundColor: C.card, borderColor: C.line }}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">mathematical intuition</span>
                <h3 className="text-2xl font-display font-light text-neutral-900">why it improves</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-150 space-y-1">
                  <h4 className="font-bold text-neutral-900 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7759]" />
                    <span>n=2 sweet spot</span>
                  </h4>
                  <p className="text-neutral-500 leading-normal text-[11px]">
                    n=2 provides the optimal balance. n=4 introduces dimension dilation due to the Birkhoff constraint.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-150 space-y-1">
                  <h4 className="font-bold text-neutral-900 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>fp32 sinkhorn</span>
                  </h4>
                  <p className="text-neutral-500 leading-normal text-[11px]">
                    forced fp32 precision inside exp() accumulator bypasses exponent-overflow NaN collapses seen in standard AMP/fp16.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-150 space-y-1">
                  <h4 className="font-bold text-neutral-900 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B73C9]" />
                    <span>large dataset gains</span>
                  </h4>
                  <p className="text-neutral-500 leading-normal text-[11px]">
                    large medical databases amplify the manifold constraint gain. GlaS suffers from high small-data variance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-150 space-y-1">
                  <h4 className="font-bold text-neutral-900 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>tta resolution</span>
                  </h4>
                  <p className="text-neutral-500 leading-normal text-[11px]">
                    averaging logits first then taking the sigmoid layer resolved consistent ~0.5 Dice dilution on Test-Time Augmentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Guard & Dead Ends */}
            <div 
              className="rounded-[28px] border p-6 md:p-8 shadow-xs text-left bg-neutral-900 border-neutral-800 text-white space-y-4"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-xs font-mono tracking-widest text-amber-500 uppercase font-bold">
                  scope boundaries & guardrails
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-neutral-300 font-sans font-light">
                <p>
                  <strong className="text-white">mHC constraint scope:</strong> our core thesis is that manifold-constrained hyper-connections improve baseline TransAttUNet convergence behavior from a random initialization state. we do <strong className="text-[#FF7759]">not</strong> claim state-of-the-art across all medical computer vision architectures.
                </p>
                <div className="h-px bg-white/10" />
                <p>
                  <strong className="text-white">segmentation only:</strong> this pipeline is strictly calibrated to delineate geometric tissue boundaries (tumor contouring, cell counts). it does <strong className="text-amber-500">not</strong> diagnose diseases or output prescription actions independently.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
