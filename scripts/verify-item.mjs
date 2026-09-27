import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 10: Item Verification Suite ===\n");

// 1. Primitive Source Verification
const source = fs.readFileSync("components/ui/item.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!source.includes('"use client"'), "components/ui/item.tsx must NOT contain 'use client'");
assert.ok(!source.includes("'use client'"), "components/ui/item.tsx must NOT contain 'use client'");
assert.ok(!source.includes("useState"), "components/ui/item.tsx must NOT use useState");
assert.ok(!source.includes("useEffect"), "components/ui/item.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Exported Functions & Types
const expectedExports = [
  "Item",
  "ItemMedia",
  "ItemContent",
  "ItemTitle",
  "ItemDescription",
  "ItemActions",
  "ItemGroup",
  "ItemSeparator",
];

for (const exp of expectedExports) {
  assert.ok(source.includes(`export function ${exp}`), `Must export ${exp}`);
}

assert.ok(source.includes("Item.Media = ItemMedia"), "Must attach Item.Media");
assert.ok(source.includes("Item.Content = ItemContent"), "Must attach Item.Content");
assert.ok(source.includes("Item.Title = ItemTitle"), "Must attach Item.Title");
assert.ok(source.includes("Item.Description = ItemDescription"), "Must attach Item.Description");
assert.ok(source.includes("Item.Actions = ItemActions"), "Must attach Item.Actions");
assert.ok(source.includes("Item.Group = ItemGroup"), "Must attach Item.Group");
assert.ok(source.includes("Item.Separator = ItemSeparator"), "Must attach Item.Separator");
console.log("✓ All 8 compound exports and subcomponent bindings verified");

// Check Variants and Sizes
assert.ok(source.includes('"default" | "outline" | "muted" | "glass"'), "Must define ItemVariant with glass");
assert.ok(source.includes('"default" | "compact"'), "Must define ItemSize");
assert.ok(source.includes('variant === "glass"'), "Must implement liquid glass variant");
console.log("✓ Variants (default, outline, muted, glass) and density scales verified");

// Check Responsive Design Principles
assert.ok(source.includes("min-w-0"), "Must enforce min-w-0 for child content reflow");
assert.ok(source.includes("flex-wrap"), "Must support responsive flex wrapping");
assert.ok(source.includes("break-words"), "Must handle long titles and descriptions gracefully");
console.log("✓ Responsive layout and reflow architecture verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/item/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/item/item-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/item/item-preview-stage.tsx", "utf-8");

// Strict diagram ban checks
const allDocs = docPage + docDemo + docPreview;
assert.ok(!allDocs.includes('language="text"'), "Prohibited text code blocks must NOT be present in docs");
assert.ok(!allDocs.includes("┌──"), "ASCII box-drawing characters must NOT be present in docs");
assert.ok(!allDocs.includes("├──"), "Unicode tree characters must NOT be present in docs");
assert.ok(!allDocs.includes("└──"), "Unicode tree characters must NOT be present in docs");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// Check Hugeicons in docs
assert.ok(!allDocs.includes("lucide-react"), "Must NOT use lucide-react in docs");
assert.ok(allDocs.includes("@hugeicons/core-free-icons"), "Must use @hugeicons/core-free-icons in docs");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 3. Registry JSON Verification
const registryItem = JSON.parse(fs.readFileSync("public/r/item.json", "utf-8"));
assert.equal(registryItem.name, "item");
assert.ok(registryItem.dependencies.includes("@radix-ui/react-slot"), "Must declare dependency on '@radix-ui/react-slot'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/item.tsx"), "Must include item.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "item");
assert.ok(foundInRegistry, "item must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

// 4. Navigation Verification
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert.ok(navSource.includes('href: "/components/item"'), "Item must be registered in lib/docs/navigation.ts");
console.log("✓ Navigation registration verified");

console.log("\n========================================================");
console.log("🎉 ALL ITEM VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
