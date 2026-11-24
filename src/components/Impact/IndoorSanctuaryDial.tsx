import React from 'react';

interface IndoorSanctuaryDialProps {
  indoorAQI: number;
  ambientAQI: number;
  aqiDropPercent: number;
}

export const IndoorSanctuaryDial: React.FC<IndoorSanctuaryDialProps> = ({
  indoorAQI,
  ambientAQI,
  aqiDropPercent,
}) => (
  <div 
    className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 border border-emerald-500/20 space-y-2.5"
    aria-label={`Indoor sanctuary estimated AQI: ${indoorAQI}, which is ${aqiDropPercent} percent cleaner than ambient AQI ${ambientAQI}`}
  >
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-400 font-medium">Estimated Indoor Sanctuary</span>
      <span className="text-emerald-400 font-mono font-bold">-{aqiDropPercent}% Cleaner</span>
    </div>

    <div className="flex items-baseline justify-between">
      <div>
        <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">AQI {indoorAQI}</div>
        <div className="text-[10px] text-slate-400 mt-0.5">Safe indoor breathing zone</div>
      </div>
      <div className="text-right">
        <div className="text-xs font-mono text-slate-400 line-through">Ambient: {ambientAQI}</div>
        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">WHO Guideline Target</span>
      </div>
    </div>

    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={aqiDropPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Indoor air filtration progress">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(15, aqiDropPercent))}%` }} />
    </div>
  </div>
);
