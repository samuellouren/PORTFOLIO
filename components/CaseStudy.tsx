import Link from "next/link";
import Shell from "./Shell";
import Ruled from "./Ruled";
import MarginNote from "./MarginNote";
import ProjectMeta from "./ProjectMeta";
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

  const decisoes = p.decisoes ?? [];
  const principais = decisoes.filter((d) => d.destaque);
  const outras = decisoes.filter((d) => !d.destaque);
  const galeria = p.galeria ?? [];
  const camadas = p.arquitetura ?? [];

  const shot = p.image ? (
    <Shot
      src={p.image}
      alt={p.imageAlt ? pick(p.imageAlt, lang) : ""}
      shape={p.shape}
      video={p.video}
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
            <div className="flex flex-col gap-3 min-[900px]:items-end">
              <ProjectMeta meta={p.meta} lang={lang} />
              {p.nota ? <MarginNote>{pick(p.nota, lang)}</MarginNote> : null}
            </div>
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
            </div>
            {phone && shot}
          </div>
          {/* Problema/Origem e Resultado abaixo da linha do print, na largura
              toda da coluna: ao lado de um print de celular sobravam ~180px. */}
          <div className="mt-4">
            <CaseFields project={p} lang={lang} />
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
              setas sao so desenho. O aparte (servico externo) fica ao lado
              da caixa no desktop e embaixo dela no mobile. */}
          <ol>
            {camadas.map((c, n) => (
              <li key={c.pt}>
                {n > 0 ? (
                  <span aria-hidden="true" className="block py-1 text-center text-fumo sm:w-[300px]">
                    ↓
                  </span>
                ) : null}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="block rounded-[6px] border border-traco-forte bg-bancada px-4 py-3 text-center font-display text-[14px] sm:w-[300px] sm:shrink-0">
                    {pick(c, lang)}
                  </span>
                  {c.aparte ? (
                    <span className="text-[14px] italic leading-[1.5] text-fumo">
                      <span aria-hidden="true">↔ </span>
                      {pick(c.aparte, lang)}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Secao>
      ) : null}

      {decisoes.length > 0 ? (
        <Secao id="decisoes" label={t.caseDecisions}>
          {/* As marcadas como destaque saem inteiras; as outras viram uma
              lista compacta, com o título e uma linha. */}
          {principais.length > 0 ? (
            <ol data-testid="decisoes-destaque" className="max-w-[560px] space-y-6">
              {principais.map((d) => (
                <li key={d.titulo.pt}>
                  <h3 className="font-display text-[16px] font-semibold leading-[1.4]">
                    {pick(d.titulo, lang)}
                  </h3>
                  <p className="mt-1 text-[16px] leading-[1.7] text-serragem">{pick(d, lang)}</p>
                </li>
              ))}
            </ol>
          ) : null}
          {outras.length > 0 ? (
            <div className={principais.length > 0 ? "mt-10" : ""}>
              <h3 className={rotulo}>{t.caseOtherDecisions}</h3>
              <ul data-testid="decisoes-outras" className="mt-3 max-w-[560px] divide-y divide-traco">
                {outras.map((d) => (
                  <li key={d.titulo.pt} className="py-2.5">
                    <p className="font-display text-[15px] leading-[1.5]">{pick(d.titulo, lang)}</p>
                    {d.curta ? (
                      <p className="truncate text-[14px] leading-[1.6] text-fumo">{pick(d.curta, lang)}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
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
