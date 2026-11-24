import React, { useState } from 'react';
import { Leaf, Clock, DollarSign, Calculator, Activity } from 'lucide-react';
import { CalculatedImpact, UserContext } from '../../types';
import { MetricCard } from './MetricCard';
import { FormulaInspectorModal } from './FormulaInspectorModal';
import { MobileImpactDrawer } from './MobileImpactDrawer';
import { IndoorSanctuaryDial } from './IndoorSanctuaryDial';
import { SMOG_SEVERITIES } from '../../data/urbanProfiles';

interface ImpactPanelProps {
  impact: CalculatedImpact;
  context: UserContext;
}

const ImpactMetricsList: React.FC<{ impact: CalculatedImpact }> = ({ impact }) => (
  <div className="space-y-3">
    <MetricCard label="PM2.5 Inhaled Avoided" value={impact.pm25AvoidedDailyUg.toLocaleString()} unit="µg/day" subValue={`≈ ${impact.cigarettesAvoidedDaily} cigarettes/day`} subLabel="Avoided Inhalation" icon={<Activity className="w-4 h-4" />} themeColor="emerald" highlight={impact.pm25AvoidedDailyUg > 0} />
    <MetricCard label="Emissions Prevented" value={impact.co2ePreventedMonthlyKg} unit="kg CO₂e/mo" subValue={`-${(impact.noxPreventedMonthlyG / 1000).toFixed(1)} kg NOx`} subLabel="Displaced Exhaust" icon={<Leaf className="w-4 h-4" />} themeColor="blue" />
    <MetricCard label="Clean Air Window Gain" value={`+${impact.cleanAirHoursGained}`} unit="hrs/day" subValue="Low Exposure Period" subLabel="Protected Alveoli" icon={<Clock className="w-4 h-4" />} themeColor="cyan" />
    <MetricCard label="Direct Financial Benefit" value={`₹${impact.monthlySavingsINR.toLocaleString()}`} unit="/month" subValue="Fuel & Health Savings" subLabel="Conserved Capital" icon={<DollarSign className="w-4 h-4" />} themeColor="amber" />
  </div>
);

export const ImpactPanel: React.FC<ImpactPanelProps> = ({ impact, context }) => {
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const ambientAQI = SMOG_SEVERITIES[context.severity].aqi;
  const indoorAQI = impact.indoorAQIEstimate;
  const aqiDropPercent = Math.round(((ambientAQI - indoorAQI) / ambientAQI) * 100);

  return (
    <>
      <aside className="hidden lg:block w-80 xl:w-88 shrink-0" aria-label="Direct Impact Quantifier Dashboard" aria-live="polite">
        <div className="sticky top-20 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /><span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Real-Time Quantifier</span></div>
                <h3 className="text-base font-bold text-white tracking-tight">Your Choices in Numbers</h3>
              </div>
              <button onClick={() => setIsFormulaModalOpen(true)} aria-label="Inspect Scientific Formulas" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors" title="View Scientific Formulas"><Calculator className="w-4 h-4" /></button>
            </div>

            <IndoorSanctuaryDial indoorAQI={indoorAQI} ambientAQI={ambientAQI} aqiDropPercent={aqiDropPercent} />
            <ImpactMetricsList impact={impact} />

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300"><span>Active Routine Swaps:</span><span className="font-mono font-bold text-white">{impact.totalSwapsAdopted} adopted</span></div>
              <div className="flex items-center justify-between text-slate-300"><span>IAQ Interventions Active:</span><span className="font-mono font-bold text-emerald-400">{impact.totalHacksActive} running</span></div>
            </div>
          </div>
        </div>
      </aside>

      <MobileImpactDrawer impact={impact} indoorAQI={indoorAQI} aqiDropPercent={aqiDropPercent} isOpen={isMobileOpen} onToggle={() => setIsMobileOpen(prev => !prev)} onOpenFormulaModal={() => setIsFormulaModalOpen(true)} />
      <FormulaInspectorModal isOpen={isFormulaModalOpen} onClose={() => setIsFormulaModalOpen(false)} />
    </>
  );
};
