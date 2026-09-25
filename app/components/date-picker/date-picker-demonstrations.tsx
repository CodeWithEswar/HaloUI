"use client";

import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function PrimaryDatePickerExample() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <Field id="primary-date-picker-field">
      <FieldLabel className="font-semibold text-foreground">
        Start date
      </FieldLabel>
      <FieldDescription>
        Choose a calendar date.
      </FieldDescription>
      <div className="pt-2 max-w-xs">
        <DatePicker
          value={date}
          onValueChange={setDate}
          placeholder="Pick a start date"
          aria-label="Start date"
        />
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Committed calendar date: {date ? date.toLocaleDateString() : "None"}
      </p>
    </Field>
  );
}

export function ControlledDatePickerExample() {
  const [date, setDate] = React.useState<Date | null>(new Date(2026, 8, 25));
  const [isoString, setIsoString] = React.useState<string | null>("2026-09-25");

  return (
    <div className="flex flex-col gap-3">
      <Field id="controlled-date-picker-field">
        <FieldLabel className="font-semibold text-foreground">
          Release Milestone
        </FieldLabel>
        <FieldDescription>
          Programmatically synchronized date state with ISO date-only format.
        </FieldDescription>
        <div className="pt-2 max-w-xs">
          <DatePicker
            value={date}
            onValueChange={(newDate, str) => {
              setDate(newDate);
              setIsoString(str);
            }}
            aria-label="Release Milestone"
          />
        </div>
      </Field>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDate(null);
            setIsoString(null);
          }}
          className="text-xs h-7"
        >
          Clear Date
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            setDate(today);
            const m = String(today.getMonth() + 1).padStart(2, "0");
            const d = String(today.getDate()).padStart(2, "0");
            setIsoString(`${today.getFullYear()}-${m}-${d}`);
          }}
          className="text-xs h-7"
        >
          Select Today
        </Button>
        <span className="text-xs text-muted-foreground ml-auto font-mono">
          ISO: {isoString ?? "null"}
        </span>
      </div>
    </div>
  );
}

export function DisabledDatesExample() {
  const [date, setDate] = React.useState<Date | null>(null);

  // Disable weekends (Saturday: 6, Sunday: 0)
  const isWeekend = (d: Date) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Field id="business-days-field">
      <FieldLabel className="font-semibold text-foreground">
        Business Day Appointment
      </FieldLabel>
      <FieldDescription>
        Weekends are disabled and cannot be selected or activated via keyboard navigation.
      </FieldDescription>
      <div className="pt-2 max-w-xs">
        <DatePicker
          value={date}
          onValueChange={setDate}
          disabledDates={isWeekend}
          placeholder="Choose a weekday"
          aria-label="Business Day Appointment"
        />
      </div>
    </Field>
  );
}

export function MinMaxBoundsExample() {
  const [date, setDate] = React.useState<Date | null>(null);

  const min = new Date(2026, 8, 1);
  const max = new Date(2026, 8, 30);

  return (
    <Field id="min-max-bounds-field">
      <FieldLabel className="font-semibold text-foreground">
        September 2026 Window
      </FieldLabel>
      <FieldDescription>
        Selection bounded strictly between Sep 1, 2026 and Sep 30, 2026.
      </FieldDescription>
      <div className="pt-2 max-w-xs">
        <DatePicker
          value={date}
          onValueChange={setDate}
          minDate={min}
          maxDate={max}
          placeholder="Select within September 2026"
          aria-label="September 2026 Window"
        />
      </div>
    </Field>
  );
}

export function ClearableDatePickerExample() {
  const [date, setDate] = React.useState<Date | null>(new Date(2026, 8, 15));

  return (
    <Field id="clearable-date-field">
      <FieldLabel className="font-semibold text-foreground">
        Optional Event Date
      </FieldLabel>
      <FieldDescription>
        Includes an integrated clear button to return the control to its empty state.
      </FieldDescription>
      <div className="pt-2 max-w-xs">
        <DatePicker
          clearable
          value={date}
          onValueChange={setDate}
          placeholder="Select date"
          aria-label="Optional Event Date"
        />
      </div>
    </Field>
  );
}

export function StatesDatePickerExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Empty / Unselected</span>
        <DatePicker placeholder="Choose date" aria-label="Empty date" />
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Selected Date</span>
        <DatePicker defaultValue={new Date(2026, 8, 25)} aria-label="Selected date" />
      </div>

      <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/5 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-destructive">Invalid (Error)</span>
        <DatePicker invalid placeholder="Required date missing" aria-label="Invalid date" />
        <span className="text-[11px] text-destructive">A valid date is required.</span>
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground">Disabled</span>
        <DatePicker disabled defaultValue={new Date(2026, 8, 25)} aria-label="Disabled date" />
      </div>
    </div>
  );
}

export function FormCompositionExample() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const isInvalid = submitted && date === null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <Field id="flight-departure" invalid={isInvalid} required>
        <FieldLabel className="font-semibold text-foreground">
          Departure Date
        </FieldLabel>
        <FieldDescription>
          Required date-only field for flight scheduling.
        </FieldDescription>
        <div className="pt-2">
          <DatePicker
            value={date}
            onValueChange={(val) => {
              setDate(val);
              if (submitted) setSubmitted(false);
            }}
            invalid={isInvalid}
            placeholder="Select departure date"
            aria-label="Departure Date"
          />
        </div>
        {isInvalid && (
          <FieldError>Please pick a departure date before continuing.</FieldError>
        )}
      </Field>

      <Button type="submit" size="sm" className="w-fit">
        Confirm Booking
      </Button>
    </form>
  );
}
