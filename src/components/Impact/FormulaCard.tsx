import React from 'react';

interface FormulaCardProps {
  title: string;
  sourceBadge?: string;
  formula: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  themeColor: 'emerald' | 'cyan' | 'blue' | 'amber';
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  title,
  sourceBadge,
  formula,
  description,
  icon,
  themeColor,
}) => {
  const colorMap = {
    emerald: { text: 'text-emerald-300', formula: 'text-emerald-400' },
    cyan: { text: 'text-cyan-300', formula: 'text-cyan-400' },
    blue: { text: 'text-blue-300', formula: 'text-blue-400' },
    amber: { text: 'text-amber-300', formula: 'text-amber-400' },
  };

  const colors = colorMap[themeColor];

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className={`font-semibold ${colors.text} uppercase tracking-wider text-[11px] flex items-center gap-1.5`}>
          {icon}
          {title}
        </span>
        {sourceBadge && (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {sourceBadge}
          </span>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-slate-950 font-mono ${colors.formula} text-xs border border-slate-800`}>
        {formula}
      </div>
      <p className="text-slate-300 leading-relaxed text-[11px]">{description}</p>
    </div>
  );
};
