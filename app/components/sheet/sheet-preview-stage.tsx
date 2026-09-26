"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  type SheetSide,
  type SheetSize,
  type SheetIntensity,
  type SheetScrimBlur,
  type SheetScrimTint,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Settings02Icon,
  FilterIcon,
  FileCodeIcon,
  SlidersHorizontalIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type DemoScenario = "settings" | "filter" | "inspector" | "navigation";

export function SheetPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Sheet configuration state
  const [isOpen, setIsOpen] = React.useState(false);
  const [scenario, setScenario] = React.useState<DemoScenario>("settings");
  const [side, setSide] = React.useState<SheetSide>("right");
  const [size, setSize] = React.useState<SheetSize>("default");
  const [intensity, setIntensity] = React.useState<SheetIntensity>("balanced");
  const [scrimBlur, setScrimBlur] = React.useState<SheetScrimBlur>("balanced");
  const [scrimTint, setScrimTint] = React.useState<SheetScrimTint>("neutral");
  const [actionFeedback, setActionFeedback] = React.useState<string | null>(null);

  const handleReset = () => {
    setSide("right");
    setSize("default");
    setIntensity("balanced");
    setScrimBlur("balanced");
    setScrimTint("neutral");
    setScenario("settings");
    setBackdrop("mesh");
    setViewport("desktop");
    setIsOpen(false);
    setActionFeedback(null);
  };

  const generatedCode = React.useMemo(() => {
    const sideProp = side !== "right" ? ` side="${side}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const blurProp = scrimBlur !== "balanced" ? ` scrimBlur="${scrimBlur}"` : "";
    const tintProp = scrimTint !== "neutral" ? ` scrimTint="${scrimTint}"` : "";

    if (scenario === "filter") {
      return `import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { FilterIcon } from "@hugeicons/core-free-icons";

export function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        <HaloIcon icon={FilterIcon} size={16} />
        Filter Data
      </SheetTrigger>
      <SheetContent${sideProp}${sizeProp}${intensityProp}${blurProp}${tintProp}>
        <SheetHeader>
          <SheetTitle>Filter Analytics</SheetTitle>
          <SheetDescription>
            Narrow telemetry by environment, response latency, and status code.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Filter options */}
        </div>

        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Reset</SheetClose>
          <Button variant="default">Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}`;
    }

    return `import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Settings02Icon } from "@hugeicons/core-free-icons";

