export type Lang = "pt" | "en";
export type Texto = { pt: string; en: string };
export type Shape = "phone" | "web";

export interface Project {
  id: number;
  title: string;
  description: Texto;
  tech: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  stack: string;
  tag?: Texto;
  image?: string;
  imageAlt?: Texto;
  shape?: Shape;
  nota?: Texto;
  contexto?: Texto & { label: Texto };
  decisao?: Texto;
  resultado?: Texto;
  // Só na página de estudo de caso. Ausente = não renderiza.
  galeria?: Imagem[];
  arquitetura?: Texto[];
  desafio?: Texto;
  aprendizado?: Texto;
}

export interface Imagem {
  src: string;
  alt: Texto;
  shape?: Shape;
}

export interface SkillGroup {
  label: Texto;
  items: string[];
}

export function pick(t: Texto, lang: Lang): string {
  return t[lang];
}

export function slugOf(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function homeHref(lang: Lang): string {
  return lang === "pt" ? "/" : "/en";
}

export function caseHref(slug: string, lang: Lang): string {
  return lang === "pt" ? `/projetos/${slug}` : `/en/projects/${slug}`;
}
