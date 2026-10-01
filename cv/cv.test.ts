import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// O currículo vive em HTML (cv/) e vira PDF com `npm run cv`. Aqui ficam as
// regras de formato ATS e a paridade PT/EN que dá para checar sem navegador;
// a contagem de páginas é checada pelo próprio script ao gerar o PDF.
const ler = (f: string) =>
  readFileSync(fileURLToPath(new URL(f, import.meta.url)), "utf8").replace(/<!--[\s\S]*?-->/g, "");
const html = { pt: ler("./curriculo.pt.html"), en: ler("./curriculo.en.html") };
const css = ler("./print.css");

const tags = (s: string, tag: string) => s.match(new RegExp(`<${tag}[\\s>]`, "g"))?.length ?? 0;
const titulos = (s: string) => [...s.matchAll(/<h2>([^<]+)<\/h2>/g)].map((m) => m[1]);
const hrefs = (s: string) => [...s.matchAll(/href="(http[^"]+|mailto:[^"]+)"/g)].map((m) => m[1]);
const texto = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("currículo: formato ATS", () => {
  it("usa os títulos de seção padrão, na ordem", () => {
    expect(titulos(html.pt)).toEqual(["Resumo", "Experiência", "Projetos", "Formação", "Habilidades", "Idiomas"]);
    expect(titulos(html.en)).toEqual(["Summary", "Experience", "Projects", "Education", "Skills", "Languages"]);
  });

  it("não tem imagem, ícone, tabela nem colunas", () => {
    for (const s of [html.pt, html.en]) {
      for (const tag of ["img", "svg", "table", "picture", "canvas", "i"]) expect(tags(s, tag), tag).toBe(0);
    }
    expect(css).not.toMatch(/columns:|grid-template|float:|display:\s*(flex|grid)/);
  });

  it("A4 e nenhuma fonte abaixo de 10pt", () => {
    expect(css).toMatch(/size:\s*A4/);
    for (const [, n, unidade] of css.matchAll(/font-size:\s*([\d.]+)(pt|px)/g)) {
      const pt = unidade === "px" ? Number(n) * 0.75 : Number(n);
      expect(pt).toBeGreaterThanOrEqual(10);
    }
  });
});

describe("currículo: paridade PT/EN e fatos", () => {
  it("mesma estrutura nos dois idiomas", () => {
    for (const tag of ["section", "article", "li", "h3", "strong", "p"]) {
      expect(tags(html.en, tag), tag).toBe(tags(html.pt, tag));
    }
  });

  it("mesmos links nos dois idiomas", () => {
    expect(hrefs(html.en)).toEqual(hrefs(html.pt));
  });

  it("não afirma o que os repositórios não provam", () => {
    // Domínio próprio (é subdomínio da Vercel), Jest (o FocusDrop não tem
    // testes), rotinas arrastáveis (dependência sem uso), ranking (o JobTracker
    // não tem esse endpoint) e "publicado" (o FocusDrop não saiu na loja).
    const proibido = /domínio próprio|custom domain|jest|arrast|draggable|ranking|publiquei o|publicado|published/i;
    expect(texto(html.pt)).not.toMatch(proibido);
    expect(texto(html.en)).not.toMatch(proibido);
    expect(texto(html.pt)).not.toMatch(/remoto internacional/i);
    expect(texto(html.en)).not.toMatch(/international remote/i);
  });
});
