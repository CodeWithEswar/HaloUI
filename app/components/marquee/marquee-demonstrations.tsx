"use client";

import * as React from "react";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  Layers01Icon,
  CpuIcon,
  SecurityCheckIcon,
  Globe02Icon,
  CodeIcon,
  DatabaseIcon,
  GitBranchIcon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export function MarqueeDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. Liquid Glass Standalone */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Liquid Glass Standalone
          </h3>
          <p className="text-sm text-muted-foreground">
            Hero component presentation with restrained HaloUI liquid glass outer frame, specular highlight rim, and gradient optical edge masks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/10 via-sky-500/5 to-indigo-500/10 dark:from-slate-950/80 dark:via-sky-950/20 dark:to-indigo-950/30 border border-border/50">
          <Marquee
            variant="glass"
            size="lg"
            duration={28}
            className="py-4"
          >
            {[
              { icon: CodeIcon, name: "TypeScript 5.x", desc: "Type Fidelity" },
              { icon: SparklesIcon, name: "React 19", desc: "Concurrent Engine" },
              { icon: Layers01Icon, name: "Tailwind v4", desc: "Oxide Pipeline" },
              { icon: SecurityCheckIcon, name: "WCAG 2.1 AA", desc: "Accessible" },
              { icon: CpuIcon, name: "Embla Core", desc: "Physics Engine" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/15 bg-card/60 backdrop-blur-sm shrink-0 shadow-xs"
              >
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <HaloIcon icon={item.icon} size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.name}</div>
                  <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 2. Dual Counter-Flow Strips */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Dual Counter-Flow Strips
          </h3>
          <p className="text-sm text-muted-foreground">
            Top track moves forward (right-to-left), bottom track moves in reverse (left-to-right), creating dynamic kinetic depth.
          </p>
        </div>

        <div className="space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/20">
          {/* Top Track (Forward) */}
          <Marquee direction="forward" duration={22} gap="1rem">
            {["Next.js", "Vite", "Remix", "Astro", "Nuxt", "SvelteKit", "Gatsby"].map((name, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-lg border border-border/70 bg-card/80 text-xs font-semibold text-foreground shrink-0 shadow-xs"
              >
                {name}
              </div>
            ))}
          </Marquee>

          {/* Bottom Track (Reverse) */}
          <Marquee direction="reverse" duration={26} gap="1rem">
            {["Turbopack", "Biome", "Rspack", "Rollup", "esbuild", "Webpack", "SWC"].map((name, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-lg border border-border/70 bg-card/80 text-xs font-medium text-muted-foreground shrink-0 shadow-xs"
              >
                {name}
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 3. Interactive Cards with Focus Pause */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Interactive Cards with Pause on Focus & Hover
          </h3>
          <p className="text-sm text-muted-foreground">
            Clickable cards pause smoothly when focused with keyboard (Tab) or hovered with pointer, ensuring accessibility.
          </p>
        </div>

        <Marquee
          duration={35}
          pauseOnHover={true}
          pauseOnFocus={true}
          className="py-2"
        >
          {[
            { tag: "v2.1 Release", title: "Liquid Optical Engine", cta: "Read notes" },
            { tag: "Architecture", title: "Source Ownership Spec", cta: "Learn more" },
            { tag: "Compliance", title: "WCAG 2.1 AA Audit", cta: "View report" },
            { tag: "Components", title: "Diff & Code Block", cta: "Explore" },
          ].map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {}}
              className="text-left p-4 rounded-xl border border-border/80 bg-card/90 hover:bg-card hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[240px] max-w-[260px] shrink-0 transition-all cursor-pointer shadow-xs"
            >
              <span className="text-[10px] font-mono uppercase text-primary font-semibold">
                {c.tag}
              </span>
              <h5 className="font-semibold text-xs text-foreground mt-1">{c.title}</h5>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-2 group-hover:text-primary">
                <span>{c.cta}</span>
                <HaloIcon icon={ArrowRight01Icon} size={12} />
              </div>
            </button>
          ))}
        </Marquee>
      </section>

      {/* 4. Editorial Ticker Banner */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Editorial News Ticker
          </h3>
          <p className="text-sm text-muted-foreground">
            Compact `size="sm"` ticker banner for announcements and operational highlights.
          </p>
        </div>

        <div className="flex items-center rounded-xl border border-border/70 bg-card/85 overflow-hidden">
          <div className="bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground uppercase tracking-wider shrink-0 flex items-center gap-1.5 z-10 shadow-xs">
            <HaloIcon icon={SparklesIcon} size={13} />
            <span>Updates</span>
          </div>

          <Marquee size="sm" duration={20} gap="2rem" className="flex-1">
            <span className="text-xs text-foreground">
              HaloUI v2.4 introduces 27 Data Display components with pure CSS responsiveness.
            </span>
            <span className="text-xs text-muted-foreground">
              • All components support 240px micro-containers.
            </span>
            <span className="text-xs text-foreground">
              • Zero JS window.innerWidth listeners throughout the catalog.
            </span>
          </Marquee>
        </div>
      </section>

      {/* 5. Nested Inside Dashboard Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Nested Inside Dashboard Card
          </h3>
          <p className="text-sm text-muted-foreground">
            Frameless Marquee seamlessly embedded within a structured Card container without double-border clashes.
          </p>
        </div>

        <Card className="max-w-xl mx-auto">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <HaloIcon icon={Globe02Icon} size={16} className="text-primary" />
              <CardTitle className="text-sm">Verified Enterprise Integrations</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Continuous deployment connectors verified across production clusters.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Marquee
              variant="plain"
              size="sm"
              duration={24}
              gap="1.5rem"
            >
              {[
                "GitHub Actions",
                "GitLab CI",
                "AWS Lambda",
                "Cloudflare Workers",
                "Vercel Edge",
                "Docker Swarm",
                "Kubernetes",
              ].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 text-xs font-medium text-foreground shrink-0"
                >
                  <HaloIcon icon={CheckmarkCircle01Icon} size={13} className="text-emerald-500" />
                  <span>{name}</span>
                </div>
              ))}
            </Marquee>
          </CardContent>
        </Card>
      </section>

      {/* 6. Micro-Container Reflow (240px – 320px) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Micro-Container Reflow (240px – 320px)
          </h3>
          <p className="text-sm text-muted-foreground">
            Automatic container query `@container/marquee` confines movement cleanly without blowing out narrow sidebars.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-start">
          <div className="w-[240px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 240px
            </span>
            <div className="p-2 rounded-xl border border-border/70 bg-card/60">
              <Marquee size="sm" duration={14} gap="0.75rem">
                {["Optics", "Tokens", "A11y", "Motion"].map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-muted/60 text-foreground shrink-0"
                  >
                    {t}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>

          <div className="w-[300px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 300px
            </span>
            <div className="p-2 rounded-xl border border-border/70 bg-card/60">
              <Marquee size="sm" duration={18} gap="1rem">
                {["Card", "Diff", "Tree", "Code", "JSON"].map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-md border border-border/60 bg-muted/40 text-foreground font-mono shrink-0"
                  >
                    {t}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
