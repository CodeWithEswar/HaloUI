import { DocsShell } from "@/components/docs/docs-shell";

export default function KeyValueDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
