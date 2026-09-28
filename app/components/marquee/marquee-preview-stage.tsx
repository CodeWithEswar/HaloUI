"use client";

import * as React from "react";
import {
  Marquee,
  type MarqueeDirection,
  type MarqueeVariant,
  type MarqueeSize,
} from "@/components/ui/marquee";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  Layers01Icon,
  CpuIcon,
  SecurityCheckIcon,
  Globe02Icon,
  CodeIcon,
  DatabaseIcon,
  GitBranchIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Large (480px)" },
  { value: "390", label: "iPhone Pro (390px)" },
  { value: "320", label: "Mobile Min (320px)" },
  { value: "280", label: "Micro Panel (280px)" },
  { value: "240", label: "Extreme 240px (240px)" },
];

const SCENARIOS = [
  { value: "badges", label: "Tech Stack Badges" },
  { value: "cards", label: "Feature Highlights" },
  { value: "partners", label: "Ecosystem Partners" },
];

const BADGE_ITEMS = [
  { icon: CodeIcon, name: "Next.js 16", tag: "App Router" },
  { icon: SparklesIcon, name: "React 19", tag: "Concurrent" },
  { icon: CpuIcon, name: "TypeScript 5", tag: "Type-Safe" },
  { icon: Layers01Icon, name: "Tailwind CSS v4", tag: "Oxide Engine" },
  { icon: SecurityCheckIcon, name: "WAI-ARIA 1.2", tag: "Accessible" },
  { icon: DatabaseIcon, name: "Prisma ORM", tag: "PostgreSQL" },
  { icon: GitBranchIcon, name: "Shadcn Registry", tag: "Source-Owned" },
  { icon: Globe02Icon, name: "Turbopack", tag: "Fast Refresh" },
];

const CARD_ITEMS = [
  {
    title: "10-Layer Liquid Optics",
    badge: "Optics",
    desc: "Specular rims, ambient diffusion, and physical glass refraction.",
  },
  {
    title: "Container-Aware Reflow",
    badge: "CSS Grid",
    desc: "Seamless adaptation from 240px sidebars to 4K ultrawides.",
  },
  {
    title: "Zero Breakpoint Scripts",
    badge: "Performance",
    desc: "Pure CSS media and container queries without window listeners.",
  },
  {
    title: "WCAG 2.1 AA Certified",
    badge: "A11y",
    desc: "Roving tabindex focus management and screen-reader safe clones.",
  },
];

