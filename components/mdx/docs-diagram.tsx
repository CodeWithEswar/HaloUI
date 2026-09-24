"use client";

import * as React from "react";
import { ArrowDown01Icon, ArrowRight01Icon, CheckmarkCircle01Icon, PackageIcon, Layers01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

/**
 * 1. ProductModelDiagram
 * Shows how HaloUI components, registry, docs, previews, and showcases unify.
 */
export function ProductModelDiagram() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Product Architecture
      </div>
      <div className="flex flex-col items-center">
        {/* Root */}
        <div className="rounded-lg border border-border bg-muted/60 px-5 py-2 text-sm font-semibold text-foreground shadow-xs">
          HaloUI
        </div>

        {/* Split to 3 nodes */}
        <div className="my-1 w-full max-w-sm">
          <div className="mx-auto h-4 w-px bg-border" />
          <div className="relative h-px w-full bg-border">
            <div className="absolute left-0 top-0 h-3 w-px bg-border" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-px bg-border" />
            <div className="absolute right-0 top-0 h-3 w-px bg-border" />
          </div>
        </div>

        <div className="grid w-full max-w-sm grid-cols-3 gap-2 pt-2 text-center text-xs">
          <div className="rounded-md border border-border bg-background p-2 font-medium text-foreground">
            Components
          </div>
          <div className="rounded-md border border-border bg-background p-2 font-medium text-foreground">
            Registry
          </div>
          <div className="rounded-md border border-border bg-background p-2 font-medium text-foreground">
            Documentation
          </div>
        </div>

        {/* Converge */}
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

        <div className="rounded-md border border-border bg-background px-4 py-1.5 text-xs font-medium text-foreground">
          Previews
        </div>

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
 * 2. RegistryFlowDiagram
 * Visualizes the registry distribution workflow from HaloUI to consuming apps.
 */
export function RegistryFlowDiagram() {
  const steps = [
    { label: "HaloUI Registry", sub: "Published schemas & source", icon: Layers01Icon },
    { label: "Registry Item", sub: "button.json, surface.json", icon: PackageIcon },
    { label: "shadcn CLI", sub: "Resolves & downloads files", icon: SourceCodeIcon },
    { label: "Your Application", sub: "Source-owned in your codebase", icon: CheckmarkCircle01Icon },
  ];

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Registry Distribution Flow
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, idx) => (
          <div key={step.label} className="relative flex flex-col justify-between rounded-lg border border-border bg-background p-3">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <HaloIcon icon={step.icon} size={13} />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">0{idx + 1}</span>
              </div>
              <div className="text-xs font-semibold text-foreground">{step.label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{step.sub}</div>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 size-5 rounded-full border border-border bg-muted flex items-center justify-center text-muted-foreground">
                <HaloIcon icon={ArrowRight01Icon} size={11} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 3. SourceOwnershipDiagram
 * Side-by-side contrast between traditional node_modules vs HaloUI registry model.
 */
export function SourceOwnershipDiagram() {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2 text-xs">
      {/* Traditional */}
      <div className="rounded-xl border border-border bg-muted/10 p-4">
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
          <span className="font-medium uppercase tracking-wider text-muted-foreground text-[11px]">
            Traditional Package
          </span>
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            Runtime Abstraction
          </span>
        </div>
        <div className="space-y-2">
          <div className="rounded-md border border-border bg-background p-2.5">
            <span className="font-semibold text-foreground block">Application Code</span>
            <span className="text-[11px] text-muted-foreground">Calls external library component</span>
          </div>
          <div className="flex justify-center text-muted-foreground">
            <HaloIcon icon={ArrowDown01Icon} size={13} />
          </div>
          <div className="rounded-md border border-border bg-background p-2.5">
            <span className="font-semibold text-foreground block">Library API Interface</span>
            <span className="text-[11px] text-muted-foreground">Rigid props and exposed configuration</span>
          </div>
          <div className="flex justify-center text-muted-foreground">
            <HaloIcon icon={ArrowDown01Icon} size={13} />
          </div>
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-2.5 text-muted-foreground">
            <span className="font-medium block">Hidden Implementation</span>
            <span className="text-[11px]">Locked inside node_modules</span>
          </div>
        </div>
      </div>

      {/* HaloUI */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] p-4">
        <div className="mb-3 flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
          <span className="font-medium uppercase tracking-wider text-foreground text-[11px]">
            HaloUI Registry
          </span>
          <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            Source Owned
          </span>
        </div>
        <div className="space-y-2">
          <div className="rounded-md border border-border bg-background p-2.5">
            <span className="font-semibold text-foreground block">Component Registry</span>
            <span className="text-[11px] text-muted-foreground">Distributes verified source code</span>
          </div>
          <div className="flex justify-center text-emerald-600 dark:text-emerald-400">
            <HaloIcon icon={ArrowDown01Icon} size={13} />
          </div>
          <div className="rounded-md border border-border bg-background p-2.5">
            <span className="font-semibold text-foreground block">Installed Source</span>
            <span className="text-[11px] text-muted-foreground">Saved directly in components/ui/</span>
          </div>
          <div className="flex justify-center text-emerald-600 dark:text-emerald-400">
            <HaloIcon icon={ArrowDown01Icon} size={13} />
          </div>
          <div className="rounded-md border border-emerald-500/30 bg-background p-2.5 font-medium text-foreground">
            <span className="font-semibold text-foreground block">Editable Application Code</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-300">Inspect, version, customize, and extend</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. MaterialLayersDiagram
 * Visual optical engine layer stack.
 */
export function MaterialLayersDiagram() {
  const layers = [
    { name: "Directional Specular Highlight", desc: "135° virtual light reflection" },
    { name: "Optical Edge", desc: "Hairline boundary & inner rim catch" },
    { name: "Surface Body + Diffusion", desc: "Translucent tint & GPU backdrop blur" },
    { name: "Content Isolation", desc: "Accessible typography & Hugeicons" },
    { name: "Refraction Rim", desc: "1px edge displacement" },
    { name: "Contact & Ambient Shadow", desc: "Substrate anchoring & environmental glow" },
  ];

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Optical Material Layer Stack
      </div>
      <div className="mx-auto max-w-md space-y-1.5">
        <div className="flex items-center justify-between px-2 text-[10px] font-mono text-muted-foreground">
          <span>&darr; Virtual Light Source (135&deg;)</span>
          <span>Top surface</span>
        </div>
        {layers.map((layer, idx) => (
          <div
            key={layer.name}
            className="flex items-center justify-between rounded-lg border border-border bg-background/80 px-3.5 py-2 text-xs shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground">L{idx + 1}</span>
              <span className="font-medium text-foreground">{layer.name}</span>
            </div>
            <span className="text-[11px] text-muted-foreground hidden sm:inline">{layer.desc}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-2 text-[10px] font-mono text-muted-foreground">
          <span>&darr; Contact Shadow</span>
          <span>Environment substrate</span>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Individual components use calibrated combinations and intensities of these layers. Not every component requires every effect.
      </p>
    </div>
  );
}

/**
 * 5. ComponentQualityDiagram
 * Visualizes the 4 pillars of HaloUI component quality.
 */
export function ComponentQualityDiagram() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Component Quality Architecture
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-lg border border-border bg-muted/60 px-5 py-2 text-sm font-semibold text-foreground">
          HaloUI Component
        </div>

        <div className="my-1 w-full max-w-sm">
          <div className="mx-auto h-4 w-px bg-border" />
          <div className="relative h-px w-full bg-border">
            <div className="absolute left-0 top-0 h-3 w-px bg-border" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-px bg-border" />
            <div className="absolute right-0 top-0 h-3 w-px bg-border" />
          </div>
        </div>

        <div className="grid w-full max-w-sm grid-cols-3 gap-2 pt-2 text-center text-xs">
          <div className="rounded-md border border-border bg-background p-2">
            <span className="font-semibold text-foreground block">Appearance</span>
            <span className="text-[10px] text-muted-foreground">Liquid material</span>
          </div>
          <div className="rounded-md border border-border bg-background p-2">
            <span className="font-semibold text-foreground block">Behavior</span>
            <span className="text-[10px] text-muted-foreground">Predictable states</span>
          </div>
          <div className="rounded-md border border-border bg-background p-2">
            <span className="font-semibold text-foreground block">Accessibility</span>
            <span className="text-[10px] text-muted-foreground">WCAG 2.1 AA</span>
          </div>
        </div>

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

        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-semibold text-foreground">
          Source Ownership & Adaptability
        </div>
      </div>
    </div>
  );
}

/**
 * 6. ComponentLifecycleDiagram
 * Steps from component specification to application showcases.
 */
export function ComponentLifecycleDiagram() {
  const lifecycle = [
    "Specification",
    "Implementation",
    "Accessibility & States",
    "Interactive Previews",
    "Registry Item",
    "Verification",
    "Documentation",
    "Showcases",
  ];

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Component Product Lifecycle
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {lifecycle.map((stage, idx) => (
          <React.Fragment key={stage}>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
              <span className="font-mono text-[10px] text-muted-foreground">0{idx + 1}</span>
              <span>{stage}</span>
            </div>
            {idx < lifecycle.length - 1 && (
              <span className="text-muted-foreground text-xs" aria-hidden="true">&rarr;</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        The component demonstrated in documentation and showcases is the exact implementation distributed through the registry.
      </p>
    </div>
  );
}

/**
 * 7. InstalledSourceDiagram
 * The exact diagram from Installation ("What gets installed")
 */
export function InstalledSourceDiagram() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Installed Architecture
      </div>
      <div className="flex flex-col items-center">
        {/* Top Node */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-4 py-2 font-mono text-xs font-semibold text-foreground shadow-xs">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span>Registry Item</span>
          <span className="text-muted-foreground font-normal">(/r/button.json)</span>
        </div>

        {/* Downward Connector */}
        <div className="my-1 flex h-6 w-px flex-col items-center bg-border">
          <div className="mt-auto size-0 border-x-[4px] border-x-transparent border-t-[5px] border-t-muted-foreground" />
        </div>

        {/* Output Grid */}
        <div className="w-full max-w-lg rounded-xl border border-border bg-muted/20 p-4">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Files added directly into your project
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-border bg-background p-3">
              <span className="font-semibold text-foreground block mb-0.5">Component Source</span>
              <code className="text-[11px] text-muted-foreground font-mono">components/ui/halo-button.tsx</code>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <span className="font-semibold text-foreground block mb-0.5">Supporting Primitives</span>
              <code className="text-[11px] text-muted-foreground font-mono">components/icons/halo-icon.tsx</code>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <span className="font-semibold text-foreground block mb-0.5">Package Dependencies</span>
              <span className="text-[11px] text-muted-foreground block truncate">@hugeicons/react, @radix-ui/react-slot...</span>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <span className="font-semibold text-foreground block mb-0.5">Required Tokens</span>
              <code className="text-[11px] text-muted-foreground font-mono">styles/halo-tokens.css</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
