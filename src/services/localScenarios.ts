import { UserContext } from '../types';
import { URBAN_ZONE_PROFILES, SMOG_SEVERITIES, HOUSEHOLD_PROFILES, SETUP_PROFILES } from '../data/urbanProfiles';

export interface StructuredAIOutput {
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
}

export function buildRoutineScenario(context: UserContext): StructuredAIOutput {
  const zone = URBAN_ZONE_PROFILES[context.zone];
  const severity = SMOG_SEVERITIES[context.severity];
  const household = HOUSEHOLD_PROFILES[context.household];

  return {
    headline: `Smog-Shield Routine for ${household.label} (${zone.name})`,
    actionPlan: [
      `Strict Indoor Lockout (06:00–09:30): Keep all exterior windows latched. Ambient PM2.5 is peaking at ~${Math.round(severity.pm25 * 1.15)} µg/m³ under low boundary layer inversion (${zone.keyBoundaryFactor}).`,
      `Sanctioned 30-Min Aeration (12:30–14:30): Execute filtered air exchange only during peak thermal convection when the boundary layer expands above 1100m.`,
      `Commute & Transit Shield: If transit is necessary, don well-fitted N95 masks; avoid motorized auto-rickshaws during 08:00–10:00 rush hours in favour of sealed metro coaches.`,
      `Pre-Bed Purge (20:30): Place rolled damp towels along bedroom door frames and run continuous low-cadence filtration to preserve nocturnal lung clearance.`
    ],
    whyItWorksScience: `Nocturnal ground-level cooling creates a steep temperature inversion below 200m that traps diesel soot and secondary nitrates. Developing pediatric lungs inhale 50% more air per kg of body weight than adults, while elderly alveolar elasticity is reduced. Concentrating outdoor activity strictly during the solar convective window (12 PM–3:30 PM) cuts daily inhaled particulate mass by over 45%.`,
    quantifiedBadge: {
      pmReduction: '-48% Inhaled PM2.5',
      co2Cut: '-2.4 kg CO₂/day',
      cleanWindow: '+4.5 hrs Safe Lung Window',
      costMetric: '₹350 Saved in Meds/Transit'
    },
    category: 'Family Routine Protocol'
  };
}

export function buildPurifierScenario(): StructuredAIOutput {
  return {
    headline: `Ultra-Low Cost Indoor Filtration Strategy (No ₹20,000 Purifier Needed)`,
    actionPlan: [
      `Deploy the Corsi-Rosenthal MERV-13 Box: Combine a standard 20-inch box fan with 4 pleated MERV-13 HVAC filters (total cost ~₹1,800). This delivers 350+ CFM Clean Air Delivery Rate (CADR)—outperforming many ₹25,000 branded purifiers.`,
      `Zero-Cost Wet Mopping Protocol: Discontinue dry broom sweeping immediately. Wet micro-fiber mopping eliminates the shearing resuspension of PM10 and settled black carbon particles.`,
      `Capillary Towel Door Seals: Roll two damp cotton towels along bottom door thresholds to arrest floor-level stack-effect infiltration from common corridors.`,
      `Humidity Regulation: Maintain 42%–48% relative humidity using shallow water trays near windows; heavier moist particles settle 3x faster out of suspension.`
    ],
    whyItWorksScience: `Air filtration efficiency is governed by media surface area, not motor noise. The 4-filter Corsi-Rosenthal geometry expands the filtration face area 4-fold, lowering face velocity and allowing electrostatic van der Waals forces in MERV-13 micro-fibers to capture sub-micron particles with 85%+ single-pass efficiency.`,
    quantifiedBadge: {
      pmReduction: '-84% Indoor PM2.5',
      co2Cut: 'Zero Embodied Carbon',
      cleanWindow: '+8.0 hrs Sanctuary Air',
      costMetric: '₹16,500 Saved vs Branded Filter'
    },
    category: 'DIY IAQ Engineering'
  };
}

