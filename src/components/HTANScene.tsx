import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Database,
  Eye,
  Layers3,
  Network,
  QrCode,
  ScanLine,
  Table2,
} from 'lucide-react';
import { Atmosphere, C, Eyebrow } from './cohere';

const htanArchitecture = new URL('../../khaled/WhatsApp Image 2026-06-28 at 6.04.20 AM.jpeg', import.meta.url).href;
const mhcN2 = new URL('../../khaled/WhatsApp Image 2026-06-28 at 6.04.20 AM (1).jpeg', import.meta.url).href;
const mhcN4 = new URL('../../khaled/WhatsApp Image 2026-06-28 at 6.04.20 AM (2).jpeg', import.meta.url).href;
const htan2Mhc = new URL('../../khaled/WhatsApp Image 2026-06-28 at 6.04.20 AM (3).jpeg', import.meta.url).href;
const htanWorkbench = new URL('../../khaled/WhatsApp Image 2026-06-28 at 6.04.20 AM (4).jpeg', import.meta.url).href;
const transAttUnetFigure = new URL('../../khaled/WhatsApp Image 2026-06-28 at 6.24.54 AM.jpeg', import.meta.url).href;
const draftQrCode = new URL('../../khaled/WhatsApp Image 2026-06-28 at 7.11.21 AM.jpeg', import.meta.url).href;
const isicTableImage = new URL('../../khaled/htan-handoff-isic-table.png', import.meta.url).href;
const isicVisualsImage = new URL('../../khaled/htan-handoff-isic-visuals-cropped.png', import.meta.url).href;
const glasTableImage = new URL('../../khaled/htan-handoff-glas-table.png', import.meta.url).href;
const glasVisualsImage = new URL('../../khaled/htan-handoff-glas-visuals-cropped.png', import.meta.url).href;
const bowlTableImage = new URL('../../khaled/htan-handoff-bowl-table.png', import.meta.url).href;
const bowlVisualsImage = new URL('../../khaled/htan-handoff-bowl-visuals-cropped.png', import.meta.url).href;

type ResultTable = {
  dataset: string;
  rows: Array<{ model: string; dice: string; note: string; highlight?: 'ours' | 'external' }>;
};

type DetailTable = {
  id: 'isic' | 'glas' | 'bowl';
  name: string;
  best: string;
  winner: string;
  columns: string[];
  rows: Array<{ model: string; values: string[]; highlight?: 'ours' | 'baseline' | 'external' }>;
  asset?: string;
};

const segmentationTypes = [
  {
    title: 'Semantic',
    desc: 'Every pixel gets a class label. All glands or all lesion pixels share one class.',
    color: C.blue,
  },
  {
    title: 'Instance',
    desc: 'Every object gets its own mask, so two nearby nuclei remain separate objects.',
    color: C.coral,
  },
  {
    title: 'Panoptic',
    desc: 'Semantic classes and object instances are unified into one pixel-level map.',
    color: C.green,
  },
];

const datasets = [
  {
    name: 'ISIC-2018',
    domain: 'Skin lesion dermoscopy',
    clinical: 'Melanoma screening depends on exact lesion boundaries, asymmetry, and border irregularity.',
    role: 'Tests whether the model preserves fine edge geometry under high-resolution dermoscopic texture.',
    accent: C.coralDeep,
  },
  {
    name: 'GlaS',
    domain: 'Gland histology',
    clinical: 'Colorectal cancer grading relies on gland shape, crowding, and epithelial structure.',
    role: 'Small dataset with high structural variance; useful for testing regularization and topology bias.',
    accent: C.green,
  },
  {
    name: 'Data Science Bowl',
    domain: 'Cell nuclei',
    clinical: 'Nuclei counts and masks support proliferation analysis and cellular morphology review.',
    role: 'Dense cell instances test whether masks remain separated instead of merging into blobs.',
    accent: C.blue,
  },
];

