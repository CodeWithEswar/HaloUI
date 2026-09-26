"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Kbd } from "@/components/ui/kbd";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Copy01Icon,
  Bookmark01Icon,
  Settings02Icon,
  Search01Icon,
  Layers01Icon,
  InformationCircleIcon,
  Download01Icon,
  Share01Icon,
  Edit01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";

export function TooltipDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Icon Buttons with Accessible Names */}
      <section id="accessible-names" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Icon-Only Controls & Accessible Names
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Icon-only buttons must retain an accessible name via <code className="font-mono text-xs">aria-label</code> so screen readers announce their function. The Tooltip visually exposes this label for sighted users without duplicating or interfering with accessibility trees.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Copy code snippet">
                  <HaloIcon icon={Copy01Icon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>Copy snippet</span>
                <Kbd size="sm">⌘C</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Save to bookmarks">
                  <HaloIcon icon={Bookmark01Icon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>Bookmark item</span>
                <Kbd size="sm">⌘D</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Download assets archive">
                  <HaloIcon icon={Download01Icon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>Download .zip</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Share workspace link">
                  <HaloIcon icon={Share01Icon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>Share link</span>
              </TooltipContent>
            </Tooltip>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Never assume a visual tooltip replaces <code className="font-mono text-xs">aria-label</code> on icon buttons. HaloUI pairs both for complete assistive technology parity.
          </p>
        </div>
      </section>

      {/* 2. Cardinal Sides & Alignment */}
      <section id="cardinal-positioning" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Cardinal Side & Alignment Tiers
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Position tooltips along top, bottom, left, or right edges. The underlying Base UI positioner automatically flips and shifts when approaching viewport boundaries.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { side: "top" as const, label: "Top (Default)", icon: ArrowUp01Icon },
            { side: "bottom" as const, label: "Bottom", icon: ArrowDown01Icon },
            { side: "left" as const, label: "Left", icon: ArrowLeft01Icon },
            { side: "right" as const, label: "Right", icon: ArrowRight01Icon },
          ].map(({ side, label, icon }) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/30 text-xs font-medium text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                >
                  <HaloIcon icon={icon} size={14} />
                  <span>{label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side={side} align="center">
                <span>Placed on {side}</span>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      {/* 3. Dense Action Toolbar & Skip-Delay Behavior */}
      <section id="toolbar-skip-delay" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Dense Action Toolbar with Skip-Delay
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When multiple tooltips share a <code className="font-mono text-xs">&lt;TooltipProvider&gt;</code>, moving the pointer directly from one trigger to the next immediately displays the subsequent tooltip without repeating the initial delay.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <TooltipProvider delay={250}>
            <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background p-1.5 shadow-xs w-fit">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Edit entry">
                    <HaloIcon icon={Edit01Icon} size={15} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Edit entry</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Copy reference">
                    <HaloIcon icon={Copy01Icon} size={15} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Copy reference</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Bookmark entry">
                    <HaloIcon icon={Bookmark01Icon} size={15} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Bookmark</TooltipContent>
              </Tooltip>

              <div className="mx-1 h-4 w-px bg-border/60" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Delete entry"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <HaloIcon icon={Delete02Icon} size={15} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Delete item</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>

          <p className="text-muted-foreground leading-relaxed">
            Hover over the first button (250ms deliberate delay), then slide to adjacent buttons. Notice the instant feedback without delay interruptions.
          </p>
        </div>
      </section>

      {/* 4. Long Label & Wrapping Boundary */}
      <section id="label-wrapping" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Long Label Wrapping Boundary
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tooltips automatically enforce a sensible maximum width (<code className="font-mono text-xs">max-w-xs</code>), allowing multi-line explanation without becoming giant floating panels or causing horizontal page overflow.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/80 bg-background hover:bg-muted/40 font-medium text-foreground transition-colors shadow-xs"
                >
                  <HaloIcon icon={InformationCircleIcon} size={15} className="text-muted-foreground" />
                  <span>Content Isolation Guarantee</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-left leading-relaxed">
                Optical highlights and refraction distortion filters operate in background pseudo-elements, guaranteeing foreground text contrast and full selection fidelity.
              </TooltipContent>
            </Tooltip>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            For content with rich structures (avatars, action buttons, metadata rows), use <strong className="text-foreground">Hover Card</strong> or <strong className="text-foreground">Popover</strong> instead.
          </p>
        </div>
      </section>

      {/* 5. Liquid Glass Optical Intensity */}
      <section id="optical-intensity" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Liquid Glass Optical Intensity Tiers
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HaloUI tooltips support restrained Subtle (default) and Balanced optical intensities, preserving extreme text legibility while sharing design system optical DNA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/30 text-xs font-medium text-foreground cursor-pointer transition-colors">
                <span>Subtle Intensity (Restrained)</span>
                <HaloIcon icon={Layers01Icon} size={14} className="text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" intensity="subtle">
              <span>Subtle 10-layer Liquid Glass</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/30 text-xs font-medium text-foreground cursor-pointer transition-colors">
                <span>Balanced Intensity (Enhanced Highlights)</span>
                <HaloIcon icon={Layers01Icon} size={14} className="text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" intensity="balanced">
              <span>Balanced 10-layer Liquid Glass</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      {/* 6. Nested Overlay Regression (Inside Dialog) */}
      <section id="nested-dialog" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Overlay Regression (Tooltip inside Dialog)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verify that tooltips rendered inside modal dialogs appear above the dialog surface without z-index collisions, dismiss cleanly on trigger blur, and do not trap focus.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-foreground">Modal Environment Verification</h4>
            <p className="text-xs text-muted-foreground">
              Launch a modal dialog containing tooltip-enabled actions.
            </p>
          </div>

          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" size="sm">
                  Open Test Dialog
                </Button>
              }
            />
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Export Configuration</DialogTitle>
                <DialogDescription>
                  Configure deployment parameters. Hover over the question badges to inspect tooltips inside this modal.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-2 text-xs">
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Optical Scrim Occlusion</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex size-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground outline-none"
                          aria-label="Help on Optical Scrim"
                        >
                          <HaloIcon icon={InformationCircleIcon} size={13} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Blurs background application by 16px with 60% opacity.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="font-mono text-muted-foreground">Active</span>
                </div>
              </div>

              <DialogFooter>
                <DialogClose
                  render={
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  }
                />
                <Button size="sm">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
