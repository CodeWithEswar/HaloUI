import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  KeyboardIcon,
  Shield01Icon,
  SecurityCheckIcon,
  AlertCircleIcon,
  ArrowRight01Icon,
  Layers01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { FocusRingPreviewStage } from "./focus-ring-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Focus Ring — Shared Accessibility Foundation",
  description:
    "Shared high-contrast focus-visible treatment for HaloUI interactive components. Operates independently outside the optical material boundary to guarantee unambiguous keyboard accessibility.",
};

const PROPS_DATA = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Merges focus styles directly onto the immediate child element using Radix Slot without creating redundant DOM wrapper nodes.",
  },
  {
    name: "offset",
    type: '"none" | "sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description:
      "Spacing between the component optical boundary and the focus indicator (0px, 1px, 2px, 4px).",
  },
  {
    name: "variant",
    type: '"default" | "subtle" | "destructive" | "inset"',
    default: '"default"',
    required: false,
    description:
      "Focus indicator visual profile. 'default' uses high-contrast sapphire/sky; 'destructive' denotes focus on error states; 'inset' places the ring within the component geometry.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Additional Tailwind CSS classes merged via cn() utility.",
  },
];

const ANATOMY_PARTS = [
  {
    name: "Offset Spacer Ring",
    token: "var(--halo-focus-offset-color)",
    description:
      "A 2px optical barrier matched to the underlying canvas or elevated surface, preventing visual collisions with material edges.",
  },
  {
    name: "Primary Focus Stroke",
    token: "var(--halo-focus-color)",
    description:
      "A 2px high-contrast indicator (#0284c7 in light mode, #38bdf8 in dark mode) exceeding WCAG 2.1 AA 3:1 contrast ratios.",
  },
  {
    name: "Ambient Contrast Rim",
    token: "var(--halo-focus-outer-color)",
    description:
      "A 1.5px soft luminous falloff guaranteeing indicator perception across variable wallpaper, image, and mesh backgrounds.",
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Refraction Layer",
    href: "/components/halo-refraction-layer",
    role: "Optical Enhancement",
    description:
      "Environmental distortion layer operating beneath the focus plane without interfering with focus outlines.",
  },
  {
    name: "Halo Edge",
    href: "/components/halo-edge",
    role: "Material Boundary",
    description:
      "The physical hairline rim of liquid glass surfaces, operating independently inside the focus ring offset.",
  },
  {
    name: "Halo Glow",
    href: "/components/halo-glow",
    role: "Luminous Depth",
    description:
      "Luminous ambient emphasis layer. Focus indicators remain independently visible whether glow is active or disabled.",
  },
  {
    name: "Halo Surface",
    href: "/components/surface",
    role: "Optical Body",
    description:
      "The foundational 10-layer physical liquid glass material that hosts interactive components.",
  },
];

