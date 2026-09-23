"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; title: string; level: 2 | 3 };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function DocsToc({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [items, setItems] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-docs-scrollport]");
    if (!root) return;

    root.scrollTo({ top: 0 });
    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2:not([data-toc-ignore]), h3:not([data-toc-ignore])"),
    );
    const used = new Map<string, number>();
    const nextItems = headings.map((heading) => {
      const base = heading.id || slugify(heading.textContent ?? "section") || "section";
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      const id = heading.id || (count === 0 ? base : `${base}-${count + 1}`);
      if (!heading.id) {
        heading.id = id;
      }
      return { id, title: heading.textContent?.trim() ?? id, level: Number(heading.tagName.slice(1)) as 2 | 3 };
    });

    setItems(nextItems);
    setActiveId(nextItems[0]?.id ?? "");

    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? root.querySelector<HTMLElement>(`#${CSS.escape(hash)}`) : null;
    requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));

    const restoreHash = () => {
      const nextHash = decodeURIComponent(window.location.hash.slice(1));
      if (!nextHash) {
        root.scrollTo({ top: 0 });
        return;
      }
      root.querySelector<HTMLElement>(`#${CSS.escape(nextHash)}`)?.scrollIntoView({ block: "start" });
    };
    window.addEventListener("hashchange", restoreHash);
    window.addEventListener("popstate", restoreHash);

    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry));
        const intersecting = headings
          .filter((heading) => visible.get(heading.id)?.isIntersecting)
          .sort((a, b) => a.offsetTop - b.offsetTop);

        if (intersecting[0]) {
          setActiveId(intersecting[0].id);
          return;
        }

        const passed = headings.filter((heading) => heading.offsetTop <= root.scrollTop + 128);
        setActiveId(passed.at(-1)?.id ?? headings[0]?.id ?? "");
      },
      { root, rootMargin: "-88px 0px -68% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", restoreHash);
      window.removeEventListener("popstate", restoreHash);
    };
  }, [pathname]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
    target.focus({ preventScroll: true });
    setActiveId(id);
  };

  if (items.length === 0) return null;

  if (compact) {
    return (
      <details className="rounded-lg border border-border bg-background px-3 py-2 xl:hidden">
        <summary className="cursor-pointer text-sm font-medium">On this page</summary>
        <TocLinks items={items} activeId={activeId} onNavigate={navigate} className="mt-3 pb-1" />
      </details>
    );
  }

  return (
    <nav aria-label="On this page" className="h-full overflow-y-auto px-5 py-7">
      <p className="mb-3 text-xs font-medium text-foreground">On this page</p>
      <TocLinks items={items} activeId={activeId} onNavigate={navigate} />
    </nav>
  );
}

function TocLinks({
  items,
  activeId,
  onNavigate,
  className,
}: {
  items: TocItem[];
  activeId: string;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1", className)}>
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "pl-3")}>
          <a
            href={`#${item.id}`}
            onClick={(event) => onNavigate(event, item.id)}
            aria-current={activeId === item.id ? "location" : undefined}
            className={cn(
              "block border-l py-1 pl-3 text-xs leading-5 transition-colors",
              activeId === item.id
                ? "border-foreground font-medium text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