const evolution = [
  ['FCN', 'Made segmentation end-to-end, but produced coarse masks after heavy downsampling.'],
  ['U-Net', 'Restored detail with encoder-decoder skip connections for biomedical images.'],
  ['Attention U-Net', 'Added gates so decoder features focus on relevant anatomy.'],
  ['TransUNet', 'Injected transformer context to model long-range dependencies.'],
  ['TransAttUNet', 'Combined TSA and GSA attention at the bottleneck, but kept single-stream bottleneck flow.'],
];

const resultTables: ResultTable[] = [
  {
    dataset: 'ISIC-2018 Skin Lesion',
    rows: [
      { model: 'TransAttUNet_R baseline', dice: '89.27%', note: 'reproduced baseline' },
      { model: 'HTAN_1 n=2', dice: '90.15%', note: 'single mHC block' },
      { model: 'HTAN_2 n=2', dice: '90.32%', note: 'best HTAN row', highlight: 'ours' },
      { model: 'HTAN_2 n=4', dice: '90.06%', note: 'over-parameterized' },
    ],
  },
  {
    dataset: 'GlaS Gland Histology',
    rows: [
      { model: 'TransAttUNet_R AdamW', dice: '88.10%', note: 'transparent reproduction' },
      { model: 'TransAttUNet_R SGD', dice: '89.11%', note: 'original paper protocol' },
      { model: 'HTAN_1 n=2', dice: '91.67%', note: 'best HTAN row', highlight: 'ours' },
      { model: 'HTAN_2 n=2', dice: '91.44%', note: 'two-block variant' },
    ],
  },
  {
    dataset: 'Data Science Bowl Nuclei',
    rows: [
      { model: 'TransAttUNet_R baseline', dice: '91.07%', note: 'reproduced baseline' },
      { model: 'HTAN_1 n=2', dice: '92.14%', note: 'best train-from-scratch HTAN row', highlight: 'ours' },
      { model: 'HTAN_2 n=2', dice: '91.95%', note: 'two-block variant' },
      { model: 'DoubleU-Net', dice: '92.91%', note: 'frozen VGG16 encoder footnote', highlight: 'external' },
    ],
  },
];

const ablations = [
  ['TransAttUNet_R', '41.3M', '89.27%', 'baseline without mHC'],
  ['HTAN_1 Hres-only', '67M', '89.95%', 'constrains H_res only'],
  ['HTAN_1 n=2', '47M', '90.15%', 'efficient single mHC'],
  ['HTAN_1 n=4', '75M', '90.46%', 'slight gain, higher cost'],
  ['HTAN_2 n=2', '61M', '90.32%', 'best ISIC trade-off'],
  ['HTAN_2 n=4', '129M', '90.06%', 'over-parameterized'],
];

const transAttUnetPaperAblations = [
  ['TAU w/o TSA + GSA', '83.89', '97.55', '83.56', '84.54', '81.59'],
  ['TAU w/o TSA + MSC', '84.49', '97.75', '84.99', '85.82', '83.84'],
  ['TAU w/o GSA + MSC', '85.12', '97.79', '85.03', '86.55', '84.64'],
  ['TAU w/o TSA', '87.13', '98.16', '85.59', '88.42', '85.96'],
  ['TAU w/o GSA', '87.86', '98.24', '85.63', '88.91', '86.78'],
  ['TAU w/o MSC', '88.55', '98.49', '85.97', '90.37', '87.83'],
  ['TransAttUnet', '90.74', '98.88', '86.57', '91.62', '89.11'],
];

