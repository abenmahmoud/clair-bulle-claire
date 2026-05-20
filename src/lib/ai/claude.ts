import { buildAnalyzePrompt, buildRespondPrompt } from "./prompts";
import {
  AIProvider,
  AnalyzeInput,
  normalizeAnalysisResult,
  normalizeResponses,
  parseJsonObject,
  RespondInput,
} from "./types";

interface ClaudeMessageResponse {
  content?: Array<{ type: string; text?: string }>;
}

export function createClaudeProvider(apiKey: string, model: string): AIProvider {
  return {
    name: "claude",
    model,
    async analyze(input: AnalyzeInput) {
      const text = await callClaude(apiKey, model, buildAnalyzePrompt(input));
      return normalizeAnalysisResult(parseJsonObject(text), input);
    },
    async generateResponses(input: RespondInput) {
      const text = await callClaude(apiKey, model, buildRespondPrompt(input));
      return normalizeResponses(
        parseJsonObject(text),
        "Je veux repondre clairement et calmement.",
        input.tones
      );
    },
  };
}

async function callClaude(apiKey: string, model: string, prompt: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1600,
      temperature: 0.2,
      system:
        "Tu reponds uniquement en JSON valide. Aucun markdown. Aucun commentaire hors JSON.",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Erreur Claude ${response.status}: ${details}`);
  }

  const data = (await response.json()) as ClaudeMessageResponse;
  const text = data.content
    ?.filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("\n");

  if (!text) throw new Error("Claude n'a pas retourne de texte.");
  return text;
}
