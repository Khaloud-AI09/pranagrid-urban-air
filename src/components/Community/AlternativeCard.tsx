import React from 'react';
import { Users, Check, Zap } from 'lucide-react';
import { SustainableAlternative } from '../../types';

interface AlternativeCardProps {
  alt: SustainableAlternative;
  onToggle: (id: string) => void;
}

const BaselineChoiceCol: React.FC<{ alt: SustainableAlternative }> = ({ alt }) => (
  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
    <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      Conventional Baseline Practice
    </div>
    <h5 className="text-xs font-bold text-slate-200">{alt.baselineChoice.title}</h5>
    <p className="text-xs text-slate-400 leading-relaxed">{alt.baselineChoice.pmContribution}</p>
    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span>Emissions: <strong className="text-rose-300">{alt.baselineChoice.monthlyEmissionsKg} kg CO₂/mo</strong></span>
      <span>Cost: <strong className="text-slate-300">₹{alt.baselineChoice.monthlyCostINR}/mo</strong></span>
    </div>
  </div>
);

const SustainableChoiceCol: React.FC<{ alt: SustainableAlternative; isAdopted: boolean }> = ({ alt, isAdopted }) => (
  <div className={`p-3.5 rounded-xl border space-y-2 ${isAdopted ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/60'}`}>
    <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      Sustainable Systemic Alternative
    </div>
    <h5 className="text-xs font-bold text-white">{alt.sustainableSwap.title}</h5>
    <p className="text-xs text-slate-200 leading-relaxed font-medium">{alt.sustainableSwap.pmBenefit}</p>
    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
      <span className="text-emerald-300 font-semibold">Save: -{alt.sustainableSwap.netCO2ReductionKg} kg CO₂/mo</span>
      <span className="text-emerald-300 font-semibold">Net: ₹{alt.sustainableSwap.netSavingsINR >= 0 ? `+${alt.sustainableSwap.netSavingsINR}` : alt.sustainableSwap.netSavingsINR}/mo</span>
    </div>
  </div>
);

export const AlternativeCard: React.FC<AlternativeCardProps> = ({ alt, onToggle }) => {
  const isAdopted = alt.isAdopted;

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 ${isAdopted ? 'bg-emerald-950/20 border-emerald-500/50 shadow-xl shadow-emerald-500/5' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-slate-800/80">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
            {alt.category}
          </span>
          <h4 className="text-sm font-bold text-white tracking-tight mt-1">{alt.title}</h4>
        </div>

        <button
          onClick={() => onToggle(alt.id)}
          aria-label={`${isAdopted ? 'Revoke adoption of' : 'Adopt'} ${alt.title}`}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-center ${isAdopted ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'}`}
        >
          {isAdopted ? <><Check className="w-3.5 h-3.5" /><span>Adopted Alternative</span></> : <><Zap className="w-3.5 h-3.5 text-amber-400" /><span>Adopt Alternative</span></>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaselineChoiceCol alt={alt} />
        <SustainableChoiceCol alt={alt} isAdopted={isAdopted} />
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-indigo-300/90 bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-900/30">
        <Users className="w-4 h-4 text-indigo-400 shrink-0" />
        <span className="text-[11px] leading-relaxed"><strong>Community Multiplier: </strong>{alt.communityImpact}</span>
      </div>
    </div>
  );
};
