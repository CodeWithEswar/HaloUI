import { Metadata } from "next";
import { SpinnerPreviewStage } from "./spinner-preview-stage";
import { SpinnerDemonstrations } from "./spinner-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Spinner — Feedback & Status 07 — HaloUI",
  description:
    "Indeterminate activity indicator engineered with pure SVG stroke geometry, currentColor inheritance, zero-cost CSS rotation, and reduced-motion fallbacks.",
};

const SPINNER_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Spinner",
    kind: "Component",
    maturity: "stable",
    description:
      "Indeterminate activity indicator primitive. Features pure SVG geometry, currentColor color inheritance, zero-cost CSS animations, and reduced-motion fallbacks.",
    inheritedProps: {
      element: "React.ComponentProps<'svg'>",
      description: "Inherits standard SVG attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'sm'",
        required: false,
        description:
          "Geometric scale: 'xs' (12px), 'sm' (16px, button standard), 'md' (20px), 'lg' (24px), or 'xl' (32px).",
      },
      {
        name: "variant",
        type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'",
        default: "'default'",
        required: false,
        description:
          "Semantic color tone: 'default' (inherits currentColor), 'primary' (brand blue), 'secondary', 'success', 'warning', 'destructive', or 'muted'.",
      },
      {
        name: "label",
        type: "string",
        default: "'Loading'",
        required: false,
        description:
          "Accessible name announced by screen readers. Set to undefined or empty string if accompanied by visible loading text to prevent duplicate announcements.",
      },
      {
        name: "strokeWidth",
        type: "number",
        default: "2.75",
        required: false,
        description: "Stroke thickness of the SVG arc path.",
      },
    ],
  },
];

const SPINNER_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "spinner.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "directory",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
      },
      {
        name: "halo-material.css",
        type: "file",
      },
    ],
  },
];

export default function SpinnerDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 07
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            WAI-ARIA role=&quot;status&quot;
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            currentColor Inheritance
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Spinner</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Indeterminate activity indicator engineered with pure SVG stroke geometry, currentColor inheritance, zero-cost CSS rotation, and reduced-motion fallbacks.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <SpinnerPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Spinner directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="spinner" />
      </section>

      {/* Anatomy & File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Spinner within your design system:
        </p>
        <FileTree files={SPINNER_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <SpinnerDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={SPINNER_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">currentColor Inheritance</h4>
            <p className="text-muted-foreground leading-relaxed">
              Defaults to <code className="font-mono text-xs">currentColor</code> stroke styling. Seamlessly matches parent button text, link colors, and inverted dark mode backgrounds with zero CSS specificity overrides.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Deliberate Reduced Motion</h4>
            <p className="text-muted-foreground leading-relaxed">
              Under <code className="font-mono text-xs">prefers-reduced-motion: reduce</code>, rotation is immediately halted (<code className="font-mono text-xs">motion-reduce:animate-none</code>) with a static busy arc preserving essential state communication without triggering vestibular discomfort.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Lightweight Zero-Cost Rendering</h4>
            <p className="text-muted-foreground leading-relaxed">
              Features pure CSS rotation on a single SVG element. Strictly zero canvas loops, zero WebGL shaders, zero per-frame React state, and zero backdrop-filter layers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Zero Layout Shift</h4>
            <p className="text-muted-foreground leading-relaxed">
              Standard sizes (<code className="font-mono text-xs">sm</code>, <code className="font-mono text-xs">xs</code>) match button glyph line-heights exactly. Never causes button height jumping when toggling loading states.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
