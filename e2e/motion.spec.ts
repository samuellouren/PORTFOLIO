import { test, expect } from "@playwright/test";

test("a entrada existe por padrao", async ({ page }) => {
  await page.goto("/");
  const dur = await page
    .locator(".entrada")
    .first()
    .evaluate((el) => getComputedStyle(el).animationDuration);
  expect(dur).toBe("0.25s");
});

test.describe("com reduced motion", () => {
  test("nenhuma animacao roda", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const dur = await page
      .locator(".entrada")
      .first()
      .evaluate((el) => getComputedStyle(el).animationDuration);
    expect(dur).toBe("1e-05s");
  });
});
