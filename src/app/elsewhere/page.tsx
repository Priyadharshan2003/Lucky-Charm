'use client';

import { useState } from 'react';

const PLATFORMS = [
  'Linux',
  'Android',
  'iPhone',
  'iPad',
  'ChromeOS',
  'Steam Deck'
];

export default function ElsewherePage() {
  const [platform, setPlatform] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submission
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">
            Not on Windows or Mac?
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-lg mx-auto">
            Tell us where you'd like Lucky Charm next and we'll let you know when it's ready.
          </p>
        </header>

        <div className="glass-panel p-8 md:p-12 rounded-[2rem] relative overflow-hidden text-left">
          {submitted ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're on the list!</h2>
              <p className="text-neutral-400">We'll email you when Lucky Charm is available on your platform.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-300">Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="platform" className="text-sm font-medium text-neutral-300">Platform</label>
                <div className="relative">
                  <select 
                    id="platform"
                    required
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="" disabled className="text-neutral-600">Select a platform...</option>
                    {PLATFORMS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors mt-4"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
