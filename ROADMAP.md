# Roadmap — Clair / Bulle Claire

Source unique de vérité du projet. Mise à jour à chaque fin de sprint.

**Dernière mise à jour** : 21 mai 2026 (Sprint 7.2 terminé)
**Tag courant** : [`v0.7-sprint7`](https://github.com/abenmahmoud/clair-bulle-claire/releases/tag/v0.7-sprint7)
**Avancement global** : ~32/63 tâches (51%)

---

## ✅ Sprints terminés

| # | Sprint | PR | Tag |
|---|---|---|---|
| 1 | IA réelle + urgences + détresse + légal + footer | #1 #2 #3 #4 | v0.1 |
| 2 | PWA propre + a11y polish + roadmap publique | #5 #6 | v0.2 |
| 3 | Auth Supabase + sync historique multi-appareils | #7 | v0.3 |
| 6 | Tests Vitest + e2e Playwright + CI bloquante + Sentry + Vercel Analytics | #8 #9 #10 | v0.6 |
| 7 | 20 scénarios statiques + renforcement garde-fous | #11 #12 | v0.7 |
| 7.2 | 10 scénarios Bulle Claire + anonymisation RGPD + bandeau source | #13 #14 | v0.7-sprint7 |

---

## 🔴 Prochain sprint — Stabilisation (à valider)

Avant nouveau périmètre fonctionnel, traiter la dette technique :

- [ ] **Lockfile propre** : régénérer `package-lock.json` depuis npmjs.org (purger les 432 entrées `npmmirror.com`)
- [ ] **Branch protection sur `main`** : interdire force-push, exiger PR + CI verte
- [ ] **Secrets GitHub Actions** : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AI_PROVIDER`
- [ ] **Sentry config réelle** : créer projet Sentry + ajouter `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` côté Vercel
- [ ] **Activer Vercel Web Analytics** dans le dashboard projet

---

## 🟠 Sprints planifiés (P1-P2)

| # | Sprint | Objectif | Priorité |
|---|---|---|---|
| 4 | Comité éthique + asso loi 1901 | Crédibilité institutionnelle | P1 |
| 5 | Accessibilité RGAA AA | Lecteur d'écran, OpenDyslexic, taille texte | P1 |
| 8 | Mode pro AESH | Multi-élèves anonymisés, export PDF | P2 |
| 9 | Bibliothèque communautaire | Soumission scénarios par pros validés | P2 |
| 10 | Mode hors-ligne PWA | Service worker complet | P2 |

---

## 🟢 Sprints extra (V2)

| # | Sprint | Objectif |
|---|---|---|
| 11 | Erasmus+ inclusion (EN/ES/IT) | Dimension EU |
| 12 | Partenariats institutionnels | CRA, MDPH, INSHEA |
| 13 | Pilier durable consolidé | 5000 MAU, 100 pros payants |

---

## 📊 Critères de réussite

- **Fin sprint 6** ✅ : 0 erreur critique en prod, tests automatisés en place
- **Fin sprint 10** : 1000 MAU, 10 pros abonnés, 50 scénarios validés, 1ère subvention
- **Fin sprint 13** : 5000 MAU, 100 pros payants, 200+ scénarios communautaires

---

## 🔧 Convention

- 1 branche par sprint : `sprint-XX-nom`
- 1 PR par tâche majeure, CI verte obligatoire
- Tag après chaque sprint mergé : `vX.Y-sprintN`
- Cleanup branches mergées dans la foulée
- Cette `ROADMAP.md` = source de vérité (mise à jour par Claude après chaque merge)
