import React, { useState } from 'react';
import { Wrench, Check, Plus, Sparkles, Droplets, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { IAQHack } from '../../types';
import { CorsiRosenthalModal } from './CorsiRosenthalModal';

interface IAQLabViewProps {
  hacks: IAQHack[];
  onToggleHack: (id: string) => void;
  onActivateAllHacks: () => void;
}

/**
 * Indoor Air Quality (IAQ) Hacks and Open Science DIY Lab
 */
export const IAQLabView: React.FC<IAQLabViewProps> = ({
  hacks,
  onToggleHack,
  onActivateAllHacks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'zero-cost' | 'low-budget-diy' | 'bio-filtration'>('all');
  const [isCRModalOpen, setIsCRModalOpen] = useState(false);
  const [expandedHackId, setExpandedHackId] = useState<string | null>('hack-corsi-rosenthal');

  const filteredHacks = selectedCategory === 'all'
    ? hacks
    : hacks.filter(h => h.category === selectedCategory);

  const activeCount = hacks.filter(h => h.isChecklisted).length;
  const isCRAdded = Boolean(hacks.find(h => h.id === 'hack-corsi-rosenthal')?.isChecklisted);

  return (
    <div className="space-y-6">
      
      {/* Intro & Summary Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/20 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              IAQ Hacks & DIY Lab
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Science-Backed Indoor Air Quality Hacks
          </h3>
          <p className="text-xs text-slate-400">
            Field-tested interventions ranging from zero-cost mopping physics to open-hardware MERV-13 air cleaner builds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCRModalOpen(true)}
            aria-label="Open Corsi-Rosenthal Air Cleaner Lab"
            className="px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Open Corsi-Rosenthal Lab</span>
          </button>

          <button
            onClick={onActivateAllHacks}
            aria-label="Activate all indoor air quality hacks"
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shadow-lg shadow-emerald-500/20"
          >
            Activate All Hacks ({activeCount}/{hacks.length})
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3" role="tablist" aria-label="Filter Hacks by Category">
        <button
          role="tab"
          aria-selected={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Interventions ({hacks.length})
        </button>
        <button
          role="tab"
          aria-selected={selectedCategory === 'zero-cost'}
          onClick={() => setSelectedCategory('zero-cost')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'zero-cost'
              ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3 h-3 text-emerald-400" />
          Zero-Cost Behavioral
        </button>
        <button
          role="tab"
          aria-selected={selectedCategory === 'low-budget-diy'}
          onClick={() => setSelectedCategory('low-budget-diy')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'low-budget-diy'
              ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-3 h-3 text-indigo-400" />
          Low-Budget DIY Engineering
        </button>
        <button
          role="tab"
          aria-selected={selectedCategory === 'bio-filtration'}
          onClick={() => setSelectedCategory('bio-filtration')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'bio-filtration'
              ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Droplets className="w-3 h-3 text-teal-400" />
          Bio-Filtration & Moisture
        </button>
      </div>

      {/* Hacks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHacks.map((hack) => {
          const isChecklisted = hack.isChecklisted;
          const isExpanded = expandedHackId === hack.id;

          return (
            <div
              key={hack.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isChecklisted
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {hack.cost}
                      </span>
                      {hack.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {hack.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {hack.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-snug">
                      {hack.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => onToggleHack(hack.id)}
                    aria-label={`${isChecklisted ? 'Remove' : 'Add'} ${hack.title} to checklist`}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                      isChecklisted
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isChecklisted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Add Hack</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Metrics Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    -{hack.pmReductionPercent}% PM2.5 Exposure
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-slate-800 border border-slate-700">
                    {hack.difficulty}
                  </span>
                  {hack.cadrScore && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30">
                      {hack.cadrScore}
                    </span>
                  )}
                </div>

                {/* Scientific Principle */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 block">
                    Physics & Chemistry Mechanism:
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {hack.scientificPrinciple}
                  </p>
                </div>

                {/* Expandable Step-by-Step Instructions */}
                {isExpanded && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Implementation Steps:
                    </span>
                    <ul className="space-y-1">
                      {hack.instructions.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Bottom Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => setExpandedHackId(isExpanded ? null : hack.id)}
                  aria-label={isExpanded ? `Hide instructions for ${hack.title}` : `View instructions for ${hack.title}`}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Steps' : 'View Instructions'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {hack.id === 'hack-corsi-rosenthal' && (
                  <button
                    onClick={() => setIsCRModalOpen(true)}
                    aria-label="Open Corsi-Rosenthal 3D and CADR Engineering Lab"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <span>Open 3D/CADR Lab</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Corsi Rosenthal Interactive Modal */}
      <CorsiRosenthalModal
        isOpen={isCRModalOpen}
        onClose={() => setIsCRModalOpen(false)}
        onAddToChecklist={() => onToggleHack('hack-corsi-rosenthal')}
        isAdded={isCRAdded}
      />

    </div>
  );
};
