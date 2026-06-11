import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import avatarImg from "../assets/avatar.jpeg";

// UX: Seção "Sobre" tem um único trabalho — fazer o visitante se conectar com você
// como pessoa antes de ver os projetos. Curta, direta, sem clichês.
export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="sobre" className="py-24 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Label — UX: eyebrow tag orienta o usuário na página */}
        <span className="text-xs text-primary font-medium tracking-widest uppercase mb-4 block">
          // sobre mim
        </span>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto — lado esquerdo, não muda */}
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight">
              Curioso por natureza,{" "}
              <span className="gradient-text">movido por metas</span>
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Sou de Maceió, Alagoas, estudando Engenharia de Software na UMJ.
                Tenho background técnico em desenvolvimento web pelo SENAI, o
                que me deu uma base prática antes mesmo de entrar na faculdade.
              </p>
              <p>
                Construo projetos reais para aprender — não apenas sigo
                tutoriais. Minha metodologia é Aprender → Construir → Revisar,
                porque é fazendo que a coisa gruda de verdade.
              </p>
              <p>
                Meu objetivo é conseguir uma vaga como dev remoto — no Brasil ou
                internacionalmente — e crescer construindo produto que as
                pessoas usam de verdade.
              </p>
            </div>
          </div>

          {/* Foto — lado direito */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              {/* Borda decorativa atrás da foto */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-cyan translate-x-2 translate-y-2" />
              {/* A foto em si */}
              <img
                src={avatarImg}
                alt="Samuel Louren"
                className="relative w-full h-full object-cover rounded-2xl border border-border"
              />
            </div>
          </div>
        </div>

        {/* Cards de info — agora embaixo do grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Projetos no GitHub", value: "5+" },
            { label: "Tecnologias", value: "10+" },
            { label: "Formação", value: "UMJ" },
            { label: "Localização", value: "Maceió, AL" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-surface border border-border rounded-xl p-5 card-glow transition-all duration-300"
            >
              <div className="font-display font-bold text-2xl text-primary mb-1">
                {item.value}
              </div>
              <div className="text-xs text-muted">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
