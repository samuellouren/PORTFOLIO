import { test, expect } from "@playwright/test";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-murex-zeta-35.vercel.app";

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

  // Dentro de route groups o Next acrescenta um hash ao caminho da imagem OG
  // (/opengraph-image-xxxx). O que importa e a URL que a pagina anuncia no
  // og:image: e ela que o crawler busca, entao e ela que o teste busca.
  test(`${rota} serve a imagem OG anunciada no og:image`, async ({ request }) => {
    const html = await (await request.get(rota)).text();
    const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1];
    expect(og, "og:image ausente").toBeTruthy();
    const caminho = new URL(og!.replace(/&amp;/g, "&")).pathname;
    expect(caminho.startsWith(rota === "/" ? "/opengraph-image" : "/en/opengraph-image")).toBe(true);
    const r = await request.get(caminho);
    expect(r.status()).toBe(200);
    expect(r.headers()["content-type"]).toContain("image");
  });
}
