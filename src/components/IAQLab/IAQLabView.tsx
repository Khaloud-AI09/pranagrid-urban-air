import React, { useState } from 'react';
import { IAQHack } from '../../types';
import { CorsiRosenthalModal } from './CorsiRosenthalModal';
import { IAQHackCard } from './IAQHackCard';
import { IAQLabHeader } from './IAQLabHeader';
import { IAQCategoryBar, HackCategory } from './IAQCategoryBar';

interface IAQLabViewProps {
  hacks: IAQHack[];
  onToggleHack: (id: string) => void;
  onActivateAllHacks: () => void;
}

/**
 * Indoor Air Quality (IAQ) Hacks and Open Science DIY Lab
 */
export const IAQLabView: React.FC<IAQLabViewProps> = ({
  hacks,
  onToggleHack,
  onActivateAllHacks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<HackCategory>('all');
  const [isCRModalOpen, setIsCRModalOpen] = useState(false);
  const [expandedHackId, setExpandedHackId] = useState<string | null>('hack-corsi-rosenthal');

  const filteredHacks = selectedCategory === 'all'
    ? hacks
    : hacks.filter(h => h.category === selectedCategory);

  const activeCount = hacks.filter(h => h.isChecklisted).length;
  const isCRAdded = Boolean(hacks.find(h => h.id === 'hack-corsi-rosenthal')?.isChecklisted);

  return (
    <div className="space-y-6">
      <IAQLabHeader activeCount={activeCount} totalCount={hacks.length} onOpenCRLab={() => setIsCRModalOpen(true)} onActivateAll={onActivateAllHacks} />
      <IAQCategoryBar selected={selectedCategory} onSelect={setSelectedCategory} totalCount={hacks.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHacks.map((hack) => (
          <IAQHackCard
            key={hack.id}
            hack={hack}
            isExpanded={expandedHackId === hack.id}
            onToggleExpand={() => setExpandedHackId(expandedHackId === hack.id ? null : hack.id)}
            onToggleChecklist={() => onToggleHack(hack.id)}
            onOpenCRLab={() => setIsCRModalOpen(true)}
          />
        ))}
      </div>

      <CorsiRosenthalModal
        isOpen={isCRModalOpen}
        onClose={() => setIsCRModalOpen(false)}
        onAddToChecklist={() => onToggleHack('hack-corsi-rosenthal')}
        isAdded={isCRAdded}
      />
    </div>
  );
};
