"use client";

import * as React from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";

export function DateTimePickerDemonstrations() {
  const [completeVal, setCompleteVal] = React.useState<string | null>("2026-10-12T14:30");
  const [twentyFourVal, setTwentyFourVal] = React.useState<string | null>("2026-11-05T19:45");
  const [boundedVal, setBoundedVal] = React.useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* 1. Completeness States Comparison */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Completeness States</h3>
          <p className="text-sm text-muted-foreground">
            Date Time Picker cleanly distinguishes between empty, partial (date only / time only), and complete states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border border-border/80 bg-muted/20">
          {/* Empty */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Empty State</span>
            <DateTimePicker
              placeholder="Select date and time..."
              aria-label="Empty date time picker"
            />
          </div>

          {/* Partial */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Partial State (Date only)</span>
            <DateTimePicker
              defaultValue="2026-09-25T"
              placeholder="Select date and time..."
              aria-label="Partial date time picker"
            />
          </div>

          {/* Complete */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Complete State</span>
            <DateTimePicker
              value={completeVal}
              onValueChange={setCompleteVal}
              aria-label="Complete date time picker"
            />
          </div>
        </div>
      </section>

      {/* 2. 12-Hour vs 24-Hour Presentation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">12-Hour vs 24-Hour Military Format</h3>
          <p className="text-sm text-muted-foreground">
            Changing presentation mode between 12-hour (with AM/PM) and 24-hour mode never alters the underlying canonical 24-hour time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-border/80 bg-muted/20">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">12-Hour (AM/PM Period)</span>
            <DateTimePicker
              hourCycle={12}
              value={twentyFourVal}
              onValueChange={setTwentyFourVal}
              aria-label="12-hour date time picker"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">24-Hour (00:00 - 23:59)</span>
            <DateTimePicker
              hourCycle={24}
              value={twentyFourVal}
              onValueChange={setTwentyFourVal}
              aria-label="24-hour date time picker"
            />
          </div>
        </div>
      </section>

      {/* 3. Field Integration & Validation States */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Field Integration & Validation</h3>
          <p className="text-sm text-muted-foreground">
            Coordinates with Field labels, descriptions, and accessible error associations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-border/80 bg-muted/20">
          {/* Invalid Field */}
          <Field id="invalid-datetime" invalid>
            <FieldLabel className="font-semibold text-sm">Deployment Window</FieldLabel>
            <FieldDescription>Choose a maintenance window timestamp.</FieldDescription>
            <div className="pt-1.5">
              <DateTimePicker
                invalid
                placeholder="Pick maintenance slot"
                aria-label="Deployment Window"
              />
            </div>
            <FieldError>Both date and time must be specified prior to initiating rollback.</FieldError>
          </Field>

          {/* Disabled Field */}
          <Field id="disabled-datetime" disabled>
            <FieldLabel className="font-semibold text-sm">Audit Timestamp (Immutable)</FieldLabel>
            <FieldDescription>Locked system record.</FieldDescription>
            <div className="pt-1.5">
              <DateTimePicker
                disabled
                defaultValue="2026-04-18T08:00"
                aria-label="Audit Timestamp"
              />
            </div>
          </Field>
        </div>
      </section>
    </div>
  );
}
