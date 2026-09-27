"use client";

import * as React from "react";
import {
  List,
  ListItem,
  ListHeader,
  type ListVariant,
  type ListDensity,
  type ListMarker,
} from "@/components/ui/list";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
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
  FolderIcon,
  CloudIcon,
  ArrowRight01Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const PREVIEW_DATA = [
  {
    title: "Production Mesh Cluster",
    description: "Multi-region edge compute runtime running across 320 PoPs.",
    status: "Operational",
    tone: "positive" as const,
    icon: CloudIcon,
    badge: "v4.2.0",
  },
  {
    title: "Optical Physics Shader",
    description: "10-layer physical Liquid Glass refraction and specular reflections.",
    status: "Active",
    tone: "positive" as const,
    icon: FolderIcon,
    badge: "60fps",
  },
  {
    title: "Hardware WebAuthn Keys",
    description: "FIPS 140-3 cryptographic token enforcement for root administrative roles.",
    status: "Enforced",
    tone: "warning" as const,
    icon: SecurityCheckIcon,
    badge: "Hardware",
  },
];

export function ListPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [variant, setVariant] = React.useState<ListVariant>("glass");
  const [density, setDensity] = React.useState<ListDensity>("default");
  const [divided, setDivided] = React.useState(true);
  const [containerWidth, setContainerWidth] = React.useState<"full" | "sm" | "xs">("full");

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setDivided(true);
    setContainerWidth("full");
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
      value: density.toUpperCase(),
      variant: "default",
    },
    {
      label: "Divided",
      value: divided ? "ENABLED" : "OFF",
      variant: divided ? "success" : "default",
    },
    {
      label: "Container",
      value: containerWidth === "xs" ? "NARROW (280px)" : containerWidth === "sm" ? "MEDIUM (400px)" : "FLUID (100%)",
      variant: containerWidth === "xs" ? "warning" : "default",
    },
  ];

  const codeString = `<List
  variant="${variant}"
  density="${density}"${divided ? "\n  divided" : ""}
>
  <ListHeader>Infrastructure Resources</ListHeader>

  <ListItem asChild>
    <Item variant="default">
      <ItemMedia variant="icon">
        <HaloIcon icon={CloudIcon} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Production Mesh Cluster</ItemTitle>
        <ItemDescription>Multi-region edge compute runtime running across 320 PoPs.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <StatusBadge tone="positive">Operational</StatusBadge>
      </ItemActions>
    </Item>
  </ListItem>

  <ListItem asChild>
    <Item variant="default">
      <ItemMedia variant="icon">
        <HaloIcon icon={FolderIcon} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Optical Physics Shader</ItemTitle>
        <ItemDescription>10-layer physical Liquid Glass refraction and specular reflections.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="glass">60fps</Badge>
      </ItemActions>
    </Item>
  </ListItem>
</List>`;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Surface Variant"
            value={variant}
            onChange={(val) => setVariant(val as ListVariant)}
            options={[
              { value: "glass", label: "Liquid Glass" },
              { value: "default", label: "Default (Calm/Flat)" },
              { value: "outline", label: "Outline" },
              { value: "muted", label: "Muted" },
            ]}
          />

          <StageControlSelect
            label="Density"
            value={density}
            onChange={(val) => setDensity(val as ListDensity)}
            options={[
              { value: "default", label: "Default" },
              { value: "compact", label: "Compact" },
              { value: "relaxed", label: "Relaxed" },
            ]}
          />

          <StageControlSelect
            label="Simulated Container"
            value={containerWidth}
            onChange={(val) => setContainerWidth(val as any)}
            options={[
              { value: "full", label: "Fluid Full Width" },
              { value: "sm", label: "Card / Modal (400px)" },
              { value: "xs", label: "Narrow Sidebar (280px)" },
            ]}
          />

          <div className="flex flex-col justify-between gap-1.5 p-2 sm:p-2.5 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors">
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none truncate block">
              Row Dividers
            </span>
            <div className="flex items-center gap-2 h-8 sm:h-8.5 px-1 sm:px-2">
              <Checkbox
                id="list-divided"
                checked={divided}
                onCheckedChange={(checked) => setDivided(Boolean(checked))}
              />
              <Label
                htmlFor="list-divided"
                className="text-xs sm:text-[13px] text-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Divided (divide-y)
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full transition-all duration-200 py-6 px-2 mx-auto",
          containerWidth === "xs" && "max-w-[280px]",
          containerWidth === "sm" && "max-w-[400px]",
          containerWidth === "full" && "max-w-xl"
        )}
      >
        <List
          variant={variant}
          density={density}
          divided={divided}
          className="w-full"
        >
          <ListHeader>System Architecture</ListHeader>

          {PREVIEW_DATA.map((record, idx) => (
            <ListItem key={idx} asChild>
              <Item variant="default" size={density === "compact" ? "compact" : "default"}>
                <ItemMedia variant="icon">
                  <HaloIcon icon={record.icon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{record.title}</ItemTitle>
                  <ItemDescription>{record.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <StatusBadge tone={record.tone}>{record.status}</StatusBadge>
                </ItemActions>
              </Item>
            </ListItem>
          ))}
        </List>
      </div>
    </PreviewStageShell>
  );
}
