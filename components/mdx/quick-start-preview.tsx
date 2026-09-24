"use client";

import * as React from "react";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { cn } from "@/lib/utils";

export function QuickStartButtonPreview() {
  const [backdrop, setBackdrop] = React.useState<"neutral" | "context">("neutral");

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      <div className="flex h-10 items-center justify-between border-b border-border bg-muted/30 px-4 text-xs">
        <span className="font-medium text-muted-foreground">Live preview</span>
        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
          <button
            type="button"
            onClick={() => setBackdrop("neutral")}
            className={cn(
              "rounded px-2 py-0.5 text-[11px] font-medium transition-colors",
              backdrop === "neutral"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Neutral
          </button>
          <button
            type="button"
            onClick={() => setBackdrop("context")}
            className={cn(
              "rounded px-2 py-0.5 text-[11px] font-medium transition-colors",
              backdrop === "context"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Context
          </button>
        </div>
      </div>
      <div
        className={cn(
          "relative flex min-h-36 items-center justify-center p-8 transition-colors",
          backdrop === "neutral"
            ? "bg-muted/15"
            : "bg-radial-[at_top_left] from-indigo-500/10 via-background to-muted/30"
        )}
      >
        {backdrop === "context" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:24px_24px]"
          />
        )}
        <HaloButton variant="primary">Continue</HaloButton>
      </div>
    </div>
  );
}

export function QuickStartVariantPreview() {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      <div className="flex h-10 items-center justify-between border-b border-border bg-muted/30 px-4 text-xs font-medium text-muted-foreground">
        <span>Variant preview</span>
        <span className="text-[11px] font-mono text-muted-foreground">primary &middot; neutral</span>
      </div>
      <div className="flex min-h-36 flex-wrap items-center justify-center gap-3 bg-muted/15 p-8">
        <HaloButton variant="primary">Continue</HaloButton>
        <HaloButton variant="neutral">Cancel</HaloButton>
      </div>
    </div>
  );
}
