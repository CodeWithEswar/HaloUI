import * as React from "react";
import type { Metadata } from "next";
import { InputGroupPreviewStage } from "./input-group-preview-stage";
import {
  WebsitePrefixDemo,
  IconSearchDemo,
  ActionCopyDemo,
  PrefixAndSuffixDemo,
  InvalidActionFocusedDemo,
} from "./input-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Input Group — Forms & Fields — HaloUI",
  description:
    "Composes a canonical Input with prefixes, suffixes, icons, text addons, and actions inside a shared optical liquid glass boundary without duplicating input styles or state.",
};

const INPUT_GROUP_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "InputGroup",
    description:
      "The primary 10-layer liquid glass composite container coordinating shared optics and focus management across addons and inputs.",
    props: [
      {
        name: "role",
        type: "string",
        default: '"group"',
        required: false,
        description: "Accessible ARIA role identifying the composite control boundary to assistive technologies.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        required: true,
        description: "The composition of addons, controls, text, or buttons.",
      },
      {
        name: "className",
        type: "string",
        default: "undefined",
        required: false,
        description: "Additional CSS classes to append to the input group boundary.",
      },
      {
        name: "...props",
        type: 'React.ComponentProps<"div">',
        default: "—",
        required: false,
        description: "Standard HTML <div> attributes applied to the group container.",
      },
    ],
  },
  {
    name: "InputGroupAddon",
    description:
      "Container for prefix, suffix, decorative icons, and interactive action buttons with built-in click-to-focus forwarding.",
    props: [
      {
        name: "align",
        type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
        default: '"inline-start"',
        required: false,
        description: "Positional alignment for prefixes, suffixes, icons, and action triggers.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        required: true,
        description: "The content of the addon (text, icon, or button).",
      },
      {
        name: "className",
        type: "string",
        default: "undefined",
        required: false,
        description: "Additional CSS classes for the addon container.",
      },
      {
        name: "onClick",
        type: "(e: React.MouseEvent) => void",
        default: "focus() forwarder",
        required: false,
        description: "Automatic focus forwarder that transfers click focus to the inner control.",
      },
      {
        name: "...props",
        type: 'React.ComponentProps<"div">',
        default: "—",
        required: false,
        description: "Standard HTML div attributes applied to the addon wrapper.",
      },
    ],
  },
  {
    name: "InputGroupInput",
    description:
      "Canonical single-line text input stripped of native borders and backgrounds to merge seamlessly into the InputGroup optical shell.",
    props: [
      {
        name: "id",
        type: "string",
        default: "—",
        required: false,
        description: "Identifier linking the control with parent FieldLabel and accessibility descriptors.",
      },
      {
        name: "placeholder",
        type: "string",
        default: "—",
        required: false,
        description: "Short hint displayed inside the input before user enters a value.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Disables user interaction and cascades dimmed optical states across the group.",
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        required: false,
        description: "Prevents editing while preserving keyboard focus, text selection, and screen reader announcements.",
      },
      {
        name: "aria-invalid",
        type: 'boolean | "true" | "false"',
        default: "false",
        required: false,
        description: "Signals validation failure, triggering red error ring persistence on the parent group.",
      },
      {
        name: "...props",
        type: 'React.ComponentProps<typeof Input>',
        default: "—",
        required: false,
        description: "All standard Input props forwarded to the canonical text field.",
      },
    ],
  },
  {
    name: "InputGroupButton",
    description:
      "Independent interactive action button (clear, copy, password toggle) embedded inside an addon without clipping focus rings.",
    props: [
      {
        name: "size",
        type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
        default: '"icon-xs"',
        required: false,
        description: "Scaled button size optimized to fit inside the 40px input group boundary.",
      },
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive"',
        default: '"ghost"',
        required: false,
        description: "Visual style variant from the canonical HaloUI Button primitive.",
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        default: '"button"',
        required: false,
        description: "Explicit button type to prevent unintended form submissions.",
      },
      {
        name: "...props",
        type: 'React.ComponentProps<typeof Button>',
        default: "—",
        required: false,
        description: "All standard Button props, including aria-label, onClick, and disabled.",
      },
    ],
  },
  {
    name: "InputGroupText",
    description:
      "Static typographic hint or unit label (e.g., https://, USD, kg) styled with muted text colors and tabular numerals.",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        required: true,
        description: "Textual label or currency notation.",
      },
      {
        name: "className",
        type: "string",
        default: "undefined",
        required: false,
        description: "Additional CSS typography or spacing classes.",
      },
    ],
  },
  {
    name: "InputGroupSeparator",
    description:
      "Subtle optical hairline divider separating consecutive addons or actions inside the shared boundary.",
    props: [
      {
        name: "className",
        type: "string",
        default: "undefined",
        required: false,
        description: "Additional CSS classes for custom divider heights or alignments.",
      },
    ],
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Input Group Root",
    description:
      "Outer <div> container with role='group' and 10-layer optical liquid glass substrate with inner shadow depth.",
  },
  {
    name: "Input Group Addon",
    description:
      "Layout container for icons, currency symbols, badges, or buttons with automatic click-to-focus forwarding.",
  },
  {
    name: "Input Group Input",
    description:
      "The canonical native <input> control, seamlessly styled without outer borders or shadow collisions.",
  },
  {
    name: "Input Group Text",
    description:
      "Non-interactive textual ornament (e.g., 'https://', 'USD') with muted contrast and select-none protection.",
  },
  {
    name: "Input Group Button",
    description:
      "Interactive action primitive with independent, unclipped focus outline that does not trigger input ring.",
  },
];

const FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "input-group.tsx",
            type: "file",
            description: "Compound input group primitive and addon slots.",
          },
          {
            name: "input.tsx",
            type: "file",
            description: "Canonical single-line text control (reused, not duplicated).",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Accessible Field, Label, Description, and Error primitives.",
          },
        ],
      },
    ],
  },
];

const DEPENDENCIES_DATA: DependencyGroup[] = [
  {
    title: "Direct Dependencies",
    items: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    title: "Registry & Icon Dependencies",
    items: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "@/components/ui/input",
      "@/components/ui/button",
    ],
  },
];

export default function InputGroupPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>05</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Input Group
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Composes a canonical Input with prefixes, suffixes, icons, text addons, and actions
          inside a shared optical liquid glass boundary without duplicating input styles or state.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <InputGroupPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="input-group" />
      </section>

      {/* Architectural Rule 1 */}
      <Callout type="note" title="Single Canonical Control — Zero Duplication">
        Input Group composes the canonical <code className="text-foreground">Input</code> component;
        it does not duplicate Input CSS or create a second input implementation. The inner control
        is a headless styling of the native Input, ensuring identical autocomplete, spellcheck,
        password manager, and accessibility behaviors.
      </Callout>

      {/* Flagship Regression Fixture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Invalid State with Action Focus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Standard design systems suffer from a severe focus collision bug when an invalid input has
          an internal action button: focusing the button either clears the error indication or
          subsumes the button focus ring under the input boundary. HaloUI solves this via selector
          isolation:
        </p>

        <InvalidActionFocusedDemo />

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pt-2">
          <p>
            <strong>1. Input-Specific Group Focus:</strong> The outer container uses{" "}
            <code className="text-foreground">has-[[data-slot=input-group-control]:focus-visible]</code>,
            meaning the group’s focus outline activates <em>only</em> when the text input itself is
            focused.
          </p>
          <p>
            <strong>2. Independent Button Focus:</strong> The trailing{" "}
            <code className="text-foreground">&lt;InputGroupButton&gt;</code> has its own independent
            keyboard focus ring with a 2px offset.
          </p>
          <p>
            <strong>3. Error Boundary Persistence:</strong> When the field is invalid (
            <code className="text-foreground">aria-invalid=&quot;true&quot;</code>), the group boundary
            retains its red error styling even when keyboard focus transfers to the action button.
          </p>
          <p>
            <strong>4. No Clipped Rings:</strong> Input Group avoids{" "}
            <code className="text-foreground">overflow: hidden</code>, guaranteeing that action focus
            rings and floating popovers/tooltips are never cut off by the container.
          </p>
        </div>
      </section>

      {/* Semantic Prefix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Semantic Text Prefix
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Provide contextual text hints such as URL schemes, protocol qualifiers, or domain anchors
          using <code className="text-foreground">&lt;InputGroupText&gt;</code>:
        </p>
        <WebsitePrefixDemo />
      </section>

      {/* Callout 2: Value Mutation Warning */}
      <Callout type="warning" title="Addons Never Mutate Form Values">
        Prefixes and suffixes are contextual visual decorations; they never silently alter the
        submitted form value. The value submitted to your server is solely what resides in the
        native input element. If a prefix such as <code className="text-foreground">https://</code>{" "}
        must be included in the form payload, normalize the value in your form schema or submit handler.
      </Callout>

      {/* Search Bar with Action */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Leading Icon &amp; Trailing Action
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Combine leading decorative icons with actionable trailing buttons like search clear or
          password visibility toggles:
        </p>
        <IconSearchDemo />
      </section>

      {/* Action Addon: Read-Only Copy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Read-Only Snippet with Copy Action
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pair a read-only input with an action button to provide copy-to-clipboard functionality
          while preserving keyboard focus and text selection for developers:
        </p>
        <ActionCopyDemo />
      </section>

      {/* Dual Addons: Prefix + Suffix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Dual Addons (Prefix &amp; Suffix)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Position adornments on both ends of the control simultaneously for currency, dimension, or
          unit calculations:
        </p>
        <PrefixAndSuffixDemo />
      </section>

      {/* Liquid Glass Architecture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Liquid Glass &amp; Optical Layering Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The <code className="text-foreground">InputGroup</code> boundary functions as an advanced composite optical aperture. Rather than wrapping separate inputs and icons with redundant borders and background fills, the container establishes a unified liquid glass surface across all subcomponents:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border p-4 space-y-2 bg-muted/20">
            <h3 className="font-semibold text-foreground text-sm">1. Focus Ring Delegator (<code className="text-xs">has-[control:focus-visible]</code>)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native outline styles on the child input are disabled. The outer boundary listens to focus events from controls using CSS pseudo-class <code className="text-foreground">has-[:focus-visible]</code>, illuminating a unified liquid highlight rim and specular flare.
            </p>
          </div>
          <div className="rounded-xl border border-border p-4 space-y-2 bg-muted/20">
            <h3 className="font-semibold text-foreground text-sm">2. Non-Clipping Overflow Architecture</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard inputs often apply <code className="text-foreground">overflow: hidden</code> to round child elements. HaloUI removes this restriction, ensuring interactive action buttons receive unclipped 2px focus rings and dropdown menus can anchor directly to addons.
            </p>
          </div>
          <div className="rounded-xl border border-border p-4 space-y-2 bg-muted/20">
            <h3 className="font-semibold text-foreground text-sm">3. Persistent Error Boundary</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When invalid state is asserted, the red destructive optical ring locks onto the group. Tabbing to secondary action buttons maintains the error boundary so visual form integrity is never compromised.
            </p>
          </div>
          <div className="rounded-xl border border-border p-4 space-y-2 bg-muted/20">
            <h3 className="font-semibold text-foreground text-sm">4. Automatic Click-to-Focus Forwarding</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Clicking non-interactive decorative elements (prefixes, currency units, search icons) queries the sibling text input and shifts keyboard focus immediately, providing a tactile native control feel.
            </p>
          </div>
        </div>
      </section>

      {/* Container Responsiveness */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Automatic container-aware responsiveness
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Input Group adjusts fluidly across constrained screen widths from 240px ultra-compact mobile views up to 1024px full desktop layouts. The text input features <code className="text-foreground">min-w-0 max-w-full</code> flex shrinking, preventing addon collisions and horizontal overflow.
        </p>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive API specification for all Input Group subcomponents and composite elements.
        </p>
        <PropsExplorer subcomponents={INPUT_GROUP_SUBCOMPONENTS} />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Composite Group Role:</strong> The root element uses{" "}
            <code className="text-foreground">role=&quot;group&quot;</code> to indicate to screen
            readers that the enclosed controls and adornments form a cohesive semantic unit.
          </p>
          <p>
            <strong>Click-to-Focus Forwarding:</strong> Clicking decorative addons (such as currency
            symbols or icons) automatically focuses the enclosed native input element without
            requiring manual handler wiring.
          </p>
          <p>
            <strong>Independent Action Tabbing:</strong> Interactive buttons inside{" "}
            <code className="text-foreground">&lt;InputGroupAddon&gt;</code> remain genuine{" "}
            <code className="text-foreground">&lt;button&gt;</code> elements with standard Tab navigation
            and explicit <code className="text-foreground">aria-label</code> descriptions.
          </p>
          <p>
            <strong>Focus Ring Clarity:</strong> Keyboard focus on the input illuminates the group
            perimeter; keyboard focus on an action button highlights the button exclusively. Focus
            rings never clash or overlap.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Input Group delivers rich composite styling with zero runtime overhead:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>100% Server Component compatible — zero client bundle overhead for static views.</li>
          <li>0 React context providers, zero resize observers, zero layout measurement scripts.</li>
          <li>CSS-only focus-within and invalid state orchestration via modern Tailwind selectors.</li>
        </ul>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          File Structure
        </h2>
        <FileTree items={FILE_TREE} />
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>
    </div>
  );
}
