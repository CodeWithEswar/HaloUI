import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  Shield01Icon,
  SecurityCheckIcon,
  AlertCircleIcon,
  Layers01Icon,
  CheckmarkCircle02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ButtonPreviewStage } from "./button-preview-stage";
import {
  ButtonVariantsPreview,
  ButtonSizesPreview,
  ButtonIconsPreview,
  ButtonStatesPreview,
  ButtonKeyboardPreview,
} from "./button-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Button — Actions",
  description:
    "A text or icon-supported action control with HaloUI material, semantic variants, accessible interaction states, and consistent keyboard behavior.",
};

const PROPS_DATA = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    default: '"default"',
    required: false,
    description: "Defines the semantic visual hierarchy and optical material profile of the action control.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg" | "icon"',
    default: '"default"',
    required: false,
    description: "Controls component geometry, touch targets, and internal padding.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies button styling and interaction behavior directly onto a composed child (such as Next.js Link) using Radix Slot.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    required: false,
    description: "Native HTML button type attribute. Defaults to 'button' to prevent accidental form submission.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents activation, mutes optical transmission, and disallows pointer/focus interaction via native disabled semantics.",
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
    name: "Root Action Container",
    selector: "button[data-slot='button']",
    description: "Single native semantic <button> or composed Radix Slot element. Enforces isolate stacking and tactile press compression.",
  },
  {
    name: "Specular Rim Catch",
    selector: "before:content-['']",
    description: "Pure CSS pseudo-element projecting a 135° directional specular reflection along the upper optical boundary without extra DOM nodes.",
  },
  {
    name: "Content Composition",
    selector: "inline-flex items-center gap-2",
    description: "Natural flex layout preserving single-line label typography, Hugeicons optical proportions, and SVG alignment.",
  },
  {
    name: "Focus Ring Perimeter",
    selector: ".halo-focus-ring:focus-visible",
    description: "Double-contrast keyboard focus perimeter operating independently outside the optical hairline boundary.",
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
            name: "button.tsx",
            type: "file",
            description: "Main Button component, CVA variants, sizes, and accessible state composition",
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
        description: "Physical optical tokens, focus variables, and tactile motion timings",
      },
    ],
  },
];

const RELATED_COMPONENTS = [
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Material Substrate",
    description: "The foundational 10-layer physical liquid glass material that provides surface depth.",
  },
  {
    name: "Halo Focus Ring",
    href: "/components/halo-focus-ring",
    role: "Accessibility",
    description: "Shared double-contrast focus indicator infrastructure utilized by Button.",
  },
  {
    name: "Halo Motion Presets",
    href: "/components/halo-motion-presets",
    role: "Kinetic Motion",
    description: "Central motion vocabulary standardizing tactile press, scale, and settle timings.",
  },
];

