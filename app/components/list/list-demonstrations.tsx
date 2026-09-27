"use client";

import * as React from "react";
import {
  List,
  ListItem,
  ListHeader,
  ListFooter,
  ListEmpty,
} from "@/components/ui/list";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  AvatarGroup,
} from "@/components/ui/avatar-group";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  FolderIcon,
  File01Icon,
  CloudIcon,
  SecurityCheckIcon,
  Notification01Icon,
  ArrowRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export function ListDemonstrations() {
  const [syncEnabled, setSyncEnabled] = React.useState(true);

  return (
    <div className="space-y-16">
      {/* 1. Standalone Liquid Glass List */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Standalone Liquid Glass Surface
          </h3>
          <p className="text-sm text-muted-foreground">
            When rendered independently, the outer <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">List</code> carries the HaloUI Liquid Glass optical boundary with 135° specular glint and backdrop blur, while inner rows remain flat to avoid visual noise.
          </p>
        </div>

        <div className="max-w-2xl">
          <List variant="glass" divided>
            <ListHeader>Active Core Infrastructure</ListHeader>

            <ListItem asChild>
              <Item variant="default" interactive>
                <ItemMedia variant="icon">
                  <HaloIcon icon={CloudIcon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Global Edge Network</ItemTitle>
                  <ItemDescription>Real-time request routing and traffic balancing across 320 nodes.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <StatusBadge tone="positive">Operational</StatusBadge>
                </ItemActions>
              </Item>
            </ListItem>

            <ListItem asChild>
              <Item variant="default" interactive>
                <ItemMedia variant="icon">
                  <HaloIcon icon={SecurityCheckIcon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Cryptographic Vault</ItemTitle>
                  <ItemDescription>Zero-knowledge secret management and auto-rotating API credentials.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant="glass">Encrypted</Badge>
                </ItemActions>
              </Item>
            </ListItem>

            <ListItem asChild>
              <Item variant="default" interactive>
                <ItemMedia variant="icon">
                  <HaloIcon icon={SparklesIcon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Optical Physics Engine</ItemTitle>
                  <ItemDescription>GPU-accelerated hardware compositing with dynamic refraction.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                    View
                    <HaloIcon icon={ArrowRight01Icon} className="size-3.5" />
                  </Button>
                </ItemActions>
              </Item>
            </ListItem>

            <ListFooter>
              <span>3 services running</span>
              <span className="text-emerald-500 font-medium">99.99% uptime</span>
            </ListFooter>
          </List>
        </div>
      </section>

      {/* 2. Nested Surface Rule: List Inside Card */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Nested Surface Rule: List Inside Card
          </h3>
          <p className="text-sm text-muted-foreground">
            When a List is placed inside an already-materialized Card, the List uses <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">variant=&quot;default&quot;</code>. This prevents double glass-on-glass stacking and preserves high readability.
          </p>
        </div>

        <Card variant="default" intensity="balanced" className="p-4 sm:p-6 max-w-2xl">
          <List variant="default" divided>
            <ListHeader className="px-0">Workspace Collaborators</ListHeader>

            <ListItem asChild>
              <Item variant="default">
                <ItemMedia>
                  <Avatar size="default">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      alt="Elena Rostova"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Elena Rostova</ItemTitle>
                  <ItemDescription>Principal Optical Systems Engineer</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <StatusBadge tone="positive">Online</StatusBadge>
                </ItemActions>
              </Item>
            </ListItem>

            <ListItem asChild>
              <Item variant="default">
                <ItemMedia>
                  <Avatar size="default">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                      alt="Marcus Vance"
                    />
                    <AvatarFallback>MV</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Marcus Vance</ItemTitle>
                  <ItemDescription>Distributed Systems Architect</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <StatusBadge tone="warning">Away</StatusBadge>
                </ItemActions>
              </Item>
            </ListItem>

            <ListItem asChild>
              <Item variant="default">
                <ItemMedia>
                  <Avatar size="default">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                      alt="Aria Chen"
                    />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Aria Chen</ItemTitle>
                  <ItemDescription>Senior Design Systems Engineer</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <StatusBadge tone="neutral">Offline</StatusBadge>
                </ItemActions>
              </Item>
            </ListItem>
          </List>
        </Card>
      </section>

      {/* 3. Automatic Responsiveness in Narrow Containers (260px Sidebar) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Automatic Container-Aware Reflow (260px Sidebar Container)
          </h3>
          <p className="text-sm text-muted-foreground">
            The same component adapts automatically when placed into a narrow sidebar or mobile drawer via <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">@container/list</code>. Zero JavaScript width detection is required.
          </p>
        </div>

        <div className="w-[260px] p-3 rounded-2xl border border-border/80 bg-muted/20">
          <List variant="default" density="compact" divided>
            <ListHeader className="px-1 text-[11px]">Recent Files</ListHeader>

            <ListItem asChild>
              <Item variant="default" size="compact" interactive className="px-1.5">
                <ItemMedia variant="icon" className="size-7 [&_svg]:size-3.5">
                  <HaloIcon icon={File01Icon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-xs font-medium">tokens.css</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span className="text-[10px] text-muted-foreground font-mono">14KB</span>
                </ItemActions>
              </Item>
            </ListItem>

            <ListItem asChild>
              <Item variant="default" size="compact" interactive className="px-1.5">
                <ItemMedia variant="icon" className="size-7 [&_svg]:size-3.5">
                  <HaloIcon icon={FolderIcon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-xs font-medium">components/ui</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span className="text-[10px] text-muted-foreground font-mono">80 items</span>
                </ItemActions>
              </Item>
            </ListItem>

            <ListItem asChild>
              <Item variant="default" size="compact" interactive className="px-1.5">
                <ItemMedia variant="icon" className="size-7 [&_svg]:size-3.5">
                  <HaloIcon icon={File01Icon} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-xs font-medium">schema.json</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span className="text-[10px] text-muted-foreground font-mono">4KB</span>
                </ItemActions>
              </Item>
            </ListItem>
          </List>
        </div>
      </section>

      {/* 4. Semantic Ordered Sequence */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Semantic Ordered Sequence (&lt;ol&gt;)
          </h3>
          <p className="text-sm text-muted-foreground">
            Using <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">ordered</code> renders a true semantic HTML <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">&lt;ol&gt;</code> element to preserve sequence announcements for assistive technologies.
          </p>
        </div>

        <Card variant="outline" className="p-4 max-w-xl">
          <List ordered marker="decimal" className="space-y-3">
            <ListItem className="text-sm text-foreground">
              <span>Install the component via the shadcn registry CLI (<code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">npx shadcn@latest add @haloui/list</code>).</span>
            </ListItem>
            <ListItem className="text-sm text-foreground">
              <span>Import <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">List</code> and optional <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">ListItem</code> directly into your Server Component page.</span>
            </ListItem>
            <ListItem className="text-sm text-foreground">
              <span>Compose with HaloUI <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">Item</code> to organize leading media, titles, and actions.</span>
            </ListItem>
          </List>
        </Card>
      </section>

      {/* 5. Graceful Empty State Composition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Empty State Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">ListEmpty</code> provides an accessible, centered slot when a query returns zero results.
          </p>
        </div>

        <div className="max-w-md">
          <List variant="outline">
            <ListEmpty>
              <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center mb-2 text-muted-foreground">
                <HaloIcon icon={FolderIcon} size={20} />
              </div>
              <p className="font-medium text-foreground text-sm">No deployments found</p>
              <p className="text-xs text-muted-foreground mt-0.5">Push code to main or trigger a manual deployment workflow.</p>
            </ListEmpty>
          </List>
        </div>
      </section>
    </div>
  );
}
