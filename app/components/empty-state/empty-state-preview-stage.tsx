"use client";

import * as React from "react";
import {
  EmptyState,
  EmptyStateVisual,
  EmptyStateContent,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  type EmptyStateVariant,
  type EmptyStateDensity,
  type EmptyStateVisualSize,
} from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  PlusSignIcon,
  Download04Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
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

export function EmptyStatePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Empty State configuration states
  const [variant, setVariant] = React.useState<EmptyStateVariant>("glass");
  const [density, setDensity] = React.useState<EmptyStateDensity>("default");
  const [visualSize, setVisualSize] = React.useState<EmptyStateVisualSize>("default");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongText, setHasLongText] = React.useState(false);
  const [showSecondary, setShowSecondary] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setVisualSize("default");
    setContainerWidth("full");
    setHasLongText(false);
    setShowSecondary(true);
    setBackdrop("mesh");
    setViewport("desktop");
  };

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
        return "max-w-xl";
    }
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Density",
      value: density.toUpperCase(),
      variant: "default",
    },
    {
      label: "Visual Size",
      value: visualSize.toUpperCase(),
      variant: "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Semantics",
      value: "Presentation Only",
      variant: "success",
    },
  ];

  const codeSnippet = `<EmptyState variant="${variant}" density="${density}">
  <EmptyStateVisual size="${visualSize}" icon={<HaloIcon icon={Folder01Icon} />} />
  <EmptyStateContent>
    <EmptyStateTitle>No projects created yet</EmptyStateTitle>
    <EmptyStateDescription>
      Get started by creating a new project or importing an existing repository from GitHub.
    </EmptyStateDescription>
    <EmptyStateActions>
      <Button variant="default" size="sm">
        <HaloIcon icon={PlusSignIcon} size={14} className="mr-1.5" />
        New Project
      </Button>${
        showSecondary
          ? `\n      <Button variant="outline" size="sm">
        <HaloIcon icon={Download04Icon} size={14} className="mr-1.5" />
        Import Repo
      </Button>`
          : ""
      }
    </EmptyStateActions>
  </EmptyStateContent>
</EmptyState>`;

  return (
    <PreviewStageShell
      title="Empty State"
      description="No-data and no-result guidance surface engineered with container-aware responsive reflow, clear action hierarchy, and restrained HaloUI Liquid Glass optics."
      badge="Data Display 19"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={telemetry}
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Material Variant"
              value={variant}
              onValueChange={(val) => setVariant(val as EmptyStateVariant)}
              options={[
                { value: "glass", label: "Glass (Liquid)" },
                { value: "default", label: "Default" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
            <StageControlSelect
              label="Spatial Density"
              value={density}
              onValueChange={(val) => setDensity(val as EmptyStateDensity)}
              options={[
                { value: "compact", label: "Compact" },
                { value: "default", label: "Default" },
                { value: "relaxed", label: "Relaxed" },
              ]}
            />
            <StageControlSelect
              label="Visual Scale"
              value={visualSize}
              onValueChange={(val) => setVisualSize(val as EmptyStateVisualSize)}
              options={[
                { value: "sm", label: "Small" },
                { value: "default", label: "Default" },
                { value: "lg", label: "Large" },
              ]}
            />
            <StageControlSelect
              label="Simulated Width"
              value={containerWidth}
              onValueChange={setContainerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="empty-toggle-long"
                checked={hasLongText}
                onCheckedChange={(checked) => setHasLongText(Boolean(checked))}
              />
              <Label
                htmlFor="empty-toggle-long"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Simulate Long Title &amp; Description
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="empty-toggle-secondary"
                checked={showSecondary}
                onCheckedChange={(checked) => setShowSecondary(Boolean(checked))}
              />
              <Label
                htmlFor="empty-toggle-secondary"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Secondary Action Button
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6 px-2 sm:px-4 min-h-[320px]">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-out mx-auto",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <EmptyState variant={variant} density={density}>
            <EmptyStateVisual
              size={visualSize}
              icon={<HaloIcon icon={Folder01Icon} />}
            />
            <EmptyStateContent>
              <EmptyStateTitle>
                {hasLongText
                  ? "No production workspace telemetry datasets discovered for active sovereign cloud cluster"
                  : "No projects created yet"}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {hasLongText
                  ? "We could not find any active telemetry pipelines matching your selected enterprise region. To begin monitoring, configure a high-availability ingestion pipeline or import an existing telemetry definition from your version control provider."
                  : "Get started by creating a new project or importing an existing repository from GitHub."}
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button variant="default" size="sm">
                  <HaloIcon icon={PlusSignIcon} size={14} className="mr-1.5" />
                  {hasLongText ? "Configure Ingestion Pipeline" : "New Project"}
                </Button>
                {showSecondary && (
                  <Button variant="outline" size="sm">
                    <HaloIcon icon={Download04Icon} size={14} className="mr-1.5" />
                    {hasLongText ? "Browse Documentation" : "Import Repo"}
                  </Button>
                )}
              </EmptyStateActions>
            </EmptyStateContent>
          </EmptyState>
        </div>
      </div>
    </PreviewStageShell>
  );
}
