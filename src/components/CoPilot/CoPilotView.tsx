import React from 'react';
import { Bot, User, RefreshCw } from 'lucide-react';
import { UserContext } from '../../types';
import { useCoPilotStream } from '../../hooks/useCoPilotStream';
import { ResponseCard } from './ResponseCard';
import { CoPilotIntroBanner } from './CoPilotIntroBanner';
import { CoPilotSmartChips } from './CoPilotSmartChips';
import { CoPilotInputForm } from './CoPilotInputForm';

interface CoPilotViewProps {
  context: UserContext;
  onAdoptFromAI: () => void;
}

const CoPilotLoadingIndicator: React.FC<{ streamingText: string }> = ({ streamingText }) => (
  <div className="flex items-start gap-3 animate-in fade-in duration-300" role="status" aria-live="polite">
    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
      <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
    </div>
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 max-w-xl space-y-2">
      <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Synthesizing InversionOS Scientific Advisory...
      </div>
      <p className="text-slate-400 italic text-[11px] leading-relaxed">{streamingText}</p>
    </div>
  </div>
);

export const CoPilotView: React.FC<CoPilotViewProps> = ({ context, onAdoptFromAI }) => {
  const { messages, inputQuery, setInputQuery, isLoading, streamingText, smartChips, handleSend } = useCoPilotStream(context);

  return (
    <div className="space-y-6">
      <CoPilotIntroBanner zoneId={context.zone} />
      <CoPilotSmartChips chips={smartChips} isLoading={isLoading} onSelect={handleSend} />

      <div className="space-y-4" aria-live="polite" aria-relevant="additions text">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {msg.sender === 'user' ? (
              <div className="flex items-start justify-end gap-2.5">
                <div className="max-w-xl bg-emerald-500/10 border border-emerald-500/30 rounded-2xl rounded-tr-none px-4 py-3 text-xs text-emerald-100 shadow-md">
                  <div className="flex items-center justify-between text-[10px] text-emerald-400/80 mb-1 font-mono"><span>You</span><span>{msg.timestamp}</span></div>
                  <p className="font-medium leading-relaxed">{msg.text}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700"><User className="w-4 h-4" /></div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-md mt-1"><Bot className="w-4 h-4" /></div>
                <div className="flex-1 max-w-3xl">
                  {msg.structuredResponse ? <ResponseCard data={msg.structuredResponse} onAdoptSwaps={onAdoptFromAI} /> : <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200">{msg.text}</div>}
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && <CoPilotLoadingIndicator streamingText={streamingText} />}
      </div>

      <CoPilotInputForm inputQuery={inputQuery} setInputQuery={setInputQuery} isLoading={isLoading} onSubmit={handleSend} />
    </div>
  );
};
