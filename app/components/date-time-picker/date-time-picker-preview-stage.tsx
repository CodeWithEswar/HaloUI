"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import {
  DateTimePicker,
  type LocalDateTimeParts,
} from "@/components/ui/date-time-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function DateTimePickerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"empty" | "partial" | "complete" | "invalid" | "disabled">("empty");
  const [hourCycle, setHourCycle] = React.useState<12 | 24>(12);
  const [clearablePreset, setClearablePreset] = React.useState<"clearable" | "standard">("clearable");

  // Initial value based on preset
  const [value, setValue] = React.useState<string | null>(null);
  const [parts, setParts] = React.useState<LocalDateTimeParts>({ date: null, time: null });

  React.useEffect(() => {
    if (statePreset === "empty") {
      setValue(null);
      setParts({ date: null, time: null });
    } else if (statePreset === "partial") {
      setValue(null);
      setParts({ date: new Date(2026, 8, 25), time: null });
    } else if (statePreset === "complete") {
      setValue("2026-09-25T14:30");
      setParts({ date: new Date(2026, 8, 25), time: "14:30" });
    } else if (statePreset === "invalid") {
      setValue(null);
      setParts({ date: null, time: null });
    } else if (statePreset === "disabled") {
      setValue("2026-10-12T09:15");
      setParts({ date: new Date(2026, 9, 12), time: "09:15" });
    }
  }, [statePreset]);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isClearable = clearablePreset === "clearable";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const clearableAttr = isClearable ? " clearable" : "";
    const cycleAttr = hourCycle === 24 ? " hourCycle={24}" : "";
    const valString = value ? `"${value}"` : "null";

    return `import * as React from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function ScheduledEvent() {
  const [dateTime, setDateTime] = React.useState<string | null>(${valString});

  return (
    <Field id="scheduled-event"${invalidAttr}${disabledAttr}>
      <FieldLabel className="font-semibold">Scheduled for</FieldLabel>
      <FieldDescription>
        Choose a date and time.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DateTimePicker${clearableAttr}${cycleAttr}${invalidAttr}${disabledAttr}
          value={dateTime}
          onValueChange={(val, parts) => {
            setDateTime(val);
            console.log("Decomposed local parts:", parts);
          }}
          placeholder="Pick date and time"
          aria-label="Scheduled for"
        />
      </div>${isInvalid ? `\n      <FieldError>Both a calendar date and clock time are required before proceeding.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [isInvalid, isDisabled, isClearable, hourCycle, value]);

  return (
    <PreviewStageShell
      title="Date Time Picker Interactive Stage"
      description="Evaluate single-date selection composed with local clock-time entry, partial vs complete completeness states, 12/24 hour display modes, and focus restoration."
      badge="Forms & Fields 32"
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
              { value: "empty", label: "Empty (Default)" },
              { value: "partial", label: "Partial (Date Only)" },
              { value: "complete", label: "Complete Value" },
              { value: "invalid", label: "Invalid (Field Error)" },
              { value: "disabled", label: "Disabled" },
            ]}
          />

          <StageControlSelect
            label="Hour Cycle"
            value={String(hourCycle)}
            onValueChange={(val) => setHourCycle(Number(val) as 12 | 24)}
            options={[
              { value: "12", label: "12-Hour (AM/PM)" },
              { value: "24", label: "24-Hour Military" },
            ]}
          />

          <StageControlSelect
            label="Clear Action"
            value={clearablePreset}
            onValueChange={(val) => setClearablePreset(val as any)}
            options={[
              { value: "clearable", label: "Clearable Button" },
              { value: "standard", label: "Persistent (No Clear)" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-sm mx-auto py-8">
        <Field id="scheduled-for-demo" invalid={isInvalid} disabled={isDisabled}>
          <FieldLabel className="font-semibold text-sm">Scheduled for</FieldLabel>
          <FieldDescription>Choose a date and time.</FieldDescription>
          <div className="pt-2">
            <DateTimePicker
              key={`${statePreset}-${hourCycle}`}
              value={value}
              onValueChange={(nextVal, nextParts) => {
                setValue(nextVal);
                setParts(nextParts);
              }}
              hourCycle={hourCycle}
              clearable={isClearable}
              invalid={isInvalid}
              disabled={isDisabled}
              placeholder="Pick date and time"
              aria-label="Scheduled for"
            />
          </div>
          {isInvalid && (
            <FieldError>Both a calendar date and clock time are required before proceeding.</FieldError>
          )}
        </Field>

        {/* Live Decomposition Inspector */}
        <div className="mt-6 p-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-xs space-y-1">
          <div className="font-medium text-muted-foreground flex justify-between">
            <span>Canonical String:</span>
            <code className="text-foreground font-mono">{value ?? "null (incomplete)"}</code>
          </div>
          <div className="font-medium text-muted-foreground flex justify-between">
            <span>Local Date Part:</span>
            <code className="text-foreground font-mono">{parts.date ? parts.date.toLocaleDateString() : "null"}</code>
          </div>
          <div className="font-medium text-muted-foreground flex justify-between">
            <span>Local Time Part:</span>
            <code className="text-foreground font-mono">{parts.time ?? "null"}</code>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
