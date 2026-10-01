import Image from "next/image";
import type { Shape } from "@/data/types";

// Screenshot com moldura: estreita e alta para "phone", larga para "web".
// width/height so reservam a proporcao (sem CLS); a imagem escala por CSS.
export default function Shot({
  src,
  alt,
  shape,
  testId,
  preload = false,
}: {
  src: string;
  alt: string;
  shape?: Shape;
  testId?: string;
  preload?: boolean;
}) {
  const phone = shape === "phone";
  return (
    <div
      data-testid={testId}
      className={
        phone
          ? "w-[250px] shrink-0 self-start overflow-hidden rounded-[14px] border border-traco-forte bg-bancada"
          : "overflow-hidden rounded-[6px] border border-traco-forte bg-bancada"
      }
    >
      <Image
        src={src}
        alt={alt}
        width={phone ? 250 : 660}
        height={phone ? 556 : 345}
        sizes={phone ? "250px" : "(max-width: 900px) 100vw, 660px"}
        preload={preload}
        className="h-auto w-full"
      />
    </div>
  );
}
