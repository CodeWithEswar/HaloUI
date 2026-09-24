import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 09: Favorite Button Quality Gate & Verification ===\n");

// 1. Verify component source exists
const favoriteButtonPath = path.resolve("components/ui/favorite-button.tsx");
assert.ok(fs.existsSync(favoriteButtonPath), "components/ui/favorite-button.tsx must exist");
const favoriteButtonContent = fs.readFileSync(favoriteButtonPath, "utf-8");

// 2. Verify exports and TypeScript types
assert.ok(favoriteButtonContent.includes("export const FavoriteButton ="), "FavoriteButton must be exported");
assert.ok(favoriteButtonContent.includes("export const favoriteButtonVariants ="), "favoriteButtonVariants must be exported");
assert.ok(favoriteButtonContent.includes("export type FavoriteButtonVariant ="), "FavoriteButtonVariant type must be exported");
assert.ok(favoriteButtonContent.includes("export type FavoriteButtonSize ="), "FavoriteButtonSize type must be exported");
assert.ok(favoriteButtonContent.includes("export interface FavoriteButtonProps"), "FavoriteButtonProps interface must be exported");
console.log("✓ Core FavoriteButton exports and TypeScript types verified");

// 3. Verify Base UI Toggle primitive and data-slot
assert.ok(favoriteButtonContent.includes('from "@base-ui/react/toggle"'), "Must import Toggle from @base-ui/react/toggle");
assert.ok(favoriteButtonContent.includes('data-slot="favorite-button"'), "Must have data-slot='favorite-button'");
assert.ok(favoriteButtonContent.includes("<TogglePrimitive"), "Must render TogglePrimitive");
console.log("✓ Base UI Toggle primitive integration and data-slot verified");

// 4. Critical Architecture: Persistent Toggle Contract
assert.ok(favoriteButtonContent.includes("aria-pressed"), "Must support aria-pressed for persistent toggle contract");
assert.ok(favoriteButtonContent.includes("data-favorited="), "Must communicate data-favorited attribute");
console.log("✓ Persistent toggle contract (aria-pressed & data-favorited) verified");

// 5. Hugeicons exclusivity and HaloIcon integration
assert.ok(favoriteButtonContent.includes('from "@hugeicons/core-free-icons"'), "Must import icons from @hugeicons/core-free-icons");
assert.ok(favoriteButtonContent.includes("<HaloIcon"), "Must render icon via HaloIcon wrapper");
assert.ok(!favoriteButtonContent.includes("lucide-react"), "Must NOT use lucide-react");
console.log("✓ Hugeicons exclusivity and HaloIcon wrapper verified");

// 6. Accessible Name & State-Aware computation
assert.ok(favoriteButtonContent.includes("Remove from favorites"), "Must have dynamic default 'Remove from favorites'");
assert.ok(favoriteButtonContent.includes("Add to favorites"), "Must have dynamic default 'Add to favorites'");
console.log("✓ State-aware dynamic accessible names verified");

// 7. Focus Ring and Physical Tactile Press
assert.ok(favoriteButtonContent.includes("halo-focus-ring"), "Must implement halo-focus-ring token");
assert.ok(favoriteButtonContent.includes("halo-tactile-press"), "Must implement halo-tactile-press token");
console.log("✓ Double-contrast focus ring and tactile compression tokens verified");

// 8. Static registry file in public/r/favorite-button.json
const staticFavoritePath = path.resolve("public/r/favorite-button.json");
assert.ok(fs.existsSync(staticFavoritePath), "public/r/favorite-button.json must exist");
const staticFavoriteJson = JSON.parse(fs.readFileSync(staticFavoritePath, "utf-8"));
assert.equal(staticFavoriteJson.name, "favorite-button");
assert.equal(staticFavoriteJson.title, "Favorite Button");
assert.equal(staticFavoriteJson.meta.category, "actions");
assert.equal(staticFavoriteJson.meta.status, "preview");
assert.ok(staticFavoriteJson.dependencies.includes("@base-ui/react"), "Registry must declare @base-ui/react dependency");
assert.ok(staticFavoriteJson.registryDependencies.includes("halo-icon"), "Registry must declare halo-icon dependency");
console.log("✓ Static registry public/r/favorite-button.json verified");

// 9. Central registry index (public/r/registry.json)
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const foundInRegistry = registryJson.items.some((item) => item.name === "favorite-button");
assert.ok(foundInRegistry, "favorite-button must be indexed in public/r/registry.json items");
console.log("✓ Central registry catalog public/r/registry.json verified");

// 10. Dynamic registry endpoint (app/r/[name]/route.ts)
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "favorite-button"'), "app/r/[name]/route.ts must handle cleanName === 'favorite-button'");
console.log("✓ Dynamic registry route handler verified");

// 11. Docs navigation entry (lib/docs/navigation.ts)
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('title: "Favorite Button"'), "lib/docs/navigation.ts must contain Favorite Button title");
assert.ok(navContent.includes('href: "/components/favorite-button"'), "lib/docs/navigation.ts must route to /components/favorite-button");
console.log("✓ Documentation navigation tree verified");

// 12. Documentation Page & Preview Stage existence
const pagePath = path.resolve("app/components/favorite-button/page.tsx");
const stagePath = path.resolve("app/components/favorite-button/favorite-button-preview-stage.tsx");
const demosPath = path.resolve("app/components/favorite-button/favorite-button-demonstrations.tsx");
assert.ok(fs.existsSync(pagePath), "app/components/favorite-button/page.tsx must exist");
assert.ok(fs.existsSync(stagePath), "app/components/favorite-button/favorite-button-preview-stage.tsx must exist");
assert.ok(fs.existsSync(demosPath), "app/components/favorite-button/favorite-button-demonstrations.tsx must exist");
console.log("✓ Documentation page, preview stage, and demonstrations verified");

console.log("\n>>> ALL FAVORITE BUTTON QUALITY GATES PASSED SUCCESSFULLY! <<<\n");
