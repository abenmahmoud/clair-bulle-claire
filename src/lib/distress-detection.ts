// Detection de mots-cles indiquant une potentielle detresse.
// Si detecte, on affiche un overlay d'aide avant l'analyse IA.

const DISTRESS_PATTERNS = [
  // Suicide / automutilation
  /\b(je veux|je vais|j'aimerais) (mourir|me tuer|me suicider|disparaitre)\b/i,
  /\b(suicide|me suicider|en finir|mettre fin a (ma|mes) jours?)\b/i,
  /\b(me faire mal|me blesser|me couper|m'automutiler|me cogner|me frapper)\b/i,
  /\b(j'ai pas envie de vivre|j'en peux plus|je tiens plus|c'est trop dur)\b/i,

  // Violences subies
  /\b(il|elle) me (tape|frappe|cogne|bat|maltraite|menace|insulte|humilie)\b/i,
  /\b(on me |il me |elle me |ils me )(force|oblige|contraint)\b/i,
  /\b(viol|violer|agression sexuelle|attouchement)\b/i,
  /\b(harcele|harceler|harcelement)\b/i,
];

export function detectDistress(text: string): boolean {
  if (!text || text.length < 3) return false;
  return DISTRESS_PATTERNS.some((pattern) => pattern.test(text));
}
