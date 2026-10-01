import { pick, type Lang, type Meta } from "@/data/types";

// Coluna de datas da margem: "2026 · no ar" na primeira linha e o papel na
// segunda. O que falta some sem deixar separador nem linha vazia sobrando.
export default function ProjectMeta({ meta, lang }: { meta?: Meta; lang: Lang }) {
  if (!meta) return null;
  const linha = [meta.ano, meta.status && pick(meta.status, lang)]
    .filter((x): x is string => Boolean(x))
    .join(" · ");
  const papel = meta.papel && pick(meta.papel, lang);
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
          {papel}
        </p>
      ) : null}
    </div>
  );
}
