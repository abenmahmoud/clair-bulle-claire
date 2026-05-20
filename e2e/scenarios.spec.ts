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

  test("filtre Bulle Claire affiche au moins 10 scénarios enfant", async ({
    page,
  }) => {
    await page.goto("/scenarios?mode=bulle-claire");
    const scenarioLinks = page.locator('a[href^="/scenarios/bc-"]');
    expect(await scenarioLinks.count()).toBeGreaterThanOrEqual(10);
  });

  test("scénario Bulle Claire affiche le badge mode enfant", async ({ page }) => {
    await page.goto("/scenarios/bc-cantine-personne-veut-asseoir");
    await expect(page.locator("body")).toContainText(/Mode enfant|Bulle Claire/i);
  });

  test("scénario du secret oriente vers un adulte dans la page détail", async ({
    page,
  }) => {
    await page.goto("/scenarios/bc-secret-camarade-malaise");
    await expect(page.locator("body")).toContainText(
      /adulte|parent|ma[îi]tre|ma[îi]tresse/i
    );
  });

  test("filtres mode et age combinables", async ({ page }) => {
    await page.goto("/scenarios?mode=bulle-claire&age=10");
    const scenarioLinks = page.locator('a[href^="/scenarios/bc-"]');
    expect(await scenarioLinks.count()).toBeGreaterThan(0);
  });
});
