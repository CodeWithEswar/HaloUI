"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  description: string;
};

export type ProcessStepsProps = {
  steps: ProcessStep[];
  className?: string;
};

/**
 * ProcessSteps — A documentation-native linear workflow visualizer.
 * Displays a clean horizontal connected sequence on desktop and
 * automatically adapts to a vertical connected timeline on mobile.
 */
export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div className={cn("my-6 rounded-xl border border-border bg-card/60 p-5", className)}>
      {/* Desktop Layout: Connected Horizontal Sequence with Rail */}
      <div className="hidden md:grid md:grid-flow-col md:auto-cols-fr gap-4">
        {steps.map((step, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === steps.length - 1;
          return (
            <div key={step.title} className="relative flex flex-col">
              {/* Rail Line & Number Marker */}
              <div className="relative mb-3 flex items-center">
                {/* Connecting track line */}
                <div
                  className={cn(
                    "absolute top-1/2 h-px -translate-y-1/2 bg-border",
                    isFirst ? "left-3 right-0" : isLast ? "left-0 right-3" : "inset-x-0"
                  )}
                  aria-hidden="true"
                />
                {/* Marker badge */}
                <span className="relative z-10 flex size-6 items-center justify-center rounded-md border border-border bg-background font-mono text-[11px] font-semibold text-foreground shadow-xs">
                  0{idx + 1}
                </span>
              </div>
              <div className="flex flex-col pr-2">
                <h4 className="text-xs font-semibold text-foreground">{step.title}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Layout: Connected Vertical Sequence with Rail */}
      <div className="md:hidden relative space-y-4 pl-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
        {steps.map((step, idx) => (
          <div key={step.title} className="relative">
            <span className="absolute -left-7 top-0 flex size-6 items-center justify-center rounded-md border border-border bg-background font-mono text-[10px] font-semibold text-foreground shadow-xs">
              0{idx + 1}
            </span>
            <div className="pt-0.5">
              <h4 className="text-xs font-semibold text-foreground">{step.title}</h4>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
