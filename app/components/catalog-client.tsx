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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CatalogItem {
  id: string;
  name: string;
  slug: string;
  category: "Actions" | "Foundations" | "Forms" | "Navigation" | "Overlays" | "Data Display" | "Layout";
  description: string;
  status: "stable" | "in-progress" | "planned";
  previewType: "button" | "surface" | "switch" | "input" | "dock";
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "button",
    name: "Button",
    slug: "/components/button",
    category: "Actions",
    description: "Action surface with physical optical response, directional highlight, and tactile compression.",
    status: "stable",
    previewType: "button",
  },
  {
    id: "surface",
    name: "Halo Surface",
    slug: "/components/button",
    category: "Foundations",
    description: "Foundational 10-layer physical liquid material substrate with depth tokens.",
    status: "stable",
    previewType: "surface",
  },
  {
    id: "icon-button",
    name: "Icon Button",
    slug: "/components/button",
    category: "Actions",
    description: "Tactile square action surface supporting optical Hugeicons alignment.",
    status: "stable",
    previewType: "button",
  },
  {
    id: "switch",
    name: "Switch",
    slug: "/components/button",
    category: "Forms",
    description: "Recessed track with elevated floating thumb and neoskeuomorphic depth.",
    status: "in-progress",
    previewType: "switch",
  },
  {
    id: "input",
    name: "Input",
    slug: "/components/button",
    category: "Forms",
    description: "Slightly inset field with illuminated optical focus ring and clean contrast.",
    status: "in-progress",
    previewType: "input",
  },
  {
    id: "dock",
    name: "Floating Dock",
    slug: "/components/button",
    category: "Navigation",
    description: "Elevated kinetic navigation bar with optical magnification and contact shadow.",
    status: "planned",
    previewType: "dock",
  },
  {
    id: "dialog",
    name: "Dialog",
    slug: "/components/button",
    category: "Overlays",
    description: "Floating modal surface with atmospheric background diffusion and optical edges.",
    status: "planned",
    previewType: "surface",
  },
  {
    id: "tabs",
    name: "Tabs",
    slug: "/components/button",
    category: "Navigation",
    description: "Connected liquid segments with smooth optical indicator glide.",
    status: "planned",
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
                        item.status === "stable" && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
                        item.status === "in-progress" && "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5",
                        item.status === "planned" && "border-stone-400/30 text-stone-500 bg-stone-500/5"
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
                      item.status === "stable" && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
                      item.status === "in-progress" && "border-amber-500/30 text-amber-600 dark:text-amber-400",
                      item.status === "planned" && "border-stone-400/30 text-stone-500"
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
