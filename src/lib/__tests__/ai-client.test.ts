import { afterEach, describe, expect, it, vi } from "vitest";
import { analyzeWithAI } from "../ai-client";
import type { AnalysisResult } from "@/types";

const fakeResult: AnalysisResult = {
  original: "X ne répond pas depuis 3 jours",
  clearTranslation: "Plusieurs interprétations sont possibles.",
  literalMeaning: "La personne n'a pas répondu.",
  possibleSocialMeaning: "Cela peut avoir plusieurs causes.",
  certain: ["Un message a été envoyé."],
  uncertain: ["On ne sait pas pourquoi la personne ne répond pas."],
  hypotheses: [
    {
      text: "Hypothèse 1 (confiance prudente) : la personne n'a pas encore vu le message.",
      confidence: "prudente",
    },
  ],
  clarifyingQuestion: "Peux-tu me dire si tu as vu mon message ?",
  shortAnswer: "Je te relance simplement.",
  directAnswer: "As-tu vu mon message ?",
  softAnswer: "Quand tu peux, dis-moi si tu as vu mon message.",
  professionalAnswer: "Peux-tu me confirmer la bonne réception ?",
  boundaryAnswer: "J'ai besoin d'une réponse claire pour avancer.",
  voiceShortVersion: "Je vais demander une précision.",
};

describe("analyzeWithAI", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("envoie un texte anonymisé à /api/analyze", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({ result: fakeResult, demo: false, source: "ai" }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock);

    await analyzeWithAI({
      text: "Julie ne répond pas depuis 3 jours et son numéro est 0612345678",
      direction: "neurotypique-neuroatypique",
      context: "travail",
    });

    const [, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(String(init?.body)) as { text: string };

    expect(body.text).toBe(
      "X ne répond pas depuis 3 jours et son numéro est XXXXXXXXXX"
    );
  });
});
