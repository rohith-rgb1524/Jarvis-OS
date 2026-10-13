import React from 'react';
import { Keyboard, X, Sparkles, Terminal, Mic, Shield, Cpu, BookOpen } from 'lucide-react';

interface ShortcutPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAction: (actionKey: 'voice' | 'console' | 'power' | 'cyber' | 'system' | 'memory') => void;
}

export const ShortcutPaletteModal: React.FC<ShortcutPaletteModalProps> = ({
  isOpen,
  onClose,
  onTriggerAction,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      combo: 'Ctrl + Space',
      actionKey: 'voice' as const,
      label: 'Toggle Voice Listening',
      description: 'Engages microphone and begins speech-to-text transcription instantly.',
      icon: <Mic className="w-4 h-4 text-cyan-400" />,
    },
    {
      combo: 'Ctrl + J',
      actionKey: 'console' as const,
      label: 'Summon JARVIS Console',
      description: 'Switches to console tab and immediately focuses the command prompt input.',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    },
    {
      combo: 'Ctrl + P',
      actionKey: 'power' as const,
      label: 'Activate Power Mode',
      description: 'Opens autonomous multi-step research lab for topic synthesis and dossiers.',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    },
    {
      combo: 'Ctrl + K',
      actionKey: 'console' as const,
      label: 'Shortcut Palette',
      description: 'Toggles this quick shortcuts reference modal.',
      icon: <Keyboard className="w-4 h-4 text-slate-400" />,
    },
    {
      combo: 'Esc',
      actionKey: 'console' as const,
      label: 'Cancel Speech / Dismiss',
      description: 'Cancels running audio text-to-speech or dismisses active overlays.',
      icon: <X className="w-4 h-4 text-rose-400" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-mono">Global Keyboard Shortcuts</h3>
              <p className="text-[11px] text-slate-500">Windows 11 & Desktop Companion hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto">
          {shortcuts.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => {
                onTriggerAction(sc.actionKey);
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-cyan-300">
                  {sc.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-cyan-900">
                    {sc.label}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    {sc.description}
                  </div>
                </div>
              </div>

              <kbd className="font-mono text-xs font-semibold text-cyan-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-xs shrink-0 ml-3">
                {sc.combo}
              </kbd>
            </button>
          ))}
        </div>

        {/* Desktop Note */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
          <span className="text-slate-800 font-semibold block mb-0.5">Desktop Background Daemon:</span>
          These exact hotkeys run globally in the background on your HP Victus laptop via{' '}
          <code className="text-cyan-800 font-mono font-medium">desktop/hotkeys.py</code>, allowing you to invoke
          JARVIS even when other gaming or coding apps are focused.
        </div>
      </div>
    </div>
  );
};
