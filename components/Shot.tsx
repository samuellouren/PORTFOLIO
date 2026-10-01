import Image from "next/image";
import type { Shape, Video } from "@/data/types";

// Screenshot com moldura: estreita e alta para "phone", larga para "web".
// width/height so reservam a proporcao (sem CLS); a imagem escala por CSS.
//
// Com `recorte`, a moldura phone para em 400px e corta o resto de baixo (como
// object-cover + object-top): no card da home o print inteiro deixava um vazio
// grande ao lado do texto. 400px (72% da tela) deixa o mapa do Mapa Farma
// inteiro e para acima do botao "+", e no FocusDrop mostra o grafico da
// semana e para abaixo dos dias ativos. Um degrade em ::after, da transparencia
// para o fundo da moldura (bancada), apaga a borda do corte. Na pagina do caso
// o print sai inteiro, sem degrade.
//
// Com `video`, a moldura mostra o video no lugar do print. Sem JS para ler
// prefers-reduced-motion, saem dois <video> e o CSS escolhe um: o que toca
// sozinho (mudo, em loop) so sem reduced motion; o outro, com controles e sem
// autoplay, so com reduced motion. preload="none" nos dois: o que esta oculto
// nao baixa nada.
export default function Shot({
  src,
  alt,
  shape,
  video,
  testId,
  preload = false,
  recorte = false,
}: {
  src: string;
  alt: string;
  shape?: Shape;
  video?: Video;
  testId?: string;
  preload?: boolean;
  recorte?: boolean;
}) {
  const phone = shape === "phone";
  const degrade =
    "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-linear-to-t after:from-bancada after:to-transparent";
  const width = phone ? 250 : 660;
  const height = phone ? 556 : 345;
  const comum = {
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none",
    poster: video?.poster,
    width,
    height,
    "aria-label": alt,
  } as const;

  return (
    <div
      data-testid={testId}
      className={
        phone
          ? `w-[250px] shrink-0 self-start overflow-hidden rounded-[14px] border border-traco-forte bg-bancada${recorte ? ` relative max-h-[400px] ${degrade}` : ""}`
          : "overflow-hidden rounded-[6px] border border-traco-forte bg-bancada"
      }
    >
      {video ? (
        <>
          <video {...comum} autoPlay data-video="auto" className="block h-auto w-full motion-reduce:hidden">
            <source src={video.src} />
          </video>
          <video {...comum} controls data-video="manual" className="hidden h-auto w-full motion-reduce:block">
            <source src={video.src} />
          </video>
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={phone ? "250px" : "(max-width: 900px) 100vw, 660px"}
          preload={preload}
          className="h-auto w-full"
        />
      )}
    </div>
  );
}
