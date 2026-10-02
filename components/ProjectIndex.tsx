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
        <h3 className="font-display text-[0.75rem] font-normal uppercase tracking-[0.14em] text-fumo">
          {t.indexLabel}
        </h3>
      }
    >
      <ul data-testid="project-index" className="divide-y divide-traco">
        {resto.map((p) => (
          <li key={p.id} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <a
                href={p.github}
                className="-my-2.5 py-2.5 font-display text-[1rem] transition-colors hover:text-brasa"
              >
                {p.title}
                <span className="sr-only"> — {t.linkCode}</span>{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <span className="font-display text-[0.8125rem] tracking-[0.04em] text-fumo">{p.stack}</span>
            </div>
            {p.demo ? (
              <a
                href={p.demo}
                data-testid="index-demo"
                className="-my-3 inline-block py-3 text-[0.875rem] text-serragem transition-colors hover:text-brasa"
              >
                {t.linkDemo}
                <span className="sr-only"> — {p.title}</span>{" "}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {p.nota ? (
              <p data-testid="index-note" className="mt-1 text-[0.875rem] italic text-fumo">
                {pick(p.nota, lang)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Ruled>
  );
}
