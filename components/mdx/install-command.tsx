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
    command: (target: string) => `pnpm dlx shadcn@latest add ${target}`,
  },
  npm: {
    label: "npm",
    Icon: SiNpm,
    iconClassName: "text-[#CB3837]",
    command: (target: string) => `npx shadcn@latest add ${target}`,
  },
  yarn: {
    label: "Yarn",
    Icon: SiYarn,
    iconClassName: "text-[#2C8EBB]",
    command: (target: string) => `yarn dlx shadcn@latest add ${target}`,
  },
  bun: {
    label: "Bun",
    Icon: SiBun,
    iconClassName: "text-[#C88E59] dark:text-[#FBF0DF]",
    command: (target: string) => `bunx --bun shadcn@latest add ${target}`,
  },
};

export function InstallCommand({ registry }: { registry: string }) {
  const [manager, setManager] = React.useState<keyof typeof managers>("pnpm");
  const target = registry.startsWith("http") ? registry : `https://haloui.dev/r/${registry}.json`;
  const selected = managers[manager];
  const command = selected.command(target);

  return (
    <div className="my-6">
      <Tabs value={manager} onValueChange={(value) => setManager(value as keyof typeof managers)}>
        <TabsList aria-label="Package manager" className="max-w-full overflow-x-auto">
          {Object.entries(managers).map(([value, item]) => (
            <TabsTrigger key={value} value={value} className="gap-1.5 px-2.5">
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
