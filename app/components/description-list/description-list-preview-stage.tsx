"use client";

import * as React from "react";
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
  DescriptionListHeader,
  type DescriptionListVariant,
  type DescriptionListDensity,
  type DescriptionListLayout,
} from "@/components/ui/description-list";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ServerIcon,
  Globe02Icon,
  Shield01Icon,
  CpuIcon,
  Clock01Icon,
  Tag01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function DescriptionListPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [variant, setVariant] = React.useState<DescriptionListVariant>("glass");
  const [density, setDensity] = React.useState<DescriptionListDensity>("default");
  const [layout, setLayout] = React.useState<DescriptionListLayout>("auto");
  const [divided, setDivided] = React.useState(true);
  const [containerWidth, setContainerWidth] = React.useState<"full" | "md" | "sm" | "xs">("full");

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setLayout("auto");
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
      label: "Layout",
      value: layout.toUpperCase(),
      variant: layout === "auto" ? "success" : "default",
    },
    {
      label: "Divided",
      value: divided ? "ENABLED" : "OFF",
      variant: divided ? "success" : "default",
    },
    {
      label: "Container",
      value:
        containerWidth === "xs"
          ? "NARROW (280px)"
          : containerWidth === "sm"
          ? "COMPACT (360px)"
          : containerWidth === "md"
          ? "MEDIUM (460px)"
          : "FLUID (100%)",
      variant: containerWidth === "xs" || containerWidth === "sm" ? "warning" : "default",
    },
  ];

  const codeString = `<DescriptionList
  variant="${variant}"
  density="${density}"
  layout="${layout}"${divided ? "\n  divided" : ""}
>
  <DescriptionListHeader>Cluster Infrastructure</DescriptionListHeader>

  <DescriptionListItem>
    <DescriptionListTerm>
      <HaloIcon icon={ServerIcon} size={14} className="text-muted-foreground" />
      <span>Cluster Identifier</span>
    </DescriptionListTerm>
    <DescriptionListDetails>
      <code className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">
        ap-south-edge-09
      </code>
    </DescriptionListDetails>
  </DescriptionListItem>

  <DescriptionListItem>
    <DescriptionListTerm>
      <HaloIcon icon={Globe02Icon} size={14} className="text-muted-foreground" />
      <span>Deployment Region</span>
    </DescriptionListTerm>
    <DescriptionListDetails>
      <span>Mumbai Central (ap-south-1)</span>
    </DescriptionListDetails>
  </DescriptionListItem>

  <DescriptionListItem>
    <DescriptionListTerm>
      <HaloIcon icon={Shield01Icon} size={14} className="text-muted-foreground" />
      <span>Health Status</span>
    </DescriptionListTerm>
    <DescriptionListDetails>
      <StatusBadge tone="positive">Operational · 99.99%</StatusBadge>
    </DescriptionListDetails>
  </DescriptionListItem>

  <DescriptionListItem>
    <DescriptionListTerm>
      <HaloIcon icon={CpuIcon} size={14} className="text-muted-foreground" />
      <span>Runtime Platform</span>
    </DescriptionListTerm>
    <DescriptionListDetails>
      <Badge variant="outline">V8 Isolated Worker</Badge>
    </DescriptionListDetails>
  </DescriptionListItem>

  <DescriptionListItem>
    <DescriptionListTerm>
      <HaloIcon icon={UserCheck01Icon} size={14} className="text-muted-foreground" />
      <span>Site Reliability Lead</span>
    </DescriptionListTerm>
    <DescriptionListDetails>
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Elena Rostova" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <span className="font-medium">Elena Rostova</span>
      </div>
    </DescriptionListDetails>
  </DescriptionListItem>
</DescriptionList>`;

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={telemetry}
      code={codeString}
      controls={
        <div className="space-y-3 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
            <StageControlSelect
              label="Surface Variant"
              value={variant}
              onChange={(val) => setVariant(val as DescriptionListVariant)}
              options={[
                { value: "glass", label: "Liquid Glass" },
                { value: "default", label: "Default (Calm/Flat)" },
                { value: "outline", label: "Outline" },
                { value: "muted", label: "Muted" },
                { value: "ghost", label: "Ghost" },
              ]}
            />

            <StageControlSelect
              label="Density"
              value={density}
              onChange={(val) => setDensity(val as DescriptionListDensity)}
              options={[
                { value: "default", label: "Default (12px)" },
                { value: "compact", label: "Compact (8px)" },
                { value: "relaxed", label: "Relaxed (16px)" },
              ]}
            />

            <StageControlSelect
              label="Layout Strategy"
              value={layout}
              onChange={(val) => setLayout(val as DescriptionListLayout)}
              options={[
                { value: "auto", label: "Auto Reflow (@container)" },
                { value: "horizontal", label: "Horizontal (2 Columns)" },
                { value: "vertical", label: "Vertical (Stacked)" },
              ]}
            />

            <div className="flex flex-col justify-between gap-1.5 p-2 sm:p-2.5 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors">
              <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none truncate block">
                Row Dividers
              </span>
              <div className="flex items-center gap-2 h-8 sm:h-8.5 px-1 sm:px-2">
                <Checkbox
                  id="dl-divided"
                  checked={divided}
                  onCheckedChange={(checked) => setDivided(Boolean(checked))}
                />
                <Label
                  htmlFor="dl-divided"
                  className="text-xs sm:text-[13px] text-foreground hover:text-foreground cursor-pointer font-medium select-none"
                >
                  Divided (divide-y)
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider select-none mr-1">
              Simulated Parent:
            </span>
            {[
              { id: "full", label: "Fluid (100%)" },
              { id: "md", label: "Medium (460px)" },
              { id: "sm", label: "Card / Drawer (360px)" },
              { id: "xs", label: "Narrow Sidebar (280px)" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setContainerWidth(btn.id as any)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
                  containerWidth === btn.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full transition-all duration-300 py-6 px-2 mx-auto",
          containerWidth === "xs" && "max-w-[280px]",
          containerWidth === "sm" && "max-w-[360px]",
          containerWidth === "md" && "max-w-[460px]",
          containerWidth === "full" && "max-w-xl"
        )}
      >
        <DescriptionList
          variant={variant}
          density={density}
          layout={layout}
          divided={divided}
          className="w-full"
        >
          <DescriptionListHeader>Cluster Infrastructure</DescriptionListHeader>

          <DescriptionListItem>
            <DescriptionListTerm>
              <HaloIcon icon={ServerIcon} size={14} className="text-muted-foreground" />
              <span>Cluster Identifier</span>
            </DescriptionListTerm>
            <DescriptionListDetails>
              <code className="text-xs font-mono bg-muted/60 px-1.5 py-0.5 rounded border border-border/60">
                ap-south-edge-09
              </code>
            </DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>
              <HaloIcon icon={Globe02Icon} size={14} className="text-muted-foreground" />
              <span>Deployment Region</span>
            </DescriptionListTerm>
            <DescriptionListDetails>
              <span>Mumbai Central (ap-south-1)</span>
            </DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>
              <HaloIcon icon={Shield01Icon} size={14} className="text-muted-foreground" />
              <span>Health Status</span>
            </DescriptionListTerm>
            <DescriptionListDetails>
              <StatusBadge tone="positive">Operational · 99.99% SLA</StatusBadge>
            </DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>
              <HaloIcon icon={CpuIcon} size={14} className="text-muted-foreground" />
              <span>Runtime Engine</span>
            </DescriptionListTerm>
            <DescriptionListDetails>
              <Badge variant="outline">V8 Isolated Worker</Badge>
            </DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>
              <HaloIcon icon={Clock01Icon} size={14} className="text-muted-foreground" />
              <span>Ingress Cold Start</span>
            </DescriptionListTerm>
            <DescriptionListDetails>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">12.4 ms (p99)</span>
            </DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>
              <HaloIcon icon={UserCheck01Icon} size={14} className="text-muted-foreground" />
              <span>On-Call Engineer</span>
            </DescriptionListTerm>
            <DescriptionListDetails>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Elena Rostova"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <span className="font-medium">Elena Rostova</span>
              </div>
            </DescriptionListDetails>
          </DescriptionListItem>
        </DescriptionList>
      </div>
    </PreviewStageShell>
  );
}
