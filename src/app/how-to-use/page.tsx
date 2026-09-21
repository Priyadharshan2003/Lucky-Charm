import { Metadata } from 'next';
import { Download, MonitorPlay, MousePointerClick, Sparkles } from 'lucide-react';
import GuideImage from '../../components/GuideImage';

export const metadata: Metadata = {
  title: 'How to Use | Lucky Charm',
  description: 'Learn how to download, install, and use Lucky Charm on your desktop.',
};

export default function HowToUsePage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6 relative z-10">
      <div className="max-w-[900px] mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            How to Use Lucky Charm
          </h1>
          <p className="text-lg text-neutral-400">
            A simple guide to getting started with your new desktop companion.
          </p>
        </header>

        <div className="space-y-6">
          {/* Step 1 */}
          <section className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <Download size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Step 1: Download</h2>
                </div>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Visit the download page and choose the installer for your desired operating system (Windows or macOS).
                </p>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-video relative w-full group">
                <GuideImage 
                  src="/guide/step1.png"
                  alt="Download Step"
                  icon={<Download size={24} className="opacity-50" />}
                  stepPath="public/guide/step1.png"
                  imgClassName="object-cover"
                  codeClassName="text-blue-400 bg-blue-400/10"
                />
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                    <MonitorPlay size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Step 2: Install & Open</h2>
                </div>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Execute the downloaded installer and follow the instructions. Once installed, open the Lucky Charm app.
                </p>
              </div>
              
              <div className="md:order-1 rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-video relative w-full group">
                <GuideImage 
                  src="/guide/step2.png"
                  alt="Install Step"
                  icon={<MonitorPlay size={24} className="opacity-50" />}
                  stepPath="public/guide/step2.png"
                  imgClassName="object-contain p-2"
                  codeClassName="text-purple-400 bg-purple-400/10"
                />
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <MousePointerClick size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Step 3: Select Charm</h2>
                </div>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Go to the tray icon in your taskbar or menu bar. Right-click to open the menu, select your preferred charm, and enjoy!
                </p>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-[4/3] md:aspect-video relative w-full group">
                <GuideImage 
                  src="/guide/step3.png"
                  alt="Select Charm Step"
                  icon={<MousePointerClick size={24} className="opacity-50" />}
                  stepPath="public/guide/step3.png"
                  imgClassName="object-cover"
                  codeClassName="text-emerald-400 bg-emerald-400/10"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
