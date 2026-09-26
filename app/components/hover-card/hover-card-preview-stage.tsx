"use client";

import * as React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  type HoverCardIntensity,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  UserIcon,
  SourceCodeIcon,
  BookOpen01Icon,
  Calendar01Icon,
  StarIcon,
  GitBranchIcon,
  CheckmarkBadge01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type DemoScenario = "profile" | "repository" | "citation";

export function HoverCardPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Hover Card configuration
  const [scenario, setScenario] = React.useState<DemoScenario>("profile");
  const [side, setSide] = React.useState<"bottom" | "top" | "left" | "right">("bottom");
  const [align, setAlign] = React.useState<"center" | "start" | "end">("center");
  const [intensity, setIntensity] = React.useState<HoverCardIntensity>("balanced");
  const [openDelay, setOpenDelay] = React.useState(300);
  const [closeDelay, setCloseDelay] = React.useState(200);
  const [showArrow, setShowArrow] = React.useState(false);

  const handleReset = () => {
    setScenario("profile");
    setSide("bottom");
    setAlign("center");
    setIntensity("balanced");
    setOpenDelay(300);
    setCloseDelay(200);
    setShowArrow(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const generatedCode = React.useMemo(() => {
    const sideProp = side !== "bottom" ? ` side="${side}"` : "";
    const alignProp = align !== "center" ? ` align="${align}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const openDelayProp = openDelay !== 300 ? ` openDelay={${openDelay}}` : "";
    const closeDelayProp = closeDelay !== 200 ? ` closeDelay={${closeDelay}}` : "";
    const arrowProp = showArrow ? ` showArrow` : "";

    if (scenario === "repository") {
      return `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SourceCodeIcon, StarIcon, GitBranchIcon } from "@hugeicons/core-free-icons";

export function RepositoryHoverCard() {
  return (
    <HoverCard${openDelayProp}${closeDelayProp}>
      <HoverCardTrigger
        href="https://github.com/CodeWithEswar/HaloUI"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
      >
        CodeWithEswar/HaloUI
      </HoverCardTrigger>
      <HoverCardContent${sideProp}${alignProp}${intensityProp}${arrowProp} className="w-80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
              <HaloIcon icon={SourceCodeIcon} size={15} />
            </span>
            <span className="font-semibold text-foreground">HaloUI Design System</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            10-layer physical Liquid Glass optical engine, component registry, and accessible primitives.
          </p>
          <div className="flex items-center gap-4 pt-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <HaloIcon icon={StarIcon} size={12} className="text-amber-500 fill-amber-500" />
              1.4k stars
            </span>
            <span className="flex items-center gap-1">
              <HaloIcon icon={GitBranchIcon} size={12} />
              main
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}`;
    }

    return `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Calendar01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";

export function ProfileHoverCard() {
  return (
    <HoverCard${openDelayProp}${closeDelayProp}>
      <HoverCardTrigger
        href="/authors/ada"
        className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
      >
        @ada_lovelace
      </HoverCardTrigger>
      <HoverCardContent${sideProp}${alignProp}${intensityProp}${arrowProp} className="w-80">
        <div className="flex gap-3">
          <div className="size-10 rounded-full border border-border/80 bg-stone-800 text-white flex items-center justify-center font-semibold text-xs">
            AL
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-semibold text-foreground">Ada Lovelace</h4>
              <HaloIcon icon={CheckmarkBadge01Icon} size={13} className="text-sky-500 fill-sky-500" />
            </div>
            <p className="text-[11px] text-muted-foreground">@ada_lovelace</p>
            <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
              Mathematician and computing visionary. Developing optical algorithms and analytical mechanics.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <HaloIcon icon={Calendar01Icon} size={12} />
                Joined Dec 1843
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}`;
  }, [scenario, side, align, intensity, openDelay, closeDelay, showArrow]);

  const telemetry = [
    { label: "Material Engine", value: "10-Layer Liquid Glass" },
    { label: "Optical Intensity", value: intensity },
    { label: "Placement", value: `${side} / ${align}` },
    { label: "Open Delay", value: `${openDelay}ms` },
    { label: "Pointer Grace Corridor", value: "Active (200ms)" },
    { label: "Trigger Semantic", value: "Native <a> (Link Preserved)" },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as DemoScenario)}
        options={[
          { label: "User Profile", value: "profile" },
          { label: "Repository Card", value: "repository" },
          { label: "Paper Citation", value: "citation" },
        ]}
      />
      <StageControlSelect
        label="Side"
        value={side}
        onValueChange={(v) => setSide(v as "bottom" | "top" | "left" | "right")}
        options={[
          { label: "Bottom (Standard)", value: "bottom" },
          { label: "Top (Inverted)", value: "top" },
          { label: "Left (Leading)", value: "left" },
          { label: "Right (Trailing)", value: "right" },
        ]}
      />
      <StageControlSelect
        label="Alignment"
        value={align}
        onValueChange={(v) => setAlign(v as "center" | "start" | "end")}
        options={[
          { label: "Center", value: "center" },
          { label: "Start", value: "start" },
          { label: "End", value: "end" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as HoverCardIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Specular Glow)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Open Delay"
        value={String(openDelay)}
        onValueChange={(v) => setOpenDelay(Number(v))}
        options={[
          { label: "300ms (Canonical)", value: "300" },
          { label: "150ms (Snappy)", value: "150" },
          { label: "500ms (Deliberate)", value: "500" },
          { label: "0ms (Instant)", value: "0" },
        ]}
      />
      <StageControlSelect
        label="Close Delay"
        value={String(closeDelay)}
        onValueChange={(v) => setCloseDelay(Number(v))}
        options={[
          { label: "200ms (Grace)", value: "200" },
          { label: "100ms (Quick)", value: "100" },
          { label: "400ms (Relaxed)", value: "400" },
        ]}
      />
      <StageControlSelect
        label="Pointer Arrow"
        value={showArrow ? "visible" : "hidden"}
        onValueChange={(v) => setShowArrow(v === "visible")}
        options={[
          { label: "Hidden", value: "hidden" },
          { label: "Visible", value: "visible" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Hover Card Live Preview Stage"
      description="Supplemental preview floating surface opened via pointer hover and keyboard focus without modifying underlying link semantics or dimming the application."
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
      <div className="flex flex-col items-center justify-center min-h-[380px] p-6 text-center">
        <div className="max-w-lg space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
            <HaloIcon
              icon={
                scenario === "profile"
                  ? UserIcon
                  : scenario === "repository"
                  ? SourceCodeIcon
                  : BookOpen01Icon
              }
              size={24}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {scenario === "profile"
                ? "Author & Member Identity Preview"
                : scenario === "repository"
                ? "Repository & Artifact Inspector"
                : "Academic Reference & Citation Summary"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hover over or keyboard-focus the interactive anchor below to reveal rich supplemental destination context through Liquid Glass optics.
            </p>
          </div>

          {/* Interactive Trigger Demo Area */}
          <div className="p-8 rounded-2xl border border-border/60 bg-background/40 backdrop-blur-xs flex items-center justify-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              The project is authored and maintained by{" "}
              <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
                <HoverCardTrigger
                  href={scenario === "repository" ? "https://github.com/CodeWithEswar/HaloUI" : "/authors/ada"}
                  className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  {scenario === "profile"
                    ? "@ada_lovelace"
                    : scenario === "repository"
                    ? "CodeWithEswar/HaloUI"
                    : "Lovelace (1843) Note G"}
                </HoverCardTrigger>

                <HoverCardContent
                  side={side}
                  align={align}
                  intensity={intensity}
                  showArrow={showArrow}
                  className="w-80"
                >
                  {scenario === "profile" && (
                    <div className="flex gap-3 text-left">
                      <div className="size-11 shrink-0 rounded-full border border-border/80 bg-stone-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        AL
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-semibold text-foreground">Ada Lovelace</h4>
                          <HaloIcon icon={CheckmarkBadge01Icon} size={14} className="text-sky-500 fill-sky-500" />
                        </div>
                        <p className="text-[11px] text-muted-foreground font-mono">@ada_lovelace</p>
                        <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
                          Mathematician and pioneer of computing science. Formulating early algorithms and physical symbolic engines.
                        </p>
                        <div className="flex items-center gap-3 pt-2 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <HaloIcon icon={Calendar01Icon} size={12} />
                            Joined Dec 1843
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {scenario === "repository" && (
                    <div className="space-y-2.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
                          <HaloIcon icon={SourceCodeIcon} size={15} />
                        </span>
                        <div>
                          <h4 className="text-xs font-semibold text-foreground">CodeWithEswar/HaloUI</h4>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Public Template</span>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        10-layer physical Liquid Glass optical engine, accessible Overlays & Menus, and shadcn-compatible source registry.
                      </p>

                      <div className="flex items-center gap-4 pt-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <HaloIcon icon={StarIcon} size={12} className="text-amber-500 fill-amber-500" />
                          1,420 stars
                        </span>
                        <span className="flex items-center gap-1">
                          <HaloIcon icon={GitBranchIcon} size={12} />
                          main
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-blue-500" />
                          TypeScript
                        </span>
                      </div>
                    </div>
                  )}

                  {scenario === "citation" && (
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
                          <HaloIcon icon={BookOpen01Icon} size={15} />
                        </span>
                        <span className="text-xs font-semibold text-foreground">Taylor&apos;s Scientific Memoirs</span>
                      </div>

                      <p className="text-xs font-medium text-foreground leading-snug">
                        Sketch of the Analytical Engine Invented by Charles Babbage, with Notes by the Translator.
                      </p>

                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Contains Note G, featuring the first published computer program calculating Bernoulli numbers.
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[10px] text-muted-foreground">
                        <span>Published: 1843</span>
                        <span className="font-mono">Ref: Vol. III, Part XII</span>
                      </div>
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>{" "}
              as part of the HaloUI liquid optical suite.
            </p>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