export function WorkspaceSettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="default" />}>
        <HaloIcon icon={Settings02Icon} size={16} />
        Workspace Settings
      </SheetTrigger>
      <SheetContent${sideProp}${sizeProp}${intensityProp}${blurProp}${tintProp}>
        <SheetHeader>
          <SheetTitle>Workspace Preferences</SheetTitle>
          <SheetDescription>
            Configure environment variables, edge regions, and routing defaults.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Workspace form controls */}
        </div>

        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
          <Button variant="default">Save Settings</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}`;
  }, [side, size, intensity, scrimBlur, scrimTint, scenario]);

  const telemetry = [
    { label: "Attachment", value: `Edge (${side})` },
    { label: "Size Tier", value: size },
    { label: "Material", value: intensity },
    { label: "Scrim Blur", value: scrimBlur },
    { label: "Scrim Tint", value: scrimTint },
    { label: "State", value: isOpen ? "Open (Portalled)" : "Closed" },
  ];

  const controls = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as DemoScenario)}
        options={[
          { label: "Workspace Settings", value: "settings" },
          { label: "Data Filtering", value: "filter" },
          { label: "Document Inspector", value: "inspector" },
          { label: "Navigation Drawer", value: "navigation" },
        ]}
      />
      <StageControlSelect
        label="Edge Side"
        value={side}
        onValueChange={(v) => setSide(v as SheetSide)}
        options={[
          { label: "Right (Canonical)", value: "right" },
          { label: "Left (Navigation)", value: "left" },
          { label: "Bottom (Mobile/Tray)", value: "bottom" },
          { label: "Top (Notification)", value: "top" },
        ]}
      />
      <StageControlSelect
        label="Size Tier"
        value={size}
        onValueChange={(v) => setSize(v as SheetSize)}
        options={[
          { label: "Default (md — 448px)", value: "default" },
          { label: "Small (sm — 384px)", value: "sm" },
          { label: "Large (lg — 512px)", value: "lg" },
          { label: "Extra Large (xl — 576px)", value: "xl" },
          { label: "Full Container", value: "full" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as SheetIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Specular Glow)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Scrim Blur"
        value={scrimBlur}
        onValueChange={(v) => setScrimBlur(v as SheetScrimBlur)}
        options={[
          { label: "Balanced (8px)", value: "balanced" },
          { label: "Subtle (4px)", value: "subtle" },
          { label: "Deep (16px)", value: "deep" },
          { label: "None (0px)", value: "none" },
        ]}
      />
      <StageControlSelect
        label="Scrim Tint"
        value={scrimTint}
        onValueChange={(v) => setScrimTint(v as SheetScrimTint)}
        options={[
          { label: "Neutral Graphite", value: "neutral" },
          { label: "Soft Wash", value: "soft" },
          { label: "Deep Occlusion", value: "deep" },
          { label: "Vibrant Saturation", value: "vibrant" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Sheet Live Preview Stage"
      description="Edge-anchored overlay panel demonstrating 10-layer physical liquid optics, directional entrance transitions, and calibrated optical scrim."
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
      <div className="flex flex-col items-center justify-center min-h-[360px] p-6 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
            <HaloIcon
              icon={
                scenario === "filter"
                  ? FilterIcon
                  : scenario === "inspector"
                  ? FileCodeIcon
                  : scenario === "navigation"
                  ? SlidersHorizontalIcon
                  : Settings02Icon
              }
              size={24}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {scenario === "filter"
                ? "Contextual Data Filtering"
                : scenario === "inspector"
                ? "Document & Code Inspector"
                : scenario === "navigation"
                ? "Application Navigation Tray"
                : "Workspace & Project Settings"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Open the edge-attached panel to experience directional slide kinematics, concentric meniscus border geometry, and progressive scrim isolation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button variant="default" className="shadow-sm">
                    <HaloIcon
                      icon={
                        scenario === "filter"
                          ? FilterIcon
                          : scenario === "inspector"
                          ? FileCodeIcon
                          : Settings02Icon
                      }
                      size={16}
                    />
                    <span>
                      {scenario === "filter"
                        ? "Open Filters"
                        : scenario === "inspector"
                        ? "Inspect Document"
                        : "Open Settings Panel"}
                    </span>
                  </Button>
                }
              />

              <SheetContent
                side={side}
                size={size}
                intensity={intensity}
                scrimBlur={scrimBlur}
                scrimTint={scrimTint}
              >
                {scenario === "filter" ? (
                  <>
                    <SheetHeader>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                          <HaloIcon icon={FilterIcon} size={16} />
                        </span>
                        <SheetTitle>Filter Cluster Metrics</SheetTitle>
                      </div>
                      <SheetDescription>
                        Narrow results by runtime region, error severity, and latency bounds.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-left text-xs">
                      <div className="space-y-2">
                        <label className="font-semibold text-foreground">Deployment Region</label>
                        <select className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none">
                          <option>us-east-1 (N. Virginia)</option>
                          <option>eu-central-1 (Frankfurt)</option>
                          <option>ap-northeast-1 (Tokyo)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-foreground">Minimum Response Threshold</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="50"
                            max="1000"
                            defaultValue="250"
                            className="flex-1 accent-primary"
                          />
                          <span className="font-mono text-muted-foreground w-14 text-right">250ms</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-foreground">Log Severity</label>
                        <div className="space-y-1.5">
                          {["Critical Errors (5xx)", "Client Errors (4xx)", "Cache Misses"].map((item) => (
                            <label key={item} className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                              <input type="checkbox" defaultChecked className="rounded accent-primary" />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <SheetFooter>
                      <SheetClose render={<Button variant="outline" className="w-full sm:w-auto" />}>
                        Clear
                      </SheetClose>
                      <Button
                        variant="default"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setActionFeedback("Filter applied: 14 metrics active");
                          setIsOpen(false);
                        }}
                      >
                        Apply Filters
                      </Button>
                    </SheetFooter>
                  </>
                ) : scenario === "inspector" ? (
                  <>
                    <SheetHeader>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                          <HaloIcon icon={FileCodeIcon} size={16} />
                        </span>
                        <SheetTitle>Document Inspector</SheetTitle>
                      </div>
                      <SheetDescription>
                        Cryptographic checksums, schema metadata, and audit lifecycle trails.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-left text-xs leading-relaxed text-muted-foreground divide-y divide-border/30">
                      <div className="pt-1">
                        <h5 className="font-semibold text-foreground mb-1">SHA-256 Digest</h5>
                        <p className="font-mono text-[11px] break-all bg-muted/40 p-2 rounded-lg border border-border/40">
                          e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                        </p>
                      </div>
                      <div className="pt-3">
                        <h5 className="font-semibold text-foreground mb-1">Optical Engine Parameters</h5>
                        <p>Evaluated using 10-layer physical dispersion algorithms with zero CPU composition stalls.</p>
                      </div>
                      <div className="pt-3">
                        <h5 className="font-semibold text-foreground mb-1">Edge Attachment Consistency</h5>
                        <p>Meniscus border radii scale with container width to maintain optical concentricity.</p>
                      </div>
                    </div>

                    <SheetFooter>
                      <SheetClose render={<Button variant="default" className="w-full sm:w-auto" />}>
                        Done
                      </SheetClose>
                    </SheetFooter>
                  </>
                ) : (
                  <>
                    <SheetHeader>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                          <HaloIcon icon={Settings02Icon} size={16} />
                        </span>
                        <SheetTitle>Workspace Preferences</SheetTitle>
                      </div>
                      <SheetDescription>
                        Update deployment domains, notification webhooks, and team roles.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-left text-xs">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-foreground">Project Name</label>
                        <input
                          type="text"
                          defaultValue="aurora-gateway-prod"
                          className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-foreground">Production URL</label>
                        <input
                          type="text"
                          defaultValue="https://gateway.internal.acme.dev"
                          className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-foreground">Failover Notification Webhook</label>
                        <input
                          type="url"
                          defaultValue="https://hooks.slack.com/services/T00/B00/X00"
                          className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <SheetFooter>
                      <SheetClose render={<Button variant="outline" className="w-full sm:w-auto" />}>
                        Cancel
                      </SheetClose>
                      <Button
                        variant="default"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setActionFeedback("Workspace preferences saved successfully.");
                          setIsOpen(false);
                        }}
                      >
                        Save Preferences
                      </Button>
                    </SheetFooter>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>

          {actionFeedback && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
              <span>{actionFeedback}</span>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
