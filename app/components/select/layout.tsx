import { DocsShell } from "@/components/docs/docs-shell";

export default function SelectDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
