import { DocsShell } from "@/components/docs/docs-shell";

export default function FeatureCardDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
