"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Mic, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import DirectionSelector from "@/components/ui/DirectionSelector";
import ContextPicker from "@/components/ui/ContextPicker";
import Toast from "@/components/ui/Toast";
import type { TranslationDirection, ContextType } from "@/types";

const EXAMPLES = [
  "On verra.",
  "Fais comme tu veux.",
  "C'est intéressant comme idée...",
  "Je ne veux pas venir, ça me fatigue.",
  "Personne ne veut jouer avec moi.",
  "Dépêche-toi un peu.",
];

function ClarifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const voiceMode = searchParams.get("voice");
  const initialText = searchParams.get("text");

  const [text, setText] = useState(initialText || "");
  const [direction, setDirection] =
    useState<TranslationDirection>("neurotypique-neuroatypique");
  const [context, setContext] = useState<ContextType>("inconnu");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  const handleClarify = () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      const params = new URLSearchParams({
        text: text.trim(),
        direction,
        context,
      });
      router.push(`/clarify/result?${params.toString()}`);
    }, 600);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="px-5 pt-4">
        <Link
          href="/"
          className="mb-3 flex items-center gap-1 text-[14px] font-medium text-[#64748B]"
        >
          <ArrowLeft size={18} />
          Retour
        </Link>
        <h1 className="text-[24px] font-bold text-[#1E293B]">
          Clarifier une situation
        </h1>
        <p className="mt-1 text-[15px] text-[#64748B]">
          Collez ou décrivez une phrase, un message ou une situation.
        </p>
      </div>

      {/* Textarea */}
      <div className="mt-4 px-5">
        <div className="relative rounded-2xl border border-[#E2E0D9] bg-white p-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: On verra."
            className="w-full resize-none border-0 bg-transparent text-[16px] leading-relaxed outline-none"
            style={{ minHeight: 120, color: "#1E293B" }}
            maxLength={500}
          />
          <button
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "#EFF3FE", opacity: 0.4 }}
            onClick={() =>
              setToast({ message: "Mode vocal bientôt disponible", visible: true })
            }
          >
            <div className="text-[#3563E9]">
              <Mic size={18} />
            </div>
          </button>
        </div>
        <div className="mt-1 flex justify-end">
          <span className="text-[12px] text-[#64748B]">
            {text.length} / 500
          </span>
        </div>
      </div>

      {voiceMode && (
        <div className="mt-2 px-5">
          <p className="text-[13px] text-[#E67E22]">
            Mode vocal activé (microphone non fonctionnel en V1)
          </p>
        </div>
      )}

      {/* Direction */}
      <div className="mt-4 px-5">
        <h2 className="text-[17px] font-semibold text-[#1E293B]">
          Sens de traduction
        </h2>
        <div className="mt-2">
          <DirectionSelector selected={direction} onChange={setDirection} />
        </div>
      </div>

      {/* Context */}
      <div className="mt-4 px-5">
        <h2 className="text-[17px] font-semibold text-[#1E293B]">Contexte</h2>
        <div className="mt-2">
          <ContextPicker selected={context} onChange={setContext} />
        </div>
      </div>

      {/* Examples */}
      <div className="mt-3 px-5">
        <p className="mb-2 text-[13px] font-medium text-[#64748B]">
          Exemples :
        </p>
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
          {EXAMPLES.map((phrase) => (
            <button
              key={phrase}
              onClick={() => setText(phrase)}
              className="whitespace-nowrap rounded-full border border-[#E2E0D9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#64748B] transition-transform active:scale-95"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="px-5 pb-8 pt-4">
        <button
          onClick={handleClarify}
          disabled={!text.trim() || isLoading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
          style={{ backgroundColor: "#3563E9" }}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Clarifier
            </>
          )}
        </button>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast({ message: "", visible: false })}
      />
    </AppShell>
  );
}

export default function ClarifyPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="flex h-full items-center justify-center">
            <Loader2 size={32} className="animate-spin text-[#3563E9]" />
          </div>
        </AppShell>
      }
    >
      <ClarifyContent />
    </Suspense>
  );
}
