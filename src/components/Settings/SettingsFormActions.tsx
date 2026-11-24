import React from 'react';
import { RefreshCw } from 'lucide-react';

interface SettingsFormActionsProps {
  apiKey: string;
  isTesting: boolean;
  onTest: () => void;
  onClear: () => void;
  onClose: () => void;
  onSave: () => void;
}

export const SettingsFormActions: React.FC<SettingsFormActionsProps> = ({
  apiKey,
  isTesting,
  onTest,
  onClear,
  onClose,
  onSave,
}) => (
  <div className="flex items-center justify-between pt-2">
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={onTest}
        disabled={isTesting || !apiKey}
        aria-label="Test Gemini API Connection"
        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
        Test Ping
      </button>
      {apiKey && (
        <button type="button" onClick={onClear} aria-label="Clear API Key" className="px-2.5 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 text-xs transition-colors">
          Clear Key
        </button>
      )}
    </div>

    <div className="flex items-center space-x-2">
      <button type="button" onClick={onClose} aria-label="Cancel and close settings" className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors">
        Cancel
      </button>
      <button type="button" onClick={onSave} aria-label="Save and apply AI settings" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shadow-lg shadow-emerald-500/20">
        Apply & Save
      </button>
    </div>
  </div>
);
