import { DocsShell } from "@/components/docs/docs-shell";

export default function DataTableDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
