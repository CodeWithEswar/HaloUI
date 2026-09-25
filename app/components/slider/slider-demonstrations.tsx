"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMute01Icon,
  RotateLeft01Icon,
} from "@hugeicons/core-free-icons";

export function PrimarySliderDemo() {
  const [volume, setVolume] = React.useState<number>(65);

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeMute01Icon;
    if (volume < 50) return VolumeLowIcon;
    return VolumeHighIcon;
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="volume-field">
        <div className="flex items-center justify-between gap-4 mb-2">
          <FieldLabel htmlFor="volume-slider" className="font-semibold text-sm">
            Output volume
          </FieldLabel>
          <span className="font-mono text-xs font-semibold text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
            {volume}%
          </span>
        </div>
        <FieldDescription className="mb-3">
          Adjust the master playback amplitude.
        </FieldDescription>
        <div className="flex items-center gap-3">
          <HaloIcon
            icon={getVolumeIcon()}
            size={18}
            className="text-muted-foreground shrink-0"
          />
          <Slider
            id="volume-slider"
            value={volume}
            onValueChange={setVolume}
            min={0}
            max={100}
            step={1}
            aria-label="Output volume"
            aria-valuetext={`${volume} percent`}
          />
        </div>
      </Field>
    </div>
  );
}

export function DiscreteStepsSliderDemo() {
  const [level, setLevel] = React.useState<number>(50);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="discrete-field">
        <div className="flex items-center justify-between gap-4 mb-2">
          <FieldLabel htmlFor="discrete-slider" className="font-semibold text-sm">
            Quality Preset
          </FieldLabel>
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            {level === 0 ? "Draft" : level === 25 ? "Good" : level === 50 ? "High" : level === 75 ? "Ultra" : "Maximum"}
          </span>
        </div>
        <FieldDescription className="mb-4">
          Snaps to predefined 25% increments.
        </FieldDescription>
        <Slider
          id="discrete-slider"
          value={level}
          onValueChange={setLevel}
          min={0}
          max={100}
          step={25}
          aria-label="Quality preset"
        />
        <div className="flex justify-between text-[11px] text-muted-foreground mt-2 font-mono">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </Field>
    </div>
  );
}

export function VerticalSliderDemo() {
  const [eq, setEq] = React.useState<number>(75);

  return (
    <div className="w-full max-w-xs mx-auto p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-sm font-semibold text-foreground">EQ Band 1</span>
        <span className="font-mono text-xs text-primary font-semibold">{eq}dB</span>
      </div>
      <div className="h-48 py-2 flex items-center justify-center">
        <Slider
          orientation="vertical"
          value={eq}
          onValueChange={setEq}
          min={0}
          max={100}
          step={1}
          aria-label="Equalizer Band 1"
        />
      </div>
      <span className="text-xs text-muted-foreground mt-3 font-mono">1.2 kHz</span>
    </div>
  );
}

export function ControlledSliderDemo() {
  const [brightness, setBrightness] = React.useState<number>(80);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="controlled-field">
        <div className="flex items-center justify-between gap-4 mb-2">
          <FieldLabel htmlFor="controlled-slider" className="font-semibold text-sm">
            Screen Brightness
          </FieldLabel>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-foreground">
              {brightness}%
            </span>
            <button
              type="button"
              onClick={() => setBrightness(50)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 border border-border/60 px-1.5 py-0.5 rounded transition-colors"
            >
              <HaloIcon icon={RotateLeft01Icon} size={11} />
              Reset
            </button>
          </div>
        </div>
        <Slider
          id="controlled-slider"
          value={brightness}
          onValueChange={setBrightness}
          min={0}
          max={100}
          step={1}
          aria-label="Display brightness"
        />
      </Field>
    </div>
  );
}

export function DisabledSliderDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="disabled-field" disabled>
        <div className="flex items-center justify-between gap-4 mb-2">
          <FieldLabel htmlFor="disabled-slider" className="font-semibold text-sm">
            Power Threshold (Locked)
          </FieldLabel>
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            30W
          </span>
        </div>
        <FieldDescription className="mb-3">
          Requires administrative privileges to adjust.
        </FieldDescription>
        <Slider
          id="disabled-slider"
          defaultValue={30}
          disabled
          aria-label="Locked power threshold"
        />
      </Field>
    </div>
  );
}
