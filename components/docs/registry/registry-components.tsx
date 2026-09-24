"use client";

import * as React from "react";
import {
  FileCodeIcon,
  Download01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  Layers01Icon,
  PackageIcon,
  Settings01Icon,
  Copy01Icon,
  InformationCircleIcon,
  ShieldCheckIcon,
  Folder01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { SiPnpm, SiNpm, SiYarn, SiBun } from "@icons-pack/react-simple-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type RegistryItemFile = {
  path: string;
  type: string;
  target: string;
  role: string;
};

export type RegistryItemData = {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryItemFile[];
  cssVars?: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  meta: {
    status: "stable" | "preview" | "experimental" | "deprecated";
    version: string;
    category: string;
    accessibility?: string;
    lastUpdated: string;
  };
};

export const REAL_REGISTRY_ITEMS: Record<string, RegistryItemData> = {
  button: {
    name: "button",
    type: "registry:ui",
    title: "Halo Button",
    description:
      "An action surface engineered with physical optical response, neoskeuomorphic depth, tactile compression, and Hugeicons integration.",
    dependencies: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    registryDependencies: [],
    files: [
      {
        path: "components/haloui/button/halo-button.tsx",
        type: "registry:ui",
        target: "components/ui/halo-button.tsx",
        role: "Primary tactile button component with variant and size matrices",
      },
      {
        path: "components/icons/halo-icon.tsx",
        type: "registry:ui",
        target: "components/icons/halo-icon.tsx",
        role: "Optical icon wrapper inheriting currentColor with optical size calibration",
      },
      {
        path: "styles/halo-tokens.css",
        type: "registry:ui",
        target: "styles/halo-tokens.css",
        role: "Physical optical material tokens: surface tints, edges, blur, and shadows",
      },
    ],
    cssVars: {
      light: {
        "--halo-surface": "rgba(255, 255, 255, 0.72)",
        "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
        "--halo-edge": "rgba(255, 255, 255, 0.9)",
        "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
        "--halo-blur-md": "16px",
      },
      dark: {
        "--halo-surface": "rgba(22, 23, 26, 0.7)",
        "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
        "--halo-edge": "rgba(255, 255, 255, 0.14)",
        "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
        "--halo-blur-md": "16px",
      },
    },
    meta: {
      status: "stable",
      version: "1.0.0",
      category: "actions",
      accessibility: "WCAG 2.1 AA",
      lastUpdated: "2026-09-24",
    },
  },
  surface: {
    name: "surface",
    type: "registry:ui",
    title: "Halo Surface",
    description: "Foundational 10-layer physical liquid material substrate component.",
    dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "components/haloui/foundations/halo-surface.tsx",
        type: "registry:ui",
        target: "components/ui/halo-surface.tsx",
        role: "10-layer physical optical stack implementing base tint, diffusion, and rim catch",
      },
      {
        path: "styles/halo-tokens.css",
        type: "registry:ui",
        target: "styles/halo-tokens.css",
        role: "Shared CSS variables governing optical depth, blur, and lighting vectors",
      },
    ],
    meta: {
      status: "stable",
      version: "1.0.0",
      category: "foundations",
      accessibility: "WCAG 2.1 AA",
      lastUpdated: "2026-09-24",
    },
  },
};

/**
 * 1. RegistryItemInspector
 * Interactive, transparent inspector displaying real registry metadata: Overview, Files, Dependencies, Tokens, Raw JSON.
 */
