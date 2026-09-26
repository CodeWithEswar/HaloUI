import { Metadata } from "next";
import { MenubarPreviewStage } from "./menubar-preview-stage";
import { MenubarDemonstrations } from "./menubar-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Menubar — Navigation — HaloUI",
  description:
    "An accessible persistent command bar for organizing related application actions into keyboard-operable menus.",
};

const MENUBAR_ROOT_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional CSS classes applied to the persistent horizontal menubar root container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Compound MenubarMenu categories composing the horizontal command bar.",
  },
];

const MENUBAR_TRIGGER_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the top-level category trigger button.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Concise label for the top-level command category (e.g. File, Edit, View, Help).",
  },
];

const MENUBAR_CONTENT_PROPS: PropRow[] = [
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: "Alignment of the floating menu content relative to the parent category trigger.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "8",
    required: false,
    description: "Distance in pixels between the category trigger and floating liquid glass menu surface.",
  },
  {
    name: "alignOffset",
    type: "number",
    default: "-4",
    required: false,
    description: "Horizontal pixel offset for optical alignment with the category trigger.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the popover menu container surface.",
  },
];

const MENUBAR_ITEM_PROPS: PropRow[] = [
  {
    name: "onSelect",
    type: "(event: Event) => void",
    default: "undefined",
    required: false,
    description: "Event handler called when the command is activated via pointer click, Enter, or Space.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the command item is disabled. Disabled items are skipped during keyboard roving.",
  },
  {
    name: "variant",
    type: "'default' | 'destructive'",
    default: "'default'",
    required: false,
    description: "Visual intent. 'destructive' applies warning red color and hover state for irreversible actions.",
  },
  {
    name: "inset",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to inset the item content to align with checkbox and radio items in the same menu.",
  },
];

const MENUBAR_CHECKBOX_PROPS: PropRow[] = [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the binary menu preference is currently checked.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when the user toggles the checkbox item.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the binary toggle is disabled.",
  },
];

const MENUBAR_RADIO_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: true,
    description: "Unique value identifying this radio option within the parent MenubarRadioGroup.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether this radio setting option is disabled.",
  },
];

const MENUBAR_SUB_PROPS: PropRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Composes MenubarSubTrigger and MenubarSubContent for secondary cascade levels.",
  },
];

const MENUBAR_SHORTCUT_PROPS: PropRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Accessible textual representation of the keyboard shortcut (e.g. ⌘S, ⇧⌘Z).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Custom classes applied to the keyboard shortcut label.",
  },
];

const MENUBAR_SEPARATOR_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional custom classes applied to the horizontal divider between command clusters.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/menubar.tsx",
    type: "file",
    description: "Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring currentColor inheritance and optical clarity",
  },
  {
    name: "lib/utils.ts",
    type: "file",
    description: "Class name merging utility (cn)",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "Liquid glass optical surfaces, focus ring tokens, and neoskeuomorphic depth variables",
  },
];

