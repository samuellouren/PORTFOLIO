import { test, expect } from "@playwright/test";

test("o HTML servido contem o conteudo, sem executar JS", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toContain("Samuel Lourenço");
});
