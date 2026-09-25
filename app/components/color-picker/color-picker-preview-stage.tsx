"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import {
  ColorPicker,
  ColorSwatch,
  hexToRgb,
  hexToHsv,
} from "@/components/ui/color-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function ColorPickerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled">("interactive");
  const [displayMode, setDisplayMode] = React.useState<"popover" | "inline">("popover");
  const [alphaMode, setAlphaMode] = React.useState<"opaque" | "alpha">("opaque");

  const [color, setColor] = React.useState<string>("#3B82F6");

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isInline = displayMode === "inline";
  const showAlpha = alphaMode === "alpha";

  const rgb = React.useMemo(() => hexToRgb(color), [color]);
  const hsv = React.useMemo(() => hexToHsv(color), [color]);

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const inlineAttr = isInline ? " inline" : "";
    const alphaAttr = showAlpha ? " showAlpha" : "";

    return `import * as React from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function AccentColorExample() {
  const [color, setColor] = React.useState("${color}");

  return (
    <Field id="accent-color-field"${invalidAttr}${disabledAttr}>
      <FieldLabel className="font-semibold">Accent Color</FieldLabel>
      <FieldDescription>
        Choose an accent color for UI highlights and brand surfaces.
      </FieldDescription>
      <div className="pt-2">
        <ColorPicker${inlineAttr}${alphaAttr}${invalidAttr}${disabledAttr}
          value={color}
          onValueChange={setColor}
        />
      </div>${isInvalid ? `\n      <FieldError>Selected color does not meet contrast requirements.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [color, isDisabled, isInline, isInvalid, showAlpha]);

  return (
    <PreviewStageShell
      title="Color Picker Interactive Stage"
      description="Evaluate two-dimensional saturation/brightness adjustment, hue spectrum controls, optional alpha transparency, precise HEX input synchronization, and optical neutral purity."
      badge="Forms & Fields 27"
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
              { value: "invalid", label: "Invalid (Error)" },
              { value: "disabled", label: "Disabled" },
            ]}
          />
          <StageControlSelect
            label="Display Mode"
            value={displayMode}
            onValueChange={(val) => setDisplayMode(val as any)}
            options={[
              { value: "popover", label: "Floating Popover" },
              { value: "inline", label: "Always-Visible Inline" },
            ]}
          />
          <StageControlSelect
            label="Transparency"
            value={alphaMode}
            onValueChange={(val) => setAlphaMode(val as any)}
            options={[
              { value: "opaque", label: "Opaque (6-digit HEX)" },
              { value: "alpha", label: "Alpha Channel (8-digit HEX)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "HEX",
          value: color,
          variant: "success",
        },
        {
          label: "RGB",
          value: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
          variant: "default",
        },
        {
          label: "HSV",
          value: `${hsv.h}°, ${hsv.s}%, ${hsv.v}%`,
          variant: "default",
        },
        {
          label: "Optical Clarity",
          value: "Zero Contamination",
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate transition-all">
          <Field
            id="stage-color-picker-field"
            aria-invalid={isInvalid ? "true" : undefined}
            disabled={isDisabled}
          >
            <FieldLabel className="font-semibold text-foreground text-sm select-none">
              Theme Accent Color
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              Visual spectrum adjustment with synchronized text entry.
            </FieldDescription>

            <div className="pt-2 flex flex-col items-center">
              <ColorPicker
                inline={isInline}
                showAlpha={showAlpha}
                disabled={isDisabled}
                invalid={isInvalid}
                value={color}
                onValueChange={setColor}
              />
            </div>

            {isInvalid && (
              <FieldError>Selected color does not meet workspace contrast guidelines.</FieldError>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
