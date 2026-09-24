"use client";

import * as React from "react";
import { CheckmarkCircle01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const COMPARISON_ROWS = [
  {
    topic: "Core Philosophy",
    ordinary: "Transparency as the primary effect",
    ordinaryDetail: "Treats glassmorphism as a visual transparency filter without material body.",
    halo: "Surface tint is part of a broader material model",
    haloDetail: "Calibrated base tint establishes physical volume and isolates foreground content.",
  },
  {
    topic: "Boundary Definition",
    ordinary: "Uniform border",
    ordinaryDetail: "Static 1px border applied equally around all four edges.",
    halo: "Direction-aware optical edge",
    haloDetail: "Specular illumination catches the top and left rims matching a 135° virtual light source.",
  },
  {
    topic: "Diffusion Role",
    ordinary: "Backdrop blur defines the material",
    ordinaryDetail: "Relies solely on CSS backdrop-filter blur to convey glass properties.",
    halo: "Diffusion is only one material property",
    haloDetail: "Diffusion works in coordination with tint, optical edges, refraction, and contact shadows.",
  },
  {
    topic: "Elevation & Shadows",
    ordinary: "Generic drop shadow",
    ordinaryDetail: "Single uncalibrated drop shadow detached from the physical substrate.",
    halo: "Contact and ambient shadows have separate roles",
    haloDetail: "Dual-stop shadowing: crisp contact shadow anchoring the base plus soft ambient radiance.",
  },
  {
    topic: "Interaction State",
    ordinary: "Static appearance",
    ordinaryDetail: "Unchanging appearance that remains completely inert during interaction.",
    halo: "Surfaces respond to interaction and environment",
    haloDetail: "Tactile press compression, directional pointer lighting, and substrate-aware adaptations.",
  },
  {
    topic: "System Integration",
    ordinary: "Same treatment across components",
    ordinaryDetail: "One-size-fits-all opacity applied indiscriminately to all UI elements.",
    halo: "Material intensity changes by component role",
    haloDetail: "Subtle for dense forms and data tables, Balanced for cards, Rich for elevated showcases.",
  },
  {
    topic: "Accessibility Priority",
    ordinary: "Visual effect first",
    ordinaryDetail: "Aesthetic transparency that frequently compromises text readability and contrast.",
    halo: "Behavior, readability, and accessibility remain primary",
    haloDetail: "Guaranteed WCAG 2.1 AA contrast (&ge; 4.5:1) with progressive optical enhancement.",
  },
];

export function MaterialComparisonTable() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* Header Banner */}
      <div className="border-b border-border bg-muted/30 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold text-foreground">
              Material Model Comparison
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Contrasting conventional CSS glassmorphism with HaloUI&apos;s 10-layer physical optical engine.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Architecture Matrix
          </span>
        </div>
      </div>

      {/* Desktop & Tablet Table View */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/15">
              <th className="w-1/2 px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-2 rounded-full bg-muted-foreground/40" />
                  <span className="font-semibold text-foreground">Ordinary Glass Treatment</span>
                  <span className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    Conventional
                  </span>
                </div>
              </th>
              <th className="w-1/2 border-l border-border px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-foreground">HaloUI Liquid Material</span>
                  <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    10-Layer Optical Stack
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.topic} className="group transition-colors hover:bg-muted/20">
                {/* Ordinary Glass Column */}
                <td className="px-5 py-4 sm:px-6 align-top">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground/70">
                      <HaloIcon icon={Cancel01Icon} size={11} />
                    </span>
                    <div className="space-y-1">
                      <div className="font-medium text-muted-foreground group-hover:text-foreground/90 transition-colors">
                        {row.ordinary}
                      </div>
                      <p className="text-[11px] leading-relaxed text-muted-foreground/75">
                        {row.ordinaryDetail}
                      </p>
                    </div>
                  </div>
                </td>

                {/* HaloUI Liquid Column */}
                <td className="border-l border-border px-5 py-4 sm:px-6 align-top">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <HaloIcon icon={CheckmarkCircle01Icon} size={12} />
                    </span>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">
                        {row.halo}
                      </div>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {row.haloDetail}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Constraint Note */}
      <div className="border-t border-border bg-muted/10 px-5 py-3 text-center sm:px-6">
        <p className="text-xs text-muted-foreground">
          Liquid Material is an enhancement layer over an accessible component. Optical effects must never become requirements for understanding or operating the interface.
        </p>
      </div>
    </div>
  );
}
