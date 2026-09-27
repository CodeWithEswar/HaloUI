import { Metadata } from "next";
import { StatusBadgePreviewStage } from "./status-badge-preview-stage";
import { StatusBadgeDemonstrations } from "./status-badge-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Status Badge — Data Display — HaloUI",
  description:
    "Compact semantic state indicator communicating operational health, workflow phase, or system status with decoupled tone intent.",
};

const STATUS_BADGE_PROPS: PropRow[] = [
  {
    name: "tone",
    type: "'neutral' | 'positive' | 'warning' | 'critical' | 'info'",
    default: "'neutral'",
    required: false,
    description: "Explicit semantic tone. Decoupled from visible text so the component never embeds hard-coded business vocabulary.",
  },
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Compact sizing scale. 'sm' is 18px tall for dense data tables; 'default' is 20px; 'lg' is 24px.",
  },
  {
    name: "dot",
    type: "boolean",
    default: "true",
    required: false,
    description: "Renders an accessible, decorative dot indicator color-matched to the semantic tone.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "undefined",
    required: false,
    description: "Optional custom decorative icon component preceding the status text. Overrides the dot indicator.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the badge tokens.",
  },
];

const STATUS_BADGE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "status-badge.tsx",
            type: "file",
            description: "Server Component-compatible StatusBadge primitive specializing Badge.",
          },
          {
            name: "badge.tsx",
            type: "file",
            description: "Foundational compact inline label primitive.",
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

export default function StatusBadgeDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 07
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Status Badge
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Compact semantic state indicator communicating operational health, workflow phase, or system status with decoupled tone intent.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <StatusBadgePreviewStage />
      </section>

      {/* Architectural Guidance */}
      <div className="space-y-4">
        <Callout type="note" title="Semantic Intent Decoupled From Text Content">
          HaloUI displays status; it does not dictate business logic. Status Badge never inspects text strings (e.g. &quot;active&quot; or &quot;failed&quot;) to guess colors. The consumer provides the visible status copy and explicitly declares the semantic <code className="text-xs font-mono">tone</code>.
        </Callout>

        <Callout type="important" title="Color Independence Mandate (WCAG 2.1 AA)">
          Status meaning must never depend solely on color. The visible text communicates the actual state (e.g. &quot;Operational&quot;, &quot;Degraded&quot;). The indicator dot and icon are decorative visual reinforcements marked <code className="text-xs font-mono">aria-hidden=&quot;true&quot;</code>.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="status-badge" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="status-badge-example.tsx"
          code={`import { StatusBadge } from "@/components/ui/status-badge";

export function ServiceHealth() {
  return (
    <div className="flex items-center gap-2">
      <StatusBadge tone="positive">Operational</StatusBadge>
      <StatusBadge tone="warning">Degraded</StatusBadge>
      <StatusBadge tone="critical">Outage</StatusBadge>
      <StatusBadge tone="info">Processing</StatusBadge>
      <StatusBadge tone="neutral">Offline</StatusBadge>
    </div>
  );
}`}
        />
      </section>

      {/* Component Boundaries & Scope */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Boundaries &amp; Scope
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Primary Responsibility</th>
                <th className="p-3">Scope Boundary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Badge</td>
                <td className="p-3">Generic compact label (e.g. Beta, Pro, v2.4, 12)</td>
                <td className="p-3">No semantic health/status tone palette or indicator dots</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Status Badge</td>
                <td className="p-3">Compact state presentation (Operational, Degraded, Failed)</td>
                <td className="p-3">Non-interactive; no polling, WebSocket, or live region logic</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Alert</td>
                <td className="p-3">Multi-line contextual message requiring direct attention</td>
                <td className="p-3">Block-level surface with titles, descriptions, and action slots</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Toast</td>
                <td className="p-3">Transient system notification banner</td>
                <td className="p-3">Temporary viewport overlay managed by a notification stack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Anatomy & Semantic Tone Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Semantic Tone Model
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Tone</th>
                <th className="p-3">Semantic Meaning</th>
                <th className="p-3">Representative Consumer Statuses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-mono text-xs text-foreground">neutral</td>
                <td className="p-3">Baseline, inactive, or unconfigured state</td>
                <td className="p-3">Draft, Inactive, Offline, Paused, Archived</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-emerald-600 dark:text-emerald-400">positive</td>
                <td className="p-3">Healthy, operational, or successfully verified state</td>
                <td className="p-3">Operational, Active, Published, Healthy, Verified</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-amber-600 dark:text-amber-400">warning</td>
                <td className="p-3">Attention required, pending review, or degraded health</td>
                <td className="p-3">Degraded, Pending, Expiring, Awaiting Approval</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-rose-600 dark:text-rose-400">critical</td>
                <td className="p-3">Outage, failure, cancellation, or error condition</td>
                <td className="p-3">Outage, Failed, Cancelled, Blocked, Terminated</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-sky-600 dark:text-sky-400">info</td>
                <td className="p-3">Informational progress or transitional phase</td>
                <td className="p-3">Processing, In Review, Staging, Rebuilding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations &amp; QA Scenarios
        </h2>
        <StatusBadgeDemonstrations />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <PropsTable props={STATUS_BADGE_PROPS} />
      </section>

      {/* Installed Files */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree data={STATUS_BADGE_FILE_TREE} />
      </section>

      {/* Accessibility & Performance */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility &amp; Performance
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Zero Client JavaScript:</strong> <code className="text-xs font-mono">components/ui/status-badge.tsx</code> is a pure Server Component. It imports zero client hooks, imposes zero runtime state, and renders static semantic HTML.
            </li>
            <li>
              <strong className="text-foreground">Static Non-Interactive Element:</strong> Status Badge renders an inline <code className="text-xs font-mono">&lt;span&gt;</code> without keyboard focus, hover jumping, or cursor pointers.
            </li>
            <li>
              <strong className="text-foreground">No Automatic ARIA Live:</strong> Most statuses are static table or card records. Status Badge does not inject disruptive global live regions (<code className="text-xs font-mono">aria-live</code>) or alert roles.
            </li>
            <li>
              <strong className="text-foreground">Restrained Nested Material:</strong> Status Badge uses controlled opacity fills and hairline borders, preventing glass-on-glass visual clutter when rendered inside translucent Cards.
            </li>
            <li>
              <strong className="text-foreground">Table Performance:</strong> Designed to remain computationally lightweight across 100+ table records with zero layout thrashing or animation overhead.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
