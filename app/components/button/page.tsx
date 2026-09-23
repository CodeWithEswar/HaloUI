import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Download01Icon,
  Copy01Icon,
  InformationCircleIcon,
  SecurityCheckIcon,
  AlertCircleIcon,
  FileCodeIcon,
  PlayIcon,
  Layers01Icon,
  Settings01Icon,
  Delete02Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { ButtonPreviewStage } from "./button-preview-stage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Halo Button — Liquid-Glass Action Surface | HaloUI",
  description:
    "An action surface engineered with physical optical response, neoskeuomorphic depth, tactile compression, and Hugeicons integration. Built for the shadcn registry.",
};

const PROPS_DATA = [
  {
    name: "variant",
    type: '"primary" | "neutral" | "subtle" | "ghost" | "destructive" | "rich"',
    default: '"primary"',
    required: "No",
    description: "Visual optical material treatment and luminous rim catch intensity.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg"',
    default: '"md"',
    required: "No",
    description: "Physical dimensions and padding corresponding to standard 8pt grid.",
  },
  {
    name: "intensity",
    type: '"subtle" | "balanced" | "rich"',
    default: '"balanced"',
    required: "No",
    description: "Controls the backdrop diffusion blur and specular highlight reflection depth.",
  },
  {
    name: "magnetic",
    type: "boolean",
    default: "false",
    required: "No",
    description: "Enables restrained physical pointer pull (max 5px) for hero or showcase CTAs.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    required: "No",
    description: "Renders an accessible liquid spinner and sets aria-busy='true'.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: "No",
    description: "Reduces optical transmission, mutes contrast, and sets pointer-events to none.",
  },
  {
    name: "leftIcon",
    type: "IconType (Hugeicons)",
    default: "undefined",
    required: "No",
    description: "Standard Hugeicons icon rendered at optical scale before children.",
  },
  {
    name: "rightIcon",
    type: "IconType (Hugeicons)",
    default: "undefined",
    required: "No",
    description: "Standard Hugeicons icon rendered at optical scale after children.",
  },
  {
    name: "specular",
    type: "boolean",
    default: "true",
    required: "No",
    description: "Toggles the directional 135° virtual light highlight layer.",
  },
  {
    name: "refraction",
    type: "boolean",
    default: "true",
    required: "No",
    description: "Toggles the subtle top rim refraction edge hairline.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: "No",
    description: "Merges behavior onto its immediate child via Radix Slot (e.g., Next.js Link).",
  },
];

