import { Check, Clock, Loader2 } from "lucide-react";

export const metadata = {
  title: "Roadmap — Clair",
  description: "Les prochaines étapes du projet Clair / Bulle Claire.",
};

type Status = "done" | "current" | "planned";

interface Sprint {
  num: number;
  title: string;
  description: string;
  status: Status;
  category: "Fondations" | "Crédibilité" | "Profondeur" | "Innovations";
}

const SPRINTS: Sprint[] = [
  {
    num: 1,
    title: "IA réelle + Urgences + Légal",
    description:
      "Analyses contextuelles, numéros d'aide cliquables, pages légales et éthiques.",
    status: "done",
    category: "Fondations",
  },
  {
    num: 2,
    title: "Performance + PWA propre",
    description:
      "Chargement plus rapide, installation propre sur iOS et Android, plus de features fantômes.",
    status: "done",
    category: "Fondations",
  },
  {
    num: 3,
    title: "Compte et historique multi-appareils",
    description:
      "Connexion par lien magique, historique synchronisé sur tous tes appareils, suppression complète RGPD.",
    status: "done",
    category: "Crédibilité",
  },
  {
    num: 4,
    title: "Comité éthique et partenariats",
    description:
      "Validation des prompts par 3 professionnels (psychologue TSA, orthophoniste, AESH), partenariats associatifs.",
    status: "planned",
    category: "Crédibilité",
  },
  {
    num: 5,
    title: "Accessibilité RGAA niveau AA",
    description:
      "Lecteur d'écran, contrastes renforcés, navigation clavier, préférences (animations, OpenDyslexic, taille texte).",
    status: "planned",
    category: "Crédibilité",
  },
  {
    num: 6,
    title: "Tests automatisés et monitoring",
    description: "Couverture de tests, détection automatique des bugs en production.",
    status: "current",
    category: "Crédibilité",
  },
  {
    num: 7,
    title: "Bibliothèque de 50+ scénarios validés",
    description:
      "Scénarios sociaux validés par des professionnels (cantine, récréation, transitions, émotions complexes).",
    status: "planned",
    category: "Profondeur",
  },
  {
    num: 8,
    title: "Mode pro AESH et enseignant",
    description:
      "Multi-profils élèves anonymisés, export PDF imprimable, export pictogrammes ARASAAC.",
    status: "planned",
    category: "Profondeur",
  },
  {
    num: 9,
    title: "Multilingue + FALC + voix française",
    description:
      "Anglais, arabe, portugais. Version Facile À Lire et Comprendre. Synthèse vocale française naturelle.",
    status: "planned",
    category: "Profondeur",
  },
  {
    num: 10,
    title: "Mode hors-ligne complet",
    description:
      "L'app utilisable sans connexion (scénarios pré-écrits, pictogrammes locaux).",
    status: "planned",
    category: "Profondeur",
  },
  {
    num: 11,
    title: "💡 Carnet de bord partagé",
    description:
      "Un journal partagé entre parent, AESH et CPE autour d'un enfant. Inédit en France.",
    status: "planned",
    category: "Innovations",
  },
  {
    num: 12,
    title: "💡 Co-régulation parent-enfant temps réel",
    description:
      "Bouton « crise en cours » : guide de respiration, mode enfant adapté, débrief à froid.",
    status: "planned",
    category: "Innovations",
  },
  {
    num: 13,
    title: "💡 Banque de scénarios communautaire",
    description:
      "Les professionnels contribuent à une base de scénarios validés. Modèle Wikipédia + validation comité.",
    status: "planned",
    category: "Innovations",
  },
];

const STATUS_LABELS: Record<Status, string> = {
  done: "Terminé",
  current: "En cours",
  planned: "Prévu",
};

const STATUS_COLORS: Record<Status, string> = {
  done: "bg-[#E5F5E5] text-[#2E7D5A] border-[#5B9279]/30",
  current: "bg-[#EDF4FF] text-[#3563E9] border-[#3563E9]/30",
  planned: "bg-[#F1F5F9] text-[#64748B] border-[#E2E0D9]",
};

function StatusIcon({ status }: { status: Status }) {
  if (status === "done") return <Check size={14} aria-hidden="true" />;
  if (status === "current") {
    return <Loader2 size={14} className="animate-spin" aria-hidden="true" />;
  }
  return <Clock size={14} aria-hidden="true" />;
}

export default function RoadmapPage() {
  const categories = ["Fondations", "Crédibilité", "Profondeur", "Innovations"] as const;

  return (
    <main className="mx-auto min-h-screen max-w-[430px] px-4 pb-24">
      <header className="pb-4 pt-6">
        <h1 className="text-2xl font-bold text-[#1E293B]">Roadmap</h1>
        <p className="mt-1 text-sm text-[#475569]">
          Ce qui est fait, ce qui arrive, et où on veut aller ensemble.
        </p>
      </header>

      {categories.map((category) => (
        <section key={category} className="mt-6">
          <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wider text-[#64748B]">
            {category}
          </h2>
          <div className="space-y-3">
            {SPRINTS.filter((sprint) => sprint.category === category).map((sprint) => (
              <article
                key={sprint.num}
                className={`rounded-2xl border bg-white p-4 ${
                  sprint.status === "current" ? "ring-2 ring-[#3563E9]/30" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[#64748B]">
                      Sprint {sprint.num}
                    </div>
                    <h3 className="mt-0.5 font-semibold text-[#1E293B]">
                      {sprint.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#475569]">
                      {sprint.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${STATUS_COLORS[sprint.status]}`}
                  >
                    <StatusIcon status={sprint.status} />
                    {STATUS_LABELS[sprint.status]}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-8 rounded-2xl border border-[#3563E9]/20 bg-[#EDF4FF] p-4">
        <h2 className="font-semibold text-[#1E293B]">Tu veux contribuer ?</h2>
        <p className="mt-2 text-sm text-[#475569]">
          Clair est un projet open source à vocation associative. Si tu es
          professionnel·le du handicap neurodéveloppemental, parent, ou
          développeur·euse intéressé·e, on cherche du monde pour le comité
          éthique et la rédaction de scénarios.
        </p>
        <p className="mt-2 text-sm">
          Contact :{" "}
          <a href="mailto:contact@safescol.fr" className="text-[#3563E9] underline">
            contact@safescol.fr
          </a>
        </p>
      </section>

      <p className="mt-6 text-center text-xs text-[#64748B]">
        Le code source complet et la roadmap technique détaillée sont publics sur{" "}
        <a
          href="https://github.com/abenmahmoud/clair-bulle-claire"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3563E9] underline"
        >
          GitHub
        </a>
        .
      </p>
    </main>
  );
}
