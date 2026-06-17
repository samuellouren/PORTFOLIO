import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { skills } from "../data/projects";

function SkillBar({ name, level, index }) {
  const [ref, inView] = useInView(0.3);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text">{name}</span>
        <span className="text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #6C63FF, #00D4C8)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span className="text-xs text-primary font-medium tracking-widest uppercase mb-4 block">
          // habilidades
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl">
          Meu stack técnico
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} {...skill} index={i} />
        ))}
      </div>
    </section>
  );
}
