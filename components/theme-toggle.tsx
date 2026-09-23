"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun01Icon, Moon02Icon, ComputerIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-md border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 animate-pulse" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Select theme"
        className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm hover:border-black/20 dark:hover:border-white/30 text-stone-700 dark:text-stone-300 transition-all halo-tactile-press cursor-pointer"
      >
        <span className="dark:hidden flex items-center justify-center">
          <HaloIcon icon={Sun01Icon} size={18} />
        </span>
        <span className="hidden dark:flex items-center justify-center">
          <HaloIcon icon={Moon02Icon} size={18} />
        </span>
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-white/90 dark:bg-[#14161a]/90 backdrop-blur-xl border-black/10 dark:border-white/10">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer text-xs font-medium"
        >
          <HaloIcon icon={Sun01Icon} size={15} />
          <span>Light</span>
          {theme === "light" && <span className="ml-auto text-[10px] opacity-60">●</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer text-xs font-medium"
        >
          <HaloIcon icon={Moon02Icon} size={15} />
          <span>Dark</span>
          {theme === "dark" && <span className="ml-auto text-[10px] opacity-60">●</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer text-xs font-medium"
        >
          <HaloIcon icon={ComputerIcon} size={15} />
          <span>System</span>
          {theme === "system" && <span className="ml-auto text-[10px] opacity-60">●</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
