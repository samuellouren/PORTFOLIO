import { describe, it, expect } from "vitest";
import { featured, projects, skills } from "./projects";
import { slugOf } from "./types";

describe("invariantes dos projetos", () => {
  it("todo destaque tem imagem e forma declarada", () => {
    for (const p of projects.filter((x) => x.featured)) {
      expect(p.image, `${p.title} sem image`).toBeTruthy();
      expect(["phone", "web"], `${p.title} sem shape valido`).toContain(p.shape);
    }
  });

  it("nenhum campo opcional existe com string vazia", () => {
    // Proveniencia (spec 5.1): campo sem fonte fica AUSENTE, nao vazio.
    for (const p of projects) {
      for (const k of ["resumo", "nota", "contexto", "resultado"] as const) {
        const v = p[k];
        if (v === undefined) continue;
        expect(v.pt.trim(), `${p.title}.${k}.pt vazio`).not.toBe("");
        expect(v.en.trim(), `${p.title}.${k}.en vazio`).not.toBe("");
      }
    }
  });

  it("contexto sempre carrega rotulo nos dois idiomas", () => {
    for (const p of projects) {
      if (!p.contexto) continue;
      expect(p.contexto.label.pt.trim()).not.toBe("");
      expect(p.contexto.label.en.trim()).not.toBe("");
    }
  });

  it("os rotulos em uso sao apenas Problema e Origem", () => {
    const usados = projects.filter((p) => p.contexto).map((p) => p.contexto!.label.pt);
    expect(new Set(usados)).toEqual(new Set(["Problema", "Origem"]));
  });

  it("Mapa Farma e FocusDrop sao phone; Chute do Vidente e web", () => {
    const byTitle = (t: string) => projects.find((p) => p.title === t);
    expect(byTitle("Mapa Farma")!.shape).toBe("phone");
    expect(byTitle("FocusDrop")!.shape).toBe("phone");
    expect(byTitle("Chute do Vidente")!.shape).toBe("web");
  });
});

describe("card curto na home, detalhe no caso", () => {
  it("todo destaque tem resumo", () => {
    for (const p of featured) expect(p.resumo, `${p.title} sem resumo`).toBeDefined();
  });

  it("resumo e resultado cabem em uma frase", () => {
    // Uma frase = no maximo um ponto final, e so no fim.
    for (const p of featured) {
      for (const k of ["resumo", "resultado"] as const) {
        const v = p[k];
        if (!v) continue;
        for (const lang of ["pt", "en"] as const) {
          expect(v[lang].trim().slice(0, -1), `${p.title}.${k}.${lang}`).not.toMatch(/[.!?]\s/);
        }
      }
    }
  });

  it("a descricao do caso nao repete o resumo da home palavra por palavra", () => {
    for (const p of featured) {
      for (const lang of ["pt", "en"] as const) {
        expect(p.description[lang], `${p.title} ${lang}`).not.toContain(p.resumo![lang]);
      }
    }
  });

  it("cada decisao tem titulo e texto nos dois idiomas", () => {
    for (const p of projects) {
      for (const d of p.decisoes ?? []) {
        expect(d.titulo.pt.trim() && d.titulo.en.trim(), `${p.title}: titulo vazio`).toBeTruthy();
        expect(d.pt.trim() && d.en.trim(), `${p.title}: decisao vazia`).toBeTruthy();
      }
    }
  });
});

describe("metadados da margem", () => {
  it("ano tem quatro digitos e status existe nos dois idiomas", () => {
    for (const p of projects) {
      if (!p.meta) continue;
      if (p.meta.ano !== undefined) expect(p.meta.ano, p.title).toMatch(/^\d{4}$/);
      if (p.meta.status) {
        expect(p.meta.status.pt.trim(), `${p.title} status pt`).not.toBe("");
        expect(p.meta.status.en.trim(), `${p.title} status en`).not.toBe("");
      }
    }
  });

  it("papel fica vazio em todos ate o Samuel informar", () => {
    for (const p of projects) expect(p.meta?.papel, p.title).toBeUndefined();
  });

  it("status so existe onde o resultado ja afirma que esta no ar ou em uso", () => {
    for (const p of projects.filter((x) => x.meta?.status)) {
      expect(p.resultado?.pt, p.title).toMatch(/no ar|em uso|sendo usado/i);
    }
  });
});

describe("invariantes de imagem e ferramentas", () => {
  it("todo destaque com imagem tem alt nos dois idiomas", () => {
    for (const p of projects.filter((x) => x.featured && x.image)) {
      expect(p.imageAlt?.pt.trim(), `${p.title} sem alt pt`).toBeTruthy();
      expect(p.imageAlt?.en.trim(), `${p.title} sem alt en`).toBeTruthy();
    }
  });

  it("os grupos de ferramentas guardam as mesmas 17 tecnologias, sem repeticao", () => {
    const todas = skills.flatMap((g) => g.items);
    expect(todas).toHaveLength(17);
    expect(new Set(todas).size).toBe(17);
    for (const g of skills) {
      expect(g.label.pt.trim()).not.toBe("");
      expect(g.label.en.trim()).not.toBe("");
    }
  });

  it("stack sem grafia quebrada", () => {
    const tech = projects.flatMap((p) => p.tech);
    expect(tech).not.toContain("OpenStreetmap");
    expect(tech).not.toContain("Turso(libSQL)");
    expect(tech.some((t) => t.includes("/"))).toBe(false);
  });
});

describe("campos do estudo de caso (proveniencia)", () => {
  it("desafio e aprendizado, quando existem, nao sao string vazia", () => {
    for (const p of projects) {
      for (const k of ["desafio", "aprendizado"] as const) {
        const v = p[k];
        if (v === undefined) continue;
        expect(v.pt.trim(), `${p.title}.${k}.pt vazio`).not.toBe("");
        expect(v.en.trim(), `${p.title}.${k}.en vazio`).not.toBe("");
      }
    }
  });

  it("cada camada da arquitetura e cada item da galeria tem texto nos dois idiomas", () => {
    for (const p of projects) {
      for (const c of p.arquitetura ?? []) {
        expect(c.pt.trim() && c.en.trim(), `${p.title}: camada vazia`).toBeTruthy();
        if (c.aparte) expect(c.aparte.pt.trim() && c.aparte.en.trim(), `${p.title}: aparte vazio`).toBeTruthy();
      }
      for (const g of p.galeria ?? []) {
        expect(g.src.startsWith("/projects/"), `${p.title}: src fora de public/projects`).toBe(true);
        expect(g.alt.pt.trim() && g.alt.en.trim(), `${p.title}: alt vazio em ${g.src}`).toBeTruthy();
      }
    }
  });

  it("slugs dos destaques sao unicos", () => {
    const slugs = featured.map((p) => slugOf(p.title));
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
