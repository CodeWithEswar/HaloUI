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
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function SegmentedControlPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [size, setSize] = React.useState<SegmentedControlSize>("default");
  const [mode, setMode] = React.useState<"text" | "icon-only" | "icon-text">("text");
  const [fullWidth, setFullWidth] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
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
        List
      </SegmentedControlItem>
      <SegmentedControlItem value="grid">
        <HaloIcon icon={GridViewIcon} size={16} />
        Grid
      </SegmentedControlItem>
      <SegmentedControlItem value="chart">
        <HaloIcon icon={ChartBarLineIcon} size={16} />
        Chart
      </SegmentedControlItem>
    </SegmentedControl>
  );
}`;
    }

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
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
      <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
    </SegmentedControl>
  );
}`;
  }, [size, mode, fullWidth, disabled, selectedValue]);

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
          label: "Selected",
          value: selectedValue.toUpperCase(),
          variant: "success",
        },
        {
          label: "Size",
          value: size.toUpperCase(),
        },
        {
          label: "Presentation",
          value: mode === "icon-only" ? "Icon-only" : mode === "icon-text" ? "Icon + Text" : "Text",
        },
        {
          label: "Width",
          value: fullWidth ? "Full Width (100%)" : "Content Width",
        },
        {
          label: "Changes",
          value: String(changeCount),
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
              { label: "Full Width (100%)", value: "full" },
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
      <div className="flex flex-col items-center justify-center gap-4 py-8 w-full max-w-md mx-auto px-4">
        <SegmentedControl
          size={size}
          fullWidth={fullWidth}
          disabled={disabled}
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
                List
              </SegmentedControlItem>
              <SegmentedControlItem value="grid">
                <HaloIcon icon={GridViewIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                Grid
              </SegmentedControlItem>
              <SegmentedControlItem value="chart">
                <HaloIcon icon={ChartBarLineIcon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
                Chart
              </SegmentedControlItem>
            </>
          ) : (
            <>
              <SegmentedControlItem value="list">List</SegmentedControlItem>
              <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
              <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
            </>
          )}
        </SegmentedControl>

        <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
          <span>Selected value:</span>
          <span className="font-semibold text-foreground px-2 py-0.5 rounded bg-muted border border-border">
            &quot;{selectedValue}&quot;
          </span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
