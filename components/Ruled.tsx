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
      <div
        data-testid="ruled-content"
        className="border-l border-traco pb-14 pl-5 pt-4 min-[900px]:pl-8 min-[900px]:pt-14"
      >
        {children}
      </div>
    </section>
  );
}
