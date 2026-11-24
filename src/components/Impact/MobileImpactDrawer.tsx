import React from 'react';
import { ChevronUp, ChevronDown, Calculator } from 'lucide-react';
import { CalculatedImpact } from '../../types';

interface MobileImpactDrawerProps {
  impact: CalculatedImpact;
  indoorAQI: number;
  aqiDropPercent: number;
  isOpen: boolean;
  onToggle: () => void;
  onOpenFormulaModal: () => void;
}

const MobileImpactExpandedGrid: React.FC<{ impact: CalculatedImpact; onOpenFormulaModal: () => void }> = ({
  impact,
  onOpenFormulaModal,
}) => (
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
      onClick={onOpenFormulaModal}
      aria-label="Open Transparent Scientific Formulas Modal"
      className="w-full py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
    >
      <Calculator className="w-3.5 h-3.5 text-emerald-400" />
      <span>Transparent Scientific Formulas</span>
    </button>
  </div>
);

/**
 * Collapsible bottom drawer for mobile screens presenting real-time impact metrics
 */
export const MobileImpactDrawer: React.FC<MobileImpactDrawerProps> = ({
  impact,
  indoorAQI,
  aqiDropPercent,
  isOpen,
  onToggle,
  onOpenFormulaModal,
}) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 border-t border-slate-800 backdrop-blur-xl shadow-2xl" aria-live="polite">
    <div className="max-w-7xl mx-auto px-4 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">{aqiDropPercent}%</div>
          <div>
            <div className="text-xs font-bold text-white">Indoor AQI {indoorAQI} <span className="text-slate-400 font-normal">(-{impact.cigarettesAvoidedDaily} cigs)</span></div>
            <div className="text-[10px] text-slate-400">{impact.totalSwapsAdopted} Swaps | {impact.totalHacksActive} Hacks Active</div>
          </div>
        </div>

        <button
          onClick={onToggle}
          aria-label={isOpen ? "Collapse Impact Summary" : "Expand Full Impact Summary"}
          aria-expanded={isOpen}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1"
        >
          <span>{isOpen ? 'Collapse' : 'View Impact'}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && <MobileImpactExpandedGrid impact={impact} onOpenFormulaModal={onOpenFormulaModal} />}
    </div>
  </div>
);
