import { DocsShell } from "@/components/docs/docs-shell";

export default function DrawerDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
