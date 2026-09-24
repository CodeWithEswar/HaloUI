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
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  HaloNoise,
  type HaloNoiseStrength,
  type HaloNoiseBlendMode,
} from "@/components/haloui/foundations/halo-noise";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { NoisePreviewStage } from "./noise-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Noise — Micro-Texture & Anti-Banding Grain Layer",
  description:
    "Subtle material grain and high-frequency procedural texture used to reduce sterile gradient banding and impart physical tooth to HaloUI liquid glass surfaces.",
};

const PROPS_DATA = [
  {
    name: "strength",
    type: '"subtle" | "balanced" | "strong"',
    default: '"balanced"',
    required: false,
    description:
      "Controls grain density and opacity (subtle: ~2.5%, balanced: ~4%, strong: ~7%).",
  },
  {
    name: "blendMode",
    type: '"overlay" | "soft-light" | "screen" | "multiply"',
    default: '"overlay"',
    required: false,
    description:
      "CSS mix-blend-mode applied to dynamically integrate the grain texture with underlying blurs and tints.",
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
      "Standard Tailwind or custom CSS class string for opacity overrides or custom positioning adjustments.",
  },
];

const ANATOMY_PARTS = [
  {
    name: "Fractal Turbulence Tile",
    selector: "background-image: url('data:image/svg+xml,...')",
    description:
      "Lightweight procedural SVG fractal noise tile repeating seamlessly with zero external asset requests or raster bloat.",
  },
  {
    name: "Optical Composite Blender",
    selector: "mix-blend-overlay / mix-blend-soft-light",
    description:
      "Blends high-frequency luminance noise into translucent glass gradients, dispersing 8-bit color quantization steps.",
  },
  {
    name: "Content Isolation Plane",
    selector: "pointer-events-none absolute inset-0 select-none",
    description:
      "Zero-footprint optical overlay sitting below consumer text while remaining above blurred backdrop and base tint.",
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
            name: "halo-noise.tsx",
            type: "file" as const,
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
      },
    ],
  },
];

const DEPENDENCY_GROUPS = [
  {
    title: "Runtime Dependencies",
    items: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
  },
  {
    title: "Registry Dependencies",
    items: [],
  },
];

