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
  HaloSurface,
  type HaloSurfaceProps,
  type HaloSurfaceIntensity,
  type HaloSurfaceElevation,
} from "@/components/haloui/foundations/halo-surface";
import { HaloBackground } from "@/components/haloui/foundations/halo-background";
import { SurfacePreviewStage } from "./surface-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Surface — Liquid Material Foundation",
  description:
    "The base material container used to construct HaloUI surfaces. Implements the foundational liquid optical substrate with calibrated diffusion, semantic intensity, and non-clipping geometry.",
};

const PROPS_DATA = [
  {
    name: "intensity",
    type: '"subtle" | "balanced" | "rich"',
    default: '"balanced"',
    required: false,
    description:
      "Controls the optical diffusion depth, highlight vibrancy, and environmental transmission.",
  },
  {
    name: "elevation",
    type: '"inset" | "base" | "raised" | "floating" | "overlay"',
    default: '"base"',
    required: false,
    description:
      "Defines the surface's visual relationship to its surrounding environment via tint, edge clarity, and anchoring contact shadow.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Renders as a Radix Slot child element to compose directly onto consumer elements (e.g. Next.js Link, semantic section) without extra DOM nodes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Standard Tailwind or custom CSS class string for geometry, sizing, and layout adjustments.",
  },
];

const ANATOMY_PARTS = [
  {
    name: "Root Container",
    selector: "relative isolate rounded-2xl",
    description:
      "Structural container establishing boundary geometry and isolation context. Deliberately omits overflow-hidden to prevent clipping external focus rings and positioned tooltips.",
  },
  {
    name: "Material Body",
    selector: "bg-[var(--halo-surface)] backdrop-blur-*",
    description:
      "The translucent liquid physical substrate providing calibrated tint, environmental diffusion, and elevation contact shadow anchoring.",
  },
  {
    name: "Content Plane",
    selector: "children",
    description:
      "Consumer-provided markup isolated at full readability above decorative material layers.",
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
            name: "halo-surface.tsx",
            type: "file" as const,
            description: "The canonical surface material primitive and props interface",
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
        description: "Physical material tokens for surface, edge, highlight, and blur",
      },
    ],
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Edge",
    slug: "halo-edge",
    role: "Optical Boundary",
    description:
      "Defines boundary thickness, outer contact hairlines, and directional edge catches.",
    status: "Next foundation",
  },
  {
    name: "Halo Highlight",
    slug: "halo-highlight",
    role: "Directional Light",
    description:
      "135° virtual light vector providing dynamic and specular surface reflections.",
    status: "Planned",
  },
  {
    name: "Halo Noise",
    slug: "halo-noise",
    role: "Material Texture",
    description:
      "Shared micro-grain turbulence layer preventing optical banding.",
    status: "Planned",
  },
  {
    name: "Halo Glow",
    slug: "halo-glow",
    role: "Ambient Emphasis",
    description:
      "Controlled luminous aura for selected interactive or hero surfaces.",
    status: "Planned",
  },
  {
    name: "Halo Focus Ring",
    slug: "halo-focus-ring",
    role: "Accessible Focus",
    description:
      "High-visibility dual-offset focus rings for keyboard navigation.",
    status: "Planned",
  },
  {
    name: "Halo Motion Presets",
    slug: "halo-motion-presets",
    role: "Interaction Physics",
    description:
      "Shared tactile press, spring deceleration, and settlement physics.",
    status: "Planned",
  },
];

