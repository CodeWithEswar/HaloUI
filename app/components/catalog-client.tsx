"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search01Icon,
  SparklesIcon,
  ArrowRight01Icon,
  Layers01Icon,
  GridTableIcon,
  Menu01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  FilterIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { HaloNoise } from "@/components/haloui/foundations/halo-noise";
import { HaloGlow } from "@/components/haloui/foundations/halo-glow";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CatalogItem {
  id: string;
  name: string;
  slug: string;
  category: "Actions" | "Foundations" | "Forms" | "Navigation" | "Overlays" | "Data Display" | "Layout";
  description: string;
  status: "stable" | "preview" | "in-progress" | "planned";
  previewType: "button" | "surface" | "edge" | "highlight" | "noise" | "glow" | "switch" | "input" | "dock";
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "button",
    name: "Button",
    slug: "/components/button",
    category: "Actions",
    description: "A text or icon-supported action control with HaloUI material, semantic variants, accessible interaction states, and consistent keyboard behavior.",
    status: "preview",
    previewType: "button",
  },
  {
    id: "surface",
    name: "Halo Surface",
    slug: "/components/halo-surface",
    category: "Foundations",
    description: "The base material container used to construct HaloUI surfaces with 10-layer physical liquid optical physics.",
    status: "preview" as const,
    previewType: "surface",
  },
  {
    id: "edge",
    name: "Halo Edge",
    slug: "/components/halo-edge",
    category: "Foundations",
    description: "Layered outer and inset optical boundary treatment for translucent HaloUI materials.",
    status: "preview" as const,
    previewType: "edge",
  },
  {
    id: "highlight",
    name: "Halo Highlight",
    slug: "/components/halo-highlight",
    category: "Foundations",
    description: "Directional reflected light and specular highlights along the 135° illumination vector.",
    status: "preview" as const,
    previewType: "highlight",
  },
  {
    id: "noise",
    name: "Halo Noise",
    slug: "/components/halo-noise",
    category: "Foundations",
    description: "Subtle material grain and high-frequency procedural texture reducing gradient banding.",
    status: "preview" as const,
    previewType: "noise",
  },
  {
    id: "glow",
    name: "Halo Glow",
    slug: "/components/halo-glow",
    category: "Foundations",
    description: "Ambient luminous layer for emphasis, active state, or focus-adjacent depth.",
    status: "preview" as const,
    previewType: "glow",
  },
  {
    id: "refraction",
    name: "Halo Refraction Layer",
    slug: "/components/halo-refraction-layer",
    category: "Foundations",
    description: "Optional progressive-enhancement optical distortion for selected HaloUI materials.",
    status: "preview" as const,
    previewType: "surface",
  },
  {
    id: "focus-ring",
    name: "Halo Focus Ring",
    slug: "/components/halo-focus-ring",
    category: "Foundations",
    description: "Shared high-contrast focus-visible treatment for HaloUI interactive components.",
    status: "stable" as const,
    previewType: "surface",
  },
  {
    id: "motion-presets",
    name: "Halo Motion Presets",
    slug: "/components/halo-motion-presets",
    category: "Foundations",
    description: "Central motion vocabulary standardizing press, lift, reveal, settle, and float behavior.",
    status: "stable" as const,
    previewType: "surface",
  },
  {
    id: "theme-provider",
    name: "Halo Theme Provider",
    slug: "/components/halo-theme-provider",
    category: "Foundations",
    description: "Light/dark/system theme and material-intensity orchestration across the interface tree.",
    status: "stable" as const,
    previewType: "surface",
  },
  {
    id: "background",
    name: "Halo Background",
    slug: "/components/halo-background",
    category: "Foundations",
    description: "Reference backgrounds for testing and evaluating translucent liquid materials.",
    status: "stable" as const,
    previewType: "surface",
  },
  {
    id: "portal-surface",
    name: "Halo Portal Surface",
    slug: "/components/halo-portal-surface",
    category: "Foundations",
    description: "Consistent liquid-glass material wrapper for portalled floating overlays, dialogs, and popovers.",
    status: "stable" as const,
    previewType: "surface",
  },
  {
    id: "scrim",
    name: "Halo Scrim",
    slug: "/components/halo-scrim",
    category: "Foundations",
    description: "Backdrop and scrim treatment positioned behind modal dialogs and overlays with optical diffusion blur.",
    status: "stable" as const,
    previewType: "surface",
  },
  {
    id: "icon-button",
    name: "Icon Button",
    slug: "/components/icon-button",
    category: "Actions",
    description: "Tactile square action surface supporting optical Hugeicons alignment.",
    status: "preview",
    previewType: "button",
  },
  {
    id: "switch",
    name: "Switch",
    slug: "/components/switch",
    category: "Forms",
    description: "Recessed track with elevated floating thumb and neoskeuomorphic depth.",
    status: "preview",
    previewType: "switch",
  },
  {
    id: "input",
    name: "Input",
    slug: "/components/input",
    category: "Forms",
    description: "Slightly inset field with illuminated optical focus ring and clean contrast.",
    status: "preview",
    previewType: "input",
  },
  {
    id: "tabs",
    name: "Tabs",
    slug: "/components/tabs",
    category: "Navigation",
    description: "Connected liquid segments with smooth optical indicator glide and roving focus.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    slug: "/components/breadcrumb",
    category: "Navigation",
    description: "A semantic navigation trail communicating hierarchy and current location.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "pagination",
    name: "Pagination",
    slug: "/components/pagination",
    category: "Navigation",
    description: "Discrete page navigation control with accessible landmarks and states.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "navigation-menu",
    name: "Navigation Menu",
    slug: "/components/navigation-menu",
    category: "Navigation",
    description: "Accessible top-level navigation system with liquid-glass flyouts and viewport positioning.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "menubar",
    name: "Menubar",
    slug: "/components/menubar",
    category: "Navigation",
    description: "Persistent application command bar organizing actions into keyboard-operable menus.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    slug: "/components/sidebar",
    category: "Navigation",
    description: "Responsive application navigation container with grouped destinations and collapsible states.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "sidebar-rail",
    name: "Sidebar Rail",
    slug: "/components/sidebar-rail",
    category: "Navigation",
    description: "Compact icon-only rail preserving essential destinations when sidebar is collapsed.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "dock",
    name: "Floating Dock",
    slug: "/components/dock",
    category: "Navigation",
    description: "Elevated kinetic navigation bar with optical magnification and contact shadow.",
    status: "preview",
    previewType: "dock",
  },
  {
    id: "bottom-navigation",
    name: "Bottom Navigation",
    slug: "/components/bottom-navigation",
    category: "Navigation",
    description: "Mobile-first persistent navigation bar with safe-area padding and liquid optics.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "stepper",
    name: "Stepper",
    slug: "/components/stepper",
    category: "Navigation",
    description: "Structured workflow progression indicator for multi-step tasks and onboarding.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "command-palette",
    name: "Command Palette",
    slug: "/components/command-palette",
    category: "Navigation",
    description: "Keyboard-first searchable modal launcher for finding commands and destinations.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "tree-navigation",
    name: "Tree Navigation",
    slug: "/components/tree-navigation",
    category: "Navigation",
    description: "Hierarchical expandable tree structure for deeply nested navigation contexts.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "link-preview",
    name: "Link Preview",
    slug: "/components/link-preview",
    category: "Navigation",
    description: "Contextual hover card revealing supplemental destination previews.",
    status: "preview",
    previewType: "surface",
  },
  {
    id: "kbd",
    name: "Kbd",
    slug: "/components/kbd",
    category: "Navigation",
    description: "Semantic visual representation of keyboard shortcuts with realistic keycap styling.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "dialog",
    name: "Dialog",
    slug: "/components/dialog",
    category: "Overlays",
    description: "Modal task surface with 10-layer liquid optical physics, optical scrim diffusion, and focus trapping.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    slug: "/components/alert-dialog",
    category: "Overlays",
    description: "High-consequence modal confirmation interrupting workflows with calibrated optical scrim isolation.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "sheet",
    name: "Sheet",
    slug: "/components/sheet",
    category: "Overlays",
    description: "Edge-anchored overlay panel with directional slide transitions, concentric meniscus radii, and liquid optics.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "drawer",
    name: "Drawer",
    slug: "/components/drawer",
    category: "Overlays",
    description: "Touch-friendly contextual surface with gesture velocity dismissal, snap points, and safe-area padding.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "popover",
    name: "Popover",
    slug: "/components/popover",
    category: "Overlays",
    description: "Anchored transient floating surface with 10-layer liquid optical physics, origin-aligned reveal motion, and collision avoidance.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "hover-card",
    name: "Hover Card",
    slug: "/components/hover-card",
    category: "Overlays",
    description: "Supplemental destination preview opened via accessible hover and focus behavior with uncompromised trigger semantics.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "tooltip",
    name: "Tooltip",
    slug: "/components/tooltip",
    category: "Overlays",
    description: "Brief contextual label and supplemental help associated with an element, engineered with Liquid Glass optics and skip-delay coordination.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    slug: "/components/dropdown-menu",
    category: "Overlays",
    description: "Button-triggered temporary action menu with Balanced Liquid Glass optics, composite menu semantics, and roving focus.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "context-menu",
    name: "Context Menu",
    slug: "/components/context-menu",
    category: "Overlays",
    description: "Pointer and context-triggered floating action surface with Balanced Liquid Glass optics, zero scrim, and roving keyboard navigation.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "submenu",
    name: "Submenu",
    slug: "/components/submenu",
    category: "Overlays",
    description: "Shared nested menu branch infrastructure with Balanced Liquid Glass optics, triangular hover grace, and boundary flipping.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "command-menu",
    name: "Command Menu",
    slug: "/components/command-menu",
    category: "Overlays",
    description: "Search-driven command collection surface with cmdk filtering, roving keyboard navigation, and HaloUI Liquid Glass optics.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    slug: "/components/spotlight",
    category: "Overlays",
    description: "Large global discovery surface for application-wide heterogeneous search across files, people, and actions with HaloUI Liquid Glass optics.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "lightbox",
    name: "Lightbox",
    slug: "/components/lightbox",
    category: "Overlays",
    description: "Immersive media viewing overlay with deep Halo Scrim backdrop attenuation, 100% media fidelity, and floating liquid glass controls.",
    status: "stable",
    previewType: "surface",
  },
];

