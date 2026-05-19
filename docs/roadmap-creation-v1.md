# Roadmap de creation V1 - Clair / Bulle Claire

Date: 2026-05-19  
Statut: document de pilotage initial  
Objectif: construire un MVP SaaS premium, mobile-first, ethique et compatible avec un usage famille / education / pro.

## 1. Decision produit de depart

Nom de travail principal: **Clair**  
Declinaison enfant / ecole: **Bulle Claire**  
Positionnement: assistant de clarification sociale, cognitive et relationnelle.

Promesse courte:

> Traduire l'implicite social en langage clair.

Promesse education:

> Aider les eleves et les adultes a transformer les malentendus en phrases claires, sans diagnostic, sans jugement, sans stigmatisation.

Ce que le produit n'est pas:

- pas un outil medical;
- pas un diagnostic TSA, TDAH ou anxiete;
- pas un remplacement parent, enseignant, AESH, psychologue ou medecin;
- pas une IA qui devine les intentions des autres;
- pas une machine a pousser au masking.

Regle absolue:

> L'application separe toujours les faits, les hypotheses, les incertitudes, les emotions et les reponses possibles.

## 2. Strategie marche avec tes moyens

Le meilleur chemin n'est pas de viser directement l'Education nationale comme premier client. C'est trop lent, trop administratif, et trop sensible sur les donnees mineurs.

Strategie recommandee:

1. Lancer un MVP B2C / B2C pro:
   - parents;
   - adultes neuroatypiques;
   - enseignants;
   - AESH;
   - educateurs;
   - associations;
   - cabinets independants.
2. Prouver l'usage:
   - 100 a 300 testeurs;
   - 30 a 100 utilisateurs actifs hebdomadaires;
   - 20 a 50 personnes pretes a payer.
3. Construire ensuite une version "Bulle Claire Education":
   - sans donnees nominatives obligatoires;
   - mode invite;
   - fiches imprimables;
   - securite mineurs;
   - dossier RGPD.
4. Aller vers structures, associations, etablissements, collectivites.

Objectif realiste phase 1:

- construire une demo pro en 2 semaines;
- brancher l'IA en semaine 3;
- avoir une beta utilisable en 4 a 6 semaines;
- lancer une waitlist et tester le prix.

## 3. Architecture pro recommandee

### Choix conseille pour V1

Stack:

- Frontend: Next.js + TypeScript + Tailwind CSS
- UI: composants maison premium, eventuellement shadcn/ui
- Deploiement: Vercel
- Base de donnees: Supabase Postgres
- Auth: Supabase Auth
- IA texte: API LLM cote serveur
- Voix basique: Web Speech API pour lecture vocale si compatible navigateur
- PWA: manifest, offline partiel, installation mobile

Pourquoi ce choix:

- rapide a developper;
- rendu tres pro;
- peu de maintenance serveur;
- securite plus simple au debut;
- compatible SaaS;
- scalable si le produit prend.

### Role de Vercel

Vercel heberge:

- l'application Next.js;
- les routes API;
- les pages publiques;
- la landing page;
- les endpoints IA securises;
- la PWA.

Avantages:

- mise en ligne rapide;
- previews automatiques;
- HTTPS simple;
- performance frontend;
- workflow moderne.

Limites:

- peut devenir cher avec beaucoup d'usage;
- pas ideal pour gros traitements longs;
- attention aux limites serverless et au streaming.

### Role de Supabase

Supabase gere:

- utilisateurs;
- profils;
- historiques optionnels;
- favoris;
- preferences;
- feedbacks;
- flags securite;
- consentements.

Points obligatoires:

- RLS activee sur toutes les tables utilisateur;
- mode invite sans stockage serveur;
- suppression des donnees;
- aucune donnee enfant sensible obligatoire;
- pas d'audio brut stocke par defaut.

### Role possible du VPS

Le VPS n'est pas necessaire au debut, mais il devient utile en V2.

Cas d'usage VPS:

- proxy IA avance;
- files de traitement;
- generation PDF;
- OCR;
- jobs planifies;
- monitoring interne;
- logs applicatifs anonymises;
- API dediee si Vercel devient trop limite;
- hebergement self-hosted de services secondaires.

Stack VPS possible:

