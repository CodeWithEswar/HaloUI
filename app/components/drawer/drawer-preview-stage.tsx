"use client";

import * as React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  type DrawerIntensity,
  type DrawerScrimBlur,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PlayIcon,
  PauseIcon,
  Share01Icon,
  UserIcon,
  FilterIcon,
  Copy01Icon,
  CheckmarkCircle02Icon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type DemoScenario = "media" | "share" | "profile" | "filters";
type SwipeDirection = "down" | "up" | "right" | "left";
type SnapConfig = "none" | "two-step" | "three-step";

export function DrawerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Drawer configuration state
  const [isOpen, setIsOpen] = React.useState(false);
  const [scenario, setScenario] = React.useState<DemoScenario>("media");
  const [direction, setDirection] = React.useState<SwipeDirection>("down");
  const [intensity, setIntensity] = React.useState<DrawerIntensity>("balanced");
  const [snapConfig, setSnapConfig] = React.useState<SnapConfig>("none");
  const [showSwipeHandle, setShowSwipeHandle] = React.useState<boolean>(true);
  const [scrimBlur, setScrimBlur] = React.useState<DrawerScrimBlur>("balanced");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [actionFeedback, setActionFeedback] = React.useState<string | null>(null);

  const snapPoints = React.useMemo(() => {
    if (snapConfig === "two-step") return ["320px", 1];
    if (snapConfig === "three-step") return ["220px", "520px", 1];
    return undefined;
  }, [snapConfig]);

  const handleReset = () => {
    setDirection("down");
    setIntensity("balanced");
    setSnapConfig("none");
    setShowSwipeHandle(true);
    setScrimBlur("balanced");
    setScenario("media");
    setBackdrop("mesh");
    setViewport("desktop");
    setIsOpen(false);
    setActionFeedback(null);
  };

  const generatedCode = React.useMemo(() => {
    const dirProp = direction !== "down" ? ` swipeDirection="${direction}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const handleProp = !showSwipeHandle ? ` showSwipeHandle={false}` : "";
    const snapProp =
      snapConfig === "two-step"
        ? ' snapPoints={["320px", 1]}'
        : snapConfig === "three-step"
        ? ' snapPoints={["220px", "520px", 1]}'
        : "";
    const blurProp = scrimBlur !== "balanced" ? ` scrimBlur="${scrimBlur}"` : "";

    if (scenario === "share") {
      return `import * as React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Share01Icon, Copy01Icon } from "@hugeicons/core-free-icons";

export function ShareDrawer() {
  return (
    <Drawer${dirProp}${handleProp}${snapProp}${intensityProp}>
      <DrawerTrigger render={<Button variant="outline" />}>
        <HaloIcon icon={Share01Icon} size={16} />
        Share Project
      </DrawerTrigger>
      <DrawerContent${blurProp}>
        <DrawerHeader>
          <DrawerTitle>Share Artifact</DrawerTitle>
          <DrawerDescription>
            Invite teammates or generate a signed liquid optical preview link.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value="https://haloui.dev/artifacts/preview-9x2"
              className="h-10 flex-1 rounded-xl border border-border/80 bg-background/80 px-3 text-sm font-mono text-muted-foreground"
            />
            <Button variant="default" size="sm">
              <HaloIcon icon={Copy01Icon} size={15} />
              Copy
            </Button>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Dismiss</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`;
    }

    return `import * as React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { PlayIcon, VolumeHighIcon } from "@hugeicons/core-free-icons";

export function MediaDrawer() {
  return (
    <Drawer${dirProp}${handleProp}${snapProp}${intensityProp}>
      <DrawerTrigger render={<Button variant="default" />}>
        <HaloIcon icon={PlayIcon} size={16} />
        Now Playing
      </DrawerTrigger>
      <DrawerContent${blurProp}>
        <DrawerHeader>
          <DrawerTitle>Liquid Synthesizer Session</DrawerTitle>
          <DrawerDescription>
            Halo Acoustic Engine · 24-bit 96kHz Lossless Spatial Audio
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="h-32 w-full rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="font-mono text-xs tracking-wider text-primary font-medium">
              WAVEFORM 0.88 REFRACTION
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <HaloIcon icon={PlayIcon} size={16} />
              Play
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <HaloIcon icon={VolumeHighIcon} size={16} />
              <span>Spatial Stereo</span>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`;
  }, [scenario, direction, intensity, showSwipeHandle, snapConfig, scrimBlur]);

  const telemetry = [
    { label: "Direction", value: direction },
    { label: "Snap Mode", value: snapConfig },
    { label: "Material", value: intensity },
    { label: "Scrim Blur", value: scrimBlur },
    { label: "Swipe Handle", value: showSwipeHandle ? "Visible" : "Hidden" },
    { label: "State", value: isOpen ? "Open (Portalled)" : "Closed" },
  ];

  const controls = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as DemoScenario)}
        options={[
          { label: "Media Player (Audio Queue)", value: "media" },
          { label: "Share & Permissions Sheet", value: "share" },
          { label: "Account & Profile Switcher", value: "profile" },
          { label: "Data Facet Filters", value: "filters" },
        ]}
      />
      <StageControlSelect
        label="Swipe Direction"
        value={direction}
        onValueChange={(v) => setDirection(v as SwipeDirection)}
        options={[
          { label: "Down (Bottom Sheet)", value: "down" },
          { label: "Up (Top Sheet)", value: "up" },
          { label: "Right (Right Drawer)", value: "right" },
          { label: "Left (Left Drawer)", value: "left" },
        ]}
      />
      <StageControlSelect
        label="Snap Points"
        value={snapConfig}
        onValueChange={(v) => setSnapConfig(v as SnapConfig)}
        options={[
          { label: "None (Single Height)", value: "none" },
          { label: "2-Step (Peek + Full)", value: "two-step" },
          { label: "3-Step (Mini + Mid + Full)", value: "three-step" },
        ]}
      />
      <StageControlSelect
        label="Material Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as DrawerIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Specular Glow)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Swipe Handle"
        value={showSwipeHandle ? "show" : "hide"}
        onValueChange={(v) => setShowSwipeHandle(v === "show")}
        options={[
          { label: "Visible (Capsule Pill)", value: "show" },
          { label: "Hidden (Clean Edge)", value: "hide" },
        ]}
      />
      <StageControlSelect
        label="Scrim Blur"
        value={scrimBlur}
        onValueChange={(v) => setScrimBlur(v as DrawerScrimBlur)}
        options={[
          { label: "Balanced (8px)", value: "balanced" },
          { label: "Subtle (4px)", value: "subtle" },
          { label: "Deep (16px)", value: "deep" },
          { label: "None (0px)", value: "none" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Drawer Live Preview Stage"
      description="Gesture-driven contextual surface powered by Base UI Drawer, featuring dynamic velocity swipe dismissal, snap points, safe area insets, and 10-layer Liquid Glass optical physics."
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
                scenario === "media"
                  ? PlayIcon
                  : scenario === "share"
                  ? Share01Icon
                  : scenario === "profile"
                  ? UserIcon
                  : FilterIcon
              }
              size={24}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {scenario === "media"
                ? "Lossless Spatial Media Sheet"
                : scenario === "share"
                ? "Cryptographic Artifact Share"
                : scenario === "profile"
                ? "User Identity & Workspace"
                : "Contextual Telemetry Filters"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drag, swipe, or press escape to interact. Built-in touch physics respect velocity thresholds and safe-area geometry.
            </p>
          </div>

          <div>
            <Drawer
              open={isOpen}
              onOpenChange={setIsOpen}
              swipeDirection={direction}
              snapPoints={snapPoints}
              showSwipeHandle={showSwipeHandle}
              intensity={intensity}
            >
              <DrawerTrigger render={<Button variant="default" size="default" />}>
                <HaloIcon
                  icon={
                    scenario === "media"
                      ? PlayIcon
                      : scenario === "share"
                      ? Share01Icon
                      : scenario === "profile"
                      ? UserIcon
                      : FilterIcon
                  }
                  size={16}
                />
                <span>
                  Open {direction === "down" ? "Bottom Drawer" : direction === "up" ? "Top Drawer" : `${direction.toUpperCase()} Drawer`}
                </span>
              </DrawerTrigger>

              <DrawerContent
                scrimBlur={scrimBlur}
                className={
                  direction === "down" || direction === "up"
                    ? "max-w-2xl"
                    : "max-w-md"
                }
              >
                {scenario === "media" ? (
                  <>
                    <DrawerHeader>
                      <DrawerTitle>Halo Acoustic Session</DrawerTitle>
                      <DrawerDescription>
                        24-bit 96kHz Lossless Spatial Audio Engine · Active Node #04
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 sm:px-6 py-3 space-y-4 text-left">
                      <div className="relative h-28 w-full rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-background/40 to-muted/20 flex flex-col items-center justify-center p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          {[40, 75, 30, 95, 60, 85, 45, 100, 70, 50, 80, 65].map((h, i) => (
                            <div
                              key={i}
                              style={{ height: `${isPlaying ? h : Math.max(12, h * 0.25)}%` }}
                              className="w-1.5 rounded-full bg-primary/70 transition-all duration-300"
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          REFRACTION COHERENCE: 99.4%
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3">
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-foreground">Spatial Audio Renderer</p>
                          <p className="text-[11px] text-muted-foreground">Dynamic binaural head-tracking</p>
                        </div>
                        <Button
                          variant={isPlaying ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          <HaloIcon icon={isPlaying ? PauseIcon : PlayIcon} size={15} />
                          <span>{isPlaying ? "Pause" : "Play"}</span>
                        </Button>
                      </div>
                    </div>

                    <DrawerFooter>
                      <DrawerClose render={<Button variant="outline" />}>
                        Dismiss
                      </DrawerClose>
                      <Button
                        variant="default"
                        onClick={() => {
                          setActionFeedback("Audio session pinned to ambient widget.");
                          setIsOpen(false);
                        }}
                      >
                        Keep in Background
                      </Button>
                    </DrawerFooter>
                  </>
                ) : scenario === "share" ? (
                  <>
                    <DrawerHeader>
                      <DrawerTitle>Share Artifact</DrawerTitle>
                      <DrawerDescription>
                        Generate cryptographically verified links for peer review.
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 sm:px-6 py-3 space-y-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">
                          Public Preview URL
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value="https://haloui.dev/inspect/preview-token-x912"
                            className="h-9 flex-1 rounded-xl border border-border/80 bg-background/80 px-3 font-mono text-xs text-muted-foreground outline-none"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActionFeedback("URL copied to clipboard.")}
                          >
                            <HaloIcon icon={Copy01Icon} size={15} />
                            <span>Copy</span>
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-background/80 p-3 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">Expiring Access</span>
                          <span className="text-muted-foreground font-mono">24 Hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">Liquid Shader Compilation</span>
                          <span className="text-emerald-500 font-mono">Enabled</span>
                        </div>
                      </div>
                    </div>

                    <DrawerFooter>
                      <DrawerClose render={<Button variant="outline" />}>
                        Cancel
                      </DrawerClose>
                      <Button
                        variant="default"
                        onClick={() => {
                          setActionFeedback("Invites dispatched to collaborators.");
                          setIsOpen(false);
                        }}
                      >
                        Dispatch Invites
                      </Button>
                    </DrawerFooter>
                  </>
                ) : scenario === "profile" ? (
                  <>
                    <DrawerHeader>
                      <DrawerTitle>User & Workspace Profile</DrawerTitle>
                      <DrawerDescription>
                        Switch active deployment contexts or manage authentication credentials.
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 sm:px-6 py-3 space-y-3 text-left">
                      {[
                        { name: "Acme Production Cluster", role: "Owner / Architect", active: true },
                        { name: "Aurora Staging Sandbox", role: "Contributor", active: false },
                        { name: "Personal Labs", role: "Admin", active: false },
                      ].map((ws) => (
                        <div
                          key={ws.name}
                          className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3"
                        >
                          <div className="space-y-0.5">
                            <p className="text-xs font-semibold text-foreground">{ws.name}</p>
                            <p className="text-[11px] text-muted-foreground">{ws.role}</p>
                          </div>
                          {ws.active ? (
                            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-500">
                              Active
                            </span>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setActionFeedback(`Switched to ${ws.name}`);
                                setIsOpen(false);
                              }}
                            >
                              Switch
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <DrawerFooter>
                      <DrawerClose render={<Button variant="outline" />}>
                        Close
                      </DrawerClose>
                    </DrawerFooter>
                  </>
                ) : (
                  <>
                    <DrawerHeader>
                      <DrawerTitle>Data Query Facets</DrawerTitle>
                      <DrawerDescription>
                        Filter telemetry by status code, latency bucket, and region.
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 sm:px-6 py-3 space-y-3 text-left text-xs">
                      {["US-East (N. Virginia)", "EU-Central (Frankfurt)", "AP-Southeast (Singapore)"].map((region) => (
                        <label key={region} className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded accent-primary" />
                          <span>{region}</span>
                        </label>
                      ))}
                    </div>

                    <DrawerFooter>
                      <DrawerClose render={<Button variant="outline" />}>
                        Clear
                      </DrawerClose>
                      <Button
                        variant="default"
                        onClick={() => {
                          setActionFeedback("Query filters applied.");
                          setIsOpen(false);
                        }}
                      >
                        Apply Filters
                      </Button>
                    </DrawerFooter>
                  </>
                )}
              </DrawerContent>
            </Drawer>
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
