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
  AlertCircleIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const DEMO_NATURE_GALLERY: LightboxItem[] = [
  {
    id: "gallery-1",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    alt: "Morning fog over mountain ridge and pine forest",
    title: "Mountain Fog & Alpine Atmosphere",
    description: "Atmospheric perspective creating soft optical depth layers across evergreen ridges.",
    credit: "Photo by eberhard grossgasteiger on Unsplash",
  },
  {
    id: "gallery-2",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    alt: "Sunlight beaming through lush green woodland canopy",
    title: "Canopy Sunlight Refraction",
    description: "Volumetric sunlight shafts scattering through dew-covered forest branches.",
    credit: "Photo by Luca Bravo on Unsplash",
  },
  {
    id: "gallery-3",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Tropical sandy beach with turquoise clear ocean waves",
    title: "Tropical Shoreline Wave Gradient",
    description: "Shallow water refraction highlighting pure oceanic turquoise gradients.",
    credit: "Photo by Sean Oulashin on Unsplash",
  },
];

export function LightboxDemonstrations() {
  const [singleOpen, setSingleOpen] = React.useState(false);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  return (
    <div className="space-y-16">
      {/* 1. Single Asset Inspection */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Single Asset Focused Inspection
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lightbox enables distraction-free inspection of a single high-resolution image while retaining
            the user&apos;s active page position and scroll coordinates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setSingleOpen(true)}
            className="group relative h-40 w-60 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-xs transition-all hover:border-primary/60 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              alt="Architectural pavilion"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <HaloIcon icon={ViewIcon} size={20} />
            </div>
          </button>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Minimalist Architecture Pavilion</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click the preview thumbnail to expand into full-viewport view. Deep Halo Scrim reduces background distractions
              while floating glass controls provide accessible dismissal.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSingleOpen(true)}
              className="gap-2 rounded-lg text-xs"
            >
              <HaloIcon icon={ViewIcon} size={14} />
              <span>Inspect Full Resolution</span>
            </Button>
          </div>

          <Lightbox
            open={singleOpen}
            onOpenChange={setSingleOpen}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop"
            title="Contemporary Architectural Pavilion"
            description="High-resolution study of linear reflections and concrete volumetric forms."
            credit="Photo by R Architecture on Unsplash"
          >
            <LightboxContent>
              <LightboxControls showCounter={false} />
              <LightboxMedia />
              <LightboxCaption />
            </LightboxContent>
          </Lightbox>
        </div>
      </section>

      {/* 2. Multi-Image Gallery with Keyboard Traversal */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Multi-Image Gallery with Keyboard Traversal
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Galleries support sequential browsing via floating glass previous/next buttons, index counter badges,
            and keyboard <kbd className="font-mono text-xs">←</kbd> / <kbd className="font-mono text-xs">→</kbd> arrow keys.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10 text-center">
          <div className="flex items-center gap-3">
            {DEMO_NATURE_GALLERY.map((item, idx) => (
              <div
                key={item.id}
                className="h-20 w-28 overflow-hidden rounded-lg border border-border/60 bg-muted/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} className="size-full object-cover" />
              </div>
            ))}
          </div>

          <Button
            onClick={() => setGalleryOpen(true)}
            className="gap-2 h-10 px-5 rounded-xl font-medium text-xs shadow-xs"
          >
            <HaloIcon icon={Image01Icon} size={16} />
            <span>Open Nature Gallery (3 Photos)</span>
          </Button>

          <Lightbox
            open={galleryOpen}
            onOpenChange={setGalleryOpen}
            items={DEMO_NATURE_GALLERY}
            loop={true}
          >
            <LightboxContent>
              <LightboxControls showCounter={true} />
              <LightboxMedia />
              <LightboxCaption />
            </LightboxContent>
          </Lightbox>
        </div>
      </section>

      {/* 3. Error Fallback & Resilience */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Network Error Fallback &amp; Graceful Degradation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If an image fails to load due to network disruption or invalid URLs, Lightbox displays a friendly
            error banner with a manual retry affordance instead of an ugly broken icon.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-8">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Simulate Network Failure</h4>
            <p className="text-xs text-muted-foreground">
              Test how Lightbox handles an unreachable media URL without breaking the viewport or throwing runtime errors.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setErrorOpen(true)}
            className="gap-2 rounded-xl text-xs shrink-0"
          >
            <HaloIcon icon={AlertCircleIcon} size={15} className="text-amber-500" />
            <span>Test Error State</span>
          </Button>

          <Lightbox
            open={errorOpen}
            onOpenChange={setErrorOpen}
            src="https://invalid-domain-that-does-not-exist.example.com/broken-photo.jpg"
            title="Broken Media Test"
          >
            <LightboxContent>
              <LightboxControls showCounter={false} />
              <LightboxMedia />
            </LightboxContent>
          </Lightbox>
        </div>
      </section>
    </div>
  );
}
