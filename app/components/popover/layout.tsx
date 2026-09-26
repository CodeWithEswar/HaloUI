import { DocsShell } from "@/components/docs/docs-shell";

export default function PopoverDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
