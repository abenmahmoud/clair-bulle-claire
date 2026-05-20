import { describe, expect, it } from "vitest";
import { anonymizeText } from "../anonymize";

describe("anonymizeText", () => {
  it("remplace un prénom simple suivi d'un espace", () => {
    expect(anonymizeText("Adel me dit bonjour")).toBe("X me dit bonjour");
  });

  it("remplace plusieurs prénoms dans une phrase", () => {
    expect(anonymizeText("Adel parle à Sarah demain")).toBe("X parle à X demain");
  });

  it("remplace les prénoms accentués", () => {
    expect(anonymizeText("Élodie arrive avec Étienne demain")).toBe(
      "X arrive avec X demain"
    );
  });

  it("remplace les numéros longs", () => {
    expect(anonymizeText("Appelle 0612345678 maintenant")).toBe(
      "X XXXXXXXXXX maintenant"
    );
  });

  it("remplace les numéros administratifs très longs", () => {
    expect(anonymizeText("Mon dossier 1234567890123 est prêt")).toBe(
      "X dossier XXXXXXXXXX est prêt"
    );
  });

  it("ne remplace pas les petits nombres", () => {
    expect(anonymizeText("J'ai 2 questions")).toBe("J'ai 2 questions");
  });

  it("ne remplace pas les mots sans majuscule", () => {
    expect(anonymizeText("adel me dit bonjour")).toBe("adel me dit bonjour");
  });

  it("applique la règle des mots capitalisés avant un espace", () => {
    expect(anonymizeText("Je parle à Adel")).toBe("X parle à Adel");
  });

  it("garde les chaînes vides", () => {
    expect(anonymizeText("")).toBe("");
  });

  it("garde les espaces existants", () => {
    expect(anonymizeText("Adel  Sarah arrive")).toBe("X  X arrive");
  });

  it("anonymise avant une formulation de contexte social", () => {
    expect(anonymizeText("Julie ne répond pas depuis 3 jours")).toBe(
      "X ne répond pas depuis 3 jours"
    );
  });
});
