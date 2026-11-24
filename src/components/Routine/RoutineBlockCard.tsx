import React from 'react';
import { Check, ShieldCheck, AlertOctagon, TrendingDown, Clock, Zap } from 'lucide-react';
import { RoutineBlock } from '../../types';

interface RoutineBlockCardProps {
  block: RoutineBlock;
  onToggleAdopt: (id: string) => void;
}

const RoutineCardHeader: React.FC<{ block: RoutineBlock; isAdopted: boolean; onToggle: () => void }> = ({ block, isAdopted, onToggle }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-slate-800/80">
    <div className="flex items-center gap-3">
      <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700">{block.timeRange}</span>
      <h4 className="text-sm font-bold text-white tracking-tight">{block.title}</h4>
    </div>
    <div className="flex items-center gap-2">
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 ${block.phaseRiskLevel === 'Hazardous' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : block.phaseRiskLevel === 'Caution' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'}`}>
        {block.phaseRiskLevel === 'Hazardous' && <AlertOctagon className="w-3 h-3 text-rose-400" />}
        {block.phaseRiskLevel === 'Favorable' && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
        <span>{block.boundaryLayerPhase}</span>
      </span>
      <button
        onClick={onToggle}
        aria-label={`${isAdopted ? 'Revoke adoption of' : 'Adopt'} ${block.title} routine swap`}
        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${isAdopted ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'}`}
      >
        {isAdopted ? <><Check className="w-3.5 h-3.5" /><span>Adopted</span></> : <><Zap className="w-3.5 h-3.5 text-amber-400" /><span>Adopt Swap</span></>}
      </button>
    </div>
  </div>
);

const RoutineComparisonGrid: React.FC<{ block: RoutineBlock; isAdopted: boolean }> = ({ block, isAdopted }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-400/90 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" />High-Emission Default Habit</div>
      <p className="text-xs text-slate-300 leading-relaxed font-medium">{block.highEmissionDefault.action}</p>
      <div className="text-[11px] text-rose-300/80 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30 space-y-0.5">
        <div><strong>Impact:</strong> {block.highEmissionDefault.pmImpact}</div>
        <div className="text-rose-400/70">{block.highEmissionDefault.emissionFootprint}</div>
      </div>
    </div>

    <div className={`p-3.5 rounded-xl border space-y-2 ${isAdopted ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/60'}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />AI-Recommended Low-Emission Swap</div>
      <p className="text-xs text-slate-100 leading-relaxed font-medium">{block.aiRecommendedSwap.action}</p>
      <div className="text-[11px] text-slate-300 bg-slate-900/70 p-2 rounded-lg border border-slate-700/60">
        <span className="text-emerald-300 font-semibold">Science: </span>{block.aiRecommendedSwap.scientificRationale}
      </div>
    </div>
  </div>
);

const RoutineImpactGainsRow: React.FC<{ block: RoutineBlock }> = ({ block }) => (
  <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
    <div className="flex flex-wrap items-center gap-2">
      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"><TrendingDown className="w-3 h-3" />-{block.aiRecommendedSwap.pmReductionPercent}% PM2.5 Exposure</span>
      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-blue-300 bg-blue-500/15 border border-blue-500/30">-{block.aiRecommendedSwap.co2SavedKg} kg CO₂/day</span>
      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-teal-300 bg-teal-500/15 border border-teal-500/30 flex items-center gap-1"><Clock className="w-3 h-3" />+{block.aiRecommendedSwap.cleanTimeGainedHours} hrs Safe Lungs</span>
    </div>
    <div className="text-[11px] text-slate-400 font-mono">
      Saved Mass: <span className="text-emerald-400 font-bold">~{block.aiRecommendedSwap.exposureSavedUg} µg PM2.5/day</span>
    </div>
  </div>
);

export const RoutineBlockCard: React.FC<RoutineBlockCardProps> = ({ block, onToggleAdopt }) => {
  const isAdopted = block.isAdopted;

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${isAdopted ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}>
      <RoutineCardHeader block={block} isAdopted={isAdopted} onToggle={() => onToggleAdopt(block.id)} />
      <RoutineComparisonGrid block={block} isAdopted={isAdopted} />
      <RoutineImpactGainsRow block={block} />
    </div>
  );
};
