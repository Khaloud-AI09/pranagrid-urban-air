import React from 'react';
import { Compass } from 'lucide-react';
import { URBAN_ZONE_PROFILES } from '../../data/urbanProfiles';
import { UrbanZoneId } from '../../types';

interface CoPilotIntroBannerProps {
  zoneId: UrbanZoneId;
}

export const CoPilotIntroBanner: React.FC<CoPilotIntroBannerProps> = ({ zoneId }) => (
  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/30 border border-emerald-500/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">Autonomous Atmospheric Co-Pilot</span>
      </div>
      <h2 className="text-lg font-bold text-white tracking-tight">Ask InversionOS Anything About Winter Smog & Clean Air Defense</h2>
      <p className="text-xs text-slate-400">Engineered with boundary-layer physics, particulate inhalation models, and low-emission household science.</p>
    </div>

    <div className="flex items-center gap-2 self-start md:self-center">
      <span className="px-3 py-1 rounded-xl bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700 flex items-center gap-1.5">
        <Compass className="w-3.5 h-3.5 text-indigo-400" />
        {URBAN_ZONE_PROFILES[zoneId].badge}
      </span>
    </div>
  </div>
);
