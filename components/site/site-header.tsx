import * as React from "react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/site/logo";
import { MainNav } from "@/components/site/main-nav";
import { MobileNav } from "@/components/site/mobile-nav";
import { SiteSearch } from "@/components/site/site-search";
import { SiteThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Brand + Desktop Nav */}
        <div className="flex items-center gap-6 md:gap-8">
          <MobileNav />
          <Logo />
          <MainNav />
        </div>

        {/* Right: Search + GitHub + Theme */}
        <div className="ml-auto flex items-center gap-2">
          <SiteSearch />

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
            >
              <HaloIcon icon={GithubIcon} size={16} />
            </a>
          </Button>

          <SiteThemeToggle />
        </div>
      </div>
    </header>
  );
}
