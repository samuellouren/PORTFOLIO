import type { MetadataRoute } from "next";
import { featured } from "@/data/projects";
import { caseHref, slugOf } from "@/data/types";
import { siteUrl } from "./site";

const languages = { "pt-BR": siteUrl, en: `${siteUrl}/en` };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const casos = featured.flatMap((p) => {
    const slug = slugOf(p.title);
    const alt = {
      "pt-BR": `${siteUrl}${caseHref(slug, "pt")}`,
      en: `${siteUrl}${caseHref(slug, "en")}`,
    };
    return [
      { url: alt["pt-BR"], lastModified, alternates: { languages: alt } },
      { url: alt.en, lastModified, alternates: { languages: alt } },
    ];
  });

  return [
    { url: siteUrl, lastModified, alternates: { languages } },
    { url: `${siteUrl}/en`, lastModified, alternates: { languages } },
    ...casos,
  ];
}
