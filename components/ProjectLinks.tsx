import { content } from "@/data/content";
import type { Lang, Project } from "@/data/types";

const link = "-my-3 inline-block py-3 transition-colors hover:text-brasa";

// Links externos do projeto, secundários: código sempre, demo quando existe.
// A ação principal do card é o estudo de caso; estes ficam menores. A demo
// (o produto no ar) é a prova mais forte para quem não lê código: serragem.
// O código fica em fumo.
export default function ProjectLinks({ project: p, lang }: { project: Project; lang: Lang }) {
  const t = content[lang];
  return (
    <span className="flex gap-5 text-[0.8125rem]">
      <a href={p.github} className={`${link} text-fumo`}>
        {t.linkCode}
        <span className="sr-only"> — {p.title}</span> <span aria-hidden="true">↗</span>
      </a>
      {p.demo ? (
        <a href={p.demo} className={`${link} text-serragem`}>
          {t.linkDemo}
          <span className="sr-only"> — {p.title}</span> <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </span>
  );
}
