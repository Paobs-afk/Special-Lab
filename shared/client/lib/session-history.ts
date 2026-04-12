import { AnalysisResponse } from "@shared/api";

export interface SessionRecord {
  id: string;
  timestamp: number;
  formattedDate: string;
  documentNames: string[];
  documentCount: number;
  overallScore: number;
  summary: string;
  analysis: AnalysisResponse;
}

const HISTORY_STORAGE_KEY = "textiq_session_history";
const MAX_HISTORY_ITEMS = 20;

export function saveAnalysisToHistory(
  analysis: AnalysisResponse,
  documentNames: string[]
): SessionRecord {
  const now = Date.now();
  const record: SessionRecord = {
    id: `session_${now}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: now,
    formattedDate: new Date(now).toLocaleString(),
    documentNames,
    documentCount: documentNames.length,
    overallScore: analysis.overallScore,
    summary: analysis.summary,
    analysis,
  };

  const history = getSessionHistory();
  history.unshift(record);

  // Keep only the last MAX_HISTORY_ITEMS
  if (history.length > MAX_HISTORY_ITEMS) {
    history.pop();
  }

  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  return record;
}

export function getSessionHistory(): SessionRecord[] {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function deleteHistoryRecord(id: string): void {
  const history = getSessionHistory();
  const filtered = history.filter((record) => record.id !== id);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}

export function getHistoryRecord(id: string): SessionRecord | undefined {
  const history = getSessionHistory();
  return history.find((record) => record.id === id);
}
