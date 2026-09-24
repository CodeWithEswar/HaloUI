import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloFocusRingDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
