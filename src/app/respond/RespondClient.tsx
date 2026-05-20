"use client";

import { useCallback, useMemo, useState } from "react";
import { Bookmark, Check, Loader2, RotateCcw, Wand2 } from "lucide-react";
import { DistressOverlay } from "@/components/DistressOverlay";
import ContextPicker from "@/components/ui/ContextPicker";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import Toast from "@/components/ui/Toast";
import { generateResponsesWithAI } from "@/lib/ai-client";
import { detectDistress } from "@/lib/distress-detection";
import { saveAnalysis } from "@/lib/storage";
import type { AnalysisResult, ContextType, ResponseVariant } from "@/types";

type ToneKey = "short" | "soft" | "direct" | "professional" | "boundary" | "child";

const TONE_ORDER: ToneKey[] = [
  "short",
  "soft",
  "direct",
  "professional",
  "boundary",
  "child",
];
const DEFAULT_TONES: ToneKey[] = ["short", "soft", "direct"];
const ADDITIONAL_TONES: ToneKey[] = ["professional", "boundary", "child"];

const TONE_LABELS: Record<ToneKey, string> = {
  short: "Courte",
  soft: "Douce",
  direct: "Directe",
  professional: "Pro",
  boundary: "Avec une limite",
  child: "Pour un enfant",
};

const toneOptions: {
  value: ResponseVariant;
  label: string;
  color: string;
  bgColor: string;
}[] = [
  { value: "short", label: TONE_LABELS.short, color: "#5B9279", bgColor: "#E8F5EE" },
  { value: "soft", label: TONE_LABELS.soft, color: "#E07A5F", bgColor: "#FDF1EE" },
  { value: "direct", label: TONE_LABELS.direct, color: "#3563E9", bgColor: "#EFF3FE" },
  {
    value: "professional",
    label: TONE_LABELS.professional,
    color: "#64748B",
    bgColor: "#F1F5F9",
  },
  {
    value: "boundary",
    label: TONE_LABELS.boundary,
    color: "#C2413A",
    bgColor: "#FDF0EF",
  },
  { value: "child", label: TONE_LABELS.child, color: "#9B8EC4", bgColor: "#F3F1F9" },
];

function ToneResponseSection({
  responses,
}: {
  responses: Partial<Record<ResponseVariant, string>>;
}) {
  const [showMoreTones, setShowMoreTones] = useState(false);

  const renderTone = (tone: ToneKey, index: number) => {
    const text = responses[tone];
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
    <section className="space-y-3">
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
    </section>
  );
}