const CATEGORIES = ["All", "Foundations", "Actions", "Forms", "Navigation", "Overlays"] as const;

export function CatalogClient() {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All");
  const [viewMode, setViewMode] = React.useState<"grid" | "list" | "compact">("grid");

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Sidebar Filter Archive Controls */}
      <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Search Archive
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs h-9 pl-9 pr-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md text-foreground focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <span className="absolute left-2.5 top-2.5 text-stone-400">
              <HaloIcon icon={Search01Icon} size={15} />
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Categories
          </label>
          <div className="flex flex-col space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between",
                  selectedCategory === cat
                    ? "bg-black/10 dark:bg-white/10 text-stone-900 dark:text-white font-medium"
                    : "text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <span>{cat}</span>
                <span className="text-[10px] font-mono text-stone-400">
                  {cat === "All"
                    ? CATALOG_ITEMS.length
                    : CATALOG_ITEMS.filter((i) => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Lifecycle Status
          </label>
          <div className="flex flex-wrap gap-1.5">
            {["All", "stable", "in-progress", "planned"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={cn(
                  "text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors capitalize",
                  selectedStatus === st
                    ? "border-stone-900 dark:border-white bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium"
                    : "border-black/10 dark:border-white/10 text-stone-500 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Registry Quick Info */}
        <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] space-y-2 text-xs text-stone-500">
          <div className="font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-white" />
            <span>Registry Spec v1</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Components are built with zero proprietary wrapper lock-in. Distributed as standalone files compatible with shadcn CLI.
          </p>
        </div>
      </aside>

      {/* Main Region: Catalog Items */}
      <main className="lg:col-span-9 space-y-6">
        {/* Top Control Bar with View Mode Toggle */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="text-xs font-mono text-stone-500">
            Showing {filteredItems.length} of {CATALOG_ITEMS.length} components
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={cn(
                "p-1.5 rounded text-xs transition-colors",
                viewMode === "grid"
                  ? "bg-black/10 dark:bg-white/10 text-stone-900 dark:text-white"
                  : "text-stone-400 hover:text-foreground"
              )}
            >
              <HaloIcon icon={GridTableIcon} size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={cn(
                "p-1.5 rounded text-xs transition-colors",
                viewMode === "list"
                  ? "bg-black/10 dark:bg-white/10 text-stone-900 dark:text-white"
                  : "text-stone-400 hover:text-foreground"
              )}
            >
              <HaloIcon icon={Menu01Icon} size={15} />
            </button>
          </div>
        </div>

        {/* Catalog Items Grid / List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={item.slug}
                className="group relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.015] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Preview Substrate */}
                <div className="h-44 w-full bg-stone-100/50 dark:bg-stone-900/50 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center p-6 relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent pointer-events-none" />

                  {item.previewType === "button" && (
                    <HaloButton variant="primary" size="md" leftIcon={SparklesIcon}>
                      {item.name}
                    </HaloButton>
                  )}

                  {item.previewType === "surface" && (
                    <HaloSurface elevation="floating" className="p-4 rounded-xl text-center">
                      <span className="text-xs font-mono font-medium">10-Layer Liquid Optics</span>
                    </HaloSurface>
                  )}

                  {item.previewType === "edge" && (
                    <HaloSurface elevation="raised" className="relative p-4 rounded-xl text-center">
                      <HaloEdge strength="strong" placement="both" />
                      <span className="text-xs font-mono font-medium">Optical Boundary Hairline</span>
                    </HaloSurface>
                  )}

                  {item.previewType === "highlight" && (
                    <HaloSurface elevation="raised" className="relative p-4 rounded-xl text-center overflow-hidden">
                      <HaloHighlight kind="specular" strength="strong" />
                      <span className="text-xs font-mono font-medium">135° Specular Reflection</span>
                    </HaloSurface>
                  )}

                  {item.previewType === "noise" && (
                    <HaloSurface elevation="raised" className="relative p-4 rounded-xl text-center overflow-hidden">
                      <HaloNoise strength="strong" />
                      <span className="text-xs font-mono font-medium">Fractal Micro-Dither</span>
                    </HaloSurface>
                  )}

                  {item.previewType === "glow" && (
                    <div className="relative">
                      <HaloGlow variant="emphasis" strength="strong" color="primary" />
                      <HaloSurface elevation="raised" className="relative p-4 rounded-xl text-center overflow-hidden">
                        <span className="text-xs font-mono font-medium">Ambient Radiation</span>
                      </HaloSurface>
                    </div>
                  )}

                  {item.previewType === "switch" && (
                    <div className="w-12 h-7 rounded-full bg-stone-900 dark:bg-white p-1">
                      <div className="w-5 h-5 rounded-full bg-white dark:bg-stone-900 translate-x-5" />
                    </div>
                  )}

                  {item.previewType === "input" && (
                    <div className="w-48 h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md flex items-center text-xs text-stone-400">
                      Search...
                    </div>
                  )}

                  {item.previewType === "dock" && (
                    <div className="flex items-center gap-1.5 p-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                      <div className="w-6 h-6 rounded-md bg-black/10 dark:bg-white/10" />
                      <div className="w-6 h-6 rounded-md bg-black/10 dark:bg-white/10" />
                    </div>
                  )}
                </div>

                {/* Information Footer */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base text-stone-900 dark:text-white group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                      {item.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-mono capitalize",
                        item.status === "stable" && "border-stone-900/30 text-stone-900 dark:border-white/30 dark:text-white bg-black/5 dark:bg-white/5",
                        item.status === "in-progress" && "border-stone-500/30 text-stone-600 dark:text-stone-400 bg-stone-500/5",
                        item.status === "planned" && "border-stone-400/20 text-stone-400 bg-transparent"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>{item.category}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      View component <HaloIcon icon={ArrowRight01Icon} size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl overflow-hidden bg-black/[0.01] dark:bg-white/[0.015]">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={item.slug}
                className="p-4 flex items-center justify-between gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-stone-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      / {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 max-w-xl">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-mono capitalize",
                      item.status === "stable" && "border-stone-900/30 text-stone-900 dark:border-white/30 dark:text-white",
                      item.status === "in-progress" && "border-stone-500/30 text-stone-600 dark:text-stone-400",
                      item.status === "planned" && "border-stone-400/20 text-stone-400"
                    )}
                  >
                    {item.status}
                  </Badge>
                  <HaloIcon icon={ArrowRight01Icon} size={15} className="text-stone-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
