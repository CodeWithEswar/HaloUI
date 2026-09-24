import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers01Icon,
  SparklesIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  FileCodeIcon,
  SecurityCheckIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  HaloEdge,
  type HaloEdgeStrength,
  type HaloEdgePlacement,
} from "@/components/haloui/foundations/halo-edge";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloBackground } from "@/components/haloui/foundations/halo-background";
import { EdgePreviewStage } from "./edge-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Edge — Liquid Material Optical Boundary",
  description:
    "Layered outer and inset optical boundary treatment for translucent HaloUI materials. Communicates material thickness, directional virtual lighting, and environmental separation without resorting to a flat uniform border.",
};

const PROPS_DATA = [
  {
    name: "strength",
    type: '"subtle" | "balanced" | "strong"',
    default: '"balanced"',
    required: false,
    description:
      "Controls the optical contrast of the boundary hairlines and directional light catches.",
  },
  {
    name: "placement",
    type: '"outer" | "inner" | "both"',
    default: '"both"',
    required: false,
    description:
      "Determines whether the optical boundary renders external separation, internal thickness catches, or both.",
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
    name: "Outer Separation Hairline",
    selector: "shadow-[0_0_0_1px_rgba(...)]",
    description:
      "Sub-pixel 1px outer boundary separating translucent liquid glass from contrasting backdrops without clipping geometry.",
  },
  {
    name: "Inner Specular Catch",
    selector: "shadow-[inset_0_1px_1px_0_rgba(...)]",
    description:
      "Directional 135° top-left luminous hairline catch communicating virtual lighting orientation and physical material thickness.",
  },
  {
    name: "Opposing Rim Attenuation",
    selector: "shadow-[inset_0_-1px_1px_0_rgba(...)]",
    description:
      "Lower-right shadow attenuation grounding the material against its contact plane without flat uniform outlines.",
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
            name: "halo-edge.tsx",
            type: "file" as const,
            description: "The canonical optical boundary primitive and semantic props interface",
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
        description: "Shared optical tokens for edge, highlight, and boundary contrast",
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
    name: "Halo Highlight",
    slug: "halo-highlight",
    role: "Directional Light",
    description:
      "135° virtual light vector providing dynamic and specular surface reflections.",
    status: "Next foundation",
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

export default async function HaloEdgePage() {
  const minimalUsageCode = `import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloEdge } from "@/components/ui/halo-edge";

export default function GlassCard() {
  return (
    <HaloSurface elevation="raised" className="relative p-6 rounded-2xl">
      {/* Halo Edge provides layered boundary definition */}
      <HaloEdge strength="balanced" placement="both" />
      <h3 className="text-base font-semibold text-foreground">Defined Edge</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Boundary hairlines define thickness and environmental separation.
      </p>
    </HaloSurface>
  );
}`;

  const strengthUsageCode = `// 1. Subtle: quiet boundary for dense UI, forms, and repeated rows
<HaloEdge strength="subtle" />

// 2. Balanced: standard calibrated material boundary (Default)
<HaloEdge strength="balanced" />

// 3. Strong: high separation for floating overlays and modal panels
<HaloEdge strength="strong" />`;

  const placementUsageCode = `// Outer: external 1px boundary separation
<HaloEdge placement="outer" />

// Inner: internal refractive thickness and specular light catch
<HaloEdge placement="inner" />

// Both: coordinated dual boundary (Default)
<HaloEdge placement="both" />`;

  return (
    <div className="w-full space-y-12 sm:space-y-16 py-4 sm:py-6 lg:py-8">
      {/* 1. Component Identity & Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="font-mono text-xs border-border uppercase tracking-widest"
          >
            Foundations & Material
          </Badge>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-mono text-muted-foreground">Foundation 02</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Preview
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-mono text-muted-foreground">WCAG 2.1 AA (Decorative)</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Halo Edge
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-normal">
              Layered outer and inset optical boundary treatment for translucent HaloUI materials. Communicates material thickness, directional virtual lighting, and environmental separation without resorting to a flat uniform border.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Preview */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Preview
          </h2>
          <p className="text-sm text-muted-foreground">
            Evaluate optical edge hairlines across viewports, environments, strength tiers, and structural placement modes.
          </p>
        </div>
        <EdgePreviewStage />
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

        <InstallCommand registry="halo-edge" />
      </section>

      {/* 4. Usage */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose <code>HaloEdge</code> directly inside a <code>HaloSurface</code> or any container with relative positioning.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Basic usage</h3>
          <CodeBlock
            code={minimalUsageCode}
            language="tsx"
            filename="components/glass-card.tsx"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Strength & Placement configuration</h3>
          <CodeBlock
            code={strengthUsageCode}
            language="tsx"
            filename="components/edge-examples.tsx"
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
              <li>When translucent materials need subtle physical thickness and boundary definition.</li>
              <li>When separating cards, floating toolbars, and popovers from high-contrast image or code backdrops.</li>
              <li>When building higher-level HaloUI action and modal components (Button, Dialog, Dock).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={AlertCircleIcon} size={16} className="text-amber-500" />
              When not to use
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Do not use as a glowing neon outline or focus ring indicator.</li>
              <li>Do not use as form validation infrastructure (invalid state belongs to input semantics).</li>
              <li>Do not duplicate with standard uniform CSS borders on the same container.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Strength */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Edge strength
          </h2>
          <p className="text-sm text-muted-foreground">
            Three calibrated hierarchy levels governing outer separation contrast and inset specular rim brightness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Subtle */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">subtle</span>
              <span className="text-xs text-muted-foreground font-mono">Quiet boundary</span>
            </div>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="subtle" elevation="base" className="relative w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <HaloEdge strength="subtle" placement="both" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Dense Workspace</span>
                  <h4 className="text-sm font-semibold text-foreground">Restrained Boundary</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Minimal optical edge separation preventing visual clutter in multi-column tables and toolbars.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for data-dense tables, inline code blocks, and subtle inputs.
            </p>
          </div>

          {/* Balanced */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">balanced</span>
              <span className="text-xs text-muted-foreground font-mono">Standard (Default)</span>
            </div>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <HaloEdge strength="balanced" placement="both" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">General Cards</span>
                  <h4 className="text-sm font-semibold text-foreground">Calibrated Rim</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Harmonized 135° top-left specular hairline catch paired with bottom attenuation.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The default HaloUI edge treatment for cards, popovers, and interactive action buttons.
            </p>
          </div>

          {/* Strong */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">strong</span>
              <span className="text-xs text-muted-foreground font-mono">High separation</span>
            </div>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="rich" elevation="floating" className="relative w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <HaloEdge strength="strong" placement="both" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Floating Overlays</span>
                  <h4 className="text-sm font-semibold text-foreground">Crisp Definition</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Crisp boundary separation designed for modal dialogs and high-altitude focal layers.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reserved for floating docks, command palettes, and modal overlays.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Placement */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Structural placement
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure whether the boundary renders outer environmental separation, inner thickness catches, or both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Outer */}
          <div className="flex flex-col justify-between space-y-3">
            <span className="text-sm font-semibold text-foreground font-mono">outer</span>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[180px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full h-[110px] flex flex-col justify-center p-4 rounded-xl">
                <HaloEdge strength="balanced" placement="outer" />
                <h4 className="text-xs font-semibold text-foreground">Outer Boundary Only</h4>
                <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                  1px outer hairline separating material from background without inner depth.
                </p>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Inner */}
          <div className="flex flex-col justify-between space-y-3">
            <span className="text-sm font-semibold text-foreground font-mono">inner</span>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[180px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full h-[110px] flex flex-col justify-center p-4 rounded-xl">
                <HaloEdge strength="balanced" placement="inner" />
                <h4 className="text-xs font-semibold text-foreground">Inner Catch Only</h4>
                <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                  Inset top-left directional highlight suggesting physical edge thickness.
                </p>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Both */}
          <div className="flex flex-col justify-between space-y-3">
            <span className="text-sm font-semibold text-foreground font-mono">both (Default)</span>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[180px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full h-[110px] flex flex-col justify-center p-4 rounded-xl">
                <HaloEdge strength="balanced" placement="both" />
                <h4 className="text-xs font-semibold text-foreground">Coordinated Boundary</h4>
                <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                  Combines external environmental hairline and internal light-facing specular catch.
                </p>
              </HaloSurface>
            </HaloBackground>
          </div>
        </div>
      </section>

      {/* 7. Virtual Lighting (Section 12 & 20) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Virtual lighting & directional edge
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Edge participates in HaloUI&apos;s 135° virtual light system. Light strikes from upper-left, illuminating the top-left boundary while attenuating the bottom-right.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-muted/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">135° Optical Lighting Vector</h3>
              <p className="text-xs text-muted-foreground">Virtual light coordinate: Top-Left (135deg) → Bottom-Right</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase px-2 py-1 rounded bg-background border border-border">
                Vector: [ -0.707, 0.707, 0.5 ]
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="space-y-1.5 p-3 rounded-lg bg-background border border-border">
              <span className="font-semibold text-foreground block">Light-Facing Boundary (Top-Left)</span>
              <p>Receives direct specular reflection. Renders as a crisp luminous hairline (up to 100% opacity in light mode, 28% in dark mode) suggesting physical glass refraction.</p>
            </div>
            <div className="space-y-1.5 p-3 rounded-lg bg-background border border-border">
              <span className="font-semibold text-foreground block">Opposing Boundary (Bottom-Right)</span>
              <p>Attenuated into a soft ambient contact shadow (down to 4% opacity in light mode, 60% shadow in dark mode) anchoring the surface to its ground plane.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Comparison: Uniform Border vs Halo Edge (Section 19 & 20) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Uniform boundary vs Halo Edge
          </h2>
          <p className="text-sm text-muted-foreground">
            Side-by-side comparison across identical surfaces, geometry, and environment. Halo Edge replaces flat 1-color outlines with physics-derived boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Uniform Border */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-foreground">Conventional 1px Border</span>
              <span className="text-muted-foreground">Flat Uniform Color</span>
            </div>
            <HaloBackground
              environment="spectral"
              className="rounded-xl h-[240px] flex items-center justify-center border border-border/40"
              contentClassName="p-6 w-full h-full flex items-center justify-center"
            >
              <div className="w-full max-w-xs p-5 rounded-2xl bg-white/70 dark:bg-black/60 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 shadow-sm space-y-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Uniform Boundary</span>
                <h4 className="text-sm font-semibold text-foreground">Flat Stroke</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Uses standard <code>border: 1px solid</code>. All 4 sides share identical brightness, flattening dimensional depth.
                </p>
              </div>
            </HaloBackground>
            <p className="text-xs text-muted-foreground">
              Flat borders treat digital UI as 2D vector shapes, ignoring physical light and material thickness.
            </p>
          </div>

          {/* Halo Edge */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-foreground">Halo Edge Optical Boundary</span>
              <span className="text-cyan-500 font-semibold">Directional Refraction</span>
            </div>
            <HaloBackground
              environment="spectral"
              className="rounded-xl h-[240px] flex items-center justify-center border border-border/40"
              contentClassName="p-6 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="relative w-full max-w-xs p-5 rounded-2xl space-y-2">
                <HaloEdge strength="balanced" placement="both" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Optical Edge</span>
                <h4 className="text-sm font-semibold text-foreground">Refractive Rim</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Combines outer environmental separation with an inset 135° specular light catch and opposing shadow attenuation.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground">
              Halo Edge models physical material thickness, directional sheen, and true environmental separation.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Composition */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Composition
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Edge is designed to compose seamlessly inside <code>HaloSurface</code> or any container with relative positioning.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Geometry Inheritance:</strong> Halo Edge uses <code>rounded-[inherit]</code> and <code>absolute inset-0</code>. When placed inside a host surface with <code>rounded-2xl</code>, <code>rounded-lg</code>, or <code>rounded-full</code>, the edge adapts without requiring manual radius props.
          </p>
          <p>
            <strong className="text-foreground">Zero Layout Shift:</strong> Because Halo Edge positions absolutely with box-shadows rather than border width, it consumes 0px of content box layout and will never trigger layout recalculations or content shifts.
          </p>
        </div>
      </section>

      {/* 10. Props */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Public API specifications for the <code>HaloEdge</code> component.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 11. Anatomy */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            Internal optical layers constituting the physical boundary.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 12. Accessibility */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Edge satisfies WCAG 2.1 AA accessibility guidelines as a purely decorative primitive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={SecurityCheckIcon} size={15} className="text-emerald-500" />
              Decorative Isolation
            </span>
            <p className="leading-relaxed">
              Halo Edge automatically applies <code>aria-hidden=&quot;true&quot;</code> and <code>pointer-events-none</code>. It never appears in the accessibility tree, never intercepts mouse/touch input, and never disrupts screen readers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <HaloIcon icon={AlertCircleIcon} size={15} className="text-amber-500" />
              Focus Ring Independence
            </span>
            <p className="leading-relaxed">
              Halo Edge is <strong>not</strong> a keyboard focus ring. Focused components must maintain independent high-contrast focus rings (via <code>HaloFocusRing</code>) that are never obscured by edge styling.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Responsive Behavior */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Responsive behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            Optical hairlines dynamically follow parent geometry without hardcoded breakpoints.
          </p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Halo Edge uses vector box-shadow coordinates that scale identically on high-DPI Retina screens and standard displays. Whether host elements flex on mobile or span 1040px on desktop, the boundary remains sub-pixel crisp.
        </p>
      </section>

      {/* 14. Performance */}
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
            <div className="font-semibold text-foreground">Pure CSS Box-Shadow</div>
            <p className="text-muted-foreground leading-relaxed">No requestAnimationFrame, no pointer listeners, and no Canvas/WebGL pipelines.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">Zero DOM bloat</span>
            <div className="font-semibold text-foreground">Single Decorative Node</div>
            <p className="text-muted-foreground leading-relaxed">Renders as a single un-styled element, or merges into parent element via <code>asChild</code>.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="font-mono text-muted-foreground uppercase text-[10px]">Composite Thread</span>
            <div className="font-semibold text-foreground">60–120 FPS Rendering</div>
            <p className="text-muted-foreground leading-relaxed">Box-shadow hairlines render entirely on the GPU compositor thread without CPU repaints.</p>
          </div>
        </div>
      </section>

      {/* 15. Dependencies */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            External and registry dependencies for <code>halo-edge</code>.
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

      {/* 16. Installed Files */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Installed files
          </h2>
          <p className="text-sm text-muted-foreground">
            Files added to your workspace when executing <code>shadcn add halo-edge</code>.
          </p>
        </div>

        <FileTree items={INSTALLED_FILES} />
      </section>

      {/* 17. Related Foundations & Changelog */}
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