const revealTables: DetailTable[] = [
  {
    id: 'isic',
    name: 'ISIC-2018',
    best: '90.32%',
    winner: 'HTAN_2 n=2',
    columns: ['Params', 'Dice', 'IoU', 'ACC', 'REC', 'PRE'],
    asset: isicTableImage,
    rows: [
      { model: 'U-Net*', values: ['17.3M', '87.76', '79.08', '95.10', '86.20', '90.81'] },
      { model: 'DoubleU-Net* pretrained', values: ['9.2M', '86.42', '77.25', '94.35', '87.27', '87.68'], highlight: 'external' },
      { model: 'Swin-UNet†', values: ['-', '89.72', '82.90', '-', '90.32', '92.04'] },
      { model: 'SegFormer†', values: ['-', '90.24', '83.60', '-', '91.12', '92.10'] },
      { model: 'MCTrans†', values: ['-', '90.35', '-', '-', '-', '-'] },
      { model: 'TransAttUNet_R*', values: ['41.3M', '89.27', '81.24', '95.72', '87.62', '92.24'], highlight: 'baseline' },
      { model: 'HTAN_1 Hres-only', values: ['67M', '89.95', '82.41', '95.92', '89.42', '91.78'] },
      { model: 'HTAN_1 n=2', values: ['47M', '90.15', '82.71', '96.07', '89.12', '92.36'] },
      { model: 'HTAN_1 n=4', values: ['75M', '90.46', '83.07', '96.13', '89.55', '92.33'] },
      { model: 'HTAN_2 n=4', values: ['129M', '90.06', '82.62', '96.07', '88.75', '92.77'] },
      { model: 'HTAN_2 n=2', values: ['61M', '90.32', '82.93', '96.02', '89.77', '92.00'], highlight: 'ours' },
    ],
  },
  {
    id: 'glas',
    name: 'GlaS',
    best: '91.67%',
    winner: 'HTAN_1 n=2',
    columns: ['Dice', 'IoU', 'ACC', 'REC', 'PRE'],
    asset: glasTableImage,
    rows: [
      { model: 'ResUNet†', values: ['80.88', '69.11', '81.49', '85.11', '80.01'] },
      { model: 'MedT†', values: ['81.82', '69.61', '-', '-', '-'] },
      { model: 'Attention U-Net†', values: ['81.59', '70.06', '-', '-', '-'] },
      { model: 'KiU-Net†', values: ['83.25', '72.78', '-', '-', '-'] },
      { model: 'FANet†', values: ['84.67', '74.30', '-', '-', '-'] },
      { model: 'Swin-UNet†', values: ['86.70', '77.32', '-', '89.00', '86.12'] },
      { model: 'SegFormer†', values: ['87.36', '79.71', '-', '85.56', '86.53'] },
      { model: 'TransAttUNet_R†', values: ['89.11', '81.13', '89.02', '90.08', '88.95'] },
      { model: 'U-Net*', values: ['90.27', '82.77', '90.55', '89.36', '91.54'] },
      { model: 'DoubleU-Net* pretrained', values: ['90.85', '83.53', '90.90', '90.89', '90.99'], highlight: 'external' },
      { model: 'TransAttUNet_R*', values: ['88.10', '79.10', '87.35', '94.28', '82.86'], highlight: 'baseline' },
      { model: 'HTAN_1 Hres-only', values: ['91.05', '83.96', '91.04', '91.59', '90.63'] },
      { model: 'HTAN_1 n=4', values: ['91.34', '84.40', '91.47', '90.99', '91.87'] },
      { model: 'HTAN_2 n=2', values: ['91.50', '84.65', '91.58', '92.21', '90.99'] },
      { model: 'HTAN_1 n=2', values: ['91.67', '84.94', '91.71', '91.71', '91.76'], highlight: 'ours' },
    ],
  },
  {
    id: 'bowl',
    name: 'DSB2018',
    best: '92.14%',
    winner: 'HTAN_1 n=2',
    columns: ['Params', 'Dice', 'IoU', 'ACC', 'REC', 'PRE'],
    asset: bowlTableImage,
    rows: [
      { model: 'FANet†', values: ['-', '81.03', '71.08', '95.59', '80.62', '82.31'] },
      { model: 'Channel-UNet†', values: ['-', '87.55', '79.75', '96.27', '90.70', '87.86'] },
      { model: 'ResUNet†', values: ['-', '89.91', '82.44', '97.05', '90.00', '90.84'] },
      { model: 'Attention U-Net†', values: ['-', '90.83', '-', '-', '-', '91.61'] },
      { model: 'DoubleU-Net†', values: ['-', '91.33', '84.07', '-', '64.07', '94.96'] },
      { model: 'TransAttUNet_R†', values: ['41.3M', '91.62', '84.98', '97.46', '91.85', '91.93'] },
      { model: 'TransAttUNet_R*', values: ['41.3M', '91.07', '83.81', '96.94', '91.90', '90.56'], highlight: 'baseline' },
      { model: 'HTAN_1 Hres-only', values: ['67M', '91.23', '84.07', '97.03', '89.54', '93.26'] },
      { model: 'U-Net*', values: ['17.3M', '92.01', '85.37', '97.30', '91.02', '93.27'] },
      { model: 'HTAN_1 n=4', values: ['75M', '92.11', '85.49', '97.28', '91.84', '92.61'] },
      { model: 'HTAN_2 n=2', values: ['61M', '92.13', '85.54', '97.28', '92.09', '92.36'] },
      { model: 'HTAN_1 n=2', values: ['47M', '92.14', '85.55', '97.31', '91.74', '92.74'], highlight: 'ours' },
      { model: 'DoubleU-Net* pretrained', values: ['9.2M', '92.91', '86.86', '97.54', '92.45', '93.56'], highlight: 'external' },
    ],
  },
];

