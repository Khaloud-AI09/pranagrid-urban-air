import React from 'react';
import { Clock, Info, ShieldAlert, Sparkles, CheckCircle, Sun, Moon } from 'lucide-react';
import { RoutineBlock, UserContext, DiurnalPoint } from '../../types';
import { RoutineBlockCard } from './RoutineBlockCard';
import { getDiurnalCurveForSeverity } from '../../data/diurnalSmogCurves';
import { SMOG_SEVERITIES } from '../../data/urbanProfiles';

interface RoutineTimelineProps {
  context: UserContext;
  routines: RoutineBlock[];
  onToggleAdopt: (id: string) => void;
  onAdoptAll: () => void;
}

export const RoutineTimeline: React.FC<RoutineTimelineProps> = ({
  context,
  routines,
  onToggleAdopt,
  onAdoptAll,
}) => {
  const severity = SMOG_SEVERITIES[context.severity];
  const diurnalPoints: DiurnalPoint[] = getDiurnalCurveForSeverity(context.severity, severity.pm25);

  const adoptedCount = routines.filter(r => r.isAdopted).length;
  const allAdopted = adoptedCount === routines.length;

  // Generate SVG path coordinates for 24h curves
  // ViewBox: 0 0 800 220. Margins: left 40, right 40, top 20, bottom 30
  const svgW = 800;
  const svgH = 220;
  const padX = 45;
  const padYTop = 25;
  const padYBottom = 35;
  const plotW = svgW - padX * 2;
  const plotH = svgH - padYTop - padYBottom;

  // Max bounds
  const maxBLH = 1400; // meters
  const maxPM = context.severity === 'severe-inversion' ? 460 : 320; // ug/m3

  const getX = (hour: number) => padX + (hour / 23) * plotW;
  const getY_BLH = (blh: number) => padYTop + plotH - (Math.min(blh, maxBLH) / maxBLH) * plotH;
  const getY_PM = (pm: number) => padYTop + plotH - (Math.min(pm, maxPM) / maxPM) * plotH;

  // Build BLH path (smooth curve)
  const blhPoints = diurnalPoints.map(p => `${getX(p.hour).toFixed(1)},${getY_BLH(p.boundaryLayerMeters).toFixed(1)}`);
  const blhLinePath = `M ${blhPoints.join(' L ')}`;
  const blhAreaPath = `${blhLinePath} L ${getX(23).toFixed(1)},${(padYTop + plotH).toFixed(1)} L ${getX(0).toFixed(1)},${(padYTop + plotH).toFixed(1)} Z`;

  // Build PM2.5 path
  const pmPoints = diurnalPoints.map(p => `${getX(p.hour).toFixed(1)},${getY_PM(p.pm25).toFixed(1)}`);
  const pmLinePath = `M ${pmPoints.join(' L ')}`;

  // Safe window coordinates (Hour 12 to 15.5)
  const safeX1 = getX(12);
  const safeX2 = getX(15.5);

  return (
    <div className="space-y-6">
      
      {/* Header & Adopt All Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Boundary-Layer Atmospheric Physics
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            24-Hour Smog-Aware Daily Routine Optimizer
          </h3>
          <p className="text-xs text-slate-400">
            Align daily commutes, kitchen cooking, and ventilation with planetary thermal boundary layer cycles.
          </p>
        </div>

        <button
          onClick={onAdoptAll}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            allAdopted
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
          }`}
        >
          {allAdopted ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>All 5 Swaps Active</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Adopt All 5 Low-Emission Swaps ({adoptedCount}/5)</span>
            </>
          )}
        </button>
      </div>

      {/* 24-HOUR BOUNDARY LAYER HEIGHT VS PM2.5 INLINE SVG VISUALIZER */}
      <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span>Atmospheric Inversion Dynamics (24-Hour Diurnal Cycle)</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Notice how peak daytime solar heating lifts the mixing ceiling to ~1,250m, causing PM2.5 to drop to its 24-hr low.
            </p>
          </div>

          {/* Chart Legends */}
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-cyan-400 rounded-full" />
              <span className="text-cyan-300">Boundary Layer (m)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-rose-400 rounded-full" />
              <span className="text-rose-300">Ambient PM2.5 (µg/m³)</span>
            </div>
          </div>
        </div>

        {/* Responsive Inline SVG */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full min-w-[620px] h-48 select-none"
            aria-label="24-hour Boundary Layer Height vs PM2.5 Chart"
          >
            <defs>
              <linearGradient id="blhGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="safeWindowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            {[0.25, 0.5, 0.75].map((frac, idx) => (
              <line
                key={idx}
                x1={padX}
                y1={padYTop + plotH * frac}
                x2={svgW - padX}
                y2={padYTop + plotH * frac}
                stroke="#1E293B"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            ))}

            {/* SAFEST VENTILATION WINDOW HIGHLIGHT ZONE (12:00 - 15:30) */}
            <rect
              x={safeX1}
              y={padYTop}
              width={safeX2 - safeX1}
              height={plotH}
              fill="url(#safeWindowGrad)"
              stroke="#10B981"
              strokeDasharray="3 3"
              strokeWidth="1.2"
              rx="4"
            />
            {/* Safe Window Top Callout */}
            <text
              x={(safeX1 + safeX2) / 2}
              y={padYTop + 14}
              textAnchor="middle"
              className="fill-emerald-300 text-[9px] font-bold font-mono tracking-tight"
            >
              ★ SAFEST VENTILATION & EXERCISE WINDOW (12:00–15:30)
            </text>

            {/* Boundary Layer Height Shaded Area & Line */}
            <path d={blhAreaPath} fill="url(#blhGradient)" />
            <path d={blhLinePath} fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />

            {/* PM2.5 Curve Line */}
            <path d={pmLinePath} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="5 2" strokeLinecap="round" />

            {/* Key Data Points Dots on Curve */}
            {diurnalPoints.filter(p => [6, 13, 20].includes(p.hour)).map((p) => (
              <g key={p.hour}>
                {/* BLH Dot */}
                <circle
                  cx={getX(p.hour)}
                  cy={getY_BLH(p.boundaryLayerMeters)}
                  r="4"
                  fill="#06B6D4"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                <text
                  x={getX(p.hour)}
                  y={getY_BLH(p.boundaryLayerMeters) - 7}
                  textAnchor="middle"
                  className="fill-cyan-300 text-[8px] font-mono font-semibold"
                >
                  {p.boundaryLayerMeters}m
                </text>

                {/* PM2.5 Dot */}
                <circle
                  cx={getX(p.hour)}
                  cy={getY_PM(p.pm25)}
                  r="4"
                  fill="#EF4444"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                <text
                  x={getX(p.hour)}
                  y={getY_PM(p.pm25) - 7}
                  textAnchor="middle"
                  className="fill-rose-300 text-[8px] font-mono font-semibold"
                >
                  {p.pm25}µg
                </text>
              </g>
            ))}

            {/* Bottom X-Axis Time Ticks */}
            {[0, 4, 8, 12, 16, 20, 23].map((hr) => (
              <g key={hr} transform={`translate(${getX(hr)}, ${padYTop + plotH + 16})`}>
                <line y1="-10" y2="0" stroke="#334155" strokeWidth="1" />
                <text
                  y="10"
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-mono font-medium"
                >
                  {hr === 0 ? '12 AM' : hr === 12 ? '12 PM' : hr < 12 ? `${hr} AM` : `${hr - 12} PM`}
                </text>
              </g>
            ))}

            {/* Y Axis Labels */}
            <text x={padX - 8} y={padYTop + 8} textAnchor="end" className="fill-cyan-400 text-[9px] font-mono">
              1400m
            </text>
            <text x={padX - 8} y={padYTop + plotH} textAnchor="end" className="fill-cyan-400 text-[9px] font-mono">
              150m
            </text>

            <text x={svgW - padX + 8} y={padYTop + 8} textAnchor="start" className="fill-rose-400 text-[9px] font-mono">
              {maxPM}µg
            </text>
            <text x={svgW - padX + 8} y={padYTop + plotH} textAnchor="start" className="fill-rose-400 text-[9px] font-mono">
              40µg
            </text>
          </svg>
        </div>

        {/* Explanatory 3-Phase Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="font-semibold text-rose-300 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-rose-400" />
              06:00–09:00: Dawn Inversion Lock
            </span>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Radiative ground cooling traps all emissions below 160m. <strong>Strict window seal & indoor quarantine.</strong>
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              12:00–15:30: Thermal Dilution Peak
            </span>
            <p className="text-slate-300 text-[10px] leading-relaxed">
              Solar convection lifts boundary ceiling to 1,200m+. <strong>Safest 25-min home cross-ventilation window.</strong>
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="font-semibold text-amber-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              18:00–23:00: Evening Re-Inversion
            </span>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Ground chills post-sunset; ceiling drops back to 200m, trapping cooking and rush-hour plumes.
            </p>
          </div>
        </div>

      </div>

      {/* Routine Hour-by-Hour Blocks */}
      <div className="space-y-4">
        {routines.map((block) => (
          <RoutineBlockCard
            key={block.id}
            block={block}
            onToggleAdopt={onToggleAdopt}
          />
        ))}
      </div>

    </div>
  );
};
