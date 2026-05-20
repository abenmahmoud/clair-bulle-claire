import { NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/factory";
import type { AnalyzeInput } from "@/lib/ai/types";
import { analyzeText } from "@/lib/analysis";
import type { ContextType, TranslationDirection } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AnalyzeInput>;
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json({ error: "Texte manquant." }, { status: 400 });
    }

    const input: AnalyzeInput = {
      text,
      direction: sanitizeDirection(body.direction),
      context: sanitizeContext(body.context),
    };

    const provider = getAIProvider();

    if (!provider) {
      return NextResponse.json({
        result: analyzeText(input.text, input.direction, input.context),
        demo: true,
        provider: "mock",
        source: "fallback_scenario",
      });
    }

    try {
      const result = await provider.analyze(input);
      return NextResponse.json({
        result,
        demo: false,
        provider: provider.name,
        model: provider.model,
        source: "ai",
      });
    } catch (error) {
      console.error("[api/analyze] fallback mock", error);
      return NextResponse.json({
        result: analyzeText(input.text, input.direction, input.context),
        demo: true,
        provider: provider.name,
        source: "fallback_scenario",
        error: "Le fournisseur IA n'a pas repondu correctement. Fallback mock utilise.",
      });
    }
  } catch (error) {
    console.error("[api/analyze] invalid request", error);
    return NextResponse.json({ error: "Requete invalide." }, { status: 400 });
  }
}

function sanitizeDirection(value: unknown): TranslationDirection {
  if (
    value === "neurotypique-neuroatypique" ||
    value === "neuroatypique-neurotypique" ||
    value === "adulte-enfant" ||
    value === "enfant-adulte"
  ) {
    return value;
  }

  return "neurotypique-neuroatypique";
}

function sanitizeContext(value: unknown): ContextType {
  if (
    value === "travail" ||
    value === "couple" ||
    value === "famille" ||
    value === "amitie" ||
    value === "ecole" ||
    value === "administration" ||
    value === "inconnu"
  ) {
    return value;
  }

  return "inconnu";
}
