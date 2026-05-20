"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  MessageSquare,
  Heart,
  Users,
  Clock,
  Lock,
  BookOpen,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ModeCard from "@/components/ui/ModeCard";

const MODES = [
  {
    title: "Comprendre quelqu'un",
    description: "Clarifier une phrase ou une situation",
    icon: Search,
    color: "#3563E9",
    bgColor: "#EFF3FE",
  },
  {
    title: "M'aider à répondre",
    description: "Trouver les mots pour répondre",
    icon: MessageSquare,
    color: "#2E7D5A",
    bgColor: "#E8F5EE",
  },
  {
    title: "Mode enfant",
    description: "Bulle Claire pour les enfants",
    icon: Heart,
    color: "#C2413A",
    bgColor: "#FDF0EF",
  },
  {
    title: "Parent / enseignant",
    description: "Outils pour accompagner",
    icon: Users,
    color: "#5B9279",
    bgColor: "#E8F5EE",
  },
  {
    title: "Historique",
    description: "Analyses sauvegardées",
    icon: Clock,
    color: "#7B1FA2",
    bgColor: "#F3F1F9",
  },
  {
    title: "Scénarios",
    description: "Exemples concrets déjà clarifiés",
    icon: BookOpen,
    color: "#5C7894",
    bgColor: "#EEF4F7",
  },
];

const EXAMPLES = [
  "On verra.",
  "Fais comme tu veux.",
  "C'est intéressant comme idée...",
  "Je ne veux pas venir, ça me fatigue.",
  "Personne ne veut jouer avec moi.",
  "Dépêche-toi un peu.",
];

export default function HomePage() {
  const router = useRouter();

  return (
    <AppShell>
      <main>
        {/* Header */}
        <div className="px-5 pt-6">
          <h1 className="text-[28px] font-bold tracking-tight text-[#1E293B]">
            Clair
          </h1>
          <p className="mt-1 text-[15px] text-[#475569]">
            Clarification sociale et cognitive
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-[#1E293B]">
            Transforme une phrase floue en message clair, prudent et utilisable.
          </p>
        </div>

        {/* Example chips */}
        <div className="mt-4 px-5">
          <p className="mb-2 text-[13px] font-medium text-[#475569]">
            Essayez avec :
          </p>
          <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => router.push(`/clarify?text=${encodeURIComponent(ex)}`)}
                className="whitespace-nowrap rounded-full border border-[#E2E0D9] bg-white px-3 py-1.5 text-[13px] text-[#475569] transition-transform active:scale-95"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Mode cards grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 px-5">
          <h2 className="sr-only">Actions principales</h2>
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            let target = "/clarify";
            if (i === 1) target = "/respond";
            if (i === 2) target = "/child";
            if (i === 3) target = "/educator";
            if (i === 4) target = "/history";
            if (i === 5) target = "/scenarios";

            return (
              <ModeCard
                key={mode.title}
                title={mode.title}
                description={mode.description}
                icon={<Icon size={20} strokeWidth={2} />}
                color={mode.color}
                bgColor={mode.bgColor}
                onClick={() => router.push(target)}
              />
            );
          })}
        </div>

        {/* Privacy footer */}
        <button
          onClick={() => router.push("/privacy")}
          className="mt-6 flex min-h-10 w-full items-center justify-center gap-1.5 pb-4 text-[12px] text-[#475569]"
        >
          <div className="text-[#5B9279]">
            <Lock size={14} />
          </div>
          <span className="underline">Vos données restent sur votre appareil</span>
        </button>
      </main>
    </AppShell>
  );
}
