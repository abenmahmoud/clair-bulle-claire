"use client";

import { useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Bookmark,
  Volume2,
  ArrowDown,
  AlertTriangle,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";
import AnalysisCard from "@/components/ui/AnalysisCard";
import HypothesisCard from "@/components/ui/HypothesisCard";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import Toast from "@/components/ui/Toast";
import { analyzeText } from "@/lib/analysis";
import { saveAnalysis } from "@/lib/storage";
import { TranslationDirection, ContextType, ResponseVariant } from "@/types";

export default function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const text = searchParams.get("text") || "";
  const direction =
    (searchParams.get("direction") as TranslationDirection) ||
    "neurotypique-neuroatypique";
  const context =
    (searchParams.get("context") as ContextType) || "inconnu";

  const result = analyzeText(text, direction, context);

  const [simplified, setSimplified] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [saved, setSaved] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  const handleSave = useCallback(() => {
    saveAnalysis(text, result, direction, context);
    setSaved(true);
    showToast("Analyse sauvegardée");
  }, [text, result, direction, context, showToast]);

  const handleSpeak = useCallback(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(result.voiceShortVersion);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Lecture vocale non disponible");
    }
  }, [result, showToast]);

  const responseVariants: { variant: ResponseVariant; text: string }[] = [
    { variant: "short", text: result.shortAnswer },
    { variant: "direct", text: result.directAnswer },
    { variant: "soft", text: result.softAnswer },
    { variant: "professional", text: result.professionalAnswer },
    { variant: "boundary", text: result.boundaryAnswer },
    ...(result.childVersion
      ? [{ variant: "child" as ResponseVariant, text: result.childVersion }]
      : []),
  ];

  return (
    <AppShell>
      <div ref={resultRef}>
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#F8F6F0]/80 backdrop-blur-md border-b border-[#E2E0D9]">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => router.push("/clarify")}
              className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
              Retour
            </button>
            <h1 className="text-sm font-semibold text-[#1E293B] truncate max-w-[200px]">
              {text.length > 30 ? text.substring(0, 30) + "..." : text}
            </h1>
            <div className="w-16" />
          </div>
        </div>

        <main className="px-5 pt-4 pb-8 space-y-4">
          {/* Original */}
          <div className="bg-[#EFF3FE] rounded-2xl p-4 border border-[#3563E9]/10">
            <p className="text-xs font-medium text-[#3563E9] mb-1">Phrase analysée</p>
            <p className="text-base font-medium text-[#1E293B]">&ldquo;{text}&rdquo;</p>
          </div>

          {/* Clear Translation */}
          <AnalysisCard
            title="Traduction claire"
            color="#3563E9"
            bgColor="#EFF3FE"
          >
            <p className="text-sm text-[#1E293B] leading-relaxed">
              {simplified
                ? result.clearTranslation.split(". ")[0] + "."
                : result.clearTranslation}
            </p>
          </AnalysisCard>

          {/* Literal Meaning */}
          {!simplified && (
            <AnalysisCard
              title="Sens littéral"
              color="#5B9279"
              bgColor="#E8F5EE"
            >
              <p className="text-sm text-[#1E293B] leading-relaxed">
                {result.literalMeaning}
              </p>
            </AnalysisCard>
          )}

          {/* Social Meaning */}
          {!simplified && (
            <AnalysisCard
              title="Sens social possible"
              color="#E07A5F"
              bgColor="#FDF1EE"
            >
              <p className="text-sm text-[#1E293B] leading-relaxed">
                {result.possibleSocialMeaning}
              </p>
            </AnalysisCard>
          )}

          {/* Certain */}
          <AnalysisCard
            title="Ce qui est sûr"
            color="#5B9279"
            bgColor="#E8F5EE"
          >
            <ul className="space-y-1.5">
              {result.certain.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#1E293B]">
                  <span className="text-[#5B9279] mt-1 shrink-0">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnalysisCard>

          {/* Uncertain */}
          {!simplified && (
            <AnalysisCard
              title="Ce qui est incertain"
              color="#D4A017"
              bgColor="#FDF8E8"
            >
              <ul className="space-y-1.5">
                {result.uncertain.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#1E293B]"
                  >
                    <span className="text-[#D4A017] mt-1 shrink-0">?</span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnalysisCard>
          )}

          {/* Hypotheses */}
          {!simplified && <HypothesisCard hypotheses={result.hypotheses} />}

          {/* Clarifying Question */}
          <AnalysisCard
            title="Question à poser"
            color="#9B8EC4"
            bgColor="#F3F1F9"
          >
            <p className="text-sm text-[#1E293B] leading-relaxed italic">
              &ldquo;{result.clarifyingQuestion}&rdquo;
            </p>
          </AnalysisCard>

          {/* Responses */}
          <div>
            <h2 className="text-base font-semibold text-[#1E293B] mb-3">
              Réponses suggérées
            </h2>
            <div className="space-y-3">
              {responseVariants.map((rv, i) => (
                <div
                  key={rv.variant}
                  className={`animate-stagger stagger-${i + 1}`}
                >
                  <ResponseVariantCard variant={rv.variant} text={rv.text} />
                </div>
              ))}
            </div>
          </div>

          {/* Ethics Banner */}
          <div className="bg-[#FDF8E8] border border-[#FDF8E8] rounded-2xl p-4 flex items-start gap-3">
            <div style={{ color: "#D4A017" }} className="shrink-0 mt-0.5">
              <AlertTriangle size={18} strokeWidth={1.5} />
            </div>
            <p className="text-xs text-[#D4A017] leading-relaxed">
              Ces hypothèses sont des pistes, pas des vérités. Chaque situation est unique.
            </p>
          </div>

          {/* Self Regulation Tip */}
          {result.selfRegulationTip && (
            <AnalysisCard
              title="Conseil de régulation"
              color="#5B9279"
              bgColor="#E8F5EE"
            >
              <p className="text-sm text-[#1E293B] leading-relaxed">
                {result.selfRegulationTip}
              </p>
            </AnalysisCard>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setSimplified(!simplified)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
            >
              <ArrowDown size={16} strokeWidth={1.5} />
              {simplified ? "Détailler" : "Simplifier"}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
            >
              <Bookmark
                size={16}
                strokeWidth={1.5}
                className={saved ? "text-[#3563E9]" : ""}
              />
              {saved ? "Sauvegardé" : "Sauvegarder"}
            </button>
            <button
              onClick={handleSpeak}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
            >
              <Volume2 size={16} strokeWidth={1.5} />
              Lire
            </button>
          </div>
        </main>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast({ message: "", visible: false })}
      />

      <BottomNav />
    </AppShell>
  );
}
