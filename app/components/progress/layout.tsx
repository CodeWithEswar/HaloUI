import { DocsShell } from "@/components/docs/docs-shell";

export default function ProgressDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
