"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import {
  DateRangePicker,
  type DateRange,
  formatDisplayRange,
} from "@/components/ui/date-range-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function DateRangePickerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled">("interactive");
  const [monthCount, setMonthCount] = React.useState<"2" | "1">("2");
  const [clearablePreset, setClearablePreset] = React.useState<"clearable" | "standard">("clearable");

  const [range, setRange] = React.useState<DateRange>({
    from: new Date(2026, 8, 10),
    to: new Date(2026, 8, 25),
  });

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isClearable = clearablePreset === "clearable";
  const numberOfMonths = Number(monthCount) as 1 | 2;

  const isComplete = Boolean(range.from && range.to);
  const isIncomplete = Boolean(range.from && !range.to);

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const clearableAttr = isClearable ? " clearable" : "";
    const monthsAttr = numberOfMonths !== 2 ? ` numberOfMonths={${numberOfMonths}}` : "";

    const fromFormatted = range.from ? `new Date(${range.from.getFullYear()}, ${range.from.getMonth()}, ${range.from.getDate()})` : "null";
    const toFormatted = range.to ? `new Date(${range.to.getFullYear()}, ${range.to.getMonth()}, ${range.to.getDate()})` : "null";

    return `import * as React from "react";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function ProjectPeriodSelection() {
  const [range, setRange] = React.useState<DateRange>({
    from: ${fromFormatted},
    to: ${toFormatted},
  });

  return (
    <Field id="project-period"${invalidAttr}${disabledAttr}>
      <FieldLabel className="font-semibold">Project period</FieldLabel>
      <FieldDescription>
        Choose a start and end date for resource allocation.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DateRangePicker${clearableAttr}${monthsAttr}${invalidAttr}${disabledAttr}
          value={range}
          onValueChange={setRange}
          placeholder="Select project period"
          aria-label="Project period"
        />
      </div>${isInvalid ? `\n      <FieldError>Both start and end dates must be selected.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [isInvalid, isDisabled, isClearable, numberOfMonths, range]);

  return (
    <PreviewStageShell
      title="Date Range Picker Interactive Stage"
      description="Evaluate ordered calendar range selection, start/incomplete/complete interval states, dual-month desktop viewport layouts, and non-modal portalled surface interactions."
      badge="Forms & Fields 30"
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
            label="Visible Months"
            value={monthCount}
            onValueChange={(val) => setMonthCount(val as any)}
            options={[
              { value: "2", label: "Two Months (Desktop Standard)" },
              { value: "1", label: "Single Month (Mobile / Compact)" },
            ]}
          />
          <StageControlSelect
            label="Clear Action"
            value={clearablePreset}
            onValueChange={(val) => setClearablePreset(val as any)}
            options={[
              { value: "clearable", label: "Clearable (Reset Action)" },
              { value: "standard", label: "Standard (No Clear Action)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Interval State",
          value: isComplete ? "Complete Range" : isIncomplete ? "Start Only (Incomplete)" : "Empty",
          variant: isComplete ? "success" : isIncomplete ? "warning" : "default",
        },
        {
          label: "Selected Dates",
          value: formatDisplayRange(range),
          variant: "default",
        },
        {
          label: "Calendar Model",
          value: `${numberOfMonths} Month${numberOfMonths > 1 ? "s" : ""}`,
          variant: "success",
        },
        {
          label: "Chronological Order",
          value: "Strictly Enforced",
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate transition-all">
          <Field
            id="stage-date-range-field"
            aria-invalid={isInvalid ? "true" : undefined}
            disabled={isDisabled}
          >
            <FieldLabel className="font-semibold text-foreground text-sm select-none">
              Project period
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              Choose a start and end date for resource allocation.
            </FieldDescription>

            <div className="pt-3">
              <DateRangePicker
                clearable={isClearable}
                disabled={isDisabled}
                invalid={isInvalid}
                numberOfMonths={numberOfMonths}
                value={range}
                onValueChange={setRange}
                placeholder="Choose project period"
                aria-label="Project period"
              />
            </div>

            {isInvalid && (
              <FieldError className="pt-2">
                A complete date range (both start and end) must be provided.
              </FieldError>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
