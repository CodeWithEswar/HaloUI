import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background text-xs font-bold font-mono">
        H
      </span>
      <span className="text-base font-semibold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
