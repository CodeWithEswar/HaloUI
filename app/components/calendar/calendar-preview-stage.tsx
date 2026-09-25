"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import { Calendar } from "@/components/ui/calendar";

export function CalendarPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [selectionMode, setSelectionMode] = React.useState<"single" | "range">("single");
  const [constraintPreset, setConstraintPreset] = React.useState<"none" | "weekends" | "bounds">("none");
  const [showOutside, setShowOutside] = React.useState<"show" | "hide">("show");

  // Selection states
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date(2026, 8, 25));
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>({
    from: new Date(2026, 8, 14),
    to: new Date(2026, 8, 22),
  });

  const disabledDates = React.useMemo(() => {
    if (constraintPreset === "weekends") {
      return (d: Date) => d.getDay() === 0 || d.getDay() === 6;
    }
    return undefined;
  }, [constraintPreset]);

  const minDate = constraintPreset === "bounds" ? new Date(2026, 8, 5) : undefined;
  const maxDate = constraintPreset === "bounds" ? new Date(2026, 8, 28) : undefined;

  const disabledMatcher = React.useMemo(() => {
    const matchers: Array<(d: Date) => boolean> = [];
    if (minDate) matchers.push((d) => d < minDate);
    if (maxDate) matchers.push((d) => d > maxDate);
    if (disabledDates) matchers.push(disabledDates);
    return matchers.length > 0 ? (d: Date) => matchers.some((m) => m(d)) : undefined;
  }, [minDate, maxDate, disabledDates]);

  const generatedCode = React.useMemo(() => {
    if (selectionMode === "single") {
      return `import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function StandaloneCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 25));

  return (
    <div className="p-4 rounded-2xl border border-border/80 bg-background/80 shadow-md backdrop-blur-xl max-w-fit">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={${showOutside === "show"}}
      />
    </div>
  );
}`;
    }

    return `import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export function RangeCalendar() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 8, 14),
    to: new Date(2026, 8, 22),
  });

  return (
    <div className="p-4 rounded-2xl border border-border/80 bg-background/80 shadow-md backdrop-blur-xl max-w-fit">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        showOutsideDays={${showOutside === "show"}}
      />
    </div>
  );
}`;
  }, [selectionMode, showOutside]);

  return (
    <PreviewStageShell
      title="Calendar Interactive Stage"
      description="Evaluate standalone calendar surface navigation, accessible month switching, keyboard roving focus, single and range selection, and disabled constraints."
      badge="Forms & Fields 33"
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
            label="Selection Mode"
            value={selectionMode}
            onValueChange={(val) => setSelectionMode(val as any)}
            options={[
              { value: "single", label: "Single Date" },
              { value: "range", label: "Date Range" },
            ]}
          />

          <StageControlSelect
            label="Constraints"
            value={constraintPreset}
            onValueChange={(val) => setConstraintPreset(val as any)}
            options={[
              { value: "none", label: "None (Unconstrained)" },
              { value: "weekends", label: "Disable Weekends" },
              { value: "bounds", label: "Bounded (Sep 5 - 28)" },
            ]}
          />

          <StageControlSelect
            label="Outside Days"
            value={showOutside}
            onValueChange={(val) => setShowOutside(val as any)}
            options={[
              { value: "show", label: "Show Outside Days" },
              { value: "hide", label: "Hide Outside Days" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full flex flex-col items-center justify-center py-6">
        <div className="halo-liquid-glass-surface p-4 rounded-2xl border border-border/80 shadow-lg text-foreground">
          <div className="relative z-10">
            {selectionMode === "single" ? (
              <Calendar
                mode="single"
                defaultMonth={new Date(2026, 8, 1)}
                selected={singleDate}
                onSelect={setSingleDate}
                disabled={disabledMatcher}
                showOutsideDays={showOutside === "show"}
                className="bg-transparent"
              />
            ) : (
              <Calendar
                mode="range"
                defaultMonth={new Date(2026, 8, 1)}
                selected={rangeDate}
                onSelect={setRangeDate}
                disabled={disabledMatcher}
                showOutsideDays={showOutside === "show"}
                className="bg-transparent"
              />
            )}
          </div>
        </div>

        {/* Status display */}
        <div className="mt-4 text-xs font-mono text-muted-foreground text-center">
          {selectionMode === "single" ? (
            <span>Selected: {singleDate ? singleDate.toLocaleDateString() : "None"}</span>
          ) : (
            <span>
              Range: {rangeDate?.from ? rangeDate.from.toLocaleDateString() : "None"} →{" "}
              {rangeDate?.to ? rangeDate.to.toLocaleDateString() : "None"}
            </span>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
