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
        default:
          "rounded-xl p-1 border border-border/60 bg-muted/60 dark:bg-muted/30 backdrop-blur-xs shadow-xs",
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
        "relative inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap text-muted-foreground transition-all duration-150 outline-none select-none",
        "hover:text-foreground hover:bg-foreground/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
        "group-data-vertical/tabs:justify-start group-data-vertical/tabs:w-full",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Default pill variant active state
        "group-data-[variant=default]/tabs-list:data-active:bg-background group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-xs group-data-[variant=default]/tabs-list:data-active:border group-data-[variant=default]/tabs-list:data-active:border-border/60 dark:group-data-[variant=default]/tabs-list:data-active:bg-muted/80 dark:group-data-[variant=default]/tabs-list:data-active:border-border/80",
        // Line variant active indicator
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-3 group-data-[variant=line]/tabs-list:py-2 group-data-[variant=line]/tabs-list:data-active:text-foreground group-data-[variant=line]/tabs-list:data-active:font-semibold",
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
