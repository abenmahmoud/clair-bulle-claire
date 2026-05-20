import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AnalysisResult } from "@/types";

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      insert: async () => ({ data: null, error: null }),
      select: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }) }),
    }),
  }),
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe("storage local", () => {
  it("getHistory retourne tableau vide au démarrage", async () => {
    const { getHistory } = await import("../storage");
    expect(getHistory()).toEqual([]);
  });

  it("saveAnalysis ajoute une entrée à l'historique", async () => {
    const storage = await import("../storage");
    const fakeResult: AnalysisResult = {
      original: "test",
      clearTranslation: "trad",
      literalMeaning: "lit",
      possibleSocialMeaning: "social",
      certain: [],
      uncertain: [],
      hypotheses: [],
      clarifyingQuestion: "?",
      shortAnswer: "ok",
      directAnswer: "ok",
      softAnswer: "ok",
      professionalAnswer: "ok",
      boundaryAnswer: "ok",
      voiceShortVersion: "ok",
    };

    const saveFn = storage.saveAnalysis;
    saveFn("test", fakeResult, "neurotypique-neuroatypique", "travail");

    const items = storage.getHistory();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].original).toBe("test");
  });
});
