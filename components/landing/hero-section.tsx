import * as React from "react";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallCommandBox } from "@/components/landing/install-command-box";

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-28 lg:py-32 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
      {/* Eyebrow */}
      <div className="mb-6">
        <Badge variant="secondary" className="px-3 py-1 font-normal text-xs rounded-full">
          Open-source React component registry
        </Badge>
      </div>

      {/* Primary Heading */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
        Build interfaces that <br className="hidden sm:inline" />
        feel alive.
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        HaloUI is a source-owned React component registry built around accessible liquid materials, thoughtful interaction, and the shadcn/ui ecosystem.
      </p>

      {/* CTAs (Standard shadcn Buttons, NO glass) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="default" className="h-10 px-5">
          <Link href="/components">
            <span>Browse Components</span>
            <HaloIcon icon={ArrowRight01Icon} size={15} className="ml-1.5" />
          </Link>
        </Button>

        <Button asChild variant="outline" size="default" className="h-10 px-5">
          <Link href="/docs">Get Started</Link>
        </Button>
      </div>

      {/* Install Command */}
      <div className="mt-8 w-full flex justify-center">
        <InstallCommandBox command="pnpm dlx shadcn@latest add https://haloui.dev/r/button.json" />
      </div>
    </section>
  );
}
