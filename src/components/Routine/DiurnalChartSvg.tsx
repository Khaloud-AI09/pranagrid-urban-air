import React from 'react';
import { DiurnalPoint } from '../../types';
import { CurvePlotConfig, getHourX, getBLHY, getPM25Y } from '../../utils/curveMath';

interface DiurnalChartSvgProps {
  config: CurvePlotConfig;
  blhLinePath: string;
  blhAreaPath: string;
  pmLinePath: string;
  safeX1: number;
  safeX2: number;
  plotH: number;
  diurnalPoints: DiurnalPoint[];
  maxPM: number;
}

const DiurnalSvgAxes: React.FC<{ config: CurvePlotConfig; plotH: number; maxPM: number }> = ({ config, plotH, maxPM }) => (
  <g>
    {[0, 4, 8, 12, 16, 20, 23].map((hr) => (
      <g key={hr} transform={`translate(${getHourX(hr, config)}, ${config.padYTop + plotH + 16})`}>
        <line y1="-10" y2="0" stroke="#334155" strokeWidth="1" />
        <text y="10" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono font-medium">{hr === 0 ? '12 AM' : hr === 12 ? '12 PM' : hr < 12 ? `${hr} AM` : `${hr - 12} PM`}</text>
      </g>
    ))}
    <text x={config.padX - 8} y={config.padYTop + 8} textAnchor="end" className="fill-cyan-400 text-[9px] font-mono">{config.maxBLH}m</text>
    <text x={config.padX - 8} y={config.padYTop + plotH} textAnchor="end" className="fill-cyan-400 text-[9px] font-mono">150m</text>
    <text x={config.svgW - config.padX + 8} y={config.padYTop + 8} textAnchor="start" className="fill-rose-400 text-[9px] font-mono">{maxPM}µg</text>
    <text x={config.svgW - config.padX + 8} y={config.padYTop + plotH} textAnchor="start" className="fill-rose-400 text-[9px] font-mono">40µg</text>
  </g>
);

export const DiurnalChartSvg: React.FC<DiurnalChartSvgProps> = ({
  config,
  blhLinePath,
  blhAreaPath,
  pmLinePath,
  safeX1,
  safeX2,
  plotH,
  diurnalPoints,
  maxPM,
}) => (
  <svg viewBox={`0 0 ${config.svgW} ${config.svgH}`} className="w-full min-w-[620px] h-48 select-none" role="img" aria-label="24-hour Boundary Layer Height vs PM2.5 concentration curve showing 12:00 to 15:30 safe window">
    <defs>
      <linearGradient id="blhGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" /><stop offset="100%" stopColor="#06B6D4" stopOpacity="0.01" /></linearGradient>
      <linearGradient id="safeWindowGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity="0.30" /><stop offset="100%" stopColor="#10B981" stopOpacity="0.05" /></linearGradient>
    </defs>
    {[0.25, 0.5, 0.75].map((frac, idx) => (
      <line key={idx} x1={config.padX} y1={config.padYTop + plotH * frac} x2={config.svgW - config.padX} y2={config.padYTop + plotH * frac} stroke="#1E293B" strokeDasharray="4 4" strokeWidth="1" />
    ))}
    <rect x={safeX1} y={config.padYTop} width={safeX2 - safeX1} height={plotH} fill="url(#safeWindowGrad)" stroke="#10B981" strokeDasharray="3 3" strokeWidth="1.2" rx="4" />
    <text x={(safeX1 + safeX2) / 2} y={config.padYTop + 14} textAnchor="middle" className="fill-emerald-300 text-[9px] font-bold font-mono tracking-tight">★ SAFEST VENTILATION & EXERCISE WINDOW (12:00–15:30)</text>
    <path d={blhAreaPath} fill="url(#blhGradient)" />
    <path d={blhLinePath} fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
    <path d={pmLinePath} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="5 2" strokeLinecap="round" />
    {diurnalPoints.filter(p => [6, 13, 20].includes(p.hour)).map((p) => (
      <g key={p.hour}>
        <circle cx={getHourX(p.hour, config)} cy={getBLHY(p.boundaryLayerMeters, config)} r="4" fill="#06B6D4" stroke="#0F172A" strokeWidth="2" />
        <text x={getHourX(p.hour, config)} y={getBLHY(p.boundaryLayerMeters, config) - 7} textAnchor="middle" className="fill-cyan-300 text-[8px] font-mono font-semibold">{p.boundaryLayerMeters}m</text>
        <circle cx={getHourX(p.hour, config)} cy={getPM25Y(p.pm25, config)} r="4" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        <text x={getHourX(p.hour, config)} y={getPM25Y(p.pm25, config) - 7} textAnchor="middle" className="fill-rose-300 text-[8px] font-mono font-semibold">{p.pm25}µg</text>
      </g>
    ))}
    <DiurnalSvgAxes config={config} plotH={plotH} maxPM={maxPM} />
  </svg>
);
