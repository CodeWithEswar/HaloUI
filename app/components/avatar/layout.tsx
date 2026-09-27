import { DocsShell } from "@/components/docs/docs-shell";

export default function AvatarDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
