import React, { useState, useEffect } from 'react';
import { JarvisHeader } from './components/JarvisHeader';
import { ConsoleView } from './components/ConsoleView';
import { PowerModeView } from './components/PowerModeView';
import { CyberLabView } from './components/CyberLabView';
import { SystemDiagnostics } from './components/SystemDiagnostics';
import { MemoryManagerView } from './components/MemoryManagerView';
import { CodebaseExplorer } from './components/CodebaseExplorer';
import { ShortcutPaletteModal } from './components/ShortcutPaletteModal';
import { OperatingMode, ActionLog, MemoryItem } from './types';
import { Keyboard, CheckCircle, VolumeX } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'power' | 'cyber' | 'system' | 'code' | 'memory'>('console');
  const [currentMode, setCurrentMode] = useState<OperatingMode>('default');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [powerModeTopic, setPowerModeTopic] = useState<string>('');
  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState<boolean>(false);
  const [focusConsoleTrigger, setFocusConsoleTrigger] = useState<number>(0);
  const [hudToast, setHudToast] = useState<{ message: string; sub?: string } | null>(null);

  // Controlled Memory System state (Disabled by default per Section 9)
  const [memoryEnabled, setMemoryEnabled] = useState<boolean>(false);
  const [memories, setMemories] = useState<MemoryItem[]>([
    {
      id: 'mem-1',
      category: 'preference',
      content: 'Prefer concise technical explanations with Python 3.12 syntax.',
      createdAt: '12 Oct 2026',
      approvedByUser: true,
    },
    {
      id: 'mem-2',
      category: 'project',
      content: 'Primary machine: HP Victus Laptop (Intel i7-13th Gen, NVIDIA RTX 4050, 16GB RAM).',
      createdAt: '12 Oct 2026',
      approvedByUser: true,
    },
  ]);

  // Verified Action audit logs
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);

  const showHudToast = (message: string, sub?: string) => {
    setHudToast({ message, sub });
    setTimeout(() => {
      setHudToast((curr) => (curr?.message === message ? null : curr));
    }, 2400);
  };

  // Global Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ctrl+Space / Cmd+Space: Toggle Listening
      if ((e.ctrlKey || e.metaKey) && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        setIsListening((prev) => {
          const next = !prev;
          showHudToast(
            next ? 'Voice Recognition: Active' : 'Voice Recognition: Muted',
            '[Ctrl+Space] Global shortcut triggered'
          );
          return next;
        });
        return;
      }

      // 2. Ctrl+J / Cmd+J: Summon JARVIS Console & Focus Input
      if ((e.ctrlKey || e.metaKey) && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        setActiveTab('console');
        setFocusConsoleTrigger((prev) => prev + 1);
        showHudToast('JARVIS Console Summoned', '[Ctrl+J] Focused command prompt');
        return;
      }

      // 3. Ctrl+P / Cmd+P: Power Mode Research Lab
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setActiveTab('power');
        showHudToast('Power Mode Activated', '[Ctrl+P] Autonomous research workspace');
        return;
      }

      // 4. Ctrl+K / Cmd+K: Keyboard Shortcuts Cheat Sheet
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsShortcutModalOpen((prev) => !prev);
        return;
      }

      // 5. Esc: Dismiss dialogs, cancel TTS playback, or stop voice listening
      if (e.key === 'Escape') {
        if (isShortcutModalOpen) {
          setIsShortcutModalOpen(false);
          return;
        }
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          showHudToast('Speech Playback Cancelled', '[Esc] Audio stopped');
        }
        if (isListening) {
          setIsListening(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, isShortcutModalOpen]);

  // Speech Recognition hook
  useEffect(() => {
    if (!isListening) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Web Speech API not supported in this browser.');
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const lastIdx = event.results.length - 1;
        const transcript = event.results[lastIdx][0].transcript.trim();
        console.log('Recognized speech:', transcript);

        // Wake word trigger
        if (transcript.toLowerCase().includes('jarvis')) {
          console.log('Wake word JARVIS detected in voice stream.');
        }
      };

      recognition.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    } catch (e) {
      console.error('Speech recognition exception:', e);
      setIsListening(false);
    }
  }, [isListening]);

  const toggleListening = () => {
    setIsListening((prev) => {
      const next = !prev;
      showHudToast(
        next ? 'Voice Recognition: Active' : 'Voice Recognition: Muted',
        'Toggle voice mode'
      );
      return next;
    });
  };

  const addActionLog = (log: ActionLog) => {
    setActionLogs((prev) => [log, ...prev]);
  };

  const handleAddMemory = (
    category: 'preference' | 'project' | 'instruction',
    content: string
  ): string | null => {
    if (!memoryEnabled) {
      return 'Memory system is disabled. Please enable it before storing preferences.';
    }

    const lower = content.toLowerCase();
    if (
      lower.includes('password') ||
      lower.includes('secret') ||
      lower.includes('token') ||
      lower.includes('api_key') ||
      lower.includes('credit card')
    ) {
      return 'Security Guard: Storing passwords, keys, or credentials in local memory is strictly rejected.';
    }

    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      category,
      content,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      approvedByUser: true,
    };

    setMemories((prev) => [...prev, newItem]);
    return null;
  };

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const clearAllMemories = () => {
    setMemories([]);
  };

  const triggerPowerModeWithTopic = (topic: string) => {
    setPowerModeTopic(topic);
    setCurrentMode('power');
    setActiveTab('power');
  };

  const handleModalShortcutAction = (key: 'voice' | 'console' | 'power' | 'cyber' | 'system' | 'memory') => {
    if (key === 'voice') {
      toggleListening();
    } else {
      setActiveTab(key);
      if (key === 'console') {
        setFocusConsoleTrigger((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-900 relative">
      {/* Top Bar Navigation */}
      <JarvisHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isListening={isListening}
        toggleListening={toggleListening}
        onOpenShortcuts={() => setIsShortcutModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'console' && (
          <ConsoleView
            currentMode={currentMode}
            setMode={setCurrentMode}
            actionLogs={actionLogs}
            addActionLog={addActionLog}
            memoryEnabled={memoryEnabled}
            onRunPowerMode={triggerPowerModeWithTopic}
            focusTrigger={focusConsoleTrigger}
          />
        )}

        {activeTab === 'power' && <PowerModeView initialTopic={powerModeTopic} />}

        {activeTab === 'cyber' && <CyberLabView />}

        {activeTab === 'system' && <SystemDiagnostics />}

        {activeTab === 'code' && <CodebaseExplorer />}

        {activeTab === 'memory' && (
          <MemoryManagerView
            memoryEnabled={memoryEnabled}
            setMemoryEnabled={setMemoryEnabled}
            memories={memories}
            addMemory={handleAddMemory}
            deleteMemory={deleteMemory}
            clearAllMemories={clearAllMemories}
          />
        )}
      </main>

      {/* Shortcut Palette Modal */}
      <ShortcutPaletteModal
        isOpen={isShortcutModalOpen}
        onClose={() => setIsShortcutModalOpen(false)}
        onTriggerAction={handleModalShortcutAction}
      />

      {/* Non-intrusive Floating HUD Toast for Global Hotkey Feedback */}
      {hudToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-cyan-400 rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-6 h-6 rounded-md bg-cyan-50 text-cyan-700 flex items-center justify-center text-xs">
            <Keyboard className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 font-mono">{hudToast.message}</div>
            {hudToast.sub && <div className="text-[10px] text-slate-500 font-mono">{hudToast.sub}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
