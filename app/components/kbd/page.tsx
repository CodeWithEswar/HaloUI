import { Metadata } from "next";
import { KbdPreviewStage } from "./kbd-preview-stage";
import { KbdDemonstrations } from "./kbd-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Kbd — Navigation — HaloUI",
  description:
    "A semantic visual representation of keyboard keys and shortcut combinations used in instructions, menus, commands, and interface hints.",
};

const KBD_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    required: false,
    description: "Sizing variant for the keycap geometry (sm: 16px, default: 20px, lg: 24px height).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Custom CSS class names merged with default keycap styles.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    required: true,
    description: "The textual label or symbolic notation for the keyboard key (e.g. Esc, ⌘, Enter).",
  },
];

const KBD_GROUP_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Custom CSS class names for the semantic grouping wrapper.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    required: true,
    description: "Multiple <Kbd> components and visual separators representing a shortcut combination.",
  },
];

const KBD_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "kbd.tsx",
            type: "file",
            description: "Server Component-compatible semantic <kbd> primitive with physical keycap depth.",
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
        description: "Core physical token definitions and theme-adaptive border treatments.",
      },
    ],
  },
];

export default function KbdDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Navigation 16
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Kbd
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A semantic visual representation of keyboard keys and shortcut combinations used in instructions, menus, commands, and interface hints.
        </p>
      </div>

      {/* Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <KbdPreviewStage />
      </section>

      {/* Critical Mandate Callouts */}
      <div className="space-y-4">
        <Callout type="warning" title="Kbd Represents Keyboard Input; It Does Not Listen For It">
          Rendering <code className="text-foreground">Ctrl K</code> with Kbd does not register a keyboard shortcut, attach an event listener, or execute a command.
        </Callout>

        <Callout type="note" title="Authentic HTML Semantics">
          Use the native <code className="text-foreground">&lt;kbd&gt;</code> element for keyboard input notation. Do not make Kbd focusable or clickable simply because its visual shape resembles a button.
        </Callout>

        <Callout type="note" title="Platform Independence">
          Platform-specific shortcut labels belong to the application&apos;s shortcut system. Kbd renders the notation it is given rather than guessing the user&apos;s operating system during Server-Side Rendering.
        </Callout>

        <Callout type="note" title="Accessible Symbolic Notation">
          Familiar modifier symbols can reduce visual width, but symbolic notation should not make the shortcut impossible to understand for assistive-technology users or users unfamiliar with platform conventions.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="kbd" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="components/example.tsx"
          code={`import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function Example() {
  return (
    <p>
      Press <Kbd>Esc</Kbd> to exit, or{" "}
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>{" "}
      to open commands.
    </p>
  );
}`}
        />
      </section>

      {/* Core Architectural Principles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Core Architectural Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Pure Server Component</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              No <code className="text-foreground">&quot;use client&quot;</code> directive is required. Renders static, deterministic HTML instantly without client bundle hydration penalty.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Non-Interactive by Design</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Kbd is presentational text notation. It has no <code className="text-foreground">tabIndex</code>, no button role, and no click handlers. Parent controls manage interactivity.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Restrained Physical Depth</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Micro-elevation with a top specular hairline highlight and contact shadow creates authentic tactile keycap geometry without noisy blurs or glow distraction.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Preserved Text Selection</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Keycap strings remain fully selectable and copyable by users copying command documentation, keyboard cheat sheets, and instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations &amp; Combinations
        </h2>
        <KbdDemonstrations />
      </section>

      {/* Comparative Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Comparisons
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/70 bg-muted/30">
              <tr>
                <th className="p-3 font-semibold text-foreground">Component</th>
                <th className="p-3 font-semibold text-foreground">HTML Element</th>
                <th className="p-3 font-semibold text-foreground">Primary Purpose</th>
                <th className="p-3 font-semibold text-foreground">Interactivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-foreground">Kbd</td>
                <td className="p-3"><code className="text-foreground">&lt;kbd&gt;</code></td>
                <td className="p-3">Keyboard keycap and shortcut notation</td>
                <td className="p-3">Non-interactive text (parent owns focus)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Code</td>
                <td className="p-3"><code className="text-foreground">&lt;code&gt;</code></td>
                <td className="p-3">Computer code snippets and variable names</td>
                <td className="p-3">Non-interactive inline/block code</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Badge</td>
                <td className="p-3"><code className="text-foreground">&lt;span&gt;</code></td>
                <td className="p-3">Status, counts, and metadata tags</td>
                <td className="p-3">Non-interactive or clickable pill</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Button</td>
                <td className="p-3"><code className="text-foreground">&lt;button&gt;</code></td>
                <td className="p-3">Direct trigger for an immediate action</td>
                <td className="p-3">Fully interactive, focusable, keyboard operable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Kbd</h3>
          <PropsTable rows={KBD_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">KbdGroup</h3>
          <PropsTable rows={KBD_GROUP_PROPS} />
        </div>
      </section>

      {/* Anatomy & Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy &amp; File Structure
        </h2>
        <FileTree items={KBD_FILE_TREE} />
      </section>

      {/* Accessibility Checklist */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">Authentic &lt;kbd&gt; Semantics</span>
            Screen readers recognize keyboard input tags naturally according to user speech preferences.
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">No Fake Tab Stops</span>
            Does not inject <code className="text-foreground">tabindex</code> or button attributes that would disrupt parent tab order.
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">High Contrast Outlines</span>
            Borders provide clean keycap boundaries across all backgrounds without relying on low-opacity shadows alone.
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">Stable Line Height</span>
            Baseline-aligned geometry prevents line-height disruption when composed inside running paragraphs.
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <div className="rounded-xl border border-border/70 p-4 bg-card text-xs space-y-2">
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="font-medium text-foreground">clsx &amp; tailwind-merge</span>
            <span className="text-muted-foreground font-mono">via cn utility</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium text-foreground">External Dependencies</span>
            <span className="text-muted-foreground font-mono">None (0kB external runtime)</span>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Changelog
        </h2>
        <div className="rounded-xl border border-border/70 p-4 bg-card text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="font-semibold text-foreground">1.0.0</span>
            <span className="text-muted-foreground font-mono">2026-09-26</span>
          </div>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Initial production release of HaloUI Kbd. Implements native semantic &lt;kbd&gt; elements, Server Component compatibility, selectable text, and neoskeuomorphic micro-elevation.
          </p>
        </div>
      </section>
    </div>
  );
}
