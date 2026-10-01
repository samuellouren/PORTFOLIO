import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { featured } from "../data/projects";
import { caseHref, slugOf } from "../data/types";

// Revisão final antes das candidaturas: texto provisório, metadados por
// página, 404 nos dois idiomas, acessibilidade (axe) e largura de 360px.

const casos = featured.map((p) => slugOf(p.title));
const paginas = [
  "/",
  "/en",
  ...casos.map((s) => caseHref(s, "pt")),
  ...casos.map((s) => caseHref(s, "en")),
];

test("nenhuma página tem texto provisório", async ({ request }) => {
  // Palavra inteira: "independente" não é "pendente". E "TODO" só em
  // maiúsculas, na linha de baixo: "todo" é palavra comum em português.
  const provisorio = /\b(FIXME|pendente|lorem ipsum|em breve|coming soon|placeholder)\b/i;
  for (const rota of [...paginas, "/nao-existe"]) {
    const html = await (await request.get(rota)).text();
    const visivel = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    expect(visivel.match(provisorio)?.[0], rota).toBeUndefined();
    expect(html, rota).not.toMatch(/\bTODO\b/);
  }
});

test("cada página tem title e description próprios, e og:image que responde", async ({ request }) => {
  const titulos = new Set<string>();
  const descricoes = new Set<string>();
  for (const rota of paginas) {
    const html = await (await request.get(rota)).text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    expect(title, `${rota} sem title`).toBeTruthy();
    expect(description, `${rota} sem description`).toBeTruthy();
    expect(titulos.has(title!), `${rota}: title repetido`).toBe(false);
    expect(descricoes.has(description!), `${rota}: description repetida`).toBe(false);
    titulos.add(title!);
    descricoes.add(description!);

    const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1];
    expect(og, `${rota} sem og:image`).toBeTruthy();
    const r = await request.get(new URL(og!.replace(/&amp;/g, "&")).pathname);
    expect(r.status(), `${rota} og:image`).toBe(200);
    expect(r.headers()["content-type"]).toContain("image/png");
  }
});

test("o sitemap lista a home e os três casos nos dois idiomas", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const rota of paginas) {
    expect(xml, rota).toMatch(new RegExp(`<loc>[^<]*${rota === "/" ? "" : rota}</loc>`));
  }
  expect(xml.match(/<url>/g)).toHaveLength(paginas.length);
});

for (const rota of ["/nao-existe", "/en/nao-existe", "/projetos/nao-existe", "/en/projects/nao-existe"]) {
  test(`404 em ${rota}: status certo, texto nos dois idiomas e volta para as duas homes`, async ({ page }) => {
    const res = await page.goto(rota);
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada.");
    await expect(page.getByText("Page not found.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Voltar ao início/ })).toHaveAttribute("href", "/");
    await expect(page.getByRole("link", { name: /Back to home/ })).toHaveAttribute("href", "/en");
  });
}

for (const rota of paginas) {
  test(`axe: ${rota} sem violação séria ou crítica`, async ({ page }) => {
    await page.goto(rota);
    // A entrada da home anima opacidade; o axe mede contraste no quadro atual.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForLoadState("networkidle");
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const graves = violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(graves).toEqual([]);
  });
}

for (const rota of ["/", "/projetos/mapa-farma", "/en", "/en/projects/mapa-farma"]) {
  test(`em 360px ${rota} não rola na horizontal`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(rota);
    const { scroll, cliente } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      cliente: document.documentElement.clientWidth,
    }));
    expect(scroll, rota).toBeLessThanOrEqual(cliente);
  });
}
