"use client";

import * as React from "react";
import { CheckmarkCircle01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

export function CopyCodeButton({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        aria-label={copied ? "Code copied" : "Copy code"}
      >
        <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={13} />
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </>
  );
}
