import { useState, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { UserContext, RoutineBlock, IAQHack, SustainableAlternative, SmogSeverityLevel, CalculatedImpact } from '../types';
import { INITIAL_ROUTINE_BLOCKS } from '../data/routineTemplates';
import { IAQ_HACKS_DATA } from '../data/iaqHacks';
import { SUSTAINABLE_ALTERNATIVES_DATA } from '../data/communityAlternatives';
import { calculateDirectImpact } from '../services/impactCalculator';

export interface SmogContextHook {
  context: UserContext;
  routines: RoutineBlock[];
  hacks: IAQHack[];
  alternatives: SustainableAlternative[];
  calculatedImpact: CalculatedImpact;
  handleContextChange: (newContext: Partial<UserContext>) => void;
  handleSeverityChange: (severity: SmogSeverityLevel) => void;
  handleToggleRoutine: (id: string) => void;
  handleAdoptAllRoutines: () => void;
  handleToggleHack: (id: string) => void;
  handleActivateAllHacks: () => void;
  handleToggleAlternative: (id: string) => void;
  handleAdoptFromAI: () => void;
}

const triggerCelebration = () => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#10B981', '#06B6D4', '#3B82F6'],
  });
};

function useRoutineManager() {
  const [routines, setRoutines] = useState<RoutineBlock[]>(INITIAL_ROUTINE_BLOCKS);

  const toggle = useCallback((id: string) => {
    setRoutines(prev => prev.map(b => {
      if (b.id !== id) return b;
      if (!b.isAdopted) triggerCelebration();
      return { ...b, isAdopted: !b.isAdopted };
    }));
  }, []);

  const adoptAll = useCallback(() => {
    triggerCelebration();
    setRoutines(prev => prev.map(b => ({ ...b, isAdopted: true })));
  }, []);

  const adoptTop3 = useCallback(() => {
    setRoutines(prev => prev.map((r, i) => i < 3 ? { ...r, isAdopted: true } : r));
  }, []);

  return { routines, toggle, adoptAll, adoptTop3 };
}

function useHackManager() {
  const [hacks, setHacks] = useState<IAQHack[]>(IAQ_HACKS_DATA);

  const toggle = useCallback((id: string) => {
    setHacks(prev => prev.map(h => {
      if (h.id !== id) return h;
      if (!h.isChecklisted) triggerCelebration();
      return { ...h, isChecklisted: !h.isChecklisted };
    }));
  }, []);

  const activateAll = useCallback(() => {
    triggerCelebration();
    setHacks(prev => prev.map(h => ({ ...h, isChecklisted: true })));
  }, []);

  const activateTop3 = useCallback(() => {
    setHacks(prev => prev.map((h, i) => i < 3 ? { ...h, isChecklisted: true } : h));
  }, []);

  return { hacks, toggle, activateAll, activateTop3 };
}

function useAlternativeManager() {
  const [alternatives, setAlternatives] = useState<SustainableAlternative[]>(SUSTAINABLE_ALTERNATIVES_DATA);

  const toggle = useCallback((id: string) => {
    setAlternatives(prev => prev.map(a => {
      if (a.id !== id) return a;
      if (!a.isAdopted) triggerCelebration();
      return { ...a, isAdopted: !a.isAdopted };
    }));
  }, []);

  return { alternatives, toggle };
}

/**
 * Custom React hook managing atmospheric context, routines, IAQ hacks, and impact calculations
 */
export function useSmogContext(): SmogContextHook {
  const [context, setContext] = useState<UserContext>({
    zone: 'indo-gangetic-metro',
    household: 'kids-elderly',
    setup: 'gas-petrol',
    severity: 'severe-inversion',
  });

  const { routines, toggle: handleToggleRoutine, adoptAll: handleAdoptAllRoutines, adoptTop3 } = useRoutineManager();
  const { hacks, toggle: handleToggleHack, activateAll: handleActivateAllHacks, activateTop3 } = useHackManager();
  const { alternatives, toggle: handleToggleAlternative } = useAlternativeManager();

  const calculatedImpact = useMemo(() => {
    return calculateDirectImpact(context, routines, hacks, alternatives);
  }, [context, routines, hacks, alternatives]);

  const handleContextChange = useCallback((newContext: Partial<UserContext>) => {
    setContext(prev => ({ ...prev, ...newContext }));
  }, []);

  const handleSeverityChange = useCallback((severity: SmogSeverityLevel) => {
    setContext(prev => ({ ...prev, severity }));
  }, []);

  const handleAdoptFromAI = useCallback(() => {
    triggerCelebration();
    adoptTop3();
    activateTop3();
  }, [adoptTop3, activateTop3]);

  return {
    context,
    routines,
    hacks,
    alternatives,
    calculatedImpact,
    handleContextChange,
    handleSeverityChange,
    handleToggleRoutine,
    handleAdoptAllRoutines,
    handleToggleHack,
    handleActivateAllHacks,
    handleToggleAlternative,
    handleAdoptFromAI,
  };
}
