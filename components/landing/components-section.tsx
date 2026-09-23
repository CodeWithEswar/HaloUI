"use client";

import * as React from "react";
import Link from "next/link";
import {
  SparklesIcon,
  ArrowRight01Icon,
  Layers01Icon,
  Home01Icon,
  CommandIcon,
  Settings01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

export function ComponentsSection() {
  const [switchOn, setSwitchOn] = React.useState(true);

  return (
    <section className="w-full border-t border-border py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Components
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Production-ready primitives with a distinct material language.
            </p>
          </div>
          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
          >
            <span>View all components</span>
            <HaloIcon icon={ArrowRight01Icon} size={14} />
          </Link>
        </div>

        {/* Asymmetric Curated Previews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Button Preview Box */}
          <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Button</span>
              <span className="text-[11px] font-mono text-muted-foreground">Actions</span>
            </div>
            <div className="h-48 w-full bg-muted/20 flex items-center justify-center p-6">
              <HaloButton
                variant="primary"
                size="md"
                magnetic
                leftIcon={SparklesIcon}
                rightIcon={ArrowRight01Icon}
              >
                Liquid Button
              </HaloButton>
            </div>
            <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Directional highlight · Tactile press</span>
              <Link href="/components/button" className="text-foreground font-medium hover:underline flex items-center gap-1">
                Docs <HaloIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
          </div>

          {/* 2. Input Preview Box */}
          <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Input</span>
              <span className="text-[11px] font-mono text-muted-foreground">Forms & Fields</span>
            </div>
            <div className="h-48 w-full bg-muted/20 flex items-center justify-center p-6">
              <div className="w-full max-w-xs relative flex items-center">
                <span className="absolute left-3 text-muted-foreground pointer-events-none">
                  <HaloIcon icon={Search01Icon} size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Filter datastream..."
                  defaultValue="Search resources..."
                  className="w-full h-10 pl-9 pr-3 rounded-md text-xs border border-[var(--halo-edge-soft)] bg-[var(--halo-surface)] backdrop-blur-md shadow-inner text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
            </div>
            <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Recessed track · Optical focus ring</span>
              <Link href="/components" className="text-foreground font-medium hover:underline flex items-center gap-1">
                Docs <HaloIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
          </div>

          {/* 3. Floating Dock (Spans 2 columns on desktop) */}
          <div className="md:col-span-2 rounded-lg border border-border bg-card overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Floating Dock</span>
              <span className="text-[11px] font-mono text-muted-foreground">Navigation</span>
            </div>
            <div className="h-40 w-full bg-muted/20 flex items-center justify-center p-6">
              <HaloSurface elevation="floating" className="inline-flex flex-row items-center gap-2 p-2 rounded-xl">
                {[
                  { icon: Home01Icon, label: "Home", active: true },
                  { icon: Layers01Icon, label: "Components", active: false },
                  { icon: CommandIcon, label: "Commands", active: false },
                  { icon: SparklesIcon, label: "Optics", active: false },
                  { icon: Settings01Icon, label: "Settings", active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    aria-label={item.label}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 halo-tactile-press",
                      item.active
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    )}
                  >
                    <HaloIcon icon={item.icon} size={16} />
                  </button>
                ))}
              </HaloSurface>
            </div>
            <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ambient shadow · Contact grounding</span>
              <Link href="/components" className="text-foreground font-medium hover:underline flex items-center gap-1">
                Explore <HaloIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
          </div>

          {/* 4. Switch Preview Box */}
          <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Switch</span>
              <span className="text-[11px] font-mono text-muted-foreground">Forms & Fields</span>
            </div>
            <div className="h-44 w-full bg-muted/20 flex items-center justify-center p-6">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-mono">OPTICAL BLUR</span>
                <button
                  type="button"
                  onClick={() => setSwitchOn(!switchOn)}
                  role="switch"
                  aria-checked={switchOn}
                  className={cn(
                    "relative w-12 h-7 rounded-full p-1 transition-colors duration-200 border",
                    switchOn
                      ? "bg-foreground border-foreground"
                      : "bg-muted border-border"
                  )}
                >
                  <span
                    className={cn(
                      "block w-5 h-5 rounded-full bg-background shadow-xs transition-transform duration-200",
                      switchOn ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
            <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Recessed track · Floating thumb</span>
              <Link href="/components" className="text-foreground font-medium hover:underline flex items-center gap-1">
                Docs <HaloIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
          </div>

          {/* 5. Surface Card Preview Box */}
          <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Halo Surface</span>
              <span className="text-[11px] font-mono text-muted-foreground">Foundations</span>
            </div>
            <div className="h-44 w-full bg-muted/20 flex items-center justify-center p-6">
              <HaloSurface elevation="raised" className="p-4 rounded-xl text-center max-w-xs w-full space-y-1">
                <div className="text-xs font-semibold text-foreground">10-Layer Optical Stack</div>
                <div className="text-[11px] text-muted-foreground">Base Tint · Specular · Rim</div>
              </HaloSurface>
            </div>
            <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Foundation primitive</span>
              <Link href="/docs/liquid-material" className="text-foreground font-medium hover:underline flex items-center gap-1">
                Engine <HaloIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
