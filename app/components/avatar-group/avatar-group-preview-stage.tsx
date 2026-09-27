"use client";

import * as React from "react";
import {
  AvatarGroup,
  AvatarGroupCount,
  type AvatarGroupStacking,
} from "@/components/ui/avatar-group";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarSize,
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

const PREVIEW_MEMBERS = [
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
  {
    name: "Sophia Lind",
    initials: "SL",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
  },
];

export function AvatarGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [size, setSize] = React.useState<AvatarSize>("default");
  const [maxOption, setMaxOption] = React.useState<string>("3");
  const [stacking, setStacking] = React.useState<AvatarGroupStacking>("last-on-top");
  const [totalCountMode, setTotalCountMode] = React.useState<"auto" | "large">("auto");
  const [isInteractive, setIsInteractive] = React.useState(false);

  const maxVal = maxOption === "all" ? undefined : parseInt(maxOption, 10);
  const totalCount = totalCountMode === "large" ? 48 : undefined;

  const handleReset = () => {
    setSize("default");
    setMaxOption("3");
    setStacking("last-on-top");
    setTotalCountMode("auto");
    setIsInteractive(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const computedOverflow = React.useMemo(() => {
    if (totalCount && maxVal) {
      return totalCount - maxVal;
    }
    if (maxVal && PREVIEW_MEMBERS.length > maxVal) {
      return PREVIEW_MEMBERS.length - maxVal;
    }
    return 0;
  }, [maxVal, totalCount]);

  const telemetry: TelemetryItem[] = [
    {
      label: "Size Scale",
      value: size.toUpperCase(),
      variant: "default",
    },
    {
      label: "Max Visible",
      value: maxVal ? `${maxVal} AVATARS` : "ALL",
      variant: "default",
    },
    {
      label: "Stacking",
      value: stacking === "last-on-top" ? "LAST ON TOP" : "FIRST ON TOP",
      variant: "default",
    },
    {
      label: "Overflow Indicator",
      value: computedOverflow > 0 ? `+${computedOverflow}` : "NONE",
      variant: computedOverflow > 0 ? "warning" : "default",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const propsList = [];
    if (size !== "default") propsList.push(`size="${size}"`);
    if (maxVal !== undefined) propsList.push(`max={${maxVal}}`);
    if (totalCount !== undefined) propsList.push(`totalCount={${totalCount}}`);
    if (stacking !== "last-on-top") propsList.push(`stacking="${stacking}"`);
    propsList.push(`aria-label="Project collaborators"`);

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

export function TeamMembers() {
  return (
    <AvatarGroup${propsStr}>
      <Avatar>
        <AvatarImage src="${PREVIEW_MEMBERS[0].src}" alt="${PREVIEW_MEMBERS[0].name}" />
        <AvatarFallback>${PREVIEW_MEMBERS[0].initials}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="${PREVIEW_MEMBERS[1].src}" alt="${PREVIEW_MEMBERS[1].name}" />
        <AvatarFallback>${PREVIEW_MEMBERS[1].initials}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="${PREVIEW_MEMBERS[2].src}" alt="${PREVIEW_MEMBERS[2].name}" />
        <AvatarFallback>${PREVIEW_MEMBERS[2].initials}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="${PREVIEW_MEMBERS[3].src}" alt="${PREVIEW_MEMBERS[3].name}" />
        <AvatarFallback>${PREVIEW_MEMBERS[3].initials}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="${PREVIEW_MEMBERS[4].src}" alt="${PREVIEW_MEMBERS[4].name}" />
        <AvatarFallback>${PREVIEW_MEMBERS[4].initials}</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}`;
  }, [size, maxVal, totalCount, stacking]);

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
              label="Max Visible"
              value={maxOption}
              onChange={(val) => setMaxOption(val)}
              options={[
                { value: "2", label: "2 Visible" },
                { value: "3", label: "3 Visible" },
                { value: "4", label: "4 Visible" },
                { value: "all", label: "All Visible (No limit)" },
              ]}
            />

            <StageControlSelect
              label="Stacking Order"
              value={stacking}
              onChange={(val) => setStacking(val as AvatarGroupStacking)}
              options={[
                { value: "last-on-top", label: "Last on top (Natural DOM)" },
                { value: "first-on-top", label: "First on top (Descending Z)" },
              ]}
            />

            <StageControlSelect
              label="Total Members"
              value={totalCountMode}
              onChange={(val) => setTotalCountMode(val as "auto" | "large")}
              options={[
                { value: "auto", label: "From Children (6 total)" },
                { value: "large", label: "Large Pool (48 total)" },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="avatar-group-toggle-interactive"
                checked={isInteractive}
                onCheckedChange={(checked) => setIsInteractive(Boolean(checked))}
              />
              <Label
                htmlFor="avatar-group-toggle-interactive"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Keyboard Focusable Avatars (Unclipped Halo Ring)
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-8">
        <AvatarGroup
          size={size}
          max={maxVal}
          totalCount={totalCount}
          stacking={stacking}
          aria-label="Active project contributors"
        >
          {PREVIEW_MEMBERS.map((member, index) => {
            const avatarNode = (
              <Avatar key={member.name}>
                <AvatarImage src={member.src} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            );

            if (isInteractive) {
              return (
                <button
                  key={member.name}
                  type="button"
                  aria-label={`View profile of ${member.name}`}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color,#0284c7)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-transform"
                >
                  {avatarNode}
                </button>
              );
            }

            return avatarNode;
          })}
        </AvatarGroup>
      </div>
    </PreviewStageShell>
  );
}
