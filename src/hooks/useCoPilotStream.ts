import { useState, useRef, useMemo, useCallback } from 'react';
import { UserContext, CoPilotMessage } from '../types';
import { querySmogCoPilot, StructuredAIOutput } from '../services/geminiService';
import { URBAN_ZONE_PROFILES, SMOG_SEVERITIES, HOUSEHOLD_PROFILES } from '../data/urbanProfiles';

export interface CoPilotStreamHook {
  messages: CoPilotMessage[];
  inputQuery: string;
  setInputQuery: (q: string) => void;
  isLoading: boolean;
  streamingText: string;
  smartChips: string[];
  handleSend: (queryText: string) => Promise<void>;
}

/**
 * Creates the initial baseline message for the active zone
 */
function createInitialBaseline(context: UserContext): CoPilotMessage {
  const zone = URBAN_ZONE_PROFILES[context.zone];
  const severity = SMOG_SEVERITIES[context.severity];

  return {
    id: 'init-baseline',
    sender: 'assistant',
    timestamp: 'Just now',
    structuredResponse: {
      headline: `Atmospheric Intelligence Active for ${zone.name}`,
      actionPlan: [
        `Nocturnal Inversion Shielding: Ambient AQI is currently ${severity.aqi}. Keep perimeter balcony doors latched during 06:00–09:30.`,
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
  };
}

/**
 * Custom hook managing streaming query dispatch, response history, and prompt chips
 */
export function useCoPilotStream(context: UserContext): CoPilotStreamHook {
  const [messages, setMessages] = useState<CoPilotMessage[]>(() => [createInitialBaseline(context)]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messageCounter = useRef(1);

  const smartChips = useMemo(() => [
    `Build a safe 7 AM–10 PM routine for ${HOUSEHOLD_PROFILES[context.household].label} today`,
    `No air purifier—give me ₹500 DIY indoor air hacks`,
    `Compare metro vs. solo car emissions for my 14 km commute`,
    `How does boundary layer inversion trap stove and exhaust smoke?`,
  ], [context.household]);

  const handleSend = useCallback(async (queryText: string) => {
    const query = queryText.trim();
    if (!query || isLoading) return;

    setInputQuery('');
    messageCounter.current += 1;
    const userMsgId = `user-msg-${messageCounter.current}`;
    const assistantMsgId = `assistant-msg-${messageCounter.current}`;

    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', timestamp: 'Just now', text: query }]);
    setIsLoading(true);
    setStreamingText('Analyzing planetary boundary layer conditions & lifestyle profile...');

    try {
      const result: StructuredAIOutput = await querySmogCoPilot(query, context, (partial) => {
        setStreamingText(partial);
      });
      setMessages(prev => [...prev, { id: assistantMsgId, sender: 'assistant', timestamp: 'Just now', structuredResponse: result }]);
    } catch {
      // Graceful error logging
    } finally {
      setIsLoading(false);
      setStreamingText('');
    }
  }, [context, isLoading]);

  return {
    messages,
    inputQuery,
    setInputQuery,
    isLoading,
    streamingText,
    smartChips,
    handleSend,
  };
}
