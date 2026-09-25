import { DocsShell } from "@/components/docs/docs-shell";

export default function SwitchDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
