export type OperatingMode = 'default' | 'coding' | 'cyber' | 'design' | 'system' | 'power';

export interface ActionLog {
  id: string;
  timestamp: string;
  command: string;
  detectedIntent: string;
  actionType: 'open_app' | 'browser_search' | 'system_info' | 'power_research' | 'cyber_explain' | 'memory_write' | 'none';
  parameters: Record<string, any>;
  status: 'validating' | 'executed' | 'failed' | 'denied' | 'simulated';
  verificationDetails: string;
  error?: string;
}

export interface MemoryItem {
  id: string;
  category: 'preference' | 'project' | 'instruction';
  content: string;
  createdAt: string;
  approvedByUser: boolean;
}

export interface SystemMetrics {
  cpuUsage: number;
  cpuModel: string;
  gpuUsage: number;
  gpuModel: string;
  gpuVramUsedGb: number;
  gpuVramTotalGb: number;
  ramUsedGb: number;
  ramTotalGb: number;
  diskFreeGb: number;
  diskTotalGb: number;
  ollamaStatus: 'running' | 'offline' | 'checking';
  ollamaModel: string;
  cudaAcceleration: boolean;
}

export interface PowerResearchReport {
  id: string;
  topic: string;
  date: string;
  summary: string;
  sections: {
    title: string;
    content: string;
  }[];
  sources: {
    title: string;
    url: string;
    credibility: string;
  }[];
  limitations: string;
  status: 'planning' | 'searching' | 'analyzing' | 'completed' | 'failed';
  savedPath?: string;
}

export interface PythonModuleFile {
  path: string;
  filename: string;
  category: 'core' | 'brain' | 'actions' | 'voice' | 'modes' | 'system' | 'cyber' | 'desktop' | 'tests' | 'config';
  description: string;
  content: string;
}
