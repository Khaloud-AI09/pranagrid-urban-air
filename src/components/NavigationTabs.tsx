import React from 'react';
import { Bot, Clock, Wrench, Users } from 'lucide-react';
import { RoutineBlock, IAQHack, SustainableAlternative } from '../types';

export type ActiveTab = 'copilot' | 'routine' | 'iaq' | 'community';

interface TabButtonProps {
  id: ActiveTab;
  isActive: boolean;
  label: string;
  icon: React.ReactNode;
  activeClass: string;
  countBadge?: string;
  hasPulse?: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  label,
  icon,
  activeClass,
  countBadge,
  hasPulse,
  onClick,
}) => (
  <button
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
      isActive ? activeClass : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    {icon}
    <span>{label}</span>
    {hasPulse && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
    {countBadge && (
      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
        {countBadge}
      </span>
    )}
  </button>
);

interface NavigationTabsProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  routines: RoutineBlock[];
  hacks: IAQHack[];
  alternatives: SustainableAlternative[];
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  routines,
  hacks,
  alternatives,
}) => {
  const adoptedRoutines = routines.filter(r => r.isAdopted).length;
  const checklistedHacks = hacks.filter(h => h.isChecklisted).length;
  const adoptedAlts = alternatives.filter(a => a.isAdopted).length;

  return (
    <div className="flex items-center space-x-2 border-b border-slate-800/80 mb-6 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Application Sections">
      <TabButton id="copilot" isActive={activeTab === 'copilot'} label="GenAI Smog Co-Pilot" icon={<Bot className="w-4 h-4 text-emerald-400" />} activeClass="bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm" hasPulse onClick={() => onSelectTab('copilot')} />
      <TabButton id="routine" isActive={activeTab === 'routine'} label="24h Daily Routine Optimizer" icon={<Clock className="w-4 h-4 text-cyan-400" />} activeClass="bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm" countBadge={adoptedRoutines > 0 ? `${adoptedRoutines}/5` : undefined} onClick={() => onSelectTab('routine')} />
      <TabButton id="iaq" isActive={activeTab === 'iaq'} label="Indoor Air Hacks & DIY Lab" icon={<Wrench className="w-4 h-4 text-indigo-400" />} activeClass="bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 shadow-sm" countBadge={checklistedHacks > 0 ? `${checklistedHacks}` : undefined} onClick={() => onSelectTab('iaq')} />
      <TabButton id="community" isActive={activeTab === 'community'} label="Sustainable Swaps & Community" icon={<Users className="w-4 h-4 text-teal-400" />} activeClass="bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm" countBadge={adoptedAlts > 0 ? `${adoptedAlts}` : undefined} onClick={() => onSelectTab('community')} />
    </div>
  );
};
