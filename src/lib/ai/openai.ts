import { buildAnalyzePrompt, buildRespondPrompt } from "./prompts";
import {
  AIProvider,
  AnalyzeInput,
  normalizeAnalysisResult,
  normalizeResponses,
  parseJsonObject,
  RespondInput,
} from "./types";

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string | null } }>;
}

export function createOpenAIProvider(apiKey: string, model: string): AIProvider {
  return {
    name: "openai",
    model,
    async analyze(input: AnalyzeInput) {
      const text = await callOpenAI(apiKey, model, buildAnalyzePrompt(input));
      return normalizeAnalysisResult(parseJsonObject(text), input);
    },
    async generateResponses(input: RespondInput) {
      const text = await callOpenAI(apiKey, model, buildRespondPrompt(input));
      return normalizeResponses(
        parseJsonObject(text),
        "Je veux repondre clairement et calmement.",
        input.tones
      );
    },
  };
}

async function callOpenAI(apiKey: string, model: string, prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
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
    throw new Error(`Erreur OpenAI ${response.status}: ${details}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenAI n'a pas retourne de texte.");
  return text;
}
