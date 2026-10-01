import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import CaseStudy from "./CaseStudy";
import { featured } from "@/data/projects";
import type { Project } from "@/data/types";

// Nenhum projeto real tem galeria/arquitetura/desafio/aprendizado ainda, entao
// o e2e so cobre a ausencia. Aqui um projeto ficticio cobre a presenca: quando
// o Samuel preencher os campos, eles precisam aparecer.
const cheio: Project = {
  ...featured[0],
  galeria: [{ src: "/projects/mapas.jpeg", alt: { pt: "ALT-GALERIA-PT", en: "ALT-GALLERY-EN" }, shape: "phone" }],
  arquitetura: [
    { pt: "CAMADA-1", en: "LAYER-1" },
    { pt: "CAMADA-2", en: "LAYER-2" },
  ],
  desafio: { pt: "DESAFIO-PT", en: "CHALLENGE-EN" },
  aprendizado: { pt: "APRENDIZADO-PT", en: "LEARNING-EN" },
};

describe("CaseStudy", () => {
  it("renderiza os campos opcionais quando existem, no idioma da rota", () => {
    const pt = renderToStaticMarkup(<CaseStudy project={cheio} lang="pt" />);
    for (const s of ["Galeria", "ALT-GALERIA-PT", "Arquitetura", "CAMADA-1", "CAMADA-2",
      "Maior desafio", "DESAFIO-PT", "O que faria diferente", "APRENDIZADO-PT"]) {
      expect(pt).toContain(s);
    }
    expect(pt).not.toContain("CHALLENGE-EN");

    const en = renderToStaticMarkup(<CaseStudy project={cheio} lang="en" />);
    for (const s of ["Gallery", "ALT-GALLERY-EN", "Architecture", "LAYER-1",
      "Hardest problem", "CHALLENGE-EN", "What I&#x27;d do differently", "LEARNING-EN"]) {
      expect(en).toContain(s);
    }
    expect(en).not.toContain("DESAFIO-PT");
  });

  it("listas vazias e campos ausentes nao renderizam rotulo", () => {
    const vazio: Project = { ...featured[0], galeria: [], arquitetura: [], desafio: undefined, aprendizado: undefined };
    const html = renderToStaticMarkup(<CaseStudy project={vazio} lang="pt" />);
    for (const s of ["Galeria", "Arquitetura", "Maior desafio", "O que faria diferente"]) {
      expect(html).not.toContain(s);
    }
  });
});
