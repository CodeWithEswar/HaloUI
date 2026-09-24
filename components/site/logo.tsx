import * as React from "react";
import Link from "next/link";
import { HaloUIWordmark } from "@/components/brand/haloui-wordmark";
import { siteConfig } from "@/lib/site-config";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
    >
      <HaloUIWordmark className="text-base" />
    </Link>
  );
}
