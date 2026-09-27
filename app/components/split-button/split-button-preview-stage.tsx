"use client";

import * as React from "react";
import {
  FileAttachmentIcon,
  Link01Icon,
  Copy01Icon,
  Share01Icon,
  CheckmarkCircle02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonContent,
  SplitButtonItem,
  SplitButtonSeparator,
  SplitButtonLabel,
  type SplitButtonVariant,
  type SplitButtonSize,
} from "@/components/ui/split-button";
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

export function SplitButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<SplitButtonVariant>("default");
  const [size, setSize] = React.useState<SplitButtonSize>("default");
  const [disabledPrimary, setDisabledPrimary] = React.useState(false);
  const [disabledAll, setDisabledAll] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hasLongLabel, setHasLongLabel] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [lastAction, setLastAction] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

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

  const actionLabel = hasLongLabel ? "Publish Cryptographic Release Asset" : "Export";

  const handlePrimaryClick = () => {
    setLastAction("Primary Action executed immediately: Export document initiated.");
  };

  const handleMenuItemClick = (item: string) => {
    setLastAction(`Alternative Action chosen from menu: ${item}`);
    setOpen(false);
  };

  const generatedCode = React.useMemo(() => {
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";
    const primaryDisabledProp = disabledPrimary ? " disabled" : "";
    const allDisabledProp = disabledAll ? " disabled" : "";

    return `import {
  FileAttachmentIcon,
  Link01Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonContent,
  SplitButtonItem,
  SplitButtonSeparator,
} from "@/components/ui/split-button";

export function SplitButtonDemo() {
  const handleExport = () => {
    console.log("Primary action: Exporting document...");
  };

  return (
    <SplitButton${variantProp}${sizeProp}${allDisabledProp}>
      {/* 1. Primary Action: Executes immediately without opening the menu */}
      <SplitButtonAction onClick={handleExport}${primaryDisabledProp}>
        <HaloIcon icon={Share01Icon} size={${size === "sm" ? 14 : size === "lg" ? 18 : 16}} />
        <span>${actionLabel}</span>
      </SplitButtonAction>

      {/* 2. Menu Trigger: Opens secondary menu without triggering primary action */}
      <SplitButtonTrigger aria-label="More export options" />

      {/* 3. Secondary Actions Menu: Accessible, portalled, keyboard-navigable */}
      <SplitButtonContent align="end">
        <SplitButtonItem onClick={() => console.log("Export as PDF")}>
          <HaloIcon icon={FileAttachmentIcon} size={15} />
          Export as PDF
        </SplitButtonItem>
        <SplitButtonItem onClick={() => console.log("Export as CSV")}>
          <HaloIcon icon={FileAttachmentIcon} size={15} />
          Export as CSV
        </SplitButtonItem>
        <SplitButtonSeparator />
        <SplitButtonItem onClick={() => console.log("Copy export link")}>
          <HaloIcon icon={Link01Icon} size={15} />
          Copy export link
        </SplitButtonItem>
      </SplitButtonContent>
    </SplitButton>
  );
}`;
  }, [variant, size, disabledPrimary, disabledAll, actionLabel]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setVariant("default");
    setSize("default");
    setDisabledPrimary(false);
    setDisabledAll(false);
    setOpen(false);
    setHasLongLabel(false);
    setContainerWidth("full");
    setLastAction(null);
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Primary",
      value: disabledPrimary ? "DISABLED" : "DIRECT ACTION",
      variant: disabledPrimary ? "warning" : "default",
    },
    {
      label: "Trigger",
      value: disabledAll ? "DISABLED" : "SHRINK-0 PROTECTED",
      variant: disabledAll ? "warning" : "success",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Intensity",
      value: "SUBTLE",
      variant: "default",
    },
    {
      label: "Menu",
      value: open ? "OPEN" : "CLOSED",
      variant: open ? "success" : "default",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Test the two distinct hit targets: click Primary Action to execute immediately, or click the Secondary Trigger to open the real accessible alternatives menu."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={resetStage}
      onCopy={copyCode}
      copied={copied}
      telemetry={telemetry}
      controls={
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as SplitButtonVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Secondary (Tinted)", value: "secondary" },
                { label: "Outline (Structural)", value: "outline" },
                { label: "Ghost (Minimal)", value: "ghost" },
                { label: "Destructive (Crimson)", value: "destructive" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as SplitButtonSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (40px)", value: "default" },
                { label: "LG (48px)", value: "lg" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />

            <StageControlSelect
              label="State"
              value={disabledAll ? "all-disabled" : disabledPrimary ? "primary-disabled" : "active"}
              onChange={(val) => {
                if (val === "all-disabled") {
                  setDisabledPrimary(false);
                  setDisabledAll(true);
                } else if (val === "primary-disabled") {
                  setDisabledPrimary(true);
                  setDisabledAll(false);
                } else {
                  setDisabledPrimary(false);
                  setDisabledAll(false);
                }
              }}
              options={[
                { label: "Active", value: "active" },
                { label: "Disable 1st", value: "primary-disabled" },
                { label: "Disable All", value: "all-disabled" },
              ]}
            />
          </div>

          {/* QA Toggles Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            <button
              type="button"
              onClick={() => setHasLongLabel(!hasLongLabel)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                hasLongLabel
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {hasLongLabel ? "✓ Long Label (240px Reflow)" : "Long Label"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                open
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {open ? "✓ Menu Open" : "Menu Open"}
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-8 px-2 sm:px-4">
        <div
          className={cn(
            "w-full transition-all duration-300 mx-auto flex flex-col items-center justify-center gap-6",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          {/* Centerpiece Split Button with Real Container Constraint */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <SplitButton
              variant={variant}
              size={size}
              disabled={disabledAll}
              open={open}
              onOpenChange={setOpen}
            >
              {/* Primary Action Button */}
              <SplitButtonAction
                onClick={handlePrimaryClick}
                disabled={disabledPrimary}
              >
                <HaloIcon
                  icon={Share01Icon}
                  size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                />
                <span>{actionLabel}</span>
              </SplitButtonAction>

              {/* Menu Trigger */}
              <SplitButtonTrigger aria-label="More export options" />

              {/* Secondary Actions Overlay */}
              <SplitButtonContent align="end">
                <SplitButtonLabel>Export Options</SplitButtonLabel>
                <SplitButtonItem onClick={() => handleMenuItemClick("Export as PDF document")}>
                  <HaloIcon icon={FileAttachmentIcon} size={15} />
                  <span>Export as PDF</span>
                </SplitButtonItem>
                <SplitButtonItem onClick={() => handleMenuItemClick("Export as CSV spreadsheet")}>
                  <HaloIcon icon={FileAttachmentIcon} size={15} />
                  <span>Export as CSV</span>
                </SplitButtonItem>
                <SplitButtonSeparator />
                <SplitButtonItem onClick={() => handleMenuItemClick("Copied export link to clipboard")}>
                  <HaloIcon icon={Link01Icon} size={15} />
                  <span>Copy export link</span>
                </SplitButtonItem>
              </SplitButtonContent>
            </SplitButton>

            {/* Live Action Feedback Notification */}
            <div className="min-h-[28px] flex items-center justify-center text-center">
              {lastAction ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 animate-in fade-in zoom-in-95 duration-150">
                  <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
                  <span>{lastAction}</span>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground/70">
                  Click <strong>{actionLabel}</strong> to trigger default action, or click <strong>▼</strong> to open alternatives menu.
                </span>
              )}
            </div>
          </div>

          {/* Interactive Keyboard Instructions Guide */}
          <div className="w-full max-w-md rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <HaloIcon icon={SparklesIcon} size={14} className="text-primary" />
              <span>Interactive Keyboard Contract</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/80 font-mono text-[10px] text-foreground">Tab</kbd>
                <span className="ml-1.5">Primary &rarr; Trigger sequential focus</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/80 font-mono text-[10px] text-foreground">Enter / Space</kbd>
                <span className="ml-1.5">Executes focused control</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/80 font-mono text-[10px] text-foreground">ArrowDown / Up</kbd>
                <span className="ml-1.5">Roving focus in open menu</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/80 font-mono text-[10px] text-foreground">Escape</kbd>
                <span className="ml-1.5">Closes menu, restores focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
