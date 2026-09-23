import * as React from "react";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-docs-shell
      className="docs-shell flex min-h-[calc(100dvh-var(--site-header-height))] flex-col lg:h-[calc(100dvh-var(--site-header-height))] lg:min-h-0"
    >
      <DocsToc compact />

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_15rem]">
        <aside className="hidden min-h-0 border-r border-border bg-background lg:block">
          <DocsSidebar />
        </aside>

        <main
          id="docs-content"
          data-docs-scrollport
          tabIndex={-1}
          className="no-scrollbar min-w-0 scroll-pt-[5.75rem] overflow-x-hidden px-4 py-5 outline-none sm:px-6 lg:h-full lg:overflow-y-auto lg:px-8 lg:py-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="docs-content">{children}</div>
            <DocsPagination />
          </div>
        </main>

        <aside className="hidden min-h-0 border-l border-border bg-background xl:block">
          <DocsToc />
        </aside>
      </div>
    </div>
  );
}