export function buildCommuteScenario(): StructuredAIOutput {
  return {
    headline: `Atmosphere-Aware Commute Swap: Metro vs. Solo ICE Vehicle`,
    actionPlan: [
      `Phase Out Solo Petrol Driving: A 14 km solo car trip emits 2.5 kg CO₂ and exposes the driver to 160 µg/m³ in-cabin particulate buildup through air dampers.`,
      `Adopt Metro Rail + Shared E-Rickshaw: Shifts transit to an electrified subterranean/elevated corridor with multi-stage centralized air filtration.`,
      `Recirculation Cabin Discipline: If driving is unavoidable, toggle ventilation strictly to 'Cabin Recirculate' and insert a HEPA/Carbon cabin filter (cost: ₹350).`,
      `Stagger Travel Windows: Delay morning departure from 08:30 to 10:15 AM to escape peak nocturnal inversion entrapment.`
    ],
    whyItWorksScience: `Vehicle tailpipes emit hot exhaust plumes that immediately stall and concentrate at street level (0m–2m) due to winter thermal caps. In-cabin vehicle tests reveal that stop-and-go highway traffic concentrates ultrafine black carbon up to 400% higher than ambient rooftop monitors indicate.`,
    quantifiedBadge: {
      pmReduction: '-62% Commute Inhalation',
      co2Cut: '-45 kg CO₂/month',
      cleanWindow: '+1.5 hrs Clean Transit',
      costMetric: '₹3,200/month Fuel Savings'
    },
    category: 'Sustainable Transit Swap'
  };
}

export function buildCookingScenario(): StructuredAIOutput {
  return {
    headline: `Zero-Combustion Kitchen Defense & Cooking Aerosol Control`,
    actionPlan: [
      `Transition High-Heat Searing to Induction: Cooking with LPG releases up to 80 ppb unvented NO₂ and ultrafine carbon particles into enclosed rooms. Induction transfers 90% thermal energy directly to pans with zero flue combustion.`,
      `The 2-Minute Pre-Chimney Rule: Start exhaust hoods 120 seconds before lighting stoves to establish chimney draft suction before oil vaporizes.`,
      `Splatter Screen & Closed Vessel Technique: Cook high-oil dishes in sealed pressure cookers; avoid open pan dry-frying during peak morning hours.`,
      `Physical Kitchen Isolation: Keep kitchen doors shut and a small utility window cracked 2 inches to feed make-up air away from living areas.`
    ],
    whyItWorksScience: `High-temperature oil breakdown (>190°C) produces acrolein, aldehydes, and sub-micron condensable organic aerosol (COA). Combined with LPG burner combustion byproducts (NO₂ and CO), kitchen air without negative pressure ventilation rapidly exceeds WHO 24-hr safety limits by 800%.`,
    quantifiedBadge: {
      pmReduction: '-72% Kitchen Surge',
      co2Cut: '-26 kg CO₂/month',
      cleanWindow: '+3.0 hrs Restored Indoor Air',
      costMetric: '₹450/month Gas Savings'
    },
    category: 'Combustion & IAQ Protocol'
  };
}

export function buildDefaultScenario(context: UserContext): StructuredAIOutput {
  const zone = URBAN_ZONE_PROFILES[context.zone];
  const severity = SMOG_SEVERITIES[context.severity];
  const household = HOUSEHOLD_PROFILES[context.household];
  const setup = SETUP_PROFILES[context.setup];

  return {
    headline: `Contextual Atmospheric Intelligence for ${zone.name}`,
    actionPlan: [
      `Real-Time Alert Context: Current smog severity is ${severity.label} with an inversion ceiling at ~${severity.boundaryLayerHeight}m. Wind speed is stagnant at ${severity.windSpeed} km/h.`,
      `Tailored Recommendation for ${household.label} (${setup.label}): Shield indoor environments during the 06:00–09:30 and 18:00–21:30 inversion bounds.`,
      `Optimal Actionable Swap: Adopt zero-cost micro-fiber damp mopping and switch all possible commuter travel to electrified rapid transit.`,
      `Indoor Clean Air Sanctuary: Run continuous low-flow filtration in primary living and sleeping quarters to preserve bronchial cilia.`
    ],
    whyItWorksScience: `Winter thermal inversion locks human emissions and fine secondary aerosols beneath a cold planetary boundary layer. Without thermal convection, ground-level concentrations build up exponentially. Targeted timing of ventilation and elimination of point-source combustion is the scientifically proven strategy to cut physiological burden.`,
    quantifiedBadge: {
      pmReduction: '-38% Total Daily Exposure',
      co2Cut: '-1.8 kg CO₂/day',
      cleanWindow: '+3.5 hrs Clean Air Exposure',
      costMetric: '₹280/day Net Benefit'
    },
    category: 'Atmospheric Advisory'
  };
}
