"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  SegmentedControl,
  SegmentedControlItem,
  type SegmentedControlSize,
} from "@/components/ui/segmented-control";
import {
  LayoutListIcon,
  GridViewIcon,
  ChartBarLineIcon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

const CONTAINER_WIDTH_OPTIONS = [
  { label: "240px (Strict Min)", value: "240px" },
  { label: "320px (Mobile S)", value: "320px" },
  { label: "375px (Mobile M)", value: "375px" },
  { label: "480px (Phablet)", value: "480px" },
  { label: "640px (Tablet)", value: "640px" },
  { label: "768px (Laptop)", value: "768px" },
  { label: "1024px (Desktop)", value: "1024px" },
  { label: "100% Fluid", value: "100%" },
];

export function SegmentedControlPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [size, setSize] = React.useState<SegmentedControlSize>("default");
  const [mode, setMode] = React.useState<"text" | "icon-only" | "icon-text">("text");
  const [fullWidth, setFullWidth] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("100%");
  const [disabled, setDisabled] = React.useState(false);
  const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal");
  const [longLabels, setLongLabels] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("grid");
  const [changeCount, setChangeCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleValueChange = (val: string) => {
    setSelectedValue(val);
    setChangeCount((prev) => prev + 1);
  };

  const generatedCode = React.useMemo(() => {
    const props = [];
    if (size !== "default") props.push(`size="${size}"`);
    if (fullWidth) props.push("fullWidth");
    if (disabled) props.push("disabled");
    if (orientation !== "horizontal") props.push(`orientation="${orientation}"`);

    const propsStr = props.length > 0 ? " " + props.join(" ") : "";

    if (mode === "icon-only") {
      return `import * as React from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { LayoutListIcon, GridViewIcon, ChartBarLineIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function ViewSwitcher() {
  const [view, setView] = React.useState("${selectedValue}");

  return (
    <SegmentedControl
      value={view}
      onValueChange={setView}${propsStr}
      aria-label="View mode"
    >
      <SegmentedControlItem value="list" aria-label="List view">
        <HaloIcon icon={LayoutListIcon} size={16} />
      </SegmentedControlItem>
      <SegmentedControlItem value="grid" aria-label="Grid view">
        <HaloIcon icon={GridViewIcon} size={16} />
      </SegmentedControlItem>
      <SegmentedControlItem value="chart" aria-label="Chart view">
        <HaloIcon icon={ChartBarLineIcon} size={16} />
      </SegmentedControlItem>
    </SegmentedControl>
  );
}`;
    }

    if (mode === "icon-text") {
      const labels = longLabels
        ? { list: "Hierarchical List", grid: "Comprehensive Grid", chart: "Metric Telemetry" }
        : { list: "List", grid: "Grid", chart: "Chart" };

      return `import * as React from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { LayoutListIcon, GridViewIcon, ChartBarLineIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function ViewSwitcher() {
  const [view, setView] = React.useState("${selectedValue}");

  return (
    <SegmentedControl
      value={view}
      onValueChange={setView}${propsStr}
      aria-label="View mode"
    >
      <SegmentedControlItem value="list">
        <HaloIcon icon={LayoutListIcon} size={16} />
        ${labels.list}
      </SegmentedControlItem>
      <SegmentedControlItem value="grid">
        <HaloIcon icon={GridViewIcon} size={16} />
        ${labels.grid}
      </SegmentedControlItem>
      <SegmentedControlItem value="chart">
        <HaloIcon icon={ChartBarLineIcon} size={16} />
        ${labels.chart}
      </SegmentedControlItem>
    </SegmentedControl>
  );
}`;
    }

    const textLabels = longLabels
      ? { list: "Sequential Pipeline", grid: "Distributed Matrix", compact: "Compressed Summary" }
      : { list: "List", grid: "Grid", compact: "Compact" };

    return `import * as React from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

export function ViewSwitcher() {
  const [view, setView] = React.useState("${selectedValue}");

  return (
    <SegmentedControl
      value={view}
      onValueChange={setView}${propsStr}
      aria-label="View mode"
    >
      <SegmentedControlItem value="list">${textLabels.list}</SegmentedControlItem>
      <SegmentedControlItem value="grid">${textLabels.grid}</SegmentedControlItem>
      <SegmentedControlItem value="compact">${textLabels.compact}</SegmentedControlItem>
    </SegmentedControl>
  );
}`;
  }, [size, mode, fullWidth, disabled, orientation, longLabels, selectedValue]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const activeLabels = longLabels
    ? { list: "Sequential Pipeline", grid: "Distributed Matrix", chartOrCompact: "Compressed Summary" }
    : { list: "List", grid: "Grid", chartOrCompact: mode === "icon-text" ? "Chart" : "Compact" };

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
          label: "Selected",
          value: selectedValue.toUpperCase(),
          variant: "success",
        },
        {
          label: "Size",
          value: size.toUpperCase(),
        },
        {
          label: "Distribution",
          value: fullWidth ? "Equal (flex-1)" : "Auto Content",
        },
        {
          label: "Container",
          value: containerWidth === "100%" ? "Fluid (100%)" : containerWidth,
        },
        {
          label: "Orientation",
          value: orientation === "horizontal" ? "Horizontal" : "Vertical",
        },
        {
          label: "Focus Ring",
          value: "Independent (Double-Contrast)",
        },
        {
          label: "Interactions",
          value: String(changeCount),
        },
      ]}
      controls={
        <div className="w-full space-y-3">
          <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Size"
              value={size}
              onValueChange={(val) => setSize(val as SegmentedControlSize)}
              options={[
                { label: "SM (28px)", value: "sm" },
                { label: "Default (34px)", value: "default" },
                { label: "LG (40px)", value: "lg" },
              ]}
            />

            <StageControlSelect
              label="Presentation"
              value={mode}
              onValueChange={(val) => setMode(val as any)}
              options={[
                { label: "Text Only", value: "text" },
                { label: "Icon + Text", value: "icon-text" },
                { label: "Icon Only", value: "icon-only" },
              ]}
            />

            <StageControlSelect
              label="Width Mode"
              value={fullWidth ? "full" : "content"}
              onValueChange={(val) => setFullWidth(val === "full")}
              options={[
                { label: "Content Width", value: "content" },
                { label: "Full Width (Equal flex-1)", value: "full" },
              ]}
            />

            <StageControlSelect
              label="Container Simulation"
              value={containerWidth}
              onValueChange={setContainerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          {/* QA Inspection Toggles */}
          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-border/40 text-xs">
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground select-none">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="rounded border-border text-primary focus:ring-1 focus:ring-primary"
              />
              <span>Simulate Disabled</span>
            </label>

            <label className="inline-flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground select-none">
              <input
                type="checkbox"
                checked={longLabels}
                onChange={(e) => setLongLabels(e.target.checked)}
                className="rounded border-border text-primary focus:ring-1 focus:ring-primary"
              />
              <span>Long Labels (Reflow QA)</span>
            </label>

            <label className="inline-flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground select-none">
              <input
                type="checkbox"
                checked={orientation === "vertical"}
                onChange={(e) => setOrientation(e.target.checked ? "vertical" : "horizontal")}
                className="rounded border-border text-primary focus:ring-1 focus:ring-primary"
              />
              <span>Vertical Orientation</span>
            </label>
          </div>
        </div>
      }
    >
      <div className="w-full flex flex-col items-center justify-center py-8 px-4">
        {/* Real Container Width Simulation Wrapper */}
        <div
          style={{ width: containerWidth }}
          className="max-w-full transition-all duration-200 ease-out flex flex-col items-center justify-center gap-4"
        >
          <SegmentedControl
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            orientation={orientation}
            value={selectedValue}
            onValueChange={handleValueChange}
            aria-label="Interactive view switcher"
          >
            {mode === "icon-only" ? (
              <>
                <SegmentedControlItem value="list" aria-label="List view">
                  <HaloIcon icon={LayoutListIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                </SegmentedControlItem>
                <SegmentedControlItem value="grid" aria-label="Grid view">
                  <HaloIcon icon={GridViewIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                </SegmentedControlItem>
                <SegmentedControlItem value="chart" aria-label="Chart view">
                  <HaloIcon icon={ChartBarLineIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                </SegmentedControlItem>
              </>
            ) : mode === "icon-text" ? (
              <>
                <SegmentedControlItem value="list">
                  <HaloIcon icon={LayoutListIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                  <span>{activeLabels.list}</span>
                </SegmentedControlItem>
                <SegmentedControlItem value="grid">
                  <HaloIcon icon={GridViewIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                  <span>{activeLabels.grid}</span>
                </SegmentedControlItem>
                <SegmentedControlItem value="chart">
                  <HaloIcon icon={ChartBarLineIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                  <span>{activeLabels.chartOrCompact}</span>
                </SegmentedControlItem>
              </>
            ) : (
              <>
                <SegmentedControlItem value="list">
                  <span>{activeLabels.list}</span>
                </SegmentedControlItem>
                <SegmentedControlItem value="grid">
                  <span>{activeLabels.grid}</span>
                </SegmentedControlItem>
                <SegmentedControlItem value="compact">
                  <span>{activeLabels.chartOrCompact}</span>
                </SegmentedControlItem>
              </>
            )}
          </SegmentedControl>

          <div className="text-xs font-mono text-muted-foreground flex flex-wrap items-center justify-center gap-2">
            <span>Selected segment:</span>
            <span className="font-semibold text-foreground px-2 py-0.5 rounded bg-muted border border-border">
              &quot;{selectedValue}&quot;
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>Container:</span>
            <span className="text-foreground">{containerWidth}</span>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
