import * as React from "react";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="w-full border-t border-border py-20 md:py-28 text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Start building with HaloUI.
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Explore the components, understand the material system, and install only what your application needs.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="default" className="h-10 px-5">
            <Link href="/docs">
              <span>Get Started</span>
              <HaloIcon icon={ArrowRight01Icon} size={15} className="ml-1.5" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="default" className="h-10 px-5">
            <Link href="/components">Browse Components</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
