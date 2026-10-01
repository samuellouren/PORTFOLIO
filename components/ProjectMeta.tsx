import { pick, type Lang, type Meta } from "@/data/types";

// Coluna de datas da margem: "2026 · no ar". Sai na ordem ano, papel, status;
// o que falta some sem deixar separador sobrando.
export default function ProjectMeta({ meta, lang }: { meta?: Meta; lang: Lang }) {
  if (!meta) return null;
  const partes = [meta.ano, meta.papel && pick(meta.papel, lang), meta.status && pick(meta.status, lang)]
    .filter((x): x is string => Boolean(x));
  if (partes.length === 0) return null;
  return (
    <p
      data-testid="project-meta"
      className="font-display text-[12px] uppercase tracking-[0.14em] tabular-nums text-fumo"
    >
      {partes.join(" · ")}
    </p>
  );
}
