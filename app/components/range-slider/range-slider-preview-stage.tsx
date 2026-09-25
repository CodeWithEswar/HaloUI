"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { RangeSlider, type RangeValue } from "@/components/ui/range-slider";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

export function RangeSliderPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [preset, setPreset] = React.useState<"price" | "percent" | "age">("price");
  const [collision, setCollision] = React.useState<"none" | "push" | "swap">("none");
  const [isDisabled, setIsDisabled] = React.useState<"no" | "yes">("no");

  // Domain configuration based on preset
  const domain = React.useMemo(() => {
    switch (preset) {
      case "price":
        return { min: 0, max: 1000, step: 25, format: (v: number) => `$${v}` };
      case "percent":
        return { min: 0, max: 100, step: 5, format: (v: number) => `${v}%` };
      case "age":
        return { min: 18, max: 80, step: 1, format: (v: number) => `${v} yrs` };
    }
  }, [preset]);

  // Range values
  const [range, setRange] = React.useState<RangeValue>([250, 750]);

  // Adjust range when domain changes
  React.useEffect(() => {
    if (preset === "price") setRange([250, 750]);
    if (preset === "percent") setRange([20, 80]);
    if (preset === "age") setRange([25, 45]);
  }, [preset]);

  const disabled = isDisabled === "yes";

  const generatedCode = React.useMemo(() => {
    const disabledAttr = disabled ? " disabled" : "";
    const collisionAttr = collision !== "none" ? ` thumbCollisionBehavior="${collision}"` : "";

    return `import { RangeSlider } from "@/components/ui/range-slider";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function PriceRangeExample() {
  const [range, setRange] = React.useState<[number, number]>([${range[0]}, ${range[1]}]);

  return (
    <Field id="price-range-field">
      <div className="flex items-center justify-between gap-4 mb-3">
        <FieldLabel htmlFor="price-range" className="text-sm font-semibold">
          Price Range
        </FieldLabel>
        <span className="text-xs font-mono font-medium text-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border">
          ${domain.format(range[0])} – ${domain.format(range[1])}
        </span>
      </div>
      <RangeSlider
        id="price-range"
        min={${domain.min}}
        max={${domain.max}}
        step={${domain.step}}
        value={range}
        onValueChange={setRange}${collisionAttr}${disabledAttr}
        minLabel="Minimum price"
        maxLabel="Maximum price"
      />
      <FieldDescription className="text-xs text-muted-foreground mt-2">
        Adjust minimum and maximum boundaries to filter search results.
      </FieldDescription>
    </Field>
  );
}`;
  }, [collision, disabled, domain, range]);

  return (
    <PreviewStageShell
      title="Range Slider Interactive Stage"
      description="Evaluate two-thumb interval adjustments, selected range fill, thumb collision mechanics, and accessible endpoint identities."
      badge="Two-Thumb Interval Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Domain Preset"
            value={preset}
            onValueChange={(val) => setPreset(val as typeof preset)}
            options={[
              { value: "price", label: "Price ($0 – $1,000)" },
              { value: "percent", label: "Percent (0 – 100%)" },
              { value: "age", label: "Age (18 – 80 yrs)" },
            ]}
          />

          <StageControlSelect
            label="Collision Model"
            value={collision}
            onValueChange={(val) => setCollision(val as typeof collision)}
            options={[
              { value: "none", label: "None (Stop at bound)" },
              { value: "push", label: "Push (Shifts neighbor)" },
              { value: "swap", label: "Swap (Cross boundaries)" },
            ]}
          />

          <StageControlSelect
            label="Availability"
            value={isDisabled}
            onValueChange={(val) => setIsDisabled(val as typeof isDisabled)}
            options={[
              { value: "no", label: "Enabled (Interactive)" },
              { value: "yes", label: "Disabled (Locked)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Selected Interval",
          value: `${domain.format(range[0])} – ${domain.format(range[1])}`,
          variant: "success",
        },
        {
          label: "Interval Span",
          value: domain.format(range[1] - range[0]),
        },
        {
          label: "Thumbs",
          value: "2 (Independent Focus)",
          variant: "success",
        },
        {
          label: "Keyboard Model",
          value: "Arrows / Home / End",
        },
      ]}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-range-slider-field" disabled={disabled}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="grid gap-0.5">
                <FieldLabel
                  htmlFor="stage-range-slider"
                  className="text-sm font-semibold tracking-tight text-foreground select-none"
                >
                  {preset === "price"
                    ? "Budget Range"
                    : preset === "percent"
                    ? "Confidence Interval"
                    : "Age Distribution"}
                </FieldLabel>
                <span className="text-[11px] text-muted-foreground select-none">
                  Domain: {domain.format(domain.min)} to {domain.format(domain.max)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/80 bg-background/80 shadow-2xs">
                <span className="text-xs font-mono font-semibold text-foreground">
                  {domain.format(range[0])}
                </span>
                <span className="text-xs text-muted-foreground">–</span>
                <span className="text-xs font-mono font-semibold text-foreground">
                  {domain.format(range[1])}
                </span>
              </div>
            </div>

            <RangeSlider
              id="stage-range-slider"
              min={domain.min}
              max={domain.max}
              step={domain.step}
              value={range}
              onValueChange={setRange}
              disabled={disabled}
              thumbCollisionBehavior={collision}
              minLabel="Minimum threshold"
              maxLabel="Maximum threshold"
            />

            <FieldDescription className="text-xs text-muted-foreground mt-3 select-none leading-relaxed">
              Use <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-border bg-muted/60">Tab</kbd> to focus either thumb, then <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-border bg-muted/60">←</kbd> <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-border bg-muted/60">→</kbd> to step.
            </FieldDescription>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
