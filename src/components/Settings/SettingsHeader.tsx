import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface SettingsHeaderProps {
  onClose: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onClose }) => (
  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
    <div className="flex items-center space-x-2.5">
      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
        <Sparkles className="w-4 h-4" />
      </div>
      <div>
        <h3 id="engine-settings-title" className="font-bold text-base text-white">AI Engine Configuration</h3>
        <p className="text-xs text-slate-400">PranaGrid / InversionOS Dual-Mode Architecture</p>
      </div>
    </div>
    <button
      onClick={onClose}
      aria-label="Close AI Engine Settings"
      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);
