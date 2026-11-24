import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSmogContext } from '../hooks/useSmogContext';

// Mock canvas-confetti to prevent canvas errors in jsdom
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('useSmogContext Hook', () => {
  it('initializes with default Indo-Gangetic Severe Inversion profile', () => {
    const { result } = renderHook(() => useSmogContext());

    expect(result.current.context.zone).toBe('indo-gangetic-metro');
    expect(result.current.context.severity).toBe('severe-inversion');
    expect(result.current.routines.length).toBeGreaterThan(0);
    expect(result.current.hacks.length).toBeGreaterThan(0);
    expect(result.current.alternatives.length).toBeGreaterThan(0);
  });

  it('updates zone and triggers impact recalculation', () => {
    const { result } = renderHook(() => useSmogContext());

    act(() => {
      result.current.handleContextChange({ zone: 'coastal-metro' });
    });

    expect(result.current.context.zone).toBe('coastal-metro');
  });

  it('toggles routine adoption and adopt-all', () => {
    const { result } = renderHook(() => useSmogContext());
    const firstRoutineId = result.current.routines[0].id;

    expect(result.current.routines[0].isAdopted).toBe(false);

    act(() => {
      result.current.handleToggleRoutine(firstRoutineId);
    });

    expect(result.current.routines.find(r => r.id === firstRoutineId)?.isAdopted).toBe(true);

    act(() => {
      result.current.handleAdoptAllRoutines();
    });

    expect(result.current.routines.every(r => r.isAdopted)).toBe(true);
  });

  it('toggles IAQ hacks and checklist-all', () => {
    const { result } = renderHook(() => useSmogContext());
    const firstHackId = result.current.hacks[0].id;

    act(() => {
      result.current.handleToggleHack(firstHackId);
    });

    expect(result.current.hacks.find(h => h.id === firstHackId)?.isChecklisted).toBe(true);

    act(() => {
      result.current.handleActivateAllHacks();
    });

    expect(result.current.hacks.every(h => h.isChecklisted)).toBe(true);
  });

  it('toggles sustainable alternatives', () => {
    const { result } = renderHook(() => useSmogContext());
    const firstAltId = result.current.alternatives[0].id;

    act(() => {
      result.current.handleToggleAlternative(firstAltId);
    });

    expect(result.current.alternatives.find(a => a.id === firstAltId)?.isAdopted).toBe(true);
  });

  it('handles batch adoption from AI recommendation', () => {
    const { result } = renderHook(() => useSmogContext());

    act(() => {
      result.current.handleAdoptFromAI();
    });

    // Initial 3 routines and hacks adopted
    const adoptedRoutines = result.current.routines.filter(r => r.isAdopted);
    const adoptedHacks = result.current.hacks.filter(h => h.isChecklisted);

    expect(adoptedRoutines.length).toBe(3);
    expect(adoptedHacks.length).toBe(3);
  });
});
