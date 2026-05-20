"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import DirectionSelector from "@/components/ui/DirectionSelector";
import ContextPicker from "@/components/ui/ContextPicker";
import type { ContextType, TranslationDirection } from "@/types";

const EXAMPLES = [
  "On verra.",
  "Fais comme tu veux.",
  "C'est intéressant comme idée...",
  "Je ne veux pas venir, ça me fatigue.",
  "Personne ne veut jouer avec moi.",
  "Dépêche-toi un peu.",
];

export function ClarifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialText = searchParams.get("text");

  const [text, setText] = useState(initialText || "");
  const [direction, setDirection] =
    useState<TranslationDirection>("neurotypique-neuroatypique");
  const [context, setContext] = useState<ContextType>("inconnu");
  const [isLoading, setIsLoading] = useState(false);

  const handleClarify = () => {
    if (!text.trim()) return;
    setIsLoading(true);
    const params = new URLSearchParams({
      text: text.trim(),
      direction,
      context,
    });
    router.push(`/clarify/result?${params.toString()}`);
  };

  return (
    <>
      <div className="px-5 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[14px] text-[#64748B]"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Retour</span>
        </Link>
      </div>

      <div className="px-5 pt-4">
        <h1 className="text-[24px] font-bold text-[#1E293B]">
          Clarifier une phrase
        </h1>
        <p className="mt-1 text-[14px] text-[#64748B]">
          Écris ou colle ce que tu veux comprendre.
        </p>
      </div>

      <div className="px-5 pt-4">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Exemple : « On verra. »"
          rows={5}
          maxLength={500}
          className="w-full resize-none rounded-2xl border border-[#E2E0D9] bg-white p-4 text-[16px] text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#3563E9] focus:outline-none focus:ring-2 focus:ring-[#3563E9]/20"
        />
        <p className="mt-1 text-right text-[12px] text-[#64748B]">
          {text.length} / 500 caractères
        </p>
      </div>

      <div className="mt-2 px-5">
        <p className="mb-2 text-[13px] font-medium text-[#64748B]">
          Exemples rapides :
        </p>
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setText(example)}
              className="whitespace-nowrap rounded-full border border-[#E2E0D9] bg-white px-3 py-1.5 text-[13px] text-[#64748B] transition-transform active:scale-95"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 px-5">
        <DirectionSelector selected={direction} onChange={setDirection} />
      </div>

      <div className="mt-4 px-5">
        <ContextPicker selected={context} onChange={setContext} />
      </div>

      <div className="px-5 pb-6 pt-6">
        <button
          type="button"
          onClick={handleClarify}
          disabled={!text.trim() || isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3563E9] py-3.5 text-[16px] font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" aria-hidden="true" />
              <span>Analyse en cours…</span>
            </>
          ) : (
            <>
              <Sparkles size={20} aria-hidden="true" />
              <span>Clarifier</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
