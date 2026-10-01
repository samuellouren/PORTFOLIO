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
}

export interface SkillGroup {
  label: Texto;
  items: string[];
}

export function pick(t: Texto, lang: Lang): string {
  return t[lang];
}
