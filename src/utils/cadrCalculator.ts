import {
  FAN_CFM_LOW,
  FAN_CFM_MED,
  FAN_CFM_HIGH,
  FAN_WATTAGE_LOW,
  FAN_WATTAGE_MED,
  FAN_WATTAGE_HIGH,
  MERV13_SINGLE_PASS_EFFICIENCY,
  CARDBOARD_SHROUD_EFFICIENCY_MULTIPLIER,
  STANDARD_ROOM_VOLUME_CUFT,
} from '../constants/atmosphericConstants';

export type FanSpeed = 'low' | 'med' | 'high';

export interface CADRMetrics {
  cadr: number;
  airChangesPerHr: string;
  wattage: number;
  dailyCostINR: number;
}

/**
 * Returns fan cubic feet per minute based on active speed
 */
export function getFanCFM(speed: FanSpeed): number {
  switch (speed) {
    case 'low': return FAN_CFM_LOW;
    case 'med': return FAN_CFM_MED;
    case 'high': return FAN_CFM_HIGH;
  }
}

/**
 * Returns fan electrical draw in Watts
 */
export function getFanWattage(speed: FanSpeed): number {
  switch (speed) {
    case 'low': return FAN_WATTAGE_LOW;
    case 'med': return FAN_WATTAGE_MED;
    case 'high': return FAN_WATTAGE_HIGH;
  }
}

/**
 * Calculates Clean Air Delivery Rate (CADR) and room circulation metrics
 */
export function calculateCADRMetrics(speed: FanSpeed): CADRMetrics {
  const cfm = getFanCFM(speed);
  const wattage = getFanWattage(speed);
  const cadr = Math.round(cfm * MERV13_SINGLE_PASS_EFFICIENCY * CARDBOARD_SHROUD_EFFICIENCY_MULTIPLIER);
  const ach = ((cadr * 60) / STANDARD_ROOM_VOLUME_CUFT).toFixed(1);
  const dailyCost = Math.round((wattage * 24 * 9.5) / 1000); // 9.5 INR/kWh commercial/residential slab

  return {
    cadr,
    airChangesPerHr: ach,
    wattage,
    dailyCostINR: dailyCost,
  };
}
