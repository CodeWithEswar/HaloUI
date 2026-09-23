import * as React from "react";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav";

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
      <div
        data-docs-shell
        className="docs-shell grid min-h-[calc(100dvh-var(--site-header-height))] grid-cols-1 lg:h-[calc(100dvh-var(--site-header-height))] lg:min-h-0 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_15rem]"
      >
        <aside className="hidden min-h-0 border-r border-border bg-background lg:block">
          <DocsSidebar />
        </aside>

        <main
          id="docs-content"
          data-docs-scrollport
          tabIndex={-1}
          className="no-scrollbar min-w-0 scroll-pt-24 overflow-x-hidden px-4 py-5 outline-none sm:px-6 lg:h-full lg:overflow-y-auto lg:px-8 lg:py-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
              <MobileDocsNav />
            </div>
            <DocsToc compact />
            <div className="docs-content pt-5 xl:pt-0">{children}</div>
            <DocsPagination />
          </div>
        </main>

        <aside className="hidden min-h-0 border-l border-border bg-background xl:block">
          <DocsToc />
        </aside>
      </div>
  );
}
