import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloRefractionLayerDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
