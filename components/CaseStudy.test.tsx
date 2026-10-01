import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import CaseStudy from "./CaseStudy";
import { featured } from "@/data/projects";
import type { Project } from "@/data/types";

// Nenhum projeto real tem galeria/desafio/aprendizado ainda, entao o e2e so
// cobre a ausencia deles. Aqui um projeto ficticio cobre a presenca de todos os
// blocos opcionais: quando o Samuel preencher os campos, eles precisam aparecer.
const cheio: Project = {
  ...featured[0],
  galeria: [{ src: "/projects/mapas.jpeg", alt: { pt: "ALT-GALERIA-PT", en: "ALT-GALLERY-EN" }, shape: "phone" }],
  arquitetura: [
    { pt: "CAMADA-1", en: "LAYER-1", aparte: { pt: "APARTE-PT", en: "ASIDE-EN" } },
    { pt: "CAMADA-2", en: "LAYER-2" },
  ],
  decisoes: [{ titulo: { pt: "TITULO-PT", en: "TITLE-EN" }, pt: "DECISAO-PT", en: "DECISION-EN" }],
  desafio: { pt: "DESAFIO-PT", en: "CHALLENGE-EN" },
  aprendizado: { pt: "APRENDIZADO-PT", en: "LEARNING-EN" },
};

describe("CaseStudy", () => {
  it("renderiza os campos opcionais quando existem, no idioma da rota", () => {
    const pt = renderToStaticMarkup(<CaseStudy project={cheio} lang="pt" />);
    for (const s of ["Galeria", "ALT-GALERIA-PT", "Arquitetura", "CAMADA-1", "CAMADA-2", "APARTE-PT",
      "Decisões", "TITULO-PT", "DECISAO-PT",
      "Maior desafio", "DESAFIO-PT", "O que faria diferente", "APRENDIZADO-PT"]) {
      expect(pt).toContain(s);
    }
    expect(pt).not.toContain("CHALLENGE-EN");

    const en = renderToStaticMarkup(<CaseStudy project={cheio} lang="en" />);
    for (const s of ["Gallery", "ALT-GALLERY-EN", "Architecture", "LAYER-1", "ASIDE-EN",
      "Decisions", "TITLE-EN", "DECISION-EN",
      "Hardest problem", "CHALLENGE-EN", "What I&#x27;d do differently", "LEARNING-EN"]) {
      expect(en).toContain(s);
    }
    expect(en).not.toContain("DESAFIO-PT");
  });

  it("listas vazias e campos ausentes nao renderizam rotulo", () => {
    const vazio: Project = {
      ...featured[0], galeria: [], arquitetura: [], decisoes: [], desafio: undefined, aprendizado: undefined,
    };
    const html = renderToStaticMarkup(<CaseStudy project={vazio} lang="pt" />);
    for (const s of ["Galeria", "Arquitetura", "Decisões", "Maior desafio", "O que faria diferente"]) {
      expect(html).not.toContain(s);
    }
  });
});
