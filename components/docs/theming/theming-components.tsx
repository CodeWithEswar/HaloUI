"use client";

import * as React from "react";
import {
  Copy01Icon,
  CheckmarkCircle01Icon,
  RefreshIcon,
  Sun01Icon,
  Moon02Icon,
  SparklesIcon,
  SlidersHorizontalIcon,
  PlayIcon,
  InformationCircleIcon,
  ArrowRight01Icon,
  EyeIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/**
 * 1. ThemeTokenTable
 * Searchable, category-filtered table listing all HaloUI tokens with light/dark values,
 * human-readable purpose, visual preview swatch, and 1-click token copy.
 */
export type TokenRow = {
  name: string;
  category: "canvas" | "content" | "actions" | "boundaries" | "focus" | "feedback" | "geometry" | "elevation" | "material";
  light: string;
  dark: string;
  purpose: string;
  type: "color" | "radius" | "shadow" | "blur" | "gradient" | "text";
};

export const CANONICAL_TOKENS: TokenRow[] = [
  // Canvas
  {
    name: "--background",
    category: "canvas",
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
    purpose: "Primary application substrate and page canvas",
    type: "color",
  },
  {
    name: "--card",
    category: "canvas",
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
    purpose: "Container surfaces, cards, and modal panels",
    type: "color",
  },
  {
    name: "--popover",
    category: "canvas",
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
    purpose: "Dropdowns, flyouts, and floating overlays",
    type: "color",
  },
  // Content
  {
    name: "--foreground",
    category: "content",
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
    purpose: "High-contrast primary typography and icons",
    type: "color",
  },
  {
    name: "--card-foreground",
    category: "content",
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
    purpose: "Text hierarchy within elevated card surfaces",
    type: "color",
  },
  {
    name: "--muted-foreground",
    category: "content",
    light: "oklch(0.556 0 0)",
    dark: "oklch(0.708 0 0)",
    purpose: "Secondary labels, captions, and supporting metadata",
    type: "color",
  },
  // Actions
  {
    name: "--primary",
    category: "actions",
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.922 0 0)",
    purpose: "Primary call-to-action button and active states",
    type: "color",
  },
  {
    name: "--primary-foreground",
    category: "actions",
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.205 0 0)",
    purpose: "Contrasting text and icons rendered on primary surfaces",
    type: "color",
  },
  {
    name: "--secondary",
    category: "actions",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
    purpose: "Secondary action buttons and quiet interactive tiers",
    type: "color",
  },
  {
    name: "--secondary-foreground",
    category: "actions",
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.985 0 0)",
    purpose: "Text and glyphs rendered on secondary actions",
    type: "color",
  },
  // Boundaries
  {
    name: "--border",
    category: "boundaries",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 10%)",
    purpose: "Structural separators, card borders, and dividers",
    type: "color",
  },
  {
    name: "--input",
    category: "boundaries",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 15%)",
    purpose: "Form input borders and resting state outlines",
    type: "color",
  },
  // Focus & Feedback
  {
    name: "--ring",
    category: "focus",
    light: "oklch(0.708 0 0)",
    dark: "oklch(0.556 0 0)",
    purpose: "High-contrast focus ring for keyboard navigation",
    type: "color",
  },
  {
    name: "--destructive",
    category: "feedback",
    light: "oklch(0.577 0.245 27.3)",
    dark: "oklch(0.704 0.191 22.2)",
    purpose: "Destructive actions, error states, and validation warnings",
    type: "color",
  },
  // Geometry
  {
    name: "--radius",
    category: "geometry",
    light: "0.625rem",
    dark: "0.625rem",
    purpose: "Base corner radius from which all control curves derive",
    type: "radius",
  },
  {
    name: "--radius-sm",
    category: "geometry",
    light: "calc(var(--radius) * 0.6)",
    dark: "calc(var(--radius) * 0.6)",
    purpose: "Sub-controls, badges, chips, and small tags",
    type: "radius",
  },
  {
    name: "--radius-xl",
    category: "geometry",
    light: "calc(var(--radius) * 1.4)",
    dark: "calc(var(--radius) * 1.4)",
    purpose: "Cards, containers, sheets, and dialog window frames",
    type: "radius",
  },
  // Material (HaloUI Physical Engine)
  {
    name: "--halo-surface",
    category: "material",
    light: "rgba(255, 255, 255, 0.72)",
    dark: "rgba(22, 23, 26, 0.70)",
    purpose: "Physical liquid translucent substrate body",
    type: "color",
  },
  {
    name: "--halo-edge",
    category: "material",
    light: "rgba(255, 255, 255, 0.90)",
    dark: "rgba(255, 255, 255, 0.14)",
    purpose: "1px optical refraction perimeter rim catch",
    type: "color",
  },
  {
    name: "--halo-highlight",
    category: "material",
    light: "linear-gradient(135deg, ...0.8)",
    dark: "linear-gradient(135deg, ...0.22)",
    purpose: "135° directional specular reflection from top-left virtual light",
    type: "gradient",
  },
  {
    name: "--halo-blur-md",
    category: "material",
    light: "16px",
    dark: "16px",
    purpose: "Backdrop diffusion for standard balanced surfaces",
    type: "blur",
  },
  {
    name: "--halo-shadow-elevated",
    category: "elevation",
    light: "0 6px 16px -4px rgba(0,0,0,0.08)",
    dark: "0 8px 24px -4px rgba(0,0,0,0.65)",
    purpose: "Combined contact shadow and ambient depth anchor",
    type: "shadow",
  },
];

