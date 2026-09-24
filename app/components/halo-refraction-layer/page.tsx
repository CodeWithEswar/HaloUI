import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  SecurityCheckIcon,
  AlertCircleIcon,
  ArrowRight01Icon,
  Shield01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { HaloRefractionLayer } from "@/components/haloui/foundations/halo-refraction-layer";
import { RefractionPreviewStage } from "./refraction-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Refraction Layer — Optical Material Foundation",
  description:
    "Optional progressive-enhancement optical layer that introduces restrained environmental distortion to selected HaloUI materials with a guaranteed non-refraction fallback.",
};

const PROPS_DATA = [
  {
    name: "intensity",
    type: '"subtle" | "balanced"',
    default: '"subtle"',
    required: false,
    description:
      "Controls the optical displacement magnitude and perimeter meniscus curvature distortion.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Renders as a Radix Slot child element to compose directly onto consumer elements without extra DOM wrapper nodes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Standard Tailwind or custom CSS class string for geometry and layout adjustments.",
  },
];

const ANATOMY_PARTS = [
  {
    name: "Root Container",
    selector: "pointer-events-none absolute inset-0 z-0 rounded-[inherit]",
    description:
      "Positioned absolutely behind the content plane to isolate decorative refraction from consumer elements.",
  },
  {
    name: "Perimeter Meniscus Mask",
    selector: "mask-radial-gradient",
    description:
      "Radial optical mask constraining distortion strictly to outer perimeter edges where light bends through material thickness.",
  },
  {
    name: "Refractive Rim Dispersion",
    selector: "mix-blend-mode: overlay",
    description:
      "Simulates micro-chromatic displacement and optical Sheen along the 135° virtual light vector.",
  },
  {
    name: "Meniscus Hairline",
    selector: "box-shadow: inset",
    description:
      "Sub-pixel physical refraction catch anchoring the distorted rim to the material boundary.",
  },
];

