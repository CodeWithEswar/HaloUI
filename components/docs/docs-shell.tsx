"use client";

import * as React from "react";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";

export function DocsShell({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Synchronize window scroll and desktop inner scrollport when expanding or resizing viewports
    const syncScrollOnBreakpoint = () => {
      const isDesktop = window.innerWidth >= 1024;
      const scrollport = document.querySelector<HTMLElement>("[data-docs-scrollport]");

      if (isDesktop) {
        // If window has residual scroll from mobile/tablet viewport, reset it immediately to 0.
        // This prevents the desktop fixed-viewport layout from being shifted upward and leaving a gap at the bottom!
        if (window.scrollY > 0) {
          const currentWindowScroll = window.scrollY;
          window.scrollTo(0, 0);
          if (scrollport && scrollport.scrollTop === 0) {
            scrollport.scrollTop = currentWindowScroll;
          }
        }
      } else {
        // When shrinking to mobile/tablet, if inner scrollport was scrolled, transfer it to window
        if (scrollport && scrollport.scrollTop > 0 && window.scrollY === 0) {
          const currentInnerScroll = scrollport.scrollTop;
          window.scrollTo(0, currentInnerScroll);
        }
      }
    };

    // Run immediately on mount to clear any residual scroll position on desktop
    syncScrollOnBreakpoint();

    window.addEventListener("resize", syncScrollOnBreakpoint, { passive: true });
    window.addEventListener("orientationchange", syncScrollOnBreakpoint, { passive: true });

    return () => {
      window.removeEventListener("resize", syncScrollOnBreakpoint);
      window.removeEventListener("orientationchange", syncScrollOnBreakpoint);
    };
  }, []);

  return (
    <div
      data-docs-shell
      className="docs-shell flex w-full flex-1 flex-col min-h-[calc(100vh-var(--site-header-height))] min-h-[calc(100dvh-var(--site-header-height))] lg:h-[calc(100vh-var(--site-header-height))] lg:h-[calc(100dvh-var(--site-header-height))] lg:min-h-0"
    >
      <DocsToc compact />

      <div className="grid min-h-0 flex-1 h-full grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_15rem]">
        <aside className="hidden min-h-0 h-full border-r border-border bg-background lg:block overflow-hidden">
          <DocsSidebar />
        </aside>

        <main
          id="docs-content"
          data-docs-scrollport
          tabIndex={-1}
          className="no-scrollbar min-w-0 scroll-pt-[5.75rem] overflow-x-hidden px-4 py-5 outline-none sm:px-6 lg:h-full lg:overflow-y-auto lg:px-8 lg:py-8"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="docs-content w-full">{children}</div>
            <DocsPagination />
          </div>
        </main>

        <aside className="hidden min-h-0 h-full border-l border-border bg-background xl:block overflow-hidden">
          <DocsToc />
        </aside>
      </div>
    </div>
  );
}
