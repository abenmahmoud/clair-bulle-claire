import { createClaudeProvider } from "./claude";
import { createKimiProvider } from "./kimi";
import { createOpenAIProvider } from "./openai";
import type { AIProvider } from "./types";

type ProviderName = "claude" | "openai" | "kimi";

const DEFAULT_MODELS: Record<ProviderName, string> = {
  claude: "claude-sonnet-4-20250514",
  openai: "gpt-4o-mini",
  kimi: "kimi-k2.6",
};

export function getAIProvider(): AIProvider | null {
  const preferred = normalizeProvider(process.env.AI_PROVIDER);
  const order = preferred
    ? [preferred, ...(["claude", "openai", "kimi"] as ProviderName[]).filter((name) => name !== preferred)]
    : (["claude", "openai", "kimi"] as ProviderName[]);

  for (const providerName of order) {
    const provider = createProvider(providerName);
    if (provider) return provider;
  }

  return null;
}

function createProvider(providerName: ProviderName): AIProvider | null {
  if (providerName === "claude") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;
    return createClaudeProvider(apiKey, process.env.ANTHROPIC_MODEL || DEFAULT_MODELS.claude);
  }

  if (providerName === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    return createOpenAIProvider(apiKey, process.env.OPENAI_MODEL || DEFAULT_MODELS.openai);
  }

  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) return null;
  return createKimiProvider(apiKey, process.env.MOONSHOT_MODEL || DEFAULT_MODELS.kimi);
}

function normalizeProvider(value: string | undefined): ProviderName | null {
  if (value === "claude" || value === "openai" || value === "kimi") return value;
  return null;
}
