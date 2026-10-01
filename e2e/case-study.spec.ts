import { test, expect } from "@playwright/test";
import { featured, projects } from "../data/projects";
import { slugOf } from "../data/types";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-murex-zeta-35.vercel.app";

const rotas = featured.flatMap((p) => {
  const slug = slugOf(p.title);
  return [
    { p, slug, lang: "pt-BR", url: `/projetos/${slug}`, outra: `/en/projects/${slug}`, kicker: "estudo de caso" },
    { p, slug, lang: "en", url: `/en/projects/${slug}`, outra: `/projetos/${slug}`, kicker: "case study" },
  ] as const;
});

for (const r of rotas) {
  test(`${r.url} sai renderizado no servidor, com lang, titulo e metadata proprios`, async ({ request }) => {
    const res = await request.get(r.url);
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(html).toMatch(new RegExp(`<html[^>]*lang="${r.lang}"`));
    expect(html).toContain(`<title>${r.p.title} — ${r.kicker} · Samuel Lourenço</title>`);
    expect(html).toMatch(new RegExp(`<h1[^>]*>${r.p.title}</h1>`));
    expect(html).toContain(r.lang === "en" ? r.p.description.en : r.p.description.pt);

    const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/i)?.[1];
    expect(canonical).toBe(`${BASE}${r.url}`);
    expect(html).toMatch(new RegExp(`hrefLang="en" href="${BASE}/en/projects/${r.slug}"`, "i"));
    expect(html).toMatch(new RegExp(`hrefLang="pt-BR" href="${BASE}/projetos/${r.slug}"`, "i"));
    expect(html).toMatch(/property="og:type" content="article"/);
    expect(html).toMatch(/name="twitter:card" content="summary_large_image"/);

    const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1];
    const caminho = new URL(og!.replace(/&amp;/g, "&")).pathname;
    expect(caminho.startsWith(`${r.url}/opengraph-image`)).toBe(true);
    const img = await request.get(caminho);
    expect(img.status()).toBe(200);
    expect(img.headers()["content-type"]).toContain("image");
  });
}

test("blocos com fonte aparecem; blocos sem fonte nao", async ({ page }) => {
  // Hoje nenhum projeto tem galeria, desafio ou aprendizado. Arquitetura e
  // decisoes vieram dos READMEs e docs dos repositorios.
  for (const r of rotas) {
    await page.goto(r.url);
    for (const id of ["galeria", "desafio", "aprendizado"]) {
      await expect(page.getByTestId(`case-${id}`), `${r.url} ${id}`).toHaveCount(0);
    }
    for (const id of ["arquitetura", "decisoes"]) {
      await expect(page.getByTestId(`case-${id}`), `${r.url} ${id}`).toHaveCount(1);
    }
    const texto = await page.locator("main").innerText();
    for (const rotulo of ["Galeria", "Maior desafio", "O que faria diferente",
      "Gallery", "Hardest problem", "What I'd do differently"]) {
      expect(texto, `${r.url} mostra "${rotulo}"`).not.toContain(rotulo);
    }
  }
  // FocusDrop nao tem resultado: o rotulo nao aparece vazio.
  await page.goto("/projetos/focusdrop");
  await expect(page.getByTestId("case-study")).toContainText("Origem");
  await expect(page.getByTestId("case-study")).not.toContainText("Resultado");
});

test("o contexto e as decisoes moram na pagina do caso", async ({ page }) => {
  await page.goto("/projetos/mapa-farma");
  await expect(page.getByTestId("case-study")).toContainText("Problema");
  const dec = page.getByTestId("case-decisoes");
  for (const t of ["Google Maps", "PWA", "150 m", "point-in-polygon", "UTC−3", "papéis"]) {
    await expect(dec).toContainText(t);
  }
  await expect(page.getByTestId("case-arquitetura")).toContainText("Nominatim");
  await page.goto("/projetos/chute-do-vidente");
  await expect(page.getByTestId("case-study")).toContainText("Origem");
  await expect(page.getByTestId("case-study")).not.toContainText("Problema");
});

test("a pagina do caso expande a descricao em vez de repetir o resumo da home", async ({ page }) => {
  for (const r of rotas) {
    await page.goto(r.url);
    const resumo = r.lang === "en" ? r.p.resumo!.en : r.p.resumo!.pt;
    await expect(page.locator("main"), r.url).not.toContainText(resumo);
  }
});