export default function HaloNoiseDocsPage() {
  return (
    <div className="space-y-16 pb-24 max-w-5xl">
      {/* 1. Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="text-[11px] font-mono border-stone-500/20 bg-stone-500/5 text-stone-600 dark:text-stone-400"
          >
            Foundations & Material · 04
          </Badge>
          <Badge
            variant="outline"
            className="text-[11px] font-mono border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
          >
            Preview
          </Badge>
          <Badge
            variant="outline"
            className="text-[11px] font-mono border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          >
            WCAG 2.1 AA (Decorative)
          </Badge>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Halo Noise
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Subtle material grain and high-frequency procedural texture used to eliminate digital
          gradient banding and bestow authentic physical tooth upon translucent liquid glass bodies.
        </p>
      </section>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
            <HaloIcon icon={SparklesIcon} size={18} className="text-foreground" />
            Live Preview Stage
          </h2>
          <span className="text-xs text-muted-foreground">
            Interactive backdrop, zoom loupe & strength switcher
          </span>
        </div>
        <NoisePreviewStage />
      </section>

      {/* 3. Quick Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Distribute Halo Noise directly into your repository through the shadcn registry specification.
        </p>

        <InstallCommand registry="halo-noise" />
      </section>

      {/* 4. Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <p className="text-sm text-muted-foreground">
          Halo Noise consists of a procedural SVG micro-texture tile composite combined through hardware-accelerated mix-blend math.
        </p>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 5. When to Use vs When Not to Use */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* When to use */}
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              <HaloIcon icon={CheckmarkCircle01Icon} size={18} />
              When to use Halo Noise
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Broad Translucent Surfaces:</strong> Panels, dialogs, drawers, and modal backdrops spanning more than 300px where 8-bit color banding becomes visually distracting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Deep Dark-Mode Voids:</strong> High dynamic-range dark mode backgrounds where low-luminance steps create stark concentric rings without micro-dither.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Physical Tactility:</strong> Interfaces that emulate frosted glass, optical lenses, or physical studio acrylic materials.
                </span>
              </li>
            </ul>
          </div>

          {/* When NOT to use */}
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium text-sm">
              <HaloIcon icon={AlertCircleIcon} size={18} />
              When NOT to use Halo Noise
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong>Dense Numerical Data:</strong> Data tables, financial charts, and code editors where texture interferes with micro-typography scanability.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong>Tiny Action Elements:</strong> Badges, status pills, or 24px icon chips where grain appears as display dirt rather than material tooth.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong>High-Opacity Flat Cards:</strong> Surfaces with 100% opaque solid background fills that do not exhibit gradient or refraction banding.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Sterile Banding vs Procedural Micro-Dither Comparison */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Banding Mitigation & Optical Science
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Digital monitors render gradients across 256 discrete luminance levels (8 bits per channel). On wide glass surfaces, adjacent luminance steps produce visible hard lines known as <em>quantisation banding</em>. Halo Noise introduces high-frequency procedural dither to seamlessly bridge luminance gaps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Without Noise */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-stone-900/60 text-white space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">Standard Gradient</span>
              <Badge variant="outline" className="text-[10px] border-rose-500/30 text-rose-400">
                Without Halo Noise
              </Badge>
            </div>

            <div className="h-44 rounded-xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-black p-4 flex flex-col justify-end border border-white/5 relative">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white/90">Sterile Synthetic Fill</p>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Stepping artifacts and sterile digital sheen across low-contrast gradients.
                </p>
              </div>
            </div>
          </div>

          {/* Card B: With Halo Noise */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-stone-900/60 text-white space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">Physical Liquid Material</span>
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                With Halo Noise
              </Badge>
            </div>

            <div className="h-44 rounded-xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-black p-4 flex flex-col justify-end border border-white/10 relative overflow-hidden">
              <HaloNoise strength="balanced" />
              <div className="relative z-10 space-y-1">
                <p className="text-xs font-semibold text-white">Continuous Material Grain</p>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Fractal dither breaks quantized luminance borders into organic micro-texture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Code Example & Composition */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Composition in the 10-Layer Optical Stack
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Halo Noise is positioned directly between directional specular light and the optical edge boundary to preserve razor-sharp edge contrast.
        </p>

        <CodeBlock
          language="tsx"
          filename="material-surface.tsx"
          code={`import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloHighlight } from "@/components/ui/halo-highlight";
import { HaloNoise } from "@/components/ui/halo-noise";
import { HaloEdge } from "@/components/ui/halo-edge";

export function PremiumFrostedCard() {
  return (
    <HaloSurface
      elevation="floating"
      intensity="balanced"
      className="relative p-6 rounded-2xl overflow-hidden"
    >
      {/* 1. Virtual Light Sheen */}
      <HaloHighlight kind="broad" strength="balanced" />

      {/* 2. Micro-Texture Grain (Anti-Banding) */}
      <HaloNoise strength="balanced" blendMode="overlay" />

      {/* 3. Refractive Perimeter Edge */}
      <HaloEdge strength="balanced" placement="both" />

      {/* 4. Isolated Consumer Content */}
      <div className="relative z-10">
        <h3 className="font-semibold text-foreground">Tactile Surface Body</h3>
        <p className="text-sm text-muted-foreground">Clean typography over dithered liquid material.</p>
      </div>
    </HaloSurface>
  );
}`}
        />
      </section>

      {/* 8. Accessibility Contract */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
          <HaloIcon icon={SecurityCheckIcon} size={20} className="text-emerald-500" />
          Accessibility & Performance Contract
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-1.5">
            <span className="font-semibold text-xs text-foreground">Zero Contrast Interference</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sub-7% calibrated luminance ensures text contrast meets strict WCAG 2.1 AA 4.5:1 ratios.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-1.5">
            <span className="font-semibold text-xs text-foreground">Pointer Events Invariant</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hardcoded with <code className="font-mono text-[11px]">pointer-events-none</code>, never blocking cursor clicks or selections.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-1.5">
            <span className="font-semibold text-xs text-foreground">Screen Reader Neutral</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enforced with <code className="font-mono text-[11px]">aria-hidden=&quot;true&quot;</code> to prevent accessibility tree pollution.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Props Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 10. Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCY_GROUPS} />
      </section>

      {/* 11. Installed Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={INSTALLED_FILES} />
      </section>

      {/* 12. Next Steps / Related Foundations */}
      <section className="border-t border-black/10 dark:border-white/10 pt-8 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Previous Foundation</span>
          <Link
            href="/components/halo-highlight"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
          >
            ← Halo Highlight
          </Link>
        </div>

        <div className="text-right">
          <span className="text-xs text-muted-foreground">Next Foundation</span>
          <Link
            href="/components/halo-glow"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
          >
            Halo Glow →
          </Link>
        </div>
      </section>
    </div>
  );
}
