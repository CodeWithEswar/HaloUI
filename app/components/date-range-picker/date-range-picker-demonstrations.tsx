"use client";

import * as React from "react";
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
import { Button } from "@/components/ui/button";

export function PrimaryDateRangePickerExample() {
  const [range, setRange] = React.useState<DateRange>({ from: null, to: null });

  return (
    <Field id="primary-date-range-field">
      <FieldLabel className="font-semibold text-foreground">
        Project period
      </FieldLabel>
      <FieldDescription>
        Choose a start and end date.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          placeholder="Select project period"
          aria-label="Project period"
        />
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Interval: {formatDisplayRange(range)}
      </p>
    </Field>
  );
}

export function IncompleteRangeExample() {
  // Start selected (Sep 15, 2026), end pending
  const [range, setRange] = React.useState<DateRange>({
    from: new Date(2026, 8, 15),
    to: null,
  });

  return (
    <Field id="incomplete-date-range-field">
      <FieldLabel className="font-semibold text-foreground">
        Incomplete Selection State
      </FieldLabel>
      <FieldDescription>
        When only the start date is selected, the trigger clearly communicates that the end date remains required.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          aria-label="Incomplete Selection State"
        />
      </div>
    </Field>
  );
}

export function ControlledDateRangePickerExample() {
  const [range, setRange] = React.useState<DateRange>({
    from: new Date(2026, 8, 10),
    to: new Date(2026, 8, 25),
  });

  return (
    <div className="flex flex-col gap-3">
      <Field id="controlled-date-range-field">
        <FieldLabel className="font-semibold text-foreground">
          Sprint Cycle
        </FieldLabel>
        <FieldDescription>
          Programmatically synchronized date interval with preset helpers.
        </FieldDescription>
        <div className="pt-2 max-w-sm">
          <DateRangePicker
            clearable
            value={range}
            onValueChange={setRange}
            aria-label="Sprint Cycle"
          />
        </div>
      </Field>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRange({ from: null, to: null })}
          className="text-xs h-7"
        >
          Clear Range
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setRange({
              from: new Date(2026, 8, 1),
              to: new Date(2026, 8, 14),
            })
          }
          className="text-xs h-7"
        >
          First Fortnight
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setRange({
              from: new Date(2026, 8, 15),
              to: new Date(2026, 8, 30),
            })
          }
          className="text-xs h-7"
        >
          Second Fortnight
        </Button>
      </div>
    </div>
  );
}

export function SameDayRangeExample() {
  const [range, setRange] = React.useState<DateRange>({
    from: new Date(2026, 8, 25),
    to: new Date(2026, 8, 25),
  });

  return (
    <Field id="same-day-range-field">
      <FieldLabel className="font-semibold text-foreground">
        Single-Day Maintenance Window
      </FieldLabel>
      <FieldDescription>
        Start date equals end date without geometry clipping or visual collapse.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          aria-label="Single-Day Maintenance Window"
        />
      </div>
    </Field>
  );
}

export function DisabledDatesExample() {
  const [range, setRange] = React.useState<DateRange>({ from: null, to: null });

  // Disable weekends
  const isWeekend = (d: Date) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Field id="business-range-field">
      <FieldLabel className="font-semibold text-foreground">
        Working Week Interval
      </FieldLabel>
      <FieldDescription>
        Weekends cannot be selected as range start or end endpoints.
      </FieldDescription>
      <div className="pt-2 max-w-sm">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          disabledDates={isWeekend}
          placeholder="Pick working days"
          aria-label="Working Week Interval"
        />
      </div>
    </Field>
  );
}

export function StatesDateRangePickerExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Empty / Unselected</span>
        <DateRangePicker placeholder="Select dates" aria-label="Empty range" />
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Start Selected (Incomplete)</span>
        <DateRangePicker
          defaultValue={{ from: new Date(2026, 8, 15), to: null }}
          aria-label="Incomplete range"
        />
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Complete Range</span>
        <DateRangePicker
          defaultValue={{ from: new Date(2026, 8, 10), to: new Date(2026, 8, 24) }}
          aria-label="Complete range"
        />
      </div>

      <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/5 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-destructive">Invalid (Error)</span>
        <DateRangePicker invalid placeholder="Date range required" aria-label="Invalid range" />
        <span className="text-[11px] text-destructive">A complete date range is required.</span>
      </div>
    </div>
  );
}

export function FormCompositionExample() {
  const [range, setRange] = React.useState<DateRange>({ from: null, to: null });
  const [submitted, setSubmitted] = React.useState(false);
  const isInvalid = submitted && (!range.from || !range.to);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <Field id="q4-planning" invalid={isInvalid} required>
        <FieldLabel className="font-semibold text-foreground">
          Fiscal Quarter Planning
        </FieldLabel>
        <FieldDescription>
          Required date range for resource allocation and timeline budgeting.
        </FieldDescription>
        <div className="pt-2">
          <DateRangePicker
            value={range}
            onValueChange={(val) => {
              setRange(val);
              if (submitted) setSubmitted(false);
            }}
            invalid={isInvalid}
            placeholder="Select fiscal quarter interval"
            aria-label="Fiscal Quarter Planning"
          />
        </div>
        {isInvalid && (
          <FieldError>Both start and end dates must be selected.</FieldError>
        )}
      </Field>

      <Button type="submit" size="sm" className="w-fit">
        Confirm Dates
      </Button>
    </form>
  );
}
