"use client";

import * as React from "react";
import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
  LightboxMedia,
  LightboxControls,
  LightboxCaption,
  type LightboxItem,
} from "@/components/ui/lightbox";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Image01Icon,
  ViewIcon,
  SparklesIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

const DEMO_GALLERY: LightboxItem[] = [
  {
    id: "arch-1",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
    alt: "Contemporary architectural pavilion with reflecting pool",
    title: "Minimalist Pavilion & Water Surface",
    description: "Architectural study of natural illumination and fluid specular reflection.",
    credit: "Photo by R Architecture on Unsplash",
  },
  {
    id: "land-2",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
    alt: "Yosemite national park valley landscape at dusk",
    title: "Yosemite Valley Twilight Gradient",
    description: "Atmospheric haze and natural chromatic dispersion over granite cliffs.",
    credit: "Photo by Bailey Zindel on Unsplash",
  },
  {
    id: "port-3",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
    alt: "Editorial portrait with directional lighting",
    title: "Specular Studio Portrait Study",
    description: "High-contrast rim lighting showcasing skin tones and depth isolation.",
    credit: "Photo by Aiony Haust on Unsplash",
  },
  {
    id: "interior-4",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    alt: "Modern Scandinavian living space with fluted glass partition",
    title: "Fluted Optical Glass Interior",
    description: "Physical refractive diffusion created by vertical ribbed glass panels.",
    credit: "Photo by Spacejoy on Unsplash",
  },
];

export function LightboxPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Lightbox configuration
  const [mode, setMode] = React.useState<"gallery" | "single">("gallery");
  const [scrimIntensity, setScrimIntensity] = React.useState<"deep" | "balanced">("deep");
  const [loop, setLoop] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const activeItems = mode === "gallery" ? DEMO_GALLERY : [DEMO_GALLERY[0]];

  const handleReset = () => {
    setMode("gallery");
    setScrimIntensity("deep");
    setLoop(true);
    setCurrentIndex(0);
    setIsOpen(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const generatedCode = React.useMemo(() => {
    if (mode === "single") {
      return `import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
  LightboxMedia,
  LightboxControls,
  LightboxCaption,
} from "@/components/ui/lightbox";

export function SingleLightboxExample() {
  return (
    <Lightbox
      src="${DEMO_GALLERY[0].src}"
      alt="${DEMO_GALLERY[0].alt}"
      title="${DEMO_GALLERY[0].title}"
      description="${DEMO_GALLERY[0].description}"
      credit="${DEMO_GALLERY[0].credit}"
    >
      <LightboxTrigger className="group relative overflow-hidden rounded-2xl border border-border/50">
        <img
          src="${DEMO_GALLERY[0].src}"
          alt="${DEMO_GALLERY[0].alt}"
          className="h-48 w-72 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
          <span>Click to expand</span>
        </div>
      </LightboxTrigger>

      <LightboxContent scrimIntensity="${scrimIntensity}">
        <LightboxControls showCounter={false} />
        <LightboxMedia />
        <LightboxCaption />
      </LightboxContent>
    </Lightbox>
  );
}`;
    }

    return `import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
  LightboxMedia,
  LightboxControls,
  LightboxCaption,
} from "@/components/ui/lightbox";

const GALLERY_ITEMS = [
  {
    src: "${DEMO_GALLERY[0].src}",
    title: "${DEMO_GALLERY[0].title}",
    description: "${DEMO_GALLERY[0].description}",
    credit: "${DEMO_GALLERY[0].credit}",
  },
  {
    src: "${DEMO_GALLERY[1].src}",
    title: "${DEMO_GALLERY[1].title}",
    description: "${DEMO_GALLERY[1].description}",
    credit: "${DEMO_GALLERY[1].credit}",
  },
];

export function GalleryLightboxExample() {
  return (
    <Lightbox items={GALLERY_ITEMS} loop={${loop}}>
      <LightboxTrigger className="rounded-xl border border-border/50 p-2">
        Open Image Gallery
      </LightboxTrigger>

      <LightboxContent scrimIntensity="${scrimIntensity}">
        <LightboxControls showCounter={true} />
        <LightboxMedia />
        <LightboxCaption />
      </LightboxContent>
    </Lightbox>
  );
}`;
  }, [mode, scrimIntensity, loop]);

  const telemetry = [
    { label: "Component Role", value: "Focused Media Viewer Overlay" },
    { label: "Presentation Mode", value: mode === "gallery" ? `Gallery (${activeItems.length} Images)` : "Single Image" },
    { label: "Halo Scrim", value: scrimIntensity === "deep" ? "Deep Occlusion (90% Black, 8px Blur)" : "Balanced (75% Black)" },
    { label: "Looping", value: loop ? "Enabled (Wraparound)" : "Disabled (Bounded)" },
    { label: "Media Fidelity", value: "100% Unaltered (Zero Glass Distortion)" },
    { label: "Active View", value: `${currentIndex + 1} of ${activeItems.length}` },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StageControlSelect
        label="Viewing Mode"
        value={mode}
        onValueChange={(v) => {
          setMode(v as "gallery" | "single");
          setCurrentIndex(0);
        }}
        options={[
          { label: "Image Gallery (4 Photos)", value: "gallery" },
          { label: "Single Image View", value: "single" },
        ]}
      />
      <StageControlSelect
        label="Scrim Attenuation"
        value={scrimIntensity}
        onValueChange={(v) => setScrimIntensity(v as "deep" | "balanced")}
        options={[
          { label: "Deep Dark (90% Black)", value: "deep" },
          { label: "Balanced (75% Black)", value: "balanced" },
        ]}
      />
      <StageControlSelect
        label="Gallery Looping"
        value={loop ? "yes" : "no"}
        onValueChange={(v) => setLoop(v === "yes")}
        options={[
          { label: "Loop Enabled", value: "yes" },
          { label: "Bounded (Stop at Ends)", value: "no" },
        ]}
      />
      <div className="flex flex-col justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-9 w-full gap-2 rounded-xl text-xs font-semibold"
        >
          <HaloIcon icon={ViewIcon} size={15} />
          <span>Launch Viewer</span>
        </Button>
      </div>
    </div>
  );

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      controls={controls}
      telemetry={telemetry}
      code={generatedCode}
    >
      <div className="flex w-full flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Interactive Media Thumbnails</h3>
            <p className="text-xs text-muted-foreground">
              Click any photo thumbnail to open the full-viewport Lightbox overlay.
            </p>
          </div>

          {/* Thumbnail Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeItems.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsOpen(true);
                }}
                className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-xs transition-all hover:border-primary/60 hover:shadow-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt || item.title || "Thumbnail"}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md">
                    <HaloIcon icon={ViewIcon} size={16} />
                  </div>
                </div>
                <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                  {idx + 1}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
            <HaloIcon icon={Image01Icon} size={14} className="text-primary" />
            <span>Press <kbd className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.2 font-mono text-[10px]">Esc</kbd> to close, <kbd className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.2 font-mono text-[10px]">←</kbd> and <kbd className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.2 font-mono text-[10px]">→</kbd> to browse</span>
          </div>
        </div>

        {/* The Lightbox Component */}
        <Lightbox
          open={isOpen}
          onOpenChange={setIsOpen}
          items={activeItems}
          index={currentIndex}
          onIndexChange={setCurrentIndex}
          loop={loop}
        >
          <LightboxContent scrimIntensity={scrimIntensity}>
            <LightboxControls showCounter={mode === "gallery"} />
            <LightboxMedia />
            <LightboxCaption />
          </LightboxContent>
        </Lightbox>
      </div>
    </PreviewStageShell>
  );
}