export function RespondClient() {
  const [text, setText] = useState("");
  const [context, setContext] = useState<ContextType>("inconnu");
  const [selectedTones, setSelectedTones] = useState<ResponseVariant[]>(TONE_ORDER);
  const [responses, setResponses] = useState<Record<ResponseVariant, string> | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDistress, setShowDistress] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  const orderedResponses = useMemo(() => {
    if (!responses) return null;
    return TONE_ORDER.reduce<Partial<Record<ResponseVariant, string>>>((acc, tone) => {
      if (responses[tone]) acc[tone] = responses[tone];
      return acc;
    }, {});
  }, [responses]);

  const toggleTone = (tone: ResponseVariant) => {
    setSelectedTones((prev) => {
      if (prev.includes(tone)) {
        return prev.length > 1 ? prev.filter((item) => item !== tone) : prev;
      }
      return [...prev, tone];
    });
  };

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  const runGenerate = useCallback(() => {
    if (!text.trim() || selectedTones.length === 0) return;

    setIsLoading(true);
    void generateResponsesWithAI({
      text: text.trim(),
      context,
      tones: selectedTones,
    }).then((payload) => {
      setResponses(payload.responses);
      setDemoMode(payload.demo);
      setIsLoading(false);
    });
  }, [context, selectedTones, text]);

  const handleGenerate = useCallback(() => {
    if (detectDistress(text)) {
      setShowDistress(true);
      return;
    }

    runGenerate();
  }, [runGenerate, text]);

  const handleRestart = useCallback(() => {
    setText("");
    setResponses(null);
    setContext("inconnu");
    setSelectedTones(TONE_ORDER);
    setDemoMode(false);
  }, []);

  const handleSave = useCallback(() => {
    if (!responses) return;
    const firstResponse = Object.values(responses)[0] || "";
    const result: AnalysisResult = {
      original: text,
      clearTranslation: firstResponse,
      literalMeaning: "Demande de reformulation sociale.",
      possibleSocialMeaning:
        "L'utilisateur cherche une formulation plus claire ou mieux reçue.",
      certain: ["L'utilisateur veut répondre avec un ton adapté."],
      uncertain: ["Le contexte exact et la réaction de l'autre personne restent inconnus."],
      hypotheses: [],
      clarifyingQuestion: "Quel ton veux-tu garder dans ta réponse ?",
      shortAnswer: responses.short || firstResponse,
      directAnswer: responses.direct || firstResponse,
      softAnswer: responses.soft || firstResponse,
      professionalAnswer: responses.professional || firstResponse,
      boundaryAnswer: responses.boundary || firstResponse,
      childVersion: responses.child,
      voiceShortVersion: responses.short || firstResponse,
      selfRegulationTip: "Tu peux relire la réponse une fois avant de l'envoyer.",
    };
    saveAnalysis(text, result, "neuroatypique-neurotypique", context);
    showToast("Réponses sauvegardées");
  }, [context, responses, showToast, text]);

  const isValid = text.trim().length > 0 && selectedTones.length > 0 && !isLoading;

  if (showDistress) {
    return (
      <DistressOverlay
        onContinue={() => {
          setShowDistress(false);
          runGenerate();
        }}
      />
    );
  }

  return (
    <>
      <main className="px-5 pb-8 pt-6">
        <div className="mb-6">
          <h1 className="mb-1 text-xl font-bold text-[#1E293B]">
            M&apos;aider à répondre
          </h1>
          <p className="text-sm text-[#64748B]">
            Écris ce qu&apos;on t&apos;a dit, choisis un ton, et laisse-toi guider.
          </p>
        </div>

        <div className="mb-6">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Ex: 'Tu viens à la fête ce soir ?'"
            maxLength={500}
            className="min-h-[110px] w-full resize-none rounded-2xl border border-[#E2E0D9] bg-white p-4 text-sm text-[#1E293B] placeholder:text-[#64748B]/60 transition-all focus:border-[#3563E9] focus:outline-none focus:ring-2 focus:ring-[#3563E9]/10"
          />
          <div className="mt-1 text-right">
            <span className="text-xs text-[#64748B]">{text.length}/500</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold text-[#1E293B]">Contexte</h2>
          <ContextPicker selected={context} onChange={setContext} />
        </div>

        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold text-[#1E293B]">Tons souhaités</h2>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((tone) => {
              const isSelected = selectedTones.includes(tone.value);
              return (
                <button
                  key={tone.value}
                  type="button"
                  onClick={() => toggleTone(tone.value)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "text-white shadow-sm"
                      : "border border-[#E2E0D9] bg-white text-[#64748B] hover:border-[#3563E9] hover:text-[#3563E9]"
                  }`}
                  style={isSelected ? { backgroundColor: tone.color } : undefined}
                >
                  {isSelected && <Check size={14} strokeWidth={2} />}
                  {tone.label}
                </button>
              );
            })}
          </div>
        </div>

        {!responses && (
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!isValid}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold shadow-lg transition-all duration-200 ${
                isValid
                  ? "bg-[#3563E9] text-white hover:bg-[#2547B3] active:scale-[0.98]"
                  : "cursor-not-allowed bg-[#E2E0D9] text-[#64748B]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" strokeWidth={2} />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 size={16} strokeWidth={1.5} />
                  Générer des réponses
                </>
              )}
            </button>
          </div>
        )}

        {responses && orderedResponses && (
          <div className="mb-6">
            {demoMode && (
              <div className="mb-4 rounded-2xl border border-[#D4A017]/30 bg-[#FDF8E8] p-4">
                <p className="text-xs font-semibold text-[#9A6B00]">Mode démo</p>
                <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                  Aucune clé IA serveur n&apos;est active ou le fournisseur a échoué. Clair
                  affiche des réponses simulées.
                </p>
              </div>
            )}

            <h2 className="mb-3 text-base font-semibold text-[#1E293B]">
              Réponses proposées
            </h2>
            <ToneResponseSection responses={orderedResponses} />
          </div>
        )}

        {responses && (
          <div className="flex gap-3 pb-4">
            <button
              type="button"
              onClick={handleSave}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
            >
              <Bookmark size={16} strokeWidth={1.5} />
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition-colors hover:bg-[#F1F0EB]"
            >
              <RotateCcw size={16} strokeWidth={1.5} />
              Recommencer
            </button>
          </div>
        )}
      </main>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast({ message: "", visible: false })}
      />
    </>
  );
}
