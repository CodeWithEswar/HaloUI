"use client";

import * as React from "react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
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
  Settings01Icon,
  SecurityCheckIcon,
  Notification01Icon,
  FolderIcon,
  File01Icon,
  CloudIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export function ItemDemonstrations() {
  const [notifEnabled, setNotifEnabled] = React.useState(true);
  const [telemetryEnabled, setTelemetryEnabled] = React.useState(false);

  return (
    <div className="space-y-16">
      {/* 1. Settings Row Composition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Settings Row Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            Items compose seamlessly with Switches, Buttons, and Status Badges to create tactile configuration panels.
          </p>
        </div>

        <Card variant="default" intensity="balanced" className="p-4 sm:p-6 max-w-2xl">
          <ItemGroup>
            <Item variant="default">
              <ItemMedia variant="icon">
                <HaloIcon icon={Notification01Icon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Push Notifications</ItemTitle>
                <ItemDescription>
                  Receive real-time alerts for critical system anomalies and workflow updates.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  checked={notifEnabled}
                  onCheckedChange={setNotifEnabled}
                  aria-label="Toggle push notifications"
                />
              </ItemActions>
            </Item>

            <ItemSeparator />

            <Item variant="default">
              <ItemMedia variant="icon">
                <HaloIcon icon={CloudIcon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Automated Cloud Sync</ItemTitle>
                <ItemDescription>
                  Replicate encrypted workspace states to multi-region cloud edge storage.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <StatusBadge tone="positive">
                  Active
                </StatusBadge>
              </ItemActions>
            </Item>

            <ItemSeparator />

            <Item variant="default">
              <ItemMedia variant="icon">
                <HaloIcon icon={SecurityCheckIcon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Hardware Biometrics</ItemTitle>
                <ItemDescription>
                  Verify administrative operations with WebAuthn physical security tokens.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                  Configure
                  <HaloIcon icon={ArrowRight01Icon} className="size-3.5" />
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </Card>
      </section>

      {/* 2. Team Member & Presence Row */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Team Member & Identity Row
          </h3>
          <p className="text-sm text-muted-foreground">
            Pairing canonical Avatar and StatusBadge primitives without visual clutter or distorting parent filters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          <Item variant="glass" interactive className="p-3">
            <ItemMedia>
              <Avatar size="lg">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="justify-between">
                <span>Elena Rostova</span>
                <StatusBadge tone="positive" className="text-[11px] px-2 py-0.5">
                  Online
                </StatusBadge>
              </ItemTitle>
              <ItemDescription>Principal Optical Systems Engineer</ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="glass" interactive className="p-3">
            <ItemMedia>
              <Avatar size="lg">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Marcus Vance"
                />
                <AvatarFallback>MV</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="justify-between">
                <span>Marcus Vance</span>
                <StatusBadge tone="warning" className="text-[11px] px-2 py-0.5">
                  Away
                </StatusBadge>
              </ItemTitle>
              <ItemDescription>Senior Distributed Systems Architect</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </section>

      {/* 3. Activity Feed with AvatarGroup */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Collaborative Activity Feed
          </h3>
          <p className="text-sm text-muted-foreground">
            Composing Item with AvatarGroup to indicate collaborative ownership and reviewer clusters.
          </p>
        </div>

        <Card variant="default" intensity="subtle" className="p-4 max-w-2xl space-y-2">
          <Item variant="default" size="default">
            <ItemMedia variant="icon">
              <HaloIcon icon={FolderIcon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Core Design System Tokens v4.2</ItemTitle>
              <ItemDescription>Pull request approved by design systems engineering.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <AvatarGroup size="sm" max={3} totalCount={8}>
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="ER" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="MV" />
                  <AvatarFallback>MV</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="AC" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </ItemActions>
          </Item>

          <ItemSeparator />

          <Item variant="default" size="default">
            <ItemMedia variant="icon">
              <HaloIcon icon={SparklesIcon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Liquid Glass Refraction Pipeline</ItemTitle>
              <ItemDescription>Benchmarked 60fps compositing across low-end mobile viewports.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="glass">Merged</Badge>
            </ItemActions>
          </Item>
        </Card>
      </section>

      {/* 4. Responsive Reflow with Long Content */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Responsive Text Reflow & Long Content
          </h3>
          <p className="text-sm text-muted-foreground">
            Strict <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">min-w-0</code> handling guarantees that lengthy titles and descriptive paragraphs wrap naturally without pushing actions outside the container.
          </p>
        </div>

        <Card variant="outline" className="p-4 max-w-xl">
          <Item variant="default">
            <ItemMedia variant="icon">
              <HaloIcon icon={File01Icon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                halo-ui-liquid-optical-engine-production-specification-and-benchmarking-manifest-v2.pdf
              </ItemTitle>
              <ItemDescription>
                Comprehensive 10-layer physical shader mathematical specifications, ambient contact calculations, and optical boundary constants.
              </ItemDescription>
            </ItemContent>
            <ItemActions className="self-start sm:self-center">
              <Badge variant="outline">2.4 MB</Badge>
            </ItemActions>
          </Item>
        </Card>
      </section>

      {/* 5. Compact Density List */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Compact Density List
          </h3>
          <p className="text-sm text-muted-foreground">
            <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">size=&quot;compact&quot;</code> reduces internal vertical padding to 8px for high-density sidebars and dropdown menus.
          </p>
        </div>

        <Card variant="default" intensity="subtle" className="p-2 max-w-md">
          <ItemGroup>
            <Item size="compact" interactive>
              <ItemMedia variant="icon" className="size-7 [&_svg]:size-3.5">
                <HaloIcon icon={FolderIcon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-xs font-medium">components/ui/card.tsx</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="text-[11px] text-muted-foreground">11.2 KB</span>
              </ItemActions>
            </Item>

            <Item size="compact" interactive>
              <ItemMedia variant="icon" className="size-7 [&_svg]:size-3.5">
                <HaloIcon icon={FolderIcon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-xs font-medium">components/ui/avatar.tsx</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="text-[11px] text-muted-foreground">5.0 KB</span>
              </ItemActions>
            </Item>

            <Item size="compact" interactive>
              <ItemMedia variant="icon" className="size-7 [&_svg]:size-3.5">
                <HaloIcon icon={FolderIcon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-xs font-medium">components/ui/item.tsx</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="text-[11px] text-muted-foreground">7.4 KB</span>
              </ItemActions>
            </Item>
          </ItemGroup>
        </Card>
      </section>
    </div>
  );
}
