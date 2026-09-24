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
  HaloGlow,
  type HaloGlowVariant,
  type HaloGlowStrength,
  type HaloGlowColor,
} from "@/components/haloui/foundations/halo-glow";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { GlowPreviewStage } from "./glow-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Glow — Ambient Luminous Emphasis & Active State Depth",
  description:
    "Ambient luminous layer used selectively for emphasis, active states, and focus-adjacent depth. Radiates outside the host container perimeter without clipping.",
};

const PROPS_DATA = [
  {
    name: "variant",
    type: '"ambient" | "emphasis" | "active"',
    default: '"ambient"',
    required: false,
    description:
      "Diffusion profile and semantic role: soft ambient aura, focused emphasis, or high-energy active state.",
  },
  {
    name: "strength",
    type: '"subtle" | "balanced" | "strong"',
    default: '"balanced"',
    required: false,
    description:
      "Controls the luminance intensity of the emitted light (subtle: 50%, balanced: 100%, strong: 150%).",
  },
  {
    name: "color",
    type: '"neutral" | "primary" | "accent"',
    default: '"neutral"',
    required: false,
    description:
      "Chromatic palette: monochromatic neutral, calibrated primary indigo/violet, or warm amber accent.",
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
      "Standard Tailwind or custom CSS class string for fine-grained blur or expansion overrides.",
  },
];

