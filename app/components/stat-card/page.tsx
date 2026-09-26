import { Metadata } from "next";
import { StatCardPreviewStage } from "./stat-card-preview-stage";
import { StatCardDemonstrations } from "./stat-card-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Stat Card — Data Display — HaloUI",
  description:
    "Opinionated single-metric summary surface communicating a primary quantitative value, category context, and decoupled trend sentiment.",
};

const STAT_CARD_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Sizing scale controlling internal padding and metric typography scale.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "Optical material intensity inherited from Card. Defaults to 'subtle' for peak rendering speed in dense grids.",
  },
  {
    name: "variant",
    type: "'default' | 'subtle' | 'outline' | 'elevated' | 'ghost'",
    default: "'default'",
    required: false,
    description: "Visual boundary variant. 'outline' provides a pure 1px border with zero blur overhead.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Enables hover lifting and focus ring if navigating to detailed metric drill-downs.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the Card surface tokens.",
  },
];

const STAT_CARD_TREND_PROPS: PropRow[] = [
  {
    name: "direction",
    type: "'up' | 'down' | 'neutral'",
    default: "'neutral'",
    required: false,
    description: "Geometric delta direction. Determines the icon arrow (↑ up, ↓ down, − line).",
  },
  {
    name: "sentiment",
    type: "'positive' | 'negative' | 'neutral'",
    default: "'neutral'",
    required: false,
    description: "Business desirability. Decoupled from direction: lower latency is positive, while lower revenue is negative.",
  },
  {
    name: "srLabel",
    type: "string",
    default: "undefined",
    required: false,
    description: "Explicit accessible announcement text for screen readers (e.g. 'Favorable trend: decreased 18%').",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    required: true,
    description: "The formatted quantitative delta string (e.g. '+14.2%', '-18ms').",
  },
];

const STAT_CARD_LABEL_PROPS: PropRow[] = [
  {
    name: "as",
    type: "'span' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'",
    default: "'span'",
    required: false,
    description: "Polymorphic heading tag for accessible document outline hierarchy.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional typography classes.",
  },
];

const STAT_CARD_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "stat-card.tsx",
            type: "file",
            description: "Server Component-compatible StatCard surface built directly on Card architecture.",
          },
          {
            name: "card.tsx",
            type: "file",
            description: "Base content surface defining boundary, geometry, and material tokens.",
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
        description: "Shared typography, spacing, and optical border tokens.",
      },
    ],
  },
];

export default function StatCardDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 02
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Stat Card
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Opinionated single-metric summary surface communicating a primary quantitative value, category context, and decoupled trend sentiment.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <StatCardPreviewStage />
      </section>

      {/* Critical Architecture Rule: Direction != Sentiment */}
      <div className="space-y-4">
        <Callout type="warning" title="Critical Design Rule: Direction Is NOT Sentiment">
          Never assume upward arrows are positive or downward arrows are negative. In systems engineering, a decrease in latency or error count is <strong className="text-foreground">positive</strong>, while a decrease in revenue or conversion is <strong className="text-foreground">negative</strong>. StatCard strictly decouples <code className="text-foreground">direction</code> (geometry) from <code className="text-foreground">sentiment</code> (meaning).
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="stat-card" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="stat-card-example.tsx"
          code={`import {
  StatCard,
  StatCardHeader,
  StatCardLabel,
  StatCardIcon,
  StatCardValue,
  StatCardFooter,
  StatCardTrend,
  StatCardDescription,
} from "@/components/ui/stat-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Clock01Icon } from "@hugeicons/core-free-icons";

export function LatencyMetric() {
  return (
    <StatCard className="max-w-xs">
      <StatCardHeader>
        <StatCardLabel>Round-trip Latency</StatCardLabel>
        <StatCardIcon>
          <HaloIcon icon={Clock01Icon} size={15} />
        </StatCardIcon>
      </StatCardHeader>

      <StatCardValue>14.2 ms</StatCardValue>

      <StatCardFooter>
        <StatCardTrend direction="down" sentiment="positive">
          -18.4%
        </StatCardTrend>
        <StatCardDescription>vs. 24h baseline</StatCardDescription>
      </StatCardFooter>
    </StatCard>
  );
}`}
        />
      </section>

      {/* Architectural Relationships: Stat Card vs Card vs Chart */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Architectural Relationships
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/70 bg-card/60 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Card</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              General-purpose content surface. Owns content grouping, visual boundaries, surface treatments, and spacing relationships. Does not own metric models.
            </p>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-primary">Stat Card</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Specialized single-metric composition built directly on Card. Communicates ONE primary measurable value with scannable category and trend context.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Chart</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Analytical visualization explaining distributions, time-series intervals, and multidimensional trends. Stat Card does not replace or duplicate charts.
            </p>
          </div>
        </div>
      </section>

      {/* Value Model & Formatting Guidance */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Value Model & Formatting Principles
        </h2>
        <div className="rounded-xl border border-border/70 bg-card/60 p-4 space-y-3">
          <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
            <li>
              <strong className="text-foreground">Zero is valid data</strong>: StatCard never evaluates values using truthiness checks like <code className="text-foreground">value || &quot;—&quot;</code>. A value of <code className="text-foreground">0</code> (0 active incidents, 0 downtime) renders as a genuine quantitative zero.
            </li>
            <li>
              <strong className="text-foreground">Formatting belongs to the consumer</strong>: Never hardcode currency symbols like <code className="text-foreground">$</code> or guess whether a number represents milliseconds, percentages, or bytes. Consumers supply localized strings formatted with <code className="text-foreground">Intl.NumberFormat</code>.
            </li>
            <li>
              <strong className="text-foreground">No automatic number animations</strong>: Default metric rendering is completely static. Automatic count-up effects or pulse animations on mount harm users with vestibular disorders and distract from dashboard scanning.
            </li>
          </ul>
        </div>
      </section>

      {/* Demonstrations */}
      <StatCardDemonstrations />

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">StatCard</h3>
          <PropsTable rows={STAT_CARD_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">StatCardTrend</h3>
          <PropsTable rows={STAT_CARD_TREND_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">StatCardLabel</h3>
          <PropsTable rows={STAT_CARD_LABEL_PROPS} />
        </div>
      </section>

      {/* Registry Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Registry Structure
        </h2>
        <FileTree items={STAT_CARD_FILE_TREE} />
      </section>
    </div>
  );
}
