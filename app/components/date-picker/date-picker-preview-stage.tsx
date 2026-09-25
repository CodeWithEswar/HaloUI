"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import { DatePicker, formatDateOnly } from "@/components/ui/date-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function DatePickerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled">("interactive");
  const [constraintPreset, setConstraintPreset] = React.useState<"none" | "weekends" | "bounds">("none");
  const [clearablePreset, setClearablePreset] = React.useState<"clearable" | "standard">("clearable");

  const [date, setDate] = React.useState<Date | null>(new Date(2026, 8, 25));

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isClearable = clearablePreset === "clearable";

  const disabledDates = React.useMemo(() => {
    if (constraintPreset === "weekends") {
      return (d: Date) => d.getDay() === 0 || d.getDay() === 6;
    }
    return undefined;
  }, [constraintPreset]);

  const minDate = constraintPreset === "bounds" ? new Date(2026, 8, 1) : undefined;
  const maxDate = constraintPreset === "bounds" ? new Date(2026, 8, 30) : undefined;

  const isoString = formatDateOnly(date);

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const clearableAttr = isClearable ? " clearable" : "";
    const dateFormatted = date ? `new Date(${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()})` : "null";

    return `import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function EventDateSelection() {
  const [date, setDate] = React.useState<Date | null>(${dateFormatted});

  return (
    <Field id="event-date"${invalidAttr}${disabledAttr}>
      <FieldLabel className="font-semibold">Event Date</FieldLabel>
      <FieldDescription>
        Choose a calendar date for the upcoming product showcase.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DatePicker${clearableAttr}${invalidAttr}${disabledAttr}
          value={date}
          onValueChange={setDate}
          placeholder="Pick a calendar date"
          aria-label="Event Date"
        />
      </div>${isInvalid ? `\n      <FieldError>Please choose a date before scheduling.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [isInvalid, isDisabled, isClearable, date]);

  return (
    <PreviewStageShell
      title="Date Picker Interactive Stage"
      description="Evaluate single-date selection, date-only calendar semantics without UTC timestamp shift, accessible month navigation, focus restoration, and disabled date constraints."
      badge="Forms & Fields 29"
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
            label="Date Constraints"
            value={constraintPreset}
            onValueChange={(val) => setConstraintPreset(val as any)}
            options={[
              { value: "none", label: "No Restrictions" },
              { value: "weekends", label: "Weekends Disabled" },
              { value: "bounds", label: "September 2026 Window" },
            ]}
          />
          <StageControlSelect
            label="Clear Action"
            value={clearablePreset}
            onValueChange={(val) => setClearablePreset(val as any)}
            options={[
              { value: "clearable", label: "Clearable (Reset Button)" },
              { value: "standard", label: "Standard (No Clear Icon)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Selected Date",
          value: date ? date.toLocaleDateString() : "None (empty)",
          variant: "success",
        },
        {
          label: "ISO Date-Only",
          value: isoString ?? "null",
          variant: "default",
        },
        {
          label: "Timezone Boundary",
          value: "Zero UTC Shift",
          variant: "success",
        },
        {
          label: "Focus Restoration",
          value: "Trigger Restored",
          variant: "default",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate transition-all">
          <Field
            id="stage-date-picker-field"
            aria-invalid={isInvalid ? "true" : undefined}
            disabled={isDisabled}
          >
            <FieldLabel className="font-semibold text-foreground text-sm select-none">
              Start date
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              Choose a calendar date for the milestone.
            </FieldDescription>

            <div className="pt-3">
              <DatePicker
                clearable={isClearable}
                disabled={isDisabled}
                invalid={isInvalid}
                value={date}
                onValueChange={setDate}
                disabledDates={disabledDates}
                minDate={minDate}
                maxDate={maxDate}
                placeholder="Choose milestone date"
                aria-label="Start date"
              />
            </div>

            {isInvalid && (
              <FieldError className="pt-2">
                A valid calendar date must be selected.
              </FieldError>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
