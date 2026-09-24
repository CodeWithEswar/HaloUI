import * as React from "react";
import type { Metadata } from "next";

import { FloatingActionButtonPreviewStage } from "./floating-action-button-preview-stage";
import {
  FloatingActionButtonBackgroundResponsePreview,
  FloatingActionButtonSizesPreview,
  FloatingActionButtonExtendedPreview,
  FloatingActionButtonPlacementPreview,
  FloatingActionButtonStatesPreview,
  FloatingActionButtonKeyboardPreview,
} from "./floating-action-button-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Floating Action Button — Actions",
  description:
    "A prominent floating control for exposing a high-priority contextual action above surrounding content.",
};

const PROPS_DATA = [
  {
    name: "variant",
    type: '"default" | "secondary"',
    default: '"default"',
    required: false,
    description:
      "Semantic visual hierarchy. 'default' renders high-contrast liquid optical glass; 'secondary' provides a softer frosted crystal boundary.",
  },
  {
    name: "size",
    type: '"default" | "lg"',
    default: '"default"',
    required: false,
    description:
      "Physical dimensions. 'default' provides a 56px touch target (24px icon); 'lg' provides a 64px touch target (28px icon).",
  },
  {
    name: "extended",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Switches geometry from circular icon-only to a capsule shape supporting both an icon and a visible text label.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Delegates rendering to a Radix Slot child element for semantic composition (e.g. Next.js Link or anchor tags).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Prevents user interaction while preserving spatial presence and reducing opacity cleanly.",
  },
];

const NATIVE_PROPS_DATA = [
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Mandatory accessible name for icon-only usage. Describes the intended user action rather than the icon glyph.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    required: false,
    description:
      "Standard HTML button type. Defaults safely to 'button' to avoid accidental form submissions.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Additional Tailwind CSS classes merged onto the root button element (commonly used for absolute/fixed container offsets).",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Root Action",
    selector: "button[data-slot='floating-action-button']",
    description:
      "Semantic HTML button container with tactile physics, double-contrast focus ring, and layout-neutral geometry.",
  },
  {
    name: "Liquid Glass Substrate",
    selector: ".halo-liquid-glass",
    description:
      "10-layer physical liquid optical material providing backdrop diffusion, specular highlights, and ambient light transmission.",
  },
  {
    name: "Optical Perimeter Edge",
    selector: ".halo-liquid-glass::before",
    description:
      "45° diagonal specular reflection rim accentuating depth against diverse backgrounds.",
  },
  {
    name: "Floating Spatial Elevation",
    selector: ".shadow-[0_12px_36px_-6px_...]",
    description:
      "Multi-layered ambient and contact shadow system that lifts the control off the substrate without continuous animation.",
  },
  {
    name: "Action Content",
    selector: "svg, span",
    description:
      "Icon and optional visible text label structured in an accessible flex layout with locked dimensions.",
  },
  {
    name: "Double-Contrast Focus Ring",
    selector: ".halo-focus-ring:focus-visible",
    description:
      "Unclipped z-20 accessibility ring providing high contrast over both dark and bright substrates.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Core Framework Primitives",
    items: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    title: "Icon System",
    items: ["@hugeicons/react", "@hugeicons/core-free-icons"],
  },
  {
    title: "HaloUI Foundation Tokens",
    items: [
      "halo-liquid-glass",
      "halo-focus-ring",
      "halo-tactile-press",
      "--halo-focus-color",
      "--halo-focus-offset",
    ],
  },
];

const INSTALLED_FILES_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "floating-action-button.tsx",
            type: "file",
            description:
              "Core FloatingActionButton component, CVA variants, and layout-neutral action architecture.",
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
        description:
          "10-layer liquid optical physics, floating elevation tokens, and halo-focus-ring.",
      },
    ],
  },
];

