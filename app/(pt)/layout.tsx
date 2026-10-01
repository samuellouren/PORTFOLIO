import { RootHtml, rootMetadata, rootViewport } from "../root";
import type { ReactNode } from "react";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function PtLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="pt-BR">{children}</RootHtml>;
}
