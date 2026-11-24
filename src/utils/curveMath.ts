import { DiurnalPoint } from '../types';

export interface CurvePlotConfig {
  svgW: number;
  svgH: number;
  padX: number;
  padYTop: number;
  padYBottom: number;
  maxBLH: number;
  maxPM: number;
}

export const DEFAULT_PLOT_CONFIG: CurvePlotConfig = {
  svgW: 800,
  svgH: 220,
  padX: 45,
  padYTop: 25,
  padYBottom: 35,
  maxBLH: 1400,
  maxPM: 460,
};

/**
 * Calculates horizontal X coordinate on canvas for a given hour (0-23)
 */
export function getHourX(hour: number, config: CurvePlotConfig = DEFAULT_PLOT_CONFIG): number {
  const plotW = config.svgW - config.padX * 2;
  return config.padX + (hour / 23) * plotW;
}

/**
 * Calculates vertical Y coordinate for boundary layer height in meters
 */
export function getBLHY(blh: number, config: CurvePlotConfig = DEFAULT_PLOT_CONFIG): number {
  const plotH = config.svgH - config.padYTop - config.padYBottom;
  const clampedBLH = Math.min(blh, config.maxBLH);
  return config.padYTop + plotH - (clampedBLH / config.maxBLH) * plotH;
}

/**
 * Calculates vertical Y coordinate for PM2.5 in ug/m3
 */
export function getPM25Y(pm: number, config: CurvePlotConfig = DEFAULT_PLOT_CONFIG): number {
  const plotH = config.svgH - config.padYTop - config.padYBottom;
  const clampedPM = Math.min(pm, config.maxPM);
  return config.padYTop + plotH - (clampedPM / config.maxPM) * plotH;
}

/**
 * Generates SVG path strings for boundary layer height and PM2.5 curves
 */
export function generateDiurnalSvgPaths(
  points: DiurnalPoint[],
  config: CurvePlotConfig = DEFAULT_PLOT_CONFIG
): { blhLinePath: string; blhAreaPath: string; pmLinePath: string } {
  const plotH = config.svgH - config.padYTop - config.padYBottom;
  const baselineY = (config.padYTop + plotH).toFixed(1);

  const blhPts = points.map(p => `${getHourX(p.hour, config).toFixed(1)},${getBLHY(p.boundaryLayerMeters, config).toFixed(1)}`);
  const blhLinePath = `M ${blhPts.join(' L ')}`;
  const blhAreaPath = `${blhLinePath} L ${getHourX(23, config).toFixed(1)},${baselineY} L ${getHourX(0, config).toFixed(1)},${baselineY} Z`;

  const pmPts = points.map(p => `${getHourX(p.hour, config).toFixed(1)},${getPM25Y(p.pm25, config).toFixed(1)}`);
  const pmLinePath = `M ${pmPts.join(' L ')}`;

  return { blhLinePath, blhAreaPath, pmLinePath };
}
