"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SidebarLeftIcon,
  SidebarRightIcon,
  Settings02Icon,
  FilterIcon,
  SparklesIcon,
  Layers01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

export function SheetDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Four Edge Attachment Directions */}
      <section id="edge-attachment" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Edge Attachment Directions
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sheet slides from any screen edge with directional physics and concentric meniscus border curvature on exposed sides.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["right", "left", "bottom", "top"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger
                render={
                  <Button variant="outline" className="w-full capitalize justify-center gap-1.5 py-4 h-auto text-xs">
                    <HaloIcon
                      icon={side === "left" ? SidebarLeftIcon : side === "right" ? SidebarRightIcon : ViewIcon}
                      size={14}
                    />
                    <span>{side} Sheet</span>
                  </Button>
                }
              />
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle className="capitalize">{side} Edge Attachment</SheetTitle>
                  <SheetDescription>
                    Kinetic translation anchors to the {side} boundary of the viewport.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 p-6 text-xs text-muted-foreground">
                  The panel honors concentric curvature along exposed edges while keeping boundary attachment flush with the screen frame.
                </div>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>
                    Dismiss
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>

      {/* 2. Sizing Tiers */}
      <section id="sizing-tiers" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Sizing Tiers
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Configure width boundaries from compact inspector drawers (<code className="text-xs font-mono">sm</code>) to expansive workspaces (<code className="text-xs font-mono">full</code>).
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {(
            [
              { size: "sm", label: "Small (384px)" },
              { size: "default", label: "Default (448px)" },
              { size: "lg", label: "Large (512px)" },
              { size: "xl", label: "Extra Large (576px)" },
              { size: "full", label: "Wide Workspace (768px)" },
            ] as const
          ).map(({ size, label }) => (
            <Sheet key={size}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="sm" className="text-xs">
                    {label}
                  </Button>
                }
              />
              <SheetContent size={size}>
                <SheetHeader>
                  <SheetTitle>{label}</SheetTitle>
                  <SheetDescription>
                    Width bounding configured with <code className="text-xs font-mono">size=&quot;{size}&quot;</code>.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 p-6 text-xs text-muted-foreground space-y-3">
                  <p>
                    On mobile viewports (&lt;640px), width naturally adapts to 100% with safe-area padding to prevent horizontal clipping.
                  </p>
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/30 font-mono text-[11px]">
                    Current tier: size=&quot;{size}&quot;
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose render={<Button variant="default" />}>Done</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>

      {/* 3. Material Optical Intensities */}
      <section id="optical-intensities" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Material Optical Intensities
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Calibrate specular catch and internal transmission depth according to environmental density.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              {
                intensity: "subtle",
                title: "Subtle (Restrained)",
                desc: "High transmission for dense text dashboards with quiet boundary highlights.",
              },
              {
                intensity: "balanced",
                title: "Balanced (Canonical)",
                desc: "135° directional specular reflection with balanced ambient glow.",
              },
              {
                intensity: "rich",
                title: "Rich (Deep Luminous)",
                desc: "Elevated refraction rim and prominent specular catch for editorial surfaces.",
              },
            ] as const
          ).map(({ intensity, title, desc }) => (
            <Sheet key={intensity}>
              <SheetTrigger
                render={
                  <Button variant="outline" className="w-full text-left justify-start flex-col items-start gap-1 p-3.5 h-auto">
                    <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                      <HaloIcon icon={SparklesIcon} size={14} />
                      {title}
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-normal line-clamp-2">
                      {desc}
                    </span>
                  </Button>
                }
              />
              <SheetContent intensity={intensity}>
                <SheetHeader>
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>{desc}</SheetDescription>
                </SheetHeader>
                <div className="flex-1 p-6 text-xs text-muted-foreground space-y-3">
                  <p>
                    Optical formulas dynamically tune backdrop filter strength, specular gradient ramps, and contact edge occlusion.
                  </p>
                </div>
                <SheetFooter>
                  <SheetClose render={<Button variant="default" />}>Close</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>

      {/* 4. Form Composition & Nested Control Safety */}
      <section id="form-composition" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Form Composition &amp; Glass Isolation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Preserves the Glass Isolation Contract: internal fields remain solid/restrained (<code className="text-xs font-mono">bg-background/80</code>) while the Sheet carries the outer liquid material.
          </p>
        </div>

        <div>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="default" className="gap-2">
                  <HaloIcon icon={Settings02Icon} size={16} />
                  <span>Open Form Sheet</span>
                </Button>
              }
            />
            <SheetContent size="lg">
              <SheetHeader>
                <SheetTitle>Configure Service Route</SheetTitle>
                <SheetDescription>
                  Define gateway route rules, cache policies, and SSL termination.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Domain Path</label>
                  <input
                    type="text"
                    defaultValue="/api/v1/auth"
                    className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Rate Limit Policy</label>
                  <select className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none">
                    <option>10,000 requests / minute (Production)</option>
                    <option>1,000 requests / minute (Standard)</option>
                    <option>100 requests / minute (Strict)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Health Check Fallback URI</label>
                  <input
                    type="url"
                    defaultValue="https://status.acme.dev/healthz"
                    className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
                <SheetClose render={<Button variant="default" />}>Save Route</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </div>
  );
}
