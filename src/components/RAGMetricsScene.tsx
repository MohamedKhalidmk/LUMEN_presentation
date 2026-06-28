import React, { useState } from 'react';
import { Activity, BarChart3, CheckCircle2, Clock, Gauge, ShieldCheck, Sigma } from 'lucide-react';

type DiseaseRow = {
  disease: string;
  relevance: string;
  coverage: string;
  faithfulness: string;
  avg: string;
  highlight?: boolean;
};

type TableMode = 'disease' | 'answer' | 'latency' | 'ablation' | 'hallucination';

const qualityMetrics = [
  {
    metric: 'Overall RAG Score',
    score: '0.938',
    label: 'Excellent',
    desc: 'Mean of relevance, coverage, and faithfulness.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    metric: 'Context Relevance',
    score: '0.909',
    label: 'Query to chunks',
    desc: 'Retrieved chunks match the clinical question.',
    color: 'text-[#0071E3] bg-blue-50 border-blue-100',
  },
  {
    metric: 'Context Coverage',
    score: '0.952',
    label: 'Answer to chunks',
    desc: 'The retrieved evidence covers the generated answer.',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  },
  {
    metric: 'Faithfulness',
    score: '0.952',
    label: 'Grounded answer',
    desc: 'The answer stays inside the retrieved context.',
    color: 'text-violet-600 bg-violet-50 border-violet-100',
  },
];

const diseaseRows: DiseaseRow[] = [
  { disease: 'Multiple Myeloma', relevance: '0.909', coverage: '0.952', faithfulness: '0.952', avg: '0.937' },
  { disease: 'Melanoma', relevance: '0.908', coverage: '0.956', faithfulness: '0.956', avg: '0.940' },
  { disease: 'Skin Cancer', relevance: '0.911', coverage: '0.949', faithfulness: '0.949', avg: '0.936' },
  { disease: 'Overall', relevance: '0.909', coverage: '0.952', faithfulness: '0.952', avg: '0.938', highlight: true },
];

const answerRows = [
  ['ROUGE-1', '0.228', 'Word overlap is low because answers are abstractive.'],
  ['ROUGE-2', '0.074', 'Bigram overlap.'],
  ['ROUGE-L', '0.160', 'Longest common subsequence.'],
  ['BERTScore F1', '0.823', 'Primary answer-quality metric for semantic alignment.'],
];

const latencyRows = [
  ['Retrieval only', '16.28s', '22.79s', '0.91s'],
  ['Full pipeline + Claude Sonnet', '20.64s', '29.25s', '7.99s'],
];

const ablationRows = [
  ['Full pipeline', '0.953', 'baseline'],
  ['Without MedCPT cross-encoder', '0.937', '-0.016'],
  ['Without query rewriter', '0.953', 'no drop on subset'],
  ['Without multi-query expansion', '0.953', 'no drop on subset'],
  ['Without context compression', '0.953', 'no drop on subset'],
  ['BM25 only, alpha = 0', '0.953', 'no drop on subset'],
  ['Dense only, alpha = 1', '0.953', 'no drop on subset'],
];

const hallucinationRows = [
  ['True claims correctly passed', '7 / 7', '100%'],
  ['False claims caught by embedding', '0 / 7', '0%'],
  ['Primary hallucination method', 'PMID citation grounding', 'source verification'],
];

const comparisonRows = [
  ['LLM only', 'No retrieval', 'No citations', 'Highest risk'],
  ['BM25 only', 'Keyword match', 'Can miss semantic matches', 'Useful baseline'],
  ['Dense only', 'Vector match', 'Can miss exact biomedical terms', 'Useful baseline'],
  ['Full MediLink RAG', 'Hybrid + MedCPT + citations', 'PMID-grounded answers', 'Best defended system'],
];

