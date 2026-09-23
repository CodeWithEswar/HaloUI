"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun01Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-md border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 animate-pulse" />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm hover:border-black/20 dark:hover:border-white/30 text-stone-700 dark:text-stone-300 transition-all halo-tactile-press cursor-pointer"
    >
      <span className="dark:hidden flex items-center justify-center">
        <HaloIcon icon={Sun01Icon} size={18} />
      </span>
      <span className="hidden dark:flex items-center justify-center">
        <HaloIcon icon={Moon02Icon} size={18} />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
