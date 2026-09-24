import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { TogglePreviewStage } from "./toggle-preview-stage";
import {
  ToggleStateMatrixPreview,
  ToggleVariantsPreview,
  ToggleSizesPreview,
  ToggleContentPreview,
  ToggleControlledPreview,
  ToggleKeyboardPreview,
} from "./toggle-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Toggle — Actions",
  description:
    "A two-state action control that communicates and changes a persistent pressed or unpressed state.",
};

const PROPS_DATA = [
  {
    name: "pressed",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled pressed state. When provided, component behaves as a controlled input.",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    default: "false",
    required: false,
    description: "Initial pressed state for uncontrolled usage.",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean, eventDetails?: any) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when the pressed state changes.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    required: false,
    description: "Semantic visual material family. 'default' uses HaloUI 10-layer physical liquid glass.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Calibrated action dimensions (sm: 32px, default: 40px, lg: 48px).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents interaction while strictly preserving the current pressed or unpressed state.",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description: "Mandatory accessible name for icon-only toggles (e.g. aria-label='Pin document'). Warns in development if omitted.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Toggle Root",
    selector: "button[data-slot='toggle']",
    description: "Native HTML button element equipped with Base UI state primitives and aria-pressed attributes.",
  },
  {
    name: "Liquid Glass Substrate",
    selector: ".halo-liquid-glass",
    description: "10-layer physical liquid optical material providing translucent depth, specular boundary, and directional highlight.",
  },
  {
    name: "Persistent Pressed State",
    selector: "button[aria-pressed='true'] / [data-pressed]",
    description: "Condensed surface tint, inset displacement shadow, and enhanced boundary indicating durable active state.",
  },
  {
    name: "Focus Ring Perimeter",
    selector: ".halo-focus-ring:focus-visible",
    description: "Dual-contrast keyboard perimeter operating at z-20 outside the physical glass boundary without clipping.",
  },
  {
    name: "Action Content",
    selector: "span / svg",
    description: "Text label, icon, or composite payload with automatic size and optical stroke width alignment.",
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
      "@base-ui/react",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
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
            name: "toggle.tsx",
            type: "file",
            description: "Toggle component implementation, variants, and accessible state primitive.",
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
        description: "Optical tokens including halo-liquid-glass, halo-focus-ring, and halo-tactile-press.",
      },
    ],
  },
];

export default function TogglePage() {
  return (
    <div className="space-y-12">
      {/* Title + Subtitle Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Toggle
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          A two-state action control that communicates and changes a persistent pressed or unpressed state.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <TogglePreviewStage />

      {/* Important Callout */}
      <Callout type="important" title="Toggle represents persistent pressed state">
        Use <strong>Button</strong> for immediate one-time actions, <strong>Switch</strong> for on/off application settings, and <strong>Checkbox</strong> for form selection. Toggle is an action control that remains pressed or unpressed after activation.
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="http://localhost:3000/r/toggle.json" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Import and render the <code className="text-foreground font-mono text-xs">Toggle</code> component. Can contain text, icons, or a combination of both.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle italic formatting">
      Italic
    </Toggle>
  );
}`}
        />
      </div>

      {/* Pressed State & Semantics */}
      <div className="space-y-4">
        <h2 id="pressed-state" className="text-xl font-semibold tracking-tight text-foreground">
          Pressed state & semantics
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle programmatically exposes its state via <code className="text-foreground font-mono text-xs">aria-pressed="true"</code> (when active) and <code className="text-foreground font-mono text-xs">aria-pressed="false"</code> (when inactive). This ensures assistive technologies announce the persistent state accurately.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-medium text-foreground">Unpressed State</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Frosted translucent body with rest hairline boundary. Communicates potential for activation without visual dominance.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-medium text-foreground">Pressed State</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Optical inset displacement shadow, condensed surface tint, and high-contrast typography. Does not rely on subtle opacity shifts or neon glows.
            </p>
          </div>
        </div>
      </div>

      {/* Controlled */}
      <div className="space-y-4">
        <h2 id="controlled" className="text-xl font-semibold tracking-tight text-foreground">
          Controlled
        </h2>
        <p className="text-sm text-muted-foreground">
          Pass <code className="text-foreground font-mono text-xs">pressed</code> and <code className="text-foreground font-mono text-xs">onPressedChange</code> to bind Toggle to external state.
        </p>
        <ToggleControlledPreview />
        <CodeBlock
          language="tsx"
          code={`const [muted, setMuted] = React.useState(false);

<Toggle
  pressed={muted}
  onPressedChange={setMuted}
  aria-label={muted ? "Unmute audio" : "Mute audio"}
>
  <HaloIcon icon={muted ? VolumeMute01Icon : VolumeHighIcon} size={16} />
  <span>{muted ? "Muted" : "Mute audio"}</span>
