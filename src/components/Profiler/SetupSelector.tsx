import React from 'react';
import { Car } from 'lucide-react';
import { CommuteCookingSetup } from '../../types';
import { SETUP_PROFILES } from '../../data/urbanProfiles';

interface SetupSelectorProps {
  setup: CommuteCookingSetup;
  onChange: (setup: CommuteCookingSetup) => void;
}

const SETUP_META: Record<CommuteCookingSetup, { cooking: string; transit: string }> = {
  'gas-petrol': { cooking: 'Gas Stove', transit: 'Solo Petrol' },
  'induction-metro': { cooking: 'Induction', transit: 'Metro Rail' },
  'budget-renter': { cooking: 'Standard Stove', transit: 'Passive / Walk' },
  'balcony-courtyard': { cooking: 'Ventilated Kitchen', transit: 'Mixed Commute' },
};

export const SetupSelector: React.FC<SetupSelectorProps> = ({ setup, onChange }) => {
  const meta = SETUP_META[setup];

  return (
    <div className="relative">
      <label htmlFor="cooking-transit-select" className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
        <Car className="w-3 h-3 text-amber-400" />
        Cooking & Transit Setup
      </label>
      <select
        id="cooking-transit-select"
        aria-label="Select Cooking and Commute Baseline Setup"
        value={setup}
        onChange={(e) => onChange(e.target.value as CommuteCookingSetup)}
        className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-100 text-xs font-medium rounded-lg border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer appearance-none"
      >
        {Object.values(SETUP_PROFILES).map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="text-amber-300">{meta.cooking}</span>
        <span className="text-slate-400">{meta.transit}</span>
      </div>
    </div>
  );
};
