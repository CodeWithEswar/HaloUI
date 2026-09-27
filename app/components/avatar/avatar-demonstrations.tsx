"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { HaloIcon } from "@/components/icons/halo-icon";
import { UserIcon, Shield01Icon } from "@hugeicons/core-free-icons";

export function AvatarDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Sizing Scale */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Sizing Scale
          </h3>
          <p className="text-sm text-muted-foreground">
            Standardized dimensions from compact inline references (24px) to prominent author spotlights (48px).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="sm">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-mono text-muted-foreground">sm (24px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Avatar size="default">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-mono text-muted-foreground">default (32px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-mono text-muted-foreground">lg (40px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Avatar size="xl">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-mono text-muted-foreground">xl (48px)</span>
          </div>
        </div>
      </section>

      {/* 2. Fallback Progression & Media Fidelity */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Fallback Progression
          </h3>
          <p className="text-sm text-muted-foreground">
            Graceful descent: high-fidelity photo if loaded, clean uppercase initials on error or delayed fetch, and generic glyphic fallback.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Marcus Vance"
              />
              <AvatarFallback>MV</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Photo Loaded</p>
              <p className="text-xs text-muted-foreground">Media fidelity preserved</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Initials Fallback</p>
              <p className="text-xs text-muted-foreground">Uppercase typography</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>
                <HaloIcon icon={UserIcon} size={18} />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Glyphic Fallback</p>
              <p className="text-xs text-muted-foreground">Anonymous entity</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Presence Status Badges */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Presence Status Badges
          </h3>
          <p className="text-sm text-muted-foreground">
            Status dots indicate connectivity or availability with an accessible background ring cut-out.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="flex items-center gap-2">
            <Avatar size="lg">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                alt="Aria Chen"
              />
              <AvatarFallback>AC</AvatarFallback>
              <AvatarBadge status="online" />
            </Avatar>
            <span className="text-xs font-medium text-foreground">Online</span>
          </div>

          <div className="flex items-center gap-2">
            <Avatar size="lg">
              <AvatarImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Marcus Vance"
              />
              <AvatarFallback>MV</AvatarFallback>
              <AvatarBadge status="away" />
            </Avatar>
            <span className="text-xs font-medium text-foreground">Away</span>
          </div>

          <div className="flex items-center gap-2">
            <Avatar size="lg">
              <AvatarImage
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                alt="Devon Thorne"
              />
              <AvatarFallback>DT</AvatarFallback>
              <AvatarBadge status="busy" />
            </Avatar>
            <span className="text-xs font-medium text-foreground">Busy</span>
          </div>

          <div className="flex items-center gap-2">
            <Avatar size="lg">
              <AvatarFallback>NK</AvatarFallback>
              <AvatarBadge status="offline" />
            </Avatar>
            <span className="text-xs font-medium text-foreground">Offline</span>
          </div>
        </div>
      </section>

      {/* 4. Overlapping Avatar Groups */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Overlapping Avatar Groups
          </h3>
          <p className="text-sm text-muted-foreground">
            Cohesive stacking with negative margins, background knockout rings, and hover scale elevation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Team Contributors (Size Default)</p>
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Elena" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Marcus" />
                <AvatarFallback>MV</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Aria" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+5</AvatarGroupCount>
            </AvatarGroup>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Compact Reviewers (Size Small)</p>
            <AvatarGroup>
              <Avatar size="sm">
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Devon" />
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Elena" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+2</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
      </section>

      {/* 5. Real-World Composite: Comment Header */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Application Context: Activity Feed
          </h3>
          <p className="text-sm text-muted-foreground">
            Avatar naturally integrated with author identity, timestamp, and content in a liquid glass card.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-card/65 backdrop-blur-md max-w-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="default">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                />
                <AvatarFallback>ER</AvatarFallback>
                <AvatarBadge status="online" />
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">Elena Rostova</p>
                <p className="text-xs text-muted-foreground">Staff Infrastructure Engineer</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">4m ago</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            Pushed release v3.4.1 to global edge nodes. Latency benchmarks dropped 18% across EU and AP clusters.
          </p>
        </div>
      </section>
    </div>
  );
}
