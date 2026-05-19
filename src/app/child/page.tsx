"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Frown,
  Gamepad2,
  HelpCircle,
  MessageCircle,
  XCircle,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import { ChildEmotion } from "@/types";

const emotionTiles: {
  id: ChildEmotion;
  label: string;
  icon: typeof Frown;
  bgColor: string;
  textColor: string;
  gradient: string;
}[] = [
  {
    id: "triste",
    label: "Je suis triste",
    icon: Frown,
    bgColor: "#EFF3FE",
    textColor: "#3563E9",
    gradient: "from-[#3563E9]/10 to-[#3563E9]/5",
  },
  {
    id: "pas-compris",
    label: "J'ai pas compris",
    icon: HelpCircle,
    bgColor: "#FDF8E8",
    textColor: "#D4A017",
    gradient: "from-[#D4A017]/10 to-[#D4A017]/5",
  },
  {
    id: "dire-non",
    label: "Je veux dire non",
    icon: XCircle,
    bgColor: "#FDF1EE",
    textColor: "#E07A5F",
    gradient: "from-[#E07A5F]/10 to-[#E07A5F]/5",
  },
  {
    id: "demander-jouer",
    label: "Demander à jouer",
    icon: Gamepad2,
    bgColor: "#E8F5EE",
    textColor: "#5B9279",
    gradient: "from-[#5B9279]/10 to-[#5B9279]/5",
  },
  {
    id: "expliquer-adulte",
    label: "Expliquer à un adulte",
    icon: MessageCircle,
    bgColor: "#F3F1F9",
    textColor: "#9B8EC4",
    gradient: "from-[#9B8EC4]/10 to-[#9B8EC4]/5",
  },
  {
    id: "pas-bien",
    label: "Ça va pas",
    icon: AlertTriangle,
    bgColor: "#FDF0EF",
    textColor: "#C2413A",
    gradient: "from-[#C2413A]/10 to-[#C2413A]/5",
  },
];

interface ConversationStep {
  question: string;
  options: { label: string; response: string }[];
}

const conversations: Record<ChildEmotion, ConversationStep[]> = {
  triste: [
    {
      question: "Tu te sens triste. C'est okay. Qui ou quoi t'a fait de la peine ?",
      options: [
        { label: "Quelqu'un m'a fait de la peine", response: "C'est dur. Tu peux en parler à un adulte de confiance." },
        { label: "Je me sens seul", response: "Se sentir seul, ça fait mal. Un adulte que tu aimes peut t'aider." },
        { label: "Je sais pas pourquoi", response: "C'est normal. Parfois la tristesse arrive sans raison claire." },
      ],
    },
    {
      question: "Veux-tu une idée pour aller un peu mieux ?",
      options: [
        { label: "Oui, une idée", response: "Respire 3 fois doucement. Puis va voir une personne de confiance." },
        { label: "Des mots à dire", response: "Tu peux dire : 'Je suis triste, j'ai besoin qu'on m'écoute.'" },
        { label: "Non, pas maintenant", response: "C'est ok. Reviens quand tu veux." },
      ],
    },
  ],
  "pas-compris": [
    {
      question: "Tu n'as pas compris quelque chose. Quoi exactement ?",
      options: [
        { label: "Ce qu'un adulte a dit", response: "Tu peux demander : 'Peux-tu m'expliquer plus simplement ?'" },
        { label: "Une consigne à l'école", response: "Demande au maître : 'Je n'ai pas compris, peux-tu répéter ?'" },
        { label: "Pourquoi les gens font ça", response: "Le plus important, c'est comment tu te sens. Parles-en à un adulte." },
      ],
    },
  ],
  "dire-non": [
    {
      question: "Tu veux dire non. Qu'est-ce qui se passe ?",
      options: [
        { label: "On me force à faire un truc", response: "Va voir un adulte de confiance MAINTENANT. Dis : 'On me force.'" },
        { label: "Je veux pas jouer avec quelqu'un", response: "Tu as le droit. Dis : 'Non merci, pas aujourd'hui.'" },
        { label: "On me demande un truc bizarre", response: "Dis NON et parle à un adulte de confiance tout de suite." },
      ],
    },
  ],
  "demander-jouer": [
    {
      question: "Tu veux jouer avec quelqu'un. Qu'est-ce qui te bloque ?",
      options: [
        { label: "J'ose pas demander", response: "Essaie : 'Salut, je peux jouer avec toi ?' C'est court et clair." },
        { label: "Les autres disent non", response: "Ce n'est pas ta faute. Demande à quelqu'un d'autre." },
        { label: "Je sais pas comment faire", response: "Approche-toi calmement. Souris. Dis : 'Je peux jouer ?'" },
      ],
    },
  ],
  "expliquer-adulte": [
    {
      question: "Tu veux parler à un adulte. De quoi ?",
      options: [
        { label: "Quelqu'un m'a fait du mal", response: "Va voir un adulte. Dis : 'On m'a fait du mal, j'ai besoin de toi.'" },
        { label: "Je me sens mal à l'école", response: "Dis à un adulte : 'Je ne vais pas bien à l'école.'" },
        { label: "J'ai vu un truc bizarre", response: "Dis : 'J'ai vu quelque chose qui m'inquiète.'" },
      ],
    },
  ],
  "pas-bien": [
    {
      question: "Tu ne vas pas bien. Que ressens-tu ?",
      options: [
        { label: "J'ai peur", response: "Parle à un adulte. Dis : 'J'ai peur, j'ai besoin de toi.'" },
        { label: "Quelqu'un me menace", response: "Va voir un adulte MAINTENANT. Dis : 'On me menace.'" },
        { label: "Je sais pas ce que j'ai", response: "Dis à un adulte : 'Je ne vais pas bien.' Ils vont t'aider." },
      ],
    },
  ],
};

