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
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Toggle — Actions",
  description:
    "A two-state action control that communicates and changes a persistent pressed or unpressed state.",
};

const TOGGLE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Toggle",
    kind: "Component",
    maturity: "stable",
    description:
      "A persistent two-state action control sharing HaloUI's 10-layer physical liquid optical engine, accessible aria-pressed semantics, and tactile press response.",
    inheritedProps: {
      element: "React.ComponentPropsWithoutRef<typeof TogglePrimitive>",
      description:
        "Inherits all Base UI Toggle primitive attributes, ARIA attributes, event handlers (onPressedChange), and ref forwarding.",
    },
    props: [
      {
        name: "pressed",
        type: "boolean",
        required: false,
        description:
          "Controlled pressed state. When provided, the toggle behaves as a controlled input.",
      },
      {
        name: "defaultPressed",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Initial pressed state for uncontrolled usage.",
      },
      {
        name: "onPressedChange",
        type: "(pressed: boolean, eventDetails?: any) => void",
        required: false,
        description:
          "Callback fired when the pressed state changes.",
      },
      {
        name: "variant",
        type: "'default' | 'outline'",
        default: "'default'",
        required: false,
        description:
          "Semantic visual material profile: 'default' (10-layer physical liquid glass with specular catch and pressed optical displacement) or 'outline' (hairline border with backdrop blur).",
      },
      {
        name: "size",
        type: "'default' | 'sm' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Calibrated action dimensions: 'default' (40px height, ≥40px compliant touch target), 'sm' (32px compact), 'lg' (48px).",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Prevents pointer and keyboard interaction while strictly preserving the current pressed or unpressed state visually.",
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        description:
          "Mandatory accessible name for icon-only toggles (e.g. aria-label='Pin document'). Warns in development if omitted.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Additional Tailwind CSS classes merged with the toggle base and variant styles.",
      },
    ],
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
          Props & Subcomponent API
        </h2>
        <p className="text-sm text-muted-foreground">
          Interactive API specification for the Toggle primitive.
        </p>
        <PropsExplorer subcomponents={TOGGLE_SUBCOMPONENTS} />
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Responsive Behavior */}
      <div className="space-y-4">
        <h2 id="responsive-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Automatic Container-Aware Responsiveness
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Intrinsic Multi-Line Wrapping:</strong> Text-supported toggles enforce <code>min-w-0 max-w-full leading-snug break-words</code> paired with <code>min-h-10 h-auto</code> height scaling. Under wide viewports or short labels, Toggle retains its canonical 40px/32px/48px height. In constrained mobile viewports or sidebars (240px and 280px QA), long text labels wrap gracefully across multiple lines without horizontal overflow or clipped text.
          </p>
          <p>
            <strong>Glyph Protection:</strong> Embedded leading icons enforce <code>shrink-0</code> to guarantee that icons never compress when text labels wrap.
          </p>
          <p>
            <strong>200% Zoom Compatibility:</strong> Scales gracefully under high text-scaling modes, expanding vertical height and preserving optical state boundaries without page blowout.
          </p>
        </div>
      </div>

      {/* Liquid Glass */}
      <div className="space-y-4">
        <h2 id="liquid-glass" className="text-xl font-semibold tracking-tight text-foreground">
          Liquid Glass Optical Architecture
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Persistent State Optical Distinction:</strong> Toggle avoids relying on color tint alone to communicate state. In the unpressed state, it exhibits a subtle transmission profile with 135° overhead specular catch. In the pressed state, it resolves to a physical recessed displacement with optical inset shadow (<code>inset 0 2px 4px rgba(0,0,0,0.18)</code>) and condensed boundary contrast.
          </p>
          <p>
            <strong>Light and Dark Adaptation:</strong> In Light mode, pressed state condenses to <code>bg-neutral-900/[0.12]</code> with dark hairline perimeter. In Dark mode, transmission shifts to <code>bg-white/[0.22]</code> with a 0.5 opacity interior shadow, avoiding muddy halo artifacts.
          </p>
          <p>
            <strong>Restrained Intensity:</strong> Employs HaloUI's <code>Subtle</code> material recipe to prevent visual fatigue when multiple toggles populate toolbars or text editors.
          </p>
        </div>
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
