import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCoPilotStream } from '../hooks/useCoPilotStream';
import { UserContext } from '../types';

describe('useCoPilotStream Hook', () => {
  const sampleContext: UserContext = {
    zone: 'indo-gangetic-metro',
    household: 'kids-elderly',
    setup: 'gas-petrol',
    severity: 'severe-inversion',
  };

  it('initializes with baseline atmospheric advice for current zone', () => {
    const { result } = renderHook(() => useCoPilotStream(sampleContext));

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].sender).toBe('assistant');
    expect(result.current.messages[0].structuredResponse?.headline).toContain('Indo-Gangetic Dense Metro');
    expect(result.current.smartChips.length).toBeGreaterThan(0);
  });

  it('updates inputQuery state cleanly', () => {
    const { result } = renderHook(() => useCoPilotStream(sampleContext));

    act(() => {
      result.current.setInputQuery('How to build a DIY air purifier?');
    });

    expect(result.current.inputQuery).toBe('How to build a DIY air purifier?');
  });

  it('dispatches query, shows user message, and streams assistant response', async () => {
    // Fast mock for timer/streaming
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const { result } = renderHook(() => useCoPilotStream(sampleContext));

    let sendPromise: Promise<void>;
    act(() => {
      sendPromise = result.current.handleSend('How does boundary layer inversion trap stove and exhaust smoke?');
    });

    // User message should immediately be added
    expect(result.current.messages.some(m => m.sender === 'user')).toBe(true);

    // Fast-forward simulated stream intervals
    await act(async () => {
      await vi.runAllTimersAsync();
      await sendPromise!;
    });

    // Assistant response should now be added
    expect(result.current.messages.length).toBeGreaterThanOrEqual(2);
    const lastMsg = result.current.messages[result.current.messages.length - 1];
    expect(lastMsg.sender).toBe('assistant');
    expect(lastMsg.structuredResponse?.actionPlan.length).toBeGreaterThan(0);

    vi.useRealTimers();
  });

  it('ignores empty queries', async () => {
    const { result } = renderHook(() => useCoPilotStream(sampleContext));
    const initialLen = result.current.messages.length;

    await act(async () => {
      await result.current.handleSend('   ');
    });

    expect(result.current.messages.length).toBe(initialLen);
  });
});
