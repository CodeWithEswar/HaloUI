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
  type ProfileCardLayout,
  type ProfileCardStatusType,
} from "@/components/ui/profile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { type CardIntensity, type CardSize, type CardVariant } from "@/components/ui/card";
import {
  Location01Icon,
  UserGroupIcon,
  Mail01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function ProfileCardPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // State controls
  const [layout, setLayout] = React.useState<ProfileCardLayout>("vertical");
  const [size, setSize] = React.useState<CardSize>("default");
  const [intensity, setIntensity] = React.useState<CardIntensity>("subtle");
  const [variant, setVariant] = React.useState<CardVariant>("default");
  const [status, setStatus] = React.useState<ProfileCardStatusType>("online");
  const [showStatus, setShowStatus] = React.useState(true);
  const [showBio, setShowBio] = React.useState(true);
  const [showMetadata, setShowMetadata] = React.useState(true);
  const [showActions, setShowActions] = React.useState(true);

  const handleReset = () => {
    setLayout("vertical");
    setSize("default");
    setIntensity("subtle");
    setVariant("default");
    setStatus("online");
    setShowStatus(true);
    setShowBio(true);
    setShowMetadata(true);
    setShowActions(true);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Layout",
      value: layout.toUpperCase(),
      variant: "success",
    },
    {
      label: "Presence",
      value: status.toUpperCase(),
      variant: status === "online" ? "success" : status === "busy" ? "warning" : "default",
    },
    {
      label: "Optical Material",
      value: `Liquid ${intensity.charAt(0).toUpperCase() + intensity.slice(1)}`,
      variant: intensity === "subtle" ? "default" : "warning",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const propsList = [];
    if (layout !== "vertical") propsList.push(`layout="${layout}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (intensity !== "subtle") propsList.push(`intensity="${intensity}"`);
    if (variant !== "default") propsList.push(`variant="${variant}"`);

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `import * as React from "react";
import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardAvatar,
  ProfileCardIdentity,
  ProfileCardName,
  ProfileCardHandle,
  ProfileCardRole,
  ProfileCardStatus,${showBio ? `
  ProfileCardBio,` : ""}${showMetadata ? `
  ProfileCardMetadata,
  ProfileCardMetadataItem,` : ""}${showActions ? `
  ProfileCardActions,` : ""}
} from "@/components/ui/profile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Location01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";

export function TeamMemberProfile() {
  return (
    <ProfileCard${propsStr} className="${layout === "horizontal" ? "w-full max-w-xl" : "w-full max-w-xs"}">
      <ProfileCardHeader>
        <ProfileCardAvatar>
          <Avatar size="lg">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Eswar" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </ProfileCardAvatar>
      </ProfileCardHeader>

      <ProfileCardIdentity>
        <div className="flex items-center justify-between gap-2">
          <ProfileCardName>Eswar Koneti</ProfileCardName>
          ${showStatus ? `<ProfileCardStatus status="${status}" />` : ""}
        </div>
        <ProfileCardHandle>@eswarkoneti</ProfileCardHandle>
        <ProfileCardRole>Staff Design Systems Architect</ProfileCardRole>
      </ProfileCardIdentity>
${showBio ? `
      <ProfileCardBio>
        Architecting physical optical materials and high-performance design primitives for enterprise dashboards.
      </ProfileCardBio>` : ""}${showMetadata ? `
      <ProfileCardMetadata>
        <ProfileCardMetadataItem>
          <HaloIcon icon={Location01Icon} size={13} />
          Bengaluru, IN
        </ProfileCardMetadataItem>
        <ProfileCardMetadataItem>
          <HaloIcon icon={UserGroupIcon} size={13} />
          Platform Core
        </ProfileCardMetadataItem>
      </ProfileCardMetadata>` : ""}${showActions ? `
      <ProfileCardActions>
        <Button size="sm" className="w-full">Connect</Button>
        <Button size="sm" variant="outline">Message</Button>
      </ProfileCardActions>` : ""}
    </ProfileCard>
  );
}`;
  }, [layout, size, intensity, variant, status, showStatus, showBio, showMetadata, showActions]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={telemetry}
      code={generatedCode}
      controls={
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StageControlSelect
              label="Orientation"
              value={layout}
              onChange={(val) => setLayout(val as ProfileCardLayout)}
              options={[
                { value: "vertical", label: "Vertical (Card)" },
                { value: "horizontal", label: "Horizontal (Row)" },
              ]}
            />

            <StageControlSelect
              label="Size Scale"
              value={size}
              onChange={(val) => setSize(val as CardSize)}
              options={[
                { value: "sm", label: "Small (Compact)" },
                { value: "default", label: "Default" },
                { value: "lg", label: "Large (Featured)" },
              ]}
            />

            <StageControlSelect
              label="Presence Status"
              value={status}
              onChange={(val) => setStatus(val as ProfileCardStatusType)}
              options={[
                { value: "online", label: "Online" },
                { value: "away", label: "Away" },
                { value: "busy", label: "Busy" },
                { value: "offline", label: "Offline" },
              ]}
            />

            <StageControlSelect
              label="Intensity"
              value={intensity}
              onChange={(val) => setIntensity(val as CardIntensity)}
              options={[
                { value: "subtle", label: "Subtle (2px blur)" },
                { value: "balanced", label: "Balanced (8px blur)" },
                { value: "rich", label: "Rich (16px blur)" },
              ]}
            />
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="profile-toggle-status"
                checked={showStatus}
                onCheckedChange={(checked) => setShowStatus(Boolean(checked))}
              />
              <Label
                htmlFor="profile-toggle-status"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Status
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="profile-toggle-bio"
                checked={showBio}
                onCheckedChange={(checked) => setShowBio(Boolean(checked))}
              />
              <Label
                htmlFor="profile-toggle-bio"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Bio
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="profile-toggle-metadata"
                checked={showMetadata}
                onCheckedChange={(checked) => setShowMetadata(Boolean(checked))}
              />
              <Label
                htmlFor="profile-toggle-metadata"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Metadata
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="profile-toggle-actions"
                checked={showActions}
                onCheckedChange={(checked) => setShowActions(Boolean(checked))}
              />
              <Label
                htmlFor="profile-toggle-actions"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Actions
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-4">
        <ProfileCard
          layout={layout}
          size={size}
          intensity={intensity}
          variant={variant}
          className={layout === "horizontal" ? "w-full max-w-xl" : "w-full max-w-xs"}
        >
          <ProfileCardHeader>
            <ProfileCardAvatar>
              <Avatar size={size === "sm" ? "default" : "lg"}>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Eswar" />
                <AvatarFallback>EK</AvatarFallback>
              </Avatar>
            </ProfileCardAvatar>
          </ProfileCardHeader>

          <ProfileCardIdentity>
            <div className="flex items-center justify-between gap-2">
              <ProfileCardName>Eswar Koneti</ProfileCardName>
              {showStatus && <ProfileCardStatus status={status} />}
            </div>
            <ProfileCardHandle>@eswarkoneti</ProfileCardHandle>
            <ProfileCardRole>Staff Design Systems Architect</ProfileCardRole>
          </ProfileCardIdentity>

          {showBio && (
            <ProfileCardBio>
              Architecting physical optical materials and high-performance design primitives for enterprise dashboards.
            </ProfileCardBio>
          )}

          {showMetadata && (
            <ProfileCardMetadata>
              <ProfileCardMetadataItem>
                <HaloIcon icon={Location01Icon} size={13} className="text-muted-foreground/70" />
                Bengaluru, IN
              </ProfileCardMetadataItem>
              <ProfileCardMetadataItem>
                <HaloIcon icon={UserGroupIcon} size={13} className="text-muted-foreground/70" />
                Platform Core
              </ProfileCardMetadataItem>
            </ProfileCardMetadata>
          )}

          {showActions && (
            <ProfileCardActions>
              <Button size="sm" className="w-full">
                Connect
              </Button>
              <Button size="sm" variant="outline">
                <HaloIcon icon={Mail01Icon} size={14} />
              </Button>
            </ProfileCardActions>
          )}
        </ProfileCard>
      </div>
    </PreviewStageShell>
  );
}
