"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { docsNavigation } from "@/lib/docs/navigation";
import { cn } from "@/lib/utils";

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
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        scroll={false}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-8 items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        )}
                      >
                        <span>{item.title}</span>
                        {item.status && (
                          <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
                            {item.status}
                          </span>
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
