"use client";

import * as React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Layers01Icon,
  UserIcon,
  LinkSquare02Icon,
  Settings02Icon,
  CheckmarkBadge01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export function HoverCardDemonstrations() {
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div className="space-y-16">
      {/* 1. Native Link Semantics & Uncompromised Navigation */}
      <section id="trigger-semantics" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Trigger Semantics & Native Link Preservation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hover Card preserves the underlying semantic identity of the anchor element. Activating the trigger via primary click, Enter key, or Cmd/Ctrl+Click executes native navigation rather than requiring a first click to preview.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <HoverCard openDelay={200} closeDelay={150}>
              <HoverCardTrigger
                href="#trigger-semantics"
                onClick={(e) => {
                  e.preventDefault();
                  setClickCount((c) => c + 1);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/80 bg-background/80 hover:bg-muted/40 font-medium text-foreground transition-colors shadow-xs"
              >
                <span>Navigate to Ada&apos;s Profile</span>
                <HaloIcon icon={LinkSquare02Icon} size={14} className="text-muted-foreground" />
              </HoverCardTrigger>

              <HoverCardContent side="bottom" align="start" className="w-72">
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-semibold text-foreground">Ada Lovelace</h4>
                    <HaloIcon icon={CheckmarkBadge01Icon} size={13} className="text-sky-500 fill-sky-500" />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Chief Optical Architect</p>
                  <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
                    Supplemental hover info does not interrupt normal click or keyboard activation.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <span className="text-muted-foreground">
              Direct clicks recorded: <code className="font-mono font-semibold text-foreground">{clickCount}</code>
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Unlike popovers which capture pointer clicks to toggle state, hover cards remain strictly supplemental.
          </p>
        </div>
      </section>

      {/* 2. Cardinal Sides & Alignment Options */}
      <section id="cardinal-positioning" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Cardinal Side & Alignment Tiers
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Position the supplemental preview card along any cardinal edge relative to the trigger.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { side: "top" as const, label: "Top (Center)", icon: ArrowUp01Icon },
            { side: "bottom" as const, label: "Bottom (Center)", icon: ArrowDown01Icon },
            { side: "left" as const, label: "Left (Center)", icon: ArrowLeft01Icon },
            { side: "right" as const, label: "Right (Center)", icon: ArrowRight01Icon },
          ].map(({ side, label, icon }) => (
            <HoverCard key={side} openDelay={150} closeDelay={150}>
              <HoverCardTrigger
                href="#cardinal-positioning"
                className="flex items-center justify-center gap-1.5 p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/30 text-xs font-medium text-foreground transition-colors"
              >
                <HaloIcon icon={icon} size={14} />
                <span>{label}</span>
              </HoverCardTrigger>
              <HoverCardContent side={side} align="center" className="w-64">
                <div className="space-y-1 text-left text-xs">
                  <h4 className="font-semibold text-foreground capitalize">{side} Anchored</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Positions on the {side} side of the anchor with an 8px offset and pointer grace corridor.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </section>

      {/* 3. Liquid Glass Material Intensity Tiers */}
      <section id="optical-intensity" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Liquid Glass Optical Intensities
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Orchestrate material depth across Subtle, Balanced (default), and Rich tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["subtle", "balanced", "rich"] as const).map((tier) => (
            <HoverCard key={tier} openDelay={150} closeDelay={150}>
              <HoverCardTrigger
                href="#optical-intensity"
                className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/30 text-xs font-medium text-foreground capitalize transition-colors"
              >
                <span>{tier} Intensity</span>
                <HaloIcon icon={Layers01Icon} size={14} className="text-muted-foreground" />
              </HoverCardTrigger>

              <HoverCardContent side="bottom" align="center" intensity={tier} className="w-72">
                <div className="space-y-2 text-left text-xs">
                  <h4 className="font-semibold text-foreground capitalize">{tier} Optical Intensity</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {tier === "subtle"
                      ? "Restrained 8px blur with 40% specular reflection for subtle ambient context."
                      : tier === "balanced"
                      ? "Canonical 16px blur with 85% balanced specular highlight for general interfaces."
                      : "Rich 28px blur with 120% specular gleam and deep opposing internal reflection."}
                  </p>
                  <div className="p-2 rounded-lg bg-background/50 border border-border/40 font-mono text-[11px] text-muted-foreground">
                    Class: <span className="text-foreground font-semibold">halo-intensity-{tier}</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </section>

      {/* 4. Nested Overlay Stacking */}
      <section id="nested-overlays" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Overlay Stacking & Stacking Planes
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verify that a HoverCardTrigger inside an active modal Dialog renders its portalled preview card in a higher stacking plane without being trapped behind the modal backdrop.
          </p>
        </div>

        <div>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="default" className="text-xs gap-1.5 shadow-sm">
                  <HaloIcon icon={Settings02Icon} size={14} />
                  <span>Launch Parent Dialog</span>
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Parent Modal Context</DialogTitle>
                <DialogDescription>
                  Hover or focus the link below to verify correct z-index elevation above modal content.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4 text-xs">
                <p className="text-muted-foreground leading-relaxed">
                  Project maintained under leadership of{" "}
                  <HoverCard openDelay={150} closeDelay={150}>
                    <HoverCardTrigger
                      href="/team/lead"
                      className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      Engineering Architect
                    </HoverCardTrigger>
                    <HoverCardContent side="top" align="center" className="w-64 z-[60]">
                      <div className="space-y-1 text-left">
                        <h4 className="font-semibold text-foreground">Engineering Architect</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          Portalled cleanly above modal dialog container with zero z-index clash.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>.
                </p>
              </div>

              <DialogFooter>
                <DialogClose render={<Button variant="outline" size="sm">Dismiss Dialog</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
