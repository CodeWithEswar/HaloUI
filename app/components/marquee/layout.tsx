import { DocsShell } from "@/components/docs/docs-shell";

export default function MarqueeDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