</Toggle>`}
        />
      </div>

      {/* Uncontrolled */}
      <div className="space-y-4">
        <h2 id="uncontrolled" className="text-xl font-semibold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="text-foreground font-mono text-xs">defaultPressed</code> for self-managed uncontrolled state.
        </p>
        <CodeBlock
          language="tsx"
          code={`<Toggle defaultPressed={true}>
  Pinned
</Toggle>`}
        />
      </div>

      {/* State Matrix */}
      <div className="space-y-4">
        <h2 id="states" className="text-xl font-semibold tracking-tight text-foreground">
          State matrix
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI strictly isolates the four core state dimensions: persistent state (Unpressed vs Pressed), interaction (Rest vs Hover vs Active), keyboard location (Focused), and availability (Enabled vs Disabled).
        </p>
        <ToggleStateMatrixPreview />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="text-xl font-semibold tracking-tight text-foreground">
          Variants
        </h2>
        <p className="text-sm text-muted-foreground">
          Available in <code className="text-foreground font-mono text-xs">default</code> (authentic 10-layer liquid glass) and <code className="text-foreground font-mono text-xs">outline</code>.
        </p>
        <ToggleVariantsPreview />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="text-xl font-semibold tracking-tight text-foreground">
          Sizes
        </h2>
        <p className="text-sm text-muted-foreground">
          Three size tiers coordinate height, padding, and minimum square hit targets:
        </p>
        <ToggleSizesPreview />
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h2 id="with-icons" className="text-xl font-semibold tracking-tight text-foreground">
          With icons
        </h2>
        <p className="text-sm text-muted-foreground">
          Toggle supports text-only, icon-only, and icon + text compositions:
        </p>
        <ToggleContentPreview />
      </div>

      {/* Keyboard Behavior */}
      <div className="space-y-4">
        <h2 id="keyboard-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard behavior
        </h2>
        <p className="text-sm text-muted-foreground">
          Participates in standard tab order. Space and Enter keys trigger state changes with full focus-visible ring visibility:
        </p>
        <ToggleKeyboardPreview />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={PROPS_DATA} />
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
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Toggle satisfies WCAG 2.1 AA requirements across all interactive criteria:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>State Exposure:</strong> Uses native button-style <code className="text-foreground font-mono text-xs">aria-pressed="true|false"</code> to communicate persistent activation to screen readers.
            </li>
            <li>
              <strong>Non-Color Differentiation:</strong> Pressed state employs optical inset displacement shadow and border definition in addition to surface tint, ensuring legibility under grayscale or high-contrast modes.
            </li>
            <li>
              <strong>Unclipped Focus Ring:</strong> Halo Focus Ring floats at <code className="text-foreground font-mono text-xs">z-20</code> outside the physical boundary, allowing Pressed and Focused states to coexist without conflict.
            </li>
            <li>
              <strong>Preserved Disabled State:</strong> When disabled, Toggle mutes optical transmission (<code className="text-foreground font-mono text-xs">disabled:opacity-40</code>) while retaining its current pressed or unpressed appearance.
            </li>
            <li>
              <strong>Mandatory Accessible Naming:</strong> Icon-only toggles enforce <code className="text-foreground font-mono text-xs">aria-label</code> or <code className="text-foreground font-mono text-xs">aria-labelledby</code>, logging development warnings if omitted.
            </li>
          </ul>
        </div>
      </div>

      {/* Responsive Behavior */}
      <div className="space-y-4">
        <h2 id="responsive-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Responsive behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle maintains practical touch targets of 32px (<code className="text-foreground font-mono text-xs">sm</code>), 40px (<code className="text-foreground font-mono text-xs">default</code>), and 48px (<code className="text-foreground font-mono text-xs">lg</code>). It flexes naturally with long internationalized labels without arbitrary clipping.
        </p>
      </div>

      {/* Motion */}
      <div className="space-y-4">
        <h2 id="motion" className="text-xl font-semibold tracking-tight text-foreground">
          Motion
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tactile press uses <code className="text-foreground font-mono text-xs">halo-tactile-press</code> for pointer-down feedback. The persistent pressed state transition occurs over a smooth 200ms ease-out curve, simplifying instantly under <code className="text-foreground font-mono text-xs">prefers-reduced-motion: reduce</code> while keeping all optical state distinctions intact.
        </p>
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

      {/* Related Components */}
      <div className="space-y-4">
        <h2 id="related-components" className="text-xl font-semibold tracking-tight text-foreground">
          Related components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/components/button"
            className="group rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground group-hover:text-primary">Button</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Standard single-action control with liquid glass material.</p>
          </Link>

          <Link
            href="/components/icon-button"
            className="group rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground group-hover:text-primary">Icon Button</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Square icon-only action with mandatory accessible naming.</p>
          </Link>

          <Link
            href="/components/button-group"
            className="group rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground group-hover:text-primary">Button Group</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Visually connects independent actions into a single cluster.</p>
          </Link>

          <Link
            href="/components/split-button"
            className="group rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground group-hover:text-primary">Split Button</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Primary action with secondary alternatives dropdown menu.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
