import React, { useState } from 'react';
import {
  Shield,
  Terminal,
  AlertCircle,
  Network,
  FileSearch,
  CheckCircle2,
  Lock,
  BookOpen
} from 'lucide-react';

export const CyberLabView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ports' | 'linux' | 'logs' | 'defense'>('ports');
  const [sampleLog, setSampleLog] = useState(`192.168.1.105 - - [12/Oct/2026:14:22:10] "GET /index.php HTTP/1.1" 200 4521
192.168.1.189 - - [12/Oct/2026:14:22:15] "GET /login?user=admin' OR '1'='1 HTTP/1.1" 403 234
192.168.1.189 - - [12/Oct/2026:14:22:16] "GET /../../../../etc/passwd HTTP/1.1" 400 120
192.168.1.42 - - [12/Oct/2026:14:23:01] "POST /api/auth/token HTTP/1.1" 200 89
10.0.0.54 - - [12/Oct/2026:14:23:45] "POST /wp-login.php HTTP/1.1" 401 540`);

  const [analyzedFindings, setAnalyzedFindings] = useState<{
    line: string;
    threat: string;
    severity: 'High' | 'Medium' | 'Low';
    explanation: string;
  }[] | null>(null);

  const analyzeLogs = () => {
    const lines = sampleLog.split('\n');
    const results: any[] = [];

    lines.forEach((l) => {
      if (l.includes("' OR '1'='1") || l.includes('UNION SELECT')) {
        results.push({
          line: l,
          threat: 'SQL Injection (SQLi) Attempt',
          severity: 'High',
          explanation:
            "Attacker is injecting boolean tautology ('1'='1) to bypass authentication logic in SQL queries.",
        });
      } else if (l.includes('../') || l.includes('..\\') || l.includes('/etc/passwd')) {
        results.push({
          line: l,
          threat: 'Directory Path Traversal (LFI)',
          severity: 'High',
          explanation:
            'Attempt to escape web root directory using dot-dot-slash notation to retrieve sensitive operating system files.',
        });
      } else if (l.includes('/wp-login.php') && l.includes('401')) {
        results.push({
          line: l,
          threat: 'Credential Stuffing / Brute Force',
          severity: 'Medium',
          explanation:
            'Repeated 401 Unauthorized responses on administrative endpoints indicate automated password guessing.',
        });
      }
    });

    setAnalyzedFindings(results);
  };

  const commonPorts = [
    { port: 21, proto: 'TCP', service: 'FTP', risk: 'Unencrypted plain-text file transfer credentials.' },
    { port: 22, proto: 'TCP', service: 'SSH', risk: 'Secure shell; target for automated brute-force attempts.' },
    { port: 25, proto: 'TCP', service: 'SMTP', risk: 'Mail routing; vulnerable to open-relay misconfigurations.' },
    { port: 53, proto: 'UDP/TCP', service: 'DNS', risk: 'Domain resolution; target for DNS amplification & cache poisoning.' },
    { port: 80, proto: 'TCP', service: 'HTTP', risk: 'Plaintext web traffic; vulnerable to eavesdropping and MITM.' },
    { port: 443, proto: 'TCP', service: 'HTTPS', risk: 'TLS-encrypted web traffic; inspect TLS certificate expiry.' },
    { port: 3389, proto: 'TCP', service: 'RDP', risk: 'Windows Remote Desktop; should never be exposed directly to the public internet.' },
    { port: 8080, proto: 'TCP', service: 'HTTP-Alt', risk: 'Common proxy/development port; frequently contains unauthenticated dashboards.' },
  ];

  const linuxCommands = [
    { cmd: 'ss -tulpn', desc: 'Lists all listening TCP and UDP sockets with owning process IDs.' },
    { cmd: 'journalctl -u ssh -n 50', desc: 'Inspects the last 50 authentication logs from OpenSSH daemon.' },
    { cmd: 'find / -perm -u=s -type f 2>/dev/null', desc: 'Finds SUID binaries (privilege escalation check for CTF).' },
    { cmd: 'grep -rn "password" /var/www/html/', desc: 'Scans web application source files for hardcoded credentials.' },
    { cmd: 'sudo ufw status verbose', desc: 'Checks Ubuntu Uncomplicated Firewall active policy and rules.' },
    { cmd: 'chmod 600 ~/.ssh/id_rsa', desc: 'Sets correct strict private key file permissions (read/write owner only).' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-mono mb-1 font-medium">
            <Shield className="w-4 h-4" />
            <span>JARVIS OS · CYBER MODE WORKSPACE</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Cybersecurity Learning & Defensive Lab
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Structured modules designed for cybersecurity students: networking fundamentals, Linux commands,
            log analysis, and defensive posture.
          </p>
        </div>

        {/* Safety Boundary Banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Strict Authorization Boundary: All tools are defensive & educational.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveCategory('ports')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeCategory === 'ports'
              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          Networking & Port Directory
        </button>
        <button
          onClick={() => setActiveCategory('linux')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeCategory === 'linux'
              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Essential Linux CLI
        </button>
        <button
          onClick={() => setActiveCategory('logs')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeCategory === 'logs'
              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSearch className="w-3.5 h-3.5" />
          Defensive Log Analyzer
        </button>
      </div>

      {/* Content: Ports */}
      {activeCategory === 'ports' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 font-mono">
              Common Ports, Protocols & Security Considerations
            </h3>
            <span className="text-xs text-slate-500 font-mono">IANA Standards</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonPorts.map((p) => (
              <div
                key={p.port}
                className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-cyan-700 font-bold text-sm">
                    Port {p.port} / {p.proto}
                  </span>
                  <span className="text-xs font-medium text-slate-700 px-2 py-0.5 rounded bg-white border border-slate-200">
                    {p.service}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{p.risk}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content: Linux CLI */}
      {activeCategory === 'linux' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 font-mono">
              Defensive Linux Commands for Incident Response & Auditing
            </h3>
            <span className="text-xs text-slate-500 font-mono">Bash / Zsh</span>
          </div>
          <div className="space-y-2.5">
            {linuxCommands.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <code className="text-xs font-mono text-cyan-800 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {item.cmd}
                </code>
                <span className="text-xs text-slate-700">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content: Log Analyzer */}
      {activeCategory === 'logs' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 font-mono mb-1">
              Web Server Access Log Triage & Threat Detection
            </h3>
            <p className="text-xs text-slate-600">
              Paste server logs to automatically detect SQL injection, local file inclusion, or brute-force patterns.
            </p>
          </div>

          <textarea
            value={sampleLog}
            onChange={(e) => setSampleLog(e.target.value)}
            rows={5}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white"
          />

          <button
            onClick={analyzeLogs}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <FileSearch className="w-3.5 h-3.5" />
            Scan Logs for Attack Signatures
          </button>

          {analyzedFindings && (
            <div className="mt-4 space-y-3 pt-3 border-t border-slate-200">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-medium">
                Threat Audit Results ({analyzedFindings.length} Anomalies Found)
              </h4>
              {analyzedFindings.length === 0 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  No standard SQLi or Path Traversal signatures found in this log snippet.
                </div>
              ) : (
                analyzedFindings.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-800 font-mono">
                        {item.threat}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-rose-700 border border-rose-200 font-medium">
                        {item.severity} Severity
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-slate-700 block bg-white p-1.5 rounded border border-rose-100 truncate">
                      {item.line}
                    </code>
                    <p className="text-xs text-slate-700">{item.explanation}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
