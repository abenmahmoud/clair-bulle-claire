import { expect, test } from "@playwright/test";

const legalPages = [
  { path: "/a-propos", title: /À propos|A propos/i },
  { path: "/ethique", title: /éthique|Ethique/i },
  { path: "/confidentialite", title: /Confidentialité|Confidentialite/i },
  { path: "/legal", title: /mentions légales|Mentions légales|Legal/i },
  { path: "/roadmap", title: /Roadmap/i },
];

test.describe("Pages légales et publiques", () => {
  for (const { path, title } of legalPages) {
    test(`${path} renvoie 200 avec contenu`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("body")).toContainText(title);
    });
  }

  test("/roadmap affiche les 3 statuts (Terminé, En cours, Prévu)", async ({
    page,
  }) => {
    await page.goto("/roadmap");
    const body = page.locator("body");
    await expect(body).toContainText("Terminé");
    await expect(body).toContainText("En cours");
    await expect(body).toContainText("Prévu");
  });
});
