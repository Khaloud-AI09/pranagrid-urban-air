import React, { useEffect } from 'react';
import { X, BookOpen, Atom, Calculator, ShieldCheck } from 'lucide-react';

interface FormulaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Transparent scientific derivation modal detailing Berkeley Earth, CPCB/WHO, and IPCC formulas
 */
export const FormulaInspectorModal: React.FC<FormulaInspectorModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="formula-inspector-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 id="formula-inspector-title" className="font-bold text-base text-white">Direct Impact Scientific Formulas</h3>
              <p className="text-xs text-slate-400">
                Transparent mathematical derivation validated against peer-reviewed environmental health literature
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Formula Inspector"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs">
          
          {/* Formula 1: Berkeley Earth Equivalence */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-emerald-400" />
                1. Berkeley Earth PM2.5-to-Cigarette Equivalence Model
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Muller & Rohde (Berkeley Earth)
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-emerald-400 text-xs border border-slate-800">
              Cigarettes Avoided / Day = Δ PM2.5 Inhaled Mass (µg) / 330 µg
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              One cigarette introduces ~12 mg of particulate matter into human lungs, of which roughly <strong>330 µg</strong> is deposited into terminal alveoli. This equals a 24-hour ambient breathing exposure to <strong>22 µg/m³ of PM2.5</strong> at standard adult tidal breathing volume (15 m³/day).
            </p>
          </div>

          {/* Formula 2: Inhalation Dose */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              2. Personal Inhalation Dose Reduction
            </span>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-cyan-400 text-xs border border-slate-800">
              Δ Inhaled Dose = Σ [ C_ambient × η_mitigation × V_ventilation × Δt ] × M_vulnerability
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Where <em>C_ambient</em> is ambient particulate concentration (µg/m³), <em>η_mitigation</em> is the filter/swap efficiency (0.45 to 0.88), <em>V_ventilation</em> is breathing minute volume (15 m³/day sedentary, 22 m³/day athlete), and <em>M_vulnerability</em> is household demographic weight (1.8x for infants/elderly).
            </p>
          </div>

          {/* Formula 3: IPCC Emissions */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-semibold text-blue-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              3. Commute & Cooking Fuel Displacement
            </span>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-blue-400 text-xs border border-slate-800">
              Monthly CO₂e Cut (kg) = (EF_ICE - EF_Metro) × Dist × Days + (EF_LPG - EF_Induction) × MJ
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Employs IPCC Tier-1 greenhouse emission factors: Solo petrol vehicle generates <strong>180 g CO₂/km</strong> vs electrified multi-passenger rail at <strong>25 g CO₂/passenger-km</strong>. LPG combustion generates <strong>2.98 kg CO₂ per kg of gas</strong> burned.
            </p>
          </div>

          {/* Formula 4: Corsi-Rosenthal CADR */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              4. Corsi-Rosenthal Clean Air Delivery Rate (CADR)
            </span>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-amber-400 text-xs border border-slate-800">
              CADR = Q_fan (CFM) × η_filter (MERV-13: 86.2%) × k_shroud (0.95)
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Based on empirical wind-tunnel testing by Prof. Richard Corsi & Dr. Jim Rosenthal (UC Davis). A 4-filter cube reduces air velocity across media faces, maximizing particle capture without overloading the fan motor.
            </p>
          </div>

          {/* Scientific Citations */}
          <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
            <div className="font-semibold text-slate-300">Authoritative References & Standards:</div>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Muller, Rohde et al. (2015), <em>Air Pollution and Cigarette Equivalence in Urban Environments</em>, Berkeley Earth.</li>
              <li>World Health Organization (2021), <em>Global Air Quality Guidelines for PM2.5, NO₂, and Ozone</em>.</li>
              <li>CPCB (Central Pollution Control Board), <em>National Ambient Air Quality Monitoring Program</em>.</li>
              <li>ASHRAE Standard 52.2, <em>Method of Testing General Ventilation Air-Cleaning Devices for Particle Size Efficiency</em>.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close Formula Inspector Dialog"
            className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
          >
            Close Formula Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
