"use client";

import * as React from "react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type Table as TanStackTable,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableVariant,
  type TableDensity,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Sorting05Icon,
  ViewIcon,
  Search01Icon,
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /**
   * Key of the column to perform client-side text filtering against.
   * If not provided, global filtering or manual filtering can be used.
   */
  searchKey?: string;
  searchPlaceholder?: string;
  /**
   * Enable built-in sorting capabilities.
   * @default true
   */
  enableSorting?: boolean;
  /**
   * Enable built-in search filter toolbar.
   * @default true
   */
  enableFiltering?: boolean;
  /**
   * Enable row selection state and bulk actions.
   * @default true
   */
  enableSelection?: boolean;
  /**
   * Enable column visibility configuration dropdown.
   * @default true
   */
  enableColumnVisibility?: boolean;
  /**
   * Enable client-side or controlled pagination controls.
   * @default true
   */
  enablePagination?: boolean;
  /**
   * Initial page size.
   * @default 10
   */
  pageSize?: number;
  /**
   * Available page size options in pagination select.
   * @default [5, 10, 20, 50]
   */
  pageSizeOptions?: number[];
  /**
   * Controlled sorting state.
   */
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  /**
   * Controlled column filters state.
   */
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  /**
   * Controlled column visibility state.
   */
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  /**
   * Controlled row selection state.
   */
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  /**
   * Visual framing variant passed directly to underlying Table.
   * @default "default"
   */
  variant?: TableVariant;
  /**
   * Spatial density scale passed directly to underlying Table.
   * @default "default"
   */
  density?: TableDensity;
  /**
   * Display alternating zebra striping across table rows.
   * @default false
   */
  striped?: boolean;
  /**
   * Optional custom toolbar action elements (e.g. Export button, Filter pills).
   */
  toolbarActions?: React.ReactNode;
  /**
   * Render custom floating bulk actions when one or more rows are selected.
   */
  floatingActions?: (table: TanStackTable<TData>) => React.ReactNode;
  /**
   * Title displayed when dataset is completely empty.
   * @default "No data available"
   */
  emptyTitle?: string;
  /**
   * Description displayed when dataset is empty or filtered out.
   */
  emptyDescription?: string;
  /**
   * Optional action button slot for empty states (e.g. "Create item").
   */
  emptyAction?: React.ReactNode;
  className?: string;
}

/* -------------------------------------------------------------------------
 * 1. DATA TABLE COLUMN HEADER
 * Accessible, keyboard-navigable column header with explicit aria-sort,
 * sort indicator icons, and semantic action triggers.
 * ----------------------------------------------------------------------- */

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("text-xs font-medium text-muted-foreground", className)}>{title}</div>;
  }

  const isSorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-sort={isSorted === "asc" ? "ascending" : isSorted === "desc" ? "descending" : "none"}
        className={cn(
          "-ml-3 h-8 px-2 text-xs font-medium data-[state=open]:bg-accent",
          isSorted && "text-foreground font-semibold"
        )}
      >
        <span>{title}</span>
        {isSorted === "desc" ? (
          <HaloIcon icon={ArrowDown01Icon} size={14} className="ml-1 text-primary" />
        ) : isSorted === "asc" ? (
          <HaloIcon icon={ArrowUp01Icon} size={14} className="ml-1 text-primary" />
        ) : (
          <HaloIcon icon={Sorting05Icon} size={14} className="ml-1 text-muted-foreground/60" />
        )}
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. DATA TABLE VIEW OPTIONS (COLUMN VISIBILITY)
 * Accessible dropdown menu allowing users to toggle column visibility.
 * ----------------------------------------------------------------------- */

