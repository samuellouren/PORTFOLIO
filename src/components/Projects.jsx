import { useLanguage } from "../context/language-context";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

const ArrowUpRight = () => (
  <span aria-hidden="true" className="ml-1 inline-block">
    ↗
  </span>
);

function FeaturedCard({ project, index }) {
  const { lang, t } = useLanguage();
  const description =
    lang === "en" && project.descriptionEn
      ? project.descriptionEn
      : project.description;

  return (
    <Reveal
      as="article"
      delay={index * 0.06}
      className="grid overflow-hidden rounded-[20px] border border-border bg-surface shadow-cardLg transition-colors duration-300 hover:border-borderStrong md:grid-cols-[1.05fr_1fr]"
    >
      {/* Painel da screenshot — placeholder listrado até existir imagem */}
      <div className="stripes grid min-h-[190px] place-items-center border-b border-border md:min-h-[290px] md:border-b-0 md:border-r">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="p-6 text-center">
            <span className="inline-block rounded-lg border border-border bg-bg/[0.72] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:text-[11px]">
              {project.shot?.[lang]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[18px] p-6 sm:p-[34px] sm:pb-[30px]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-gold">0{index + 1}</span>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            {project.tag?.[lang]}
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold leading-[1.2] text-text sm:text-[29px]">
          {project.title}
        </h3>

        <p className="text-[15px] leading-[1.75] text-muted text-pretty">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="chip px-2.5 py-1.5 font-mono text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-5 border-t border-border pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] font-semibold text-textSoft transition-colors hover:text-accent"
          >
            {t.linkCode}
            <ArrowUpRight />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13.5px] font-semibold text-accent transition-colors hover:text-accentSoft"
            >
              {t.linkDemo}
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const { lang, t } = useLanguage();
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section
      id="projetos"
      className="mx-auto max-w-[1120px] border-t border-borderSoft px-5 py-16 sm:px-7 sm:py-[88px]"
    >
      <Reveal className="mb-4 sm:mb-[18px]">
        <span className="eyebrow">{t.workLabel}</span>
      </Reveal>

      <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-6 sm:mb-11 sm:gap-8">
        <h2 className="section-title">{t.workTitle}</h2>
        <p className="max-w-[330px] text-[15px] text-subtle text-pretty">
          {t.workSub}
        </p>
      </Reveal>

      <div className="flex flex-col gap-6 sm:gap-[26px]">
        {featured.map((project, i) => (
          <FeaturedCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Índice compacto dos demais projetos */}
      <Reveal
        delay={0.05}
        className="mt-10 rounded-[20px] border border-border bg-surface/50 p-6 sm:mt-11 sm:px-[30px] sm:py-7"
      >
        <div className="eyebrow mb-4 block tracking-[0.16em] sm:mb-[18px]">
          {t.moreLabel}
        </div>
        <div className="flex flex-col">
          {more.map((project) => (
            <a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid items-center gap-2 border-b border-borderSoft px-2.5 py-4 text-text transition-colors duration-200 last:border-b-0 hover:bg-accent/[0.07] md:grid-cols-[200px_1fr_auto] md:gap-6"
            >
              <span className="font-display text-lg">{project.title}</span>
              <span className="text-sm text-subtle text-pretty">
                {project.summary?.[lang]}
              </span>
              <span className="font-mono text-[11px] text-accent">
                {project.stack}
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