const ANATOMY_PARTS = [
  {
    name: "Luminous Radiation Envelope",
    selector: "-inset-3 / -inset-4 blur-2xl",
    description:
      "Negative inset expansion projecting diffuse photons beyond host geometric bounds without requiring parent overflow clearance.",
  },
  {
    name: "Chromatic Diffusion Gradient",
    selector: "bg-[radial-gradient(...)]",
    description:
      "Soft-falloff luminance gradient engineered to simulate natural optical scattering through liquid translucent media.",
  },
  {
    name: "Non-Clipping Substrate Plane",
    selector: "pointer-events-none absolute select-none rounded-[inherit]",
    description:
      "Positioned strictly behind the host surface body to ensure zero contrast penalty on interior interactive content.",
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
            name: "halo-glow.tsx",
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

export default function HaloGlowDocsPage() {
  return (
    <div className="space-y-16 pb-24 max-w-5xl">
      {/* 1. Component Identity & Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Halo Glow
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Ambient luminous layer used selectively for active state, emphasis, or focus-adjacent depth.
          Diffuses outside the host container&apos;s perimeter without clipping or compromising text contrast.
        </p>
      </section>

      {/* 2. Interactive Live Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
            <HaloIcon icon={SparklesIcon} size={18} className="text-foreground" />
            Live Preview Stage
          </h2>
          <span className="text-xs text-muted-foreground">
            Interactive backdrop, variant, color, and hover simulation
          </span>
        </div>
        <GlowPreviewStage />
      </section>

      {/* 3. Quick Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Distribute Halo Glow directly into your repository through the shadcn registry specification.
        </p>

        <InstallCommand registry="halo-glow" />
      </section>

      {/* 4. Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <p className="text-sm text-muted-foreground">
          Halo Glow operates outside standard container bounds by projecting negative insets with radial photonic falloff.
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
              When to use Halo Glow
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Active State & Selection:</strong> Highlight active navigation items, selected cards, or toggled controls with responsive radiance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Featured Focal Points:</strong> Elevated pricing tiers, primary CTA surfaces, or hero modals requiring distinct spatial prominence.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Deep Ambient Floating:</strong> Elevating floating docks or dialog backdrops over dense content fields.
                </span>
              </li>
            </ul>
          </div>

          {/* When NOT to use */}
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium text-sm">
              <HaloIcon icon={AlertCircleIcon} size={18} />
              When NOT to use Halo Glow
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong>Not a Default Layer:</strong> Never apply glow universally to every card or surface; indiscriminate glow causes visual fatigue and flattens hierarchy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong>Not a Replacement for Focus Rings:</strong> Keyboard focus MUST use a sharp, high-contrast focus ring. Glow provides secondary ambient depth only.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong>Not a Substitute for Shadows:</strong> Shadows convey light occlusion; glow conveys light emission. Do not substitute one for the other.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Glow vs Shadow vs Focus Ring */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Optical Separation: Glow vs. Shadow vs. Focus
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-2">
            <span className="font-semibold text-xs text-foreground uppercase tracking-wider font-mono">
              1. Ambient Glow
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Light Emission:</strong> Radiates positive photons outward. Conveys luminous energy, active status, and primary focal elevation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-2">
            <span className="font-semibold text-xs text-foreground uppercase tracking-wider font-mono">
              2. Contact Shadow
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Light Occlusion:</strong> Casts downward darkness. Conveys physical altitude, grounding the element onto the underlying canvas.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-2">
            <span className="font-semibold text-xs text-foreground uppercase tracking-wider font-mono">
              3. Focus Ring
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Accessibility Invariant:</strong> Sharp 2px high-contrast perimeter ring with 3:1 contrast ratio against both component and background.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Code Example & Non-Clipping Composition */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Non-Clipping Outer Composition
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because liquid surfaces often have <code className="font-mono text-xs">overflow-hidden</code> to clip interior blur layers, <code className="font-mono text-xs">HaloGlow</code> must sit as a sibling directly behind the surface, or within a non-clipping wrapper.
        </p>

        <CodeBlock
          language="tsx"
          filename="active-card.tsx"
          code={`import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloHighlight } from "@/components/ui/halo-highlight";
import { HaloEdge } from "@/components/ui/halo-edge";
import { HaloGlow } from "@/components/ui/halo-glow";

export function ActiveFeaturedCard({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="relative">
      {/* 1. Luminous Ambient Glow (outside host overflow boundary) */}
      {isSelected && (
        <HaloGlow
          variant="active"
          strength="balanced"
          color="primary"
        />
      )}

      {/* 2. Primary Material Surface */}
      <HaloSurface
        elevation="floating"
        intensity="balanced"
        className="relative p-6 rounded-2xl overflow-hidden"
      >
        <HaloHighlight kind="broad" strength="balanced" />
        <HaloEdge strength="balanced" placement="both" />

        <div className="relative z-10">
          <h3 className="font-semibold text-foreground">Featured Architecture</h3>
          <p className="text-sm text-muted-foreground">Active selection radiating chromatic liquid light.</p>
        </div>
      </HaloSurface>
    </div>
  );
}`}
        />
      </section>

      {/* 8. Accessibility Contract */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
          <HaloIcon icon={SecurityCheckIcon} size={20} className="text-emerald-500" />
          Accessibility & Quality Contract
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-1.5">
            <span className="font-semibold text-xs text-foreground">Focus Visibility Guaranteed</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Halo Glow is positioned beneath focus indicators. Standard WCAG 2.1 AA focus rings remain 100% visible.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-1.5">
            <span className="font-semibold text-xs text-foreground">Reduced Motion Inert</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Static optical radiance without frantic strobing, pulsating, or distracting kinetic transitions.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] space-y-1.5">
            <span className="font-semibold text-xs text-foreground">Screen Reader Opaque</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enforced with <code className="font-mono text-[11px]">aria-hidden=&quot;true&quot;</code> and <code className="font-mono text-[11px]">pointer-events-none</code>.
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

      {/* 12. Related Foundations */}
      <section className="border-t border-black/10 dark:border-white/10 pt-8 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Previous Foundation</span>
          <Link
            href="/components/halo-noise"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
          >
            ← Halo Noise
          </Link>
        </div>

        <div className="text-right">
          <span className="text-xs text-muted-foreground">Next Component</span>
          <Link
            href="/components/button"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
          >
            Halo Button →
          </Link>
        </div>
      </section>
    </div>
  );
}
