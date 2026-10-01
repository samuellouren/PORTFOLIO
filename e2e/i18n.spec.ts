import { test, expect } from "@playwright/test";

test("as duas rotas existem e sao servidas pelo servidor", async ({ request }) => {
  expect((await request.get("/")).status()).toBe(200);
  expect((await request.get("/en")).status()).toBe(200);
});

test("cada rota declara seu idioma no <html>", async ({ request }) => {
  // Um root layout por idioma (app/(pt) e app/(en)/en): o <html lang> sai
  // certo no HTML servido, sem depender do <main lang> nem de JS.
  const pt = await (await request.get("/")).text();
  const en = await (await request.get("/en")).text();
  expect(pt).toMatch(/<html[^>]*lang="pt-BR"/);
  expect(en).toMatch(/<html[^>]*lang="en"/);
});

test("URL desconhecida devolve 404 com o tema do site", async ({ page }) => {
  const res = await page.goto("/nao-existe");
  expect(res!.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(20, 16, 13)");
  await expect(page.getByRole("link", { name: /Voltar ao início/ })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: /Back to home/ })).toHaveAttribute("href", "/en");
});
