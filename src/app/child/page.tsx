"use client";

import { useState } from "react";
import {
  Frown,
  HelpCircle,
  XCircle,
  Gamepad2,
  MessageCircle,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";
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
      question: "Salut ! Tu te sens triste aujourd'hui. C'est okay, tout le monde est triste parfois. Tu veux m'en dire un peu plus ?",
      options: [
        { label: "Quelqu'un m'a fait de la peine", response: "C'est dur quand quelqu'un nous fait de la peine. Tu peux me dire qui ? Un ami, un adulte, quelqu'un à l'école ?" },
        { label: "Je me sens tout seul", response: "Se sentir seul, c'est vraiment difficile. Tu sais, il y a des gens qui tiennent à toi. Tu as pensé à en parler à un adulte que tu aimes ?" },
        { label: "Je ne sais pas pourquoi", response: "C'est normal de ne pas savoir pourquoi on est triste. Parfois, les émotions arrivent comme ça. Tu veux essayer de faire une activité qui te fait du bien ?" },
      ],
    },
    {
      question: "Merci de m'avoir dit ça. Tu sais, être triste n'est pas une faiblesse. C'est un signe que ton cœur fonctionne bien. Est-ce que tu aimerais :",
      options: [
        { label: "Un conseil pour aller mieux", response: "Respire lentement 3 fois. Pense à quelque chose ou quelqu'un que tu aimes. Et surtout, parle à un adulte de confiance." },
        { label: "Des mots pour expliquer", response: "Tu peux dire : 'Je suis triste en ce moment, j'ai besoin qu'on m'écoute.' C'est une phrase très courageuse." },
        { label: "On va trouver une solution", response: "La solution commence par en parler. Choisis un adulte que tu aimes et dis-lui simplement : 'J'ai besoin de toi.'" },
      ],
    },
  ],
  "pas-compris": [
    {
      question: "C'est embêtant de pas comprendre ! C'est normal, tout le monde est perdu parfois. Qu'est-ce que t'as pas compris ?",
      options: [
        { label: "Ce qu'un adulte a dit", response: "Les adultes utilisent parfois des mots compliqués. Tu peux leur demander : 'Peux-tu m'expliquer avec des mots plus simples ?' C'est pas bête de demander !" },
        { label: "Une consigne à l'école", response: "Demande à ton camarade ou à ton maître/maîtresse de répéter. Tu peux dire : 'Je n'ai pas bien compris la consigne, peux-tu me l'expliquer autrement ?'" },
        { label: "Pourquoi les gens font ça", response: "Les gens font des choses étranges parfois. Le plus important, c'est comment ÇA TE FAIT RESSENTIR. Tu peux en parler à un adulte." },
      ],
    },
  ],
  "dire-non": [
    {
      question: "Dire non, c'est super important ! Ton corps et tes sentiments te disent quelque chose. Qu'est-ce qui se passe ?",
      options: [
        { label: "On me force à faire un truc", response: "Si quelqu'un te force, c'est grave. Personne n'a le droit. Va voir un adulte de confiance TOUT DE SUITE et dis : 'Quelqu'un me force à faire quelque chose.'" },
        { label: "Je veux pas jouer avec quelqu'un", response: "Tu as le droit de dire non poliment. Dis : 'Non merci, je préfère pas aujourd'hui.' Ton choix doit être respecté." },
        { label: "On me demande un truc bizarre", response: "Si c'est bizarre, dis NON et va parler à un adulte de confiance immédiatement. Tu fais bien de me le dire." },
      ],
    },
  ],
  "demander-jouer": [
    {
      question: "Tu as envie de jouer avec quelqu'un ? C'est sympa ! Comment te sens-tu ?",
      options: [
        { label: "J'ose pas demander", response: "C'est normal d'avoir un peu peur. Essaie : 'Salut, tu veux jouer avec moi ?' La peur passe quand on essaie !" },
        { label: "Les autres disent non", response: "C'est triste quand on dit non. Mais ce n'est pas ta faute. Demande à quelqu'un d'autre, ou demande à un adulte de vous aider à jouer ensemble." },
        { label: "Je ne sais pas comment faire", response: "Approche-toi calmement, attends que la personne soit libre, et demande : 'Tu veux bien jouer avec moi ?' Un sourire aide beaucoup !" },
      ],
    },
  ],
  "expliquer-adulte": [
    {
      question: "Tu as besoin d'expliquer quelque chose à un adulte ? C'est bien de parler. Qu'est-ce qui se passe ?",
      options: [
        { label: "Quelqu'un m'a fait du mal", response: "C'est très important. Va voir un adulte et dis : 'J'ai besoin de te parler, quelqu'un m'a fait du mal.' Répète jusqu'à ce qu'on t'écoute." },
        { label: "Je me sens mal à l'école", response: "Dis à un adulte : 'Je ne me sens pas bien à l'école, j'ai besoin d'aide.' Ton ressenti est important et mérite d'être entendu." },
        { label: "J'ai vu quelque chose de bizarre", response: "Dis : 'J'ai vu quelque chose qui m'inquiète, peux-tu m'aider à comprendre ?' Les adultes sont là pour ça." },
      ],
    },
  ],
  "pas-bien": [
    {
      question: "Si tu ne vas pas bien, c'est important d'en parler. Tu es courageux d'être ici. Que ressens-tu ?",
      options: [
        { label: "J'ai peur", response: "La peur est là pour nous protéger. Mais si elle est trop forte, parle-en à un adulte. Dis : 'J'ai peur, j'ai besoin de toi.'" },
        { label: "Quelqu'un me menace", response: "C'est très grave. Va voir immédiatement un adulte de confiance et dis : 'Quelqu'un me menace.' N'aie pas peur, ce n'est pas ta faute." },
        { label: "Je ne sais pas ce que j'ai", response: "C'est okay de ne pas savoir. Dis à un adulte : 'Je ne me sens pas bien, j'ai besoin de ton aide.' Ils vont t'aider à comprendre." },
      ],
    },
  ],
};

