"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
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
  CodeFolderIcon,
  BookOpen01Icon,
  PaintBoardIcon,
  Rocket01Icon,
  CheckmarkCircle02Icon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function NavigationMenuPreviewStage() {
  const stageContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Interactive controls
  const [align, setAlign] = React.useState<"start" | "center" | "end">("start");
  const [activeItem, setActiveItem] = React.useState<string>("none");
  const [headerStyle, setHeaderStyle] = React.useState<"glass-bar" | "transparent" | "floating">("glass-bar");
  const [showFeaturedCard, setShowFeaturedCard] = React.useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [copiedCode, setCopiedCode] = React.useState<boolean>(false);

  const generatedCode = React.useMemo(() => {
    return `import {
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
} from "@hugeicons/core-free-icons";

export function SiteHeaderNavigation() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="font-semibold tracking-tight text-foreground text-sm">
        Halo<span className="text-primary font-bold">UI</span>
      </div>

      <NavigationMenu align="${align}">
        <NavigationMenuList>
          {/* Products Flyout */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent className="w-[480px] p-3 sm:w-[540px]">
              <div className="grid grid-cols-2 gap-2">
                <NavigationMenuLink
                  href="#tokens"
                  active={${activeItem === "tokens"}}
                  className="flex flex-col items-start gap-1 p-3 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                    <HaloIcon icon={SparklesIcon} size={15} className="text-sky-500" />
                    <span>Design Tokens</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    10-layer physical optical engine tokens for specular light and rims.
                  </p>
                </NavigationMenuLink>

                <NavigationMenuLink
                  href="#surfaces"
                  className="flex flex-col items-start gap-1 p-3 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                    <HaloIcon icon={Layers01Icon} size={15} className="text-sky-500" />
                    <span>Surface Primitives</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    HaloSurface, HaloEdge, and HaloPortalSurface substrates.
                  </p>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Resources Structured Flyout */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent className="w-[500px] p-3 sm:w-[580px]">
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2 p-3.5 rounded-xl border border-border/70 bg-muted/40 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-foreground">Halo Architecture</div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Source-owned component distribution through shadcn registry specification.
                    </p>
                  </div>
                  <NavigationMenuLink
                    href="#guide"
                    className="text-xs text-sky-500 hover:text-sky-600 font-medium inline-flex items-center gap-1 mt-2"
                  >
                    Read Guide &rarr;
                  </NavigationMenuLink>
                </div>

                <div className="col-span-3 flex flex-col gap-1">
                  <NavigationMenuLink href="#docs" className="p-2 rounded-lg hover:bg-muted/70">
                    <div className="text-xs font-medium text-foreground">Documentation</div>
                    <div className="text-[11px] text-muted-foreground">Component APIs and accessibility contracts</div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#showcase" className="p-2 rounded-lg hover:bg-muted/70">
                    <div className="text-xs font-medium text-foreground">Showcase</div>
                    <div className="text-[11px] text-muted-foreground">Real-world production interface templates</div>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Direct Navigation Links */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#developers"
              active={${activeItem === "developers"}}
              className={navigationMenuTriggerStyle()}
            >
              Developers
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#pricing"
              active={${activeItem === "pricing"}}
              className={navigationMenuTriggerStyle()}
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <button className="h-8 px-3 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Get Started
        </button>
      </div>
    </header>
  );
}`;
  }, [align, activeItem]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveItem(id);
  };

  return (
    <PreviewStageShell
      title="Navigation Menu Interactive Stage"
      description="Evaluate structured site navigation, coordinated floating flyout positioning, liquid optical surfaces, keyboard arrow/tab navigation, and responsive boundaries."
      badge="Navigation Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      copied={copiedCode}
      onCopy={copyCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 items-center">
          <StageControlSelect
            label="Popup Alignment"
            value={align}
            onChange={(val) => setAlign(val as "start" | "center" | "end")}
            options={[
              { value: "start", label: "Start Aligned" },
              { value: "center", label: "Center Aligned" },
              { value: "end", label: "End Aligned" },
            ]}
          />
          <StageControlSelect
            label="Active Route State"
            value={activeItem}
            onChange={(val) => setActiveItem(val)}
            options={[
              { value: "none", label: "None (Inactive)" },
              { value: "developers", label: "Developers (Direct)" },
              { value: "pricing", label: "Pricing (Direct)" },
              { value: "tokens", label: "Design Tokens (Flyout)" },
            ]}
          />
          <StageControlSelect
            label="Header Substrate"
            value={headerStyle}
            onChange={(val) => setHeaderStyle(val as any)}
            options={[
              { value: "glass-bar", label: "Solid Card Shell" },
              { value: "transparent", label: "Transparent Liquid Header" },
              { value: "floating", label: "Floating Nav Island" },
            ]}
          />
          <StageControlSelect
            label="Flyout Architecture"
            value={showFeaturedCard ? "featured" : "simple"}
            onChange={(val) => setShowFeaturedCard(val === "featured")}
            options={[
              { value: "featured", label: "Structured 2-Column" },
              { value: "simple", label: "Single Multi-Grid" },
            ]}
          />
        </div>
      }
    >
      <div ref={stageContainerRef} className="w-full flex flex-col items-center justify-center p-3 sm:p-6 min-h-[360px]">
        {/* Synthetic App Header Frame */}
        <div
          className={cn(
            "w-full max-w-4xl transition-all duration-200",
            headerStyle === "glass-bar" &&
              "rounded-2xl border border-white/60 dark:border-white/[0.12] bg-white/40 dark:bg-neutral-950/45 backdrop-blur-xl shadow-lg p-2 sm:p-2.5",
            headerStyle === "transparent" &&
              "rounded-2xl border border-border/40 bg-background/25 backdrop-blur-md p-2 sm:p-2.5 shadow-2xs",
            headerStyle === "floating" &&
              "rounded-full border border-border/90 halo-liquid-glass p-1.5 sm:p-2 px-3 sm:px-4 shadow-lg"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 pl-2 shrink-0">
              <div className="size-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                H
              </div>
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-foreground">
                Halo<span className="text-primary font-bold">UI</span>
              </span>
            </div>

            {/* Desktop Navigation Menu (hidden on mobile viewport) */}
            <div className={cn("hidden md:flex items-center justify-center flex-1", viewport === "mobile" && "!hidden")}>
              <NavigationMenu align={align} container={stageContainerRef}>
                <NavigationMenuList>
                  {/* Products Flyout */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[420px] p-2 sm:w-[480px]">
                      <div className="grid grid-cols-2 gap-1.5">
                        <NavigationMenuLink
                          href="#tokens"
                          active={activeItem === "tokens"}
                          onClick={(e) => handleLinkClick(e, "tokens")}
                          className="flex flex-col items-start gap-1 p-2.5 rounded-xl hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                            <HaloIcon icon={SparklesIcon} size={15} className="text-sky-500" />
                            <span>Design Tokens</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                            10-layer physical optical engine tokens for specular light, rims, and shadows.
                          </p>
                        </NavigationMenuLink>

                        <NavigationMenuLink
                          href="#surfaces"
                          onClick={(e) => handleLinkClick(e, "surfaces")}
                          className="flex flex-col items-start gap-1 p-2.5 rounded-xl hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                            <HaloIcon icon={Layers01Icon} size={15} className="text-sky-500" />
                            <span>Surfaces</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                            Translucent glass substrates with calibrated light diffusion.
                          </p>
                        </NavigationMenuLink>

                        <NavigationMenuLink
                          href="#forms"
                          onClick={(e) => handleLinkClick(e, "forms")}
                          className="flex flex-col items-start gap-1 p-2.5 rounded-xl hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                            <HaloIcon icon={PaintBoardIcon} size={15} className="text-sky-500" />
                            <span>Form Fields</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                            Accessible inputs, select menus, switches, and sliders.
                          </p>
                        </NavigationMenuLink>

                        <NavigationMenuLink
                          href="#primitives"
                          onClick={(e) => handleLinkClick(e, "primitives")}
                          className="flex flex-col items-start gap-1 p-2.5 rounded-xl hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                            <HaloIcon icon={CodeFolderIcon} size={15} className="text-sky-500" />
                            <span>Navigation</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                            Tabs, Breadcrumbs, Pagination, and Navigation Menu.
                          </p>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources Flyout */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[450px] p-2.5 sm:w-[520px]">
                      {showFeaturedCard ? (
                        <div className="grid grid-cols-5 gap-2.5">
                          <div className="col-span-2 p-3 rounded-xl border border-border/80 bg-muted/30 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                Guide
                              </div>
                              <div className="text-xs font-semibold text-foreground">
                                Liquid Material
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Explore physical optics, virtual light vectors, and WCAG AA contrast.
                              </p>
                            </div>
                            <NavigationMenuLink
                              href="#guide"
                              className="text-xs text-sky-500 hover:text-sky-600 font-medium inline-flex items-center gap-1 mt-2.5 p-0"
                            >
                              Explore <span aria-hidden="true">&rarr;</span>
                            </NavigationMenuLink>
                          </div>

                          <div className="col-span-3 flex flex-col gap-1">
                            <NavigationMenuLink
                              href="#docs"
                              onClick={(e) => handleLinkClick(e, "docs")}
                              className="p-2 rounded-lg hover:bg-muted/70"
                            >
                              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                                <HaloIcon icon={BookOpen01Icon} size={14} className="text-muted-foreground" />
                                <span>Documentation</span>
                              </div>
                              <div className="text-[11px] text-muted-foreground pl-5">
                                Guidelines, API contracts, and keyboard models
                              </div>
                            </NavigationMenuLink>

                            <NavigationMenuLink
                              href="#showcase"
                              onClick={(e) => handleLinkClick(e, "showcase")}
                              className="p-2 rounded-lg hover:bg-muted/70"
                            >
                              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                                <HaloIcon icon={Rocket01Icon} size={14} className="text-muted-foreground" />
                                <span>Showcase</span>
                              </div>
                              <div className="text-[11px] text-muted-foreground pl-5">
                                Production apps built with HaloUI
                              </div>
                            </NavigationMenuLink>

                            <NavigationMenuLink
                              href="#changelog"
                              onClick={(e) => handleLinkClick(e, "changelog")}
                              className="p-2 rounded-lg hover:bg-muted/70"
                            >
                              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                                <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="text-muted-foreground" />
                                <span>Changelog</span>
                              </div>
                              <div className="text-[11px] text-muted-foreground pl-5">
                                New primitives and registry releases
                              </div>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <NavigationMenuLink href="#docs" className="p-2.5 rounded-lg hover:bg-muted/70">
                            <div className="text-xs font-medium text-foreground">Documentation</div>
                            <div className="text-[11px] text-muted-foreground">Components & APIs</div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#showcase" className="p-2.5 rounded-lg hover:bg-muted/70">
                            <div className="text-xs font-medium text-foreground">Showcase</div>
                            <div className="text-[11px] text-muted-foreground">Production apps</div>
                          </NavigationMenuLink>
                        </div>
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Developers Direct Link */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#developers"
                      active={activeItem === "developers"}
                      onClick={(e) => handleLinkClick(e, "developers")}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        activeItem === "developers" && "bg-muted/80 text-foreground font-semibold"
                      )}
                    >
                      Developers
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Pricing Direct Link */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#pricing"
                      active={activeItem === "pricing"}
                      onClick={(e) => handleLinkClick(e, "pricing")}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        activeItem === "pricing" && "bg-muted/80 text-foreground font-semibold"
                      )}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Navigation Trigger (shown on mobile or when viewport is set to mobile) */}
            <div className={cn("md:hidden flex items-center", viewport === "mobile" && "!flex")}>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="size-8 rounded-lg border border-border/80 bg-background/80 flex items-center justify-center text-foreground hover:bg-muted/70 transition-colors"
              >
                <HaloIcon icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon} size={16} />
              </button>
            </div>

            {/* Action button */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="h-8 px-3 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Drawer Composition preview when opened on mobile view */}
          {mobileMenuOpen && (viewport === "mobile" || true) && (
            <div className={cn("mt-2.5 pt-2.5 border-t border-border/70 flex flex-col gap-1 md:hidden", viewport === "mobile" && "!flex")}>
              <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Menu
              </div>
              <a
                href="#products"
                onClick={(e) => {
                  handleLinkClick(e, "products");
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-2 text-xs font-medium text-foreground rounded-lg hover:bg-muted/70 transition-colors"
              >
                Products
              </a>
              <a
                href="#resources"
                onClick={(e) => {
                  handleLinkClick(e, "resources");
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-2 text-xs font-medium text-foreground rounded-lg hover:bg-muted/70 transition-colors"
              >
                Resources
              </a>
              <a
                href="#developers"
                onClick={(e) => {
                  handleLinkClick(e, "developers");
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "px-2.5 py-2 text-xs font-medium text-foreground rounded-lg hover:bg-muted/70 transition-colors",
                  activeItem === "developers" && "bg-muted/80 font-semibold"
                )}
              >
                Developers
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  handleLinkClick(e, "pricing");
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "px-2.5 py-2 text-xs font-medium text-foreground rounded-lg hover:bg-muted/70 transition-colors",
                  activeItem === "pricing" && "bg-muted/80 font-semibold"
                )}
              >
                Pricing
              </a>
            </div>
          )}
        </div>

        {/* Live interaction status hint */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            Hover or focus triggers to reveal floating liquid surface flyouts
          </span>
          <span className="text-border">|</span>
          <span>Tab or arrow keys navigate items</span>
          <span className="text-border">|</span>
          <span>Escape dismisses flyout</span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
