"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  Home01Icon,
  Folder01Icon,
  FileCodeIcon,
  ArrowRight01Icon,
  Settings02Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function BreadcrumbDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. Custom Separators */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">1. Custom Separator Variations</h3>
        <p className="text-sm text-muted-foreground">
          Replace the standard subtle chevron with custom visual delimiters such as slashes or directional arrows while retaining presentation semantics.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Slash Separator</span>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#docs">Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-muted-foreground/40 font-mono text-xs">/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-muted-foreground/40 font-mono text-xs">/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Arrow Separator</span>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#org">Acme Corp</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <HaloIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/40" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#projects">Design Systems</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <HaloIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/40" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Tokens</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>

      {/* 2. With Hugeicons */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">2. Leading Hugeicons</h3>
        <p className="text-sm text-muted-foreground">
          Enrich ancestor links with contextual Hugeicons icons to accelerate visual scanning without replacing descriptive text.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">
                  <HaloIcon icon={Home01Icon} size={14} />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#settings">
                  <HaloIcon icon={Settings02Icon} size={14} />
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <HaloIcon icon={SecurityCheckIcon} size={14} className="inline mr-1 align-middle" />
                  Two-Factor Authentication
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* 3. Collapsed Hierarchy (Ellipsis) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">3. Collapsed Intermediate Hierarchy</h3>
        <p className="text-sm text-muted-foreground">
          For deep documentation or nested file paths, use <code className="font-mono text-xs">BreadcrumbEllipsis</code> to compress intermediate levels while keeping root context and the immediate parent visible.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#root">HaloUI</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#packages">packages/core</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>optical-engine.ts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* 4. Long Label Truncation */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">4. Long Title Truncation</h3>
        <p className="text-sm text-muted-foreground">
          Long titles and deeply nested paths automatically truncate with an ellipsis in constrained layouts, preventing page-level horizontal overflow.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <div className="max-w-md p-4 rounded-lg border border-dashed border-border/80 bg-muted/10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#docs">Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#foundations">Foundations</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-0 flex-1">
                  <BreadcrumbPage className="truncate block">
                    Ten-Layer Physical Refractive Optical Specular Lighting Engine
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>

      {/* 5. Transparent Background Readability */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">5. Transparent Background Readability</h3>
        <p className="text-sm text-muted-foreground">
          Breadcrumbs frequently live over top application headers, hero banners, or subtle gradient substrates. Clean contrast ensures effortless readability.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-amber-500/10 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#cloud">Cloud Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#clusters">Clusters</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>us-east-prod-01</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
    </div>
  );
}