- Docker;
- Node.js ou Fastify/NestJS;
- PostgreSQL seulement si on quitte Supabase plus tard;
- Redis pour queue/cache;
- Caddy ou Traefik;
- backups automatiques;
- monitoring Uptime Kuma / Grafana simple.

Decision:

> V1: Vercel + Supabase.  
> V2: ajouter VPS pour les briques lourdes.  
> V3: architecture hybride SaaS plus robuste.

## 4. Roadmap globale

### Phase 0 - Cadrage dur, 2 a 3 jours

Objectif: verrouiller le produit minimum vendable.

Livrables:

- nom de travail;
- cible prioritaire;
- promesse;
- liste P0/P1/P2;
- architecture;
- regles de securite IA;
- premiers exemples;
- landing page copy.

Decisions:

- cible prioritaire: parents + adultes neuroatypiques + enseignants/AESH independants;
- education nationale: cible V2/V3, pas premier canal;
- voix continue: hors MVP;
- compte enfant libre: hors MVP;
- mode invite: obligatoire.

Definition of done:

- on peut expliquer le produit en 30 secondes;
- on sait ce qui est inclus et exclu;
- on connait les 7 ecrans maximum;
- on peut commencer le design.

### Phase 1 - UX/UI premium, semaine 1

Objectif: concevoir une interface moderne, calme, attirante et accessible.

Ecrans V1:

1. Accueil
2. Clarifier une situation
3. Resultat d'analyse
4. M'aider a repondre
5. Bulle Claire enfant
6. Parent / enseignant
7. Historique / confidentialite

Navigation mobile:

- barre basse fixe;
- onglets: Accueil, Clarifier, Repondre, Enfant, Profil;
- bouton central plus visible: "Clarifier";
- acces rapide au mode surcharge: "Une phrase simple".

Composants:

- `ModeCard`
- `ContextPicker`
- `DirectionSelector`
- `TextInputWithMic`
- `AnalysisCard`
- `HypothesisList`
- `ConfidenceBadge`
- `CopyButton`
- `SimplifyButton`
- `SpeakButton`
- `SafetyNotice`
- `EmotionTile`
- `ChildPhraseCard`
- `TeacherToolCard`
- `PrivacyToggle`

Design system:

- style: premium calme, SaaS adulte, artistique leger pour enfant;
- fond clair doux;
- cartes lisibles;
- coins 8px maximum pour l'interface adulte;
- boutons grands et nets;
- aucune surcharge decorative;
- animations lentes et optionnelles;
- contraste fort;
- textes courts.

Palette proposee:

- `--bg`: #F8F6F0
- `--surface`: #FFFFFF
- `--text`: #1F2933
- `--muted`: #667085
- `--border`: #E4E0D8
- `--primary`: #3563E9
- `--primary-soft`: #EAF0FF
- `--sage`: #7BAE9D
- `--coral`: #F29B7F
- `--amber`: #F3B44E
- `--danger`: #C2413A

Typographie:

- Sans moderne: Inter, Geist ou Satoshi;
- taille minimum mobile: 16px;
- titres compacts;
- aucune police enfantine;
- pas de texte trop long dans les cartes.

Mode enfant:

- nom: Bulle Claire;
- pictogrammes simples;
- cartes emotionnelles;
- phrases courtes;
- pas de chat libre non encadre;
- bouton micro possible mais avec supervision adulte;
- pas de gamification addictive;
- pas de classement;
- badges doux non competitifs.

Definition of done:

- maquette mobile claire;
- parcours principal comprehensible sans explication;
- mode enfant non infantilisant;
- design presentable a une structure.

### Phase 2 - Prototype PWA sans backend, semaine 2

Objectif: obtenir une demo cliquable et partageable.

Fonctions:

- accueil complet;
- formulaire de clarification;
- resultats simules;
- copier une reponse;
- simplifier une reponse;
- mode enfant avec cartes;
- mode parent / enseignant;
- historique local temporaire;
- PWA installable;
- responsive mobile et desktop.

Donnees:

- tout en local;
- pas de compte;
- pas de stockage serveur;
- exemples integres.

Contenus d'exemple:

- "On verra."
- "Fais comme tu veux."
- "C'est interessant comme idee..."
- "Personne ne veut jouer avec moi."
- "Depeche-toi un peu."
- "Je ne veux pas venir, ca me fatigue."

