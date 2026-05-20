import { describe, expect, it } from "vitest";
import { detectDistress } from "../distress-detection";

describe("detectDistress", () => {
  describe("doit détecter (true)", () => {
    const positives = [
      "Je veux mourir",
      "j'ai envie de me suicider",
      "je vais en finir",
      "je veux me faire mal",
      "je veux me blesser",
      "j'ai envie de me couper",
      "j'en peux plus, c'est trop dur",
      "il me frappe tout le temps",
      "elle me bat",
      "on me force à faire des choses",
      "je suis victime d'agression sexuelle",
      "je suis harcele a l'ecole",
    ];

    positives.forEach((phrase) => {
      it(`"${phrase}"`, () => {
        expect(detectDistress(phrase)).toBe(true);
      });
    });
  });

  describe("ne doit PAS déclencher (false)", () => {
    const negatives = [
      "",
      "ab",
      "Bonjour, comment vas-tu ?",
      "Mon collègue m'a dit on verra",
      "Je vais à la piscine",
      "Personne ne veut jouer avec moi à la récré",
      "Il faut que je finisse mes devoirs",
      "Il m'a tapé dans le dos en rigolant",
    ];

    negatives.forEach((phrase) => {
      it(`"${phrase}"`, () => {
        expect(detectDistress(phrase)).toBe(false);
      });
    });
  });
});
