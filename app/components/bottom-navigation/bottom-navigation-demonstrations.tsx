"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationItem,
} from "@/components/ui/bottom-navigation";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Search01Icon,
  Bookmark01Icon,
  UserIcon,
  Notification01Icon,
  ShoppingBag01Icon,
  Message01Icon,
  Settings01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function BottomNavigationDemonstrations() {
  const [activeItem, setActiveItem] = React.useState<string>("Home");

  return (
    <div className="space-y-12">
      {/* 1. Real Semantic Links & Current State */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          1. Semantic Real Links with Optical Indicator
        </h3>
        <p className="text-sm text-muted-foreground">
          Bottom Navigation items are native anchor links (<code className="font-mono text-xs">&lt;a&gt;</code>) representing top-level application destinations. The current route receives <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>, a prominent accent pill indicator at the top edge, and bolded label typography.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-background shadow-xs overflow-hidden">
            <div className="p-4 bg-muted/10 text-center">
              <span className="text-xs text-muted-foreground">Active Route: </span>
              <strong className="text-sm text-foreground">{activeItem}</strong>
            </div>
            <BottomNavigation intensity="balanced">
              <BottomNavigationItem
                href="#home"
                label="Home"
                icon={Home01Icon}
                isActive={activeItem === "Home"}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem("Home");
                }}
              />
              <BottomNavigationItem
                href="#shop"
                label="Store"
                icon={ShoppingBag01Icon}
                isActive={activeItem === "Store"}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem("Store");
                }}
              />
              <BottomNavigationItem
                href="#messages"
                label="Chat"
                icon={Message01Icon}
                isActive={activeItem === "Chat"}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem("Chat");
                }}
              />
              <BottomNavigationItem
                href="#profile"
                label="Profile"
                icon={UserIcon}
                isActive={activeItem === "Profile"}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem("Profile");
                }}
              />
            </BottomNavigation>
          </div>
        </div>
      </section>

      {/* 2. Permanent QA State: Current vs Keyboard Focus */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          2. Permanent Independence: Current Route vs Keyboard Focus
        </h3>
        <p className="text-sm text-muted-foreground">
          <strong>Mandatory QA Requirement:</strong> When an active item receives keyboard focus via <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[11px] font-mono">Tab</kbd>, both the active indicator and Halo&apos;s optical focus ring (<code className="font-mono text-xs">var(--halo-focus-color)</code>) must remain distinctly visible without clashing.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-background shadow-xs overflow-hidden">
            <BottomNavigation intensity="balanced">
              <BottomNavigationItem
                href="#1"
                label="Home"
                icon={Home01Icon}
                isActive={true}
              />
              <BottomNavigationItem
                href="#2"
                label="Search"
                icon={Search01Icon}
              />
              <BottomNavigationItem
                href="#3"
                label="Saved"
                icon={Bookmark01Icon}
              />
              <BottomNavigationItem
                href="#4"
                label="Settings"
                icon={Settings01Icon}
              />
            </BottomNavigation>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Press Tab into the navigation bar above. Notice how the active Home destination retains its top accent indicator while exhibiting a high-contrast focus outline.
          </p>
        </div>
      </section>

      {/* 3. Notification Badges */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          3. Compact Notification Badges
        </h3>
        <p className="text-sm text-muted-foreground">
          Optional notification badges communicate unread activity (e.g. alerts or messages). Badges are positioned on the upper right quadrant of the icon and never interfere with the accessible name of the destination.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-background shadow-xs overflow-hidden">
            <BottomNavigation intensity="balanced">
              <BottomNavigationItem
                href="#home"
                label="Home"
                icon={Home01Icon}
              />
              <BottomNavigationItem
                href="#alerts"
                label="Alerts"
                icon={Notification01Icon}
                badge="5"
                isActive={true}
              />
              <BottomNavigationItem
                href="#chat"
                label="Messages"
                icon={Message01Icon}
                badge="99+"
              />
              <BottomNavigationItem
                href="#saved"
                label="Bookmarks"
                icon={Bookmark01Icon}
                badge="•"
              />
            </BottomNavigation>
          </div>
        </div>
      </section>

      {/* 4. Long Label Localization & Truncation Safety */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          4. Label Length &amp; Localization Safety
        </h3>
        <p className="text-sm text-muted-foreground">
          In internationalized interfaces, text labels can expand significantly. BottomNavigationLabel applies graceful truncation (<code className="font-mono text-xs">truncate max-w-[68px]</code>) preventing horizontal page blowouts while keeping accessible names completely intact for screen readers.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-background shadow-xs overflow-hidden">
            <BottomNavigation intensity="balanced">
              <BottomNavigationItem
                href="#start"
                label="Startseite"
                icon={Home01Icon}
                isActive={true}
              />
              <BottomNavigationItem
                href="#benachrichtigungen"
                label="Benachrichtigungen"
                icon={Notification01Icon}
              />
              <BottomNavigationItem
                href="#einstellungen"
                label="Einstellungen"
                icon={Settings01Icon}
              />
            </BottomNavigation>
          </div>
        </div>
      </section>
    </div>
  );
}
