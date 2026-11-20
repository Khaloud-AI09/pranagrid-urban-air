import React, { useState } from 'react';
import { Leaf, Clock, DollarSign, Calculator, ChevronUp, ChevronDown, Activity } from 'lucide-react';
import { CalculatedImpact, UserContext } from '../../types';
import { MetricCard } from './MetricCard';
import { FormulaInspectorModal } from './FormulaInspectorModal';
import { SMOG_SEVERITIES } from '../../data/urbanProfiles';

interface ImpactPanelProps {
  impact: CalculatedImpact;
  context: UserContext;
}

/**
 * Sticky desktop & collapsible mobile Direct Impact Quantifier panel tracking real-time health and environmental gains
 */
export const ImpactPanel: React.FC<ImpactPanelProps> = ({ impact, context }) => {
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const ambientAQI = SMOG_SEVERITIES[context.severity].aqi;
  const indoorAQI = impact.indoorAQIEstimate;
  const aqiDropPercent = Math.round(((ambientAQI - indoorAQI) / ambientAQI) * 100);

  return (
    <>
      {/* DESKTOP PERSISTENT PANEL */}
      <aside 
        className="hidden lg:block w-80 xl:w-88 shrink-0" 
        aria-label="Direct Impact Quantifier Dashboard"
        aria-live="polite"
      >
        <div className="sticky top-20 space-y-4">
          
          {/* Main Container */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Real-Time Quantifier
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Your Choices in Numbers
                </h3>
              </div>

              <button
                onClick={() => setIsFormulaModalOpen(true)}
                aria-label="Inspect Scientific Formulas"
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors"
                title="View Scientific Formulas"
              >
                <Calculator className="w-4 h-4" />
              </button>
            </div>

            {/* Estimated Indoor AQI Dial */}
            <div 
              className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 border border-emerald-500/20 space-y-2.5"
              aria-label={`Indoor sanctuary estimated AQI: ${indoorAQI}, which is ${aqiDropPercent} percent cleaner than ambient AQI ${ambientAQI}`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Estimated Indoor Sanctuary</span>
                <span className="text-emerald-400 font-mono font-bold">-{aqiDropPercent}% Cleaner</span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
                    AQI {indoorAQI}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Safe indoor breathing zone
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400 line-through">
                    Ambient: {ambientAQI}
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    WHO Guideline Target
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={aqiDropPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Indoor air filtration progress">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(15, aqiDropPercent))}%` }}
                />
              </div>
            </div>

            {/* 4 Core Quantified Impact Cards */}
            <div className="space-y-3">
              
              {/* 1. PM2.5 Inhalation Avoided */}
              <MetricCard
                label="PM2.5 Inhaled Avoided"
                value={impact.pm25AvoidedDailyUg.toLocaleString()}
                unit="µg/day"
                subValue={`≈ ${impact.cigarettesAvoidedDaily} cigarettes/day`}
                subLabel="Avoided Inhalation"
                icon={<Activity className="w-4 h-4" />}
                themeColor="emerald"
                highlight={impact.pm25AvoidedDailyUg > 0}
              />

              {/* 2. Household Emissions Cut */}
              <MetricCard
                label="Emissions Prevented"
                value={impact.co2ePreventedMonthlyKg}
                unit="kg CO₂e/mo"
                subValue={`-${(impact.noxPreventedMonthlyG / 1000).toFixed(1)} kg NOx`}
                subLabel="Displaced Exhaust"
                icon={<Leaf className="w-4 h-4" />}
                themeColor="blue"
              />

              {/* 3. Clean Air Exposure Gain */}
              <MetricCard
                label="Clean Air Window Gain"
                value={`+${impact.cleanAirHoursGained}`}
                unit="hrs/day"
                subValue="Low Exposure Period"
                subLabel="Protected Alveoli"
                icon={<Clock className="w-4 h-4" />}
                themeColor="cyan"
              />

              {/* 4. Monthly Financial Savings */}
              <MetricCard
                label="Direct Financial Benefit"
                value={`₹${impact.monthlySavingsINR.toLocaleString()}`}
                unit="/month"
                subValue="Fuel & Health Savings"
                subLabel="Conserved Capital"
                icon={<DollarSign className="w-4 h-4" />}
                themeColor="amber"
              />

            </div>

            {/* Active Checklist & Routine Count */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Active Routine Swaps:</span>
                <span className="font-mono font-bold text-white">{impact.totalSwapsAdopted} adopted</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>IAQ Interventions Active:</span>
                <span className="font-mono font-bold text-emerald-400">{impact.totalHacksActive} running</span>
              </div>
            </div>

            {/* Formula Inspector Trigger */}
            <button
              onClick={() => setIsFormulaModalOpen(true)}
              aria-label="Inspect Scientific Formulas and Math Equations"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Scientific Formulas</span>
            </button>

          </div>

        </div>
      </aside>

      {/* MOBILE COLLAPSIBLE DRAWER / BAR */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 border-t border-slate-800 backdrop-blur-xl shadow-2xl"
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                {aqiDropPercent}%
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  Indoor AQI {indoorAQI} <span className="text-slate-400 font-normal">(-{impact.cigarettesAvoidedDaily} cigs)</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {impact.totalSwapsAdopted} Swaps | {impact.totalHacksActive} Hacks Active
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Collapse Impact Summary" : "Expand Full Impact Summary"}
              aria-expanded={isMobileOpen}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1"
            >
              <span>{isMobileOpen ? 'Collapse' : 'View Impact'}</span>
              {isMobileOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Drawer on Mobile */}
          {isMobileOpen && (
            <div className="mt-3 pt-3 border-t border-slate-800 space-y-2.5 max-h-[60vh] overflow-y-auto pb-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">PM2.5 Avoided</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">{impact.pm25AvoidedDailyUg} µg/d</div>
                  <div className="text-[9px] text-slate-500">≈ {impact.cigarettesAvoidedDaily} cigs/day</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">CO₂e Displaced</div>
                  <div className="text-sm font-bold font-mono text-blue-400">{impact.co2ePreventedMonthlyKg} kg/mo</div>
                  <div className="text-[9px] text-slate-500">IPCC Tier-1</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Clean Lung Window</div>
                  <div className="text-sm font-bold font-mono text-teal-400">+{impact.cleanAirHoursGained} hrs/d</div>
                  <div className="text-[9px] text-slate-500">WHO Guideline</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Monthly Savings</div>
                  <div className="text-sm font-bold font-mono text-amber-400">₹{impact.monthlySavingsINR}</div>
                  <div className="text-[9px] text-slate-500">Fuel & Medical</div>
                </div>
              </div>

              <button
                onClick={() => setIsFormulaModalOpen(true)}
                aria-label="Open Transparent Scientific Formulas Modal"
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transparent Scientific Formulas</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Formula Modal */}
      <FormulaInspectorModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />
    </>
  );
};
