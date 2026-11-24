import { DiurnalPoint, SmogSeverityLevel } from '../types';
import {
  SAFE_VENTILATION_WINDOW_START_HOUR,
  SAFE_VENTILATION_WINDOW_END_HOUR,
  MORNING_INVERSION_PEAK_START_HOUR,
  MORNING_INVERSION_PEAK_END_HOUR,
  EVENING_INVERSION_PEAK_START_HOUR,
  EVENING_INVERSION_PEAK_END_HOUR,
  PM25_RISK_THRESHOLD_LOW,
  PM25_RISK_THRESHOLD_CAUTION,
  PM25_RISK_THRESHOLD_DANGER,
} from '../constants/atmosphericConstants';

/**
 * Baseline 24-hour diurnal profile of urban boundary layer height and particulate ratios
 */
export const DIURNAL_24H_BASE: Array<{ hour: number; label: string; baseBLH: number; basePM25Ratio: number }> = [
  { hour: 0, label: '12 AM', baseBLH: 220, basePM25Ratio: 0.88 },
  { hour: 2, label: '2 AM', baseBLH: 190, basePM25Ratio: 0.92 },
  { hour: 4, label: '4 AM', baseBLH: 160, basePM25Ratio: 0.98 },
  { hour: 6, label: '6 AM', baseBLH: 150, basePM25Ratio: 1.08 },
  { hour: 7, label: '7 AM', baseBLH: 165, basePM25Ratio: 1.15 },
  { hour: 8, label: '8 AM', baseBLH: 210, basePM25Ratio: 1.12 },
  { hour: 9, label: '9 AM', baseBLH: 320, basePM25Ratio: 0.95 },
  { hour: 10, label: '10 AM', baseBLH: 480, basePM25Ratio: 0.82 },
  { hour: 11, label: '11 AM', baseBLH: 680, basePM25Ratio: 0.68 },
  { hour: 12, label: '12 PM', baseBLH: 950, basePM25Ratio: 0.48 },
  { hour: 13, label: '1 PM', baseBLH: 1220, basePM25Ratio: 0.38 },
  { hour: 14, label: '2 PM', baseBLH: 1280, basePM25Ratio: 0.35 },
  { hour: 15, label: '3 PM', baseBLH: 1100, basePM25Ratio: 0.42 },
  { hour: 16, label: '4 PM', baseBLH: 820, basePM25Ratio: 0.58 },
  { hour: 17, label: '5 PM', baseBLH: 520, basePM25Ratio: 0.76 },
  { hour: 18, label: '6 PM', baseBLH: 340, basePM25Ratio: 0.96 },
  { hour: 19, label: '7 PM', baseBLH: 240, basePM25Ratio: 1.10 },
  { hour: 20, label: '8 PM', baseBLH: 190, basePM25Ratio: 1.14 },
  { hour: 21, label: '9 PM', baseBLH: 170, basePM25Ratio: 1.05 },
  { hour: 22, label: '10 PM', baseBLH: 180, basePM25Ratio: 0.98 },
  { hour: 23, label: '11 PM', baseBLH: 200, basePM25Ratio: 0.92 },
];

/**
 * Determines ambient risk category based on particulate concentration
 */
function classifyAmbientRisk(pm25Val: number): 'Low' | 'Caution' | 'Danger' | 'Hazardous' {
  if (pm25Val < PM25_RISK_THRESHOLD_LOW) return 'Low';
  if (pm25Val < PM25_RISK_THRESHOLD_CAUTION) return 'Caution';
  if (pm25Val < PM25_RISK_THRESHOLD_DANGER) return 'Danger';
  return 'Hazardous';
}

/**
 * Computes the 24-hour diurnal atmospheric dispersion curve for a given severity level.
 */
export function getDiurnalCurveForSeverity(severity: SmogSeverityLevel, basePM25: number): DiurnalPoint[] {
  const pmMult = severity === 'severe-inversion' ? 1.05 : 0.95;
  const blhMult = severity === 'moderate' ? 1.25 : severity === 'very-poor' ? 0.95 : 0.72;

  return DIURNAL_24H_BASE.map(pt => {
    const pm25Val = Math.round(basePM25 * pt.basePM25Ratio * pmMult);
    const blhVal = Math.round(pt.baseBLH * blhMult);
    const isVent = pt.hour >= SAFE_VENTILATION_WINDOW_START_HOUR && pt.hour <= SAFE_VENTILATION_WINDOW_END_HOUR;
    const isPeak = (pt.hour >= MORNING_INVERSION_PEAK_START_HOUR && pt.hour <= MORNING_INVERSION_PEAK_END_HOUR) ||
                   (pt.hour >= EVENING_INVERSION_PEAK_START_HOUR && pt.hour <= EVENING_INVERSION_PEAK_END_HOUR);

    return {
      hour: pt.hour,
      label: pt.label,
      pm25: pm25Val,
      boundaryLayerMeters: blhVal,
      isVentilationWindow: isVent,
      isInversionPeak: isPeak,
      ambientRisk: classifyAmbientRisk(pm25Val),
    };
  });
}
