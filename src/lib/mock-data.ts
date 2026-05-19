import { AnalysisResult } from "@/types";

export const mockExamples: { text: string; result: AnalysisResult }[] = [
  {
    text: "On verra.",
    result: {
      original: "On verra.",
      clearTranslation:
        "Je ne veux pas te donner de réponse maintenant. Peut-être que oui, peut-être que non.",
      literalMeaning: "La personne reporte sa décision à plus tard.",
      possibleSocialMeaning:
        "Cela peut cacher un refus poli, une indécision réelle, ou un manque d'enthousiasme.",
      certain: [
        "La personne ne s'engage pas",
        "La réponse est reportée",
      ],
      uncertain: [
        "Est-ce un refus poli ?",
        "Est-ce de l'indécision réelle ?",
        "Y a-t-il un manque d'intérêt ?",
      ],
      hypotheses: [
        { text: "C'est un refus poli pour ne pas te vexer", confidence: "moyenne" },
        { text: "La personne est vraiment indécise", confidence: "prudente" },
        { text: "Il y a un manque d'enthousiasme", confidence: "faible" },
      ],
      clarifyingQuestion:
        "Est-ce que tu hésites parce que ce n'est pas possible, ou parce que tu as besoin de temps pour réfléchir ?",
      shortAnswer: "D'accord, je comprends que tu n'es pas sûr(e) pour le moment.",
      directAnswer:
        "Tu ne veux pas t'engager maintenant. Est-ce que je peux te reposer la question dans quelques jours ?",
      softAnswer:
        "Pas de souci, je comprends que tu aies besoin de temps. Prends le temps qu'il te faut.",
      professionalAnswer:
        "Compris. Pour avancer sereinement, pourrions-nous fixer une date butoir pour une réponse définitive ?",
      boundaryAnswer:
        "J'ai besoin d'une réponse claire pour m'organiser. Peux-tu me dire oui ou non d'ici [date] ?",
      voiceShortVersion: "D'accord, pas de problème.",
      selfRegulationTip:
        "L'incertitude est inconfortable, mais ce n'est pas un rejet. Attends la date butoir avant de reconsidérer.",
    },
  },
  {
    text: "Fais comme tu veux.",
    result: {
      original: "Fais comme tu veux.",
      clearTranslation:
        "Je te laisse décider. Soit je suis d'accord avec tout, soit je suis énervé(e) et je ne veux plus discuter.",
      literalMeaning:
        "La personne te donne la liberté de choisir.",
      possibleSocialMeaning:
        "Peut être un vrai consentement, mais aussi une façon de dire 'débrouille-toi' ou un signe de lassitude.",
      certain: [
        "La personne te renvoie la décision",
      ],
      uncertain: [
        "Est-ce un vrai consentement ?",
        "Est-ce de la lassitude ?",
        "Y a-t-il de la colère derrière ?",
      ],
      hypotheses: [
        { text: "C'est un vrai consentement bienveillant", confidence: "prudente" },
        { text: "La personne est lassée de discuter", confidence: "moyenne" },
        { text: "C'est de la colère refoulée", confidence: "faible" },
      ],
      clarifyingQuestion:
        "Est-ce que tu es vraiment d'accord, ou est-ce que tu en as assez de parler de ça ?",
      shortAnswer: "Merci, je vais réfléchir et choisir.",
      directAnswer:
        "Je ne suis pas sûr(e) de comprendre ton vrai ressenti. Es-tu vraiment d'accord avec mon choix ?",
      softAnswer:
        "Merci de me laisser choisir. Si ça ne te convient pas vraiment, tu peux me le dire, je préfère qu'on en discute.",
      professionalAnswer:
        "Noté. Avant de prendre ma décision, confirmes-tu que cette orientation respecte bien tes attentes également ?",
      boundaryAnswer:
        "Je préfère qu'on décide ensemble plutôt que je décide seul(e). Quelles sont tes vraies préférences ?",
      voiceShortVersion: "Merci, je vais y réfléchir.",
      selfRegulationTip:
        "Le silence ne signifie pas rejet. Vérifie la vraie intention avant de conclure.",
    },
  },
  {
    text: "C'est intéressant comme idée.",
    result: {
      original: "C'est intéressant comme idée.",
      clearTranslation:
        "Je ne suis pas convaincu(e), mais je ne veux pas te blesser en te disant non directement.",
      literalMeaning:
        "La personne trouve ton idée digne d'intérêt.",
      possibleSocialMeaning:
        "En langage social, 'intéressant' est souvent un euphémisme pour écarter poliment une idée sans la rejeter frontalement.",
      certain: [
        "La personne a entendu ton idée",
        "Elle ne s'enthousiasme pas ouvertement",
      ],
      uncertain: [
        "Est-ce un vrai intérêt ?",
        "Est-ce un rejet poli ?",
        "A-t-elle besoin de réflexion ?",
      ],
      hypotheses: [
        { text: "C'est un rejet poli masqué", confidence: "moyenne" },
        { text: "L'idée mérite réflexion sans enthousiasme immédiat", confidence: "prudente" },
        { text: "Il y a un vrai intérêt caché", confidence: "faible" },
      ],
      clarifyingQuestion:
        "Qu'est-ce qui t'intéresse le plus dans cette idée, et qu'est-ce qui te fait hésiter ?",
      shortAnswer: "Merci, je vais y repenser.",
      directAnswer:
        "Tu as l'air mitigé(e). Est-ce que tu penses que cette idée est réalisable, ou tu as des doutes ?",
      softAnswer:
        "Merci pour ton retour. Si tu as des réserves, je préfère les entendre maintenant pour qu'on avance ensemble.",
      professionalAnswer:
        "Merci pour ce retour. Pourrais-tu préciser les aspects qui te paraissent les plus pertinents et ceux qui nécessitent creusement ?",
      boundaryAnswer:
        "J'ai besoin d'un retour plus clair pour avancer. Est-ce un oui, un non, ou un peut-être ?",
      voiceShortVersion: "Compris, merci pour ton retour.",
      selfRegulationTip:
        "Un 'intéressant' n'est pas un oui. Demande des précisions sans te sentir rejeté.",
    },
  },
  {
    text: "Je ne veux pas venir, ça me fatigue.",
    result: {
      original: "Je ne veux pas venir, ça me fatigue.",
      clearTranslation:
        "Mon corps ou mon esprit a besoin de repos. Ce n'est pas contre toi, c'est une limite physique.",
      literalMeaning:
        "La personne exprime un besoin de repos et une fatigue.",
      possibleSocialMeaning:
        "Peut être de la fatigue réelle, mais aussi de la surcharge sensorielle ou un besoin de temps seul.",
      certain: [
        "La personne exprime un refus",
        "Elle mentionne la fatigue comme raison",
      ],
      uncertain: [
        "Est-ce de la fatigue physique ?",
        "Est-ce de la surcharge sensorielle ?",
        "Y a-t-il une autre raison ?",
      ],
      hypotheses: [
        { text: "C'est une fatigue physique réelle", confidence: "prudente" },
        { text: "C'est de la surcharge sensorielle", confidence: "moyenne" },
        { text: "La personne a besoin de temps seul", confidence: "prudente" },
      ],
      clarifyingQuestion:
        "Est-ce que tu as besoin de repos aujourd'hui, ou est-ce que ce type d'événement est souvent fatigant pour toi ?",
      shortAnswer: "Je comprends, repose-toi bien.",
      directAnswer:
        "Tu as besoin de repos, et c'est important. On se revoit quand tu te sens mieux ?",
      softAnswer:
        "Ta fatigue est légitime. Repose-toi sans culpabilité, on remet à plus tard.",
      professionalAnswer:
        "Compris. Préviens-moi quand tu te sens récupéré(e) pour qu'on replanifie notre collaboration.",
      boundaryAnswer:
        "La fatigue est un signal à respecter. Ne force pas, et dis-moi quand tu seras prêt(e).",
      voiceShortVersion: "Repose-toi bien, à bientôt.",
      selfRegulationTip:
        "Respecte tes limites. Le repos n'est pas de la paresse, c'est un besoin légitime.",
    },
  },
  {
    text: "Personne ne veut jouer avec moi.",
    result: {
      original: "Personne ne veut jouer avec moi.",
      clearTranslation:
        "Je me sens seul(e) et exclu(e). J'ai besoin d'aide pour comprendre ce qui se passe avec les autres enfants.",
      literalMeaning:
        "L'enfant pense que tous les autres enfants refusent de jouer avec lui.",
      possibleSocialMeaning:
        "Peut être un rejet réel, mais aussi une perception subjective, une difficulté sociale, ou un moment passager.",
      certain: [
        "L'enfant ressent de la solitude",
        "Il exprime une détresse sociale",
      ],
      uncertain: [
        "Est-ce un rejet objectif ?",
        "Est-ce une perception subjective ?",
        "Est-ce un moment passager ?",
      ],
      hypotheses: [
        { text: "C'est un moment passager de rejet", confidence: "moyenne" },
        { text: "L'enfant a des difficultés sociales à travailler", confidence: "prudente" },
        { text: "C'est une perception exagérée due à la tristesse", confidence: "prudente" },
      ],
      clarifyingQuestion:
        "Qu'est-ce qui s'est passé aujourd'hui avec les autres ? Un enfant en particulier, ou plusieurs ?",
      shortAnswer: "Je suis là. Raconte-moi ce qui s'est passé.",
      directAnswer:
        "Tu te sens seul(e), et c'est dur. Est-ce que ça arrive souvent, ou c'est aujourd'hui particulièrement ?",
      softAnswer:
        "Je suis désolé que tu te sentes seul(e). Veux-tu qu'on pense ensemble à ce que tu pourrais dire à un ami demain ?",
      professionalAnswer:
        "Merci de me partager ça. Analysons ensemble ce qui s'est passé et trouvons des stratégies pour la prochaine fois.",
      boundaryAnswer:
        "Ce que tu ressens est important. Parlons-en à un adulte de confiance ensemble.",
      childVersion:
        "Tu te sens tout(e) seul(e). Ça fait mal au cœur. On va trouver une solution ensemble.",
      voiceShortVersion: "Je suis là, raconte-moi.",
      selfRegulationTip:
        "La solitude est une émotion, pas une vérité absolue. Parler à un adulte peut aider à y voir plus clair.",
    },
  },
  {
    text: "Dépêche-toi un peu.",
    result: {
      original: "Dépêche-toi un peu.",
      clearTranslation:
        "Je veux que tu ailles plus vite. Soit c'est vraiment urgent, soit je suis impatient(e) ou stressé(e).",
      literalMeaning:
        "La personne te demande d'accélérer ton rythme.",
      possibleSocialMeaning:
        "Peut être une urgence réelle, de l'impatience, ou de l'anxiété face au temps qui passe.",
      certain: [
        "La personne veut plus de rapidité",
      ],
      uncertain: [
        "Y a-t-il une urgence réelle ?",
        "Est-ce de l'impatience ?",
        "La personne est-elle stressée ?",
      ],
      hypotheses: [
        { text: "Il y a une urgence réelle (horaire, retard)", confidence: "prudente" },
        { text: "C'est de l'impatience habituelle", confidence: "moyenne" },
        { text: "La personne est anxieuse du temps", confidence: "faible" },
      ],
      clarifyingQuestion:
        "On est en retard pour quelque chose de précis, ou c'est toi qui es stressé(e) ?",
      shortAnswer: "J'accélère, merci de me prévenir.",
      directAnswer:
        "On a un impératif horaire ? Dis-moi l'heure butoir pour que je m'organise.",
      softAnswer:
        "Je fais de mon mieux pour aller vite. Est-ce qu'on est pressés par le temps ?",
      professionalAnswer:
        "Compris. Quelle est l'heure butoir pour qu'on soit à temps ? Je m'organise en conséquence.",
      boundaryAnswer:
        "Je vais aussi vite que je peux. Si c'est vraiment urgent, dis-moi l'heure exacte à laquelle on doit être prêts.",
      voiceShortVersion: "J'accélère !",
      selfRegulationTip:
        "La pression des autres n'est pas toujours une urgence réelle. Vérifie avant de stresser.",
    },
  },
];

export function findMockAnalysis(text: string): AnalysisResult | undefined {
  const normalized = text.trim().toLowerCase();
  const match = mockExamples.find(
    (ex) => ex.text.toLowerCase() === normalized
  );
  return match?.result;
}
