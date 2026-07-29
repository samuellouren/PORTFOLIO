import { test, expect } from "@playwright/test";

const BASE = "https://samuellourenco.dev";

for (const [rota, locale] of [["/", "pt_BR"], ["/en", "en_US"]] as const) {
  test(`${rota} tem OG e twitter completos`, async ({ request }) => {
    const html = await (await request.get(rota)).text();
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/property="og:image"/);
    expect(html).toMatch(/property="og:type"/);
    expect(html).toContain(locale);
    expect(html).toMatch(/name="twitter:card" content="summary_large_image"/);
  });

  // Presenca nao basta: um canonical apontando para a rota errada diz ao
  // buscador que esta pagina e duplicata da outra, e some sem aviso.
  test(`${rota} aponta canonical e hreflang para os alvos certos`, async ({ request }) => {
    const html = await (await request.get(rota)).text();
    const canonicalEsperado = rota === "/" ? `${BASE}/` : `${BASE}/en`;

    const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/i)?.[1];
    expect(canonical?.replace(/\/$/, "")).toBe(canonicalEsperado.replace(/\/$/, ""));

    const alternates = [...html.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/gi)].map(
      ([, lang, href]) => [lang.toLowerCase(), href.replace(/\/$/, "")]
    );
    expect(alternates).toContainEqual(["pt-br", BASE]);
    expect(alternates).toContainEqual(["en", `${BASE}/en`]);
  });

  test(`${rota} serve a imagem OG`, async ({ request }) => {
    const r = await request.get(rota === "/" ? "/opengraph-image" : "/en/opengraph-image");
    expect(r.status()).toBe(200);
    expect(r.headers()["content-type"]).toContain("image");
  });
}
