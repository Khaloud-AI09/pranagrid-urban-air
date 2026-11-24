import React, { useState } from 'react';
import { ShieldCheck, Atom, TrendingDown, Check, Copy, Sparkles, PlusCircle } from 'lucide-react';
import { StructuredAIOutput } from '../../services/geminiService';

interface ResponseCardProps {
  data: StructuredAIOutput;
  onAdoptSwaps?: () => void;
}

const ResponseCardHeader: React.FC<{ data: StructuredAIOutput; copied: boolean; onCopy: () => void }> = ({ data, copied, onCopy }) => (
  <div className="flex items-start justify-between gap-3">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Sparkles className="w-3 h-3" />{data.category}
        </span>
        <span className="text-[11px] text-slate-400 font-mono">InversionOS Structured Reasoning</span>
      </div>
      <h4 className="text-base font-bold text-white tracking-tight">{data.headline}</h4>
    </div>
    <button onClick={onCopy} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors shrink-0" title="Copy Card">
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </button>
  </div>
);

const ResponseActionPlan: React.FC<{ plan: string[] }> = ({ plan }) => (
  <div className="space-y-2">
    <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />Tailored Action Plan
    </h5>
    <div className="space-y-2">
      {plan.map((step, idx) => (
        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{idx + 1}</span>
          <p className="leading-relaxed">{step}</p>
        </div>
      ))}
    </div>
  </div>
);

const ResponseScienceBox: React.FC<{ science: string }> = ({ science }) => (
  <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
    <h5 className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
      <Atom className="w-3.5 h-3.5 text-indigo-400" />Atmospheric & Health Science: Why It Works
    </h5>
    <p className="text-xs text-slate-300 leading-relaxed">{science}</p>
  </div>
);

const ResponseImpactBadges: React.FC<{ data: StructuredAIOutput; adopted: boolean; onAdopt?: () => void }> = ({ data, adopted, onAdopt }) => (
  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5" />{data.quantifiedBadge.pmReduction}</span>
      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-500/40">{data.quantifiedBadge.co2Cut}</span>
      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-teal-500/15 text-teal-300 border border-teal-500/40">{data.quantifiedBadge.cleanWindow}</span>
      {data.quantifiedBadge.costMetric && <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40">{data.quantifiedBadge.costMetric}</span>}
    </div>
    {onAdopt && (
      <button onClick={onAdopt} disabled={adopted} className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${adopted ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-emerald-500/20'}`}>
        {adopted ? <><Check className="w-3.5 h-3.5 text-emerald-400" />Applied to Live Impact</> : <><PlusCircle className="w-3.5 h-3.5" />Adopt Recommendations</>}
      </button>
    )}
  </div>
);

export const ResponseCard: React.FC<ResponseCardProps> = ({ data, onAdoptSwaps }) => {
  const [copied, setCopied] = useState(false);
  const [adopted, setAdopted] = useState(false);

  const handleCopy = () => {
    const text = `${data.headline}\n\nACTION PLAN:\n${data.actionPlan.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nATMOSPHERIC SCIENCE:\n${data.whyItWorksScience}\n\nIMPACT BADGE:\n${data.quantifiedBadge.pmReduction} | ${data.quantifiedBadge.co2Cut} | ${data.quantifiedBadge.cleanWindow}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdopt = () => {
    setAdopted(true);
    if (onAdoptSwaps) onAdoptSwaps();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4 transition-all duration-300 hover:border-emerald-500/40">
      <ResponseCardHeader data={data} copied={copied} onCopy={handleCopy} />
      <ResponseActionPlan plan={data.actionPlan} />
      <ResponseScienceBox science={data.whyItWorksScience} />
      <ResponseImpactBadges data={data} adopted={adopted} onAdopt={onAdoptSwaps ? handleAdopt : undefined} />
    </div>
  );
};
