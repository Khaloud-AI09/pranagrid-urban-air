import { UrbanZoneProfile, SmogSeverityData } from '../types';

/**
 * Formats a WhatsApp-compatible Community Air Advisory Bulletin.
 * Strict Constraint: Zero Indian state or city names.
 */
export function formatCommunityBulletin(zone: UrbanZoneProfile, severity: SmogSeverityData): string {
  const lockStatus = severity.inversionLocked ? 'Trapped Inversion Lock' : 'Partial Mixing';

  return `🚨 *COMMUNITY AIR ADVISORY: WINTER INVERSION ALERT* 🚨
Issued by: PranaGrid / InversionOS Atmospheric Intelligence
Atmospheric Archetype: *${zone.name}*
Current Condition: *${severity.label}* (PM2.5: ${severity.pm25} µg/m³)
Thermal Ceiling (BLH): *${severity.boundaryLayerHeight} meters* (${lockStatus})

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
}
