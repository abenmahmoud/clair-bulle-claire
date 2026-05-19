"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Mic,
  Wand2,
  Loader2,
  RotateCcw,
  Bookmark,
  Check,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import ContextPicker from "@/components/ui/ContextPicker";
import Toast from "@/components/ui/Toast";
import { generateResponses } from "@/lib/analysis";
import { saveAnalysis } from "@/lib/storage";
import type { ContextType, ResponseVariant } from "@/types";

const TONES: { key: ResponseVariant; label: string; color: string }[] = [
  { key: "short", label: "Courte", color: "#3563E9" },
  { key: "direct", label: "Directe", color: "#2E7D5A" },
  { key: "soft", label: "Douce", color: "#E07A5F" },
  { key: "professional", label: "Professionnelle", color: "#64748B" },
  { key: "boundary", label: "Avec limite", color: "#C2413A" },
  { key: "child", label: "Enfant", color: "#9B8EC4" },
];

const EXAMPLES = [
  "Dire non à une invitation",
  "Demander de l'aide au travail",
  "Exprimer un désaccord",
  "Demander un délai",
  "Répondre à un message flou",
];

function RespondContent() {
  const searchParams = useSearchParams();
  const initialText = searchParams.get("text") || "";

  const [inputText, setInputText] = useState(initialText);
  const [context, setContext] = useState<ContextType>("inconnu");
  const [selectedTones, setSelectedTones] = useState<ResponseVariant[]>(
    TONES.map((t) => t.key)
  );
  const [responses, setResponses] = useState<Record<string, string> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  const toggleTone = (key: ResponseVariant) => {
    setSelectedTones((prev) =>
      prev.includes(key)
        ? prev.length > 1
          ? prev.filter((k) => k !== key)
          : prev
        : [...prev, key]
    );
  };

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setSaved(false);
    setTimeout(() => {
      const allResponses = generateResponses(inputText, context);
      const filtered: Record<string, string> = {};
      selectedTones.forEach((t) => {
        if (allResponses[t]) filtered[t] = allResponses[t];
      });
      setResponses(filtered);
      setIsLoading(false);
    }, 800);
  };

  const handleSave = () => {
    if (responses && inputText) {
      const result = {
        original: inputText,
        clearTranslation: "",
        literalMeaning: "",
        possibleSocialMeaning: "",
        certain: [],
        uncertain: [],
        hypotheses: [],
        clarifyingQuestion: "",
        shortAnswer: responses["short"] || "",
        directAnswer: responses["direct"] || "",
        softAnswer: responses["soft"] || "",
        professionalAnswer: responses["professional"] || "",
        boundaryAnswer: responses["boundary"] || "",
        childVersion: responses["child"] || undefined,
        voiceShortVersion: "",
      };
      saveAnalysis(inputText, result, "neuroatypique-neurotypique", context);
      setSaved(true);
      setToast({ message: "Réponses sauvegardées", visible: true });
    }
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
          M&apos;aider à répondre
        </h1>
        <p className="mt-1 text-[15px] text-[#64748B]">
          Écrivez ce que vous voulez dire, nous vous proposons des formulations.
        </p>
      </div>

      {/* Textarea */}
      <div className="mt-4 px-5">
        <div className="relative rounded-2xl border border-[#E2E0D9] bg-white p-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ex: Je veux dire non à une invitation mais je ne sais pas comment..."
            className="w-full resize-none border-0 bg-transparent text-[16px] leading-relaxed outline-none"
            style={{ minHeight: 140, color: "#1E293B" }}
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
            {inputText.length} / 500
          </span>
        </div>
      </div>

      {/* Context */}
      <div className="mt-4 px-5">
        <h2 className="text-[17px] font-semibold text-[#1E293B]">Contexte</h2>
        <div className="mt-2">
          <ContextPicker selected={context} onChange={setContext} />
        </div>
      </div>

      {/* Tones */}
      <div className="mt-4 px-5">
        <h2 className="text-[17px] font-semibold text-[#1E293B]">
          Tons souhaités
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {TONES.map((tone) => {
            const isActive = selectedTones.includes(tone.key);
            return (
              <button
                key={tone.key}
                onClick={() => toggleTone(tone.key)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all active:scale-95"
                style={{
                  borderColor: isActive ? tone.color : "#E2E0D9",
                  backgroundColor: isActive ? tone.color + "18" : "#FFFFFF",
                  color: isActive ? tone.color : "#64748B",
                }}
              >
                {isActive && <Check size={14} />}
                {tone.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Examples */}
      <div className="mt-3 px-5">
        <p className="mb-2 text-[13px] font-medium text-[#64748B]">
          Exemples :
        </p>
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setInputText(ex)}
              className="whitespace-nowrap rounded-full border border-[#E2E0D9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#64748B] transition-transform active:scale-95"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <div className="mt-4 px-5">
        <button
          onClick={handleGenerate}
          disabled={!inputText.trim() || isLoading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#5B9279] text-[16px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Réflexion en cours...
            </>
          ) : (
            <>
              <Wand2 size={20} />
              Proposer des versions
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {responses && (
        <div className="mt-4 space-y-2 px-5 pb-6">
          <h3 className="text-[17px] font-semibold text-[#1E293B]">
            Réponses proposées
          </h3>
          {Object.entries(responses).map(([key, text]) => {
            return (
              <ResponseVariantCard
                key={key}
                variant={key as ResponseVariant}
                text={text}
              />
            );
          })}

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setResponses(null);
                setInputText("");
                setSaved(false);
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-[#E2E0D9] py-3 text-[14px] font-medium text-[#1E293B]"
            >
              <RotateCcw size={16} />
              Recommencer
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-[14px] font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: saved ? "#5B9279" : "#3563E9" }}
            >
              <Bookmark size={16} />
              {saved ? "Sauvegardé" : "Sauvegarder"}
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-[#64748B]">
            Ces formulations sont des suggestions. Adaptez-les à votre situation
            et votre relation avec la personne.
          </p>
        </div>
      )}

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast({ message: "", visible: false })}
      />
    </AppShell>
  );
}

export default function RespondPage() {
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
      <RespondContent />
    </Suspense>
  );
}
