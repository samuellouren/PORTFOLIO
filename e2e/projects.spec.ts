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
  await expect(focus.getByText(/timer simples/)).toBeVisible();
});

test("a marginalia sai no HTML servido", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toContain("o cliente queria um software gratuito");
});
