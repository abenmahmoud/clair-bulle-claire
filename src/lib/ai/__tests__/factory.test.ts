import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("AI factory", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.OPENAI_API_KEY;
    delete process.env.MOONSHOT_API_KEY;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("module factory peut être importé sans crash même sans clés", async () => {
    process.env.AI_PROVIDER = "claude";
    const factory = await import("../factory");
    expect(factory).toBeDefined();
    expect(factory.getAIProvider()).toBeNull();
  });

  it("AI_PROVIDER=claude sélectionne un provider claude-compatible", async () => {
    process.env.AI_PROVIDER = "claude";
    process.env.ANTHROPIC_API_KEY = "sk-ant-test-key";

    const factory = await import("../factory");
    const provider = factory.getAIProvider();

    expect(provider).toBeDefined();
    expect(provider?.name).toBe("claude");
  });
});
