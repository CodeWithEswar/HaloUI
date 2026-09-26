"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverClose,
  type PopoverIntensity,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Settings02Icon,
  FilterIcon,
  SlidersHorizontalIcon,
  ColorsIcon,
  CheckmarkCircle02Icon,
  Maximize02Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type DemoScenario = "dimensions" | "filter" | "settings" | "palette";

export function PopoverPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Popover configuration state
  const [isOpen, setIsOpen] = React.useState(false);
  const [scenario, setScenario] = React.useState<DemoScenario>("dimensions");
  const [side, setSide] = React.useState<"bottom" | "top" | "left" | "right">("bottom");
  const [align, setAlign] = React.useState<"center" | "start" | "end">("center");
  const [intensity, setIntensity] = React.useState<PopoverIntensity>("balanced");
  const [sideOffset, setSideOffset] = React.useState(8);
  const [showCloseButton, setShowCloseButton] = React.useState(true);
  const [actionFeedback, setActionFeedback] = React.useState<string | null>(null);

  // Scenario form states
  const [widthVal, setWidthVal] = React.useState("100%");
  const [heightVal, setHeightVal] = React.useState("auto");
  const [maxHeightVal, setMaxHeightVal] = React.useState("none");
  const [activePalette, setActivePalette] = React.useState("#38bdf8");

  const handleReset = () => {
    setSide("bottom");
    setAlign("center");
    setIntensity("balanced");
    setSideOffset(8);
    setShowCloseButton(true);
    setScenario("dimensions");
    setBackdrop("mesh");
    setViewport("desktop");
    setIsOpen(false);
    setActionFeedback(null);
  };

  const handleApply = (message: string) => {
    setActionFeedback(message);
    setIsOpen(false);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const generatedCode = React.useMemo(() => {
    const sideProp = side !== "bottom" ? ` side="${side}"` : "";
    const alignProp = align !== "center" ? ` align="${align}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const offsetProp = sideOffset !== 8 ? ` sideOffset={${sideOffset}}` : "";
    const closeProp = showCloseButton ? ` showCloseButton` : "";

    if (scenario === "dimensions") {
      return `import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Maximize02Icon } from "@hugeicons/core-free-icons";

export function DimensionsPopover() {
  const [width, setWidth] = React.useState("100%");
  const [height, setHeight] = React.useState("auto");

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="gap-2">
            <HaloIcon icon={Maximize02Icon} size={15} />
            <span>Set Dimensions</span>
          </Button>
        }
      />
      <PopoverContent${sideProp}${alignProp}${intensityProp}${offsetProp}${closeProp} className="w-80">
        <PopoverHeader>
          <PopoverTitle>Canvas Dimensions</PopoverTitle>
          <PopoverDescription>
            Specify responsive constraints for the viewport container.
          </PopoverDescription>
        </PopoverHeader>

        <div className="grid gap-2.5 py-1">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width" className="text-xs">Width</Label>
            <Input
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="col-span-2 h-8 text-xs"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height" className="text-xs">Height</Label>
            <Input
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="col-span-2 h-8 text-xs"
            />
          </div>
        </div>

        <PopoverFooter>
          <PopoverClose render={<Button variant="ghost" size="sm">Cancel</Button>} />
          <Button size="sm">Apply Dimensions</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}`;
    }

    if (scenario === "filter") {
      return `import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { FilterIcon } from "@hugeicons/core-free-icons";

export function FilterPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="gap-2">
            <HaloIcon icon={FilterIcon} size={15} />
            <span>Filter Stream</span>
          </Button>
        }
      />
      <PopoverContent${sideProp}${alignProp}${intensityProp}${offsetProp}${closeProp} className="w-72">
        <PopoverHeader>
          <PopoverTitle>Filter Telemetry</PopoverTitle>
          <PopoverDescription>
            Narrow event stream by severity and execution cluster.
          </PopoverDescription>
        </PopoverHeader>
        {/* Contextual filter controls */}
        <PopoverFooter>
          <Button size="sm" className="w-full">Update Filters</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}`;
    }

    return `import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Settings02Icon } from "@hugeicons/core-free-icons";

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="gap-2">
            <HaloIcon icon={Settings02Icon} size={15} />
            <span>Quick Settings</span>
          </Button>
        }
      />
      <PopoverContent${sideProp}${alignProp}${intensityProp}${offsetProp}${closeProp}>
        <PopoverHeader>
          <PopoverTitle>Quick Settings</PopoverTitle>
          <PopoverDescription>
            Adjust contextual workspace preferences.
          </PopoverDescription>
        </PopoverHeader>
        {/* Settings fields */}
      </PopoverContent>
    </Popover>
  );
}`;
  }, [scenario, side, align, intensity, sideOffset, showCloseButton]);

  const telemetry = [
    { label: "Material Engine", value: "10-Layer Liquid Glass" },
    { label: "Optical Intensity", value: intensity },
    { label: "Placement", value: `${side} / ${align}` },
    { label: "Offset Spacing", value: `${sideOffset}px` },
    { label: "Collision Avoidance", value: "Auto-Flip / Clamp" },
    { label: "Backdrop Scrim", value: "None (Non-Modal)" },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as DemoScenario)}
        options={[
          { label: "Dimensions Form", value: "dimensions" },
          { label: "Filter Stream", value: "filter" },
          { label: "Context Settings", value: "settings" },
          { label: "Color Palette", value: "palette" },
        ]}
      />
      <StageControlSelect
        label="Side"
        value={side}
        onValueChange={(v) => setSide(v as "bottom" | "top" | "left" | "right")}
        options={[
          { label: "Bottom (Standard)", value: "bottom" },
          { label: "Top (Inverted)", value: "top" },
          { label: "Left (Leading)", value: "left" },
          { label: "Right (Trailing)", value: "right" },
        ]}
      />
      <StageControlSelect
        label="Alignment"
        value={align}
        onValueChange={(v) => setAlign(v as "center" | "start" | "end")}
        options={[
          { label: "Center", value: "center" },
          { label: "Start", value: "start" },
          { label: "End", value: "end" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as PopoverIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Specular Glow)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Side Offset"
        value={String(sideOffset)}
        onValueChange={(v) => setSideOffset(Number(v))}
        options={[
          { label: "4px (Compact)", value: "4" },
          { label: "8px (Canonical)", value: "8" },
          { label: "12px (Spacious)", value: "12" },
          { label: "16px (Detached)", value: "16" },
        ]}
      />
      <StageControlSelect
        label="Close Button"
        value={showCloseButton ? "visible" : "hidden"}
        onValueChange={(v) => setShowCloseButton(v === "visible")}
        options={[
          { label: "Visible", value: "visible" },
          { label: "Hidden", value: "hidden" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Popover Live Preview Stage"
      description="Anchored transient floating surface engineered with 10-layer Liquid Glass optical physics, dynamic collision avoidance, and zero backdrop dimming."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={controls}
      telemetry={telemetry}
      code={generatedCode}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center justify-center min-h-[380px] p-6 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
            <HaloIcon
              icon={
                scenario === "dimensions"
                  ? Maximize02Icon
                  : scenario === "filter"
                  ? FilterIcon
                  : scenario === "palette"
                  ? ColorsIcon
                  : Settings02Icon
              }
              size={24}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {scenario === "dimensions"
                ? "Container Dimension Constraints"
                : scenario === "filter"
                ? "Contextual Telemetry Filters"
                : scenario === "palette"
                ? "Physical Color Palette Swatches"
                : "Workspace Runtime Preferences"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Open the floating surface to inspect 10-layer liquid optical physics, origin-anchored reveal kinematics, and seamless environment legibility.
            </p>
          </div>

          {actionFeedback && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in zoom-in-95">
              <HaloIcon icon={CheckmarkCircle02Icon} size={15} />
              <span>{actionFeedback}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger
                render={
                  <Button variant="default" className="shadow-sm">
                    <HaloIcon
                      icon={
                        scenario === "dimensions"
                          ? Maximize02Icon
                          : scenario === "filter"
                          ? FilterIcon
                          : scenario === "palette"
                          ? ColorsIcon
                          : Settings02Icon
                      }
                      size={15}
                    />
                    <span>
                      {scenario === "dimensions"
                        ? "Configure Dimensions"
                        : scenario === "filter"
                        ? "Open Filters"
                        : scenario === "palette"
                        ? "Choose Swatch"
                        : "Open Settings"}
                    </span>
                  </Button>
                }
              />

              <PopoverContent
                side={side}
                align={align}
                intensity={intensity}
                sideOffset={sideOffset}
                showCloseButton={showCloseButton}
                className={scenario === "dimensions" ? "w-80" : "w-72"}
              >
                {scenario === "dimensions" && (
                  <>
                    <PopoverHeader>
                      <PopoverTitle>Canvas Dimensions</PopoverTitle>
                      <PopoverDescription>
                        Set default width, height, and maximum bounds for the canvas.
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="grid gap-2.5 py-1 text-left">
                      <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="stage-width" className="text-xs font-medium text-muted-foreground">
                          Width
                        </Label>
                        <Input
                          id="stage-width"
                          value={widthVal}
                          onChange={(e) => setWidthVal(e.target.value)}
                          className="col-span-2 h-8 text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="stage-height" className="text-xs font-medium text-muted-foreground">
                          Height
                        </Label>
                        <Input
                          id="stage-height"
                          value={heightVal}
                          onChange={(e) => setHeightVal(e.target.value)}
                          className="col-span-2 h-8 text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="stage-max-height" className="text-xs font-medium text-muted-foreground">
                          Max Height
                        </Label>
                        <Input
                          id="stage-max-height"
                          value={maxHeightVal}
                          onChange={(e) => setMaxHeightVal(e.target.value)}
                          className="col-span-2 h-8 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <PopoverFooter>
                      <PopoverClose
                        render={
                          <Button variant="ghost" size="sm" className="text-xs">
                            Cancel
                          </Button>
                        }
                      />
                      <Button
                        size="sm"
                        className="text-xs"
                        onClick={() => handleApply(`Dimensions updated: ${widthVal} × ${heightVal}`)}
                      >
                        Apply
                      </Button>
                    </PopoverFooter>
                  </>
                )}

                {scenario === "filter" && (
                  <>
                    <PopoverHeader>
                      <PopoverTitle>Filter Stream</PopoverTitle>
                      <PopoverDescription>
                        Filter telemetry events by target deployment tier.
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="space-y-2 py-1 text-left text-xs">
                      {["Production Edge", "Canary Clusters", "Staging Runtime", "Local Sandbox"].map((tier, idx) => (
                        <label
                          key={tier}
                          className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                        >
                          <span className="font-medium text-foreground">{tier}</span>
                          <input
                            type="checkbox"
                            defaultChecked={idx < 2}
                            className="rounded border-border accent-primary focus:ring-1 focus:ring-primary"
                          />
                        </label>
                      ))}
                    </div>

                    <PopoverFooter>
                      <PopoverClose
                        render={
                          <Button variant="ghost" size="sm" className="text-xs">
                            Reset
                          </Button>
                        }
                      />
                      <Button
                        size="sm"
                        className="text-xs"
                        onClick={() => handleApply("Active telemetry filters saved.")}
                      >
                        Apply Filters
                      </Button>
                    </PopoverFooter>
                  </>
                )}

                {scenario === "palette" && (
                  <>
                    <PopoverHeader>
                      <PopoverTitle>Accent Swatch</PopoverTitle>
                      <PopoverDescription>
                        Select a specular illumination tint.
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="grid grid-cols-5 gap-2 py-2">
                      {[
                        { name: "Cyan", hex: "#38bdf8" },
                        { name: "Emerald", hex: "#34d399" },
                        { name: "Violet", hex: "#a78bfa" },
                        { name: "Amber", hex: "#fbbf24" },
                        { name: "Rose", hex: "#fb7185" },
                      ].map((swatch) => (
                        <button
                          key={swatch.hex}
                          type="button"
                          onClick={() => setActivePalette(swatch.hex)}
                          className="group relative flex size-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 transition-transform active:scale-90"
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.name}
                        >
                          {activePalette === swatch.hex && (
                            <span className="flex size-2.5 rounded-full bg-white shadow-xs" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                      <span>Selected Hex:</span>
                      <code className="font-mono font-semibold text-foreground">{activePalette}</code>
                    </div>

                    <PopoverFooter>
                      <Button
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => handleApply(`Swatch set to ${activePalette}`)}
                      >
                        Select Color
                      </Button>
                    </PopoverFooter>
                  </>
                )}

                {scenario === "settings" && (
                  <>
                    <PopoverHeader>
                      <PopoverTitle>Runtime Controls</PopoverTitle>
                      <PopoverDescription>
                        Configure low-latency hardware acceleration.
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="space-y-3 py-2 text-left text-xs">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="perf-toggle" className="text-xs font-medium text-foreground cursor-pointer">
                          GPU Rasterization
                        </Label>
                        <input
                          id="perf-toggle"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-border accent-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="blur-toggle" className="text-xs font-medium text-foreground cursor-pointer">
                          Dynamic Refraction
                        </Label>
                        <input
                          id="blur-toggle"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-border accent-primary"
                        />
                      </div>
                    </div>

                    <PopoverFooter>
                      <PopoverClose
                        render={
                          <Button variant="ghost" size="sm" className="text-xs">
                            Done
                          </Button>
                        }
                      />
                    </PopoverFooter>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
