import React from 'react';
import { Settings, Sparkles, Share2 } from 'lucide-react';
import { getStoredApiKey } from '../../services/geminiService';

interface HeaderActionButtonsProps {
  onOpenSettings: () => void;
  onOpenBulletin: () => void;
}

export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  onOpenSettings,
  onOpenBulletin,
}) => {
  const hasApiKey = Boolean(getStoredApiKey());

  return (
    <div className="hidden md:flex items-center space-x-2">
      <button
        onClick={onOpenBulletin}
        aria-label="Generate WhatsApp and RWA Community Advisory Bulletin"
        className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
        title="Generate WhatsApp/Community Advisory"
      >
        <Share2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Community Bulletin</span>
      </button>

      <button
        onClick={onOpenSettings}
        aria-label="Open AI Engine Configuration and API Key Settings"
        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
        title="Configure Gemini API Key"
      >
        <Sparkles className={`w-3.5 h-3.5 ${hasApiKey ? 'text-emerald-400' : 'text-amber-400'}`} />
        <span className="text-[11px] font-mono">
          {hasApiKey ? 'Gemini 2.5 Live' : 'Local AI Engine'}
        </span>
        <Settings className="w-3 h-3 text-slate-400 ml-0.5" />
      </button>
    </div>
  );
};