export function RegistryItemInspector() {
  const [selectedKey, setSelectedKey] = React.useState<string>("button");
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  const [copied, setCopied] = React.useState(false);

  const item = REAL_REGISTRY_ITEMS[selectedKey] ?? REAL_REGISTRY_ITEMS.button;
  const canonicalUrl = `https://haloui.dev/r/${item.name}.json`;
  const installCmd = `pnpm dlx shadcn@latest add ${canonicalUrl}`;

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* Top Header: Resource Picker & Command Rail */}
      <div className="border-b border-border bg-muted/40 px-4 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Item Selector */}
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs">
              <HaloIcon icon={PackageIcon} size={15} />
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-foreground">Inspect Resource:</span>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="h-7 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-ring"
                aria-label="Select registry item to inspect"
              >
                <option value="button">button (Halo Button)</option>
                <option value="surface">surface (Halo Surface)</option>
              </select>
            </div>
          </div>

          {/* Quick Install Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyCommand}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-muted"
            >
              <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={13} className={copied ? "text-emerald-500" : ""} />
              <span>{copied ? "Copied Command" : "Copy Install Command"}</span>
            </button>
            <a
              href={`/r/${item.name}.json`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <HaloIcon icon={FileCodeIcon} size={13} />
              <span>Raw JSON</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border px-4 sm:px-6">
          <TabsList className="h-10 bg-transparent p-0 gap-4 border-0">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent px-1 pb-2 pt-2 text-xs font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="rounded-none border-b-2 border-transparent px-1 pb-2 pt-2 text-xs font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent"
            >
              Files ({item.files.length})
            </TabsTrigger>
            <TabsTrigger
              value="dependencies"
              className="rounded-none border-b-2 border-transparent px-1 pb-2 pt-2 text-xs font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent"
            >
              Dependencies ({item.dependencies.length})
            </TabsTrigger>
            {item.cssVars && (
              <TabsTrigger
                value="tokens"
                className="rounded-none border-b-2 border-transparent px-1 pb-2 pt-2 text-xs font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent"
              >
                Tokens
              </TabsTrigger>
            )}
            <TabsTrigger
              value="raw"
              className="rounded-none border-b-2 border-transparent px-1 pb-2 pt-2 text-xs font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent"
            >
              Raw Manifest
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="p-5 sm:p-6 space-y-5 m-0 outline-none">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                <Badge variant="outline" className="font-mono text-[10px] uppercase">
                  {item.type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs rounded-xl border border-border bg-muted/20 p-3.5 font-mono">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Maturity</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                  &bull; {item.meta.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Version</span>
                <span className="font-semibold text-foreground">v{item.meta.version}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Category</span>
                <span className="font-semibold text-foreground capitalize">{item.meta.category}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Accessibility</span>
                <span className="font-semibold text-foreground">{item.meta.accessibility ?? "Standard"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/15 p-3.5 space-y-2">
            <span className="text-[11px] font-semibold text-foreground block">Canonical Distribution Endpoint</span>
            <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted-foreground bg-background border border-border rounded-lg px-3 py-2">
              <span className="truncate">{canonicalUrl}</span>
              <a
                href={canonicalUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-foreground hover:underline font-sans text-xs"
              >
                Test Endpoint &rarr;
              </a>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Files */}
        <TabsContent value="files" className="p-0 m-0 outline-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-5 py-3 font-semibold text-foreground">Source Registry File</th>
                  <th className="px-5 py-3 font-semibold text-foreground">Target Destination</th>
                  <th className="px-5 py-3 font-semibold text-foreground">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {item.files.map((file) => (
                  <tr key={file.path} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-muted-foreground">{file.path}</td>
                    <td className="px-5 py-3.5 font-mono text-foreground font-medium">{file.target}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{file.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Tab 3: Dependencies */}
        <TabsContent value="dependencies" className="p-5 sm:p-6 space-y-5 m-0 outline-none">
          {/* External Package Dependencies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                External Package Dependencies ({item.dependencies.length})
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">Installed to node_modules via package manager</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {item.dependencies.map((pkg) => (
                <div
                  key={pkg}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/15 px-3 py-2 text-xs"
                >
                  <span className="font-mono text-foreground">{pkg}</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    npm package
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Registry Dependencies */}
          <div className="space-y-2 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Registry Dependencies ({item.registryDependencies.length})
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">Other source items resolved recursively</span>
            </div>
            {item.registryDependencies.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                None. This component is completely self-contained and introduces zero upstream registry dependencies.
              </p>
            ) : (
              <div className="space-y-1">
                {item.registryDependencies.map((dep) => (
                  <div key={dep} className="font-mono text-xs text-foreground">{dep}</div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 4: Tokens */}
        {item.cssVars && (
          <TabsContent value="tokens" className="p-0 m-0 outline-none">
            <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              <div className="p-5 space-y-3">
                <span className="text-xs font-semibold text-foreground block">Light Theme CSS Variables</span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {Object.entries(item.cssVars.light).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-foreground">{k}</span>
                      <span className="text-muted-foreground truncate max-w-[140px]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-xs font-semibold text-foreground block">Dark Theme CSS Variables</span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {Object.entries(item.cssVars.dark).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-foreground">{k}</span>
                      <span className="text-muted-foreground truncate max-w-[140px]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {/* Tab 5: Raw JSON */}
        <TabsContent value="raw" className="p-0 m-0 outline-none">
          <div className="relative bg-muted/30 p-4 font-mono text-xs overflow-x-auto max-h-96">
            <pre className="text-foreground leading-relaxed">
              <code>{JSON.stringify(item, null, 2)}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * 2. RegistryExplorer
 * Searchable, filterable catalog of all published HaloUI registry resources.
 */
export function RegistryExplorer() {
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);

  const items = Object.values(REAL_REGISTRY_ITEMS).filter((it) => {
    const matchesSearch =
      search.trim() === "" ||
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.title.toLowerCase().includes(search.toLowerCase()) ||
      it.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || it.meta.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const copyInstall = (slug: string) => {
    const cmd = `pnpm dlx shadcn@latest add https://haloui.dev/r/${slug}.json`;
    navigator.clipboard.writeText(cmd);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* Search and Filter Bar */}
      <div className="border-b border-border bg-muted/40 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <HaloIcon
            icon={Search01Icon}
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search registry items..."
            className="h-8 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {(["all", "actions", "foundations"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors capitalize",
                categoryFilter === cat
                  ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {cat === "all" ? "All Resources" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="divide-y divide-border/60">
        {items.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground">
            No registry items found matching &quot;{search}&quot;. Try an alternate term or category.
          </div>
        ) : (
          items.map((it) => (
            <div key={it.name} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/15 transition-colors">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground">{it.title}</h4>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {it.name}
                  </Badge>
                  <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 font-mono text-[10px] font-semibold">
                    {it.meta.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{it.description}</p>
                <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground pt-1">
                  <span>{it.files.length} source files</span>
                  <span>&bull;</span>
                  <span>{it.dependencies.length} packages</span>
                  <span>&bull;</span>
                  <span>{it.meta.accessibility}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copyInstall(it.name)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-muted"
                >
                  <HaloIcon
                    icon={copiedSlug === it.name ? CheckmarkCircle01Icon : Copy01Icon}
                    size={13}
                    className={copiedSlug === it.name ? "text-emerald-500" : ""}
                  />
                  <span>{copiedSlug === it.name ? "Copied" : "Copy Install"}</span>
                </button>
                <a
                  href={`/r/${it.name}.json`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <HaloIcon icon={FileCodeIcon} size={13} />
                  <span>JSON</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * 3. InstallInspector
 * Pre-install inspection card displaying exact file, dependency, and token modifications before running the CLI.
 */
export function InstallInspector() {
  const [copied, setCopied] = React.useState(false);
  const cmd = "pnpm dlx shadcn@latest add https://haloui.dev/r/button.json";

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 mb-4">
        <div>
          <span className="text-xs font-semibold text-foreground">Pre-Installation Impact Summary</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Exact file additions and package requirements introduced into your repository by <code className="font-mono text-foreground">button.json</code>.
          </p>
        </div>
        <Badge variant="outline" className="font-mono text-[10px]">
          Target: button.json
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 text-xs mb-4">
        <div className="rounded-xl border border-border bg-muted/20 p-3.5 space-y-1">
          <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold block">Files Added</span>
          <span className="text-base font-bold text-foreground">3 Files</span>
          <p className="text-[11px] text-muted-foreground">halo-button.tsx, halo-icon.tsx, halo-tokens.css</p>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-3.5 space-y-1">
          <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold block">NPM Dependencies</span>
          <span className="text-base font-bold text-foreground">6 Packages</span>
          <p className="text-[11px] text-muted-foreground">Hugeicons, Radix Slot, CVA, Tailwind Merge</p>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-3.5 space-y-1">
          <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold block">Runtime Model</span>
          <span className="text-base font-bold text-foreground">Source-Owned</span>
          <p className="text-[11px] text-muted-foreground">Zero hidden runtime library overhead</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3.5 py-2">
        <code className="font-mono text-xs text-foreground truncate">{cmd}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
        >
          <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={13} className={copied ? "text-emerald-500" : ""} />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
