import Ruled from "./Ruled";
import { content } from "@/data/content";
import { projects } from "@/data/projects";
import { pick, type Lang } from "@/data/types";

export default function ProjectIndex({ lang }: { lang: Lang }) {
  const t = content[lang];
  const resto = projects.filter((p) => !p.featured);

  return (
    <Ruled
      margin={
        <h3 className="text-[13px] text-fumo">{t.indexLabel}</h3>
      }
    >
      <ul data-testid="project-index" className="divide-y divide-traco">
        {resto.map((p) => (
          <li key={p.id} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <a
                href={p.github}
                className="-my-2.5 py-2.5 font-display text-[16px] transition-colors hover:text-brasa"
              >
                {p.title} <span aria-hidden="true">↗</span>
              </a>
              <span className="text-[13px] text-fumo">{p.stack}</span>
            </div>
            {p.nota ? (
              <p data-testid="index-note" className="mt-1 text-[14px] italic text-fumo">
                {pick(p.nota, lang)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Ruled>
  );
}
