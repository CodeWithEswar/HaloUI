import { Metadata } from "next";
import { CollapsiblePreviewStage } from "./collapsible-preview-stage";
import { CollapsibleDemonstrations } from "./collapsible-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Collapsible — Data Display 16 — HaloUI",
  description:
    "Independent expandable disclosure panel with controlled/uncontrolled state, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
};

const COLLAPSIBLE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Collapsible",
    kind: "Component",
    maturity: "stable",
    description:
      "Root independent disclosure primitive built on Base UI Collapsible. Manages open state, container-query boundary reflow, and optical liquid glass framing.",
    inheritedProps: {
      element: "CollapsiblePrimitive.Root.Props",
      description:
        "Inherits all Base UI Collapsible.Root props including open, defaultOpen, onOpenChange, and disabled.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'outline' | 'muted' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant for the disclosure container: 'default' (subtle border with card tint), 'outline' (hairline border), 'muted' (low-contrast background), 'glass' (restrained HaloUI liquid glass outer shell with specular reflection), or 'ghost' (borderless layout).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'relaxed'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling vertical and horizontal padding across trigger and content: 'default' (14px padding), 'compact' (8-10px padding for dense dashboards), or 'relaxed' (18px rhythm for hero settings panels).",
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        description:
          "Controlled open state of the collapsible panel.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Initial open state of the collapsible panel upon initial mount in uncontrolled mode.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean, eventDetails: any) => void",
        required: false,
        description:
          "Event callback fired when the collapsible open state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Disables user interaction on the trigger element.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Class names merged with the outer collapsible container.",
      },
    ],
  },
  {
    name: "CollapsibleTrigger",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Accessible interactive trigger button with automatic label wrapping, independent Halo focus ring, and smoothly rotating disclosure chevron.",
    inheritedProps: {
      element: "CollapsiblePrimitive.Trigger.Props",
      description:
        "Inherits all Base UI Collapsible.Trigger props including ARIA expanded states and button semantics.",
    },
    props: [
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description:
          "Optional custom icon rendered before the primary trigger label.",
      },
      {
        name: "badge",
        type: "React.ReactNode",
        required: false,
        description:
          "Optional badge, status tag, or count pill rendered adjacent to the trigger label.",
      },
      {
        name: "hideIndicator",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Suppresses the automatic rotating disclosure chevron indicator.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Class names merged with the trigger button element.",
      },
    ],
  },
  {
    name: "CollapsibleContent",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Expandable content panel revealing arbitrary semantic child elements with hardware-accelerated CSS height transitions.",
    inheritedProps: {
      element: "CollapsiblePrimitive.Panel.Props",
      description:
        "Inherits all Base UI Collapsible.Panel props including transition lifecycle handlers and hidden states.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Class names merged with the expandable panel container.",
      },
    ],
  },
];

const COLLAPSIBLE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "collapsible.tsx",
            type: "file",
            description: "Production Collapsible primitive and compound subcomponents.",
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
            description: "HaloUI icon bridge for Hugeicons rendering.",
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
        description: "Focus ring, density, and tactile compression tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Liquid glass 10-layer physical optical engine recipes.",
      },
    ],
  },
];

export default function CollapsibleDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 16
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Base UI Primitive</Badge>
          <Badge variant="outline">HaloUI Liquid Glass</Badge>
          <Badge variant="outline">Container Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Collapsible
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Independent expandable disclosure panel engineered with Base UI&apos;s accessible WAI-ARIA
          model, controlled/uncontrolled state coordination, automatic container-aware label wrapping,
          and a restrained HaloUI Liquid Glass outer boundary.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interactive Stage</h2>
          <span className="text-xs text-muted-foreground font-mono">
            6 Backdrops &bull; 9 Widths &bull; Density Scales
          </span>
        </div>
        <CollapsiblePreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="collapsible" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Collapsible distributes as a single self-contained component file with compound subcomponents.
        </p>
        <FileTree data={COLLAPSIBLE_FILE_TREE} />
      </section>

      {/* Disclosure Component Architecture Comparison */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Disclosure Family &amp; Component Boundaries
        </h2>
        <p className="text-sm text-muted-foreground">
          HaloUI separates grouped disclosures from independent single-region disclosures to preserve proper
          keyboard navigation and semantic clarity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Collapsible (Data Display 16)</span>
              <Badge variant="outline">Single Region</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>one independent region</strong> (such as showing advanced filters, code
              block expansion, or a sidebar section). Collapsible does not coordinate open states with
              neighboring components or introduce roving arrow-key behaviors.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Accordion (Data Display 15)</span>
              <Badge variant="outline">Grouped Disclosure</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when <strong>multiple related sections</strong> form a coordinated collection (such as
              FAQs or multi-part settings). Accordion coordinates single/multiple expansion states and roving
              focus across items.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Popover / Hover Card (Overlays)</span>
              <Badge variant="outline">Floating Overlay</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>floating context layers</strong> that escape normal document layout.
              Collapsible content remains inside the normal document flow and pushes adjacent elements downward.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Native &lt;details&gt;</span>
              <Badge variant="outline">Unstyled HTML</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native browser disclosure element without animation coordination, design-system optical
              boundaries, controlled state management, or compound badge integration.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Responsiveness & Container Queries */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Strict Automatic Container-Aware Responsiveness
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI Collapsible implements <strong>zero JavaScript resize listeners</strong> or viewport
          polling hacks (<code className="font-mono text-xs">window.innerWidth</code>). It reflows
          predictably whether rendered in a wide dashboard, a 390px mobile viewport, or a
          240px compact sidebar rail.
        </p>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Responsive Engineering Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Container Queries</span>
              <p className="text-muted-foreground">
                Configured with <code className="font-mono">@container/collapsible</code> to allow nested
                subcomponents to react directly to their immediate parent width.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Flex Track Truncation</span>
              <p className="text-muted-foreground">
                Trigger headers utilize <code className="font-mono">min-w-0 flex-1 break-words</code> to
                prevent long unbroken strings from forcing horizontal document blowout.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Pinned Indicator Layout</span>
              <p className="text-muted-foreground">
                The rotating chevron indicator uses <code className="font-mono">shrink-0</code> to
                remain reliably anchored at the trailing edge regardless of trigger line height.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Glass Architecture */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          HaloUI Liquid Glass Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlike generic CSS glassmorphism, HaloUI Collapsible strictly avoids glass-on-glass stacking:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Outer Boundary Consolidation:</strong> When using{" "}
                <code className="font-mono">variant=&quot;glass&quot;</code>, a single calibrated optical
                boundary is established with balanced transmission and specular reflection.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Flatter Nested Treatment:</strong> When placed inside
                Cards, Dialogs, or Sheets, use <code className="font-mono">variant=&quot;outline&quot;</code> or{" "}
                <code className="font-mono">variant=&quot;ghost&quot;</code> to prevent competing blur layers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Independent Halo Focus Ring:</strong> Focus rings
                are accessibility infrastructure (<code className="font-mono">focus-visible:ring-2</code>).
                They remain visually distinct from hover states and specular edge highlights.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Content Refraction:</strong> Text, code blocks,
                form controls, and status badges inside the expanded panel are never blurred or refracted.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Production Demonstrations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Production Demonstrations</h2>
          <span className="text-xs text-muted-foreground font-mono">5 Scenarios</span>
        </div>
        <CollapsibleDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited Base UI primitives across all
          Collapsible components.
        </p>
        <PropsExplorer subcomponents={COLLAPSIBLE_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
