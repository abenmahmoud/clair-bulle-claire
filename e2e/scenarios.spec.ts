import { test, expect } from "@playwright/test";

test.describe("Bibliothèque de scénarios", () => {
  test("/scenarios renvoie 200 et liste des cartes", async ({ page }) => {
    const response = await page.goto("/scenarios");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(/Scénarios/i);

    const scenarioLinks = page.locator('a[href^="/scenarios/"]');
    const count = await scenarioLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("Un scénario détaillé affiche les sections principales", async ({
    page,
  }) => {
    await page.goto("/scenarios");
    const firstLink = page.locator('a[href^="/scenarios/"]').first();
    await firstLink.click();

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("body")).toContainText(/situation/i);
    await expect(page.locator("body")).toContainText(/traduction claire/i);
    await expect(page.locator("body")).toContainText(/hypothèses?/i);
    await expect(page.locator("body")).toContainText(/clarifier/i);
  });

  test("Page detail mentionne le statut de relecture", async ({ page }) => {
    await page.goto("/scenarios");
    const firstLink = page.locator('a[href^="/scenarios/"]').first();
    await firstLink.click();

    await expect(page.locator("body")).toContainText(/brouillon|relu|validé/i);
  });

  test("bandeau urgence visible sur scénario sensible", async ({ page }) => {
    await page.goto("/scenarios/ecole-camarade-tes-chelou");
    await expect(page.locator("aside")).toContainText(/3018|119|3114/);
  });

  test("scénarios standards n'affichent PAS de bandeau urgence", async ({
    page,
  }) => {
    await page.goto("/scenarios/travail-collegue-on-verra");
    const banners = page.locator("aside[aria-label='Information de soutien']");
    expect(await banners.count()).toBe(0);
  });
});
