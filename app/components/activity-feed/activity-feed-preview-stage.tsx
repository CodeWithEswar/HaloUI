"use client";

import * as React from "react";
import {
  ActivityFeed,
  ActivityFeedItem,
  ActivityFeedIndicator,
  ActivityFeedContent,
  ActivityFeedHeader,
  ActivityFeedTitle,
  ActivityFeedTimestamp,
  ActivityFeedMetadata,
  ActivityFeedActions,
  ActivityFeedSeparator,
  type ActivityFeedVariant,
  type ActivityFeedDensity,
} from "@/components/ui/activity-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  GitPullRequestIcon,
  ServerIcon,
  Shield01Icon,
  CheckmarkCircle02Icon,
  GitCommitIcon,
  CloudSavingDone02Icon,
  BotIcon,
} from "@hugeicons/core-free-icons";
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

export function ActivityFeedPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Activity Feed configuration states
  const [variant, setVariant] = React.useState<ActivityFeedVariant>("glass");
  const [density, setDensity] = React.useState<ActivityFeedDensity>("default");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongText, setHasLongText] = React.useState(false);
  const [showActions, setShowActions] = React.useState(true);
  const [showBadges, setShowBadges] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setContainerWidth("full");
    setHasLongText(false);
    setShowActions(true);
    setShowBadges(true);
    setBackdrop("mesh");
    setViewport("desktop");
  };

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
        return "max-w-xl";
    }
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
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Semantics",
      value: "role='feed' / <article>",
      variant: "success",
    },
  ];

  const codeSnippet = `<ActivityFeed variant="${variant}" density="${density}">
  <ActivityFeedItem>
    <ActivityFeedIndicator>
      <Avatar className="size-8">
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="Elena" />
        <AvatarFallback>EL</AvatarFallback>
      </Avatar>
    </ActivityFeedIndicator>
    <ActivityFeedContent>
      <ActivityFeedHeader>
        <ActivityFeedTitle>
          <strong>Elena Rostova</strong> merged Pull Request <strong>#482</strong> into <code>main</code>
        </ActivityFeedTitle>
        <ActivityFeedTimestamp>4m ago</ActivityFeedTimestamp>
      </ActivityFeedHeader>
      <ActivityFeedMetadata>
        Added liquid glass optical edge diffraction shaders to core surface renderer.
      </ActivityFeedMetadata>
      <ActivityFeedActions>
        <Button variant="outline" size="xs">View PR #482</Button>
      </ActivityFeedActions>
    </ActivityFeedContent>
  </ActivityFeedItem>

  <ActivityFeedSeparator />

  <ActivityFeedItem>
    <ActivityFeedIndicator icon={<HaloIcon icon={BotIcon} size={16} />} />
    <ActivityFeedContent>
      <ActivityFeedHeader>
        <ActivityFeedTitle>
          <strong>GitHub Actions</strong> deployed Canary release to <strong>production-edge</strong>
        </ActivityFeedTitle>
        <ActivityFeedTimestamp>24m ago</ActivityFeedTimestamp>
      </ActivityFeedHeader>
      <ActivityFeedMetadata>
        Health checks verified across 14 sovereign global clusters.
      </ActivityFeedMetadata>
    </ActivityFeedContent>
  </ActivityFeedItem>
</ActivityFeed>`;

  return (
    <PreviewStageShell
      title="Activity Feed"
      description="Scannable recent activity stream engineered with semantic articles, actor identity preservation, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics."
      badge="Data Display 18"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={telemetry}
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Material Variant"
              value={variant}
              onValueChange={(val) => setVariant(val as ActivityFeedVariant)}
              options={[
                { value: "glass", label: "Glass (Liquid)" },
                { value: "default", label: "Default" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
            <StageControlSelect
              label="Spatial Density"
              value={density}
              onValueChange={(val) => setDensity(val as ActivityFeedDensity)}
              options={[
                { value: "compact", label: "Compact" },
                { value: "default", label: "Default" },
                { value: "relaxed", label: "Relaxed" },
              ]}
            />
            <StageControlSelect
              label="Simulated Width"
              value={containerWidth}
              onValueChange={setContainerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="activity-toggle-long"
                checked={hasLongText}
                onCheckedChange={(checked) => setHasLongText(Boolean(checked))}
              />
              <Label
                htmlFor="activity-toggle-long"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Long Actor &amp; Event Text
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="activity-toggle-actions"
                checked={showActions}
                onCheckedChange={(checked) => setShowActions(Boolean(checked))}
              />
              <Label
                htmlFor="activity-toggle-actions"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Contextual Actions
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="activity-toggle-badges"
                checked={showBadges}
                onCheckedChange={(checked) => setShowBadges(Boolean(checked))}
              />
              <Label
                htmlFor="activity-toggle-badges"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Status Badges
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6 px-2 sm:px-4 min-h-[320px]">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-out mx-auto",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <ActivityFeed variant={variant} density={density}>
            {/* Entry 1: Human User Action */}
            <ActivityFeedItem>
              <ActivityFeedIndicator>
                <Avatar className="size-8 sm:size-9">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                    alt="Elena Rostova"
                  />
                  <AvatarFallback>EL</AvatarFallback>
                </Avatar>
              </ActivityFeedIndicator>
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>
                        {hasLongText
                          ? "Dr. Elena Rostova-Kowalski (Senior Staff Infrastructure Systems Architect)"
                          : "Elena Rostova"}
                      </strong>{" "}
                      merged Pull Request <strong>#482</strong> into <code>main</code>
                    </ActivityFeedTitle>
                    {showBadges && <StatusBadge tone="positive">Merged</StatusBadge>}
                  </div>
                  <ActivityFeedTimestamp>4m ago</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  {hasLongText
                    ? "Upgraded the 10-layer physical liquid optical engine across high-density container layouts with zero-runtime client resize observers, preserving strict WCAG 2.1 AA text contrast and 200% zoom compliance."
                    : "Added liquid glass optical edge diffraction shaders to core surface renderer."}
                </ActivityFeedMetadata>
                {showActions && (
                  <ActivityFeedActions>
                    <Button variant="outline" size="xs">
                      View PR #482
                    </Button>
                    <Button variant="ghost" size="xs">
                      Diff Changes
                    </Button>
                  </ActivityFeedActions>
                )}
              </ActivityFeedContent>
            </ActivityFeedItem>

            <ActivityFeedSeparator />

            {/* Entry 2: Automated Bot / System Activity */}
            <ActivityFeedItem>
              <ActivityFeedIndicator icon={<HaloIcon icon={BotIcon} size={16} />} />
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>GitHub CI Bot</strong> deployed build <strong>#1,492</strong> to{" "}
                      <code>canary-ord</code>
                    </ActivityFeedTitle>
                    {showBadges && <Badge variant="secondary">Automated</Badge>}
                  </div>
                  <ActivityFeedTimestamp>24m ago</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  Canary ingress health checks validated across 14 sovereign global clusters.
                </ActivityFeedMetadata>
              </ActivityFeedContent>
            </ActivityFeedItem>

            <ActivityFeedSeparator />

            {/* Entry 3: Infrastructure / Security System */}
            <ActivityFeedItem>
              <ActivityFeedIndicator icon={<HaloIcon icon={Shield01Icon} size={16} />} />
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>Security Vault KMS</strong> completed scheduled cryptographic rotation
                    </ActivityFeedTitle>
                    {showBadges && <StatusBadge tone="neutral">Audited</StatusBadge>}
                  </div>
                  <ActivityFeedTimestamp>2h ago</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  Hardware Security Module keys verified and replicated to US-West disaster recovery.
                </ActivityFeedMetadata>
                {showActions && (
                  <ActivityFeedActions>
                    <Button variant="ghost" size="xs">
                      Audit Logs
                    </Button>
                  </ActivityFeedActions>
                )}
              </ActivityFeedContent>
            </ActivityFeedItem>
          </ActivityFeed>
        </div>
      </div>
    </PreviewStageShell>
  );
}
