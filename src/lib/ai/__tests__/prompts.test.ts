import { describe, expect, it } from "vitest";
import { buildAnalyzePrompt, buildRespondPrompt } from "../prompts";
import type { ContextType, ResponseVariant, TranslationDirection } from "@/types";

describe("Prompt analyse", () => {
  const prompt = buildAnalyzePrompt({
    text: "On verra",
    direction: "neurotypique-neuroatypique",
    context: "travail",
  });

  it("contient les règles éthiques", () => {
    expect(prompt.length).toBeGreaterThan(200);
    const hasEthicsBlock =
      /regles? absolues?/i.test(prompt) ||
      /règles? absolues?/i.test(prompt) ||
      /ethiques?/i.test(prompt);
    expect(hasEthicsBlock).toBe(true);
  });

  it("interdit le vocabulaire jugement/manipulation", () => {
    const forbiddenPatterns = [
      /il te rejette/i,
      /elle ne t'aime pas/i,
      /il veut te manipuler/i,
      /manipul/i,
    ];
    const hasAtLeastOne = forbiddenPatterns.some((regexp) => regexp.test(prompt));
    expect(hasAtLeastOne).toBe(true);
  });

  it("impose le format JSON strict", () => {
    expect(prompt.toLowerCase()).toContain("json");
    expect(prompt).toMatch(/clearTranslation|certain|uncertain|hypotheses/);
  });

  it("mentionne les niveaux de confiance", () => {
    const hasConfidenceLevels =
      /prudente/i.test(prompt) && /moyenne/i.test(prompt) && /faible/i.test(prompt);
    expect(hasConfidenceLevels).toBe(true);
  });
});

describe("Prompt utilisateur analyse", () => {
  it("inclut le texte fourni", () => {
    const prompt = buildAnalyzePrompt({
      text: "On verra",
      direction: "neurotypique-neuroatypique",
      context: "travail",
    });
    expect(prompt).toContain("On verra");
  });

  it("gère les 4 directions de traduction sans erreur", () => {
    const directions: TranslationDirection[] = [
      "neurotypique-neuroatypique",
      "neuroatypique-neurotypique",
      "adulte-enfant",
      "enfant-adulte",
    ];

    directions.forEach((direction) => {
      const prompt = buildAnalyzePrompt({
        text: "test phrase",
        direction,
        context: "inconnu",
      });
      expect(prompt).toBeTruthy();
      expect(prompt.length).toBeGreaterThan(20);
    });
  });

  it("gère les 7 contextes sans erreur", () => {
    const contexts: ContextType[] = [
      "travail",
      "couple",
      "famille",
      "amitie",
      "ecole",
      "administration",
      "inconnu",
    ];

    contexts.forEach((context) => {
      const prompt = buildAnalyzePrompt({
        text: "test",
        direction: "neurotypique-neuroatypique",
        context,
      });
      expect(prompt).toBeTruthy();
    });
  });
});

describe("Prompt réponses", () => {
  it("est non vide", () => {
    expect(
      buildRespondPrompt({
        text: "Je veux dire non",
        context: "famille",
        tones: ["short", "direct", "soft"],
      }).length
    ).toBeGreaterThan(100);
  });

  it("mentionne plusieurs variantes de ton", () => {
    const prompt = buildRespondPrompt({
      text: "Je veux dire non",
      context: "famille",
      tones: ["short", "direct", "soft", "professional", "boundary", "child"],
    });
    const tones: ResponseVariant[] = [
      "short",
      "direct",
      "soft",
      "professional",
      "boundary",
      "child",
    ];
    const matches = tones.filter((tone) => prompt.toLowerCase().includes(tone));
    expect(matches.length).toBeGreaterThanOrEqual(3);
  });
});
