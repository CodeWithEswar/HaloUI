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
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  Layers01Icon,
  ViewIcon,
  PlayIcon,
  UserIcon,
  Share01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

export function DrawerDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Snap Points & Dynamic Heights */}
      <section id="snap-points" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Snap Points & Kinetic Height States
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Configure multi-tier rest positions such as mini-player peek, halfway dashboard, and fullscreen expanded modes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Drawer snapPoints={["280px", "540px", 1]} defaultSnapPoint="280px">
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>
              <HaloIcon icon={PlayIcon} size={15} />
              <span>3-Step Snap Points (280px / 540px / 100%)</span>
            </DrawerTrigger>
            <DrawerContent className="max-w-2xl">
              <DrawerHeader>
                <DrawerTitle>3-Step Snap Point Drawer</DrawerTitle>
                <DrawerDescription>
                  Drag the handle up or down to cycle through 280px peek, 540px mid-height, and 100% fullscreen.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-6 py-4 space-y-3 text-xs text-muted-foreground">
                <div className="rounded-xl border border-border/60 bg-background/80 p-3 font-mono text-[11px]">
                  {'snapPoints={["280px", "540px", 1]}'}
                </div>
                <p>
                  Kinetic velocity algorithms calculate release momentum to snap naturally to the nearest target threshold.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer snapPoints={["400px", 1]} defaultSnapPoint="400px">
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>
              <HaloIcon icon={ViewIcon} size={15} />
              <span>2-Step Half / Full (400px / 100%)</span>
            </DrawerTrigger>
            <DrawerContent className="max-w-2xl">
              <DrawerHeader>
                <DrawerTitle>2-Step Modal Drawer</DrawerTitle>
                <DrawerDescription>
                  A classic mobile sheet with resting half-sheet and full-sheet states.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-6 py-4 text-xs text-muted-foreground">
                Release velocity determines whether the sheet transitions between the 400px peek and full-screen view.
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* 2. Directional Edge Trajectories */}
      <section id="edge-directions" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Edge Trajectories & Orientations
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            While bottom sheets are standard on mobile, drawers can enter from top, left, or right edges with proper meniscus border orientation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(
            [
              { dir: "down", label: "Bottom (Standard)" },
              { dir: "up", label: "Top Notification" },
              { dir: "left", label: "Left Drawer" },
              { dir: "right", label: "Right Drawer" },
            ] as const
          ).map(({ dir, label }) => (
            <Drawer key={dir} swipeDirection={dir}>
              <DrawerTrigger render={<Button variant="outline" className="w-full text-xs py-3.5 h-auto justify-center" />}>
                <span>{label}</span>
              </DrawerTrigger>
              <DrawerContent
                className={
                  dir === "down" || dir === "up"
                    ? "max-w-xl"
                    : "max-w-sm"
                }
              >
                <DrawerHeader>
                  <DrawerTitle className="capitalize">{dir} Swipe Direction</DrawerTitle>
                  <DrawerDescription>
                    Gesture axis: {dir === "down" || dir === "up" ? "Y-Axis Vertical" : "X-Axis Horizontal"}.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-6 py-4 text-xs text-muted-foreground leading-relaxed">
                  Meniscus curvature and borders dynamically bind to the correct outward-facing boundaries.
                </div>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>
                    Dismiss
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </section>

      {/* 3. Material Optical Intensities */}
      <section id="material-intensities" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Liquid Glass Optical Intensities
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Calibrate surface opacity, refraction edge brightness, and 135° specular highlights across subtle, balanced, and rich tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              {
                intensity: "subtle",
                title: "Subtle Intensity",
                desc: "High chromatic transparency for minimal visual competition.",
              },
              {
                intensity: "balanced",
                title: "Balanced Intensity",
                desc: "Canonical HaloUI liquid glass with specular edge highlights.",
              },
              {
                intensity: "rich",
                title: "Rich Intensity",
                desc: "Deep frosted diffusion with heightened optical luminance.",
              },
            ] as const
          ).map(({ intensity, title, desc }) => (
            <Drawer key={intensity} intensity={intensity}>
              <DrawerTrigger render={<Button variant="outline" className="w-full h-auto p-4 flex-col items-start gap-1 text-left" />}>
                <div className="flex items-center gap-1.5 font-semibold text-foreground text-xs">
                  <HaloIcon
                    icon={intensity === "rich" ? SparklesIcon : Layers01Icon}
                    size={14}
                  />
                  <span>{title}</span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {desc}
                </p>
              </DrawerTrigger>
              <DrawerContent intensity={intensity} className="max-w-xl">
                <DrawerHeader>
                  <DrawerTitle>{title}</DrawerTitle>
                  <DrawerDescription>{desc}</DrawerDescription>
                </DrawerHeader>
                <div className="px-6 py-4 space-y-3 text-xs text-muted-foreground">
                  <div className="rounded-xl border border-border/60 bg-background/80 p-3 font-mono text-[11px]">
                    intensity=&quot;{intensity}&quot; · halo-intensity-{intensity}
                  </div>
                  <p>
                    All 10 optical layers adapt automatically between light and dark modes while maintaining WCAG 2.1 AA text contrast.
                  </p>
                </div>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="default" />}>
                    Dismiss
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </section>

      {/* 4. Scroll vs Gesture Isolation */}
      <section id="scroll-isolation" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Scroll vs Gesture Drag Isolation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Content within the drawer can scroll independently without accidentally triggering a dismissal drag, unless scrolled to the very top.
          </p>
        </div>

        <div>
          <Drawer>
            <DrawerTrigger render={<Button variant="default" />}>
              <HaloIcon icon={Settings02Icon} size={15} />
              <span>Open Scrollable Feed Drawer</span>
            </DrawerTrigger>
            <DrawerContent className="max-w-xl max-h-[85dvh]">
              <DrawerHeader>
                <DrawerTitle>System Telemetry & Audit Stream</DrawerTitle>
                <DrawerDescription>
                  Scroll through 20 records. The drawer gesture engine distinguishes content scrolling from dismissal pulls.
                </DrawerDescription>
              </DrawerHeader>

              <div className="px-6 py-2 overflow-y-auto space-y-2 text-xs divide-y divide-border/30 max-h-72">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Event Node #0{i + 1}</p>
                      <p className="text-[11px] text-muted-foreground">Cryptographic checksum validated · 24ms</p>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">
                      200 OK
                    </span>
                  </div>
                ))}
              </div>

              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>
    </div>
  );
}
