'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const releases = [
  {
    version: '1.6',
    platform: 'mac',
    date: 'September 2026',
    notes: [
      'Added support for custom ropes.',
      'Improved performance on older Intel Macs.',
      'New Pop Culture charm collection.'
    ]
  },
  {
    version: '1.1.2',
    platform: 'windows',
    date: 'September 2026',
    notes: [
      'Fixed transparent window click-through issues.',
      'Moved charm selection strictly to the System Tray for rock-solid stability.',
      'Removed experimental floating UI.'
    ]
  },
  {
    version: '1.5',
    platform: 'mac',
    date: 'August 2026',
    notes: [
      'Native Menu Bar App rewrite.',
      'Sparkle updates integration.',
    ]
  },
  {
    version: '1.1.1',
    platform: 'windows',
    date: 'August 2026',
    notes: [
      'Added auto-cycle toggle feature.',
      'Fixed tray menu missing checkmarks.',
    ]
  },
  {
    version: '1.1.0',
    platform: 'windows',
    date: 'July 2026',
    notes: [
      'Initial native Windows release using Tauri.',
      'Complete physics engine rewrite to support Windows compositing.',
    ]
  },
  {
    version: '1.4',
    platform: 'mac',
    date: 'July 2026',
    notes: [
      'Added Tamil Divine collection.',
      'Improved dragging physics.',
    ]
  },
  {
    version: '1.0.0',
    platform: 'windows',
    date: 'June 2026',
    notes: [
      'Early access beta for Windows.',
    ]
  },
  {
    version: '1.0',
    platform: 'mac',
    date: 'January 2026',
    notes: [
      'Initial release for macOS.',
      'Launch of the core physics engine and 10 initial charms.'
    ]
  }
];

export default function NotesPage() {
  const [filter, setFilter] = useState<'all' | 'windows' | 'mac'>('all');

  const filteredReleases = releases.filter(r => filter === 'all' || r.platform === filter);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            What's New
          </h1>
          <p className="text-xl text-neutral-400 font-light mb-10">
            Release notes and updates for Lucky Charm.
          </p>
          
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('windows')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'windows' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Windows
            </button>
            <button
              onClick={() => setFilter('mac')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'mac' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              macOS
            </button>
          </div>
        </header>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 pb-12">
          {filteredReleases.map((release, i) => (
            <motion.div 
              key={`${release.platform}-${release.version}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute w-4 h-4 rounded-full bg-[#09090b] border-2 border-blue-500 -left-[9px] top-1.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl font-bold text-white">v{release.version}</span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${release.platform === 'windows' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                  {release.platform}
                </span>
              </div>
              
              <div className="text-neutral-500 text-sm mb-4 font-medium">{release.date}</div>
              
              <div className="glass-panel p-6 rounded-2xl">
                <ul className="space-y-3">
                  {release.notes.map((note, j) => (
                    <li key={j} className="flex gap-3 text-neutral-300">
                      <span className="text-neutral-600 select-none">-</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
