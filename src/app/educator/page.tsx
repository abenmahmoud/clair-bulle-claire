"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ClipboardList,
  Clock,
  Ear,
  HeartHandshake,
  MessageSquare,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ModeCard from "@/components/ui/ModeCard";
import CopyButton from "@/components/ui/CopyButton";

const tools = [
  {
    id: "consigne",
    label: "Rendre une consigne plus claire",
    description: "Reformuler en étapes concrètes",
    icon: <ClipboardList size={20} strokeWidth={1.5} />,
    color: "#3563E9",
    bgColor: "#EFF3FE",
  },
  {
    id: "regle",
    label: "Expliquer une règle",
    description: "Donner du sens à une règle sociale",
    icon: <BookOpen size={20} strokeWidth={1.5} />,
    color: "#5B9279",
    bgColor: "#E8F5EE",
  },
  {
    id: "transition",
    label: "Préparer une transition",
    description: "Annoncer un changement d'activité",
    icon: <Clock size={20} strokeWidth={1.5} />,
    color: "#D4A017",
    bgColor: "#FDF8E8",
  },
  {
    id: "crise",
    label: "Désamorcer une crise",
    description: "Apaiser sans escalade",
    icon: <HeartHandshake size={20} strokeWidth={1.5} />,
    color: "#E07A5F",
    bgColor: "#FDF1EE",
  },
  {
    id: "script",
    label: "Créer un script social",
    description: "Préparer une situation à l'avance",
    icon: <MessageSquare size={20} strokeWidth={1.5} />,
    color: "#9B8EC4",
    bgColor: "#F3F1F9",
  },
  {
    id: "raconter",
    label: "Aider à raconter",
    description: "Soutenir l'enfant pour exprimer un fait",
    icon: <Ear size={20} strokeWidth={1.5} />,
    color: "#7B9E6B",
    bgColor: "#F0F5ED",
  },
];

const mockByTool: Record<string, (text: string, age: string) => string[]> = {
  consigne: (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("depeche") || lower.includes("dépêche") || lower.includes("vite")) {
      return [
        "Dans 5 minutes, nous mettons les chaussures.",
        "Ensuite, nous sortons de la maison.",
        "Je vais t'aider étape par étape.",
      ];
    }
    if (lower.includes("range") || lower.includes("ranger")) {
      return [
        "On va ranger ensemble les jouets dans la boîte bleue.",
        "Après, on pose les livres sur l'étagère.",
        "Tu peux commencer par ce qui est le plus proche de toi.",
      ];
    }
    return [
      "Étape 1 : pose très simplement ce que tu attends, sans métaphore.",
      "Étape 2 : indique le temps disponible (par ex. \"dans 5 minutes\").",
      "Étape 3 : propose une aide concrète : \"je t'aide à commencer\".",
    ];
  },
  regle: (text) => [
    `La règle "${text}" sert à protéger tout le monde dans le groupe.`,
    "Quand on la respecte, on se sent en sécurité et on peut jouer plus tranquillement.",
    "Si elle n'est pas claire pour toi, on peut en reparler ensemble.",
  ],
  transition: () => [
    "Dans quelques minutes, on va changer d'activité.",
    "Tu peux finir ce que tu fais maintenant.",
    "Je te préviens encore une fois avant qu'on bouge.",
  ],
  crise: () => [
    "Je vois que c'est très difficile en ce moment. Tu n'es pas seul.",
    "On va respirer ensemble une fois, doucement.",
    "Quand tu seras prêt, on cherchera une solution ensemble. Rien ne presse.",
  ],
  script: (text) => [
    `Situation : ${text}`,
    "Ce que tu peux faire : t'approcher calmement et attendre qu'on te regarde.",
    "Ce que tu peux dire : \"Bonjour, est-ce que je peux jouer avec vous ?\"",
    "Si la réponse est non : ce n'est pas grave, tu peux demander à quelqu'un d'autre.",
  ],
  raconter: () => [
    "Prends ton temps. Tu peux commencer par : où est-ce que c'est arrivé ?",
    "Ensuite, qui était avec toi ?",
    "Qu'est-ce qui s'est passé en premier ? Et après ?",
    "Comment tu t'es senti pendant ce moment ?",
  ],
};

