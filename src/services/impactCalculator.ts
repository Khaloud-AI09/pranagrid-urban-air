import { UserContext, RoutineBlock, IAQHack, SustainableAlternative, CalculatedImpact } from '../types';
import { SMOG_SEVERITIES, HOUSEHOLD_PROFILES, SETUP_PROFILES } from '../data/urbanProfiles';
import {
  BERKELEY_EARTH_UG_PER_CIGARETTE,
  ADULT_RESTING_DAILY_BREATHING_VOLUME_M3,
  ATHLETE_ACTIVE_DAILY_BREATHING_VOLUME_M3,
  DAYS_IN_MONTH,
  MAX_DAILY_DOSE_FILTER_CAP,
  MAX_INDOOR_FILTRATION_FACTOR,
  MIN_INDOOR_AQI_FLOOR,
  NOX_GRAMS_PER_KG_CO2E,
  MAX_CLEAN_AIR_HOURS_PER_DAY,
  CORSI_ROSENTHAL_MONTHLY_SAVINGS_INR,
  WET_MOPPING_MONTHLY_SAVINGS_INR,
  ROUTINE_SWAP_MONTHLY_SAVINGS_INR,
  INDUCTION_METRO_CO2_BONUS_KG,
  INDUCTION_METRO_PM_BONUS_UG,
} from '../constants/atmosphericConstants';

interface RoutineImpactResult {
  pmAvoidedUg: number;
  co2SavedKg: number;
  cleanHours: number;
  count: number;
}

/**
 * Computes particulate and greenhouse gas mitigation from adopted routine blocks
 */
function computeRoutineImpact(routines: RoutineBlock[]): RoutineImpactResult {
  let pmAvoidedUg = 0;
  let co2SavedKg = 0;
  let cleanHours = 0;
  let count = 0;

  for (const block of routines) {
    if (block.isAdopted) {
      count++;
      pmAvoidedUg += block.aiRecommendedSwap.exposureSavedUg;
      co2SavedKg += block.aiRecommendedSwap.co2SavedKg * DAYS_IN_MONTH;
      cleanHours += block.aiRecommendedSwap.cleanTimeGainedHours;
    }
  }

  return { pmAvoidedUg, co2SavedKg, cleanHours, count };
}

interface HackImpactResult {
  pmAvoidedUg: number;
  savingsINR: number;
  count: number;
}

/**
 * Computes indoor filtration benefits and financial savings from active IAQ checklist items
 */
function computeHackImpact(hacks: IAQHack[], ambientPM25: number, breathingVolume: number): HackImpactResult {
  let pmAvoidedUg = 0;
  let savingsINR = 0;
  let count = 0;

  for (const hack of hacks) {
    if (hack.isChecklisted) {
      count++;
      const filteredDose = ambientPM25 * breathingVolume * 0.6 * (hack.pmReductionPercent / 100);
      pmAvoidedUg += Math.round(filteredDose * 0.35);

      if (hack.id === 'hack-corsi-rosenthal') {
        savingsINR += CORSI_ROSENTHAL_MONTHLY_SAVINGS_INR;
      } else if (hack.id === 'hack-wet-mop') {
        savingsINR += WET_MOPPING_MONTHLY_SAVINGS_INR;
      }
    }
  }

  return { pmAvoidedUg, savingsINR, count };
}

interface AltImpactResult {
  co2SavedKg: number;
  savingsINR: number;
  count: number;
}

/**
 * Computes community alternative displacements
 */
function computeAltImpact(alternatives: SustainableAlternative[]): AltImpactResult {
  let co2SavedKg = 0;
  let savingsINR = 0;
  let count = 0;

  for (const alt of alternatives) {
    if (alt.isAdopted) {
      count++;
      co2SavedKg += alt.sustainableSwap.netCO2ReductionKg;
      savingsINR += alt.sustainableSwap.netSavingsINR;
    }
  }

  return { co2SavedKg, savingsINR, count };
}

/**
 * Scientific Impact Calculator
 * Integrates Berkeley Earth, WHO inhalation, and IPCC Tier-1 greenhouse gas formulas.
 */
export function calculateDirectImpact(
  context: UserContext,
  routines: RoutineBlock[],
  hacks: IAQHack[],
  alternatives: SustainableAlternative[]
): CalculatedImpact {
  const severity = SMOG_SEVERITIES[context.severity];
  const household = HOUSEHOLD_PROFILES[context.household];
  const setup = SETUP_PROFILES[context.setup];

  const ambientPM25 = severity.pm25;
  const baseVolume = context.household === 'outdoor-athletes'
    ? ATHLETE_ACTIVE_DAILY_BREATHING_VOLUME_M3
    : ADULT_RESTING_DAILY_BREATHING_VOLUME_M3;

  const rImpact = computeRoutineImpact(routines);
  const hImpact = computeHackImpact(hacks, ambientPM25, baseVolume);
  const aImpact = computeAltImpact(alternatives);

  const co2Bonus = setup.id === 'induction-metro' ? INDUCTION_METRO_CO2_BONUS_KG : 0;
  const pmBonus = setup.id === 'induction-metro' ? INDUCTION_METRO_PM_BONUS_UG : 0;

  const rawPMAvoided = (rImpact.pmAvoidedUg + hImpact.pmAvoidedUg + pmBonus) * household.sensitivityMultiplier;
  const totalPMAvoidedUg = Math.min(Math.round(rawPMAvoided), ambientPM25 * baseVolume * MAX_DAILY_DOSE_FILTER_CAP);

  const totalCO2eKg = Math.round(rImpact.co2SavedKg + aImpact.co2SavedKg + co2Bonus);
  const totalSavings = Math.max(aImpact.savingsINR + hImpact.savingsINR + rImpact.count * ROUTINE_SWAP_MONTHLY_SAVINGS_INR, 0);

  const filterFactor = Math.min(MAX_INDOOR_FILTRATION_FACTOR, rImpact.count * 0.12 + hImpact.count * 0.14 + (setup.id === 'induction-metro' ? 0.15 : 0.05));
  const cleanHours = Math.min(Number((rImpact.cleanHours * 0.8 + hImpact.count * 1.2).toFixed(1)), MAX_CLEAN_AIR_HOURS_PER_DAY);

  return {
    pm25AvoidedDailyUg: totalPMAvoidedUg,
    cigarettesAvoidedDaily: Number((totalPMAvoidedUg / BERKELEY_EARTH_UG_PER_CIGARETTE).toFixed(1)),
    co2ePreventedMonthlyKg: totalCO2eKg,
    noxPreventedMonthlyG: Math.round(totalCO2eKg * NOX_GRAMS_PER_KG_CO2E),
    cleanAirHoursGained: cleanHours,
    monthlySavingsINR: Math.round(totalSavings),
    totalSwapsAdopted: rImpact.count + aImpact.count,
    totalHacksActive: hImpact.count,
    indoorAQIEstimate: Math.max(MIN_INDOOR_AQI_FLOOR, Math.round(severity.aqi * (1 - filterFactor))),
  };
}
