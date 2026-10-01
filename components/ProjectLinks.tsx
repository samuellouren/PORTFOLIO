import { content } from "@/data/content";
import type { Lang, Project } from "@/data/types";

const link =
  "-my-2.5 inline-block py-2.5 text-fumo transition-colors hover:text-brasa";

// Links externos do projeto, secundários: código sempre, demo quando existe.
// A ação principal do card é o estudo de caso; estes ficam menores e em fumo.
export default function ProjectLinks({ project: p, lang }: { project: Project; lang: Lang }) {
  const t = content[lang];
  return (
    <span className="flex gap-5 text-[13px]">
      <a href={p.github} className={link}>
        {t.linkCode}
        <span className="sr-only"> — {p.title}</span> <span aria-hidden="true">↗</span>
      </a>
      {p.demo ? (
        <a href={p.demo} className={link}>
          {t.linkDemo}
          <span className="sr-only"> — {p.title}</span> <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </span>
  );
}
