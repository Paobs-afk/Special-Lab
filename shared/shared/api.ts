export interface AnalysisStage {
  name: string;
  description: string;
  status: "active" | "complete";
}

export interface AlgorithmInfo {
  name: string;
  description: string;
  layers: string[];
  stages: AnalysisStage[];
}

export interface TermScore {
  term: string;
  score: number;
  relevance: number;
}

export interface KeyFinding {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}

export interface Recommendation {
  text: string;
  priority: "high" | "medium" | "low";
}

export interface DocumentScore {
  filename: string;
  signalScore: number;
  tokenCount: number;
  uniqueTermCount: number;
  vocabularyDensity: number;
  classification: string;
  topKeywords: string[];
}

export interface SimilarityEvidence {
  term: string;
  contribution: number;
}

export interface SimilarityInsight {
  documents: string[];
  similarity: number;
  decision: string;
  action: string;
  commonTerms: string[];
  topContributors: SimilarityEvidence[];
  semanticBoostTerms: string[];
}

export interface SimilarityMatrixRow {
  filename: string;
  scores: number[];
}

export interface SimilarityMatrix {
  labels: string[];
  rows: SimilarityMatrixRow[];
}

export interface OutlierInsight {
  filename: string;
  averageSimilarity: number;
  reason: string;
  recommendation: string;
}

export interface BestMatchInsight {
  documents: string[];
  similarity: number;
  reason: string;
}

export interface AnalysisResponse {
  summary: string;
  overallScore: number;
  documentCount: number;
  algorithm: AlgorithmInfo;
  topTerms: TermScore[];
  keyFindings: KeyFinding[];
  recommendations: Recommendation[];
  documentScores: DocumentScore[];
  similarities: SimilarityInsight[];
  matrix: SimilarityMatrix;
  outliers: OutlierInsight[];
  bestMatch?: BestMatchInsight;
}

export interface DemoResponse {
  message: string;
}
