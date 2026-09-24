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
    <div className={cn("my-6", className)}>
      {/* Desktop Layout: Connected Horizontal Sequence */}
      <div className="hidden md:grid md:grid-flow-col md:auto-cols-fr gap-3">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="relative flex flex-col justify-start rounded-xl border border-border bg-card p-4 transition-colors"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex size-6 items-center justify-center rounded-md border border-border bg-muted/60 font-mono text-[11px] font-semibold text-foreground">
                0{idx + 1}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Step {idx + 1}
              </span>
            </div>
            <h4 className="text-xs font-semibold text-foreground">{step.title}</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile Layout: Connected Vertical Timeline */}
      <div className="md:hidden relative space-y-3 pl-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
        {steps.map((step, idx) => (
          <div key={step.title} className="relative">
            <span className="absolute -left-7 top-1 flex size-6 items-center justify-center rounded-md border border-border bg-background font-mono text-[10px] font-semibold text-foreground shadow-xs">
              0{idx + 1}
            </span>
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h4 className="text-xs font-semibold text-foreground">{step.title}</h4>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
