import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
const USE_DEV = process.env.PLAYWRIGHT_USE_DEV === "1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: USE_DEV
      ? `npm run dev -- --hostname 127.0.0.1 --port ${PORT}`
      : "npm run build && npm run start",
    url: BASE_URL,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
