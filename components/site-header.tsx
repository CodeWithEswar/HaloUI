"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search01Icon, GithubIcon, Layers01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/components", label: "Components" },
  { href: "/components/button", label: "Button Spec" },
  { href: "/docs", label: "Documentation" },
  { href: "/showcase", label: "Showcase" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-[#0c0d0f]/75 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-bold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
              H
            </span>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-base leading-none text-stone-900 dark:text-white">
                Halo<span className="text-stone-400 dark:text-stone-500 font-normal">UI</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono mt-0.5">
                Liquid Registry
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/components");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-stone-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.06]"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search Shortcut */}
          <Link
            href="/components"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs transition-colors"
          >
            <HaloIcon icon={Search01Icon} size={15} />
            <span className="font-sans">Search components...</span>
            <kbd className="ml-2 font-mono text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-stone-400">
              ⌘K
            </kbd>
          </Link>

          {/* Registry Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            shadcn v4 compatible
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* External Code Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-md text-stone-700 dark:text-stone-300 hover:border-black/20 dark:hover:border-white/30 transition-all"
          >
            <HaloIcon icon={GithubIcon} size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
