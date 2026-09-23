import * as React from "react";
import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Component Archive — HaloUI Liquid Registry",
  description:
    "Explore the HaloUI design archive. Liquid optical components for React and Next.js built for the shadcn/ui ecosystem.",
};

export default function ComponentsCatalogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500">
          Design Archive / Registry Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-white">
          Components
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 max-w-2xl">
          A physical, optical, and kinetic material system. Each component is engineered as an independent, accessible primitive ready for installation via the shadcn CLI.
        </p>
      </div>

      <CatalogClient />
    </div>
  );
}
