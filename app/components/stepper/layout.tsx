import { DocsShell } from "@/components/docs/docs-shell";

export default function StepperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
