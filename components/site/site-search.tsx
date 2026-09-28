"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { docsNavItems } from "@/lib/docs/navigation";

const RAW_SEARCH_ITEMS = [
  ...docsNavItems.map((item) => ({
    group: item.href.startsWith("/components") ? "Components" : "Documentation",
    title: item.title,
    href: item.href,
  })),
  { group: "Showcase", title: "Halo Control Room", href: "/showcase" },
  { group: "Registry", title: "Raw Button JSON", href: "/r/button.json" },
];

// Deduplicate items by href to ensure unique keys in CommandItem groups
const SEARCH_ITEMS = Array.from(
  new Map(RAW_SEARCH_ITEMS.map((item) => [item.href, item])).values()
);

export function SiteSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    []
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="relative h-8 min-h-0 w-8 justify-center rounded-md border-border/60 bg-muted/40 p-0 text-xs font-normal text-muted-foreground shadow-none hover:bg-muted/70 hover:text-foreground sm:w-44 sm:justify-start sm:px-2.5 sm:pr-12 md:w-52 lg:w-64"
      >
        <HaloIcon icon={Search01Icon} size={14} className="shrink-0 text-muted-foreground/70 sm:mr-2" />
        <span className="hidden lg:inline-flex truncate">Search documentation...</span>
        <span className="hidden sm:inline-flex lg:hidden truncate">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-0.5 rounded border border-border/60 bg-muted/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            {SEARCH_ITEMS.filter((i) => i.group === "Components").map((item) => (
              <CommandItem
                key={`components-${item.href}`}
                value={item.title}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Documentation">
            {SEARCH_ITEMS.filter((i) => i.group === "Documentation").map((item) => (
              <CommandItem
                key={`docs-${item.href}`}
                value={item.title}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Showcase">
            {SEARCH_ITEMS.filter((i) => i.group === "Showcase").map((item) => (
              <CommandItem
                key={`showcase-${item.href}`}
                value={item.title}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
