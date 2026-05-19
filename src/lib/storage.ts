import { AnalysisResult, ContextType, HistoryItem, TranslationDirection } from "@/types";
import { STORAGE_KEYS } from "./constants";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function saveAnalysis(
  original: string,
  result: AnalysisResult,
  direction: TranslationDirection,
  context: ContextType
): HistoryItem {
  if (!isBrowser()) {
    return {
      id: generateId(),
      original,
      result,
      direction,
      context,
      savedAt: new Date().toISOString(),
      favorite: false,
    };
  }

  if (getPrivacySetting()) {
    // Don't save if privacy is on
    return {
      id: generateId(),
      original,
      result,
      direction,
      context,
      savedAt: new Date().toISOString(),
      favorite: false,
    };
  }

  const history = getHistory();
  const item: HistoryItem = {
    id: generateId(),
    original,
    result,
    direction,
    context,
    savedAt: new Date().toISOString(),
    favorite: false,
  };

  const newHistory = [item, ...history].slice(0, 100); // Keep last 100
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(newHistory));

  return item;
}

export function getHistory(): HistoryItem[] {
  if (!isBrowser()) return [];

  try {
    const data = localStorage.getItem(STORAGE_KEYS.history);
    if (!data) return [];
    return JSON.parse(data) as HistoryItem[];
  } catch {
    return [];
  }
}

export function deleteAnalysis(id: string): void {
  if (!isBrowser()) return;

  const history = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
}

export function clearHistory(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(STORAGE_KEYS.history);
}

export function toggleFavorite(id: string): boolean {
  if (!isBrowser()) return false;

  const history = getHistory();
  const index = history.findIndex((item) => item.id === id);
  if (index === -1) return false;

  history[index].favorite = !history[index].favorite;
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
  return history[index].favorite;
}

export function getPrivacySetting(): boolean {
  if (!isBrowser()) return false;

  try {
    const value = localStorage.getItem(STORAGE_KEYS.privacy);
    return value === "true";
  } catch {
    return false;
  }
}

export function setPrivacySetting(enabled: boolean): void {
  if (!isBrowser()) return;

  localStorage.setItem(STORAGE_KEYS.privacy, String(enabled));
}
