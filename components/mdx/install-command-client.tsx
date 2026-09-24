"use client";

import * as React from "react";
import { SiBun, SiNpm, SiPnpm, SiYarn } from "@icons-pack/react-simple-icons";
import { CodeBlockClient } from "@/components/code/code-block-client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export const packageManagers = {
  pnpm: {
    label: "pnpm",
    Icon: SiPnpm,
    iconClassName: "text-[#F69220]",
  },
  npm: {
    label: "npm",
    Icon: SiNpm,
    iconClassName: "text-[#CB3837]",
  },
  yarn: {
    label: "Yarn",
    Icon: SiYarn,
    iconClassName: "text-[#2C8EBB]",
  },
  bun: {
    label: "Bun",
    Icon: SiBun,
    iconClassName: "text-[#C88E59] dark:text-[#FBF0DF]",
  },
} as const;

export type InstallCommandClientProps = {
  commands: Record<PackageManager, string>;
  htmlMap: Record<PackageManager, string>;
  className?: string;
};

export function InstallCommandClient({
  commands,
  htmlMap,
  className,
}: InstallCommandClientProps) {
  const [manager, setManager] = React.useState<PackageManager>("pnpm");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("haloui_pkg_manager") as PackageManager | null;
      if (saved && packageManagers[saved]) {
        setManager(saved);
      }
    } catch {}
  }, []);

  const handleManagerChange = (value: string) => {
    const next = value as PackageManager;
    setManager(next);
    try {
      localStorage.setItem("haloui_pkg_manager", next);
    } catch {}
  };

  const activeCode = commands[manager] ?? commands.pnpm;
  const activeHtml = htmlMap[manager] ?? htmlMap.pnpm;

  return (
    <div className={cn("my-6", className)}>
      <Tabs value={manager} onValueChange={handleManagerChange}>
        <TabsList
          aria-label="Package manager"
          className="h-9 max-w-full overflow-x-auto overflow-y-hidden no-scrollbar"
        >
          {Object.entries(packageManagers).map(([key, item]) => {
            const value = key as PackageManager;
            return (
              <TabsTrigger key={value} value={value} className="gap-1.5 px-2.5 text-xs font-medium">
                <item.Icon size={14} className={cn("shrink-0", item.iconClassName)} aria-hidden="true" />
                {item.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <CodeBlockClient
        code={activeCode}
        html={activeHtml}
        language="bash"
        terminal
      />
    </div>
  );
}
