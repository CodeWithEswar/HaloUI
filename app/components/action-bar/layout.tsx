import { DocsShell } from "@/components/docs/docs-shell";

export default function ActionBarDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
