"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import {
  TimePicker,
  to12Hour,
  parseTimeString,
} from "@/components/ui/time-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function TimePickerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled">("interactive");
  const [cyclePreset, setCyclePreset] = React.useState<"12" | "24">("12");
  const [stepPreset, setStepPreset] = React.useState<"1" | "5" | "15">("1");

  const [time, setTime] = React.useState<string | null>("14:30");

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const hourCycle = Number(cyclePreset) as 12 | 24;
  const minuteStep = Number(stepPreset);

  const parsed = React.useMemo(() => parseTimeString(time), [time]);
  const formatted12 = React.useMemo(() => {
    if (!parsed) return "None";
    const { hour12, period } = to12Hour(parsed.hours);
    const m = String(parsed.minutes).padStart(2, "0");
    return `${hour12}:${m} ${period}`;
  }, [parsed]);

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const cycleAttr = hourCycle !== 12 ? ` hourCycle={${hourCycle}}` : "";
    const stepAttr = minuteStep !== 1 ? ` minuteStep={${minuteStep}}` : "";

    return `import * as React from "react";
import { TimePicker } from "@/components/ui/time-picker";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function StartTimeSelection() {
  const [time, setTime] = React.useState<string | null>(${time ? `"${time}"` : "null"});

  return (
    <Field id="start-time"${invalidAttr}${disabledAttr}>
      <FieldLabel className="font-semibold">Start time</FieldLabel>
      <FieldDescription>
        Choose a local clock time for your meeting.
      </FieldDescription>
      <div className="pt-2">
        <TimePicker${cycleAttr}${stepAttr}${invalidAttr}${disabledAttr}
          value={time}
          onValueChange={setTime}
          aria-label="Start time"
        />
      </div>${isInvalid ? `\n      <FieldError>Please choose a valid start time.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [isInvalid, isDisabled, hourCycle, minuteStep, time]);

  return (
    <PreviewStageShell
      title="Time Picker Interactive Stage"
      description="Evaluate structured hour, minute, and AM/PM keyboard segment navigation, 12-hour versus 24-hour cycle modes, minute stepping increments, and strict time-only isolation without calendar dates."
      badge="Forms & Fields 31"
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
            label="Hour Cycle"
            value={cyclePreset}
            onValueChange={(val) => setCyclePreset(val as any)}
            options={[
              { value: "12", label: "12-Hour Cycle (AM/PM)" },
              { value: "24", label: "24-Hour Cycle (00-23)" },
            ]}
          />
          <StageControlSelect
            label="Minute Stepping"
            value={stepPreset}
            onValueChange={(val) => setStepPreset(val as any)}
            options={[
              { value: "1", label: "1 Minute (Continuous)" },
              { value: "5", label: "5 Minutes" },
              { value: "15", label: "15 Minutes (Quarter-hour)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "24h Canonical",
          value: time ?? "None (empty)",
          variant: "success",
        },
        {
          label: "12h Display",
          value: formatted12,
          variant: "default",
        },
        {
          label: "Time-Only Model",
          value: "Zero Date / TZ",
          variant: "success",
        },
        {
          label: "Segment Model",
          value: hourCycle === 12 ? "Hour:Min:Period" : "Hour:Min",
          variant: "default",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate transition-all">
          <Field
            id="stage-time-picker-field"
            aria-invalid={isInvalid ? "true" : undefined}
            disabled={isDisabled}
          >
            <FieldLabel className="font-semibold text-foreground text-sm select-none">
              Start time
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              Choose a local clock time.
            </FieldDescription>

            <div className="pt-3">
              <TimePicker
                hourCycle={hourCycle}
                minuteStep={minuteStep}
                disabled={isDisabled}
                invalid={isInvalid}
                value={time}
                onValueChange={setTime}
                aria-label="Start time"
              />
            </div>

            {isInvalid && (
              <FieldError className="pt-2">
                A valid time must be provided.
              </FieldError>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
