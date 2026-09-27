import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 12: Description List Verification Suite ===\n");

// 1. Primitive Source Verification
const source = fs.readFileSync("components/ui/description-list.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!source.includes('"use client"'), "components/ui/description-list.tsx must NOT contain 'use client'");
assert.ok(!source.includes("'use client'"), "components/ui/description-list.tsx must NOT contain 'use client'");
assert.ok(!source.includes("useState"), "components/ui/description-list.tsx must NOT use useState");
assert.ok(!source.includes("useEffect"), "components/ui/description-list.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Exported Functions & Compound Bindings
const expectedExports = [
  "DescriptionList",
  "DescriptionListItem",
  "DescriptionListTerm",
  "DescriptionListDetails",
  "DescriptionListHeader",
  "DescriptionListSeparator",
];

for (const exp of expectedExports) {
  assert.ok(source.includes(`export function ${exp}`), `Must export ${exp}`);
}

assert.ok(source.includes("DescriptionList.Item = DescriptionListItem"), "Must attach DescriptionList.Item");
assert.ok(source.includes("DescriptionList.Term = DescriptionListTerm"), "Must attach DescriptionList.Term");
assert.ok(source.includes("DescriptionList.Details = DescriptionListDetails"), "Must attach DescriptionList.Details");
assert.ok(source.includes("DescriptionList.Header = DescriptionListHeader"), "Must attach DescriptionList.Header");
assert.ok(source.includes("DescriptionList.Separator = DescriptionListSeparator"), "Must attach DescriptionList.Separator");
console.log("✓ All 6 compound exports and subcomponent bindings verified");

// Check Semantic HTML support (dl / dt / dd)
assert.ok(source.includes('"dl"'), "DescriptionList root must default to semantic dl element");
assert.ok(source.includes('"dt"'), "DescriptionListTerm must default to semantic dt element");
assert.ok(source.includes('"dd"'), "DescriptionListDetails must default to semantic dd element");
console.log("✓ Native semantic description list HTML structure (dl, dt, dd) verified");

// Check Density, Variants, and Layout
assert.ok(source.includes('"default" | "compact" | "relaxed"'), "Must define DescriptionListDensity");
assert.ok(source.includes('"default" | "outline" | "muted" | "glass" | "ghost"'), "Must define DescriptionListVariant");
assert.ok(source.includes('"auto" | "horizontal" | "vertical"'), "Must define DescriptionListLayout");
assert.ok(source.includes("divided"), "Must support divided row presentation");
assert.ok(source.includes('variant === "glass"'), "Must implement liquid glass variant on collection boundary");
console.log("✓ Density scales, surface variants, layout modes, and dividers verified");

// Check Container Query & Automatic Responsiveness
assert.ok(source.includes("@container/description-list"), "Must establish @container/description-list for automatic responsiveness");
assert.ok(source.includes("min-w-0"), "Must enforce min-w-0 to prevent horizontal overflow");
assert.ok(!source.includes("window.innerWidth"), "Must NOT use JavaScript window width measurement");
assert.ok(!source.includes("ResizeObserver"), "Must NOT use runtime layout observers");
console.log("✓ Container-first responsiveness and pure CSS reflow verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/description-list/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/description-list/description-list-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/description-list/description-list-preview-stage.tsx", "utf-8");

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
const registryItem = JSON.parse(fs.readFileSync("public/r/description-list.json", "utf-8"));
assert.equal(registryItem.name, "description-list");
assert.ok(registryItem.dependencies.includes("@radix-ui/react-slot"), "Must declare dependency on '@radix-ui/react-slot'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/description-list.tsx"), "Must include description-list.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "description-list");
assert.ok(foundInRegistry, "description-list must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

// 4. Navigation Verification
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert.ok(navSource.includes('href: "/components/description-list"'), "Description List must be registered in lib/docs/navigation.ts");
console.log("✓ Navigation registration verified");

console.log("\n========================================================");
console.log("🎉 ALL DESCRIPTION LIST VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