const visualPredictionAssets = [
  {
    dataset: 'ISIC-2018',
    src: isicVisualsImage,
    caption: 'Visual predictions: input, ground truth, TransAttUNet_R*, and HTAN_2 n=2.',
  },
  {
    dataset: 'GlaS',
    src: glasVisualsImage,
    caption: 'Visual predictions: gland histology masks from the handoff PDF.',
  },
  {
    dataset: 'DSB2018',
    src: bowlVisualsImage,
    caption: 'Visual predictions: nuclei segmentation masks from the handoff PDF.',
  },
];

function SegmentationDiagram({ index, color }: { index: number; color: string }) {
  const cells = [
    ['M35 25 C52 10 78 19 70 44 C83 60 58 79 38 67 C18 76 14 42 35 25 Z', 'M70 78 C78 60 103 67 108 86 C112 106 83 115 70 100 C56 111 40 94 50 79 C56 72 63 73 70 78 Z'],
    ['M28 30 C41 12 68 18 67 44 C85 58 68 80 45 70 C28 86 10 59 25 42 Z', 'M83 58 C101 47 119 63 111 83 C126 99 101 119 82 104 C66 111 50 88 65 72 Z'],
    ['M30 25 C50 13 76 24 70 50 C83 69 58 87 37 71 C20 76 11 45 30 25 Z', 'M86 56 C105 50 122 69 110 90 C118 107 88 119 76 101 C57 104 55 73 76 66 Z'],
  ][index];

  return (
    <svg viewBox="0 0 140 120" className="w-full h-28">
      <rect x="8" y="8" width="124" height="104" rx="18" fill="#FBFAF7" stroke="#E7E0D4" />
      <path d={cells[0]} fill={`${color}30`} stroke={color} strokeWidth="2.5" />
      <path d={cells[1]} fill={`${color}20`} stroke={index === 0 ? color : C.inkSoft} strokeWidth="2.5" strokeDasharray={index === 0 ? '0' : '4 3'} />
      {index === 2 && <path d="M8 78 C35 65 70 70 132 54" stroke={C.quartz} strokeWidth="6" strokeLinecap="round" opacity="0.45" />}
      <circle cx="45" cy="48" r="5" fill={color} />
      <circle cx="90" cy="84" r="5" fill={index === 0 ? color : C.ink} />
    </svg>
  );
}

