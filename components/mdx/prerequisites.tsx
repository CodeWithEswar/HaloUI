"use client";

import * as React from "react";
import {
  SiBun,
  SiNextdotjs,
  SiNpm,
  SiPnpm,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiYarn,
} from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

const CORE_PREREQUISITES = [
  { name: "React 19+", Icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Tailwind CSS v4", Icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "shadcn/ui", Icon: null, color: "" },
];

const FRAMEWORKS = [
  { name: "Next.js", Icon: SiNextdotjs, color: "text-foreground" },
  { name: "Vite", Icon: SiVite, color: "text-[#646CFF]" },
];

const PACKAGE_MANAGERS = [
  { name: "pnpm", Icon: SiPnpm, color: "text-[#F69220]" },
  { name: "npm", Icon: SiNpm, color: "text-[#CB3837]" },
  { name: "Yarn", Icon: SiYarn, color: "text-[#2C8EBB]" },
  { name: "Bun", Icon: SiBun, color: "text-[#C88E59] dark:text-[#FBF0DF]" },
];

export function Prerequisites() {
  return (
    <div className="my-6 space-y-4 rounded-xl border border-border bg-muted/20 p-4">
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Core requirements
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CORE_PREREQUISITES.map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {item.Icon ? (
                <item.Icon size={13} className={cn("shrink-0", item.color)} aria-hidden="true" />
              ) : (
                <span className="flex size-3.5 items-center justify-center rounded-sm bg-foreground text-[9px] font-mono font-bold text-background" aria-hidden="true">
                  s
                </span>
              )}
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 pt-1 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Verified frameworks
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {FRAMEWORKS.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <item.Icon size={13} className={cn("shrink-0", item.color)} aria-hidden="true" />
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Supported package managers
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PACKAGE_MANAGERS.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <item.Icon size={13} className={cn("shrink-0", item.color)} aria-hidden="true" />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