export interface DataTableViewOptionsProps<TData> {
  table: TanStackTable<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  if (columns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <HaloIcon icon={ViewIcon} size={14} />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel className="text-xs">Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="text-xs capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -------------------------------------------------------------------------
 * 3. DATA TABLE PAGINATION
 * Fully responsive pagination toolbar coordinating page navigation,
 * page size selection, and explicit selected row counts.
 * ----------------------------------------------------------------------- */

export interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTablePaginationProps<TData>) {
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const totalRowCount = table.getFilteredRowModel().rows.length;

  return (
    <div
      data-slot="data-table-pagination"
      className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground"
    >
      {/* Selection count */}
      <div className="flex-1">
        {selectedRowCount > 0 ? (
          <span className="font-medium text-foreground">
            {selectedRowCount} of {totalRowCount} row(s) selected
          </span>
        ) : (
          <span>Total {totalRowCount} records</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Rows per page selector */}
        <div className="flex items-center space-x-2">
          <p className="text-xs font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-xs">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page status */}
        <div className="flex w-[100px] items-center justify-center text-xs font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() > 0 ? table.getPageCount() : 1}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
          >
            <HaloIcon icon={ArrowLeftDoubleIcon} size={14} />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <HaloIcon icon={ArrowLeft01Icon} size={14} />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            <HaloIcon icon={ArrowRight01Icon} size={14} />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
          >
            <HaloIcon icon={ArrowRightDoubleIcon} size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 4. ROOT DATA TABLE COMPONENT
 * Coordinates interactive sorting, filtering, selection, column visibility,
 * and pagination while delegating all visual rendering to Table.
 * ----------------------------------------------------------------------- */

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Filter records...",
  enableSorting = true,
  enableFiltering = true,
  enableSelection = true,
  enableColumnVisibility = true,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  sorting: externalSorting,
  onSortingChange: setExternalSorting,
  columnFilters: externalColumnFilters,
  onColumnFiltersChange: setExternalColumnFilters,
  columnVisibility: externalColumnVisibility,
  onColumnVisibilityChange: setExternalColumnVisibility,
  rowSelection: externalRowSelection,
  onRowSelectionChange: setExternalRowSelection,
  variant = "default",
  density = "default",
  striped = false,
  toolbarActions,
  floatingActions,
  emptyTitle = "No records found",
  emptyDescription = "There are no records matching your current filter criteria.",
  emptyAction,
  className,
}: DataTableProps<TData, TValue>) {
  // Local state fallbacks if not controlled from parent
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({});

  const sorting = externalSorting ?? internalSorting;
  const onSortingChange: OnChangeFn<SortingState> =
    setExternalSorting ??
    ((updaterOrValue) => {
      setInternalSorting((old) =>
        typeof updaterOrValue === "function"
          ? (updaterOrValue as (old: SortingState) => SortingState)(old)
          : updaterOrValue
      );
    });

  const columnFilters = externalColumnFilters ?? internalColumnFilters;
  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> =
    setExternalColumnFilters ??
    ((updaterOrValue) => {
      setInternalColumnFilters((old) =>
        typeof updaterOrValue === "function"
          ? (updaterOrValue as (old: ColumnFiltersState) => ColumnFiltersState)(old)
          : updaterOrValue
      );
    });

  const columnVisibility = externalColumnVisibility ?? internalColumnVisibility;
  const onColumnVisibilityChange: OnChangeFn<VisibilityState> =
    setExternalColumnVisibility ??
    ((updaterOrValue) => {
      setInternalColumnVisibility((old) =>
        typeof updaterOrValue === "function"
          ? (updaterOrValue as (old: VisibilityState) => VisibilityState)(old)
          : updaterOrValue
      );
    });

  const rowSelection = externalRowSelection ?? internalRowSelection;
  const onRowSelectionChange: OnChangeFn<RowSelectionState> =
    setExternalRowSelection ??
    ((updaterOrValue) => {
      setInternalRowSelection((old) =>
        typeof updaterOrValue === "function"
          ? (updaterOrValue as (old: RowSelectionState) => RowSelectionState)(old)
          : updaterOrValue
      );
    });

  // Initialize TanStack Table engine
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: enableSelection,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasFilter = searchKey && (table.getColumn(searchKey)?.getFilterValue() as string);

  return (
    <div
      data-slot="data-table"
      className={cn("@container/data-table relative w-full space-y-3.5", className)}
    >
      {/* A. Responsive Toolbar */}
      {(enableFiltering || enableColumnVisibility || toolbarActions) && (
        <div
          data-slot="data-table-toolbar"
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Search input */}
          <div className="flex flex-1 items-center gap-2">
            {enableFiltering && searchKey && (
              <div className="relative w-full max-w-sm">
                <HaloIcon
                  icon={Search01Icon}
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder={searchPlaceholder}
                  value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                  }
                  className="h-8 pl-8 text-xs bg-background"
                />
                {hasFilter && (
                  <button
                    type="button"
                    onClick={() => table.getColumn(searchKey)?.setFilterValue("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    title="Clear search"
                  >
                    <HaloIcon icon={Cancel01Icon} size={13} />
                  </button>
                )}
              </div>
            )}

            {hasFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
            )}
          </div>

          {/* Action buttons & Column Visibility */}
          <div className="flex items-center gap-2">
            {toolbarActions}
            {enableColumnVisibility && <DataTableViewOptions table={table} />}
          </div>
        </div>
      )}

      {/* B. Reusable Semantic Table Component */}
      <Table
        variant={variant}
        density={density}
        striped={striped}
        containerLabel="Interactive data records"
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                selected={row.getIsSelected()}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-xs text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center space-y-1 py-6">
                  <span className="font-semibold text-foreground text-sm">
                    {emptyTitle}
                  </span>
                  <span className="max-w-xs">{emptyDescription}</span>
                  {emptyAction && <div className="mt-3">{emptyAction}</div>}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* C. Pagination Bar */}
      {enablePagination && <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />}

      {/* D. Floating Bulk Action Bar (Liquid Glass Pill) */}
      {selectedRows.length > 0 && (
        <div
          data-slot="data-table-floating-bar"
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
            "flex items-center gap-3 rounded-full px-4 py-2 text-xs",
            "border border-white/20 dark:border-white/12",
            "bg-card/85 dark:bg-card/40 backdrop-blur-xl backdrop-saturate-150",
            "shadow-[0_12px_36px_-6px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.25)]",
            "animate-in fade-in slide-in-from-bottom-3 duration-200"
          )}
        >
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs font-semibold">
              {selectedRows.length}
            </Badge>
            <span className="font-medium text-foreground">selected</span>
          </div>

          <div className="h-4 w-px bg-border/80" />

          {/* Custom bulk actions or default reset */}
          {floatingActions ? (
            floatingActions(table)
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetRowSelection()}
              className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear selection
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
