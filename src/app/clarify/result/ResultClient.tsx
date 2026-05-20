"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Loader2,
  Minimize2,
  Volume2,
} from "lucide-react";
import AnalysisCard from "@/components/ui/AnalysisCard";
import { DistressOverlay } from "@/components/DistressOverlay";
import HypothesisCard from "@/components/ui/HypothesisCard";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import Toast from "@/components/ui/Toast";
import { analyzeWithAI } from "@/lib/ai-client";
import { detectDistress } from "@/lib/distress-detection";
import { saveAnalysis } from "@/lib/storage";
import type {
  AnalysisResult,
  ContextType,
  ResponseVariant,
  TranslationDirection,
} from "@/types";

type ViewMode = "minimal" | "essential" | "complete";
type ToneKey = "short" | "soft" | "direct" | "professional" | "boundary" | "child";

const DEFAULT_TONES: ToneKey[] = ["short", "soft", "direct"];
const ADDITIONAL_TONES: ToneKey[] = ["professional", "boundary", "child"];

function firstSentence(text: string): string {
  const [first] = text.split(/(?<=[.!?])\s+/);
  return first || text;
}

function getToneText(result: AnalysisResult, tone: ToneKey): string | undefined {
  const values: Record<ToneKey, string | undefined> = {
    short: result.shortAnswer,
    soft: result.softAnswer,
    direct: result.directAnswer,
    professional: result.professionalAnswer,
    boundary: result.boundaryAnswer,
    child: result.childVersion,
  };

  return values[tone];
}

function ToneResponseSection({ result }: { result: AnalysisResult }) {
  const [showMoreTones, setShowMoreTones] = useState(false);

  const renderTone = (tone: ToneKey, index: number) => {
    const text = getToneText(result, tone);
    if (!text) return null;

    return (
      <div
        key={tone}
        className="animate-stagger"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <ResponseVariantCard variant={tone as ResponseVariant} text={text} />
      </div>
    );
  };

  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-[#1E293B]">
        Réponses utiles
      </h2>
      <div className="space-y-3">
        {DEFAULT_TONES.map(renderTone)}

        {!showMoreTones && (
          <button
            type="button"
            onClick={() => setShowMoreTones(true)}
            className="w-full rounded-2xl border border-dashed border-[#94A3B8] bg-transparent py-3 text-sm font-medium text-[#475569] hover:bg-[#F1F5F9]"
          >
            Voir d&apos;autres tons (pro, limite, enfant)
          </button>
        )}

        {showMoreTones &&
          ADDITIONAL_TONES.map((tone, index) =>
            renderTone(tone, DEFAULT_TONES.length + index)
          )}
      </div>
    </section>
  );
}

