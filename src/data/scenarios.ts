import type { ConfidenceLevel } from "@/types";
import type { Scenario } from "@/types/scenarios";

const ADDED_AT = "2026-05-20";

function hypothesis(text: string, confidence: ConfidenceLevel) {
  return { text, confidence };
}

export const SCENARIOS: Scenario[] = [
  {
    id: "travail-collegue-on-verra",
    title: "Un collègue répond « On verra » à ta proposition",
    category: "travail",
    context: "travail",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai proposé à mon collègue de revoir notre process de validation des PRs pour gagner du temps. Il m'a juste répondu « On verra » et il est parti déjeuner.",
    result: {
      original:
        "J'ai proposé à mon collègue de revoir notre process de validation des PRs pour gagner du temps. Il m'a juste répondu « On verra » et il est parti déjeuner.",
      clearTranslation:
        "« On verra » peut vouloir dire plusieurs choses. Sans autre élément, c'est une réponse qui ne ferme pas la porte mais qui ne s'engage pas non plus.",
      literalMeaning:
        "La phrase signifie littéralement que la décision ou la discussion sera reprise plus tard.",
      possibleSocialMeaning:
        "Dans un cadre professionnel, cette réponse peut servir à gagner du temps, à éviter une réponse immédiate, ou à repousser une discussion qui demande plus d'énergie.",
      certain: [
        "Il n'a pas dit oui.",
        "Il n'a pas dit non.",
        "Il est parti déjeuner sans ajouter d'argument.",
      ],
      uncertain: [
        "S'il a vraiment prévu d'y réfléchir plus tard.",
        "S'il était pressé ou s'il évitait le sujet.",
        "S'il a déjà une opinion qu'il ne veut pas partager tout de suite.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : il est ouvert mais veut réfléchir avant de s'engager.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : il n'est pas convaincu mais préfère éviter une réponse frontale.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : il était simplement occupé ou fatigué à ce moment-là.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux lui demander demain : « Tu as eu le temps de repenser à ma proposition sur les PRs ? »",
      shortAnswer: "Ok, dis-moi quand tu as le temps d'en reparler.",
      directAnswer:
        "J'aimerais savoir si tu es plutôt partant ou réservé, même sans décision définitive.",
      softAnswer:
        "Pas de souci, prends le temps de regarder. Dis-moi quand tu veux qu'on en reparle.",
      professionalAnswer:
        "Je note. Peux-tu me donner un retour d'ici la fin de la semaine ?",
      boundaryAnswer:
        "J'ai besoin d'une réponse plus claire pour avancer. Sinon, je mettrai ce sujet en pause.",
      voiceShortVersion: "Ok, on en reparle quand tu peux.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "travail-manager-faut-quon-en-parle",
    title: "Un manager dit « Faut qu'on en parle » sans contexte",
    category: "travail",
    context: "travail",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Ma manager m'a envoyé sur Teams : « Faut qu'on en parle demain matin ». Elle n'a pas expliqué le sujet et je ne sais pas si c'est grave.",
    result: {
      original:
        "Ma manager m'a envoyé sur Teams : « Faut qu'on en parle demain matin ». Elle n'a pas expliqué le sujet et je ne sais pas si c'est grave.",
      clearTranslation:
        "Cette phrase annonce une discussion, mais elle ne précise pas si le sujet est positif, neutre ou difficile. L'absence de contexte peut créer de l'inquiétude sans prouver qu'il y a un problème.",
      literalMeaning:
        "Ta manager veut parler avec toi le lendemain matin.",
      possibleSocialMeaning:
        "Dans le travail, cette formulation peut servir à signaler qu'un sujet mérite un échange oral plutôt qu'un message écrit. Le manque de précision peut venir d'un manque de temps, pas forcément d'une mauvaise nouvelle.",
      certain: [
        "Elle souhaite un échange demain matin.",
        "Elle n'a pas donné le thème dans son message.",
        "Le message est court.",
      ],
      uncertain: [
        "Si le sujet concerne ton travail, l'équipe, un planning ou autre chose.",
        "Si l'échange sera difficile ou simplement pratique.",
        "Si elle a conscience que le message peut inquiéter.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : elle veut clarifier un point de travail qui demande une conversation.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : elle a écrit vite et n'a pas pensé à donner le contexte.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : elle veut aborder un sujet sensible, mais ce n'est pas certain.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux répondre : « Bien sûr. Peux-tu me dire en deux mots le sujet pour que je prépare ? »",
      shortAnswer: "D'accord. C'est à propos de quel sujet ?",
      directAnswer:
        "Je peux en parler demain. Peux-tu préciser le thème pour que j'arrive préparé ?",
      softAnswer:
        "Oui, bien sûr. Pour éviter que je m'inquiète inutilement, tu peux me dire rapidement de quoi il s'agit ?",
      professionalAnswer:
        "Entendu. Merci de m'indiquer le sujet de l'échange afin que je prépare les éléments utiles.",
      boundaryAnswer:
        "Je suis disponible demain, mais j'ai besoin du sujet à l'avance pour préparer correctement la discussion.",
      voiceShortVersion: "D'accord. Tu peux me dire le sujet ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "travail-slack-silence-deux-jours",
    title: "Un collègue ne répond pas sur Slack depuis deux jours",
    category: "travail",
    context: "travail",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai envoyé un message Slack à une collègue mardi pour lui demander son avis sur un dossier. On est jeudi, elle a vu le message mais elle n'a pas répondu.",
    result: {
      original:
        "J'ai envoyé un message Slack à une collègue mardi pour lui demander son avis sur un dossier. On est jeudi, elle a vu le message mais elle n'a pas répondu.",
      clearTranslation:
        "Une absence de réponse ne donne pas, à elle seule, l'intention de la personne. Elle peut avoir oublié, repoussé, manqué de disponibilité, ou ne pas savoir quoi répondre.",
      literalMeaning:
        "Le message a été envoyé et semble avoir été vu, mais aucune réponse n'a encore été donnée.",
      possibleSocialMeaning:
        "Dans certains environnements de travail, les messages lus mais non traités restent en attente quand la personne priorise autre chose. Cela peut aussi indiquer que le canal Slack n'est pas le bon pour ce sujet.",
      certain: [
        "Le message date de deux jours.",
        "Il semble avoir été vu.",
        "Tu n'as pas reçu de réponse.",
      ],
      uncertain: [
        "Si elle a oublié.",
        "Si elle attend une information avant de répondre.",
        "Si elle considère le dossier comme urgent ou non.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : elle a vu le message puis l'a remis à plus tard.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : elle est prise par d'autres urgences et n'a pas encore traité ta demande.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : elle ne sait pas quoi répondre et évite de répondre sans solution.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux relancer avec une échéance : « Je me permets de te relancer. Est-ce que tu peux me répondre avant vendredi 12h ? »",
      shortAnswer: "Je te relance sur ce dossier. Tu as un avis ?",
      directAnswer:
        "J'ai besoin de ton retour pour avancer. Peux-tu me dire si tu peux le traiter cette semaine ?",
      softAnswer:
        "Je sais que tu as peut-être beaucoup de choses en cours. Je te relance doucement sur ma question de mardi.",
      professionalAnswer:
        "Bonjour, je me permets de te relancer concernant le dossier envoyé mardi. Un retour avant vendredi m'aiderait à finaliser.",
      boundaryAnswer:
        "Sans retour de ta part d'ici vendredi midi, je poursuivrai avec les informations disponibles.",
      voiceShortVersion: "Je te relance. Tu peux me répondre quand ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "travail-email-passer-me-voir",
    title: "Un email dit « Quand tu auras un moment, peux-tu passer me voir ? »",
    category: "travail",
    context: "travail",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai reçu un email de la responsable RH : « Quand tu auras un moment, peux-tu passer me voir ? » Il n'y a pas d'autre information.",
    result: {
      original:
        "J'ai reçu un email de la responsable RH : « Quand tu auras un moment, peux-tu passer me voir ? » Il n'y a pas d'autre information.",
      clearTranslation:
        "La phrase demande un passage en personne, mais elle ne dit pas si le sujet est administratif, pratique ou sensible. Le ton reste poli et non urgent.",
      literalMeaning:
        "La responsable RH te demande de venir la voir quand tu seras disponible.",
      possibleSocialMeaning:
        "Cette formulation peut concerner un document, une information RH, une question d'organisation, ou un sujet qui se traite mieux à l'oral. L'absence de détail ne suffit pas à conclure que c'est grave.",
      certain: [
        "La demande vient de la responsable RH.",
        "Elle ne fixe pas d'horaire précis.",
        "Elle ne donne pas le sujet.",
      ],
      uncertain: [
        "Si le sujet est administratif ou personnel.",
        "Si c'est urgent.",
        "Si elle attend quelque chose de précis de ta part.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : elle a une question RH simple à traiter en direct.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : elle veut éviter un échange long par email.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : le sujet peut être plus sensible, mais rien dans la phrase ne le confirme.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux répondre : « Oui, je peux passer. Est-ce qu'il faut que j'apporte un document ou que je prépare quelque chose ? »",
      shortAnswer: "Oui. Tu préfères quel moment ?",
      directAnswer:
        "Je peux passer. Peux-tu me préciser le sujet ou ce que je dois apporter ?",
      softAnswer:
        "Oui, bien sûr. Pour que je vienne préparé, tu peux me dire rapidement de quoi il s'agit ?",
      professionalAnswer:
        "Bonjour, je suis disponible cet après-midi. Merci de me préciser si un document est nécessaire.",
      boundaryAnswer:
        "Je peux passer, mais j'aimerais connaître le sujet avant l'échange pour arriver dans de bonnes conditions.",
      voiceShortVersion: "Oui. Je dois préparer quelque chose ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "famille-parent-tu-es-toujours-comme-ca",
    title: "Un parent dit « Tu es toujours comme ça »",
    category: "famille",
    context: "famille",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Pendant le dîner familial, ma mère m'a dit « Tu es toujours comme ça, tu prends tout au premier degré ». Tout le monde a ri sauf moi.",
    result: {
      original:
        "Pendant le dîner familial, ma mère m'a dit « Tu es toujours comme ça, tu prends tout au premier degré ». Tout le monde a ri sauf moi.",
      clearTranslation:
        "Cette phrase décrit une manière dont ta mère te perçoit. Le rire collectif peut signaler une plaisanterie familiale, mais cela peut quand même être blessant à recevoir.",
      literalMeaning:
        "Ta mère dit que tu comprends souvent les phrases de manière littérale.",
      possibleSocialMeaning:
        "Dans certaines familles, ce type de remarque devient une habitude. L'intention peut être de plaisanter, d'exprimer une frustration ou de commenter une différence de communication.",
      certain: [
        "La remarque a été dite devant d'autres personnes.",
        "Les autres ont ri.",
        "Toi, tu n'as pas ri.",
      ],
      uncertain: [
        "Si ta mère voulait plaisanter ou exprimer une gêne.",
        "Pourquoi les autres ont ri.",
        "Si cette remarque fait partie d'un schéma répété.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : c'est une plaisanterie familiale qu'elle ne perçoit pas comme blessante.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : elle exprime maladroitement une difficulté de communication.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : cette remarque s'inscrit dans une habitude qui mérite une discussion à froid.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux lui dire plus tard : « Quand tu dis ça devant tout le monde, ça me gêne. On peut en parler ? »",
      shortAnswer: "Ça me gêne quand tu dis ça devant les autres.",
      directAnswer:
        "Je préfère qu'on évite ce type de remarque sur moi en public. On peut en parler en privé.",
      softAnswer:
        "Je sais que c'était peut-être pour rire, mais moi je l'ai mal vécu.",
      professionalAnswer:
        "Formulation neutre : je préfère que ce sujet soit abordé en privé plutôt que devant tout le monde.",
      boundaryAnswer:
        "Je ne veux plus qu'on parle de moi comme ça à table. Si ça recommence, je prendrai une pause.",
      voiceShortVersion: "Ça me gêne quand tu dis ça.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 14,
    ageMax: 99,
    sensitive: "sensible",
  },
  {
    id: "famille-conjoint-jamais-rien-maison",
    title: "Un conjoint dit « Tu fais jamais rien à la maison »",
    category: "famille",
    context: "famille",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Mon conjoint m'a dit d'un coup : « Tu fais jamais rien à la maison ». J'avais pourtant fait les courses et lancé une machine le matin.",
    result: {
      original:
        "Mon conjoint m'a dit d'un coup : « Tu fais jamais rien à la maison ». J'avais pourtant fait les courses et lancé une machine le matin.",
      clearTranslation:
        "La phrase utilise un mot absolu, « jamais », qui peut amplifier une frustration. Elle ne décrit pas forcément les faits de manière exacte.",
      literalMeaning:
        "La phrase affirme que tu ne participes pas aux tâches de la maison.",
      possibleSocialMeaning:
        "Dans un conflit domestique, ce type de phrase peut vouloir dire : « Je me sens surchargé en ce moment » ou « J'ai l'impression que la répartition n'est pas équilibrée ». Cela reste une formulation blessante et imprécise.",
      certain: [
        "Ton conjoint a utilisé une formule très générale.",
        "Tu as fait au moins deux tâches ce matin-là.",
        "La phrase t'a surpris.",
      ],
      uncertain: [
        "Quelle tâche précise a déclenché la remarque.",
        "Si la frustration porte sur aujourd'hui ou sur une période plus longue.",
        "S'il a vu les tâches que tu as faites.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : il exprime une fatigue liée à la charge domestique.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il n'a pas remarqué ce que tu as déjà fait.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : il mélange une frustration ancienne avec la situation du jour.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux demander : « Tu parles de quelle tâche précisément ? J'ai besoin qu'on soit concret. »",
      shortAnswer: "Je veux bien en parler, mais pas avec « jamais ».",
      directAnswer:
        "J'ai fait les courses et une machine ce matin. Dis-moi quelle tâche précise pose problème.",
      softAnswer:
        "Je comprends que tu sois peut-être fatigué. J'ai besoin qu'on parle de faits précis pour trouver une solution.",
      professionalAnswer:
        "Formulation neutre : reprenons la liste des tâches et voyons comment les répartir plus clairement.",
      boundaryAnswer:
        "Je suis d'accord pour parler de la maison, mais pas avec des phrases qui effacent ce que je fais.",
      voiceShortVersion: "Parlons d'une tâche précise.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "sensible",
  },
  {
    id: "famille-ado-silence-journee",
    title: "Un ado ne répond pas quand on demande sa journée",
    category: "famille",
    context: "famille",
    direction: "adulte-enfant",
    inputText:
      "J'ai demandé à mon fils ado comment s'était passée sa journée. Il a haussé les épaules, a dit « rien » et il est monté dans sa chambre.",
    result: {
      original:
        "J'ai demandé à mon fils ado comment s'était passée sa journée. Il a haussé les épaules, a dit « rien » et il est monté dans sa chambre.",
      clearTranslation:
        "La réponse « rien » peut vouloir dire qu'il ne veut pas parler maintenant, qu'il ne sait pas quoi raconter, ou qu'il a besoin de redescendre après la journée.",
      literalMeaning:
        "Il dit qu'il n'y a rien à raconter et il quitte la pièce.",
      possibleSocialMeaning:
        "Chez un adolescent, une réponse très courte peut être une manière de préserver son espace, d'éviter une conversation longue, ou de différer un sujet difficile.",
      certain: [
        "Il a répondu très brièvement.",
        "Il est monté dans sa chambre.",
        "Il n'a pas donné de détail sur sa journée.",
      ],
      uncertain: [
        "S'il est fatigué, préoccupé ou juste peu disponible.",
        "S'il y a eu un événement important.",
        "S'il acceptera de parler plus tard.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : il a besoin d'un temps calme avant de parler.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il ne sait pas encore mettre des mots sur sa journée.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : quelque chose l'a contrarié, mais la scène ne le prouve pas.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux revenir plus tard avec une question simple : « Tu préfères me parler maintenant, après le repas, ou pas aujourd'hui ? »",
      shortAnswer: "Ok, je te laisse souffler. Je suis là si tu veux parler.",
      directAnswer:
        "Je vois que tu n'as pas envie de parler maintenant. Dis-moi juste si tu veux qu'on en reparle plus tard.",
      softAnswer:
        "D'accord. Prends ton temps. Tu peux venir me voir si tu as besoin.",
      professionalAnswer:
        "Formulation éducative : proposer un choix de moment peut réduire la pression et garder le lien ouvert.",
      boundaryAnswer:
        "Tu peux avoir ton espace. J'ai aussi besoin de savoir si quelque chose d'important s'est passé.",
      voiceShortVersion: "Je te laisse souffler. Je suis là.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "famille-parent-appelle-moi",
    title: "Un parent écrit « Appelle-moi quand tu peux »",
    category: "famille",
    context: "famille",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Mon père m'a envoyé seulement : « Appelle-moi quand tu peux ». Il n'a pas mis de ponctuation ni expliqué pourquoi.",
    result: {
      original:
        "Mon père m'a envoyé seulement : « Appelle-moi quand tu peux ». Il n'a pas mis de ponctuation ni expliqué pourquoi.",
      clearTranslation:
        "Ce message demande un appel, mais il ne dit pas si c'est urgent. Beaucoup de personnes écrivent ce type de message pour des sujets simples.",
      literalMeaning:
        "Ton père veut que tu l'appelles à un moment où tu es disponible.",
      possibleSocialMeaning:
        "Dans la famille, cette formule peut servir pour une information pratique, une demande, une nouvelle, ou simplement une envie de parler. L'absence de détail peut inquiéter, mais elle ne suffit pas à conclure à une urgence.",
      certain: [
        "Il demande un appel.",
        "Il ne donne pas le sujet.",
        "Il écrit « quand tu peux », ce qui ne signale pas forcément une urgence.",
      ],
      uncertain: [
        "Le sujet exact de l'appel.",
        "Son niveau d'urgence réel.",
        "S'il a pensé à l'effet du message sur toi.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : il a une information pratique à transmettre.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il préfère parler à l'oral plutôt que par texto.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : le sujet peut être sensible, mais ce n'est pas indiqué dans le message.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux répondre : « Je peux t'appeler vers 18h. C'est urgent ou ça peut attendre ? »",
      shortAnswer: "Je peux t'appeler vers 18h. C'est urgent ?",
      directAnswer:
        "Je te rappelle aujourd'hui. Peux-tu me dire le sujet en attendant ?",
      softAnswer:
        "Oui, je t'appelle dès que possible. Dis-moi juste si c'est urgent pour que je m'organise.",
      professionalAnswer:
        "Formulation neutre : je te confirme un créneau d'appel et je demande le niveau d'urgence.",
      boundaryAnswer:
        "Je peux appeler, mais j'ai besoin de savoir si c'est urgent pour ne pas rester inquiet.",
      voiceShortVersion: "Je t'appelle vers 18h. C'est urgent ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 14,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "couple-ca-va-ton-plat",
    title: "Un partenaire dit « Ça va » avec un ton plat après une dispute",
    category: "couple",
    context: "couple",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Après une dispute, j'ai demandé à ma partenaire si ça allait. Elle a répondu « ça va » avec un ton plat, sans me regarder.",
    result: {
      original:
        "Après une dispute, j'ai demandé à ma partenaire si ça allait. Elle a répondu « ça va » avec un ton plat, sans me regarder.",
      clearTranslation:
        "Les mots disent que ça va, mais le ton et le regard peuvent indiquer qu'elle n'est pas totalement disponible pour parler ou que l'émotion est encore présente.",
      literalMeaning:
        "Elle affirme que son état est correct.",
      possibleSocialMeaning:
        "Après une dispute, « ça va » peut vouloir dire « je ne veux pas en parler maintenant », « je me calme », ou « je ne sais pas encore quoi dire ». Ce n'est pas une preuve d'une intention précise.",
      certain: [
        "Il y a eu une dispute avant.",
        "Elle a répondu avec peu d'expression.",
        "Elle n'a pas soutenu le regard.",
      ],
      uncertain: [
        "Si elle veut reparler du sujet plus tard.",
        "Si elle est triste, fatiguée, en colère ou juste silencieuse.",
        "Si elle attend une initiative particulière.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : elle a besoin de temps avant de reprendre la conversation.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : elle essaie d'éviter de relancer la dispute à chaud.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : elle aimerait être rassurée, mais rien ne permet de l'affirmer.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux demander doucement : « Tu préfères qu'on en reparle plus tard ou que je te laisse un moment ? »",
      shortAnswer: "Ok. Tu préfères qu'on en reparle plus tard ?",
      directAnswer:
        "J'entends que tu dis que ça va, mais je te sens encore fermée. Tu veux du temps ou une discussion ?",
      softAnswer:
        "Je ne veux pas te brusquer. Je suis là si tu veux en reparler quand tu seras prête.",
      professionalAnswer:
        "Formulation neutre : je propose de reprendre la discussion à un moment plus calme.",
      boundaryAnswer:
        "Je respecte ton silence, mais j'ai besoin qu'on fixe un moment pour reprendre si le sujet reste important.",
      voiceShortVersion: "Tu veux du temps ou en parler plus tard ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 16,
    ageMax: 99,
    sensitive: "sensible",
  },
  {
    id: "couple-message-amour-reponse-tardive",
    title: "Un message d'amour reçoit une réponse tardive",
    category: "couple",
    context: "couple",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai envoyé « je t'aime » à mon compagnon le matin. Il a répondu seulement le soir : « moi aussi ». Entre les deux, il a envoyé des messages dans un groupe.",
    result: {
      original:
        "J'ai envoyé « je t'aime » à mon compagnon le matin. Il a répondu seulement le soir : « moi aussi ». Entre les deux, il a envoyé des messages dans un groupe.",
      clearTranslation:
        "La réponse tardive peut être difficile à recevoir, mais elle ne donne pas à elle seule la signification affective du lien. Il a fini par répondre positivement.",
      literalMeaning:
        "Tu as exprimé ton affection le matin et il a répondu qu'il partageait ce sentiment le soir.",
      possibleSocialMeaning:
        "Certaines personnes répondent vite aux groupes mais prennent plus de temps pour les messages intimes. Cela peut venir d'une habitude numérique, d'une gêne, d'une distraction ou d'une différence de rythme.",
      certain: [
        "Il a répondu positivement le soir.",
        "Il a été actif dans un groupe entre-temps.",
        "Tu as vécu l'attente comme significative.",
      ],
      uncertain: [
        "Pourquoi il n'a pas répondu plus tôt.",
        "S'il a vu ton message au moment où tu l'as envoyé.",
        "S'il comprend l'importance de ce délai pour toi.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : il a un rapport plus léger aux délais de réponse.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : il a répondu au groupe par automatisme et à toi plus tard quand il était disponible.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : il était mal à l'aise avec l'expression affective immédiate, sans que ce soit certain.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux dire : « Quand je t'envoie un message affectueux, une petite réponse plus tôt me rassurerait. Est-ce possible pour toi ? »",
      shortAnswer: "Ta réponse m'a fait plaisir, mais l'attente m'a pesé.",
      directAnswer:
        "J'aimerais que tu répondes plus vite aux messages affectueux, même avec un petit mot.",
      softAnswer:
        "Je sais que les délais ne veulent pas toujours dire quelque chose, mais moi ça me rassure quand tu réponds plus tôt.",
      professionalAnswer:
        "Formulation neutre : je clarifie mon besoin de réassurance sans tirer de conclusion sur l'intention.",
      boundaryAnswer:
        "Je ne veux pas surveiller tes messages, mais j'ai besoin qu'on parle de nos attentes sur les réponses importantes.",
      voiceShortVersion: "Ta réponse m'a fait plaisir, mais l'attente m'a pesé.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 16,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "couple-tu-es-bizarre-quand-tu-fais-ca",
    title: "Un partenaire dit « Tu es bizarre quand tu fais ça »",
    category: "couple",
    context: "couple",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Ma partenaire m'a vu me balancer doucement pendant un film et elle a dit : « Tu es bizarre quand tu fais ça ». J'ai eu honte.",
    result: {
      original:
        "Ma partenaire m'a vu me balancer doucement pendant un film et elle a dit : « Tu es bizarre quand tu fais ça ». J'ai eu honte.",
      clearTranslation:
        "La phrase signale qu'elle remarque un comportement et le qualifie de manière maladroite. Le mot peut blesser même si elle ne pensait pas forcément à mal.",
      literalMeaning:
        "Elle dit que ce geste lui paraît inhabituel.",
      possibleSocialMeaning:
        "Elle peut exprimer une surprise, une gêne ou une incompréhension. Cela ne donne pas une certitude sur ce qu'elle pense de toi globalement.",
      certain: [
        "Elle a commenté ton mouvement.",
        "Elle a utilisé le mot « bizarre ».",
        "Tu as ressenti de la honte.",
      ],
      uncertain: [
        "Si elle voulait blesser ou si elle a parlé trop vite.",
        "Si elle comprend l'utilité de ce mouvement pour toi.",
        "Si elle serait ouverte à une explication.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : elle a été surprise et a choisi un mot maladroit.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : elle ne sait pas que ce mouvement peut aider à se réguler.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : elle était gênée par le geste, mais il manque des informations.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux dire : « Quand tu dis bizarre, ça me fait honte. Ce geste m'aide à me sentir calme. »",
      shortAnswer: "Ce mot me blesse. Ce geste m'aide à me calmer.",
      directAnswer:
        "Je préfère que tu ne me dises pas que je suis bizarre. Tu peux me demander ce que je fais.",
      softAnswer:
        "Je sais que ça peut surprendre. Pour moi, c'est une façon de me réguler, pas quelque chose de grave.",
      professionalAnswer:
        "Formulation neutre : ce comportement a une fonction de régulation et je préfère une question à une étiquette.",
      boundaryAnswer:
        "Je peux expliquer ce geste, mais je ne veux pas qu'on me qualifie de bizarre quand je me régule.",
      voiceShortVersion: "Ce mot me blesse. Ce geste m'aide.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 16,
    ageMax: 99,
    sensitive: "sensible",
  },
  {
    id: "amitie-annulation-troisieme-fois",
    title: "Un ami annule un plan à la dernière minute pour la troisième fois",
    category: "amitie",
    context: "amitie",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Une amie vient d'annuler notre sortie une heure avant, pour la troisième fois en deux mois. Elle écrit : « Désolée, trop fatiguée aujourd'hui ».",
    result: {
      original:
        "Une amie vient d'annuler notre sortie une heure avant, pour la troisième fois en deux mois. Elle écrit : « Désolée, trop fatiguée aujourd'hui ».",
      clearTranslation:
        "L'annulation peut être liée à une vraie fatigue. Le fait que cela se répète change quand même l'impact sur toi et peut justifier une discussion sur l'organisation.",
      literalMeaning:
        "Elle dit qu'elle est trop fatiguée pour sortir aujourd'hui.",
      possibleSocialMeaning:
        "Dans une amitié, une annulation répétée peut venir d'une période difficile, d'une mauvaise gestion de l'énergie, ou d'une priorité différente. L'intention exacte reste incertaine.",
      certain: [
        "Elle annule à la dernière minute.",
        "C'est la troisième annulation récente.",
        "Elle donne la fatigue comme raison.",
      ],
      uncertain: [
        "Si sa fatigue est ponctuelle ou durable.",
        "Si elle mesure l'effet de ces annulations sur toi.",
        "Si elle souhaite proposer une autre date.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : elle traverse une période de faible énergie.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : elle accepte des plans puis réalise trop tard qu'elle ne peut pas suivre.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : elle évite peut-être les sorties en ce moment, mais on ne sait pas pourquoi.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux demander : « Est-ce que tu préfères qu'on prévoie des choses plus courtes ou qu'on se voie à une période plus calme ? »",
      shortAnswer: "Je comprends. J'aimerais qu'on trouve une façon plus fiable de se voir.",
      directAnswer:
        "Je respecte ta fatigue, mais les annulations de dernière minute me pèsent. On peut choisir un format plus simple ?",
      softAnswer:
        "Repose-toi. Pour la prochaine fois, j'aimerais qu'on prévoie quelque chose qui te coûte moins d'énergie.",
      professionalAnswer:
        "Formulation neutre : je reconnais la contrainte et je propose d'ajuster le format pour éviter les annulations répétées.",
      boundaryAnswer:
        "Je préfère ne plus bloquer une soirée complète si c'est souvent annulé au dernier moment. Proposons plus court.",
      voiceShortVersion: "Je comprends, mais les annulations me pèsent.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 14,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "amitie-on-se-voit-bientot",
    title: "Un ami dit « On se voit bientôt » sans proposer de date",
    category: "amitie",
    context: "amitie",
    direction: "neurotypique-neuroatypique",
    inputText:
      "À la fin d'un échange, un ami m'a dit : « On se voit bientôt ! » mais il n'a proposé aucune date. Je ne sais pas si c'est une vraie invitation.",
    result: {
      original:
        "À la fin d'un échange, un ami m'a dit : « On se voit bientôt ! » mais il n'a proposé aucune date. Je ne sais pas si c'est une vraie invitation.",
      clearTranslation:
        "« On se voit bientôt » peut être une formule chaleureuse générale ou une vraie envie de se revoir. Sans proposition de date, l'intention pratique reste floue.",
      literalMeaning:
        "La phrase annonce l'idée de se revoir dans un futur proche.",
      possibleSocialMeaning:
        "Dans les conversations sociales, cette formule sert parfois à conclure gentiment. Elle peut aussi ouvrir la porte à une proposition concrète si quelqu'un relance.",
      certain: [
        "La phrase est positive.",
        "Aucune date n'a été fixée.",
        "Tu aimerais savoir si c'est concret.",
      ],
      uncertain: [
        "S'il voulait vraiment organiser quelque chose.",
        "S'il attend que tu proposes une date.",
        "S'il utilisait simplement une formule de fin d'échange.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : c'est une formule amicale sans plan précis.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il est ouvert à se revoir mais n'a pas encore regardé son agenda.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : il attend peut-être que tu proposes une date.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux transformer la phrase en concret : « Oui, avec plaisir. Tu serais dispo samedi ou la semaine prochaine ? »",
      shortAnswer: "Oui, avec plaisir. Tu as une date en tête ?",
      directAnswer:
        "J'aimerais bien qu'on se voie. Donne-moi deux créneaux possibles et on choisit.",
      softAnswer:
        "Ça me ferait plaisir aussi. On peut regarder une date quand tu veux.",
      professionalAnswer:
        "Formulation neutre : je propose de passer d'une intention générale à un créneau concret.",
      boundaryAnswer:
        "Je préfère les plans précis. Si tu veux qu'on se voie, proposons une date.",
      voiceShortVersion: "Avec plaisir. Tu as une date ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 14,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "amitie-vocal-sans-reponse",
    title: "Un vocal reste sans réponse depuis une semaine",
    category: "amitie",
    context: "amitie",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai envoyé un vocal de quatre minutes à un ami pour lui raconter une situation difficile. Une semaine après, il n'a toujours pas répondu.",
    result: {
      original:
        "J'ai envoyé un vocal de quatre minutes à un ami pour lui raconter une situation difficile. Une semaine après, il n'a toujours pas répondu.",
      clearTranslation:
        "Un long vocal peut demander de l'énergie pour écouter et répondre. L'absence de réponse est douloureuse, mais elle ne permet pas de connaître l'intention de ton ami.",
      literalMeaning:
        "Tu as envoyé un message audio long et tu n'as pas reçu de réponse.",
      possibleSocialMeaning:
        "Il peut avoir repoussé l'écoute, ne pas savoir quoi répondre, être pris ailleurs, ou avoir besoin d'un format plus court. Le silence prolongé peut aussi signaler une limite de disponibilité.",
      certain: [
        "Le vocal dure quatre minutes.",
        "Une semaine est passée.",
        "Tu n'as pas reçu de réponse.",
      ],
      uncertain: [
        "S'il a écouté le vocal.",
        "S'il sait comment répondre.",
        "S'il est disponible émotionnellement en ce moment.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : le format long l'a mis en attente de disponibilité.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il ne sait pas quoi répondre à une situation difficile.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : il a besoin de poser une limite, mais il ne l'a pas formulée.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux envoyer un message court : « Je sais que mon vocal était long. Est-ce que tu l'as vu ? Même une petite réponse me ferait du bien. »",
      shortAnswer: "Tu as pu écouter mon vocal ? Une petite réponse m'aiderait.",
      directAnswer:
        "Je n'ai pas eu de retour depuis une semaine. J'aimerais savoir si tu peux me répondre ou si ce n'est pas le bon moment.",
      softAnswer:
        "Je sais que c'était un long vocal. Quand tu peux, même un petit mot me ferait du bien.",
      professionalAnswer:
        "Formulation neutre : je vérifie la disponibilité de la personne et je propose une réponse courte.",
      boundaryAnswer:
        "Si tu n'es pas disponible pour ce type d'échange, dis-le-moi clairement. J'ai besoin de savoir.",
      voiceShortVersion: "Tu as pu écouter mon vocal ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 14,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "ecole-tout-le-monde-a-compris",
    title: "Un enseignant dit « Tu vois bien que tout le monde a compris »",
    category: "ecole",
    context: "ecole",
    direction: "enfant-adulte",
    inputText:
      "En classe, j'ai demandé à la prof de réexpliquer. Elle a répondu : « Tu vois bien que tout le monde a compris ». J'ai arrêté de poser des questions.",
    result: {
      original:
        "En classe, j'ai demandé à la prof de réexpliquer. Elle a répondu : « Tu vois bien que tout le monde a compris ». J'ai arrêté de poser des questions.",
      clearTranslation:
        "La phrase compare ta compréhension à celle du groupe. Elle peut donner honte, même si la prof voulait peut-être avancer dans le cours.",
      literalMeaning:
        "La prof dit que les autres élèves semblent avoir compris.",
      possibleSocialMeaning:
        "Dans une classe, un adulte peut parfois répondre vite parce qu'il manque de temps. Cela ne veut pas dire que ta question est mauvaise. Tu as le droit de demander une explication adaptée.",
      certain: [
        "Tu as demandé une explication.",
        "La prof a répondu devant la classe.",
        "Tu as arrêté de poser des questions.",
      ],
      uncertain: [
        "Si la prof était pressée ou agacée.",
        "Si tous les autres avaient réellement compris.",
        "Si elle accepterait de réexpliquer à un autre moment.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : la prof voulait avancer dans le cours et a répondu trop vite.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : elle n'a pas mesuré que la phrase pouvait te bloquer.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : elle était agacée, mais on ne peut pas le savoir avec certitude.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux demander après le cours : « Je n'ai pas compris. Est-ce que vous pouvez me redire la consigne autrement ? »",
      shortAnswer: "Je n'ai pas compris. J'ai besoin d'une autre explication.",
      directAnswer:
        "Même si les autres ont compris, moi j'ai besoin que la consigne soit reformulée.",
      softAnswer:
        "Je veux réussir l'exercice. Est-ce que vous pouvez me donner un exemple ?",
      professionalAnswer:
        "Formulation scolaire : j'ai besoin d'une reformulation ou d'un exemple pour commencer.",
      boundaryAnswer:
        "Je peux attendre la fin du cours, mais j'ai besoin d'une explication pour faire le travail.",
      voiceShortVersion: "J'ai besoin d'une autre explication.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 8,
    ageMax: 18,
    sensitive: "sensible",
  },
  {
    id: "ecole-aesh-tu-vas-y-arriver",
    title: "Une AESH dit « Tu vas y arriver, tu es plus capable que tu crois »",
    category: "ecole",
    context: "ecole",
    direction: "adulte-enfant",
    inputText:
      "L'AESH a dit à l'élève : « Tu vas y arriver, tu es plus capable que tu crois ». L'élève a baissé la tête et n'a pas commencé l'exercice.",
    result: {
      original:
        "L'AESH a dit à l'élève : « Tu vas y arriver, tu es plus capable que tu crois ». L'élève a baissé la tête et n'a pas commencé l'exercice.",
      clearTranslation:
        "La phrase veut probablement encourager, mais elle peut rester trop générale pour aider l'enfant à démarrer. Certains enfants ont besoin d'une première étape très concrète.",
      literalMeaning:
        "L'AESH dit que l'enfant a des capacités et peut réussir.",
      possibleSocialMeaning:
        "L'intention peut être rassurante. Mais si l'enfant se sent déjà bloqué, une phrase positive peut ne pas suffire. Un découpage de la tâche peut être plus utile.",
      certain: [
        "L'AESH a donné un encouragement.",
        "L'élève n'a pas commencé.",
        "L'élève a baissé la tête.",
      ],
      uncertain: [
        "Si l'élève a compris la consigne.",
        "S'il se sent découragé, fatigué ou inquiet.",
        "Quelle aide concrète lui permettrait de commencer.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : l'enfant a besoin d'une première action précise plutôt que d'un encouragement général.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il a compris les mots mais pas le début de la tâche.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : l'encouragement lui met une pression de réussite, mais ce n'est pas certain.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "L'adulte peut demander : « Tu veux que je lise la première consigne avec toi ou que je montre le premier exemple ? »",
      shortAnswer: "On fait juste la première étape ensemble.",
      directAnswer:
        "Je vais t'aider à commencer : lisons la consigne puis faisons le premier exemple.",
      softAnswer:
        "Tu n'as pas besoin de tout réussir d'un coup. On commence par une petite partie.",
      professionalAnswer:
        "Proposition éducative : remplacer l'encouragement général par une aide concrète et limitée.",
      boundaryAnswer:
        "On ne force pas toute la tâche maintenant. On choisit une première étape possible.",
      voiceShortVersion: "On commence par une petite étape.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "ecole-camarade-tes-chelou",
    title: "Un camarade dit à la récré : « T'es chelou toi »",
    category: "ecole",
    context: "ecole",
    direction: "enfant-adulte",
    inputText:
      "À la récré, un camarade m'a regardé quand je tournais sur moi-même et il a dit : « T'es chelou toi ». Les autres ont rigolé.",
    result: {
      original:
        "À la récré, un camarade m'a regardé quand je tournais sur moi-même et il a dit : « T'es chelou toi ». Les autres ont rigolé.",
      clearTranslation:
        "Le camarade dit que ton comportement lui paraît inhabituel. Le rire des autres peut faire mal. Tu as le droit de chercher un adulte si tu te sens humilié ou en danger.",
      literalMeaning:
        "Il te dit que tu lui sembles étrange à ce moment-là.",
      possibleSocialMeaning:
        "Dans une cour, certains enfants commentent ce qu'ils ne comprennent pas. Cela peut être une moquerie, une maladresse ou une tentative de faire rire les autres. Ce n'est pas à toi de rester seul avec ça.",
      certain: [
        "Il a commenté ton comportement.",
        "Les autres ont ri.",
        "La scène s'est passée à la récré.",
      ],
      uncertain: [
        "S'il voulait surtout faire rire le groupe.",
        "Si les autres ont ri par habitude ou par gêne.",
        "Si cela se répète souvent.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance moyenne) : il ne comprend pas ton geste et l'a commenté de façon blessante.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 2 (confiance prudente) : il cherche peut-être à se faire remarquer devant les autres.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : cela peut devenir du harcèlement si ça se répète, mais il faut observer la répétition.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux dire à un adulte : « On s'est moqué de moi à la récré et je veux de l'aide. »",
      shortAnswer: "Arrête, ça ne me fait pas rire.",
      directAnswer:
        "Je n'aime pas qu'on parle de moi comme ça. Je vais voir un adulte.",
      softAnswer:
        "Je faisais juste un geste qui m'aide. Merci de ne pas te moquer.",
      professionalAnswer:
        "Formulation pour adulte : l'enfant a besoin d'un adulte référent pour sécuriser la situation et observer si cela se répète.",
      boundaryAnswer:
        "Si tu recommences, je vais en parler à un adulte de la cour.",
      voiceShortVersion: "Arrête, ça ne me fait pas rire.",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 8,
    ageMax: 15,
    sensitive: "tres-sensible",
  },
  {
    id: "administration-caf-pieces-huitaine",
    title: "La CAF demande des pièces justificatives sous huitaine",
    category: "administration",
    context: "administration",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai reçu un message CAF : « Veuillez fournir les pièces justificatives sous huitaine, sans quoi votre dossier ne pourra pas être traité ». Je ne comprends pas le délai.",
    result: {
      original:
        "J'ai reçu un message CAF : « Veuillez fournir les pièces justificatives sous huitaine, sans quoi votre dossier ne pourra pas être traité ». Je ne comprends pas le délai.",
      clearTranslation:
        "« Sous huitaine » veut dire dans les huit jours. Le message indique que le dossier attend des documents et que le traitement peut être bloqué si rien n'est envoyé.",
      literalMeaning:
        "La CAF demande des documents justificatifs à envoyer dans un délai de huit jours.",
      possibleSocialMeaning:
        "Le ton administratif peut sembler froid. Il sert surtout à indiquer une règle de traitement : sans les documents, l'agent ne peut probablement pas avancer.",
      certain: [
        "Des documents sont demandés.",
        "Le délai annoncé est de huit jours.",
        "Le dossier dépend de l'envoi des pièces.",
      ],
      uncertain: [
        "Quels documents exacts manquent si le message n'est pas détaillé.",
        "Si un délai supplémentaire est possible.",
        "Si le dossier sera suspendu ou seulement retardé.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : la CAF attend des pièces précises pour continuer le traitement.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : le message est automatique ou standardisé.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : un délai peut être négociable, mais il faut demander directement.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux écrire : « Pouvez-vous me préciser la liste exacte des pièces manquantes et la date limite d'envoi ? »",
      shortAnswer: "Merci de me préciser les pièces manquantes et la date limite.",
      directAnswer:
        "Je souhaite compléter mon dossier. Pouvez-vous indiquer clairement les documents attendus ?",
      softAnswer:
        "Bonjour, je veux régulariser rapidement. Pourriez-vous me confirmer les pièces exactes à fournir ?",
      professionalAnswer:
        "Bonjour, merci de m'indiquer la liste des justificatifs manquants, la date limite et le mode d'envoi accepté.",
      boundaryAnswer:
        "Je peux fournir les documents, mais j'ai besoin d'une liste précise pour éviter une erreur d'envoi.",
      voiceShortVersion: "Quelles pièces manquent et pour quelle date ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
  {
    id: "administration-medecin-voir-evolution",
    title: "Un médecin dit « On va voir comment ça évolue »",
    category: "administration",
    context: "administration",
    direction: "neurotypique-neuroatypique",
    inputText:
      "Après une consultation, le médecin m'a dit : « On va voir comment ça évolue ». Je ne sais pas si je dois m'inquiéter ou attendre.",
    result: {
      original:
        "Après une consultation, le médecin m'a dit : « On va voir comment ça évolue ». Je ne sais pas si je dois m'inquiéter ou attendre.",
      clearTranslation:
        "Cette phrase signifie souvent que le médecin veut observer les changements avant de décider de la suite. Elle ne veut pas automatiquement dire que la situation est grave.",
      literalMeaning:
        "Le médecin propose d'attendre pour observer l'évolution des symptômes ou de la situation.",
      possibleSocialMeaning:
        "En médecine, certains signes doivent être suivis dans le temps. Le médecin peut estimer qu'une action immédiate n'est pas nécessaire, tout en gardant une surveillance.",
      certain: [
        "Le médecin ne propose pas d'action immédiate dans cette phrase.",
        "Il parle d'une évolution à observer.",
        "Tu as besoin de repères concrets.",
      ],
      uncertain: [
        "Quels signes doivent alerter.",
        "Dans quel délai il faut reconsulter.",
        "Si des examens sont prévus plus tard.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : le médecin pense qu'une surveillance suffit pour l'instant.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : il manque du recul pour choisir la suite.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : il envisage plusieurs options mais attend un signe plus clair.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux demander : « Quels signes doivent m'amener à vous rappeler ou à consulter rapidement ? »",
      shortAnswer: "Quels signes doivent m'inquiéter ?",
      directAnswer:
        "J'ai besoin de critères concrets : quand est-ce que je dois reconsulter ?",
      softAnswer:
        "D'accord. Pour me rassurer, pouvez-vous me dire quoi surveiller et pendant combien de temps ?",
      professionalAnswer:
        "Merci de préciser les signes d'alerte, le délai de surveillance et la marche à suivre si cela change.",
      boundaryAnswer:
        "Je peux attendre, mais j'ai besoin d'instructions claires pour savoir quand demander de l'aide.",
      voiceShortVersion: "Qu'est-ce que je dois surveiller ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "sensible",
  },
  {
    id: "administration-banquier-etudier-dossier",
    title: "Un banquier dit « On va étudier votre dossier »",
    category: "administration",
    context: "administration",
    direction: "neurotypique-neuroatypique",
    inputText:
      "J'ai demandé un prêt à ma banque. Le conseiller a dit : « On va étudier votre dossier et on revient vers vous ». Je ne sais pas si c'est positif.",
    result: {
      original:
        "J'ai demandé un prêt à ma banque. Le conseiller a dit : « On va étudier votre dossier et on revient vers vous ». Je ne sais pas si c'est positif.",
      clearTranslation:
        "La phrase signifie que la banque n'a pas encore décidé. Elle annonce une étape d'examen, pas une acceptation ni un refus.",
      literalMeaning:
        "La banque va analyser les éléments du dossier puis te donner une réponse plus tard.",
      possibleSocialMeaning:
        "Dans une banque, ce type de phrase est souvent standard. Le conseiller peut ne pas avoir le pouvoir de répondre immédiatement ou avoir besoin d'une validation interne.",
      certain: [
        "La décision n'est pas donnée maintenant.",
        "Le dossier va être étudié.",
        "La banque prévoit de revenir vers toi.",
      ],
      uncertain: [
        "Si la réponse sera favorable.",
        "Le délai exact de réponse.",
        "Les critères qui poseront éventuellement question.",
      ],
      hypotheses: [
        hypothesis(
          "Hypothèse 1 (confiance prudente) : le conseiller suit la procédure normale d'analyse.",
          "prudente"
        ),
        hypothesis(
          "Hypothèse 2 (confiance moyenne) : il manque une validation ou des pièces avant une réponse.",
          "moyenne"
        ),
        hypothesis(
          "Hypothèse 3 (confiance faible) : certains éléments du dossier doivent être vérifiés plus attentivement.",
          "faible"
        ),
      ],
      clarifyingQuestion:
        "Tu peux demander : « Quel est le délai habituel de réponse et quelles pièces pourraient manquer ? »",
      shortAnswer: "Merci. Quel délai de réponse prévoir ?",
      directAnswer:
        "Pouvez-vous me dire quand j'aurai une réponse et si mon dossier est complet ?",
      softAnswer:
        "D'accord, merci. Pour m'organiser, pouvez-vous me donner une estimation du délai ?",
      professionalAnswer:
        "Merci de confirmer la complétude du dossier, le délai d'étude et la prochaine étape.",
      boundaryAnswer:
        "Je peux attendre l'étude, mais j'ai besoin d'une date de retour ou d'un point d'étape clair.",
      voiceShortVersion: "Quel délai de réponse prévoir ?",
    },
    reviewedBy: "brouillon",
    addedAt: ADDED_AT,
    ageMin: 18,
    ageMax: 99,
    sensitive: "standard",
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}

export function getScenariosByCategory(category: Scenario["category"]): Scenario[] {
  return SCENARIOS.filter((scenario) => scenario.category === category);
}
