"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleVariant,
  type CollapsibleDensity,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
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
  Shield01Icon,
  SlidersHorizontalIcon,
  Folder01Icon,
  FileCodeIcon,
  Settings01Icon,
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

export function CollapsiblePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Collapsible configuration states
  const [variant, setVariant] = React.useState<CollapsibleVariant>("glass");
  const [density, setDensity] = React.useState<CollapsibleDensity>("default");
  const [isOpen, setIsOpen] = React.useState(true);
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongText, setHasLongText] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setIsOpen(true);
    setContainerWidth("full");
    setHasLongText(false);
    setIsDisabled(false);
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
      label: "State",
      value: isDisabled ? "DISABLED" : isOpen ? "EXPANDED" : "COLLAPSED",
      variant: isDisabled ? "warning" : isOpen ? "success" : "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Primitive",
      value: "BASE-UI",
      variant: "default",
    },
  ];

  const codeSnippet = `<Collapsible
  variant="${variant}"
  density="${density}"
  open={${isOpen}}
  onOpenChange={setIsOpen}
  disabled={${isDisabled}}
>
  <CollapsibleTrigger
    icon={<HaloIcon icon={Folder01Icon} size={16} />}
    badge={<StatusBadge status="active">3 Files</StatusBadge>}
  >
    ${
      hasLongText
        ? "How does HaloUI achieve container-aware automatic responsiveness across nested liquid glass surfaces in dense application workspaces?"
        : "Project Files & Configurations"
    }
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="space-y-2">
      <p>
        ${
          hasLongText
            ? "HaloUI uses pure CSS container queries (@container/collapsible) and intrinsic flexbox wrap models without requiring any JavaScript window.innerWidth listeners or ResizeObserver measurement loops. This guarantees zero layout thrashing across all responsive viewport tiers."
            : "Expandable content region supporting arbitrary semantic descendants, nested lists, code previews, and contextual actions."
        }
      </p>
      <div className="flex items-center gap-2 pt-2">
        <Button variant="outline" size="sm">Manage Permissions</Button>
        <Button variant="ghost" size="sm">View History</Button>
      </div>
    </div>
  </CollapsibleContent>
</Collapsible>`;

  return (
    <PreviewStageShell
      title="Collapsible"
      description="Independent disclosure primitive engineered with Base UI, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics."
      badge="Data Display 16"
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
              onValueChange={(val) => setVariant(val as CollapsibleVariant)}
              options={[
                { value: "glass", label: "Glass (Liquid)" },
                { value: "default", label: "Default" },
                { value: "outline", label: "Outline" },
                { value: "muted", label: "Muted" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
            <StageControlSelect
              label="Spatial Density"
              value={density}
              onValueChange={(val) => setDensity(val as CollapsibleDensity)}
              options={[
                { value: "compact", label: "Compact" },
                { value: "default", label: "Default" },
                { value: "relaxed", label: "Relaxed" },
              ]}
            />
            <StageControlSelect
              label="Simulated Width"
              value={containerWidth}
              onValueChange={setContainerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
            />
            <StageControlSelect
              label="Expansion State"
              value={isOpen ? "open" : "closed"}
              onValueChange={(val) => setIsOpen(val === "open")}
              options={[
                { value: "open", label: "Expanded" },
                { value: "closed", label: "Collapsed" },
              ]}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="collapsible-toggle-long"
                checked={hasLongText}
                onCheckedChange={(checked) => setHasLongText(Boolean(checked))}
              />
              <Label
                htmlFor="collapsible-toggle-long"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Simulate Long Trigger &amp; Text
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="collapsible-toggle-disabled"
                checked={isDisabled}
                onCheckedChange={(checked) => setIsDisabled(Boolean(checked))}
              />
              <Label
                htmlFor="collapsible-toggle-disabled"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Disabled State
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6 px-2 sm:px-4 min-h-[260px]">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-out mx-auto",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <Collapsible
            variant={variant}
            density={density}
            open={isOpen}
            onOpenChange={setIsOpen}
            disabled={isDisabled}
          >
            <CollapsibleTrigger
              icon={<HaloIcon icon={Folder01Icon} size={16} />}
              badge={<StatusBadge tone="positive">3 Files</StatusBadge>}
            >
              {hasLongText
                ? "How does HaloUI achieve container-aware automatic responsiveness across nested liquid glass surfaces in dense application workspaces?"
                : "Project Files & Configurations"}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  {hasLongText
                    ? "HaloUI uses pure CSS container queries (@container/collapsible) and intrinsic flexbox wrap models without requiring any JavaScript window.innerWidth listeners or ResizeObserver measurement loops. This guarantees zero layout thrashing across all responsive viewport tiers."
                    : "Expandable content region supporting arbitrary semantic descendants, nested lists, code previews, and contextual actions."}
                </p>

                <div className="p-3 rounded-lg border border-border/50 bg-background/50 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <HaloIcon icon={FileCodeIcon} size={14} />
                      halo-tokens.css
                    </span>
                    <span>14.2 KB</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <HaloIcon icon={FileCodeIcon} size={14} />
                      halo-material.css
                    </span>
                    <span>8.7 KB</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button variant="outline" size="sm">
                    Manage Permissions
                  </Button>
                  <Button variant="ghost" size="sm">
                    View History
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </PreviewStageShell>
  );
}
