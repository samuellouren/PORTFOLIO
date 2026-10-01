import Ruled from "./Ruled";
import { content } from "@/data/content";
import { skills } from "@/data/projects";
import { pick, type Lang } from "@/data/types";

export default function About({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="sobre"
      margin={
        <h2 className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
          {t.aboutLabel}
        </h2>
      }
    >
      {t.aboutParagraphs.map((p) => (
        <p key={p} className="mb-4 max-w-[560px] text-[16px] leading-[1.75]">
          {p}
        </p>
      ))}
      <div data-testid="skills" className="mt-6 max-w-[560px]">
        <h3 className="font-display text-[12px] font-normal uppercase tracking-[0.14em] text-fumo">
          {t.skillsTitle}
        </h3>
        <dl className="mt-2">
          {skills.map((g) => (
            <div
              key={g.label.pt}
              className="mt-2 grid grid-cols-1 gap-x-4 sm:grid-cols-[120px_minmax(0,1fr)]"
            >
              <dt className="font-display text-[12px] uppercase leading-[1.8] tracking-[0.14em] text-fumo">
                {pick(g.label, lang)}
              </dt>
              <dd className="text-[15px] leading-[1.8] text-serragem">
                {g.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Ruled>
  );
}
