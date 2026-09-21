'use client';
import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

export default function CodeSnippet() {
  const [copied, setCopied] = useState(false);
  const code = `luckycharm://bless?target=vscode`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel rounded-2xl overflow-hidden mt-8 mb-8 border border-white/10">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
          <Terminal className="w-4 h-4" />
          <span>Automation Deep Link</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/40">
        <div className="flex-1 overflow-x-auto hide-scrollbar">
          <code className="text-blue-400 font-mono text-sm md:text-base whitespace-nowrap">
            <span className="text-pink-400">luckycharm</span>
            <span className="text-white/50">://</span>
            <span className="text-yellow-300">bless</span>
            <span className="text-white/50">?target=</span>
            <span className="text-green-400">vscode</span>
          </code>
        </div>
        <button
          onClick={handleCopy}
          className="flex-none flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white border border-white/10"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
