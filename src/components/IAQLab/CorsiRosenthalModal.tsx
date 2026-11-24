import React, { useState, useEffect } from 'react';
import { X, Wrench, Sparkles, Check } from 'lucide-react';
import { calculateCADRMetrics, FanSpeed } from '../../utils/cadrCalculator';
import { CorsiAssemblySteps } from './CorsiAssemblySteps';
import { CorsiCADRSimulator } from './CorsiCADRSimulator';

interface CorsiRosenthalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToChecklist: () => void;
  isAdded: boolean;
}

const CorsiModalHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
        <Wrench className="w-5 h-5" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 id="corsi-rosenthal-title" className="font-bold text-base text-white">DIY Corsi-Rosenthal Air Cleaner Lab</h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Open Science</span>
        </div>
        <p className="text-xs text-slate-400">Hospital-grade particulate filtration built for 1/12th the cost of commercial purifiers</p>
      </div>
    </div>
    <button type="button" onClick={onClose} aria-label="Close Corsi-Rosenthal Lab" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
      <X className="w-5 h-5" />
    </button>
  </div>
);

const CorsiModalFooter: React.FC<{ isAdded: boolean; onAddToChecklist: () => void; onClose: () => void }> = ({ isAdded, onAddToChecklist, onClose }) => (
  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
    <span className="text-xs text-slate-400">Build cost: ~₹1,850 vs commercial purifiers (₹14,000–22,000).</span>
    <div className="flex items-center space-x-2">
      <button type="button" onClick={onAddToChecklist} aria-label={isAdded ? "Remove Corsi-Rosenthal Box from active checklist" : "Add Corsi-Rosenthal Box to active checklist"} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${isAdded ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'}`}>
        {isAdded ? (<><Check className="w-4 h-4 text-emerald-400" /><span>Active in Dashboard</span></>) : (<><Sparkles className="w-4 h-4" /><span>Add Build to My IAQ Plan</span></>)}
      </button>
      <button type="button" onClick={onClose} aria-label="Close dialog" className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors">
        Close
      </button>
    </div>
  </div>
);

export const CorsiRosenthalModal: React.FC<CorsiRosenthalModalProps> = ({ isOpen, onClose, onAddToChecklist, isAdded }) => {
  const [fanSpeed, setFanSpeed] = useState<FanSpeed>('med');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const metrics = calculateCADRMetrics(fanSpeed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="corsi-rosenthal-title">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        <CorsiModalHeader onClose={onClose} />
        <CorsiCADRSimulator metrics={metrics} fanSpeed={fanSpeed} setFanSpeed={setFanSpeed} />
        <CorsiAssemblySteps />
        <CorsiModalFooter isAdded={isAdded} onAddToChecklist={onAddToChecklist} onClose={onClose} />
      </div>
    </div>
  );
};
