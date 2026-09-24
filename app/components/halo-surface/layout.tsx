import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloSurfaceDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
