"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {siteConfig.mainNav.map((item) => {
        const isExact = pathname === item.href;
        const hasMoreSpecificMatch = siteConfig.mainNav.some(
          (other) =>
            other.href !== item.href &&
            other.href.startsWith(item.href) &&
            pathname.startsWith(other.href)
        );
        const isActive =
          isExact ||
          (item.href !== "/" && pathname.startsWith(item.href) && !hasMoreSpecificMatch);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "transition-colors",
              isActive
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
