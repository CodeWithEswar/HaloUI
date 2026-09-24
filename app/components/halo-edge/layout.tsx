import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloEdgeDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
