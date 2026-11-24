import { describe, it, expect } from 'vitest';
import { getHourX, getBLHY, getPM25Y, generateDiurnalSvgPaths } from '../utils/curveMath';
import { calculateCADRMetrics } from '../utils/cadrCalculator';
import { formatCommunityBulletin } from '../utils/bulletinFormatter';
import { URBAN_ZONE_PROFILES, SMOG_SEVERITIES } from '../data/urbanProfiles';
import { getDiurnalCurveForSeverity } from '../data/diurnalSmogCurves';

describe('curveMath Utility', () => {
  it('maps hour coordinates within valid SVG boundaries', () => {
    const x0 = getHourX(0);
    const x12 = getHourX(12);
    const x23 = getHourX(23);

    expect(x0).toBeGreaterThanOrEqual(40);
    expect(x12).toBeGreaterThan(x0);
    expect(x23).toBeLessThanOrEqual(800);
  });

  it('maps boundary layer height and PM2.5 within Y limits', () => {
    const yBLHMin = getBLHY(150);
    const yBLHMax = getBLHY(1200);
    expect(yBLHMin).toBeGreaterThan(yBLHMax); // Lower height = lower in atmosphere = higher Y coordinate in SVG

    const yPM25Low = getPM25Y(50);
    const yPM25High = getPM25Y(400);
    expect(yPM25High).toBeLessThan(yPM25Low); // Higher PM2.5 = plotted higher up (lower Y)
  });

  it('generates non-empty SVG path strings for diurnal curve', () => {
    const points = getDiurnalCurveForSeverity('severe-inversion', 440);
    const paths = generateDiurnalSvgPaths(points);
    expect(paths.blhLinePath).toMatch(/^M /);
    expect(paths.pmLinePath).toMatch(/^M /);
    expect(paths.blhAreaPath).toContain('Z');
  });
});

describe('cadrCalculator Utility', () => {
  it('calculates CADR and air changes per hour for medium speed in standard room', () => {
    const metrics = calculateCADRMetrics('med');

    expect(metrics.cadr).toBeGreaterThan(250);
    expect(parseFloat(metrics.airChangesPerHr)).toBeGreaterThan(4);
    expect(metrics.wattage).toBeGreaterThan(0);
    expect(metrics.dailyCostINR).toBeGreaterThan(0);
  });

  it('adjusts wattage and CADR for low vs high fan speeds', () => {
    const low = calculateCADRMetrics('low');
    const high = calculateCADRMetrics('high');

    expect(high.cadr).toBeGreaterThan(low.cadr);
    expect(high.wattage).toBeGreaterThan(low.wattage);
  });
});

describe('bulletinFormatter Utility', () => {
  const zone = URBAN_ZONE_PROFILES['indo-gangetic-metro'];
  const severity = SMOG_SEVERITIES['severe-inversion'];

  it('formats clean WhatsApp advisory bulletin with zero state names', () => {
    const bulletin = formatCommunityBulletin(zone, severity);

    expect(bulletin).toContain('COMMUNITY AIR ADVISORY: WINTER INVERSION ALERT');
    expect(bulletin).toContain(zone.name);
    expect(bulletin).toContain('12:30 PM');
    expect(bulletin).toContain('Zero Open Biomass/Waste Burning');
    expect(bulletin).toContain('Thermal Ceiling');
  });
});
