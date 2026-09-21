import { Metadata } from 'next';
import { Download, Monitor, Apple, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Download Lucky Charm | Windows & macOS',
  description: 'Download Lucky Charm for Windows and macOS. One purchase gives you access to both platforms.',
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-20 flex flex-col items-center">
          <div className="w-20 h-20 mb-6 relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            <Image 
              src="/logo.png" 
              alt="Lucky Charm App Icon" 
              fill 
              sizes="80px"
              className="object-contain" 
              priority 
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            Choose Your Platform
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            One purchase. Both platforms.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-24">
          {/* Windows Card */}
          <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Recommended</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="h-20 w-20 rounded-3xl glass flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-2">Windows</h2>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-neutral-400">Version 2.0.0</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                <span className="text-neutral-400">.EXE Installer</span>
              </div>
              
              <ul className="space-y-4 mb-10 text-neutral-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Supports Windows 10 & 11</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Native Tray Experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Auto Updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Under 1% CPU</span>
                </li>
              </ul>
              
              <a 
                href="https://github.com/Priyadharshan2003/Lucky-Dangle/releases/download/v2.0.0/Lucky.Charm_2.0.0_x64-setup.exe"
                className="block w-full py-4 bg-white text-black text-center rounded-2xl font-bold text-lg hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Download for Windows
              </a>
            </div>
          </div>

          {/* Mac Card */}
          <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-white/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="h-20 w-20 rounded-3xl glass flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Apple className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-2">macOS</h2>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-neutral-400">Version 2.0.0</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                <span className="text-neutral-400">.DMG Installer</span>
              </div>
              
              <ul className="space-y-4 mb-10 text-neutral-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Supports Apple Silicon & Intel</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Native Menu Bar App</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Sparkle Updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Lightweight</span>
                </li>
              </ul>
              
              <a 
                href="https://github.com/Priyadharshan2003/Lucky-Dangle/releases/download/v2.0.0/lucky-charm-2.0.0.dmg"
                className="block w-full py-4 glass text-white text-center rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10"
              >
                Download for macOS
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-12 text-center border-t border-white/10 pt-16">
          <div>
            <div className="text-4xl font-black text-white mb-2">50K+</div>
            <div className="text-neutral-500 font-medium uppercase tracking-wider text-sm">Downloads</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">20+</div>
            <div className="text-neutral-500 font-medium uppercase tracking-wider text-sm">Collections</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">100+</div>
            <div className="text-neutral-500 font-medium uppercase tracking-wider text-sm">Unique Charms</div>
          </div>
        </div>
      </div>
    </main>
  );
}
