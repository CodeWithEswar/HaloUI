import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloNoiseDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
