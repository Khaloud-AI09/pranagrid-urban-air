import React from 'react';
import { Users } from 'lucide-react';
import { HouseholdType } from '../../types';
import { HOUSEHOLD_PROFILES } from '../../data/urbanProfiles';

interface HouseholdSelectorProps {
  household: HouseholdType;
  onChange: (household: HouseholdType) => void;
}

export const HouseholdSelector: React.FC<HouseholdSelectorProps> = ({ household, onChange }) => {
  const currentHousehold = HOUSEHOLD_PROFILES[household];

  return (
    <div className="relative">
      <label htmlFor="household-profile-select" className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
        <Users className="w-3 h-3 text-emerald-400" />
        Household Profile
      </label>
      <select
        id="household-profile-select"
        aria-label="Select Household Vulnerability Profile"
        value={household}
        onChange={(e) => onChange(e.target.value as HouseholdType)}
        className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-100 text-xs font-medium rounded-lg border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer appearance-none"
      >
        {Object.values(HOUSEHOLD_PROFILES).map((hh) => (
          <option key={hh.id} value={hh.id}>
            {hh.label}
          </option>
        ))}
      </select>
      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="text-emerald-300">Sensitivity: {currentHousehold.sensitivityMultiplier}x</span>
        <span className="text-slate-400">{currentHousehold.vulnerableCount} at-risk</span>
      </div>
    </div>
  );
};
