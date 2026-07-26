import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "../hooks/useInView";

// Animação sutil de entrada: fade + slide curto, uma vez só (useInView com once).
// Respeita prefers-reduced-motion — quem pediu menos movimento recebe só o conteúdo.
export default function Reveal({
  as = "div",
  delay = 0,
  y = 18,
  threshold = 0.12,
  className = "",
  children,
  ...rest
}) {
  const [ref, inView] = useInView(threshold);
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
