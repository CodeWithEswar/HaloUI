"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function PaginationPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls
  const [currentPage, setCurrentPage] = React.useState<number>(4);
  const [totalPages, setTotalPages] = React.useState<number>(12);
  const [siblingCount, setSiblingCount] = React.useState<number>(1);
  const [showTextLabels, setShowTextLabels] = React.useState<boolean>(true);
  const [copiedCode, setCopiedCode] = React.useState<boolean>(false);

  // Calculate visible page sequence deterministically
  const pages = React.useMemo(() => {
    const isMobile = viewport === "mobile";
    const effectiveSiblings = isMobile ? 0 : siblingCount;
    const totalNumbers = effectiveSiblings * 2 + 3; // current + siblings + first + last
    const totalBlocks = totalNumbers + 2; // + 2 ellipsis

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - effectiveSiblings, 1);
    const rightSiblingIndex = Math.min(currentPage + effectiveSiblings, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * effectiveSiblings;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots-right", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * effectiveSiblings;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "dots-left", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "dots-left", ...middleRange, "dots-right", totalPages];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [currentPage, totalPages, siblingCount, viewport]);

  const generatedCode = React.useMemo(() => {
    return `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export function ResultsPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="?page=${Math.max(currentPage - 1, 1)}"
            isDisabled={${currentPage <= 1}}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="?page=1" isActive={${currentPage === 1}}>
            1
          </PaginationLink>
        </PaginationItem>

        ${currentPage > 3 ? `<PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>` : ""}

        <PaginationItem>
          <PaginationLink href="?page=${currentPage}" isActive>
            ${currentPage}
          </PaginationLink>
        </PaginationItem>

        ${currentPage < totalPages - 2 ? `<PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>` : ""}

        <PaginationItem>
          <PaginationLink href="?page=${totalPages}" isActive={${currentPage === totalPages}}>
            ${totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="?page=${Math.min(currentPage + 1, totalPages)}"
            isDisabled={${currentPage >= totalPages}}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`;
  }, [currentPage, totalPages]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePageClick = (e: React.MouseEvent, pageNum: number) => {
    e.preventDefault();
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <PreviewStageShell
      title="Pagination Interactive Stage"
      description="Evaluate discrete page navigation across boundaries, optical liquid active page states, keyboard focus, and responsive viewport windows."
      badge="Navigation Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      copied={copiedCode}
      onCopy={copyCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 items-center">
          <StageControlSelect
            label="Current Page"
            value={String(currentPage)}
            onChange={(val) => setCurrentPage(Number(val))}
            options={[
              { value: "1", label: "Page 1 (First)" },
              { value: "4", label: "Page 4 (Middle)" },
              { value: "6", label: "Page 6 (Mid-range)" },
              { value: "10", label: "Page 10 (Near End)" },
              { value: String(totalPages), label: `Page ${totalPages} (Last)` },
            ]}
          />
          <StageControlSelect
            label="Total Pages"
            value={String(totalPages)}
            onChange={(val) => {
              const nextTotal = Number(val);
              setTotalPages(nextTotal);
              if (currentPage > nextTotal) setCurrentPage(nextTotal);
            }}
            options={[
              { value: "5", label: "5 Pages (Compact)" },
              { value: "12", label: "12 Pages (Standard)" },
              { value: "50", label: "50 Pages (Large Collection)" },
            ]}
          />
          <StageControlSelect
            label="Window Size"
            value={String(siblingCount)}
            onChange={(val) => setSiblingCount(Number(val))}
            options={[
              { value: "1", label: "±1 Sibling (Compact)" },
              { value: "2", label: "±2 Siblings (Broad)" },
            ]}
          />
          <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[40px]">
            <Checkbox
              id="pagination-toggle-labels"
              checked={showTextLabels}
              onCheckedChange={(checked) => setShowTextLabels(Boolean(checked))}
            />
            <Label
              htmlFor="pagination-toggle-labels"
              className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
            >
              Text Labels
            </Label>
          </div>
        </div>
      }
      telemetry={[
        { label: "Active Page", value: `${currentPage} of ${totalPages}`, variant: "success" },
        { label: "Prev State", value: currentPage <= 1 ? "Unavailable" : `Page ${currentPage - 1}` },
        { label: "Next State", value: currentPage >= totalPages ? "Unavailable" : `Page ${currentPage + 1}` },
        { label: "A11y Role", value: 'nav[aria-label="pagination"]' },
      ]}
    >
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="p-4 sm:p-6 rounded-xl border border-border/80 bg-card/40 backdrop-blur-xs overflow-x-auto no-scrollbar">
          <Pagination>
            <PaginationContent>
              {/* Previous Page Link */}
              <PaginationItem>
                <PaginationPrevious
                  href={`#page-${currentPage - 1}`}
                  text={showTextLabels ? "Previous" : undefined}
                  isDisabled={currentPage <= 1}
                  onClick={(e) => handlePageClick(e, currentPage - 1)}
                />
              </PaginationItem>

              {/* Numbered Page Links & Ellipses */}
              {pages.map((p, idx) => {
                if (typeof p === "string") {
                  return (
                    <PaginationItem key={`${p}-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                const isActive = p === currentPage;
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href={`#page-${p}`}
                      isActive={isActive}
                      aria-label={`Go to page ${p}`}
                      onClick={(e) => handlePageClick(e, p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Next Page Link */}
              <PaginationItem>
                <PaginationNext
                  href={`#page-${currentPage + 1}`}
                  text={showTextLabels ? "Next" : undefined}
                  isDisabled={currentPage >= totalPages}
                  onClick={(e) => handlePageClick(e, currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Diagnostics & Result Window Information */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/60 text-xs font-mono">
          <div className="text-muted-foreground">
            Current: <span className="text-foreground font-semibold">Page {currentPage}</span>
          </div>
          <div className="text-muted-foreground">
            Total Pages: <span className="text-foreground">{totalPages}</span>
          </div>
          <div className="text-muted-foreground">
            Boundary: <span className="text-foreground">{currentPage === 1 ? "First Page" : currentPage === totalPages ? "Last Page" : "Middle"}</span>
          </div>
          <div className="text-muted-foreground">
            Keyboard Tab: <span className="text-foreground">Sequential 1-N</span>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
