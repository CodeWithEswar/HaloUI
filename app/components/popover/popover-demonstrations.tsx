"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverClose,
} from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Settings02Icon,
  Layers01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  SlidersHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function PopoverDemonstrations() {
  // Form demonstration states
  const [endpointName, setEndpointName] = React.useState("");
  const [endpointTouched, setEndpointTouched] = React.useState(false);
  const [formSaved, setFormSaved] = React.useState(false);

  const isEndpointInvalid = endpointTouched && endpointName.trim().length === 0;

  return (
    <div className="space-y-16">
      {/* 1. Cardinal Sides & Alignments */}
      <section id="positioning-sides" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Cardinal Placement & Alignment
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Popover positions along any primary side relative to the trigger with automatic collision avoidance and alignment offsets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { side: "top" as const, label: "Top (Center)", icon: ArrowUp01Icon },
            { side: "bottom" as const, label: "Bottom (Center)", icon: ArrowDown01Icon },
            { side: "left" as const, label: "Left (Center)", icon: ArrowLeft01Icon },
            { side: "right" as const, label: "Right (Center)", icon: ArrowRight01Icon },
          ].map(({ side, label, icon }) => (
            <Popover key={side}>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-full justify-center gap-1.5 py-4 h-auto text-xs">
                    <HaloIcon icon={icon} size={14} />
                    <span>{label}</span>
                  </Button>
                }
              />
              <PopoverContent side={side} align="center" className="w-64">
                <PopoverHeader>
                  <PopoverTitle className="capitalize">{side} Anchored</PopoverTitle>
                  <PopoverDescription>
                    Positioned on the {side} side of the trigger element with a calibrated 8px offset.
                  </PopoverDescription>
                </PopoverHeader>
                <div className="text-xs text-muted-foreground pt-1">
                  Collision avoidance automatically flips to the opposing axis when space is restricted.
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </section>

      {/* 2. Compact Contextual Form with Validation & Focus Ring */}
      <section id="form-validation" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Contextual Form & Focus Ring Separation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Demonstrates interactive inputs, labels, and accessible validation states. The high-contrast focus ring remains crisply distinguishable from the Liquid Glass specular edge.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" className="gap-2 text-xs">
                  <HaloIcon icon={SlidersHorizontalIcon} size={14} />
                  <span>Configure Webhook</span>
                </Button>
              }
            />
            <PopoverContent side="bottom" align="start" className="w-80">
              <PopoverHeader>
                <PopoverTitle>Webhook Configuration</PopoverTitle>
                <PopoverDescription>
                  Enter a destination endpoint and event subscription path.
                </PopoverDescription>
              </PopoverHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEndpointTouched(true);
                  if (endpointName.trim().length > 0) {
                    setFormSaved(true);
                    setTimeout(() => setFormSaved(false), 3000);
                  }
                }}
                className="space-y-3 py-1 text-left"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="webhook-endpoint" className="text-xs font-medium text-foreground">
                      Endpoint URL
                    </Label>
                    <span className="text-[10px] text-muted-foreground">Required</span>
                  </div>
                  <Input
                    id="webhook-endpoint"
                    type="text"
                    placeholder="https://api.example.com/events"
                    value={endpointName}
                    onChange={(e) => {
                      setEndpointName(e.target.value);
                      if (!endpointTouched) setEndpointTouched(true);
                    }}
                    onBlur={() => setEndpointTouched(true)}
                    className={
                      isEndpointInvalid
                        ? "border-destructive focus-visible:ring-destructive/40 text-xs"
                        : "text-xs"
                    }
                  />
                  {isEndpointInvalid && (
                    <div className="flex items-center gap-1 text-[11px] text-destructive">
                      <HaloIcon icon={AlertCircleIcon} size={12} />
                      <span>Endpoint URL cannot be empty.</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="webhook-secret" className="text-xs font-medium text-foreground">
                    Signing Secret (Optional)
                  </Label>
                  <Input
                    id="webhook-secret"
                    type="password"
                    placeholder="whsec_••••••••••••"
                    className="text-xs font-mono"
                  />
                </div>

                {formSaved && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
                    <span>Configuration successfully verified.</span>
                  </div>
                )}

                <PopoverFooter>
                  <PopoverClose render={<Button type="button" variant="ghost" size="sm" className="text-xs">Cancel</Button>} />
                  <Button type="submit" size="sm" className="text-xs">Save Endpoint</Button>
                </PopoverFooter>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* 3. Liquid Glass Material Intensity Tiers */}
      <section id="optical-intensity" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Liquid Glass Optical Intensities
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Popover supports Subtle, Balanced (default), and Rich material intensities, orchestrating specular reflection strength without duplicating CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["subtle", "balanced", "rich"] as const).map((tier) => (
            <Popover key={tier}>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-full justify-between px-4 py-3 h-auto text-xs capitalize">
                    <span className="font-medium">{tier} Intensity</span>
                    <HaloIcon icon={Layers01Icon} size={14} className="text-muted-foreground" />
                  </Button>
                }
              />
              <PopoverContent side="bottom" align="center" intensity={tier} className="w-72">
                <PopoverHeader>
                  <PopoverTitle className="capitalize">{tier} Optical Intensity</PopoverTitle>
                  <PopoverDescription>
                    {tier === "subtle"
                      ? "Restrained 8px blur with 40% specular reflection for subtle ambient contexts."
                      : tier === "balanced"
                      ? "Canonical 16px blur with 85% balanced specular highlight for general interfaces."
                      : "Rich 28px blur with 120% specular gleam and deep opposing internal reflection."}
                  </PopoverDescription>
                </PopoverHeader>
                <div className="p-3 rounded-xl bg-background/50 border border-border/40 text-xs text-muted-foreground">
                  Surface token: <code className="font-mono text-foreground font-medium">halo-intensity-{tier}</code>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </section>

      {/* 4. Nested Overlay Integration (Popover inside Modal Dialog) */}
      <section id="nested-overlays" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Overlay Stacking & Focus Isolation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verify that a Popover launched from within a parent modal Dialog appears on a higher z-index stacking plane, preserves outside interaction mechanics, and allows Escape to dismiss the popover without dismissing the parent dialog.
          </p>
        </div>

        <div>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="default" className="text-xs gap-1.5 shadow-sm">
                  <HaloIcon icon={Settings02Icon} size={14} />
                  <span>Open Parent Dialog</span>
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Parent Modal Container</DialogTitle>
                <DialogDescription>
                  This modal dialog contains a nested popover trigger to validate overlay stacking and focus restoration.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4 text-xs">
                <p className="text-muted-foreground leading-relaxed">
                  Click the button below to launch an anchored popover from inside this active modal dialog:
                </p>

                <div className="flex items-center justify-center p-6 rounded-2xl border border-border/60 bg-muted/20">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button variant="outline" size="sm" className="text-xs gap-1.5">
                          <HaloIcon icon={Layers01Icon} size={14} />
                          <span>Trigger Nested Popover</span>
                        </Button>
                      }
                    />
                    <PopoverContent side="top" align="center" className="w-64 z-[60]">
                      <PopoverHeader>
                        <PopoverTitle>Nested Popover</PopoverTitle>
                        <PopoverDescription>
                          Portalled into the DOM with higher stacking precedence than the modal backdrop.
                        </PopoverDescription>
                      </PopoverHeader>
                      <p className="text-xs text-muted-foreground pt-1">
                        Pressing Escape will close this popover while leaving the parent modal dialog open.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <DialogFooter>
                <DialogClose render={<Button variant="outline" size="sm">Close Dialog</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
