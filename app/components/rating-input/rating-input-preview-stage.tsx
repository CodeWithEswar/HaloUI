"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import { RatingInput, type RatingSize } from "@/components/ui/rating-input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function RatingInputPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled">("interactive");
  const [size, setSize] = React.useState<RatingSize>("md");
  const [maxScale, setMaxScale] = React.useState<"5" | "7" | "10">("5");

  const [rating, setRating] = React.useState<number | null>(4);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const max = Number(maxScale);

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const sizeAttr = size !== "md" ? ` size="${size}"` : "";
    const maxAttr = max !== 5 ? ` max={${max}}` : "";

    return `import * as React from "react";
import { RatingInput } from "@/components/ui/rating-input";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function RatingExperienceExample() {
  const [rating, setRating] = React.useState<number | null>(${rating});

  return (
    <Field id="experience-rating"${invalidAttr}${disabledAttr}>
      <FieldLabel className="font-semibold">Overall experience</FieldLabel>
      <FieldDescription>
        Rate your experience from 1 to ${max}.
      </FieldDescription>
      <div className="pt-2">
        <RatingInput${sizeAttr}${maxAttr}${invalidAttr}${disabledAttr}
          value={rating}
          onValueChange={setRating}
          aria-label="Overall experience"
        />
      </div>${isInvalid ? `\n      <FieldError>Please select a rating before continuing.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [isInvalid, isDisabled, size, max, rating]);

  return (
    <PreviewStageShell
      title="Rating Input Interactive Stage"
      description="Evaluate single-choice ordered scale semantics, cumulative visual star fill, temporary hover preview, coordinated roving focus, and mobile touch targets."
      badge="Forms & Fields 28"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Preset"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as any)}
            options={[
              { value: "interactive", label: "Interactive" },
              { value: "invalid", label: "Invalid (Field Error)" },
              { value: "disabled", label: "Disabled" },
            ]}
          />
          <StageControlSelect
            label="Size Scale"
            value={size}
            onValueChange={(val) => setSize(val as any)}
            options={[
              { value: "sm", label: "Small (16px / 32px hit)" },
              { value: "md", label: "Medium (20px / 40px hit)" },
              { value: "lg", label: "Large (24px / 48px hit)" },
            ]}
          />
          <StageControlSelect
            label="Scale Length"
            value={maxScale}
            onValueChange={(val) => setMaxScale(val as any)}
            options={[
              { value: "5", label: "5-Star Scale (Standard)" },
              { value: "7", label: "7-Point Scale" },
              { value: "10", label: "10-Point Scale" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Committed Rating",
          value: rating !== null ? `${rating} of ${max}` : "None (empty)",
          variant: "success",
        },
        {
          label: "Cumulative Fill",
          value: rating !== null ? `Items 1..${rating} filled` : "0 filled",
          variant: "default",
        },
        {
          label: "Aria Radio Group",
          value: "W3C Coordinated",
          variant: "default",
        },
        {
          label: "Touch Hit Target",
          value: size === "sm" ? "32px × 32px" : size === "md" ? "40px × 40px" : "48px × 48px",
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate transition-all">
          <Field
            id="stage-rating-input-field"
            aria-invalid={isInvalid ? "true" : undefined}
            disabled={isDisabled}
          >
            <FieldLabel className="font-semibold text-foreground text-sm select-none">
              Overall experience
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              Rate your experience from 1 to {max}.
            </FieldDescription>

            <div className="pt-3 flex flex-col items-center">
              <RatingInput
                size={size}
                max={max}
                disabled={isDisabled}
                invalid={isInvalid}
                value={rating}
                onValueChange={setRating}
                aria-label="Overall experience"
              />
            </div>

            {isInvalid && (
              <FieldError className="pt-2 text-center">
                Please select a rating score before proceeding.
              </FieldError>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
