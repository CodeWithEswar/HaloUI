"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  type CardIntensity,
  type CardSize,
  type CardVariant,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  Settings02Icon,
  MoreHorizontalIcon,
  ArrowRight01Icon,
  Download01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export function CardPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Interactive Card state
  const [size, setSize] = React.useState<CardSize>("default");
  const [intensity, setIntensity] = React.useState<CardIntensity>("subtle");
  const [variant, setVariant] = React.useState<CardVariant>("default");
  const [divided, setDivided] = React.useState(true);
  const [interactive, setInteractive] = React.useState(false);

  const handleReset = () => {
    setSize("default");
    setIntensity("subtle");
    setVariant("default");
    setDivided(true);
    setInteractive(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Material",
      value: `Liquid ${intensity.charAt(0).toUpperCase() + intensity.slice(1)}`,
      variant: intensity === "subtle" ? "default" : "warning",
    },
    {
      label: "Variant",
      value: variant.charAt(0).toUpperCase() + variant.slice(1),
    },
    {
      label: "Size Scale",
      value: size === "sm" ? "Compact (sm)" : size === "lg" ? "Expanded (lg)" : "Default",
    },
    {
      label: "Semantics",
      value: interactive ? "Interactive Target" : "Static Container",
      variant: interactive ? "success" : "default",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const propsList = [];
    if (size !== "default") propsList.push(`size="${size}"`);
    if (intensity !== "subtle") propsList.push(`intensity="${intensity}"`);
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (interactive) propsList.push("interactive");

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Settings02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function ProjectOverviewCard() {
  return (
    <Card${propsStr} className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Continuous Integration</CardTitle>
          <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400">
            Passing
          </Badge>
        </div>
        <CardDescription>
          Automated edge pipeline verification across 14 global regions.
        </CardDescription>
        <CardAction>
          <IconButton variant="ghost" size="sm" aria-label="Pipeline settings">
            <HaloIcon icon={Settings02Icon} size={15} />
          </IconButton>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-xs py-1 border-b border-border/40">
          <span className="text-muted-foreground">Active Build</span>
          <span className="font-mono font-medium">#1,842 (canary-v4.2)</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1">
          <span className="text-muted-foreground">Cold Start Latency</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">12ms (p99)</span>
        </div>
      </CardContent>

      <CardFooter${divided ? " divided" : ""}>
        <Button variant="outline" size="sm" className="w-full justify-between">
          <span>View Build Logs</span>
          <HaloIcon icon={ArrowRight01Icon} size={13} />
        </Button>
      </CardFooter>
    </Card>
  );
}`;
  }, [size, intensity, variant, divided, interactive]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={handleReset}
      telemetry={telemetry}
      code={generatedCode}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Material Intensity"
            value={intensity}
            onValueChange={(val) => setIntensity(val as CardIntensity)}
            options={[
              { label: "Subtle (Recommended for Dashboards)", value: "subtle" },
              { label: "Balanced (Feature Surfaces)", value: "balanced" },
              { label: "Rich (Isolated Focal Cards)", value: "rich" },
            ]}
          />

          <StageControlSelect
            label="Visual Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as CardVariant)}
            options={[
              { label: "Default (Optical Edge)", value: "default" },
              { label: "Subtle (Muted Background)", value: "subtle" },
              { label: "Outline (Zero Blur Boundary)", value: "outline" },
              { label: "Elevated (Ambient Depth)", value: "elevated" },
              { label: "Ghost (Frameless Group)", value: "ghost" },
            ]}
          />

          <StageControlSelect
            label="Size Scale"
            value={size}
            onValueChange={(val) => setSize(val as CardSize)}
            options={[
              { label: "Default (p-5 / standard)", value: "default" },
              { label: "Compact (sm: p-3.5)", value: "sm" },
              { label: "Expanded (lg: p-6)", value: "lg" },
            ]}
          />

          <div className="flex flex-col justify-between gap-1.5 p-2 sm:p-2.5 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors">
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none truncate">
              Footer Divider
            </span>
            <Button
              variant={divided ? "default" : "outline"}
              size="sm"
              className="h-8 sm:h-8.5 w-full text-xs font-normal justify-center rounded-lg"
              onClick={() => setDivided(!divided)}
            >
              {divided ? "Divided Top Border" : "Seamless Footer"}
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-1.5 p-2 sm:p-2.5 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors">
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none truncate">
              Interactive Semantics
            </span>
            <Button
              variant={interactive ? "default" : "outline"}
              size="sm"
              className="h-8 sm:h-8.5 w-full text-xs font-normal justify-center rounded-lg"
              onClick={() => setInteractive(!interactive)}
            >
              {interactive ? "Interactive Target" : "Static Container"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-2 sm:p-6">
        <Card
          size={size}
          intensity={intensity}
          variant={variant}
          interactive={interactive}
          className="w-full max-w-md"
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Continuous Integration</CardTitle>
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                Passing
              </Badge>
            </div>
            <CardDescription>
              Automated edge pipeline verification across 14 global regions.
            </CardDescription>
            <CardAction>
              <IconButton variant="ghost" size="sm" aria-label="Pipeline settings">
                <HaloIcon icon={Settings02Icon} size={15} />
              </IconButton>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-2.5">
            <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/40">
              <span className="text-muted-foreground">Active Build</span>
              <span className="font-mono font-medium text-foreground">#1,842 (canary-v4.2)</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/40">
              <span className="text-muted-foreground">Target Network</span>
              <span className="font-medium text-foreground">Tokyo, Frankfurt, SFO</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1.5">
              <span className="text-muted-foreground">Cold Start Latency</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">12ms (p99)</span>
            </div>
          </CardContent>

          <CardFooter divided={divided}>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>View Build Logs</span>
              <HaloIcon icon={ArrowRight01Icon} size={13} />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PreviewStageShell>
  );
}
