import { Metadata } from "next";
import { EmptyStatePreviewStage } from "./empty-state-preview-stage";
import { EmptyStateDemonstrations } from "./empty-state-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Empty State — Data Display 19 — HaloUI",
  description:
    "No-data and no-result guidance surface engineered with container-aware responsive reflow, clear action hierarchy, and restrained HaloUI Liquid Glass optics.",
};

const EMPTY_STATE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "EmptyState",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container communicating that a region currently has nothing meaningful to display. Manages density scales, container query boundaries (@container/empty-state), and outer liquid glass framing.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'outline' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant for the outer container: 'default' (unbordered clean container), 'outline' (hairline dashed border), 'glass' (restrained HaloUI liquid glass outer shell with specular reflection), or 'ghost' (borderless layout).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'relaxed'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling vertical and horizontal padding: 'default' (32-48px padding), 'compact' (16-24px padding for tables and sidebars), or 'relaxed' (48-64px padding for page-level views).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the outer container element.",
      },
    ],
  },
  {
    name: "EmptyStateVisual",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Visual icon or graphic indicator container with responsive scaling. Preserves 100% media fidelity with zero refraction.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'icon' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing style: 'default' (subtle rounded tile with border and background), 'icon' (unframed direct glyph), or 'ghost' (minimal container).",
      },
      {
        name: "size",
        type: "'default' | 'sm' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Size scale for the visual container: 'default' (48px badge), 'sm' (36px badge for compact tables), or 'lg' (64px badge for page hero empty states).",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description: "Optional icon element passed directly into the visual container.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the visual container.",
      },
    ],
  },
  {
    name: "EmptyStateContent",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Central column slot holding Title, Description, and contextual text, constrained to max-w-md to ensure optimal reading line lengths.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
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
    name: "EmptyStateTitle",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Semantic explanation heading (<h3>) explaining why the region is currently empty.",
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
    name: "EmptyStateDescription",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Secondary contextual guidance paragraph (<p>) explaining what happened or what the user can do next.",
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
  {
    name: "EmptyStateActions",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Trailing interactive action controls using fluid flex layout: inline on wide, stacks/wraps cleanly on mobile.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the actions container.",
      },
    ],
  },
];

const EMPTY_STATE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "empty-state.tsx",
            type: "file",
            description: "Production EmptyState primitive and compound subcomponents.",
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

export default function EmptyStateDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 19
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Guidance Surface</Badge>
          <Badge variant="outline">HaloUI Liquid Glass</Badge>
          <Badge variant="outline">All-Device Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Empty State
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          No-data and no-result guidance surface engineered with container-aware responsive reflow,
          clear action hierarchy, and restrained HaloUI Liquid Glass optics.
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
        <EmptyStatePreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="empty-state" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Empty State distributes as a clean composition-first primitive with compound subcomponents.
        </p>
        <FileTree data={EMPTY_STATE_FILE_TREE} />
      </section>

      {/* Component Boundaries & Comparisons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Component Boundaries &amp; Semantic Roles
        </h2>
        <p className="text-sm text-muted-foreground">
          Preserving strict semantic separation between empty states, error states, and loading states
          ensures users never confuse an empty collection with a system failure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Empty State (Data Display 19)</span>
              <Badge variant="outline">No Data Guidance</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when a <strong>region currently has no records or items</strong>. Communicates that
              the application is operating normally, explains why nothing is shown, and offers clear
              creation or exploration paths.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Error State (Alert / Dialog)</span>
              <Badge variant="outline">System Failure</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when <strong>an operation, network request, or permission check failed</strong>.
              Errors require remediation (e.g. &ldquo;Failed to load projects. Check connection.&rdquo;)
              and must never be disguised as an empty state.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Loading (Skeleton / Spinner)</span>
              <Badge variant="outline">In-Flight Request</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use while <strong>data fetching is actively in progress</strong>. An empty state must
              never flash temporarily while records are loading over the network.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Onboarding (Tour / Stepper)</span>
              <Badge variant="outline">Structured Workflow</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>multi-step onboarding sequences</strong> with progress tracking. Empty
              State provides initial entry points into onboarding, but does not own task persistence.
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
          HaloUI Empty State requires <strong>zero JavaScript resize listeners</strong> or viewport
          polling hacks. It reflows automatically across all device and container sizes:
        </p>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Responsive Engineering Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Container Queries</span>
              <p className="text-muted-foreground">
                Marked with <code className="font-mono">@container/empty-state</code> to allow nested
                empty states to adapt to their immediate parent width, whether inside a sidebar or a modal.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Action Wrapping</span>
              <p className="text-muted-foreground">
                Actions position side-by-side on wide screens and stack automatically on narrow viewports
                without requiring manual props like <code className="font-mono">stackOnMobile</code>.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Zero Horizontal Overflow</span>
              <p className="text-muted-foreground">
                Titles and descriptions utilize <code className="font-mono">break-words min-w-0</code> to
                prevent long strings or button labels from overflowing container boundaries.
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
          HaloUI Empty State adheres to strict material hierarchy:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Subtle Outer Surface:</strong> When using{" "}
                <code className="font-mono">variant=&quot;glass&quot;</code>, a calm translucent boundary
                is rendered with balanced diffusion and 135° specular catch.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Calm Nested Materials:</strong> When placed inside a Card,
                Table, or Dialog, Empty State uses <code className="font-mono">variant=&quot;default&quot;</code>{" "}
                to prevent competing glass-on-glass noise.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Content Refraction:</strong> Icons, titles,
                descriptions, and buttons are never distorted by physical shaders.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Strictly No Default Glow:</strong> Halo Glow is reserved
                for exceptional status emphasis and is omitted from standard empty states.
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
        <EmptyStateDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited semantic HTML attributes across all
          Empty State components.
        </p>
        <PropsExplorer subcomponents={EMPTY_STATE_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
