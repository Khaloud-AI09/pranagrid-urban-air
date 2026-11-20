import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getLocalFallbackResponse,
  querySmogCoPilot,
  getStoredApiKey,
  saveStoredApiKey,
  getStoredModel,
  saveStoredModel
} from '../services/geminiService';
import { UserContext } from '../types';

describe('Dual-Mode GenAI Service', () => {
  const mockContext: UserContext = {
    zone: 'indo-gangetic-metro',
    household: 'kids-elderly',
    setup: 'gas-petrol',
    severity: 'severe-inversion',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Local Contextual Reasoning Engine', () => {
    it('generates structured response for routine inquiries', () => {
      const response = getLocalFallbackResponse('Give me a safe routine for kids today', mockContext);

      expect(response.headline).toContain('Smog-Shield Routine');
      expect(response.actionPlan.length).toBeGreaterThanOrEqual(4);
      expect(response.whyItWorksScience).toContain('inversion');
      expect(response.quantifiedBadge.pmReduction).toBeDefined();
      expect(response.category).toBe('Family Routine Protocol');
    });

    it('generates structured response for DIY purifier and budget inquiries', () => {
      const response = getLocalFallbackResponse('No air purifier, give me ₹500 DIY hacks', mockContext);

      expect(response.headline).toContain('Indoor Filtration Strategy');
      expect(response.actionPlan.some(s => s.includes('Corsi-Rosenthal') || s.includes('MERV-13'))).toBe(true);
      expect(response.quantifiedBadge.costMetric).toBeDefined();
      expect(response.category).toBe('DIY IAQ Engineering');
    });

    it('generates structured response for commute inquiries', () => {
      const response = getLocalFallbackResponse('Compare metro vs car emissions for commute', mockContext);

      expect(response.headline).toContain('Commute Swap');
      expect(response.whyItWorksScience).toContain('tailpipe');
      expect(response.quantifiedBadge.co2Cut).toBeDefined();
    });

    it('generates structured response for cooking and stove inquiries', () => {
      const response = getLocalFallbackResponse('How to manage tadka smoke and gas stove fumes?', mockContext);

      expect(response.headline).toContain('Kitchen Defense');
      expect(response.actionPlan.some(s => s.toLowerCase().includes('exhaust') || s.toLowerCase().includes('induction'))).toBe(true);
    });

    it('handles general atmospheric inquiries', () => {
      const response = getLocalFallbackResponse('What is the current atmospheric status?', mockContext);

      expect(response.headline).toContain('Atmospheric Intelligence');
      expect(response.actionPlan.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('LocalStorage Key & Model Management', () => {
    it('saves and retrieves Gemini API key', () => {
      expect(getStoredApiKey()).toBe('');
      saveStoredApiKey('AIzaSyTestKey123');
      expect(getStoredApiKey()).toBe('AIzaSyTestKey123');
    });

    it('saves and retrieves Gemini model preference', () => {
      expect(getStoredModel()).toBe('gemini-2.5-flash');
      saveStoredModel('gemini-1.5-flash');
      expect(getStoredModel()).toBe('gemini-1.5-flash');
    });
  });

  describe('Live Gemini 2.5 Flash API with Fallbacks', () => {
    it('executes successful live Gemini API call and parses JSON response', async () => {
      saveStoredApiKey('AIzaSyValidTestKey');

      const mockStructuredOutput = {
        headline: 'AI Live Smog Protocol',
        actionPlan: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        whyItWorksScience: 'Planetary boundary layer physics explanation.',
        quantifiedBadge: {
          pmReduction: '-50% PM2.5',
          co2Cut: '-2 kg CO2',
          cleanWindow: '+4 hrs Clean Air',
        },
        category: 'Live Protocol',
      };

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [{ text: JSON.stringify(mockStructuredOutput) }]
              }
            }
          ]
        })
      });

      global.fetch = fetchMock;

      const result = await querySmogCoPilot('What should I do now?', mockContext);

      expect(fetchMock).toHaveBeenCalled();
      expect(result.headline).toBe('AI Live Smog Protocol');
      expect(result.actionPlan.length).toBe(4);
    });

    it('gracefully falls back to Local Engine when API key is missing', async () => {
      saveStoredApiKey('');
      const fetchSpy = vi.fn();
      global.fetch = fetchSpy;

      const result = await querySmogCoPilot('Build a safe routine', mockContext);

      // fetch should not be called when API key is empty
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(result.headline).toBeDefined();
      expect(result.actionPlan.length).toBeGreaterThanOrEqual(4);
    });

    it('gracefully falls back to Local Engine on network failure', async () => {
      saveStoredApiKey('AIzaSyValidTestKey');
      global.fetch = vi.fn().mockRejectedValue(new Error('Network connection failed'));

      const result = await querySmogCoPilot('Build a safe routine', mockContext);

      expect(result.headline).toBeDefined();
      expect(result.category).toBe('Family Routine Protocol');
    });

    it('gracefully falls back to Local Engine on non-200 API response', async () => {
      saveStoredApiKey('AIzaSyInvalidKey');
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ error: { message: 'API_KEY_INVALID' } }),
      });

      const result = await querySmogCoPilot('Build a safe routine', mockContext);

      expect(result.headline).toBeDefined();
      expect(result.actionPlan.length).toBeGreaterThanOrEqual(4);
    });
  });
});
