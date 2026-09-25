"use client";

import * as React from "react";
import { TimePicker } from "@/components/ui/time-picker";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function PrimaryTimePickerExample() {
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <Field id="primary-time-picker-field">
      <FieldLabel className="font-semibold text-foreground">
        Start time
      </FieldLabel>
      <FieldDescription>
        Choose a local clock time.
      </FieldDescription>
      <div className="pt-2">
        <TimePicker
          value={time}
          onValueChange={setTime}
          aria-label="Start time"
        />
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Canonical 24h value: {time ? `${time}` : "None"}
      </p>
    </Field>
  );
}

export function TwentyFourHourExample() {
  const [time24, setTime24] = React.useState<string | null>("14:30");

  return (
    <Field id="twenty-four-hour-field">
      <FieldLabel className="font-semibold text-foreground">
        Server Log Timestamp (24-Hour Cycle)
      </FieldLabel>
      <FieldDescription>
        24-hour cycle mode displays hours 00 through 23 without an AM/PM period selector.
      </FieldDescription>
      <div className="pt-2">
        <TimePicker
          hourCycle={24}
          value={time24}
          onValueChange={setTime24}
          aria-label="Server Log Timestamp"
        />
      </div>
    </Field>
  );
}

export function BoundariesExample() {
  const [time, setTime] = React.useState<string | null>("00:00");

  return (
    <div className="flex flex-col gap-3">
      <Field id="boundaries-field">
        <FieldLabel className="font-semibold text-foreground">
          Critical Time Boundaries
        </FieldLabel>
        <FieldDescription>
          Verify deterministic translation across midnight (00:00 / 12:00 AM) and noon (12:00 / 12:00 PM).
        </FieldDescription>
        <div className="pt-2">
          <TimePicker
            value={time}
            onValueChange={setTime}
            aria-label="Critical Time Boundaries"
          />
        </div>
      </Field>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTime("00:00")}
          className="text-xs h-7"
        >
          Midnight (00:00)
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTime("12:00")}
          className="text-xs h-7"
        >
          Noon (12:00)
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTime("23:59")}
          className="text-xs h-7"
        >
          End of Day (23:59)
        </Button>
        <span className="text-xs text-muted-foreground ml-auto font-mono">
          24h Value: {time ?? "null"}
        </span>
      </div>
    </div>
  );
}

export function MinuteStepExample() {
  const [time, setTime] = React.useState<string | null>("09:00");

  return (
    <Field id="minute-step-field">
      <FieldLabel className="font-semibold text-foreground">
        Appointment Window (15-Minute Stepping)
      </FieldLabel>
      <FieldDescription>
        Arrow key adjustment jumps by 15-minute increments (:00, :15, :30, :45).
      </FieldDescription>
      <div className="pt-2">
        <TimePicker
          minuteStep={15}
          value={time}
          onValueChange={setTime}
          aria-label="Appointment Window"
        />
      </div>
    </Field>
  );
}

export function ClearableTimePickerExample() {
  const [time, setTime] = React.useState<string | null>("16:45");

  return (
    <Field id="clearable-time-field">
      <FieldLabel className="font-semibold text-foreground">
        Optional Departure Time
      </FieldLabel>
      <FieldDescription>
        Includes an integrated clear button to return the control to empty.
      </FieldDescription>
      <div className="pt-2">
        <TimePicker
          clearable
          value={time}
          onValueChange={setTime}
          aria-label="Optional Departure Time"
        />
      </div>
    </Field>
  );
}

export function StatesTimePickerExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Empty / Unselected</span>
        <TimePicker aria-label="Empty time" />
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Complete (14:30 / 2:30 PM)</span>
        <TimePicker defaultValue="14:30" aria-label="Complete time" />
      </div>

      <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/5 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-destructive">Invalid (Error)</span>
        <TimePicker invalid aria-label="Invalid time" />
        <span className="text-[11px] text-destructive">A valid time is required.</span>
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground">Disabled</span>
        <TimePicker disabled defaultValue="09:15" aria-label="Disabled time" />
      </div>
    </div>
  );
}

export function FormCompositionExample() {
  const [time, setTime] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const isInvalid = submitted && time === null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <Field id="daily-standup" invalid={isInvalid} required>
        <FieldLabel className="font-semibold text-foreground">
          Daily Standup Time
        </FieldLabel>
        <FieldDescription>
          Required team synchronization schedule.
        </FieldDescription>
        <div className="pt-2">
          <TimePicker
            value={time}
            onValueChange={(val) => {
              setTime(val);
              if (submitted) setSubmitted(false);
            }}
            invalid={isInvalid}
            aria-label="Daily Standup Time"
          />
        </div>
        {isInvalid && (
          <FieldError>Please pick a standup time before continuing.</FieldError>
        )}
      </Field>

      <Button type="submit" size="sm" className="w-fit">
        Save Schedule
      </Button>
    </form>
  );
}