export default function ButtonDocsPage() {
  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Actions
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Button
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A text or icon-supported action control with HaloUI material, semantic variants, accessible interaction states, and consistent keyboard behavior.
          </p>
        </div>
      </div>

      {/* 2. Primary Live Preview Stage */}
      <section className="space-y-4">
        <ButtonPreviewStage />
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Install Button directly into your project through the shadcn registry CLI.
          </p>
        </div>

        <InstallCommand registry="http://localhost:3000/r/button.json" />
      </section>

      {/* 4. Usage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Import the public Button primitive directly from your local components directory.
          </p>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return <Button>Continue</Button>;
}`}
        />
      </section>

      {/* 5. Variants */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Variants
          </h2>
          <p className="text-sm text-muted-foreground">
            Variants express semantic action hierarchy rather than arbitrary decorative styles. Each variant features intentionally balanced Light and Dark theme treatments.
          </p>
        </div>

        <ButtonVariantsPreview />

        <div className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>default:</strong> High-emphasis primary action for primary intents (e.g. Save, Continue, Confirm).</li>
            <li><strong>secondary:</strong> Tactile elevated glass body for secondary tasks in complex workflows.</li>
            <li><strong>outline:</strong> Translucent recessed body with a crisp optical boundary that lifts on hover.</li>
            <li><strong>ghost:</strong> Visually quiet at rest, resolving surface depth upon hover or focus.</li>
            <li><strong>destructive:</strong> Red-tinted semantic action indicating irreversible or dangerous operations.</li>
            <li><strong>link:</strong> Text action styled as an inline link with accessible underline offset.</li>
          </ul>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Button variant="default">Button</Button>
<Button variant="secondary">Button</Button>
<Button variant="outline">Button</Button>
<Button variant="ghost">Button</Button>
<Button variant="destructive">Button</Button>
<Button variant="link">Button</Button>`}
        />
      </section>

      {/* 6. Sizes */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Sizes
          </h2>
          <p className="text-sm text-muted-foreground">
            Proportional 8pt grid sizing with calibrated padding, typography, and touch accessibility.
          </p>
        </div>

        <ButtonSizesPreview />

        <CodeBlock
          language="tsx"
          code={`<Button size="sm">Small button</Button>
<Button size="default">Default button</Button>
<Button size="lg">Large button</Button>
<Button size="icon" aria-label="Action"><SparklesIcon /></Button>`}
        />
      </section>

      {/* 7. With Icons */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            With icons
          </h2>
          <p className="text-sm text-muted-foreground">
            Buttons compose naturally with Hugeicons. Leading and trailing icons automatically inherit proportional sizing and optical alignment.
          </p>
        </div>

        <ButtonIconsPreview />

        <CodeBlock
          language="tsx"
          code={`import { Add01Icon, ArrowRight01Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";

export function ButtonWithIconsDemo() {
  return (
    <div className="flex gap-3">
      {/* Leading icon */}
      <Button>
        <HaloIcon icon={Add01Icon} size={16} />
        New project
      </Button>

      {/* Trailing icon */}
      <Button variant="secondary">
        Continue
        <HaloIcon icon={ArrowRight01Icon} size={16} />
      </Button>

      {/* Outline with icon */}
      <Button variant="outline">
        <HaloIcon icon={Download01Icon} size={16} />
        Export dataset
      </Button>
    </div>
  );
}`}
        />
      </section>

      {/* 8. States */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            States
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive state inspection across Rest, Hover, Focus-Visible, Pressed, and Disabled states.
          </p>
        </div>

        <ButtonStatesPreview />

        <div className="pt-4">
          <ButtonKeyboardPreview />
        </div>
      </section>

      {/* 9. Composition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Composition
          </h2>
          <p className="text-sm text-muted-foreground">
            Use the <code>asChild</code> prop to transfer Button styling and interaction behavior onto child elements like Next.js <code>&lt;Link&gt;</code> without creating redundant DOM wrapper nodes.
          </p>
        </div>

        <CodeBlock
          language="tsx"
          code={`import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavAction() {
  return (
    <Button asChild variant="outline">
      <Link href="/docs/introduction">
        View documentation
      </Link>
    </Button>
  );
}`}
        />

        <Callout type="note" title="Semantic Responsibility">
          When using <code>asChild</code> to render an anchor (<code>&lt;a&gt;</code> or <code>&lt;Link&gt;</code>), the component preserves link navigation semantics. Button styling does not turn a link into a form-submitting native button.
        </Callout>
      </section>

      {/* 10. Props */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Explicit Button API definition. All standard HTML <code>&lt;button&gt;</code> attributes (such as <code>onClick</code>, <code>id</code>, <code>aria-*</code>) are natively supported.
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
            Minimal, zero-overhead DOM architecture. Optical reflections and specular highlights are rendered strictly using pseudo-elements rather than nested DOM wrappers.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 12. Accessibility */}
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
            <strong>Native Semantics:</strong> Button renders as a native <code>&lt;button type="button"&gt;</code> by default. This avoids unintended form submissions when buttons are placed within forms.
          </p>
          <p>
            <strong>Keyboard Operation:</strong> Focused buttons activate natively with both <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> and <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Space</kbd>.
          </p>
          <p>
            <strong>Focus Visibility:</strong> Employs Halo Focus Ring tokens to project a dual-contrast focus perimeter that remains unambiguously distinct from Edge boundaries, hover fills, and dark backgrounds.
          </p>
          <p>
            <strong>Disabled State:</strong> Uses the native HTML <code>disabled</code> attribute. Disabled buttons are automatically removed from tab order and do not respond to pointer or keyboard activations.
          </p>
          <p>
            <strong>Icon Accessibility:</strong> Decorative icons inside buttons with text labels are hidden from screen readers automatically. Icon-only buttons must supply an explicit <code>aria-label</code>.
          </p>
        </div>
      </section>

      {/* 13. Responsive behavior */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Responsive behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            Buttons are intrinsically flexible and scale cleanly inside responsive layout containers.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Button dimensions are driven by internal text metrics and padding rather than fixed pixel widths. To span the full width of mobile containers, supply layout utility classes such as <code>w-full</code> on the button instance rather than hardcoding full-width styles into the component core.
          </p>
          <p>
            Button labels are set with <code>whitespace-nowrap</code> to prevent ungraceful mid-label line breaks during flex wrapping.
          </p>
        </div>
      </section>

      {/* 14. Motion */}
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
            Upon activation, the button applies a <code>scale(0.98) translateY(1px)</code> compression timed at 120ms with <code>cubic-bezier(0.2, 0.8, 0.3, 1)</code>.
          </p>
          <p>
            <strong>Reduced Motion:</strong> When the user operating system requests reduced motion (<code>prefers-reduced-motion: reduce</code>), transforms and animation durations are automatically disabled while state color transitions remain intact.
          </p>
        </div>
      </section>

      {/* 15. Performance */}
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
            Buttons do not attach continuous pointer tracking listeners, RAF loops, or expensive SVG displacement filters. All optical highlights and edges are handled through GPU-accelerated CSS pseudo-elements and box-shadows, ensuring instantaneous rendering even when thousands of buttons populate large data tables or toolbars.
          </p>
        </div>
      </section>

      {/* 16. Dependencies */}
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

      {/* 17. Installed files */}
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

      {/* 18. Related components */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Related components
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore foundations and adjacent primitives that participate in Button's architecture.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
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

      {/* 19. Changelog */}
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
            <span className="font-semibold text-foreground">v1.0.0 — Production Actions Release</span>
            <span className="text-muted-foreground">2026-09-24</span>
          </div>
          <p className="text-muted-foreground font-sans">
            First production Actions component. Implements canonical semantic variants (default, secondary, outline, ghost, destructive, link), 8pt geometry sizes, tactile spring motion, minimal single-node DOM with pseudo-element specular catch, and full shadcn registry distribution.
          </p>
        </div>
      </section>
    </div>
  );
}
