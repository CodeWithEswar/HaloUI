"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipIntensity,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Kbd } from "@/components/ui/kbd";
import {
  Bookmark01Icon,
  Copy01Icon,
  InformationCircleIcon,
  Settings02Icon,
  HelpCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type TooltipScenario = "icon-button" | "toolbar" | "form-hint";

export function TooltipPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Tooltip configuration
  const [scenario, setScenario] = React.useState<TooltipScenario>("icon-button");
  const [side, setSide] = React.useState<"top" | "bottom" | "left" | "right">("top");
  const [align, setAlign] = React.useState<"center" | "start" | "end">("center");
  const [intensity, setIntensity] = React.useState<TooltipIntensity>("subtle");
  const [delay, setDelay] = React.useState(150);
  const [showArrow, setShowArrow] = React.useState(false);

  const handleReset = () => {
    setScenario("icon-button");
    setSide("top");
    setAlign("center");
    setIntensity("subtle");
    setDelay(150);
    setShowArrow(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const generatedCode = React.useMemo(() => {
    const sideProp = side !== "top" ? ` side="${side}"` : "";
    const alignProp = align !== "center" ? ` align="${align}"` : "";
    const intensityProp = intensity !== "subtle" ? ` intensity="${intensity}"` : "";
    const arrowProp = showArrow ? ` showArrow` : "";
    const delayProp = delay !== 150 ? ` delay={${delay}}` : "";

    if (scenario === "toolbar") {
      return `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Bookmark01Icon, Copy01Icon, Settings02Icon } from "@hugeicons/core-free-icons";

export function ActionToolbar() {
  return (
    <TooltipProvider${delayProp}>
      <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-background/60 p-1 backdrop-blur-xs">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Bookmark page">
              <HaloIcon icon={Bookmark01Icon} size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent${sideProp}${alignProp}${intensityProp}${arrowProp}>
            Bookmark page
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Copy address">
              <HaloIcon icon={Copy01Icon} size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent${sideProp}${alignProp}${intensityProp}${arrowProp}>
            Copy address
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Workspace settings">
              <HaloIcon icon={Settings02Icon} size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent${sideProp}${alignProp}${intensityProp}${arrowProp}>
            Settings
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}`;
    }

    if (scenario === "form-hint") {
      return `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HelpCircleIcon } from "@hugeicons/core-free-icons";

export function SupplementalHint() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-foreground">API Rate Limit</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
            aria-label="More information about API rate limits"
          >
            <HaloIcon icon={HelpCircleIcon} size={14} />
          </button>
        </TooltipTrigger>
        <TooltipContent${sideProp}${alignProp}${intensityProp}${arrowProp}>
          Maximum 60 requests per minute per authenticated client.
        </TooltipContent>
      </Tooltip>
    </div>
  );
}`;
    }

    return `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Kbd } from "@/components/ui/kbd";
import { Copy01Icon } from "@hugeicons/core-free-icons";

export function CopyIconButtonTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Copy repository URL">
          <HaloIcon icon={Copy01Icon} size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent${sideProp}${alignProp}${intensityProp}${arrowProp}>
        <span>Copy URL</span>
        <Kbd size="sm">⌘C</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}`;
  }, [scenario, side, align, intensity, showArrow, delay]);

  const telemetry = [
    { label: "Primitive", value: "Base UI Tooltip" },
    { label: "Material", value: `${intensity} Glass` },
    { label: "Trigger Semantic", value: `Preserved (${scenario === "form-hint" ? "button" : "Button"})` },
    { label: "Backdrop Scrim", value: "None (Restrained)" },
    { label: "Placement", value: `${side} / ${align}` },
    { label: "Delay", value: `${delay}ms` },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as TooltipScenario)}
        options={[
          { label: "Icon Button (Action)", value: "icon-button" },
          { label: "Action Toolbar (Skip-Delay)", value: "toolbar" },
          { label: "Form Help Hint", value: "form-hint" },
        ]}
      />
      <StageControlSelect
        label="Preferred Side"
        value={side}
        onValueChange={(v) => setSide(v as "top" | "bottom" | "left" | "right")}
        options={[
          { label: "Top (Default)", value: "top" },
          { label: "Bottom", value: "bottom" },
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ]}
      />
      <StageControlSelect
        label="Align"
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
        onValueChange={(v) => setIntensity(v as TooltipIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
        ]}
      />
      <StageControlSelect
        label="Delay"
        value={String(delay)}
        onValueChange={(v) => setDelay(Number(v))}
        options={[
          { label: "150ms (Snappy)", value: "150" },
          { label: "0ms (Instant)", value: "0" },
          { label: "300ms (Relaxed)", value: "300" },
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
      title="Tooltip Live Preview Stage"
      description="Concise supplemental information associated with an interface element, engineered with Liquid Glass optical physics, skip-delay provider orchestration, and non-modal focus isolation."
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
        <TooltipProvider delay={delay}>
          <div className="max-w-md space-y-6">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
              <HaloIcon
                icon={
                  scenario === "icon-button"
                    ? Copy01Icon
                    : scenario === "toolbar"
                    ? Bookmark01Icon
                    : HelpCircleIcon
                }
                size={22}
                className="text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-foreground">
                {scenario === "icon-button"
                  ? "Accessible Icon Button Tooltip"
                  : scenario === "toolbar"
                  ? "Toolbar Skip-Delay Coordination"
                  : "Contextual Guidance & Field Help"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {scenario === "icon-button"
                  ? "Hover or keyboard-focus the action button to expose its contextual label and shortcut without dimming the screen."
                  : scenario === "toolbar"
                  ? "Moving between adjacent controls in the toolbar skips opening delays, providing fluid contextual feedback."
                  : "Supplementary guidance for unfamiliar fields or indicators, remaining lightweight and non-blocking."}
              </p>
            </div>

            {/* Interactive Demo Surface */}
            <div className="p-8 rounded-2xl border border-border/60 bg-background/40 backdrop-blur-xs flex items-center justify-center">
              {scenario === "icon-button" && (
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Copy repository URL"
                        className="shadow-xs"
                      >
                        <HaloIcon icon={Copy01Icon} size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      <span>Copy repository URL</span>
                      <Kbd size="sm">⌘C</Kbd>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Bookmark repository"
                        className="shadow-xs"
                      >
                        <HaloIcon icon={Bookmark01Icon} size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      <span>Bookmark repo</span>
                      <Kbd size="sm">⌘D</Kbd>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Workspace configuration"
                        className="shadow-xs"
                      >
                        <HaloIcon icon={Settings02Icon} size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      <span>Settings</span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {scenario === "toolbar" && (
                <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-background/80 p-1.5 shadow-xs">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Bookmark page"
                        className="rounded-lg"
                      >
                        <HaloIcon icon={Bookmark01Icon} size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      Bookmark
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Copy link"
                        className="rounded-lg"
                      >
                        <HaloIcon icon={Copy01Icon} size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      Copy link
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Global search"
                        className="rounded-lg"
                      >
                        <HaloIcon icon={Search01Icon} size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      Search
                    </TooltipContent>
                  </Tooltip>

                  <div className="mx-1 h-4 w-px bg-border/60" />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="System settings"
                        className="rounded-lg"
                      >
                        <HaloIcon icon={Settings02Icon} size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      Settings
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {scenario === "form-hint" && (
                <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-background/90 px-4 py-2.5 shadow-xs">
                  <span className="text-xs font-medium text-foreground">API Rate Limiting</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none transition-colors"
                        aria-label="More information about API rate limits"
                      >
                        <HaloIcon icon={InformationCircleIcon} size={15} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side={side}
                      align={align}
                      intensity={intensity}
                      showArrow={showArrow}
                    >
                      60 requests per minute per client key
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground">
              Tip: Press <Kbd size="sm">Tab</Kbd> to navigate controls and test keyboard focus appearance without moving focus into the tooltip.
            </p>
          </div>
        </TooltipProvider>
      </div>
    </PreviewStageShell>
  );
}
