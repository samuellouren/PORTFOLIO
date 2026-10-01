import { test, expect } from "@playwright/test";

test("o indice lista os quatro projetos nao-destaque", async ({ page }) => {
  await page.goto("/");
  const idx = page.getByTestId("project-index");
  for (const t of ["TalentMatch", "JobTracker", "Elemental Depths", "Pagamento Pix (Java)"]) {
    await expect(idx.getByText(t, { exact: false }).first()).toBeVisible();
  }
});

test("o indice mostra Demo so para quem tem demo, alem do GitHub", async ({ page }) => {
  await page.goto("/");
  const idx = page.getByTestId("project-index");
  await expect(idx.getByTestId("index-demo")).toHaveCount(1);
  await expect(idx.getByRole("link", { name: /^Demo — TalentMatch/ })).toHaveAttribute(
    "href",
    "https://talent-match-two.vercel.app"
  );
  await expect(idx.getByRole("link", { name: /^TalentMatch\s*— Código/ })).toHaveAttribute(
    "href",
    "https://github.com/samuellouren/projetointegrador25"
  );
  await page.goto("/en");
  await expect(page.getByTestId("index-demo")).toHaveText(/Demo/);
});

test("ferramentas aparecem em quatro grupos rotulados", async ({ page }) => {
  await page.goto("/");
  const s = page.getByTestId("skills");
  await expect(s.locator("dt")).toHaveText(["Front-end", "Mobile", "Back-end", "Dados / Infra"]);
  await page.goto("/en");
  await expect(page.getByTestId("skills").locator("dt")).toHaveText([
    "Front end",
    "Mobile",
    "Back end",
    "Data / Infra",
  ]);
});

test("as reguas dos contatos tem a mesma largura e o mesmo espacamento", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const caixas = await page.getByTestId("contact").getByRole("link").evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return { x: r.x, w: r.width, h: r.height };
    })
  );
  expect(caixas).toHaveLength(3);
  for (const c of caixas) {
    expect(c.x).toBeCloseTo(caixas[0].x, 0);
    expect(c.w).toBeCloseTo(caixas[0].w, 0);
    expect(c.h).toBeCloseTo(caixas[0].h, 0);
    expect(c.h).toBeGreaterThanOrEqual(44);
  }
});

test("as screenshots dos destaques tem alt descritivo nos dois idiomas", async ({ page }) => {
  for (const rota of ["/", "/en"]) {
    await page.goto(rota);
    for (const id of ["chute-do-vidente", "mapa-farma", "focusdrop"]) {
      const alt = await page.getByTestId(`shot-${id}`).locator("img").getAttribute("alt");
      expect(alt?.trim().length, `${rota} ${id}`).toBeGreaterThan(10);
    }
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

test("a trajetoria fica entre os projetos e o sobre", async ({ page }) => {
  await page.goto("/");
  const y = async (sel: string) => (await page.locator(sel).boundingBox())!.y;
  const indice = await y('[data-testid="project-index"]');
  const trajetoria = await y("#trajetoria");
  const sobre = await y("#sobre");
  expect(indice).toBeLessThan(trajetoria);
  expect(trajetoria).toBeLessThan(sobre);
  await expect(page.locator("#trajetoria h2")).toHaveText("Trajetória");
  await page.goto("/en");
  await expect(page.locator("#trajetoria h2")).toHaveText("Path");
});

test("a trajetoria lista os cinco marcos e liga os projetos ao estudo de caso", async ({ page }) => {
  await page.goto("/");
  const path = page.getByTestId("path");
  await expect(path.locator("li")).toHaveCount(5);
  for (const t of ["CESMAC", "Mapa Farma", "Chute do Vidente", "SENAI", "Global Game Jam Alagoas"]) {
    await expect(path).toContainText(t);
  }
  await expect(path).toContainText("2024–2025");
  await expect(path.getByRole("link", { name: /Mapa Farma/ })).toHaveAttribute("href", "/projetos/mapa-farma");
});

test("o sobre nao repete o que esta na trajetoria", async ({ page }) => {
  for (const rota of ["/", "/en"]) {
    await page.goto(rota);
    const sobre = page.locator("#sobre");
    for (const t of ["CESMAC", "SENAI"]) await expect(sobre, `${rota} ${t}`).not.toContainText(t);
  }
});
