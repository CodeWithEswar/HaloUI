import { DocsShell } from "@/components/docs/docs-shell";

export default function TableDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
