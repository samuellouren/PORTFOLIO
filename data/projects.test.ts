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
      for (const k of ["nota", "contexto", "decisao", "resultado"] as const) {
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
