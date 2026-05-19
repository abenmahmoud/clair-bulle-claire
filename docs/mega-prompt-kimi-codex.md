# Mega prompt agent code - Clair / Bulle Claire

Ce prompt est pret a donner a Kimi, Claude Code, Cursor, Codex, Netlify Agent ou tout autre agent de code.

Repo GitHub: https://github.com/abenmahmoud/clair-bulle-claire

## Role

Tu es un agent de code senior, avec une sensibilite produit, UX premium, accessibilite cognitive, securite enfants et SaaS mobile-first.

Tu travailles sur **Clair**, une PWA de clarification sociale et cognitive, avec une declinaison enfant / education appelee **Bulle Claire**.

L'objectif n'est pas de creer un simple clone de ChatGPT. L'objectif est de creer une experience structuree, calme, rassurante, ethique et monétisable.

## Contexte produit

Clair aide a traduire l'implicite social en langage clair.

L'application aide plusieurs publics:

- adultes neuroatypiques;
- personnes TSA/TDAH/hypersensibles/anxieuses socialement;
- parents;
- enseignants;
- AESH;
- educateurs;
- enfants accompagnes;
- structures educatives ou medico-sociales plus tard.

Le produit doit fonctionner comme un traducteur social bidirectionnel:

1. Neurotypique vers neuroatypique:
   - expliquer les sous-entendus;
   - rendre l'implicite explicite;
   - separer faits, hypotheses et incertitudes.
2. Neuroatypique vers neurotypique:
   - aider a formuler sans masking force;
   - proteger les limites personnelles;
   - proposer des messages socialement compris sans nier le besoin reel.
3. Adulte vers enfant:
   - reformuler les consignes floues, autoritaires ou abstraites en langage clair.
4. Enfant vers adulte:
   - aider un enfant a exprimer ce qu'il ressent ou a raconter une situation.

## Mission de cette premiere version

Construire une **PWA mobile-first statique et premium**, sans backend obligatoire au depart.

La premiere version doit etre une demo fonctionnelle et presentable:

- interface moderne;
- navigation mobile;
- ecrans principaux;
- resultats simules;
- historique local;
- boutons utiles;
- mode enfant artistique;
- mode parent / enseignant;
- architecture prete pour brancher l'IA ensuite.

Ne branche pas encore Supabase ni l'API IA sauf si c'est explicitement demande dans une etape ulterieure.

## Documents a lire avant de coder

Lis d'abord:

- `README.md`
- `docs/roadmap-creation-v1.md`
- `docs/agent-handoff.md` si present

Respecte la roadmap. Si tu modifies une decision produit, explique pourquoi dans `docs/agent-handoff.md`.

## Stack technique cible

Utilise:

- Next.js App Router;
- TypeScript;
- Tailwind CSS;
- composants React reutilisables;
- PWA basic manifest;
- localStorage pour historique prototype;
- lucide-react pour les icones si disponible;
- pas de backend au debut.

Structure recommandee:

```txt
app/
  page.tsx
  layout.tsx
  globals.css
  clarify/page.tsx
  respond/page.tsx
  child/page.tsx
  educator/page.tsx
  history/page.tsx
  privacy/page.tsx
components/
  ui/
  layout/
  feature/
lib/
  mock-data.ts
  analysis.ts
  storage.ts
  constants.ts
types/
public/
  manifest.json
  icons/
docs/
```

## Ecrans V1 obligatoires

### 1. Accueil

Objectif: donner immediatement envie d'utiliser le produit.

Actions principales:

- `Comprendre quelqu'un`
- `M'aider a repondre`
- `Parler / dicter`
- `Mode enfant`
- `Parent / enseignant`
- `Historique`

Texte court:

> Transforme une phrase floue en message clair, prudent et utilisable.

Ne pas faire une landing page marketing vide. Le premier ecran doit etre l'app.

### 2. Clarifier une situation

Champs:

- zone texte;
- bouton micro visuel, meme si non fonctionnel au depart;
- sens de traduction:
  - neurotypique vers neuroatypique;
  - neuroatypique vers neurotypique;
  - adulte vers enfant;
  - enfant vers adulte;
