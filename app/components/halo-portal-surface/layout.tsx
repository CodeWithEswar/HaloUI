import { DocsShell } from "@/components/docs/docs-shell";

export default function HaloPortalSurfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
