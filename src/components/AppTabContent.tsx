import React from 'react';
import { ActiveTab } from './NavigationTabs';
import { CoPilotView } from './CoPilot/CoPilotView';
import { RoutineTimeline } from './Routine/RoutineTimeline';
import { IAQLabView } from './IAQLab/IAQLabView';
import { CommunityHubView } from './Community/CommunityHubView';
import { SmogContextHook } from '../hooks/useSmogContext';

interface AppTabContentProps {
  activeTab: ActiveTab;
  smog: SmogContextHook;
  onOpenBulletin: () => void;
}

export const AppTabContent: React.FC<AppTabContentProps> = ({ activeTab, smog, onOpenBulletin }) => {
  if (activeTab === 'copilot') return <CoPilotView context={smog.context} onAdoptFromAI={smog.handleAdoptFromAI} />;
  if (activeTab === 'routine') {
    return <RoutineTimeline context={smog.context} routines={smog.routines} onToggleAdopt={smog.handleToggleRoutine} onAdoptAll={smog.handleAdoptAllRoutines} />;
  }
  if (activeTab === 'iaq') {
    return <IAQLabView hacks={smog.hacks} onToggleHack={smog.handleToggleHack} onActivateAllHacks={smog.handleActivateAllHacks} />;
  }
  return <CommunityHubView alternatives={smog.alternatives} onToggleAlternative={smog.handleToggleAlternative} onOpenBulletin={onOpenBulletin} context={smog.context} />;
};
