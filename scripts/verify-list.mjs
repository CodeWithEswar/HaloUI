import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 11: List Verification Suite ===\n");

// 1. Primitive Source Verification
const source = fs.readFileSync("components/ui/list.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!source.includes('"use client"'), "components/ui/list.tsx must NOT contain 'use client'");
assert.ok(!source.includes("'use client'"), "components/ui/list.tsx must NOT contain 'use client'");
assert.ok(!source.includes("useState"), "components/ui/list.tsx must NOT use useState");
assert.ok(!source.includes("useEffect"), "components/ui/list.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Exported Functions & Types
const expectedExports = [
  "List",
  "ListItem",
  "ListHeader",
  "ListFooter",
  "ListSeparator",
  "ListEmpty",
];

for (const exp of expectedExports) {
  assert.ok(source.includes(`export function ${exp}`), `Must export ${exp}`);
}

assert.ok(source.includes("List.Item = ListItem"), "Must attach List.Item");
assert.ok(source.includes("List.Header = ListHeader"), "Must attach List.Header");
assert.ok(source.includes("List.Footer = ListFooter"), "Must attach List.Footer");
assert.ok(source.includes("List.Separator = ListSeparator"), "Must attach List.Separator");
assert.ok(source.includes("List.Empty = ListEmpty"), "Must attach List.Empty");
console.log("✓ All 6 compound exports and subcomponent bindings verified");

// Check Semantic HTML support (ul / ol / li)
assert.ok(source.includes('as || (ordered ? "ol" : "ul")'), "Must support semantic ul and ol natively");
assert.ok(source.includes('"li"'), "ListItem must default to semantic li element");
console.log("✓ Native semantic list HTML structure (ul, ol, li) verified");

// Check Density, Variants, and Dividers
assert.ok(source.includes('"default" | "compact" | "relaxed"'), "Must define ListDensity");
assert.ok(source.includes('"default" | "outline" | "muted" | "glass"'), "Must define ListVariant");
assert.ok(source.includes("divided"), "Must support divided row presentation");
assert.ok(source.includes('variant === "glass"'), "Must implement liquid glass variant on collection boundary");
console.log("✓ Density scales, surface variants, and automatic dividers verified");

// Check Container Query & Automatic Responsiveness
assert.ok(source.includes("@container"), "Must establish container queries for automatic responsiveness");
assert.ok(source.includes("min-w-0"), "Must enforce min-w-0 to prevent horizontal overflow");
assert.ok(!source.includes("window.innerWidth"), "Must NOT use JavaScript window width measurement");
assert.ok(!source.includes("ResizeObserver"), "Must NOT use runtime layout observers");
console.log("✓ Container-first responsiveness and pure CSS reflow verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/list/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/list/list-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/list/list-preview-stage.tsx", "utf-8");

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
const registryItem = JSON.parse(fs.readFileSync("public/r/list.json", "utf-8"));
assert.equal(registryItem.name, "list");
assert.ok(registryItem.dependencies.includes("@radix-ui/react-slot"), "Must declare dependency on '@radix-ui/react-slot'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/list.tsx"), "Must include list.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "list");
assert.ok(foundInRegistry, "list must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

// 4. Navigation Verification
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert.ok(navSource.includes('href: "/components/list"'), "List must be registered in lib/docs/navigation.ts");
console.log("✓ Navigation registration verified");

console.log("\n========================================================");
console.log("🎉 ALL LIST VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
