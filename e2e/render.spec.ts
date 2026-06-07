import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", name: "homepage" },
  { path: "/portfolio", name: "portfolio index" },
  { path: "/contact", name: "contact" },
];

for (const { path, name } of routes) {
  test.describe(`${name} (${path})`, () => {
    test("loads and renders a visible heading", async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const heading = page.locator("h1, h2").first();
      await expect(heading).toBeVisible();
    });

    test("responds with 200-level status", async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
    });

    test("renders no uncaught console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      expect(errors).toHaveLength(0);
    });
  });
}

test.describe("API health route", () => {
  test("/api/health returns ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ status: "ok" });
  });
});
