import React from 'react';
import { Mic, MicOff, Terminal, Shield, Cpu, Code2, Sparkles, BookOpen, Keyboard } from 'lucide-react';

interface JarvisHeaderProps {
  activeTab: 'console' | 'power' | 'cyber' | 'system' | 'code' | 'memory';
  setActiveTab: (tab: 'console' | 'power' | 'cyber' | 'system' | 'code' | 'memory') => void;
  isListening: boolean;
  toggleListening: () => void;
  onOpenShortcuts: () => void;
}

export const JarvisHeader: React.FC<JarvisHeaderProps> = ({
  activeTab,
  setActiveTab,
  isListening,
  toggleListening,
  onOpenShortcuts,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('console')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 group-hover:border-cyan-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 font-mono flex items-center gap-1.5">
                JARVIS<span className="text-cyan-600">OS</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('console')}
            title="Press Ctrl+J to summon"
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'console'
                ? 'text-cyan-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Console
          </button>
          <button
            onClick={() => setActiveTab('power')}
            title="Press Ctrl+P to activate"
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'power'
                ? 'text-cyan-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Power Mode
          </button>
          <button
            onClick={() => setActiveTab('cyber')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'cyber'
                ? 'text-cyan-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Cyber Lab
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'system'
                ? 'text-cyan-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            System & Audio
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'text-cyan-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Python Architecture
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'memory'
                ? 'text-cyan-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Memory Vault
          </button>
        </nav>

        {/* Zone 3: Primary Action & Shortcut helper */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenShortcuts}
            className="p-1.5 text-slate-500 hover:text-cyan-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Global Keyboard Shortcuts (Ctrl+K)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          <button
            onClick={toggleListening}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 shadow-xs ${
              isListening
                ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse'
                : 'bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100'
            }`}
            title="Toggle live microphone recognition (Ctrl+Space)"
          >
            {isListening ? (
              <>
                <Mic className="w-3.5 h-3.5 text-rose-600" />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <MicOff className="w-3.5 h-3.5 text-cyan-600" />
                <span>Voice Mode</span>
              </>
            )}
            <kbd className="hidden sm:inline-block font-mono text-[9px] px-1 py-0.2 bg-white text-slate-600 rounded border border-slate-200 ml-0.5">
              Ctrl+Space
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
