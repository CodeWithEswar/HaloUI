"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

const sizeMap: Record<string, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

export interface HaloIconProps extends Omit<React.SVGProps<SVGSVGElement>, "color" | "strokeWidth" | "size"> {
  icon: IconSvgElement;
  size?: IconSize;
  strokeWidth?: number;
  className?: string;
  color?: string;
}

/**
 * Standardized HaloUI Icon wrapper using Hugeicons.
 * Guarantees currentColor inheritance, consistent optical stroke width, and crisp rendering.
 */
export function HaloIcon({
  icon,
  size = "md",
  strokeWidth = 1.5,
  className,
  color = "currentColor",
  ...props
}: HaloIconProps) {
  const pixelSize = typeof size === "number" ? size : sizeMap[size] ?? 18;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none text-current transition-colors",
        className
      )}
      style={{ width: pixelSize, height: pixelSize }}
      aria-hidden="true"
    >
      <HugeiconsIcon
        icon={icon}
        size={pixelSize}
        strokeWidth={strokeWidth}
        color={color}
        {...props}
      />
    </span>
  );
}
