import { DocsShell } from "@/components/docs/docs-shell";

export default function BannerDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
