import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Bot, Clock, Wrench, Users } from 'lucide-react';
import { UserContext, RoutineBlock, IAQHack, SustainableAlternative, SmogSeverityLevel } from './types';
import { URBAN_ZONE_PROFILES } from './data/urbanProfiles';
import { INITIAL_ROUTINE_BLOCKS } from './data/routineTemplates';
import { IAQ_HACKS_DATA } from './data/iaqHacks';
import { SUSTAINABLE_ALTERNATIVES_DATA } from './data/communityAlternatives';
import { calculateDirectImpact } from './services/impactCalculator';

import { Header } from './components/Header';
import { ProfilerBar } from './components/ProfilerBar';
import { EngineSettingsModal } from './components/EngineSettingsModal';
import { CoPilotView } from './components/CoPilot/CoPilotView';
import { RoutineTimeline } from './components/Routine/RoutineTimeline';
import { IAQLabView } from './components/IAQLab/IAQLabView';
import { CommunityHubView } from './components/Community/CommunityHubView';
import { BulletinModal } from './components/Community/BulletinModal';
import { ImpactPanel } from './components/Impact/ImpactPanel';

export function App() {
  // Context state
  const [context, setContext] = useState<UserContext>({
    zone: 'indo-gangetic-metro',
    household: 'kids-elderly',
    setup: 'gas-petrol',
    severity: 'severe-inversion',
  });

  // Active feature datasets
  const [routines, setRoutines] = useState<RoutineBlock[]>(INITIAL_ROUTINE_BLOCKS);
  const [hacks, setHacks] = useState<IAQHack[]>(IAQ_HACKS_DATA);
  const [alternatives, setAlternatives] = useState<SustainableAlternative[]>(SUSTAINABLE_ALTERNATIVES_DATA);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'copilot' | 'routine' | 'iaq' | 'community'>('copilot');

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBulletinOpen, setIsBulletinOpen] = useState(false);

  // Real-time calculated direct impact
  const calculatedImpact = useMemo(() => {
    return calculateDirectImpact(context, routines, hacks, alternatives);
  }, [context, routines, hacks, alternatives]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#06B6D4', '#3B82F6'],
    });
  };

  // Handlers
  const handleContextChange = (newContext: Partial<UserContext>) => {
    setContext(prev => ({ ...prev, ...newContext }));
  };

  const handleSeverityChange = (severity: SmogSeverityLevel) => {
    setContext(prev => ({ ...prev, severity }));
  };

  const handleToggleRoutine = (id: string) => {
    setRoutines(prev => prev.map(block => {
      if (block.id === id) {
        const nextState = !block.isAdopted;
        if (nextState) triggerConfetti();
        return { ...block, isAdopted: nextState };
      }
      return block;
    }));
  };

  const handleAdoptAllRoutines = () => {
    triggerConfetti();
    setRoutines(prev => prev.map(b => ({ ...b, isAdopted: true })));
  };

  const handleToggleHack = (id: string) => {
    setHacks(prev => prev.map(hack => {
      if (hack.id === id) {
        const nextState = !hack.isChecklisted;
        if (nextState) triggerConfetti();
        return { ...hack, isChecklisted: nextState };
      }
      return hack;
    }));
  };

  const handleActivateAllHacks = () => {
    triggerConfetti();
    setHacks(prev => prev.map(h => ({ ...h, isChecklisted: true })));
  };

  const handleToggleAlternative = (id: string) => {
    setAlternatives(prev => prev.map(alt => {
      if (alt.id === id) {
        const nextState = !alt.isAdopted;
        if (nextState) triggerConfetti();
        return { ...alt, isAdopted: nextState };
      }
      return alt;
    }));
  };

  const handleAdoptFromAI = () => {
    triggerConfetti();
    // Auto adopt first 3 routines and first 3 hacks
    setRoutines(prev => prev.map((r, i) => i < 3 ? { ...r, isAdopted: true } : r));
    setHacks(prev => prev.map((h, i) => i < 3 ? { ...h, isChecklisted: true } : h));
  };

  const activeZone = URBAN_ZONE_PROFILES[context.zone];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300 pb-20 lg:pb-8">
      
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 focus:rounded-xl focus:font-bold focus:shadow-2xl"
      >
        Skip to main content
      </a>

      {/* 1. Header with Live AQI & Smog Simulator Toggle */}
      <Header
        currentSeverity={context.severity}
        onSeverityChange={handleSeverityChange}
        activeZone={activeZone}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBulletin={() => setIsBulletinOpen(true)}
      />

      {/* 2. Family & Lifestyle Profiler Bar */}
      <ProfilerBar
        context={context}
        onContextChange={handleContextChange}
      />

      {/* 3. Main Application Body */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800/80 mb-6 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Application Sections">
          <button
            role="tab"
            aria-selected={activeTab === 'copilot'}
            onClick={() => setActiveTab('copilot')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'copilot'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>GenAI Smog Co-Pilot</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'routine'}
            onClick={() => setActiveTab('routine')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'routine'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>24h Daily Routine Optimizer</span>
            {routines.some(r => r.isAdopted) && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                {routines.filter(r => r.isAdopted).length}/5
              </span>
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'iaq'}
            onClick={() => setActiveTab('iaq')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'iaq'
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Wrench className="w-4 h-4 text-indigo-400" />
            <span>Indoor Air Hacks & DIY Lab</span>
            {hacks.some(h => h.isChecklisted) && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300">
                {hacks.filter(h => h.isChecklisted).length}
              </span>
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'community'}
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'community'
                ? 'bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4 text-teal-400" />
            <span>Sustainable Swaps & Community</span>
            {alternatives.some(a => a.isAdopted) && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-teal-500/20 text-teal-300">
                {alternatives.filter(a => a.isAdopted).length}
              </span>
            )}
          </button>
        </div>

        {/* Layout: Main Interactive View + Persistent Direct Impact Panel */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Main Module Content */}
          <div className="flex-1 w-full min-w-0">
            {activeTab === 'copilot' && (
              <CoPilotView
                context={context}
                onAdoptFromAI={handleAdoptFromAI}
              />
            )}

            {activeTab === 'routine' && (
              <RoutineTimeline
                context={context}
                routines={routines}
                onToggleAdopt={handleToggleRoutine}
                onAdoptAll={handleAdoptAllRoutines}
              />
            )}

            {activeTab === 'iaq' && (
              <IAQLabView
                hacks={hacks}
                onToggleHack={handleToggleHack}
                onActivateAllHacks={handleActivateAllHacks}
              />
            )}

            {activeTab === 'community' && (
              <CommunityHubView
                alternatives={alternatives}
                onToggleAlternative={handleToggleAlternative}
                onOpenBulletin={() => setIsBulletinOpen(true)}
                context={context}
              />
            )}
          </div>

          {/* Sticky Direct Impact Panel */}
          <ImpactPanel
            impact={calculatedImpact}
            context={context}
          />

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-12 py-6 bg-slate-950/60 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-200">PranaGrid / InversionOS</span>
            <span>•</span>
            <span>PromptWars Challenge 6: Urban Air</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400">
            <span>Dual-Mode GenAI Reliability</span>
            <span>•</span>
            <span>Zero State Names Guaranteed</span>
            <span>•</span>
            <span>Berkeley Earth & WHO Standard Models</span>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <EngineSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsUpdated={() => {
          setContext(prev => ({ ...prev }));
        }}
      />

      {/* Community Bulletin Modal */}
      <BulletinModal
        isOpen={isBulletinOpen}
        onClose={() => setIsBulletinOpen(false)}
        context={context}
      />

    </div>
  );
}

export default App;
