import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/portfolio", "/contact"];

for (const path of routes) {
  test.describe(`Accessibility — ${path}`, () => {
    test("has no critical or serious violations (WCAG 2.1 AA)", async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      const critical = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      if (critical.length > 0) {
        const summary = critical
          .map((v) => `[${v.impact}] ${v.id}: ${v.description}`)
          .join("\n");
        expect.fail(`Accessibility violations on ${path}:\n${summary}`);
      }
    });

    test("page has exactly one h1", async ({ page }) => {
      await page.goto(path);
      const count = await page.locator("h1").count();
      expect(count).toBe(1);
    });

    test("html lang attribute is set", async ({ page }) => {
      await page.goto(path);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBeTruthy();
    });

    test("all images have alt attributes", async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const images = await page.locator("img").all();
      for (const img of images) {
        const alt = await img.getAttribute("alt");
        const src = await img.getAttribute("src");
        expect(alt, `Missing alt on <img src="${src}">`).not.toBeNull();
      }
    });
  });
}
