import { test, expect } from "@playwright/test";

test("o fundo da pagina usa torra e o texto usa serragem", async ({ page }) => {
  await page.goto("/");
  const body = page.locator("body");
  await expect(body).toHaveCSS("background-color", "rgb(20, 16, 13)");
  await expect(body).toHaveCSS("color", "rgb(233, 225, 213)");
});

test("o corpo usa Newsreader e o titulo usa Bricolage Grotesque", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS("font-family", /Newsreader/);
  await expect(page.locator("h1")).toHaveCSS("font-family", /Bricolage/);
});

test("o titulo renderiza em peso 600, nao no peso padrao do corpo", async ({ page }) => {
  // Regressao: uma classe utilitaria morta (`font-600`, que o Tailwind nao gera)
  // compilava para nada e o h1 caia de volta no peso herdado do body. `font-semibold`
  // e a utilidade real do Tailwind para peso 600 e precisa aparecer computada no DOM.
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCSS("font-weight", "600");
});