function genericReformulation(text: string, age: string, context: string): string[] {
  return [
    `Pour un enfant de ${age} dans le cadre ${context} : "${text}" gagne à être formulé en phrases courtes et concrètes.`,
    "Privilégier une consigne par phrase, sans métaphore, sans ironie.",
    "Annoncer le temps disponible et proposer une aide pour commencer.",
  ];
}

export default function EducatorPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [context, setContext] = useState("ecole");
  const [age, setAge] = useState("6-10");
  const [results, setResults] = useState<string[] | null>(null);

  const selectedToolData = tools.find((tool) => tool.id === selectedTool);

  const handleReformulate = () => {
    if (!text.trim() || !selectedTool) return;
    const gen = mockByTool[selectedTool];
    if (gen) {
      setResults(gen(text, age));
    } else {
      setResults(genericReformulation(text, age, context));
    }
  };

  const handleBack = () => {
    setSelectedTool(null);
    setResults(null);
    setText("");
  };

  return (
    <AppShell>
      <main className="px-5 pt-6 pb-8">
        {!selectedTool ? (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#1E293B] mb-1">
                Accompagner un enfant
              </h1>
              <p className="text-sm text-[#64748B]">
                Outils pour parents, AESH et enseignants.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <ModeCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.label}
                  description={tool.description}
                  color={tool.color}
                  bgColor={tool.bgColor}
                  onClick={() => setSelectedTool(tool.id)}
                />
              ))}
            </div>

            <div className="mt-6 bg-[#F0F5ED] border border-[#7B9E6B]/20 rounded-2xl p-4">
              <p className="text-xs text-[#5B9279] leading-relaxed">
                Ces outils sont des aides à la communication. Chaque enfant est
                unique, adaptez selon votre connaissance de l&apos;enfant.
              </p>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors mb-4"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
              Retour
            </button>

            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#1E293B] mb-1">
                {selectedToolData?.label}
              </h1>
              <p className="text-sm text-[#64748B]">
                {selectedToolData?.description}
              </p>
            </div>

            <div className="mb-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Colle ici une phrase que tu souhaites reformuler..."
                maxLength={300}
                className="w-full min-h-[100px] p-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm text-[#1E293B] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#3563E9] focus:ring-2 focus:ring-[#3563E9]/10 transition-all resize-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-[#64748B] mb-2 block">
                Contexte
              </label>
              <select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full p-3 bg-white border border-[#E2E0D9] rounded-xl text-sm text-[#1E293B] focus:outline-none focus:border-[#3563E9]"
              >
                <option value="ecole">École</option>
                <option value="famille">Famille</option>
                <option value="loisirs">Loisirs</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="text-xs font-medium text-[#64748B] mb-2 block">
                Âge de l&apos;enfant
              </label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 bg-white border border-[#E2E0D9] rounded-xl text-sm text-[#1E293B] focus:outline-none focus:border-[#3563E9]"
              >
                <option value="3-5">3-5 ans</option>
                <option value="6-8">6-8 ans</option>
                <option value="9-12">9-12 ans</option>
                <option value="13+">13 ans et +</option>
              </select>
            </div>

            <button
              onClick={handleReformulate}
              disabled={!text.trim()}
              className={`w-full py-3.5 px-6 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-200 mb-6 ${
                text.trim()
                  ? "bg-[#3563E9] text-white hover:bg-[#2547B3] active:scale-[0.98]"
                  : "bg-[#E2E0D9] text-[#64748B] cursor-not-allowed"
              }`}
            >
              Reformuler
            </button>

            {results && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#1E293B]">
                  Suggestions de reformulation
                </h2>
                {results.map((result, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#E2E0D9] shadow-sm p-4 animate-stagger"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EFF3FE] text-[#3563E9] flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <p className="text-sm text-[#1E293B] leading-relaxed">
                          {result}
                        </p>
                      </div>
                      <CopyButton text={result} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </AppShell>
  );
}
