"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Volume2,
  Minimize2,
  Maximize2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import AnalysisCard from "@/components/ui/AnalysisCard";
import HypothesisCard from "@/components/ui/HypothesisCard";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import CopyButton from "@/components/ui/CopyButton";
import Toast from "@/components/ui/Toast";
import { analyzeText } from "@/lib/analysis";
import { saveAnalysis } from "@/lib/storage";
import type { AnalysisResult, TranslationDirection, ContextType } from "@/types";

function ResultContent() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") || "";
  const direction = (searchParams.get("direction") ||
    "neurotypique-neuroatypique") as TranslationDirection;
  const context = (searchParams.get("context") || "inconnu") as ContextType;

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [simplified, setSimplified] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  useEffect(() => {
    if (text) {
      setTimeout(() => {
        setResult(analyzeText(text, direction, context));
      }, 500);
    }
  }, [text, direction, context]);

  const handleSave = () => {
    if (result) {
      saveAnalysis(text, result, direction, context);
      setSaved(true);
      setToast({ message: "Analyse sauvegardée", visible: true });
    }
  };

  const handleRead = (textToRead: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "fr-FR";
      speechSynthesis.speak(utterance);
    }
  };

  if (!result) {
    return (
      <AppShell>
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#3563E9]" />
          <p className="text-[#64748B]">Analyse en cours...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="px-5 pt-4">
        <Link
          href="/clarify"
          className="mb-3 flex items-center gap-1 text-[14px] font-medium text-[#64748B]"
        >
          <ArrowLeft size={18} />
          Retour
        </Link>
        <h1 className="text-[24px] font-bold text-[#1E293B]">Résultat</h1>
        <p className="mt-1 line-clamp-2 text-[14px] text-[#64748B]">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-3 px-5">
        {/* Original */}
        <div className="rounded-2xl border border-[#E2E0D9] bg-white p-3 text-[14px] text-[#64748B]">
          Texte original : &ldquo;{text}&rdquo;
        </div>

        {simplified ? (
          <>
            <AnalysisCard
              title="Traduction claire"
              color="#3563E9"
              bgColor="#EFF3FE"
            >
              {result.clearTranslation}
            </AnalysisCard>
            <AnalysisCard
              title="Réponse courte"
              color="#2E7D5A"
              bgColor="#E8F5EE"
            >
              {result.shortAnswer}
            </AnalysisCard>
          </>
        ) : (
          <>
            <AnalysisCard
              title="Traduction claire"
              color="#3563E9"
              bgColor="#EFF3FE"
            >
              {result.clearTranslation}
            </AnalysisCard>

            {result.certain.length > 0 && (
              <AnalysisCard
                title="Ce qui est sûr"
                color="#2E7D5A"
                bgColor="#E8F5EE"
              >
                <ul className="space-y-1">
                  {result.certain.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#1E293B]">
                      <span className="text-[#5B9279]">✓</span> {c}
                    </li>
                  ))}
                </ul>
              </AnalysisCard>
            )}

            {result.uncertain.length > 0 && (
              <AnalysisCard
                title="Ce qui est incertain"
                color="#E67E22"
                bgColor="#FFF3E0"
              >
                <ul className="space-y-1">
                  {result.uncertain.map((u, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#1E293B]">
                      <span className="text-[#E67E22]">?</span> {u}
                    </li>
                  ))}
                </ul>
              </AnalysisCard>
            )}

            {result.hypotheses.length > 0 && (
              <HypothesisCard hypotheses={result.hypotheses} />
            )}

            <AnalysisCard
              title="Question à poser"
              color="#3563E9"
              bgColor="#EFF3FE"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[#1E293B]">{result.clarifyingQuestion}</p>
                <CopyButton text={result.clarifyingQuestion} />
              </div>
            </AnalysisCard>

            {/* Response variants */}
            <div>
              <h3 className="mb-2 text-[17px] font-semibold text-[#1E293B]">
                Propositions de réponse
              </h3>
              <div className="space-y-2">
                <ResponseVariantCard
                  variant="short"
                  text={result.shortAnswer}
                />
                <ResponseVariantCard
                  variant="direct"
                  text={result.directAnswer}
                />
                <ResponseVariantCard variant="soft" text={result.softAnswer} />
                <ResponseVariantCard
                  variant="professional"
                  text={result.professionalAnswer}
                />
                <ResponseVariantCard
                  variant="boundary"
                  text={result.boundaryAnswer}
                />
              </div>
            </div>

            {result.childVersion && (
              <AnalysisCard
                title="Version pour enfant"
                color="#2E7D5A"
                bgColor="#E8F5EE"
              >
                {result.childVersion}
              </AnalysisCard>
            )}

            {result.selfRegulationTip && (
              <AnalysisCard
                title="Conseil d'auto-régulation"
                color="#3563E9"
                bgColor="#EFF3FE"
              >
                {result.selfRegulationTip}
              </AnalysisCard>
            )}
          </>
        )}

        {/* Ethics banner */}
        <div className="rounded-2xl bg-[#FFF3E0] p-3 text-[12px] text-[#64748B]">
          <strong className="text-[#E67E22]">⚠ Prudence :</strong> Clair
          propose des hypothèses prudentes. L&apos;intention réelle d&apos;une personne ne
          peut pas être connue avec certitude.
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 mt-4 flex items-center gap-2 border-t border-[#E2E0D9] bg-white/80 px-5 py-3 backdrop-blur-sm">
        <button
          onClick={() => setSimplified(!simplified)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-[#E2E0D9] py-3 text-[14px] font-medium text-[#1E293B] transition-colors"
        >
          {simplified ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          {simplified ? "Tout voir" : "Simplifier"}
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-[14px] font-semibold text-white transition-all disabled:opacity-50"
          style={{ backgroundColor: saved ? "#5B9279" : "#3563E9" }}
        >
          <Bookmark size={16} />
          {saved ? "Sauvegardé" : "Sauvegarder"}
        </button>
        <button
          onClick={() => handleRead(result.clearTranslation)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-[#E2E0D9] py-3 text-[14px] font-medium text-[#1E293B] transition-colors"
        >
          <Volume2 size={16} />
          Lire
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

export default function ResultPage() {
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
      <ResultContent />
    </Suspense>
  );
}