export default async function HaloSurfacePage() {
  const minimalUsageCode = `import { HaloSurface } from "@/components/ui/halo-surface";

export default function Example() {
  return (
    <HaloSurface className="p-6">
      <h3 className="text-base font-semibold text-foreground">Material Surface</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Responds to its environment while preserving content separation.
      </p>
    </HaloSurface>
  );
}`;

  const intensityUsageCode = `// Explicitly choose material hierarchy level
<HaloSurface intensity="subtle" className="p-4">
  <TableToolbar />
</HaloSurface>

<HaloSurface intensity="balanced" className="p-6">
  <StandardCard />
</HaloSurface>

<HaloSurface intensity="rich" className="p-8">
  <HeroShowcase />
</HaloSurface>`;

  const asChildUsageCode = `import Link from "next/link";
import { HaloSurface } from "@/components/ui/halo-surface";

export default function InteractiveLink() {
  return (
    <HaloSurface asChild elevation="raised" className="block p-5 no-underline hover:border-[var(--halo-edge-bright)]">
      <Link href="/analytics">
        <span className="text-xs font-mono text-muted-foreground">NAVIGATE</span>
        <h4 className="text-sm font-medium text-foreground">View Analytics</h4>
      </Link>
    </HaloSurface>
  );
}`;

  const compositionCode = `// Higher-level components compose HaloSurface as their foundational material body
import { HaloSurface } from "@/components/ui/halo-surface";

export function CustomDialog({ children }: { children: React.ReactNode }) {
  return (
    <HaloSurface
      intensity="rich"
      elevation="overlay"
      className="w-full max-w-lg p-6 rounded-2xl"
    >
      {children}
    </HaloSurface>
  );
}`;

  return (
    <div className="w-full space-y-12 sm:space-y-16 py-4 sm:py-6 lg:py-8">
      {/* 1. Component Identity & Header */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Halo Surface
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-normal">
              The base material container used to construct HaloUI surfaces. Implements the foundational liquid optical substrate with calibrated diffusion, semantic intensity, and non-clipping geometry.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Preview (Section 66) */}
      <section className="space-y-4">
        <SurfacePreviewStage />
      </section>

      {/* 3. Installation (Section 66) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Distribute directly into your project via the shadcn CLI registry pipeline.
          </p>
        </div>

        <InstallCommand registry="halo-surface" />
      </section>

      {/* 4. Usage (Section 66, 67, 68) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Start with minimal configuration. Halo Surface defaults to <code>balanced</code> intensity and <code>base</code> elevation.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Basic usage</h3>
          <CodeBlock
            code={minimalUsageCode}
            language="tsx"
            filename="components/example.tsx"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Intensity usage</h3>
          <CodeBlock
            code={intensityUsageCode}
            language="tsx"
            filename="components/intensity-examples.tsx"
          />
        </div>

        {/* When to use / When not to use (Section 67 & 68) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={CheckmarkCircle01Icon} size={16} className="text-emerald-500" />
              When to use
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>When constructing higher-level HaloUI components (Button, Input, Card, Dialog, Dock).</li>
              <li>When creating floating surfaces, panels, or custom product compositions participating in the shared material system.</li>
              <li>When you need consistent, tokenized environmental diffusion and contact shadows.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={AlertCircleIcon} size={16} className="text-amber-500" />
              When not to use
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Do not wrap around every plain <code>&lt;div&gt;</code> in your layout.</li>
              <li>Do not use for purely structural grid or flex wrappers without material intent.</li>
              <li>Do not use as a replacement for interactive semantic elements (use Button or Link).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Material Intensity (Section 51 & 66) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Material intensity
          </h2>
          <p className="text-sm text-muted-foreground">
            Three calibrated hierarchy levels governing diffusion blur, edge micro-reflections, and environmental transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Subtle */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">subtle</span>
              <span className="text-xs text-muted-foreground font-mono">8px blur</span>
            </div>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="subtle" elevation="base" className="w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Dense UI & Forms</span>
                  <h4 className="text-sm font-semibold text-foreground">System Telemetry</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Restrained diffusion ensures high contrast and zero environmental interference in data-dense workspaces.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for dense interfaces, forms, toolbars, tables, and supporting UI.
            </p>
          </div>

          {/* Balanced */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">balanced</span>
              <span className="text-xs text-muted-foreground font-mono">16px blur (Default)</span>
            </div>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="base" className="w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Standard Panels</span>
                  <h4 className="text-sm font-semibold text-foreground">Physical Substrate</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Clear surface separation with controlled translucency and directional 135° specular light.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The default HaloUI material for standard cards, popovers, and dialogs.
            </p>
          </div>

          {/* Rich */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground font-mono">rich</span>
              <span className="text-xs text-muted-foreground font-mono">28px blur</span>
            </div>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[210px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 sm:p-5 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="rich" elevation="base" className="w-full h-[140px] flex flex-col justify-between p-4 sm:p-5 rounded-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Hero Overlays</span>
                  <h4 className="text-sm font-semibold text-foreground">Floating Optics</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Generous optical diffusion and elevated specular rim reflections for prominent focal elements.
                </p>
              </HaloSurface>
            </HaloBackground>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reserved for floating docks, hero showcases, and prominent focal overlays.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Elevation (Section 52 & 66) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Elevation
          </h2>
          <p className="text-sm text-muted-foreground">
            Coordinates surface tint, edge luminance, and contact shadow anchoring across five discrete physical depths.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {(
            [
              {
                id: "inset",
                title: "Inset",
                desc: "Recessed cavity with inner shadow",
                useCase: "Search cavities, toggle tracks",
              },
              {
                id: "base",
                title: "Base",
                desc: "Ground plane with contact shadow",
                useCase: "Standard cards, list rows",
              },
              {
                id: "raised",
                title: "Raised",
                desc: "Elevated depth with dual edge catch",
                useCase: "Active cards, floating toolbars",
              },
              {
                id: "floating",
                title: "Floating",
                desc: "Ambient shadow & brightened rim",
                useCase: "Menus, popovers, docks",
              },
              {
                id: "overlay",
                title: "Overlay",
                desc: "Deep dimensional projection",
                useCase: "Modal dialogs, command palettes",
              },
            ] as const
          ).map((item) => (
            <div key={item.id} className="flex flex-col justify-between h-full space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-foreground capitalize">{item.title}</span>
                <span className="text-[10px] text-muted-foreground uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
                  {item.id}
                </span>
              </div>
              <HaloBackground
                environment="neutral"
                className="rounded-xl h-[145px] flex items-center justify-center border border-border/40"
                contentClassName="p-3 sm:p-3.5 w-full h-full flex items-center justify-center"
              >
                <HaloSurface
                  elevation={item.id as HaloSurfaceElevation}
                  intensity="balanced"
                  className="w-full h-[88px] flex flex-col justify-center p-3.5 sm:p-4 rounded-xl space-y-1 transition-all text-left"
                >
                  <div className="text-xs font-semibold text-foreground">
                    {item.title}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                    {item.desc}
                  </p>
                </HaloSurface>
              </HaloBackground>
              <p className="text-xs text-muted-foreground leading-snug">{item.useCase}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Background Response (Section 53 & 66) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Background response
          </h2>
          <p className="text-sm text-muted-foreground">
            True liquid glass actively responds to its physical environment while preserving text contrast and readability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Neutral */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Neutral Workspace</span>
            <HaloBackground
              environment="neutral"
              className="rounded-xl h-[160px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="w-full h-[88px] flex flex-col justify-center p-4 space-y-1 rounded-xl">
                <div className="text-xs font-semibold text-foreground">Minimal Workspace</div>
                <div className="text-[11px] text-muted-foreground">Calibrated for editorial typography.</div>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Warm Paper */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Warm Paper</span>
            <HaloBackground
              environment="paper"
              className="rounded-xl h-[160px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="w-full h-[88px] flex flex-col justify-center p-4 space-y-1 rounded-xl">
                <div className="text-xs font-semibold text-foreground">Tactile Cream Canvas</div>
                <div className="text-[11px] text-muted-foreground">Subtle warm refraction rim transmission.</div>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Spectral */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Spectral Prismatic</span>
            <HaloBackground
              environment="spectral"
              className="rounded-xl h-[160px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="w-full h-[88px] flex flex-col justify-center p-4 space-y-1 rounded-xl">
                <div className="text-xs font-semibold text-foreground">Prismatic Refraction</div>
                <div className="text-[11px] text-muted-foreground">Light diffusion filters chromatic gradients.</div>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Image */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Architectural Grid</span>
            <HaloBackground
              environment="image"
              className="rounded-xl h-[160px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="w-full h-[88px] flex flex-col justify-center p-4 space-y-1 rounded-xl">
                <div className="text-xs font-semibold text-foreground">Spatial Geometry</div>
                <div className="text-[11px] text-muted-foreground">Retains clean edge hairline separation.</div>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Dense UI */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Dense Data Stream</span>
            <HaloBackground
              environment="dense"
              className="rounded-xl h-[160px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="w-full h-[88px] flex flex-col justify-center p-4 space-y-1 rounded-xl">
                <div className="text-xs font-semibold text-foreground">Telemetry Readout</div>
                <div className="text-[11px] text-muted-foreground">Text remains 100% legible over code.</div>
              </HaloSurface>
            </HaloBackground>
          </div>

          {/* Dark */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Deep Graphite</span>
            <HaloBackground
              environment="dark"
              className="rounded-xl h-[160px] flex items-center justify-center border border-border/40"
              contentClassName="p-4 w-full h-full flex items-center justify-center"
            >
              <HaloSurface intensity="balanced" elevation="raised" className="w-full h-[88px] flex flex-col justify-center p-4 space-y-1 rounded-xl">
                <div className="text-xs font-semibold text-foreground">Night Mode Depth</div>
                <div className="text-[11px] text-muted-foreground">Luminous edge catch without neon bloat.</div>
              </HaloSurface>
            </HaloBackground>
          </div>
        </div>
      </section>

      {/* 8. Composition (Section 64, 65, 66) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Composition
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Surface provides the stable material foundation. Higher-level components compose layout, semantics, and specialized layers onto it.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Component composition</h3>
          <p className="text-xs text-muted-foreground">
            Notice that padding (<code>p-6</code>) belongs to the consumer component, not to the primitive.
          </p>
          <CodeBlock
            code={compositionCode}
            language="tsx"
            filename="components/custom-dialog.tsx"
          />
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-medium text-foreground">Polymorphic composition with asChild</h3>
          <p className="text-xs text-muted-foreground">
            Merge surface styling directly onto semantic anchors, buttons, or custom elements without invalid wrapping DOM nodes.
          </p>
          <CodeBlock
            code={asChildUsageCode}
            language="tsx"
            filename="components/interactive-link.tsx"
          />
        </div>

        {/* Stacking & Nesting Guidance (Section 65) */}
        <div className="pt-2 space-y-4">
          <h3 className="text-sm font-medium text-foreground">Nesting contract</h3>
          <Callout type="warning" title="Nesting Warning">
            Nested translucent surfaces should be used sparingly because each additional material layer increases optical complexity. When nesting is required, place an <strong>inset</strong> cavity inside a <strong>raised</strong> surface rather than stacking multiple translucent balanced surfaces.
          </Callout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Dense Content Readout
              </span>
              <HaloSurface intensity="subtle" elevation="base" className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                  <span className="font-semibold text-foreground">Execution Pipeline</span>
                  <span className="font-mono text-emerald-500 text-[11px]">ACTIVE</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The optical diffusion engine acts strictly as an environmental buffer. Typography retains standard 16px line heights and uncompromised font rendering across all intensities.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground pt-1">
                  <div>THREAD: main-01</div>
                  <div>CYCLE: 2.4ms</div>
                </div>
              </HaloSurface>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Recommended Nesting Pattern
              </span>
              <HaloSurface intensity="balanced" elevation="raised" className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Filter Hub</h4>
                  <span className="text-xs text-muted-foreground">Raised Surface</span>
                </div>
                {/* Inset Surface Cavity */}
                <HaloSurface elevation="inset" className="p-3 text-xs text-muted-foreground space-y-1 rounded-lg">
                  <div className="font-mono text-[10px] uppercase text-foreground/70">
                    Search Cavity (Inset)
                  </div>
                  <div>Filter telemetry nodes by status or ID...</div>
                </HaloSurface>
                <p className="text-[11px] text-muted-foreground">
                  Notice how the recessed inset surface grounds the control area without compounding blur layers.
                </p>
              </HaloSurface>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Props (Section 57, 58, 71) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Public API surface for the canonical Halo Surface foundation primitive.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />

        <div className="p-4 rounded-xl border border-border bg-muted/20 text-xs text-muted-foreground space-y-1">
          <div className="font-medium text-foreground">Native element props</div>
          <p>
            Halo Surface extends <code>React.ComponentPropsWithoutRef&lt;&quot;div&quot;&gt;</code>. Standard HTML attributes (such as <code>id</code>, <code>style</code>, <code>data-*</code>, and <code>aria-*</code>) pass transparently to the root element.
          </p>
        </div>
      </section>

      {/* 10. Anatomy (Section 64 & 72) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            The minimal physical optical stack comprising the Halo Surface primitive.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 11. Accessibility (Section 65 & 82) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Surface adheres strictly to semantic neutrality and optical accessibility guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={SecurityCheckIcon} size={16} />
              Semantic Neutrality
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Halo Surface does not assign arbitrary ARIA roles (such as <code>role=&quot;region&quot;</code>) or add <code>tabIndex</code> by default. Semantic roles and keyboard focus belong to the higher-level interactive components that compose it.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={CheckmarkCircle01Icon} size={16} />
              Non-Clipping Geometry
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The root container deliberately omits <code>overflow: hidden</code>. This guarantees consumer focus rings (e.g. <code>ring-2 ring-offset-2</code>), absolute badges, and floating tooltips are never clipped by the material boundary.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={Layers01Icon} size={16} />
              Decorative Layer Isolation
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All optical effects use CSS pseudo-elements with <code>pointer-events: none</code>. They are completely invisible to screen readers and never intercept pointer gestures.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <HaloIcon icon={SparklesIcon} size={16} />
              High-Contrast Safety
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Surface boundaries do not depend purely on translucency. A 1px optical edge hairline (<code>--halo-edge</code>) and contact shadow ensure distinct visual boundaries in forced-color and high-contrast environments.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Responsive behavior (Section 66 & 84) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Responsive behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            Halo Surface does not impose fixed responsive widths. Layout belongs to its parent or higher-level component.
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            The container adapts fluidly to mobile, tablet, and desktop viewports without requiring breakpoint-specific props. Use standard Tailwind utility classes (e.g. <code>w-full max-w-md md:max-w-xl</code>) to shape your layout.
          </p>
          <p>
            <strong>Small surfaces</strong> generally benefit from <code>subtle</code> or <code>balanced</code> intensity to avoid oversized blur radii, while <strong>large surfaces</strong> maintain readability by increasing surface tint rather than increasing blur.
          </p>
        </div>
      </section>

      {/* 13. Performance (Section 55, 56, 66) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Performance
          </h2>
          <p className="text-sm text-muted-foreground">
            Engineered for high density and minimal runtime footprint.
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            The base Halo Surface is 100% CSS-driven. It completely avoids <code>requestAnimationFrame</code> loops, pointer tracking listeners, canvas rendering, SVG displacement filters, and WebGL overhead.
          </p>
          <Callout type="note" title="HaloUI Performance Rule">
            <em>Material complexity decreases as interface density increases.</em> A dashboard containing 50+ Halo Surfaces remains completely lightweight and GPU-friendly.
          </Callout>
        </div>
      </section>

      {/* 14. Dependencies (Section 66 & 74) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            Required runtime packages for the Halo Surface primitive.
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

      {/* 15. Installed files (Section 62 & 76) */}
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

      {/* 16. Related foundations (Section 66 & 92) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Related foundations
          </h2>
          <p className="text-sm text-muted-foreground">
            Foundations that compose with or enhance the Halo Surface material body.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RELATED_FOUNDATIONS.map((f) => (
            <div
              key={f.name}
              className="p-4 rounded-xl border border-border bg-muted/15 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">{f.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {f.status}
                  </span>
                </div>
                <div className="text-xs font-mono text-muted-foreground">{f.role}</div>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 17. Changelog (Section 66) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Changelog
          </h2>
          <p className="text-sm text-muted-foreground">
            Version history and release notes for Halo Surface.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground font-mono">2026-09-24</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
            <li>Initial production release of the foundational material primitive.</li>
            <li>Calibrated 3-tier material intensity model: <code>subtle</code>, <code>balanced</code>, <code>rich</code>.</li>
            <li>Calibrated 5-tier elevation depth model: <code>inset</code>, <code>base</code>, <code>raised</code>, <code>floating</code>, <code>overlay</code>.</li>
            <li>Integrated Radix Slot polymorphism via <code>asChild</code>.</li>
            <li>Deliberately non-clipping root geometry preserving focus rings and external popovers.</li>
            <li>Packaged for automated source distribution via <code>/r/halo-surface.json</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
