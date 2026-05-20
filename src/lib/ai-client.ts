import { analyzeText, generateResponses } from "@/lib/analysis";
import { anonymizeText } from "@/lib/anonymize";
import type {
  AnalysisResult,
  ContextType,
  ResponseVariant,
  TranslationDirection,
} from "@/types";

export type AnalysisSource = "scenario" | "cache" | "ai" | "fallback_scenario";

interface AnalyzeClientInput {
  text: string;
  direction: TranslationDirection;
  context: ContextType;
}

interface AnalyzeClientResult {
  result: AnalysisResult;
  demo: boolean;
  provider?: string;
  source?: AnalysisSource;
}

interface RespondClientInput {
  text: string;
  context: ContextType;
  tones: ResponseVariant[];
}

interface RespondClientResult {
  responses: Record<ResponseVariant, string>;
  demo: boolean;
  provider?: string;
}

export async function analyzeWithAI(input: AnalyzeClientInput): Promise<AnalyzeClientResult> {
  try {
    const anonymizedInput: AnalyzeClientInput = {
      ...input,
      text: anonymizeText(input.text),
    };

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(anonymizedInput),
    });

    if (!response.ok) throw new Error(`Analyse HTTP ${response.status}`);
    const payload = (await response.json()) as AnalyzeClientResult;
    if (!payload.result) throw new Error("Payload analyse invalide.");
    return payload;
  } catch (error) {
    console.warn("[ai-client] fallback mock analyze", error);
    return {
      result: analyzeText(input.text, input.direction, input.context),
      demo: true,
      provider: "mock",
      source: "fallback_scenario",
    };
  }
}

export async function generateResponsesWithAI(
  input: RespondClientInput
): Promise<RespondClientResult> {
  try {
    const response = await fetch("/api/respond", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) throw new Error(`Respond HTTP ${response.status}`);
    const payload = (await response.json()) as RespondClientResult;
    if (!payload.responses) throw new Error("Payload reponses invalide.");
    return payload;
  } catch (error) {
    console.warn("[ai-client] fallback mock respond", error);
    return {
      responses: generateResponses(input.text, input.context, input.tones),
      demo: true,
      provider: "mock",
    };
  }
}
