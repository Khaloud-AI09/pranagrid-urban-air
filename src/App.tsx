import { useState } from 'react';
import { URBAN_ZONE_PROFILES } from './data/urbanProfiles';
import { useSmogContext } from './hooks/useSmogContext';
import { Header } from './components/Header';
import { ProfilerBar } from './components/ProfilerBar';
import { EngineSettingsModal } from './components/EngineSettingsModal';
import { BulletinModal } from './components/Community/BulletinModal';
import { ImpactPanel } from './components/Impact/ImpactPanel';
import { NavigationTabs, ActiveTab } from './components/NavigationTabs';
import { AppFooter } from './components/AppFooter';
import { AppTabContent } from './components/AppTabContent';

/**
 * Root component of PranaGrid / InversionOS
 */
export function App() {
  const smog = useSmogContext();
  const [activeTab, setActiveTab] = useState<ActiveTab>('copilot');
  const [dialog, setDialog] = useState<'settings' | 'bulletin' | null>(null);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300 pb-20 lg:pb-8">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 focus:rounded-xl focus:font-bold focus:shadow-2xl">
        Skip to main content
      </a>

      <Header currentSeverity={smog.context.severity} onSeverityChange={smog.handleSeverityChange} activeZone={URBAN_ZONE_PROFILES[smog.context.zone]} onOpenSettings={() => setDialog('settings')} onOpenBulletin={() => setDialog('bulletin')} />
      <ProfilerBar context={smog.context} onContextChange={smog.handleContextChange} />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <NavigationTabs activeTab={activeTab} onSelectTab={setActiveTab} routines={smog.routines} hacks={smog.hacks} alternatives={smog.alternatives} />

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full min-w-0">
            <AppTabContent activeTab={activeTab} smog={smog} onOpenBulletin={() => setDialog('bulletin')} />
          </div>
          <ImpactPanel impact={smog.calculatedImpact} context={smog.context} />
        </div>
      </main>

      <AppFooter />
      <EngineSettingsModal isOpen={dialog === 'settings'} onClose={() => setDialog(null)} onSettingsUpdated={() => smog.handleContextChange({})} />
      <BulletinModal isOpen={dialog === 'bulletin'} onClose={() => setDialog(null)} context={smog.context} />
    </div>
  );
}

export default App;
