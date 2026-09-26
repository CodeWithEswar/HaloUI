import { Metadata } from "next";
import { CardPreviewStage } from "./card-preview-stage";
import { CardDemonstrations } from "./card-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Card — Data Display — HaloUI",
  description:
    "Foundational content surface grouping related information, metrics, and actions with restrained liquid optical material.",
};

const CARD_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Sizing scale controlling padding (--card-spacing) and typography scale.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "Optical material intensity. Defaults to 'subtle' for visual calm and peak performance in dense dashboards.",
  },
  {
    name: "variant",
    type: "'default' | 'subtle' | 'outline' | 'elevated' | 'ghost'",
    default: "'default'",
    required: false,
    description: "Surface boundary variant. 'outline' provides a pure 1px border with zero blur overhead.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Enables interactive hover lifting, active compression, and focus-visible ring. Static cards must leave this false.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders as a Radix Slot child element to compose directly onto semantic anchors (<a>) or Next.js <Link>.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the card surface tokens.",
  },
];

const CARD_HEADER_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders as a Slot child element.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional classes. Automatically applies a two-column responsive grid when CardAction is present.",
  },
];

const CARD_TITLE_PROPS: PropRow[] = [
  {
    name: "as",
    type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'",
    default: "'h3'",
    required: false,
    description: "Polymorphic heading tag to maintain strict document outline hierarchy (WCAG 2.1 AA).",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders as a Slot child element.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional heading classes.",
  },
];

const CARD_FOOTER_PROPS: PropRow[] = [
  {
    name: "divided",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies a top border divider separating the footer from primary content.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders as a Slot child element.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional footer classes.",
  },
];

const CARD_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "card.tsx",
            type: "file",
            description: "Server Component-compatible Card surface with polymorphic titles, asChild slots, and restrained optical intensity.",
          },
        ],
      },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [
      {
        name: "utils.ts",
        type: "file",
        description: "Shared Tailwind class merging utility (cn).",
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
        description: "Card spacing variables, corner radii, and theme-adaptive border tokens.",
      },
    ],
  },
];

export default function CardDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 01
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Card
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Foundational content surface that groups related information, metrics, and actions into a visually coherent region with restrained Liquid Glass material.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <CardPreviewStage />
      </section>

      {/* Critical Design Mandate */}
      <div className="space-y-4">
        <Callout type="warning" title="Data Display Surfaces Are Not Floating Overlays">
          Unlike transient modals, popovers, or floating docks, Data Display cards commonly appear in dense grids of 12 to 24 units. Card defaults to <code className="text-foreground">intensity=&quot;subtle&quot;</code> with minimal blur (2px) to guarantee zero frame drops, excellent text contrast, and visual calm across full dashboards.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="card" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="card-example.tsx"
          code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExampleCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Security Audit</CardTitle>
        <CardDescription>Automated compliance evaluation against SOC2 Type II standards.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">All 48 edge access controls satisfied.</p>
      </CardContent>
      <CardFooter divided>
        <Button size="sm">Export Report</Button>
      </CardFooter>
    </Card>
  );
}`}
        />
      </section>

      {/* When to use vs When not to use */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Guidance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              When to use Card
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>Grouping related information into a scannable, visually distinct module.</li>
              <li>Dashboard sections, summaries, entity overviews, and settings groups.</li>
              <li>Resource cards with structured headers, descriptions, and metadata.</li>
              <li>Content modules requiring consistent layout and concentric geometry.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              When NOT to use Card
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>Do not wrap every individual form field, table row, or list item in a Card (&quot;card soup&quot;).</li>
              <li>Do not use Card as a substitute for Button. Static cards must not imply clickability.</li>
              <li>Do not use Card as an application-shell Panel or layout container.</li>
              <li>For standalone single metrics, compose <code className="text-foreground">StatCard</code> rather than inventing custom KPI cards.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <div className="rounded-xl border border-border/70 bg-card/60 p-4 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Card is engineered as compound composition. Every section is optional, meaning consumers only render the elements their content requires:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;Card&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Root surface defining boundary, geometry, and material intensity.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;CardHeader&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Responsive grid container positioning title, description, and action.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;CardTitle&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Polymorphic heading (h1–h6 or div) establishing section hierarchy.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;CardDescription&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Supporting contextual text subordinate to the title.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;CardAction&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Header action slot for IconButtons, menus, or badge indicators.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;CardContent&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Unconstrained primary content region.</p>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
              <span className="font-mono text-xs font-semibold text-foreground">&lt;CardFooter&gt;</span>
              <p className="text-[11px] text-muted-foreground mt-1">Supporting actions or metadata with optional divided top border.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrations */}
      <CardDemonstrations />

      {/* Interactive Cards & Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Cards & Semantic Links
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Static Cards must remain completely static without focus outlines or hover translation. When an entire Card needs to navigate, use <code className="text-foreground">asChild</code> with an anchor link:
        </p>

        <CodeBlock
          language="tsx"
          filename="interactive-card.tsx"
          code={`import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Correct: Genuine semantic anchor with asChild
export function NavigableCard() {
  return (
    <Card asChild interactive>
      <Link href="/analytics/edge">
        <CardHeader>
          <CardTitle>Edge Telemetry</CardTitle>
          <CardDescription>Real-time edge worker performance metrics.</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}`}
        />

        <Callout type="tip" title="Never Nest Interactive Elements Inside Interactive Cards">
          Do not place <code className="text-foreground">&lt;Button&gt;</code>, dropdown triggers, or nested links inside an interactive card anchor. Nested interactive elements violate WAI-ARIA and HTML specifications, causing confusing keyboard focus and accessibility screen reader failures.
        </Callout>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Card</h3>
          <PropsTable rows={CARD_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">CardHeader</h3>
          <PropsTable rows={CARD_HEADER_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">CardTitle</h3>
          <PropsTable rows={CARD_TITLE_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">CardFooter</h3>
          <PropsTable rows={CARD_FOOTER_PROPS} />
        </div>
      </section>

      {/* File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Registry Structure
        </h2>
        <FileTree items={CARD_FILE_TREE} />
      </section>
    </div>
  );
}
