import Link from "next/link";
import Ruled from "./Ruled";
import MarginNote from "./MarginNote";
import ProjectMeta from "./ProjectMeta";
import CaseFields from "./CaseFields";
import ProjectLinks from "./ProjectLinks";
import ProjectTag from "./ProjectTag";
import Shot from "./Shot";
import { content } from "@/data/content";
import { caseHref, pick, slugOf, type Lang, type Project } from "@/data/types";

export default function ProjectFeature({
  project: p,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const t = content[lang];
  const id = slugOf(p.title);
  const phone = p.shape === "phone";

  const shot = p.image ? (
    <Shot
      src={p.image}
      alt={p.imageAlt ? pick(p.imageAlt, lang) : ""}
      shape={p.shape}
      testId={`shot-${id}`}
    />
  ) : null;

  return (
    <Ruled
      id={id}
      margin={
        <div data-testid={`margin-${id}`} className="flex flex-col gap-3 min-[900px]:items-end">
          <ProjectMeta meta={p.meta} lang={lang} />
          {p.nota ? <MarginNote>{pick(p.nota, lang)}</MarginNote> : null}
        </div>
      }
    >
      <article data-testid={`project-${id}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-[22px] font-semibold uppercase tracking-[0.06em]">
            {p.title}
          </h3>
          <ProjectTag project={p} lang={lang} />
        </div>

        <div className={phone ? "mt-5 flex flex-col gap-6 min-[900px]:flex-row" : "mt-5"}>
          {!phone && shot}
          <div className={phone ? "min-w-0 flex-1" : shot ? "mt-5" : ""}>
            <p className="text-[16px] leading-[1.7] text-fumo">
              {pick(p.description, lang)}
            </p>
            <CaseFields project={p} lang={lang} />
            <p className="mt-6 text-[15px]">
              <Link
                href={caseHref(id, lang)}
                data-testid={`case-link-${id}`}
                className="-my-2.5 border-b border-brasa py-2.5 font-display text-serragem transition-colors hover:text-brasa"
              >
                {t.caseRead}
                <span className="sr-only"> — {p.title}</span>{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
          {phone && shot}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <span className="text-[13px] text-fumo">{p.tech.join(" · ")}</span>
          <ProjectLinks project={p} lang={lang} />
        </div>
      </article>
    </Ruled>
  );
}
