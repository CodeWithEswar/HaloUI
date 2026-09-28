import { DocsShell } from "@/components/docs/docs-shell";

export default function ActivityFeedDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
