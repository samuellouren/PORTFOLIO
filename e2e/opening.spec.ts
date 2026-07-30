import { test, expect } from "@playwright/test";

test("a abertura nao usa os cliches removidos", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("Disponível para novas oportunidades");
  expect(html).not.toContain("Projetos publicados");
  expect(html).not.toContain("balcão");
  expect(html).not.toMatch(/>0[123]</);
});

test("a abertura traz nome, funcao e os dois CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Samuel Lourenço");
  await expect(page.getByRole("link", { name: /ver projetos/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /currículo/i })).toBeVisible();
});

test("cada rota serve a copy do seu idioma", async ({ request }) => {
  const pt = await (await request.get("/")).text();
  const en = await (await request.get("/en")).text();
  expect(pt).toContain("Projetos");
  expect(en).toContain("Work");
});

test("cada rota aponta para a outra", async ({ page }) => {
  await page.goto("/");
  // exact:true evita colisao por substring: "Lourenço" contem "en" e casaria
  // com uma busca por "EN" nao-exata (Playwright faz match case-insensitive
  // por substring por padrao).
  await expect(page.getByRole("link", { name: "EN", exact: true })).toHaveAttribute("href", "/en");
  await page.goto("/en");
  await expect(page.getByRole("link", { name: "PT", exact: true })).toHaveAttribute("href", "/");
});

test("existe skip link como primeiro foco", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveAttribute("href", "#conteudo");
});
