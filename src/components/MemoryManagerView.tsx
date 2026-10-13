import React, { useState } from 'react';
import {
  BookOpen,
  Lock,
  Trash2,
  Plus,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { MemoryItem } from '../types';

interface MemoryManagerViewProps {
  memoryEnabled: boolean;
  setMemoryEnabled: (enabled: boolean) => void;
  memories: MemoryItem[];
  addMemory: (category: 'preference' | 'project' | 'instruction', text: string) => string | null;
  deleteMemory: (id: string) => void;
  clearAllMemories: () => void;
}

export const MemoryManagerView: React.FC<MemoryManagerViewProps> = ({
  memoryEnabled,
  setMemoryEnabled,
  memories,
  addMemory,
  deleteMemory,
  clearAllMemories,
}) => {
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'preference' | 'project' | 'instruction'>('preference');
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleAdd = () => {
    if (!newText.trim()) return;
    const error = addMemory(newCategory, newText);
    if (error) {
      setFeedback({ message: error, isError: true });
    } else {
      setFeedback({ message: 'Memory stored securely in local vault.', isError: false });
      setNewText('');
    }
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-mono mb-1 font-medium">
            <BookOpen className="w-4 h-4" />
            <span>JARVIS OS · CONTROLLED LOCAL MEMORY</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Privacy-First Memory Vault
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Complies with Section 9: Disabled by default. Only stores user-approved preferences. Strictly
            rejects passwords, secrets, and raw keys.
          </p>
        </div>

        {/* Master Memory Opt-in Switch */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 self-start md:self-auto shadow-xs">
          <span className="text-xs font-medium text-slate-700">Memory System:</span>
          <button
            onClick={() => setMemoryEnabled(!memoryEnabled)}
            className="flex items-center gap-1.5 focus:outline-none transition-colors"
          >
            {memoryEnabled ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <ToggleRight className="w-6 h-6 text-emerald-600" />
                <span>Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <ToggleLeft className="w-6 h-6 text-slate-400" />
                <span>Disabled (Default)</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Safety Policy Notice */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
        <Lock className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 space-y-1">
          <span className="font-semibold text-slate-900">Controlled Memory Guarantees:</span>
          <p className="text-slate-600">
            Conversations are NEVER logged automatically. Every remembered item is explicitly stored in{' '}
            <code className="text-cyan-800 font-mono font-medium">data/memory.json</code> on your local disk. Automated
            validation scans reject passwords, credit card numbers, or API keys.
          </p>
        </div>
      </div>

      {/* Add Memory Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-semibold text-slate-900 font-mono">Store Approved Memory</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-1">
            <label className="block text-[11px] font-mono text-slate-500 mb-1 font-medium">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            >
              <option value="preference">Preference</option>
              <option value="project">Project Detail</option>
              <option value="instruction">Instruction</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-mono text-slate-500 mb-1 font-medium">
              Memory Content (Plain English)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                disabled={!memoryEnabled}
                placeholder={
                  memoryEnabled
                    ? 'e.g. Always generate Python code with type annotations and docstrings.'
                    : 'Enable memory system above to add memories...'
                }
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white disabled:opacity-50"
              />
              <button
                onClick={handleAdd}
                disabled={!memoryEnabled || !newText.trim()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Store
              </button>
            </div>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              feedback.isError
                ? 'bg-rose-50 border border-rose-200 text-rose-800'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            }`}
          >
            {feedback.isError ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Memory List */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 font-mono">
            Active Vault Memories ({memories.length})
          </h3>
          {memories.length > 0 && (
            <button
              onClick={clearAllMemories}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-mono transition-colors font-medium"
            >
              <Trash2 className="w-3 h-3" />
              Purge All
            </button>
          )}
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No memories stored. The assistant operates with zero persistent state unless you approve items above.
          </div>
        ) : (
          <div className="space-y-2.5">
            {memories.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 group hover:border-slate-300 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-cyan-800 font-semibold">
                      {m.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{m.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-800 mt-1">{m.content}</p>
                </div>
                <button
                  onClick={() => deleteMemory(m.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete memory entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
