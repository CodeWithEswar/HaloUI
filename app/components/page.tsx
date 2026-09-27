import * as React from "react";
import type { Metadata } from "next";
import { DocsShell } from "@/components/docs/docs-shell";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Components — HaloUI Liquid Registry",
  description:
    "Explore the HaloUI design archive. Liquid optical components for React and Next.js built for the shadcn/ui ecosystem.",
};

export default function ComponentsCatalogPage() {
  return (
    <DocsShell>
      <div className="space-y-8">
        <div className="space-y-2 border-b border-border pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Design Archive / Registry Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Components
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl font-normal leading-relaxed">
            A physical, optical, and kinetic material system. Each component is engineered as an independent, accessible primitive ready for installation via the shadcn CLI.
          </p>
        </div>

        <CatalogClient />
      </div>
    </DocsShell>
  );
}
