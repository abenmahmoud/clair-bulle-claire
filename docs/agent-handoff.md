# Agent handoff - Clair / Bulle Claire

Ce fichier sert a alterner proprement entre Codex, Kimi ou un autre agent.

## Etat actuel

Date: 2026-05-19  
Repo: https://github.com/abenmahmoud/clair-bulle-claire  
Branche distante initialisee: `main`  
Branche locale actuelle: `master` poussee vers `main`

## Dernier travail effectue

- Creation du document de roadmap V1.
- Creation du README initial.
- Creation du `.gitignore`.
- Premier commit local: `3b31ea7 Initial product roadmap`.
- Push vers GitHub: `master:main`.
- Ajout du mega prompt pour agent de code.
- Ajout de ce fichier de passation.

## Fichiers importants

- `README.md`
- `docs/roadmap-creation-v1.md`
- `docs/mega-prompt-kimi-codex.md`
- `docs/agent-handoff.md`

## Decisions produit valides

- Nom de travail application adulte/pro: `Clair`.
- Declinaison enfant/education: `Bulle Claire`.
- Cible initiale: parents, adultes neuroatypiques, enseignants, AESH, educateurs, associations.
- Education nationale: cible compatible V2/V3, pas premier canal commercial.
- V1: PWA statique premium sans backend obligatoire.
- Stack cible: Next.js, TypeScript, Tailwind, Vercel, Supabase plus tard.
- IA texte seulement apres prototype UI.
- Voix continue type Gemini Live hors MVP initial.

## Prochaine action recommandee

Construire la premiere PWA statique:

1. Initialiser Next.js + TypeScript + Tailwind.
2. Creer les 7 ecrans MVP.
3. Creer les composants UI.
4. Ajouter les exemples mockes.
5. Ajouter historique local.
6. Verifier responsive mobile.
7. Lancer un build.

## Points d'attention

- Ne pas affirmer connaitre l'intention reelle d'une personne.
- Ne pas poser de diagnostic.
- Ne pas infantiliser.
- Ne pas pousser au masking.
- Mode enfant guide et securise.
- Ne pas stocker de donnees sensibles en V1.

## Commandes deja lancees

```txt
git init
git add -A
git commit -m "Initial product roadmap"
git push -u https://github.com/abenmahmoud/clair-bulle-claire.git master:main
```

## Notes techniques

- Le remote Git n'a pas pu etre ajoute dans `.git/config` a cause d'une permission Windows sur `.git/config`.
- Le push a reussi en utilisant directement l'URL distante.
- Pour les prochains pushs, utiliser si besoin:

```txt
git push https://github.com/abenmahmoud/clair-bulle-claire.git master:main
```

