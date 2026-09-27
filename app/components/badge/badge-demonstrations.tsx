"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SparklesIcon, Tag01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function BadgeDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Established Variants */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Core Variants
          </h3>
          <p className="text-sm text-muted-foreground">
            Standard variants for category classification, version tags, and count labels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/70 bg-card/60">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </section>

      {/* 2. Count Badges & Zero Preservation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Numeric Counts &amp; Zero Preservation
          </h3>
          <p className="text-sm text-muted-foreground">
            Count badges display numeric tallies. Value 0 is preserved and never coerced to falsy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/70 bg-card/60">
          <Badge variant="secondary">Notifications 12</Badge>
          <Badge variant="outline">Unread: 0</Badge>
          <Badge variant="default">99+</Badge>
        </div>
      </section>

      {/* 3. With Icon */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Icon Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            Badge composes Hugeicons with automatic size and inline alignment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/70 bg-card/60">
          <Badge variant="default" className="gap-1">
            <HaloIcon icon={SparklesIcon} size={12} />
            <span>AI Powered</span>
          </Badge>
          <Badge variant="outline" className="gap-1">
            <HaloIcon icon={Tag01Icon} size={12} />
            <span>Release v3.0</span>
          </Badge>
        </div>
      </section>

      {/* 4. Link Badge */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Link Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            When Badge styles a link, it uses a genuine anchor tag with native navigation semantics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/70 bg-card/60">
          <Badge variant="outline" render={<a href="#docs" className="hover:border-primary/50" />}>
            <span>Changelog</span>
            <HaloIcon icon={ArrowRight01Icon} size={12} />
          </Badge>
        </div>
      </section>
    </div>
  );
}
