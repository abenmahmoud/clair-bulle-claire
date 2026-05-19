"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Minimize2,
  Volume2,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import AnalysisCard from "@/components/ui/AnalysisCard";
import HypothesisCard from "@/components/ui/HypothesisCard";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import Toast from "@/components/ui/Toast";
import { analyzeText } from "@/lib/analysis";
import { saveAnalysis } from "@/lib/storage";
import { ContextType, ResponseVariant, TranslationDirection } from "@/types";

type ViewMode = "minimal" | "essential" | "complete";

function firstSentence(text: string): string {
  const [first] = text.split(/(?<=[.!?])\s+/);
  return first || text;
}

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
  const [viewMode, setViewMode] = useState<ViewMode>("essential");
  const [toast, setToast] = useState({ message: "", visible: false });
  const [saved, setSaved] = useState(false);

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

  const toggleLightMode = () => {
    setViewMode((current) => (current === "minimal" ? "essential" : "minimal"));
  };

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

  const essentialVariants = responseVariants.slice(0, 3);

  return (
    <AppShell>
      <div>
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
          <div className="bg-[#EFF3FE] rounded-2xl p-4 border border-[#3563E9]/10">
            <p className="text-xs font-medium text-[#3563E9] mb-1">
              Phrase analysée
            </p>
            <p className="text-base font-medium text-[#1E293B]">&ldquo;{text}&rdquo;</p>
          </div>

          {viewMode === "minimal" && (
            <section className="space-y-3">
              <AnalysisCard title="En une phrase" color="#3563E9" bgColor="#EFF3FE">
                <p className="text-base text-[#1E293B] leading-relaxed">
                  {firstSentence(result.clearTranslation)}
                </p>
              </AnalysisCard>
              <AnalysisCard title="Tu peux répondre" color="#5B9279" bgColor="#E8F5EE">
                <p className="text-base text-[#1E293B] leading-relaxed">
                  {result.shortAnswer}
                </p>
              </AnalysisCard>
              <button
                onClick={() => setViewMode("essential")}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
              >
                <ChevronDown size={16} strokeWidth={1.5} />
                Afficher un peu plus
              </button>
            </section>
          )}

          {viewMode === "essential" && (
            <section className="space-y-4">
              <AnalysisCard title="Traduction claire" color="#3563E9" bgColor="#EFF3FE">
                <p className="text-sm text-[#1E293B] leading-relaxed">
                  {result.clearTranslation}
                </p>
              </AnalysisCard>
              <AnalysisCard title="Question à poser" color="#9B8EC4" bgColor="#F3F1F9">
                <p className="text-sm text-[#1E293B] leading-relaxed italic">
                  &ldquo;{result.clarifyingQuestion}&rdquo;
                </p>
              </AnalysisCard>

              <div>
                <h2 className="text-base font-semibold text-[#1E293B] mb-3">
                  Réponses utiles
                </h2>
                <div className="space-y-3">
                  {essentialVariants.map((rv, i) => (
                    <div
                      key={rv.variant}
                      className="animate-stagger"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <ResponseVariantCard variant={rv.variant} text={rv.text} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setViewMode("complete")}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
              >
                <ChevronDown size={16} strokeWidth={1.5} />
                Voir l&apos;analyse complète
              </button>
            </section>
          )}

          {viewMode === "complete" && (
            <section className="space-y-4">
              {[
                <AnalysisCard key="clear" title="Traduction claire" color="#3563E9" bgColor="#EFF3FE">
                  <p className="text-sm text-[#1E293B] leading-relaxed">
                    {result.clearTranslation}
                  </p>
                </AnalysisCard>,
                <AnalysisCard key="literal" title="Sens littéral" color="#5B9279" bgColor="#E8F5EE">
                  <p className="text-sm text-[#1E293B] leading-relaxed">
                    {result.literalMeaning}
                  </p>
                </AnalysisCard>,
                <AnalysisCard key="social" title="Sens social possible" color="#E07A5F" bgColor="#FDF1EE">
                  <p className="text-sm text-[#1E293B] leading-relaxed">
                    {result.possibleSocialMeaning}
                  </p>
                </AnalysisCard>,
                <AnalysisCard key="certain" title="Ce qui est sûr" color="#5B9279" bgColor="#E8F5EE">
                  <ul className="space-y-1.5">
                    {result.certain.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#1E293B]">
                        <span className="text-[#5B9279] mt-1 shrink-0">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AnalysisCard>,
                <AnalysisCard key="uncertain" title="Ce qui est incertain" color="#D4A017" bgColor="#FDF8E8">
                  <ul className="space-y-1.5">
                    {result.uncertain.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#1E293B]">
                        <span className="text-[#D4A017] mt-1 shrink-0">?</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AnalysisCard>,
                <HypothesisCard key="hypotheses" hypotheses={result.hypotheses} />,
                <AnalysisCard key="question" title="Question à poser" color="#9B8EC4" bgColor="#F3F1F9">
                  <p className="text-sm text-[#1E293B] leading-relaxed italic">
                    &ldquo;{result.clarifyingQuestion}&rdquo;
                  </p>
                </AnalysisCard>,
              ].map((card, i) => (
                <div
                  key={card.key}
                  className="animate-stagger"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {card}
                </div>
              ))}

              <div>
                <h2 className="text-base font-semibold text-[#1E293B] mb-3">
                  Réponses suggérées
                </h2>
                <div className="space-y-3">
                  {responseVariants.map((rv, i) => (
                    <div
                      key={rv.variant}
                      className="animate-stagger"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <ResponseVariantCard variant={rv.variant} text={rv.text} />
                    </div>
                  ))}
                </div>
              </div>

              {result.selfRegulationTip && (
                <AnalysisCard title="Conseil de régulation" color="#5B9279" bgColor="#E8F5EE">
                  <p className="text-sm text-[#1E293B] leading-relaxed">
                    {result.selfRegulationTip}
                  </p>
                </AnalysisCard>
              )}

              <button
                onClick={() => setViewMode("essential")}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
              >
                <ChevronUp size={16} strokeWidth={1.5} />
                Replier l&apos;analyse
              </button>
            </section>
          )}

          <div className="bg-[#FDF8E8] border border-[#FDF8E8] rounded-2xl p-4 flex items-start gap-3">
            <div style={{ color: "#D4A017" }} className="shrink-0 mt-0.5">
              <AlertTriangle size={18} strokeWidth={1.5} />
            </div>
            <p className="text-xs text-[#D4A017] leading-relaxed">
              Ces hypothèses sont des pistes, pas des vérités. Chaque situation est unique.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={toggleLightMode}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
            >
              <Minimize2 size={16} strokeWidth={1.5} />
              {viewMode === "minimal" ? "Essentiel" : "Alléger"}
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
    </AppShell>
  );
}
