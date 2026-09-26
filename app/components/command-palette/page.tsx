import { Metadata } from "next";
import { CommandPalettePreviewStage } from "./command-palette-preview-stage";
import { CommandPaletteDemonstrations } from "./command-palette-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Command Palette — Navigation — HaloUI",
  description:
    "A keyboard-first searchable interface for quickly finding and activating application commands and destinations.",
};

const COMMAND_PALETTE_PROPS: PropRow[] = [
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "HaloUI liquid optical glass material intensity level.",
  },
  {
    name: "closeOnSelect",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether activating a command item automatically triggers palette close.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when a command item requests palette close.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "Controlled search query string.",
  },
  {
    name: "onValueChange",
    type: "(query: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when search query changes.",
  },
];

const COMMAND_PALETTE_DIALOG_PROPS: PropRow[] = [
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the modal dialog overlay.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    required: false,
    description: "Default open state for uncontrolled usage.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when open state changes.",
  },
  {
    name: "title",
    type: "string",
    default: "'Command Palette'",
    required: false,
    description: "Accessible dialog title announced by screen readers.",
  },
  {
    name: "description",
    type: "string",
    default: "'Search and launch commands and navigation destinations.'",
    required: false,
    description: "Accessible dialog description announced by screen readers.",
  },
  {
    name: "shortcutKey",
    type: "string",
    default: "'k'",
    required: false,
    description: "Global keyboard key (combined with Cmd/Ctrl) to toggle open state.",
  },
  {
    name: "enableShortcut",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether the global keyboard shortcut listener is active.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Liquid glass material intensity level of the modal surface.",
  },
];

const COMMAND_PALETTE_TRIGGER_PROPS: PropRow[] = [
  {
    name: "label",
    type: "string",
    default: "'Search commands or destinations...'",
    required: false,
    description: "Placeholder text displayed in the discoverable trigger button.",
  },
  {
    name: "shortcut",
    type: "string",
    default: "'⌘K'",
    required: false,
    description: "Visual keyboard shortcut notation shown on the trigger.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced'",
    default: "'subtle'",
    required: false,
    description: "Material optical intensity of the trigger button surface.",
  },
];

const COMMAND_PALETTE_ITEM_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "derived",
    required: false,
    description: "Unique string value used for cmdk filtering and selection matching.",
  },
  {
    name: "onSelect",
    type: "(value: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked exactly once when the command is activated via Enter or click.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the command is disabled. Disabled commands cannot be activated or focused.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "undefined",
    required: false,
    description: "Leading Hugeicon slot visually identifying the command or destination.",
  },
  {
    name: "description",
    type: "ReactNode",
    default: "undefined",
    required: false,
    description: "Secondary contextual text or path hint below the primary title.",
  },
  {
    name: "shortcut",
    type: "string",
    default: "undefined",
    required: false,
    description: "Trailing presentation keyboard shortcut badge.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/command-palette.tsx",
    type: "file",
    description: "CommandPalette, CommandPaletteDialog, CommandPaletteTrigger, CommandPaletteInput, CommandPaletteList, CommandPaletteGroup, CommandPaletteItem, CommandPaletteEmpty, CommandPaletteSeparator, CommandPaletteShortcut, useCommandPaletteShortcut",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring currentColor inheritance and optical clarity",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "Physical liquid glass tokens for optical edge, depth glow, and tactile compression",
  },
];

