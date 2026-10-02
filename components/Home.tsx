import Shell from "./Shell";
import Opening from "./Opening";
import ProjectFeature from "./ProjectFeature";
import ProjectIndex from "./ProjectIndex";
import Path from "./Path";
import About from "./About";
import Contact from "./Contact";
import { content } from "@/data/content";
import { featured } from "@/data/projects";
import { homeHref, type Lang } from "@/data/types";

export default function Home({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Shell lang={lang} alternateHref={homeHref(lang === "pt" ? "en" : "pt")} onHome>
      <Opening lang={lang} />
      {featured.map((p, i) => (
        <ProjectFeature
          key={p.id}
          project={p}
          lang={lang}
          preload={i === 0}
          secao={i === 0 ? t.workTitle : undefined}
        />
      ))}
      <ProjectIndex lang={lang} />
      <Path lang={lang} />
      <About lang={lang} />
      <Contact lang={lang} />
    </Shell>
  );
}
