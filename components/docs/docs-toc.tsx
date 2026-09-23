"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav";
import { HaloIcon } from "@/components/icons/halo-icon";
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
  const [readingProgress, setReadingProgress] = React.useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
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

    const scrollToTarget = (element: HTMLElement, smooth = false) => {
      const usesInnerScroll = window.matchMedia("(min-width: 64rem)").matches;
      if (usesInnerScroll) {
        const targetTop = element.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
        root.scrollTo({ top: targetTop - 16, behavior: smooth ? "smooth" : "auto" });
        window.scrollTo(0, 0);
      } else {
        element.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      }
    };

    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? root.querySelector<HTMLElement>(`#${CSS.escape(hash)}`) : null;
    if (target) {
      requestAnimationFrame(() => scrollToTarget(target, false));
    }

    const restoreHash = () => {
      const nextHash = decodeURIComponent(window.location.hash.slice(1));
      if (!nextHash) {
        root.scrollTo({ top: 0 });
        window.scrollTo(0, 0);
        return;
      }
      const hashTarget = root.querySelector<HTMLElement>(`#${CSS.escape(nextHash)}`);
      if (hashTarget) {
        scrollToTarget(hashTarget, false);
      }
    };
    window.addEventListener("hashchange", restoreHash);
    window.addEventListener("popstate", restoreHash);

    const updateReadingState = () => {
      const usesInnerScroll = window.matchMedia("(min-width: 64rem)").matches;
      const activationLine = usesInnerScroll ? root.getBoundingClientRect().top + 112 : 128;
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= activationLine);
      setActiveId(passed.at(-1)?.id ?? headings[0]?.id ?? "");

      if (usesInnerScroll) {
        const maximum = root.scrollHeight - root.clientHeight;
        setReadingProgress(maximum > 0 ? Math.min(100, Math.max(0, (root.scrollTop / maximum) * 100)) : 100);
        return;
      }

      const rootTop = window.scrollY + root.getBoundingClientRect().top;
      const maximum = rootTop + root.scrollHeight - window.innerHeight;
      const available = maximum - rootTop;
      setReadingProgress(available > 0 ? Math.min(100, Math.max(0, ((window.scrollY - rootTop) / available) * 100)) : 100);
    };

    updateReadingState();
    root.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("resize", updateReadingState);
    return () => {
      root.removeEventListener("scroll", updateReadingState);
      window.removeEventListener("scroll", updateReadingState);
      window.removeEventListener("resize", updateReadingState);
      window.removeEventListener("hashchange", restoreHash);
      window.removeEventListener("popstate", restoreHash);
    };
  }, [pathname]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const root = document.querySelector<HTMLElement>("[data-docs-scrollport]");
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const usesInnerScroll = window.matchMedia("(min-width: 64rem)").matches;
    if (root && usesInnerScroll) {
      const targetTop = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
      root.scrollTo({ top: targetTop - 16, behavior: reduceMotion ? "auto" : "smooth" });
      window.scrollTo(0, 0);
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    window.history.pushState(null, "", `#${id}`);
    target.focus({ preventScroll: true });
    setActiveId(id);
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  if (compact) {
    const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
    const activeItem = items[activeIndex];
    const radius = 8;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (readingProgress / 100) * circumference;

    return (
      <div className="sticky top-[var(--site-header-height)] z-40 flex h-14 shrink-0 border-b border-border bg-background/96 backdrop-blur-xl xl:hidden">
        <div className="border-r border-border lg:hidden">
          <MobileDocsNav iconOnly />
        </div>

        <details className="group relative min-w-0 flex-1">
          <summary className="flex h-full cursor-pointer list-none items-center gap-3 px-4 pr-5 outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <span className="relative grid size-6 shrink-0 place-items-center" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="size-5 -rotate-90" fill="none">
                <circle cx="10" cy="10" r={radius} className="stroke-border" strokeWidth="1.5" />
                <circle
                  cx="10"
                  cy="10"
                  r={radius}
                  className="stroke-foreground transition-[stroke-dashoffset] duration-150 motion-reduce:transition-none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                />
              </svg>
              <span className="absolute size-1 rounded-full bg-foreground" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {activeItem?.title ?? "On this page"}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {items.length > 0 ? `${activeIndex + 1} of ${items.length} sections` : "Page topics"}
              </span>
            </span>

            <HaloIcon
              icon={ArrowDown01Icon}
              size={15}
              className="text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>

          {items.length > 0 && (
            <div className="absolute left-0 right-0 top-full max-h-[min(24rem,calc(100dvh-8rem))] overflow-y-auto border-b border-border bg-background px-4 py-4 shadow-[0_18px_40px_-28px_rgb(0_0_0/45%)]">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">On this page</p>
              <TocLinks items={items} activeId={activeId} onNavigate={navigate} />
            </div>
          )}

          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border" aria-hidden="true">
            <span
              className="block h-full bg-foreground transition-[width] duration-150 motion-reduce:transition-none"
              style={{ width: `${readingProgress}%` }}
            />
          </span>
        </details>
      </div>
    );
  }

  if (items.length === 0) return null;

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
