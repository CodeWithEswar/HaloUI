"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 1. ProductArchitecture
 * Clean, structured relationship tree of the HaloUI ecosystem.
 */
export function ProductArchitecture() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Product Architecture
      </div>
      <div className="flex flex-col items-center">
        {/* Top: HaloUI */}
        <div className="rounded-lg border border-border bg-muted/60 px-5 py-2 text-sm font-semibold text-foreground shadow-xs">
          HaloUI
        </div>

        {/* 3-way Split Connector */}
        <div className="my-1 w-full max-w-sm">
          <div className="mx-auto h-4 w-px bg-border" />
          <div className="relative h-px w-full bg-border">
            <div className="absolute left-0 top-0 h-3 w-px bg-border" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-px bg-border" />
            <div className="absolute right-0 top-0 h-3 w-px bg-border" />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid w-full max-w-sm grid-cols-3 gap-2 pt-2 text-center text-xs">
          <div className="rounded-md border border-border bg-background p-2.5 font-medium text-foreground">
            Components
          </div>
          <div className="rounded-md border border-border bg-background p-2.5 font-medium text-foreground">
            Registry
          </div>
          <div className="rounded-md border border-border bg-background p-2.5 font-medium text-foreground">
            Documentation
          </div>
        </div>

        {/* Converge Connector */}
        <div className="my-1 w-full max-w-sm">
          <div className="relative mt-3 h-px w-full bg-border">
            <div className="absolute left-0 top-0 h-3 -translate-y-full w-px bg-border" />
            <div className="absolute left-1/2 top-0 -translate-y-full -translate-x-1/2 h-3 w-px bg-border" />
            <div className="absolute right-0 top-0 h-3 -translate-y-full w-px bg-border" />
          </div>
          <div className="mx-auto flex h-4 w-px flex-col items-center bg-border">
            <div className="mt-auto size-0 border-x-[3px] border-x-transparent border-t-[4px] border-t-muted-foreground" />
          </div>
        </div>

        {/* Previews */}
        <div className="rounded-md border border-border bg-background px-4 py-1.5 text-xs font-medium text-foreground">
          Previews
        </div>

        {/* Down to Showcases */}
        <div className="my-1 flex h-4 w-px flex-col items-center bg-border">
          <div className="mt-auto size-0 border-x-[3px] border-x-transparent border-t-[4px] border-t-muted-foreground" />
        </div>

        <div className="rounded-md border border-border bg-muted/40 px-4 py-1.5 text-xs font-semibold text-foreground">
          Showcases
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        HaloUI treats components, registry distribution, documentation, previews, and showcases as parts of the same product.
      </p>
    </div>
  );
}

/**
 * 2. SourceOwnershipComparison
 * Two-column architectural comparison between runtime package and source ownership.
 */
export function SourceOwnershipComparison() {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2 text-xs">
      {/* Traditional Runtime Package */}
      <div className="rounded-xl border border-border bg-muted/15 p-4 flex flex-col justify-between">
        <div>
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
            <span className="font-semibold text-foreground text-xs">Package Dependency</span>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              Runtime package
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Application imports functionality from an installed package dependency locked inside <code className="font-mono text-[11px]">node_modules</code>.
          </p>
          <ul className="mt-3 space-y-1.5 text-[11px] text-muted-foreground list-disc list-inside">
            <li>Implementation details remain hidden behind library APIs</li>
            <li>Customization requires props or upstream library changes</li>
            <li>Breaking upstream updates affect all consumers simultaneously</li>
          </ul>
        </div>
        <div className="mt-4 pt-2.5 border-t border-border text-[11px] font-mono text-muted-foreground">
          Architecture: Black-box runtime dependency
        </div>
      </div>

      {/* HaloUI Source Ownership */}
      <div className="rounded-xl border border-border bg-background p-4 flex flex-col justify-between shadow-xs">
        <div>
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
            <span className="font-semibold text-foreground text-xs">HaloUI Component</span>
            <span className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
              Source-owned component
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The registry writes component source directly into the application where your engineering team can inspect, version, and adapt it.
          </p>
          <ul className="mt-3 space-y-1.5 text-[11px] text-muted-foreground list-disc list-inside">
            <li>Complete visibility into every line of React and CSS source</li>
            <li>Direct control over styling, behavior, and product edge cases</li>
            <li>Zero breaking changes from remote package upgrades</li>
          </ul>
        </div>
        <div className="mt-4 pt-2.5 border-t border-border text-[11px] font-mono text-foreground font-medium">
          Architecture: First-party codebase ownership
        </div>
      </div>
    </div>
  );
}

