import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center min-w-0", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center gap-1 sm:gap-1.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  );
}

export type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  isDisabled,
  size = "icon",
  onClick,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={isDisabled ? "true" : undefined}
      tabIndex={isDisabled ? -1 : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      data-disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center font-medium select-none isolate overflow-hidden whitespace-nowrap outline-none transition-all duration-150 rounded-lg text-xs sm:text-sm cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10",
        size === "icon" && "size-9 min-w-9 p-0",
        size === "default" && "h-9 px-3 gap-1.5",
        size === "sm" && "h-8 px-2.5 text-xs gap-1 min-w-8",
        size === "lg" && "h-10 px-4 text-sm gap-2 min-w-10",
        isActive
          ? "halo-liquid-glass text-foreground font-semibold border border-border/80 shadow-2xs"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
        isDisabled && "pointer-events-none opacity-40 cursor-not-allowed select-none shadow-none",
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1.5 px-2.5 sm:px-3 text-xs sm:text-sm font-medium h-9 w-auto", className)}
      {...props}
    >
      <HaloIcon icon={ChevronLeftIcon} size={14} className="shrink-0" />
      <span className="hidden sm:inline-block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1.5 px-2.5 sm:px-3 text-xs sm:text-sm font-medium h-9 w-auto", className)}
      {...props}
    >
      <span className="hidden sm:inline-block">{text}</span>
      <HaloIcon icon={ChevronRightIcon} size={14} className="shrink-0" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center text-muted-foreground select-none shrink-0",
        className
      )}
      {...props}
    >
      <HaloIcon icon={MoreHorizontalIcon} size={16} />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
