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
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

export function CopyButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<CopyButtonVariant>("default");
  const [size, setSize] = React.useState<CopyButtonSize>("default");
  const [isLabeled, setIsLabeled] = React.useState(false);
  const [simulateError, setSimulateError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [lastResult, setLastResult] = React.useState<"none" | "success" | "error">("none");
  const [copyCount, setCopyCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const sampleValue = "pnpm dlx shadcn@latest add @haloui/copy-button";

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
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card">
      <code className="text-xs font-mono">${sampleValue}</code>
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
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card">
      <code className="text-xs font-mono">${sampleValue}</code>
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

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      onCopy={copyCodeToClipboard}
      copied={copiedCode}
      telemetry={[
        {
          label: "Mode",
          value: isLabeled ? "Labeled" : "Icon-only",
        },
        {
          label: "Variant",
          value: variant.charAt(0).toUpperCase() + variant.slice(1),
        },
        {
          label: "Size",
          value: size.toUpperCase(),
        },
        {
          label: "Status",
          value: lastResult === "success" ? "✓ Copied" : lastResult === "error" ? "✕ Error" : "Idle",
          variant: lastResult === "success" ? "success" : lastResult === "error" ? "warning" : undefined,
        },
        {
          label: "Copies",
          value: String(copyCount),
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as CopyButtonVariant)}
            options={[
              { label: "Default", value: "default" },
              { label: "Secondary", value: "secondary" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as CopyButtonSize)}
            options={[
              { label: "SM (32px)", value: "sm" },
              { label: "Default (36px)", value: "default" },
              { label: "LG (40px)", value: "lg" },
            ]}
          />

          <StageControlSelect
            label="Mode"
            value={isLabeled ? "labeled" : "icon-only"}
            onValueChange={(val) => setIsLabeled(val === "labeled")}
            options={[
              { label: "Icon-only", value: "icon-only" },
              { label: "Labeled", value: "labeled" },
            ]}
          />

          <StageControlSelect
            label="Operation"
            value={simulateError ? "error" : "normal"}
            onValueChange={(val) => setSimulateError(val === "error")}
            options={[
              { label: "Normal Write", value: "normal" },
              { label: "Simulate Failure", value: "error" },
            ]}
          />

          <StageControlSelect
            label="State"
            value={disabled ? "disabled" : "active"}
            onValueChange={(val) => setDisabled(val === "disabled")}
            options={[
              { label: "Active", value: "active" },
              { label: "Disabled", value: "disabled" },
            ]}
          />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full max-w-2xl mx-auto gap-6">
        {/* Realistic interactive surface */}
        <div className="w-full flex items-center justify-between gap-3 p-4 rounded-xl border border-border/70 bg-card/75 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <HaloIcon icon={TerminalIcon} size={18} className="text-muted-foreground shrink-0" />
            <code className="text-xs sm:text-sm font-mono text-foreground truncate select-all">
              {sampleValue}
            </code>
          </div>

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
    </PreviewStageShell>
  );
}