Definition of done:

- l'app s'ouvre sur mobile;
- les ecrans principaux existent;
- le design donne une impression premium;
- on peut faire une demo de 3 minutes.

### Phase 3 - IA texte, semaine 3

Objectif: brancher une IA utile, prudente et stable.

Routes API:

- `POST /api/analyze`
- `POST /api/rewrite`
- `POST /api/child-mode`
- `POST /api/teacher-mode`
- `POST /api/safety-check`
- `POST /api/feedback`

Format de reponse IA standard:

```json
{
  "original": "...",
  "literalMeaning": "...",
  "possibleSocialMeaning": "...",
  "certain": ["..."],
  "uncertain": ["..."],
  "hypotheses": [
    {
      "text": "...",
      "confidence": "faible | moyenne | prudente"
    }
  ],
  "signalsToObserve": ["..."],
  "misinterpretationRisk": "...",
  "clarifyingQuestion": "...",
  "shortAnswer": "...",
  "directAnswer": "...",
  "softAnswer": "...",
  "professionalAnswer": "...",
  "boundaryAnswer": "...",
  "childVersion": "...",
  "voiceShortVersion": "...",
  "selfRegulationTip": "..."
}
```

Regles prompt systeme:

- ne jamais affirmer connaitre l'intention reelle d'autrui;
- toujours proposer plusieurs hypotheses;
- toujours dire ce qui est incertain;
- proposer une question de verification;
- ne pas diagnostiquer;
- ne pas infantiliser;
- ne pas pousser au masking;
- proteger les limites personnelles;
- detecter danger, harcelement, violence, abus, crise suicidaire;
- recommander aide humaine en cas de risque.

Modeles:

- modele rapide et economique pour 90% des requetes;
- modele plus fort seulement pour cas longs, sensibles ou complexes;
- classification securite avant ou pendant la generation.

Definition of done:

- reponses coherentes;
- format stable;
- erreurs gerees;
- limite de cout par utilisateur;
- refus prudents pour cas dangereux.

### Phase 4 - Comptes, Supabase et confidentialite, semaine 4

Objectif: transformer la demo en produit beta.

Fonctions:

- auth email magic link;
- mode invite;
- sauvegarde optionnelle;
- favoris;
- historique des analyses;
- preferences de langage;
- suppression des donnees;
- feedback utilisateur.

Tables MVP:

- `profiles`
- `analyses`
- `saved_responses`
- `user_preferences`
- `safety_flags`
- `feedback`
- `consent_records`

Regles securite:

- RLS sur chaque table;
- chaque utilisateur ne lit que ses donnees;
- invite = pas de stockage serveur;
- donnees sensibles minimales;
- option "ne pas sauvegarder cette analyse";
- bouton "supprimer mon historique";
- logs anonymises.

Definition of done:

- utilisateur peut sauvegarder/supprimer;
- les donnees ne fuitent pas entre comptes;
- le mode invite fonctionne;
- page confidentialite claire.

### Phase 5 - Bulle Claire Education, semaine 5

Objectif: creer la couche artistique et attirante pour eleves.

Fonctions:

- `Decodeur de bulles`
- `Meteo interieure`
- `Cartes de phrases`
- `Aide-moi a dire non`
- `Aide-moi a demander a jouer`
- `Aide-moi a raconter a un adulte`
- `Créer une fiche pour l'adulte`

Interface:

- grandes cartes;
- pictogrammes;
- choix limites;
- voix de lecture;
- phrases tres courtes;
- bouton "Je n'ai pas compris";
- bouton "Je veux une phrase simple";
- bouton "Appeler un adulte de confiance" si danger.

Bibliotheque ecole:

- recre;
- cantine;
- bruit;
- consigne;
- changement de programme;
- camarade qui refuse de jouer;
- moquerie;
- conflit;
- demande d'aide;
- dire non;
- parler a l'enseignant.

Definition of done:

- le mode enfant est utilisable sans lecture longue;
- l'adulte peut recuperer une fiche claire;
- aucun diagnostic;
- aucun stockage obligatoire de donnee enfant.

### Phase 6 - Beta, landing, monetisation, semaine 6

Objectif: tester avec de vrais utilisateurs et mesurer la valeur.

