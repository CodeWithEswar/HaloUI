import { DocsShell } from "@/components/docs/docs-shell";

export default function ToggleGroupDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
