import { DocsShell } from "@/components/docs/docs-shell";

export default function DescriptionListDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
