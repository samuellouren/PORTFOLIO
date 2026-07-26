import { useLanguage } from "../context/language-context";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="sobre"
      className="mx-auto max-w-[1120px] border-t border-borderSoft px-5 py-16 sm:px-7 sm:py-[88px]"
    >
      <Reveal className="mb-4 sm:mb-[18px]">
        <span className="eyebrow">{t.aboutLabel}</span>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2 md:gap-16 md:items-start">
        <Reveal as="h2" className="section-title text-pretty">
          {t.aboutTitle}
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-[18px]">
          {t.aboutParagraphs.map((p) => (
            <p key={p} className="text-base leading-[1.8] text-muted text-pretty">
              {p}
            </p>
          ))}
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-[52px] lg:grid-cols-4">
        {t.stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className="rounded-2xl border border-border bg-surface p-5 shadow-card transition-colors duration-300 hover:border-borderStrong sm:px-5 sm:py-[22px]"
          >
            <div className="mb-1.5 font-display text-[26px] font-semibold text-accent">
              {s.value}
            </div>
            <div className="text-[12.5px] tracking-[0.02em] text-subtle">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
