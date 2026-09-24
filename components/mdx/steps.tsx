import * as React from "react";
import { cn } from "@/lib/utils";

export function Steps({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "my-7 ml-4 border-l border-border pl-8 [counter-reset:step] [&>h3]:relative [&>h3]:mt-8 [&>h3]:before:absolute [&>h3]:before:-left-[2.8rem] [&>h3]:before:flex [&>h3]:before:size-6 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:bg-background [&>h3]:before:text-xs [&>h3]:before:font-medium [&>h3]:before:[content:counter(step)] [&>h3]:before:[counter-increment:step]",
        className,
      )}
      {...props}
    />
  );
}
