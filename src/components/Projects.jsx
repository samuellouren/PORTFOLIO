import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { projects } from "../data/projects";

// UX: ProjectCard — hover revela mais info, não sobrecarrega a visão inicial
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-surface border border-border rounded-2xl p-6 card-glow transition-all duration-300 flex flex-col gap-4 ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Featured badge */}
      {project.featured && (
        <span className="absolute top-4 right-4 text-xs text-cyan border border-cyan/30 bg-cyan/10 px-2 py-0.5 rounded-full">
          destaque
        </span>
      )}

      {/* Header */}
      <div>
        <h3 className="font-display font-semibold text-xl text-text mb-2">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech stack — UX: pills visuais são mais rápidas de escanear que texto */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-2 border-t border-border">
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-text transition-colors flex items-center gap-1.5"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Ver código
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan hover:text-cyan/80 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Demo ao vivo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="projetos" className="py-24 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span className="text-xs text-primary font-medium tracking-widest uppercase mb-4 block">
          // projetos
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl">
          O que eu construí
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
