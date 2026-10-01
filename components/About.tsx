import Ruled from "./Ruled";
import { content } from "@/data/content";
import { skills } from "@/data/projects";
import type { Lang } from "@/data/types";

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
        {/* Dois niveis, os mesmos do curriculo: principais em primeiro plano;
            complementares numa linha menor, em fumo. */}
        <dl className="mt-2">
          <div className="mt-2 grid grid-cols-1 gap-x-4 sm:grid-cols-[120px_minmax(0,1fr)]">
            <dt className="font-display text-[12px] uppercase leading-[1.8] tracking-[0.14em] text-fumo">
              {t.skillsMain}
            </dt>
            <dd data-testid="skills-main" className="text-[16px] leading-[1.8] text-serragem">
              {skills[lang].principais.join(", ")}
            </dd>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-x-4 sm:grid-cols-[120px_minmax(0,1fr)]">
            <dt className="font-display text-[11px] uppercase leading-[1.9] tracking-[0.14em] text-fumo">
              {t.skillsAlso}
            </dt>
            <dd data-testid="skills-also" className="text-[14px] leading-[1.8] text-fumo">
              {skills[lang].complementares.join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </Ruled>
  );
}
