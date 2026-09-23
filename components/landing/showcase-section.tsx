import * as React from "react";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";

export function ShowcaseSection() {
  return (
    <section className="w-full border-t border-border py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Built for real products.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore complete interfaces composed from the same public HaloUI components available through the registry.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/showcase" className="inline-flex items-center gap-1.5 text-xs">
              <span>View all showcases</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </Button>
        </div>

        {/* Real Showcase Card */}
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-muted-foreground font-semibold">
                ACTIVE SHOWCASE
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Halo Control Room
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              An operational mission-control and audio/visual telemetry workspace. Integrates public HaloButton, HaloSurface, tactile sliders, and synchronized 135° virtual light vectors.
            </p>
          </div>

          <div className="shrink-0">
            <Button asChild size="default">
              <Link href="/showcase" className="inline-flex items-center gap-1.5 text-xs font-medium">
                <span>Launch Experience</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
