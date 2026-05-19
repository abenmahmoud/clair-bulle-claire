import { AnalysisResult, ContextType, ResponseVariant, TranslationDirection } from "@/types";
import { findMockAnalysis } from "./mock-data";

export function analyzeText(
  text: string,
  direction: TranslationDirection = "neurotypique-neuroatypique",
  context: ContextType = "inconnu"
): AnalysisResult {
  // Check mock data first
  const mock = findMockAnalysis(text);
  if (mock) {
    return { ...mock, original: text };
  }

  // Generate generic analysis
  return generateGenericAnalysis(text, direction, context);
}

function generateGenericAnalysis(
  text: string,
  direction: TranslationDirection,
  context: ContextType
): AnalysisResult {
  const isNeuroAtypical = direction.includes("neuroatypique");
  const isChild = direction.includes("enfant");

  return {
    original: text,
    clearTranslation: generateClearTranslation(text, direction, context),
    literalMeaning: `La phrase '${text}' signifie littéralement ce qui est dit.`,
    possibleSocialMeaning: generateSocialMeaning(text, context),
    certain: ["La phrase a été prononcée dans un contexte social"],
    uncertain: [
      "L'intention exacte du locuteur est difficile à déterminer",
      "Le contexte pourrait changer le sens",
    ],
    hypotheses: [
      {
        text: generateHypothesis(text, context),
        confidence: "prudente",
      },
      {
        text: "Le ton et le contexte pourraient modifier l'interprétation",
        confidence: "faible",
      },
    ],
    clarifyingQuestion: generateClarifyingQuestion(text, context),
    shortAnswer: "Compris, merci pour ta patience.",
    directAnswer: `Je veux être sûr de bien comprendre : quand tu dis '${text}', que veux-tu dire exactement ?`,
    softAnswer: `Je ne suis pas certain d'avoir bien saisi ce que tu veux dire. Peux-tu m'en dire un peu plus ?`,
    professionalAnswer: `Pour bien avancer, pourrais-tu préciser ta pensée ? Je veux m'assurer qu'on comprend la même chose.`,
    boundaryAnswer: `J'ai besoin d'une formulation plus claire pour bien répondre. Que souhaites-tu exactement ?`,
    childVersion: isChild
      ? simplifyForChild(text)
      : undefined,
    voiceShortVersion: "D'accord, compris.",
    selfRegulationTip: isNeuroAtypical
      ? "Prends le temps de respirer. Tu n'es pas obligé de répondre immédiatement."
      : "Même si la phrase est ambiguë, tu peux demander des clarifications calmement.",
  };
}

function generateClearTranslation(
  text: string,
  direction: TranslationDirection,
  context: ContextType
): string {
  const contextMap: Record<ContextType, string> = {
    travail: "dans un cadre professionnel",
    couple: "en couple",
    famille: "en famille",
    amitie: "entre amis",
    ecole: "à l'école",
    administration: "dans un contexte administratif",
    inconnu: "dans un contexte social",
  };

  if (direction === "neurotypique-neuroatypique") {
    return `Dans ce contexte ${contextMap[context]}, la phrase '${text}' pourrait cacher une intention implicite qu'il faut décoder.`;
  }
  if (direction === "neuroatypique-neurotypique") {
    return `Ce message direct pourrait être perçu comme abrupt ${contextMap[context]}. Une formulation plus douce pourrait aider.`;
  }
  if (direction === "adulte-enfant") {
    return `L'adulte essaie de communiquer quelque chose ${contextMap[context]}, mais l'enfant pourrait ne pas comprendre le sens caché.`;
  }
  return `L'enfant exprime quelque chose ${contextMap[context]} qu'un adulte doit apprendre à décoder avec patience.`;
}

function generateSocialMeaning(text: string, context: ContextType): string {
  const meanings: Record<ContextType, string> = {
    travail: "En milieu professionnel, ce type de message peut avoir des implications sur les relations de travail.",
    couple: "En couple, la communication implicite est fréquente et peut créer des malentendus.",
    famille: "En famille, les dynamiques émotionnelles rendent les messages souvent chargés de sous-entendus.",
    amitie: "Entre amis, l'ambiguïté peut être source de tensions non exprimées.",
    ecole: "À l'école, les enjeux sociaux rendent la compréhension des messages plus complexe.",
    administration: "Dans un contexte administratif, le langage est souvent codifié et formel.",
    inconnu: "Sans contexte précis, il est difficile de déterminer le sens social exact.",
  };
  return meanings[context];
}

function generateHypothesis(text: string, context: ContextType): string {
  const hypotheses: Record<ContextType, string> = {
    travail: "La personne cherche probablement à maintenir des relations professionnelles harmonieuses.",
    couple: "Il y a probablement des émotions non exprimées derrière cette phrase.",
    famille: "La dynamique familiale influence probablement la façon dont ce message est formulé.",
    amitie: "L'amitié implique souvent de la bienveillance, mais aussi des non-dits.",
    ecole: "Le contexte scolaire ajoute une dimension sociale complexe à cette phrase.",
    administration: "Le formalisme administratif masque parfois des informations importantes.",
    inconnu: "Sans contexte, cette phrase reste ambiguë à interpréter.",
  };
  return hypotheses[context];
}

function generateClarifyingQuestion(text: string, context: ContextType): string {
  const questions: Record<ContextType, string> = {
    travail: "Quel est l'objectif professionnel derrière cette phrase ?",
    couple: "Qu'est-ce que tu ressens vraiment quand tu dis ça ?",
    famille: "Qu'est-ce que tu essaies de me dire au fond ?",
    amitie: "Est-ce que tout va bien entre nous ?",
    ecole: "Qu'est-ce qui s'est passé exactement ?",
    administration: "Quelle est la prochaine étape administrative ?",
    inconnu: "Peux-tu m'en dire un peu plus sur ce que tu voulais dire ?",
  };
  return questions[context];
}

function simplifyForChild(text: string): string {
  return `Pour la phrase "${text}", on peut dire en plus simple : il manque peut-être une information claire, donc tu peux demander à l'adulte d'expliquer autrement.`;
}

export function generateResponses(
  text: string,
  context: ContextType,
  tones?: ResponseVariant[]
): Record<ResponseVariant, string> {
  const contextLabel: Record<ContextType, string> = {
    travail: "dans ce contexte professionnel",
    couple: "dans cette relation",
    famille: "dans ce cadre familial",
    amitie: "dans cette relation amicale",
    ecole: "dans ce contexte scolaire",
    administration: "dans ce contexte administratif",
    inconnu: "dans cette situation",
  };

  const allResponses: Record<ResponseVariant, string> = {
    short: `OK, compris pour : "${text}"`,
    direct: `Je comprends ce que tu me dis. Pour être sûr : tu veux dire que [préciser le sens] ?`,
    soft: `Merci pour ton message. Je veux bien comprendre : pourrais-tu me dire un peu plus ?`,
    professional: `Bien noté. Afin d'avancer sereinement ${contextLabel[context]}, pourrions-nous clarifier les points suivants ?`,
    boundary: `J'ai besoin de comprendre clairement ta demande pour pouvoir y répondre au mieux.`,
    child: `Quand quelqu'un dit ça, ça veut dire qu'il a peut-être besoin d'aide ou qu'il est énervé.`,
  };

  if (tones && tones.length > 0) {
    const filtered = {} as Record<ResponseVariant, string>;
    tones.forEach((tone) => {
      if (allResponses[tone]) {
        filtered[tone] = allResponses[tone];
      }
    });
    return filtered;
  }

  return allResponses;
}
