"use client";

import * as React from "react";
import { toast, Toaster } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  AlertCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

export function ToastDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. IMPERATIVE TOAST TRIGGERS */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Imperative Notification Types
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Trigger notifications from anywhere in your application tree using the `toast` manager. Each type features dedicated Hugeicons and restrained semantic accents.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.create({
                title: "Changes Saved",
                description: "Project settings successfully updated.",
                type: "success",
              })
            }
          >
            <HaloIcon icon={CheckmarkCircle02Icon} size={15} className="mr-1.5 text-emerald-500" />
            Trigger Success Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.create({
                title: "New Optical Foundation",
                description: "Subtle liquid diffusion engine is active.",
                type: "info",
              })
            }
          >
            <HaloIcon icon={InformationCircleIcon} size={15} className="mr-1.5 text-sky-500" />
            Trigger Info Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.create({
                title: "High API Consumption",
                description: "Rate limit threshold is currently at 84%.",
                type: "warning",
              })
            }
          >
            <HaloIcon icon={Alert02Icon} size={15} className="mr-1.5 text-amber-500" />
            Trigger Warning Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.create({
                title: "Deployment Failed",
                description: "Could not bind port 8080 on node-7.",
                type: "error",
              })
            }
          >
            <HaloIcon icon={AlertCircleIcon} size={15} className="mr-1.5 text-rose-500" />
            Trigger Error Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.create({
                title: "Compiling Artifacts",
                description: "Optimizing bundle for production delivery...",
                type: "loading",
              })
            }
          >
            <HaloIcon icon={Loading03Icon} size={15} className="mr-1.5 text-sky-500 animate-spin" />
            Trigger Loading Toast
          </Button>
        </div>
      </section>

      {/* 2. STACKED TOAST ARCHITECTURE */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Stacked Multi-Toast Physics
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Multiple active toasts nest with smooth cubic-bezier physics, peek offsets, and interactive swipe-to-dismiss gestures.
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Batch Notification Stress Test</CardTitle>
            <CardDescription>
              Spawn 3 successive notifications to observe automated stack layering and depth reduction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              size="sm"
              variant="default"
              onClick={() => {
                toast.create({ title: "Step 1: Ingress Initialized", type: "info" });
                setTimeout(() => {
                  toast.create({ title: "Step 2: DNS Records Updated", type: "warning" });
                }, 300);
                setTimeout(() => {
                  toast.create({ title: "Step 3: Verification Verified", type: "success" });
                }, 600);
              }}
            >
              Spawn Stack of 3 Toasts
            </Button>
            <div className="text-xs text-muted-foreground">
              Tip: Hover over the bottom-right corner to expand the stack and inspect previous notifications.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. MOBILE SAFETY AND CONTAINER MARGINS */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Mobile Safe Viewport Constraints
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            On phone viewports, the `ToastViewport` automatically transitions from fixed desktop dimensions (`w-96`) to safe fluid margins (`max-w-[calc(100vw-1.5rem)]`), preventing horizontal overflow on 320px–390px devices.
          </p>
        </div>

        <div className="max-w-[320px] p-3 rounded-xl border border-dashed border-border/80 bg-muted/10 space-y-2">
          <div className="text-xs font-mono uppercase text-muted-foreground">
            Mobile Viewport Simulation (320px)
          </div>
          <div className="p-3 rounded-lg border border-border/70 bg-card/85 backdrop-blur-md text-xs space-y-1">
            <div className="font-semibold text-foreground">Snapshot Created</div>
            <div className="text-muted-foreground leading-normal">
              Safe-area margins prevent clipping against mobile browser bottom bars.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
