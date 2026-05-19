"use client";

import { useState } from "react";
import {
  Brain,
  Shield,
  BookOpen,
  Heart,
  MessageCircle,
  ChevronLeft,
  Users,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ModeCard from "@/components/ui/ModeCard";
import CopyButton from "@/components/ui/CopyButton";

const tools = [
  {
    id: "decode",
    label: "Décoder",
    description: "Comprendre ce que l'enfant exprime",
    icon: <Brain size={20} strokeWidth={1.5} />,
    color: "#3563E9",
    bgColor: "#EFF3FE",
  },
  {
    id: "rephrase",
    label: "Reformuler",
    description: "Dire autrement une instruction",
    icon: <MessageCircle size={20} strokeWidth={1.5} />,
    color: "#5B9279",
    bgColor: "#E8F5EE",
  },
  {
    id: "protect",
    label: "Protéger",
    description: "Repérer une situation à risque",
    icon: <Shield size={20} strokeWidth={1.5} />,
    color: "#C2413A",
    bgColor: "#FDF0EF",
  },
  {
    id: "guide",
    label: "Guider",
    description: "Aider dans les interactions sociales",
    icon: <Users size={20} strokeWidth={1.5} />,
    color: "#E07A5F",
    bgColor: "#FDF1EE",
  },
  {
    id: "calm",
    label: "Apaiser",
    description: "Gérer une crise émotionnelle",
    icon: <Heart size={20} strokeWidth={1.5} />,
    color: "#9B8EC4",
    bgColor: "#F3F1F9",
  },
  {
    id: "teach",
    label: "Apprendre",
    description: "Expliquer une situation sociale",
    icon: <BookOpen size={20} strokeWidth={1.5} />,
    color: "#D4A017",
    bgColor: "#FDF8E8",
  },
];

const mockReformulations: Record<string, string[]> = {
  "Arrête de faire ça": [
    "Je vois que tu as beaucoup d'énergie. Pouvons-nous trouver une autre façon de l'utiliser ?",
    "Ce comportement n'est pas adapté ici. Que pourrions-nous faire à la place ?",
    "Je comprends que tu as envie, mais cela dérange les autres. Voyons ensemble ce qui est possible.",
  ],
  "Pourquoi tu ne joues pas avec les autres ?": [
    "Tu préfères observer pour l'instant. C'est tout à fait ok. Quand tu seras prêt, les autres seront là.",
    "Chacun a son rythme pour les interactions sociales. Que puis-je faire pour t'aider à te sentir à l'aise ?",
    "Je remarque que tu choisis de rester à l'écart. Souhaites-tu que je t'accompagne pour rejoindre les autres ?",
  ],
  "Tu ne comprends rien": [
    "Je vois que c'est difficile. Prenons le temps d'y aller étape par étape.",
    "Chaque personne apprend à son rythme. Quelle partie te semble la plus difficile ?",
    "Ce n'est pas grave de ne pas comprendre tout de suite. Je suis là pour t'expliquer autrement.",
  ],
};

export default function EducatorPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [context, setContext] = useState("ecole");
  const [age, setAge] = useState("6-10");
  const [results, setResults] = useState<string[] | null>(null);

  const handleReformulate = () => {
    if (!text.trim()) return;
    const key = Object.keys(mockReformulations).find((k) =>
      text.toLowerCase().includes(k.toLowerCase())
    );
    if (key) {
      setResults(mockReformulations[key]);
    } else {
      setResults([
        `Pour un enfant de ${age} ans (${context}): "${text}" pourrait se dire autrement en adaptant le vocabulaire et le ton.`,
        `Version plus douce: "Je vois que c'est difficile. Prenons le temps d'en parler calmement."`,
        `Version plus directe: "Ce que tu viens de dire/FAire a un impact. Voici ce que j'attends à la place."`,
      ]);
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
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#1E293B] mb-1">
                Parent / Enseignant
              </h1>
              <p className="text-sm text-[#64748B]">
                Outils pour accompagner et mieux communiquer.
              </p>
            </div>

            {/* Tools Grid */}
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

            {/* Info Banner */}
            <div className="mt-6 bg-[#F0F5ED] border border-[#7B9E6B]/20 rounded-2xl p-4">
              <p className="text-xs text-[#5B9279] leading-relaxed">
                Ces outils sont des aides à la communication. Chaque enfant est
                unique, adaptez selon votre connaissance de l&apos;enfant.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Back */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors mb-4"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
              Retour
            </button>

            {/* Tool Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#1E293B] mb-1">
                {tools.find((t) => t.id === selectedTool)?.label}
              </h1>
              <p className="text-sm text-[#64748B]">
                {tools.find((t) => t.id === selectedTool)?.description}
              </p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Colle ici une phrase que tu souhaites reformuler..."
                maxLength={300}
                className="w-full min-h-[100px] p-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm text-[#1E293B] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#3563E9] focus:ring-2 focus:ring-[#3563E9]/10 transition-all resize-none"
              />
            </div>

            {/* Context */}
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

            {/* Age */}
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

            {/* Reformulate Button */}
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

            {/* Results */}
            {results && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#1E293B]">
                  Suggestions de reformulation
                </h2>
                {results.map((result, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#E2E0D9] shadow-sm p-4 animate-stagger stagger-1"
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
