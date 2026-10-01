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
  resumo?: Texto;
  tag?: Texto;
  image?: string;
  imageAlt?: Texto;
  shape?: Shape;
  // Vídeo curto de demonstração. Quando existe, substitui o print no card e no
  // caso; o imageAlt continua descrevendo o que se vê.
  video?: Video;
  nota?: Texto;
  meta?: Meta;
  contexto?: Texto & { label: Texto };
  resultado?: Texto;
  // Só na página de estudo de caso. Ausente = não renderiza.
  decisoes?: Decisao[];
  galeria?: Imagem[];
  arquitetura?: Camada[];
  desafio?: Texto;
  aprendizado?: Texto;
}

// Metadados da margem, no estilo coluna de datas: "2026 · no ar".
export interface Meta {
  ano?: string;
  papel?: Texto;
  status?: Texto;
}

export interface Video {
  src: string;
  poster: string;
}

// `destaque` sobe a decisão para o topo, com título e parágrafo. As outras vão
// para a lista compacta "Outras decisões", com o título e a `curta`: uma linha
// tirada do próprio parágrafo, sem fato novo.
export type Decisao = Texto & { titulo: Texto; destaque?: boolean; curta?: Texto };

// Uma caixa do diagrama de arquitetura. `aparte` é o serviço externo ligado
// àquela camada, escrito ao lado da caixa.
export type Camada = Texto & { aparte?: Texto };

export interface Imagem {
  src: string;
  alt: Texto;
  shape?: Shape;
}

// Item da linha do tempo. `slugs` liga ao estudo de caso cada destaque citado
// pelo nome no texto.
export interface Marco {
  ano: string;
  texto: Texto;
  slugs?: string[];
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
