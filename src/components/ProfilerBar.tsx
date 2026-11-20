import React from 'react';
import { MapPin, Users, Flame, Car, Info, Sparkles } from 'lucide-react';
import { UrbanZoneId, HouseholdType, CommuteCookingSetup, UserContext } from '../types';
import { URBAN_ZONE_PROFILES, HOUSEHOLD_PROFILES, SETUP_PROFILES } from '../data/urbanProfiles';

interface ProfilerBarProps {
  context: UserContext;
  onContextChange: (newContext: Partial<UserContext>) => void;
}

export const ProfilerBar: React.FC<ProfilerBarProps> = ({ context, onContextChange }) => {
  const currentZone = URBAN_ZONE_PROFILES[context.zone];
  const currentHousehold = HOUSEHOLD_PROFILES[context.household];
  const currentSetup = SETUP_PROFILES[context.setup];

  return (
    <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Quick Context Label */}
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Tailored Context Profiler:
            </span>
            <span className="hidden xl:inline text-slate-500">|</span>
            <span className="hidden xl:inline text-slate-400">
              Directly influences Co-Pilot intelligence, 24h routine swaps, and impact calculations
            </span>
          </div>

          {/* Profiler Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            {/* 1. Urban Zone Selector */}
            <div className="relative">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-400" />
                Atmospheric Zone
              </label>
              <select
                value={context.zone}
                onChange={(e) => onContextChange({ zone: e.target.value as UrbanZoneId })}
                className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-100 text-xs font-medium rounded-lg border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer appearance-none"
              >
                {Object.values(URBAN_ZONE_PROFILES).map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="text-indigo-300 truncate max-w-[170px]">{currentZone.badge}</span>
                <span className="text-slate-400">{currentZone.typicalTempRange}</span>
              </div>
            </div>

            {/* 2. Household Vulnerability Selector */}
            <div className="relative">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-emerald-400" />
                Household Profile
              </label>
              <select
                value={context.household}
                onChange={(e) => onContextChange({ household: e.target.value as HouseholdType })}
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

            {/* 3. Commute & Cooking Setup */}
            <div className="relative">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Car className="w-3 h-3 text-amber-400" />
                Cooking & Transit Setup
              </label>
              <select
                value={context.setup}
                onChange={(e) => onContextChange({ setup: e.target.value as CommuteCookingSetup })}
                className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-100 text-xs font-medium rounded-lg border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer appearance-none"
              >
                {Object.values(SETUP_PROFILES).map((setup) => (
                  <option key={setup.id} value={setup.id}>
                    {setup.label}
                  </option>
                ))}
              </select>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="text-amber-300">Base: {currentSetup.baselineMonthlyCO2kg} kg CO₂/mo</span>
                <span className="text-slate-400">~{currentSetup.baselinePMExposureUg} µg/d</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
