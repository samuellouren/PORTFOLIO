import Ruled from "./Ruled";
import { content, contacts } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Contact({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="contato"
      margin={
        <h2 className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
          {t.contactTitle}
        </h2>
      }
    >
      <p className="mb-5 max-w-[560px] text-[16px]">{t.contactSub}</p>
      <ul data-testid="contact" className="space-y-2 text-[16px]">
        {contacts.map((c) => (
          <li key={c.id}>
            <a
              href={c.href}
              className="border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa"
            >
              <span className="sr-only">{c.label} </span>
              {c.value}
            </a>
          </li>
        ))}
      </ul>
    </Ruled>
  );
}
