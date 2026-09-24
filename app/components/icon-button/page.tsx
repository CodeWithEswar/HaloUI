import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { IconButtonPreviewStage } from "./icon-button-preview-stage";
import {
  IconButtonVariantsPreview,
  IconButtonSizesPreview,
  IconButtonGeometriesPreview,
  IconButtonTooltipPreview,
  IconButtonStatesPreview,
  IconButtonKeyboardPreview,
  IconButtonAccessibleNamingPreview,
} from "./icon-button-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Icon Button — Actions",
  description:
    "A compact icon-only action control with mandatory accessible naming, HaloUI material states, and consistent keyboard and touch behavior.",
};

const PROPS_DATA = [
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: true,
    description: "Mandatory accessible name announcing the programmatic purpose of the action to screen readers and assistive devices.",
  },
  {
    name: "variant",
    type: '"ghost" | "default" | "secondary" | "outline" | "destructive"',
    default: '"default"',
    required: false,
    description: "Defines the semantic hierarchy and optical material intensity of the action control.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Controls the calibrated square geometry (sm: 32px, default: 40px, lg: 48px) and internal icon scaling.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Transfers icon button styling and interaction behavior directly onto a composed child (such as Next.js Link) using Radix Slot.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    required: false,
    description: "Native HTML button type. Defaults to 'button' to avoid unintended form submissions in toolbars.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents pointer and keyboard interaction, removes control from tab index, and mutes optical transmission.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional Tailwind CSS classes merged via cn() utility.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Square Control Root",
    selector: "button[data-slot='icon-button']",
    description: "Single native <button> with aspect-ratio 1:1 square geometry, isolate stacking, and tactile press physics.",
  },
  {
    name: "Specular Lens Rim",
    selector: "before:content-['']",
    description: "Directional 135° specular catch pseudo-element casting crisp highlight along the top-left boundary.",
  },
  {
    name: "SVG Icon Child",
    selector: "[&_svg]",
    description: "Pointer-events disabled and shrink-resistant icon container automatically sized to the active geometry scale.",
  },
  {
    name: "Dual-Contrast Focus Ring",
    selector: ".halo-focus-ring:focus-visible",
    description: "Shared Halo Focus Ring projecting high-contrast outer and offset perimeter around the round boundary.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Registry Dependencies",
    items: [],
  },
  {
    title: "npm Dependencies",
    items: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
];

const INSTALLED_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "icon-button.tsx",
            type: "file",
            description: "Main IconButton component, CVA variants, square sizes, and accessible name validation",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "Physical optical tokens, liquid glass reflection engine, and tactile motion timings",
      },
    ],
  },
];

const RELATED_COMPONENTS = [
  {
    name: "Button",
    href: "/components/button",
    role: "Actions",
    description: "The primary textual and icon-supported action control in HaloUI.",
  },
  {
    name: "Halo Focus Ring",
    href: "/components/halo-focus-ring",
    role: "Accessibility",
    description: "Shared double-contrast focus indicator infrastructure utilized by IconButton.",
  },
  {
    name: "Halo Motion Presets",
    href: "/components/halo-motion-presets",
    role: "Kinetic Motion",
    description: "Central motion vocabulary standardizing tactile press, scale, and settle timings.",
  },
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Material Substrate",
    description: "The foundational 10-layer physical liquid glass material that provides surface depth.",
  },
];

