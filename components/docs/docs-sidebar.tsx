"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search01Icon,
  CheckmarkCircle01Icon,
  ViewIcon,
  FlashIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { docsNavigation } from "@/lib/docs/navigation";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: typeof CheckmarkCircle01Icon; className: string }
> = {
  stable: {
    label: "Stable",
    icon: CheckmarkCircle01Icon,
    className: "text-emerald-500 hover:text-emerald-400",
  },
  preview: {
    label: "Preview",
    icon: ViewIcon,
    className: "text-sky-400 hover:text-sky-300",
  },
  experimental: {
    label: "Experimental",
    icon: FlashIcon,
    className: "text-amber-400 hover:text-amber-300",
  },
  deprecated: {
    label: "Deprecated",
    icon: AlertCircleIcon,
    className: "text-rose-400 hover:text-rose-300",
  },
};

type DocsSidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function DocsSidebar({ onNavigate, className }: DocsSidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const sections = docsNavigation
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        [item.title, item.description, ...(item.keywords ?? [])]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery)),
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <nav aria-label="Documentation" className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className="border-b border-border p-4">
        <label className="relative block">
          <span className="sr-only">Filter documentation navigation</span>
          <HaloIcon
            icon={Search01Icon}
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter navigation..."
            className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-7">
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={`nav-${section.title.replaceAll(" ", "-").toLowerCase()}`}>
              <h2
                id={`nav-${section.title.replaceAll(" ", "-").toLowerCase()}`}
                className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {section.title}
              </h2>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href || (item.href === "/docs" && pathname === "/docs/introduction");
                  const statusInfo = item.status ? STATUS_CONFIG[item.status] : null;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        scroll={false}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex min-h-8 items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        {statusInfo && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className={cn(
                                  "inline-flex shrink-0 items-center justify-center p-0.5 transition-colors opacity-75 group-hover:opacity-100",
                                  statusInfo.className
                                )}
                                aria-label={statusInfo.label}
                              >
                                <HaloIcon icon={statusInfo.icon} size={14} />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-[11px] font-mono capitalize">
                              {statusInfo.label}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {sections.length === 0 && (
            <p className="px-2 text-sm text-muted-foreground">No navigation items match “{query}”.</p>
          )}
        </div>
      </div>
    </nav>
  );
}
