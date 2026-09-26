"use client";

import * as React from "react";
import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardAvatar,
  ProfileCardIdentity,
  ProfileCardName,
  ProfileCardHandle,
  ProfileCardRole,
  ProfileCardStatus,
  ProfileCardBio,
  ProfileCardMetadata,
  ProfileCardMetadataItem,
  ProfileCardActions,
  ProfileCardFooter,
} from "@/components/ui/profile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Location01Icon,
  UserGroupIcon,
  Mail01Icon,
  Calendar01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function ProfileCardDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Layout Variations: Vertical vs Horizontal */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Layout Orientations
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Profile Card supports stacked <span className="font-mono text-xs">vertical</span> presentation for featured cards and inline <span className="font-mono text-xs">horizontal</span> presentation for member directories and list sidebars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Vertical Layout */}
          <ProfileCard layout="vertical" className="max-w-sm">
            <ProfileCardHeader>
              <ProfileCardAvatar>
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </ProfileCardAvatar>
            </ProfileCardHeader>
            <ProfileCardIdentity>
              <div className="flex items-center justify-between gap-2">
                <ProfileCardName>Sarah Chen</ProfileCardName>
                <ProfileCardStatus status="online" />
              </div>
              <ProfileCardHandle>@sarahc</ProfileCardHandle>
              <ProfileCardRole>Principal ML Infrastructure Engineer</ProfileCardRole>
            </ProfileCardIdentity>
            <ProfileCardBio>
              Leading low-latency distributed model inference and edge acceleration pipelines.
            </ProfileCardBio>
            <ProfileCardMetadata>
              <ProfileCardMetadataItem>
                <HaloIcon icon={Location01Icon} size={13} className="text-muted-foreground/70" />
                San Francisco, CA
              </ProfileCardMetadataItem>
              <ProfileCardMetadataItem>
                <HaloIcon icon={UserGroupIcon} size={13} className="text-muted-foreground/70" />
                AI Systems
              </ProfileCardMetadataItem>
            </ProfileCardMetadata>
            <ProfileCardActions>
              <Button size="sm" className="w-full">Connect</Button>
              <Button size="sm" variant="outline"><HaloIcon icon={Mail01Icon} size={14} /></Button>
            </ProfileCardActions>
          </ProfileCard>

          {/* Horizontal Layout */}
          <div className="space-y-3">
            <ProfileCard layout="horizontal" className="w-full">
              <ProfileCardHeader>
                <ProfileCardAvatar>
                  <Avatar size="default">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Marcus Vance" />
                    <AvatarFallback>MV</AvatarFallback>
                  </Avatar>
                </ProfileCardAvatar>
              </ProfileCardHeader>
              <ProfileCardIdentity>
                <div className="flex items-center gap-2">
                  <ProfileCardName>Marcus Vance</ProfileCardName>
                  <ProfileCardStatus status="away" />
                </div>
                <ProfileCardRole>Site Reliability Lead</ProfileCardRole>
              </ProfileCardIdentity>
              <ProfileCardActions>
                <Button size="sm" variant="outline">Profile</Button>
              </ProfileCardActions>
            </ProfileCard>

            <ProfileCard layout="horizontal" className="w-full">
              <ProfileCardHeader>
                <ProfileCardAvatar>
                  <Avatar size="default">
                    <AvatarImage src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" alt="Elena Rostova" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </ProfileCardAvatar>
              </ProfileCardHeader>
              <ProfileCardIdentity>
                <div className="flex items-center gap-2">
                  <ProfileCardName>Elena Rostova</ProfileCardName>
                  <ProfileCardStatus status="busy" />
                </div>
                <ProfileCardRole>Security Architecture</ProfileCardRole>
              </ProfileCardIdentity>
              <ProfileCardActions>
                <Button size="sm" variant="outline">Profile</Button>
              </ProfileCardActions>
            </ProfileCard>
          </div>
        </div>
      </section>

      {/* 2. Defensive Design: Missing Avatar & Long Name Reflow */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Defensive Design: Fallbacks & Long Text Reflow
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Layouts must remain robust under missing image assets and realistic long text without crushing avatars or breaking action alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Missing Avatar: Fallback */}
          <ProfileCard className="max-w-sm">
            <ProfileCardHeader>
              <ProfileCardAvatar>
                <Avatar size="lg">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </ProfileCardAvatar>
            </ProfileCardHeader>
            <ProfileCardIdentity>
              <div className="flex items-center justify-between gap-2">
                <ProfileCardName>Jane Doe</ProfileCardName>
                <ProfileCardStatus status="offline" />
              </div>
              <ProfileCardHandle>@janedoe</ProfileCardHandle>
              <ProfileCardRole>Data Operations</ProfileCardRole>
            </ProfileCardIdentity>
            <ProfileCardMetadata>
              <ProfileCardMetadataItem>
                <HaloIcon icon={Calendar01Icon} size={13} className="text-muted-foreground/70" />
                Joined March 2026
              </ProfileCardMetadataItem>
            </ProfileCardMetadata>
          </ProfileCard>

          {/* Long Name Stress Test */}
          <ProfileCard className="max-w-sm">
            <ProfileCardHeader>
              <ProfileCardAvatar>
                <Avatar size="lg">
                  <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                    BA
                  </AvatarFallback>
                </Avatar>
              </ProfileCardAvatar>
            </ProfileCardHeader>
            <ProfileCardIdentity>
              <ProfileCardName title="Dr. Bartholomew Alexander Montgomery-Finch III">
                Dr. Bartholomew Alexander Montgomery-Finch III
              </ProfileCardName>
              <ProfileCardRole title="Distributed Consensus & State Replication Fellow">
                Distributed Consensus & State Replication Fellow
              </ProfileCardRole>
            </ProfileCardIdentity>
            <ProfileCardMetadata>
              <ProfileCardMetadataItem>
                <HaloIcon icon={Location01Icon} size={13} className="text-muted-foreground/70" />
                Oxford, UK
              </ProfileCardMetadataItem>
            </ProfileCardMetadata>
          </ProfileCard>

          {/* Minimal Card (No Secondary Data) */}
          <ProfileCard className="max-w-sm">
            <ProfileCardHeader>
              <ProfileCardAvatar>
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" alt="Alex Rivera" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
              </ProfileCardAvatar>
            </ProfileCardHeader>
            <ProfileCardIdentity>
              <ProfileCardName>Alex Rivera</ProfileCardName>
              <ProfileCardRole>Open Source Contributor</ProfileCardRole>
            </ProfileCardIdentity>
          </ProfileCard>
        </div>
      </section>

      {/* 3. High-Density Member Directory Grid */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Member Directory Grid (8 Identities)
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Restrained optical material ensures large directories remain visually calm, scannable, and performant.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: "Maya Lin", role: "Design Lead", handle: "@mayalin", status: "online" as const, initials: "ML" },
            { name: "Devon Ward", role: "Rust Systems", handle: "@devonw", status: "online" as const, initials: "DW" },
            { name: "Priya Nair", role: "Frontend Architect", handle: "@priyan", status: "busy" as const, initials: "PN" },
            { name: "Liam O'Connor", role: "Cloud Platform", handle: "@liamo", status: "away" as const, initials: "LO" },
            { name: "Aria Thorne", role: "Kernel Engineer", handle: "@ariathorne", status: "online" as const, initials: "AT" },
            { name: "Kenji Sato", role: "Product Manager", handle: "@kenjis", status: "offline" as const, initials: "KS" },
            { name: "Fatima Al-Mansoor", role: "Database Reliability", handle: "@fatima_m", status: "online" as const, initials: "FA" },
            { name: "Julian Rossi", role: "DevOps Engineer", handle: "@jrossi", status: "away" as const, initials: "JR" },
          ].map((member, idx) => (
            <ProfileCard key={idx} size="sm">
              <ProfileCardHeader>
                <ProfileCardAvatar>
                  <Avatar size="sm">
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                </ProfileCardAvatar>
                <ProfileCardStatus status={member.status} />
              </ProfileCardHeader>
              <ProfileCardIdentity>
                <ProfileCardName className="text-sm font-semibold">{member.name}</ProfileCardName>
                <ProfileCardRole className="text-xs">{member.role}</ProfileCardRole>
              </ProfileCardIdentity>
              <ProfileCardActions>
                <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                  View
                </Button>
              </ProfileCardActions>
            </ProfileCard>
          ))}
        </div>
      </section>
    </div>
  );
}
