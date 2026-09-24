"use client";

import * as React from "react";
import {
  UndoIcon,
  RedoIcon,
  MoreHorizontalIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  ButtonGroup,
  type ButtonGroupOrientation,
} from "@/components/ui/button-group";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type GroupActionVariant = "outline" | "secondary" | "default" | "ghost";
type GroupActionSize = "sm" | "default" | "lg";

export function ButtonGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [orientation, setOrientation] = React.useState<ButtonGroupOrientation>("horizontal");
  const [variant, setVariant] = React.useState<GroupActionVariant>("default");
  const [size, setSize] = React.useState<GroupActionSize>("default");
  const [disabledFirst, setDisabledFirst] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    const orientProp = orientation === "vertical" ? ' orientation="vertical"' : "";
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";

    return `import { ArrowLeft01Icon, ArrowRight01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Navigation History Group */}
      <ButtonGroup${orientProp}>
        <Button${variantProp}${sizeProp}${disabledFirst ? " disabled" : ""}>
          <HaloIcon icon={ArrowLeft01Icon} size={16} />
          Previous
        </Button>
        <Button${variantProp}${sizeProp}>
          Next
          <HaloIcon icon={ArrowRight01Icon} size={16} />
        </Button>
      </ButtonGroup>

      {/* Split-style Action Group */}
      <ButtonGroup${orientProp}>
        <Button${variantProp}${sizeProp}>
          Publish
        </Button>
        <IconButton${variantProp}${sizeProp} aria-label="More publishing options">
          <HaloIcon icon={MoreHorizontalIcon} size={16} />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}`;
  }, [orientation, variant, size, disabledFirst]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setOrientation("horizontal");
    setVariant("default");
    setSize("default");
    setDisabledFirst(false);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect connected geometry, border collapse, and unclipped focus layering across responsive viewports and background environments."
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
          label: "Orientation",
          value: orientation,
        },
        {
          label: "Geometry",
          value: "Collapsing Radii",
        },
        {
          label: "Focus",
          value: "z-20 Unclipped",
          variant: "success",
        },
        {
          label: "Semantics",
          value: "Independent",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <StageControlSelect
            label="Orientation"
            value={orientation}
            onValueChange={(val) => setOrientation(val as ButtonGroupOrientation)}
            options={[
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ]}
          />

          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as GroupActionVariant)}
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
            onValueChange={(val) => setSize(val as GroupActionSize)}
            options={[
              { label: "SM (32px)", value: "sm" },
              { label: "Default (40px)", value: "default" },
              { label: "LG (48px)", value: "lg" },
            ]}
          />

          <StageControlSelect
            label="1st Child"
            value={disabledFirst ? "disabled" : "enabled"}
            onValueChange={(val) => setDisabledFirst(val === "disabled")}
            options={[
              { label: "Interactive", value: "enabled" },
              { label: "Disabled 1st", value: "disabled" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full flex flex-col items-center justify-center gap-5 sm:gap-6 p-2 sm:p-4">
        {/* Realistic Action Cluster */}
        <div
          className={
            orientation === "vertical"
              ? "flex flex-col items-center gap-5 sm:gap-6"
              : "w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          }
        >
          {/* 1. History Navigation Cluster */}
          <ButtonGroup orientation={orientation}>
            <Button
              variant={variant}
              size={size}
              disabled={disabledFirst}
            >
              <HaloIcon icon={ArrowLeft01Icon} size={size === "sm" ? 14 : 16} />
              Previous
            </Button>
            <Button variant={variant} size={size}>
              Overview
            </Button>
            <Button variant={variant} size={size}>
              Next
              <HaloIcon icon={ArrowRight01Icon} size={size === "sm" ? 14 : 16} />
            </Button>
          </ButtonGroup>

          {/* 2. Split Action Cluster */}
          <ButtonGroup orientation={orientation}>
            <Button variant={variant} size={size}>
              Save changes
            </Button>
            <IconButton
              variant={variant}
              size={size}
              aria-label="More publishing options"
            >
              <HaloIcon icon={MoreHorizontalIcon} size={size === "sm" ? 14 : 16} />
            </IconButton>
          </ButtonGroup>
        </div>

        {/* State metadata tag */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
          <span>orientation="{orientation}"</span>
          <span>·</span>
          <span>variant="{variant}"</span>
          <span>·</span>
          <span>size="{size}"</span>
          {disabledFirst && (
            <>
              <span>·</span>
              <span className="text-amber-500 font-medium">first child disabled</span>
            </>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
