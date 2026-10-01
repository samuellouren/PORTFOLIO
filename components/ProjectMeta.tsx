import { pick, type Lang, type Meta } from "@/data/types";

// Coluna de datas da margem: "2026 · no ar" na primeira linha. Com `papel`
// (só na página do caso), o papel vem embaixo, um trecho por linha: o card da
// home não repete o que o hero já diz. O que falta some sem deixar separador
// nem linha vazia sobrando.
export default function ProjectMeta({
  meta,
  lang,
  papel: comPapel = false,
}: {
  meta?: Meta;
  lang: Lang;
  papel?: boolean;
}) {
  if (!meta) return null;
  const linha = [meta.ano, meta.status && pick(meta.status, lang)]
    .filter((x): x is string => Boolean(x))
    .join(" · ");
  const papel = comPapel && meta.papel ? pick(meta.papel, lang) : undefined;
  if (!linha && !papel) return null;
  const estilo = "font-display text-[12px] uppercase tracking-[0.14em] tabular-nums text-fumo";
  return (
    <div>
      {linha ? (
        <p data-testid="project-meta" className={estilo}>
          {linha}
        </p>
      ) : null}
      {papel ? (
        <p data-testid="project-role" className={`${estilo} mt-1`}>
          {/* Um trecho por linha, sem "·": em nenhuma largura sobra separador solto. */}
          {papel.split(" · ").map((trecho) => (
            <span key={trecho} className="block whitespace-nowrap">
              {trecho}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
