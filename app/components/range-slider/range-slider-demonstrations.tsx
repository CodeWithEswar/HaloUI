"use client";

import * as React from "react";
import { RangeSlider, type RangeValue } from "@/components/ui/range-slider";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Price Range Demo                                                */
/* -------------------------------------------------------------------------- */

export function PrimaryRangeSliderDemo() {
  const [range, setRange] = React.useState<RangeValue>([200, 800]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-price-field">
        <div className="flex items-center justify-between gap-4 mb-3">
          <FieldLabel htmlFor="demo-price-slider" className="text-sm font-semibold text-foreground">
            Price Range
          </FieldLabel>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-border bg-background/80 text-xs font-mono font-medium">
            <span>${range[0]}</span>
            <span className="text-muted-foreground">–</span>
            <span>${range[1]}</span>
          </div>
        </div>
        <RangeSlider
          id="demo-price-slider"
          min={0}
          max={1000}
          step={50}
          value={range}
          onValueChange={setRange}
          minLabel="Minimum price"
          maxLabel="Maximum price"
        />
        <FieldDescription className="text-xs text-muted-foreground mt-2.5">
          Select target price threshold within $0 and $1,000.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Age Interval Demo (Step = 1)                                            */
/* -------------------------------------------------------------------------- */

export function AgeIntervalDemo() {
  const [range, setRange] = React.useState<RangeValue>([21, 65]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-age-field">
        <div className="flex items-center justify-between gap-4 mb-3">
          <FieldLabel htmlFor="demo-age-slider" className="text-sm font-semibold text-foreground">
            Target Demographic Age
          </FieldLabel>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md border border-border bg-background/80 text-foreground">
            {range[0]} – {range[1]} years
          </span>
        </div>
        <RangeSlider
          id="demo-age-slider"
          min={18}
          max={80}
          step={1}
          value={range}
          onValueChange={setRange}
          minLabel="Minimum age"
          maxLabel="Maximum age"
        />
        <FieldDescription className="text-xs text-muted-foreground mt-2.5">
          Discrete step of 1 year between ages 18 and 80.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Near-Overlapping Thumbs Demo (Critical QA Scenario)                     */
/* -------------------------------------------------------------------------- */

export function NarrowAndOverlappingDemo() {
  const [range, setRange] = React.useState<RangeValue>([48, 52]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl space-y-4", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Near-Overlapping Bounds QA</h4>
          <p className="text-xs text-muted-foreground">Test focus recovery when thumbs are adjacent</p>
        </div>
        <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-md border border-border bg-background/90">
          [{range[0]}, {range[1]}]
        </span>
      </div>

      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={range}
        onValueChange={setRange}
        minLabel="Lower bound"
        maxLabel="Upper bound"
        aria-label="Near-overlapping thumbs demo"
      />

      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <button
          type="button"
          onClick={() => setRange([50, 50])}
          className="text-xs font-medium px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer shadow-2xs"
        >
          Collide to [50, 50]
        </button>
        <button
          type="button"
          onClick={() => setRange([20, 80])}
          className="text-xs font-medium px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer shadow-2xs"
        >
          Reset to [20, 80]
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Collision Modes Comparison Demo                                         */
/* -------------------------------------------------------------------------- */

export function CollisionModesDemo() {
  const [noneVal, setNoneVal] = React.useState<RangeValue>([30, 70]);
  const [pushVal, setPushVal] = React.useState<RangeValue>([30, 70]);
  const [swapVal, setSwapVal] = React.useState<RangeValue>([30, 70]);

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl space-y-5", DEMO_CONTAINER_GLASS)}>
      {/* None Mode */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Stop at Bound (none)</span>
          <span className="font-mono text-muted-foreground">[{noneVal[0]}, {noneVal[1]}]</span>
        </div>
        <RangeSlider
          value={noneVal}
          onValueChange={setNoneVal}
          thumbCollisionBehavior="none"
          aria-label="Collision none demo"
        />
      </div>

      {/* Push Mode */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Push Neighbor (push)</span>
          <span className="font-mono text-muted-foreground">[{pushVal[0]}, {pushVal[1]}]</span>
        </div>
        <RangeSlider
          value={pushVal}
          onValueChange={setPushVal}
          thumbCollisionBehavior="push"
          aria-label="Collision push demo"
        />
      </div>

      {/* Swap Mode */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Cross Boundaries (swap)</span>
          <span className="font-mono text-muted-foreground">[{swapVal[0]}, {swapVal[1]}]</span>
        </div>
        <RangeSlider
          value={swapVal}
          onValueChange={setSwapVal}
          thumbCollisionBehavior="swap"
          aria-label="Collision swap demo"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Disabled Range Slider Demo                                              */
/* -------------------------------------------------------------------------- */

export function DisabledRangeSliderDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl space-y-2 opacity-75", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">Disabled Range (Locked)</span>
        <span className="font-mono text-muted-foreground">[35, 65]</span>
      </div>
      <RangeSlider
        defaultValue={[35, 65]}
        disabled
        aria-label="Disabled range slider demo"
      />
    </div>
  );
}
