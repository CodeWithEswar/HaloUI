import { DocsShell } from "@/components/docs/docs-shell";

export default function ItemDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
