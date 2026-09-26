"use client";

import * as React from "react";
import {
  TourPopover,
  TourTarget,
  TourPopoverContent,
  type TourStep,
  type TourPopoverIntensity,
  type MissingTargetPolicy,
} from "@/components/ui/tour-popover";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  Compass01Icon,
  Search01Icon,
  Notification01Icon,
  Rocket01Icon,
  CheckmarkCircle02Icon,
  Settings02Icon,
  PlayIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export function TourPopoverPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Tour configuration state
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [intensity, setIntensity] = React.useState<TourPopoverIntensity>("balanced");
  const [modal, setModal] = React.useState(false);
  const [missingTargetPolicy, setMissingTargetPolicy] = React.useState<MissingTargetPolicy>("fallback");
  const [simulateMissingTarget, setSimulateMissingTarget] = React.useState(false);
  const [lastEvent, setLastEvent] = React.useState<string | null>(null);

  // Define guided tour steps
  const steps: TourStep[] = React.useMemo(
    () => [
      {
        id: "workspace-nav",
        target: "workspace-nav",
        badge: "Navigation",
        title: "Navigate your workspace",
        description:
          "Quickly toggle between projects, analytics pipelines, and team environments from the unified switcher.",
        side: "bottom",
        align: "start",
        nextLabel: "Next: Search",
      },
      {
        id: "global-search",
        target: "global-search",
        badge: "Discovery",
        title: "Omnisearch across all assets",
        description:
          "Press ⌘K or click to instantly search components, team members, design tokens, and documentation.",
        side: "bottom",
        align: "center",
        nextLabel: "Next: Alerts",
      },
      {
        id: "alerts-bell",
        target: "alerts-bell",
        badge: "Activity",
        title: "Real-time activity alerts",
        description:
          "Stay informed on continuous integration runs, pull request comments, and production deployment health.",
        side: "bottom",
        align: "end",
        nextLabel: "Next: Deploy",
      },
      {
        id: "deploy-action",
        target: simulateMissingTarget ? "non-existent-target-id" : "deploy-action",
        badge: "Release",
        title: "One-click deployment",
        description:
          "Trigger zero-downtime production canary releases directly into global edge infrastructure.",
        side: "bottom",
        align: "end",
        finishLabel: "Finish Tour",
      },
    ],
    [simulateMissingTarget]
  );

  const handleReset = () => {
    setIsOpen(false);
    setCurrentStepIndex(0);
    setIntensity("balanced");
    setModal(false);
    setMissingTargetPolicy("fallback");
    setSimulateMissingTarget(false);
    setBackdrop("mesh");
    setViewport("desktop");
    setLastEvent(null);
  };

  const currentStep = steps[currentStepIndex];

  // Dynamic telemetry
  const telemetry: TelemetryItem[] = [
    {
      label: "Tour Status",
      value: isOpen ? `Step ${currentStepIndex + 1} of ${steps.length}` : "Idle (Closed)",
      variant: isOpen ? "success" : "default",
    },
    {
      label: "Active Target",
      value: isOpen
        ? simulateMissingTarget && currentStepIndex === 3
          ? "Missing (Fallback Centered)"
          : currentStep?.target?.toString() || "None"
        : "None",
      variant: simulateMissingTarget && currentStepIndex === 3 && isOpen ? "warning" : "default",
    },
    {
      label: "Modality",
      value: modal ? "Modal (Scrim Active)" : "Non-Modal (Ambient)",
    },
    {
      label: "Material",
      value: `Liquid ${intensity.charAt(0).toUpperCase() + intensity.slice(1)}`,
    },
  ];

  const generatedCode = React.useMemo(() => {
    return `import * as React from "react";
import {
  TourPopover,
  TourTarget,
  TourPopoverContent,
  type TourStep,
} from "@/components/ui/tour-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Notification01Icon, Rocket01Icon } from "@hugeicons/core-free-icons";

const TOUR_STEPS: TourStep[] = [
  {
    id: "workspace-nav",
    target: "workspace-nav",
    badge: "Navigation",
    title: "Navigate your workspace",
    description: "Switch between projects and analytics pipelines from the unified switcher.",
    side: "bottom",
    align: "start",
  },
  {
    id: "global-search",
    target: "global-search",
    badge: "Discovery",
    title: "Omnisearch across all assets",
    description: "Press ⌘K or click to search components, members, and documentation.",
    side: "bottom",
    align: "center",
  },
  {
    id: "alerts-bell",
    target: "alerts-bell",
    badge: "Activity",
    title: "Real-time activity alerts",
    description: "Stay informed on CI runs, comments, and production deployment health.",
    side: "bottom",
    align: "end",
  },
  {
    id: "deploy-action",
    target: "deploy-action",
    badge: "Release",
    title: "One-click deployment",
    description: "Trigger zero-downtime production canary releases to global edge nodes.",
    side: "bottom",
    align: "end",
    finishLabel: "Finish Tour",
  },
];

export function ProductOnboardingTour() {
  const [open, setOpen] = React.useState(false);

  return (
    <TourPopover
      steps={TOUR_STEPS}
      open={open}
      onOpenChange={setOpen}
      modal={${modal}}
      intensity="${intensity}"
      missingTargetPolicy="${missingTargetPolicy}"
      onComplete={() => console.log("Tour completed successfully")}
      onSkip={() => console.log("Tour skipped by user")}
    >
      <div className="flex items-center justify-between p-4 border rounded-xl">
        {/* Step 1 Target */}
        <TourTarget id="workspace-nav">
          <Button variant="outline" size="sm">Acme Corp ▾</Button>
        </TourTarget>

        {/* Step 2 Target */}
        <TourTarget id="global-search">
          <Input placeholder="Search anything... (⌘K)" className="w-64" />
        </TourTarget>

        <div className="flex items-center gap-2">
          {/* Step 3 Target */}
          <TourTarget id="alerts-bell">
            <IconButton variant="ghost" aria-label="Notifications">
              <HaloIcon icon={Notification01Icon} size={16} />
            </IconButton>
          </TourTarget>

          {/* Step 4 Target */}
          <TourTarget id="deploy-action">
            <Button variant="default" size="sm">
              <HaloIcon icon={Rocket01Icon} size={14} />
              <span>Deploy</span>
            </Button>
          </TourTarget>
        </div>
      </div>

      {/* Start Tour Trigger */}
      <Button onClick={() => setOpen(true)} className="mt-4">
        Start Guided Tour
      </Button>

      {/* Liquid Glass Anchored Tour Popover */}
      <TourPopoverContent />
    </TourPopover>
  );
}`;
  }, [modal, intensity, missingTargetPolicy]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Material Intensity"
            value={intensity}
            onValueChange={(val) => setIntensity(val as TourPopoverIntensity)}
            options={[
              { label: "Balanced (Recommended)", value: "balanced" },
              { label: "Subtle", value: "subtle" },
              { label: "Rich", value: "rich" },
            ]}
          />

          <StageControlSelect
            label="Modality"
            value={modal ? "modal" : "non-modal"}
            onValueChange={(val) => setModal(val === "modal")}
            options={[
              { label: "Non-modal (Ambient UI Clickable)", value: "non-modal" },
              { label: "Modal (Halo Scrim Attenuation)", value: "modal" },
            ]}
          />

          <StageControlSelect
            label="Target Recovery Policy"
            value={missingTargetPolicy}
            onValueChange={(val) => setMissingTargetPolicy(val as MissingTargetPolicy)}
            options={[
              { label: "Fallback (Centered Popover)", value: "fallback" },
              { label: "Skip (Auto-advance)", value: "skip" },
              { label: "Stop (Close gracefully)", value: "stop" },
            ]}
          />

          <div className="flex flex-col justify-between gap-1.5 p-2 sm:p-2.5 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors">
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none truncate">
              Missing Target Simulation
            </span>
            <Button
              variant={simulateMissingTarget ? "destructive" : "outline"}
              size="sm"
              className="h-8 sm:h-8.5 w-full text-xs font-normal justify-center rounded-lg"
              onClick={() => setSimulateMissingTarget(!simulateMissingTarget)}
            >
              {simulateMissingTarget ? "Simulating Target 4 Missing" : "All Targets Available"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex w-full flex-col items-center justify-center p-1 sm:p-2">
        {/* Guided Tour Context */}
        <TourPopover
          steps={steps}
          open={isOpen}
          onOpenChange={setIsOpen}
          currentStep={currentStepIndex}
          scrollToTarget={false}
          onStepChange={(idx) => {
            setCurrentStepIndex(idx);
            setLastEvent(`Advanced to Step ${idx + 1}`);
          }}
          onComplete={() => {
            setLastEvent("Completed all onboarding steps");
          }}
          onSkip={() => {
            setLastEvent("Tour dismissed by user");
          }}
          onMissingTarget={(step) => {
            setLastEvent(`Target missing for step: "${step.id}"`);
          }}
          modal={modal}
          intensity={intensity}
          missingTargetPolicy={missingTargetPolicy}
        >
          {/* Mock Application Dashboard Interface */}
          <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background/80 p-3.5 sm:p-4.5 shadow-xl backdrop-blur-md">
            {/* Top Bar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                {/* Step 1 Target: Workspace Switcher */}
                <TourTarget id="workspace-nav">
                  <div
                    tabIndex={0}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <HaloIcon icon={Compass01Icon} size={15} className="text-primary" />
                    <span>Acme Edge Cloud</span>
                    <span className="text-[10px] text-muted-foreground">▾</span>
                  </div>
                </TourTarget>

                <Badge variant="outline" className="hidden sm:inline-flex text-[10px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  Production v2.4
                </Badge>
              </div>

              {/* Step 2 Target: Search Input */}
              <div className="flex flex-1 items-center justify-center max-w-xs mx-auto">
                <TourTarget id="global-search">
                  <div className="relative w-full">
                    <HaloIcon
                      icon={Search01Icon}
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                    <Input
                      placeholder="Search assets, tokens... (⌘K)"
                      className="h-8 pl-8 text-xs rounded-xl bg-background/60"
                      readOnly
                    />
                  </div>
                </TourTarget>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                {/* Step 3 Target: Notification Bell */}
                <TourTarget id="alerts-bell">
                  <IconButton
                    variant="outline"
                    size="sm"
                    aria-label="Activity alerts"
                    className="size-8 rounded-xl"
                  >
                    <HaloIcon icon={Notification01Icon} size={15} />
                  </IconButton>
                </TourTarget>

                {/* Step 4 Target: Deploy Action (can be simulated missing) */}
                {!simulateMissingTarget ? (
                  <TourTarget id="deploy-action">
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 gap-1.5 px-3 rounded-xl text-xs"
                    >
                      <HaloIcon icon={Rocket01Icon} size={13} />
                      <span>Deploy</span>
                    </Button>
                  </TourTarget>
                ) : (
                  <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-600 dark:text-amber-400">
                    <span className="italic">Deploy Button Hidden</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dashboard Content Mock */}
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="rounded-xl border border-border/40 bg-muted/20 p-2.5 sm:p-3">
                <div className="text-[11px] font-medium text-muted-foreground">Active Nodes</div>
                <div className="mt-1 text-lg font-bold text-foreground">1,248</div>
                <div className="mt-0.5 text-[10px] text-emerald-500 font-medium">99.99% availability</div>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 p-2.5 sm:p-3">
                <div className="text-[11px] font-medium text-muted-foreground">Requests / sec</div>
                <div className="mt-1 text-lg font-bold text-foreground">48.2k</div>
                <div className="mt-0.5 text-[10px] text-sky-500 font-medium">Global CDN cached</div>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 p-2.5 sm:p-3">
                <div className="text-[11px] font-medium text-muted-foreground">Latency p95</div>
                <div className="mt-1 text-lg font-bold text-foreground">12ms</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">Tokyo, Frankfurt, SFO</div>
              </div>
            </div>

            {/* Launch Tour Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 rounded-xl"
                  onClick={() => setIsOpen(true)}
                >
                  <HaloIcon icon={isOpen ? SparklesIcon : PlayIcon} size={14} />
                  <span>{isOpen ? "Restart Tour" : "Start Guided Tour"}</span>
                </Button>

                {isOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Close Tour
                  </Button>
                )}
              </div>

              {lastEvent && (
                <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2.5 py-1 rounded-md">
                  {lastEvent}
                </div>
              )}
            </div>
          </div>

          {/* Liquid Glass Anchored Tour Popover */}
          <TourPopoverContent />
        </TourPopover>
      </div>
    </PreviewStageShell>
  );
}
