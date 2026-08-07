import { test, expect } from "@playwright/test";
import { CV_FILES } from "../data/content";

// O download nao pode depender so do atributo `download` do <a>: navegadores
// embutidos em apps e webviews mobile ignoram esse atributo e obedecem ao
// Content-Disposition. Sem `attachment`, o toque no botao nao salva nada.
test("cada CV e servido como anexo, com o nome final do arquivo", async ({ request }) => {
  for (const { url, name } of Object.values(CV_FILES)) {
    const res = await request.get(url);
    expect(res.status()).toBe(200);

    const disposicao = res.headers()["content-disposition"] ?? "";
    expect(disposicao, `disposicao de ${url}`).toContain("attachment");
    expect(disposicao, `nome do arquivo de ${url}`).toContain(name);
  }
});

test("clicar em baixar curriculo salva o arquivo com o nome certo", async ({ page }) => {
  await page.goto("/");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: /currículo/i }).click(),
  ]);

  expect(download.suggestedFilename()).toBe(CV_FILES.pt.name);
});
