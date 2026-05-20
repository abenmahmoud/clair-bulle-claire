import type {
  AnalysisHypothesis,
  AnalysisResult,
  ConfidenceLevel,
  ContextType,
  ResponseVariant,
  TranslationDirection,
} from "@/types";

export interface AnalyzeInput {
  text: string;
  direction: TranslationDirection;
  context: ContextType;
}

export interface RespondInput {
  text: string;
  context: ContextType;
  tones: ResponseVariant[];
}

export interface AIProvider {
  name: "claude" | "openai" | "kimi";
  model: string;
  analyze(input: AnalyzeInput): Promise<AnalysisResult>;
  generateResponses(input: RespondInput): Promise<Record<ResponseVariant, string>>;
}

const RESPONSE_VARIANTS: ResponseVariant[] = [
  "short",
  "direct",
  "soft",
  "professional",
  "boundary",
  "child",
];

const VALID_CONFIDENCE = new Set(["faible", "moyenne", "prudente"]);

export function parseJsonObject(text: string): unknown {
  const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("La reponse IA ne contient pas de JSON exploitable.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export function normalizeAnalysisResult(data: unknown, input: AnalyzeInput): AnalysisResult {
  const payload = isRecord(data) ? data : {};

  return {
    original: asString(payload.original, input.text),
    clearTranslation: asString(
      payload.clearTranslation,
      "Il manque des informations pour proposer une traduction fiable. Une possibilite est de demander une precision."
    ),
    literalMeaning: asString(payload.literalMeaning, "Sens litteral non precise."),
    possibleSocialMeaning: asString(
      payload.possibleSocialMeaning,
      "Plusieurs lectures sont possibles selon le contexte."
    ),
    certain: asStringArray(payload.certain, ["Le message a ete formule dans une situation sociale."]),
    uncertain: asStringArray(payload.uncertain, [
      "L'intention reelle de l'autre personne ne peut pas etre connue avec certitude.",
    ]),
    hypotheses: normalizeHypotheses(payload.hypotheses),
    clarifyingQuestion: asString(
      payload.clarifyingQuestion,
      "Peux-tu me dire ce que tu voulais dire exactement ?"
    ),
    shortAnswer: asString(payload.shortAnswer, "D'accord, peux-tu preciser ?"),
    directAnswer: asString(
      payload.directAnswer,
      "Je veux etre sur de bien comprendre. Que veux-tu dire exactement ?"
    ),
    softAnswer: asString(
      payload.softAnswer,
      "Je ne suis pas certain d'avoir bien compris. Est-ce que tu peux me le dire autrement ?"
    ),
    professionalAnswer: asString(
      payload.professionalAnswer,
      "Pour avancer clairement, pouvez-vous preciser votre attente ?"
    ),
    boundaryAnswer: asString(
      payload.boundaryAnswer,
      "J'ai besoin d'une information plus claire avant de repondre."
    ),
    childVersion: maybeString(payload.childVersion),
    voiceShortVersion: asString(
      payload.voiceShortVersion,
      "Il y a plusieurs possibilites. Le plus prudent est de demander une precision."
    ),
    selfRegulationTip: maybeString(payload.selfRegulationTip),
  };
}

export function normalizeResponses(
  data: unknown,
  fallbackText: string,
  tones: ResponseVariant[]
): Record<ResponseVariant, string> {
  const payload = isRecord(data) ? data : {};
  const responses = {} as Record<ResponseVariant, string>;

  for (const tone of tones) {
    if (RESPONSE_VARIANTS.includes(tone)) {
      responses[tone] = asString(payload[tone], fallbackText);
    }
  }

  return responses;
}

function normalizeHypotheses(value: unknown): AnalysisHypothesis[] {
  if (!Array.isArray(value)) {
    return [
      {
        text: "Une possibilite est que le message soit ambigu et necessite une verification.",
        confidence: "prudente",
      },
    ];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      return {
        text: asString(item.text, ""),
        confidence: normalizeConfidence(item.confidence),
      } satisfies AnalysisHypothesis;
    })
    .filter((item): item is AnalysisHypothesis => Boolean(item?.text))
    .slice(0, 4);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeConfidence(value: unknown): ConfidenceLevel {
  const confidence = asString(value, "prudente");
  return VALID_CONFIDENCE.has(confidence) ? (confidence as ConfidenceLevel) : "prudente";
}

function maybeString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const items = value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0
  );
  return items.length ? items.map((item) => item.trim()) : fallback;
}
