import { Metadata } from "next";
import { TimelinePreviewStage } from "./timeline-preview-stage";
import { TimelineDemonstrations } from "./timeline-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Timeline — Data Display 17 — HaloUI",
  description:
    "Chronological event stream engineered with semantic ordered lists, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics.",
};

const TIMELINE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Timeline",
    kind: "Component",
    maturity: "stable",
    description:
      "Root chronological event stream container rendered as a semantic ordered list (<ol>). Manages density scales, container query boundaries (@container/timeline), and outer liquid glass framing.",
    inheritedProps: {
      element: "React.ComponentProps<'ol'>",
      description: "Inherits all standard HTML ordered list properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'outline' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant for the outer timeline container: 'default' (unbordered clean container), 'outline' (hairline border), 'glass' (restrained HaloUI liquid glass outer shell with specular reflection), or 'ghost' (borderless layout).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'relaxed'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling vertical gap between event items: 'default' (24px gap), 'compact' (14-16px gap for dense audit logs), or 'relaxed' (36px rhythm for marketing and milestone views).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the outer ordered list element.",
      },
    ],
  },
  {
    name: "TimelineItem",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Individual chronological event entry (<li>). Connects to the marker rail and provides contextual status tone styling.",
    inheritedProps: {
      element: "React.ComponentProps<'li'>",
      description: "Inherits all standard HTML list item properties.",
    },
    props: [
      {
        name: "tone",
        type: "'default' | 'primary' | 'positive' | 'warning' | 'critical' | 'info' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Semantic status tone applied to the event item.",
      },
      {
        name: "isLast",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Indicates whether this entry is the terminal event in the sequence. Automatically suppresses the trailing connector line.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the list item element.",
      },
    ],
  },
  {
    name: "TimelineRail",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Vertical grid track anchoring the marker and vertical connector line.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the rail element.",
      },
    ],
  },
  {
    name: "TimelineMarker",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Visual milestone anchor, status point, or icon badge. Uses compact restrained Halo material without expensive per-item refraction.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties.",
    },
    props: [
      {
        name: "tone",
        type: "'default' | 'primary' | 'positive' | 'warning' | 'critical' | 'info' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Semantic color tone for the marker dot or icon badge boundary.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description:
          "Optional custom icon or badge element placed inside the milestone marker.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the marker element.",
      },
    ],
  },
  {
    name: "TimelineConnector",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Subtle 1px vertical hairline rail connecting sequential markers through time.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties.",
    },
    props: [
      {
        name: "tone",
        type: "'default' | 'primary' | 'positive' | 'warning' | 'critical' | 'info' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Color tone of the connector line matching the event status.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the connector element.",
      },
    ],
  },
  {
    name: "TimelineContent",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Event body container organizing header, title, description, metadata, and actions.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the content container.",
      },
    ],
  },
  {
    name: "TimelineHeader",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Responsive header row separating event title from timestamp with automatic mobile wrapping.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the header container.",
      },
    ],
  },
  {
    name: "TimelineTitle",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Semantic event title element (<h3>) with automatic word wrapping.",
    inheritedProps: {
      element: "React.ComponentProps<'h3'>",
      description: "Inherits all standard HTML heading properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the heading element.",
      },
    ],
  },
  {
    name: "TimelineTimestamp",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Semantic timestamp element (<time>) with mono formatting and automatic positioning.",
    inheritedProps: {
      element: "React.ComponentProps<'time'>",
      description: "Inherits all standard HTML time element properties including dateTime.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the time element.",
      },
    ],
  },
  {
    name: "TimelineDescription",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Event narrative or descriptive details paragraph (<p>) with relaxed line height.",
    inheritedProps: {
      element: "React.ComponentProps<'p'>",
      description: "Inherits all standard HTML paragraph properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the paragraph element.",
      },
    ],
  },
];

const TIMELINE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "timeline.tsx",
            type: "file",
            description: "Production Timeline primitive and compound subcomponents.",
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
        description: "Focus ring, density, and spatial tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Liquid glass 10-layer physical optical engine recipes.",
      },
    ],
  },
];

export default function TimelineDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 17
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Semantic &lt;ol&gt;</Badge>
          <Badge variant="outline">HaloUI Liquid Glass</Badge>
          <Badge variant="outline">All-Device Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Timeline
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Chronological event stream engineered with semantic ordered lists, milestone markers,
          restrained hairline connectors, automatic container-aware reflow across all devices, and
          a unified HaloUI Liquid Glass outer boundary.
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
        <TimelinePreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="timeline" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Timeline distributes as a clean composition-first primitive with compound subcomponents.
        </p>
        <FileTree data={TIMELINE_FILE_TREE} />
      </section>

      {/* Component Boundaries & Comparisons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Component Boundaries &amp; Semantic Roles
        </h2>
        <p className="text-sm text-muted-foreground">
          Choosing the proper component for chronological and event presentation guarantees intuitive
          scanning and accessible screen reader traversal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Timeline (Data Display 17)</span>
              <Badge variant="outline">Chronological Sequence</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when <strong>chronological progression and time sequence</strong> are visually
              essential (e.g. build pipelines, incident histories, audit logs, or tracking milestones).
              Features prominent markers and connector lines.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Activity Feed (Data Display 18)</span>
              <Badge variant="outline">Action Stream</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>scanning recent actions and notifications</strong> (e.g. social feeds,
              team activity, or change logs). Emphasizes actor identity, avatar presence, and action
              verbs over formal connector geometry.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Stepper (Navigation)</span>
              <Badge variant="outline">Bounded Process</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>multi-step task workflows</strong> with current, completed, and upcoming
              states (e.g. checkout forms or onboarding). Steppers represent discrete wizard steps, not
              chronological historical events.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">List (Data Display 11)</span>
              <Badge variant="outline">Generic Collection</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>general collections of data rows</strong> without explicit chronological
              connectors, milestone markers, or time-series relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Responsiveness & Container Queries */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Strict Automatic Container-Aware Responsiveness for ALL Devices
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI Timeline features <strong>zero JavaScript resize listeners</strong> or viewport
          polling hacks (<code className="font-mono text-xs">window.innerWidth</code>). It reflows
          predictably across all device sizes—from compact 240px sidebars and 390px mobile screens to
          1440px+ ultrawide desktops.
        </p>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Responsive Engineering Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Container Queries</span>
              <p className="text-muted-foreground">
                Configured with <code className="font-mono">@container/timeline</code> to allow nested
                event items to react directly to their immediate parent width, even when placed inside
                narrow split-panes.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Flex Header Reflow</span>
              <p className="text-muted-foreground">
                Headers automatically position the title and timestamp side-by-side on wide screens,
                while wrapping gracefully on mobile without crushing the marker rail.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Zero Horizontal Overflow</span>
              <p className="text-muted-foreground">
                Titles and descriptions utilize <code className="font-mono">break-words min-w-0</code> to
                prevent long strings or code hashes from causing document-level horizontal scrolling.
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
          Unlike generic CSS glassmorphism, HaloUI Timeline strictly avoids glass-on-glass stacking:
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
                <strong className="text-foreground">Quiet Interior Events:</strong> Individual events do
                NOT apply separate backdrop filters. Repeated items remain performant across feeds with
                50+ entries.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Restrained Connector Line:</strong> The connector rail
                uses a crisp 1px neutral or semantically tinted line without loud neon glows or continuous
                gradient animations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Content Refraction:</strong> Event titles,
                descriptions, timestamps, and avatar photos are never blurred or refracted.
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
        <TimelineDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited semantic HTML attributes across all
          Timeline components.
        </p>
        <PropsExplorer subcomponents={TIMELINE_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
