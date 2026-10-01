// Metadata e OG dos estudos de caso, comuns as rotas PT e EN.
import type { Metadata } from "next";
import { content } from "@/data/content";
import { featured, featuredBySlug } from "@/data/projects";
import { caseHref, pick, slugOf, type Lang } from "@/data/types";
import { renderOg } from "./og";

export function caseParams() {
  return featured.map((p) => ({ slug: slugOf(p.title) }));
}

export function caseMetadata(slug: string, lang: Lang): Metadata {
  const p = featuredBySlug(slug);
  if (!p) return {};
  const title = `${p.title} — ${content[lang].caseKicker.toLowerCase()} · Samuel Lourenço`;
  const description = pick(p.description, lang);
  const url = caseHref(slug, lang);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": caseHref(slug, "pt"), en: caseHref(slug, "en") },
    },
    openGraph: {
      type: "article",
      url,
      siteName: "Samuel Lourenço",
      locale: lang === "pt" ? "pt_BR" : "en_US",
      title,
      description,
    },
    twitter: { card: "summary_large_image" },
  };
}

export function caseOg(slug: string, lang: Lang) {
  const p = featuredBySlug(slug);
  return renderOg({
    kicker: content[lang].caseKicker,
    title: p?.title ?? "Samuel Lourenço",
    subtitle: p?.tag ? `${pick(p.tag, lang)} · Samuel Lourenço` : "Samuel Lourenço",
  });
}
