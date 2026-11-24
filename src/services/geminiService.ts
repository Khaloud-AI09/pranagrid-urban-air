import { UserContext } from '../types';
import {
  buildRoutineScenario,
  buildPurifierScenario,
  buildCommuteScenario,
  buildCookingScenario,
  buildDefaultScenario,
  StructuredAIOutput,
} from './localScenarios';

export type { StructuredAIOutput };

const LOCAL_STORAGE_KEY = 'pranagrid_gemini_api_key';
const LOCAL_STORAGE_MODEL = 'pranagrid_gemini_model';

const ROUTINE_KW = ['routine', 'schedule', 'exercise', 'morning'] as const;
const PURIFIER_KW = ['purifier', 'diy', 'hack', 'plant', 'cadr'] as const;
const COMMUTE_KW = ['commute', 'metro', 'car', 'transit', 'traffic'] as const;
const COOKING_KW = ['cook', 'stove', 'tadka', 'exhaust', 'lpg'] as const;

function matchesTopic(text: string, words: readonly string[]): boolean {
  return words.some(w => text.includes(w));
}

export function getStoredApiKey(): string {
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function saveStoredApiKey(key: string): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
  } catch {
    // Graceful storage failure handling
  }
}

export function getStoredModel(): string {
  try {
    return localStorage.getItem(LOCAL_STORAGE_MODEL) || 'gemini-2.5-flash';
  } catch {
    return 'gemini-2.5-flash';
  }
}

export function saveStoredModel(model: string): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_MODEL, model);
  } catch {
    // Graceful storage failure handling
  }
}

/**
 * Local Deterministic Contextual Reasoning Engine
 */
export function getLocalFallbackResponse(prompt: string, context: UserContext): StructuredAIOutput {
  const p = prompt.toLowerCase();
  if (matchesTopic(p, ROUTINE_KW)) return buildRoutineScenario(context);
  if (matchesTopic(p, PURIFIER_KW)) return buildPurifierScenario();
  if (matchesTopic(p, COMMUTE_KW)) return buildCommuteScenario();
  if (matchesTopic(p, COOKING_KW)) return buildCookingScenario();
  return buildDefaultScenario(context);
}

/**
 * Live Google Gemini 2.5 Flash API with JSON mode
 */
async function callLiveGeminiApi(
  prompt: string,
  context: UserContext,
  apiKey: string
): Promise<StructuredAIOutput | null> {
  const model = getStoredModel();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemInstruction = `You are PranaGrid AI, an Atmospheric Intelligence and Environmental Health Scientist.
Current context: Urban Zone archetype "${context.zone}", Household vulnerability profile "${context.household}", Smog Severity "${context.severity}", Cooking & Transit setup "${context.setup}".
Output strictly valid JSON with keys: headline (string), actionPlan (array of 4 specific strings), whyItWorksScience (string explaining boundary layer or aerosol physics), quantifiedBadge (object with pmReduction, co2Cut, cleanWindow, costMetric), category (string).
Do NOT include any state or city names. Use atmospheric physics principles.`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }],
      generationConfig: { temperature: 0.3, responseMimeType: 'application/json' }
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ? JSON.parse(text) : null;
}

async function simulateChunkStreaming(output: StructuredAIOutput, onChunk?: (partial: string) => void): Promise<void> {
  if (!onChunk) return;
  const fullText = `${output.headline}\n${output.actionPlan.join('\n')}\n${output.whyItWorksScience}`;
  const chunks = fullText.split(' ');
  for (let i = 0; i < Math.min(chunks.length, 12); i++) {
    onChunk(chunks.slice(0, i + 1).join(' '));
    await new Promise(r => setTimeout(r, 25));
  }
}

/**
 * Dual-Mode Streaming GenAI Query Executor
 */
export async function querySmogCoPilot(
  prompt: string,
  context: UserContext,
  onChunk?: (partial: string) => void
): Promise<StructuredAIOutput> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const liveResult = await callLiveGeminiApi(prompt, context, apiKey);
      if (liveResult) {
        if (onChunk) onChunk(liveResult.headline);
        return liveResult;
      }
    } catch {
      // Graceful fallback to local engine on network failure
    }
  }

  const fallback = getLocalFallbackResponse(prompt, context);
  await simulateChunkStreaming(fallback, onChunk);
  return fallback;
}
