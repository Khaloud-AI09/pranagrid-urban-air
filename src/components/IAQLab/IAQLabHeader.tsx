import React from 'react';
import { Wrench, Sparkles } from 'lucide-react';

interface IAQLabHeaderProps {
  activeCount: number;
  totalCount: number;
  onOpenCRLab: () => void;
  onActivateAll: () => void;
}

export const IAQLabHeader: React.FC<IAQLabHeaderProps> = ({
  activeCount,
  totalCount,
  onOpenCRLab,
  onActivateAll,
}) => (
  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/20 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5" />IAQ Hacks & DIY Lab
        </span>
      </div>
      <h3 className="text-lg font-bold text-white tracking-tight">Science-Backed Indoor Air Quality Hacks</h3>
      <p className="text-xs text-slate-400">Field-tested interventions ranging from zero-cost mopping physics to open-hardware MERV-13 air cleaner builds.</p>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onOpenCRLab}
        aria-label="Open Corsi-Rosenthal Air Cleaner Lab"
        className="px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Open Corsi-Rosenthal Lab</span>
      </button>

      <button
        onClick={onActivateAll}
        aria-label="Activate all indoor air quality hacks"
        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shadow-lg shadow-emerald-500/20"
      >
        Activate All Hacks ({activeCount}/{totalCount})
      </button>
    </div>
  </div>
);
