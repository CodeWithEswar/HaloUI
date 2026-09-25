"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-3 data-horizontal:flex-col data-vertical:flex-row",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center text-muted-foreground transition-colors group-data-horizontal/tabs:h-10 group-data-horizontal/tabs:w-fit group-data-horizontal/tabs:max-w-full group-data-horizontal/tabs:overflow-x-auto group-data-horizontal/tabs:scrollbar-none group-data-vertical/tabs:h-fit group-data-vertical/tabs:w-48 group-data-vertical/tabs:flex-col group-data-vertical/tabs:items-stretch",
  {
    variants: {
      variant: {
        // Authentic HaloUI 10-Layer Recessed Optical Channel
        default: [
          "rounded-xl p-1 isolate select-none",
          "bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl backdrop-saturate-180",
          "border border-black/[0.08] dark:border-white/[0.12]",
          "shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.08),inset_0_0_1px_0_rgba(0,0,0,0.04),0_1px_1px_0_rgba(255,255,255,0.7)]",
          "dark:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.5),inset_0_0_1px_0_rgba(0,0,0,0.8),0_1px_1px_0_rgba(255,255,255,0.06)]",
        ],
        line:
          "gap-2 bg-transparent p-0 rounded-none border-b border-border/60 group-data-vertical/tabs:border-b-0 group-data-vertical/tabs:border-r group-data-vertical/tabs:border-border/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap text-muted-foreground transition-all duration-150 outline-none select-none shrink-0 cursor-pointer",
        "hover:text-foreground hover:bg-white/40 dark:hover:bg-white/[0.06]",
        // Independent Double-Contrast Focus Ring (Focus is NOT Selected)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color,hsl(var(--ring)))] focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:z-20",
        "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
        "group-data-vertical/tabs:justify-start group-data-vertical/tabs:w-full",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "active:scale-[0.98] motion-reduce:active:scale-100",

        // Selected state: Authentic HaloUI Physical Liquid Glass Lens
        "group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:font-semibold",
        "group-data-[variant=default]/tabs-list:data-active:bg-white/90 dark:group-data-[variant=default]/tabs-list:data-active:bg-white/[0.14]",
        "group-data-[variant=default]/tabs-list:data-active:backdrop-blur-xl group-data-[variant=default]/tabs-list:data-active:backdrop-saturate-180",
        "group-data-[variant=default]/tabs-list:data-active:border group-data-[variant=default]/tabs-list:data-active:border-black/[0.08] dark:group-data-[variant=default]/tabs-list:data-active:border-white/[0.20]",
        "group-data-[variant=default]/tabs-list:data-active:shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(0,0,0,0.05),0_2px_8px_-1px_rgba(0,0,0,0.12),0_1px_2px_0_rgba(0,0,0,0.06)]",
        "dark:group-data-[variant=default]/tabs-list:data-active:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.4),0_4px_14px_-2px_rgba(0,0,0,0.65),0_1px_2px_0_rgba(0,0,0,0.3)]",

        // 135° Specular light reflection on active tab lens
        "group-data-[variant=default]/tabs-list:before:content-[''] group-data-[variant=default]/tabs-list:before:absolute group-data-[variant=default]/tabs-list:before:inset-0 group-data-[variant=default]/tabs-list:before:rounded-[inherit] group-data-[variant=default]/tabs-list:before:pointer-events-none group-data-[variant=default]/tabs-list:before:opacity-0 group-data-[variant=default]/tabs-list:data-active:before:opacity-100 group-data-[variant=default]/tabs-list:before:transition-opacity group-data-[variant=default]/tabs-list:before:duration-150",
        "group-data-[variant=default]/tabs-list:before:bg-gradient-to-br group-data-[variant=default]/tabs-list:before:from-white/60 group-data-[variant=default]/tabs-list:before:via-white/10 group-data-[variant=default]/tabs-list:before:to-transparent dark:group-data-[variant=default]/tabs-list:before:from-white/25 dark:group-data-[variant=default]/tabs-list:before:via-transparent",

        // Line variant active indicator
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-3 group-data-[variant=line]/tabs-list:py-2 group-data-[variant=line]/tabs-list:data-active:text-foreground group-data-[variant=line]/tabs-list:data-active:font-semibold group-data-[variant=line]/tabs-list:hover:bg-transparent",
        "group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:bg-primary group-data-[variant=line]/tabs-list:after:opacity-0 group-data-[variant=line]/tabs-list:after:transition-opacity",
        "group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:after:inset-x-0 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:after:-bottom-[1px] group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:after:h-0.5 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:after:rounded-full",
        "group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:inset-y-0 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:-right-[1px] group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:w-0.5 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:after:rounded-full",
        "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
