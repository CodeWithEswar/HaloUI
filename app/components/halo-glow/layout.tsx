import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloGlowDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