export default function MenubarDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 05
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Menubar
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible persistent command bar for organizing related application actions into keyboard-operable menus with composite roving focus and liquid optical clarity.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <MenubarPreviewStage />
      </section>

      {/* Core Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="note">
          <strong>Menubar organizes application commands, not site navigation.</strong> Use Navigation Menu, Sidebar, or ordinary links when the primary purpose is moving between destinations.
        </Callout>
        <Callout type="tip">
          <strong>Shortcut labels are presentation.</strong> Displaying <code className="font-mono text-xs">Ctrl+S</code> or <code className="font-mono text-xs">⌘S</code> does not register that shortcut. Applications own keyboard shortcut handling and conflict management.
        </Callout>
        <Callout type="important">
          <strong>Menubar provides interaction semantics and command presentation.</strong> The consuming application owns what each command actually does, including file systems, undo/redo stacks, and mutation workflows.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the menubar primitive and its tokens into your project via the shadcn CLI:
        </p>
        <InstallCommand registry="menubar" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose persistent top-level triggers, menu items, and presentation shortcuts:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@/components/ui/menubar";

export function AppCommandBar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => console.log("New file")}>
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => console.log("Save")}>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            Quit
            <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`}
        />
      </section>

      {/* 4. Complete Demonstrations */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Demonstrations &amp; Patterns
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore presentation shortcuts, binary checkboxes, mutually exclusive radio groups, shallow submenus, destructive commands, and checked+focus state contrast.
          </p>
        </div>
        <MenubarDemonstrations />
      </section>

      {/* 5. Architectural Semantic Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Command vs Navigation Semantic Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Primitive</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Primary Purpose</th>
                <th className="p-3 border-b border-border">Core Content</th>
                <th className="p-3 border-b border-border">Keyboard Interaction Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-semibold text-foreground">Menubar</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Application Command Execution</td>
                <td className="p-3 text-muted-foreground">Actions, toggles, settings (File, Edit, View)</td>
                <td className="p-3 text-muted-foreground">Arrow keys rove categories and items; Esc dismisses; Space/Enter activates</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Navigation Menu</td>
                <td className="p-3 text-muted-foreground">Site &amp; Product Navigation</td>
                <td className="p-3 text-muted-foreground">Routes, marketing links, documentation pages</td>
                <td className="p-3 text-muted-foreground">Tab and Arrow navigation through real links; flyout disclosures</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Sidebar</td>
                <td className="p-3 text-muted-foreground">Application Layout &amp; Destinations</td>
                <td className="p-3 text-muted-foreground">Primary hierarchical navigation links &amp; disclosures</td>
                <td className="p-3 text-muted-foreground">Normal document Tab order; Enter activates links; disclosure toggles</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Toolbar</td>
                <td className="p-3 text-muted-foreground">Immediate Direct Actions</td>
                <td className="p-3 text-muted-foreground">Buttons, toggles, controls exposed without menus</td>
                <td className="p-3 text-muted-foreground">Arrow roving or standard Tab order</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Command Palette</td>
                <td className="p-3 text-muted-foreground">Searchable Command Discovery</td>
                <td className="p-3 text-muted-foreground">Filterable fuzzy query index of all actions</td>
                <td className="p-3 text-muted-foreground">Typeahead filter, Up/Down navigation, Enter activates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Keyboard Behavior Specification */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation Specification
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Key / Combo</th>
                <th className="p-3 border-b border-border">Context</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Tab / Shift+Tab</td>
                <td className="p-3 text-muted-foreground">Menubar Root</td>
                <td className="p-3 text-muted-foreground">Enters or exits the menubar composite widget. Does not tab between items.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Arrow Right / Left</td>
                <td className="p-3 text-muted-foreground">Top-Level Triggers</td>
                <td className="p-3 text-muted-foreground">Moves focus to adjacent category trigger. If a menu is open, opens adjacent menu.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Arrow Down / Enter / Space</td>
                <td className="p-3 text-muted-foreground">Top-Level Trigger</td>
                <td className="p-3 text-muted-foreground">Opens the menu and focuses the first non-disabled item.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Arrow Down / Up</td>
                <td className="p-3 text-muted-foreground">Menu Content</td>
                <td className="p-3 text-muted-foreground">Roves focus sequentially through interactive items; skips disabled items and separators.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Arrow Right</td>
                <td className="p-3 text-muted-foreground">Submenu Trigger</td>
                <td className="p-3 text-muted-foreground">Opens the submenu and places focus on the first item within it.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Arrow Left / Escape</td>
                <td className="p-3 text-muted-foreground">Submenu Content</td>
                <td className="p-3 text-muted-foreground">Closes the submenu and restores focus to the parent SubmenuTrigger.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Escape</td>
                <td className="p-3 text-muted-foreground">Menu Content</td>
                <td className="p-3 text-muted-foreground">Closes the active menu and restores focus to the category trigger.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Home / End</td>
                <td className="p-3 text-muted-foreground">Menu Content</td>
                <td className="p-3 text-muted-foreground">Moves focus directly to the first or last enabled menu item.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Printable Character</td>
                <td className="p-3 text-muted-foreground">Menu Content</td>
                <td className="p-3 text-muted-foreground">Typeahead: moves focus to the next item matching the typed character sequence.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Props API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">Menubar</h3>
          <p className="text-sm text-muted-foreground">Horizontal roving composite root container.</p>
          <PropsTable rows={MENUBAR_ROOT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarTrigger</h3>
          <p className="text-sm text-muted-foreground">Top-level category trigger button.</p>
          <PropsTable rows={MENUBAR_TRIGGER_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarContent</h3>
          <p className="text-sm text-muted-foreground">Floating liquid glass menu surface.</p>
          <PropsTable rows={MENUBAR_CONTENT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarItem</h3>
          <p className="text-sm text-muted-foreground">Actionable command item within a menu.</p>
          <PropsTable rows={MENUBAR_ITEM_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarCheckboxItem</h3>
          <p className="text-sm text-muted-foreground">Binary toggleable menu preference item.</p>
          <PropsTable rows={MENUBAR_CHECKBOX_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarRadioItem</h3>
          <p className="text-sm text-muted-foreground">Single-selection option inside a MenubarRadioGroup.</p>
          <PropsTable rows={MENUBAR_RADIO_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarSub</h3>
          <p className="text-sm text-muted-foreground">Submenu coordinator managing nested trigger and content levels.</p>
          <PropsTable rows={MENUBAR_SUB_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarShortcut</h3>
          <p className="text-sm text-muted-foreground">Typography badge displaying hotkeys and modifier symbols.</p>
          <PropsTable rows={MENUBAR_SHORTCUT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">MenubarSeparator</h3>
          <p className="text-sm text-muted-foreground">Optical divider segmenting related command clusters.</p>
          <PropsTable rows={MENUBAR_SEPARATOR_PROPS} />
        </div>
      </section>

      {/* 8. Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Anatomy</h2>
        <p className="text-sm text-muted-foreground">
          The Menubar compound API separates structure, triggers, floating surfaces, commands, and settings into dedicated composable primitives:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;Menubar /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Composite roving bar anchoring all category triggers.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarMenu /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">State context coordinator for an individual command category.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarTrigger /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Button opening the category menu and receiving roving focus.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarContent /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Portalled liquid optical surface containing command items.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarItem /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Standard command item invoking application callbacks.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarCheckboxItem /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Persistent binary option with an integrated check indicator.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarRadioGroup /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Mutually exclusive setting group managing active radio state.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;MenubarSub /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Submenu coordinator for secondary nested command levels.</p>
          </div>
        </div>
      </section>

      {/* 9. Installed Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <p className="text-sm text-muted-foreground">
          Files installed in your repository when adding the Menubar primitive:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>

      {/* 10. Accessibility & Compliance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility &amp; Standards
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            Menubar implements the W3C WAI-ARIA Menubar Design Pattern with full WCAG 2.1 AA compliance:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>ARIA Roles:</strong> Renders <code className="font-mono text-xs">role="menubar"</code> on the root, <code className="font-mono text-xs">role="menuitem"</code> on triggers and items, <code className="font-mono text-xs">role="menuitemcheckbox"</code> on checkbox items, and <code className="font-mono text-xs">role="menuitemradio"</code> on radio items.
            </li>
            <li>
              <strong>Focus Restoration:</strong> Dismissing a menu restores focus directly to the activating category trigger.
            </li>
            <li>
              <strong>Independent Focus Contrast:</strong> Checked states and keyboard focus rings are visually distinct, ensuring keyboard users always know which item has focus regardless of checked state.
            </li>
            <li>
              <strong>Reduced Motion:</strong> Menus transition instantly when <code className="font-mono text-xs">prefers-reduced-motion: reduce</code> is active.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
