import { describe, expect, it } from "vitest";
import { SCENARIOS, getScenarioById, getScenariosByCategory } from "../scenarios";

describe("Bibliothèque de scénarios", () => {
  it("contient au moins 20 scénarios", () => {
    expect(SCENARIOS.length).toBeGreaterThanOrEqual(20);
  });

  it("tous les IDs sont uniques", () => {
    const ids = SCENARIOS.map((scenario) => scenario.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("tous les scénarios ont les champs obligatoires", () => {
    SCENARIOS.forEach((scenario) => {
      expect(scenario.id).toBeTruthy();
      expect(scenario.title).toBeTruthy();
      expect(scenario.category).toBeTruthy();
      expect(scenario.inputText.length).toBeGreaterThan(10);
      expect(scenario.result.clearTranslation).toBeTruthy();
      expect(scenario.result.certain.length).toBeGreaterThan(0);
      expect(scenario.result.uncertain.length).toBeGreaterThan(0);
      expect(scenario.result.hypotheses.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("getScenarioById retrouve un scénario existant", () => {
    const first = SCENARIOS[0];
    expect(getScenarioById(first.id)).toEqual(first);
  });

  it("getScenarioById retourne undefined pour un id inconnu", () => {
    expect(getScenarioById("inexistant-xyz")).toBeUndefined();
  });

  it("les 6 catégories sont représentées", () => {
    const categories = [
      "travail",
      "famille",
      "couple",
      "amitie",
      "ecole",
      "administration",
    ] as const;

    categories.forEach((category) => {
      expect(getScenariosByCategory(category).length).toBeGreaterThan(0);
    });
  });

  it("aucun scénario n'utilise de vocabulaire interdit", () => {
    const forbidden = [
      /il te rejette/i,
      /elle te rejette/i,
      /te déteste/i,
      /ne t'aime pas/i,
      /manipul(er|ation|atrice|ateur)/i,
      /toxique/i,
      /narcissique/i,
      /pervers/i,
    ];

    SCENARIOS.forEach((scenario) => {
      const allText = [
        scenario.title,
        scenario.inputText,
        scenario.result.clearTranslation,
        scenario.result.literalMeaning,
        scenario.result.possibleSocialMeaning,
        ...scenario.result.certain,
        ...scenario.result.uncertain,
        ...scenario.result.hypotheses.map((hypothesis) => hypothesis.text),
        scenario.result.clarifyingQuestion,
        scenario.result.shortAnswer,
        scenario.result.directAnswer,
        scenario.result.softAnswer,
        scenario.result.professionalAnswer,
        scenario.result.boundaryAnswer,
      ].join(" ");

      forbidden.forEach((pattern) => {
        expect(
          allText,
          `Scénario "${scenario.id}" contient le pattern interdit ${pattern}`
        ).not.toMatch(pattern);
      });
    });
  });

  it("toutes les hypothèses mentionnent un niveau de confiance", () => {
    SCENARIOS.forEach((scenario) => {
      scenario.result.hypotheses.forEach((hypothesis) => {
        const hasConfidence =
          /confiance (prudente|moyenne|faible|forte|haute)/i.test(
            hypothesis.text
          );
        expect(
          hasConfidence,
          `Hypothèse sans niveau de confiance dans ${scenario.id}: "${hypothesis.text}"`
        ).toBe(true);
      });
    });
  });
});