/**
 * 3. MaterialAnatomy
 * Technical spatial visual of the optical material layer stack.
 */
export function MaterialAnatomy() {
  const callouts = [
    { label: "Directional Highlight", desc: "135° virtual light specular catch", y: "15%" },
    { label: "Optical Edge", desc: "Inner rim catch & outer hairline boundary", y: "30%" },
    { label: "Surface + Diffusion", desc: "Translucent tint & GPU backdrop blur", y: "45%" },
    { label: "Content Isolation", desc: "High-contrast typography & Hugeicons", y: "60%" },
    { label: "Refraction Rim", desc: "1px edge displacement for physical thickness", y: "75%" },
    { label: "Contact Shadow", desc: "Multi-stop substrate anchoring shadow", y: "90%" },
  ];

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Optical Material Anatomy
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-center">
        {/* Technical Surface Visual */}
        <div className="relative mx-auto w-full max-w-xs h-56 rounded-xl border border-border bg-muted/30 p-4 flex flex-col justify-between overflow-hidden">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Virtual Light Vector 135&deg; &rarr;
          </div>

          {/* Schematic Cross-Section */}
          <div className="relative my-auto w-full rounded-lg border border-border bg-background/90 p-4 shadow-sm">
            <div className="h-0.5 w-full bg-border/60 mb-2 rounded-full" />
            <div className="text-center font-mono text-xs font-semibold text-foreground">
              HaloUI Surface Core
            </div>
            <div className="text-center text-[10px] text-muted-foreground mt-0.5">
              Diffusion &middot; Tint &middot; Content
            </div>
            <div className="h-0.5 w-full bg-border/60 mt-2 rounded-full" />
          </div>

          <div className="text-right text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Substrate &middot; Environment
          </div>
        </div>

        {/* Callout Stack */}
        <div className="space-y-2">
          {callouts.map((item, idx) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">0{idx + 1}</span>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <span className="text-[11px] text-muted-foreground text-right">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Individual components use calibrated combinations and intensities of these layers. Not every component requires every effect.
      </p>
    </div>
  );
}

/**
 * 4. LifecycleSteps
 * 6 grouped stages of component maturity and release.
 */
export function LifecycleSteps() {
  const stages = [
    { num: "01", name: "Define", desc: "Specification, anatomy, variants, and optical contract." },
    { num: "02", name: "Build", desc: "React implementation, tactile physics, and Hugeicons." },
    { num: "03", name: "Validate", desc: "WCAG 2.1 AA accessibility, keyboard focus, and reduced motion." },
    { num: "04", name: "Document", desc: "Interactive preview stage, props table, and usage examples." },
    { num: "05", name: "Distribute", desc: "shadcn registry item generation and dependency manifest." },
    { num: "06", name: "Release", desc: "Clean install verification and application showcase integration." },
  ];

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Component Product Lifecycle
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.name} className="rounded-lg border border-border bg-background p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-muted-foreground font-semibold">Stage {stage.num}</span>
              <span className="text-xs font-semibold text-foreground">{stage.name}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{stage.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        The component demonstrated in documentation and showcases is the exact implementation distributed through the registry.
      </p>
    </div>
  );
}
