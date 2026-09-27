"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  type AvatarSize,
  type AvatarStatus,
} from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { UserIcon } from "@hugeicons/core-free-icons";

const DEMO_AVATARS = [
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
];

export function AvatarPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [size, setSize] = React.useState<AvatarSize>("default");
  const [mode, setMode] = React.useState<"image" | "initials" | "icon">("image");
  const [status, setStatus] = React.useState<AvatarStatus | "none">("online");
  const [isGroup, setIsGroup] = React.useState(false);

  const handleReset = () => {
    setSize("default");
    setMode("image");
    setStatus("online");
    setIsGroup(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Size",
      value: size.toUpperCase(),
      variant: "default",
    },
    {
      label: "Presentation",
      value: mode.toUpperCase(),
      variant: "default",
    },
    {
      label: "Presence",
      value: status.toUpperCase(),
      variant: status === "online" ? "success" : status === "away" || status === "busy" ? "warning" : "default",
    },
    {
      label: "Composition",
      value: isGroup ? "GROUP STACK" : "STANDALONE",
      variant: isGroup ? "warning" : "default",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const sizeProp = size !== "default" ? ` size="${size}"` : "";

    if (isGroup) {
      return `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";

export function TeamPresence() {
  return (
    <AvatarGroup>
      <Avatar${sizeProp}>
        <AvatarImage src="${DEMO_AVATARS[0].src}" alt="${DEMO_AVATARS[0].name}" />
        <AvatarFallback>${DEMO_AVATARS[0].initials}</AvatarFallback>
      </Avatar>
      <Avatar${sizeProp}>
        <AvatarImage src="${DEMO_AVATARS[1].src}" alt="${DEMO_AVATARS[1].name}" />
        <AvatarFallback>${DEMO_AVATARS[1].initials}</AvatarFallback>
      </Avatar>
      <Avatar${sizeProp}>
        <AvatarImage src="${DEMO_AVATARS[2].src}" alt="${DEMO_AVATARS[2].name}" />
        <AvatarFallback>${DEMO_AVATARS[2].initials}</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  );
}`;
    }

    const badgeStr = status !== "none" ? `\n      <AvatarBadge status="${status}" />` : "";

    if (mode === "image") {
      return `import { Avatar, AvatarImage, AvatarFallback${status !== "none" ? ", AvatarBadge" : ""} } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <Avatar${sizeProp}>
      <AvatarImage
        src="${DEMO_AVATARS[0].src}"
        alt="${DEMO_AVATARS[0].name}"
      />
      <AvatarFallback>${DEMO_AVATARS[0].initials}</AvatarFallback>${badgeStr}
    </Avatar>
  );
}`;
    }

    if (mode === "initials") {
      return `import { Avatar, AvatarFallback${status !== "none" ? ", AvatarBadge" : ""} } from "@/components/ui/avatar";

export function InitialsAvatar() {
  return (
    <Avatar${sizeProp}>
      <AvatarFallback>${DEMO_AVATARS[0].initials}</AvatarFallback>${badgeStr}
    </Avatar>
  );
}`;
    }

    return `import { Avatar, AvatarFallback${status !== "none" ? ", AvatarBadge" : ""} } from "@/components/ui/avatar";
import { HaloIcon } from "@/components/icons/halo-icon";
import { UserIcon } from "@hugeicons/core-free-icons";

export function GlyphicAvatar() {
  return (
    <Avatar${sizeProp}>
      <AvatarFallback>
        <HaloIcon icon={UserIcon} size={${size === "sm" ? 12 : size === "lg" ? 18 : size === "xl" ? 22 : 16}} />
      </AvatarFallback>${badgeStr}
    </Avatar>
  );
}`;
  }, [size, mode, status, isGroup]);

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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StageControlSelect
              label="Size Scale"
              value={size}
              onChange={(val) => setSize(val as AvatarSize)}
              options={[
                { value: "sm", label: "Small (24px)" },
                { value: "default", label: "Default (32px)" },
                { value: "lg", label: "Large (40px)" },
                { value: "xl", label: "Extra Large (48px)" },
              ]}
            />

            <StageControlSelect
              label="Content Mode"
              value={mode}
              onChange={(val) => setMode(val as "image" | "initials" | "icon")}
              options={[
                { value: "image", label: "Photo Image" },
                { value: "initials", label: "Initials Fallback" },
                { value: "icon", label: "Glyphic Icon" },
              ]}
            />

            <StageControlSelect
              label="Presence Status"
              value={status}
              onChange={(val) => setStatus(val as AvatarStatus | "none")}
              options={[
                { value: "none", label: "None (Standard)" },
                { value: "online", label: "Online (Emerald)" },
                { value: "away", label: "Away (Amber)" },
                { value: "busy", label: "Busy (Rose)" },
                { value: "offline", label: "Offline (Neutral)" },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="avatar-toggle-group"
                checked={isGroup}
                onCheckedChange={(checked) => setIsGroup(Boolean(checked))}
              />
              <Label
                htmlFor="avatar-toggle-group"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Avatar Group Stack
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-8">
        {isGroup ? (
          <AvatarGroup>
            {DEMO_AVATARS.map((u, i) => (
              <Avatar key={u.name} size={size}>
                {mode === "image" && (
                  <AvatarImage src={u.src} alt={u.name} />
                )}
                <AvatarFallback>
                  {mode === "icon" ? (
                    <HaloIcon
                      icon={UserIcon}
                      size={size === "sm" ? 12 : size === "lg" ? 18 : size === "xl" ? 22 : 16}
                    />
                  ) : (
                    u.initials
                  )}
                </AvatarFallback>
                {status !== "none" && i === 0 && <AvatarBadge status={status} />}
              </Avatar>
            ))}
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        ) : (
          <Avatar size={size}>
            {mode === "image" && (
              <AvatarImage
                src={DEMO_AVATARS[0].src}
                alt={DEMO_AVATARS[0].name}
              />
            )}
            <AvatarFallback>
              {mode === "icon" ? (
                <HaloIcon
                  icon={UserIcon}
                  size={size === "sm" ? 12 : size === "lg" ? 18 : size === "xl" ? 22 : 16}
                />
              ) : (
                DEMO_AVATARS[0].initials
              )}
            </AvatarFallback>
            {status !== "none" && <AvatarBadge status={status} />}
          </Avatar>
        )}
      </div>
    </PreviewStageShell>
  );
}
