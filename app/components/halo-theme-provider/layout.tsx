import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloThemeProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
