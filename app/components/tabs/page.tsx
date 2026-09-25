import { Metadata } from "next";
import { TabsPreviewStage } from "./tabs-preview-stage";
import { TabsDemonstrations } from "./tabs-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Tabs — Navigation — HaloUI",
  description:
    "An accessible tabbed interface for switching between peer content views within the same context.",
};

const TABS_ROOT_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | number",
    default: "undefined",
    required: false,
    description: "The value of the currently active tab in controlled mode.",
  },
  {
    name: "defaultValue",
    type: "string | number",
    default: "undefined",
    required: false,
    description: "The initial active tab value in uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(value: any) => void",
    default: "undefined",
    required: false,
    description: "Event callback invoked when the active tab selection changes.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: "The visual flow and directional keyboard orientation of the tabs.",
  },
];

const TABS_LIST_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'line'",
    default: "'default'",
    required: false,
    description: "Visual treatment: 'default' renders contained surface pills, 'line' renders an underlined tab rail.",
  },
  {
    name: "activateOnFocus",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether arrow key focus automatically activates the tab. When false, activation requires Enter or Space.",
  },
  {
    name: "loopFocus",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether keyboard navigation wraps around when reaching either end of the tab list.",
  },
];

const TABS_TRIGGER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | number",
    default: "required",
    required: true,
    description: "Unique identifier associating this tab trigger with its corresponding TabsContent panel.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether this tab trigger is disabled from keyboard navigation and pointer selection.",
  },
];

const TABS_CONTENT_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | number",
    default: "required",
    required: true,
    description: "Identifier matching the associated TabsTrigger value to display when selected.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/tabs.tsx",
    type: "file",
    description: "Tabs, TabsList, TabsTrigger, and TabsContent composite primitive",
  },
  {
    name: "lib/utils.ts",
    type: "file",
    description: "Class name merging utility (cn)",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "HaloUI typography and design system tokens",
  },
];

export default function TabsDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation · 01
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Interactive Navigation
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tabs
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
          An accessible tabbed interface for switching between peer content views within the same context.
          Coordinates tab list roving focus, directional keyboard navigation, and corresponding tab panel visibility.
        </p>
      </header>

      {/* Critical Callouts */}
      <div className="space-y-4">
        <Callout type="note" title="Peer Views Boundary">
          <strong className="font-semibold">Tabs represent peer views within one context.</strong> Use ordinary navigation when each destination is primarily a separate page or hierarchical location.
        </Callout>
        <Callout type="warning" title="Focus & Selection Distinction">
          <strong className="font-semibold">Selected and focused are separate states.</strong> The active tab must retain a visible keyboard focus treatment when focused.
        </Callout>
        <Callout type="tip" title="Automatic Activation Performance">
          Automatic tab activation works best when switching panels is immediate. Avoid tying keyboard focus movement to slow blocking work.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Interactive Stage</h2>
        <TabsPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Tabs into your repository via the shadcn registry CLI:
        </p>
        <InstallCommand registry="tabs" />
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock
          code={`import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function BasicTabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        Overview panel content.
      </TabsContent>
      <TabsContent value="activity" className="mt-4">
        Activity panel content.
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        Settings panel content.
      </TabsContent>
    </Tabs>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Variants & Compositions</h2>
        <TabsDemonstrations />
      </section>

      {/* Architectural Distinctions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Architectural Distinctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
            <h4 className="text-sm font-semibold text-primary">Tabs</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Switches between peer content panels within a shared context. Manages WAI-ARIA tablist/tab/tabpanel roles and roving focus.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Segmented Control</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Selects a single mode or value for an operation. Operates as a radiogroup rather than managing document content panels.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Breadcrumb</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Communicates hierarchical location and ancestry. Operates as ordinary navigation links rather than a composite selection widget.
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Behavior */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Keyboard Behavior</h2>
        <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Tab / Shift+Tab:</strong> Enters or exits the tablist. Only the currently selected or focused tab is in the tab order (roving tabindex).
            </li>
            <li>
              <strong className="text-foreground">Arrow Left / Arrow Right:</strong> In horizontal orientation, moves focus to the previous or next tab. If loopFocus is enabled (default), wraps around boundaries.
            </li>
            <li>
              <strong className="text-foreground">Arrow Up / Arrow Down:</strong> In vertical orientation, moves focus vertically through the tab triggers.
            </li>
            <li>
              <strong className="text-foreground">Home / End:</strong> Jumps focus directly to the first or last enabled tab trigger in the list.
            </li>
            <li>
              <strong className="text-foreground">Enter / Space:</strong> In manual activation mode (<code className="font-mono text-xs">activateOnFocus={"{false}"}</code>), activates the currently focused tab.
            </li>
          </ul>
        </div>
      </section>

      {/* Props Tables */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Tabs (Root)</h3>
          <PropsTable rows={TABS_ROOT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">TabsList</h3>
          <PropsTable rows={TABS_LIST_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">TabsTrigger</h3>
          <PropsTable rows={TABS_TRIGGER_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">TabsContent</h3>
          <PropsTable rows={TABS_CONTENT_PROPS} />
        </div>
      </section>

      {/* File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