- contexte:
  - travail;
  - couple;
  - famille;
  - amitie;
  - ecole;
  - administration;
  - inconnu.

Bouton principal:

- `Clarifier`

### 3. Resultat d'analyse

Afficher en cartes:

- `Traduction claire`
- `Ce qui est sur`
- `Ce qui est incertain`
- `Hypotheses prudentes`
- `Question a poser`
- `Reponse courte`
- `Reponse douce`
- `Reponse avec limite`

Boutons:

- `Copier`
- `Simplifier`
- `Reponse courte`
- `Sauvegarder`
- `Lire`

### 4. M'aider a repondre

L'utilisateur ecrit ce qu'il veut dire.

L'app propose:

- version courte;
- version directe;
- version douce;
- version professionnelle;
- version avec limite personnelle;
- version tres claire.

### 5. Bulle Claire enfant

Interface differente mais coherente.

Elements:

- pictogrammes ou icones;
- cartes emotionnelles;
- phrases courtes;
- gros boutons;
- pas de jargon medical;
- pas de chat libre trop ouvert.

Boutons:

- `Je suis triste`
- `Je n'ai pas compris`
- `Aide-moi a dire non`
- `Aide-moi a demander a jouer`
- `Aide-moi a expliquer a un adulte`

Exemple:

Situation:

> Personne ne veut jouer avec moi.

Reponse:

> Ca peut faire mal au coeur. On va chercher ce qui s'est passe exactement. Est-ce qu'un enfant a dit non, ou est-ce que tu n'as pas encore demande ?

### 6. Parent / enseignant

Actions:

- `Rendre une consigne plus claire`
- `Expliquer une regle`
- `Preparer une transition`
- `Desamorcer une crise`
- `Creer un script social`
- `Aider un enfant a raconter`

Exemple:

Phrase adulte:

> Depeche-toi un peu.

Reformulation:

> Dans 5 minutes, nous mettons les chaussures. Ensuite, nous sortons. Je vais t'aider etape par etape.

### 7. Historique / confidentialite

Inclure:

- analyses sauvegardees localement;
- favoris;
- preference `ne pas sauvegarder`;
- bouton `Effacer l'historique`;
- lien vers confidentialite;
- message rassurant sur le mode invite.

## Design system

Style:

- premium;
- calme;
- tres lisible;
- mobile-first;
- inspire Notion, Linear, Calm, Headspace, mais plus adulte et SaaS;
- mode enfant artistique, pas bebe.

Couleurs:

```css
--bg: #F8F6F0;
--surface: #FFFFFF;
--text: #1F2933;
--muted: #667085;
--border: #E4E0D8;
--primary: #3563E9;
--primary-soft: #EAF0FF;
--sage: #7BAE9D;
--coral: #F29B7F;
--amber: #F3B44E;
--danger: #C2413A;
```

Regles UI:

- cartes adultes avec radius 8px maximum;
- boutons lisibles, hauteur tactile confortable;
- textes jamais trop longs dans une carte;
- navigation basse mobile;
- composants stables, sans layout shift;
- pas de surcharge visuelle;
- pas d'orbes, blobs ou decorations gratuites;
- pas de design hopital;
- pas de design enfantin bebe;
- contraste fort;
- taille texte minimum 16px;
- dark mode si possible mais pas obligatoire V1.

## Composants attendus

Creer des composants clairs:

- `AppShell`
- `BottomNav`
- `ModeCard`
- `ContextPicker`
- `DirectionSelector`
- `TextInputPanel`
- `AnalysisCard`
- `HypothesisCard`
- `ResponseVariantCard`
- `ChildEmotionTile`
- `ChildPhraseCard`
- `EducatorToolCard`
- `PrivacyPanel`
- `CopyButton`

## Donnees mockees

Prevoir des exemples:

- `On verra.`
- `Fais comme tu veux.`
- `C'est interessant comme idee...`
- `Je ne veux pas venir, ca me fatigue.`
- `Personne ne veut jouer avec moi.`
- `Depeche-toi un peu.`

Le prototype doit generer une analyse simulee structuree a partir de ces exemples, et un fallback generique pour les autres textes.

