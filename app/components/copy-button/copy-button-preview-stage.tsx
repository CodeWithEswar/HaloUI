"use client";

import * as React from "react";
import {
  TerminalIcon,
  Copy01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CopyButton,
  type CopyButtonVariant,
  type CopyButtonSize,
} from "@/components/ui/copy-button";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Wide (480px)" },
  { value: "390", label: "iPhone 15 Pro (390px)" },
  { value: "320", label: "Small Device (320px)" },
  { value: "280", label: "Compact Rail (280px)" },
  { value: "240", label: "Strict QA Min (240px)" },
];

export function CopyButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<CopyButtonVariant>("default");
  const [size, setSize] = React.useState<CopyButtonSize>("default");
  const [isLabeled, setIsLabeled] = React.useState(false);
  const [simulateError, setSimulateError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongValue, setHasLongValue] = React.useState(false);
  const [lastResult, setLastResult] = React.useState<"none" | "success" | "error">("none");
  const [copyCount, setCopyCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const sampleValue = hasLongValue
    ? "pnpm dlx shadcn@latest add https://ui.haloui.com/r/copy-button.json --overwrite --preserve-paths"
    : "pnpm dlx shadcn@latest add @haloui/copy-button";

  const getContainerMaxWidthClass = (width: string) => {
    switch (width) {
      case "1024":
        return "max-w-[1024px]";
      case "768":
        return "max-w-[768px]";
      case "640":
        return "max-w-[640px]";
      case "480":
        return "max-w-[480px]";
      case "390":
        return "max-w-[390px]";
      case "320":
        return "max-w-[320px]";
      case "280":
        return "max-w-[280px]";
      case "240":
        return "max-w-[240px]";
      default:
        return "max-w-2xl";
    }
  };

  const handleSimulatedCopy = simulateError
    ? async () => {
        await new Promise((r) => setTimeout(r, 120));
        throw new Error("Simulated clipboard permission rejection");
      }
    : undefined;

  const handleSuccess = () => {
    setLastResult("success");
    setCopyCount((c) => c + 1);
  };

  const handleError = () => {
    setLastResult("error");
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setVariant("default");
    setSize("default");
    setIsLabeled(false);
    setSimulateError(false);
    setDisabled(false);
    setHasLongValue(false);
    setContainerWidth("full");
    setLastResult("none");
  };

  const generatedCode = React.useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (disabled) propsList.push("disabled");
    if (!simulateError) {
      propsList.push(`value="${sampleValue}"`);
    } else {
      propsList.push(`onCopy={async () => { throw new Error("Clipboard rejected"); }}`);
    }

    if (!isLabeled) {
      propsList.push(`aria-label="Copy installation command"`);
    }

    const propsStr = propsList.length > 0 ? " " + propsList.join("\n      ") : "";

    if (isLabeled) {
      return `import { CopyButton } from "@/components/ui/copy-button";

export function InstallationCommand() {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card min-w-0 max-w-full">
      <code className="text-xs font-mono truncate">${sampleValue}</code>
      <CopyButton${propsStr}>
        Copy
      </CopyButton>
    </div>
  );
}`;
    }

    return `import { CopyButton } from "@/components/ui/copy-button";

export function InstallationCommand() {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card min-w-0 max-w-full">
      <code className="text-xs font-mono truncate">${sampleValue}</code>
      <CopyButton${propsStr}
      />
    </div>
  );
}`;
  }, [variant, size, disabled, simulateError, isLabeled, sampleValue]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Touch Target",
      value: size === "lg" ? "40px (LG)" : size === "sm" ? "32px (SM)" : "36px (DEF)",
      variant: size === "sm" ? "warning" : "success",
    },
    {
      label: "Status",
      value: lastResult === "success" ? "✓ COPIED" : lastResult === "error" ? "✕ ERROR" : "IDLE",
      variant: lastResult === "success" ? "success" : lastResult === "error" ? "warning" : undefined,
    },
    {
      label: "A11y Feedback",
      value: "Polite Live Region",
      variant: "success",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect clipboard write feedback transitions, polite live-region announcements, layout-shift-free label widths, and container-aware row reflow."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={resetStage}
      code={generatedCode}
      onCopy={copyCodeToClipboard}
      copied={copiedCode}
      telemetry={telemetry}
      controls={
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as CopyButtonVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Secondary (Frosted)", value: "secondary" },
                { label: "Outline (Hairline)", value: "outline" },
                { label: "Ghost (Transparent)", value: "ghost" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as CopyButtonSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (36px)", value: "default" },
                { label: "LG (40px)", value: "lg" },
              ]}
            />

            <StageControlSelect
              label="Mode"
              value={isLabeled ? "labeled" : "icon-only"}
              onChange={(val) => setIsLabeled(val === "labeled")}
              options={[
                { label: "Icon-only", value: "icon-only" },
                { label: "Labeled (Stable Width)", value: "labeled" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            <button
              type="button"
              onClick={() => setSimulateError(!simulateError)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                simulateError
                  ? "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {simulateError ? "✕ Simulate Failure" : "Normal Copy"}
            </button>

            <button
              type="button"
              onClick={() => setHasLongValue(!hasLongValue)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                hasLongValue
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {hasLongValue ? "✓ Long Code (240px Reflow)" : "Long Code"}
            </button>

            <button
              type="button"
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                disabled
                  ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {disabled ? "✓ Disabled" : "Disabled"}
            </button>

            <button
              type="button"
              onClick={() => setIsLabeled(!isLabeled)}
              className="h-7 px-2.5 rounded-md text-xs font-medium border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60 transition-colors cursor-pointer select-none"
            >
              {isLabeled ? "Switch to Icon-only" : "Switch to Labeled"}
            </button>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full mx-auto p-4 sm:p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 ease-out",
          getContainerMaxWidthClass(containerWidth)
        )}
      >
        {/* Realistic interactive surface */}
        <div className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/75 backdrop-blur-md shadow-sm min-w-0 max-w-full">
          <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
            <HaloIcon icon={TerminalIcon} size={18} className="text-muted-foreground shrink-0" />
            <code className="text-xs sm:text-sm font-mono text-foreground truncate select-all min-w-0">
              {sampleValue}
            </code>
          </div>

          <div className="shrink-0">
            <CopyButton
              value={simulateError ? undefined : sampleValue}
              onCopy={handleSimulatedCopy}
              variant={variant}
              size={size}
              disabled={disabled}
              onCopySuccess={handleSuccess}
              onCopyError={handleError}
              aria-label="Copy installation command"
            >
              {isLabeled ? "Copy" : undefined}
            </CopyButton>
          </div>
        </div>

        {/* Live Status Hint */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground text-center">
          <span>Copies recorded: <strong className="text-foreground">{copyCount}</strong></span>
          <span>·</span>
          <span>
            Feedback:{" "}
            <strong
              className={cn(
                lastResult === "success"
                  ? "text-emerald-500"
                  : lastResult === "error"
                    ? "text-rose-500"
                    : "text-muted-foreground"
              )}
            >
              {lastResult === "success" ? "Copied to clipboard" : lastResult === "error" ? "Operation rejected" : "Idle"}
            </strong>
          </span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
