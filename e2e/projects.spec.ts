import { test, expect } from "@playwright/test";
import { projects } from "../data/projects";

const featuredResumo = (title: string) => projects.find((p) => p.title === title)!.resumo!.pt;

test("projeto web tem painel largo; projeto mobile tem moldura estreita", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const web = await page.getByTestId("shot-chute-do-vidente").boundingBox();
  const phone = await page.getByTestId("shot-mapa-farma").boundingBox();
  expect(web!.width).toBeGreaterThan(500);
  expect(phone!.width).toBeLessThan(320);
  expect(phone!.height).toBeGreaterThan(phone!.width);
});

test("o card mostra a stack curta abaixo do resultado, em fumo e menor", async ({ page }) => {
  await page.goto("/");
  for (const p of projects.filter((x) => x.featured)) {
    const id = p.title.toLowerCase().replace(/ /g, "-");
    await expect(page.getByTestId(`stack-${id}`)).toHaveText(p.stack);
  }
  const resultado = (await page.getByTestId("resultado-mapa-farma").boundingBox())!;
  const stack = page.getByTestId("stack-mapa-farma");
  expect((await stack.boundingBox())!.y).toBeGreaterThan(resultado.y);
  await expect(stack).toHaveCSS("color", await page.locator("footer").evaluate((el) => getComputedStyle(el).color));
  const tam = async (id: string) => parseFloat(await page.getByTestId(id).evaluate((el) => getComputedStyle(el).fontSize));
  expect(await tam("stack-mapa-farma")).toBeLessThan(await tam("resultado-mapa-farma"));
});

for (const largura of [1440, 375]) {
  test(`em ${largura}px o print de celular da home para em 400px com degrade; no caso sai inteiro`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 900 });
    await page.goto("/");
    const bancada = await page.evaluate(() => {
      const el = document.createElement("div");
      el.className = "bg-bancada";
      document.body.append(el);
      const cor = getComputedStyle(el).backgroundColor;
      el.remove();
      return cor;
    });
    for (const id of ["mapa-farma", "focusdrop"]) {
      const shot = page.getByTestId(`shot-${id}`);
      const caixa = (await shot.boundingBox())!;
      expect(caixa.height, id).toBeLessThanOrEqual(400);
      // a imagem preenche a largura e o topo fica visivel
      const img = (await shot.locator("img").boundingBox())!;
      expect(img.y, id).toBeCloseTo(caixa.y + 1, 0);
      // degrade em pseudo-elemento, colado na base, terminando na cor da moldura
      const fim = await shot.evaluate((el) => {
        const s = getComputedStyle(el, "::after");
        return { pos: s.position, bottom: s.bottom, img: s.backgroundImage };
      });
      expect(fim.pos, id).toBe("absolute");
      expect(fim.bottom, id).toBe("0px");
      expect(fim.img, id).toContain("linear-gradient");
      expect(fim.img.replace(/\s/g, ""), id).toContain(bancada.replace(/\s/g, ""));
    }
    await page.goto("/projetos/mapa-farma");
    const caso = page.getByTestId("case-shot");
    expect((await caso.boundingBox())!.height).toBeGreaterThan(500);
    expect(await caso.evaluate((el) => getComputedStyle(el, "::after").backgroundImage)).toBe("none");
  });
}

test("o card da home e curto: sem Problema, Origem nem Decisoes", async ({ page }) => {
  for (const id of ["mapa-farma", "chute-do-vidente", "focusdrop"]) {
    for (const [rota, rotulos] of [
      ["/", ["Problema", "Origem", "Decisão", "Decisões"]],
      ["/en", ["Problem", "Origin", "Decision"]],
    ] as const) {
      await page.goto(rota);
      const card = page.getByTestId(`project-${id}`);
      for (const r of rotulos) await expect(card, `${rota} ${id} ${r}`).not.toContainText(r);
    }
  }
});

test("o card mostra resumo, resultado quando existe e os links", async ({ page }) => {
  await page.goto("/");
  const mapa = page.getByTestId("project-mapa-farma");
  await expect(page.getByTestId("resumo-mapa-farma")).toHaveText(featuredResumo("Mapa Farma"));
  await expect(page.getByTestId("resultado-mapa-farma")).toContainText("equipe comercial");
  await expect(page.getByTestId("resultado-focusdrop")).toHaveCount(0);
  await expect(mapa.getByRole("link", { name: /^Código/ })).toHaveAttribute(
    "href",
    "https://github.com/samuellouren/Mapa-Farma"
  );
  // a descricao expandida fica so na pagina do caso
  await expect(mapa).not.toContainText("App Android nativo para o trabalho de rua");
});

