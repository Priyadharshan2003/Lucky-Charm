import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Lucky Charm',
  description: 'About Priyadharshan Chandranath, creator of Lucky Charm.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            About the Creator
          </h1>
        </header>

        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6">Priyadharshan Chandranath</h2>
            
            <div className="space-y-6 text-neutral-400 leading-relaxed text-lg mb-12">
              <p>
                Lucky Charm is curated and maintained by Priyadharshan Chandranath, a Senior Analyst and SAP Product Engineer passionate about desktop experiences, personalization, and meaningful digital products.
              </p>
              <p>
                With expertise spanning SAP UI5, SAP BTP, React, React Native, Node.js, and modern web technologies, Priyadharshan combines engineering precision with thoughtful product design to create delightful experiences that blend utility and personality.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-6">Experience Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Senior Analyst
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  SAP Product Engineer
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  SAP UI5 / Fiori Developer
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  React & React Native Developer
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  SAP BTP Specialist
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6">
              <a 
                href="https://priyadharshan-tau.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black text-center rounded-xl font-bold hover:bg-neutral-200 transition-colors"
              >
                View Portfolio
              </a>
              <a 
                href="mailto:priyadharshanchandranath@gmail.com" 
                className="px-6 py-3 glass text-white text-center rounded-xl font-bold hover:bg-white/10 transition-colors border border-white/10"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
