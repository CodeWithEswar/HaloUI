import * as React from "react";
import { AppLogo, type AppLogoProps } from "@/components/brand/app-logo";
import { cn } from "@/lib/utils";

type HaloUIWordmarkProps = React.HTMLAttributes<HTMLSpanElement> & {
  markSize?: AppLogoProps["size"];
  markClassName?: string;
};

export function HaloUIWordmark({
  markSize = "md",
  markClassName,
  className,
  ...props
}: HaloUIWordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} {...props}>
      <AppLogo size={markSize} className={markClassName} />
      <span className="font-semibold tracking-[-0.025em]">HaloUI</span>
    </span>
  );
}

