"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CreditCardIcon,
  Invoice01Icon,
  ServerIcon,
  DatabaseIcon,
  Activity01Icon,
  Clock01Icon,
  UserIcon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * 1. FINANCIAL SETTLEMENTS LEDGER
 * Demonstrates proper right-alignment of currency amounts, status badges,
 * and semantic footer totals.
 * ----------------------------------------------------------------------- */

const TRANSACTIONS_DATA = [
  {
    txId: "tx_99812_sea",
    recipient: "Acme Cloud Infrastructure",
    date: "2026-09-27 18:22 UTC",
    amount: "$14,890.00",
    status: "healthy" as const,
    label: "Settled",
    method: "Fedwire USD",
  },
  {
    txId: "tx_99813_fra",
    recipient: "Helsinki Edge Compute Oy",
    date: "2026-09-27 19:04 UTC",
    amount: "€8,420.50",
    status: "healthy" as const,
    label: "Settled",
    method: "SEPA Instant",
  },
  {
    txId: "tx_99814_tok",
    recipient: "Tokyo Quantum Datacenter",
    date: "2026-09-27 20:15 UTC",
    amount: "¥1,890,000",
    status: "degraded" as const,
    label: "Pending Clearing",
    method: "Zengin Net",
  },
  {
    txId: "tx_99815_lon",
    recipient: "London Optical Fiber Ltd",
    date: "2026-09-27 21:40 UTC",
    amount: "£4,250.00",
    status: "healthy" as const,
    label: "Settled",
    method: "CHAPS",
  },
];

