import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subValue: string;
  subLabel?: string;
  icon: React.ReactNode;
  themeColor: 'emerald' | 'blue' | 'cyan' | 'amber';
  highlight?: boolean;
}

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/10' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/10' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/10' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/10' },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subValue,
  subLabel,
  icon,
  themeColor,
  highlight,
}) => {
  const scheme = COLOR_MAP[themeColor];

  return (
    <div className={`p-4 rounded-2xl bg-slate-900/90 border transition-all duration-300 relative overflow-hidden ${highlight ? `${scheme.border} shadow-lg ${scheme.glow}` : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <div className={`w-7 h-7 rounded-lg ${scheme.bg} ${scheme.text} flex items-center justify-center border ${scheme.border}`}>{icon}</div>
      </div>

      <div className="flex items-baseline space-x-1.5 my-1">
        <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
        {unit && <span className="text-xs text-slate-400 font-mono">{unit}</span>}
      </div>

      <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className={`font-mono font-semibold ${scheme.text}`}>{subValue}</span>
        {subLabel && <span className="text-slate-400 text-[10px]">{subLabel}</span>}
      </div>
    </div>
  );
};
