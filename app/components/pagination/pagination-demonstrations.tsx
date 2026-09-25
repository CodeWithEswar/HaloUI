"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function PaginationDemonstrations() {
  const [demoPage, setDemoPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<string>("20");

  return (
    <div className="space-y-12">
      {/* 1. First Page Boundary State */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">1. First Page State (Unavailable Previous)</h3>
        <p className="text-sm text-muted-foreground">
          When the user is situated on the root page destination, the Previous control renders as an unnavigable, semantic disabled link (<code className="font-mono text-xs">aria-disabled=&quot;true&quot;</code>, <code className="font-mono text-xs">tabIndex=-1</code>) preventing accidental loops.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#prev" isDisabled />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#1" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#2">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#3">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#10">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#next" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      {/* 2. Middle Page State (Both Directions Active with Bilateral Ellipses) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">2. Deep Middle Page (Bilateral Ellipses)</h3>
        <p className="text-sm text-muted-foreground">
          Navigating deeper into a collection renders bilateral informational ellipses while preserving the root boundary (Page 1) and terminal boundary (Page 24).
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#prev" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#1">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#11">11</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#12" isActive>
                  12
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#13">13</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#24">24</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#next" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      {/* 3. Last Page Boundary State */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">3. Last Page State (Unavailable Next)</h3>
        <p className="text-sm text-muted-foreground">
          At the terminal page, the Next control is marked with <code className="font-mono text-xs">aria-disabled=&quot;true&quot;</code> and muted visual opacity, signaling collection terminus.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#prev" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#1">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#18">18</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#19">19</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#20" isActive>
                  20
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#next" isDisabled />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      {/* 4. Compact / Icon-Only Pagination */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">4. Compact Icon-Only Navigation</h3>
        <p className="text-sm text-muted-foreground">
          For narrow cards, mobile drawer footers, or embedded dialogs, text labels on Previous and Next can be omitted to conserve horizontal real estate.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <div className="max-w-sm mx-auto p-4 rounded-xl border border-dashed border-border/80 bg-muted/10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#prev" text="" className="px-2" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#2" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#3">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#next" text="" className="px-2" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* 5. With Result Summary and Page Size Selector */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">5. Table Footer Composition (Summary + Page Size)</h3>
        <p className="text-sm text-muted-foreground">
          Pagination maintains strict separation of concerns. Result counts and page-size dropdowns compose cleanly alongside the pagination landmark without bloating the core primitive.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-t border-b border-border/60">
            {/* Result Context */}
            <div className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">21–40</span> of{" "}
              <span className="font-semibold text-foreground">243</span> records
            </div>

            {/* Pagination Controls */}
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#prev" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#2" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#3">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#13">13</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#next" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Rows per page:</span>
              <Select value={pageSize} onValueChange={(val) => setPageSize(val ?? "20")}>
                <SelectTrigger size="sm" className="h-8 w-18 text-xs font-mono">
                  <SelectValue>{pageSize}</SelectValue>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-Digit Large Counts Geometry QA */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">6. Multi-Digit Geometry Stability</h3>
        <p className="text-sm text-muted-foreground">
          Verify that single-digit (<code className="font-mono text-xs">1</code>), double-digit (<code className="font-mono text-xs">99</code>), and four-digit (<code className="font-mono text-xs">9999</code>) page destinations maintain harmonious touch targets without layout shifts.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#prev" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#1">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#99">99</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#100" isActive>
                  100
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#9999" className="px-2 w-auto">
                  9999
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#next" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
}
