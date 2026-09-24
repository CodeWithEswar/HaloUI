import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  PlayIcon,
  SecurityCheckIcon,
  SparklesIcon,
  ArrowRight01Icon,
  Shield01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { MotionPreviewStage } from "./motion-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Motion Presets — Physical Kinetic Foundation",
  description:
    "Central motion vocabulary standardizing press compression, elevation lift, spring-settle entrance, and graceful reduced-motion fallbacks across HaloUI.",
};

const PROPS_DATA = [
  {
    name: "preset",
    type: '"press" | "lift" | "reveal" | "settle" | "float"',
    default: '"press"',
    required: false,
    description:
      "Physical kinetic preset defining the transition duration, cubic-bezier curve, and transform matrix.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Merges motion classes directly onto the immediate child element using Radix Slot without extra wrapper nodes.",
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

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Optical Body",
    description:
      "The base 10-layer physical material container that receives kinetic elevation and tactile response.",
  },
  {
    name: "Halo Focus Ring",
    href: "/components/halo-focus-ring",
    role: "Accessibility",
    description:
      "High-contrast focus perimeter that remains geometrically stable even during active surface transforms.",
  },
  {
    name: "Halo Glow",
    href: "/components/halo-glow",
    role: "Luminous Depth",
    description:
      "Ambient luminescence coordinating with elevation lift to reinforce perceived visual depth.",
  },
  {
    name: "Halo Refraction Layer",
    href: "/components/halo-refraction-layer",
    role: "Optical Foundation",
    description:
      "Progressive-enhancement environmental refraction operating beneath kinetic surface planes.",
  },
];

export default function HaloMotionPresetsDocsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Halo Motion Presets
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Central motion vocabulary standardizing tactile press, elevation lift, spring entrance,
            and gentle levitation. Engineered with pure GPU-composited CSS transitions and mandatory
            reduced-motion safety.
          </p>
        </div>
      </div>

      {/* 2. Critical Callout */}
      <Callout type="note" title="Motion Invariant">
        <strong>Reduced motion preserves state.</strong> When reduced motion is preferred, HaloUI simplifies
        movement rather than removing information. State changes, focus visibility, selection, and layout clarity
        remain 100% complete.
      </Callout>

      {/* 3. Live Interactive Preview Stage */}
      <section className="space-y-4">
        <MotionPreviewStage />
      </section>

      {/* 4. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Distribute Halo Motion Presets into your workspace via the registry CLI.
          </p>
        </div>

        <InstallCommand registry="http://localhost:3000/r/halo-motion-presets.json" />
      </section>

      {/* 5. Motion Principles */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Motion Principles &amp; Vocabulary
          </h2>
          <p className="text-sm text-muted-foreground">
            Five calibrated kinetic presets governing all dynamic interactions in HaloUI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>1. Press</span>
              <code className="text-[11px] font-mono font-normal text-muted-foreground">120ms · Tactile Curve</code>
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Provides immediate tactile physical feedback on direct manipulation. Compresses the surface by{" "}
              <code>scale(0.98) translateY(1px)</code> and collapses ambient shadow into a compressed contact shadow.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>2. Lift</span>
              <code className="text-[11px] font-mono font-normal text-muted-foreground">180ms · Elevation Ascension</code>
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Signals interactability on hover by ascending <code>translateY(-2px)</code> and expanding elevation shadows.
              Restrained to prevent visual disorientation or layout disruption.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>3. Reveal</span>
              <code className="text-[11px] font-mono font-normal text-muted-foreground">240ms · Spring Entrance</code>
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Orchestrates entrance for popovers, menus, modal sheets, and tooltips using subtle opacity fade and scale expansion{" "}
              (<code>0.97 &rarr; 1.0</code>) without aggressive overshoot.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>4. Settle</span>
              <code className="text-[11px] font-mono font-normal text-muted-foreground">320ms · Dampened Spring</code>
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Stabilizes state and positional transitions using <code>cubic-bezier(0.16, 1, 0.3, 1)</code>, cleanly absorbing
              momentum without cartoonish bouncing.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2 md:col-span-2">
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>5. Float</span>
              <code className="text-[11px] font-mono font-normal text-muted-foreground">3.5s · Ambient Levitation</code>
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Reserved strictly for hero focal elements, floating docks, and showcase glass panels.
              A gentle 6px vertical oscillation simulating atmospheric suspension. Never used for general UI elements.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Usage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Usage &amp; Composition
          </h2>
          <p className="text-sm text-muted-foreground">
            Apply motion via polymorphic components or direct CSS classes.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">1. Component Composition (asChild)</h3>
            <CodeBlock
              language="tsx"
              code={`import { HaloMotion } from "@/components/ui/halo-motion-presets";
import { HaloSurface } from "@/components/ui/halo-surface";

export function InteractiveTile() {
  return (
    <HaloMotion asChild preset="lift">
      <HaloSurface elevation="raised" className="p-6 rounded-2xl cursor-pointer">
        <h4 className="font-semibold">Interactive Card</h4>
        <p className="text-xs text-muted-foreground">Hover to experience elevation lift.</p>
      </HaloSurface>
    </HaloMotion>
  );
}`}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">2. Direct CSS Class Application</h3>
            <CodeBlock
              language="tsx"
              code={`import { haloMotion } from "@/components/ui/halo-motion-presets";

export function CustomButton() {
  return (
    <button className={\`px-4 py-2 rounded-lg bg-primary text-white \${haloMotion.press}\`}>
      Press Feedback
    </button>
  );
}`}
            />
          </div>
        </div>
      </section>

      {/* 7. Timing & Easing Architecture */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Timing &amp; Easing Tokens
          </h2>
          <p className="text-sm text-muted-foreground">
            Standard CSS custom properties driving kinetic physics across all devices.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="py-2.5 px-4 font-semibold text-foreground">Token</th>
                <th className="py-2.5 px-4 font-semibold text-foreground">Value</th>
                <th className="py-2.5 px-4 font-semibold text-foreground">Physics Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-duration-micro</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">120ms</td>
                <td className="py-2.5 px-4 text-muted-foreground">Immediate press &amp; toggle feedback</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-duration-state</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">180ms</td>
                <td className="py-2.5 px-4 text-muted-foreground">Elevation lift, hover transitions, and color shifts</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-duration-reveal</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">240ms</td>
                <td className="py-2.5 px-4 text-muted-foreground">Flyout menus, popovers, and sheets</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-duration-settle</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">320ms</td>
                <td className="py-2.5 px-4 text-muted-foreground">Positional rearrangement and expanding accordions</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-ease-tactile</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">cubic-bezier(0.2, 0.8, 0.3, 1)</td>
                <td className="py-2.5 px-4 text-muted-foreground">High initial velocity with cushioned deceleration</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-primary">--halo-ease-spring</td>
                <td className="py-2.5 px-4 font-mono text-muted-foreground">cubic-bezier(0.16, 1, 0.3, 1)</td>
                <td className="py-2.5 px-4 text-muted-foreground">Organic dampening for dialogs and content entrances</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Props Table */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Configuration attributes for the HaloMotion polymorphic wrapper.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 9. Accessibility & Reduced Motion */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility &amp; Reduced Motion
          </h2>
          <p className="text-sm text-muted-foreground">
            Full compliance with WCAG 2.1 AA Criterion 2.3.3 (Animation from Interactions).
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card space-y-3 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <HaloIcon icon={SecurityCheckIcon} size={16} className="text-emerald-500" />
            <span>Automatic Reduced Motion Guard</span>
          </div>
          <p>
            When a user has requested reduced motion in their OS or browser preferences, HaloUI automatically
            neutralizes all kinetic movement via <code>@media (prefers-reduced-motion: reduce)</code>:
          </p>
          <CodeBlock
            language="css"
            code={`@media (prefers-reduced-motion: reduce) {
  .halo-motion-press,
  .halo-motion-lift,
  .halo-motion-reveal,
  .halo-motion-settle,
  .halo-motion-float {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transform: none !important;
  }
}`}
          />
          <p>
            This guarantees zero vestibulopathic triggers while ensuring all state changes (open, close, focus, active)
            remain instant and clear.
          </p>
        </div>
      </section>

      {/* 10. Dependencies */}
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

      {/* 11. Installed Files */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installed Files
          </h2>
          <p className="text-sm text-muted-foreground">
            Files added to your repository upon installing Halo Motion Presets.
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
                        { name: "halo-motion-presets.tsx", type: "file" },
                      ],
                    },
                  ],
                },
                {
                  name: "ui",
                  type: "folder",
                  children: [
                    { name: "halo-motion-presets.tsx", type: "file" },
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

      {/* 12. Related Foundations */}
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

      {/* 13. Changelog */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Changelog
          </h2>
          <p className="text-sm text-muted-foreground">
            Release history for Halo Motion Presets.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground font-mono">2026-09-24</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
            <li>Initial production release of Halo Motion Presets system vocabulary.</li>
            <li>Five core physical presets: Press, Lift, Reveal, Settle, Float.</li>
            <li>Direct integration with Radix Slot for zero-wrapper composition via <code>asChild</code>.</li>
            <li>Pure GPU compositor transforms eliminating layout thrashing.</li>
            <li>Mandatory WCAG 2.1 AA reduced-motion fallback preserving 100% of interface state.</li>
            <li>Packaged for automated source distribution via <code>/r/halo-motion-presets.json</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