export function ResultClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const text = searchParams.get("text") || "";
  const direction =
    (searchParams.get("direction") as TranslationDirection) ||
    "neurotypique-neuroatypique";
  const context = (searchParams.get("context") as ContextType) || "inconnu";

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("essential");
  const [toast, setToast] = useState({ message: "", visible: false });
  const [saved, setSaved] = useState(false);
  const [showDistress, setShowDistress] = useState(() => detectDistress(text));

  useEffect(() => {
    if (showDistress) return;

    let cancelled = false;

    void analyzeWithAI({ text, direction, context }).then((payload) => {
      if (cancelled) return;
      setResult(payload.result);
      setDemoMode(payload.demo);
    });

    return () => {
      cancelled = true;
    };
  }, [text, direction, context, showDistress]);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  const handleSave = useCallback(() => {
    if (!result) return;
    saveAnalysis(text, result, direction, context);
    setSaved(true);
    showToast("Analyse sauvegardée");
  }, [context, direction, result, showToast, text]);

  const handleSpeak = useCallback(() => {
    if (!result) return;
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(result.voiceShortVersion);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Lecture vocale non disponible");
    }
  }, [result, showToast]);

  const completeCards = useMemo(() => {
    if (!result) return [];

    return [
      {
        id: "clear",
        node: (
          <AnalysisCard title="Traduction claire" color="#3563E9" bgColor="#EFF3FE">
            <p className="text-sm leading-relaxed text-[#1E293B]">
              {result.clearTranslation}
            </p>
          </AnalysisCard>
        ),
      },
      {
        id: "literal",
        node: (
          <AnalysisCard title="Sens littéral" color="#5B9279" bgColor="#E8F5EE">
            <p className="text-sm leading-relaxed text-[#1E293B]">
              {result.literalMeaning}
            </p>
          </AnalysisCard>
        ),
      },
      {
        id: "social",
        node: (
          <AnalysisCard title="Sens social possible" color="#E07A5F" bgColor="#FDF1EE">
            <p className="text-sm leading-relaxed text-[#1E293B]">
              {result.possibleSocialMeaning}
            </p>
          </AnalysisCard>
        ),
      },
      {
        id: "certain",
        node: (
          <AnalysisCard title="Ce qui est sûr" color="#5B9279" bgColor="#E8F5EE">
            <ul className="space-y-1.5">
              {result.certain.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[#1E293B]"
                >
                  <span className="mt-1 shrink-0 text-[#5B9279]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnalysisCard>
        ),
      },
      {
        id: "uncertain",
        node: (
          <AnalysisCard title="Ce qui est incertain" color="#D4A017" bgColor="#FDF8E8">
            <ul className="space-y-1.5">
              {result.uncertain.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[#1E293B]"
                >
                  <span className="mt-1 shrink-0 text-[#D4A017]">?</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnalysisCard>
        ),
      },
      { id: "hypotheses", node: <HypothesisCard hypotheses={result.hypotheses} /> },
      {
        id: "question",
        node: (
          <AnalysisCard title="Question à poser" color="#9B8EC4" bgColor="#F3F1F9">
            <p className="text-sm italic leading-relaxed text-[#1E293B]">
              &ldquo;{result.clarifyingQuestion}&rdquo;
            </p>
          </AnalysisCard>
        ),
      },
    ];
  }, [result]);

  if (showDistress) {
    return <DistressOverlay onContinue={() => setShowDistress(false)} />;
  }

  if (!result) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#3563E9]" />
        <p className="text-[#64748B]">Analyse en cours...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="sticky top-0 z-40 border-b border-[#E2E0D9] bg-[#F8F6F0]/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => router.push("/clarify")}
              className="flex items-center gap-1 text-sm text-[#64748B] transition-colors hover:text-[#1E293B]"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
              Retour
            </button>
            <h1 className="max-w-[200px] truncate text-sm font-semibold text-[#1E293B]">
              {text.length > 30 ? `${text.substring(0, 30)}...` : text}
            </h1>
            <div className="w-16" />
          </div>
        </div>

        <main className="space-y-4 px-5 pb-8 pt-4">
          <div className="rounded-2xl border border-[#3563E9]/10 bg-[#EFF3FE] p-4">
            <p className="mb-1 text-xs font-medium text-[#3563E9]">Phrase analysée</p>
            <p className="text-base font-medium text-[#1E293B]">&ldquo;{text}&rdquo;</p>
          </div>

          {demoMode && (
            <div className="rounded-2xl border border-[#D4A017]/30 bg-[#FDF8E8] p-4">
              <p className="text-xs font-semibold text-[#9A6B00]">Mode démo</p>
              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                Aucune clé IA serveur n&apos;est active ou le fournisseur a échoué. Clair
                affiche une analyse simulée pour préserver l&apos;expérience.
              </p>
            </div>
          )}

          {viewMode === "minimal" && (
            <section className="space-y-3">
              <AnalysisCard title="En une phrase" color="#3563E9" bgColor="#EFF3FE">
                <p className="text-base leading-relaxed text-[#1E293B]">
                  {firstSentence(result.clearTranslation)}
                </p>
              </AnalysisCard>
              <AnalysisCard title="Tu peux répondre" color="#5B9279" bgColor="#E8F5EE">
                <p className="text-base leading-relaxed text-[#1E293B]">
                  {result.shortAnswer}
                </p>
              </AnalysisCard>
              <button
                type="button"
                onClick={() => setViewMode("essential")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
              >
                <ChevronDown size={16} strokeWidth={1.5} />
                Afficher un peu plus
              </button>
            </section>
          )}

          {viewMode === "essential" && (
            <section className="space-y-4">
              <AnalysisCard title="Traduction claire" color="#3563E9" bgColor="#EFF3FE">
                <p className="text-sm leading-relaxed text-[#1E293B]">
                  {result.clearTranslation}
                </p>
              </AnalysisCard>
              <AnalysisCard title="Question à poser" color="#9B8EC4" bgColor="#F3F1F9">
                <p className="text-sm italic leading-relaxed text-[#1E293B]">
                  &ldquo;{result.clarifyingQuestion}&rdquo;
                </p>
              </AnalysisCard>

              <ToneResponseSection result={result} />

              <button
                type="button"
                onClick={() => setViewMode("complete")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
              >
                <ChevronDown size={16} strokeWidth={1.5} />
                Voir l&apos;analyse complète
              </button>
            </section>
          )}

          {viewMode === "complete" && (
            <section className="space-y-4">
              {completeCards.map((card, index) => (
                <div
                  key={card.id}
                  className="animate-stagger"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {card.node}
                </div>
              ))}

              <ToneResponseSection result={result} />

              {result.selfRegulationTip && (
                <AnalysisCard title="Conseil de régulation" color="#5B9279" bgColor="#E8F5EE">
                  <p className="text-sm leading-relaxed text-[#1E293B]">
                    {result.selfRegulationTip}
                  </p>
                </AnalysisCard>
              )}

              <button
                type="button"
                onClick={() => setViewMode("essential")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
              >
                <ChevronUp size={16} strokeWidth={1.5} />
                Replier l&apos;analyse
              </button>
            </section>
          )}

          <div className="flex items-start gap-3 rounded-2xl border border-[#FDF8E8] bg-[#FDF8E8] p-4">
            <div style={{ color: "#D4A017" }} className="mt-0.5 shrink-0">
              <AlertTriangle size={18} strokeWidth={1.5} />
            </div>
            <p className="text-xs leading-relaxed text-[#D4A017]">
              Ces hypothèses sont des pistes, pas des vérités. L&apos;intention réelle
              d&apos;une personne ne peut pas être connue avec certitude.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                setViewMode((current) => (current === "minimal" ? "essential" : "minimal"))
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
            >
              <Minimize2 size={16} strokeWidth={1.5} />
              {viewMode === "minimal" ? "Essentiel" : "Alléger"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
            >
              <Bookmark
                size={16}
                strokeWidth={1.5}
                className={saved ? "text-[#3563E9]" : ""}
              />
              {saved ? "Sauvegardé" : "Sauvegarder"}
            </button>
            <button
              type="button"
              onClick={handleSpeak}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
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
    </>
  );
}
