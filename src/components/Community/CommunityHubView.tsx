import React from 'react';
import { Users, Share2, Check, Zap, Heart } from 'lucide-react';
import { SustainableAlternative, UserContext } from '../../types';

interface CommunityHubViewProps {
  alternatives: SustainableAlternative[];
  onToggleAlternative: (id: string) => void;
  onOpenBulletin: () => void;
  context: UserContext;
}

/**
 * Community Action Hub offering systemic alternatives for mobility, cooking fuels, and neighborhood vigils
 */
export const CommunityHubView: React.FC<CommunityHubViewProps> = ({
  alternatives,
  onToggleAlternative,
  onOpenBulletin,
}) => {
  const adoptedCount = alternatives.filter(a => a.isAdopted).length;

  return (
    <div className="space-y-6">
      
      {/* Intro & Action Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-emerald-950/20 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Sustainable Alternatives & Community Action Hub
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Collective Clean Air Choices & Neighborhood Vigil
          </h3>
          <p className="text-xs text-slate-400">
            Air is a shared fluid resource. Explore systemic mobility swaps, combustion substitutes, and citizen RWA interventions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBulletin}
            aria-label="Create Community WhatsApp and RWA Advisory"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Share2 className="w-4 h-4" />
            <span>Create WhatsApp Advisory</span>
          </button>
        </div>
      </div>

      {/* Community Smog Defense Pledge Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20 shrink-0">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-200">Community Clean-Air Pledges Active: </span>
            <span className="font-mono text-emerald-400 font-bold">1,482 Urban Households</span>
            <div className="text-[11px] text-slate-400">Pledged zero open leaf/waste burning, school carpooling, and shared transit.</div>
          </div>
        </div>

        <div className="font-mono text-[11px] text-indigo-300 bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-500/30 shrink-0">
          Your Adopted Swaps: <strong className="text-white">{adoptedCount} of {alternatives.length}</strong>
        </div>
      </div>

      {/* Side-by-Side Alternatives Grid */}
      <div className="grid grid-cols-1 gap-5">
        {alternatives.map((alt) => {
          const isAdopted = alt.isAdopted;

          return (
            <div
              key={alt.id}
              className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 ${
                isAdopted
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-xl shadow-emerald-500/5'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-slate-800/80">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    {alt.category}
                  </span>
                  <h4 className="text-sm font-bold text-white tracking-tight mt-1">
                    {alt.title}
                  </h4>
                </div>

                <button
                  onClick={() => onToggleAlternative(alt.id)}
                  aria-label={`${isAdopted ? 'Revoke adoption of' : 'Adopt'} ${alt.title}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-center ${
                    isAdopted
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {isAdopted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Adopted Alternative</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Adopt Alternative</span>
                    </>
                  )}
                </button>
              </div>

              {/* Side-by-Side Comparison Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Baseline Conventional Choice */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    Conventional Baseline Practice
                  </div>
                  <h5 className="text-xs font-bold text-slate-200">
                    {alt.baselineChoice.title}
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {alt.baselineChoice.pmContribution}
                  </p>
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Emissions: <strong className="text-rose-300">{alt.baselineChoice.monthlyEmissionsKg} kg CO₂/mo</strong></span>
                    <span>Cost: <strong className="text-slate-300">₹{alt.baselineChoice.monthlyCostINR}/mo</strong></span>
                  </div>
                </div>

                {/* Sustainable Alternative Swap */}
                <div className={`p-3.5 rounded-xl border space-y-2 ${
                  isAdopted ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/60'
                }`}>
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Sustainable Systemic Alternative
                  </div>
                  <h5 className="text-xs font-bold text-white">
                    {alt.sustainableSwap.title}
                  </h5>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {alt.sustainableSwap.pmBenefit}
                  </p>
                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-300 font-semibold">
                      Save: -{alt.sustainableSwap.netCO2ReductionKg} kg CO₂/mo
                    </span>
                    <span className="text-emerald-300 font-semibold">
                      Net: ₹{alt.sustainableSwap.netSavingsINR >= 0 ? `+${alt.sustainableSwap.netSavingsINR}` : alt.sustainableSwap.netSavingsINR}/mo
                    </span>
                  </div>
                </div>

              </div>

              {/* Community Collective Impact Footnote */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-indigo-300/90 bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-900/30">
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Community Multiplier: </strong>{alt.communityImpact}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
