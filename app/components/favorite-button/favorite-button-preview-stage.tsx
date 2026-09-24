"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
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
} from "@hugeicons/core-free-icons";

export function FavoriteButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [variant, setVariant] = React.useState<FavoriteButtonVariant>("default");
  const [size, setSize] = React.useState<FavoriteButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [isLabeled, setIsLabeled] = React.useState(false);
  const [selectedIconKey, setSelectedIconKey] = React.useState<"favourite" | "heart" | "star" | "bookmark">("favourite");
  const [favorited, setFavorited] = React.useState(false);
  const [toggleCount, setToggleCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

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

  const handleFavoritedChange = (newVal: boolean) => {
    setFavorited(newVal);
    setToggleCount((prev) => prev + 1);
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
  const [favorited, setFavorited] = React.useState(false);

  return (
    <FavoriteButton
      favorited={favorited}
      onFavoritedChange={setFavorited}${propsStr}
    >
      {favorited ? "Favorited" : "Add to favorites"}
    </FavoriteButton>
  );
}`;
    }

    return `import * as React from "react";
import { FavoriteButton } from "@/components/ui/favorite-button";

export function FavoriteExample() {
  const [favorited, setFavorited] = React.useState(false);

  return (
    <FavoriteButton
      favorited={favorited}
      onFavoritedChange={setFavorited}${propsStr}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    />
  );
}`;
  }, [variant, size, disabled, isLabeled, selectedIconKey]);

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
          label: "State",
          value: favorited ? "Favorited (true)" : "Unfavorited (false)",
          variant: favorited ? "success" : undefined,
        },
        {
          label: "Aria Label",
          value: favorited ? "Remove from favorites" : "Add to favorites",
        },
        {
          label: "Variant",
          value: variant.charAt(0).toUpperCase() + variant.slice(1),
        },
        {
          label: "Size",
          value: size.toUpperCase(),
        },
        {
          label: "Toggles",
          value: String(toggleCount),
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as FavoriteButtonVariant)}
            options={[
              { label: "Default (Liquid Glass)", value: "default" },
              { label: "Secondary (Frosted)", value: "secondary" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as FavoriteButtonSize)}
            options={[
              { label: "SM (32px)", value: "sm" },
              { label: "Default (40px)", value: "default" },
              { label: "LG (48px)", value: "lg" },
            ]}
          />

          <StageControlSelect
            label="Mode"
            value={isLabeled ? "labeled" : "icon-only"}
            onValueChange={(val) => setIsLabeled(val === "labeled")}
            options={[
              { label: "Icon-only", value: "icon-only" },
              { label: "Labeled", value: "labeled" },
            ]}
          />

          <StageControlSelect
            label="Icon"
            value={selectedIconKey}
            onValueChange={(val) => setSelectedIconKey(val as any)}
            options={[
              { label: "Favourite (Default)", value: "favourite" },
              { label: "Heart", value: "heart" },
              { label: "Star", value: "star" },
              { label: "Bookmark", value: "bookmark" },
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
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <FavoriteButton
          variant={variant}
          size={size}
          disabled={disabled}
          icon={getSelectedIcon()}
          favorited={favorited}
          onFavoritedChange={handleFavoritedChange}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isLabeled ? (favorited ? "Favorited" : "Add to favorites") : undefined}
        </FavoriteButton>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
          <span>aria-pressed="{favorited ? "true" : "false"}"</span>
          <span>·</span>
          <span>data-favorited="{favorited ? "true" : "false"}"</span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
