"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { getDocsPagination } from "@/lib/docs/navigation";

export function DocsPagination() {
  const pathname = usePathname();
  const { previous, next } = getDocsPagination(pathname);
  if (!previous && !next) return null;

  return (
    <nav aria-label="Documentation pagination" className="mt-16 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      {previous ? (
        <Link href={previous.href} scroll={false} className="group rounded-lg border border-border p-4 transition-colors hover:bg-accent/50">
          <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
            <HaloIcon icon={ArrowLeft01Icon} size={13} /> Previous
          </span>
          <span className="text-sm font-medium">{previous.title}</span>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} scroll={false} className="group rounded-lg border border-border p-4 text-right transition-colors hover:bg-accent/50">
          <span className="mb-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next <HaloIcon icon={ArrowRight01Icon} size={13} />
          </span>
          <span className="text-sm font-medium">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