## Format d'analyse standard

Chaque analyse doit contenir:

```ts
type AnalysisResult = {
  original: string;
  clearTranslation: string;
  literalMeaning: string;
  possibleSocialMeaning: string;
  certain: string[];
  uncertain: string[];
  hypotheses: Array<{
    text: string;
    confidence: "faible" | "moyenne" | "prudente";
  }>;
  clarifyingQuestion: string;
  shortAnswer: string;
  directAnswer: string;
  softAnswer: string;
  professionalAnswer: string;
  boundaryAnswer: string;
  childVersion?: string;
  voiceShortVersion: string;
  selfRegulationTip?: string;
};
```

## Garde-fous ethique obligatoires

Ne jamais ecrire:

- "Cette personne pense que..."
- "Il te rejette."
- "Elle ne t'aime pas."
- "Il veut te manipuler."

Toujours preferer:

- "Une possibilite est que..."
- "Ce n'est pas sur."
- "Il manque des informations."
- "Tu peux verifier en demandant..."
- "Voici une reponse prudente."
- "Voici une reponse qui protege tes limites."

L'interface doit rappeler:

> Clair propose des hypotheses prudentes. L'intention reelle d'une personne ne peut pas etre connue avec certitude.

## Securite enfant

Le mode enfant doit:

- etre guide;
- eviter les conversations libres dangereuses;
- proposer de parler a un adulte de confiance en cas de peur, violence, harcelement ou situation sexuelle;
- ne pas demander de diagnostic;
- ne pas demander de nom complet;
- ne pas demander le nom de l'ecole;
- ne pas stocker de donnees serveur en V1.

Message danger simple:

> Si quelqu'un te fait peur, te menace ou te touche d'une facon qui te met mal a l'aise, parle maintenant a un adulte de confiance.

## Accessibilite cognitive

Appliquer:

- peu d'options visibles a la fois;
- titres explicites;
- boutons avec verbes d'action;
- etats actifs visibles;
- cartes courtes;
- pas de phrases culpabilisantes;
- possibilite de simplifier;
- mode surcharge avec une seule phrase simple.

## Critere de qualite

La V1 est reussie si:

- l'application est belle au premier regard;
- on comprend quoi faire en moins de 10 secondes;
- le mode enfant est attirant sans etre infantilisant;
- les reponses sont prudentes;
- les cartes sont lisibles sur mobile;
- le code est propre;
- la future API IA peut etre branchee sans tout refaire.

## Protocole de collaboration Kimi / Codex

Important: plusieurs agents peuvent travailler sur ce repo.

Avant de commencer:

1. Lire `docs/agent-handoff.md`.
2. Lire `docs/roadmap-creation-v1.md`.
3. Verifier l'etat Git.
4. Ne pas supprimer les decisions produit sans raison.

Pendant le travail:

- faire des changements scopes;
- ne pas refactorer inutilement;
- ne pas ecraser le travail d'un autre agent;
- garder le design coherent;
- tester localement si possible.

Avant de finir:

1. Mettre a jour `docs/agent-handoff.md` avec:
   - ce qui a ete fait;
   - fichiers modifies;
   - commandes lancees;
   - resultats;
   - bugs connus;
   - prochaine action recommandee.
2. Indiquer si le build passe.
3. Indiquer si l'app a ete verifiee dans le navigateur.

## Premiere tache recommandee pour l'agent

Construis la premiere PWA statique.

Etapes:

1. Initialiser Next.js + TypeScript + Tailwind.
2. Creer le design system global.
3. Creer la navigation basse mobile.
4. Creer les 7 ecrans.
5. Ajouter les donnees mockees.
6. Ajouter localStorage pour historique.
7. Ajouter boutons copier / simplifier / sauvegarder.
8. Ajouter manifest PWA.
9. Lancer le build.
10. Mettre a jour `docs/agent-handoff.md`.

## Contraintes de livraison

Ne termine pas avec une app non lanceable.

A la fin, fournir:

- liste des fichiers changes;
- commandes executees;
- resultat du build;
- URL locale si dev server lance;
- prochaine action recommandee.

