import { DocsShell } from "@/components/docs/docs-shell";

export default function TimelineDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
