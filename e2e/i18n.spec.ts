import { test, expect } from "@playwright/test";

test("as duas rotas existem e sao servidas pelo servidor", async ({ request }) => {
  expect((await request.get("/")).status()).toBe(200);
  expect((await request.get("/en")).status()).toBe(200);
});

test("cada rota declara seu idioma", async ({ request }) => {
  // O App Router so permite um <html>, no root layout, entao /en declara
  // o idioma no <main>. Ver a decisao registrada na Task 10.
  const pt = await (await request.get("/")).text();
  const en = await (await request.get("/en")).text();
  expect(pt).toContain('lang="pt-BR"');
  expect(en).toMatch(/<main[^>]*lang="en"/);
});
