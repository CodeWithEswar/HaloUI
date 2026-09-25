"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  Layers01Icon,
  BookOpen01Icon,
  Rocket01Icon,
  CheckmarkCircle02Icon,
  PaintBoardIcon,
  CodeFolderIcon,
  LinkSquare02Icon,
  Compass01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function NavigationMenuDemonstrations() {
  const [activeDemoLink, setActiveDemoLink] = React.useState<string>("pricing");
  const [mobileExpanded, setMobileExpanded] = React.useState<boolean>(false);

  return (
    <div className="space-y-12">
      {/* 1. Direct Links vs Flyout Triggers */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">1. Direct Links vs Flyout Triggers</h3>
        <p className="text-sm text-muted-foreground">
          Top-level navigation destinations can be real links using{" "}
          <code className="font-mono text-xs">navigationMenuTriggerStyle()</code> or triggers that open rich flyouts.
          Never force a disclosure trigger when the item is a direct page destination.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent className="w-[360px] p-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    <NavigationMenuLink href="#button" className="p-2 rounded-lg hover:bg-muted/70">
                      <div className="text-xs font-medium text-foreground">Button</div>
                      <div className="text-[11px] text-muted-foreground">Tactile press physics</div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#tabs" className="p-2 rounded-lg hover:bg-muted/70">
                      <div className="text-xs font-medium text-foreground">Tabs</div>
                      <div className="text-[11px] text-muted-foreground">Peer view selection</div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#dialog" className="p-2 rounded-lg hover:bg-muted/70">
                      <div className="text-xs font-medium text-foreground">Dialog</div>
                      <div className="text-[11px] text-muted-foreground">Modal glass surface</div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#pagination" className="p-2 rounded-lg hover:bg-muted/70">
                      <div className="text-xs font-medium text-foreground">Pagination</div>
                      <div className="text-[11px] text-muted-foreground">Discrete page trail</div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#pricing"
                  active={activeDemoLink === "pricing"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDemoLink("pricing");
                  }}
                  className={navigationMenuTriggerStyle()}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#enterprise"
                  active={activeDemoLink === "enterprise"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDemoLink("enterprise");
                  }}
                  className={navigationMenuTriggerStyle()}
                >
                  Enterprise
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(navigationMenuTriggerStyle(), "gap-1")}
                >
                  GitHub
                  <HaloIcon icon={LinkSquare02Icon} size={11} className="text-muted-foreground/80" />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </section>

      {/* 2. Structured Two-Column Rich Flyout */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">2. Structured Two-Column Rich Flyout</h3>
        <p className="text-sm text-muted-foreground">
          Complex product architectures benefit from structured flyouts where a featured guide or update card sits alongside grouped navigation links, all wrapped in a physical liquid optical surface.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product Overview</NavigationMenuTrigger>
                <NavigationMenuContent className="w-[520px] p-3 sm:w-[600px]">
                  <div className="grid grid-cols-5 gap-3">
                    {/* Featured card */}
                    <div className="col-span-2 p-3.5 rounded-xl border border-border/70 bg-muted/40 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          v1.0 Release
                        </div>
                        <div className="text-xs font-semibold text-foreground">
                          Liquid Optical System
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          10 physical layers combining refraction, 135° specular light, and tactile micro-interactions.
                        </p>
                      </div>
                      <NavigationMenuLink
                        href="#spec"
                        className="text-xs text-sky-500 hover:text-sky-600 font-medium inline-flex items-center gap-1 mt-2 p-0"
                      >
                        Explore Engine <span aria-hidden="true">&rarr;</span>
                      </NavigationMenuLink>
                    </div>

                    {/* Grouped links */}
                    <div className="col-span-3 space-y-1">
                      <NavigationMenuLink href="#foundations" className="p-2 rounded-lg hover:bg-muted/70 flex items-start gap-2.5">
                        <HaloIcon icon={Compass01Icon} size={16} className="text-sky-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-foreground">Foundations</div>
                          <div className="text-[11px] text-muted-foreground">Tokens, lighting angles, and optical rims</div>
                        </div>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="#registry" className="p-2 rounded-lg hover:bg-muted/70 flex items-start gap-2.5">
                        <HaloIcon icon={CodeFolderIcon} size={16} className="text-sky-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-foreground">Registry Architecture</div>
                          <div className="text-[11px] text-muted-foreground">Direct CLI distribution via shadcn registry</div>
                        </div>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="#accessibility" className="p-2 rounded-lg hover:bg-muted/70 flex items-start gap-2.5">
                        <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-sky-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-foreground">Accessibility Contract</div>
                          <div className="text-[11px] text-muted-foreground">WCAG 2.1 AA certified contrast and focus rings</div>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </section>

      {/* 3. Transparent Liquid Header Substrate */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">3. Transparent Liquid Header Substrate</h3>
        <p className="text-sm text-muted-foreground">
          Navigation menus often sit within fixed or sticky translucent headers. The top-level triggers remain clear while the opened flyout maintains high contrast and visual isolation.
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-border/80 p-8 flex flex-col items-center justify-center min-h-[220px] bg-gradient-to-br from-sky-500/10 via-purple-500/10 to-pink-500/10">
          <div className="w-full max-w-xl rounded-xl border border-border/60 bg-background/40 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-sm">
            <div className="text-xs font-bold text-foreground">HaloUI</div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[300px] p-2">
                    <div className="flex flex-col gap-1">
                      <NavigationMenuLink href="#speed" className="p-2 rounded-lg hover:bg-muted/70">
                        <div className="text-xs font-medium text-foreground">Zero Runtime CSS</div>
                        <div className="text-[11px] text-muted-foreground">Pure CSS variable tokens and Tailwind utilities</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#fluid" className="p-2 rounded-lg hover:bg-muted/70">
                        <div className="text-xs font-medium text-foreground">Liquid Optics</div>
                        <div className="text-[11px] text-muted-foreground">Directional 135° highlights and inner edges</div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#docs" className={navigationMenuTriggerStyle()}>
                    Docs
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="text-xs text-muted-foreground">v1.0</div>
          </div>
        </div>
      </section>

      {/* 4. Current Location vs Focus Ring */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">4. Current Location vs Keyboard Focus</h3>
        <p className="text-sm text-muted-foreground">
          A current page destination (<code className="font-mono text-xs">aria-current=&quot;page&quot;</code>) represents geographic location, whereas focus represents user input position. When keyboard focus lands on the current item, both indicators remain distinct.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Default Item</span>
            <div className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>Products</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Hover / Pointer Intent</span>
            <div className={cn(navigationMenuTriggerStyle(), "bg-muted/70 text-foreground")}>Products</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Current Route</span>
            <div className={cn(navigationMenuTriggerStyle(), "bg-muted/80 text-foreground font-semibold")}>
              Pricing
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Current + Keyboard Focused</span>
            <div
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-muted/80 text-foreground font-semibold ring-2 ring-[var(--halo-focus-color)] outline-none"
              )}
            >
              Pricing
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mobile Composition Strategy */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">5. Mobile Responsive Composition</h3>
        <p className="text-sm text-muted-foreground">
          Desktop flyout navigation must never be squeezed into mobile viewports. Instead, the same canonical navigation data can be cleanly composed with a mobile drawer or accordion disclosure primitive.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 max-w-md mx-auto">
          <div className="rounded-xl border border-border/80 bg-card/90 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <span className="text-xs font-semibold text-foreground">Mobile Drawer Composition</span>
              <button
                type="button"
                onClick={() => setMobileExpanded(!mobileExpanded)}
                className="size-7 rounded-lg border border-border/80 flex items-center justify-center text-foreground hover:bg-muted/70"
                aria-label="Toggle mobile menu"
              >
                <HaloIcon icon={Menu01Icon} size={14} />
              </button>
            </div>

            <div className="space-y-1">
              <div className="p-2 rounded-lg bg-muted/40 text-xs font-medium text-foreground flex items-center justify-between">
                <span>Products (4 categories)</span>
                <span className="text-[10px] text-muted-foreground">&darr;</span>
              </div>
              <div className="p-2 rounded-lg bg-muted/40 text-xs font-medium text-foreground flex items-center justify-between">
                <span>Resources (3 guides)</span>
                <span className="text-[10px] text-muted-foreground">&darr;</span>
              </div>
              <a href="#developers" className="block p-2 rounded-lg hover:bg-muted/50 text-xs font-medium text-foreground">
                Developers
              </a>
              <a href="#pricing" className="block p-2 rounded-lg hover:bg-muted/50 text-xs font-medium text-foreground">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
