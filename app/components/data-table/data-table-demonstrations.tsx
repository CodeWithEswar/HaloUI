"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  RefreshIcon,
  AlertCircleIcon,
  Coins01Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * DEMO 1: BILLING & INVOICING RECORDS
 * Demonstrates currency alignment, faceted status filtering, and density
 * ----------------------------------------------------------------------- */

interface InvoiceItem {
  id: string;
  customer: string;
  plan: "Enterprise Scale" | "Pro Team" | "Starter";
  amount: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

const INVOICE_DATA: InvoiceItem[] = [
  { id: "INV-2026-001", customer: "Linear Software Inc.", plan: "Enterprise Scale", amount: "$12,450.00", status: "paid", dueDate: "Oct 01, 2026" },
  { id: "INV-2026-002", customer: "Vercel Labs GmbH", plan: "Enterprise Scale", amount: "$24,800.00", status: "paid", dueDate: "Oct 04, 2026" },
  { id: "INV-2026-003", customer: "Supabase Community", plan: "Pro Team", amount: "$3,200.00", status: "pending", dueDate: "Oct 12, 2026" },
  { id: "INV-2026-004", customer: "Raycast Design Hub", plan: "Pro Team", amount: "$1,850.00", status: "overdue", dueDate: "Sep 15, 2026" },
  { id: "INV-2026-005", customer: "Figma Plugins Co.", plan: "Starter", amount: "$490.00", status: "paid", dueDate: "Oct 18, 2026" },
];

export function DataTableDemonstrations() {
  const invoiceColumns: ColumnDef<InvoiceItem>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice #" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-foreground">
            {row.getValue("id")}
          </span>
        ),
      },
      {
        accessorKey: "customer",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-xs font-medium text-foreground">{row.getValue("customer")}</span>
            <span className="text-[10px] text-muted-foreground">{row.original.plan}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Billing Status" />,
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <StatusBadge
              tone={status === "paid" ? "positive" : status === "pending" ? "warning" : "critical"}
              size="sm"
            >
              {status === "paid" ? "Settled" : status === "pending" ? "Awaiting Transfer" : "Overdue"}
            </StatusBadge>
          );
        },
      },
      {
        accessorKey: "dueDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">{row.getValue("dueDate")}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <div className="text-right">
            <DataTableColumnHeader column={column} title="Net Total" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono text-xs font-bold text-foreground">
            {row.getValue("amount")}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-12">
      {/* 1. Invoices & Financial Data */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Commercial Invoicing &amp; Column Sorting
          </h3>
          <p className="text-xs text-muted-foreground">
            Full client-side sorting, column visibility toggles, and formatted numeric totals.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <DataTable
            columns={invoiceColumns}
            data={INVOICE_DATA}
            searchKey="customer"
            searchPlaceholder="Search customers..."
            variant="outline"
            pageSize={5}
          />
        </div>
      </section>

      {/* 2. Coherent Empty States */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Coherent Empty States vs No Results
          </h3>
          <p className="text-xs text-muted-foreground">
            Explicitly distinguishes when a dataset has zero records vs when active search filters
            eliminated all rows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* A: Completely Empty Dataset */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-xs font-semibold text-foreground">Empty Dataset (Zero Records)</h4>
            <DataTable
              columns={invoiceColumns}
              data={[]}
              searchKey="customer"
              enablePagination={false}
              enableColumnVisibility={false}
              emptyTitle="No invoices created"
              emptyDescription="Your billing history is currently empty. Generate your first invoice to view telemetry."
              emptyAction={
                <Button size="sm" className="h-7 text-xs">
                  Create Invoice
                </Button>
              }
            />
          </div>

          {/* B: Filter Returned 0 Results */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-xs font-semibold text-foreground">Filter Returned Zero Matches</h4>
            <DataTable
              columns={invoiceColumns}
              data={INVOICE_DATA}
              searchKey="customer"
              enablePagination={false}
              enableColumnVisibility={false}
              emptyTitle="No matching records"
              emptyDescription="Try clearing your search query or adjusting your filters to find records."
            />
          </div>
        </div>
      </section>

      {/* 3. Automatic Container-Aware Toolbar Reflow */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Automatic Toolbar &amp; Pagination Reflow
          </h3>
          <p className="text-xs text-muted-foreground">
            Inside constrained columns (such as a 320px split panel), the search input expands
            naturally, view controls drop to a neat wrapping row, and pagination gracefully collapses.
          </p>
        </div>

        <div className="max-w-[340px] rounded-xl border border-border bg-card p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span>Container: 340px</span>
            <span className="text-primary">automatic reflow</span>
          </div>
          <DataTable
            columns={invoiceColumns.slice(0, 3)}
            data={INVOICE_DATA}
            searchKey="customer"
            searchPlaceholder="Search..."
            variant="outline"
            density="compact"
            pageSize={3}
            pageSizeOptions={[3, 5]}
          />
        </div>
      </section>
    </div>
  );
}
