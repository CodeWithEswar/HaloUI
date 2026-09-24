import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers01Icon,
  SparklesIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  SecurityCheckIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  HaloHighlight,
  type HaloHighlightKind,
  type HaloHighlightStrength,
} from "@/components/haloui/foundations/halo-highlight";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloBackground } from "@/components/haloui/foundations/halo-background";
import { HighlightPreviewStage } from "./highlight-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Highlight — Directional Virtual Light & Specular Sheen",
  description:
    "Directional reflected-light and restrained specular treatment used to communicate surface orientation and material response against HaloUI's 135° virtual light vector.",
};

const PROPS_DATA = [
  {
    name: "kind",
    type: '"edge" | "broad" | "specular"',
    default: '"edge"',
    required: false,
    description:
      "The structural form of directional reflected light: localized edge catch, broad quadrant diffusion, or focused specular reflection.",
  },
  {
    name: "strength",
    type: '"subtle" | "balanced" | "strong"',
    default: '"balanced"',
    required: false,
    description:
      "Controls the luminance intensity of the received light reflection.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Renders as a Radix Slot child element to compose directly onto custom elements without extra DOM nodes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Standard Tailwind or custom CSS class string for subtle opacity or positioning adjustments.",
  },
];

const ANATOMY_PARTS = [
  {
    name: "Directional Gradient Field",
    selector: "bg-[linear-gradient(135deg,...)]",
    description:
      "Vector gradient field calibrated to virtual light (135°), illuminating the upper-left face without washing out underlying content.",
  },
  {
    name: "Specular Focal Sheen",
    selector: "bg-[radial-gradient(ellipse_at_16%_16%,...)]",
    description:
      "Localized high-frequency light reflection simulating the curvature of the liquid optical substrate.",
  },
  {
    name: "Content Isolation Plane",
    selector: "pointer-events-none absolute inset-0",
    description:
      "Zero-footprint optical overlay sitting below consumer text while remaining above decorative background layers.",
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
            name: "halo-highlight.tsx",
            type: "file" as const,
            description: "The canonical directional light primitive and semantic props interface",
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
        description: "Shared optical tokens for highlight vector and reflection intensity",
      },
    ],
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Surface",
    slug: "halo-surface",
    role: "Material Body",
    description:
      "The base container providing tint, environmental diffusion, and elevation context.",
    status: "Implemented",
  },
  {
    name: "Halo Edge",
    slug: "halo-edge",
    role: "Optical Boundary",
    description:
      "Defines boundary thickness, outer contact hairlines, and directional edge catches.",
    status: "Implemented",
  },
  {
    name: "Halo Noise",
    slug: "halo-noise",
    role: "Material Texture",
    description:
      "Shared micro-grain turbulence layer preventing optical banding.",
    status: "Phase 04",
  },
  {
    name: "Halo Glow",
    slug: "halo-glow",
    role: "Ambient Emphasis",
    description:
      "Controlled luminous aura for selected interactive or hero surfaces.",
    status: "Phase 05",
  },
];

