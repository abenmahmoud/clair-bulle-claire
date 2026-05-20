import { expect, test } from "@playwright/test";

test.describe("Page d'accueil", () => {
  test("affiche le titre principal et les CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Clair/i);
    await expect(page.locator("body")).toContainText(/Clair/i);
  });

  test("nav bottom contient les 5 liens principaux", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").last();
    await expect(nav.getByRole("link", { name: /accueil/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /clarifier/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /répondre/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /enfant/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /historique/i })).toBeVisible();
  });

  test("footer contient les pages légales obligatoires", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer").first();
    await expect(footer.getByRole("link", { name: /à propos/i })).toBeVisible();
    await expect(footer.getByRole("link", { name: /éthique/i })).toBeVisible();
    await expect(
      footer.getByRole("link", { name: /confidentialité/i })
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: /mentions légales/i })
    ).toBeVisible();
    await expect(footer.getByRole("link", { name: /urgences/i })).toBeVisible();
  });
});