export default function ChildPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<ChildEmotion | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [conversation, setConversation] = useState<
    { question: string; response?: string }[]
  >([]);

  const handleEmotionSelect = (emotion: ChildEmotion) => {
    setSelectedEmotion(emotion);
    setStepIndex(0);
    setConversation([{ question: conversations[emotion][0].question }]);
  };

  const handleOptionClick = (option: { label: string; response: string }) => {
    const newConversation = [
      ...conversation,
      { question: option.label, response: option.response },
    ];

    if (selectedEmotion && stepIndex < conversations[selectedEmotion].length - 1) {
      const nextStep = conversations[selectedEmotion][stepIndex + 1];
      newConversation.push({ question: nextStep.question });
      setStepIndex(stepIndex + 1);
    }

    setConversation(newConversation);
  };

  const handleBack = () => {
    if (conversation.length > 1) {
      setConversation(conversation.slice(0, -2));
      setStepIndex(Math.max(0, stepIndex - 1));
    } else {
      setSelectedEmotion(null);
      setConversation([]);
      setStepIndex(0);
    }
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setConversation([]);
    setStepIndex(0);
  };

  return (
    <AppShell>
      <main className="px-5 pt-6 pb-8 font-body">
        <div className="bg-[#FDF0EF] border border-[#C2413A]/20 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div style={{ color: "#C2413A" }} className="shrink-0 mt-0.5">
              <AlertTriangle size={20} strokeWidth={1.5} />
            </div>
            <p className="text-xs text-[#C2413A] leading-relaxed font-medium">
              Si quelqu&apos;un te fait peur, te menace ou te touche d&apos;une façon qui te met mal à
              l&apos;aise, parle maintenant à un adulte de confiance.
            </p>
          </div>
        </div>

        {!selectedEmotion ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#1E293B] mb-1">
                Bulle Claire
              </h1>
              <p className="text-base text-[#64748B]">
                Choisis ce que tu ressens. On va trouver des mots ensemble.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {emotionTiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => handleEmotionSelect(tile.id)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border shadow-sm transition-all duration-200 hover:scale-[0.98] active:scale-95 bg-gradient-to-br ${tile.gradient} border-transparent`}
                  >
                    <div style={{ color: tile.textColor }}>
                      <Icon size={48} strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: tile.textColor }}
                    >
                      {tile.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors mb-4"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
              Retour
            </button>

            <div className="space-y-4 mb-6">
              {conversation.map((item, i) => (
                <div key={i} className="animate-fade-in">
                  {item.question && (
                    <div className="bg-white rounded-2xl rounded-bl-sm p-4 border border-[#E2E0D9] shadow-sm mb-2">
                      <p className="text-base text-[#1E293B] leading-relaxed">
                        {item.question}
                      </p>
                    </div>
                  )}
                  {item.response && (
                    <div className="bg-[#EFF3FE] rounded-2xl rounded-br-sm p-4 border border-[#3563E9]/10 ml-4">
                      <p className="text-base text-[#1E293B] leading-relaxed">
                        {item.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedEmotion && stepIndex < conversations[selectedEmotion].length && (
              <div className="space-y-2">
                {conversations[selectedEmotion][stepIndex]?.options.map((option, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-[#E2E0D9] rounded-2xl text-base text-[#1E293B] hover:border-[#3563E9] hover:bg-[#EFF3FE] transition-all text-left"
                  >
                    {option.label}
                    <ArrowRight
                      size={18}
                      className="text-[#64748B] shrink-0 ml-2"
                    />
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="w-full mt-6 py-3 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
            >
              Recommencer
            </button>
          </>
        )}
      </main>
    </AppShell>
  );
}
