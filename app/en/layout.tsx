import type { ReactNode } from "react";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <div lang="en">{children}</div>;
}
