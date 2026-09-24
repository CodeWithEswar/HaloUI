"use client";

import * as React from "react";
import {
  FavouriteIcon,
  HeartIcon,
  Bookmark02Icon,
  StarIcon,
  EyeIcon,
  Share01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  FavoriteButton,
  type FavoriteButtonVariant,
  type FavoriteButtonSize,
} from "@/components/ui/favorite-button";
import { cn } from "@/lib/utils";

/**
 * 1. Default Interactive Favorite Demonstration
 * Uncontrolled and controlled binary state toggling with semantic Rose active illumination.
 */
export function FavoriteButtonDefaultPreview() {
  const [favorited, setFavorited] = React.useState(false);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md shadow-sm">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Design Systems Digest</span>
          <span className="text-xs text-muted-foreground">Issue #42 · Architecture & Optics</span>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton
            favorited={favorited}
            onFavoritedChange={setFavorited}
            variant="default"
            size="default"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        State: <span className="font-mono text-foreground font-semibold">{favorited ? "Favorited (true)" : "Unfavorited (false)"}</span>
        {" · "}
        Accessible label: <span className="font-mono text-foreground">{favorited ? '"Remove from favorites"' : '"Add to favorites"'}</span>
      </p>
    </div>
  );
}

/**
 * 2. All Material Variants
 * Tests physical liquid glass, secondary, outline, and ghost variants in both rest and active states.
 */
export function FavoriteButtonVariantsPreview() {
  const variants: { key: FavoriteButtonVariant; label: string; desc: string }[] = [
    { key: "default", label: "Liquid Glass", desc: "10-layer physical optical refraction with specular highlight" },
    { key: "secondary", label: "Secondary", desc: "Frosted crystal body with soft boundary definition" },
    { key: "outline", label: "Outline", desc: "Recessed ambient boundary with defined hairline perimeter" },
    { key: "ghost", label: "Ghost", desc: "Zero rest opacity, resolving frosted glass on hover & active" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {variants.map((v) => (
        <div
          key={v.key}
          className="flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm"
        >
          <div className="flex flex-col pr-3">
            <span className="text-sm font-semibold text-foreground">{v.label}</span>
            <span className="text-xs text-muted-foreground">{v.desc}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <FavoriteButton variant={v.key} defaultPressed={false} aria-label={`Unfavorited ${v.label}`} />
            <FavoriteButton variant={v.key} defaultPressed={true} aria-label={`Favorited ${v.label}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 3. All Standard Sizes
 * Tests sm (32px), default (40px), and lg (48px) optical touch targets.
 */
export function FavoriteButtonSizesPreview() {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <FavoriteButton size="sm" defaultPressed={true} />
        <span className="text-xs font-mono text-muted-foreground">sm (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FavoriteButton size="default" defaultPressed={true} />
        <span className="text-xs font-mono text-muted-foreground">default (40px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FavoriteButton size="lg" defaultPressed={true} />
        <span className="text-xs font-mono text-muted-foreground">lg (48px)</span>
      </div>
    </div>
  );
}

/**
 * 4. Labeled vs Icon-Only Presentations
 * Shows how FavoriteButton gracefully adapts to inline textual labels or compact icon-only bars.
 */
export function FavoriteButtonLabeledPreview() {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Dynamic function render prop */}
        <FavoriteButton
          pressed={isSaved}
          onPressedChange={setIsSaved}
          variant="default"
          size="default"
        >
          {({ pressed }) => (pressed ? "Saved to Library" : "Save to Library")}
        </FavoriteButton>

        {/* Static labeled children */}
        <FavoriteButton variant="secondary" size="default">
          Favorite
        </FavoriteButton>

        {/* Outline labeled */}
        <FavoriteButton variant="outline" size="sm" defaultPressed={true}>
          Favorited
        </FavoriteButton>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Labeled variants preserve complete keyboard accessibility and double-contrast focus rings.
      </p>
    </div>
  );
}

/**
 * 5. Media Overlay & Product Card Context
 * Real-world usage in media cards, where ghost or liquid glass buttons float seamlessly over dynamic backgrounds.
 */
export function FavoriteButtonMediaCardPreview() {
  const [favoritedItem, setFavoritedItem] = React.useState(true);

  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl border border-border/80 bg-card overflow-hidden shadow-lg group">
      {/* Media Container with Liquid Glass Favorite Button Overlay */}
      <div className="relative aspect-4/3 w-full bg-linear-to-tr from-violet-600 via-indigo-500 to-pink-500 p-4 flex flex-col justify-between overflow-hidden">
        {/* Ambient background glow & glass highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md text-white border border-white/10 shadow-xs">
            <HaloIcon icon={SparklesIcon} size={12} className="text-amber-300" /> Featured
          </span>
          <FavoriteButton
            favorited={favoritedItem}
            onFavoritedChange={setFavoritedItem}
            variant="ghost"
            size="default"
            className="bg-black/35 backdrop-blur-md border border-white/20 text-white hover:bg-black/50"
            aria-label="Save Horizon Studio Artwork"
          />
        </div>

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-white/80">Digital Artifact</span>
          <h3 className="text-lg font-bold text-white drop-shadow-xs">Horizon Luminescence</h3>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Floor Price</p>
          <p className="text-sm font-semibold text-foreground">2.45 ETH</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
          >
            Details
          </button>
          <FavoriteButton
            variant="default"
            size="sm"
            defaultPressed={false}
            aria-label="Quick favorite"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Alternative Domain Icons
 * Demonstrating custom icons (e.g. HeartIcon, Bookmark02Icon, StarIcon) while preserving state contracts.
 */
export function FavoriteButtonCustomIconsPreview() {
  const [starFavorited, setStarFavorited] = React.useState(false);
  const [bookmarkFavorited, setBookmarkFavorited] = React.useState(true);
  const [heartFavorited, setHeartFavorited] = React.useState(false);

  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <FavoriteButton
          icon={StarIcon}
          favorited={starFavorited}
          onFavoritedChange={setStarFavorited}
          variant="default"
          size="default"
          aria-label="Star this repository"
        />
        <span className="text-xs text-muted-foreground">Star</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FavoriteButton
          icon={Bookmark02Icon}
          favorited={bookmarkFavorited}
          onFavoritedChange={setBookmarkFavorited}
          variant="secondary"
          size="default"
          aria-label="Bookmark article"
        />
        <span className="text-xs text-muted-foreground">Bookmark</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FavoriteButton
          icon={HeartIcon}
          favorited={heartFavorited}
          onFavoritedChange={setHeartFavorited}
          variant="outline"
          size="default"
          aria-label="Like product"
        />
        <span className="text-xs text-muted-foreground">Heart</span>
      </div>
    </div>
  );
}
