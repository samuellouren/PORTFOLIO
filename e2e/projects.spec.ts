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
});

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
