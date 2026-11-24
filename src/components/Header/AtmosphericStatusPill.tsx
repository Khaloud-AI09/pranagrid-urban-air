import React from 'react';
import { SmogSeverityLevel, SmogSeverityData } from '../../types';

interface AtmosphericStatusPillProps {
  currentSeverity: SmogSeverityLevel;
  severityData: SmogSeverityData;
}

export const AtmosphericStatusPill: React.FC<AtmosphericStatusPillProps> = ({
  currentSeverity,
  severityData,
}) => {
  const isSevere = currentSeverity === 'severe-inversion';
  const isPoor = currentSeverity === 'very-poor';

  const colorClass = isSevere
    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 inversion-alert-pulse'
    : isPoor
    ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200';

  const pingClass = isSevere ? 'bg-rose-400' : isPoor ? 'bg-amber-400' : 'bg-emerald-400';
  const dotClass = isSevere ? 'bg-rose-500' : isPoor ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div
      aria-label={`Current Ambient AQI: ${severityData.aqi}, PM2.5: ${severityData.pm25} micrograms per cubic meter`}
      className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2.5 ${colorClass}`}
    >
      <div className="flex items-center space-x-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingClass}`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotClass}`} />
        </span>
        <span className="font-mono text-sm font-bold tracking-tight">
          AQI {severityData.aqi}
        </span>
      </div>

      <div className="h-4 w-px bg-slate-700" />

      <div className="text-[11px] leading-tight hidden sm:block">
        <div className="font-mono text-slate-300">
          PM2.5: <span className="font-semibold">{severityData.pm25} µg/m³</span>
        </div>
        <div className="text-slate-400 text-[10px]">
          BLH: <span className="font-mono">{severityData.boundaryLayerHeight}m</span> ({severityData.inversionLocked ? 'Locked' : 'Open'})
        </div>
      </div>
    </div>
  );
};
