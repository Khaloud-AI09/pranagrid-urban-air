import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { SmogSeverityLevel } from '../../types';

interface SeverityButtonProps {
  level: SmogSeverityLevel;
  current: SmogSeverityLevel;
  label: string;
  ariaLabel: string;
  activeClass: string;
  icon?: React.ReactNode;
  onClick: (level: SmogSeverityLevel) => void;
}

const SeverityButton: React.FC<SeverityButtonProps> = ({
  level,
  current,
  label,
  ariaLabel,
  activeClass,
  icon,
  onClick,
}) => {
  const isSelected = current === level;
  return (
    <button
      onClick={() => onClick(level)}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
        isSelected ? activeClass : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

interface SmogSeveritySelectorProps {
  currentSeverity: SmogSeverityLevel;
  onSeverityChange: (severity: SmogSeverityLevel) => void;
}

export const SmogSeveritySelector: React.FC<SmogSeveritySelectorProps> = ({
  currentSeverity,
  onSeverityChange,
}) => {
  return (
    <div
      className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs"
      role="group"
      aria-label="Simulate Smog Severity"
    >
      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider px-2 hidden lg:inline">
        Simulate:
      </span>
      <SeverityButton level="moderate" current={currentSeverity} label="Moderate (115)" ariaLabel="Simulate Moderate Smog (AQI 115)" activeClass="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm" onClick={onSeverityChange} />
      <SeverityButton level="very-poor" current={currentSeverity} label="Very Poor (285)" ariaLabel="Simulate Very Poor Smog (AQI 285)" activeClass="bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm" onClick={onSeverityChange} />
      <SeverityButton level="severe-inversion" current={currentSeverity} label="Severe Inversion (440+)" ariaLabel="Simulate Severe Winter Inversion (AQI 440+)" activeClass="bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-sm" icon={<AlertTriangle className="w-3 h-3 text-rose-400" />} onClick={onSeverityChange} />
    </div>
  );
};
