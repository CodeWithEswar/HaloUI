"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageBackdrop,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { HaloIcon } from "@/components/icons/halo-icon";
import { VolumeHighIcon, VolumeLowIcon, VolumeMute01Icon } from "@hugeicons/core-free-icons";

export function SliderPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  const [value, setValue] = React.useState<number>(65);
  const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal");
  const [stepChoice, setStepChoice] = React.useState<string>("1");
  const [statePreset, setStatePreset] = React.useState<"interactive" | "disabled">("interactive");

  const step = Number(stepChoice);
  const isDisabled = statePreset === "disabled";

  const getVolumeIcon = () => {
    if (value === 0) return VolumeMute01Icon;
    if (value < 50) return VolumeLowIcon;
    return VolumeHighIcon;
  };

  const generatedCode = React.useMemo(() => {
    const orientAttr = orientation === "vertical" ? ` orientation="vertical"` : "";
    const stepAttr = step !== 1 ? ` step={${step}}` : "";
    const disabledAttr = isDisabled ? ` disabled` : "";

    return `import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function VolumeSliderExample() {
  const [volume, setVolume] = React.useState<number>(${value});

  return (
    <Field id="volume-field"${disabledAttr}>
      <div className="flex items-center justify-between mb-2">
        <FieldLabel htmlFor="volume-slider" className="font-semibold text-sm">
          Volume Level
        </FieldLabel>
        <span className="font-mono text-xs font-semibold text-primary">
          {volume}%
        </span>
      </div>
      <FieldDescription className="mb-3">
        Continuous numeric adjustment with tactile glass thumb.
      </FieldDescription>
      <Slider
        id="volume-slider"
        value={volume}
        onValueChange={setVolume}
        min={0}
        max={100}${stepAttr}${orientAttr}${disabledAttr}
        aria-label="Volume level"
      />
    </Field>
  );
}`;
  }, [isDisabled, orientation, step, value]);

  return (
    <PreviewStageShell
      title="Slider Interactive Stage"
      description="Evaluate continuous single-value range interaction, physical liquid glass optical channels, keyboard increment/decrement, and tactile drag response."
      badge="Optical Liquid Material"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Orientation"
            value={orientation}
            onValueChange={(val) => setOrientation(val as typeof orientation)}
            options={[
              { value: "horizontal", label: "Horizontal (Standard)" },
              { value: "vertical", label: "Vertical (EQ / Channel)" },
            ]}
          />

          <StageControlSelect
            label="Step Resolution"
            value={stepChoice}
            onValueChange={setStepChoice}
            options={[
              { value: "1", label: "Step: 1 (Continuous)" },
              { value: "5", label: "Step: 5 (Fine)" },
              { value: "10", label: "Step: 10 (Decade)" },
              { value: "25", label: "Step: 25 (Discrete)" },
            ]}
          />

          <StageControlSelect
            label="State Preset"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as typeof statePreset)}
            options={[
              { value: "interactive", label: "Interactive (Default)" },
              { value: "disabled", label: "Disabled (Locked)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Current Value",
          value: `${value}`,
          variant: "success",
        },
        {
          label: "Orientation",
          value: orientation === "horizontal" ? "Horizontal" : "Vertical",
          variant: "default",
        },
        {
          label: "Step",
          value: `${step}`,
          variant: "default",
        },
        {
          label: "A11y Pattern",
          value: "WAI-ARIA Slider",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        {/* Authentic Liquid Glass Showcase Card */}
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-slider-field" disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <FieldLabel
                htmlFor="stage-slider-control"
                className="text-sm font-semibold tracking-tight text-foreground select-none"
              >
                Playback Gain
              </FieldLabel>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary">
                {value}%
              </span>
            </div>
            <FieldDescription className="text-xs text-muted-foreground mb-4">
              Single-value continuous range with optical glass substrate.
            </FieldDescription>

            {orientation === "horizontal" ? (
              <div className="flex items-center gap-3">
                <HaloIcon icon={getVolumeIcon()} size={18} className="text-muted-foreground shrink-0" />
                <Slider
                  id="stage-slider-control"
                  value={value}
                  onValueChange={setValue}
                  min={0}
                  max={100}
                  step={step}
                  disabled={isDisabled}
                  aria-label="Playback gain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="h-44 flex items-center justify-center">
                  <Slider
                    id="stage-slider-control"
                    orientation="vertical"
                    value={value}
                    onValueChange={setValue}
                    min={0}
                    max={100}
                    step={step}
                    disabled={isDisabled}
                    aria-label="Playback gain"
                  />
                </div>
                <HaloIcon icon={getVolumeIcon()} size={18} className="text-muted-foreground mt-3" />
              </div>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
