import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloScrimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
