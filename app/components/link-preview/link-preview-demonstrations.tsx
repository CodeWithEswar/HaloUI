"use client";

import * as React from "react";
import {
  LinkPreview,
  LinkPreviewTrigger,
  LinkPreviewContent,
  LinkPreviewTitle,
  LinkPreviewDescription,
  LinkPreviewMetadata,
} from "@/components/ui/link-preview";
import {
  CodeIcon,
  GlobalIcon,
  BookOpen01Icon,
  Folder01Icon,
  CheckmarkCircle02Icon,
  SparklesIcon,
  Layers01Icon,
  ArrowUpRight01Icon,
  ComputerIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function LinkPreviewDemonstrations() {
  const [controlledOpen, setControlledOpen] = React.useState(false);

  return (
    <div className="space-y-12">
      {/* 1. External Destination with Thumbnail & Domain */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            External Destination with Visual Media
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Previews can compose consumer-supplied thumbnails or branding elements to give rich destination context. The component does not fetch external Open Graph images automatically.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6 flex flex-col gap-4">
          <div className="text-sm leading-relaxed text-muted-foreground">
            Explore our open source repository on{" "}
            <LinkPreview openDelay={200}>
              <LinkPreviewTrigger
                href="https://github.com/CodeWithEswar/HaloUI"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-0.5 text-primary font-medium underline underline-offset-4"
              >
                <span>HaloUI GitHub</span>
                <HaloIcon icon={ArrowUpRight01Icon} size={13} className="inline" />
              </LinkPreviewTrigger>

              <LinkPreviewContent side="top" className="w-80 p-0 overflow-hidden">
                <div className="h-28 w-full bg-gradient-to-tr from-cyan-600 via-sky-600 to-indigo-700 relative flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
                  <div className="relative z-10 flex items-center gap-2 text-white font-mono text-xs font-semibold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <HaloIcon icon={CodeIcon} size={16} />
                    <span>github.com/CodeWithEswar/HaloUI</span>
                  </div>
                </div>
                <div className="p-4">
                  <LinkPreviewTitle>HaloUI Design System Repository</LinkPreviewTitle>
                  <LinkPreviewDescription>
                    Neoskeuomorphic 10-layer physical liquid optical design system for React and Next.js applications.
                  </LinkPreviewDescription>
                  <LinkPreviewMetadata>
                    <HaloIcon icon={GlobalIcon} size={13} />
                    <span>Source Ownership</span>
                    <span className="text-border">•</span>
                    <span>MIT License</span>
                  </LinkPreviewMetadata>
                </div>
              </LinkPreviewContent>
            </LinkPreview>{" "}
            to view registry distribution code and documentation sources.
          </div>
        </div>
      </section>

      {/* 2. Structured App Destination Preview */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Application Card &amp; Documentation Link
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Compact preview cards can be composed inside documentation sidebars, cards, or command results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border/70 bg-card p-5">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Component Guide
            </span>
            <h4 className="text-base font-semibold text-foreground mt-1 mb-2">
              Foundations Reference
            </h4>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Read the full specifications for{" "}
              <LinkPreview openDelay={150}>
                <LinkPreviewTrigger href="#/components/halo-surface">
                  Halo Surface
                </LinkPreviewTrigger>

                <LinkPreviewContent side="bottom" className="w-72">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <HaloIcon icon={Layers01Icon} size={18} />
                    </div>
                    <div>
                      <LinkPreviewTitle>Halo Surface</LinkPreviewTitle>
                      <LinkPreviewDescription>
                        The core optical container implementing diffusion, edge catching, and specular reflection.
                      </LinkPreviewDescription>
                    </div>
                  </div>
                </LinkPreviewContent>
              </LinkPreview>{" "}
              and learn how layered glassmorphic substrates interact with directional light.
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-5">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Architecture Guide
            </span>
            <h4 className="text-base font-semibold text-foreground mt-1 mb-2">
              Optical Physics Engine
            </h4>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Discover how{" "}
              <LinkPreview openDelay={150}>
                <LinkPreviewTrigger href="#/docs/liquid-material">
                  Liquid Material
                </LinkPreviewTrigger>

                <LinkPreviewContent side="bottom" className="w-72">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                      <HaloIcon icon={SparklesIcon} size={18} />
                    </div>
                    <div>
                      <LinkPreviewTitle>10-Layer Optical Engine</LinkPreviewTitle>
                      <LinkPreviewDescription>
                        Deep dive into 135° specular reflections, refraction rims, and tactile compression physics.
                      </LinkPreviewDescription>
                    </div>
                  </div>
                </LinkPreviewContent>
              </LinkPreview>{" "}
              differs fundamentally from generic flat translucent cards.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Viewport Edge Collision Handling */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Collision Handling &amp; Viewport Boundaries
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Base UI Positioner automatically detects collisions with the viewport edge and adjusts alignment or flips orientation to prevent clipping.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <LinkPreview openDelay={150}>
            <LinkPreviewTrigger href="#/left-edge">
              Left Edge Anchor
            </LinkPreviewTrigger>

            <LinkPreviewContent side="left" align="start" className="w-64">
              <LinkPreviewTitle>Left Boundary Collision</LinkPreviewTitle>
              <LinkPreviewDescription>
                Flips automatically if insufficient viewport room exists on the left.
              </LinkPreviewDescription>
            </LinkPreviewContent>
          </LinkPreview>

          <span className="text-xs text-muted-foreground font-mono">
            ← Automatic Flip &amp; Slide →
          </span>

          <LinkPreview openDelay={150}>
            <LinkPreviewTrigger href="#/right-edge">
              Right Edge Anchor
            </LinkPreviewTrigger>

            <LinkPreviewContent side="right" align="end" className="w-64">
              <LinkPreviewTitle>Right Boundary Collision</LinkPreviewTitle>
              <LinkPreviewDescription>
                Shifts gracefully inside viewport boundary without creating horizontal scrolling.
              </LinkPreviewDescription>
            </LinkPreviewContent>
          </LinkPreview>
        </div>
      </section>

      {/* 4. Keyboard Focus & Accessible Verification Matrix */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Accessibility &amp; Native Semantic Matrix
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Verification that native anchor behaviors, focus indicators, and screen reader announcements remain completely intact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Native Anchor Semantics</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Triggers always render real <code className="text-foreground">&lt;a href&gt;</code> elements. Middle-click, right-click context menu, and Ctrl/Cmd+click operate natively.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Keyboard Operable</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Tab focus activates preview availability. Pressing <kbd className="font-mono text-[10px] px-1 bg-muted rounded">Enter</kbd> activates native navigation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Zero Remote Scraping</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              No unauthorized background network calls or unvetted URL fetching. Previews render explicit consumer-supplied context safely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
