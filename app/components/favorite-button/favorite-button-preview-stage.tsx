"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  FavoriteButton,
  type FavoriteButtonVariant,
  type FavoriteButtonSize,
} from "@/components/ui/favorite-button";
import {
  FavouriteIcon,
  HeartIcon,
  StarIcon,
  Bookmark02Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
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

export function FavoriteButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [variant, setVariant] = React.useState<FavoriteButtonVariant>("default");
  const [size, setSize] = React.useState<FavoriteButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [isLabeled, setIsLabeled] = React.useState(false);
  const [hasLongLabel, setHasLongLabel] = React.useState(false);
  const [selectedIconKey, setSelectedIconKey] = React.useState<"favourite" | "heart" | "star" | "bookmark">("favourite");
  const [favorited, setFavorited] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [toggleCount, setToggleCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

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
        return "max-w-2xl";
    }
  };

  const getSelectedIcon = () => {
    switch (selectedIconKey) {
      case "heart":
        return HeartIcon;
      case "star":
        return StarIcon;
      case "bookmark":
        return Bookmark02Icon;
      default:
        return FavouriteIcon;
    }
  };

  const labelText = hasLongLabel
    ? favorited
      ? "Saved to Project Workspace Collection"
      : "Add Project Workspace To Favorites"
    : favorited
      ? "Favorited"
      : "Add to favorites";

  const handleFavoritedChange = (newVal: boolean) => {
    setFavorited(newVal);
    setToggleCount((prev) => prev + 1);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setVariant("default");
    setSize("default");
    setDisabled(false);
    setIsLabeled(false);
    setHasLongLabel(false);
    setSelectedIconKey("favourite");
    setFavorited(false);
    setContainerWidth("full");
  };

  const generatedCode = React.useMemo(() => {
    const props = [];
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "default") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (selectedIconKey !== "favourite") {
      const iconName = selectedIconKey.charAt(0).toUpperCase() + selectedIconKey.slice(1) + "Icon";
      props.push(`icon={${iconName}}`);
    }

    const propsStr = props.length > 0 ? " " + props.join(" ") : "";

    if (isLabeled) {
      return `import * as React from "react";
import { FavoriteButton } from "@/components/ui/favorite-button";

export function FavoriteExample() {
  const [favorited, setFavorited] = React.useState(${favorited});

  return (
    <FavoriteButton
      favorited={favorited}
      onFavoritedChange={setFavorited}${propsStr}
    >
      {favorited ? "${hasLongLabel ? "Saved to Project Workspace Collection" : "Favorited"}" : "${hasLongLabel ? "Add Project Workspace To Favorites" : "Add to favorites"}"}
    </FavoriteButton>
  );
}`;
    }

    return `import * as React from "react";
import { FavoriteButton } from "@/components/ui/favorite-button";

export function FavoriteExample() {
  const [favorited, setFavorited] = React.useState(${favorited});

  return (
    <FavoriteButton
      favorited={favorited}
      onFavoritedChange={setFavorited}${propsStr}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    />
  );
}`;
  }, [variant, size, disabled, isLabeled, hasLongLabel, selectedIconKey, favorited]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "State",
      value: favorited ? "FAVORITED (TRUE)" : "UNFAVORITED (FALSE)",
      variant: favorited ? "success" : undefined,
    },
    {
      label: "Aria Label",
      value: favorited ? "Remove from favorites" : "Add to favorites",
    },
    {
      label: "Touch Target",
      value: size === "lg" ? "48px (LG)" : size === "sm" ? "32px (SM)" : "40px (DEF)",
      variant: size === "sm" ? "warning" : "success",
    },
    {
      label: "Focus Ring",
      value: "z-20 (Unclipped)",
      variant: "success",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect persistent favorited toggle state, state-aware accessible names, responsive reflow, and unclipped double-contrast Halo Focus Ring layering."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={resetStage}
      code={generatedCode}
      onCopy={copyCodeToClipboard}
      copied={copiedCode}
      telemetry={telemetry}
      controls={
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as FavoriteButtonVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Secondary (Frosted)", value: "secondary" },
                { label: "Outline (Hairline)", value: "outline" },
                { label: "Ghost (Transparent)", value: "ghost" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as FavoriteButtonSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (40px)", value: "default" },
                { label: "LG (48px)", value: "lg" },
              ]}
            />

            <StageControlSelect
              label="Mode"
              value={isLabeled ? "labeled" : "icon-only"}
              onChange={(val) => setIsLabeled(val === "labeled")}
              options={[
                { label: "Icon-only (Circular)", value: "icon-only" },
                { label: "Labeled (Capsule)", value: "labeled" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            <button
              type="button"
              onClick={() => handleFavoritedChange(!favorited)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                favorited
                  ? "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {favorited ? "♥ Favorited (aria-pressed=true)" : "♡ Unfavorited (false)"}
            </button>

            {isLabeled && (
              <button
                type="button"
                onClick={() => setHasLongLabel(!hasLongLabel)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                  hasLongLabel
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
                )}
              >
                {hasLongLabel ? "✓ Long Label (240px Reflow)" : "Long Label"}
              </button>
            )}

            <button
              type="button"
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                disabled
                  ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {disabled ? "✓ Disabled" : "Disabled"}
            </button>

            <button
              type="button"
              onClick={() => {
                const keys: Array<"favourite" | "heart" | "star" | "bookmark"> = ["favourite", "heart", "star", "bookmark"];
                const nextIdx = (keys.indexOf(selectedIconKey) + 1) % keys.length;
                setSelectedIconKey(keys[nextIdx]);
              }}
              className="h-7 px-2.5 rounded-md text-xs font-medium border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60 transition-colors cursor-pointer select-none"
            >
              Icon: {selectedIconKey}
            </button>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full mx-auto p-4 sm:p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 ease-out",
          getContainerMaxWidthClass(containerWidth)
        )}
      >
        {/* Realistic interactive surface */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md shadow-sm min-w-0 max-w-full">
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            <div className="size-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <HaloIcon icon={Image01Icon} size={20} />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">
                Atmospheric Optical Study
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                Photonic refraction & caustic dispersion
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <FavoriteButton
              variant={variant}
              size={size}
              disabled={disabled}
              icon={getSelectedIcon()}
              favorited={favorited}
              onFavoritedChange={handleFavoritedChange}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              {isLabeled ? labelText : undefined}
            </FavoriteButton>
          </div>
        </div>

        {/* State Telemetry Details */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground text-center">
          <span>aria-pressed="{favorited ? "true" : "false"}"</span>
          <span>·</span>
          <span>data-favorited="{favorited ? "true" : "false"}"</span>
          <span>·</span>
          <span>Toggles: <strong className="text-foreground">{toggleCount}</strong></span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
