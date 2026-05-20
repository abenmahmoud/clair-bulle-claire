import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { getHistory } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import type { AnalysisResult, ContextType, HistoryItem, TranslationDirection } from "@/types";

export interface LocalAnalysis {
  id: string;
  original_text: string;
  direction: TranslationDirection;
  context: ContextType;
  result_json: AnalysisResult;
  favorite: boolean;
  created_at: string;
}

export interface CloudAnalysis {
  id: string;
  original_text: string;
  direction: TranslationDirection;
  context: ContextType;
  result_json: AnalysisResult;
  favorite: boolean;
  created_at: string;
}

function toLocalAnalysis(item: HistoryItem): LocalAnalysis {
  return {
    id: item.id,
    original_text: item.original,
    direction: item.direction,
    context: item.context,
    result_json: item.result,
    favorite: item.favorite,
    created_at: item.savedAt,
  };
}

export function getLocalAnalyses(): LocalAnalysis[] {
  if (typeof window === "undefined") return [];
  return getHistory().map(toLocalAnalysis);
}

export function clearLocalAnalyses() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.history);
}

export async function syncLocalToCloud(): Promise<{ imported: number; errors: number }> {
  if (!hasSupabaseConfig()) return { imported: 0, errors: 0 };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { imported: 0, errors: 0 };

  const local = getLocalAnalyses();
  if (local.length === 0) return { imported: 0, errors: 0 };

  let imported = 0;
  let errors = 0;
  const batchSize = 20;

  for (let index = 0; index < local.length; index += batchSize) {
    const batch = local.slice(index, index + batchSize).map((analysis) => ({
      user_id: user.id,
      original_text: analysis.original_text,
      direction: analysis.direction,
      context: analysis.context,
      result_json: analysis.result_json,
      favorite: analysis.favorite ?? false,
      created_at: analysis.created_at,
    }));

    const { error } = await supabase.from("analyses").insert(batch);
    if (error) {
      errors += batch.length;
    } else {
      imported += batch.length;
    }
  }

  return { imported, errors };
}
