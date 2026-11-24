import React from 'react';
import { Key, Cpu, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface SettingsApiKeyFormProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (model: string) => void;
  testStatus: 'idle' | 'testing' | 'success' | 'error';
  testMessage: string;
}

export const SettingsApiKeyForm: React.FC<SettingsApiKeyFormProps> = ({
  apiKey,
  setApiKey,
  model,
  setModel,
  testStatus,
  testMessage,
}) => (
  <div className="space-y-4">
    <div>
      <label htmlFor="gemini-api-key-input" className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
        <Key className="w-3.5 h-3.5 text-slate-400" />Google Gemini API Key (Optional)
      </label>
      <input
        id="gemini-api-key-input"
        type="password"
        placeholder="AIzaSy... (leave blank to run in Local Mode)"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono transition-colors"
      />
      <p className="mt-1 text-[11px] text-slate-500">Stored strictly in browser <code className="text-slate-400 font-mono">localStorage</code>.</p>
    </div>

    <div>
      <label htmlFor="gemini-model-select" className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-slate-400" />Model Target
      </label>
      <select
        id="gemini-model-select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-mono cursor-pointer"
      >
        <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended: Low Latency & High Reasoning)</option>
        <option value="gemini-1.5-flash">gemini-1.5-flash (Standard Fallback)</option>
      </select>
    </div>

    {testMessage && (
      <div role="status" aria-live="polite" className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${testStatus === 'success' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : testStatus === 'error' ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
        {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
        {testStatus === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
        {testStatus === 'testing' && <RefreshCw className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 animate-spin" />}
        <span className="text-[11px] leading-relaxed">{testMessage}</span>
      </div>
    )}
  </div>
);