export default async function HaloHighlightPage() {
  const minimalUsageCode = `import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloEdge } from "@/components/ui/halo-edge";
import { HaloHighlight } from "@/components/ui/halo-highlight";

export default function IlluminatedCard() {
  return (
    <HaloSurface elevation="raised" className="relative p-6 rounded-2xl">
      <HaloEdge strength="balanced" />
      {/* Halo Highlight communicates surface orientation against virtual light */}
      <HaloHighlight kind="edge" strength="balanced" />
      <div className="relative z-10">
        <h3 className="text-base font-semibold text-foreground">Illuminated Substrate</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Receives virtual 135° directional illumination.
        </p>
      </div>
    </HaloSurface>
  );
}`;

  const kindUsageCode = `// 1. Edge: localized 135° light catch near top-left boundary (buttons, inputs)
<HaloHighlight kind="edge" />

// 2. Broad: low-frequency ambient quadrant light (cards, panels, dialogs)
<HaloHighlight kind="broad" />

// 3. Specular: focused focal light reflection (floating docks, hero overlays)
<HaloHighlight kind="specular" />`;

  return (
    <div className="w-full space-y-12 sm:space-y-16 py-4 sm:py-6 lg:py-8">
      {/* 1. Component Identity & Header */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Halo Highlight
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-normal">
              Directional reflected-light and restrained specular treatment used to communicate surface orientation and material response against HaloUI&apos;s 135° virtual light vector.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Preview */}
      <section className="space-y-4">
        <HighlightPreviewStage />
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Distribute directly into your project via the shadcn CLI registry pipeline.
          </p>
        </div>

        <InstallCommand registry="halo-highlight" />
      </section>

      {/* 4. Usage */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Highlights reveal geometry—they do not decorate empty space.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Basic usage</h3>
          <CodeBlock
            code={minimalUsageCode}
            language="tsx"
            filename="components/illuminated-card.tsx"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Highlight forms (kind)</h3>
          <CodeBlock
            code={kindUsageCode}
            language="tsx"
            filename="components/highlight-examples.tsx"
          />
        </div>

        {/* When to use / When not to use */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={CheckmarkCircle01Icon} size={16} className="text-emerald-500" />
              When to use
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>To communicate material orientation and virtual depth across interactive action surfaces.</li>
              <li>To provide subtle top-left specular sheen on prominent cards, panels, and dialogs.</li>
              <li>To harmonize interactive tactile responses (rest, hover, active press) with received lighting.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={AlertCircleIcon} size={16} className="text-amber-500" />
              When not to use
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Do not add moving shimmer loops, continuous streaks, or metallic chrome effects.</li>
              <li>Do not use as a replacement for high-contrast keyboard focus indicators.</li>
              <li>Do not render heavy highlights directly over small text or dense code streams.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Highlight Behavior (kind) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Highlight forms
          </h2>
          <p className="text-sm text-muted-foreground">
            Three calibrated structural modes reflecting light according to component scale and material hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Edge */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">edge</span>
              <span className="text-xs text-muted-foreground font-mono">Boundary Sheen</span>
            </div>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <HaloEdge strength="balanced" />
                <HaloHighlight kind="edge" strength="balanced" />
                <div className="relative z-10">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Buttons & Inputs</span>
                  <h4 className="text-sm font-semibold text-foreground">Localized Edge</h4>
                </div>
                <p className="relative z-10 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Concentrated top-left light sheen ideal for compact buttons, inputs, and controls.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recommended for tactile interactive surfaces, buttons, and form controls.
            </p>
          </div>

          {/* Broad */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">broad</span>
              <span className="text-xs text-muted-foreground font-mono">Low-Frequency</span>
            </div>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <HaloEdge strength="balanced" />
                <HaloHighlight kind="broad" strength="balanced" />
                <div className="relative z-10">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Cards & Panels</span>
                  <h4 className="text-sm font-semibold text-foreground">Ambient Quadrant</h4>
                </div>
                <p className="relative z-10 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Gradual low-frequency illumination establishing overall panel orientation.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for medium to large cards, sheets, panels, and modal dialogs.
            </p>
          </div>

          {/* Specular */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">specular</span>
              <span className="text-xs text-muted-foreground font-mono">Focal Glint</span>
            </div>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="rich" elevation="floating" className="relative w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <HaloEdge strength="strong" />
                <HaloHighlight kind="specular" strength="balanced" />
                <div className="relative z-10">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Floating Docks</span>
                  <h4 className="text-sm font-semibold text-foreground">Curvature Glint</h4>
                </div>
                <p className="relative z-10 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Focused top-left glint simulating liquid optical meniscus curvature.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reserved for floating docks, hero focal layers, and high-altitude elements.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Strength */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Highlight strength
          </h2>
          <p className="text-sm text-muted-foreground">
            Luminance scaling presets adapting reflection brightness to interface density.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
            <span className="text-xs font-mono font-semibold text-foreground uppercase">subtle</span>
            <p className="text-xs text-muted-foreground">60% luminance scale. Quiet reflection for data tables, sidebars, and repeated toolbars.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
            <span className="text-xs font-mono font-semibold text-foreground uppercase">balanced (Default)</span>
            <p className="text-xs text-muted-foreground">100% luminance scale. Harmonized reflection across standard light and dark themes.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
            <span className="text-xs font-mono font-semibold text-foreground uppercase">strong</span>
            <p className="text-xs text-muted-foreground">125% luminance scale. Elevated sheen reserved for floating actions and hero showcases.</p>
          </div>
        </div>
      </section>

      {/* 7. Props */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Public API specifications for the <code>HaloHighlight</code> component.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 8. Anatomy */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            Internal optical gradient structure comprising the received light layer.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 9. Accessibility */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Highlight satisfies WCAG 2.1 AA accessibility guidelines as a purely decorative primitive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={SecurityCheckIcon} size={15} className="text-emerald-500" />
              Decorative Contract
            </span>
            <p className="leading-relaxed">
              Halo Highlight applies <code>aria-hidden=&quot;true&quot;</code> and <code>pointer-events-none</code>. It sits outside the accessibility tree and never intercepts touch, click, or drag inputs.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={AlertCircleIcon} size={15} className="text-amber-500" />
              Focus Ring Independence
            </span>
            <p className="leading-relaxed">
              Highlights must never serve as keyboard focus indicators. Independent dual-offset focus rings remain completely unobstructed.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Performance */}
      <section className="space-y-4 pt-4">
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
            <div className="font-semibold text-foreground">Pure CSS Gradients</div>
            <p className="text-muted-foreground leading-relaxed">No requestAnimationFrame, no cursor listeners, and zero WebGL pipeline cost.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">Static Fallback</span>
            <div className="font-semibold text-foreground">Touch Device Complete</div>
            <p className="text-muted-foreground leading-relaxed">No reliance on pointer position. Touch users receive the exact same visual depth.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">GPU Compositing</span>
            <div className="font-semibold text-foreground">60–120 FPS Rendering</div>
            <p className="text-muted-foreground leading-relaxed">Linear and radial gradients composite on GPU raster layers without CPU layout recalculation.</p>
          </div>
        </div>
      </section>

      {/* 11. Dependencies */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            Required runtime packages for <code>halo-highlight</code>.
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

      {/* 12. Installed Files */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Installed files
          </h2>
          <p className="text-sm text-muted-foreground">
            Files added to your workspace when executing <code>shadcn add halo-highlight</code>.
          </p>
        </div>

        <FileTree items={INSTALLED_FILES} />
      </section>

      {/* 13. Related Foundations */}
      <section className="space-y-6 pt-4 border-t border-border/40">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Related foundations
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore the next layers in the HaloUI optical material engine.
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
                  <HaloIcon icon={ArrowRight01Icon} size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
                  {foundation.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {foundation.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
