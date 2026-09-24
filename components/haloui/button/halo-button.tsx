"use client";

import * as React from "react";
import type { IconSvgElement } from "@hugeicons/react";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button, buttonVariants, type ButtonProps, type ButtonVariant, type ButtonSize } from "./button";

export { buttonVariants as haloButtonVariants, Button };

export type HaloButtonVariant =
  | "primary"
  | "neutral"
  | "subtle"
  | "ghost"
  | "destructive"
  | "rich"
  | ButtonVariant;

export type HaloButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "icon"
  | "icon-sm"
  | "icon-lg"
  | ButtonSize;

export interface HaloButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  variant?: HaloButtonVariant;
  size?: HaloButtonSize;
  intensity?: "subtle" | "balanced" | "rich";
  magnetic?: boolean;
  loading?: boolean;
  leftIcon?: IconSvgElement;
  rightIcon?: IconSvgElement;
  specular?: boolean;
  refraction?: boolean;
}

const VARIANT_MAP: Record<string, ButtonVariant> = {
  primary: "default",
  neutral: "secondary",
  subtle: "outline",
  rich: "default",
  ghost: "ghost",
  destructive: "destructive",
  default: "default",
  secondary: "secondary",
  outline: "outline",
  link: "link",
};

const SIZE_MAP: Record<string, ButtonSize> = {
  sm: "sm",
  md: "default",
  default: "default",
  lg: "lg",
  xl: "lg",
  icon: "icon",
  "icon-sm": "icon-sm",
  "icon-lg": "icon-lg",
  "icon-xs": "icon-xs",
  xs: "xs",
};

/**
 * HaloButton — Backward-compatibility alias for canonical Button
 */
export const HaloButton = React.forwardRef<HTMLButtonElement, HaloButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      leftIcon,
      rightIcon,
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = VARIANT_MAP[variant as string] ?? "default";
    const resolvedSize = SIZE_MAP[size as string] ?? "default";

    return (
      <Button
        ref={ref}
        variant={resolvedVariant}
        size={resolvedSize}
        disabled={disabled || loading}
        {...props}
      >
        {leftIcon && <HaloIcon icon={leftIcon} size={resolvedSize === "sm" ? 14 : 16} />}
        {children}
        {rightIcon && <HaloIcon icon={rightIcon} size={resolvedSize === "sm" ? 14 : 16} />}
      </Button>
    );
  }
);

HaloButton.displayName = "HaloButton";
