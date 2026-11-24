import React from 'react';
import { Wind, Settings, Share2 } from 'lucide-react';
import { SmogSeverityLevel, SmogSeverityData, UrbanZoneProfile } from '../types';
import { SMOG_SEVERITIES } from '../data/urbanProfiles';
import { AtmosphericStatusPill } from './Header/AtmosphericStatusPill';
import { SmogSeveritySelector } from './Header/SmogSeveritySelector';
import { HeaderActionButtons } from './Header/HeaderActionButtons';

interface HeaderProps {
  currentSeverity: SmogSeverityLevel;
  onSeverityChange: (severity: SmogSeverityLevel) => void;
  activeZone: UrbanZoneProfile;
  onOpenSettings: () => void;
  onOpenBulletin: () => void;
}

const HeaderLogo: React.FC = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <Wind className="w-5 h-5 text-slate-950 font-bold" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B1120] animate-pulse" />
    </div>

    <div>
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
          <span>PranaGrid</span>
          <span className="text-slate-500 text-sm font-normal">/</span>
          <span className="text-emerald-400 font-mono text-base">InversionOS</span>
        </h1>
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          GenAI Urban Air
        </span>
      </div>
      <p className="text-xs text-slate-400 font-medium">
        Atmospheric Intelligence & Smog Co-Pilot
      </p>
    </div>
  </div>
);

/**
 * Top application header containing live atmospheric status, severity simulator, and settings triggers
 */
export const Header: React.FC<HeaderProps> = ({
  currentSeverity,
  onSeverityChange,
  activeZone: _activeZone,
  onOpenSettings,
  onOpenBulletin,
}) => {
  const severityData: SmogSeverityData = SMOG_SEVERITIES[currentSeverity];

  return (
    <header className="border-b border-slate-800/80 bg-[#0B1120]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          <div className="flex items-center justify-between">
            <HeaderLogo />

            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={onOpenBulletin}
                aria-label="Share Community Advisory"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-700 text-xs flex items-center gap-1"
                title="Share Community Advisory"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenSettings}
                aria-label="Open AI Engine Settings"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                title="AI Engine Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <AtmosphericStatusPill currentSeverity={currentSeverity} severityData={severityData} />
            <SmogSeveritySelector currentSeverity={currentSeverity} onSeverityChange={onSeverityChange} />
            <HeaderActionButtons onOpenSettings={onOpenSettings} onOpenBulletin={onOpenBulletin} />
          </div>

        </div>
      </div>
    </header>
  );
};
