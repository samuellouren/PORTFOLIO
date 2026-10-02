import Link from "next/link";
import Ruled from "./Ruled";
import MarginNote from "./MarginNote";
import ProjectMeta from "./ProjectMeta";
import ProjectLinks from "./ProjectLinks";
import ProjectTag from "./ProjectTag";
import Shot from "./Shot";
import { content } from "@/data/content";
import { caseHref, pick, slugOf, type Lang, type Project } from "@/data/types";

// Card curto da home: o que é, o que deu e para onde ir. Origem, decisões e
// arquitetura moram só na página do caso.
export default function ProjectFeature({
  project: p,
  lang,
  preload = false,
  secao,
}: {
  project: Project;
  lang: Lang;
  // So o primeiro destaque: o print dele ja aparece na primeira tela e e o LCP.
  preload?: boolean;
  // So o primeiro destaque: o rotulo "Projetos" na margem, como Trajetoria,
  // Sobre e Contato. E o alvo do link "Projetos" do menu.
  secao?: string;
}) {
  const t = content[lang];
  const id = slugOf(p.title);
  const phone = p.shape === "phone";

  const shot = p.image && !p.semPrintNaHome ? (
    <Shot
      src={p.image}
      alt={p.imageAlt ? pick(p.imageAlt, lang) : ""}
      shape={p.shape}
      video={p.video}
      testId={`shot-${id}`}
      preload={preload}
      recorte
    />
  ) : null;

  return (
    <Ruled
      id={id}
      margin={
        <div data-testid={`margin-${id}`} className="flex flex-col gap-3 min-[900px]:items-end">
          {secao ? (
            <h2 id="projetos" className="font-display text-[0.75rem] uppercase tracking-[0.14em] text-fumo">
              {secao}
            </h2>
          ) : null}
          <ProjectMeta meta={p.meta} lang={lang} />
          {p.nota ? <MarginNote>{pick(p.nota, lang)}</MarginNote> : null}
        </div>
      }
    >
      <article data-testid={`project-${id}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-[1.375rem] font-semibold uppercase tracking-[0.06em]">
            {p.title}
          </h3>
          <ProjectTag project={p} lang={lang} />
        </div>

        <div className={phone ? "mt-5 flex flex-col gap-6 sm:flex-row" : "mt-5"}>
          {!phone && shot}
          <div className={phone ? "min-w-0 flex-1" : shot ? "mt-5" : ""}>
            <p data-testid={`resumo-${id}`} className="text-[1.0625rem] leading-[1.6] text-serragem">
              {pick(p.resumo ?? p.description, lang)}
            </p>
            {p.resultado ? (
              <p data-testid={`resultado-${id}`} className="mt-3 text-[1rem] leading-[1.6] text-fumo">
                {pick(p.resultado, lang)}
              </p>
            ) : null}
            <p data-testid={`stack-${id}`} className="mt-3 font-display text-[0.8125rem] tracking-[0.04em] text-fumo">
              {p.stack}
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <Link
                href={caseHref(id, lang)}
                data-testid={`case-link-${id}`}
                className="-my-2.5 border-b border-brasa py-2.5 font-display text-[0.9375rem] text-brasa transition-colors hover:text-serragem"
              >
                {t.caseRead}
                <span className="sr-only"> — {p.title}</span>{" "}
                <span aria-hidden="true">→</span>
              </Link>
              <ProjectLinks project={p} lang={lang} />
            </div>
          </div>
          {phone && shot}
        </div>
      </article>
    </Ruled>
  );
}
