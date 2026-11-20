import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { UserContext } from '../../types';
import { URBAN_ZONE_PROFILES, SMOG_SEVERITIES } from '../../data/urbanProfiles';

interface BulletinModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: UserContext;
}

/**
 * 1-Click WhatsApp and RWA Community Advisory Bulletin Generator with strictly zero state or city names.
 */
export const BulletinModal: React.FC<BulletinModalProps> = ({ isOpen, onClose, context }) => {
  const [copied, setCopied] = useState(false);
  const zone = URBAN_ZONE_PROFILES[context.zone];
  const severity = SMOG_SEVERITIES[context.severity];

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

  // Generate advisory strictly using atmospheric archetype without any state or city names
  const bulletinText = `🚨 *COMMUNITY AIR ADVISORY: WINTER INVERSION ALERT* 🚨
Issued by: PranaGrid / InversionOS Atmospheric Intelligence
Atmospheric Archetype: *${zone.name}*
Current Condition: *${severity.label}* (PM2.5: ${severity.pm25} µg/m³)
Thermal Ceiling (BLH): *${severity.boundaryLayerHeight} meters* (${severity.inversionLocked ? 'Trapped Inversion Lock' : 'Partial Mixing'})

⚠️ *PEAK DANGER HOURS (DO NOT EXERCISE OR VENTILATE)*
• 06:00 AM – 09:30 AM (Dawn ground-cooling inversion lid)
• 06:30 PM – 10:30 PM (Nocturnal inversion descent)

☀️ *RECOMMENDED 25-MIN VENTILATION WINDOW*
• 12:30 PM – 03:00 PM (Solar thermal plumes expand ceiling to >1,100m)

🌿 *3 IMMEDIATE COLLECTIVE NEIGHBORHOOD ACTIONS*
1. *Zero Open Biomass/Waste Burning:* Provide electric radiant heaters for society security guards; stop burning dried leaves.
2. *School & Transit Shield:* Consolidate morning private car runs into shared EV carpools to eliminate gate idling plumes.
3. *Indoor Moisture & Mopping:* Shift household sweeping to microfiber damp mopping to prevent resuspending coarse toxic soot.

📲 *Share this advisory with your neighborhood RWA & WhatsApp community groups.*
Powered by PranaGrid / InversionOS — Real-time atmospheric boundary intelligence.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bulletinText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulletin-title"
    >
      <div className="relative w-full max-w-xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="bulletin-title" className="font-bold text-base text-white">Community WhatsApp & RWA Advisory</h3>
              <p className="text-xs text-slate-400">
                1-Click formatted bulletin for society notices & residential groups
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Community Advisory Bulletin"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisory Preview Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-emerald-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Pre-Formatted WhatsApp Markdown
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Zero State Names Guaranteed
            </span>
          </div>

          <div 
            tabIndex={0}
            role="region"
            aria-label="Bulletin Text Preview"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed selection:bg-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {bulletinText}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Ready to paste into WhatsApp, Telegram, or RWA noticeboards.
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy Community Bulletin to Clipboard"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
              copied
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Community Bulletin</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
