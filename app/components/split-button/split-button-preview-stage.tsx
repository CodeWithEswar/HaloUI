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
} from "@/components/docs/preview-stage-shell";

export function SplitButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<SplitButtonVariant>("default");
  const [size, setSize] = React.useState<SplitButtonSize>("default");
  const [disabledPrimary, setDisabledPrimary] = React.useState(false);
  const [disabledAll, setDisabledAll] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

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
  Copy01Icon,
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
    console.log("Primary action: Exporting default document...");
  };

  return (
    <SplitButton${variantProp}${sizeProp}${allDisabledProp}>
      {/* 1. Primary Action: Executes immediately without opening the menu */}
      <SplitButtonAction onClick={handleExport}${primaryDisabledProp}>
        <HaloIcon icon={Share01Icon} size={${size === "sm" ? 14 : size === "lg" ? 18 : 16}} />
        Export
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
  }, [variant, size, disabledPrimary, disabledAll]);

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
    setLastAction(null);
  };

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
      telemetry={[
        {
          label: "Primary",
          value: disabledPrimary ? "Disabled" : "Direct Action",
          variant: disabledPrimary ? "warning" : undefined,
        },
        {
          label: "Trigger",
          value: disabledAll ? "Disabled" : "Menu Trigger",
          variant: disabledAll ? "warning" : undefined,
        },
        {
          label: "Menu",
          value: open ? "Open" : "Closed",
          variant: open ? "success" : undefined,
        },
        {
          label: "Focus",
          value: "z-20 Layered",
          variant: "success",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as SplitButtonVariant)}
            options={[
              { label: "Default", value: "default" },
              { label: "Secondary", value: "secondary" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
              { label: "Destructive", value: "destructive" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as SplitButtonSize)}
            options={[
              { label: "SM (32px)", value: "sm" },
              { label: "Default (40px)", value: "default" },
              { label: "LG (48px)", value: "lg" },
            ]}
          />

          <StageControlSelect
            label="Menu"
            value={open ? "open" : "closed"}
            onValueChange={(val) => setOpen(val === "open")}
            options={[
              { label: "Closed", value: "closed" },
              { label: "Open", value: "open" },
            ]}
          />

          <StageControlSelect
            label="State"
            value={disabledAll ? "all-disabled" : disabledPrimary ? "primary-disabled" : "active"}
            onValueChange={(val) => {
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
      }
    >
      <div className="w-full flex flex-col items-center justify-center gap-6 p-4 sm:p-8 min-h-[300px]">
        {/* Centerpiece Split Button */}
        <div className="flex flex-col items-center justify-center gap-4">
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
              <span>Export</span>
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
                Click <strong>Export</strong> to trigger default action, or click <strong>▼</strong> to open alternatives menu.
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
              <span className="ml-1.5">Encounter Primary, then Trigger</span>
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
              <span className="ml-1.5">Closes menu, restores focus to trigger</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
