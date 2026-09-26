import * as React from "react";
import {
  Card,
  type CardProps,
  type CardIntensity,
  type CardSize,
  type CardVariant,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type ProfileCardLayout = "vertical" | "horizontal";
export type ProfileCardStatusType = "online" | "away" | "busy" | "offline";

export interface ProfileCardProps extends CardProps {
  /**
   * Layout orientation of the profile summary.
   * - "vertical": Stacked layout suitable for featured cards and identity grids.
   * - "horizontal": Inline row layout suitable for directories and list sidebars.
   * @default "vertical"
   */
  layout?: ProfileCardLayout;
}

/* -------------------------------------------------------------------------
 * 1. ROOT PROFILE CARD COMPONENT
 * Compact identity summary surface built directly on Card architecture.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function ProfileCard({
  className,
  size = "default",
  intensity = "subtle",
  variant = "default",
  interactive = false,
  layout = "vertical",
  ...props
}: ProfileCardProps) {
  return (
    <Card
      data-slot="profile-card"
      data-layout={layout}
      size={size}
      intensity={intensity}
      variant={variant}
      interactive={interactive}
      className={cn(
        "group/profile-card min-w-0 transition-colors",
        layout === "horizontal" && "flex-col sm:flex-row items-start sm:items-center justify-between",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. PROFILE CARD HEADER
 * Structural container arranging the avatar and optional corner actions.
 * ----------------------------------------------------------------------- */

export interface ProfileCardHeaderProps extends React.ComponentProps<"div"> {}

export function ProfileCardHeader({ className, ...props }: ProfileCardHeaderProps) {
  return (
    <div
      data-slot="profile-card-header"
      className={cn(
        "flex items-start justify-between gap-3 px-(--card-spacing) min-w-0 w-full",
        "group-data-[layout=horizontal]/profile-card:w-auto group-data-[layout=horizontal]/profile-card:px-0 group-data-[layout=horizontal]/profile-card:pl-(--card-spacing)",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. PROFILE CARD AVATAR SLOT
 * Preserves media fidelity without applying distorting optical parent filters.
 * ----------------------------------------------------------------------- */

export interface ProfileCardAvatarProps extends React.ComponentProps<"div"> {}

export function ProfileCardAvatar({ className, ...props }: ProfileCardAvatarProps) {
  return (
    <div
      data-slot="profile-card-avatar"
      className={cn("relative shrink-0 select-none", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. PROFILE CARD IDENTITY SECTION
 * Section grouping the display name, optional handle, and professional role.
 * ----------------------------------------------------------------------- */

export interface ProfileCardIdentityProps extends React.ComponentProps<"div"> {}

export function ProfileCardIdentity({
  className,
  ...props
}: ProfileCardIdentityProps) {
  return (
    <div
      data-slot="profile-card-identity"
      className={cn(
        "flex flex-col gap-0.5 px-(--card-spacing) min-w-0 w-full",
        "group-data-[layout=horizontal]/profile-card:w-auto group-data-[layout=horizontal]/profile-card:px-0 group-data-[layout=horizontal]/profile-card:flex-1",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. PROFILE CARD NAME
 * The dominant identity text. Polymorphic heading support.
 * ----------------------------------------------------------------------- */

export interface ProfileCardNameProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

export function ProfileCardName({
  className,
  asChild = false,
  as = "h3",
  ...props
}: ProfileCardNameProps) {
  const Comp = as as any;

  return (
    <Comp
      data-slot="profile-card-name"
      className={cn(
        "font-semibold text-base sm:text-lg text-foreground tracking-tight truncate leading-snug",
        "group-data-[size=sm]/card:text-sm sm:group-data-[size=sm]/card:text-base",
        "group-data-[size=lg]/card:text-lg sm:group-data-[size=lg]/card:text-xl",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. PROFILE CARD HANDLE
 * Optional handle or username (e.g. "@eswar").
 * ----------------------------------------------------------------------- */

export interface ProfileCardHandleProps extends React.ComponentProps<"span"> {}

export function ProfileCardHandle({
  className,
  ...props
}: ProfileCardHandleProps) {
  return (
    <span
      data-slot="profile-card-handle"
      className={cn("text-xs text-muted-foreground font-mono truncate", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 7. PROFILE CARD ROLE
 * Professional role or organizational title (e.g. "Staff Systems Engineer").
 * ----------------------------------------------------------------------- */

export interface ProfileCardRoleProps extends React.ComponentProps<"div"> {}

export function ProfileCardRole({ className, ...props }: ProfileCardRoleProps) {
  return (
    <div
      data-slot="profile-card-role"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground font-medium truncate leading-normal",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 8. PROFILE CARD STATUS
 * Accessible status indicator with textual context and semantic color.
 * ----------------------------------------------------------------------- */

export interface ProfileCardStatusProps extends React.ComponentProps<"div"> {
  status?: ProfileCardStatusType;
}

export function ProfileCardStatus({
  status = "online",
  className,
  children,
  ...props
}: ProfileCardStatusProps) {
  const statusLabels: Record<ProfileCardStatusType, string> = {
    online: "Online",
    away: "Away",
    busy: "Busy",
    offline: "Offline",
  };

  const statusColors: Record<ProfileCardStatusType, string> = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    busy: "bg-rose-500",
    offline: "bg-muted-foreground/40",
  };

  return (
    <div
      data-slot="profile-card-status"
      data-status={status}
      className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium", className)}
      {...props}
    >
      <span
        className={cn("size-2 rounded-full shrink-0 ring-1 ring-background", statusColors[status])}
        aria-hidden="true"
      />
      <span>{children ?? statusLabels[status]}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 9. PROFILE CARD BIO
 * Short 1-2 line summary context.
 * ----------------------------------------------------------------------- */

export interface ProfileCardBioProps extends React.ComponentProps<"p"> {}

export function ProfileCardBio({ className, ...props }: ProfileCardBioProps) {
  return (
    <p
      data-slot="profile-card-bio"
      className={cn(
        "px-(--card-spacing) text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2",
        "group-data-[layout=horizontal]/profile-card:px-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 10. PROFILE CARD METADATA LIST
 * Compact supporting context row (e.g. location, team, joined).
 * ----------------------------------------------------------------------- */

export interface ProfileCardMetadataProps extends React.ComponentProps<"div"> {}

export function ProfileCardMetadata({
  className,
  ...props
}: ProfileCardMetadataProps) {
  return (
    <div
      data-slot="profile-card-metadata"
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1.5 px-(--card-spacing) text-xs text-muted-foreground leading-normal",
        "group-data-[layout=horizontal]/profile-card:px-0",
        className
      )}
      {...props}
    />
  );
}

export interface ProfileCardMetadataItemProps extends React.ComponentProps<"div"> {}

export function ProfileCardMetadataItem({
  className,
  ...props
}: ProfileCardMetadataItemProps) {
  return (
    <div
      data-slot="profile-card-metadata-item"
      className={cn("inline-flex items-center gap-1.5 truncate", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 11. PROFILE CARD ACTIONS
 * Action slot for primary, message, or overflow buttons.
 * ----------------------------------------------------------------------- */

export interface ProfileCardActionsProps extends React.ComponentProps<"div"> {}

export function ProfileCardActions({
  className,
  ...props
}: ProfileCardActionsProps) {
  return (
    <div
      data-slot="profile-card-actions"
      className={cn(
        "flex items-center gap-2 px-(--card-spacing) pt-1 min-w-0 w-full",
        "group-data-[layout=horizontal]/profile-card:w-auto group-data-[layout=horizontal]/profile-card:px-0 group-data-[layout=horizontal]/profile-card:pr-(--card-spacing) group-data-[layout=horizontal]/profile-card:pt-0 shrink-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 12. PROFILE CARD FOOTER
 * Bottom container organizing metadata or auxiliary details.
 * ----------------------------------------------------------------------- */

export interface ProfileCardFooterProps extends React.ComponentProps<"div"> {}

export function ProfileCardFooter({
  className,
  ...props
}: ProfileCardFooterProps) {
  return (
    <div
      data-slot="profile-card-footer"
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 px-(--card-spacing) pt-2 border-t border-border/40 text-xs text-muted-foreground min-w-0 leading-normal",
        className
      )}
      {...props}
    />
  );
}
