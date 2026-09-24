import * as React from "react";
import type { Metadata } from "next";
import { FavoriteButtonPreviewStage } from "./favorite-button-preview-stage";
import {
  FavoriteButtonDefaultPreview,
  FavoriteButtonVariantsPreview,
  FavoriteButtonSizesPreview,
  FavoriteButtonLabeledPreview,
  FavoriteButtonMediaCardPreview,
  FavoriteButtonCustomIconsPreview,
} from "./favorite-button-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Favorite Button — Actions",
  description:
    "A specialized persistent toggle action for saving, bookmarking, or favoriting items across sessions.",
};

const PROPS_DATA = [
  {
    name: "pressed",
    type: "boolean",
    default: "undefined",
    required: false,
    description:
      "Controlled pressed state (canonical TogglePrimitive contract). When provided, component behaves as a controlled input.",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Initial pressed state for uncontrolled usage.",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean, eventDetails?: any) => void",
    default: "undefined",
    required: false,
    description:
      "Callback fired when the pressed state changes.",
  },
  {
    name: "favorited",
    type: "boolean",
    default: "undefined",
    required: false,
    description:
      "Convenience alias for `pressed` matching domain vocabulary. Shares identical state binding.",
  },
  {
    name: "onFavoritedChange",
    type: "(favorited: boolean) => void",
    default: "undefined",
    required: false,
    description:
      "Convenience alias for `onPressedChange` matching domain vocabulary.",
  },
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost"',
    default: '"default"',
    required: false,
    description:
      "Visual treatment honoring HaloUI's 10-layer physical liquid optical material engine. 'ghost' is recommended for media card overlays and image hero headers.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description:
      "Size geometry for the button: 'sm' (32px), 'default' (40px), or 'lg' (48px).",
  },
  {
    name: "icon",
    type: "React.ComponentType",
    default: "FavouriteIcon",
    required: false,
    description:
      "Custom Hugeicon component rendered when unfavorited (e.g. HeartIcon, StarIcon, Bookmark02Icon).",
  },
  {
    name: "activeIcon",
    type: "React.ComponentType",
    default: "FavouriteIcon",
    required: false,
    description:
      "Optional alternate Hugeicon rendered specifically when favorited.",
  },
  {
    name: "aria-label",
    type: "string",
    default: 'computed ("Remove from favorites" | "Add to favorites")',
    required: false,
    description:
      "Accessible label announced by assistive technologies. Automatically computes state-aware verbs if not explicitly overridden.",
  },
  {
    name: "children",
    type: "React.ReactNode | ((state: { pressed: boolean; favorited: boolean }) => React.ReactNode)",
    default: "undefined",
    required: false,
    description:
      "Optional text label for labeled presentations, or a dynamic render prop receiving current toggle state.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "FavoriteButton (Root)",
    description:
      "Base UI Toggle primitive root managing binary pressed state, pointer event normalization, and keyboard Space/Enter actuation.",
  },
  {
    name: "Liquid Glass Substrate",
    description:
      "Refractive optical backing with 10-layer physical composite, transitioning from clear glass to subtle rose tinting upon activation.",
  },
  {
    name: "Icon Glyph",
    description:
      "Accessible Hugeicon glyph with fill-current scaling on toggle, transitioning smoothly between rest line art and rich semantic active color.",
  },
  {
    name: "Halo Focus Ring",
    description:
      "Double-contrast perimeter operating independently outside material boundary for guaranteed WCAG 2.1 AA visibility.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Runtime Dependencies",
    items: [
      "@base-ui/react",
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["halo-icon"],
  },
  {
    title: "HaloUI Foundation Tokens",
    items: [
      "halo-liquid-glass",
      "halo-focus-ring",
      "halo-tactile-press",
      "--halo-focus-color",
      "--halo-focus-offset",
    ],
  },
];

const INSTALLED_FILES_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "favorite-button.tsx",
            type: "file",
            description: "Persistent toggle action for saving, bookmarking, or favoriting items.",
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
        description: "10-layer liquid optical physics and halo-focus-ring.",
      },
    ],
  },
];

