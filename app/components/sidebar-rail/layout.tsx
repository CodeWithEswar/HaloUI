import { DocsShell } from "@/components/docs/docs-shell";

export default function SidebarRailDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
