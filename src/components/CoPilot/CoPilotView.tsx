import React, { useState } from 'react';
import { Send, Sparkles, Bot, User, RefreshCw, Compass, ShieldAlert } from 'lucide-react';
import { UserContext, CoPilotMessage } from '../../types';
import { querySmogCoPilot, StructuredAIOutput } from '../../services/geminiService';
import { ResponseCard } from './ResponseCard';
import { URBAN_ZONE_PROFILES, SMOG_SEVERITIES, HOUSEHOLD_PROFILES } from '../../data/urbanProfiles';

interface CoPilotViewProps {
  context: UserContext;
  onAdoptFromAI: () => void;
}

export const CoPilotView: React.FC<CoPilotViewProps> = ({ context, onAdoptFromAI }) => {
  const [messages, setMessages] = useState<CoPilotMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      structuredResponse: {
        headline: `Atmospheric Intelligence Active for ${URBAN_ZONE_PROFILES[context.zone].name}`,
        actionPlan: [
          `Nocturnal Inversion Shielding: Ambient AQI is currently ${SMOG_SEVERITIES[context.severity].aqi}. Keep perimeter balcony doors latched during 06:00–09:30.`,
          `Scheduled Solar Ventilation: Prepare to execute a 25-minute filtered cross-flush at 12:30 PM when the boundary layer expands to ~1200m.`,
          `Microfiber Wet Mopping: Avoid straw brooms—damp mopping prevents resuspending fine black carbon into pediatric breathing zones.`,
          `Induction Transition: Substitute unvented gas cooking during dinner rush to prevent indoor NO₂ and ultrafine acrolein accumulation.`
        ],
        whyItWorksScience: `Under severe radiative winter cooling, the nocturnal boundary layer traps human emissions within 180m of the ground. Strategic scheduling of physical ventilation to match thermal convection curves reduces personal inhalation exposure by up to 48%.`,
        quantifiedBadge: {
          pmReduction: '-48% Daily Exposure',
          co2Cut: '-2.4 kg CO₂/day',
          cleanWindow: '+4.5 hrs Safe Window',
          costMetric: '₹350/mo Health Savings'
        },
        category: 'Live Atmospheric Baseline'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');

  // Dynamically generated smart prompt chips based on current user context
  const smartChips = [
    `Build a safe 7 AM–10 PM routine for ${HOUSEHOLD_PROFILES[context.household].label} today`,
    `No air purifier—give me ₹500 DIY indoor air hacks`,
    `Compare metro vs. solo car emissions for my 14 km commute`,
    `How does boundary layer inversion trap stove and exhaust smoke?`,
  ];

  const handleSend = async (queryText: string) => {
    const query = queryText.trim();
    if (!query || isLoading) return;

    setInputQuery('');
    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `assistant-${Date.now()}`;

    // Append user message
    setMessages(prev => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        timestamp: 'Just now',
        text: query,
      }
    ]);

    setIsLoading(true);
    setStreamingText('Analyzing planetary boundary layer conditions & lifestyle profile...');

    try {
      const result: StructuredAIOutput = await querySmogCoPilot(query, context, (partial) => {
        setStreamingText(partial);
      });

      setMessages(prev => [
        ...prev,
        {
          id: assistantMsgId,
          sender: 'assistant',
          timestamp: 'Just now',
          structuredResponse: result,
        }
      ]);
    } catch (err) {
      console.error('Co-pilot query error:', err);
    } finally {
      setIsLoading(false);
      setStreamingText('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/30 border border-emerald-500/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
              Autonomous Atmospheric Co-Pilot
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Ask InversionOS Anything About Winter Smog & Clean Air Defense
          </h2>
          <p className="text-xs text-slate-400">
            Engineered with boundary-layer physics, particulate inhalation models, and low-emission household science.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="px-3 py-1 rounded-xl bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            {URBAN_ZONE_PROFILES[context.zone].badge}
          </span>
        </div>
      </div>

      {/* Smart Prompt Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          One-Click Smart Inquiries (Tailored to Your Active Profile):
        </div>
        <div className="flex flex-wrap gap-2">
          {smartChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              disabled={isLoading}
              className="text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 rounded-xl px-3.5 py-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              <span className="text-emerald-400 font-mono text-[11px]">✦</span>
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Stream */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {msg.sender === 'user' ? (
              <div className="flex items-start justify-end gap-2.5">
                <div className="max-w-xl bg-emerald-500/10 border border-emerald-500/30 rounded-2xl rounded-tr-none px-4 py-3 text-xs text-emerald-100 shadow-md">
                  <div className="flex items-center justify-between text-[10px] text-emerald-400/80 mb-1 font-mono">
                    <span>You</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="font-medium leading-relaxed">{msg.text}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700">
                  <User className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-md mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1 max-w-3xl">
                  {msg.structuredResponse ? (
                    <ResponseCard data={msg.structuredResponse} onAdoptSwaps={onAdoptFromAI} />
                  ) : (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200">
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live Streaming Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 max-w-xl space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Synthesizing InversionOS Scientific Advisory...
              </div>
              <p className="text-slate-400 italic text-[11px] leading-relaxed">
                {streamingText}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputQuery);
        }}
        className="sticky bottom-4 z-20"
      >
        <div className="relative flex items-center bg-slate-900/95 border border-slate-700/90 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about school commute timing, N95 vs cloth masks, kitchen tadka exhaust, or Corsi-Rosenthal builds..."
            className="flex-1 bg-transparent px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <span>Ask Co-Pilot</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

    </div>
  );
};
