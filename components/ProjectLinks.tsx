import { content } from "@/data/content";
import type { Lang, Project } from "@/data/types";

const link =
  "border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa";

// Links externos do projeto: codigo sempre, demo quando existe.
export default function ProjectLinks({ project: p, lang }: { project: Project; lang: Lang }) {
  const t = content[lang];
  return (
    <span className="flex gap-5 text-[14px]">
      <a href={p.github} className={link}>
        {t.linkCode} <span aria-hidden="true">↗</span>
      </a>
      {p.demo ? (
        <a href={p.demo} className={link}>
          {t.linkDemo} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </span>
  );
}
