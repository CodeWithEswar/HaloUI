import { DocsShell } from "@/components/docs/docs-shell";

export default function CarouselDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