function ResultTableCard({ table }: { table: ResultTable }) {
  return (
    <div className="rounded-[24px] border p-5 shadow-xs" style={{ backgroundColor: C.card, borderColor: C.line }}>
      <h4 className="text-lg font-display font-semibold" style={{ color: C.ink }}>{table.dataset}</h4>
      <div className="mt-4 overflow-hidden rounded-xl border" style={{ borderColor: C.line }}>
        <table className="w-full text-left text-xs">
          <thead style={{ backgroundColor: C.ground2 }}>
            <tr className="font-mono uppercase tracking-wider" style={{ color: C.muted }}>
              <th className="p-3">model</th>
              <th className="p-3 text-right">dice</th>
              <th className="p-3">note</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr
                key={row.model}
                className="border-t"
                style={{
                  borderColor: C.line,
                  backgroundColor: row.highlight === 'ours' ? C.greenSoft : row.highlight === 'external' ? C.blueSoft : 'transparent',
                }}
              >
                <td className="p-3 font-semibold" style={{ color: C.ink }}>{row.model}</td>
                <td className="p-3 text-right font-mono font-bold" style={{ color: row.highlight ? C.green : C.inkSoft }}>{row.dice}</td>
                <td className="p-3" style={{ color: C.muted }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function HTANScene() {
  const [activeFigure, setActiveFigure] = useState<'architecture' | 'mhc2' | 'mhc4' | 'htan2' | 'transatt'>('architecture');
  const [activeRevealDataset, setActiveRevealDataset] = useState<DetailTable['id']>('glas');

  const figures = {
    architecture: { src: htanArchitecture, label: 'HTAN full architecture', caption: 'HTAN architecture with mHC mounted at x4 and the x5 bottleneck.' },
    mhc2: { src: mhcN2, label: 'mHC n=2', caption: 'Single mHC block with two residual streams and fp32 Sinkhorn-Knopp projection.' },
    mhc4: { src: mhcN4, label: 'mHC n=4', caption: 'Four-stream ablation: more lanes, higher cost, weaker practical trade-off.' },
    htan2: { src: htan2Mhc, label: 'HTAN_2 n=2', caption: 'Two mHC blocks at x4 and x5; best ISIC configuration.' },
    transatt: { src: transAttUnetFigure, label: 'TransAttUNet base', caption: 'The source TransAttUNet architecture before mHC is inserted.' },
  };

  const selectedRevealTable = revealTables.find((table) => table.id === activeRevealDataset) ?? revealTables[0];

  return (
    <section
      id="htan-full-rewrite"
      className="relative overflow-hidden px-6 py-24 md:px-12"
      style={{ backgroundColor: C.ground, color: C.ink }}
    >
      <Atmosphere variant="mixed" />
      <div className="relative z-10 mx-auto max-w-7xl space-y-20">
        <div className="max-w-5xl space-y-6 text-left">
          <Eyebrow text="htan medical segmentation module" variant="green" />
          <h2 className="text-5xl font-display font-light leading-none tracking-tight md:text-7xl">
            from pixels to clinical masks
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {segmentationTypes.map((type, index) => (
            <motion.div
              key={type.title}
              whileHover={{ y: -5 }}
              className="rounded-[28px] border p-6 shadow-xs"
              style={{ backgroundColor: C.card, borderColor: C.line }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: type.color }}>0{index + 1} / segmentation type</span>
              <SegmentationDiagram index={index} color={type.color} />
              <h3 className="mt-4 text-2xl font-display font-semibold">{type.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: C.muted }}>{type.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-4 text-left">
            <Eyebrow text="why medical segmentation matters" variant="blue" />
            <h3 className="text-4xl font-display font-light leading-tight">A mask is a measurement surface.</h3>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {datasets.map((dataset) => (
              <div key={dataset.name} className="rounded-[24px] border p-5" style={{ backgroundColor: C.card, borderColor: C.line }}>
                <div className="flex items-center justify-between">
                  <Database className="h-5 w-5" style={{ color: dataset.accent }} />
                  <span className="font-mono text-[10px] uppercase" style={{ color: C.faint }}>{dataset.domain}</span>
                </div>
                <h4 className="mt-5 text-xl font-display font-semibold">{dataset.name}</h4>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: C.inkSoft }}>{dataset.clinical}</p>
                <div className="mt-4 border-t pt-4 text-xs leading-relaxed" style={{ borderColor: C.line, color: C.muted }}>{dataset.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border p-7 md:p-10" style={{ backgroundColor: C.card, borderColor: C.line }}>
          <div className="mb-8 flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow text="segmentation model evolution" variant="coral" />
              <h3 className="mt-4 text-4xl font-display font-light">FCN to TransAttUNet</h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: C.muted }}>
              Each generation solved a specific failure mode: coarse output, lost detail, weak focus, missing global context, then single-stream bottleneck limits.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {evolution.map(([name, solved], index) => (
              <div key={name} className="relative rounded-2xl border p-4" style={{ backgroundColor: index === 4 ? C.coralSoft : C.ground2, borderColor: index === 4 ? C.coral : C.line }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: index === 4 ? C.coralDeep : C.faint }}>{String(index + 1).padStart(2, '0')}</span>
                <h4 className="mt-3 text-lg font-display font-semibold">{name}</h4>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: C.muted }}>{solved}</p>
                {index < evolution.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 md:block" style={{ color: C.faint }} />}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border bg-white p-4" style={{ borderColor: C.line }}>
            <img src={transAttUnetFigure} alt="TransAttUNet architecture figure" className="w-full rounded-xl border object-contain" style={{ borderColor: C.line }} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-[32px] border p-8 text-left" style={{ backgroundColor: C.card, borderColor: C.line }}>
            <Eyebrow text="the research gap" variant="quartz" />
            <h3 className="mt-5 text-4xl font-display font-light leading-tight">Residuals are stable, but rigid.</h3>
            <div className="mt-6 rounded-2xl border p-5" style={{ backgroundColor: C.ground2, borderColor: C.line }}>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5" style={{ color: C.coralDeep }} />
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: C.coralDeep }}>problem statement</span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-relaxed">
                The TransAttUNet bottleneck is attention-rich, but still single-stream. HTAN asks whether controlled parallel residual streams can improve high-level feature interaction before decoding.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 rounded-[32px] border p-6" style={{ backgroundColor: C.card, borderColor: C.line }}>
            <div className="relative min-h-[330px] overflow-hidden rounded-2xl border p-6" style={{ backgroundColor: '#111112', borderColor: '#242428' }}>
              <div className="absolute inset-0 bg-[radial-gradient(#2b2c32_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
              <div className="relative z-10 grid h-full grid-cols-3 items-center gap-4 text-center text-white">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Layers3 className="mx-auto h-7 w-7 text-neutral-400" />
                  <h4 className="mt-4 font-display text-lg">single stream</h4>
                  <p className="mt-2 text-xs text-neutral-400">one bottleneck path</p>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-orange-400/40 bg-orange-500/10 px-4 py-3 font-mono text-xs text-orange-300">mHC routing</div>
                  <div className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-3 font-mono text-xs text-blue-300">Sinkhorn projection</div>
                  <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 font-mono text-xs text-emerald-300">doubly stochastic</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Network className="mx-auto h-7 w-7 text-[#FF7759]" />
                  <h4 className="mt-4 font-display text-lg">parallel streams</h4>
                  <p className="mt-2 text-xs text-neutral-400">depth-weighted topology</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border p-7 md:p-10" style={{ backgroundColor: '#111112', borderColor: '#242428', color: 'white' }}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 text-left">
              <Eyebrow text="mHC from DeepSeek AI arxiv:2512.24880v2" variant="coral" />
              <h3 className="mt-5 text-4xl font-display font-light leading-tight">Manifold-Constrained Hyper-Connections</h3>
            </div>
            <div className="lg:col-span-8">
              <div className="mb-4 grid grid-cols-3 gap-2">
                {(['mhc2', 'mhc4', 'htan2'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveFigure(key)}
                    className={`rounded-xl border px-3 py-2 font-mono text-[10px] uppercase transition-colors ${
                      activeFigure === key ? 'border-[#FF7759] bg-[#FF7759]/15 text-[#FF7759]' : 'border-white/10 bg-white/5 text-neutral-400'
                    }`}
                  >
                    {figures[key].label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFigure}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-2xl border border-white/10 bg-white p-3"
                >
                  <img src={figures[activeFigure].src} alt={figures[activeFigure].label} className="w-full rounded-xl object-contain" />
                </motion.div>
              </AnimatePresence>
              <p className="mt-3 text-xs text-neutral-400">{figures[activeFigure].caption}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border p-7 md:p-10" style={{ backgroundColor: C.card, borderColor: C.line }}>
          <div className="mb-6 flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow text="htan model delta" variant="green" />
              <h3 className="mt-4 text-4xl font-display font-light">Our model: TransAttUNet + mHC bottleneck</h3>
            </div>
          </div>
          <div className="relative rounded-2xl border bg-white p-3" style={{ borderColor: C.line }}>
            <img src={htanArchitecture} alt="HTAN architecture with mHC bottleneck annotation" className="w-full rounded-xl object-contain" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow text="results and ablations" variant="blue" />
              <h3 className="mt-4 text-4xl font-display font-light">Benchmark outcomes</h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: C.muted }}>
              HTAN is claimed narrowly: mHC improves the reproduced TransAttUNet baseline across three medical segmentation benchmarks.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {resultTables.map((table) => (
              <React.Fragment key={table.dataset}>
                <ResultTableCard table={table} />
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-[24px] border p-5" style={{ backgroundColor: C.card, borderColor: C.line }}>
              <div className="mb-4 flex items-center gap-2">
                <Table2 className="h-5 w-5" style={{ color: C.blue }} />
                <h4 className="text-xl font-display font-semibold">Ablation table across n variants</h4>
              </div>
              <div className="overflow-hidden rounded-xl border" style={{ borderColor: C.line }}>
                <table className="w-full text-left text-xs">
                  <thead style={{ backgroundColor: C.ground2 }}>
                    <tr className="font-mono uppercase" style={{ color: C.muted }}>
                      <th className="p-3">variant</th>
                      <th className="p-3">params</th>
                      <th className="p-3">isic dice</th>
                      <th className="p-3">interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ablations.map(([variant, params, dice, note]) => (
                      <tr key={variant} className="border-t" style={{ borderColor: C.line, backgroundColor: variant === 'HTAN_2 n=2' ? C.greenSoft : 'transparent' }}>
                        <td className="p-3 font-semibold">{variant}</td>
                        <td className="p-3 font-mono">{params}</td>
                        <td className="p-3 font-mono font-bold">{dice}</td>
                        <td className="p-3" style={{ color: C.muted }}>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-5 rounded-[24px] border p-5" style={{ backgroundColor: C.card, borderColor: C.line }}>
              <div className="mb-4 flex items-center gap-2">
                <Table2 className="h-5 w-5" style={{ color: C.green }} />
                <div>
                  <h4 className="text-xl font-display font-semibold">TransAttUnet paper ablation</h4>
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: C.faint }}>Research paper 1, Table VI</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border" style={{ borderColor: C.line }}>
                <table className="w-full text-left text-[11px]">
                  <thead style={{ backgroundColor: C.ground2 }}>
                    <tr className="font-mono uppercase" style={{ color: C.muted }}>
                      <th className="p-2.5">method</th>
                      <th className="p-2.5 text-right">skin</th>
                      <th className="p-2.5 text-right">lung</th>
                      <th className="p-2.5 text-right">pneu.</th>
                      <th className="p-2.5 text-right">bowl</th>
                      <th className="p-2.5 text-right">gland</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transAttUnetPaperAblations.map(([method, skin, lung, pneu, bowl, gland]) => (
                      <tr key={method} className="border-t" style={{ borderColor: C.line, backgroundColor: method === 'TransAttUnet' ? C.greenSoft : 'transparent' }}>
                        <td className="p-2.5 font-semibold">{method}</td>
                        {[skin, lung, pneu, bowl, gland].map((value, index) => (
                          <td key={`${method}-${index}`} className="p-2.5 text-right font-mono font-bold" style={{ color: method === 'TransAttUnet' ? C.green : C.inkSoft }}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed" style={{ color: C.muted }}>
                TSA is transformer self-attention, GSA is global spatial attention, MSC is multi-scale skip connection, and TAU is the full TransAttUnet model.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border p-7 md:p-10" style={{ backgroundColor: C.card, borderColor: C.line }}>
          <div className="mb-8 flex flex-col gap-5 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow text="computer vision reveal page" variant="coral" />
              <h3 className="mt-4 text-4xl font-display font-light leading-tight">Final benchmark board</h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: C.muted }}>
              Click a dataset name to reveal the detailed model table for that benchmark.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {revealTables.map((table) => (
              <button
                key={table.id}
                onClick={() => setActiveRevealDataset(table.id)}
                className="rounded-[24px] border p-5 text-left transition-all"
                style={{
                  backgroundColor: activeRevealDataset === table.id ? C.coralSoft : C.ground2,
                  borderColor: activeRevealDataset === table.id ? C.coral : C.line,
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: activeRevealDataset === table.id ? C.coralDeep : C.faint }}>
                  clickable database
                </span>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <h4 className="text-2xl font-display font-semibold" style={{ color: C.ink }}>{table.name}</h4>
                    <p className="mt-1 text-xs font-mono uppercase tracking-wider" style={{ color: C.muted }}>{table.winner}</p>
                  </div>
                  <span className="font-mono text-3xl font-bold" style={{ color: C.coralDeep }}>{table.best}</span>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRevealTable.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="mt-6"
            >
              <div className="overflow-hidden rounded-[24px] border" style={{ borderColor: C.line }}>
                <table className="w-full text-left text-xs">
                  <thead style={{ backgroundColor: C.ground2 }}>
                    <tr className="font-mono uppercase tracking-wider" style={{ color: C.muted }}>
                      <th className="p-3">model</th>
                      {selectedRevealTable.columns.map((column) => (
                        <th key={column} className="p-3 text-right">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRevealTable.rows.map((row) => (
                      <tr
                        key={row.model}
                        className="border-t"
                        style={{
                          borderColor: C.line,
                          backgroundColor: row.highlight === 'ours' ? C.greenSoft : row.highlight === 'baseline' ? C.blueSoft : row.highlight === 'external' ? C.coralSoft : 'transparent',
                        }}
                      >
                        <td className="p-3 font-semibold" style={{ color: row.highlight === 'ours' ? C.green : C.ink }}>{row.model}</td>
                        {row.values.map((value, index) => (
                          <td key={`${row.model}-${value}-${index}`} className="p-3 text-right font-mono font-bold" style={{ color: row.highlight === 'ours' && index === 0 ? C.green : C.inkSoft }}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rounded-[32px] border p-7 md:p-10" style={{ backgroundColor: '#111112', borderColor: '#242428', color: 'white' }}>
          <div className="mb-8 flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow text="real visual predictions" variant="blue" />
              <h3 className="mt-4 text-4xl font-display font-light">Model outputs from the handoff PDF</h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
              Each grid shows the original input, ground truth, TransAttUNet_R* baseline, and the HTAN prediction exported from the paper handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {visualPredictionAssets.map((item) => (
              <div key={item.dataset} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{item.dataset}</span>
                  <ScanLine className="h-4 w-4 text-neutral-500" />
                </div>
                <img src={item.src} alt={`${item.dataset} visual predictions from HTAN handoff PDF`} className="h-[330px] w-full rounded-2xl border border-white/10 bg-white object-cover object-top" />
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-300">
                  <ScanLine className="h-4 w-4" style={{ color: C.green }} />
                  <span>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border p-7 md:p-10" style={{ backgroundColor: C.card, borderColor: C.line }}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 text-left">
              <Eyebrow text="draft 1 showcase" variant="green" />
              <h3 className="mt-5 text-5xl font-display font-light leading-tight">Scan the QR code to open the first working showcase.</h3>
            </div>
            <div className="lg:col-span-6">
              <div className="mx-auto max-w-md rounded-[32px] border bg-white p-6 shadow-lg" style={{ borderColor: C.line }}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: C.faint }}>mobile handoff</span>
                    <h4 className="mt-2 text-2xl font-display font-semibold" style={{ color: C.ink }}>Draft 1 Showcase</h4>
                  </div>
                  <QrCode className="h-8 w-8" style={{ color: C.green }} />
                </div>
                <img src={draftQrCode} alt="Draft 1 Showcase QR code" className="w-full rounded-2xl border object-contain" style={{ borderColor: C.line }} />
                <div className="mt-5 flex items-center gap-2 rounded-2xl border p-4 text-sm font-semibold" style={{ borderColor: C.line, color: C.ink, backgroundColor: C.ground2 }}>
                  <Eye className="h-5 w-5" style={{ color: C.blue }} />
                  <span>Open the live prototype after the benchmark reveal.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
