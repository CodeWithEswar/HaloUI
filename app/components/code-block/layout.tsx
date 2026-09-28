import { DocsShell } from "@/components/docs/docs-shell";

export default function CodeBlockDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
