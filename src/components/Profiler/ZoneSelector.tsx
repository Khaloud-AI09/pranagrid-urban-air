import React from 'react';
import { MapPin } from 'lucide-react';
import { UrbanZoneId } from '../../types';
import { URBAN_ZONE_PROFILES } from '../../data/urbanProfiles';

interface ZoneSelectorProps {
  zone: UrbanZoneId;
  onChange: (zone: UrbanZoneId) => void;
}

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({ zone, onChange }) => {
  const currentZone = URBAN_ZONE_PROFILES[zone];

  return (
    <div className="relative">
      <label htmlFor="urban-zone-select" className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
        <MapPin className="w-3 h-3 text-indigo-400" />
        Atmospheric Zone
      </label>
      <select
        id="urban-zone-select"
        aria-label="Select Atmospheric Zone Archetype"
        value={zone}
        onChange={(e) => onChange(e.target.value as UrbanZoneId)}
        className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-100 text-xs font-medium rounded-lg border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer appearance-none"
      >
        {Object.values(URBAN_ZONE_PROFILES).map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>
      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="text-indigo-300 truncate max-w-[170px]">{currentZone.badge}</span>
        <span className="text-slate-400">{currentZone.typicalTempRange}</span>
      </div>
    </div>
  );
};
