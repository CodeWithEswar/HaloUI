import { DocsShell } from "@/components/docs/docs-shell";

export default function DockDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
