"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Search01Icon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  FilterIcon,
  CodeIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
  controlledPair?: string;
  isGeneric?: boolean;
}

export interface SubcomponentApi {
  name: string;
  kind?: "Component" | "Subcomponent" | "Compound Child" | "Hook" | "Type";
  maturity?: "stable" | "preview" | "experimental";
  description: string;
  props: PropItem[];
  inheritedProps?: {
    element: string;
    description: string;
  };
  typeGenerics?: string;
}

export interface PropsExplorerProps {
  title?: string;
  description?: string;
  subcomponents: SubcomponentApi[];
  className?: string;
}

/* -------------------------------------------------------------------------
 * PROFESSIONAL PROPS / API EXPLORER
 * Source-accurate, container-responsive documentation tool with local search,
 * subcomponent switching, type copying, and collapsible inherited attributes.
 * Strictly uses neutral shadcn docs tokens — zero liquid glass in documentation chrome.
 * ----------------------------------------------------------------------- */

export function PropsExplorer({
  title = "Props & API Reference",
  description = "Explore public component interfaces, prop contracts, density modifiers, and inherited HTML attributes.",
  subcomponents,
  className,
}: PropsExplorerProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    subcomponents[0]?.name ?? ""
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filterMode, setFilterMode] = React.useState<"all" | "required" | "optional">("all");
  const [showInherited, setShowInherited] = React.useState<boolean>(false);
  const [copiedType, setCopiedType] = React.useState<string | null>(null);

  const currentSubcomponent =
    subcomponents.find((s) => s.name === activeTab) ?? subcomponents[0];

  // Filter props based on search query & required/optional filter
  const filteredProps = React.useMemo(() => {
    if (!currentSubcomponent) return [];
    return currentSubcomponent.props.filter((prop) => {
      // Filter mode match
      if (filterMode === "required" && !prop.required) return false;
      if (filterMode === "optional" && prop.required) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        prop.name.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q) ||
        prop.description.toLowerCase().includes(q)
      );
    });
  }, [currentSubcomponent, searchQuery, filterMode]);

  const handleCopyType = (typeText: string, propName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(typeText);
      setCopiedType(propName);
      setTimeout(() => setCopiedType(null), 1800);
    }
  };

  if (!currentSubcomponent) return null;

  return (
    <div
      data-slot="props-explorer"
      className={cn(
        "@container/props-explorer my-8 w-full rounded-2xl border border-border bg-card text-foreground shadow-xs",
        className
      )}
    >
      {/* 1. Header Toolbar */}
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {currentSubcomponent.maturity && (
              <Badge
                variant={
                  currentSubcomponent.maturity === "stable"
                    ? "secondary"
                    : "outline"
                }
                className="capitalize text-xs font-medium"
              >
                {currentSubcomponent.maturity}
              </Badge>
            )}
            {currentSubcomponent.kind && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                {currentSubcomponent.kind}
              </Badge>
            )}
          </div>
        </div>

        {/* 2. Subcomponent Navigation Tabs (when multiple subcomponents exist) */}
        {subcomponents.length > 1 && (
          <div
            role="tablist"
            aria-label="Component sub-primitives"
            className="flex flex-wrap items-center gap-1.5 overflow-x-auto rounded-lg bg-muted/60 p-1 text-xs"
          >
            {subcomponents.map((sub) => {
              const isActive = sub.name === activeTab;
              return (
                <button
                  key={sub.name}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(sub.name);
                    setSearchQuery("");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors",
                    isActive
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                  )}
                >
                  <code className="font-mono text-xs">{`<${sub.name}>`}</code>
                  <span className="text-[10px] text-muted-foreground">
                    ({sub.props.length})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Subcomponent Context Banner */}
        <div className="flex flex-col gap-1 rounded-lg border border-border/70 bg-muted/20 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs font-semibold text-foreground">
              {currentSubcomponent.name}
            </span>
            {currentSubcomponent.typeGenerics && (
              <span className="font-mono text-[11px] text-muted-foreground">
                {currentSubcomponent.typeGenerics}
              </span>
            )}
            <span className="text-xs text-muted-foreground">—</span>
            <span className="text-xs text-muted-foreground">
              {currentSubcomponent.description}
            </span>
          </div>
        </div>

        {/* 3. Search & Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <HaloIcon
              icon={Search01Icon}
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder={`Search ${currentSubcomponent.name} props...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-xs bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <HaloIcon icon={FilterIcon} size={12} />
              Filter:
            </span>
            {(["all", "required", "optional"] as const).map((mode) => (
              <Button
                key={mode}
                size="sm"
                variant={filterMode === mode ? "secondary" : "ghost"}
                onClick={() => setFilterMode(mode)}
                className="h-7 px-2.5 text-xs capitalize"
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Props Display Area */}
      {filteredProps.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-muted-foreground">
          <p className="font-medium text-foreground">No matching props found</p>
          <p className="mt-1">
            Try adjusting your search query or reset the filter mode to &quot;all&quot;.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setFilterMode("all");
            }}
            className="mt-3 h-7 text-xs"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          {/* A. Wide Container Table View (hidden below container width 560px) */}
          <div className="hidden @[560px]/props-explorer:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                  <th className="py-2.5 pl-4 pr-3 font-medium">Prop</th>
                  <th className="py-2.5 px-3 font-medium">Type</th>
                  <th className="py-2.5 px-3 font-medium">Default</th>
                  <th className="py-2.5 pl-3 pr-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredProps.map((prop) => (
                  <tr
                    key={prop.name}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Prop Name */}
                    <td className="py-3 pl-4 pr-3 align-top">
                      <div className="flex flex-col gap-1 items-start">
                        <code className="font-mono text-xs font-semibold text-foreground">
                          {prop.name}
                        </code>
                        {prop.required ? (
                          <Badge
                            variant="destructive"
                            className="h-4 px-1.5 text-[10px] uppercase font-semibold"
                          >
                            Required
                          </Badge>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">
                            Optional
                          </span>
                        )}
                        {prop.controlledPair && (
                          <span className="text-[10px] font-mono text-primary/80">
                            pair: {prop.controlledPair}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Type with Copy */}
                    <td className="py-3 px-3 align-top max-w-[220px]">
                      <div className="group relative flex items-start gap-1">
                        <code className="block rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground/90 break-words whitespace-pre-wrap">
                          {prop.type}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopyType(prop.type, prop.name)}
                          title="Copy type definition"
                          className="mt-0.5 inline-flex items-center text-muted-foreground hover:text-foreground opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                          <HaloIcon
                            icon={
                              copiedType === prop.name
                                ? CheckmarkCircle01Icon
                                : Copy01Icon
                            }
                            size={12}
                          />
                        </button>
                      </div>
                    </td>

                    {/* Default */}
                    <td className="py-3 px-3 align-top font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      {prop.default ? (
                        <code className="rounded bg-muted/40 px-1 py-0.5 text-foreground">
                          {prop.default}
                        </code>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Description */}
                    <td className="py-3 pl-3 pr-4 align-top text-xs text-muted-foreground leading-relaxed">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* B. Narrow Container Stacked Cards View (visible below container width 560px) */}
          <div className="block @[560px]/props-explorer:hidden divide-y divide-border/60">
            {filteredProps.map((prop) => (
              <div key={prop.name} className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-xs font-semibold text-foreground">
                    {prop.name}
                  </code>
                  {prop.required ? (
                    <Badge
                      variant="destructive"
                      className="h-4 px-1.5 text-[10px] uppercase font-semibold"
                    >
                      Required
                    </Badge>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">
                      Optional
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 rounded bg-muted/40 p-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                    <span>Type:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyType(prop.type, prop.name)}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      <HaloIcon
                        icon={
                          copiedType === prop.name
                            ? CheckmarkCircle01Icon
                            : Copy01Icon
                        }
                        size={11}
                      />
                      <span>{copiedType === prop.name ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <code className="text-foreground/90 break-words whitespace-pre-wrap">
                    {prop.type}
                  </code>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground text-[11px]">Default:</span>
                  <code className="font-mono text-[11px] text-foreground">
                    {prop.default ? prop.default : "—"}
                  </code>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 5. Inherited HTML Attributes Drawer / Collapsible */}
      {currentSubcomponent.inheritedProps && (
        <div className="border-t border-border/80 bg-muted/15 p-4 text-xs">
          <button
            type="button"
            onClick={() => setShowInherited((prev) => !prev)}
            className="flex w-full items-center justify-between text-left font-medium text-foreground hover:text-primary transition-colors"
          >
            <span className="flex items-center gap-2">
              <HaloIcon icon={CodeIcon} size={14} className="text-muted-foreground" />
              <span>
                Inherited Native Attributes:{" "}
                <code className="font-mono text-xs">
                  {currentSubcomponent.inheritedProps.element}
                </code>
              </span>
            </span>
            <HaloIcon
              icon={showInherited ? ArrowUp01Icon : ArrowDown01Icon}
              size={14}
              className="text-muted-foreground"
            />
          </button>

          {showInherited && (
            <div className="mt-3 rounded-lg border border-border/70 bg-card p-3 text-muted-foreground leading-relaxed">
              <p>{currentSubcomponent.inheritedProps.description}</p>
              <p className="mt-2 text-[11px]">
                All standard HTML attributes, ARIA accessibility attributes, data
                attributes, event handlers (<code className="font-mono">onClick</code>,{" "}
                <code className="font-mono">onKeyDown</code>, etc.), and ref
                forwarding are preserved and passed directly to the underlying element.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
