import Link from "next/link";
import Ruled from "./Ruled";
import { content } from "@/data/content";
import { trajetoria } from "@/data/projects";
import { caseHref, pick, type Lang } from "@/data/types";

// Linha do tempo compacta: ano numa coluna estreita, uma linha de texto.
// Item sem ano confirmado deixa a coluna vazia em vez de inventar uma data.
export default function Path({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="trajetoria"
      margin={
        <h2 className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
          {t.pathTitle}
        </h2>
      }
    >
      <ol data-testid="path" className="max-w-[560px]">
        {trajetoria.map((m) => (
          <li
            key={m.texto.pt}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 py-1.5 text-[16px] leading-[1.6]"
          >
            <span className="font-display text-[12px] uppercase leading-[2.2] tracking-[0.14em] tabular-nums text-fumo">
              {m.ano ?? ""}
            </span>
            {m.slug ? (
              <Link href={caseHref(m.slug, lang)} className="transition-colors hover:text-brasa">
                {pick(m.texto, lang)}
              </Link>
            ) : (
              <span>{pick(m.texto, lang)}</span>
            )}
          </li>
        ))}
      </ol>
    </Ruled>
  );
}
