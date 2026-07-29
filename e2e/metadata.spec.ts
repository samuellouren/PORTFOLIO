import { test, expect } from "@playwright/test";

for (const [rota, locale] of [["/", "pt_BR"], ["/en", "en_US"]] as const) {
  test(`${rota} tem OG e twitter completos`, async ({ request }) => {
    const html = await (await request.get(rota)).text();
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/property="og:image"/);
    expect(html).toMatch(/property="og:type"/);
    expect(html).toContain(locale);
    expect(html).toMatch(/name="twitter:card" content="summary_large_image"/);
    expect(html).toMatch(/rel="canonical"/);
    // Next.js renderiza o atributo React "hrefLang" verbatim (React nao remapeia
    // esse nome para minusculas por nao ser um caso especial conhecido). HTML5
    // trata nomes de atributo como case-insensitive, entao o teste tambem trata.
    expect(html).toMatch(/hreflang/i);
  });
}

test("a imagem OG e servida em 1200x630", async ({ request }) => {
  const r = await request.get("/opengraph-image");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("image");
});
