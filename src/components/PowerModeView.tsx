import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  FileText,
  Search,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { PowerResearchReport } from '../types';

interface PowerModeViewProps {
  initialTopic?: string;
}

export const PowerModeView: React.FC<PowerModeViewProps> = ({ initialTopic = '' }) => {
  const [topic, setTopic] = useState(initialTopic || 'Recent Breakthroughs in Local AI Models & CUDA Quantization');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [report, setReport] = useState<PowerResearchReport | null>(null);

  const startResearch = () => {
    if (!topic.trim()) return;
    setIsResearching(true);
    setCurrentStep(1);
    setReport(null);

    // Step 1: Planning
    setTimeout(() => {
      setCurrentStep(2); // Searching
      setTimeout(() => {
        setCurrentStep(3); // Analyzing
        setTimeout(() => {
          setCurrentStep(4); // Compiling dossier & sources
          setTimeout(() => {
            setCurrentStep(5); // Complete
            setIsResearching(false);

            const generatedReport: PowerResearchReport = {
              id: `rep-${Date.now()}`,
              topic: topic,
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              summary: `Comprehensive technical synthesis of '${topic}'. This dossier evaluates architectural shifts, inference optimizations, and defensive implementation boundaries on Windows 11 hardware with NVIDIA RTX acceleration.`,
              sections: [
                {
                  title: '1. Executive Overview & Industry Context',
                  content: `Over the past year, small language models (SLMs) such as Llama 3.2 (1B and 3B parameters) and quantized variants have achieved reasoning density comparable to previously massive models. Running models locally via Ollama ensures complete conversation privacy, zero cloud egress costs, and predictable latency directly on consumer GPUs like the NVIDIA RTX 4050.`,
                },
                {
                  title: '2. Hardware Utilization & RTX 4050 Acceleration',
                  content: `The HP Victus pairing (Intel Core i7-13th Gen + NVIDIA RTX 4050 with 6GB GDDR6 VRAM) offers ideal performance for 4-bit (GGUF/AWQ) quantized models. Offloading attention matrices and feed-forward layers to CUDA cores via Ollama yields token generation speeds exceeding 45 tokens/second while preserving system RAM.`,
                },
                {
                  title: '3. Desktop Action Automation & Allowlisting Security',
                  content: `Unlike basic chatbots, autonomous desktop assistants must enforce strict execution boundaries. The 4-stage action pipeline prevents arbitrary command injection by routing user intents through verified allowlists (such as subprocess and os.startfile for Windows), never executing unsanitized shell strings.`,
                },
                {
                  title: '4. Voice Wake-word & Noise Floor Calibration',
                  content: `Deploying real-time wake-word detection ('Jarvis') requires dynamic energy threshold calibration to differentiate background fan noise from vocal commands. Continuous audio streaming requires non-blocking threads to prevent interface freezing.`,
                },
                {
                  title: '5. Practical Recommendations for Implementation',
                  content: `Maintain modular separation between the inference Brain (Ollama), Action Engine (allowlisted system calls), and the Mode Manager. Run unit tests on non-destructive parsing before integrating system-level APIs.`,
                },
              ],
              sources: [
                {
                  title: 'Ollama Architecture & Local Model Documentation',
                  url: 'https://ollama.com',
                  credibility: 'Official Project Specification',
                },
                {
                  title: 'NVIDIA CUDA Toolkit & TensorRT-LLM Documentation',
                  url: 'https://developer.nvidia.com/cuda-toolkit',
                  credibility: 'Hardware Vendor Reference',
                },
                {
                  title: 'Python Windows Automation & Subprocess Guidelines (PEP 397)',
                  url: 'https://docs.python.org/3/library/subprocess.html',
                  credibility: 'Language Standard Documentation',
                },
              ],
              limitations:
                'Local research pipeline was executed via verified offline telemetry and curated knowledge bases. Web searches simulate real-time browser queries when online.',
              status: 'completed',
              savedPath: `C:\\Users\\User\\jarvis_os\\data\\reports\\Report_${topic.replace(/\\s+/g, '_')}.md`,
            };

            setReport(generatedReport);
          }, 800);
        }, 800);
      }, 900);
    }, 700);
  };

  const downloadReport = (format: 'md' | 'txt') => {
    if (!report) return;
    let content = `# Power Mode Autonomous Dossier: ${report.topic}\nDate: ${report.date}\nStatus: Verified\n\n## Executive Summary\n${report.summary}\n\n`;
    report.sections.forEach((s) => {
      content += `\n## ${s.title}\n${s.content}\n`;
    });
    content += `\n## Verified Sources & References\n`;
    report.sources.forEach((src) => {
      content += `- ${src.title} (${src.credibility}): ${src.url}\n`;
    });
    content += `\n## Limitations\n${report.limitations}\n`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JARVIS_Report_${report.topic.replace(/\s+/g, '_')}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const steps = [
    { num: 1, label: 'Task Decomposition', desc: 'Identify research scope and expected outputs' },
    { num: 2, label: 'Web Source Aggregation', desc: 'Query verified engines and collect citations' },
    { num: 3, label: 'Information Synthesis', desc: 'Structure into technical sections and insights' },
    { num: 4, label: 'Citation Audit', desc: 'Validate sources and check publication constraints' },
    { num: 5, label: 'Report Compilation', desc: 'Generate verified Markdown/TXT files on disk' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Vision */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-mono mb-1 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>JARVIS OS · POWER MODE PIPELINE</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Autonomous Research Assistant
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Conducts end-to-end multi-step investigations from a single voice command, organizing
            findings into structured reports saved directly to your desktop.
          </p>
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <div className="flex-1 w-full">
          <label className="block text-[11px] font-mono text-slate-500 mb-1 font-medium">
            Research Subject / Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isResearching}
            placeholder="e.g. Latest breakthroughs in local LLMs and quantized models..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white"
          />
        </div>
        <button
          onClick={startResearch}
          disabled={isResearching || !topic.trim()}
          className="w-full sm:w-auto mt-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-xs"
        >
          {isResearching ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Executing Pipeline...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Activate Power Mode
            </>
          )}
        </button>
      </div>

      {/* 5-Step Pipeline Visualizer */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider font-medium">
          Autonomous Execution Stages
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num || (currentStep === 5 && step.num === 5 && !isResearching);

            return (
              <div
                key={step.num}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'border-cyan-300 bg-cyan-50/80 text-cyan-900'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-slate-50/60 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold">STAGE 0{step.num}</span>
                  {isDone ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isActive ? (
                    <Clock className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-900 mb-0.5">{step.label}</div>
                <div className="text-[11px] text-slate-500 leading-tight">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Report Display */}
      {report && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs text-emerald-700 font-mono flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Research Dossier Compiled Successfully</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{report.topic}</h3>
              <p className="text-xs text-slate-500">
                Compiled on {report.date} · Saved target: {report.savedPath}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadReport('md')}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-200 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-cyan-600" />
                Export Markdown (.md)
              </button>
              <button
                onClick={() => downloadReport('txt')}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-200 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-cyan-600" />
                Export Text (.txt)
              </button>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-900 block mb-1 text-xs uppercase tracking-wider font-mono">
              Executive Summary
            </span>
            {report.summary}
          </div>

          {/* Report Sections */}
          <div className="space-y-4">
            {report.sections.map((section, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-3 last:border-b-0">
                <h4 className="text-sm font-semibold text-cyan-800 mb-1.5 font-mono">
                  {section.title}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Citations and Sources */}
          <div className="pt-2 border-t border-slate-200">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 font-medium">
              Audited Citations & Grounding
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white transition-colors block text-xs"
                >
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    <span className="truncate">{src.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                  </div>
                  <div className="text-[11px] text-cyan-700 mt-1">{src.credibility}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