export default function ChildPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<ChildEmotion | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [conversation, setConversation] = useState<{ question: string; response?: string }[]>([]);

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

    if (
      selectedEmotion &&
      stepIndex < conversations[selectedEmotion].length - 1
    ) {
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
      <main className="px-5 pt-6 pb-8">
        {/* Safety Banner */}
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
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#1E293B] mb-1">
                Bulle Claire
              </h1>
              <p className="text-sm text-[#64748B]">
                Choisis ce que tu ressens, on va trouver des mots ensemble.
              </p>
            </div>

            {/* Emotion Grid */}
            <div className="grid grid-cols-2 gap-3">
              {emotionTiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <button
                    key={tile.id}
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
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors mb-4"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
              Retour
            </button>

            {/* Conversation */}
            <div className="space-y-4 mb-6">
              {conversation.map((item, i) => (
                <div key={i} className="animate-fade-in">
                  {item.question && (
                    <div className="bg-white rounded-2xl rounded-bl-sm p-4 border border-[#E2E0D9] shadow-sm mb-2">
                      <p className="text-sm text-[#1E293B] leading-relaxed">
                        {item.question}
                      </p>
                    </div>
                  )}
                  {item.response && (
                    <div className="bg-[#EFF3FE] rounded-2xl rounded-br-sm p-4 border border-[#3563E9]/10 ml-4">
                      <p className="text-sm text-[#1E293B] leading-relaxed">
                        {item.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Options */}
            {selectedEmotion && stepIndex < conversations[selectedEmotion].length && (
              <div className="space-y-2">
                {conversations[selectedEmotion][stepIndex]?.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(option)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm text-[#1E293B] hover:border-[#3563E9] hover:bg-[#EFF3FE] transition-all text-left"
                  >
                    {option.label}
                    <ArrowRight size={16} className="text-[#64748B] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full mt-6 py-3 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
            >
              Recommencer
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </AppShell>
  );
}
