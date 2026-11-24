import React from 'react';
import { Clock, Sparkles, CheckCircle } from 'lucide-react';
import { RoutineBlock, UserContext, DiurnalPoint } from '../../types';
import { RoutineBlockCard } from './RoutineBlockCard';
import { DiurnalInversionChart } from './DiurnalInversionChart';
import { getDiurnalCurveForSeverity } from '../../data/diurnalSmogCurves';
import { SMOG_SEVERITIES } from '../../data/urbanProfiles';

interface RoutineTimelineProps {
  context: UserContext;
  routines: RoutineBlock[];
  onToggleAdopt: (id: string) => void;
  onAdoptAll: () => void;
}

const RoutineTimelineHeader: React.FC<{ allAdopted: boolean; adoptedCount: number; onAdoptAll: () => void }> = ({
  allAdopted,
  adoptedCount,
  onAdoptAll,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />Boundary-Layer Atmospheric Physics
        </span>
      </div>
      <h3 className="text-lg font-bold text-white tracking-tight">24-Hour Smog-Aware Daily Routine Optimizer</h3>
      <p className="text-xs text-slate-400">Align daily commutes, kitchen cooking, and ventilation with planetary thermal boundary layer cycles.</p>
    </div>

    <button
      onClick={onAdoptAll}
      aria-label={allAdopted ? "All low-emission routine swaps adopted" : "Adopt all 5 low-emission routine swaps"}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
        allAdopted ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
      }`}
    >
      {allAdopted ? (<><CheckCircle className="w-4 h-4 text-emerald-400" /><span>All 5 Swaps Active</span></>) : (<><Sparkles className="w-4 h-4" /><span>Adopt All 5 Low-Emission Swaps ({adoptedCount}/5)</span></>)}
    </button>
  </div>
);

export const RoutineTimeline: React.FC<RoutineTimelineProps> = ({ context, routines, onToggleAdopt, onAdoptAll }) => {
  const severity = SMOG_SEVERITIES[context.severity];
  const diurnalPoints: DiurnalPoint[] = getDiurnalCurveForSeverity(context.severity, severity.pm25);
  const adoptedCount = routines.filter(r => r.isAdopted).length;
  const maxPM = context.severity === 'severe-inversion' ? 460 : 320;

  return (
    <div className="space-y-6">
      <RoutineTimelineHeader allAdopted={adoptedCount === routines.length} adoptedCount={adoptedCount} onAdoptAll={onAdoptAll} />
      <DiurnalInversionChart diurnalPoints={diurnalPoints} maxPM={maxPM} />
      <div className="space-y-4">
        {routines.map((block) => (
          <RoutineBlockCard key={block.id} block={block} onToggleAdopt={onToggleAdopt} />
        ))}
      </div>
    </div>
  );
};
