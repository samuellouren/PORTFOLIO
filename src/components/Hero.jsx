import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// UX principle: cursor piscando = elemento de atenção que remete a código
// Mantém o olho do usuário no título sem precisar de animação pesada
function TerminalCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(timer);
  }, []);
  return (
    <span
      className={`inline-block w-0.5 h-10 md:h-14 bg-primary ml-1 align-middle transition-opacity duration-75 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16 max-w-5xl mx-auto">
      {/* Status badge — UX: social proof imediato, mostra atividade */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-8 w-fit"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
        </span>
        <span className="text-xs text-muted font-medium tracking-widest uppercase">
          Disponível para oportunidades
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
      >
        Oi, eu sou <span className="gradient-text">Samuel</span>
        <TerminalCursor />
      </motion.h1>

      {/* Subtítulo — UX: claro e direto, sem jargão vago */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-muted text-lg md:text-xl max-w-xl leading-relaxed mb-10"
      >
        Estudante de Engenharia de Software em Maceió, construindo apps que
        resolvem problemas reais. Foco em{" "}
        <span className="text-text">React</span>,{" "}
        <span className="text-text">TypeScript</span> e{" "}
        <span className="text-text">Node.js</span>.
      </motion.p>

      {/* CTAs — UX: hierarquia clara, primário vs secundário */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-wrap gap-4"
      >
        <a
          href="#projetos"
          className="px-6 py-3 rounded-lg bg-primary text-white font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
        >
          Ver projetos
        </a>
        <a
          href="https://github.com/samuellouren"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-border text-muted hover:text-text hover:border-primary/50 transition-all duration-200 font-display font-semibold text-sm flex items-center gap-2"
        >
          {/* GitHub icon inline */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </motion.div>

      {/* Scroll hint — UX: affordance visual para continuar scrollando */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-muted/50 tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
