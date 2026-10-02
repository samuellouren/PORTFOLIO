import type { ReactNode } from "react";

export default function Ruled({
  margin,
  children,
  id,
}: {
  margin?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="mx-auto grid w-full max-w-[900px] grid-cols-1 gap-x-8 px-5 sm:px-8 min-[900px]:grid-cols-[200px_minmax(0,660px)]"
    >
      <div
        data-testid="ruled-margin"
        className="pt-10 min-[900px]:pt-14 min-[900px]:text-right"
      >
        {margin}
      </div>
      {/* before: o entalhe da regua no limite de cada secao (spec 4.3). */}
      <div
        data-testid="ruled-content"
        className="relative border-l border-traco pb-14 pl-5 pt-4 before:absolute before:top-0 before:-left-[4.5px] before:h-px before:w-2 before:bg-traco-forte min-[900px]:pl-8 min-[900px]:pt-14"
      >
        {children}
      </div>
    </section>
  );
}
