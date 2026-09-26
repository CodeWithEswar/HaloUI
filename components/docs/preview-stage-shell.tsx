"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Tv01Icon,
  Tablet01Icon,
  SmartPhone01Icon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  ReloadIcon,
  InformationCircleIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StageCodeBlock } from "@/components/code/stage-code-block";
import { cn } from "@/lib/utils";

export type StageViewport = "desktop" | "tablet" | "mobile";
export type StageTheme = "light" | "dark";
export type StageBackdrop =
  | "neutral"
  | "dark-void"
  | "void"
  | "paper"
  | "warm-paper"
  | "mesh"
  | "gradient"
  | "sunset"
  | "spectral"
  | "dense"
  | "dense-ui"
  | "cards"
  | "light-minimal"
  | "dark"
  | (string & {});

export interface TelemetryItem {
  label: string;
  value: string;
  variant?: "default" | "success" | "warning";
}

const BACKDROP_PRESETS: Record<string, { light: string; dark: string; overlay?: React.ReactNode }> = {
  image: {
    light: "bg-[url('/backdrops/architecture-light.jpg')] bg-cover bg-center",
    dark: "bg-[url('/backdrops/architecture-dark.jpg')] bg-cover bg-center",
  },
  "photo-light": {
    light: "bg-[url('/backdrops/architecture-light.jpg')] bg-cover bg-center",
    dark: "bg-[url('/backdrops/architecture-light.jpg')] bg-cover bg-center",
  },
  "photo-dark": {
    light: "bg-[url('/backdrops/architecture-dark.jpg')] bg-cover bg-center",
    dark: "bg-[url('/backdrops/architecture-dark.jpg')] bg-cover bg-center",
  },
  neutral: {
    light: "bg-[#f8f9fb] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.18),transparent_70%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(168,85,247,0.14),transparent_70%),radial-gradient(#0000000a_1px,transparent_1px)] [background-size:100%_100%,100%_100%,16px_16px]",
    dark: "bg-[#0b0d10] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.22),transparent_70%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(168,85,247,0.18),transparent_70%),radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:100%_100%,100%_100%,16px_16px]",
  },
  "dark-void": {
    light: "bg-[#f4f5f7] bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:16px_16px]",
    dark: "bg-[#0a0b0d]",
  },
  void: {
    light: "bg-[#f4f5f7]",
    dark: "bg-black",
  },
  paper: {
    light: "bg-[#fbf7f0] border border-[#e8dfd1]",
    dark: "bg-[#141210] border border-[#2a241e]",
  },
  "warm-paper": {
    light: "bg-[#fbf7f0] border border-[#e8dfd1]",
    dark: "bg-[#141210] border border-[#2a241e]",
  },
  mesh: {
    light: "bg-[#f8f9fb] bg-[radial-gradient(ellipse_90%_70%_at_25%_15%,rgba(56,189,248,0.32),transparent_65%),radial-gradient(ellipse_85%_65%_at_85%_75%,rgba(168,85,247,0.28),transparent_65%),radial-gradient(ellipse_75%_55%_at_45%_95%,rgba(244,63,94,0.20),transparent_65%)]",
    dark: "bg-[#07080a] bg-[radial-gradient(ellipse_90%_70%_at_25%_15%,rgba(56,189,248,0.38),transparent_65%),radial-gradient(ellipse_85%_65%_at_85%_75%,rgba(168,85,247,0.32),transparent_65%),radial-gradient(ellipse_75%_55%_at_45%_95%,rgba(244,63,94,0.24),transparent_65%)]",
  },
  gradient: {
    light: "bg-gradient-to-br from-indigo-100/90 via-purple-100/70 to-slate-100",
    dark: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-black",
  },
  sunset: {
    light: "bg-gradient-to-tr from-amber-100/90 via-rose-100/75 to-purple-100/60",
    dark: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-rose-600/25 to-stone-950",
  },
  spectral: {
    light: "bg-gradient-to-br from-sky-200/70 via-rose-100/70 to-indigo-200/70",
    dark: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/50 via-purple-900/30 to-[#0c0d0f]",
  },
  dense: {
    light: "bg-[#f4f5f7] bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] [background-size:16px_16px]",
    dark: "bg-[#090a0c] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]",
  },
  "dense-ui": {
    light: "bg-[#f4f5f7] bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] [background-size:16px_16px]",
    dark: "bg-[#090a0c] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]",
  },
  cards: {
    light: "bg-stone-100/80",
    dark: "bg-[#0c0d10]",
  },
  wallpaper: {
    light: "bg-[url('/backdrops/architecture-light.jpg')] bg-cover bg-center",
    dark: "bg-[url('/backdrops/architecture-dark.jpg')] bg-cover bg-center",
  },
  "light-minimal": {
    light: "bg-[#f8f9fb]",
    dark: "bg-[#121418]",
  },
  dark: {
    light: "bg-[#07080a]",
    dark: "bg-[#07080a] border border-white/5",
  },
};

const DEFAULT_BACKDROP_OPTIONS = [
  { value: "image", label: "Architecture Scene (Real Photo)" },
  { value: "photo-light", label: "Sunlit Architecture (Light Photo)" },
  { value: "photo-dark", label: "Night Penthouse (Dark Photo)" },
  { value: "neutral", label: "Neutral Studio" },
  { value: "mesh", label: "Liquid Mesh (Signature)" },
  { value: "spectral", label: "Spectral Aurora" },
  { value: "gradient", label: "Indigo Crystal" },
  { value: "sunset", label: "Sunset Glow" },
  { value: "dense", label: "Dense UI Grid" },
  { value: "void", label: "Deep Void" },
];

export interface PreviewStageShellProps {
  motion?: "system" | "reduced";
  transparency?: "system" | "reduced";
  title?: string;
  description?: string;
  badge?: string;

  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  code: string;

  viewport?: StageViewport;
  onViewportChange?: (v: StageViewport) => void;

  stageTheme?: StageTheme;
  onStageThemeChange?: (theme: StageTheme) => void;

  backdrop?: string;
  onBackdropChange?: (backdrop: string) => void;
  backdropOptions?: { value: string; label: string }[];

  onReset?: () => void;
  onCopy?: () => void;
  copied?: boolean;

  extraToolbarControls?: React.ReactNode;
  children: React.ReactNode;

  controls?: React.ReactNode;
  telemetry?: TelemetryItem[];
  className?: string;
}

export function PreviewStageShell({
  motion = "system",
  transparency = "system",
  title = "Live Preview Stage",
  description = "Evaluate optical physics, responsive viewports, environments, and material parameters.",
  badge = "Interactive Workbench",

  activeTab,
  onTabChange,
  code,

  viewport = "desktop",
  onViewportChange,

  stageTheme,
  onStageThemeChange,

  backdrop = "mesh",
  onBackdropChange,
  backdropOptions = DEFAULT_BACKDROP_OPTIONS,

  onReset,
  onCopy,
  copied = false,

  extraToolbarControls,
  children,

  controls,
  telemetry,
  className,
}: PreviewStageShellProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [internalViewport, setInternalViewport] = React.useState<StageViewport>("desktop");
  const [internalBackdrop, setInternalBackdrop] = React.useState<string>("mesh");
  const [showDetails, setShowDetails] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Directly associate preview stage theme with the main page theme
  // Default to "dark" during SSR and initial hydration pass so that server HTML matches client properties
  const activeTheme: StageTheme =
    stageTheme ?? (mounted && resolvedTheme ? (resolvedTheme === "light" ? "light" : "dark") : "dark");

  const activeViewport = viewport ?? internalViewport;
  const setEffectiveViewport = onViewportChange ?? setInternalViewport;

  const activeBackdrop = backdrop ?? internalBackdrop;
  const setEffectiveBackdrop = onBackdropChange ?? setInternalBackdrop;

  const currentPreset = BACKDROP_PRESETS[activeBackdrop] ?? BACKDROP_PRESETS.neutral;
  const backdropClasses = activeTheme === "dark" ? currentPreset.dark : currentPreset.light;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* 1. Clean Responsive Header Above Stage */}
      <div className="space-y-1">
        <h2 data-toc-ignore className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* 2. Main Workbench Shell */}
      <div className="w-full rounded-2xl border border-border bg-card overflow-hidden flex flex-col shadow-xs">
        {/* Stage Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2.5 sm:p-3.5 border-b border-border bg-muted/30">
          {/* Left: Tab Switcher & Viewport Switcher */}
          <div className="flex items-center justify-between sm:justify-start gap-2">
            {/* Interactive / Code Tabs */}
            <div className="h-8 sm:h-9 p-0.5 rounded-lg border border-border bg-background inline-flex items-center gap-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => onTabChange("preview")}
                className={cn(
                  "h-7 px-2.5 sm:px-3 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center",
                  activeTab === "preview"
                    ? "bg-muted text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Interactive Stage
              </button>
              <button
                type="button"
                onClick={() => onTabChange("code")}
                className={cn(
                  "h-7 px-2.5 sm:px-3 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center",
                  activeTab === "code"
                    ? "bg-muted text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Code
              </button>
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            {/* Viewport Switcher - visible across all screen sizes for testing */}
            <div className="inline-flex h-8 sm:h-9 p-0.5 rounded-lg border border-border bg-background items-center gap-0.5 shadow-2xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setEffectiveViewport("desktop")}
                    aria-label="Desktop viewport"
                    className={cn(
                      "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                      activeViewport === "desktop"
                        ? "bg-muted text-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <HaloIcon icon={Tv01Icon} size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Desktop (100% / Max-w)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setEffectiveViewport("tablet")}
                    aria-label="Tablet viewport"
                    className={cn(
                      "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                      activeViewport === "tablet"
                        ? "bg-muted text-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <HaloIcon icon={Tablet01Icon} size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Tablet (620px)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setEffectiveViewport("mobile")}
                    aria-label="Mobile viewport"
                    className={cn(
                      "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                      activeViewport === "mobile"
                        ? "bg-muted text-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <HaloIcon icon={SmartPhone01Icon} size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Mobile (360px)</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Right: Theme Toggle, Backdrop Select, Extra Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {extraToolbarControls}

            {/* Backdrop Picker: flex-1 on mobile to fill row cleanly */}
            <div className="flex-1 sm:flex-initial">
              <Select
                value={activeBackdrop}
                items={backdropOptions}
                onValueChange={(val) => {
                  if (val && val !== activeBackdrop) setEffectiveBackdrop(val);
                }}
              >
                <SelectTrigger variant="default" aria-label="Preview background" className="halo-docs-control h-8 sm:h-9 w-full sm:w-[155px] text-xs bg-background border-border text-foreground font-medium shadow-2xs">
                  <SelectValue placeholder="Select backdrop">
                    {backdropOptions.find((o) => o.value === activeBackdrop)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent variant="default" align="end" className="halo-docs-control">
                  {backdropOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button (Optional) */}
            {onReset && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onReset}
                    className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                    aria-label="Reset stage parameters"
                  >
                    <HaloIcon icon={ReloadIcon} size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Reset Controls</TooltipContent>
              </Tooltip>
            )}

            {/* Copy Button (Optional) */}
            {onCopy && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onCopy}
                    className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                    aria-label={copied ? "Code copied" : "Copy code"}
                  >
                    <HaloIcon
                      icon={copied ? CheckmarkCircle01Icon : Copy01Icon}
                      size={14}
                      className={copied ? "text-emerald-500" : ""}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {copied ? "Copied to clipboard!" : "Copy Code"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* 3. Main Stage Canvas or Code View */}
        {activeTab === "preview" ? (
          <div
            suppressHydrationWarning
            data-stage-theme={activeTheme}
            data-motion={motion}
            data-transparency={transparency}
            style={{ colorScheme: activeTheme }}
            className={cn(
              "p-4 sm:p-8 md:p-10 flex flex-col items-center justify-center transition-all duration-300 min-h-[380px] sm:min-h-[440px] relative overflow-hidden",
              activeTheme === "dark"
                ? "dark bg-[#0a0b0d] text-foreground"
                : "light bg-[#f8f9fb] text-foreground"
            )}
          >
            {/* Dynamic Ambient Backdrop Field */}
            <div
              suppressHydrationWarning
              className={cn("absolute inset-0 pointer-events-none overflow-hidden transition-all duration-300", backdropClasses)}
            >
              {(activeBackdrop === "dense" || activeBackdrop === "dense-ui") && (
                <div aria-hidden="true" className="grid grid-cols-2 gap-x-8 gap-y-4 p-6 text-xs text-muted-foreground opacity-60 select-none">
                  {Array.from({ length: 24 }, (_, index) => (
                    <div key={index} className="border-b border-border pb-3">
                      <span className="font-medium">Workspace document {index + 1}</span>
                      <p className="mt-1">Design review · Shared with the team</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Luminous Ambient Liquid Orbs behind canvas (only for abstract gradient/mesh backdrops) */}
            {!["image", "photo-light", "photo-dark", "wallpaper"].includes(activeBackdrop) && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -left-16 size-80 rounded-full bg-sky-400/20 dark:bg-cyan-400/20 blur-3xl pointer-events-none transition-opacity duration-300"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -right-16 size-80 rounded-full bg-purple-400/20 dark:bg-violet-400/20 blur-3xl pointer-events-none transition-opacity duration-300"
                />
              </>
            )}

            {/* Viewport-Sized Frame */}
            <div
              className={cn(
                "relative z-10 transition-all duration-300 w-full flex flex-col items-center justify-center gap-6",
                activeViewport === "desktop" && "max-w-4xl",
                activeViewport === "tablet" && "max-w-xl",
                activeViewport === "mobile" && "max-w-[340px]"
              )}
            >
              {children}
            </div>
          </div>
        ) : (
          <StageCodeBlock code={code} language="tsx" minHeight="460px" />
        )}

        {/* 4. Professional Variant Control Dock & Specifications Accordion */}
        {(controls || (telemetry && telemetry.length > 0)) && (
          <div className="border-t border-border bg-muted/20 flex flex-col text-xs overflow-hidden max-w-full">
            {/* Interactive Controls Bar */}
            {controls && (
              <div className="p-2.5 sm:p-3.5 w-full min-w-0 overflow-hidden">
                {controls}
              </div>
            )}

            {/* Accordion Details / Telemetry */}
            {telemetry && telemetry.length > 0 && (
              <div className="border-t border-border/60 bg-muted/10">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  aria-expanded={showDetails}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <HaloIcon icon={InformationCircleIcon} size={14} className="text-muted-foreground/80 shrink-0" />
                    <span>Component Specifications & Telemetry</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-border bg-background/80 font-mono text-muted-foreground">
                      {telemetry.length}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground">
                    {showDetails ? "Hide details" : "See details"}
                    <HaloIcon
                      icon={showDetails ? ArrowUp01Icon : ArrowDown01Icon}
                      size={13}
                      className="transition-transform duration-200"
                    />
                  </span>
                </button>

                {showDetails && (
                  <div className="p-3 pt-1.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] font-mono border-t border-border/40 bg-muted/5 animate-in fade-in-0 duration-150">
                    {telemetry.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-border/70 bg-card/70 shadow-2xs"
                      >
                        <span className="text-muted-foreground/80 truncate">{t.label}:</span>
                        <strong
                          className={cn(
                            "font-medium truncate ml-1",
                            t.variant === "success" && "text-emerald-500",
                            t.variant === "warning" && "text-amber-500",
                            !t.variant && "text-foreground"
                          )}
                        >
                          {t.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function StageControlGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 sm:gap-2 max-w-full min-w-0 shrink-0", className)}>
      <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none shrink-0">
        {label}:
      </span>
      <div className="h-7 sm:h-8 p-0.5 rounded-lg border border-border bg-background inline-flex items-center gap-0.5 shadow-2xs max-w-full overflow-x-auto no-scrollbar">
        {children}
      </div>
    </div>
  );
}

export function StageControlButton({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "h-6 sm:h-7 px-2.5 sm:px-3 rounded-md text-[11px] sm:text-xs font-medium capitalize transition-colors cursor-pointer flex items-center justify-center shrink-0 whitespace-nowrap",
        active
          ? "bg-muted text-foreground font-semibold shadow-2xs"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
        className
      )}
    >
      {children}
    </button>
  );
}

export function StageControlSelect<T extends string>({
  label,
  value,
  onValueChange,
  onChange,
  options,
  className,
}: {
  label: string;
  value: T;
  onValueChange?: (val: T) => void;
  onChange?: (val: T) => void;
  options: { label: string; value: T }[];
  className?: string;
}) {
  const handleValueChange = (nextVal: string | null) => {
    if (nextVal != null && nextVal !== value) {
      if (typeof onValueChange === "function") {
        onValueChange(nextVal as T);
      }
      if (typeof onChange === "function") {
        onChange(nextVal as T);
      }
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors",
        className
      )}
    >
      <span className="text-xs sm:text-[13px] text-muted-foreground font-medium select-none shrink-0 whitespace-nowrap">
        {label}:
      </span>
      <Select
        value={value}
        items={options}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          variant="default"
          size="sm"
          className="halo-docs-control h-8.5 sm:h-9 text-xs sm:text-[13px] bg-background border-border text-foreground font-medium shadow-2xs min-w-0 flex-1 justify-between px-2.5 sm:px-3 gap-1.5 overflow-hidden rounded-lg transition-colors"
        >
          <span className="truncate text-left flex-1 min-w-0 block">
            <SelectValue>{selectedOption?.label ?? value}</SelectValue>
          </span>
        </SelectTrigger>
        <SelectContent variant="default" align="end" className="halo-docs-control">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs sm:text-[13px] py-1.5">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