export default function FloatingActionButtonPage() {
  return (
    <div className="space-y-12">
      {/* Title + Subtitle Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary">
            Actions 07
          </span>
          <span className="text-xs font-mono text-muted-foreground">Preview</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Floating Action Button
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          A prominent floating control for exposing a high-priority contextual action above surrounding content.
        </p>
      </div>

      {/* Important Callout 1: Intent & Priority */}
      <Callout type="important" title="High-Priority Contextual Action">
        <p className="text-xs leading-relaxed">
          <strong>A Floating Action Button represents a high-priority contextual action.</strong> Use it deliberately. It should not compete with several equally prominent actions or obscure important content. Unlike ordinary buttons, it commands primary spatial focus.
        </p>
      </Callout>

      {/* Live Interactive Preview Stage */}
      <FloatingActionButtonPreviewStage />

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="http://localhost:3000/r/floating-action-button.json" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Import <code className="text-foreground font-mono text-xs">FloatingActionButton</code> and compose with an action icon. Ensure an accessible name is provided via <code className="text-foreground font-mono text-xs">aria-label</code> when using icon-only mode.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function FloatingActionButtonDemo() {
  return (
    <FloatingActionButton aria-label="Create item">
      <HaloIcon icon={Add01Icon} size={20} />
    </FloatingActionButton>
  );
}`}
        />
      </div>

      {/* When to Use vs When Not to Use */}
      <div className="space-y-4">
        <h2 id="when-to-use" className="text-xl font-semibold tracking-tight text-foreground">
          When to use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Appropriate Use Cases
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>One contextual action has unusually high importance across the screen.</li>
              <li>The action benefits from persistent discoverability while scrolling.</li>
              <li>Creation or compose triggers (e.g. New email, Add task, Create document).</li>
              <li>Dedicated map, canvas, or dashboard viewport shortcuts.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              When NOT to Use
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>Multiple actions have equal priority (use Button Group or Header actions).</li>
              <li>The action is destructive (Delete, Remove) or rarely triggered.</li>
              <li>The page layout already accommodates a clear primary Button.</li>
              <li>The floating control occludes critical reading content or forms.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Placement Architecture & Container Ownership */}
      <div className="space-y-4">
        <h2 id="placement" className="text-xl font-semibold tracking-tight text-foreground">
          Placement & container ownership
        </h2>
        <Callout type="important" title="Placement Belongs to the Surrounding Layout">
          <p className="text-xs leading-relaxed">
            <strong>Floating Action Button does not position itself.</strong> Place it through the surrounding layout so the same component can work correctly inside app shells, panels, maps, mobile interfaces, and nested contexts. Do not assume <code className="font-mono text-[11px]">position: fixed</code>.
          </p>
        </Callout>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By keeping the FAB layout-neutral, you can position it using standard utility classes (such as <code className="text-foreground font-mono text-xs">absolute bottom-6 right-6</code>) inside a <code className="text-foreground font-mono text-xs">relative</code> parent container.
        </p>
        <FloatingActionButtonPlacementPreview />
      </div>

      {/* Background Response Centerpiece */}
      <div className="space-y-4">
        <h2 id="background-response" className="text-xl font-semibold tracking-tight text-foreground">
          Background response & optical elevation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because a Floating Action Button floats above heterogeneous and unpredictable content, its 10-layer physical liquid optical engine is tuned to preserve distinct spatial separation across all lighting contexts without relying on excessive blur or artificial neon auras.
        </p>
        <FloatingActionButtonBackgroundResponsePreview />
      </div>

      {/* Canonical Icon-only Form */}
      <div className="space-y-4">
        <h2 id="icon-only" className="text-xl font-semibold tracking-tight text-foreground">
          Icon-only form & accessible naming
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical FAB is circular and icon-led. Because icons communicate purely visual shape rather than programmatic intent, an accessible name is <strong>mandatory</strong>. Supply an <code className="text-foreground font-mono text-xs">aria-label</code> naming the action (e.g. <em>"Create milestone"</em> rather than <em>"Plus"</em>).
        </p>
        <CodeBlock
          language="tsx"
          code={`{/* Good: names the action */}
<FloatingActionButton aria-label="Create new milestone">
  <HaloIcon icon={Add01Icon} size={20} />
</FloatingActionButton>

{/* Inadequate: describes the icon glyph */}
<FloatingActionButton aria-label="Plus icon">
  <HaloIcon icon={Add01Icon} size={20} />
</FloatingActionButton>`}
        />
      </div>

      {/* Extended FAB */}
      <div className="space-y-4">
        <h2 id="extended" className="text-xl font-semibold tracking-tight text-foreground">
          Extended Floating Action Button
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Extended FAB broadens the touch surface into a balanced capsule containing both an icon and a visible text label. Activate this with the <code className="text-foreground font-mono text-xs">extended</code> prop. Children are naturally composed using standard flex layout.
        </p>
        <FloatingActionButtonExtendedPreview />
        <CodeBlock
          language="tsx"
          code={`<FloatingActionButton extended aria-label="Create new milestone">
  <HaloIcon icon={Add01Icon} size={20} />
  <span>New milestone</span>
</FloatingActionButton>`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="text-xl font-semibold tracking-tight text-foreground">
          Sizes & touch targets
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI provides two deliberate dimensions calibrated to exceed standard touch accessibility guidelines (minimum 48px).
        </p>
        <FloatingActionButtonSizesPreview />
      </div>

      {/* Interaction States */}
      <div className="space-y-4">
        <h2 id="states" className="text-xl font-semibold tracking-tight text-foreground">
          Interaction states
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All interaction states operate independently: hover refines elevation without exaggerated vertical jumps, active presses compress by 4% with immediate tactile settling, and focus-visible projects an independent double-contrast perimeter.
        </p>
        <FloatingActionButtonStatesPreview />
      </div>

      {/* Keyboard Behavior */}
      <div className="space-y-4">
        <h2 id="keyboard" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard navigation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Built on a native <code className="text-foreground font-mono text-xs">&lt;button&gt;</code> element, the FAB participates natively in keyboard tab order. Pressing <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Space</kbd> activates the control.
        </p>
        <FloatingActionButtonKeyboardPreview />
      </div>

      {/* Props Reference */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
            FloatingActionButton Props
          </h2>
          <PropsTable rows={PROPS_DATA} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            Inherited Native Attributes
          </h3>
          <PropsTable rows={NATIVE_PROPS_DATA} />
        </div>
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <div className="rounded-xl border border-border/50 bg-muted/20 p-5 space-y-3 text-sm leading-relaxed">
          <p className="text-foreground font-medium">WCAG 2.1 AA Compliance Highlights:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-xs">
            <li>
              <strong>Native Button Semantics:</strong> Implemented as a genuine HTML button, preventing custom keyboard bugs and screen reader confusion.
            </li>
            <li>
              <strong>Mandatory Accessible Naming:</strong> Icon-only configurations trigger development-mode warnings if missing <code className="font-mono text-[11px]">aria-label</code> or <code className="font-mono text-[11px]">aria-labelledby</code>.
            </li>
            <li>
              <strong>Generous Touch Target:</strong> Physical geometry of 56px (default) and 64px (lg) well surpasses the 44px/48px criterion for handheld touch targets.
            </li>
            <li>
              <strong>High-Contrast Focus Ring:</strong> Uses HaloUI's independent double-contrast perimeter at <code className="font-mono text-[11px]">z-20</code>, guaranteeing focus visibility over elevated drop shadows and photographic imagery.
            </li>
            <li>
              <strong>No Perpetual Animation:</strong> Floating describes spatial depth, not continuous bobbing. Respects <code className="font-mono text-[11px]">prefers-reduced-motion</code> by disabling translation and scaling.
            </li>
          </ul>
        </div>
      </div>

      {/* Safe Area & Mobile Guidance */}
      <div className="space-y-4">
        <h2 id="safe-areas" className="text-xl font-semibold tracking-tight text-foreground">
          Safe areas & mobile positioning
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When positioning a Floating Action Button near the bottom-inline-end of mobile viewports, wrap the placement offset in CSS safe area environment variables to avoid overlapping home indicators or browser bars:
        </p>
        <CodeBlock
          language="css"
          code={`.my-fab-wrapper {
  position: absolute;
  inset-inline-end: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  z-index: 20;
}`}
        />
      </div>

      {/* Motion */}
      <div className="space-y-4">
        <h2 id="motion" className="text-xl font-semibold tracking-tight text-foreground">
          Motion architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI strictly prohibits continuous, bobbing, or floating animations for Floating Action Buttons. The control is spatially elevated at rest. Motion is exclusively interactive:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/70 p-4 space-y-1 bg-muted/20">
            <span className="text-xs font-semibold text-foreground">Hover Elevation Lift</span>
            <p className="text-xs text-muted-foreground">
              Smooth 0.5px vertical lift with shadow bloom using <code className="font-mono text-[10px]">cubic-bezier(0.2, 0.8, 0.2, 1)</code>.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 p-4 space-y-1 bg-muted/20">
            <span className="text-xs font-semibold text-foreground">Tactile Compression</span>
            <p className="text-xs text-muted-foreground">
              Instant 4% compression (<code className="font-mono text-[10px]">scale-96</code>) on active press with shadow flattening.
            </p>
          </div>
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 id="dependencies" className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </div>

      {/* Installed Files */}
      <div className="space-y-4">
        <h2 id="installed-files" className="text-xl font-semibold tracking-tight text-foreground">
          Installed files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>
    </div>
  );
}

