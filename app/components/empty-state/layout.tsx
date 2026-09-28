import { DocsShell } from "@/components/docs/docs-shell";

export default function EmptyStateDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
