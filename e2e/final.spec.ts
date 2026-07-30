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
    // Varios links tem a classe "transition-colors", cuja transition-property
    // (definida pelo Tailwind v4) inclui outline-color. Isso anima a cor do
    // outline a partir da cor de texto do proprio link ate a brasa em ~150ms
    // (--default-transition-duration). Esperamos a transicao assentar antes
    // de ler o estilo computado — senao capturamos o quadro inicial da
    // animacao, que ainda nao é a cor final.
    await page.waitForTimeout(200);
    const estilo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const cs = getComputedStyle(el);
      return { outlineStyle: cs.outlineStyle, outlineColor: cs.outlineColor };
    });
    // Confirma o estilo de foco definido em app/globals.css (:focus-visible),
    // nao so a ausencia de "none" — outline:auto do navegador tambem passaria
    // nesse teste mais fraco sem nenhum CSS de foco estar de fato aplicado.
    expect(estilo.outlineStyle).toBe("solid");
    expect(estilo.outlineColor).toBe("rgb(206, 103, 51)"); // --color-brasa: #CE6733
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
