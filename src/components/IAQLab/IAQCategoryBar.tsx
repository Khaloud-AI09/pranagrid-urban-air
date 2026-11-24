import React from 'react';
import { Shield, Wrench, Droplets } from 'lucide-react';

export type HackCategory = 'all' | 'zero-cost' | 'low-budget-diy' | 'bio-filtration';

interface IAQCategoryBarProps {
  selected: HackCategory;
  onSelect: (cat: HackCategory) => void;
  totalCount: number;
}

export const IAQCategoryBar: React.FC<IAQCategoryBarProps> = ({ selected, onSelect, totalCount }) => (
  <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3" role="tablist" aria-label="Filter Hacks by Category">
    <button
      role="tab"
      aria-selected={selected === 'all'}
      onClick={() => onSelect('all')}
      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selected === 'all' ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
    >
      All Interventions ({totalCount})
    </button>
    <button
      role="tab"
      aria-selected={selected === 'zero-cost'}
      onClick={() => onSelect('zero-cost')}
      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${selected === 'zero-cost' ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'}`}
    >
      <Shield className="w-3 h-3 text-emerald-400" />
      Zero-Cost Behavioral
    </button>
    <button
      role="tab"
      aria-selected={selected === 'low-budget-diy'}
      onClick={() => onSelect('low-budget-diy')}
      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${selected === 'low-budget-diy' ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'}`}
    >
      <Wrench className="w-3 h-3 text-indigo-400" />
      Low-Budget DIY Engineering
    </button>
    <button
      role="tab"
      aria-selected={selected === 'bio-filtration'}
      onClick={() => onSelect('bio-filtration')}
      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${selected === 'bio-filtration' ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/40' : 'text-slate-400 hover:text-slate-200'}`}
    >
      <Droplets className="w-3 h-3 text-teal-400" />
      Bio-Filtration & Moisture
    </button>
  </div>
);
