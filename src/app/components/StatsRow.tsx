'use client';
import { ArrowDownToLine, Zap, Infinity, Paintbrush } from 'lucide-react';

export default function StatsRow() {
  const stats = [
    { label: 'Swings', value: '1.2M+', icon: <Infinity className="w-5 h-5 text-blue-400" /> },
    { label: 'Charms', value: '20+', icon: <Paintbrush className="w-5 h-5 text-purple-400" /> },
    { label: 'CPU Usage', value: '< 1%', icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    { label: 'Downloads', value: '50K+', icon: <ArrowDownToLine className="w-5 h-5 text-green-400" /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10 my-8">
      {stats.map((stat, i) => (
        <div key={i} className="group flex flex-col items-center justify-center p-6 glass rounded-2xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-default">
          <div className="mb-3 p-3 bg-white/5 border border-white/10 rounded-xl shadow-inner group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">{stat.icon}</div>
          <div className="text-3xl font-black tracking-tighter text-white mb-1">{stat.value}</div>
          <div className="text-xs font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
