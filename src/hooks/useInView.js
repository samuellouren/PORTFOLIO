import { useEffect, useRef, useState } from "react";

// UX: Scroll-triggered animations revelam conteúdo progressivamente,
// reduzindo a sobrecarga cognitiva — o usuário processa um bloco por vez.
// once:true evita re-animação ao scrollar para cima, o que seria distrativo.
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // once: true
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