test("ler estudo de caso e a acao principal; codigo e demo sao secundarios", async ({ page }) => {
  await page.goto("/");
  const card = page.getByTestId("project-chute-do-vidente");
  const principal = page.getByTestId("case-link-chute-do-vidente");
  const codigo = card.getByRole("link", { name: /^Código/ });
  const demo = card.getByRole("link", { name: /^Demo/ });
  await expect(principal).toHaveCSS("color", "rgb(206, 103, 51)"); // brasa
  for (const sec of [codigo, demo]) {
    await expect(sec).toHaveCSS("color", await page.locator("footer").evaluate((el) => getComputedStyle(el).color)); // fumo
  }
  const tam = async (l: typeof principal) => parseFloat(await l.evaluate((el) => getComputedStyle(el).fontSize));
  expect(await tam(codigo)).toBeLessThan(await tam(principal));
});

test("os metadados da margem saem no HTML servido", async ({ request }) => {
  const pt = await (await request.get("/")).text();
  const en = await (await request.get("/en")).text();
  expect(pt).toContain("2026 · em uso");
  expect(pt).toContain("2026 · no ar");
  expect(en).toContain("2026 · in use");
  expect(en).toContain("2026 · live");
  // o papel e dito uma vez, no hero; a margem dos cards fica so com ano e status
  for (const t of [">full-stack<", ">sozinho, do zero<"]) expect(pt).not.toContain(t);
  for (const t of [">full-stack<", ">solo, from scratch<"]) expect(en).not.toContain(t);
});

test("sozinho e do zero aparece uma vez na home: no hero, nao nas margens", async ({ page }) => {
  for (const [rota, frase] of [["/", /sozinho,? (e )?do zero/gi], ["/en", /solo,? and from scratch/gi]] as const) {
    await page.goto(rota);
    const main = await page.locator("main").textContent();
    const hero = await page.getByTestId("hero-sub").textContent();
    expect(hero, rota).toMatch(frase);
    // hero + o item de 2026 da Trajetoria; nenhuma margem de card
    expect(main.match(frase)?.length, rota).toBe(2);
    await expect(page.getByTestId("project-role"), rota).toHaveCount(0);
  }
});

for (const largura of [1440, 900, 375]) {
  test(`em ${largura}px o papel no caso fica em linhas proprias, sem separador solto`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 900 });
    for (const [rota, linhas] of [
      ["/projetos/mapa-farma", ["full-stack", "sozinho, do zero"]],
      ["/en/projects/mapa-farma", ["full-stack", "solo, from scratch"]],
    ] as const) {
      await page.goto(rota);
      await expect(page.getByTestId("project-meta")).toHaveText(/^2026 · /);
      const papel = page.getByTestId("project-role");
      await expect(papel.locator(":scope > span")).toHaveText([...linhas]);
      await expect(papel).not.toContainText("·");
      const meta = (await page.getByTestId("project-meta").boundingBox())!;
      const caixas = await papel.locator(":scope > span").evaluateAll((els) =>
        els.map((el) => ({ y: el.getBoundingClientRect().y, h: el.getBoundingClientRect().height })),
      );
      // abaixo de ano e status, cada trecho numa linha so (nao quebra por dentro)
      expect(caixas[0].y).toBeGreaterThanOrEqual(meta.y + meta.height);
      for (const c of caixas) expect(c.h).toBeLessThan(meta.height * 1.5);
      expect(caixas[1].y).toBeGreaterThan(caixas[0].y);
    }
  });
}

test("a margem nao repete o que ja esta no card", async ({ page }) => {
  await page.goto("/");
  // notas que repetiam Origem e Decisao sairam; a do FocusDrop traz fato novo
  await expect(page.getByTestId("margin-mapa-farma")).not.toContainText("software gratuito");
  await expect(page.getByTestId("margin-chute-do-vidente")).not.toContainText("brincadeira");
  await expect(page.getByTestId("margin-focusdrop")).toContainText("uso consciente do celular");
  await expect(page.getByTestId("project-focusdrop")).not.toContainText("timer simples");
});

test("em >=900px a moldura phone fica a direita do texto", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const project = page.getByTestId("project-mapa-farma");
  const texto = await project.locator("p").first().boundingBox();
  const moldura = await page.getByTestId("shot-mapa-farma").boundingBox();
  expect(moldura!.x).toBeGreaterThan(texto!.x);
});

test("abaixo de 900px a moldura phone fica empilhada abaixo do texto", async ({ page }) => {
  await page.setViewportSize({ width: 500, height: 900 });
  await page.goto("/");
  const project = page.getByTestId("project-mapa-farma");
  const texto = await project.locator("p").first().boundingBox();
  const moldura = await page.getByTestId("shot-mapa-farma").boundingBox();
  expect(moldura!.y).toBeGreaterThan(texto!.y);
});

test("no layout web a descricao nao encosta no print", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const shot = await page.getByTestId("shot-chute-do-vidente").boundingBox();
  const texto = await page.getByTestId("project-chute-do-vidente").locator("p").first().boundingBox();
  expect(texto!.y - (shot!.y + shot!.height)).toBeGreaterThanOrEqual(16);
});
