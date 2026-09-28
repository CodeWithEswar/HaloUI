"use client";

import * as React from "react";
import {
  EmptyState,
  EmptyStateVisual,
  EmptyStateContent,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Search01Icon,
  FilterIcon,
  InboxIcon,
  PlusSignIcon,
  RefreshIcon,
  DatabaseIcon,
} from "@hugeicons/core-free-icons";

export function EmptyStateDemonstrations() {
  return (
    <div className="space-y-16">
      {/* SCENARIO 1: First-Use Resource Creation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. First-Use Resource Creation
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Standard empty state with primary creation call-to-action and secondary import alternative.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <EmptyState variant="glass" className="w-full">
            <EmptyStateVisual icon={<HaloIcon icon={Folder01Icon} />} />
            <EmptyStateContent>
              <EmptyStateTitle>No deployments configured</EmptyStateTitle>
              <EmptyStateDescription>
                You have not deployed any services to this environment yet. Launch a template or connect your Git repository.
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button variant="default" size="sm">
                  <HaloIcon icon={PlusSignIcon} size={14} className="mr-1.5" />
                  Deploy Service
                </Button>
                <Button variant="outline" size="sm">
                  Browse Templates
                </Button>
              </EmptyStateActions>
            </EmptyStateContent>
          </EmptyState>
        </div>
      </section>

      {/* SCENARIO 2: Filter & Search No Results */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Search &amp; Filter No Results
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Communicates that records exist in the system, but none match the current query or active filter criteria.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <EmptyState variant="outline" density="compact" className="w-full">
            <EmptyStateVisual variant="icon" size="sm" icon={<HaloIcon icon={Search01Icon} />} />
            <EmptyStateContent>
              <EmptyStateTitle>No matching results</EmptyStateTitle>
              <EmptyStateDescription>
                No items matched your search query &ldquo;region:ap-south&rdquo;. Try clearing filters or using different keywords.
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button variant="outline" size="xs">
                  <HaloIcon icon={FilterIcon} size={14} className="mr-1.5" />
                  Reset Filters
                </Button>
              </EmptyStateActions>
            </EmptyStateContent>
          </EmptyState>
        </div>
      </section>

      {/* SCENARIO 3: Nested Inside Table */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Integrated Inside Table Shell
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Uses compact density and transparent variant to integrate seamlessly into a table without competing card borders.
          </p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden bg-card/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center p-0">
                  <EmptyState variant="default" density="compact" className="py-8">
                    <EmptyStateVisual variant="default" size="sm" icon={<HaloIcon icon={DatabaseIcon} />} />
                    <EmptyStateContent>
                      <EmptyStateTitle className="text-sm">No services online</EmptyStateTitle>
                      <EmptyStateDescription className="text-xs">
                        All replica nodes are currently undergoing scheduled maintenance.
                      </EmptyStateDescription>
                      <EmptyStateActions>
                        <Button variant="outline" size="xs">
                          <HaloIcon icon={RefreshIcon} size={12} className="mr-1.5" />
                          Refresh Status
                        </Button>
                      </EmptyStateActions>
                    </EmptyStateContent>
                  </EmptyState>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* SCENARIO 4: Strict 240px Sidebar Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Strict 240px Container-Aware Reflow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulates tight sidebar or panel constraints at exactly 240px. The visual scales down and actions stack automatically.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-xs flex flex-col items-center">
          <div className="w-[240px] border-2 border-dashed border-amber-500/50 p-2.5 rounded-lg bg-background/50">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-2 font-medium">
              Boundary: 240px Container
            </span>
            <EmptyState variant="glass" density="compact" className="w-full py-4">
              <EmptyStateVisual size="sm" icon={<HaloIcon icon={InboxIcon} />} />
              <EmptyStateContent>
                <EmptyStateTitle className="text-xs">
                  Inbox clear
                </EmptyStateTitle>
                <EmptyStateDescription className="text-[11px]">
                  All alerts acknowledged.
                </EmptyStateDescription>
                <EmptyStateActions className="flex-col w-full gap-1.5 pt-1">
                  <Button variant="outline" size="xs" className="w-full text-xs">
                    View Archive
                  </Button>
                </EmptyStateActions>
              </EmptyStateContent>
            </EmptyState>
          </div>
        </div>
      </section>

      {/* SCENARIO 5: Nested Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            5. Nested Inside Card (Material Hierarchy)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            When nested inside a Card, Empty State uses a clean unbordered variant (default) to prevent competing backdrop blur layers.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Security Incidents</CardTitle>
            <CardDescription className="text-xs">
              Real-time threat monitoring and access violation audit stream.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <EmptyState variant="default" density="compact" className="py-6">
              <EmptyStateVisual variant="icon" size="sm" icon={<HaloIcon icon={Folder01Icon} />} />
              <EmptyStateContent>
                <EmptyStateTitle className="text-xs sm:text-sm">Zero active threats detected</EmptyStateTitle>
                <EmptyStateDescription className="text-xs">
                  Automated anomaly detection evaluated 1.4M edge requests in the last 24 hours.
                </EmptyStateDescription>
              </EmptyStateContent>
            </EmptyState>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
