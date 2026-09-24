"use client";

import * as React from "react";
import { HaloButton } from "@/components/haloui/button/halo-button";

export function InstallationButtonResult() {
  return (
    <div className="my-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted/20 p-6">
      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        Rendered output
      </span>
      <HaloButton variant="primary">Continue</HaloButton>
    </div>
  );
}
