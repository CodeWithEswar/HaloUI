import * as React from "react";
import { HaloUIMark, type HaloUIMarkProps } from "@/components/brand/haloui-mark";

const logoSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export type AppLogoProps = Omit<HaloUIMarkProps, "width" | "height"> & {
  size?: keyof typeof logoSizes | number;
  animated?: boolean;
  loop?: boolean;
};

/** The shared static, entrance, and loading presentation of the HaloUI mark. */
export function AppLogo({
  size = "md",
  animated = false,
  loop = false,
  style,
  ...props
}: AppLogoProps) {
  const resolvedSize = typeof size === "number" ? size : logoSizes[size];
  const motion = loop ? "loading" : animated ? "enter" : "static";

  return (
    <HaloUIMark
      data-motion={motion}
      width={resolvedSize}
      height={resolvedSize}
      style={{ width: resolvedSize, height: resolvedSize, ...style }}
      {...props}
    />
  );
}

