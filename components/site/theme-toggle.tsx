"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun01Icon, Moon02Icon, ComputerIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function SiteThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-8 rounded-md bg-muted/30" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "text-muted-foreground hover:text-foreground cursor-pointer"
        )}
      >
        <span className="dark:hidden flex items-center justify-center">
          <HaloIcon icon={Sun01Icon} size={16} />
        </span>
        <span className="hidden dark:flex items-center justify-center">
          <HaloIcon icon={Moon02Icon} size={16} />
        </span>
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer text-xs"
        >
          <HaloIcon icon={Sun01Icon} size={14} />
          <span>Light</span>
          {theme === "light" && <span className="ml-auto text-[10px] text-muted-foreground">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer text-xs"
        >
          <HaloIcon icon={Moon02Icon} size={14} />
          <span>Dark</span>
          {theme === "dark" && <span className="ml-auto text-[10px] text-muted-foreground">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer text-xs"
        >
          <HaloIcon icon={ComputerIcon} size={14} />
          <span>System</span>
          {theme === "system" && <span className="ml-auto text-[10px] text-muted-foreground">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
