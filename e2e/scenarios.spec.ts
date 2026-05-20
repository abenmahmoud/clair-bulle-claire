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
});
