import Shell from "./Shell";
import Opening from "./Opening";
import ProjectFeature from "./ProjectFeature";
import ProjectIndex from "./ProjectIndex";
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
      <h2 id="projetos" className="sr-only">{t.workTitle}</h2>
      {featured.map((p) => (
        <ProjectFeature key={p.id} project={p} lang={lang} />
      ))}
      <ProjectIndex lang={lang} />
      <About lang={lang} />
      <Contact lang={lang} />
    </Shell>
  );
}
