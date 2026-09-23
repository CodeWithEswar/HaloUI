import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SiteThemeToggle } from "@/components/site/theme-toggle";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-background text-[11px] font-mono font-bold">
                H
              </span>
              <span className="font-semibold text-base tracking-tight">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Liquid interfaces. Beautifully engineered. A source-owned component registry for React, built around accessible optical materials and shadcn/ui.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.resources.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Project
            </h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.project.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} {siteConfig.name}. Source-owned and distributed via the shadcn registry.
          </p>
          <div className="flex items-center gap-4">
            <span>Built for React and Next.js</span>
            <SiteThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
