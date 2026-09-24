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

export interface TelemetryItem {
  label: string;
  value: string;
  variant?: "default" | "success" | "warning";
}

const BACKDROP_PRESETS: Record<string, { light: string; dark: string; overlay?: React.ReactNode }> = {
  neutral: {
    light: "bg-[#f8f9fb] bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:16px_16px]",
    dark: "bg-[#0b0d10] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]",
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
    light: "bg-gradient-to-tr from-sky-100/90 via-purple-100/70 to-rose-100/90",
    dark: "bg-gradient-to-tr from-cyan-600/25 via-violet-600/25 to-amber-600/25 blur-2xl bg-black",
  },
  gradient: {
    light: "bg-gradient-to-br from-indigo-100/70 via-purple-100/60 to-slate-100",
    dark: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-black",
  },
  sunset: {
    light: "bg-gradient-to-tr from-amber-100/70 via-rose-100/60 to-purple-100/50",
    dark: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-rose-600/20 to-stone-950",
  },
  spectral: {
    light: "bg-gradient-to-br from-sky-100/80 via-rose-50/70 to-indigo-100/80",
    dark: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-purple-900/20 to-[#0c0d0f]",
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
  "light-minimal": {
    light: "bg-[#f8f9fb]",
    dark: "bg-[#121418]",
  },
  dark: {
    light: "bg-stone-200/90",
    dark: "bg-[#07080a] border border-white/5",
  },
};

const DEFAULT_BACKDROP_OPTIONS = [
  { value: "neutral", label: "Neutral Studio" },
  { value: "paper", label: "Warm Paper" },
  { value: "mesh", label: "Liquid Mesh" },
  { value: "spectral", label: "Spectral Aurora" },
  { value: "dense", label: "Dense UI Grid" },
  { value: "void", label: "Deep Void" },
];

export interface PreviewStageShellProps {
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

  backdrop = "neutral",
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
  const [internalBackdrop, setInternalBackdrop] = React.useState<string>("neutral");

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
        <h2 id="preview" className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
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
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 border-b border-border bg-muted/30">
          {/* Left: Tab Switcher & Viewport Switcher */}
          <div className="flex items-center gap-2">
            {/* Interactive / Code Tabs */}
            <div className="h-9 p-1 rounded-lg border border-border bg-background inline-flex items-center gap-1 shadow-2xs">
              <button
                type="button"
                onClick={() => onTabChange("preview")}
                className={cn(
                  "h-7 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center",
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
                  "h-7 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center",
                  activeTab === "code"
                    ? "bg-muted text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Code
              </button>
            </div>

            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* Viewport Switcher */}
            <div className="hidden sm:inline-flex h-9 p-1 rounded-lg border border-border bg-background items-center gap-1 shadow-2xs">
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
                    <HaloIcon icon={Tv01Icon} size={15} />
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
                    <HaloIcon icon={Tablet01Icon} size={15} />
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
                    <HaloIcon icon={SmartPhone01Icon} size={15} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Mobile (360px)</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Right: Theme Toggle, Backdrop Select, Extra Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {extraToolbarControls}

            {/* Backdrop Picker */}
            <Select
              value={activeBackdrop}
              onValueChange={(val) => {
                if (val) setEffectiveBackdrop(val);
              }}
            >
              <SelectTrigger className="h-8 sm:h-9 w-[130px] sm:w-[160px] text-xs bg-background border-border text-foreground font-medium shadow-2xs">
                <SelectValue placeholder="Select backdrop" />
              </SelectTrigger>
              <SelectContent align="end">
                {backdropOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-xs">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
                    <HaloIcon icon={ReloadIcon} size={15} />
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
                      size={15}
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
            />

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

        {/* 4. Professional Variant Control Dock */}
        {controls && (
          <div className="p-3 sm:p-4 border-t border-border bg-muted/20 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 text-xs overflow-hidden max-w-full">
            {/* Left: Interactive Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 max-w-full">
              {controls}
            </div>

            {/* Right: Optical Telemetry Chips */}
            {telemetry && telemetry.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono pt-2.5 lg:pt-0 border-t lg:border-t-0 border-border/50 max-w-full shrink-0">
                {telemetry.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md border border-border/70 bg-background/80 text-[10px] sm:text-[11px] shadow-2xs whitespace-nowrap"
                  >
                    <span className="text-muted-foreground/70 shrink-0">{t.label}:</span>
                    <strong
                      className={cn(
                        "font-medium",
                        t.variant === "success" && "text-emerald-500",
                        t.variant === "warning" && "text-amber-500",
                        !t.variant && "text-foreground"
                      )}
                    >
                      {t.value}
                    </strong>
                  </span>
                ))}
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 max-w-full min-w-0">
      <span className="font-mono text-muted-foreground uppercase tracking-wider text-[10px] sm:text-[11px] shrink-0 select-none font-medium">
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
        "h-6 sm:h-6.5 px-2 sm:px-2.5 rounded-md text-[10px] sm:text-[11px] font-medium capitalize transition-colors cursor-pointer flex items-center justify-center shrink-0 whitespace-nowrap",
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
