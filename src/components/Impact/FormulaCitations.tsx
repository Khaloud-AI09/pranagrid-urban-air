import React from 'react';

export const FormulaCitations: React.FC = () => {
  return (
    <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
      <div className="font-semibold text-slate-300">Authoritative References & Standards:</div>
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Muller, Rohde et al. (2015), <em>Air Pollution and Cigarette Equivalence in Urban Environments</em>, Berkeley Earth.</li>
        <li>World Health Organization (2021), <em>Global Air Quality Guidelines for PM2.5, NO₂, and Ozone</em>.</li>
        <li>CPCB (Central Pollution Control Board), <em>National Ambient Air Quality Monitoring Program</em>.</li>
        <li>ASHRAE Standard 52.2, <em>Method of Testing General Ventilation Air-Cleaning Devices for Particle Size Efficiency</em>.</li>
      </ul>
    </div>
  );
};
