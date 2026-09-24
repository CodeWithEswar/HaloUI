import { highlightCode } from "@/lib/code/highlight";
import { InstallCommandClient, type PackageManager } from "@/components/mdx/install-command-client";

const managerCommandGenerators = {
  pnpm: {
    add: (target: string) => `pnpm dlx shadcn@latest add ${target}`,
    init: () => "pnpm dlx shadcn@latest init",
    createNext: () => "pnpm create next-app@latest",
    createVite: () => "pnpm create vite",
    dev: () => "pnpm dev",
  },
  npm: {
    add: (target: string) => `npx shadcn@latest add ${target}`,
    init: () => "npx shadcn@latest init",
    createNext: () => "npx create-next-app@latest",
    createVite: () => "npm create vite@latest",
    dev: () => "npm run dev",
  },
  yarn: {
    add: (target: string) => `yarn dlx shadcn@latest add ${target}`,
    init: () => "yarn dlx shadcn@latest init",
    createNext: () => "yarn create next-app",
    createVite: () => "yarn create vite",
    dev: () => "yarn dev",
  },
  bun: {
    add: (target: string) => `bunx --bun shadcn@latest add ${target}`,
    init: () => "bunx --bun shadcn@latest init",
    createNext: () => "bun create next-app",
    createVite: () => "bun create vite",
    dev: () => "bun dev",
  },
} as const;

export type InstallCommandProps = {
  registry?: string;
  action?: "add" | "init" | "create-next" | "create-vite" | "dev";
  commands?: Partial<Record<PackageManager, string>>;
  className?: string;
};

export async function InstallCommand({
  registry = "button",
  action = "add",
  commands: customCommands,
  className,
}: InstallCommandProps) {
  const getCommand = (manager: PackageManager) => {
    if (customCommands && customCommands[manager]) {
      return customCommands[manager]!;
    }
    const gen = managerCommandGenerators[manager];
    if (action === "init") return gen.init();
    if (action === "create-next") return gen.createNext();
    if (action === "create-vite") return gen.createVite();
    if (action === "dev") return gen.dev();

    const target =
      registry.startsWith("http") || registry.startsWith("@")
        ? registry
        : registry.endsWith(".json")
          ? `https://haloui.dev/r/${registry}`
          : `https://haloui.dev/r/${registry}.json`;
    return gen.add(target);
  };

  const pnpmCommand = getCommand("pnpm");
  const npmCommand = getCommand("npm");
  const yarnCommand = getCommand("yarn");
  const bunCommand = getCommand("bun");

  const [pnpmHtml, npmHtml, yarnHtml, bunHtml] = await Promise.all([
    highlightCode(pnpmCommand, "bash"),
    highlightCode(npmCommand, "bash"),
    highlightCode(yarnCommand, "bash"),
    highlightCode(bunCommand, "bash"),
  ]);

  return (
    <InstallCommandClient
      className={className}
      commands={{
        pnpm: pnpmCommand,
        npm: npmCommand,
        yarn: yarnCommand,
        bun: bunCommand,
      }}
      htmlMap={{
        pnpm: pnpmHtml,
        npm: npmHtml,
        yarn: yarnHtml,
        bun: bunHtml,
      }}
    />
  );
}
