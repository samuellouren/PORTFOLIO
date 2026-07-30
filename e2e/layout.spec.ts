import { test, expect } from "@playwright/test";

test("no desktop a margem fica a esquerda do conteudo", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const margem = page.getByTestId("ruled-margin").first();
  const conteudo = page.getByTestId("ruled-content").first();
  const m = await margem.boundingBox();
  const c = await conteudo.boundingBox();
  expect(m!.x + m!.width).toBeLessThanOrEqual(c!.x + 1);
});

test("no mobile a margem empilha acima do conteudo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const m = await page.getByTestId("ruled-margin").first().boundingBox();
  const c = await page.getByTestId("ruled-content").first().boundingBox();
  expect(m!.y).toBeLessThan(c!.y);
  expect(m!.x).toBeLessThan(40);
});
