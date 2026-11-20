import { describe, it, expect } from 'vitest';
import { calculateDirectImpact } from '../services/impactCalculator';
import { INITIAL_ROUTINE_BLOCKS } from '../data/routineTemplates';
import { IAQ_HACKS_DATA } from '../data/iaqHacks';
import { SUSTAINABLE_ALTERNATIVES_DATA } from '../data/communityAlternatives';
import { UserContext } from '../types';

describe('Scientific Impact Calculator', () => {
  const baseContext: UserContext = {
    zone: 'indo-gangetic-metro',
    household: 'kids-elderly',
    setup: 'gas-petrol',
    severity: 'severe-inversion',
  };

  it('calculates baseline metrics when zero swaps are adopted', () => {
    const unadoptedRoutines = INITIAL_ROUTINE_BLOCKS.map(r => ({ ...r, isAdopted: false }));
    const uncheckedHacks = IAQ_HACKS_DATA.map(h => ({ ...h, isChecklisted: false }));
    const unadoptedAlts = SUSTAINABLE_ALTERNATIVES_DATA.map(a => ({ ...a, isAdopted: false }));

    const result = calculateDirectImpact(baseContext, unadoptedRoutines, uncheckedHacks, unadoptedAlts);

    expect(result.totalSwapsAdopted).toBe(0);
    expect(result.totalHacksActive).toBe(0);
    expect(result.co2ePreventedMonthlyKg).toBe(0);
    expect(result.monthlySavingsINR).toBe(0);
    // Ambient AQI is 442, with minimal passive filtration indoor AQI should remain close to ambient
    expect(result.indoorAQIEstimate).toBeGreaterThan(350);
  });

  it('calculates significant PM2.5 and cigarette avoidance when routine swaps are adopted', () => {
    const adoptedRoutines = INITIAL_ROUTINE_BLOCKS.map(r => ({ ...r, isAdopted: true }));
    const uncheckedHacks = IAQ_HACKS_DATA.map(h => ({ ...h, isChecklisted: false }));
    const unadoptedAlts = SUSTAINABLE_ALTERNATIVES_DATA.map(a => ({ ...a, isAdopted: false }));

    const result = calculateDirectImpact(baseContext, adoptedRoutines, uncheckedHacks, unadoptedAlts);

    expect(result.totalSwapsAdopted).toBe(5);
    expect(result.pm25AvoidedDailyUg).toBeGreaterThan(500);
    // Berkeley Earth equivalence: PM2.5 ug / 330 ug = cigarettes avoided
    expect(result.cigarettesAvoidedDaily).toBeGreaterThan(1.5);
    expect(result.cleanAirHoursGained).toBeGreaterThan(5);
    expect(result.indoorAQIEstimate).toBeLessThan(250);
  });

  it('calculates maximum impact when all interventions are active', () => {
    const adoptedRoutines = INITIAL_ROUTINE_BLOCKS.map(r => ({ ...r, isAdopted: true }));
    const activeHacks = IAQ_HACKS_DATA.map(h => ({ ...h, isChecklisted: true }));
    const adoptedAlts = SUSTAINABLE_ALTERNATIVES_DATA.map(a => ({ ...a, isAdopted: true }));

    const result = calculateDirectImpact(baseContext, adoptedRoutines, activeHacks, adoptedAlts);

    expect(result.totalSwapsAdopted).toBe(9); // 5 routines + 4 alternatives
    expect(result.totalHacksActive).toBe(IAQ_HACKS_DATA.length);
    expect(result.co2ePreventedMonthlyKg).toBeGreaterThan(200);
    expect(result.monthlySavingsINR).toBeGreaterThan(4000);
    expect(result.indoorAQIEstimate).toBeLessThan(100);
  });

  it('adapts calculations for Moderate (115) vs Severe Inversion (440+)', () => {
    const adoptedRoutines = INITIAL_ROUTINE_BLOCKS.map(r => ({ ...r, isAdopted: true }));
    const activeHacks = IAQ_HACKS_DATA.map(h => ({ ...h, isChecklisted: true }));
    const adoptedAlts = SUSTAINABLE_ALTERNATIVES_DATA.map(a => ({ ...a, isAdopted: true }));

    const moderateContext: UserContext = { ...baseContext, severity: 'moderate' };
    const severeContext: UserContext = { ...baseContext, severity: 'severe-inversion' };

    const modResult = calculateDirectImpact(moderateContext, adoptedRoutines, activeHacks, adoptedAlts);
    const sevResult = calculateDirectImpact(severeContext, adoptedRoutines, activeHacks, adoptedAlts);

    // Severe smog has higher particulate concentration, so absolute mass avoided is higher
    expect(sevResult.pm25AvoidedDailyUg).toBeGreaterThan(modResult.pm25AvoidedDailyUg);
    expect(sevResult.cigarettesAvoidedDaily).toBeGreaterThan(modResult.cigarettesAvoidedDaily);
  });

  it('weighs health vulnerability correctly for asthmatic vs standard households', () => {
    const adoptedRoutines = INITIAL_ROUTINE_BLOCKS.map(r => ({ ...r, isAdopted: true }));
    const uncheckedHacks = IAQ_HACKS_DATA.map(h => ({ ...h, isChecklisted: false }));
    const unadoptedAlts = SUSTAINABLE_ALTERNATIVES_DATA.map(a => ({ ...a, isAdopted: false }));

    const asthmaticContext: UserContext = { ...baseContext, household: 'respiratory-sensitive' };
    const commuterContext: UserContext = { ...baseContext, household: 'working-commuters' };

    const asthmaticResult = calculateDirectImpact(asthmaticContext, adoptedRoutines, uncheckedHacks, unadoptedAlts);
    const commuterResult = calculateDirectImpact(commuterContext, adoptedRoutines, uncheckedHacks, unadoptedAlts);

    expect(asthmaticResult.pm25AvoidedDailyUg).toBeGreaterThan(commuterResult.pm25AvoidedDailyUg);
  });
});
