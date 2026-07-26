import { useLanguage } from "../context/language-context";
import { skillGroups } from "../data/projects";
import Reveal from "./Reveal";

export default function Skills() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="skills"
      className="mx-auto max-w-[1120px] border-t border-borderSoft px-5 py-16 sm:px-7 sm:py-[88px]"
    >
      <Reveal className="mb-4 sm:mb-[18px]">
        <span className="eyebrow">{t.skillsLabel}</span>
      </Reveal>

      <Reveal as="h2" className="section-title mb-9 sm:mb-11">
        {t.skillsTitle}
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.id}
            delay={i * 0.06}
            className="rounded-[18px] border border-border bg-surface p-6 shadow-card transition-colors duration-300 hover:border-borderStrong sm:px-[26px] sm:pb-7 sm:pt-[26px]"
          >
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="h-2 w-2 rotate-45 rounded-[2px] bg-gold" />
              <span className="font-display text-xl text-text">
                {group.title[lang]}
              </span>
            </div>
            <div className="flex flex-wrap gap-[9px]">
              {group.items.map((chip) => (
                <span
                  key={chip}
                  className="chip px-3 py-2 text-[13px] font-medium transition-colors duration-200 hover:border-accent hover:text-text"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
