import * as React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function ComponentPreview({
  title = "Preview",
  href,
  children,
}: {
  title?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-7 overflow-hidden rounded-xl border border-border">
      <div className="flex min-h-10 items-center justify-between border-b border-border bg-muted/30 px-4">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        {href && (
          <Link href={href} target="_blank" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            Open preview <HaloIcon icon={ArrowUpRight01Icon} size={13} />
          </Link>
        )}
      </div>
      <div className="min-h-64">{children}</div>
    </section>
  );
}
