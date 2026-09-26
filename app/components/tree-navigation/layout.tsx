import { DocsShell } from "@/components/docs/docs-shell";

export default function TreeNavigationLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
