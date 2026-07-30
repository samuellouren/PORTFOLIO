import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

const languages = { "pt-BR": siteUrl, en: `${siteUrl}/en` };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, alternates: { languages } },
    { url: `${siteUrl}/en`, lastModified, alternates: { languages } },
  ];
}
