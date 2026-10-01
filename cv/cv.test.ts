import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { contacts } from "../data/content";
import { projects, skills, trajetoria } from "../data/projects";
import { siteUrl } from "../app/site";

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

describe("currículo e site dizem a mesma coisa", () => {
  const linha = (s: string, rotulo: string) =>
    texto(s).match(new RegExp(`${rotulo}: (.+?)(?= Complementar| Complementary| Idiomas| Languages|$)`))?.[1].trim();

  it("Habilidades do currículo = Ferramentas do site", () => {
    expect(linha(html.pt, "Principais")).toBe(skills.pt.principais.join(", "));
    expect(linha(html.pt, "Complementares")).toBe(skills.pt.complementares.join(", "));
    expect(linha(html.en, "Core")).toBe(skills.en.principais.join(", "));
    expect(linha(html.en, "Complementary")).toBe(skills.en.complementares.join(", "));
  });

  it("links de contato, portfólio e demo são os mesmos do site", () => {
    const linksCv = new Set(hrefs(html.pt).map((h) => h.replace(/\/$/, "")));
    for (const c of contacts) expect(linksCv, c.id).toContain(c.href.replace(/\/$/, ""));
    expect(linksCv).toContain(siteUrl);
    const chute = projects.find((p) => p.title === "Chute do Vidente")!;
    expect(linksCv).toContain(chute.demo!.replace(/\/$/, ""));
  });

  it("formação e game jam com os mesmos anos da Trajetória", () => {
    const anos = trajetoria.map((m) => m.ano.replace("–", " – "));
    for (const a of ["2024 – 2025", "2026"]) expect(anos.some((x) => x.includes(a)), a).toBe(true);
    expect(texto(html.pt)).toContain("2024 – 2025");
    expect(texto(html.pt)).toContain("2026 – previsão 2029");
    expect(trajetoria.some((m) => m.texto.pt.includes("previsão de formatura em 2029"))).toBe(true);
    expect(texto(html.pt)).toMatch(/Global Game Jam Alagoas, em equipe \| 2024/);
    expect(trajetoria.some((m) => m.ano === "2024" && m.texto.pt.includes("Global Game Jam Alagoas"))).toBe(true);
  });

  it("o status de cada destaque no site aparece no currículo", () => {
    // "no ar" (Chute do Vidente) e "em uso" (Mapa Farma) são os status da margem.
    for (const p of projects.filter((x) => x.meta?.status)) {
      expect(texto(html.pt).toLowerCase(), p.title).toContain(p.meta!.status!.pt);
      expect(texto(html.en).toLowerCase(), p.title).toContain(p.meta!.status!.en);
    }
  });

  it("o stack de cada destaque no currículo existe no tech do site", () => {
    const stacks = (s: string) => [...s.matchAll(/<p class="stack">Stack: ([^<]+)<\/p>/g)].map((m) => m[1].split(", "));
    const destaques = ["Mapa Farma", "Chute do Vidente", "FocusDrop"].map((t) => projects.find((p) => p.title === t)!);
    stacks(html.pt).forEach((itens, i) => {
      const tech = destaques[i].tech;
      for (const item of itens) {
        // "Node.js/Express" junta duas tags; "Expo SDK 56" e "React Native (Expo)" citam a tag Expo.
        const partes = item.replace(/ \(Expo\)| SDK \d+/, "").split("/");
        for (const parte of partes) expect(tech, `${destaques[i].title}: ${item}`).toContain(parte);
      }
    });
  });
});
