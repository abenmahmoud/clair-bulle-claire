import { expect, test } from "@playwright/test";

test.describe("Configuration PWA", () => {
  test("manifest.json est servi avec les bonnes clés", async ({ request }) => {
    const response = await request.get("/manifest.json");
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.theme_color).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe("standalone");
  });

  test("favicon.ico est servi", async ({ request }) => {
    const response = await request.get("/favicon.ico");
    expect(response.status()).toBe(200);
  });

  test("balises meta PWA présentes dans le HTML", async ({ page }) => {
    await page.goto("/");
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveCount(1);
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute("href", "/manifest.json");
  });
});
