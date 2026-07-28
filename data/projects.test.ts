import { describe, it, expect } from "vitest";
import { projects } from "./projects";

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