export default function IconButtonDocsPage() {
  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Actions
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Icon Button
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A compact icon-only action control with mandatory accessible naming, HaloUI material states, and consistent keyboard and touch behavior.
          </p>
        </div>

        {/* Primary Accessibility Callout */}
        <Callout type="warning" title="Mandatory Accessible Naming">
          <strong>Icon-only controls require an accessible name.</strong> Provide{" "}
          <code className="text-foreground font-mono text-xs">aria-label</code>,{" "}
          <code className="text-foreground font-mono text-xs">aria-labelledby</code>, or another valid naming relationship. A visible SVG icon alone does not identify the action to assistive technology.
        </Callout>
      </div>

      {/* 2. Primary Live Preview Stage */}
      <section className="space-y-4">
        <IconButtonPreviewStage />
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Install Icon Button directly into your project through the shadcn registry CLI.
          </p>
        </div>

        <InstallCommand registry="http://localhost:3000/r/icon-button.json" />
      </section>

      {/* 4. Usage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Import the public IconButton primitive directly from your local components directory. Supply an explicit <code className="text-foreground font-mono text-xs">aria-label</code> attribute on every instance.
          </p>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Settings01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { IconButton } from "@/components/ui/icon-button";

export function IconButtonDemo() {
  return (
    <IconButton aria-label="Open settings">
      <HaloIcon icon={Settings01Icon} size={18} />
    </IconButton>
  );
}`}
        />
      </section>

      {/* 5. Accessible naming */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessible naming
          </h2>
          <p className="text-sm text-muted-foreground">
            An icon visually communicates an action to sighted users. Screen readers, voice navigation engines, and braille displays require a programmatically determinable name.
          </p>
        </div>

        <IconButtonAccessibleNamingPreview />

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-foreground">Formulating Effective Action Labels</h3>
          <p className="text-sm text-muted-foreground">
            Accessible names should describe the concrete action rather than the literal picture. Use concise, verb-first phrasing:
          </p>

          <div className="overflow-hidden rounded-xl border border-border bg-card/40">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5">Context</th>
                  <th className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400">Effective (Recommended)</th>
                  <th className="px-4 py-2.5 text-rose-600 dark:text-rose-400">Ineffective (Avoid)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-[11px]">
                <tr>
                  <td className="px-4 py-2.5 font-sans font-medium text-foreground">Search field</td>
                  <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400">"Search workspace"</td>
                  <td className="px-4 py-2.5 text-rose-600 dark:text-rose-400">"Search", "Magnifying glass", "Button"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-sans font-medium text-foreground">Modal dismissal</td>
                  <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400">"Close dialog"</td>
                  <td className="px-4 py-2.5 text-rose-600 dark:text-rose-400">"Close", "X", "Cancel icon"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-sans font-medium text-foreground">Data table deletion</td>
                  <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400">"Delete invoice #1042"</td>
                  <td className="px-4 py-2.5 text-rose-600 dark:text-rose-400">"Trash", "Delete", "Remove icon"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-sans font-medium text-foreground">Clipboard action</td>
                  <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400">"Copy code snippet"</td>
                  <td className="px-4 py-2.5 text-rose-600 dark:text-rose-400">"Copy", "Duplicate icon", "Click here"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Variants */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Variants
          </h2>
          <p className="text-sm text-muted-foreground">
            Five canonical variants expressing semantic hierarchy. Reuses the physical optical material architecture of Button without decorative fluff.
          </p>
        </div>

        <IconButtonVariantsPreview />

        <div className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>ghost:</strong> Visually quiet at rest; reveals frosted liquid glass upon hover. The default choice for dense toolbars and header bars.</li>
            <li><strong>default:</strong> Signature liquid glass action lens with specular catch and refraction rim for standalone primary actions.</li>
            <li><strong>secondary:</strong> Translucent crystal body with soft optical boundary for elevated secondary actions.</li>
            <li><strong>outline:</strong> Recessed ambient surface with defined hairline perimeter for clean visual containment.</li>
            <li><strong>destructive:</strong> Liquid ruby glass for dangerous or irreversible actions like deletion.</li>
          </ul>
        </div>

        <CodeBlock
          language="tsx"
          code={`<IconButton variant="ghost" aria-label="Settings"><Settings01Icon /></IconButton>
<IconButton variant="default" aria-label="Settings"><Settings01Icon /></IconButton>
<IconButton variant="secondary" aria-label="Settings"><Settings01Icon /></IconButton>
<IconButton variant="outline" aria-label="Settings"><Settings01Icon /></IconButton>
<IconButton variant="destructive" aria-label="Delete item"><Delete02Icon /></IconButton>`}
        />
      </section>

      {/* 7. Sizes */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Sizes
          </h2>
          <p className="text-sm text-muted-foreground">
            Deliberate square geometry scale: <code className="text-foreground font-mono text-xs">sm</code> (32px), <code className="text-foreground font-mono text-xs">default</code> (40px), and <code className="text-foreground font-mono text-xs">lg</code> (48px). Proportional SVG icon scaling is configured automatically.
          </p>
        </div>

        <IconButtonSizesPreview />

        <CodeBlock
          language="tsx"
          code={`<IconButton size="sm" aria-label="Search"><Search01Icon /></IconButton>
<IconButton size="default" aria-label="Search"><Search01Icon /></IconButton>
<IconButton size="lg" aria-label="Search"><Search01Icon /></IconButton>`}
        />
      </section>

      {/* 8. Icon Geometries */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Icon geometries
          </h2>
          <p className="text-sm text-muted-foreground">
            The square container enforces optical centering and balance across diverse SVG glyph shapes including linear, radial, directional, and rectangular geometries.
          </p>
        </div>

        <IconButtonGeometriesPreview />
      </section>

      {/* 9. With Tooltip */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            With Tooltip
          </h2>
          <p className="text-sm text-muted-foreground">
            Tooltips help sighted pointer and keyboard users understand unfamiliar icons, while accessible names provide programmatic identification for assistive technology. They solve distinct problems and should be composed together.
          </p>
        </div>

        <IconButtonTooltipPreview />

        <CodeBlock
          language="tsx"
          code={`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { IconButton } from "@/components/ui/icon-button";
import { Copy01Icon } from "@hugeicons/core-free-icons";

export function TooltipIconButtonDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton variant="ghost" aria-label="Copy markdown content">
          <Copy01Icon />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent side="top">Copy markdown</TooltipContent>
    </Tooltip>
  );
}`}
        />

        <Callout type="note" title="Separation of Concerns">
          Tooltip content does <strong>not</strong> substitute for an explicit <code className="text-foreground font-mono text-xs">aria-label</code>. Always supply the accessible name directly on the <code className="text-foreground font-mono text-xs">&lt;IconButton&gt;</code> element.
        </Callout>
      </section>

      {/* 10. States */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            States
          </h2>
          <p className="text-sm text-muted-foreground">
            Inspection matrix across Rest, Hover, Focus-Visible, Pressed, and Disabled states.
          </p>
        </div>

        <IconButtonStatesPreview />

        <div className="pt-4">
          <IconButtonKeyboardPreview />
        </div>
      </section>

      {/* 11. Composition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Composition
          </h2>
          <p className="text-sm text-muted-foreground">
            Use the <code className="text-foreground font-mono text-xs">asChild</code> prop to transfer IconButton styling and tactile interaction behavior onto navigation links without redundant wrapper nodes.
          </p>
        </div>

        <CodeBlock
          language="tsx"
          code={`import Link from "next/link";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { IconButton } from "@/components/ui/icon-button";

export function SettingsLinkAction() {
  return (
    <IconButton asChild variant="ghost" aria-label="Navigate to user preferences">
      <Link href="/settings">
        <Settings01Icon />
      </Link>
    </IconButton>
  );
}`}
        />
      </section>

      {/* 12. Props */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Explicit IconButton API definition. All standard HTML <code className="text-foreground font-mono text-xs">&lt;button&gt;</code> attributes (such as <code className="text-foreground font-mono text-xs">onClick</code>, <code className="text-foreground font-mono text-xs">id</code>, <code className="text-foreground font-mono text-xs">aria-*</code>) are natively supported.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 13. Anatomy */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            Minimal, zero-overhead DOM architecture. Optical reflections and specular highlights are rendered strictly using pseudo-elements rather than nested DOM wrappers.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 14. Accessibility */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <p className="text-sm text-muted-foreground">
            Engineered to strictly satisfy WCAG 2.1 AA requirements across contrast, keyboard navigation, and assistive technologies.
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Native Semantics:</strong> IconButton renders as a native <code className="text-foreground font-mono text-xs">&lt;button type="button"&gt;</code> by default, preventing unexpected form submissions.
          </p>
          <p>
            <strong>Keyboard Operation:</strong> Focused icon buttons activate natively with both <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> and <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Space</kbd>.
          </p>
          <p>
            <strong>Dual-Contrast Focus Ring:</strong> Employs Halo Focus Ring tokens to project a high-contrast focus perimeter that remains clearly visible over light, dark, and translucent backgrounds without relying on glow effects.
          </p>
          <p>
            <strong>Disabled Semantics:</strong> Native HTML <code className="text-foreground font-mono text-xs">disabled</code> attribute automatically mutes optical transmission, removes the element from tab order, and ignores pointer clicks.
          </p>
          <p>
            <strong>Touch Target Sizing:</strong> <code className="text-foreground font-mono text-xs">default</code> (40px) and <code className="text-foreground font-mono text-xs">lg</code> (48px) provide immediate compliance with mobile touch target guidelines (≥40px / ≥44px).
          </p>
        </div>
      </section>

      {/* 15. Responsive behavior */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Responsive behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            Icon buttons feature a fixed 1:1 aspect ratio with <code className="text-foreground font-mono text-xs">shrink-0</code> to guarantee geometry preservation within flex toolbars, table action rows, and dense headers.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            In dense mobile toolbars, prefer <code className="text-foreground font-mono text-xs">variant="ghost"</code> with adequate spacing (minimum <code className="text-foreground font-mono text-xs">gap-2</code>) to ensure touch targets do not conflict with adjacent controls.
          </p>
        </div>
      </section>

      {/* 16. Motion */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Motion
          </h2>
          <p className="text-sm text-muted-foreground">
            Tactile spring compression standardizing interactive feedback across HaloUI.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Upon activation, the icon button applies a <code className="text-foreground font-mono text-xs">scale(0.96) translateY(1px)</code> compression timed at 120ms with <code className="text-foreground font-mono text-xs">cubic-bezier(0.2, 0.8, 0.3, 1)</code>.
          </p>
          <p>
            <strong>Reduced Motion:</strong> When the user operating system requests reduced motion (<code className="text-foreground font-mono text-xs">prefers-reduced-motion: reduce</code>), transforms and animation durations are automatically disabled while state color transitions remain intact.
          </p>
        </div>
      </section>

      {/* 17. Performance */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Performance
          </h2>
          <p className="text-sm text-muted-foreground">
            Zero per-instance JavaScript runtime overhead.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Icon buttons avoid runtime pointer listeners, RAF loops, or expensive SVG displacement filters. All optical highlights and edges are handled through GPU-accelerated CSS pseudo-elements and box-shadows, ensuring instantaneous rendering even when dozens of icon buttons populate large data tables or toolbars.
          </p>
        </div>
      </section>

      {/* 18. Dependencies */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            External package and registry dependencies required by this component.
          </p>
        </div>

        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>

      {/* 19. Installed files */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installed files
          </h2>
          <p className="text-sm text-muted-foreground">
            Exact file locations written to your repository upon installation.
          </p>
        </div>

        <FileTree items={INSTALLED_FILES} />
      </section>

      {/* 20. Related components */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Related components
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore foundations and adjacent primitives that participate in IconButton's architecture.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_COMPONENTS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group rounded-xl border border-border bg-card/40 p-4 transition-all hover:border-foreground/30 hover:bg-card"
            >
              <div className="text-[11px] font-mono text-muted-foreground uppercase">{item.role}</div>
              <div className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                <span>{item.name}</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 21. Changelog */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Changelog
          </h2>
          <p className="text-sm text-muted-foreground">
            Release progression and version history.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">v1.0.0 — Production Actions 02 Release</span>
            <span className="text-muted-foreground">2026-09-24</span>
          </div>
          <p className="text-muted-foreground font-sans">
            Second production Actions component. Implements square geometry scale (sm, default, lg), canonical variants (ghost, default, secondary, outline, destructive), mandatory accessible naming architecture, Tooltip composition guidance, tactile spring motion, minimal single-node DOM with pseudo-element specular catch, and full shadcn registry distribution.
          </p>
        </div>
      </section>
    </div>
  );
}
