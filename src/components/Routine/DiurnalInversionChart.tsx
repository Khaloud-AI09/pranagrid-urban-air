import React from 'react';
import { DiurnalPoint } from '../../types';
import { generateDiurnalSvgPaths, getHourX, DEFAULT_PLOT_CONFIG } from '../../utils/curveMath';
import { DiurnalChartSvg } from './DiurnalChartSvg';
import { DiurnalChartFooter } from './DiurnalChartFooter';

interface DiurnalInversionChartProps {
  diurnalPoints: DiurnalPoint[];
  maxPM: number;
}

const DiurnalChartHeader: React.FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <div>
      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Atmospheric Inversion Dynamics (24-Hour Diurnal Cycle)</h4>
      <p className="text-[11px] text-slate-400 mt-0.5">Notice how peak daytime solar heating lifts the mixing ceiling to ~1,250m, causing PM2.5 to drop to its 24-hr low.</p>
    </div>
    <div className="flex items-center gap-3 text-[11px] font-mono">
      <div className="flex items-center gap-1.5"><span className="w-3 h-1 bg-cyan-400 rounded-full" /><span className="text-cyan-300">Boundary Layer (m)</span></div>
      <div className="flex items-center gap-1.5"><span className="w-3 h-1 bg-rose-400 rounded-full" /><span className="text-rose-300">Ambient PM2.5 (µg/m³)</span></div>
    </div>
  </div>
);

export const DiurnalInversionChart: React.FC<DiurnalInversionChartProps> = ({ diurnalPoints, maxPM }) => {
  const config = { ...DEFAULT_PLOT_CONFIG, maxPM };
  const { blhLinePath, blhAreaPath, pmLinePath } = generateDiurnalSvgPaths(diurnalPoints, config);
  const safeX1 = getHourX(12, config);
  const safeX2 = getHourX(15.5, config);
  const plotH = config.svgH - config.padYTop - config.padYBottom;

  return (
    <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-3" aria-label="24-Hour Boundary Layer Height vs PM2.5 Atmospheric Dynamics">
      <DiurnalChartHeader />
      <div className="w-full overflow-x-auto">
        <DiurnalChartSvg
          config={config}
          blhLinePath={blhLinePath}
          blhAreaPath={blhAreaPath}
          pmLinePath={pmLinePath}
          safeX1={safeX1}
          safeX2={safeX2}
          plotH={plotH}
          diurnalPoints={diurnalPoints}
          maxPM={maxPM}
        />
      </div>
      <DiurnalChartFooter />
    </div>
  );
};
