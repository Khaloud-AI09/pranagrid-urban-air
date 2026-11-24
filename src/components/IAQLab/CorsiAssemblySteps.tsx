import React from 'react';
import { ShieldCheck } from 'lucide-react';

const ASSEMBLY_STEPS = [
  {
    step: 1,
    title: 'Square Filter Box: ',
    desc: 'Tape four 20x20x2" MERV-13 filters together to form a square box. Ensure flow arrows printed on the filter frames all point INWARD towards the center cavity.',
  },
  {
    step: 2,
    title: 'Bottom Floor Seal: ',
    desc: 'Cut a 20x20" flat cardboard base from the shipping box and duct tape it securely to the bottom of the 4 filters to create a hermetic floor.',
  },
  {
    step: 3,
    title: 'Mount the Box Fan: ',
    desc: 'Place the 20" box fan on top, oriented so air blows UPWARD toward the ceiling. Tape the perimeter fan edges completely to the filter box with duct tape.',
  },
  {
    step: 4,
    title: 'Add the Cardboard Shroud (Crucial): ',
    desc: 'Cut a 14-inch circular hole in a square piece of cardboard and tape it over the fan face. This eliminates vortex back-draft leakage around the blade corners, boosting CADR by 20%.',
  },
];

/**
 * 4-Step Assembly Blueprint instructions for Corsi-Rosenthal DIY Box Fan
 */
export const CorsiAssemblySteps: React.FC = () => {
  return (
    <div className="space-y-3 mb-6">
      <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        Step-by-Step Build Instructions (15 Minutes)
      </h5>

      <div className="space-y-2 text-xs">
        {ASSEMBLY_STEPS.map((item) => (
          <div key={item.step} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] flex items-center justify-center shrink-0 font-bold">
              {item.step}
            </span>
            <div>
              <strong className="text-slate-100">{item.title}</strong>
              <span className="text-slate-300">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
