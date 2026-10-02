import Link from "next/link";
import Ruled from "./Ruled";
import { content } from "@/data/content";
import { featuredBySlug, trajetoria } from "@/data/projects";
import { caseHref, pick, type Lang, type Marco } from "@/data/types";
import type { ReactNode } from "react";

// Troca no texto o nome de cada destaque citado por um link para o caso dele.
function comLinks(m: Marco, lang: Lang): ReactNode[] {
  let partes: ReactNode[] = [pick(m.texto, lang)];
  for (const slug of m.slugs ?? []) {
    const titulo = featuredBySlug(slug)!.title;
    partes = partes.flatMap<ReactNode>((parte) => {
      if (typeof parte !== "string" || !parte.includes(titulo)) return [parte];
      const [antes, ...depois] = parte.split(titulo);
      return [
        antes,
        <Link key={slug} href={caseHref(slug, lang)} className="border-b border-traco-forte transition-colors hover:border-brasa hover:text-brasa">
          {titulo}
        </Link>,
        depois.join(titulo),
      ];
    });
  }
  return partes;
}

// Linha do tempo compacta: ano numa coluna estreita, uma linha de texto.
export default function Path({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="trajetoria"
      margin={
        <h2 className="font-display text-[0.75rem] uppercase tracking-[0.14em] text-fumo">
          {t.pathTitle}
        </h2>
      }
    >
      <ol data-testid="path" className="max-w-[560px]">
        {trajetoria.map((m) => (
          <li
            key={m.texto.pt}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 py-1.5 text-[1rem] leading-[1.6]"
          >
            <span className="font-display text-[0.75rem] uppercase leading-[2.2] tracking-[0.14em] tabular-nums text-fumo">
              {m.ano}
            </span>
            <span>{comLinks(m, lang)}</span>
          </li>
        ))}
      </ol>
    </Ruled>
  );
}
