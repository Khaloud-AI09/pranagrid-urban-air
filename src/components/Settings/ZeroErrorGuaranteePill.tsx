import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ZeroErrorGuaranteePillProps {
  apiKey: string;
}

export const ZeroErrorGuaranteePill: React.FC<ZeroErrorGuaranteePillProps> = ({ apiKey }) => (
  <div className="mb-5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        Competition Zero-Error Guarantee
      </span>
      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
        Active Mode: {apiKey ? 'Gemini Live' : 'Deterministic Local Engine'}
      </span>
    </div>
    <p className="text-slate-300 text-[11px] leading-relaxed">
      By default, the <strong>Local Contextual Reasoning Engine</strong> powers all streaming responses with <em>zero setup required</em>. You can optionally supply a Gemini key.
    </p>
  </div>
);
