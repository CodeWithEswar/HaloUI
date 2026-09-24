"use client";

import * as React from "react";
import { SiBun, SiNpm, SiPnpm, SiYarn } from "@icons-pack/react-simple-icons";
import { CodeBlockClient } from "@/components/code/code-block-client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const managers = {
  pnpm: {
    label: "pnpm",
    Icon: SiPnpm,
    iconClassName: "text-[#F69220]",
    add: (target: string) => `pnpm dlx shadcn@latest add ${target}`,
    init: () => "pnpm dlx shadcn@latest init",
    createNext: () => "pnpm create next-app@latest",
    createVite: () => "pnpm create vite",
    dev: () => "pnpm dev",
  },
  npm: {
    label: "npm",
    Icon: SiNpm,
    iconClassName: "text-[#CB3837]",
    add: (target: string) => `npx shadcn@latest add ${target}`,
    init: () => "npx shadcn@latest init",
    createNext: () => "npx create-next-app@latest",
    createVite: () => "npm create vite@latest",
    dev: () => "npm run dev",
  },
  yarn: {
    label: "Yarn",
    Icon: SiYarn,
    iconClassName: "text-[#2C8EBB]",
    add: (target: string) => `yarn dlx shadcn@latest add ${target}`,
    init: () => "yarn dlx shadcn@latest init",
    createNext: () => "yarn create next-app",
    createVite: () => "yarn create vite",
    dev: () => "yarn dev",
  },
  bun: {
    label: "Bun",
    Icon: SiBun,
    iconClassName: "text-[#C88E59] dark:text-[#FBF0DF]",
    add: (target: string) => `bunx --bun shadcn@latest add ${target}`,
    init: () => "bunx --bun shadcn@latest init",
    createNext: () => "bun create next-app",
    createVite: () => "bun create vite",
    dev: () => "bun dev",
  },
};

type InstallCommandProps = {
  registry?: string;
  action?: "add" | "init" | "create-next" | "create-vite" | "dev";
  commands?: Partial<Record<keyof typeof managers, string>>;
};

export function InstallCommand({
  registry = "button",
  action = "add",
  commands,
}: InstallCommandProps) {
  const [manager, setManager] = React.useState<keyof typeof managers>("pnpm");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("haloui_pkg_manager") as keyof typeof managers | null;
      if (saved && managers[saved]) {
        setManager(saved);
      }
    } catch {}
  }, []);

  const handleManagerChange = (value: string) => {
    const next = value as keyof typeof managers;
    setManager(next);
    try {
      localStorage.setItem("haloui_pkg_manager", next);
    } catch {}
  };

  const getCommand = () => {
    if (commands && commands[manager]) {
      return commands[manager]!;
    }
    const selected = managers[manager];
    if (action === "init") return selected.init();
    if (action === "create-next") return selected.createNext();
    if (action === "create-vite") return selected.createVite();
    if (action === "dev") return selected.dev();

    const target =
      registry.startsWith("http") || registry.startsWith("@")
        ? registry
        : registry.endsWith(".json")
          ? `https://haloui.dev/r/${registry}`
          : `https://haloui.dev/r/${registry}.json`;
    return selected.add(target);
  };

  const command = getCommand();

  return (
    <div className="my-6">
      <Tabs value={manager} onValueChange={handleManagerChange}>
        <TabsList
          aria-label="Package manager"
          className="h-9 max-w-full overflow-x-auto overflow-y-hidden no-scrollbar"
        >
          {Object.entries(managers).map(([value, item]) => (
            <TabsTrigger key={value} value={value} className="gap-1.5 px-2.5 text-xs font-medium">
              <item.Icon size={14} className={cn("shrink-0", item.iconClassName)} aria-hidden="true" />
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <CodeBlockClient code={command} language="bash" terminal />
    </div>
  );
}
