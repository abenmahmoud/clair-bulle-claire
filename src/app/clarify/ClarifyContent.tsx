"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mic } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import DirectionSelector from "@/components/ui/DirectionSelector";
import ContextPicker from "@/components/ui/ContextPicker";
import Toast from "@/components/ui/Toast";
import { TranslationDirection, ContextType } from "@/types";

const quickExamples = [
  "On verra.",
  "Fais comme tu veux.",
  "C'est intéressant comme idée.",
  "Je ne veux pas venir, ça me fatigue.",
  "Personne ne veut jouer avec moi.",
  "Dépêche-toi un peu.",
];

export default function ClarifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get("text") || "");
  const [direction, setDirection] = useState<TranslationDirection>(
    (searchParams.get("direction") as TranslationDirection) ||
      "neurotypique-neuroatypique"
  );
  const [context, setContext] = useState<ContextType>(
    (searchParams.get("context") as ContextType) || "inconnu"
  );
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleClarify = useCallback(() => {
    if (!text.trim()) return;
    router.push(
      `/clarify/result?text=${encodeURIComponent(text.trim())}&direction=${direction}&context=${context}`
    );
  }, [text, direction, context, router]);

  const isValid = text.trim().length > 0;

  return (
    <AppShell>
      <main className="px-5 pt-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1E293B] mb-1">
            Clarifier une phrase
          </h1>
          <p className="text-sm text-[#64748B]">
            Colle une phrase ambiguë pour en comprendre le sens caché.
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ex: 'On verra plus tard...'"
              maxLength={500}
              className="w-full min-h-[120px] p-4 pr-12 bg-white border border-[#E2E0D9] rounded-2xl text-sm text-[#1E293B] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#3563E9] focus:ring-2 focus:ring-[#3563E9]/10 transition-all resize-none"
            />
            <button
              type="button"
              onClick={() =>
                setToast({
                  message: "Mode vocal bientôt disponible",
                  visible: true,
                })
              }
              className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-[#F1F0EB] text-[#64748B] hover:bg-[#E2E0D9] transition-colors"
              aria-label="Microphone (bientôt disponible)"
            >
              <Mic size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-[#64748B]">
              {text.length}/500
            </span>
          </div>
        </div>

        {/* Direction */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
            Direction de traduction
          </h2>
          <DirectionSelector selected={direction} onChange={setDirection} />
        </div>

        {/* Context */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
            Contexte
          </h2>
          <ContextPicker selected={context} onChange={setContext} />
        </div>

        {/* Quick Examples */}
        <div className="mb-24">
          <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
            Exemples rapides
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {quickExamples.map((example) => (
              <button
                key={example}
                onClick={() => setText(example)}
                className="flex-shrink-0 px-3.5 py-2 bg-white border border-[#E2E0D9] rounded-full text-xs text-[#64748B] hover:border-[#3563E9] hover:text-[#3563E9] transition-colors whitespace-nowrap"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] px-5">
          <button
            onClick={handleClarify}
            disabled={!isValid}
            className={`w-full py-3.5 px-6 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-200 ${
              isValid
                ? "bg-[#3563E9] text-white hover:bg-[#2547B3] active:scale-[0.98]"
                : "bg-[#E2E0D9] text-[#64748B] cursor-not-allowed"
            }`}
          >
            Clarifier
          </button>
        </div>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast({ message: "", visible: false })}
      />
    </AppShell>
  );
}