export default function ButtonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Component Identity & Editorial Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="font-mono text-xs border-black/10 dark:border-white/10 uppercase tracking-widest">
            Actions / Foundation
          </Badge>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <span className="text-xs font-mono text-stone-500">v1.0.0</span>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-stone-900 dark:text-white font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-white animate-pulse" />
            Stable
          </span>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <span className="text-xs font-mono text-stone-500">WCAG 2.1 AA</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-white">
              Button
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              An action surface engineered with physical optical response: directional specular highlights, neoskeuomorphic depth, tactile compression, and Hugeicons integration.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#installation"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors"
            >
              <HaloIcon icon={Download01Icon} size={14} />
              <span>Install Registry</span>
            </a>
            <a
              href="#api"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors"
            >
              <HaloIcon icon={FileCodeIcon} size={14} />
              <span>API Reference</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Live Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-widest text-stone-500">
            Interactive Stage
          </h2>
          <span className="text-xs text-stone-400 font-mono">
            Test against 6 calibrated environments
          </span>
        </div>
        <ButtonPreviewStage />
      </section>

      {/* 3. Sizing Showcase Matrix */}
      <section className="space-y-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            Optical Sizing Scale
          </h2>
          <p className="text-sm text-stone-500">
            Calibrated on standard 8pt typography and padding increments with proportionate icon scaling.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] flex flex-wrap items-center gap-4">
          <HaloButton size="sm" leftIcon={SparklesIcon}>
            Small (32px)
          </HaloButton>
          <HaloButton size="md" leftIcon={SparklesIcon}>
            Medium (40px)
          </HaloButton>
          <HaloButton size="lg" leftIcon={SparklesIcon}>
            Large (48px)
          </HaloButton>
          <HaloButton size="xl" leftIcon={SparklesIcon} rightIcon={ArrowRight01Icon}>
            X-Large (56px)
          </HaloButton>
          <HaloButton size="icon" aria-label="Icon action">
            <HaloIcon icon={SparklesIcon} size={18} />
          </HaloButton>
        </div>
      </section>

      {/* 4. Variants Showcase */}
      <section className="space-y-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            Material Variants
          </h2>
          <p className="text-sm text-stone-500">
            Engineered for distinct visual hierarchy: from high-clarity subtle controls to luminous rich focal points.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white">
                Primary Liquid
              </span>
              <p className="text-xs text-stone-500">
                Signature luminous rim catch and elevated contact shadow.
              </p>
            </div>
            <HaloButton variant="primary" leftIcon={SparklesIcon}>
              Primary Action
            </HaloButton>
          </div>

          <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white">
                Neutral Optical
              </span>
              <p className="text-xs text-stone-500">
                Balanced material body for standard interface actions.
              </p>
            </div>
            <HaloButton variant="neutral" leftIcon={Layers01Icon}>
              Neutral Action
            </HaloButton>
          </div>

          <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white">
                Subtle Recessed
              </span>
              <p className="text-xs text-stone-500">
                Minimal blur and highlights for dense tables and forms.
              </p>
            </div>
            <HaloButton variant="subtle" leftIcon={Settings01Icon}>
              Subtle Action
            </HaloButton>
          </div>

          <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white">
                Ghost Clarity
              </span>
              <p className="text-xs text-stone-500">
                Transparent at rest; liquid boundary resolves on hover/focus.
              </p>
            </div>
            <HaloButton variant="ghost" leftIcon={Add01Icon}>
              Ghost Action
            </HaloButton>
          </div>

          <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white">
                Destructive Warning
              </span>
              <p className="text-xs text-stone-500">
                Ruby/amber refraction edge for high-consequence operations.
              </p>
            </div>
            <HaloButton variant="destructive" leftIcon={Delete02Icon}>
              Destructive Action
            </HaloButton>
          </div>

          <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white">
                Rich Showcase
              </span>
              <p className="text-xs text-stone-500">
                High specular catch and deeper ambient shadow for hero CTAs.
              </p>
            </div>
            <HaloButton variant="rich" leftIcon={SparklesIcon} rightIcon={ArrowRight01Icon}>
              Showcase CTA
            </HaloButton>
          </div>
        </div>
      </section>

      {/* 5. Compound Scenarios & Showcase Usage */}
      <section className="space-y-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            Compound Compositions
          </h2>
          <p className="text-sm text-stone-500">
            How HaloButton interacts with surrounding physical surfaces in real application workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Bar Card */}
          <HaloSurface elevation="raised" className="p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  Floating Action Bar
                </span>
                <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                  Cluster Deployment #842
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-white animate-ping" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Optical surfaces grouped together maintain consistent virtual lighting vectors, giving natural environmental depth without visual clutter.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/5 dark:border-white/5">
              <HaloButton variant="ghost" size="sm">
                Cancel
              </HaloButton>
              <HaloButton variant="subtle" size="sm">
                Save Draft
              </HaloButton>
              <HaloButton variant="primary" size="sm" leftIcon={CheckmarkCircle01Icon}>
                Deploy Changes
              </HaloButton>
            </div>
          </HaloSurface>

          {/* Magnetic Hero CTA Card */}
          <HaloSurface elevation="floating" className="p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  Showcase Interaction
                </span>
                <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                  Physical Magnetic Response
                </h3>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Restrained 5px Max
              </Badge>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Hover near the CTA below. Notice how the button pulls slightly toward the pointer, communicating physical mass without gimmicky wandering.
            </p>
            <div className="pt-2 flex justify-center">
              <HaloButton
                variant="rich"
                size="lg"
                magnetic
                leftIcon={SparklesIcon}
                rightIcon={ArrowRight01Icon}
              >
                Experience HaloUI
              </HaloButton>
            </div>
          </HaloSurface>
        </div>
      </section>

      {/* 6. Installation & Registry Section */}
      <section id="installation" className="space-y-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            Installation & Registry Architecture
          </h2>
          <p className="text-sm text-stone-500">
            Install directly into your shadcn project. You own the code in your repository.
          </p>
        </div>

        {/* CLI Command Tabs */}
        <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] overflow-hidden">
          <Tabs defaultValue="pnpm" className="w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs font-mono text-stone-500">Package Manager</span>
              <TabsList className="h-7 bg-transparent p-0">
                <TabsTrigger value="pnpm" className="text-xs font-mono h-6 px-2">pnpm</TabsTrigger>
                <TabsTrigger value="npx" className="text-xs font-mono h-6 px-2">npx</TabsTrigger>
                <TabsTrigger value="bunx" className="text-xs font-mono h-6 px-2">bunx</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pnpm" className="p-4 m-0 font-mono text-xs flex items-center justify-between text-stone-800 dark:text-stone-200">
              <code>pnpm dlx shadcn@latest add https://haloui.dev/r/button.json</code>
            </TabsContent>

            <TabsContent value="npx" className="p-4 m-0 font-mono text-xs flex items-center justify-between text-stone-800 dark:text-stone-200">
              <code>npx shadcn@latest add https://haloui.dev/r/button.json</code>
            </TabsContent>

            <TabsContent value="bunx" className="p-4 m-0 font-mono text-xs flex items-center justify-between text-stone-800 dark:text-stone-200">
              <code>bunx --bun shadcn@latest add https://haloui.dev/r/button.json</code>
            </TabsContent>
          </Tabs>
        </div>

        {/* Registry Architecture Metadata View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Installed Files
            </div>
            <div className="font-mono text-xs space-y-1 text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-1.5">
                <HaloIcon icon={FileCodeIcon} size={14} className="text-stone-400" />
                <span>components/ui/halo-button.tsx</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HaloIcon icon={FileCodeIcon} size={14} className="text-stone-400" />
                <span>components/icons/halo-icon.tsx</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HaloIcon icon={FileCodeIcon} size={14} className="text-stone-400" />
                <span>styles/halo-tokens.css</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Package Dependencies
            </div>
            <div className="font-mono text-xs space-y-1 text-stone-700 dark:text-stone-300">
              <div>@hugeicons/react</div>
              <div>@hugeicons/core-free-icons</div>
              <div>@radix-ui/react-slot</div>
              <div>class-variance-authority</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              CSS Tokens Consumed
            </div>
            <div className="font-mono text-xs space-y-1 text-stone-700 dark:text-stone-300">
              <div>--halo-surface</div>
              <div>--halo-edge</div>
              <div>--halo-shadow-elevated</div>
              <div>--halo-blur-md</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Props API Reference */}
      <section id="api" className="space-y-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            API Reference
          </h2>
          <p className="text-sm text-stone-500">
            Exhaustive specification of component properties, default values, and type definitions.
          </p>
        </div>

        <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/[0.06] dark:border-white/[0.06] font-mono text-stone-500">
                <tr>
                  <th className="py-3 px-4">Prop</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Default</th>
                  <th className="py-3 px-4">Req</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {PROPS_DATA.map((prop) => (
                  <tr key={prop.name} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-stone-900 dark:text-white">
                      {prop.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600 dark:text-stone-400">
                      <code>{prop.type}</code>
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-500">
                      {prop.default}
                    </td>
                    <td className="py-3 px-4 text-stone-500">{prop.required}</td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400 max-w-xs">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01] text-xs text-stone-500">
          <span className="font-semibold text-stone-700 dark:text-stone-300">Native Props:</span> HaloButton inherits all standard HTML button attributes (`onClick`, `type`, `form`, `name`, `value`, `autoFocus`, etc.) and supports polymorphic composition via `asChild` with Radix Slot.
        </div>
      </section>

      {/* 8. Accessibility & Anatomy */}
      <section className="space-y-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
            Accessibility & Motion Discipline
          </h2>
          <p className="text-sm text-stone-500">
            Adherence to WCAG 2.1 AA criteria, keyboard interaction, and reduced motion standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-stone-900 dark:text-white">
              <HaloIcon icon={SecurityCheckIcon} size={18} className="text-stone-900 dark:text-white" />
              <span>Keyboard & Focus Management</span>
            </div>
            <ul className="text-xs text-stone-500 space-y-1.5 list-disc list-inside">
              <li><kbd className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">Enter</kbd> or <kbd className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">Space</kbd> activates the action.</li>
              <li>High-contrast optical focus ring with 2px clearance around glass boundaries.</li>
              <li>When <code className="font-mono">loading</code> is true, <code className="font-mono">aria-busy="true"</code> is communicated to assistive tech.</li>
              <li>Disabled state sets <code className="font-mono">aria-disabled="true"</code> and strips pointer triggers.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-stone-900 dark:text-white">
              <HaloIcon icon={InformationCircleIcon} size={18} className="text-stone-900 dark:text-white" />
              <span>Reduced Motion & Performance</span>
            </div>
            <ul className="text-xs text-stone-500 space-y-1.5 list-disc list-inside">
              <li>Honors <code className="font-mono">prefers-reduced-motion: reduce</code> by disabling magnetic displacement.</li>
              <li>Transitions collapse to instant state shifts without lag.</li>
              <li>GPU-optimized backdrop filter bounds prevent browser composite degradation.</li>
              <li>Zero continuous CPU mouse loops: coordinate tracking triggers only on hover.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
