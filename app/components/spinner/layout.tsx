import { DocsShell } from "@/components/docs/docs-shell";

export default function SpinnerDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
