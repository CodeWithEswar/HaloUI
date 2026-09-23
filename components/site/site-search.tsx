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

const SEARCH_ITEMS = [
  { group: "Components", title: "Button", href: "/components/button" },
  { group: "Components", title: "All Components", href: "/components" },
  { group: "Documentation", title: "Installation", href: "/docs/installation" },
  { group: "Documentation", title: "Liquid Material Engine", href: "/docs/liquid-material" },
  { group: "Documentation", title: "Registry Architecture", href: "/docs/registry" },
  { group: "Showcase", title: "Halo Control Room", href: "/showcase" },
  { group: "Registry", title: "Raw Button JSON", href: "/r/button.json" },
];

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
        onClick={() => setOpen(true)}
        className="relative h-8 w-full justify-start rounded-md bg-muted/40 text-xs font-normal text-muted-foreground shadow-none sm:pr-12 md:w-48 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
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
                key={item.href}
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
                key={item.href}
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
                key={item.href}
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
