import { buildAnalyzePrompt, buildRespondPrompt } from "./prompts";
import {
  AIProvider,
  AnalyzeInput,
  normalizeAnalysisResult,
  normalizeResponses,
  parseJsonObject,
  RespondInput,
} from "./types";

interface KimiChatResponse {
  choices?: Array<{ message?: { content?: string | null } }>;
}

export function createKimiProvider(apiKey: string, model: string): AIProvider {
  return {
    name: "kimi",
    model,
    async analyze(input: AnalyzeInput) {
      const text = await callKimi(apiKey, model, buildAnalyzePrompt(input));
      return normalizeAnalysisResult(parseJsonObject(text), input);
    },
    async generateResponses(input: RespondInput) {
      const text = await callKimi(apiKey, model, buildRespondPrompt(input));
      return normalizeResponses(
        parseJsonObject(text),
        "Je veux repondre clairement et calmement.",
        input.tones
      );
    },
  };
}

async function callKimi(apiKey: string, model: string, prompt: string): Promise<string> {
  const response = await fetch("https://api.moonshot.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Tu reponds uniquement en JSON valide. Aucun markdown. Aucun commentaire hors JSON.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Erreur Kimi ${response.status}: ${details}`);
  }

  const data = (await response.json()) as KimiChatResponse;
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Kimi n'a pas retourne de texte.");
  return text;
}
