/**
 * Atmospheric & Environmental Health Constants
 * Validated against Berkeley Earth, CPCB/WHO guidelines, and ASHRAE Standard 52.2.
 */

// Berkeley Earth PM2.5 Inhalation Model
export const BERKELEY_EARTH_UG_PER_CIGARETTE = 330;
export const BERKELEY_EARTH_24H_BASELINE_UG = 22;

// Physiological Minute & Daily Ventilation Volumes (m3/day)
export const ADULT_RESTING_DAILY_BREATHING_VOLUME_M3 = 15;
export const ATHLETE_ACTIVE_DAILY_BREATHING_VOLUME_M3 = 22;

// Time & Frequency Multipliers
export const DAYS_IN_MONTH = 30;
export const MAX_CLEAN_AIR_HOURS_PER_DAY = 16;

// Exposure Reduction Limits
export const MAX_DAILY_DOSE_FILTER_CAP = 0.92;
export const MAX_INDOOR_FILTRATION_FACTOR = 0.85;
export const MIN_INDOOR_AQI_FLOOR = 22;

// Emission Conversion Factors (IPCC Tier-1)
export const NOX_GRAMS_PER_KG_CO2E = 14.2;

// Monthly Financial Savings Standards (INR)
export const CORSI_ROSENTHAL_MONTHLY_SAVINGS_INR = 450;
export const WET_MOPPING_MONTHLY_SAVINGS_INR = 200;
export const ROUTINE_SWAP_MONTHLY_SAVINGS_INR = 350;

// Demographic & Setup Baseline Adjustments
export const INDUCTION_METRO_CO2_BONUS_KG = 45;
export const INDUCTION_METRO_PM_BONUS_UG = 80;

// Diurnal Smog Boundary Curve Hours
export const SAFE_VENTILATION_WINDOW_START_HOUR = 12;
export const SAFE_VENTILATION_WINDOW_END_HOUR = 15;
export const MORNING_INVERSION_PEAK_START_HOUR = 6;
export const MORNING_INVERSION_PEAK_END_HOUR = 9;
export const EVENING_INVERSION_PEAK_START_HOUR = 18;
export const EVENING_INVERSION_PEAK_END_HOUR = 21;

// Air Quality Thresholds (ug/m3)
export const PM25_RISK_THRESHOLD_LOW = 50;
export const PM25_RISK_THRESHOLD_CAUTION = 120;
export const PM25_RISK_THRESHOLD_DANGER = 250;

// Corsi-Rosenthal Clean Air Delivery Rate (CADR) Specifications
export const MERV13_SINGLE_PASS_EFFICIENCY = 0.86;
export const CARDBOARD_SHROUD_EFFICIENCY_MULTIPLIER = 0.95;
export const STANDARD_ROOM_VOLUME_CUFT = 1710; // 180 sq ft bedroom x 9.5 ft ceiling height

// Box Fan Speed CFM Constants
export const FAN_CFM_LOW = 320;
export const FAN_CFM_MED = 440;
export const FAN_CFM_HIGH = 580;

// Box Fan Wattage Constants
export const FAN_WATTAGE_LOW = 38;
export const FAN_WATTAGE_MED = 54;
export const FAN_WATTAGE_HIGH = 72;
