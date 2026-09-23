"use client";

import * as React from "react";
import { Copy01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";

export function InstallCommandBox({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3.5 py-2 font-mono text-xs max-w-md w-full">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-muted-foreground select-none">$</span>
        <span className="truncate text-foreground">{command}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Copy installation command"
      >
        <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={13} />
      </Button>
    </div>
  );
}
