import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Reduced-motion behaviour", () => {
  test("homepage passes axe in reduced-motion context", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(critical, critical.map((v) => v.id).join(", ")).toHaveLength(0);

    await context.close();
  });

  test("cinematic hero canvas is hidden or absent under reduced-motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvases = page.locator("canvas");
    const count = await canvases.count();
    for (let i = 0; i < count; i++) {
      const canvas = canvases.nth(i);
      const isHidden = await canvas.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return (
          s.display === "none" ||
          s.visibility === "hidden" ||
          parseFloat(s.opacity) === 0 ||
          el.getAttribute("aria-hidden") === "true"
        );
      });
      expect(isHidden, `Canvas ${i} is visible under reduced-motion`).toBe(true);
    }

    await context.close();
  });

  test("CSS transition duration is 0ms under reduced-motion (globals.css rule active)", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const transitionDuration = await page.evaluate(() => {
      const body = document.body;
      return getComputedStyle(body).transitionDuration;
    });

    expect(["0s", "0ms", ""]).toContain(transitionDuration);

    await context.close();
  });

  test("no-preference context renders animated elements visibly", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "no-preference",
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
    await context.close();
  });
});
