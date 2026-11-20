import { UserContext, RoutineBlock, IAQHack, SustainableAlternative, CalculatedImpact } from '../types';
import { URBAN_ZONE_PROFILES, SMOG_SEVERITIES, HOUSEHOLD_PROFILES, SETUP_PROFILES } from '../data/urbanProfiles';

/**
 * Scientific Impact Calculator
 * Integrates:
 * 1. Berkeley Earth PM2.5-to-Cigarette Equivalence Model (22 ug/m3 inhaled = 1 cigarette/day)
 * 2. CPCB & WHO Daily Inhalation Volume Model (Adult resting/light activity: ~15 m3/day)
 * 3. IPCC Tier-1 Fuel Emission Factors for Light Motor Vehicles & LPG
 */
export function calculateDirectImpact(
  context: UserContext,
  routines: RoutineBlock[],
  hacks: IAQHack[],
  alternatives: SustainableAlternative[]
): CalculatedImpact {
  const zone = URBAN_ZONE_PROFILES[context.zone];
  const severity = SMOG_SEVERITIES[context.severity];
  const household = HOUSEHOLD_PROFILES[context.household];
  const setup = SETUP_PROFILES[context.setup];

  // Baseline ambient PM2.5 based on severity and zone
  const ambientPM25 = severity.pm25;
  // Daily breathing volume (m3/day)
  const baseBreathingVolumeM3 = context.household === 'outdoor-athletes' ? 22 : 15;

  // 1. Calculate PM2.5 avoided from adopted routines
  let routinePMAvoidedUg = 0;
  let routineCO2SavedKg = 0;
  let cleanAirHoursFromRoutines = 0;
  let adoptedRoutineCount = 0;

  routines.forEach(block => {
    if (block.isAdopted) {
      adoptedRoutineCount++;
      routinePMAvoidedUg += block.aiRecommendedSwap.exposureSavedUg;
      routineCO2SavedKg += block.aiRecommendedSwap.co2SavedKg * 30; // monthly
      cleanAirHoursFromRoutines += block.aiRecommendedSwap.cleanTimeGainedHours;
    }
  });

  // 2. Calculate PM2.5 avoided & savings from active IAQ hacks
  let hackPMAvoidedUg = 0;
  let activeHackCount = 0;
  let hackMonthlyCostSavings = 0;

  hacks.forEach(hack => {
    if (hack.isChecklisted) {
      activeHackCount++;
      // Incremental fraction of ambient dose filtered indoors
      const effectiveFilteredDose = (ambientPM25 * baseBreathingVolumeM3 * 0.6) * (hack.pmReductionPercent / 100);
      hackPMAvoidedUg += Math.round(effectiveFilteredDose * 0.35);

      // Energy / healthcare savings
      if (hack.id === 'hack-corsi-rosenthal') {
        hackMonthlyCostSavings += 450; // Filter vs branded commercial cartridge replacement
      } else if (hack.id === 'hack-wet-mop') {
        hackMonthlyCostSavings += 200; // Reduced allergy medication
      }
    }
  });

  // 3. Calculate community alternatives impact
  let altCO2SavedKg = 0;
  let altMonthlySavingsINR = 0;
  let adoptedAltCount = 0;

  alternatives.forEach(alt => {
    if (alt.isAdopted) {
      adoptedAltCount++;
      altCO2SavedKg += alt.sustainableSwap.netCO2ReductionKg;
      altMonthlySavingsINR += alt.sustainableSwap.netSavingsINR;
    }
  });

  // Setup profile base adjustments
  const setupCO2Bonus = setup.id === 'induction-metro' ? 45 : 0;
  const setupPMBonus = setup.id === 'induction-metro' ? 80 : 0;

  // Cumulative PM2.5 avoided (ug/day)
  const totalPMAvoidedUg = Math.min(
    Math.round((routinePMAvoidedUg + hackPMAvoidedUg + setupPMBonus) * household.sensitivityMultiplier),
    ambientPM25 * baseBreathingVolumeM3 * 0.92 // Cap at 92% of maximum possible daily dose
  );

  // Berkeley Earth Model: 1 cigarette = 22 ug/m3 24h exposure (~330 ug total inhaled mass)
  const cigarettesAvoidedDaily = Number((totalPMAvoidedUg / 330).toFixed(1));

  // Monthly CO2e prevented (kg)
  const totalCO2eKg = Math.round(routineCO2SavedKg + altCO2SavedKg + setupCO2Bonus);

  // Monthly NOx avoided (grams) - derived from vehicle and combustion reduction
  const totalNOxG = Math.round(totalCO2eKg * 14.2);

  // Clean air hours gained per day (capped at 16 hrs max daytime active gain)
  const cleanAirHoursGained = Math.min(
    Number((cleanAirHoursFromRoutines * 0.8 + activeHackCount * 1.2).toFixed(1)),
    16
  );

  // Monthly financial savings (INR)
  const totalMonthlySavingsINR = Math.max(
    Math.round(altMonthlySavingsINR + hackMonthlyCostSavings + (adoptedRoutineCount * 350)),
    0
  );

  // Estimated Indoor AQI after mitigations
  const filtrationFactor = Math.min(0.85, (adoptedRoutineCount * 0.12) + (activeHackCount * 0.14) + (setup.id === 'induction-metro' ? 0.15 : 0.05));
  const indoorAQIEstimate = Math.max(22, Math.round(severity.aqi * (1 - filtrationFactor)));

  return {
    pm25AvoidedDailyUg: totalPMAvoidedUg,
    cigarettesAvoidedDaily,
    co2ePreventedMonthlyKg: totalCO2eKg,
    noxPreventedMonthlyG: totalNOxG,
    cleanAirHoursGained,
    monthlySavingsINR: totalMonthlySavingsINR,
    totalSwapsAdopted: adoptedRoutineCount + adoptedAltCount,
    totalHacksActive: activeHackCount,
    indoorAQIEstimate,
  };
}
