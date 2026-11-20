import React from 'react';
import { Wind, Settings, AlertTriangle, Sparkles, Share2 } from 'lucide-react';
import { SmogSeverityLevel, SmogSeverityData, UrbanZoneProfile } from '../types';
import { SMOG_SEVERITIES } from '../data/urbanProfiles';
import { getStoredApiKey } from '../services/geminiService';

interface HeaderProps {
  currentSeverity: SmogSeverityLevel;
  onSeverityChange: (severity: SmogSeverityLevel) => void;
  activeZone: UrbanZoneProfile;
  onOpenSettings: () => void;
  onOpenBulletin: () => void;
}

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
  const hasApiKey = Boolean(getStoredApiKey());

  return (
    <header className="border-b border-slate-800/80 bg-[#0B1120]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Identity */}
          <div className="flex items-center justify-between">
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

            {/* Mobile Actions */}
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

          {/* Real-time Atmospheric Status & Smog Simulator Toggle */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            
            {/* Live AQI & Inversion Status Pill */}
            <div 
              aria-label={`Current Ambient AQI: ${severityData.aqi}, PM2.5: ${severityData.pm25} micrograms per cubic meter`}
              className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2.5 ${
                currentSeverity === 'severe-inversion' 
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 inversion-alert-pulse' 
                  : currentSeverity === 'very-poor'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    currentSeverity === 'severe-inversion' ? 'bg-rose-400' : currentSeverity === 'very-poor' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    currentSeverity === 'severe-inversion' ? 'bg-rose-500' : currentSeverity === 'very-poor' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                </span>
                <span className="font-mono text-sm font-bold tracking-tight">
                  AQI {severityData.aqi}
                </span>
              </div>

              <div className="h-4 w-px bg-slate-700" />

              <div className="text-[11px] leading-tight hidden sm:block">
                <div className="font-mono text-slate-300">PM2.5: <span className="font-semibold">{severityData.pm25} µg/m³</span></div>
                <div className="text-slate-400 text-[10px]">BLH: <span className="font-mono">{severityData.boundaryLayerHeight}m</span> ({severityData.inversionLocked ? 'Locked' : 'Open'})</div>
              </div>
            </div>

            {/* Smog Severity Simulator Pill Selector */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs" role="group" aria-label="Simulate Smog Severity">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider px-2 hidden lg:inline">
                Simulate:
              </span>
              <button
                onClick={() => onSeverityChange('moderate')}
                aria-label="Simulate Moderate Smog (AQI 115)"
                aria-pressed={currentSeverity === 'moderate'}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentSeverity === 'moderate'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Moderate (115)
              </button>
              <button
                onClick={() => onSeverityChange('very-poor')}
                aria-label="Simulate Very Poor Smog (AQI 285)"
                aria-pressed={currentSeverity === 'very-poor'}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentSeverity === 'very-poor'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Very Poor (285)
              </button>
              <button
                onClick={() => onSeverityChange('severe-inversion')}
                aria-label="Simulate Severe Winter Inversion (AQI 440+)"
                aria-pressed={currentSeverity === 'severe-inversion'}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  currentSeverity === 'severe-inversion'
                    ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Severe Inversion (440+)
              </button>
            </div>

            {/* Action Buttons: Community Bulletin & Engine Settings */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={onOpenBulletin}
                aria-label="Generate WhatsApp and RWA Community Advisory Bulletin"
                className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Generate WhatsApp/Community Advisory"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Community Bulletin</span>
              </button>

              <button
                onClick={onOpenSettings}
                aria-label="Open AI Engine Configuration and API Key Settings"
                className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
                title="Configure Gemini API Key"
              >
                <Sparkles className={`w-3.5 h-3.5 ${hasApiKey ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-[11px] font-mono">
                  {hasApiKey ? 'Gemini 2.5 Live' : 'Local AI Engine'}
                </span>
                <Settings className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