export function ThemeTokenTable() {
  const [filter, setFilter] = React.useState<string>("all");
  const [search, setSearch] = React.useState<string>("");
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const filtered = CANONICAL_TOKENS.filter((t) => {
    const matchesCat = filter === "all" || t.category === filter;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.purpose.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
      {/* Search and Category Filter Rail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tokens or purpose..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-48 rounded-lg border border-input bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring sm:w-64"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "canvas", "actions", "boundaries", "focus", "material", "geometry"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                filter === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left text-xs">
          <thead className="border-b border-border bg-muted/40 text-foreground font-semibold">
            <tr>
              <th className="px-4 py-3">Token Name</th>
              <th className="px-4 py-3">Light Value</th>
              <th className="px-4 py-3">Dark Value</th>
              <th className="px-4 py-3">Role / Purpose</th>
              <th className="px-4 py-3 text-right">Sample</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((t) => (
              <tr key={t.name} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3 font-mono font-medium text-foreground">
                  <button
                    type="button"
                    onClick={() => handleCopy(t.name)}
                    className="inline-flex items-center gap-1.5 text-xs hover:underline text-left group"
                    title={`Click to copy ${t.name}`}
                  >
                    <span>{t.name}</span>
                    <HaloIcon
                      icon={copiedToken === t.name ? CheckmarkCircle01Icon : Copy01Icon}
                      size={12}
                      className={cn(
                        "opacity-0 transition-opacity group-hover:opacity-100",
                        copiedToken === t.name && "opacity-100 text-emerald-500"
                      )}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground max-w-[10rem] truncate">
                  {t.light}
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground max-w-[10rem] truncate">
                  {t.dark}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{t.purpose}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center justify-end">
                    {t.type === "color" && (
                      <span
                        className="inline-block size-4 rounded-md border border-border/80 shadow-xs"
                        style={{ backgroundColor: `var(${t.name})` }}
                      />
                    )}
                    {t.type === "radius" && (
                      <span
                        className="inline-block size-4 border border-foreground/40 bg-muted"
                        style={{ borderRadius: `var(${t.name})` }}
                      />
                    )}
                    {t.type === "shadow" && (
                      <span className="inline-block size-4 rounded-sm bg-card shadow-md border border-border" />
                    )}
                    {t.type === "gradient" && (
                      <span className="inline-block h-3.5 w-6 rounded-sm bg-gradient-to-tr from-white/10 to-white/70 border border-white/20" />
                    )}
                    {t.type === "blur" && (
                      <span className="inline-block size-4 rounded-sm bg-muted/60 backdrop-blur-sm border border-border" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border bg-muted/20 px-4 py-2.5 text-[11px] text-muted-foreground">
        Showing {filtered.length} of {CANONICAL_TOKENS.length} canonical design tokens. Click any token name to copy.
      </div>
    </div>
  );
}

/**
 * 2. ThemeColorPreview
 * Visualizes the 7 semantic color groups (Canvas, Surface, Content, Actions, Boundaries, Focus, Feedback).
 */
export function ThemeColorPreview() {
  const groups = [
    {
      title: "Canvas & Surface",
      tokens: [
        { name: "--background", label: "Page Canvas", bg: "bg-background", text: "text-foreground" },
        { name: "--card", label: "Card / Panel", bg: "bg-card", text: "text-card-foreground" },
        { name: "--popover", label: "Overlay / Popover", bg: "bg-popover", text: "text-popover-foreground" },
      ],
    },
    {
      title: "Actions",
      tokens: [
        { name: "--primary", label: "Primary CTA", bg: "bg-primary", text: "text-primary-foreground" },
        { name: "--secondary", label: "Secondary Action", bg: "bg-secondary", text: "text-secondary-foreground" },
        { name: "--destructive", label: "Destructive Action", bg: "bg-destructive", text: "text-destructive-foreground" },
      ],
    },
    {
      title: "Content & Tone",
      tokens: [
        { name: "--foreground", label: "Primary Text", bg: "bg-foreground", text: "text-background" },
        { name: "--muted-foreground", label: "Secondary Text", bg: "bg-muted-foreground", text: "text-background" },
        { name: "--muted", label: "Muted Surface", bg: "bg-muted", text: "text-foreground" },
      ],
    },
    {
      title: "Boundaries & Focus",
      tokens: [
        { name: "--border", label: "Structural Border", bg: "bg-border", text: "text-foreground" },
        { name: "--input", label: "Form Input Border", bg: "bg-input", text: "text-foreground" },
        { name: "--ring", label: "Keyboard Focus Ring", bg: "bg-ring", text: "text-background" },
      ],
    },
  ];

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-foreground">Semantic Color Palette</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Semantic tokens bind UI components to visual roles rather than fixed color values.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((grp) => (
          <div key={grp.title} className="rounded-xl border border-border bg-muted/20 p-3.5 space-y-2.5">
            <span className="text-[11px] font-semibold text-foreground block">{grp.title}</span>
            <div className="space-y-1.5">
              {grp.tokens.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 text-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("size-3.5 rounded-sm border border-border/80 shadow-2xs", t.bg)} />
                    <span className="font-mono text-[11px] text-foreground">{t.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 3. LightDarkThemePreview
 * Synchronized side-by-side Light and Dark component showcase displaying the exact same
 * component group under calibrated Light and Dark token palettes.
 */
export function LightDarkThemePreview() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-semibold text-foreground">Calibrated Light vs. Dark Environments</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Light and dark themes are separate optical environments, not naive color inversions.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span>Target: Simultaneous Evaluation</span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Light Environment Column */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-neutral-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-800">
              <HaloIcon icon={Sun01Icon} size={14} className="text-amber-500" />
              <span>Light Mode Environment</span>
            </div>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
              High Contrast
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                Workspace Domain
              </label>
              <input
                type="text"
                readOnly
                value="haloui.app/design"
                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 outline-none"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50/70 p-3">
              <div>
                <span className="text-xs font-medium text-neutral-800 block">Specular Lighting</span>
                <span className="text-[10px] text-neutral-500">135° directional top-left ray</span>
              </div>
              <span className="size-4 rounded-full bg-neutral-900" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="rounded-lg bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs"
              >
                Confirm Changes
              </button>
              <button
                type="button"
                className="rounded-lg border border-neutral-200 bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* Dark Environment Column */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-neutral-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-200">
              <HaloIcon icon={Moon02Icon} size={14} className="text-indigo-400" />
              <span>Dark Mode Environment</span>
            </div>
            <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-medium text-neutral-400 border border-neutral-800">
              Deep Graphite
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-neutral-300 mb-1">
                Workspace Domain
              </label>
              <input
                type="text"
                readOnly
                value="haloui.app/design"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-100 outline-none"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-3">
              <div>
                <span className="text-xs font-medium text-neutral-200 block">Specular Lighting</span>
                <span className="text-[10px] text-neutral-400">135° directional top-left ray</span>
              </div>
              <span className="size-4 rounded-full bg-neutral-100" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="rounded-lg bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-950 shadow-xs"
              >
                Confirm Changes
              </button>
              <button
                type="button"
                className="rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-neutral-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. MaterialThemePreview
 * Interactive preview demonstrating how material intensity operates independently
 * from color theme across multiple backdrops.
 */
export function MaterialThemePreview() {
  const [intensity, setIntensity] = React.useState<"subtle" | "balanced" | "rich">("balanced");
  const [backdrop, setBackdrop] = React.useState<"studio" | "gradient" | "dense">("gradient");

  const intensitySpecs = {
    subtle: { blur: "8px", highlight: "0.4", edge: "0.7", desc: "Minimal diffusion, ideal for content-dense utility dashboards" },
    balanced: { blur: "16px", highlight: "0.85", edge: "1.0", desc: "Canonical physical glass, perfectly balancing clarity and environmental depth" },
    rich: { blur: "28px", highlight: "1.2", edge: "1.35", desc: "Heavy refractive body and luminous specular highlights for hero modals" },
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-semibold text-foreground">Material Intensity &amp; Substrate Interaction</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Material tokens control physical optical depth without altering semantic text or state contrast.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Intensity selector */}
          <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs">
            {(["subtle", "balanced", "rich"] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setIntensity(lvl)}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium capitalize transition-colors text-[11px]",
                  intensity === lvl
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Backdrop selector */}
          <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs">
            {(["studio", "gradient", "dense"] as const).map((bg) => (
              <button
                key={bg}
                type="button"
                onClick={() => setBackdrop(bg)}
                className={cn(
                  "rounded-md px-2 py-1 font-medium capitalize transition-colors text-[11px]",
                  backdrop === bg
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Substrate Stage */}
      <div
        className={cn(
          "relative min-h-[14rem] rounded-xl border border-border p-6 overflow-hidden flex items-center justify-center transition-all",
          backdrop === "studio" && "bg-neutral-100 dark:bg-neutral-900",
          backdrop === "gradient" && "bg-gradient-to-tr from-blue-600/30 via-purple-600/25 to-amber-500/25",
          backdrop === "dense" && "bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:16px_16px] bg-slate-900/10"
        )}
      >
        {/* Optical Glass Card with local intensity applied */}
        <div
          className={cn(
            "relative w-full max-w-md rounded-2xl border border-[var(--halo-edge)] bg-[var(--halo-surface)] p-5 shadow-[var(--halo-shadow-elevated)] transition-all",
            intensity === "subtle" && "backdrop-blur-[8px]",
            intensity === "balanced" && "backdrop-blur-[16px]",
            intensity === "rich" && "backdrop-blur-[28px]"
          )}
        >
          {/* Specular Top-Left Highlight */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent rounded-t-2xl" />

          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-foreground/80">
              HaloUI Liquid Surface
            </span>
            <Badge variant="outline" className="text-[10px] font-mono">
              Intensity: {intensity}
            </Badge>
          </div>

          <h4 className="text-sm font-semibold text-foreground">Optical Coherence Guaranteed</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {intensitySpecs[intensity].desc}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-mono text-muted-foreground">
            <span>Blur: {intensitySpecs[intensity].blur}</span>
            <span>Highlight: {intensitySpecs[intensity].highlight}</span>
            <span>Edge: {intensitySpecs[intensity].edge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. TypographyPreview
 * Realistic typographic hierarchy specimen showcasing Display, Headings, Body, and Code.
 */
export function TypographyPreview() {
  const specimens = [
    {
      role: "Display / Hero",
      className: "text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground",
      sample: "Liquid Optical Intelligence",
      detail: "font-sans • 30px / 36px • font-weight 800",
    },
    {
      role: "Heading 1 (Page Title)",
      className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
      sample: "Design-System Architecture",
      detail: "font-sans • 24px / 32px • font-weight 700",
    },
    {
      role: "Heading 2 (Section)",
      className: "text-base sm:text-lg font-semibold tracking-tight text-foreground",
      sample: "Semantic Design Tokens",
      detail: "font-sans • 18px / 26px • font-weight 600",
    },
    {
      role: "Body Regular",
      className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
      sample:
        "Components consume semantic tokens rather than owning isolated color, radius, or shadow values. This architectural boundary guarantees system-wide coherence.",
      detail: "font-sans • 14px / 22px • font-weight 400",
    },
    {
      role: "Monospace / Code",
      className: "font-mono text-xs text-foreground bg-muted/50 rounded-md px-2 py-1 inline-block border border-border",
      sample: "pnpm dlx shadcn@latest add https://haloui.dev/r/button.json",
      detail: "font-mono • 12px / 18px • font-weight 400",
    },
  ];

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4">
      <div className="border-b border-border pb-3">
        <h4 className="text-xs font-semibold text-foreground">Typographic Roles &amp; Font Hierarchy</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Standardized type scale maintaining legible hierarchy and proportional line heights across breakpoints.
        </p>
      </div>

      <div className="space-y-4">
        {specimens.map((spec) => (
          <div key={spec.role} className="rounded-xl border border-border/60 bg-muted/15 p-4 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="font-mono text-[10px] font-semibold text-foreground uppercase">{spec.role}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{spec.detail}</span>
            </div>
            <div className={spec.className}>{spec.sample}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 6. RadiusScalePreview
 * Geometric inspection showing the standard base radius scale applied to neutral shapes.
 */
export function RadiusScalePreview() {
  const radii = [
    { name: "--radius-sm", calc: "calc(var(--radius) * 0.6)", px: "6px", use: "Badges, Chips, Indicators" },
    { name: "--radius-md", calc: "calc(var(--radius) * 0.8)", px: "8px", use: "Buttons, Inputs, Selects" },
    { name: "--radius-lg", calc: "var(--radius)", px: "10px", use: "Default Controls (0.625rem)" },
    { name: "--radius-xl", calc: "calc(var(--radius) * 1.4)", px: "14px", use: "Cards, Containers, Popovers" },
    { name: "--radius-2xl", calc: "calc(var(--radius) * 1.8)", px: "18px", use: "Dialogs, Modals, Sheets" },
    { name: "--radius-full", calc: "9999px", px: "Full Pill", use: "Pill Tags, Status Dots, Avatars" },
  ];

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-foreground">Geometric Radius Scale</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          All corner curves derive dynamically from the central <code className="font-mono text-foreground">--radius</code> root token.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {radii.map((r) => (
          <div key={r.name} className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3">
            <div
              className="size-12 shrink-0 border-2 border-foreground/30 bg-primary/10 shadow-xs"
              style={{ borderRadius: r.px === "Full Pill" ? "9999px" : r.px }}
            />
            <div className="space-y-0.5 min-w-0">
              <span className="font-mono text-xs font-semibold text-foreground block truncate">{r.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground block">{r.px} • {r.calc}</span>
              <span className="text-[10px] text-muted-foreground block truncate">{r.use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 7. MotionTokenPreview
 * Interactive preview demonstrating timing, easing, and tactile compression with reduced-motion support.
 */
export function MotionTokenPreview() {
  const [animating, setAnimating] = React.useState(false);

  const triggerAnimation = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 800);
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-xs font-semibold text-foreground">Interactive Motion System</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Predictable timing curves engineered for tactile physics. Respects <code className="font-mono">prefers-reduced-motion</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerAnimation}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <HaloIcon icon={PlayIcon} size={13} className={animating ? "text-emerald-500 animate-spin" : ""} />
          <span>{animating ? "Playing..." : "Trigger Preview"}</span>
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-foreground uppercase">Micro / Tactile</span>
            <span className="font-mono text-[10px] text-muted-foreground">120ms</span>
          </div>
          <div className="h-10 flex items-center justify-center">
            <div
              className={cn(
                "rounded-lg border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground shadow-xs transition-transform duration-120 ease-out",
                animating && "scale-95 translate-y-0.5"
              )}
            >
              Tactile Press
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground block text-center">
            cubic-bezier(0.2, 0.8, 0.3, 1)
          </span>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-foreground uppercase">State / Toggle</span>
            <span className="font-mono text-[10px] text-muted-foreground">150ms</span>
          </div>
          <div className="h-10 flex items-center justify-center">
            <div className="h-6 w-11 rounded-full border border-border bg-muted p-0.5 flex items-center">
              <div
                className={cn(
                  "size-5 rounded-full bg-foreground transition-transform duration-150 ease-in-out",
                  animating ? "translate-x-5" : "translate-x-0"
                )}
              />
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground block text-center">
            ease-in-out transition
          </span>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-foreground uppercase">Reveal / Overlay</span>
            <span className="font-mono text-[10px] text-muted-foreground">200ms</span>
          </div>
          <div className="h-10 flex items-center justify-center">
            <div
              className={cn(
                "rounded-lg border border-border bg-foreground text-background px-3 py-1 text-xs font-medium shadow-md transition-all duration-200",
                animating ? "opacity-100 scale-100" : "opacity-40 scale-90"
              )}
            >
              Modal Entry
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground block text-center">
            cubic-bezier(0.16, 1, 0.3, 1)
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 8. FocusPreview
 * Real keyboard focus indicator demonstration verifying contrast and distinction from optical edges.
 */
export function FocusPreview() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-foreground">Keyboard Focus &amp; Ring Protection</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Tab through the controls below to verify high-contrast outline visibility. Optical rim highlights never substitute for focus rings.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4 items-center">
        <div>
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">Interactive Input</label>
          <input
            type="text"
            defaultValue="Focus test..."
            className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          />
        </div>

        <div>
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">Standard Button</label>
          <button
            type="button"
            className="w-full rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            Tab to Me
          </button>
        </div>

        <div>
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">Primary CTA</label>
          <button
            type="button"
            className="w-full rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            Action
          </button>
        </div>

        <div className="flex flex-col items-center">
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">Switch Control</label>
          <Switch />
        </div>
      </div>
    </div>
  );
}

/**
 * 9. ThemeLab
 * Flagship interactive theme customizer!
 * Scopes custom CSS variables strictly to its own container root, allowing real-time tuning
 * of Palette, Radius, Canvas Temperature, and Material Intensity without mutating the global docs!
 */
export function ThemeLab() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const [palette, setPalette] = React.useState<"neutral" | "sapphire" | "emerald" | "amber" | "crimson">("sapphire");
  const [radius, setRadius] = React.useState<"sharp" | "default" | "soft" | "rounded">("default");
  const [intensity, setIntensity] = React.useState<"subtle" | "balanced" | "rich">("balanced");
  const [copied, setCopied] = React.useState(false);

  // Palette specifications
  const palettes = {
    neutral: {
      light: { primary: "oklch(0.205 0 0)", primaryFg: "oklch(0.985 0 0)", ring: "oklch(0.708 0 0)" },
      dark: { primary: "oklch(0.922 0 0)", primaryFg: "oklch(0.205 0 0)", ring: "oklch(0.556 0 0)" },
    },
    sapphire: {
      light: { primary: "oklch(0.488 0.243 264.4)", primaryFg: "#ffffff", ring: "oklch(0.623 0.214 259.8)" },
      dark: { primary: "oklch(0.623 0.214 259.8)", primaryFg: "#0c0d12", ring: "oklch(0.488 0.243 264.4)" },
    },
    emerald: {
      light: { primary: "oklch(0.527 0.154 150.0)", primaryFg: "#ffffff", ring: "oklch(0.696 0.170 162.5)" },
      dark: { primary: "oklch(0.696 0.170 162.5)", primaryFg: "#08150e", ring: "oklch(0.527 0.154 150.0)" },
    },
    amber: {
      light: { primary: "oklch(0.666 0.179 58.3)", primaryFg: "#ffffff", ring: "oklch(0.769 0.188 70.0)" },
      dark: { primary: "oklch(0.769 0.188 70.0)", primaryFg: "#1b1104", ring: "oklch(0.666 0.179 58.3)" },
    },
    crimson: {
      light: { primary: "oklch(0.577 0.245 27.3)", primaryFg: "#ffffff", ring: "oklch(0.704 0.191 22.2)" },
      dark: { primary: "oklch(0.704 0.191 22.2)", primaryFg: "#1a0608", ring: "oklch(0.577 0.245 27.3)" },
    },
  };

  const radii = {
    sharp: "0.25rem",
    default: "0.625rem",
    soft: "0.875rem",
    rounded: "1.25rem",
  };

  const currentTheme = palettes[palette][mode];
  const currentRadius = radii[radius];

  const generatedCss = `/* Scoped HaloUI Custom Theme Configuration */
:root {
  --primary: ${palettes[palette].light.primary};
  --primary-foreground: ${palettes[palette].light.primaryFg};
  --ring: ${palettes[palette].light.ring};
  --radius: ${radii[radius]};
}

.dark {
  --primary: ${palettes[palette].dark.primary};
  --primary-foreground: ${palettes[palette].dark.primaryFg};
  --ring: ${palettes[palette].dark.ring};
}`;

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMode("dark");
    setPalette("sapphire");
    setRadius("default");
    setIntensity("balanced");
  };

  return (
    <div className="my-8 rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
      {/* Top Header & Reset Rail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs">
            <HaloIcon icon={SlidersHorizontalIcon} size={15} />
          </span>
          <div>
            <h4 className="text-xs font-semibold text-foreground">Interactive Theme Lab</h4>
            <span className="text-[10px] text-muted-foreground block">
              Tune system tokens in real-time. Changes are isolated to the sandbox stage below.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <HaloIcon icon={RefreshIcon} size={12} />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleCopyCss}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1 text-[11px] font-medium text-background hover:opacity-90 transition-opacity"
          >
            <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={12} />
            <span>{copied ? "Copied CSS" : "Copy Theme CSS"}</span>
          </button>
        </div>
      </div>

      {/* Control Tuning Panel */}
      <div className="grid gap-3 border-b border-border bg-muted/20 p-4 sm:grid-cols-4 sm:px-6 text-xs">
        {/* Mode Toggle */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">Mode</span>
          <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
            <button
              type="button"
              onClick={() => setMode("light")}
              className={cn(
                "flex-1 rounded-md py-1 text-center font-medium transition-colors text-[11px]",
                mode === "light" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setMode("dark")}
              className={cn(
                "flex-1 rounded-md py-1 text-center font-medium transition-colors text-[11px]",
                mode === "dark" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Primary Accent Palette */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">Primary Palette</span>
          <select
            value={palette}
            onChange={(e) => setPalette(e.target.value as any)}
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="sapphire">Sapphire (Blue)</option>
            <option value="emerald">Emerald (Mint)</option>
            <option value="amber">Amber (Bronze)</option>
            <option value="crimson">Crimson (Rose)</option>
            <option value="neutral">Neutral (Obsidian)</option>
          </select>
        </div>

        {/* Radius Scale */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">Radius Scale</span>
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value as any)}
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="sharp">Sharp (0.25rem / 4px)</option>
            <option value="default">Standard (0.625rem / 10px)</option>
            <option value="soft">Soft (0.875rem / 14px)</option>
            <option value="rounded">Rounded (1.25rem / 20px)</option>
          </select>
        </div>

        {/* Material Intensity */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">Material Intensity</span>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value as any)}
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="subtle">Subtle (8px blur, 0.4 highlight)</option>
            <option value="balanced">Balanced (16px blur, 0.85 highlight)</option>
            <option value="rich">Rich (28px blur, 1.2 highlight)</option>
          </select>
        </div>
      </div>

      {/* Live Sandbox Preview Stage with Isolated CSS Variables */}
      <div
        className={cn(
          "p-6 sm:p-10 transition-colors",
          mode === "dark" ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"
        )}
        style={
          {
            "--primary": currentTheme.primary,
            "--primary-foreground": currentTheme.primaryFg,
            "--ring": currentTheme.ring,
            "--radius": currentRadius,
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-lg space-y-5" style={{ borderRadius: currentRadius }}>
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Theme Lab Preview
              </span>
              <div className="text-base font-bold text-foreground mt-0.5">Application Settings</div>
            </div>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: currentRadius,
              }}
            >
              Active Preset
            </span>
          </div>

          {/* Form Rows */}
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1">
                Custom Domain Slug
              </label>
              <input
                type="text"
                defaultValue="design-system.haloui.app"
                className="w-full border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ borderRadius: currentRadius }}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-3" style={{ borderRadius: currentRadius }}>
              <div>
                <span className="text-xs font-semibold text-foreground block">Tactile Compression</span>
                <span className="text-[11px] text-muted-foreground">120ms spring feedback on click</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/60">
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-medium border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              style={{ borderRadius: currentRadius }}
            >
              Discard
            </button>
            <button
              type="button"
              className="px-4 py-1.5 text-xs font-semibold shadow-xs transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: currentRadius,
              }}
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 10. ThemeTestMatrix
 * Validation matrix table auditing Light and Dark mode behavior across all key components and environments.
 */
export function ThemeTestMatrix() {
  const tests = [
    { area: "Body & Content Typography", light: "Review: 4.5:1 contrast on canvas", dark: "Review: 7:1 contrast on graphite" },
    { area: "Primary Action Button", light: "Review: High-contrast state, visible ring", dark: "Review: Non-neon state, visible ring" },
    { area: "Form Controls & Inputs", light: "Review: 1px border separation from card", dark: "Review: 15% white border on dark body" },
    { area: "Keyboard Focus Indicator", light: "Review: 2px ring with 2px offset", dark: "Review: 2px ring with 2px offset" },
    { area: "Destructive Action State", light: "Review: Distinct from primary CTA", dark: "Review: Distinct from primary CTA" },
    { area: "Dialog & Overlay Elevation", light: "Review: 24px contact drop occlusion", dark: "Review: 48px ambient depth dispersion" },
    { area: "Translucent Material on Neutral", light: "Review: 72% body prevents bleed-through", dark: "Review: 70% graphite anchors content" },
    { area: "Translucent Material on Dense UI", light: "Review: 16px blur softens background noise", dark: "Review: 16px blur softens background noise" },
  ];

  return (
    <div className="my-6 rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
      <div className="border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <h4 className="text-xs font-semibold text-foreground">Theme Verification &amp; Contrast Matrix</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Evaluate themes across all 8 mandatory testing gates before publishing to production.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-xs">
          <thead className="border-b border-border bg-muted/30 text-foreground font-semibold">
            <tr>
              <th className="px-4 py-3">Verification Dimension</th>
              <th className="px-4 py-3">Light Mode Audit</th>
              <th className="px-4 py-3">Dark Mode Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {tests.map((t) => (
              <tr key={t.area} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3 font-medium text-foreground">{t.area}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{t.light}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{t.dark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
