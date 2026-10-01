import Link from "next/link";
import Shell from "./Shell";
import Ruled from "./Ruled";
import MarginNote from "./MarginNote";
import CaseFields from "./CaseFields";
import ProjectLinks from "./ProjectLinks";
import ProjectTag from "./ProjectTag";
import Shot from "./Shot";
import { content } from "@/data/content";
import { featured } from "@/data/projects";
import { caseHref, homeHref, pick, slugOf, type Lang, type Project } from "@/data/types";
import type { ReactNode } from "react";

const rotulo = "font-display text-[12px] uppercase tracking-[0.14em] text-fumo";
const acao =
  "-my-2.5 border-b border-traco-forte py-2.5 font-display transition-colors hover:border-brasa hover:text-brasa";

// Bloco opcional da pagina: rotulo na margem, conteudo na coluna.
function Secao({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <Ruled id={id} margin={<h2 className={rotulo}>{label}</h2>}>
      <div data-testid={`case-${id}`}>{children}</div>
    </Ruled>
  );
}

export default function CaseStudy({ project: p, lang }: { project: Project; lang: Lang }) {
  const t = content[lang];
  const slug = slugOf(p.title);
  const outro: Lang = lang === "pt" ? "en" : "pt";
  const voltar = `${homeHref(lang)}#projetos`;
  const i = featured.findIndex((x) => x.id === p.id);
  const proximo = featured[(i + 1) % featured.length];
  const phone = p.shape === "phone";

  const galeria = p.galeria ?? [];
  const camadas = p.arquitetura ?? [];

  const shot = p.image ? (
    <Shot
      src={p.image}
      alt={p.imageAlt ? pick(p.imageAlt, lang) : ""}
      shape={p.shape}
      testId="case-shot"
      preload
    />
  ) : null;

  return (
    <Shell lang={lang} alternateHref={caseHref(slug, outro)}>
      <Ruled
        margin={
          <div>
            <p className="mb-8 text-[14px]">
              <Link href={voltar} className={`${acao} text-fumo`}>
                <span aria-hidden="true">←</span> {t.caseBack}
              </Link>
            </p>
            {p.nota ? <MarginNote>{pick(p.nota, lang)}</MarginNote> : null}
          </div>
        }
      >
        <article data-testid="case-study">
          <p className={rotulo}>{t.caseKicker}</p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h1 className="entrada font-display text-[clamp(1.7rem,5vw,2.4rem)] font-semibold uppercase leading-[1.12] tracking-[0.04em]">
              {p.title}
            </h1>
            <ProjectTag project={p} lang={lang} />
          </div>

          <div className={phone ? "mt-6 flex flex-col gap-6 min-[900px]:flex-row" : "mt-6"}>
            {!phone && shot}
            <div className={phone ? "min-w-0 flex-1" : shot ? "mt-5" : ""}>
              <p className="text-[17px] leading-[1.7] text-fumo">{pick(p.description, lang)}</p>
              <CaseFields project={p} lang={lang} />
            </div>
            {phone && shot}
          </div>
        </article>
      </Ruled>

      {galeria.length > 0 ? (
        <Secao id="galeria" label={t.caseGallery}>
          <div className="flex flex-wrap gap-6">
            {galeria.map((img) => (
              <Shot key={img.src} src={img.src} alt={pick(img.alt, lang)} shape={img.shape} />
            ))}
          </div>
        </Secao>
      ) : null}

      {camadas.length > 0 ? (
        <Secao id="arquitetura" label={t.caseArchitecture}>
          {/* Diagrama em HTML puro: camadas empilhadas, de cima (cliente)
              para baixo (dados). A lista ordenada carrega a semantica; as
              setas sao so desenho. */}
          <ol className="max-w-[420px]">
            {camadas.map((c, n) => (
              <li key={c.pt}>
                {n > 0 ? (
                  <span aria-hidden="true" className="block py-1 text-center text-fumo">
                    ↓
                  </span>
                ) : null}
                <span className="block rounded-[6px] border border-traco-forte bg-bancada px-4 py-3 text-center font-display text-[14px]">
                  {pick(c, lang)}
                </span>
              </li>
            ))}
          </ol>
        </Secao>
      ) : null}

      {p.desafio ? (
        <Secao id="desafio" label={t.caseChallenge}>
          <p className="max-w-[560px] text-[16px] leading-[1.75]">{pick(p.desafio, lang)}</p>
        </Secao>
      ) : null}

      {p.aprendizado ? (
        <Secao id="aprendizado" label={t.caseLearning}>
          <p className="max-w-[560px] text-[16px] leading-[1.75]">{pick(p.aprendizado, lang)}</p>
        </Secao>
      ) : null}

      <Secao id="stack" label={t.caseStack}>
        <ul className="flex flex-wrap gap-x-2 text-[15px] text-fumo">
          {p.tech.map((tech, n) => (
            <li key={tech}>
              {tech}
              {n < p.tech.length - 1 ? <span aria-hidden="true"> ·</span> : null}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <ProjectLinks project={p} lang={lang} />
        </div>
      </Secao>

      <Ruled>
        <nav
          data-testid="case-nav"
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4 text-[15px]"
        >
          <Link href={voltar} className={acao}>
            <span aria-hidden="true">←</span> {t.caseBack}
          </Link>
          {proximo && proximo.id !== p.id ? (
            <Link href={caseHref(slugOf(proximo.title), lang)} className={acao}>
              <span className="text-fumo">{t.caseNext}:</span> {proximo.title}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </nav>
      </Ruled>
    </Shell>
  );
}
