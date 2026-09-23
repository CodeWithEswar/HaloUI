"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { AppLogo } from "@/components/brand/app-logo";
import { HaloIcon } from "@/components/icons/halo-icon";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex h-full w-10 items-center justify-center rounded-none border-0 text-muted-foreground hover:text-foreground md:hidden cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        )}
        aria-label="Toggle Navigation Menu"
      >
        <HaloIcon icon={Menu01Icon} size={15} />
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 max-w-[calc(100vw-3.5rem)] pr-0 data-[side=left]:w-60">
        <SheetHeader className="px-5 text-left">
          <SheetTitle className="flex items-center gap-2">
            <AppLogo size="sm" />
            <span className="font-semibold text-sm">{siteConfig.name}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3 px-5 py-6 text-sm">
          {siteConfig.mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-1.5 transition-colors",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-border flex flex-col space-y-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="py-1 text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
