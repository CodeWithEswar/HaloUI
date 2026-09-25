"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { NumberField } from "@/components/ui/number-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function NumberFieldPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [preset, setPreset] = React.useState<"seats" | "opacity" | "temperature" | "regression">("seats");
  const [stepperPlacement, setStepperPlacement] = React.useState<"right" | "split" | "none">("right");
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled" | "readOnly">("interactive");
  const [size, setSize] = React.useState<"sm" | "default" | "lg">("default");

  // Domain configurations
  const config = React.useMemo(() => {
    switch (preset) {
      case "seats":
        return { label: "Workspace Seats", desc: "Choose the number of active team seats (1–20).", min: 1, max: 20, step: 1, initial: 4 };
      case "opacity":
        return { label: "Layer Opacity", desc: "Set fine decimal alpha transparency (0.0–1.0).", min: 0, max: 1, step: 0.1, initial: 0.8 };
      case "temperature":
        return { label: "Temperature Offset", desc: "Adjust ambient climate offset (-10°C to +10°C).", min: -10, max: 10, step: 1, initial: -2 };
      case "regression":
        return { label: "Section 57 Domain", desc: "Critical QA domain: min=-10, max=10, step=0.1.", min: -10, max: 10, step: 0.1, initial: 2.5 };
    }
  }, [preset]);

  const [value, setValue] = React.useState<number | null>(config.initial);

  // Sync value when preset changes
  React.useEffect(() => {
    setValue(config.initial);
  }, [config]);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isReadOnly = statePreset === "readOnly";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const readOnlyAttr = isReadOnly ? " readOnly" : "";
    const sizeAttr = size !== "default" ? ` size="${size}"` : "";
    const placementAttr = stepperPlacement !== "right" ? ` stepperPlacement="${stepperPlacement}"` : "";

    return `import { NumberField } from "@/components/ui/number-field";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function NumberFieldExample() {
  const [value, setValue] = React.useState<number | null>(${value === null ? "null" : value});

  return (
    <Field id="numeric-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="numeric-input" className="font-semibold">
        ${config.label}
      </FieldLabel>
      <FieldDescription>
        ${config.desc}
      </FieldDescription>
      <NumberField
        id="numeric-input"
        min={${config.min}}
        max={${config.max}}
        step={${config.step}}
        value={value}
        onValueChange={setValue}${placementAttr}${sizeAttr}${invalidAttr}${disabledAttr}${readOnlyAttr}
      />${
        isInvalid
          ? `\n      <FieldError>The entered value is outside acceptable business thresholds.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [config, isDisabled, isInvalid, isReadOnly, size, stepperPlacement, value]);

  return (
    <PreviewStageShell
      title="Number Field Interactive Stage"
      description="Evaluate accessible numeric entry, keyboard arrow stepping, decimal precision, negative number editing, and stepper ergonomics."
      badge="Numeric Spinbutton Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Domain Preset"
            value={preset}
            onValueChange={(val) => setPreset(val as typeof preset)}
            options={[
              { value: "seats", label: "Seats (1–20, step=1)" },
              { value: "opacity", label: "Opacity (0–1, step=0.1)" },
              { value: "temperature", label: "Offset (-10 to 10, step=1)" },
              { value: "regression", label: "QA Domain (-10 to 10, step=0.1)" },
            ]}
          />

          <StageControlSelect
            label="Stepper Layout"
            value={stepperPlacement}
            onValueChange={(val) => setStepperPlacement(val as typeof stepperPlacement)}
            options={[
              { value: "right", label: "Right Cluster (Side-by-side)" },
              { value: "split", label: "Split Layout ([-] Input [+])" },
              { value: "none", label: "None (Pure Text)" },
            ]}
          />

          <StageControlSelect
            label="State Variant"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as typeof statePreset)}
            options={[
              { value: "interactive", label: "Interactive (Normal)" },
              { value: "invalid", label: "Invalid State" },
              { value: "disabled", label: "Disabled (Locked)" },
              { value: "readOnly", label: "Read-Only (Selectable)" },
            ]}
          />

          <StageControlSelect
            label="Assembly Size"
            value={size}
            onValueChange={(val) => setSize(val as typeof size)}
            options={[
              { value: "sm", label: "Small (32px)" },
              { value: "default", label: "Default (40px)" },
              { value: "lg", label: "Large (48px)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Committed Value",
          value: value === null ? "null (empty)" : String(value),
          variant: "success",
        },
        {
          label: "Domain Bounds",
          value: `[${config.min}, ${config.max}]`,
        },
        {
          label: "Granularity",
          value: `step=${config.step}`,
        },
        {
          label: "Steppers",
          value: stepperPlacement,
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-number-field" invalid={isInvalid} disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <FieldLabel
                htmlFor="stage-numeric-input"
                className="text-sm font-semibold tracking-tight text-foreground select-none"
              >
                {config.label}
              </FieldLabel>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setValue(0)}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Set 0
                </button>
                <button
                  type="button"
                  onClick={() => setValue(null)}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <FieldDescription className="text-xs text-muted-foreground mb-3 select-none leading-relaxed">
              {config.desc}
            </FieldDescription>

            <NumberField
              id="stage-numeric-input"
              min={config.min}
              max={config.max}
              step={config.step}
              value={value}
              onValueChange={setValue}
              size={size}
              stepperPlacement={stepperPlacement}
              disabled={isDisabled}
              readOnly={isReadOnly}
              invalid={isInvalid}
            />

            {isInvalid && (
              <FieldError className="mt-2.5 text-xs text-destructive">
                The entered value violates permitted allocation thresholds.
              </FieldError>
            )}

            <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground select-none">
              <span>Keyboard: <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-muted/50">↑</kbd> <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-muted/50">↓</kbd></span>
              <span>Fast step: <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-muted/50">Shift</kbd> + <kbd className="font-mono px-1 py-0.5 rounded border border-border bg-muted/50">↑</kbd></span>
            </div>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