const INSTALLED_FILES = [
  {
    name: "components",
    type: "folder" as const,
    children: [
      {
        name: "ui",
        type: "folder" as const,
        children: [
          {
            name: "halo-refraction-layer.tsx",
            type: "file" as const,
            description: "The canonical refraction primitive and props interface",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder" as const,
    children: [
      {
        name: "halo-tokens.css",
        type: "file" as const,
        description: "Physical material tokens for surface, edge, refraction, and blur",
      },
    ],
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Surface",
    slug: "halo-surface",
    role: "Material Substrate",
    description:
      "The core container providing calibrated environmental diffusion and contact shadows.",
  },
  {
    name: "Halo Edge",
    slug: "halo-edge",
    role: "Optical Boundary",
    description:
      "Sub-pixel outer separation hairlines and inset 135° directional edge catches.",
  },
  {
    name: "Halo Highlight",
    slug: "halo-highlight",
    role: "Directional Light",
    description:
      "135° virtual light vector producing directional specular reflections.",
  },
  {
    name: "Halo Noise",
    slug: "halo-noise",
    role: "Micro-Texture",
    description:
      "High-frequency procedural micro-grain mitigating gradient banding.",
  },
];

export default function HaloRefractionLayerPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Foundations & Material
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono">
            Experimental
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Halo Refraction Layer
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Optional progressive-enhancement optical layer that introduces restrained environmental distortion to selected HaloUI materials with a guaranteed non-refraction fallback.
        </p>
      </div>

      {/* 2. Interactive Preview */}
      <section className="space-y-4">
        <RefractionPreviewStage />
      </section>

      {/* 3. Core Principle Callout */}
      <Callout type="note">
        <strong>Refraction is progressive enhancement.</strong> HaloUI interfaces remain completely visually coherent and readable when refraction is unavailable, disabled, reduced, or too expensive for the current context. Refraction enhances material depth; it is never structural architecture.
      </Callout>

      {/* 4. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Add Halo Refraction Layer directly to your codebase via the shadcn CLI.
          </p>
        </div>
        <InstallCommand registry="http://localhost:3000/r/halo-refraction-layer.json" />
      </section>

      {/* 5. Usage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose <code>HaloRefractionLayer</code> inside a <code>HaloSurface</code> or any container with relative positioning.
          </p>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloEdge } from "@/components/ui/halo-edge";
import { HaloHighlight } from "@/components/ui/halo-highlight";
import { HaloRefractionLayer } from "@/components/ui/halo-refraction-layer";

export function HeroGlassCard() {
  return (
    <HaloSurface intensity="rich" elevation="raised" className="relative p-8 rounded-3xl">
      {/* Layer 07: Refraction Layer (decorative enhancement) */}
      <HaloRefractionLayer intensity="subtle" />

      {/* Optical boundary & light */}
      <HaloEdge strength="balanced" placement="both" />
      <HaloHighlight kind="broad" strength="balanced" />

      {/* Content Plane (100% distortion-free) */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Hero Showcase</h3>
        <p className="text-sm text-muted-foreground">
          Content remains crisp and isolated above decorative optical refraction.
        </p>
      </div>
    </HaloSurface>
  );
}`}
        />
      </section>

      {/* 6. How Refraction Works */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            How refraction works
          </h2>
          <p className="text-sm text-muted-foreground">
            Refraction simulates the subtle bending of light as it passes through physical materials with varying refractive indices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={Layers01Icon} size={15} />
              Perimeter Meniscus Mask
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Distortion is strictly constrained to the outer boundary perimeter via calibrated radial gradient masks. Central areas remain zero-distortion to ensure readability.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={SparklesIcon} size={15} />
              Chromatic Sheen Vector
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Light striking from 135° virtual vector produces localized dispersion along light-facing boundaries, suggesting high-density crystal or optical glass.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={Shield01Icon} size={15} />
              Content Isolation
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Refraction operates exclusively as a background decorative layer (<code>z-0</code>). Text, icons, inputs, and focus rings sit on isolated foreground planes (<code>z-10</code>).
            </p>
          </div>
        </div>
      </section>

      {/* 7. Intensity Presets */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Intensity presets
          </h2>
          <p className="text-sm text-muted-foreground">
            Two carefully tuned intensity levels calibrated for visual restraint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border border-border bg-muted/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-foreground uppercase">
                subtle (Default)
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                1px Chromatic · 2px Blur
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Whisper-quiet environmental displacement suitable for standard raised cards, modal sheets, and floating action panels.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-muted/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-foreground uppercase">
                balanced
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                2px Chromatic · 4px Blur
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Elevated meniscus curvature displacement reserved for hero focal elements, showcase surfaces, and standalone interactive docks.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Fallback Behavior */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Fallback behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            When backdrop filters are unsupported or disabled, Halo Refraction Layer smoothly collapses to zero displacement.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2 text-xs text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Graceful Degradation:</strong> Unlike heavy WebGL canvas shaders that fail with blank regions or console errors, Halo Refraction Layer relies on standard CSS compositing. If <code>backdrop-filter</code> is unavailable, the component falls back to the underlying <code>HaloSurface</code> translucent body without layout shifts.
          </p>
        </div>
      </section>

      {/* 9. Props Table */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Public API reference for <code>HaloRefractionLayer</code>.
          </p>
        </div>
        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 10. Anatomy */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            Internal structural elements composing the refractive optical layer.
          </p>
        </div>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 11. Accessibility */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <p className="text-sm text-muted-foreground">
            WCAG 2.1 AA criteria adherence and content safety guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={SecurityCheckIcon} size={15} className="text-emerald-500" />
              Decorative Contract
            </span>
            <p className="leading-relaxed">
              Enforced with <code>aria-hidden=&quot;true&quot;</code> and <code>pointer-events-none</code>. Sits outside assistive technology trees and never intercepts clicks, touch, or gestures.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={AlertCircleIcon} size={15} className="text-amber-500" />
              Reduced Motion Inert
            </span>
            <p className="leading-relaxed">
              When <code>prefers-reduced-motion: reduce</code> is signaled, dynamic transform displacement collapses to static zero-offset coordinates without visual disorientation.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Performance */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Performance
          </h2>
          <p className="text-sm text-muted-foreground">
            Hardware-accelerated rendering characteristics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">Zero JS</span>
            <div className="font-semibold text-foreground">Pure CSS Pipeline</div>
            <p className="text-muted-foreground leading-relaxed">
              No requestAnimationFrame tick loops, cursor coordinate listeners, or WebGL shader allocations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">GPU Composited</span>
            <div className="font-semibold text-foreground">Compositor Thread</div>
            <p className="text-muted-foreground leading-relaxed">
              Radial gradient masks and backdrop blur filters composite on GPU raster layers without layout recalculations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">Selected Use</span>
            <div className="font-semibold text-foreground">Budget Discipline</div>
            <p className="text-muted-foreground leading-relaxed">
              Recommended for focal cards, modals, and docks. Avoid attaching to dozens of repeated table rows or buttons.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Dependencies */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            Required runtime packages for <code>halo-refraction-layer</code>.
          </p>
        </div>

        <DependencyList
          groups={[
            {
              title: "External dependencies",
              items: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
            },
            {
              title: "Registry dependencies",
              items: [],
            },
          ]}
        />
      </section>

      {/* 14. Installed Files */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Installed files
          </h2>
          <p className="text-sm text-muted-foreground">
            Exact file locations created upon installation into your consumer project.
          </p>
        </div>
        <FileTree items={INSTALLED_FILES} />
      </section>

      {/* 15. Related Foundations */}
      <section className="space-y-6 pt-4 border-t border-border/40">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Related foundations
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore foundations that compose with or enhance the HaloUI optical material engine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RELATED_FOUNDATIONS.map((foundation) => (
            <Link
              key={foundation.slug}
              href={`/components/${foundation.slug}`}
              className="group p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/30 hover:border-border transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {foundation.name}
                  <HaloIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  />
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
                  {foundation.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {foundation.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 16. Changelog */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Changelog
          </h2>
          <p className="text-sm text-muted-foreground">
            Version history and release notes for Halo Refraction Layer.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground font-mono">2026-09-24</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
            <li>Initial production release of the optional progressive-enhancement optical refraction layer.</li>
            <li>Restrained 2-tier intensity model: <code>subtle</code> and <code>balanced</code>.</li>
            <li>Perimeter meniscus radial gradient masking ensuring zero text distortion.</li>
            <li>Pure CSS backdrop-filter architecture with automatic zero-distortion fallback.</li>
            <li>Integrated Radix Slot polymorphism via <code>asChild</code>.</li>
            <li>Packaged for automated source distribution via <code>/r/halo-refraction-layer.json</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
