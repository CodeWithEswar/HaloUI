import * as React from "react";
import { cn } from "@/lib/utils";

export function MdxHeading({
  level,
  id,
  className,
  children,
  tabIndex,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { level: 1 | 2 | 3 }) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <Tag
      id={id}
      tabIndex={tabIndex ?? (level > 1 ? -1 : undefined)}
      className={cn(
        "relative font-semibold tracking-tight text-foreground outline-none",
        level === 1 && "mt-0 text-3xl sm:text-4xl",
        level === 2 && "mb-4 mt-12 border-t border-border pt-10 text-2xl first:border-0 first:pt-0",
        level === 3 && "mb-3 mt-8 text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
