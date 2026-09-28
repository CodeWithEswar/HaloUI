"use client";

import * as React from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastContent,
  ToastAction,
  ToastClose,
  ToastIcon,
  toast,
  Toaster,
  type ToastIntensity,
} from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Large (480px)" },
  { value: "390", label: "iPhone Pro (390px)" },
  { value: "320", label: "Mobile Min (320px)" },
  { value: "280", label: "Micro Panel (280px)" },
  { value: "240", label: "Extreme 240px (240px)" },
];

export function ToastPreviewStage() {
  const [type, setType] = React.useState<"success" | "info" | "warning" | "error">("success");
  const [intensity, setIntensity] = React.useState<ToastIntensity>("balanced");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [withAction, setWithAction] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setType("success");
    setIntensity("balanced");
    setContainerWidth("full");
    setWithAction(true);
  };

  const handleTriggerToast = () => {
    toast.create({
      title:
        type === "success"
          ? "Deployment Succeeded"
          : type === "warning"
          ? "High Memory Utilization"
          : type === "error"
          ? "Failed to Sync Changes"
          : "System Update Available",
      description:
        type === "success"
          ? "All 18 microservices deployed to cluster us-east-1."
          : type === "warning"
          ? "Memory usage reached 87% across primary nodes."
          : type === "error"
          ? "Could not establish TLS socket to upstream registry."
          : "HaloUI Liquid Glass v3.0 is ready to install.",
      type: type,
    });
  };

  const telemetryItems: TelemetryItem[] = [
    { label: "Surface Type", value: "Floating Portal" },
    { label: "Material Recipe", value: intensity },
    { label: "Notification Type", value: type },
    { label: "Container Mode", value: containerWidth === "full" ? "Fluid 100%" : `${containerWidth}px` },
  ];

  const codeSnippet = `import { toast, Toaster } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

// 1. Mount Toaster once in your root layout:
<Toaster position="bottom-right" intensity="${intensity}" />

// 2. Trigger toast imperatively anywhere in your application:
toast.create({
  title: "${
    type === "success"
      ? "Deployment Succeeded"
      : type === "warning"
      ? "High Memory Utilization"
      : type === "error"
      ? "Failed to Sync Changes"
      : "System Update Available"
  }",
  description: "${
    type === "success"
      ? "All 18 microservices deployed to cluster us-east-1."
      : "Contextual feedback delivered via Balanced Liquid Glass."
  }",
  type: "${type}",
});`;

  return (
    <PreviewStageShell
      title="Toast"
      description="Ephemeral application feedback surface engineered with Balanced Liquid Glass, stacked swipe physics, non-intrusive portal rendering, and mobile-safe viewport margins."
      badge="Feedback & Status 02"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      telemetry={telemetryItems}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={handleReset}
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-2.5">
          {/* Main Controls Row: Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Notification Type"
              value={type}
              options={[
                { value: "success", label: "Success (Operational)" },
                { value: "info", label: "Informational" },
                { value: "warning", label: "Warning (Caution)" },
                { value: "error", label: "Error (Destructive)" },
              ]}
              onChange={(val) => setType(val as "success" | "info" | "warning" | "error")}
            />

            <StageControlSelect
              label="Optical Intensity"
              value={intensity}
              options={[
                { value: "balanced", label: "Balanced (Signature Glass)" },
                { value: "subtle", label: "Subtle (Restrained)" },
                { value: "plain", label: "Plain (Zero Transparency)" },
              ]}
              onChange={(val) => setIntensity(val as ToastIntensity)}
            />

            <StageControlSelect
              label="Container Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />

            <div className="flex flex-col gap-1 justify-end">
              <Button
                size="sm"
                variant="default"
                onClick={handleTriggerToast}
                className="w-full h-8 text-xs font-medium"
              >
                <HaloIcon icon={SparklesIcon} size={14} className="mr-1.5" />
                Trigger Live Toast
              </Button>
            </div>
          </div>

          {/* Toggle Flags Row: Neatly Aligned in Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="toast-action-toggle"
                  checked={withAction}
                  onCheckedChange={(checked) => setWithAction(Boolean(checked))}
                />
                <Label htmlFor="toast-action-toggle" className="text-xs cursor-pointer select-none">
                  Display Action Trigger
                </Label>
              </div>
            </div>

            <div className="text-[11px] text-muted-foreground font-mono">
              Base-UI Stacking Engine Active
            </div>
          </div>
        </div>
      }
    >
      {/* Live Presentation Stage inside Canvas */}
      <div className="w-full flex flex-col items-center justify-center p-2 sm:p-6 transition-all duration-300">
        <div
          className={cn(
            "w-full transition-all duration-300 mx-auto",
            containerWidth !== "full" && "border border-dashed border-sky-500/30 rounded-2xl p-2 sm:p-4 bg-black/[0.02] dark:bg-white/[0.02]"
          )}
          style={{
            maxWidth: containerWidth === "full" ? "100%" : `${containerWidth}px`,
          }}
        >
          {containerWidth !== "full" && (
            <div className="mb-2 text-[10px] uppercase font-mono tracking-wider text-muted-foreground/80 flex items-center justify-between">
              <span>Boundary: {containerWidth}px Container Simulation</span>
              <span>Reflow Active</span>
            </div>
          )}

          {/* Inline Static Representation of the Toast surface for design inspection */}
          <div className="w-full max-w-sm mx-auto">
            <div
              className={cn(
                "rounded-xl sm:rounded-2xl transition-all duration-200 p-3.5 sm:p-4",
                intensity === "balanced" && [
                  "bg-card/90 dark:bg-card/50 backdrop-blur-xl backdrop-saturate-180",
                  "border border-white/60 dark:border-white/18",
                  "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]",
                  "dark:shadow-[0_16px_48px_-4px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.25)]",
                ],
                intensity === "subtle" && [
                  "bg-card/80 dark:bg-card/40 backdrop-blur-md backdrop-saturate-150",
                  "border border-border/70 dark:border-white/14",
                  "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]",
                ],
                intensity === "plain" && [
                  "bg-popover text-popover-foreground border border-border shadow-md",
                ]
              )}
            >
              <div className="flex items-center gap-3">
                <ToastIcon type={type} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="text-xs sm:text-sm font-semibold tracking-tight text-foreground leading-snug break-words">
                    {type === "success"
                      ? "Configuration Saved"
                      : type === "warning"
                      ? "Approaching Rate Limit"
                      : type === "error"
                      ? "Handshake Interrupted"
                      : "Telemetry Sync Complete"}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed break-words">
                    {type === "success"
                      ? "Updated 14 cluster DNS configurations."
                      : type === "warning"
                      ? "50 requests remaining in this evaluation window."
                      : type === "error"
                      ? "Failed to connect to cluster endpoint."
                      : "Subtle Liquid Glass verified across all viewports."}
                  </div>
                </div>

                {withAction && (
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2.5 shrink-0">
                    Undo
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-6 text-muted-foreground/80 hover:text-foreground shrink-0"
                >
                  <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="sr-only" />
                  <span className="text-xs">✕</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Toaster Portal Mounted for Testing */}
        <Toaster position="bottom-right" intensity={intensity} />
      </div>
    </PreviewStageShell>
  );
}
