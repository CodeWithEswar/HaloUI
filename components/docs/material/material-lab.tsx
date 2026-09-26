"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageTheme,
} from "@/components/docs/preview-stage-shell";
import {
  HaloSurface,
  type HaloMaterialRecipe,
  type HaloSurfaceIntensity,
  type HaloSurfaceElevation,
} from "@/components/ui/halo-surface";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Dock, DockItem } from "@/components/ui/dock";
import { BottomNavigation, BottomNavigationItem } from "@/components/ui/bottom-navigation";
import { CommandPalette, CommandPaletteInput, CommandPaletteList, CommandPaletteItem } from "@/components/ui/command-palette";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {
  Home01Icon,
  Search01Icon,
  Settings01Icon,
  SparklesIcon,
  SlidersHorizontalIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

const recipes: HaloMaterialRecipe[] = ["regular", "clear", "prominent"];
const environments = ["image", "photo-light", "photo-dark", "neutral", "paper", "spectral", "dense-ui", "dark"];

export function MaterialLab() {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [theme, setTheme] = React.useState<StageTheme | undefined>();
  const [background, setBackground] = React.useState("image");
  const [intensity, setIntensity] = React.useState<HaloSurfaceIntensity>("balanced");
  const [elevation, setElevation] = React.useState<HaloSurfaceElevation>("floating");
  const [radius, setRadius] = React.useState("floating");
  const [motion, setMotion] = React.useState<"system" | "reduced">("system");
  const [transparency, setTransparency] = React.useState<"system" | "reduced">("system");
  const [compare, setCompare] = React.useState(true);
  const [recipe, setRecipe] = React.useState<HaloMaterialRecipe>("regular");
  const [activeSegment, setActiveSegment] = React.useState("telemetry");

  const handleReset = React.useCallback(() => {
    setTab("preview");
    setViewport("desktop");
    setTheme(undefined);
    setBackground("image");
    setIntensity("balanced");
    setElevation("floating");
    setRadius("floating");
    setMotion("system");
    setTransparency("system");
    setCompare(true);
    setRecipe("regular");
    setActiveSegment("telemetry");
  }, []);

  const generatedCode = React.useMemo(() => {
    return `<HaloSurface
  material="${recipe}"
  intensity="${intensity}"
  elevation="${elevation}"
  pointerResponsive={true}
  className="p-6 rounded-[var(--halo-radius-${radius})]"
>
  <div className="space-y-2">
    <h4 className="text-base font-semibold capitalize">${recipe} Liquid Glass</h4>
    <p className="text-sm text-muted-foreground">
      10-layer physical optical engine: environmental transmission, 135° meniscus edge catch,
      and 3-tier internal thickness reflection.
    </p>
  </div>
</HaloSurface>`;
  }, [recipe, intensity, elevation, radius]);

  return (
    <PreviewStageShell
      activeTab={tab}
      onTabChange={setTab}
      viewport={viewport}
      onViewportChange={setViewport}
      stageTheme={theme}
      onStageThemeChange={setTheme}
      backdrop={background}
      onBackdropChange={setBackground}
      backdropOptions={environments.map((value) => ({
        value,
        label:
          ({
            image: "Architecture Scene (Real Photo)",
            "photo-light": "Sunlit Architecture (Light Photo)",
            "photo-dark": "Night Penthouse (Dark Photo)",
            paper: "Warm Paper",
            "dense-ui": "Dense UI",
            spectral: "Spectral Prismatic",
          } as Record<string, string>)[value] ?? value.charAt(0).toUpperCase() + value.slice(1),
      }))}
      motion={motion}
      transparency={transparency}
      onReset={handleReset}
      code={generatedCode}
      telemetry={[
        { label: "Active Recipe", value: recipe, variant: "success" },
        { label: "Material Intensity", value: intensity },
        { label: "Virtual Light", value: "135° (X:35%, Y:12%)" },
        { label: "Meniscus Refraction", value: "3-Tier Inset Bevel" },
      ]}
      controls={
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Recipe"
            value={recipe}
            onChange={(v) => setRecipe(v as HaloMaterialRecipe)}
            options={[
              { value: "regular", label: "Regular" },
              { value: "clear", label: "Clear" },
              { value: "prominent", label: "Prominent" },
            ]}
          />
          <StageControlSelect
            label="Intensity"
            value={intensity}
            onChange={(v) => setIntensity(v as HaloSurfaceIntensity)}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "rich", label: "Rich" },
            ]}
          />
          <StageControlSelect
            label="Elevation"
            value={elevation}
            onChange={(v) => setElevation(v as HaloSurfaceElevation)}
            options={[
              { value: "inset", label: "Inset" },
              { value: "base", label: "Base" },
              { value: "raised", label: "Raised" },
              { value: "floating", label: "Floating" },
              { value: "overlay", label: "Overlay" },
            ]}
          />
          <StageControlSelect
            label="Geometry"
            value={radius}
            onChange={(v) => setRadius(v)}
            options={[
              { value: "control-sm", label: "Control SM (8px)" },
              { value: "control", label: "Control (12px)" },
              { value: "control-lg", label: "Control LG (16px)" },
              { value: "floating", label: "Floating (20px)" },
              { value: "overlay", label: "Overlay (24px)" },
            ]}
          />
          <StageControlSelect
            label="Motion"
            value={motion}
            onChange={(v) => setMotion(v as "system" | "reduced")}
            options={[
              { value: "system", label: "System Motion" },
              { value: "reduced", label: "Reduced Motion" },
            ]}
          />
          <StageControlSelect
            label="Transparency"
            value={transparency}
            onChange={(v) => setTransparency(v as "system" | "reduced")}
            options={[
              { value: "system", label: "Glass (Translucent)" },
              { value: "reduced", label: "Solid (Reduced)" },
            ]}
          />
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8 w-full p-4 sm:p-8">
        {/* Dynamic Liquid Optics Underlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 size-80 rounded-full bg-gradient-to-tr from-cyan-500/35 via-sky-500/30 to-blue-600/25 blur-3xl opacity-80" />
          <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-gradient-to-tl from-purple-500/35 via-fuchsia-500/30 to-indigo-600/25 blur-3xl opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 rounded-full bg-gradient-to-r from-emerald-500/25 via-sky-500/25 to-violet-500/25 blur-2xl opacity-70" />
        </div>

        {/* 0. Approved Reference Material vs Production Adaptation (100×100 Checkpoint) */}
        <div className="w-full max-w-4xl relative z-10 space-y-3">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider px-1">
            Canonical Reference vs. Production Adaptation (100×100 Checkpoint)
          </span>

          <div className="p-6 rounded-2xl border border-border/80 bg-card/60 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
              {/* Approved Canonical Prototype (.box) */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs font-mono font-medium text-muted-foreground">Approved Reference (.box)</span>
                <div className="box">
                  <span className="circle-overlay" aria-hidden="true" />
                  <span className="relative z-10 flex items-center justify-center text-foreground">
                    <HaloIcon icon={SparklesIcon} size={28} />
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">100×100 · 2px Blur</span>
              </div>

              {/* Production IconButton (size="showcase" 100×100) */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs font-mono font-medium text-muted-foreground">Production IconButton</span>
                <IconButton size="showcase" aria-label="Reference calibration test">
                  <HaloIcon icon={SparklesIcon} size={28} />
                </IconButton>
                <span className="text-[11px] font-mono text-muted-foreground">size="showcase" (100×100)</span>
              </div>

              {/* Production Liquid Button */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs font-mono font-medium text-muted-foreground">Production Liquid Button</span>
                <Button size="lg" className="rounded-full">
                  <HaloIcon icon={SparklesIcon} size={20} />
                  <span>Get Started</span>
                </Button>
                <span className="text-[11px] font-mono text-muted-foreground">Fluid Pill Geometry</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Recipe Comparison Grid */}
        <div className="w-full max-w-4xl relative z-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
              {compare ? "Side-by-Side Recipe Comparison" : "Focused Recipe Evaluation"}
            </span>
            <button
              type="button"
              onClick={() => setCompare(!compare)}
              className="text-xs font-mono text-primary hover:underline cursor-pointer"
            >
              {compare ? "Focus Single Recipe" : "Compare All 3 Recipes"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(compare ? recipes : [recipe]).map((mat) => (
              <HaloSurface
                key={mat}
                material={mat}
                intensity={intensity}
                elevation={elevation}
                pointerResponsive={true}
                className="p-5 flex flex-col justify-between min-h-[170px]"
                style={{ borderRadius: `var(--halo-radius-${radius})` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold capitalize text-foreground m-0">
                      {mat}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-foreground/10 text-foreground border border-foreground/15">
                      {mat === "regular" ? "Balanced 24%" : mat === "clear" ? "Optical 10%" : "Prominent 68%"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {mat === "clear"
                      ? "High environmental transmission. Background luminance and hues glint through clearly."
                      : mat === "prominent"
                      ? "Elevated visual weight for primary modals and active context."
                      : "Standard functional material for controls, navigation, and floating menus."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Meniscus Bevel</span>
                  <span className="capitalize">{intensity}</span>
                </div>
              </HaloSurface>
            ))}
          </div>
        </div>

        {/* 2. Interactive Component State Matrix */}
        <div className="w-full max-w-4xl relative z-10 space-y-3">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider px-1">
            Interactive Control Layer &amp; Combined States
          </span>

          <div className="p-6 rounded-2xl border border-white/80 dark:border-white/[0.16] bg-white/60 dark:bg-[#121418]/60 shadow-2xl backdrop-blur-2xl backdrop-saturate-180 space-y-5">
            {/* Buttons & Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              <Button>Standard Action</Button>
              <Button disabled>Disabled Action</Button>
              <Button variant="destructive">Destructive</Button>
              <Toggle aria-label="Toggle pin">Pinned</Toggle>
              <div className="flex items-center gap-2">
                <Switch aria-label="Notifications" defaultChecked />
                <span className="text-xs text-muted-foreground">Switch Thumb</span>
              </div>
              <div className="w-36">
                <Slider aria-label="Volume" defaultValue={50} />
              </div>
            </div>

            {/* Inputs & Validation State */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/40">
              <Input
                aria-label="Clean input"
                placeholder="Default Input"
                className="max-w-48"
              />
              <Input
                aria-label="Invalid input"
                aria-invalid="true"
                defaultValue="Invalid input value"
                className="max-w-56"
              />
              <SegmentedControl
                value={activeSegment}
                onValueChange={setActiveSegment}
              >
                <SegmentedControlItem value="telemetry">Telemetry</SegmentedControlItem>
                <SegmentedControlItem value="clusters">Clusters</SegmentedControlItem>
                <SegmentedControlItem value="security">Security</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>
        </div>

        {/* 3. Floating Surfaces (Dock, Command Palette, Bottom Nav) */}
        <div className="w-full max-w-4xl relative z-10 space-y-3">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider px-1">
            Floating Material Surfaces (Elevation &amp; Inset Optics)
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl border border-white/80 dark:border-white/[0.16] bg-white/40 dark:bg-[#121418]/40 backdrop-blur-2xl backdrop-saturate-180">
            <Dock magnification={false} intensity={intensity}>
              <DockItem label="Overview" icon={Home01Icon} isActive />
              <DockItem label="Search" icon={Search01Icon} />
              <DockItem label="Preferences" icon={Settings01Icon} />
            </Dock>

            <Popover>
              <PopoverTrigger render={<Button />}>
                Open Portalled Context
              </PopoverTrigger>
              <PopoverContent
                className="halo-liquid-glass-surface w-72"
                data-stage-theme={theme}
                data-transparency={transparency}
              >
                <PopoverTitle>Portalled Liquid Glass</PopoverTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Floating overlay inherits local stage theme and transparency preferences with physical meniscus edges.
                </p>
                <div className="mt-3 flex justify-end">
                  <Button size="sm">Acknowledge</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
