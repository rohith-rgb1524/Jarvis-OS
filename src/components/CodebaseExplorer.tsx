import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  FolderTree,
  Terminal,
  FileCode,
  Download,
  FileCheck,
  Cpu,
  Layers
} from 'lucide-react';
import { PYTHON_PROJECT_FILES } from '../data/pythonProjectFiles';
import { PythonModuleFile } from '../types';

export const CodebaseExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PythonModuleFile>(PYTHON_PROJECT_FILES[2]); // main.py
  const [copiedFile, setCopiedFile] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const copyPowerShell = (script: string) => {
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const downloadAllAsZipOrFiles = (file: PythonModuleFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-mono mb-1 font-medium">
            <Code2 className="w-4 h-4" />
            <span>JARVIS OS · PYTHON 3.12 CODEBASE FOR WINDOWS 11</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Modular Desktop Architecture & Source Code
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Complete, pristine, production-ready modules organized specifically for your HP Victus laptop,
            Ollama Llama 3.2, and Windows automation.
          </p>
        </div>

        <button
          onClick={() => downloadAllAsZipOrFiles(selectedFile)}
          className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors self-start md:self-auto shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-cyan-600" />
          Download {selectedFile.filename}
        </button>
      </div>

      {/* PowerShell Quick-Start Guide for Windows 11 Beginner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-mono">
            <Terminal className="w-4 h-4 text-cyan-600" />
            <span>Step-by-Step PowerShell Execution (Copy & Run in Terminal)</span>
          </div>
          <button
            onClick={() =>
              copyPowerShell(
                `# 1. Create project folder and virtual environment\nmkdir jarvis_os; cd jarvis_os\npython -m venv venv\n.\\venv\\Scripts\\Activate.ps1\n\n# 2. Upgrade pip and install requirements\npython -m pip install --upgrade pip\npip install -r requirements.txt\n\n# 3. Pull Llama 3.2 in Ollama\nollama pull llama3.2\n\n# 4. Run JARVIS OS\npython main.py`
              )
            }
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-mono transition-colors font-medium"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copiedScript ? 'Copied PowerShell' : 'Copy Commands'}
          </button>
        </div>

        <pre className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
{`# 1. Navigate to your project directory and set up Python 3.12 virtual environment:
mkdir jarvis_os ; cd jarvis_os
python -m venv venv
.\\venv\\Scripts\\Activate.ps1

# 2. Install dependencies (PyAudio, speech_recognition, psutil, requests):
pip install -r requirements.txt

# 3. Ensure Ollama is running and pull the default Llama 3.2 model:
ollama run llama3.2

# 4. Launch JARVIS OS:
python main.py`}
        </pre>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: File Tree (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-200 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <FolderTree className="w-4 h-4 text-cyan-600" />
              Project File Hierarchy
            </span>
            <span>{PYTHON_PROJECT_FILES.length} Files</span>
          </div>

          <div className="space-y-1 max-h-[550px] overflow-y-auto pr-1">
            {PYTHON_PROJECT_FILES.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-50 text-cyan-900 border border-cyan-200 font-semibold shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="font-mono truncate">{file.path}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 ml-2 font-medium">
                    {file.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Viewer (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 font-mono">{selectedFile.path}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 uppercase font-semibold">
                  {selectedFile.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{selectedFile.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyCode(selectedFile.content)}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-mono flex items-center gap-1.5 border border-slate-200 transition-colors shadow-xs"
              >
                {copiedFile ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <pre className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-100 overflow-x-auto max-h-[580px] leading-relaxed border border-slate-800 select-all shadow-inner">
            <code>{selectedFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
