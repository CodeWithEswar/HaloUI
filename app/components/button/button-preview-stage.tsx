"use client";

import * as React from "react";
import {
  SparklesIcon,
  ArrowRight01Icon,
  Layers01Icon,
  Sun01Icon,
  Moon02Icon,
  LaptopIcon,
  SmartPhone01Icon,
  Tablet01Icon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  PlayIcon,
  ReloadIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton, type HaloButtonProps } from "@/components/haloui/button/halo-button";
import { HaloBackground, type PreviewEnvironment } from "@/components/haloui/foundations/halo-background";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ButtonPreviewStage() {
  const [environment, setEnvironment] = React.useState<PreviewEnvironment>("neutral");
  const [viewport, setViewport] = React.useState<"fluid" | "desktop" | "laptop" | "tablet" | "phone">("fluid");
  const [variant, setVariant] = React.useState<NonNullable<HaloButtonProps["variant"]>>("primary");
  const [size, setSize] = React.useState<NonNullable<HaloButtonProps["size"]>>("md");
  const [intensity, setIntensity] = React.useState<NonNullable<HaloButtonProps["intensity"]>>("balanced");
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [magnetic, setMagnetic] = React.useState(true);
  const [withIcons, setWithIcons] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const viewportWidths = {
    fluid: "w-full",
    desktop: "max-w-[1200px]",
    laptop: "max-w-[960px]",
    tablet: "max-w-[720px]",
    phone: "max-w-[360px]",
  };

  const generatedCode = `<HaloButton
  variant="${variant}"
  size="${size}"
  intensity="${intensity}"${magnetic ? "\n  magnetic" : ""}${loading ? "\n  loading" : ""}${disabled ? "\n  disabled" : ""}${withIcons ? '\n  leftIcon={SparklesIcon}\n  rightIcon={ArrowRight01Icon}' : ""}
>
  Confirm Action
</HaloButton>`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setEnvironment("neutral");
    setViewport("fluid");
    setVariant("primary");
    setSize("md");
    setIntensity("balanced");
    setLoading(false);
    setDisabled(false);
    setMagnetic(true);
    setWithIcons(true);
  };

  return (
    <div className="w-full space-y-4">
      {/* Stage Toolbar (Built with shadcn primitives & Hugeicons) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md">
        {/* Background Environment Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-wider mr-1">
            Backdrop:
          </span>
          <Tabs
            value={environment}
            onValueChange={(val) => setEnvironment(val as PreviewEnvironment)}
          >
            <TabsList className="h-8 bg-black/5 dark:bg-white/10 p-0.5 rounded-lg">
              <TabsTrigger value="neutral" className="text-xs px-2.5 h-7">
                Neutral
              </TabsTrigger>
              <TabsTrigger value="paper" className="text-xs px-2.5 h-7">
                Warm Paper
              </TabsTrigger>
              <TabsTrigger value="spectral" className="text-xs px-2.5 h-7">
                Spectral
              </TabsTrigger>
              <TabsTrigger value="image" className="text-xs px-2.5 h-7">
                Image
              </TabsTrigger>
              <TabsTrigger value="dense" className="text-xs px-2.5 h-7">
                Dense UI
              </TabsTrigger>
              <TabsTrigger value="dark" className="text-xs px-2.5 h-7">
                Dark
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-wider mr-1">
            Viewport:
          </span>
          <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-0.5">
            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewport("fluid")}
                className={cn(
                  "px-2 py-1 rounded text-xs transition-colors cursor-pointer",
                  viewport === "fluid"
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-medium"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                )}
              >
                Fluid
              </TooltipTrigger>
              <TooltipContent>100% Responsive Viewport</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewport("laptop")}
                aria-label="Laptop viewport"
                className={cn(
                  "p-1.5 rounded transition-colors cursor-pointer",
                  viewport === "laptop"
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                )}
              >
                <HaloIcon icon={LaptopIcon} size={15} />
              </TooltipTrigger>
              <TooltipContent>Laptop (960px)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewport("tablet")}
                aria-label="Tablet viewport"
                className={cn(
                  "p-1.5 rounded transition-colors cursor-pointer",
                  viewport === "tablet"
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                )}
              >
                <HaloIcon icon={Tablet01Icon} size={15} />
              </TooltipTrigger>
              <TooltipContent>Tablet (720px)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewport("phone")}
                aria-label="Mobile viewport"
                className={cn(
                  "p-1.5 rounded transition-colors cursor-pointer",
                  viewport === "phone"
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                )}
              >
                <HaloIcon icon={SmartPhone01Icon} size={15} />
              </TooltipTrigger>
              <TooltipContent>Mobile (360px)</TooltipContent>
            </Tooltip>
          </div>

          {/* Reset button */}
          <Tooltip>
            <TooltipTrigger
              onClick={resetStage}
              aria-label="Reset Stage"
              className="p-1.5 ml-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-stone-500 transition-colors cursor-pointer"
            >
              <HaloIcon icon={ReloadIcon} size={15} />
            </TooltipTrigger>
            <TooltipContent>Reset Stage</TooltipContent>
          </Tooltip>

          {/* Copy snippet button */}
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-stone-800 dark:text-stone-200 text-xs font-medium transition-all shadow-xs"
          >
            <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={14} />
            <span>{copied ? "Copied" : "Copy JSX"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="flex justify-center w-full transition-all duration-300">
        <div
          className={cn(
            "w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-300",
            viewportWidths[viewport]
          )}
        >
          <HaloBackground environment={environment} className="py-20">
            <div className="flex flex-col items-center gap-6">
              {/* Primary Interactive Demo */}
              <div className="relative group">
                <HaloButton
                  variant={variant}
                  size={size}
                  intensity={intensity}
                  loading={loading}
                  disabled={disabled}
                  magnetic={magnetic}
                  leftIcon={withIcons ? SparklesIcon : undefined}
                  rightIcon={withIcons ? ArrowRight01Icon : undefined}
                >
                  Confirm Action
                </HaloButton>
              </div>

              {/* Physical interaction note */}
              <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-white/40 dark:bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 dark:border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-white" />
                <span>Directional top highlight · Tactile press compression · Subtle magnetic pull</span>
              </div>
            </div>
          </HaloBackground>
        </div>
      </div>

      {/* Component Parameters Controller Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02]">
        {/* Variant */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Variant
          </label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="w-full text-xs h-8 px-2 rounded-md border border-black/10 dark:border-white/10 bg-white/80 dark:bg-stone-900/80 text-foreground"
          >
            <option value="primary">Primary</option>
            <option value="neutral">Neutral</option>
            <option value="subtle">Subtle</option>
            <option value="ghost">Ghost</option>
            <option value="destructive">Destructive</option>
            <option value="rich">Rich</option>
          </select>
        </div>

        {/* Size */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-full text-xs h-8 px-2 rounded-md border border-black/10 dark:border-white/10 bg-white/80 dark:bg-stone-900/80 text-foreground"
          >
            <option value="sm">sm (32px)</option>
            <option value="md">md (40px)</option>
            <option value="lg">lg (48px)</option>
            <option value="xl">xl (56px)</option>
            <option value="icon">icon (square)</option>
          </select>
        </div>

        {/* Intensity */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Intensity
          </label>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value as any)}
            className="w-full text-xs h-8 px-2 rounded-md border border-black/10 dark:border-white/10 bg-white/80 dark:bg-stone-900/80 text-foreground"
          >
            <option value="subtle">Subtle</option>
            <option value="balanced">Balanced</option>
            <option value="rich">Rich</option>
          </select>
        </div>

        {/* Magnetic */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Magnetic
          </label>
          <button
            type="button"
            onClick={() => setMagnetic(!magnetic)}
            className={cn(
              "w-full text-xs h-8 px-2 rounded-md border transition-colors flex items-center justify-center font-medium",
              magnetic
                ? "border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900"
                : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-stone-900/50 text-stone-500"
            )}
          >
            {magnetic ? "Enabled (4px)" : "Disabled"}
          </button>
        </div>

        {/* Loading */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Loading State
          </label>
          <button
            type="button"
            onClick={() => setLoading(!loading)}
            className={cn(
              "w-full text-xs h-8 px-2 rounded-md border transition-colors flex items-center justify-center font-medium",
              loading
                ? "border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900"
                : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-stone-900/50 text-stone-500"
            )}
          >
            {loading ? "Spinning" : "Idle"}
          </button>
        </div>

        {/* Icons */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Hugeicons
          </label>
          <button
            type="button"
            onClick={() => setWithIcons(!withIcons)}
            className={cn(
              "w-full text-xs h-8 px-2 rounded-md border transition-colors flex items-center justify-center font-medium",
              withIcons
                ? "border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900"
                : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-stone-900/50 text-stone-500"
            )}
          >
            {withIcons ? "Leading + Trailing" : "Text Only"}
          </button>
        </div>
      </div>
    </div>
  );
}
