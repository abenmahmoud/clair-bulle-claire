import { NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/factory";
import type { RespondInput } from "@/lib/ai/types";
import { generateResponses } from "@/lib/analysis";
import type { ContextType, ResponseVariant } from "@/types";

export const runtime = "nodejs";

const RESPONSE_VARIANTS: ResponseVariant[] = [
  "short",
  "direct",
  "soft",
  "professional",
  "boundary",
  "child",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RespondInput>;
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json({ error: "Texte manquant." }, { status: 400 });
    }

    const input: RespondInput = {
      text,
      context: sanitizeContext(body.context),
      tones: sanitizeTones(body.tones),
    };

    const provider = getAIProvider();

    if (!provider) {
      return NextResponse.json({
        responses: generateResponses(input.text, input.context, input.tones),
        demo: true,
        provider: "mock",
      });
    }

    try {
      const responses = await provider.generateResponses(input);
      return NextResponse.json({
        responses,
        demo: false,
        provider: provider.name,
        model: provider.model,
      });
    } catch (error) {
      console.error("[api/respond] fallback mock", error);
      return NextResponse.json({
        responses: generateResponses(input.text, input.context, input.tones),
        demo: true,
        provider: provider.name,
        error: "Le fournisseur IA n'a pas repondu correctement. Fallback mock utilise.",
      });
    }
  } catch (error) {
    console.error("[api/respond] invalid request", error);
    return NextResponse.json({ error: "Requete invalide." }, { status: 400 });
  }
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

function sanitizeTones(value: unknown): ResponseVariant[] {
  if (!Array.isArray(value)) return ["short", "direct", "soft"];
  const tones = value.filter((item): item is ResponseVariant =>
    RESPONSE_VARIANTS.includes(item as ResponseVariant)
  );
  return tones.length ? tones : ["short", "direct", "soft"];
}
