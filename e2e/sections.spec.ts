import { test, expect } from "@playwright/test";
import { skills } from "../data/projects";

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

test("ferramentas aparecem em dois niveis, com os rotulos do curriculo", async ({ page }) => {
  await page.goto("/");
  const s = page.getByTestId("skills");
  await expect(s.locator("dt")).toHaveText(["Principais", "Complementares"]);
  await expect(page.getByTestId("skills-main")).toHaveText(skills.pt.principais.join(", "));
  await expect(page.getByTestId("skills-also")).toHaveText(skills.pt.complementares.join(", "));
  // o segundo nivel e menor que o primeiro
  const tam = async (id: string) =>
    parseFloat(await page.getByTestId(id).evaluate((el) => getComputedStyle(el).fontSize));
  expect(await tam("skills-also")).toBeLessThan(await tam("skills-main"));
  await page.goto("/en");
  await expect(page.getByTestId("skills").locator("dt")).toHaveText(["Core", "Complementary"]);
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
    // O FocusDrop so tem print na pagina do caso (semPrintNaHome).
    for (const id of ["chute-do-vidente", "mapa-farma"]) {
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

test("a trajetoria lista os quatro marcos com ano e liga os projetos ao estudo de caso", async ({ page }) => {
  await page.goto("/");
  const path = page.getByTestId("path");
  await expect(path.locator("li")).toHaveCount(4);
  for (const t of ["Dev full-stack independente", "Cesmac", "previsão de formatura em 2029", "SENAI", "Global Game Jam Alagoas"]) {
    await expect(path).toContainText(t);
  }
  for (const ano of ["2026", "2024–2025", "2024"]) await expect(path).toContainText(ano);
  await expect(path.getByRole("link", { name: "Mapa Farma" })).toHaveAttribute("href", "/projetos/mapa-farma");
  await expect(path.getByRole("link", { name: "Chute do Vidente" })).toHaveAttribute(
    "href",
    "/projetos/chute-do-vidente"
  );
  await page.goto("/en");
  await expect(page.getByTestId("path").getByRole("link", { name: "Mapa Farma" })).toHaveAttribute(
    "href",
    "/en/projects/mapa-farma"
  );
});

test("o contato diz o tipo de vaga e a disponibilidade, sem PJ", async ({ page }) => {
  await page.goto("/");
  const contato = page.locator("#contato");
  await expect(contato).toContainText("CLT, estágio e freelas");
  await expect(contato).toContainText("Posso começar agora");
  await expect(contato).not.toContainText("PJ");
  await page.goto("/en");
  await expect(page.locator("#contato")).toContainText("full-time roles, internships and freelance");
});

// "No Brasil ou fora" saiu: o curriculo nao fala mais em remoto internacional.
test("o sobre diz o mesmo alvo do curriculo: estagio ou junior, remoto ou em Maceio", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#sobre")).toContainText("estágio ou vaga júnior como dev, remoto ou em Maceió");
  await expect(page.locator("#sobre")).not.toContainText("fora");
  await page.goto("/en");
  await expect(page.locator("#sobre")).toContainText("internship or a junior developer role, remote or in Maceió");
  await expect(page.locator("#sobre")).not.toContainText("abroad");
});

test("o sobre mostra trabalho em equipe: TalentMatch e game jam", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#sobre")).toContainText("mediei divergências de escopo e visual no TalentMatch");
  await expect(page.locator("#sobre")).toContainText("game jam");
  await page.goto("/en");
  await expect(page.locator("#sobre")).toContainText("mediated scope and design disagreements on TalentMatch");
  await expect(page.locator("#sobre")).toContainText("game jam");
});

test("a margem da abertura e um status: nivel, remoto ou Maceio, com o ponto verde", async ({ page }) => {
  for (const [rota, texto] of [["/", "estágio ou júnior · remoto ou Maceió"], ["/en", "internship or junior · remote or Maceió"]] as const) {
    await page.goto(rota);
    const status = page.getByTestId("open-to");
    await expect(status).toHaveText(texto);
    await expect(status.locator("..").locator(".bg-verdete")).toHaveCount(1);
    await expect(page.locator("main")).not.toContainText("aberto a remoto");
  }
});

test("o sobre nao repete o que esta na trajetoria", async ({ page }) => {
  for (const rota of ["/", "/en"]) {
    await page.goto(rota);
    const sobre = page.locator("#sobre");
    for (const t of ["Cesmac", "SENAI", "Elemental Depths", "Unity"]) await expect(sobre, `${rota} ${t}`).not.toContainText(t);
  }
});
