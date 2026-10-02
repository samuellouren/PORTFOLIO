import { pick, type Lang, type Project } from "@/data/types";

// Etiqueta de categoria. verdete so para "cliente real" (spec 4.1).
export default function ProjectTag({ project: p, lang }: { project: Project; lang: Lang }) {
  if (!p.tag) return null;
  return (
    <span
      className={
        p.tag.pt === "Cliente real"
          ? "font-display text-[0.75rem] uppercase tracking-[0.14em] text-verdete"
          : "font-display text-[0.75rem] uppercase tracking-[0.14em] text-fumo"
      }
    >
      {pick(p.tag, lang)}
    </span>
  );
}
