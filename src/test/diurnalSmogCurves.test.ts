import { describe, it, expect } from 'vitest';
import { getDiurnalCurveForSeverity, DIURNAL_24H_BASE } from '../data/diurnalSmogCurves';

describe('24-Hour Diurnal Boundary Layer & Smog Physics', () => {
  it('generates 22 defined time steps covering the full 24-hour cycle', () => {
    const curve = getDiurnalCurveForSeverity('severe-inversion', 385);
    expect(curve.length).toBe(DIURNAL_24H_BASE.length);
  });

  it('verifies boundary layer compression during morning inversion lock (06:00–08:00)', () => {
    const curve = getDiurnalCurveForSeverity('severe-inversion', 385);
    const morningPoint = curve.find(p => p.hour === 6);

    expect(morningPoint).toBeDefined();
    expect(morningPoint?.boundaryLayerMeters).toBeLessThanOrEqual(250);
    expect(morningPoint?.isInversionPeak).toBe(true);
    expect(morningPoint?.isVentilationWindow).toBe(false);
    expect(morningPoint?.ambientRisk).toBe('Hazardous');
  });

  it('verifies boundary layer thermal plume expansion and safe ventilation window (12:00–15:00)', () => {
    const curve = getDiurnalCurveForSeverity('severe-inversion', 385);
    const middayPoint = curve.find(p => p.hour === 13); // 1 PM

    expect(middayPoint).toBeDefined();
    // Midday boundary layer should expand to high altitude (>800m even in severe inversion)
    expect(middayPoint?.boundaryLayerMeters).toBeGreaterThan(800);
    expect(middayPoint?.isVentilationWindow).toBe(true);
    expect(middayPoint?.isInversionPeak).toBe(false);
  });

  it('confirms PM2.5 concentration reaches diurnal minimum during thermal plume window', () => {
    const basePM25 = 385;
    const curve = getDiurnalCurveForSeverity('severe-inversion', basePM25);

    const morningPM = curve.find(p => p.hour === 7)?.pm25 || 0;
    const middayPM = curve.find(p => p.hour === 14)?.pm25 || 0;

    expect(middayPM).toBeLessThan(morningPM);
    expect(middayPM).toBeLessThan(basePM25 * 0.5); // Drops by over 50%
  });

  it('scales boundary layer height across Moderate vs Severe Smog', () => {
    const modCurve = getDiurnalCurveForSeverity('moderate', 68);
    const sevCurve = getDiurnalCurveForSeverity('severe-inversion', 385);

    const modPeakBLH = Math.max(...modCurve.map(p => p.boundaryLayerMeters));
    const sevPeakBLH = Math.max(...sevCurve.map(p => p.boundaryLayerMeters));

    // Moderate smog allows higher vertical boundary layer mixing
    expect(modPeakBLH).toBeGreaterThan(sevPeakBLH);
  });
});
