import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

// UX: Seção de contato simples > formulário complexo para portfólio de dev
// Links diretos têm taxa de conversão muito maior do que forms que podem falhar
const contacts = [
  {
    label: "GitHub",
    value: "@samuellouren",
    href: "https://github.com/samuellouren",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/samuel-lourenco-50b780306",
    href: "https://www.linkedin.com/in/samuel-lourenco-50b780306/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "samuel.lourenco.sls@gmail.com",
    href: "mailto:samuel.lourenco.sls@gmail.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="contato" className="py-24 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs text-primary font-medium tracking-widest uppercase mb-4 block">
          // contato
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
          Vamos conversar
        </h2>
        <p className="text-muted max-w-md mb-12">
          Aberto para oportunidades de trabalho, freelas ou só um papo sobre
          tecnologia. Respondo rápido.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 bg-surface border border-border rounded-xl px-5 py-4 text-muted hover:text-text hover:border-primary/50 card-glow transition-all duration-300"
            >
              <span className="text-primary">{contact.icon}</span>
              <div>
                <div className="text-xs text-muted/60 mb-0.5">
                  {contact.label}
                </div>
                <div className="text-sm font-medium text-text">
                  {contact.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
