"use client";

import { useState, useCallback } from "react";
import { RotateCcw, Bookmark } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ContextPicker from "@/components/ui/ContextPicker";
import ResponseVariantCard from "@/components/ui/ResponseVariantCard";
import Toast from "@/components/ui/Toast";
import { generateResponses } from "@/lib/analysis";
import { saveAnalysis } from "@/lib/storage";
import { AnalysisResult, ContextType, ResponseVariant } from "@/types";

const toneOptions: { value: ResponseVariant; label: string; color: string; bgColor: string }[] = [
  { value: "short", label: "Courte", color: "#5B9279", bgColor: "#E8F5EE" },
  { value: "direct", label: "Directe", color: "#3563E9", bgColor: "#EFF3FE" },
  { value: "soft", label: "Douce", color: "#E07A5F", bgColor: "#FDF1EE" },
  { value: "professional", label: "Professionnelle", color: "#64748B", bgColor: "#F1F5F9" },
  { value: "boundary", label: "Avec limite", color: "#C2413A", bgColor: "#FDF0EF" },
  { value: "child", label: "Pour enfant", color: "#9B8EC4", bgColor: "#F3F1F9" },
];

export default function RespondContent() {
  const [text, setText] = useState("");
  const [context, setContext] = useState<ContextType>("inconnu");
  const [selectedTones, setSelectedTones] = useState<ResponseVariant[]>([
    "short",
    "direct",
    "soft",
  ]);
  const [responses, setResponses] = useState<Record<ResponseVariant, string> | null>(null);
  const [toast, setToast] = useState({ message: "", visible: false });

  const toggleTone = (tone: ResponseVariant) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    );
  };

  const handleGenerate = useCallback(() => {
    if (!text.trim() || selectedTones.length === 0) return;
    const generated = generateResponses(text, context, selectedTones);
    setResponses(generated);
  }, [text, context, selectedTones]);

  const handleRestart = useCallback(() => {
    setText("");
    setResponses(null);
    setContext("inconnu");
    setSelectedTones(["short", "direct", "soft"]);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  const handleSave = useCallback(() => {
    if (!responses) return;
    const firstResponse = Object.values(responses)[0] || "";
    const result: AnalysisResult = {
      original: text,
      clearTranslation: firstResponse,
      literalMeaning: "Demande de reformulation sociale.",
      possibleSocialMeaning: "L'utilisateur cherche une formulation plus claire ou mieux reçue.",
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

  const isValid = text.trim().length > 0 && selectedTones.length > 0;

  return (
    <AppShell>
      <main className="px-5 pt-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1E293B] mb-1">
            M&apos;aider à répondre
          </h1>
          <p className="text-sm text-[#64748B]">
            Écris ce qu&apos;on t&apos;a dit, choisis un ton, et laisse-toi guider.
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: 'Tu viens à la fête ce soir ?'"
            maxLength={500}
            className="w-full min-h-[100px] p-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm text-[#1E293B] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#3563E9] focus:ring-2 focus:ring-[#3563E9]/10 transition-all resize-none"
          />
          <div className="text-right mt-1">
            <span className="text-xs text-[#64748B]">{text.length}/500</span>
          </div>
        </div>

        {/* Context */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
            Contexte
          </h2>
          <ContextPicker selected={context} onChange={setContext} />
        </div>

        {/* Tone Selector */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
            Tons souhaités
          </h2>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((tone) => {
              const isSelected = selectedTones.includes(tone.value);
              return (
                <button
                  key={tone.value}
                  onClick={() => toggleTone(tone.value)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "text-white shadow-sm"
                      : "bg-white text-[#64748B] border border-[#E2E0D9] hover:border-[#3563E9] hover:text-[#3563E9]"
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: tone.color }
                      : undefined
                  }
                >
                  {tone.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        {!responses && (
          <div className="mb-6">
            <button
              onClick={handleGenerate}
              disabled={!isValid}
              className={`w-full py-3.5 px-6 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-200 ${
                isValid
                  ? "bg-[#3563E9] text-white hover:bg-[#2547B3] active:scale-[0.98]"
                  : "bg-[#E2E0D9] text-[#64748B] cursor-not-allowed"
              }`}
            >
              Générer des réponses
            </button>
          </div>
        )}

        {/* Responses */}
        {responses && (
          <div className="mb-6">
            <h2 className="text-base font-semibold text-[#1E293B] mb-3">
              Réponses proposées
            </h2>
            <div className="space-y-3">
              {Object.entries(responses).map(([variant, text], i) => (
                <div
                  key={variant}
                  className={`animate-stagger stagger-${Math.min(i + 1, 6)}`}
                >
                  <ResponseVariantCard
                    variant={variant as ResponseVariant}
                    text={text}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {responses && (
          <div className="flex gap-3 pb-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
            >
              <Bookmark size={16} strokeWidth={1.5} />
              Sauvegarder
            </button>
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#E2E0D9] rounded-2xl text-sm font-medium text-[#1E293B] hover:bg-[#F1F0EB] transition-colors"
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

    </AppShell>
  );
}
