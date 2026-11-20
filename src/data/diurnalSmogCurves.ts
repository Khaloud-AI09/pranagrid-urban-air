import { DiurnalPoint, SmogSeverityLevel } from '../types';

export const DIURNAL_24H_BASE: Array<{ hour: number; label: string; baseBLH: number; basePM25Ratio: number }> = [
  { hour: 0, label: '12 AM', baseBLH: 220, basePM25Ratio: 0.88 },
  { hour: 2, label: '2 AM', baseBLH: 190, basePM25Ratio: 0.92 },
  { hour: 4, label: '4 AM', baseBLH: 160, basePM25Ratio: 0.98 },
  { hour: 6, label: '6 AM', baseBLH: 150, basePM25Ratio: 1.08 }, // Dawn inversion lock + freight/early commute
  { hour: 7, label: '7 AM', baseBLH: 165, basePM25Ratio: 1.15 }, // Peak morning spike
  { hour: 8, label: '8 AM', baseBLH: 210, basePM25Ratio: 1.12 },
  { hour: 9, label: '9 AM', baseBLH: 320, basePM25Ratio: 0.95 },
  { hour: 10, label: '10 AM', baseBLH: 480, basePM25Ratio: 0.82 },
  { hour: 11, label: '11 AM', baseBLH: 680, basePM25Ratio: 0.68 },
  { hour: 12, label: '12 PM', baseBLH: 950, basePM25Ratio: 0.48 }, // Thermal convection starts
  { hour: 13, label: '1 PM', baseBLH: 1220, basePM25Ratio: 0.38 }, // SAFEST WINDOW PEAK
  { hour: 14, label: '2 PM', baseBLH: 1280, basePM25Ratio: 0.35 }, // Minimum PM2.5 concentration
  { hour: 15, label: '3 PM', baseBLH: 1100, basePM25Ratio: 0.42 }, // Window closes
  { hour: 16, label: '4 PM', baseBLH: 820, basePM25Ratio: 0.58 },
  { hour: 17, label: '5 PM', baseBLH: 520, basePM25Ratio: 0.76 }, // Sunset cooling
  { hour: 18, label: '6 PM', baseBLH: 340, basePM25Ratio: 0.96 }, // Re-inversion descending
  { hour: 19, label: '7 PM', baseBLH: 240, basePM25Ratio: 1.10 }, // Evening commute + dinner cooking
  { hour: 20, label: '8 PM', baseBLH: 190, basePM25Ratio: 1.14 },
  { hour: 21, label: '9 PM', baseBLH: 170, basePM25Ratio: 1.05 },
  { hour: 22, label: '10 PM', baseBLH: 180, basePM25Ratio: 0.98 },
  { hour: 23, label: '11 PM', baseBLH: 200, basePM25Ratio: 0.92 },
];

export function getDiurnalCurveForSeverity(severity: SmogSeverityLevel, basePM25: number): DiurnalPoint[] {
  const scale = severity === 'moderate' ? 0.35 : severity === 'very-poor' ? 0.75 : 1.25;

  return DIURNAL_24H_BASE.map(pt => {
    const pm25Val = Math.round(basePM25 * pt.basePM25Ratio * (severity === 'severe-inversion' ? 1.05 : 0.95));
    const blhVal = Math.round(pt.baseBLH * (severity === 'moderate' ? 1.25 : severity === 'very-poor' ? 0.95 : 0.72));
    const isVent = pt.hour >= 12 && pt.hour <= 15;
    const isPeak = (pt.hour >= 6 && pt.hour <= 9) || (pt.hour >= 18 && pt.hour <= 21);

    let ambientRisk: 'Low' | 'Caution' | 'Danger' | 'Hazardous' = 'Danger';
    if (pm25Val < 50) ambientRisk = 'Low';
    else if (pm25Val < 120) ambientRisk = 'Caution';
    else if (pm25Val < 250) ambientRisk = 'Danger';
    else ambientRisk = 'Hazardous';

    return {
      hour: pt.hour,
      label: pt.label,
      pm25: pm25Val,
      boundaryLayerMeters: blhVal,
      isVentilationWindow: isVent,
      isInversionPeak: isPeak,
      ambientRisk,
    };
  });
}
