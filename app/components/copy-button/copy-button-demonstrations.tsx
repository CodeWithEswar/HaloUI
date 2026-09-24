"use client";

import * as React from "react";
import {
  Copy01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  CodeCircleIcon,
  Key01Icon,
  Link01Icon,
  TerminalIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { CopyButton, type CopyButtonVariant, type CopyButtonSize } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

/**
 * 1. Default Interactive Copy Demonstration
 * Real clipboard integration over a standard package installation command.
 */
export function CopyButtonDefaultPreview() {
  const command = "pnpm dlx shadcn@latest add @haloui/copy-button";

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <HaloIcon icon={TerminalIcon} size={16} className="text-muted-foreground shrink-0" />
          <code className="text-xs font-mono text-foreground truncate select-all">{command}</code>
        </div>
        <CopyButton
          value={command}
          variant="outline"
          size="sm"
          aria-label="Copy installation command"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Click the copy button or press Enter to write the installation command to your clipboard.
      </p>
    </div>
  );
}

/**
 * 2. Deterministic Failure Simulation Preview
 * Demonstrates restrained failure feedback when clipboard write rejects, without faking success.
 */
export function CopyButtonFailurePreview() {
  const [errorLog, setErrorLog] = React.useState<string | null>(null);

  const simulateFailure = async () => {
    // Artificial 150ms delay then rejection
    await new Promise((resolve) => setTimeout(resolve, 150));
    throw new Error("Clipboard write permission was denied by client security context.");
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              Deterministic Rejection Test
            </span>
            <p className="text-xs text-muted-foreground">
              Simulates a rejected clipboard write to verify error state, icon, and announcement.
            </p>
          </div>

          <CopyButton
            onCopy={simulateFailure}
            onCopyError={(err) => setErrorLog((err as Error).message)}
            variant="default"
            size="default"
            aria-label="Simulate rejected copy operation"
          />
        </div>

        {errorLog && (
          <div className="pt-2 border-t border-rose-500/20 flex items-start gap-2 text-xs text-rose-600 dark:text-rose-400 font-mono">
            <HaloIcon icon={AlertCircleIcon} size={14} className="shrink-0 mt-0.5" />
            <span>Caught rejection: {errorLog}</span>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Notice that focus remains firmly anchored on the button throughout the failure and reset transition.
      </p>
    </div>
  );
}

/**
 * 3. Variants Preview
 * Default (Liquid Glass), Secondary, Outline, and Ghost variants.
 */
export function CopyButtonVariantsPreview() {
  const variants: { label: string; variant: CopyButtonVariant; description: string }[] = [
    { label: "Default", variant: "default", description: "Liquid glass lens" },
    { label: "Secondary", variant: "secondary", description: "Frosted crystal surface" },
    { label: "Outline", variant: "outline", description: "Hairline optical edge" },
    { label: "Ghost", variant: "ghost", description: "Pure clarity for toolbars" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {variants.map(({ label, variant, description }) => (
        <div
          key={variant}
          className="flex flex-col items-center justify-center p-6 gap-3 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm text-center"
        >
          <div className="flex items-center gap-3">
            <CopyButton
              value={`HaloUI ${label} Variant Value`}
              variant={variant}
              aria-label={`Copy with ${label} variant`}
            />
            <CopyButton
              value={`HaloUI ${label} Variant Value`}
              variant={variant}
              aria-label={`Copy labeled with ${label} variant`}
            >
              Copy
            </CopyButton>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-foreground">{label}</span>
            <p className="text-[11px] text-muted-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 4. Sizes Preview
 * Sm (32px), Default (36px), and Lg (40px) sizing.
 */
export function CopyButtonSizesPreview() {
  const sizes: { label: string; size: CopyButtonSize; dimension: string }[] = [
    { label: "Small (sm)", size: "sm", dimension: "32px / text-xs" },
    { label: "Default", size: "default", dimension: "36px / text-sm" },
    { label: "Large (lg)", size: "lg", dimension: "40px / text-base" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {sizes.map(({ label, size, dimension }) => (
        <div
          key={size}
          className="flex flex-col items-center justify-center p-6 gap-3 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm text-center"
        >
          <div className="flex items-center gap-3">
            <CopyButton
              value={`Size demonstration for ${label}`}
              size={size}
              aria-label={`Copy value size ${label}`}
            />
            <CopyButton
              value={`Size demonstration for ${label}`}
              size={size}
              aria-label={`Copy labeled value size ${label}`}
            >
              Copy
            </CopyButton>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-foreground">{label}</span>
            <p className="text-[11px] text-muted-foreground">{dimension}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 5. Labeled Mode Preview with Width Stability
 * Demonstrates stable inline layout during transition between "Copy" -> "Copied" and "Copy" -> "Failed".
 */
export function CopyButtonLabeledPreview() {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Normal Labeled Copy */}
        <div className="p-4 rounded-xl border border-border/70 bg-card/50 flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground">Standard Success</span>
          <p className="text-xs text-muted-foreground">
            Preserves container layout with calibrated min-width during feedback.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-border/40">
            <span className="text-xs text-muted-foreground font-mono">npm i @haloui/core</span>
            <CopyButton
              value="npm i @haloui/core"
              variant="outline"
              size="sm"
              aria-label="Copy package installation command"
            >
              Copy
            </CopyButton>
          </div>
        </div>

        {/* Labeled Error Feedback */}
        <div className="p-4 rounded-xl border border-border/70 bg-card/50 flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground">Error Feedback</span>
          <p className="text-xs text-muted-foreground">
            Gracefully transitions to "Failed" upon rejection without width distortion.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-border/40">
            <span className="text-xs text-muted-foreground font-mono">restricted://key</span>
            <CopyButton
              onCopy={async () => {
                await new Promise((r) => setTimeout(r, 100));
                throw new Error("Restricted resource");
              }}
              variant="outline"
              size="sm"
              aria-label="Copy restricted resource"
            >
              Copy
            </CopyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Code Block Context Preview
 * Realistic code surface preview testing ghost and outline utility copy actions.
 */
export function CopyButtonCodeBlockPreview() {
  const snippet = `import { CopyButton } from "@/components/ui/copy-button";

export function CommandRow() {
  return (
    <CopyButton
      value="pnpm dlx shadcn@latest add copy-button"
      variant="ghost"
      size="sm"
      aria-label="Copy installation command"
    />
  );
}`;

  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden rounded-xl border border-border/80 bg-neutral-950 text-neutral-100 shadow-md">
      {/* Code block header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <HaloIcon icon={CodeCircleIcon} size={15} className="text-neutral-400" />
          <span className="text-xs font-mono text-neutral-300">command-row.tsx</span>
        </div>
        <CopyButton
          value={snippet}
          variant="ghost"
          size="sm"
          className="text-neutral-400 hover:text-white"
          aria-label="Copy code snippet"
        >
          Copy
        </CopyButton>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto text-xs font-mono text-neutral-200 leading-relaxed">
        <pre>{snippet}</pre>
      </div>
    </div>
  );
}

/**
 * 7. Dense UI Context Preview
 * Compact rows, API credentials, and table metadata rows.
 */
export function CopyButtonDenseUIPreview() {
  const credentials = [
    { label: "Publishable Key", value: "pk_live_51Msz...92xK", secret: false },
    { label: "Secret API Key", value: "sk_live_948a...48Lk", secret: true },
    { label: "Webhook Endpoint", value: "https://api.acme.dev/v1/events", secret: false },
  ];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-2 rounded-xl border border-border/70 bg-card/60 p-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <HaloIcon icon={Key01Icon} size={16} className="text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">API Credentials</span>
      </div>

      <div className="divide-y divide-border/40">
        {credentials.map((cred) => (
          <div key={cred.label} className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-foreground">{cred.label}</span>
              <span className="text-[11px] font-mono text-muted-foreground truncate">{cred.value}</span>
            </div>
            <CopyButton
              value={cred.value}
              variant="ghost"
              size="sm"
              aria-label={`Copy ${cred.label}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 8. Real Keyboard Accessibility Preview
 * Step-by-step guidance for verifying keyboard focus stability and polite live-region announcements.
 */
export function CopyButtonKeyboardPreview() {
  const [lastEvent, setLastEvent] = React.useState<string>("Waiting for interaction...");

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 p-5 rounded-xl border border-border/70 bg-card/50">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Keyboard Accessibility Station</h4>
        <p className="text-xs text-muted-foreground">
          Use <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[10px]">Tab</kbd> to focus the button. Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[10px]">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[10px]">Space</kbd> to copy. Notice that keyboard focus ring never flashes or resets during feedback.
        </p>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50">
        <span className="text-xs font-mono text-foreground">git clone https://github.com/haloui/halo.git</span>
        <CopyButton
          value="git clone https://github.com/haloui/halo.git"
          variant="default"
          size="default"
          onCopySuccess={() => setLastEvent("Key triggered copy: SUCCESS (focus maintained)")}
          onCopyError={() => setLastEvent("Key triggered copy: FAILED (focus maintained)")}
          aria-label="Copy git clone URL"
        />
      </div>

      <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
        <span>Telemetry Status:</span>
        <span className="font-mono text-foreground">{lastEvent}</span>
      </div>
    </div>
  );
}

/**
 * 9. State Matrix Preview
 * Matrix displaying Idle, Hover, Focus, Copied, Copied + Focus, Error, and Disabled states.
 */
export function CopyButtonStatesPreview() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Idle */}
      <div className="p-3.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center gap-2 text-center">
        <CopyButton value="idle" variant="outline" size="sm" aria-label="Idle state" />
        <span className="text-xs text-muted-foreground">Idle</span>
      </div>

      {/* Focus Ring Active */}
      <div className="p-3.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center gap-2 text-center">
        <CopyButton
          value="focus"
          variant="outline"
          size="sm"
          className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)]"
          aria-label="Focus state"
        />
        <span className="text-xs text-muted-foreground">Focused</span>
      </div>

      {/* Copied Feedback */}
      <div className="p-3.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center gap-2 text-center">
        <button
          type="button"
          data-slot="copy-button"
          data-status="copied"
          className={cn(
            "size-8 rounded-md text-xs inline-flex items-center justify-center font-medium isolate overflow-hidden",
            "halo-liquid-glass text-emerald-700 dark:text-emerald-300 border-emerald-500/40 dark:border-emerald-500/50"
          )}
          aria-label="Copied reference state"
        >
          <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
        </button>
        <span className="text-xs text-muted-foreground">Copied</span>
      </div>

      {/* Error Feedback */}
      <div className="p-3.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center gap-2 text-center">
        <button
          type="button"
          data-slot="copy-button"
          data-status="error"
          className={cn(
            "size-8 rounded-md text-xs inline-flex items-center justify-center font-medium isolate overflow-hidden",
            "halo-liquid-glass text-rose-700 dark:text-rose-300 border-rose-500/40 dark:border-rose-500/50"
          )}
          aria-label="Error reference state"
        >
          <HaloIcon icon={AlertCircleIcon} size={14} />
        </button>
        <span className="text-xs text-muted-foreground">Error</span>
      </div>
    </div>
  );
}

/**
 * 10. Background Response Preview
 * Translucent optical behavior over Neutral, Image, Dense UI, and Dark backdrops.
 */
export function CopyButtonBackgroundResponsePreview() {
  const backgrounds = [
    { name: "Neutral", className: "bg-muted/30" },
    {
      name: "Image Mesh",
      className:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-rose-400/15 to-transparent",
    },
    {
      name: "Dense UI",
      className:
        "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]",
    },
    { name: "Dark", className: "bg-neutral-950 text-white" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {backgrounds.map((bg) => (
        <div
          key={bg.name}
          className={cn(
            "relative p-6 rounded-xl border border-border/70 flex flex-col items-center justify-center gap-3 overflow-hidden min-h-[140px]",
            bg.className
          )}
        >
          <div className="flex items-center gap-3">
            <CopyButton
              value={`HaloUI over ${bg.name}`}
              variant="default"
              aria-label={`Copy value on ${bg.name}`}
            />
            <CopyButton
              value={`HaloUI over ${bg.name}`}
              variant="default"
              aria-label={`Copy labeled value on ${bg.name}`}
            >
              Copy
            </CopyButton>
          </div>
          <span className="text-xs font-medium opacity-80">{bg.name}</span>
        </div>
      ))}
    </div>
  );
}
