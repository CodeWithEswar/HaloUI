"use client";

import * as React from "react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function MobileDocsNav({ iconOnly = false }: { iconOnly?: boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant={iconOnly ? "ghost" : "outline"}
            size={iconOnly ? "icon" : "sm"}
            className={iconOnly ? "h-full w-10 rounded-none border-0 text-muted-foreground hover:text-foreground" : undefined}
            aria-label={iconOnly ? "Browse documentation" : undefined}
          />
        }
      >
        <HaloIcon icon={Menu01Icon} size={15} />
        {iconOnly ? <span className="sr-only">Browse documentation</span> : "Browse docs"}
      </SheetTrigger>
      <SheetContent side="left" className="w-60 max-w-[calc(100vw-3.5rem)] gap-0 p-0 data-[side=left]:w-60">
        <SheetHeader className="border-b text-left">
          <SheetTitle>Documentation</SheetTitle>
        </SheetHeader>
        <DocsSidebar onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