test("da home ao estudo de caso, ao proximo e de volta", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("case-link-mapa-farma").click();
  await expect(page).toHaveURL(/\/projetos\/mapa-farma$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mapa Farma");

  // proximo segue a ordem dos destaques na home
  const i = featured.findIndex((p) => p.title === "Mapa Farma");
  const proximo = featured[(i + 1) % featured.length];
  await page.getByTestId("case-nav").getByRole("link", { name: new RegExp(proximo.title) }).click();
  await expect(page).toHaveURL(new RegExp(`/projetos/${slugOf(proximo.title)}$`));

  await page.getByTestId("case-nav").getByRole("link", { name: /Voltar aos projetos/ }).click();
  await expect(page).toHaveURL(/\/#projetos$/);
});

test("o ultimo destaque aponta de volta para o primeiro", async ({ page }) => {
  const ultimo = featured[featured.length - 1];
  await page.goto(`/en/projects/${slugOf(ultimo.title)}`);
  await expect(
    page.getByTestId("case-nav").getByRole("link", { name: new RegExp(featured[0].title) })
  ).toHaveAttribute("href", `/en/projects/${slugOf(featured[0].title)}`);
  await expect(page.getByTestId("case-nav").getByRole("link", { name: /Back to projects/ }))
    .toHaveAttribute("href", "/en#projetos");
});

test("troca de idioma leva ao mesmo estudo de caso e o timbre volta para a home", async ({ page }) => {
  await page.goto("/projetos/chute-do-vidente");
  await expect(page.getByRole("link", { name: "EN", exact: true })).toHaveAttribute(
    "href",
    "/en/projects/chute-do-vidente"
  );
  await expect(page.locator("header").getByRole("link", { name: "Projetos" })).toHaveAttribute(
    "href",
    "/#projetos"
  );
  await page.goto("/en/projects/chute-do-vidente");
  await expect(page.getByRole("link", { name: "PT", exact: true })).toHaveAttribute(
    "href",
    "/projetos/chute-do-vidente"
  );
});

test("links externos do estudo de caso vem do projeto", async ({ page }) => {
  for (const p of featured) {
    await page.goto(`/projetos/${slugOf(p.title)}`);
    const stack = page.getByTestId("case-stack");
    await expect(stack.getByRole("link", { name: /^Código/ })).toHaveAttribute("href", p.github);
    if (p.demo) {
      await expect(stack.getByRole("link", { name: /^Demo/ })).toHaveAttribute("href", p.demo);
    } else {
      await expect(stack.getByRole("link", { name: /^Demo/ })).toHaveCount(0);
    }
    for (const t of p.tech) await expect(stack).toContainText(t);
  }
});

for (const largura of [1440, 375]) {
  test(`em ${largura}px, Problema/Origem e Resultado ficam abaixo do print, na largura da coluna`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 900 });
    for (const p of featured) {
      await page.goto(`/projetos/${slugOf(p.title)}`);
      const coluna = (await page.getByTestId("case-study").boundingBox())!;
      const shot = (await page.getByTestId("case-shot").boundingBox())!;
      const campos = (await page.getByTestId("case-fields").boundingBox())!;
      expect(campos.y, p.title).toBeGreaterThanOrEqual(shot.y + shot.height);
      expect(campos.width, p.title).toBeCloseTo(coluna.width, 0);
    }
  });
}

test("print principal tem alt descritivo", async ({ page }) => {
  await page.goto("/projetos/mapa-farma");
  const alt = await page.getByTestId("case-shot").locator("img").getAttribute("alt");
  expect(alt).toContain("mapa de Maceió");
});

test("projeto fora dos destaques nao tem pagina", async ({ request }) => {
  const resto = projects.find((p) => !p.featured)!;
  expect((await request.get(`/projetos/${slugOf(resto.title)}`)).status()).toBe(404);
  expect((await request.get(`/en/projects/${slugOf(resto.title)}`)).status()).toBe(404);
});

test("o sitemap lista os estudos de caso nos dois idiomas", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const p of featured) {
    expect(xml).toContain(`<loc>${BASE}/projetos/${slugOf(p.title)}</loc>`);
    expect(xml).toContain(`<loc>${BASE}/en/projects/${slugOf(p.title)}</loc>`);
  }
});

test("estudo de caso funciona com JS desabilitado", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/projetos/chute-do-vidente");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Chute do Vidente");
  await expect(page.getByTestId("project-meta")).toHaveText("2026 · no ar");
  await ctx.close();
});

test("cada destaque da home aponta para o seu estudo de caso", async ({ page }) => {
  for (const [home, prefixo, texto] of [["/", "/projetos/", "Ler estudo de caso"], ["/en", "/en/projects/", "Read case study"]] as const) {
    await page.goto(home);
    for (const p of featured) {
      const link = page.getByTestId(`case-link-${slugOf(p.title)}`);
      await expect(link).toHaveAttribute("href", `${prefixo}${slugOf(p.title)}`);
      await expect(link).toContainText(texto);
    }
  }
});
