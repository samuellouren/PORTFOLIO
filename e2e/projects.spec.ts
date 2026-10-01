import { test, expect } from "@playwright/test";

test("projeto web tem painel largo; projeto mobile tem moldura estreita", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const web = await page.getByTestId("shot-chute-do-vidente").boundingBox();
  const phone = await page.getByTestId("shot-mapa-farma").boundingBox();
  expect(web!.width).toBeGreaterThan(500);
  expect(phone!.width).toBeLessThan(320);
  expect(phone!.height).toBeGreaterThan(phone!.width);
});

test("o rotulo do primeiro campo difere por projeto", async ({ page }) => {
  await page.goto("/");
  const mapa = page.getByTestId("project-mapa-farma");
  const vidente = page.getByTestId("project-chute-do-vidente");
  await expect(mapa).toContainText("Problema");
  await expect(vidente).toContainText("Origem");
  await expect(vidente).not.toContainText("Problema");
});

test("projeto sem estudo de caso nao renderiza rotulos vazios", async ({ page }) => {
  await page.goto("/");
  const focus = page.getByTestId("project-focusdrop");
  await expect(focus).not.toContainText("Problema");
  await expect(focus).not.toContainText("Decisão");
  await expect(focus).not.toContainText("Resultado");
  // mas a marginalia dele existe
  await expect(page.getByTestId("margin-focusdrop").getByText(/timer simples/)).toBeVisible();
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
