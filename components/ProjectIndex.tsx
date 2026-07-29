import Ruled from "./Ruled";
import { projects } from "@/data/projects";
import { pick, type Lang } from "@/data/types";

export default function ProjectIndex({ lang }: { lang: Lang }) {
  const resto = projects.filter((p) => !p.featured);

  return (
    <Ruled
      margin={
        <span className="text-[13px] text-fumo">
          {lang === "pt" ? "o resto" : "the rest"}
        </span>
      }
    >
      <ul data-testid="project-index" className="divide-y divide-traco">
        {resto.map((p) => (
          <li key={p.id} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <a
                href={p.github}
                className="font-display text-[16px] transition-colors hover:text-brasa"
              >
                {p.title} ↗
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
