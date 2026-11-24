import React from 'react';
import { FanSpeed, CADRMetrics } from '../../utils/cadrCalculator';

interface CorsiCADRSimulatorProps {
  metrics: CADRMetrics;
  fanSpeed: FanSpeed;
  setFanSpeed: (sp: FanSpeed) => void;
}

const CorsiStatsGrid: React.FC<{ metrics: CADRMetrics }> = ({ metrics }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
    <div className="p-2 rounded-lg bg-slate-950/80">
      <div className="text-[10px] text-slate-400">Air Changes/Hr (ACH)</div>
      <div className="font-bold text-emerald-300">{metrics.airChangesPerHr} ACH</div>
      <div className="text-[9px] text-slate-500">&gt;5 CDC Hospital Grade</div>
    </div>
    <div className="p-2 rounded-lg bg-slate-950/80">
      <div className="text-[10px] text-slate-400">Power Consumption</div>
      <div className="font-bold text-cyan-300">{metrics.wattage} Watts</div>
      <div className="text-[9px] text-slate-500">Standard BLDC Fan</div>
    </div>
    <div className="p-2 rounded-lg bg-slate-950/80">
      <div className="text-[10px] text-slate-400">Daily Electricity Cost</div>
      <div className="font-bold text-amber-300">₹{metrics.dailyCostINR}/day</div>
      <div className="text-[9px] text-slate-500">₹9.5/kWh tariff</div>
    </div>
    <div className="p-2 rounded-lg bg-slate-950/80">
      <div className="text-[10px] text-slate-400">Filter Life Expectancy</div>
      <div className="font-bold text-indigo-300">5-6 Months</div>
      <div className="text-[9px] text-slate-500">MERV-13 Multi-layer</div>
    </div>
  </div>
);

export const CorsiCADRSimulator: React.FC<CorsiCADRSimulatorProps> = ({ metrics, fanSpeed, setFanSpeed }) => (
  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-5">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Live Clean Air Delivery Rate (CADR) Simulator</span>
        <h4 className="text-sm font-bold text-white">Calculated CADR: <span className="font-mono text-emerald-400 text-base">{metrics.cadr} CFM</span></h4>
      </div>

      <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs" role="group" aria-label="Fan Speed Control">
        {(['low', 'med', 'high'] as FanSpeed[]).map((sp) => (
          <button
            key={sp}
            type="button"
            onClick={() => setFanSpeed(sp)}
            aria-label={`Set fan speed to ${sp}`}
            aria-pressed={fanSpeed === sp}
            className={`px-3 py-1 rounded-lg font-medium capitalize transition-all ${fanSpeed === sp ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {sp === 'low' ? 'Low (Whisper)' : sp === 'med' ? 'Med (Daytime)' : 'High (Turbo)'}
          </button>
        ))}
      </div>
    </div>

    <CorsiStatsGrid metrics={metrics} />
  </div>
);