export function TableDemonstrations() {
  return (
    <div className="space-y-12">
      {/* DEMO 1: Financial Settlements & Numerical Alignment */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Financial Ledger &amp; Numeric Precision
          </h3>
          <p className="text-xs text-muted-foreground">
            Preserves proper right-alignment for currencies and numerical quantities,
            coupled with status badges and an aggregate summary footer.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <Table variant="outline" containerLabel="Global settlement transactions">
            <TableCaption>Daily corporate wire and clearing transactions ledger.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[140px]">Transaction ID</TableHead>
                <TableHead className="min-w-[200px]">Counterparty</TableHead>
                <TableHead className="min-w-[150px]">Timestamp</TableHead>
                <TableHead className="min-w-[140px]">Clearing Rails</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[130px] text-right">Net Settlement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS_DATA.map((tx) => (
                <TableRow key={tx.txId}>
                  <TableCell className="font-mono text-xs font-medium text-foreground">
                    <div className="flex items-center gap-1.5">
                      <HaloIcon icon={Invoice01Icon} size={14} className="text-muted-foreground" />
                      <span>{tx.txId}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground text-xs">
                    {tx.recipient}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {tx.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={tx.status === "healthy" ? "positive" : "warning"} size="sm">
                      {tx.label}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold text-foreground">
                    {tx.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="text-xs font-medium">
                  Total Disbursed Today (4 Batches)
                </TableCell>
                <TableCell className="text-right font-mono text-xs font-bold text-foreground">
                  $38,450.50 USD Eq.
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>

      {/* DEMO 2: High-Density Compact Telemetry Matrix */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            High-Density Compact Telemetry Matrix
          </h3>
          <p className="text-xs text-muted-foreground">
            Using <code className="font-mono text-xs">density=&quot;compact&quot;</code> and{" "}
            <code className="font-mono text-xs">striped</code> for dense system administration,
            logs, and database diagnostics.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <Table
            variant="default"
            density="compact"
            striped
            containerLabel="High density telemetry matrix"
          >
            <TableHeader>
              <TableRow>
                <TableHead>Pod Name</TableHead>
                <TableHead>Host Node</TableHead>
                <TableHead>Namespace</TableHead>
                <TableHead className="text-right">CPU Core</TableHead>
                <TableHead className="text-right">Mem Usage</TableHead>
                <TableHead className="text-right">Restarts</TableHead>
                <TableHead className="text-right">Uptime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { pod: "mesh-proxy-7f89d-abc1", node: "worker-01a", ns: "ingress", cpu: "120m", mem: "184 MiB", restarts: 0, uptime: "42d 12h" },
                { pod: "mesh-proxy-7f89d-def2", node: "worker-01b", ns: "ingress", cpu: "135m", mem: "192 MiB", restarts: 0, uptime: "42d 12h" },
                { pod: "auth-service-54a8b-ghj3", node: "worker-02a", ns: "security", cpu: "450m", mem: "512 MiB", restarts: 1, uptime: "18d 04h" },
                { pod: "redis-cache-shard-0", node: "worker-03a", ns: "database", cpu: "820m", mem: "3.8 GiB", restarts: 0, uptime: "89d 21h" },
                { pod: "billing-worker-91c2-k1", node: "worker-02b", ns: "finance", cpu: "210m", mem: "320 MiB", restarts: 0, uptime: "12d 08h" },
              ].map((row) => (
                <TableRow key={row.pod}>
                  <TableCell className="font-mono font-medium">{row.pod}</TableCell>
                  <TableCell className="font-mono text-muted-foreground">{row.node}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {row.ns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{row.cpu}</TableCell>
                  <TableCell className="text-right font-mono">{row.mem}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{row.restarts}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{row.uptime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* DEMO 3: Team Collaborators with Avatars & Contextual Actions */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Rich Identity &amp; Mixed Cell Elements
          </h3>
          <p className="text-xs text-muted-foreground">
            Seamlessly hosts Avatar identities, role badges, email links, and action buttons
            without specialized cell wrapper components.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <Table variant="outline" containerLabel="Access control directory">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[240px]">Collaborator</TableHead>
                <TableHead className="min-w-[140px]">Assigned Role</TableHead>
                <TableHead className="min-w-[180px]">Organization Unit</TableHead>
                <TableHead className="min-w-[140px]">Two-Factor Auth</TableHead>
                <TableHead className="min-w-[80px] text-right">Settings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Elena Rostova", email: "elena@haloui.dev", role: "Owner", team: "Core Architecture", tfa: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face" },
                { name: "Marcus Chen", email: "marcus@haloui.dev", role: "Maintainer", team: "Optical Physics Engine", tfa: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face" },
                { name: "Sophia Patel", email: "sophia@haloui.dev", role: "Engineer", team: "Design Systems", tfa: false, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face" },
              ].map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-xs text-foreground">{member.name}</span>
                        <span className="text-[11px] text-muted-foreground">{member.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.role === "Owner" ? "default" : "secondary"} className="text-xs">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{member.team}</TableCell>
                  <TableCell>
                    <StatusBadge tone={member.tfa ? "positive" : "warning"} size="sm">
                      {member.tfa ? "Hardware Key" : "SMS (Weak)"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      aria-label={`Manage ${member.name}`}
                    >
                      <HaloIcon icon={MoreHorizontalIcon} size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* DEMO 4: Contained Horizontal Overflow in Narrow Split View */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Strict Container-Aware Horizontal Containment
          </h3>
          <p className="text-xs text-muted-foreground">
            When placed inside a narrow 300px parent column or sidebar, the table preserves column
            relationships and contains horizontal scrolling internally — <strong>the page never scrolls horizontally</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="max-w-[320px] rounded-xl border border-border/80 bg-muted/20 p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>Parent Column: 320px</span>
              <span className="text-primary">contained scroll</span>
            </div>

            <Table variant="outline" density="compact" containerLabel="Constrained column table">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Service</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[80px] text-right">Latency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "auth.gateway.v1", status: "healthy" as const, lat: "18ms" },
                  { name: "billing.checkout.v2", status: "healthy" as const, lat: "24ms" },
                  { name: "analytics.worker", status: "degraded" as const, lat: "190ms" },
                ].map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-mono text-xs">{s.name}</TableCell>
                    <TableCell>
                      <StatusBadge tone={s.status === "healthy" ? "positive" : "warning"} size="sm">{s.status}</StatusBadge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">{s.lat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col justify-center rounded-xl border border-dashed border-border p-5 text-xs text-muted-foreground space-y-2">
            <h4 className="font-semibold text-foreground">Automatic Containment Guarantee</h4>
            <p>
              Unlike naive CSS tables that push the browser document wider than the viewport on mobile devices,
              HaloUI Table encapsulates <code className="font-mono text-xs">overflow-x-auto</code> directly on the outer
              scrolling container.
            </p>
            <p>
              Keyboard users can easily scroll the region using arrow keys via native <code className="font-mono text-xs">tabIndex=0</code> and
              screen readers receive descriptive semantic landmarks through <code className="font-mono text-xs">role=&quot;region&quot;</code> and <code className="font-mono text-xs">aria-label</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
