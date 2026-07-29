import { test, expect } from "@playwright/test";

test("a pagina funciona com JS desabilitado", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Mapa Farma")).toBeVisible();
  await expect(page.getByText("o cliente queria um software gratuito")).toBeVisible();
  await ctx.close();
});

test("todo link recebe foco visivel na ordem do documento", async ({ page }) => {
  await page.goto("/");
  const links = await page.getByRole("link").count();
  expect(links).toBeGreaterThan(8);
  for (let i = 0; i < links; i++) {
    await page.keyboard.press("Tab");
    const estilo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return getComputedStyle(el).outlineStyle;
    });
    expect(estilo).not.toBe("none");
  }
});

test("nenhuma dependencia removida sobrou no bundle", async ({ page }) => {
  const js: string[] = [];
  page.on("response", (r) => {
    if (r.url().endsWith(".js")) js.push(r.url());
  });
  await page.goto("/");
  const corpo = await Promise.all(js.map(async (u) => (await page.request.get(u)).text()));
  const tudo = corpo.join("");
  expect(tudo).not.toContain("framer-motion");
  expect(tudo).not.toContain("react-router");
});
