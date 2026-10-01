import { describe, it, expect } from "vitest";
import { featured, projects, skills, skillsPrincipais, skillsTambem, trajetoria } from "./projects";
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

  it("stack do card: no maximo 3 tecnologias, todas do tech do projeto", () => {
    const esperado: Record<string, string> = {
      "Chute do Vidente": "Next.js · Node.js · Turso",
      "Mapa Farma": "React Native · Node.js · Turso",
      FocusDrop: "React Native · Expo · TypeScript",
    };
    for (const p of featured) {
      expect(p.stack, p.title).toBe(esperado[p.title]);
      const itens = p.stack.split(" · ");
      expect(itens.length, p.title).toBeLessThanOrEqual(3);
      // "Turso" abrevia "Turso (libSQL)"
      for (const i of itens) expect(p.tech.some((t) => t.startsWith(i)), `${p.title}: ${i}`).toBe(true);
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

describe("decisoes escaneaveis", () => {
  it("cada destaque tem de 2 a 3 decisoes em destaque", () => {
    for (const p of featured) {
      const n = (p.decisoes ?? []).filter((d) => d.destaque).length;
      expect(n, p.title).toBeGreaterThanOrEqual(2);
      expect(n, p.title).toBeLessThanOrEqual(3);
    }
  });

  it("Mapa Farma destaca dados abertos, app nativo e fuso, nesta ordem", () => {
    const mf = projects.find((p) => p.title === "Mapa Farma")!;
    expect(mf.decisoes!.filter((d) => d.destaque).map((d) => d.titulo.pt)).toEqual([
      "Base de farmácias a partir de dados abertos",
      "App nativo em vez de PWA",
      "Datas no fuso de Maceió",
    ]);
  });

  it("decisao fora do destaque tem linha curta nos dois idiomas, que cabe em uma linha", () => {
    for (const p of projects) {
      for (const d of (p.decisoes ?? []).filter((x) => !x.destaque)) {
        for (const lang of ["pt", "en"] as const) {
          const c = d.curta?.[lang].trim() ?? "";
          expect(c, `${p.title}: ${d.titulo.pt} ${lang}`).not.toBe("");
          expect(c.length, `${p.title}: ${c}`).toBeLessThanOrEqual(46);
        }
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

  it("papel so nos tres destaques, feitos sozinho; projetos de equipe ficam sem", () => {
    // Fonte: dito pelo Samuel em 2026-10-01.
    for (const p of projects) {
      if (p.featured) {
        expect(p.meta?.papel, p.title).toEqual({
          pt: "full-stack · sozinho, do zero",
          en: "full-stack · solo, from scratch",
        });
      } else {
        expect(p.meta?.papel, p.title).toBeUndefined();
      }
    }
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

  it("a lista de ferramentas guarda as mesmas 17 tecnologias, sem repeticao", () => {
    expect(skills).toHaveLength(17);
    expect(new Set(skills).size).toBe(17);
  });

  it("principais + tambem particionam as 17, e principais sao as dos destaques", () => {
    expect([...skillsPrincipais, ...skillsTambem].sort()).toEqual([...skills].sort());
    const destaque = new Set(featured.flatMap((p) => p.tech));
    for (const s of skillsPrincipais) expect(destaque.has(s), s).toBe(true);
    for (const s of skillsTambem) expect(destaque.has(s), s).toBe(false);
    for (const s of ["Java", "Spring Boot", "Python", "FastAPI"]) expect(skillsTambem).toContain(s);
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

  it("video, quando existe, aponta para public/projects", () => {
    for (const p of projects) {
      if (!p.video) continue;
      expect(p.video.src.startsWith("/projects/"), `${p.title}: src`).toBe(true);
      expect(p.video.poster.startsWith("/projects/"), `${p.title}: poster`).toBe(true);
    }
  });

  it("slugs dos destaques sao unicos", () => {
    const slugs = featured.map((p) => slugOf(p.title));
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("trajetoria", () => {
  it("todo item tem texto nos dois idiomas e ano no formato aaaa ou aaaa–aaaa", () => {
    for (const m of trajetoria) {
      expect(m.texto.pt.trim() && m.texto.en.trim(), m.texto.pt).toBeTruthy();
      expect(m.ano, m.texto.pt).toMatch(/^\d{4}(–\d{4})?$/);
    }
  });

  it("vai do mais recente para o mais antigo", () => {
    const fim = (ano: string) => Number(ano.slice(-4));
    const anos = trajetoria.map((m) => fim(m.ano));
    expect(anos).toEqual([...anos].sort((a, b) => b - a));
  });

  it("cada slug aponta para um destaque citado pelo nome nos dois idiomas", () => {
    for (const m of trajetoria) {
      for (const slug of m.slugs ?? []) {
        const p = featured.find((f) => slugOf(f.title) === slug);
        expect(p, slug).toBeDefined();
        expect(m.texto.pt, slug).toContain(p!.title);
        expect(m.texto.en, slug).toContain(p!.title);
      }
    }
  });

  it("CESMAC em 2026 e Game Jam em 2024 (dito pelo Samuel em 2026-10-01)", () => {
    const ano = (termo: string) => trajetoria.find((m) => m.texto.pt.includes(termo))!.ano;
    expect(ano("CESMAC")).toBe("2026");
    expect(ano("Game Jam")).toBe("2024");
  });

  it("projetos aparecem num item de papel, nao um item por projeto", () => {
    const comProjeto = trajetoria.filter((m) => m.slugs?.length);
    expect(comProjeto).toHaveLength(1);
    expect(comProjeto[0].slugs).toEqual(["mapa-farma", "chute-do-vidente"]);
  });
});
