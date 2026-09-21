'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import StatsRow from './components/StatsRow';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Dynamic import heavy interactive components to ensure instant initial render
const CharmShowcase = dynamic(() => import('./components/CharmShowcase'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video rounded-2xl glass-panel border border-white/10 flex items-center justify-center">
      <div className="text-white/40 text-sm font-mono animate-pulse">Loading Physics Engine...</div>
    </div>
  ),
});

const CodeSnippet = dynamic(() => import('./components/CodeSnippet'), {
  ssr: false,
});

// Performant CSS-based Cinematic Card for 120fps smoothness
const CinematicCard = ({ emoji, title, desc, lore, gradientClass }: any) => {
  return (
    <article className="glass-panel p-6 md:p-8 rounded-[2rem] group hover:border-white/20 transition-all duration-300 relative overflow-hidden h-full flex flex-col hover:-translate-y-1.5 hover:shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center mb-6 text-2xl relative z-10 transition-transform duration-300 group-hover:scale-110">
        {emoji}
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight relative z-10 text-white">{title}</h3>
      <p className="text-neutral-400 text-sm md:text-base leading-relaxed relative z-10 mb-4">{desc}</p>
      
      <div className="mt-auto overflow-hidden">
        <div className="text-xs md:text-sm text-neutral-500 font-medium italic border-t border-white/10 pt-3 mt-1">
          {lore}
        </div>
      </div>
    </article>
  );
};