Livrables:

- landing page;
- waitlist;
- beta privee;
- analytics respectueux;
- page tarifs;
- page confidentialite;
- kit de presentation PDF;
- formulaire de retour.

Offre:

- gratuit: 5 a 10 clarifications par mois;
- premium individuel: 7,99 a 9,99 EUR/mois;
- famille: 14,99 a 19,99 EUR/mois;
- pro enseignant/AESH: 9,99 a 14,99 EUR/mois;
- association/cabinet: 49 a 149 EUR/mois.

Mesures:

- taux de retour hebdomadaire;
- nombre de reponses copiees;
- nombre de favoris sauvegardes;
- satisfaction apres analyse;
- cas de surcharge emotionnelle;
- taux de conversion waitlist -> beta;
- intention de paiement.

Definition of done:

- au moins 20 testeurs actifs;
- 10 entretiens utilisateurs;
- 5 personnes pretes a payer;
- liste claire des corrections V1.1.

## 5. Backlog priorise

### P0 - Indispensable

- PWA mobile-first;
- accueil avec 3 actions fortes;
- clarification texte;
- m'aider a repondre;
- mode parent / enseignant;
- mode enfant guide;
- format IA structure;
- bouton copier;
- bouton simplifier;
- bouton reponse courte;
- mode invite;
- securite IA;
- page confidentialite;
- historique local ou optionnel.

### P1 - Tres utile

- compte utilisateur;
- favoris;
- historique Supabase;
- lecture vocale;
- preferences de ton;
- bibliotheque de codes sociaux;
- feedback apres reponse;
- export fiche PDF;
- dark mode;
- limite de cout IA.

### P2 - Apres traction

- conversation vocale continue;
- transcription temps reel;
- OCR capture d'ecran;
- extension navigateur;
- simulateur social;
- packs experts;
- espace organisation;
- tableaux de bord anonymises;
- integration ENT/GAR;
- API partenaire.

## 6. Versions produit

### V1 - MVP vendable

Inclut:

- clarification sociale;
- reformulation;
- parent/enseignant;
- enfant guide;
- historique optionnel;
- favoris;
- lecture vocale simple;
- mode invite;
- PWA.

Exclut:

- voix continue type Gemini Live;
- diagnostic;
- compte enfant autonome;
- dashboard institutionnel;
- OCR;
- extension navigateur;
- integration ENT;
- marketplace.

### V2 - Produit fort

Ajouts:

- conversation vocale continue;
- simulateur social;
- bibliotheque de scenarios;
- OCR;
- extension navigateur;
- espace parent;
- espace enseignant;
- fiches PDF;
- scripts sociaux personnalises;
- packs de contenus valides.

Architecture:

- Vercel + Supabase maintenus;
- VPS possible pour OCR, PDF, jobs et proxy IA;
- monitoring plus strict;
- systeme d'abonnement.

### V3 - SaaS institutionnel

Ajouts:

- licences familles;
- licences etablissements;
- licences cabinets;
- organisations;
- tableaux de bord anonymises;
- bibliotheque institutionnelle;
- API;
- integration ENT/GAR si necessaire;
- accompagnement formation;
- contenus experts;
- conformité documentaire avancee.

## 7. Risques majeurs et garde-fous

### Surinterpretation sociale

Solution produit:

- section "ce qui est sur" et "ce qui est incertain";
- badge "intention non verifiable";
- question de verification.

Message utilisateur:

> Je peux proposer des hypotheses, mais je ne peux pas savoir ce que la personne pense vraiment.

### Dependence a l'IA

Solution produit:

- encourager les scripts personnels;
- proposer aide humaine si situation repetee;
- limiter mode conversation continue chez enfants;
- pas de design addictif.

Message utilisateur:

> Cette reponse peut t'aider a clarifier, mais tu peux aussi demander a une personne de confiance.

### Donnees sensibles

Solution produit:

- mode invite;
- suppression facile;
- pas d'audio stocke;
- minimisation;
- chiffrement si besoin V2;
- RLS Supabase.

Message utilisateur:

> Evite d'ajouter des noms complets ou des informations tres personnelles si ce n'est pas necessaire.

### Enfants

Solution produit:

