import React from 'react';

export const AppFooter: React.FC = () => (
  <footer className="border-t border-slate-800/80 mt-12 py-6 bg-slate-950/60 text-xs text-slate-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-slate-200">PranaGrid / InversionOS</span>
        <span>•</span>
        <span>PromptWars Challenge 6: Urban Air</span>
      </div>

      <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400">
        <span>Dual-Mode GenAI Reliability</span>
        <span>•</span>
        <span>Zero State Names Guaranteed</span>
        <span>•</span>
        <span>Berkeley Earth & WHO Standard Models</span>
      </div>
    </div>
  </footer>
);
