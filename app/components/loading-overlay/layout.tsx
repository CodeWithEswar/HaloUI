import { DocsShell } from "@/components/docs/docs-shell";

export default function LoadingOverlayDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
