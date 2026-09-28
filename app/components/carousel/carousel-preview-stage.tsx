"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
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
  Analytics01Icon,
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
  { value: "features", label: "Feature Cards (3D Glass)" },
  { value: "metrics", label: "Executive KPI Metrics" },
  { value: "testimonials", label: "Customer Endorsements" },
  { value: "media", label: "Media Showcase" },
];

const FEATURE_SLIDES = [
  {
    icon: SparklesIcon,
    title: "10-Layer Optical Engine",
    description: "Specially calibrated light refractions, specular rims, and ambient diffusion for modern tactile interfaces.",
    badge: "Optics",
    color: "from-sky-500/20 to-blue-600/10",
  },
  {
    icon: Layers01Icon,
    title: "Source-Owned Distribution",
    description: "Full code independence via shadcn CLI with clean TypeScript source deposited directly in your codebase.",
    badge: "Architecture",
    color: "from-indigo-500/20 to-purple-600/10",
  },
  {
    icon: CpuIcon,
    title: "Container-Aware Reflow",
    description: "Native CSS container queries guarantee components adapt fluidly from 240px sidebars to 4K ultrawides.",
    badge: "Responsiveness",
    color: "from-emerald-500/20 to-teal-600/10",
  },
  {
    icon: SecurityCheckIcon,
    title: "Strict WCAG AA Compliance",
    description: "Roving tabindex keyboard navigation, high-contrast states, and system-level reduced motion support.",
    badge: "Accessibility",
    color: "from-amber-500/20 to-orange-600/10",
  },
  {
    icon: Globe02Icon,
    title: "Global Theme Synchronization",
    description: "Flawless transitions between Light, Dark, and System palettes with automatic virtual light direction.",
    badge: "Theming",
    color: "from-rose-500/20 to-pink-600/10",
  },
];

export function CarouselPreviewStage() {
  const [scenario, setScenario] = React.useState("features");
  const [buttonPosition, setButtonPosition] = React.useState<"inset" | "edge">("inset");
  const [buttonVariant, setButtonVariant] = React.useState<"default" | "outline" | "secondary">("default");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showArrows, setShowArrows] = React.useState(true);
  const [showDots, setShowDots] = React.useState(true);
  const [loop, setLoop] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setScenario("features");
    setButtonPosition("inset");
    setButtonVariant("default");
    setContainerWidth("full");
    setShowArrows(true);
    setShowDots(true);
    setLoop(false);
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
        return "max-w-2xl";
    }
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Engine",
      value: "EMBLA 8",
      variant: "default",
    },
    {
      label: "Controls",
      value: buttonPosition.toUpperCase(),
      variant: "default",
    },
    {
      label: "Optics",
      value: buttonVariant === "default" ? "LIQUID GLASS" : "SOLID BASE",
      variant: buttonVariant === "default" ? "success" : "default",
    },
    {
      label: "Pagination",
      value: showDots ? "DOT PILLS" : "OFF",
      variant: "default",
    },
    {
      label: "Loop Mode",
      value: loop ? "INFINITE" : "BOUNDED",
      variant: "default",
    },
  ];

  const codeSnippet = `<Carousel
  opts={{
    loop: ${loop},
    align: "start",
  }}
  className="w-full"
>
  <CarouselContent>
    {items.map((item, index) => (
      <CarouselItem key={index} className="basis-full sm:basis-1/2">
        <SlideContent item={item} />
      </CarouselItem>
    ))}
  </CarouselContent>
  ${showArrows ? `<CarouselPrevious position="${buttonPosition}" variant="${buttonVariant}" />\n  <CarouselNext position="${buttonPosition}" variant="${buttonVariant}" />` : ""}
  ${showDots ? `<CarouselDots className="mt-3" />` : ""}
</Carousel>`;

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
              label="Arrow Position"
              value={buttonPosition}
              options={[
                { value: "inset", label: "Inset (Safe Inside)" },
                { value: "edge", label: "Edge (Outside Bounds)" },
              ]}
              onChange={(val) => setButtonPosition(val as "inset" | "edge")}
            />

            <StageControlSelect
              label="Arrow Variant"
              value={buttonVariant}
              options={[
                { value: "default", label: "Liquid Glass (Default)" },
                { value: "outline", label: "Bordered Outline" },
                { value: "secondary", label: "Secondary Solid" },
              ]}
              onChange={(val) => setButtonVariant(val as "default" | "outline" | "secondary")}
            />

            <StageControlSelect
              label="Container Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />

            <StageControlSelect
              label="Slide Span"
              value="single"
              options={[
                { value: "single", label: "Single Item (100%)" },
                { value: "multi", label: "Dual (50% on sm)" },
              ]}
              onChange={() => {}}
            />
          </div>

          {/* Toggle Flags Row: Neatly Aligned in Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="carousel-arrows-toggle"
                  checked={showArrows}
                  onCheckedChange={(checked) => setShowArrows(Boolean(checked))}
                />
                <Label htmlFor="carousel-arrows-toggle" className="text-xs cursor-pointer select-none">
                  Nav Arrows
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="carousel-dots-toggle"
                  checked={showDots}
                  onCheckedChange={(checked) => setShowDots(Boolean(checked))}
                />
                <Label htmlFor="carousel-dots-toggle" className="text-xs cursor-pointer select-none">
                  Pagination Dots
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="carousel-loop-toggle"
                  checked={loop}
                  onCheckedChange={(checked) => setLoop(Boolean(checked))}
                />
                <Label htmlFor="carousel-loop-toggle" className="text-xs cursor-pointer select-none">
                  Infinite Loop
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
          <Carousel
            opts={{
              loop,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {FEATURE_SLIDES.map((slide, idx) => (
                <CarouselItem key={idx} className="basis-full">
                  <div
                    className={cn(
                      "p-6 sm:p-8 rounded-2xl border border-border/70 dark:border-white/10",
                      "bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-md shadow-sm",
                      "flex flex-col justify-between min-h-[220px]"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <HaloIcon icon={slide.icon} size={20} />
                        </div>
                        <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground">
                          {slide.badge}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight text-foreground mb-2">
                        {slide.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between text-xs text-muted-foreground/75 border-t border-border/30">
                      <span>Slide {idx + 1} of {FEATURE_SLIDES.length}</span>
                      <span className="font-mono">HaloUI Optical Suite</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {showArrows && (
              <>
                <CarouselPrevious position={buttonPosition} variant={buttonVariant} />
                <CarouselNext position={buttonPosition} variant={buttonVariant} />
              </>
            )}

            {showDots && <CarouselDots className="mt-3" />}
          </Carousel>
        </div>
      </div>
    </PreviewStageShell>
  );
}
