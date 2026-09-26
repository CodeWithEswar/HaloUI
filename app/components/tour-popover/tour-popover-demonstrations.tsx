"use client";

import * as React from "react";
import {
  TourPopover,
  TourTarget,
  TourPopoverContent,
  type TourStep,
} from "@/components/ui/tour-popover";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PlayIcon,
  SparklesIcon,
  Search01Icon,
  Settings02Icon,
  Notification01Icon,
  Rocket01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  FilterIcon,
  SlidersHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function TourPopoverDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Single Step Instructional Anchor */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Single Step Instructional Anchor
          </h3>
          <p className="text-sm text-muted-foreground">
            A single contextual coachmark providing targeted instruction for a newly introduced feature or action control.
          </p>
        </div>

        <SingleStepDemo />
      </section>

      {/* 2. Collision & Edge Viewport Avoidance */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Boundary Collision & Edge Flipping
          </h3>
          <p className="text-sm text-muted-foreground">
            Targets placed directly adjacent to viewport corners automatically flip their placement and adjust alignment to prevent screen clipping.
          </p>
        </div>

        <CollisionDemo />
      </section>

      {/* 3. Missing Target Recovery Policy */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Missing Target Recovery
          </h3>
          <p className="text-sm text-muted-foreground">
            When a target element unmounts or is missing due to responsive conditions or async states, Tour Popover recovers gracefully with a centered fallback alert instead of throwing an error.
          </p>
        </div>

        <MissingTargetDemo />
      </section>

      {/* 4. Modal Scrim vs Non-Modal Guidance */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Modal Scrim vs Non-Modal Guidance
          </h3>
          <p className="text-sm text-muted-foreground">
            Non-modal tours leave the surrounding product interface clickable for explorative workflows. Modal tours apply a calibrated optical scrim for focused walkthroughs.
          </p>
        </div>

        <ModalityDemo />
      </section>

      {/* 5. Controlled Step Orchestration */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Controlled Step Orchestration
          </h3>
          <p className="text-sm text-muted-foreground">
            Synchronize the active tour step with external state machines, routing transitions, or tabs using controlled <code className="text-xs bg-muted px-1.5 py-0.5 rounded">currentStep</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">onStepChange</code>.
          </p>
        </div>

        <ControlledDemo />
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * DEMO 1: Single Step Coachmark
 * ----------------------------------------------------------------------- */
function SingleStepDemo() {
  const [open, setOpen] = React.useState(false);

  const steps: TourStep[] = [
    {
      id: "feature-filter",
      target: "feature-filter-btn",
      badge: "New Feature",
      title: "Semantic Filter Pipelines",
      description:
        "Chain multiple regex and classification filters with instant preview results. Use ⌥F to quickly open this panel.",
      side: "bottom",
      align: "start",
      finishLabel: "Got it!",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/10 p-8">
      <TourPopover steps={steps} open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-4">
          <TourTarget id="feature-filter-btn">
            <Button
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={() => setOpen(!open)}
            >
              <HaloIcon icon={FilterIcon} size={15} />
              <span>Filter Data</span>
            </Button>
          </TourTarget>

          <Button
            variant="default"
            size="sm"
            className="rounded-xl gap-1.5"
            onClick={() => setOpen(true)}
          >
            <HaloIcon icon={SparklesIcon} size={14} />
            <span>Show Feature Highlight</span>
          </Button>
        </div>

        <TourPopoverContent />
      </TourPopover>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * DEMO 2: Viewport Boundary Collision
 * ----------------------------------------------------------------------- */
function CollisionDemo() {
  const [open, setOpen] = React.useState(false);
  const [activeCorner, setActiveCorner] = React.useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">("top-left");

  const steps: TourStep[] = React.useMemo(
    () => [
      {
        id: `corner-${activeCorner}`,
        target: `corner-target-${activeCorner}`,
        badge: "Collision Aware",
        title: "Adaptive Boundary Flipping",
        description:
          "Even when the target is placed at the exact boundary of the viewport, the positioning engine automatically flips and shifts to prevent clipping.",
        side: activeCorner.startsWith("top") ? "top" : "bottom",
        align: activeCorner.endsWith("left") ? "start" : "end",
        finishLabel: "Understood",
      },
    ],
    [activeCorner]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Select Target Corner:</span>
        {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((corner) => (
          <Button
            key={corner}
            variant={activeCorner === corner ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs rounded-lg capitalize"
            onClick={() => {
              setActiveCorner(corner);
              setOpen(true);
            }}
          >
            {corner.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="relative h-64 w-full rounded-2xl border border-dashed border-border/70 bg-muted/15 p-4 overflow-hidden">
        <TourPopover steps={steps} open={open} onOpenChange={setOpen}>
          {/* Top-Left Target */}
          {activeCorner === "top-left" && (
            <div className="absolute top-3 left-3">
              <TourTarget id="corner-target-top-left">
                <Button size="sm" variant="outline" className="rounded-xl">
                  Top-Left Corner
                </Button>
              </TourTarget>
            </div>
          )}

          {/* Top-Right Target */}
          {activeCorner === "top-right" && (
            <div className="absolute top-3 right-3">
              <TourTarget id="corner-target-top-right">
                <Button size="sm" variant="outline" className="rounded-xl">
                  Top-Right Corner
                </Button>
              </TourTarget>
            </div>
          )}

          {/* Bottom-Left Target */}
          {activeCorner === "bottom-left" && (
            <div className="absolute bottom-3 left-3">
              <TourTarget id="corner-target-bottom-left">
                <Button size="sm" variant="outline" className="rounded-xl">
                  Bottom-Left Corner
                </Button>
              </TourTarget>
            </div>
          )}

          {/* Bottom-Right Target */}
          {activeCorner === "bottom-right" && (
            <div className="absolute bottom-3 right-3">
              <TourTarget id="corner-target-bottom-right">
                <Button size="sm" variant="outline" className="rounded-xl">
                  Bottom-Right Corner
                </Button>
              </TourTarget>
            </div>
          )}

          <div className="flex h-full items-center justify-center">
            <Button
              variant="default"
              size="sm"
              className="gap-2 rounded-xl"
              onClick={() => setOpen(!open)}
            >
              <HaloIcon icon={PlayIcon} size={14} />
              <span>{open ? "Reposition Popover" : "Test Corner Anchor"}</span>
            </Button>
          </div>

          <TourPopoverContent />
        </TourPopover>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * DEMO 3: Missing Target Recovery
 * ----------------------------------------------------------------------- */
function MissingTargetDemo() {
  const [open, setOpen] = React.useState(false);
  const [targetMounted, setTargetMounted] = React.useState(false);

  const steps: TourStep[] = [
    {
      id: "dynamic-async-control",
      target: targetMounted ? "mounted-control-id" : "unmounted-control-id",
      badge: "Target Recovery",
      title: "Asynchronous Feature Loading",
      description:
        "If a target fails to load or is unmounted before the step opens, the tour doesn't crash or disappear—it falls back to a centered viewport card with an alert indicator.",
      side: "bottom",
      align: "center",
      finishLabel: "Dismiss",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
        <div className="text-xs text-muted-foreground">
          Target element state:{" "}
          <span className={targetMounted ? "text-emerald-500 font-semibold" : "text-amber-500 font-semibold"}>
            {targetMounted ? "Mounted in DOM" : "Unmounted / Missing"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs rounded-lg"
            onClick={() => setTargetMounted(!targetMounted)}
          >
            {targetMounted ? "Simulate Unmount" : "Mount Target in DOM"}
          </Button>

          <Button
            variant="default"
            size="sm"
            className="h-8 text-xs rounded-lg"
            onClick={() => setOpen(true)}
          >
            Trigger Step
          </Button>
        </div>
      </div>

      <div className="flex h-48 items-center justify-center rounded-2xl border border-border/50 bg-background/50 p-6">
        <TourPopover
          steps={steps}
          open={open}
          onOpenChange={setOpen}
          missingTargetPolicy="fallback"
        >
          {targetMounted ? (
            <TourTarget id="mounted-control-id">
              <div className="flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <HaloIcon icon={CheckmarkCircle02Icon} size={16} />
                <span>Active Target Mounted Successfully</span>
              </div>
            </TourTarget>
          ) : (
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
              <HaloIcon icon={Alert02Icon} size={15} className="text-amber-500" />
              <span>Target element currently unmounted from DOM</span>
            </div>
          )}

          <TourPopoverContent />
        </TourPopover>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * DEMO 4: Modal vs Non-Modal Comparison
 * ----------------------------------------------------------------------- */
function ModalityDemo() {
  const [modal, setModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const steps: TourStep[] = [
    {
      id: "modality-target",
      target: "modality-btn",
      badge: modal ? "Modal Tour" : "Non-Modal Tour",
      title: modal ? "Focused Modal Walkthrough" : "Ambient Contextual Guidance",
      description: modal
        ? "The background is attenuated with a Halo Scrim to capture user focus and isolate onboarding steps."
        : "Surrounding interface controls remain completely interactive so users can explore while reading tips.",
      side: "bottom",
      align: "center",
      finishLabel: "Done",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
          <Button
            variant={!modal ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs rounded-lg"
            onClick={() => {
              setModal(false);
              setOpen(true);
            }}
          >
            Non-Modal Mode
          </Button>

          <Button
            variant={modal ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs rounded-lg"
            onClick={() => {
              setModal(true);
              setOpen(true);
            }}
          >
            Modal Mode (Halo Scrim)
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Ambient Click Count: <span className="font-semibold text-foreground">{counter}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/10 p-8 gap-4">
        <TourPopover steps={steps} open={open} onOpenChange={setOpen} modal={modal}>
          <div className="flex items-center gap-3">
            <TourTarget id="modality-btn">
              <Button
                variant="outline"
                className="gap-2 rounded-xl"
                onClick={() => setOpen(!open)}
              >
                <HaloIcon icon={SlidersHorizontalIcon} size={15} />
                <span>Targeted Setting</span>
              </Button>
            </TourTarget>

            {/* Background Control to test ambient clickability */}
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl"
              onClick={() => setCounter((c) => c + 1)}
            >
              Click Me During Tour ({counter})
            </Button>
          </div>

          <TourPopoverContent />
        </TourPopover>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * DEMO 5: Controlled Step Orchestration
 * ----------------------------------------------------------------------- */
function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);

  const steps: TourStep[] = [
    {
      id: "tab-dashboard",
      target: "tab-dash-btn",
      title: "Dashboard Overview",
      description: "Aggregated metrics on cluster health and throughput.",
      side: "bottom",
      align: "start",
    },
    {
      id: "tab-analytics",
      target: "tab-analytics-btn",
      title: "Real-time Telemetry",
      description: "Streaming telemetry queries and anomaly detection.",
      side: "bottom",
      align: "center",
    },
    {
      id: "tab-settings",
      target: "tab-settings-btn",
      title: "Access Permissions",
      description: "Manage role-based authentication and service tokens.",
      side: "bottom",
      align: "end",
      finishLabel: "Finish",
    },
  ];

  return (
    <div className="space-y-4">
      {/* External Controller Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Jump directly to:</span>
          {["Dashboard", "Analytics", "Settings"].map((name, idx) => (
            <Button
              key={name}
              variant={stepIndex === idx && open ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs rounded-lg"
              onClick={() => {
                setStepIndex(idx);
                setOpen(true);
              }}
            >
              Step {idx + 1}: {name}
            </Button>
          ))}
        </div>

        <Button
          variant={open ? "ghost" : "default"}
          size="sm"
          className="h-7 text-xs rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close Tour" : "Start Tour"}
        </Button>
      </div>

      <div className="flex items-center justify-center rounded-2xl border border-border/50 bg-muted/10 p-8">
        <TourPopover
          steps={steps}
          open={open}
          onOpenChange={setOpen}
          currentStep={stepIndex}
          onStepChange={(newIdx) => setStepIndex(newIdx)}
        >
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/80 p-2 shadow-sm">
            <TourTarget id="tab-dash-btn">
              <Button
                variant={stepIndex === 0 && open ? "secondary" : "ghost"}
                size="sm"
                className="rounded-lg text-xs"
                onClick={() => {
                  setStepIndex(0);
                  setOpen(true);
                }}
              >
                Dashboard
              </Button>
            </TourTarget>

            <TourTarget id="tab-analytics-btn">
              <Button
                variant={stepIndex === 1 && open ? "secondary" : "ghost"}
                size="sm"
                className="rounded-lg text-xs"
                onClick={() => {
                  setStepIndex(1);
                  setOpen(true);
                }}
              >
                Analytics
              </Button>
            </TourTarget>

            <TourTarget id="tab-settings-btn">
              <Button
                variant={stepIndex === 2 && open ? "secondary" : "ghost"}
                size="sm"
                className="rounded-lg text-xs"
                onClick={() => {
                  setStepIndex(2);
                  setOpen(true);
                }}
              >
                Settings
              </Button>
            </TourTarget>
          </div>

          <TourPopoverContent />
        </TourPopover>
      </div>
    </div>
  );
}