export default function CommandPaletteDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 11
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Command Palette
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A keyboard-first searchable interface for quickly finding and activating application commands and destinations.
        </p>
      </header>

      {/* 1. Preview Stage */}
      <section className="space-y-4">
        <CommandPalettePreviewStage />
      </section>

      {/* Mandatory Architectural Callouts #81-#84 */}
      <div className="space-y-3">
        <Callout type="important">
          <strong>Command Palette is a launcher, not the application&apos;s command engine.</strong> HaloUI provides search, presentation, and activation behavior. The application owns commands, permissions, router navigation, and business effects.
        </Callout>
        <Callout type="warning">
          <strong>Displaying a shortcut does not register it.</strong> Shortcut labels communicate an existing keyboard command. Global shortcut registration must be implemented deliberately by the application or shared shortcut infrastructure.
        </Callout>
        <Callout type="note">
          <strong>Local command filtering and remote search are different responsibilities.</strong> Do not place network fetching, debouncing, or caching inside the base Command Palette. Local filtering should feel immediate and synchronous.
        </Callout>
        <Callout type="tip">
          <strong>Follow the semantics of the underlying accessible command primitive.</strong> Do not layer custom combobox, listbox, or active-descendant ARIA on top of an implementation that already manages those relationships through cmdk and Base UI Dialog.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the command palette primitive and its registry dependencies via the shadcn CLI:
        </p>
        <InstallCommand registry="command-palette" />
      </section>

      {/* 3. Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose the launcher using the compound component API:
        </p>
        <CodeBlock
          language="tsx"
          code={`import * as React from "react";
import {
  CommandPaletteDialog,
  CommandPaletteTrigger,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
} from "@/components/ui/command-palette";
import { HaloIcon } from "@/components/icons/halo-icon";
import { DashboardSquare01Icon, Folder01Icon } from "@hugeicons/core-free-icons";

export function QuickLauncher() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CommandPaletteTrigger onClick={() => setOpen(true)} />
      <CommandPaletteDialog open={open} onOpenChange={setOpen}>
        <CommandPaletteInput placeholder="Search commands or destinations..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
          <CommandPaletteGroup heading="Navigation">
            <CommandPaletteItem
              icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
              shortcut="⌘D"
              onSelect={() => window.location.href = "/dashboard"}
            >
              Go to Dashboard
            </CommandPaletteItem>
            <CommandPaletteItem
              icon={<HaloIcon icon={Folder01Icon} size={16} />}
              shortcut="⌘P"
              onSelect={() => window.location.href = "/projects"}
            >
              Open Projects
            </CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPaletteDialog>
    </>
  );
}`}
        />
      </section>

      {/* 4. Commands: Navigation vs Action Commands */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Commands</h2>
        <p className="text-sm text-muted-foreground">
          Command items conceptually represent either navigation destinations or immediate application actions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Navigation Commands</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Direct the user to a destination or page (e.g. <em>Go to Dashboard</em>, <em>View Analytics</em>). Activating a navigation command invokes the router or navigation callback and closes the modal palette.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Action Commands</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Trigger immediate application logic or mutation (e.g. <em>Create project</em>, <em>Invite member</em>). May close the palette or keep it open depending on consumer workflow requirements.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Query and Filtering */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Query and Filtering</h2>
        <p className="text-sm text-muted-foreground">
          Query text and the active command are separate pieces of state. Typing in <code className="text-xs font-mono">CommandPaletteInput</code> filters available items synchronously via cmdk&apos;s scoring algorithm. No debounce is applied to local command sets to ensure zero input lag.
        </p>
      </section>

      {/* 6. Groups and Separators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Groups and Separators</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="text-xs font-mono">CommandPaletteGroup</code> with a programmatic <code className="text-xs font-mono">heading</code> prop to structure commands by domain (e.g. Navigation, Actions, Settings). Headings are announced by assistive technologies and remain sticky during scrolling.
        </p>
      </section>

      {/* 7. Active Command vs Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Active Command</h2>
        <p className="text-sm text-muted-foreground">
          The visually active result is the command currently highlighted by keyboard arrows or pointer movement. It is represented by the <code className="text-xs font-mono">data-selected</code> attribute from cmdk. Active is not executed: activation only occurs when the user deliberately presses <kbd className="font-mono text-xs">Enter</kbd> or clicks the command.
        </p>
      </section>

      {/* 8. Empty State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Empty State</h2>
        <p className="text-sm text-muted-foreground">
          When no commands match the current query, <code className="text-xs font-mono">CommandPaletteEmpty</code> renders automatically. No matching results is a legitimate expected state, never an error.
        </p>
      </section>

      {/* 9. Disabled Commands */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Disabled Commands</h2>
        <p className="text-sm text-muted-foreground">
          Items with <code className="text-xs font-mono">disabled={'{true}'}</code> receive <code className="text-xs font-mono">data-disabled=&quot;true&quot;</code>, reducing opacity and preventing activation. Keyboard navigation automatically skips disabled items.
        </p>
      </section>

      {/* 10. Keyboard Shortcuts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Keyboard Shortcuts</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="text-xs font-mono">CommandPaletteShortcut</code> to display shortcut notation (e.g. <kbd className="font-mono text-xs">⌘K</kbd>, <kbd className="font-mono text-xs">⇧⌘P</kbd>). This is purely presentational. For global opening, use the included <code className="text-xs font-mono">useCommandPaletteShortcut</code> hook or your application&apos;s shortcut manager.
        </p>
      </section>

      {/* 11. Modal vs Embedded Composition */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Modal vs Embedded Composition</h2>
        <p className="text-sm text-muted-foreground">
          Command Palette supports two fundamental layout patterns:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Modal Composition (Dialog)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Uses <code className="text-xs font-mono">CommandPaletteDialog</code> to render inside a portalled modal with Halo Scrim backdrop attenuation, focus entrapment, Escape dismissal, and focus restoration upon close.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Embedded Composition (Inline)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Uses <code className="text-xs font-mono">CommandPalette</code> directly within any view, card, or sidebar without portal overhead.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Interactive Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Demonstrations</h2>
        <CommandPaletteDemonstrations />
      </section>

      {/* 13. Keyboard Behavior */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Keyboard Behavior</h2>
        <div className="rounded-xl border border-border/60 overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-muted/40 p-3 font-semibold text-foreground border-b border-border/40">
            <div>Key</div>
            <div>Context</div>
            <div>Action</div>
          </div>
          <div className="divide-y divide-border/30">
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd> / <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Ctrl+K</kbd></div>
              <div>Global Application</div>
              <div>Toggles the Command Palette dialog open or closed.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">↓</kbd> (Down Arrow)</div>
              <div>Inside Palette</div>
              <div>Moves active highlight to the next available command item.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">↑</kbd> (Up Arrow)</div>
              <div>Inside Palette</div>
              <div>Moves active highlight to the previous command item.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Enter</kbd></div>
              <div>Active Command</div>
              <div>Deliberately activates the currently highlighted command exactly once.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Esc</kbd></div>
              <div>Modal Palette</div>
              <div>Dismisses the modal dialog and returns focus to the trigger button.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Component Comparison Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Semantic Comparison</h2>
        <div className="rounded-xl border border-border/60 overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-muted/40 p-3 font-semibold text-foreground border-b border-border/40">
            <div>Component</div>
            <div>Primary Purpose</div>
            <div>Distinction</div>
          </div>
          <div className="divide-y divide-border/30">
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Command Palette</div>
              <div>Keyboard-first launcher for commands and destinations</div>
              <div>Flattens and groups searchable actions; modal or embedded overlay.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Combobox</div>
              <div>Form input for selecting a value from a filtered list</div>
              <div>Associated with form fields and single/multi data submission.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Navigation Menu</div>
              <div>Structured website/product destination navigation with rich flyouts</div>
              <div>Persistent header landmark with structured mega-menu panels.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Menubar</div>
              <div>Desktop-style persistent application action menus</div>
              <div>Horizontal bar of structured dropdown/submenus with roving focus.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Search Input</div>
              <div>Plain text query input field</div>
              <div>Raw text input primitive without embedded results list or command execution.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Props Tables */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props Reference</h2>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">CommandPalette</h3>
          <PropsTable rows={COMMAND_PALETTE_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">CommandPaletteDialog</h3>
          <PropsTable rows={COMMAND_PALETTE_DIALOG_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">CommandPaletteTrigger</h3>
          <PropsTable rows={COMMAND_PALETTE_TRIGGER_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">CommandPaletteItem</h3>
          <PropsTable rows={COMMAND_PALETTE_ITEM_PROPS} />
        </div>
      </section>

      {/* 16. Installed Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>

      {/* 17. Changelog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Changelog</h2>
        <div className="rounded-xl border border-border/60 p-4 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">v1.0.0</span>
            <span>&bull;</span>
            <span>2026-09-26</span>
            <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium">Initial Release</span>
          </div>
          <p className="leading-relaxed">
            Initial implementation of HaloUI Command Palette navigation launcher featuring 10-layer physical optical liquid glass, cmdk integration, Base UI modal dialog, accessible trigger button, and deterministic keyboard navigation.
          </p>
        </div>
      </section>
    </article>
  );
}
