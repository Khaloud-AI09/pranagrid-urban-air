export type UrbanZoneId = 
  | 'indo-gangetic-metro'
  | 'industrial-transit-corridor'
  | 'tier2-valley-inversion'
  | 'coastal-urban-hub'
  | 'suburban-residential';

export interface UrbanZoneProfile {
  id: UrbanZoneId;
  name: string;
  badge: string;
  description: string;
  baselineAQI: number;
  inversionRisk: 'Extreme' | 'High' | 'Moderate' | 'Low';
  dominantPollutants: string[];
  keyBoundaryFactor: string;
  defaultWindSpeed: number; // km/h
  typicalTempRange: string;
}

export type HouseholdType = 
  | 'kids-elderly'
  | 'working-commuters'
  | 'outdoor-athletes'
  | 'respiratory-sensitive';

export interface HouseholdProfile {
  id: HouseholdType;
  label: string;
  iconName: string;
  description: string;
  sensitivityMultiplier: number; // For health risk weighting
  vulnerableCount: number;
}

export type CommuteCookingSetup = 
  | 'gas-petrol'
  | 'induction-metro'
  | 'budget-renter'
  | 'balcony-courtyard';

export interface SetupProfile {
  id: CommuteCookingSetup;
  label: string;
  description: string;
  baselineMonthlyCO2kg: number;
  baselinePMExposureUg: number;
}

export type SmogSeverityLevel = 'moderate' | 'very-poor' | 'severe-inversion';

export interface SmogSeverityData {
  level: SmogSeverityLevel;
  label: string;
  aqi: number;
  pm25: number; // ug/m3
  pm10: number; // ug/m3
  no2: number;  // ppb
  co: number;   // ppm
  temp: number; // Celsius
  windSpeed: number; // km/h
  boundaryLayerHeight: number; // meters
  inversionLocked: boolean;
  healthAdvisory: string;
  colorHex: string;
}

export interface DiurnalPoint {
  hour: number;
  label: string;
  pm25: number;
  boundaryLayerMeters: number;
  isVentilationWindow: boolean;
  isInversionPeak: boolean;
  ambientRisk: 'Low' | 'Caution' | 'Danger' | 'Hazardous';
}

export interface RoutineBlock {
  id: string;
  timeRange: string;
  startHour: number;
  endHour: number;
  title: string;
  boundaryLayerPhase: string;
  phaseRiskLevel: 'Hazardous' | 'Caution' | 'Favorable';
  highEmissionDefault: {
    action: string;
    pmImpact: string;
    emissionFootprint: string;
  };
  aiRecommendedSwap: {
    action: string;
    scientificRationale: string;
    pmReductionPercent: number;
    co2SavedKg: number;
    exposureSavedUg: number;
    cleanTimeGainedHours: number;
  };
  isAdopted: boolean;
}

export interface IAQHack {
  id: string;
  category: 'zero-cost' | 'low-budget-diy' | 'bio-filtration';
  title: string;
  tagline: string;
  cost: string;
  costNum: number;
  pmReductionPercent: number;
  difficulty: 'Zero Effort' | '15-min DIY' | 'Weekend Project';
  scientificPrinciple: string;
  instructions: string[];
  cadrScore?: string;
  isChecklisted: boolean;
  badge?: string;
}

export interface SustainableAlternative {
  id: string;
  category: 'Mobility' | 'Cooking & Energy' | 'Community Watch';
  title: string;
  baselineChoice: {
    title: string;
    pmContribution: string;
    monthlyEmissionsKg: number;
    monthlyCostINR: number;
  };
  sustainableSwap: {
    title: string;
    pmBenefit: string;
    monthlyEmissionsKg: number;
    monthlyCostINR: number;
    netSavingsINR: number;
    netCO2ReductionKg: number;
  };
  communityImpact: string;
  isAdopted: boolean;
}

export interface CoPilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  isStreaming?: boolean;
  structuredResponse?: {
    headline: string;
    actionPlan: string[];
    whyItWorksScience: string;
    quantifiedBadge: {
      pmReduction: string;
      co2Cut: string;
      cleanWindow: string;
      costMetric?: string;
    };
    category: string;
  };
}

export interface UserContext {
  zone: UrbanZoneId;
  household: HouseholdType;
  setup: CommuteCookingSetup;
  severity: SmogSeverityLevel;
}

export interface CalculatedImpact {
  pm25AvoidedDailyUg: number;
  cigarettesAvoidedDaily: number;
  co2ePreventedMonthlyKg: number;
  noxPreventedMonthlyG: number;
  cleanAirHoursGained: number;
  monthlySavingsINR: number;
  totalSwapsAdopted: number;
  totalHacksActive: number;
  indoorAQIEstimate: number;
}