function MetricTable({ mode }: { mode: TableMode }) {
  if (mode === 'disease') {
    return (
      <table className="w-full text-left text-xs">
        <thead className="bg-neutral-100 text-neutral-500 font-mono uppercase">
          <tr>
            <th className="p-3">disease</th>
            <th className="p-3 text-right">relevance</th>
            <th className="p-3 text-right">coverage</th>
            <th className="p-3 text-right">faithfulness</th>
            <th className="p-3 text-right">avg</th>
          </tr>
        </thead>
        <tbody>
          {diseaseRows.map((row) => (
            <tr key={row.disease} className={`border-t border-neutral-200 ${row.highlight ? 'bg-emerald-50' : 'bg-white'}`}>
              <td className="p-3 font-semibold text-neutral-900">{row.disease}</td>
              <td className="p-3 text-right font-mono font-bold text-neutral-700">{row.relevance}</td>
              <td className="p-3 text-right font-mono font-bold text-neutral-700">{row.coverage}</td>
              <td className="p-3 text-right font-mono font-bold text-neutral-700">{row.faithfulness}</td>
              <td className={`p-3 text-right font-mono font-bold ${row.highlight ? 'text-emerald-700' : 'text-neutral-700'}`}>{row.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (mode === 'answer') {
    return (
      <table className="w-full text-left text-xs">
        <thead className="bg-neutral-100 text-neutral-500 font-mono uppercase">
          <tr>
            <th className="p-3">metric</th>
            <th className="p-3 text-right">score</th>
            <th className="p-3">note</th>
          </tr>
        </thead>
        <tbody>
          {answerRows.map(([metric, score, note]) => (
            <tr key={metric} className={`border-t border-neutral-200 ${metric === 'BERTScore F1' ? 'bg-blue-50' : 'bg-white'}`}>
              <td className="p-3 font-semibold text-neutral-900">{metric}</td>
              <td className={`p-3 text-right font-mono font-bold ${metric === 'BERTScore F1' ? 'text-[#0071E3]' : 'text-neutral-700'}`}>{score}</td>
              <td className="p-3 text-neutral-600">{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (mode === 'latency') {
    return (
      <table className="w-full text-left text-xs">
        <thead className="bg-neutral-100 text-neutral-500 font-mono uppercase">
          <tr>
            <th className="p-3">stage</th>
            <th className="p-3 text-right">mean</th>
            <th className="p-3 text-right">p95</th>
            <th className="p-3 text-right">min</th>
          </tr>
        </thead>
        <tbody>
          {latencyRows.map(([stage, mean, p95, min]) => (
            <tr key={stage} className="border-t border-neutral-200 bg-white">
              <td className="p-3 font-semibold text-neutral-900">{stage}</td>
              <td className="p-3 text-right font-mono font-bold text-neutral-700">{mean}</td>
              <td className="p-3 text-right font-mono font-bold text-neutral-700">{p95}</td>
              <td className="p-3 text-right font-mono font-bold text-emerald-700">{min}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (mode === 'ablation') {
    return (
      <table className="w-full text-left text-xs">
        <thead className="bg-neutral-100 text-neutral-500 font-mono uppercase">
          <tr>
            <th className="p-3">configuration</th>
            <th className="p-3 text-right">score</th>
            <th className="p-3 text-right">drop</th>
          </tr>
        </thead>
        <tbody>
          {ablationRows.map(([config, score, drop]) => (
            <tr key={config} className={`border-t border-neutral-200 ${config === 'Full pipeline' ? 'bg-emerald-50' : config.includes('MedCPT') ? 'bg-rose-50' : 'bg-white'}`}>
              <td className="p-3 font-semibold text-neutral-900">{config}</td>
              <td className="p-3 text-right font-mono font-bold text-neutral-700">{score}</td>
              <td className={`p-3 text-right font-mono font-bold ${drop.startsWith('-') ? 'text-rose-600' : 'text-neutral-500'}`}>{drop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <table className="w-full text-left text-xs">
      <thead className="bg-neutral-100 text-neutral-500 font-mono uppercase">
        <tr>
          <th className="p-3">finding</th>
          <th className="p-3 text-right">result</th>
          <th className="p-3 text-right">meaning</th>
        </tr>
      </thead>
      <tbody>
        {hallucinationRows.map(([finding, result, meaning]) => (
          <tr key={finding} className="border-t border-neutral-200 bg-white">
            <td className="p-3 font-semibold text-neutral-900">{finding}</td>
            <td className="p-3 text-right font-mono font-bold text-neutral-700">{result}</td>
            <td className="p-3 text-right text-neutral-600">{meaning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function RAGMetricsScene() {
  const [mode, setMode] = useState<TableMode>('disease');

  const modes: Array<{ id: TableMode; label: string; icon: React.ElementType }> = [
    { id: 'disease', label: 'Disease', icon: BarChart3 },
    { id: 'answer', label: 'Answer Quality', icon: Sigma },
    { id: 'latency', label: 'Latency', icon: Clock },
    { id: 'ablation', label: 'Ablation', icon: Gauge },
    { id: 'hallucination', label: 'Grounding', icon: ShieldCheck },
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none border-b border-[#D2D2D7]/40 overflow-hidden">
      <div className="absolute top-[10%] right-[-12%] w-[520px] h-[520px] bg-blue-50 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-12%] w-[520px] h-[520px] bg-emerald-50 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-9">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-left">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-mono text-[#0071E3] tracking-[0.25em] uppercase font-bold block mb-3">
              RAG Benchmark Results
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-light leading-[1.05] tracking-tight">
              Grounding measured across 30 clinical questions.
            </h2>
          </div>
          <div className="lg:col-span-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#0071E3]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">Benchmark setup</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              AWS EC2 g4dn.xlarge with T4 GPU. The benchmark covers 30 disease-specific questions across melanoma, skin cancer, and multiple myeloma.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {qualityMetrics.map((item) => (
            <div key={item.metric} className={`rounded-2xl border p-5 ${item.color}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-70">{item.metric}</span>
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <div className="mt-5 flex items-end gap-2">
                <span className="font-mono text-4xl font-bold leading-none">{item.score}</span>
                <span className="text-xs font-mono font-bold uppercase pb-1">{item.label}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-3xl border border-neutral-200 bg-[#FAF9FB] p-5 md:p-6 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-5">
              {modes.map((item) => {
                const Icon = item.icon;
                const active = mode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                      active
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <MetricTable mode={mode} />
            </div>

            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#0071E3] font-bold">How to explain the comparison</span>
              <p className="mt-2 text-sm leading-relaxed text-blue-900">
                The strongest comparison is not against a generic chatbot. It is against our own weaker RAG variants: BM25-only, dense-only, without MedCPT, and full MediLink RAG with citation grounding.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-display font-semibold">What should we compare it with?</h3>
              <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-neutral-100 text-neutral-500 font-mono uppercase">
                    <tr>
                      <th className="p-3">baseline</th>
                      <th className="p-3">method</th>
                      <th className="p-3">risk</th>
                      <th className="p-3">use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map(([system, method, weakness, verdict]) => (
                      <tr key={system} className={`border-t first:border-t-0 border-neutral-200 ${system === 'Full MediLink RAG' ? 'bg-emerald-50' : 'bg-white'}`}>
                        <td className="p-3 font-semibold text-neutral-900">{system}</td>
                        <td className="p-3 text-neutral-600">{method}</td>
                        <td className="p-3 text-neutral-500">{weakness}</td>
                        <td className="p-3 text-neutral-500">{verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">Important caveat</span>
              <p className="mt-3 text-sm leading-relaxed text-amber-900">
                Chunk diversity is 0.104 and should be reported separately. In a focused biomedical corpus after MedCPT reranking, low diversity means semantic consistency, not automatic failure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
