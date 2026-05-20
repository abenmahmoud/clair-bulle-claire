import { expect, test } from "@playwright/test";

test.describe("Page urgence (critique RGPD/sécurité)", () => {
  test("page /urgence est accessible directement", async ({ page }) => {
    const response = await page.goto("/urgence");
    expect(response?.status()).toBe(200);
  });

  test("contient au moins un numéro d'aide cliquable", async ({ page }) => {
    await page.goto("/urgence");
    const telLinks = page.locator('a[href^="tel:"]');
    await expect(telLinks.first()).toBeVisible();
  });

  test("contient le numéro 3114 (suicide écoute)", async ({ page }) => {
    await page.goto("/urgence");
    await expect(page.locator("body")).toContainText("3114");
  });
});
