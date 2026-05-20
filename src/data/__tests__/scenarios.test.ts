import { describe, expect, it } from "vitest";
import { SCENARIOS, getScenarioById, getScenariosByCategory } from "../scenarios";

function collectAllText(scenario: (typeof SCENARIOS)[number]): string {
  return [
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
}

describe("Bibliothèque de scénarios", () => {
  it("contient au moins 30 scénarios", () => {
    expect(SCENARIOS.length).toBeGreaterThanOrEqual(30);
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
      const allText = collectAllText(scenario);

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

  it("aucun scénario ne suggère de cacher des choses à un adulte de confiance", () => {
    const dangerous = [
      /ne (le )?dis (à|a) personne/i,
      /garde (le|la|ça|cela) (pour toi|secret)/i,
      /ne dis rien (à|a) (tes? parents?|un adulte|ta? mère|ton? père|ton enseignant)/i,
      /n'en parle (à|a) personne/i,
      /reste seul(e)? avec/i,
    ];

    SCENARIOS.forEach((scenario) => {
      const allText = collectAllText(scenario);
      dangerous.forEach((pattern) => {
        expect(
          allText,
          `Scénario "${scenario.id}" suggère de cacher quelque chose : ${pattern}`
        ).not.toMatch(pattern);
      });
    });
  });

  it("aucun scénario ne normalise l'isolement", () => {
    const isolation = [
      /tu n'as pas besoin (d'aide|de quelqu'un|d'en parler)/i,
      /règle (le |ça |cela )?tout(e)? seul(e)?/i,
      /personne ne peut t'aider/i,
      /tu dois (te débrouiller|gérer) seul(e)?/i,
    ];

    SCENARIOS.forEach((scenario) => {
      const allText = collectAllText(scenario);
      isolation.forEach((pattern) => {
        expect(
          allText,
          `Scénario "${scenario.id}" normalise l'isolement : ${pattern}`
        ).not.toMatch(pattern);
      });
    });
  });

  it("aucun scénario ne pose de diagnostic médical ou psychologique", () => {
    const diagnostic = [
      /tu (es|souffres d'|as) (une? )?(dépression|anxiété généralisée|trouble bipolaire|tdah|tsa|autisme)/i,
      /il (est|souffre d'|a) (une? )?(dépression|trouble bipolaire|tdah|narcissique|psychopathe)/i,
      /c'est (probablement|sûrement) (une? )?(dépression|burn-out|trouble)/i,
    ];

    SCENARIOS.forEach((scenario) => {
      const allText = collectAllText(scenario);
      diagnostic.forEach((pattern) => {
        expect(
          allText,
          `Scénario "${scenario.id}" pose un diagnostic : ${pattern}`
        ).not.toMatch(pattern);
      });
    });
  });

  it("tous les scénarios direction enfant-adulte renvoient vers un adulte de confiance", () => {
    const childScenarios = SCENARIOS.filter(
      (scenario) => scenario.direction === "enfant-adulte"
    );
    expect(childScenarios.length).toBeGreaterThan(0);

    childScenarios.forEach((scenario) => {
      const allText = collectAllText(scenario);
      const mentionsAdulte =
        /adulte (de confiance|référent)|parent|enseignant|cpe|infirmière|aesh/i.test(
          allText
        );
      expect(
        mentionsAdulte,
        `Scénario enfant "${scenario.id}" ne mentionne aucun adulte de confiance`
      ).toBe(true);
    });
  });

  it("tous les scénarios ont ageMin, ageMax et sensitive renseignés", () => {
    SCENARIOS.forEach((scenario) => {
      expect(scenario.ageMin).toBeGreaterThanOrEqual(0);
      expect(scenario.ageMax).toBeGreaterThan(scenario.ageMin);
      expect(["standard", "sensible", "tres-sensible"]).toContain(
        scenario.sensitive
      );
    });
  });

  it("ageMin cohérent avec direction du scénario", () => {
    SCENARIOS.forEach((scenario) => {
      if (scenario.direction === "enfant-adulte") {
        expect(
          scenario.ageMin,
          `Scénario enfant "${scenario.id}" doit avoir ageMin < 18`
        ).toBeLessThan(18);
      }
    });
  });
});

describe("Scénarios Bulle Claire (mode enfant)", () => {
  const bulleClaireScenarios = SCENARIOS.filter(
    (scenario) => scenario.mode === "bulle-claire"
  );

  it("contient au moins 10 scénarios Bulle Claire", () => {
    expect(bulleClaireScenarios.length).toBeGreaterThanOrEqual(10);
  });

  it("tous les scénarios Bulle Claire sont direction enfant-adulte", () => {
    bulleClaireScenarios.forEach((scenario) => {
      expect(
        ["enfant-adulte", "adulte-enfant"],
        `Scénario "${scenario.id}" : direction incorrecte pour Bulle Claire`
      ).toContain(scenario.direction);
    });
  });

  it("tous les scénarios Bulle Claire ont ageMin <= 12", () => {
    bulleClaireScenarios.forEach((scenario) => {
      expect(
        scenario.ageMin,
        `Scénario Bulle Claire "${scenario.id}" : ageMin doit être <= 12`
      ).toBeLessThanOrEqual(12);
    });
  });

  it("aucun scénario Bulle Claire n'est sensitive=standard pour les contextes école", () => {
    bulleClaireScenarios.forEach((scenario) => {
      if (scenario.category === "ecole") {
        expect(
          scenario.sensitive,
          `Scénario école Bulle Claire "${scenario.id}" doit être sensible ou très-sensible`
        ).not.toBe("standard");
      }
    });
  });

  it("toutes les réponses courtes Bulle Claire font moins de 15 mots", () => {
    bulleClaireScenarios.forEach((scenario) => {
      const responses = [
        scenario.result.shortAnswer,
        scenario.result.directAnswer,
        scenario.result.softAnswer,
        scenario.result.voiceShortVersion,
      ].filter((response): response is string => Boolean(response));

      responses.forEach((response) => {
        const wordCount = response.trim().split(/\s+/).length;
        expect(
          wordCount,
          `Réponse trop longue dans "${scenario.id}" (${wordCount} mots) : "${response}"`
        ).toBeLessThanOrEqual(15);
      });
    });
  });

  it("le boundaryAnswer de chaque scénario Bulle Claire mentionne un adulte", () => {
    const adulteRegex =
      /adulte (de confiance|référent)|parent|enseignant|cpe|infirmière|aesh|ma[îi]tre|ma[îi]tresse/i;

    bulleClaireScenarios.forEach((scenario) => {
      expect(
        adulteRegex.test(scenario.result.boundaryAnswer),
        `Scénario Bulle Claire "${scenario.id}" : boundaryAnswer ne mentionne aucun adulte`
      ).toBe(true);
    });
  });

  it("scénario du secret oriente OBLIGATOIREMENT vers un adulte", () => {
    const secretScenario = SCENARIOS.find(
      (scenario) => scenario.id === "bc-secret-camarade-malaise"
    );
    expect(secretScenario).toBeDefined();
    if (!secretScenario) return;

    const allText = [
      secretScenario.result.clarifyingQuestion,
      secretScenario.result.boundaryAnswer,
      secretScenario.result.professionalAnswer,
      secretScenario.result.shortAnswer,
      secretScenario.result.directAnswer,
    ].join(" ");

    const orienteAdulte =
      /adulte|parent|ma[îi]tre|ma[îi]tresse|enseignant|infirmière|aesh|cpe/i.test(
        allText
      );
    expect(
      orienteAdulte,
      "Scénario secret DOIT orienter explicitement vers un adulte de confiance"
    ).toBe(true);
  });
});
