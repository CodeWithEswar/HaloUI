import { Metadata } from "next";
import { AccordionPreviewStage } from "./accordion-preview-stage";
import { AccordionDemonstrations } from "./accordion-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accordion — Data Display 15 — HaloUI",
  description:
    "Stacked expandable disclosure sections with coordinated single/multiple item models, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
};

const ACCORDION_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Accordion",
    kind: "Component",
    maturity: "stable",
    description:
      "Root coordinated disclosure group primitive built on Base UI Accordion. Manages multi-item state coordination, keyboard roving focus, and container-query boundary reflow.",
    inheritedProps: {
      element: "AccordionPrimitive.Root.Props",
      description:
        "Inherits all Base UI Accordion.Root props including value, defaultValue, onValueChange, multiple, disabled, and orientation.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'outline' | 'muted' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant for the outer disclosure group: 'default' (subtle border with card tint), 'outline' (hairline border), 'muted' (low-contrast background), 'glass' (restrained HaloUI liquid glass outer shell with specular reflection), or 'ghost' (borderless layout).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'relaxed'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling vertical and horizontal padding across triggers and panels: 'default' (14px padding), 'compact' (8-10px padding for dense dashboards), or 'relaxed' (18px rhythm for FAQ pages).",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Allows multiple items to remain expanded simultaneously. When false, expanding an item automatically collapses any other open item in the group.",
      },
      {
        name: "value",
        type: "string | null | string[]",
        required: false,
        description:
          "Controlled open state value. Accepts a string or null when multiple=false, or an array of item strings when multiple=true.",
      },
      {
        name: "defaultValue",
        type: "string | null | string[]",
        required: false,
        description:
          "Uncontrolled initial open state value for the accordion group upon initial mount.",
      },
      {
        name: "onValueChange",
        type: "(value: any, eventDetails: any) => void",
        required: false,
        description:
          "Event callback fired when the accordion group open state transitions.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Disables all interactive items in the entire accordion group.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Class names merged with the outer accordion container.",
      },
    ],
  },
  {
    name: "AccordionItem",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Individual expandable disclosure section item. Strictly transparent and quiet — avoids heavy per-item glass effects to preserve optical hierarchy.",
    inheritedProps: {
      element: "AccordionPrimitive.Item.Props",
      description:
        "Inherits all Base UI Accordion.Item props including value, disabled, and ref forwarding.",
    },
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        description:
          "Unique string identifier matching the accordion group selection state.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Disables interaction and keyboard focus for this specific disclosure section.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description:
          "Class names merged with the individual item container.",
      },
    ],
  },
  {
    name: "AccordionTrigger",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Accessible interactive trigger button with automatic label wrapping, independent Halo focus ring, and smoothly rotating disclosure chevron.",
    inheritedProps: {
      element: "AccordionPrimitive.Trigger.Props",
      description:
        "Inherits all Base UI Accordion.Trigger props including ARIA expanded states, keyboard navigation, and button semantics.",
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
    name: "AccordionContent",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Expandable content panel revealing arbitrary semantic child elements with hardware-accelerated CSS height transitions.",
    inheritedProps: {
      element: "AccordionPrimitive.Panel.Props",
      description:
        "Inherits all Base UI Accordion.Panel props including hidden states and transition lifecycle handlers.",
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

const ACCORDION_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "accordion.tsx",
            type: "file",
            description: "Production Accordion primitive and compound subcomponents.",
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

export default function AccordionDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 15
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Base UI Primitive</Badge>
          <Badge variant="outline">HaloUI Liquid Glass</Badge>
          <Badge variant="outline">Container Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Accordion
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Stacked expandable disclosure sections engineered with Base UI&apos;s accessible WAI-ARIA
          model, single or multiple item coordination, automatic container-aware label wrapping,
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
        <AccordionPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="accordion" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Accordion distributes as a single self-contained component file with clean compound
          subcomponents.
        </p>
        <FileTree data={ACCORDION_FILE_TREE} />
      </section>

      {/* Disclosure Component Architecture Comparison */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Disclosure Family &amp; Component Boundaries
        </h2>
        <p className="text-sm text-muted-foreground">
          HaloUI provides dedicated disclosure and panel primitives tailored to specific UX
          contracts. Understanding these boundaries ensures proper keyboard accessibility and visual hierarchy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Accordion (Data Display 15)</span>
              <Badge variant="outline">Grouped Disclosure</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when <strong>multiple related sections</strong> form a coordinated collection (such as
              FAQs, nested property inspectors, or grouped telemetry panels). Accordion coordinates
              open states across its children with roving keyboard support.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Collapsible (Data Display 16)</span>
              <Badge variant="outline">Single Region</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>one independent region</strong> (such as showing advanced filters, code
              block expansion, or a sidebar section). Collapsible does not maintain peer coordination
              or Arrow-key group behaviors.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Tabs (Navigation)</span>
              <Badge variant="outline">Peer Switching</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when switching between <strong>mutually exclusive peer views</strong> that occupy the
              same viewport coordinates. Tabs switch between distinct views, whereas Accordions reveal
              content vertically in context.
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
          HaloUI Accordion implements <strong>zero JavaScript resize listeners</strong> or viewport
          polling hacks (<code className="font-mono text-xs">window.innerWidth</code>). It reflows
          predictably whether rendered in a full-width marketing hero, a 320px mobile viewport, or a
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
                Configured with <code className="font-mono">@container/accordion</code> to allow nested
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
          Unlike generic CSS glassmorphism, HaloUI Accordion strictly avoids glass-on-glass stacking:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Outer Boundary Consolidation:</strong> Only the
                outer Accordion container applies the Liquid Glass recipe (
                <code className="font-mono">variant=&quot;glass&quot;</code>), establishing one unified
                specular reflection and ambient contact shadow.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Quiet Interior Items:</strong> AccordionItem and
                AccordionContent remain transparent and quiet. Individual items do NOT apply separate
                backdrop filters.
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
          <span className="text-xs text-muted-foreground font-mono">4 Scenarios</span>
        </div>
        <AccordionDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Props &amp; API Explorer</h2>
          <span className="text-xs text-muted-foreground font-mono">
            Source-Accurate &bull; 4 Subcomponents
          </span>
        </div>
        <PropsExplorer subcomponents={ACCORDION_SUBCOMPONENTS} />
      </section>

      {/* Related Components */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Related Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/table"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/30"
          >
            <span className="text-xs text-muted-foreground">Data Display 13</span>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Table
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Semantic tabular data primitive with container-aware scroll containment.
            </p>
          </Link>

          <Link
            href="/components/data-table"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/30"
          >
            <span className="text-xs text-muted-foreground">Data Display 14</span>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Data Table
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Interactive dataset composition with sorting, filtering, and selection.
            </p>
          </Link>

          <Link
            href="/components/card"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/30"
          >
            <span className="text-xs text-muted-foreground">Data Display 1</span>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Card
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Foundational content surface with restrained liquid optical material.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
