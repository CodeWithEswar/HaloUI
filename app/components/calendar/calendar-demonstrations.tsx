"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDemonstrations() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date(2026, 9, 14));
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 9, 8),
    to: new Date(2026, 9, 18),
  });

  return (
    <div className="space-y-12">
      {/* 1. Single Selection vs Range Selection */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Selection Modes</h3>
          <p className="text-sm text-muted-foreground">
            Calendar cleanly renders in single-date or contiguous date-range modes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-border/80 bg-muted/20">
          <div className="space-y-3 flex flex-col items-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider self-start">
              Single Date Mode
            </span>
            <div className="p-3 rounded-2xl border border-border/80 bg-background/80 shadow-xs">
              <Calendar
                mode="single"
                defaultMonth={new Date(2026, 9, 1)}
                selected={singleDate}
                onSelect={setSingleDate}
              />
            </div>
          </div>

          <div className="space-y-3 flex flex-col items-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider self-start">
              Range Mode
            </span>
            <div className="p-3 rounded-2xl border border-border/80 bg-background/80 shadow-xs">
              <Calendar
                mode="range"
                defaultMonth={new Date(2026, 9, 1)}
                selected={range}
                onSelect={setRange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Multi-Month Display */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Dual-Month Range Horizon</h3>
          <p className="text-sm text-muted-foreground">
            Displays two contiguous calendar months simultaneously for rapid long-range scheduling.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/80 bg-muted/20 flex justify-center">
          <div className="p-4 rounded-2xl border border-border/80 bg-background/80 shadow-xs overflow-x-auto max-w-full">
            <Calendar
              mode="range"
              numberOfMonths={2}
              defaultMonth={new Date(2026, 8, 1)}
              selected={range}
              onSelect={setRange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
