import { DocsShell } from "@/components/docs/docs-shell";

export default function AccordionDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
