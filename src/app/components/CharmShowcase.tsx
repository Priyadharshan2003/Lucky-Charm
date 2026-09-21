'use client';
import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import { CHARMS, type CharmConfig } from '@/core';
import DesktopStage from './DesktopStage';

// Memoized individual charm card to prevent re-renders of list items
const CharmCard = memo(function CharmCard({
  charm,
  isActive,
  onSelect,
}: {
  charm: CharmConfig;
  isActive: boolean;
  onSelect: (c: CharmConfig) => void;
}) {
  return (
    <button
      onClick={() => onSelect(charm)}
      role="radio"
      aria-checked={isActive}
      aria-label={`Select ${charm.name} charm`}
      className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        isActive
          ? 'bg-blue-500/20 border-blue-500/50 shadow-[0_0_20px_-5px_rgba(59,130,246,0.35)] scale-105 z-10'
          : 'glass hover:bg-white/10 hover:border-white/20 hover:scale-[1.03]'
      } border`}
    >
      <div className="h-20 w-20 flex items-center justify-center overflow-hidden relative">
        <Image
          src={charm.assetUrl}
          alt={charm.name}
          fill
          sizes="(max-width: 768px) 80px, 96px"
          loading="lazy"
          className={`object-contain transition-transform duration-300 ${
            isActive ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'drop-shadow-md group-hover:scale-105'
          }`}
        />
      </div>
      <span className="mt-2 text-xs font-semibold text-neutral-300 line-clamp-1 w-full text-center tracking-tight group-hover:text-white transition-colors">
        {charm.name}
      </span>
      {isActive && (
        <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-blue-500/30 text-blue-300 border border-blue-400/30">
          Active
        </span>
      )}
    </button>
  );
});

export default function CharmShowcase({ children }: { children?: React.ReactNode }) {
  const [activeCharm, setActiveCharm] = useState(CHARMS[0]);

  // Group charms by collection
  const collections = useMemo(() => {
    return CHARMS.reduce((acc, charm) => {
      if (!acc[charm.collection]) acc[charm.collection] = [];
      acc[charm.collection].push(charm);
      return acc;
    }, {} as Record<string, CharmConfig[]>);
  }, []);

  const collectionNames = useMemo(() => Object.keys(collections), [collections]);
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collectionNames[0] || 'Protection & Luck'
  );

  // Active charms for only the selected collection tab
  const activeCharms = useMemo(() => {
    return collections[selectedCollection] || [];
  }, [collections, selectedCollection]);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Interactive Physics Stage */}
      <section aria-label="Interactive demo of the selected charm" className="mb-4">
        <DesktopStage activeCharm={activeCharm} />
      </section>

      {children}

      {/* Optimized Collections with Category Tabs */}
      <section className="mb-16" aria-labelledby="collections-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h3 id="collections-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-white">
              Explore Collections
            </h3>
            <p className="text-base md:text-lg text-white/60 max-w-xl">
              Select a category to explore authentic charms. Click any charm to hang and flick it above.
            </p>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit">
            {activeCharms.length} Charms in {selectedCollection}
          </div>
        </div>

        {/* Collection Category Tabs */}
        <div 
          role="tablist" 
          aria-label="Charm collection categories"
          className="flex gap-2 overflow-x-auto pb-3 mb-8 hide-scrollbar"
        >
          {collectionNames.map((name) => {
            const isTabActive = name === selectedCollection;
            return (
              <button
                key={name}
                role="tab"
                aria-selected={isTabActive}
                onClick={() => setSelectedCollection(name)}
                className={`flex-none px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isTabActive
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] font-bold'
                    : 'glass text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {name}
                <span className={`ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isTabActive ? 'bg-black/10 text-neutral-800' : 'bg-white/10 text-neutral-400'
                }`}>
                  {collections[name]?.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Only Active Collection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {activeCharms.map((charm) => (
            <CharmCard
              key={charm.id}
              charm={charm}
              isActive={charm.id === activeCharm.id}
              onSelect={setActiveCharm}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
