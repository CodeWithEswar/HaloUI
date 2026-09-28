import { DocsShell } from "@/components/docs/docs-shell";

export default function ToastDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
