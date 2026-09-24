import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
