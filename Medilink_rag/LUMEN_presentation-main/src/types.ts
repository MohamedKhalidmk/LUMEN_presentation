export interface Section {
  id: string;
  name: string;
  dotIndex: number;
  title: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  status: 'fragmented' | 'aligned';
  details: string;
}

export interface HTANOutput {
  targetDetected: string;
  segmentedArea: string;
  relativeSize: string;
  location: string;
  componentsCount: number;
  severity: string;
}

export interface RAGStep {
  id: number;
  label: string;
  tech: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'dropped';
}

export interface ServerNode {
  id: string;
  title: string;
  host: string;
  techStack: string[];
  role: string;
  port: string;
}
