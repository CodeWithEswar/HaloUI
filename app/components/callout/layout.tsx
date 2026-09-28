import { DocsShell } from "@/components/docs/docs-shell";

export default function CalloutDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