- mode enfant guide;
- pas de chat libre complet;
- consentement adulte pour sauvegarde;
- pas de profil medical;
- detection danger.

Message utilisateur:

> Si quelqu'un te fait peur, te menace ou te touche d'une facon qui te met mal a l'aise, parle a un adulte de confiance maintenant.

### Masking force

Solution produit:

- bouton "proteger ma limite";
- verification anti-excuses excessives;
- reformulations honnetes;
- pas de conseil pour mentir.

Message utilisateur:

> Tu n'es pas oblige de dire oui pour etre poli. On peut trouver une phrase claire et respectueuse.

## 8. Plan technique detaille

### Structure de projet proposee

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
  api/
    analyze/route.ts
    rewrite/route.ts
    safety-check/route.ts
components/
  ui/
  layout/
  feature/
lib/
  ai/
    prompts.ts
    schema.ts
    safety.ts
  supabase/
    client.ts
    server.ts
  constants/
  utils/
types/
public/
  manifest.json
  icons/
docs/
```

### Variables d'environnement

```txt
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

Regle:

- `SUPABASE_SERVICE_ROLE_KEY` jamais cote client;
- `OPENAI_API_KEY` jamais cote client;
- aucune cle dans Git.

### Limites IA

- limite gratuite par invite;
- limite par compte;
- taille maximale du texte;
- refus sur contenu dangereux;
- fallback si IA indisponible;
- journalisation minimale des erreurs.

## 9. Schema Supabase MVP

### `profiles`

Champs:

- `id uuid primary key references auth.users`
- `display_name text`
- `role text`
- `created_at timestamptz`
- `updated_at timestamptz`

Eviter:

- diagnostic medical;
- nom complet obligatoire;
- etablissement scolaire precis.

### `analyses`

Champs:

- `id uuid primary key`
- `user_id uuid nullable`
- `mode text`
- `context text`
- `direction text`
- `input_text text`
- `output_json jsonb`
- `is_saved boolean`
- `created_at timestamptz`

Securite:

- RLS: user_id = auth.uid();
- mode invite non stocke;
- suppression utilisateur.

Eviter:

- audio brut;
- noms complets;
- donnees medicales non necessaires.

### `saved_responses`

Champs:

- `id uuid primary key`
- `user_id uuid`
- `title text`
- `response_text text`
- `category text`
- `created_at timestamptz`

### `user_preferences`

Champs:

- `user_id uuid primary key`
- `language_level text`
- `tone text`
- `reduce_cognitive_load boolean`
- `history_enabled boolean`
- `voice_enabled boolean`
- `dark_mode boolean`

### `safety_flags`

Champs:

- `id uuid primary key`
- `user_id uuid nullable`
- `analysis_id uuid nullable`
- `flag_type text`
- `severity text`
- `action_shown text`
- `created_at timestamptz`

Regle:

- stocker le minimum;
- ne pas stocker le contenu sensible si inutile;
- utile pour audit securite anonymise.

### `feedback`

Champs:

- `id uuid primary key`
- `user_id uuid nullable`
- `analysis_id uuid nullable`
- `rating int`
- `comment text`
- `created_at timestamptz`

### `consent_records`

Champs:

- `id uuid primary key`
- `user_id uuid`
- `consent_type text`
- `version text`
- `accepted_at timestamptz`
- `revoked_at timestamptz nullable`

## 10. Cout et options d'hebergement

### Option A - Prototype economique

- Vercel Hobby;
- Supabase Free;
- OpenAI API avec plafond strict;
- pas de VPS.

Budget indicatif:

- 10 a 50 EUR/mois selon usage IA.

Usage:

- demo;
- beta privee;
- landing;
- premiers tests.

### Option B - MVP pro leger

- Vercel Pro;
- Supabase Pro;
- OpenAI API avec monitoring;
- domaine;
- emails transactionnels basiques.

Budget indicatif:

- 60 a 200 EUR/mois selon usage IA.

Usage:

- beta publique;
- premiers clients;
- produit vendable.

### Option C - Hybride pro

- Vercel pour frontend;
- Supabase pour DB/Auth;
- VPS pour jobs lourds;
- monitoring;
- backups;
- queue.

Budget indicatif:

- 100 a 300+ EUR/mois selon traffic, IA et VPS.

Usage:

