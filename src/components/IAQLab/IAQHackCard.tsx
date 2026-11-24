import React from 'react';
import { Check, Plus, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { IAQHack } from '../../types';

interface IAQHackCardProps {
  hack: IAQHack;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleChecklist: () => void;
  onOpenCRLab: () => void;
}

const HackCardHeader: React.FC<{ hack: IAQHack; isChecklisted: boolean; onToggle: () => void }> = ({ hack, isChecklisted, onToggle }) => (
  <div className="flex items-start justify-between gap-2">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">{hack.cost}</span>
        {hack.badge && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">{hack.badge}</span>}
      </div>
      <h4 className="text-sm font-bold text-white tracking-tight">{hack.title}</h4>
      <p className="text-xs text-slate-400 leading-snug">{hack.tagline}</p>
    </div>
    <button
      onClick={onToggle}
      aria-label={`${isChecklisted ? 'Remove' : 'Add'} ${hack.title} to checklist`}
      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
        isChecklisted ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
      }`}
    >
      {isChecklisted ? (<><Check className="w-3.5 h-3.5" /><span>Active</span></>) : (<><Plus className="w-3.5 h-3.5 text-emerald-400" /><span>Add Hack</span></>)}
    </button>
  </div>
);

const HackInstructionsList: React.FC<{ instructions: string[] }> = ({ instructions }) => (
  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Implementation Steps:</span>
    <ul className="space-y-1">
      {instructions.map((step, idx) => (
        <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
          <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HackCardFooter: React.FC<{ isExpanded: boolean; onToggleExpand: () => void; isCR: boolean; onOpenCRLab: () => void; title: string }> = ({
  isExpanded,
  onToggleExpand,
  isCR,
  onOpenCRLab,
  title,
}) => (
  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
    <button onClick={onToggleExpand} aria-label={isExpanded ? `Hide instructions for ${title}` : `View instructions for ${title}`} className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors">
      <span>{isExpanded ? 'Hide Steps' : 'View Instructions'}</span>
      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
    </button>
    {isCR && (
      <button onClick={onOpenCRLab} aria-label="Open Corsi-Rosenthal 3D and CADR Engineering Lab" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
        <span>Open 3D/CADR Lab</span>
        <Sparkles className="w-3 h-3" />
      </button>
    )}
  </div>
);

export const IAQHackCard: React.FC<IAQHackCardProps> = ({ hack, isExpanded, onToggleExpand, onToggleChecklist, onOpenCRLab }) => {
  const isChecklisted = hack.isChecklisted;

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${isChecklisted ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}>
      <div className="space-y-3">
        <HackCardHeader hack={hack} isChecklisted={isChecklisted} onToggle={onToggleChecklist} />
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">-{hack.pmReductionPercent}% PM2.5 Exposure</span>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-slate-800 border border-slate-700">{hack.difficulty}</span>
          {hack.cadrScore && <span className="px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30">{hack.cadrScore}</span>}
        </div>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 block">Physics & Chemistry Mechanism:</span>
          <p className="text-slate-300 leading-relaxed text-[11px]">{hack.scientificPrinciple}</p>
        </div>
        {isExpanded && <HackInstructionsList instructions={hack.instructions} />}
      </div>
      <HackCardFooter isExpanded={isExpanded} onToggleExpand={onToggleExpand} isCR={hack.id === 'hack-corsi-rosenthal'} onOpenCRLab={onOpenCRLab} title={hack.title} />
    </div>
  );
};
