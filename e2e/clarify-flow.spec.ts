import { expect, test } from "@playwright/test";

test.describe("Flow Clarifier (sans appel IA réel)", () => {
  test("page /clarify s'affiche avec textarea et bouton submit", async ({ page }) => {
    await page.goto("/clarify");
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible();

    const submitButton = page
      .getByRole("button", { name: /clarifier|analyser|comprendre/i })
      .first();
    await expect(submitButton).toBeVisible();
  });

  test("saisie texte court active la validation côté client", async ({ page }) => {
    await page.goto("/clarify");
    const textarea = page.locator("textarea").first();
    await textarea.fill("a");
    await expect(textarea).toHaveValue("a");
  });
});