- V2;
- OCR;
- PDF;
- organisations;
- controle des couts.

## 11. Planning semaine par semaine

### Semaine 1

- finaliser nom et promesse;
- wireframes;
- design system;
- composants principaux;
- contenus de demo;
- landing copy.

### Semaine 2

- developper PWA statique;
- integrer navigation;
- ecrans principaux;
- resultats simules;
- mode enfant artistique;
- mode parent/enseignant.

### Semaine 3

- brancher API IA;
- prompts systeme;
- format JSON;
- securite danger;
- reponses courtes/simples;
- tests manuels sur 30 cas.

### Semaine 4

- Supabase Auth;
- sauvegarde favoris;
- historique optionnel;
- page confidentialite;
- suppression donnees;
- feedback.

### Semaine 5

- polish UI;
- dark mode;
- lecture vocale;
- fiches ecole;
- export simple;
- tests accessibilite;
- correction responsive.

### Semaine 6

- landing;
- beta;
- analytics respectueux;
- page tarifs;
- kit presentation;
- recrutement testeurs;
- decisions V1.1.

## 12. Prompt pour agent de code - V1 prototype

```txt
Tu es un agent de code senior. Construis une PWA mobile-first appelee "Clair", avec une declinaison enfant "Bulle Claire".

Objectif produit:
Creer un assistant de clarification sociale qui aide a traduire l'implicite social en langage clair, sans diagnostic, sans surinterpretation et sans pousser au masking. L'application doit etre premium, calme, accessible, moderne, utilisable par adultes, parents, enseignants/AESH et enfants accompagnes.

Stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- composants React reutilisables
- PWA basic manifest
- localStorage pour prototype

Ecrans:
1. Accueil
2. Clarifier une situation
3. Resultat d'analyse
4. M'aider a repondre
5. Bulle Claire enfant
6. Parent / enseignant
7. Historique / confidentialite

Fonctions MVP prototype:
- formulaire texte;
- choix du sens de traduction:
  - neurotypique vers neuroatypique
  - neuroatypique vers neurotypique
  - adulte vers enfant
  - enfant vers adulte
- choix contexte:
  - travail
  - couple
  - famille
  - amitie
  - ecole
  - administration
  - inconnu
- resultats simules avec cartes:
  - traduction claire
  - ce qui est sur
  - ce qui est incertain
  - hypotheses prudentes
  - question simple
  - reponse courte
  - reponse douce
  - reponse avec limite
- bouton copier;
- bouton simplifier;
- bouton reponse courte;
- mode enfant avec cartes emotionnelles;
- mode parent/enseignant avec reformulation de consignes;
- historique local optionnel;
- page confidentialite.

Design:
- premium calme, inspire Notion/Linear/Calm mais plus SaaS;
- mobile-first;
- lisibilite forte;
- couleurs:
  - fond #F8F6F0
  - surface #FFFFFF
  - texte #1F2933
  - muted #667085
  - primary #3563E9
  - sage #7BAE9D
  - coral #F29B7F
  - amber #F3B44E
- coins 8px maximum pour cartes adultes;
- pas de surcharge visuelle;
- navigation basse mobile;
- dark mode si possible;
- mode enfant artistique mais pas bebe.

Contraintes ethique:
- ne jamais affirmer connaitre l'intention reelle d'une personne;
- afficher "ce qui est sur" et "ce qui est incertain";
- dire que les hypotheses sont prudentes;
- pas de diagnostic;
- pas de conseil medical;
- pas de manipulation sociale;
- pas de masking force;
- toujours proposer une question de verification;
- en cas de danger, recommander de parler a un adulte de confiance ou aux services d'urgence.

Livrable attendu:
- code complet;
- composants propres;
- app responsive;
- dev server fonctionnel;
- verification navigateur;
- README court avec commandes.
```

## 13. Prochaine action concrete

Prochaine etape recommandee:

1. Valider le nom de travail: `Clair` + `Bulle Claire`.
2. Generer le squelette Next.js.
3. Construire la PWA statique sans IA.
4. Verifier le rendu mobile.
5. Brancher l'IA ensuite.

Decision proposee:

> On commence par coder le prototype PWA statique. L'objectif n'est pas encore la perfection IA, mais une experience premium qui donne envie d'utiliser le produit.
