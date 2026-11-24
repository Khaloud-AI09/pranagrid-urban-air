import React from 'react';
import { Sparkles } from 'lucide-react';
import { UserContext } from '../types';
import { ZoneSelector } from './Profiler/ZoneSelector';
import { HouseholdSelector } from './Profiler/HouseholdSelector';
import { SetupSelector } from './Profiler/SetupSelector';

interface ProfilerBarProps {
  context: UserContext;
  onContextChange: (newContext: Partial<UserContext>) => void;
}

/**
 * Interactive context profiler bar tailoring AI recommendations to user demographics and atmospheric zones
 */
export const ProfilerBar: React.FC<ProfilerBarProps> = ({ context, onContextChange }) => {
  return (
    <section className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5" aria-label="Lifestyle & Atmospheric Context Profiler">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <ZoneSelector zone={context.zone} onChange={(zone) => onContextChange({ zone })} />
            <HouseholdSelector household={context.household} onChange={(household) => onContextChange({ household })} />
            <SetupSelector setup={context.setup} onChange={(setup) => onContextChange({ setup })} />
          </div>

        </div>
      </div>
    </section>
  );
};
