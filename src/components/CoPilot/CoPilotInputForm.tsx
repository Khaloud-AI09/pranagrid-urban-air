import React from 'react';
import { Send } from 'lucide-react';

interface CoPilotInputFormProps {
  inputQuery: string;
  setInputQuery: (q: string) => void;
  isLoading: boolean;
  onSubmit: (q: string) => void;
}

export const CoPilotInputForm: React.FC<CoPilotInputFormProps> = ({
  inputQuery,
  setInputQuery,
  isLoading,
  onSubmit,
}) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit(inputQuery); }} className="sticky bottom-4 z-20" aria-label="Ask Smog Co-Pilot">
    <div className="relative flex items-center bg-slate-900/95 border border-slate-700/90 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
      <input
        type="text"
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        aria-label="Enter question for Co-Pilot"
        placeholder="Ask about school commute timing, N95 vs cloth masks, kitchen tadka exhaust, or Corsi-Rosenthal builds..."
        className="flex-1 bg-transparent px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!inputQuery.trim() || isLoading}
        aria-label="Send inquiry to Co-Pilot"
        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
      >
        <span>Ask Co-Pilot</span>
        <Send className="w-3.5 h-3.5" />
      </button>
    </div>
  </form>
);
