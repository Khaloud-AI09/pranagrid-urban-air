import { SustainableAlternative } from '../types';

export const SUSTAINABLE_ALTERNATIVES_DATA: SustainableAlternative[] = [
  {
    id: 'alt-mobility-metro',
    category: 'Mobility',
    title: 'Solo Petrol Car Commute ➔ Metro Rapid Transit + Shared E-Rickshaw',
    baselineChoice: {
      title: 'Solo Hatchback / Sedan (14 km roundtrip)',
      pmContribution: 'Emits 1.8 kg CO₂/day + 180 mg direct exhaust PM2.5 + brake/tire abrasion dust.',
      monthlyEmissionsKg: 54,
      monthlyCostINR: 5200,
    },
    sustainableSwap: {
      title: 'Electrified Metro Rail + First/Last Mile Shared E-Rickshaw',
      pmBenefit: '-88% personal transit emissions; air-filtered coaches cut transit inhalation by 62%.',
      monthlyEmissionsKg: 6.5,
      monthlyCostINR: 1800,
      netSavingsINR: 3400,
      netCO2ReductionKg: 47.5,
    },
    communityImpact: 'Taking 1 car off congested arterial roads prevents 4.2 kg NOx and eliminates 12 meters of idling traffic tailpipe emissions.',
    isAdopted: false,
  },
  {
    id: 'alt-cooking-induction',
    category: 'Cooking & Energy',
    title: 'Open LPG Flame Cooking ➔ Precision Induction + Pressure Cooker',
    baselineChoice: {
      title: 'Standard Dual-Burner LPG Gas Stove',
      pmContribution: 'Releases 35–80 ppb unvented NO₂ + trace benzene into residential indoor breathing zones.',
      monthlyEmissionsKg: 38,
      monthlyCostINR: 1150,
    },
    sustainableSwap: {
      title: 'High-Efficiency Induction Cooktop + Multi-Tier Pressure Cooker',
      pmBenefit: '100% elimination of indoor combustion flue gases; cuts cooking time by 45%.',
      monthlyEmissionsKg: 12,
      monthlyCostINR: 650,
      netSavingsINR: 500,
      netCO2ReductionKg: 26,
    },
    communityImpact: 'Cuts neighborhood domestic gas plume loading during evening 19:00–21:00 inversion descent.',
    isAdopted: false,
  },
  {
    id: 'alt-community-dust-watch',
    category: 'Community Watch',
    title: 'Passive Acceptance ➔ RWA Anti-Biomass & Construction Dust Vigil',
    baselineChoice: {
      title: 'Unchecked perimeter dry sweeping & evening open waste fires',
      pmContribution: 'Localized PM2.5 plumes spike beyond 800 µg/m³ inside residential societies.',
      monthlyEmissionsKg: 85,
      monthlyCostINR: 0,
    },
    sustainableSwap: {
      title: 'Community Green-Cover Shield, Mist Sprinklers & Guard Heating Grants',
      pmBenefit: 'Provides low-wattage electric radiant quartz heaters to society security guards; water-mist perimeter suppression.',
      monthlyEmissionsKg: 15,
      monthlyCostINR: 150, // Per-flat contribution
      netSavingsINR: -150,
      netCO2ReductionKg: 70,
    },
    communityImpact: 'Eliminates open biomass burning by night watchmen across the entire apartment complex.',
    isAdopted: false,
  },
  {
    id: 'alt-school-carpool',
    category: 'Mobility',
    title: 'Individual School Car Drop-Offs ➔ Society Walking Bus / Shared EV Van',
    baselineChoice: {
      title: '50 private cars idling at school gates during 07:30 AM inversion spike',
      pmContribution: 'Creates severe localized toxic fume cloud at children breathing height (0.8m–1.2m).',
      monthlyEmissionsKg: 42,
      monthlyCostINR: 2800,
    },
    sustainableSwap: {
      title: '4-Family Shared EV Carpool / Supervised Pedestrian Walking Train',
      pmBenefit: 'Shields children from extreme morning tailpipe plumes; eliminates gate idling.',
      monthlyEmissionsKg: 8,
      monthlyCostINR: 900,
      netSavingsINR: 1900,
      netCO2ReductionKg: 34,
    },
    communityImpact: 'Reduces school gate morning vehicle congestion by 75%, protecting thousands of young lungs.',
    isAdopted: false,
  },
];
