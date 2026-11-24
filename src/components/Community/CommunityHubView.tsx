import React from 'react';
import { Users, Share2, Heart } from 'lucide-react';
import { SustainableAlternative, UserContext } from '../../types';
import { AlternativeCard } from './AlternativeCard';

interface CommunityHubViewProps {
  alternatives: SustainableAlternative[];
  onToggleAlternative: (id: string) => void;
  onOpenBulletin: () => void;
  context: UserContext;
}

const CommunityHeaderCallout: React.FC<{ onOpenBulletin: () => void }> = ({ onOpenBulletin }) => (
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
);

const CommunityPledgeBanner: React.FC<{ adoptedCount: number; totalCount: number }> = ({
  adoptedCount,
  totalCount,
}) => (
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
      Your Adopted Swaps: <strong className="text-white">{adoptedCount} of {totalCount}</strong>
    </div>
  </div>
);

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
      <CommunityHeaderCallout onOpenBulletin={onOpenBulletin} />
      <CommunityPledgeBanner adoptedCount={adoptedCount} totalCount={alternatives.length} />

      <div className="grid grid-cols-1 gap-5">
        {alternatives.map((alt) => (
          <AlternativeCard key={alt.id} alt={alt} onToggle={onToggleAlternative} />
        ))}
      </div>
    </div>
  );
};
