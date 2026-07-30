import { test, expect } from "@playwright/test";

test("o indice lista os quatro projetos nao-destaque", async ({ page }) => {
  await page.goto("/");
  const idx = page.getByTestId("project-index");
  for (const t of ["TalentMatch", "jobtracker", "Elemental Depths", "shim de pagamento Java"]) {
    await expect(idx.getByText(t, { exact: false })).toBeVisible();
  }
});

test("a nota inline aparece no item do Java e em nenhum outro", async ({ page }) => {
  await page.goto("/");
  const idx = page.getByTestId("project-index");
  await expect(idx.getByText(/primeiro contato meu com Java/)).toBeVisible();
  await expect(idx.getByTestId("index-note")).toHaveCount(1);
});

test("nao existe barra de nivel de skill nem bloco de stats", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("Tecnologias no dia a dia");
  expect(html).not.toMatch(/role="progressbar"/);
});

test("os tres contatos sao links reais", async ({ page }) => {
  await page.goto("/");
  const c = page.getByTestId("contact");
  await expect(c.getByRole("link", { name: /gmail\.com/ })).toHaveAttribute("href", /^mailto:/);
  await expect(c.getByRole("link", { name: /linkedin/i })).toBeVisible();
  await expect(c.getByRole("link", { name: /@samuellouren/ })).toBeVisible();
});
