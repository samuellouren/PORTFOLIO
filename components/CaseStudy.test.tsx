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
  decisoes: [
    { titulo: { pt: "TITULO-PT", en: "TITLE-EN" }, pt: "DECISAO-PT", en: "DECISION-EN", destaque: true },
    {
      titulo: { pt: "OUTRA-PT", en: "OTHER-EN" }, pt: "LONGA-PT", en: "LONG-EN",
      curta: { pt: "CURTA-PT", en: "SHORT-EN" },
    },
  ],
  desafio: { pt: "DESAFIO-PT", en: "CHALLENGE-EN" },
  aprendizado: { pt: "APRENDIZADO-PT", en: "LEARNING-EN" },
};

describe("CaseStudy", () => {
  it("renderiza os campos opcionais quando existem, no idioma da rota", () => {
    const pt = renderToStaticMarkup(<CaseStudy project={cheio} lang="pt" />);
    for (const s of ["Galeria", "ALT-GALERIA-PT", "Arquitetura", "CAMADA-1", "CAMADA-2", "APARTE-PT",
      "Decisões", "TITULO-PT", "DECISAO-PT", "Outras decisões", "OUTRA-PT", "CURTA-PT",
      "Maior desafio", "DESAFIO-PT", "O que faria diferente", "APRENDIZADO-PT"]) {
      expect(pt).toContain(s);
    }
    expect(pt).not.toContain("CHALLENGE-EN");
    // a decisao compacta mostra a linha curta, nao o paragrafo
    expect(pt).not.toContain("LONGA-PT");

    const en = renderToStaticMarkup(<CaseStudy project={cheio} lang="en" />);
    for (const s of ["Gallery", "ALT-GALLERY-EN", "Architecture", "LAYER-1", "ASIDE-EN",
      "Decisions", "TITLE-EN", "DECISION-EN", "Other decisions", "OTHER-EN", "SHORT-EN",
      "Hardest problem", "CHALLENGE-EN", "What I&#x27;d do differently", "LEARNING-EN"]) {
      expect(en).toContain(s);
    }
    expect(en).not.toContain("DESAFIO-PT");
  });

  it("destaques saem antes da lista compacta; sem destaque, nao sobra titulo vazio", () => {
    const pt = renderToStaticMarkup(<CaseStudy project={cheio} lang="pt" />);
    expect(pt.indexOf("TITULO-PT")).toBeLessThan(pt.indexOf("Outras decisões"));
    const soOutras: Project = { ...cheio, decisoes: cheio.decisoes!.filter((d) => !d.destaque) };
    const html = renderToStaticMarkup(<CaseStudy project={soOutras} lang="pt" />);
    expect(html).not.toContain('data-testid="decisoes-destaque"');
    expect(html).toContain("OUTRA-PT");
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
