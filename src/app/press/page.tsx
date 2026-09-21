'use client';

import { useState } from 'react';
import { Download, Play, Image as ImageIcon, BookOpen, FileText, Info } from 'lucide-react';

const TABS = [
  { id: 'facts', label: 'Facts', icon: Info },
  { id: 'boilerplate', label: 'Boilerplate', icon: FileText },
  { id: 'video', label: 'Video', icon: Play },
  { id: 'screenshots', label: 'Screenshots', icon: ImageIcon },
  { id: 'origins', label: 'Charm Origins', icon: BookOpen },
  { id: 'downloads', label: 'Downloads', icon: Download },
];

export default function PressKitPage() {
  const [activeTab, setActiveTab] = useState('facts');

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            Press Kit
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl">
            Everything you need to write about Lucky Charm.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Tabs */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="glass-panel p-4 rounded-3xl sticky top-24">
              <nav className="flex flex-col gap-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeTab === tab.id 
                          ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] min-h-[500px]">
              {activeTab === 'facts' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-white mb-8">Fast Facts</h2>
                  <dl className="space-y-6 text-neutral-300">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-white/5 pb-4">
                      <dt className="text-neutral-500 font-medium">Developer</dt>
                      <dd className="sm:col-span-2 font-medium text-white">
                        Priyadharshan Chandranath<br/>
                        <span className="text-sm text-neutral-400 font-normal">Senior Analyst & SAP Product Engineer</span>
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-white/5 pb-4">
                      <dt className="text-neutral-500 font-medium">Platforms</dt>
                      <dd className="sm:col-span-2 font-medium text-white">Windows 10/11, macOS (Intel/Silicon)</dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-white/5 pb-4">
                      <dt className="text-neutral-500 font-medium">Release Date</dt>
                      <dd className="sm:col-span-2 font-medium text-white">TBA</dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-white/5 pb-4">
                      <dt className="text-neutral-500 font-medium">Website</dt>
                      <dd className="sm:col-span-2"><a href="https://luckycharm.app" className="text-blue-400 hover:underline">luckycharm.app</a></dd>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                      <dt className="text-neutral-500 font-medium">Media Contact</dt>
                      <dd className="sm:col-span-2"><a href="mailto:priyadharshanchandranath@gmail.com" className="text-blue-400 hover:underline">priyadharshanchandranath@gmail.com</a></dd>
                    </div>
                  </dl>
                </div>
              )}

              {activeTab === 'boilerplate' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Short Description</h2>
                    <p className="text-neutral-400 leading-relaxed">
                      Lucky Charm is a premium desktop companion that brings interactive, physics-based charms to your Windows or Mac workspace.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Long Description</h2>
                    <p className="text-neutral-400 leading-relaxed mb-4">
                      Lucky Charm transforms your desktop by providing small, interactive objects that foster meaningful connections. Designed with a custom Verlet physics integration engine, charms sway naturally on your screen with under 1% CPU usage.
                    </p>
                    <p className="text-neutral-400 leading-relaxed">
                      Collect from over 20 theme ecosystems, including DC, Marvel, BTS, and Tamil Divine. Automate your rituals with deep link protocols, allowing charms to react to your work sessions or deployments. A perfect blend of utility, art, and personalization.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'video' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                  <div className="aspect-video w-full rounded-2xl bg-black/50 border border-white/10 flex flex-col items-center justify-center mb-6">
                    <Play className="w-12 h-12 text-neutral-600 mb-4" />
                    <p className="text-neutral-500">Video assets coming soon</p>
                  </div>
                  <button className="px-6 py-2 glass text-white rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Trailer (MP4)
                  </button>
                </div>
              )}

              {activeTab === 'screenshots' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-neutral-700" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <button className="px-6 py-2 glass text-white rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download All Screenshots (.zip)
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'origins' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Charm Origins</h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">
                    Every charm in Lucky Charm is meticulously crafted to respect the cultural or thematic origins it represents.
                  </p>
                  <ul className="space-y-4 text-neutral-300">
                    <li className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">Tamil Divine</strong>
                      Representations of luck, protection, and divinity from Tamil culture, built to bring peace and focus to your digital space.
                    </li>
                    <li className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">Protection & Luck</strong>
                      A global collection of talismans, from the Turkish Nazar (Evil Eye) to the Japanese Daruma doll.
                    </li>
                    <li className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">Pop Culture (Marvel, DC, BTS)</strong>
                      Nostalgic elements that allow users to showcase their fandoms directly on their desktop.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'downloads' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Logos & Brand Assets</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-black/30 rounded-2xl border border-white/10 text-center flex flex-col items-center">
                      <div className="h-24 w-24 relative mb-4 rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                        <img src="/logo.png" alt="Lucky Charm App Icon" className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">Official App Icon</h3>
                      <p className="text-xs text-neutral-400 mb-4">High-res 512x512 Master PNG & Windows ICO</p>
                      <div className="flex gap-2">
                        <a 
                          href="/logo.png" 
                          download="lucky-charm-icon.png"
                          className="px-4 py-2 bg-white text-black text-xs rounded-lg font-bold hover:bg-neutral-200 transition-colors"
                        >
                          Download PNG
                        </a>
                        <a 
                          href="/favicon.ico" 
                          download="lucky-charm.ico"
                          className="px-4 py-2 glass text-white text-xs rounded-lg font-medium hover:bg-white/10 transition-colors border border-white/10"
                        >
                          Download .ICO
                        </a>
                      </div>
                    </div>
                    <div className="p-6 bg-black/30 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
                      <div className="h-24 flex items-center justify-center font-black text-2xl text-white mb-4 tracking-tighter gap-3">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                        Lucky Charm
                      </div>
                      <h3 className="font-semibold text-white mb-1">Brand Wordmark</h3>
                      <p className="text-xs text-neutral-400 mb-4">Standard lockup with official typography</p>
                      <a 
                        href="/logo.png" 
                        download="lucky-charm-brand.png"
                        className="px-4 py-2 bg-white text-black text-xs rounded-lg font-bold hover:bg-neutral-200 transition-colors"
                      >
                        Download Asset Pack
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
