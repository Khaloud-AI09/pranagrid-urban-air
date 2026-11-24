import React from 'react';
import { Sparkles } from 'lucide-react';

interface CoPilotSmartChipsProps {
  chips: string[];
  isLoading: boolean;
  onSelect: (chip: string) => void;
}

export const CoPilotSmartChips: React.FC<CoPilotSmartChipsProps> = ({ chips, isLoading, onSelect }) => (
  <div className="space-y-2">
    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
      One-Click Smart Inquiries (Tailored to Your Active Profile):
    </div>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Smart Inquiry Chips">
      {chips.map((chip, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(chip)}
          disabled={isLoading}
          aria-label={`Ask smart prompt: ${chip}`}
          className="text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 rounded-xl px-3.5 py-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
        >
          <span className="text-emerald-400 font-mono text-[11px]">✦</span>
          <span>{chip}</span>
        </button>
      ))}
    </div>
  </div>
);
