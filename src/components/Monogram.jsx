// Marca geométrica com as iniciais SL — substitui a foto pessoal.
// `size` em px; o gradiente usa os dois acentos da paleta.
export default function Monogram({ size = 30, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-[30%] bg-gradient-to-br from-accent to-gold font-display font-bold text-ink ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.46) }}
    >
      SL
    </span>
  );
}