export function MarqueePreviewStage() {
  const [scenario, setScenario] = React.useState("badges");
  const [direction, setDirection] = React.useState<MarqueeDirection>("forward");
  const [duration, setDuration] = React.useState(25);
  const [variant, setVariant] = React.useState<MarqueeVariant>("glass");
  const [size, setSize] = React.useState<MarqueeSize>("default");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [pauseOnHover, setPauseOnHover] = React.useState(true);
  const [pauseOnFocus, setPauseOnFocus] = React.useState(true);
  const [fadeEdges, setFadeEdges] = React.useState(true);
  const [simulateReducedMotion, setSimulateReducedMotion] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setScenario("badges");
    setDirection("forward");
    setDuration(25);
    setVariant("glass");
    setSize("default");
    setContainerWidth("full");
    setPauseOnHover(true);
    setPauseOnFocus(true);
    setFadeEdges(true);
    setSimulateReducedMotion(false);
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
        return "max-w-3xl";
    }
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Direction",
      value: direction.toUpperCase(),
      variant: "default",
    },
    {
      label: "Duration",
      value: `${duration} SECONDS`,
      variant: "default",
    },
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: variant === "glass" ? "success" : "default",
    },
    {
      label: "Edge Masks",
      value: fadeEdges ? "OPTICAL FADE" : "HARD CLIP",
      variant: "default",
    },
    {
      label: "Reduced Motion",
      value: simulateReducedMotion ? "STATIC FALLBACK" : "ANIMATED",
      variant: simulateReducedMotion ? "success" : "default",
    },
  ];

  const codeSnippet = `<Marquee
  direction="${direction}"
  duration={${duration}}
  variant="${variant}"
  size="${size}"
  pauseOnHover={${pauseOnHover}}
  pauseOnFocus={${pauseOnFocus}}
  fadeEdges={${fadeEdges}}
>
  {items.map((item, index) => (
    <Item key={index} {...item} />
  ))}
</Marquee>`;

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
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-2.5">
          {/* Main Controls Row: Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Scenario"
              value={scenario}
              options={SCENARIOS}
              onChange={setScenario}
            />

            <StageControlSelect
              label="Direction"
              value={direction}
              options={[
                { value: "forward", label: "Forward (Right to Left)" },
                { value: "reverse", label: "Reverse (Left to Right)" },
              ]}
              onChange={(val) => setDirection(val as MarqueeDirection)}
            />

            <StageControlSelect
              label="Speed"
              value={String(duration)}
              options={[
                { value: "15", label: "Fast (15s)" },
                { value: "25", label: "Balanced (25s)" },
                { value: "45", label: "Gentle (45s)" },
              ]}
              onChange={(val) => setDuration(Number(val))}
            />

            <StageControlSelect
              label="Variant"
              value={variant}
              options={[
                { value: "glass", label: "Liquid Glass" },
                { value: "default", label: "Bordered Default" },
                { value: "plain", label: "Plain Frameless" },
              ]}
              onChange={(val) => setVariant(val as MarqueeVariant)}
            />

            <StageControlSelect
              label="Container Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />
          </div>

          {/* Toggle Flags Row: Neatly Aligned in Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="marquee-hover-toggle"
                  checked={pauseOnHover}
                  onCheckedChange={(checked) => setPauseOnHover(Boolean(checked))}
                />
                <Label htmlFor="marquee-hover-toggle" className="text-xs cursor-pointer select-none">
                  Pause on Hover
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="marquee-focus-toggle"
                  checked={pauseOnFocus}
                  onCheckedChange={(checked) => setPauseOnFocus(Boolean(checked))}
                />
                <Label htmlFor="marquee-focus-toggle" className="text-xs cursor-pointer select-none">
                  Pause on Focus
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="marquee-mask-toggle"
                  checked={fadeEdges}
                  onCheckedChange={(checked) => setFadeEdges(Boolean(checked))}
                />
                <Label htmlFor="marquee-mask-toggle" className="text-xs cursor-pointer select-none">
                  Gradient Edge Masks
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="marquee-reduced-toggle"
                  checked={simulateReducedMotion}
                  onCheckedChange={(checked) => setSimulateReducedMotion(Boolean(checked))}
                />
                <Label htmlFor="marquee-reduced-toggle" className="text-xs cursor-pointer select-none font-medium text-primary">
                  Simulate Reduced Motion
                </Label>
              </div>
            </div>

            <span className="text-[11px] text-muted-foreground">
              Container-aware reflow down to 240px
            </span>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center p-2 sm:p-6 transition-all duration-300">
        <div
          className={cn(
            "w-full transition-all duration-200",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          {simulateReducedMotion ? (
            /* Reduced Motion Static Representation */
            <div
              className={cn(
                "w-full overflow-x-auto p-4 flex items-center gap-4 select-none",
                variant === "glass" && [
                  "rounded-2xl border border-border/70 dark:border-white/12",
                  "bg-card/75 dark:bg-card/40 backdrop-blur-md",
                ],
                variant === "default" && "rounded-2xl border border-border/80 bg-card/85",
                variant === "plain" && "bg-transparent"
              )}
            >
              {scenario === "cards"
                ? CARD_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border/70 bg-card/90 min-w-[220px] shrink-0"
                    >
                      <span className="text-[10px] font-semibold uppercase text-primary">
                        {item.badge}
                      </span>
                      <h5 className="font-semibold text-xs text-foreground mt-1">{item.title}</h5>
                      <p className="text-[11px] text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))
                : BADGE_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/40 shrink-0"
                    >
                      <HaloIcon icon={item.icon} size={15} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {item.tag}
                      </span>
                    </div>
                  ))}
            </div>
          ) : (
            /* Standard Continuous Marquee */
            <Marquee
              direction={direction}
              duration={duration}
              variant={variant}
              size={size}
              pauseOnHover={pauseOnHover}
              pauseOnFocus={pauseOnFocus}
              fadeEdges={fadeEdges}
              className="w-full"
            >
              {scenario === "cards"
                ? CARD_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border/70 bg-card/90 min-w-[240px] max-w-[260px] shrink-0 shadow-xs"
                    >
                      <span className="text-[10px] font-semibold uppercase text-primary">
                        {item.badge}
                      </span>
                      <h5 className="font-semibold text-xs text-foreground mt-1">{item.title}</h5>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  ))
                : BADGE_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/70 bg-card/80 backdrop-blur-xs shrink-0 shadow-xs"
                    >
                      <HaloIcon icon={item.icon} size={16} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-mono">
                        {item.tag}
                      </span>
                    </div>
                  ))}
            </Marquee>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
