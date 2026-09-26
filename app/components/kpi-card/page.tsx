import { Metadata } from "next";
import { KpiCardPreviewStage } from "./kpi-card-preview-stage";
import { KpiCardDemonstrations } from "./kpi-card-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "KPI Card — Data Display — HaloUI",
  description:
    "Performance-oriented metric surface communicating a primary quantitative value, delta, decoupled trend sentiment, target/SLA baselines, and optional bounded progress.",
};

const KPI_CARD_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Sizing scale controlling internal padding and typography hierarchy.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "Optical material intensity. Defaults to 'subtle' for peak rendering speed in dense grids.",
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

const KPI_CARD_TREND_PROPS: PropRow[] = [
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
    description: "The formatted quantitative delta string (e.g. '+0.021%', '-18.4%').",
  },
];

const KPI_CARD_PROGRESS_PROPS: PropRow[] = [
  {
    name: "value",
    type: "number",
    default: "undefined",
    required: true,
    description: "Current completion or progress value towards the target baseline (e.g. 85).",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    required: false,
    description: "Maximum boundary value.",
  },
  {
    name: "sentiment",
    type: "'positive' | 'negative' | 'neutral' | 'warning'",
    default: "'positive'",
    required: false,
    description: "Semantic indicator color for the progress fill. Decoupled from percentage value.",
  },
  {
    name: "aria-label",
    type: "string",
    default: "'Target progress'",
    required: false,
    description: "Accessible label announced to assistive technologies.",
  },
];

const KPI_CARD_TARGET_STATUS_PROPS: PropRow[] = [
  {
    name: "sentiment",
    type: "'positive' | 'negative' | 'neutral' | 'warning'",
    default: "'neutral'",
    required: false,
    description: "Semantic status color (emerald, rose, amber, or muted). Never assumes higher is better.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    required: true,
    description: "Target status label (e.g. 'Within SLA', 'Degraded', '98.8% of goal').",
  },
];

const KPI_CARD_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "kpi-card.tsx",
            type: "file",
            description: "Server Component-compatible KpiCard surface built directly on Card architecture.",
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

export default function KpiCardDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 03
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          KPI Card
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Performance-oriented metric surface communicating a primary quantitative value, delta, decoupled trend sentiment, target/SLA baselines, and optional bounded progress.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <KpiCardPreviewStage />
      </section>

      {/* Critical Architecture Callouts */}
      <div className="space-y-4">
        <Callout type="warning" title="Direction Is NOT Sentiment">
          Never assume upward arrows are positive or downward arrows are negative. In systems engineering, a decrease in latency or error rate is <strong className="text-foreground">positive</strong>, while a decrease in revenue is <strong className="text-foreground">negative</strong>. KpiCard strictly decouples <code className="text-foreground">direction</code> (geometry) from <code className="text-foreground">sentiment</code> (meaning).
        </Callout>

        <Callout type="important" title="Targets Do NOT Assume 'Higher Is Better'">
          Some KPIs are healthiest when low (p99 latency, error rates, cloud bill overages). Others are healthiest within a specific range (CPU utilization 50–70%). KpiCard allows consumers to explicitly provide the target sentiment rather than naively evaluating <code className="text-foreground">value &gt;= target</code>.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="kpi-card" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="kpi-card-example.tsx"
          code={`import {
  KpiCard,
  KpiCardHeader,
  KpiCardLabel,
  KpiCardAction,
  KpiCardValue,
  KpiCardTrend,
  KpiCardComparison,
  KpiCardTarget,
  KpiCardTargetLabel,
  KpiCardTargetValue,
  KpiCardTargetStatus,
  KpiCardProgress,
  KpiCardFooter,
} from "@/components/ui/kpi-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

export function LatencyKpi() {
  return (
    <KpiCard className="max-w-sm">
      <KpiCardHeader>
        <KpiCardLabel>P99 Round-trip Latency</KpiCardLabel>
        <KpiCardAction>
          <button type="button" className="text-muted-foreground hover:text-foreground p-1">
            <HaloIcon icon={InformationCircleIcon} size={14} />
          </button>
        </KpiCardAction>
      </KpiCardHeader>

      <KpiCardValue>14.2 ms</KpiCardValue>

      <KpiCardFooter>
        <KpiCardTrend direction="down" sentiment="positive">
          -18.4%
        </KpiCardTrend>
        <KpiCardComparison>vs 24h baseline</KpiCardComparison>
      </KpiCardFooter>

      <KpiCardProgress value={85} sentiment="positive" aria-label="SLA compliance" />

      <KpiCardTarget>
        <KpiCardTargetLabel>Target: <KpiCardTargetValue>&lt; 25 ms</KpiCardTargetValue></KpiCardTargetLabel>
        <KpiCardTargetStatus sentiment="positive">Within SLA</KpiCardTargetStatus>
      </KpiCardTarget>
    </KpiCard>
  );
}`}
        />
      </section>

      {/* Comparison: Stat Card vs KPI Card */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Stat Card vs. KPI Card
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Characteristic</th>
                <th className="p-3">Stat Card</th>
                <th className="p-3">KPI Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Core Question</td>
                <td className="p-3">"What is the number?"</td>
                <td className="p-3">"How is this metric performing in context?"</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Anatomy Hierarchy</td>
                <td className="p-3">Label + Value + Category Icon + Simple Delta</td>
                <td className="p-3">Label + Value + Delta + Explicit Baseline + Target SLA + Progress + Sparkline</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Target / SLA Context</td>
                <td className="p-3">None</td>
                <td className="p-3">Explicit Target Label, Target Value, and Semantic Status</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Progress Visualization</td>
                <td className="p-3">None</td>
                <td className="p-3">Bounded, accessible progress bar with matching sentiment fill</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Visualization Slot</td>
                <td className="p-3">None</td>
                <td className="p-3">Compact container slot for lightweight SVG sparklines</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Defensive Design & Edge Cases
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Telemetry metrics operate across extreme data spectrums. HaloUI establishes strict safeguards for production data integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Zero is Meaningful Telemetry</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zero (<code className="text-foreground font-mono">0</code>, <code className="text-foreground font-mono">0.00%</code>, <code className="text-foreground font-mono">$0</code>) is valid data—such as 0 unhandled panics or 0 dropped packets. Primitives never use truthy fallbacks (<code className="text-foreground font-mono">&#123;value || "—"&#125;</code>) that inadvertently mask zero as unavailable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Consumer-Owned Formatting</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Currencies, locale separators, units (<code className="text-foreground font-mono">ms</code>, <code className="text-foreground font-mono">MB/s</code>, <code className="text-foreground font-mono">₹</code>, <code className="text-foreground font-mono">$</code>), and percentage point changes are formatted by the consumer. HaloUI does not hardcode US currencies or enforce client-side counting animation tweens.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations & Variants
        </h2>
        <KpiCardDemonstrations />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">KpiCard</h3>
          <PropsTable rows={KPI_CARD_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">KpiCardTrend</h3>
          <PropsTable rows={KPI_CARD_TREND_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">KpiCardProgress</h3>
          <PropsTable rows={KPI_CARD_PROGRESS_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">KpiCardTargetStatus</h3>
          <PropsTable rows={KPI_CARD_TARGET_STATUS_PROPS} />
        </div>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Registry Structure
        </h2>
        <FileTree items={KPI_CARD_FILE_TREE} />
      </section>
    </div>
  );
}
