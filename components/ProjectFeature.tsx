import Image from "next/image";
import Ruled from "./Ruled";
import MarginNote from "./MarginNote";
import CaseField from "./CaseField";
import { content } from "@/data/content";
import { pick, type Lang, type Project } from "@/data/types";

const slug = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");

export default function ProjectFeature({
  project: p,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const t = content[lang];
  const id = slug(p.title);
  const temCaso = Boolean(p.contexto || p.decisao || p.resultado);
  const phone = p.shape === "phone";

  const shot = p.image ? (
    <div
      data-testid={`shot-${id}`}
      className={
        phone
          ? "w-[250px] shrink-0 overflow-hidden rounded-[14px] border border-traco-forte bg-bancada"
          : "overflow-hidden rounded-[6px] border border-traco-forte bg-bancada"
      }
    >
      <Image
        src={p.image}
        alt=""
        width={phone ? 250 : 660}
        height={phone ? 556 : 345}
        sizes={phone ? "250px" : "(max-width: 900px) 100vw, 660px"}
        className="h-auto w-full"
      />
    </div>
  ) : null;

  return (
    <Ruled
      id={id}
      margin={
        <div data-testid={`margin-${id}`}>
          {p.nota ? <MarginNote>{pick(p.nota, lang)}</MarginNote> : null}
        </div>
      }
    >
      <article data-testid={`project-${id}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-[22px] font-semibold uppercase tracking-[0.06em]">
            {p.title}
          </h2>
          {p.tag ? (
            <span className="text-[12px] uppercase tracking-[0.14em] text-verdete">
              {pick(p.tag, lang)}
            </span>
          ) : null}
        </div>

        <div className={phone ? "mt-5 flex flex-col gap-6 min-[900px]:flex-row" : "mt-5"}>
          {!phone && shot}
          <div className={phone ? "min-w-0 flex-1" : ""}>
            <p className="text-[16px] leading-[1.7] text-fumo">
              {pick(p.description, lang)}
            </p>
            {temCaso ? (
              <dl>
                {p.contexto ? (
                  <CaseField label={pick(p.contexto.label, lang)}>
                    {pick(p.contexto, lang)}
                  </CaseField>
                ) : null}
                {p.decisao ? (
                  <CaseField label={lang === "pt" ? "Decisão" : "Decision"}>
                    {pick(p.decisao, lang)}
                  </CaseField>
                ) : null}
                {p.resultado ? (
                  <CaseField label={lang === "pt" ? "Resultado" : "Result"}>
                    {pick(p.resultado, lang)}
                  </CaseField>
                ) : null}
              </dl>
            ) : null}
          </div>
          {phone && shot}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <span className="text-[13px] text-fumo">{p.tech.join(" · ")}</span>
          <span className="flex gap-5 text-[14px]">
            <a
              href={p.github}
              className="border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa"
            >
              {t.linkCode} ↗
            </a>
            {p.demo ? (
              <a
                href={p.demo}
                className="border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa"
              >
                {t.linkDemo} ↗
              </a>
            ) : null}
          </span>
        </div>
      </article>
    </Ruled>
  );
}
