"use client";

import * as React from "react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  type ItemVariant,
  type ItemSize,
} from "@/components/ui/item";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  Settings01Icon,
  SecurityCheckIcon,
  FolderIcon,
  CloudIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export function ItemPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [variant, setVariant] = React.useState<ItemVariant>("glass");
  const [size, setSize] = React.useState<ItemSize>("default");
  const [mediaType, setMediaType] = React.useState<"avatar" | "icon" | "image" | "none">("icon");
  const [actionType, setActionType] = React.useState<"switch" | "button" | "status" | "badge" | "none">("switch");
  const [isInteractive, setIsInteractive] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setSize("default");
    setMediaType("icon");
    setActionType("switch");
    setIsInteractive(false);
    setSwitchChecked(true);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Density",
      value: size === "compact" ? "COMPACT (8px/10px)" : "DEFAULT (12px/14px)",
      variant: "default",
    },
    {
      label: "Media",
      value: mediaType.toUpperCase(),
      variant: "default",
    },
    {
      label: "Optical Edge",
      value: variant === "glass" ? "135° SPECULAR" : "HAIRLINE",
      variant: variant === "glass" ? "success" : "default",
    },
  ];

  const codeString = `<Item
  variant="${variant}"
  size="${size}"${isInteractive ? "\n  interactive" : ""}
>
${mediaType === "avatar" ? `  <ItemMedia>
    <Avatar size="${size === "compact" ? "sm" : "default"}">
      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Elena Rostova" />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
  </ItemMedia>` : ""}${mediaType === "icon" ? `  <ItemMedia variant="icon">
    <HaloIcon icon={SecurityCheckIcon} />
  </ItemMedia>` : ""}${mediaType === "image" ? `  <ItemMedia variant="image">
    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150" alt="Thumbnail" />
  </ItemMedia>` : ""}
  <ItemContent>
    <ItemTitle>Two-Factor Authentication</ItemTitle>
    <ItemDescription>Enforce hardware biometric security tokens across all sessions.</ItemDescription>
  </ItemContent>
${actionType === "switch" ? `  <ItemActions>
    <Switch checked={${switchChecked}} onCheckedChange={setSwitchChecked} />
  </ItemActions>` : ""}${actionType === "button" ? `  <ItemActions>
    <Button variant="outline" size="sm">
      Configure
      <HaloIcon icon={ArrowRight01Icon} className="size-3.5" />
    </Button>
  </ItemActions>` : ""}${actionType === "status" ? `  <ItemActions>
    <StatusBadge tone="positive" status="online">Active</StatusBadge>
  </ItemActions>` : ""}${actionType === "badge" ? `  <ItemActions>
    <Badge variant="glass">Encrypted</Badge>
  </ItemActions>` : ""}
</Item>`;

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={codeString}
      telemetry={telemetry}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      controls={
        <div className="flex flex-col gap-4">
          <StageControlSelect
            label="Variant"
            value={variant}
            onChange={(val) => setVariant(val as ItemVariant)}
            options={[
              { value: "glass", label: "Liquid Glass" },
              { value: "default", label: "Default (Flat)" },
              { value: "outline", label: "Outline" },
              { value: "muted", label: "Muted" },
            ]}
          />

          <StageControlSelect
            label="Density / Size"
            value={size}
            onChange={(val) => setSize(val as ItemSize)}
            options={[
              { value: "default", label: "Default" },
              { value: "compact", label: "Compact" },
            ]}
          />

          <StageControlSelect
            label="Leading Media"
            value={mediaType}
            onChange={(val) => setMediaType(val as any)}
            options={[
              { value: "icon", label: "Icon" },
              { value: "avatar", label: "Avatar" },
              { value: "image", label: "Image Thumbnail" },
              { value: "none", label: "None" },
            ]}
          />

          <StageControlSelect
            label="Trailing Action"
            value={actionType}
            onChange={(val) => setActionType(val as any)}
            options={[
              { value: "switch", label: "Switch" },
              { value: "button", label: "Button" },
              { value: "status", label: "Status Badge" },
              { value: "badge", label: "Badge" },
              { value: "none", label: "None" },
            ]}
          />

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="interactive-mode"
              checked={isInteractive}
              onCheckedChange={(checked) => setIsInteractive(Boolean(checked))}
            />
            <Label htmlFor="interactive-mode" className="text-xs text-muted-foreground cursor-pointer">
              Interactive Row Affordance
            </Label>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-lg mx-auto py-8 px-2 flex flex-col items-center justify-center">
        <Item
          variant={variant}
          size={size}
          interactive={isInteractive}
          className="w-full"
        >
          {mediaType === "avatar" && (
            <ItemMedia>
              <Avatar size={size === "compact" ? "sm" : "default"}>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
          )}

          {mediaType === "icon" && (
            <ItemMedia variant="icon">
              <HaloIcon icon={SecurityCheckIcon} />
            </ItemMedia>
          )}

          {mediaType === "image" && (
            <ItemMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
                alt="Thumbnail"
              />
            </ItemMedia>
          )}

          <ItemContent>
            <ItemTitle>Two-Factor Authentication</ItemTitle>
            <ItemDescription>
              Enforce hardware biometric security tokens across all sessions.
            </ItemDescription>
          </ItemContent>

          {actionType === "switch" && (
            <ItemActions>
              <Switch
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
                aria-label="Toggle two-factor authentication"
              />
            </ItemActions>
          )}

          {actionType === "button" && (
            <ItemActions>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                Configure
                <HaloIcon icon={ArrowRight01Icon} className="size-3.5" />
              </Button>
            </ItemActions>
          )}

          {actionType === "status" && (
            <ItemActions>
              <StatusBadge tone="positive">
                Active
              </StatusBadge>
            </ItemActions>
          )}

          {actionType === "badge" && (
            <ItemActions>
              <Badge variant="glass">Encrypted</Badge>
            </ItemActions>
          )}
        </Item>
      </div>
    </PreviewStageShell>
  );
}
