"use client";

import * as React from "react";
import {
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar-group";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import { UserIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const MEMBERS = [
  {
    name: "Elena Rostova",
    initials: "ER",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Marcus Vance",
    initials: "MV",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Aria Chen",
    initials: "AC",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Devon Thorne",
    initials: "DT",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Kiran Patel",
    initials: "KP",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
];

export function AvatarGroupDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Sizing Hierarchy */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Sizing Hierarchy
          </h3>
          <p className="text-sm text-muted-foreground">
            Avatar Group propagates canonical dimensions (`sm`, `default`, `lg`, `xl`) and tokenized negative spacing across child avatars.
          </p>
        </div>

        <div className="flex flex-col gap-6 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Small Scale (24px, -6px overlap)</p>
              <p className="text-xs text-muted-foreground">Dense table cells, compact list items</p>
            </div>
            <AvatarGroup size="sm">
              <Avatar><AvatarImage src={MEMBERS[0].src} alt={MEMBERS[0].name} /><AvatarFallback>{MEMBERS[0].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[1].src} alt={MEMBERS[1].name} /><AvatarFallback>{MEMBERS[1].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[2].src} alt={MEMBERS[2].name} /><AvatarFallback>{MEMBERS[2].initials}</AvatarFallback></Avatar>
              <AvatarGroupCount size="sm">+2</AvatarGroupCount>
            </AvatarGroup>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Default Scale (32px, -8px overlap)</p>
              <p className="text-xs text-muted-foreground">Standard dashboard cards, comment headers</p>
            </div>
            <AvatarGroup size="default">
              <Avatar><AvatarImage src={MEMBERS[0].src} alt={MEMBERS[0].name} /><AvatarFallback>{MEMBERS[0].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[1].src} alt={MEMBERS[1].name} /><AvatarFallback>{MEMBERS[1].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[2].src} alt={MEMBERS[2].name} /><AvatarFallback>{MEMBERS[2].initials}</AvatarFallback></Avatar>
              <AvatarGroupCount size="default">+3</AvatarGroupCount>
            </AvatarGroup>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Large Scale (40px, -10px overlap)</p>
              <p className="text-xs text-muted-foreground">Hero banners, featured team overviews</p>
            </div>
            <AvatarGroup size="lg">
              <Avatar><AvatarImage src={MEMBERS[0].src} alt={MEMBERS[0].name} /><AvatarFallback>{MEMBERS[0].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[1].src} alt={MEMBERS[1].name} /><AvatarFallback>{MEMBERS[1].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[2].src} alt={MEMBERS[2].name} /><AvatarFallback>{MEMBERS[2].initials}</AvatarFallback></Avatar>
              <AvatarGroupCount size="lg">+4</AvatarGroupCount>
            </AvatarGroup>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Extra Large Scale (48px, -12px overlap)</p>
              <p className="text-xs text-muted-foreground">Product landing showcases, contributor spotlights</p>
            </div>
            <AvatarGroup size="xl">
              <Avatar><AvatarImage src={MEMBERS[0].src} alt={MEMBERS[0].name} /><AvatarFallback>{MEMBERS[0].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[1].src} alt={MEMBERS[1].name} /><AvatarFallback>{MEMBERS[1].initials}</AvatarFallback></Avatar>
              <Avatar><AvatarImage src={MEMBERS[2].src} alt={MEMBERS[2].name} /><AvatarFallback>{MEMBERS[2].initials}</AvatarFallback></Avatar>
              <AvatarGroupCount size="xl">+5</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
      </section>

      {/* 2. Automatic Max Truncation & Overflow */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Truncation &amp; Overflow Calculation
          </h3>
          <p className="text-sm text-muted-foreground">
            Pass <code className="text-xs font-mono">max={3}</code> to automatically slice children and append the computed overflow indicator.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">Automatic Child Slicing (<code className="text-xs font-mono">max=3</code>)</p>
              <p className="text-xs text-muted-foreground">5 children passed; 3 rendered + &quot;+2&quot; overflow</p>
            </div>
            <AvatarGroup max={3}>
              {MEMBERS.map((m) => (
                <Avatar key={m.name}>
                  <AvatarImage src={m.src} alt={m.name} />
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">Large Database Pool (<code className="text-xs font-mono">totalCount=84</code>)</p>
              <p className="text-xs text-muted-foreground">3 rendered + &quot;+81&quot; from total database count</p>
            </div>
            <AvatarGroup max={3} totalCount={84}>
              {MEMBERS.slice(0, 3).map((m) => (
                <Avatar key={m.name}>
                  <AvatarImage src={m.src} alt={m.name} />
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        </div>
      </section>

      {/* 3. Stacking Order Comparison */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Stacking Models
          </h3>
          <p className="text-sm text-muted-foreground">
            Control whether subsequent avatars layer on top (natural DOM order) or earlier avatars take top-level visual precedence.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">Last On Top (Default)</p>
              <p className="text-xs text-muted-foreground"><code className="text-xs font-mono">stacking=&quot;last-on-top&quot;</code>: Right-side avatars overlap left siblings</p>
            </div>
            <AvatarGroup stacking="last-on-top">
              {MEMBERS.slice(0, 4).map((m) => (
                <Avatar key={m.name}>
                  <AvatarImage src={m.src} alt={m.name} />
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">First On Top</p>
              <p className="text-xs text-muted-foreground"><code className="text-xs font-mono">stacking=&quot;first-on-top&quot;</code>: Left-most lead avatar takes top precedence</p>
            </div>
            <AvatarGroup stacking="first-on-top">
              {MEMBERS.slice(0, 4).map((m) => (
                <Avatar key={m.name}>
                  <AvatarImage src={m.src} alt={m.name} />
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        </div>
      </section>

      {/* 4. Mixed Media & Fallback Coexistence */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Mixed Identity Presentations
          </h3>
          <p className="text-sm text-muted-foreground">
            Gracefully handles real-world scenarios combining photographic portraits, uppercase initials, and anonymous glyph fallbacks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/60">
          <AvatarGroup size="lg">
            <Avatar>
              <AvatarImage src={MEMBERS[0].src} alt={MEMBERS[0].name} />
              <AvatarFallback>{MEMBERS[0].initials}</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MV</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={MEMBERS[2].src} alt={MEMBERS[2].name} />
              <AvatarFallback>{MEMBERS[2].initials}</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>
                <HaloIcon icon={UserIcon} size={18} />
              </AvatarFallback>
            </Avatar>
            <AvatarGroupCount size="lg">+6</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>

      {/* 5. Production Context: Card Composition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Application Context: Project Workspace Card
          </h3>
          <p className="text-sm text-muted-foreground">
            Avatar Group composed into a Card with metadata, tags, and action buttons.
          </p>
        </div>

        <Card className="max-w-md bg-card/65 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[11px]">Core Architecture</Badge>
              <span className="text-xs text-muted-foreground font-mono">v4.2.0-rc</span>
            </div>
            <CardTitle className="text-lg mt-1">Distributed Edge Mesh</CardTitle>
            <CardDescription>
              Low-latency microservices cluster coordinating geo-routed edge workers.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Contributors
                </span>
                <AvatarGroup size="sm" max={3} totalCount={14}>
                  {MEMBERS.map((m) => (
                    <Avatar key={m.name}>
                      <AvatarImage src={m.src} alt={m.name} />
                      <AvatarFallback>{m.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <span>Review PRs</span>
                <HaloIcon icon={ArrowRight01Icon} size={12} />
              </button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