export default function FavoriteButtonDocsPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">
            Actions · 09
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Production Ready
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Favorite Button
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A specialized persistent toggle action for saving, bookmarking, or favoriting items.
          Maintains binary state indefinitely until explicitly changed by the user, backed by
          HaloUI&apos;s physical liquid optical engine and Base UI&apos;s robust Toggle primitive.
        </p>
      </div>

      {/* Critical Principle Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Callout type="note" title="Persistent State Contract">
          <strong>Favorite Button state is persistent, not temporary.</strong> Unlike Copy Button
          which resets after 2000ms, Favorite Button stays favorited until the user clicks it again.
          It implements a true toggle contract backed by <code>aria-pressed</code>.
        </Callout>

        <Callout type="warning" title="Semantic Separation">
          <strong>Not a generic Reaction Button.</strong> Favorite Button represents a binary bookmark or
          save action. It does not display consumer counts or open reaction pickers. For count-backed
          reactions, use Reaction Button (Actions 10).
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <div className="space-y-4">
        <h2 id="preview" className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Stage
        </h2>
        <FavoriteButtonPreviewStage />
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="favorite-button" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Favorite Button works out-of-the-box in both uncontrolled mode (via{" "}
          <code className="text-foreground font-mono text-xs">defaultPressed</code>) and controlled mode
          (via <code className="text-foreground font-mono text-xs">favorited</code> and{" "}
          <code className="text-foreground font-mono text-xs">onFavoritedChange</code>).
        </p>
        <CodeBlock
          language="tsx"
          code={`import * as React from "react";
import { FavoriteButton } from "@/components/ui/favorite-button";

export function ArticleBookmark() {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <FavoriteButton
      favorited={isSaved}
      onFavoritedChange={setIsSaved}
      aria-label={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
    />
  );
}`}
        />
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Demonstrations */}
      <div className="space-y-10">
        <h2 id="examples" className="text-2xl font-bold tracking-tight text-foreground">
          Examples
        </h2>

        {/* 1. Default Interactive */}
        <div className="space-y-3">
          <h3 id="interactive-save" className="text-lg font-semibold tracking-tight text-foreground">
            1. Controlled Save & Live Readout
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrates controlled state synchronization with dynamic status text and accessible labels.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <FavoriteButtonDefaultPreview />
          </div>
        </div>

        {/* 2. Optical Variants */}
        <div className="space-y-3">
          <h3 id="material-variants" className="text-lg font-semibold tracking-tight text-foreground">
            2. Material Variants
          </h3>
          <p className="text-sm text-muted-foreground">
            All four HaloUI optical variants: Liquid Glass (default), Secondary (frosted crystal),
            Outline (hairline perimeter), and Ghost (minimalist overlay).
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <FavoriteButtonVariantsPreview />
          </div>
        </div>

        {/* 3. Standard Sizes */}
        <div className="space-y-3">
          <h3 id="sizes" className="text-lg font-semibold tracking-tight text-foreground">
            3. Standard Sizes
          </h3>
          <p className="text-sm text-muted-foreground">
            Three standardized ergonomic target sizes: sm (32px, 14px icon), default (40px, 18px icon),
            and lg (48px, 20px icon).
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <FavoriteButtonSizesPreview />
          </div>
        </div>

        {/* 4. Labeled Presentations */}
        <div className="space-y-3">
          <h3 id="labeled-variants" className="text-lg font-semibold tracking-tight text-foreground">
            4. Labeled Presentations
          </h3>
          <p className="text-sm text-muted-foreground">
            Supporting static text labels or dynamic state render props while preserving round pill geometry.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <FavoriteButtonLabeledPreview />
          </div>
        </div>

        {/* 5. Media Overlay & Card Integration */}
        <div className="space-y-3">
          <h3 id="media-card" className="text-lg font-semibold tracking-tight text-foreground">
            5. Media Overlay & Feed Cards
          </h3>
          <p className="text-sm text-muted-foreground">
            Ghost and Liquid Glass variants floating seamlessly over high-contrast media and gradient artwork.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <FavoriteButtonMediaCardPreview />
          </div>
        </div>

        {/* 6. Custom Domain Icons */}
        <div className="space-y-3">
          <h3 id="custom-icons" className="text-lg font-semibold tracking-tight text-foreground">
            6. Custom Domain Icons
          </h3>
          <p className="text-sm text-muted-foreground">
            Easily swap the default heart glyph with StarIcon, Bookmark02Icon, or other Hugeicons.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <FavoriteButtonCustomIconsPreview />
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>ARIA Pressed State:</strong> Operates as a true toggle control communicating{" "}
            <code className="text-foreground font-mono text-xs">aria-pressed=&quot;true&quot;</code> or{" "}
            <code className="text-foreground font-mono text-xs">&quot;false&quot;</code> to assistive technologies.
          </li>
          <li>
            <strong>State-Aware Accessible Names:</strong> When an explicit aria-label is omitted,
            computes dynamic action verbs (&quot;Add to favorites&quot; when unpressed, &quot;Remove from favorites&quot;
            when pressed) so users know exactly what activating the control will accomplish.
          </li>
          <li>
            <strong>Keyboard Interaction:</strong> Actuates seamlessly via{" "}
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-foreground">Space</kbd>{" "}
            and{" "}
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-foreground">Enter</kbd>.
          </li>
          <li>
            <strong>Independent Halo Focus Ring:</strong> Uses HaloUI&apos;s dual-contrast perimeter ring
            to remain clearly distinct from the optical glass boundary under all theme conditions.
          </li>
          <li>
            <strong>Disabled State Retention:</strong> When disabled, maintains its current favorited or
            unfavorited state visually and semantically rather than clearing it.
          </li>
        </ul>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <PropsTable rows={PROPS_DATA} />
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 id="dependencies" className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </div>

      {/* Installed Files */}
      <div className="space-y-4">
        <h2 id="installed-files" className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>
    </div>
  );
}
