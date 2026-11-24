import React from 'react';
import { Moon, Sun, ShieldAlert } from 'lucide-react';

export const DiurnalChartFooter: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-[11px]">
    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
      <span className="font-semibold text-rose-300 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-rose-400" />06:00–09:00: Dawn Inversion Lock</span>
      <p className="text-slate-400 text-[10px]">Radiative ground cooling traps emissions below 160m. <strong>Strict window seal.</strong></p>
    </div>
    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
      <span className="font-semibold text-emerald-300 flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-emerald-400" />12:00–15:30: Thermal Dilution Peak</span>
      <p className="text-slate-300 text-[10px]">Convection lifts boundary ceiling to 1,200m+. <strong>Safest home ventilation window.</strong></p>
    </div>
    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
      <span className="font-semibold text-amber-300 flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-amber-400" />18:00–23:00: Evening Re-Inversion</span>
      <p className="text-slate-400 text-[10px]">Ground chills post-sunset; ceiling drops back to 200m, trapping cooking plumes.</p>
    </div>
  </div>
);