export default function HaloFocusRingDocsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Halo Focus Ring
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Shared high-contrast focus-visible treatment for HaloUI interactive components.
            Engineered as critical accessibility infrastructure that operates independently
            outside the optical material boundary.
          </p>
        </div>
      </div>

      {/* 2. Critical Callout */}
      <Callout type="warning" title="Design System Invariant">
        <strong>Material effects are not focus indicators.</strong> Focus must remain independently visible
        across all glass surfaces, themes, and interactive states without merging into Halo Edge or Halo Glow.
      </Callout>

      {/* 3. Live Interactive Preview Stage */}
      <section className="space-y-4">
        <FocusRingPreviewStage />
      </section>

      {/* 4. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Distribute Halo Focus Ring directly into your workspace via the registry CLI.
          </p>
        </div>

        <InstallCommand registry="http://localhost:3000/r/halo-focus-ring.json" />
      </section>

      {/* 5. Usage & API Patterns */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose onto any interactive component using either polymorphic slot composition or direct utility classes.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">1. Component Composition (asChild)</h3>
            <p className="text-xs text-muted-foreground">
              Wrap interactive components with <code>&lt;HaloFocusRing asChild&gt;</code> to cleanly attach focus rings without additional DOM wrapper nodes:
            </p>
            <CodeBlock
              language="tsx"
              code={`import { HaloFocusRing } from "@/components/ui/halo-focus-ring";
import { HaloButton } from "@/components/ui/halo-button";

export function AccessibleAction() {
  return (
    <HaloFocusRing asChild>
      <HaloButton variant="primary">
        Deploy Release
      </HaloButton>
    </HaloFocusRing>
  );
}`}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">2. Direct Utility Class</h3>
            <p className="text-xs text-muted-foreground">
              Apply the <code>haloFocusRingClasses</code> string or <code>.halo-focus-ring</code> utility to custom interactive elements:
            </p>
            <CodeBlock
              language="tsx"
              code={`import { haloFocusRingClasses } from "@/components/ui/halo-focus-ring";

export function CustomInput() {
  return (
    <input
      type="text"
      className={\`px-3 py-2 rounded-lg border bg-background \${haloFocusRingClasses}\`}
      placeholder="Type command..."
    />
  );
}`}
            />
          </div>
        </div>
      </section>

      {/* 6. Focus-Visible Behavior */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Focus-Visible Behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            How Halo Focus Ring preserves visual calm for mouse users while ensuring immediate clarity for keyboard users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <HaloIcon icon={KeyboardIcon} size={16} className="text-primary" />
              <span>Keyboard Navigation (Tab / Shift+Tab)</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When a user navigates via keyboard, modern browsers set the <code>:focus-visible</code> pseudo-class.
              Halo Focus Ring immediately projects the high-contrast dual ring, providing instantaneous orientation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Pointer / Touch Interaction</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When clicking or tapping with mouse, trackpad, or finger, <code>:focus-visible</code> is not activated.
              The component avoids unnecessary visual clutter, letting the liquid glass material and tactile press shine.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Focus and Material Independence */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Focus &amp; Material Independence
          </h2>
          <p className="text-sm text-muted-foreground">
            Why focus rings must remain completely decoupled from glass shaders and optical effects.
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Liquid glass design systems introduce complex visual signals: hairline specular reflections (Halo Highlight),
            physical rim catches (Halo Edge), and luminous emphasis fields (Halo Glow).
          </p>
          <p>
            If a focus ring were implemented simply as a brighter edge or an ambient glow, low-vision keyboard users
            would struggle to distinguish whether a component was simply hovered, highlighted, or actively holding focus.
          </p>
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
            <div className="font-semibold text-foreground">The 3 Boundary Invariants:</div>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Halo Edge</strong> is the physical material perimeter (inside the bounding box).</li>
              <li><strong>Halo Glow</strong> is non-directional luminous depth radiating outward for emphasis.</li>
              <li><strong>Halo Focus Ring</strong> is an independent geometric barrier offset 2px outside the component boundary.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Focus and Invalid State */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Focus &amp; Invalid Form States
          </h2>
          <p className="text-sm text-muted-foreground">
            Maintaining focus indicator clarity when inputs display validation errors.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card space-y-3 text-xs leading-relaxed text-muted-foreground">
          <p>
            When a form control enters an <code>aria-invalid=&quot;true&quot;</code> state, its border transitions to a destructive red hue.
            With Halo Focus Ring, keyboard focus does NOT disappear into the error styling.
          </p>
          <p>
            By supporting <code>variant=&quot;destructive&quot;</code>, the focus ring projects a high-contrast dual ring (2px offset + 2px rose ring)
            that unmistakably indicates both <em>active keyboard focus</em> and <em>validation error state</em> simultaneously.
          </p>
        </div>
      </section>

      {/* 9. Semantic Tokens */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Semantic Tokens
          </h2>
          <p className="text-sm text-muted-foreground">
            Standard CSS custom properties powering Halo Focus Ring across themes.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="py-2.5 px-4 font-semibold text-foreground">Token</th>
                <th className="py-2.5 px-4 font-semibold text-foreground">Light Mode</th>
                <th className="py-2.5 px-4 font-semibold text-foreground">Dark Mode</th>
                <th className="py-2.5 px-4 font-semibold text-foreground">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-focus-color</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">#0284c7</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">#38bdf8</td>
                <td className="py-2.5 px-4 text-muted-foreground">Primary high-contrast indicator stroke (&ge; 3:1 contrast)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-focus-offset</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">2px</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">2px</td>
                <td className="py-2.5 px-4 text-muted-foreground">Separation distance from component edge</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-focus-width</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">2px</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">2px</td>
                <td className="py-2.5 px-4 text-muted-foreground">Stroke thickness of the focus perimeter</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-focus-offset-color</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">#ffffff</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">#0c0d0f</td>
                <td className="py-2.5 px-4 text-muted-foreground">Inner barrier color preventing collision with borders</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-focus-shadow</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">0 0 0 2px ...</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">0 0 0 2px ...</td>
                <td className="py-2.5 px-4 text-muted-foreground">Composite multi-layer shadow generating the dual-contrast ring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 10. Props Table */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Configurable properties for the HaloFocusRing primitive.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 11. Anatomy */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            Constituent layers forming the dual-contrast focus perimeter.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 12. Accessibility & High Contrast Mode */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility &amp; High Contrast Mode
          </h2>
          <p className="text-sm text-muted-foreground">
            WCAG 2.1 AA specifications and Windows High Contrast support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <HaloIcon icon={SecurityCheckIcon} size={16} className="text-emerald-500" />
              <span>WCAG 2.1 AA Conformance</span>
            </div>
            <ul className="space-y-1.5 text-muted-foreground list-disc list-inside">
              <li><strong>Criterion 2.4.7 (Focus Visible):</strong> Keyboard focus is unmistakably visible on every interactive control.</li>
              <li><strong>Criterion 2.4.11 (Focus Appearance):</strong> Contrast ratio exceeds 3:1 against adjacent colors; area is at least 2px thick.</li>
              <li><strong>Criterion 1.4.11 (Non-text Contrast):</strong> Visual boundary is distinct regardless of background brightness.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <HaloIcon icon={Shield01Icon} size={16} className="text-primary" />
              <span>Forced Colors (High Contrast)</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When Windows High Contrast Mode is active, Halo Focus Ring automatically switches via <code>@media (forced-colors: active)</code> to:
            </p>
            <CodeBlock
              language="css"
              code={`@media (forced-colors: active) {
  .halo-focus-ring:focus-visible {
    outline: 2px solid Highlight !important;
    outline-offset: 2px !important;
    box-shadow: none !important;
  }
}`}
            />
          </div>
        </div>
      </section>

      {/* 13. Dependencies */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            Package requirements and peer dependencies.
          </p>
        </div>

        <DependencyList
          groups={[
            {
              title: "Core Dependencies",
              items: [
                "@radix-ui/react-slot",
                "class-variance-authority",
                "clsx",
                "tailwind-merge",
              ],
            },
          ]}
        />
      </section>

      {/* 14. Installed Files */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installed Files
          </h2>
          <p className="text-sm text-muted-foreground">
            Files placed in your repository upon adding Halo Focus Ring.
          </p>
        </div>

        <FileTree
          items={[
            {
              name: "components",
              type: "folder",
              children: [
                {
                  name: "haloui",
                  type: "folder",
                  children: [
                    {
                      name: "foundations",
                      type: "folder",
                      children: [
                        { name: "halo-focus-ring.tsx", type: "file" },
                      ],
                    },
                  ],
                },
                {
                  name: "ui",
                  type: "folder",
                  children: [
                    { name: "halo-focus-ring.tsx", type: "file" },
                  ],
                },
              ],
            },
            {
              name: "styles",
              type: "folder",
              children: [
                { name: "halo-tokens.css", type: "file" },
              ],
            },
          ]}
        />
      </section>

      {/* 15. Related Foundations */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Related Foundations
          </h2>
          <p className="text-sm text-muted-foreground">
            Complementary HaloUI optical and physical material primitives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RELATED_FOUNDATIONS.map((foundation) => (
            <Link
              key={foundation.name}
              href={foundation.href}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-muted/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {foundation.name}
                  <HaloIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Changelog
          </h2>
          <p className="text-sm text-muted-foreground">
            Release history for Halo Focus Ring.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground font-mono">2026-09-24</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
            <li>Initial production release of Halo Focus Ring shared accessibility infrastructure.</li>
            <li>Double-contrast offset + perimeter ring architecture guaranteeing visibility across unpredictable translucent glass.</li>
            <li>Strict independence from Halo Edge, Halo Highlight, and Halo Glow.</li>
            <li>Direct integration with Radix Slot for zero-wrapper composition via <code>asChild</code>.</li>
            <li>Windows High Contrast Mode support using <code>@media (forced-colors: active)</code> and system <code>Highlight</code> token.</li>
            <li>Packaged for automated source distribution via <code>/r/halo-focus-ring.json</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
