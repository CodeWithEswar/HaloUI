import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SplitButtonPreviewStage } from "./split-button-preview-stage";
import {
  SplitButtonVariantsPreview,
  SplitButtonSizesPreview,
  SplitButtonStatesPreview,
  SplitButtonDisabledPrimaryPreview,
  SplitButtonKeyboardPreview,
} from "./split-button-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Split Button — Actions",
  description:
    "Combines a primary immediate action with a secondary menu of closely related alternative actions.",
};

const SPLIT_BUTTON_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "SplitButton",
    kind: "Component",
    maturity: "stable",
    description:
      "Root layout container that visually connects the primary action and secondary dropdown menu trigger into one cohesive pill geometry with overlapping 1px border seam.",
    inheritedProps: {
      element: "React.HTMLAttributes<HTMLDivElement>",
      description:
        "Inherits all native HTML <div> attributes, ARIA attributes, and ref forwarding.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
        default: "'default'",
        required: false,
        description:
          "Semantic visual material family applied uniformly across primary action, secondary trigger, and menu container.",
      },
      {
        name: "size",
        type: "'default' | 'sm' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Coordinates height and trigger dimensions: 'default' (40px height), 'sm' (32px), 'lg' (48px).",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "When set on SplitButton, disables both the primary action and secondary menu trigger.",
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        description:
          "Controlled open state for the secondary actions dropdown menu.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        required: false,
        description:
          "Uncontrolled initial open state for the secondary actions dropdown menu.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean, eventDetails: any) => void",
        required: false,
        description:
          "Event callback invoked when the secondary menu opens or closes.",
      },
      {
        name: "modal",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Whether the portalled dropdown menu operates modally with background scrim absorption.",
      },
      {
        name: "root",
        type: "boolean",
        default: "true",
        required: false,
        description:
          "When true, automatically provides the accessible Base UI MenuPrimitive.Root provider.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Additional Tailwind CSS classes merged with the split button root container.",
      },
    ],
  },
  {
    name: "SplitButtonAction",
    kind: "Component",
    maturity: "stable",
    description:
      "The primary interactive segment that executes the default action immediately without disclosing the alternatives menu.",
    inheritedProps: {
      element: "React.ButtonHTMLAttributes<HTMLButtonElement>",
      description:
        "Inherits all native HTML <button> attributes, event handlers (onClick, onFocus), and ref forwarding.",
    },
    props: [
      {
        name: "onClick",
        type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
        required: false,
        description:
          "Handler for immediate execution of the primary action. Does not toggle or open the secondary menu.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Disables only the primary action button while leaving the secondary menu trigger interactive.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Renders as Radix Slot child component for polymorphic composition.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Additional Tailwind CSS classes merged with the action button.",
      },
    ],
  },
  {
    name: "SplitButtonTrigger",
    kind: "Component",
    maturity: "stable",
    description:
      "Square disclosure trigger that opens the alternative actions dropdown menu without executing the primary action.",
    inheritedProps: {
      element: "React.ButtonHTMLAttributes<HTMLButtonElement>",
      description:
        "Inherits Base UI MenuPrimitive.Trigger attributes, ARIA attributes, and ref forwarding.",
    },
    props: [
      {
        name: "aria-label",
        type: "string",
        required: true,
        description:
          "Mandatory accessible name identifying alternative actions (e.g. 'More export options'). Warns in development if omitted.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Disables only the secondary menu trigger while leaving the primary action active.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "<HaloIcon icon={ArrowDown01Icon} />",
        required: false,
        description:
          "Custom disclosure trigger icon or label. Defaults to Hugeicons ArrowDown01Icon with automatic open rotation.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Additional Tailwind CSS classes merged with the menu trigger.",
      },
    ],
  },
  {
    name: "SplitButtonContent",
    kind: "Component",
    maturity: "stable",
    description:
      "Portalled dropdown menu container rendering alternative action items with HaloUI balanced optical glass.",
    inheritedProps: {
      element: "React.HTMLAttributes<HTMLDivElement>",
      description:
        "Inherits Base UI MenuPrimitive.Popup attributes, positioning props, and ref forwarding.",
    },
    props: [
      {
        name: "align",
        type: "'start' | 'center' | 'end'",
        default: "'end'",
        required: false,
        description:
          "Alignment of the portalled dropdown menu relative to the split button cluster.",
      },
      {
        name: "sideOffset",
        type: "number",
        default: "6",
        required: false,
        description:
          "Distance in pixels between the trigger boundary and the opened menu popup.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Additional Tailwind CSS classes merged with the menu content panel.",
      },
    ],
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Split Button Group",
    selector: "div[data-slot='split-button']",
    description: "Inline flex container coordinating connected geometry, boundary overlap, and child stacking contexts.",
  },
  {
    name: "Primary Action",
    selector: "button[data-slot='split-button-action']",
    description: "First interactive segment executing the default action immediately. Has outer start-side radius and collapsed end radius.",
  },
  {
    name: "Internal Divider Seam",
    selector: "[data-slot='split-button-trigger']:-ms-px",
    description: "1px border overlap between segments creating a crisp single-pixel boundary without doubling seam thickness.",
  },
  {
    name: "Menu Trigger",
    selector: "button[data-slot='split-button-trigger']",
    description: "Square disclosure control opening the alternative actions menu. Has collapsed start radius and outer end-side radius.",
  },
  {
    name: "Menu Content Overlay",
    selector: "div[data-slot='split-button-content']",
    description: "Portalled floating surface containing accessible alternative action items with entrance animations.",
  },
  {
    name: "Alternative Action Item",
    selector: "div[data-slot='split-button-item']",
    description: "Interactive menu item with keyboard roving focus and accessible semantics.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Registry Dependencies",
    items: ["button"],
  },
  {
    title: "npm Dependencies",
    items: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
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
            name: "split-button.tsx",
            type: "file",
            description: "Primary Split Button compound component, variants, trigger, and menu content.",
          },
        ],
      },
      {
        name: "icons",
        type: "folder",
        children: [
          {
            name: "halo-icon.tsx",
            type: "file",
            description: "Hugeicons icon wrapper ensuring currentColor inheritance and optical stroke width.",
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

export default function SplitButtonPage() {
  return (
    <div className="space-y-12">
      {/* Title + Subtitle Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Split Button
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Combines a primary immediate action with a secondary menu of closely related alternative actions.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <SplitButtonPreviewStage />

      {/* Important Callout */}
      <Callout type="important" title="A Split Button contains two distinct actions">
        The primary segment performs the default action immediately. The secondary trigger opens a menu of closely related alternatives. Clicking the primary action must never open the menu, and clicking the secondary trigger must never execute the primary action.
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="http://localhost:3000/r/split-button.json" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Import the compound subcomponents. Ensure the secondary trigger includes an accessible <code>aria-label</code> describing the alternative actions.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  FileAttachmentIcon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonContent,
  SplitButtonItem,
  SplitButtonSeparator,
} from "@/components/ui/split-button";

export function ExportSplitButton() {
  const handleExport = () => {
    console.log("Primary action: Exporting document...");
  };

  return (
    <SplitButton variant="default" size="default">
      {/* 1. Primary action executes default action immediately */}
      <SplitButtonAction onClick={handleExport}>
        Export
      </SplitButtonAction>

      {/* 2. Menu trigger opens alternative actions */}
      <SplitButtonTrigger aria-label="More export options" />

      {/* 3. Dropdown content exposing alternatives */}
      <SplitButtonContent align="end">
        <SplitButtonItem onClick={() => console.log("PDF")}>
          <HaloIcon icon={FileAttachmentIcon} size={15} />
          Export as PDF
        </SplitButtonItem>
        <SplitButtonItem onClick={() => console.log("CSV")}>
          <HaloIcon icon={FileAttachmentIcon} size={15} />
          Export as CSV
        </SplitButtonItem>
        <SplitButtonSeparator />
        <SplitButtonItem onClick={() => console.log("Link")}>
          <HaloIcon icon={Link01Icon} size={15} />
          Copy export link
        </SplitButtonItem>
      </SplitButtonContent>
    </SplitButton>
  );
}`}
        />
      </div>

      {/* Primary Action vs Secondary Menu */}
      <div className="space-y-4">
        <h2 id="primary-action" className="text-xl font-semibold tracking-tight text-foreground">
          Primary action vs secondary menu
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The central contract of a Split Button is separation of interactive targets:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-medium text-foreground">Primary Action Segment</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Acts as a full native button. Receives its own independent keyboard focus stop via Tab, triggers immediately upon click or Enter/Space, and receives tactile press compression without disturbing the trigger.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-medium text-foreground">Secondary Trigger Segment</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Opens the accessible overlay menu. Uses standard disclosure semantics (<code>aria-haspopup="menu"</code> and <code>aria-expanded</code>), provides independent hover and active states, and preserves focus restoration to the trigger when closed.
            </p>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="text-xl font-semibold tracking-tight text-foreground">
          Variants
        </h2>
        <p className="text-sm text-muted-foreground">
          Split Button inherits the same semantic visual hierarchy as Button: <code>default</code> (liquid glass), <code>secondary</code>, <code>outline</code>, <code>ghost</code>, and <code>destructive</code>.
        </p>
        <SplitButtonVariantsPreview />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="text-xl font-semibold tracking-tight text-foreground">
          Sizes
        </h2>
        <p className="text-sm text-muted-foreground">
          Three calibrated size tiers align the primary action height and the square secondary trigger target:
        </p>
        <SplitButtonSizesPreview />
      </div>

      {/* States */}
      <div className="space-y-4">
        <h2 id="states" className="text-xl font-semibold tracking-tight text-foreground">
          States
        </h2>
        <p className="text-sm text-muted-foreground">
          Independent state evaluation allows the primary action to be disabled while the secondary alternatives menu remains accessible:
        </p>
        <SplitButtonStatesPreview />
      </div>

      {/* Disabled Primary Pattern */}
      <div className="space-y-4">
        <h2 id="disabled-primary" className="text-xl font-semibold tracking-tight text-foreground">
          Disabled primary action pattern
        </h2>
        <p className="text-sm text-muted-foreground">
          A common application pattern is when the default action is unavailable (e.g. document already saved, changes already published), but alternative actions remain valid (e.g. "Save as template", "Export backup"). Split Button supports independent child <code>disabled</code> props:
        </p>
        <SplitButtonDisabledPrimaryPreview />
      </div>

      {/* Keyboard Behavior */}
      <div className="space-y-4">
        <h2 id="keyboard-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard behavior
        </h2>
        <p className="text-sm text-muted-foreground">
          Both segments participate in the standard tab order as independent controls. Test keyboard interaction below:
        </p>
        <SplitButtonKeyboardPreview />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
          Props & Subcomponent API
        </h2>
        <p className="text-sm text-muted-foreground">
          Interactive API specification for SplitButton root and composed subcomponents.
        </p>
        <PropsExplorer subcomponents={SPLIT_BUTTON_SUBCOMPONENTS} />
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <p className="text-sm text-muted-foreground">
          Actual DOM structure rendered by the Split Button compound subcomponents:
        </p>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Responsive behavior */}
      <div className="space-y-4">
        <h2 id="responsive-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Automatic Container-Aware Responsiveness
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Trigger Protection:</strong> The secondary menu trigger enforces <code>shrink-0</code> to guarantee that long primary labels or constrained containers never crush the chevron disclosure trigger.
          </p>
          <p>
            <strong>Intrinsic Wrapping (240px QA):</strong> The primary action button uses <code>min-w-0 max-w-full leading-snug break-words</code> and dynamic height scaling (<code>min-h-10 h-auto</code>). In narrow viewports (such as 240px and 280px containers), multi-word labels wrap cleanly across lines without overflowing the parent container.
          </p>
          <p>
            <strong>200% Zoom Compatibility:</strong> Scales gracefully under high text-scaling modes, expanding vertical padding while containing foreground typography within parent boundaries without horizontal overflow.
          </p>
        </div>
      </div>

      {/* Liquid Glass */}
      <div className="space-y-4">
        <h2 id="liquid-glass" className="text-xl font-semibold tracking-tight text-foreground">
          Coherent Liquid Glass Architecture
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Shared Optical Boundary:</strong> Split Button unites the primary action and secondary trigger under a continuous pill silhouette. A single 1px overlapping border seam (<code>-ms-px</code>) prevents double-border thickness or dark refraction halos between connected segments.
          </p>
          <p>
            <strong>Virtual Directional Lighting:</strong> Both segments share a 135° top-left specular highlight and bottom contact shadow, ensuring physical coherence across light and dark themes.
          </p>
          <p>
            <strong>Balanced Menu Surface:</strong> The portalled secondary dropdown menu (<code>SplitButtonContent</code>) utilizes HaloUI's <code>Balanced</code> glass material with high-legibility backdrop diffusion (<code>var(--halo-glass-pop-background)</code>), preventing visual noise against busy page content.
          </p>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Split Button satisfies WCAG 2.1 AA requirements across several critical criteria:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Mandatory Accessible Naming:</strong> The secondary menu trigger must have a descriptive accessible name via <code>aria-label</code> (e.g. <code>aria-label="More export options"</code>). Naming the function prevents ambiguous screen reader announcements like "Menu" or "Button".
            </li>
            <li>
              <strong>Independent Focus Stops:</strong> Pressing <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono text-[11px]">Tab</kbd> first focuses the Primary Action, and a second <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono text-[11px]">Tab</kbd> focuses the Secondary Trigger.
            </li>
            <li>
              <strong>Unclipped Halo Focus Ring:</strong> Both controls employ <code>focus-visible:z-20</code>. When either segment receives keyboard focus, its double-contrast focus perimeter rises above adjacent sibling borders without clipping.
            </li>
            <li>
              <strong>Focus Restoration:</strong> When the secondary menu is closed by pressing <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono text-[11px]">Escape</kbd> or selecting an item, focus is automatically restored to the secondary trigger button.
            </li>
            <li>
              <strong>Practical Touch Targets:</strong> Sized at 32px (sm), 40px (default), and 48px (lg), both segments maintain accessible hit areas for touch devices.
            </li>
          </ul>
        </div>
      </div>

      {/* Motion */}
      <div className="space-y-4">
        <h2 id="motion" className="text-xl font-semibold tracking-tight text-foreground">
          Motion
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Split Button leverages HaloUI's motion presets. Tactile press compression (<code>halo-tactile-press</code>) is segment-isolated: clicking the primary action compresses only the action, while clicking the trigger compresses only the trigger. The secondary menu enters with a smooth 150ms spring settle and graceful opacity reveal, collapsing gracefully under <code>prefers-reduced-motion</code>.
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <p className="mt-1 text-xs text-muted-foreground">Visually connects independent action controls into a single cluster.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