export default function Home() {
  const [os, setOs] = useState<'windows' | 'mac' | 'other'>('other');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) {
      setOs('windows');
    } else if (userAgent.includes('mac')) {
      setOs('mac');
    }
  }, []);

  // Optimized GPU-accelerated variants: transform & opacity only (Target: 120fps)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: 'easeOut' as const } 
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-neutral-100 font-sans overflow-hidden relative">
      {/* Single primary ambient background glow for optimal GPU fillrate */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 pt-16 md:pt-20 pb-16 relative z-10">
        {/* Shortened 70-75vh Hero to bring interactive showcase immediately to the fold */}
        <header className="mb-12 flex flex-col items-center text-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="inline-block mb-6 relative">
              <span className="glass px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest text-blue-300 uppercase border border-blue-500/30 relative z-10 flex items-center gap-2">
                <span>✨</span> Available For Windows & macOS
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-transparent"
            >
              Bring a little magic<br />to your desktop.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-neutral-400 font-light mb-8 max-w-xl leading-relaxed"
            >
              Small objects. Meaningful connections. Collect interactive charms, personalize your workspace, and create moments of delight.
            </motion.p>
            
            <motion.nav 
              variants={itemVariants}
              aria-label="Download links" 
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              {os === 'mac' ? (
                <>
                  <a 
                    href="https://github.com/Priyadharshan2003/Lucky-Charm/releases/download/2.0.0/lucky-charm-2.0.0.1.dmg" 
                    className="px-8 py-3.5 bg-white text-black rounded-full font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] text-sm md:text-base"
                  >
                    Download for macOS
                  </a>
                  <a 
                    href="https://github.com/Priyadharshan2003/Lucky-Charm/releases/download/2.0.0/Lucky.Charm_2.0.0_x64-setup.exe" 
                    className="px-8 py-3.5 glass text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 text-sm md:text-base"
                  >
                    Download for Windows
                  </a>
                </>
              ) : (
                <>
                  <a 
                    href="https://github.com/Priyadharshan2003/Lucky-Charm/releases/download/2.0.0/Lucky.Charm_2.0.0_x64-setup.exe" 
                    className="px-8 py-3.5 bg-white text-black rounded-full font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] text-sm md:text-base"
                  >
                    Download for Windows
                  </a>
                  <a 
                    href="https://github.com/Priyadharshan2003/Lucky-Charm/releases/download/2.0.0/lucky-charm-2.0.0.1.dmg" 
                    className="px-8 py-3.5 glass text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 text-sm md:text-base"
                  >
                    Download for macOS
                  </a>
                </>
              )}
            </motion.nav>

            {/* Social / Support Row */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex flex-wrap justify-center gap-3"
            >
              {/* GitHub Star Button */}
              <a
                href="https://github.com/Priyadharshan2003/Lucky-Charm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 glass rounded-full font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 text-sm text-white group"
              >
                <svg
                  className="w-4 h-4 text-white group-hover:text-yellow-300 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>⭐ Star on GitHub</span>
              </a>

              {/* Buy Me a Coffee Button */}
              <a
                href="https://buymeacoffee.com/priyadharshan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDD00] text-[#000000] rounded-full font-bold hover:bg-yellow-300 transition-all duration-200 hover:scale-105 active:scale-95 text-sm shadow-[0_0_20px_-5px_rgba(255,221,0,0.5)]"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 884 1279"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M791.109 297.518L800.702 185.237C804.225 142.919 804.225 120.459 804.225 100.804C804.225 45.0179 763.706 0 714.887 0H169.113C120.294 0 79.7747 45.0179 79.7747 100.804C79.7747 120.459 79.7747 142.919 83.2981 185.237L92.8911 297.518C94.5653 316.778 96.6124 344.116 99.3326 370.332C102.455 399.491 105.879 425.972 115.072 451.044C164.992 592.006 278.75 694.299 417.607 712.581V767.225C417.607 789.084 415.361 810.244 410.768 830.696C406.178 851.148 399.275 870.698 389.884 888.993C380.493 907.288 369.024 924.018 355.853 938.784C342.682 953.548 327.864 966.134 311.752 976.255L264.004 1003.8C247.892 1013.91 230.18 1020.32 211.861 1022.69L174.742 1027.29C155.623 1029.75 137.813 1038.35 123.643 1051.88C109.473 1065.41 99.9441 1082.9 96.5017 1101.98L79.7747 1193.37C72.9017 1231.72 119.741 1279 169.113 1279H714.887C764.259 1279 811.098 1231.72 804.225 1193.37L787.498 1101.98C784.056 1082.9 774.527 1065.41 760.357 1051.88C746.187 1038.35 728.377 1029.75 709.258 1027.29L672.139 1022.69C653.82 1020.32 636.108 1013.91 619.996 1003.8L572.248 976.255C556.136 966.134 541.318 953.548 528.147 938.784C514.976 924.018 503.507 907.288 494.116 888.993C484.725 870.698 477.822 851.148 473.232 830.696C468.639 810.244 466.393 789.084 466.393 767.225V712.581C605.25 694.299 719.008 592.006 768.928 451.044C778.121 425.972 781.545 399.491 784.667 370.332C787.388 344.116 789.435 316.778 791.109 297.518Z" fill="#0D0C22"/>
                </svg>
                Buy me a coffee
              </a>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-6 flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-neutral-400 font-medium"
            >
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Native Desktop App</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Under 1% CPU</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Offline Physics Engine</span>
            </motion.div>
          </motion.div>
        </header>

        {/* App Experience Video */}
        <section 
          aria-labelledby="video-heading"
          className="relative max-w-4xl mx-auto mb-16 z-10 px-4 sm:px-6"
        >
          <h2 id="video-heading" className="sr-only">App Experience Video</h2>
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <video 
              src="/guide/exp%20video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              controls
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </section>

        {/* Interactive Physics Showcase - Brought above the fold */}
        <section 
          id="demo"
          aria-labelledby="showcase-heading" 
          className="relative max-w-5xl mx-auto"
        >
          <h2 id="showcase-heading" className="sr-only">Interactive Physics Showcase</h2>
          <CharmShowcase>
            <StatsRow />
          </CharmShowcase>
        </section>

        {/* Social Proof Section (Reduced padding by 25%) */}
        <section 
          className="py-14 border-y border-white/5 my-14 relative overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-14">
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">50K+</div>
              <div className="text-neutral-500 font-medium uppercase tracking-widest text-[11px]">Collectors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">4.9/5</div>
              <div className="text-neutral-500 font-medium uppercase tracking-widest text-[11px]">Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">100+</div>
              <div className="text-neutral-500 font-medium uppercase tracking-widest text-[11px]">Charms</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">20+</div>
              <div className="text-neutral-500 font-medium uppercase tracking-widest text-[11px]">Collections</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
              <div className="flex text-yellow-500 mb-3 text-sm">★★★★★</div>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">"The most delightful piece of software I've installed this year. The physics feel incredibly natural, and it uses absolutely zero CPU."</p>
              <div className="text-xs font-bold text-white">— Sarah J., Designer</div>
            </div>
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
              <div className="flex text-yellow-500 mb-3 text-sm">★★★★★</div>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">"I tied the Daruma doll to my build script. Now my desktop actively reflects my work status. Simply brilliant automation."</p>
              <div className="text-xs font-bold text-white">— Marcus T., Engineer</div>
            </div>
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
              <div className="flex text-yellow-500 mb-3 text-sm">★★★★★</div>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">"Having the Turkish Nazar on my screen brings an unexpected sense of calm. The attention to cultural detail is beautiful."</p>
              <div className="text-xs font-bold text-white">— Elena R., Writer</div>
            </div>
          </div>
        </section>

        {/* Curated Collections / Features (Reduced padding by 25%) */}
        <section 
          aria-labelledby="features-heading" 
          className="py-12"
        >
          <div className="text-center mb-10">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-black tracking-tighter mb-3 text-white">Curated Collections</h2>
            <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto">More than just pixels. Every object has a story, a purpose, and a unique physical presence on your screen.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <CinematicCard 
              emoji="⚡" 
              title="Natural physics" 
              desc="Under 1% CPU usage. Built with a custom Verlet integration engine so it sways naturally while you work." 
              lore="The physics engine calculates gravity, wind resistance, and tension 60 times a second for fluid realism."
              gradientClass="from-blue-500/10 to-transparent"
            />
            
            <CinematicCard 
              emoji="🎨" 
              title="Made by you" 
              desc="Every charm has a unique interaction. Repaint the Drishti, complete the Daruma's eye, or customize the ropes." 
              lore="Interactive elements are preserved securely in your local storage. Your rituals remain entirely yours."
              gradientClass="from-purple-500/10 to-transparent"
            />
            
            <CinematicCard 
              emoji="🌍" 
              title="A world to collect" 
              desc="Discover 20+ theme ecosystems. Find your community, nostalgia, and identity from various cultures." 
              lore="From the Tamil Divine collection to Pop Culture favorites. Carefully curated to bring peace to your workspace."
              gradientClass="from-emerald-500/10 to-transparent"
            />
          </div>
        </section>

        {/* Developer Protocol / Deep Automation (Reduced padding by 25%) */}
        <section 
          aria-labelledby="automation-heading" 
          className="py-14 relative"
        >
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 mb-4">
              Developer Protocol
            </div>
            <h2 id="automation-heading" className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-white">Deep Automation</h2>
            <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto">Trigger charms automatically using the deep link protocol. Bless your deployments, focus your work sessions, or react to webhooks.</p>
          </div>
          <CodeSnippet />
        </section>
      </div>
    </main>
  );
}
