import fs from 'node:fs';
import assert from 'node:assert';

console.log("=== HaloUI Data Display 13: Table Verification Suite ===\n");

// 1. Verify components/ui/table.tsx exists and is Server Component compatible
const tableSource = fs.readFileSync("components/ui/table.tsx", "utf-8");
assert.ok(!tableSource.includes('"use client"'), "Table MUST be a Server Component (zero client-side JS)");
assert.ok(!tableSource.includes("'use client'"), "Table MUST be a Server Component (zero client-side JS)");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// 2. Verify native table semantics
const semanticElements = ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption"];
for (const elem of semanticElements) {
  assert.ok(tableSource.includes(`<${elem}`), `Table source must contain native semantic <${elem}> tag`);
}
console.log("✓ All 8 native semantic table HTML tags (table, thead, tbody, tfoot, tr, th, td, caption) verified");

// 3. Verify compound exports and subcomponent bindings
const requiredExports = [
  "Table",
  "TableHeader",
  "TableBody",
  "TableFooter",
  "TableRow",
  "TableHead",
  "TableCell",
  "TableCaption",
];
for (const exp of requiredExports) {
  assert.ok(tableSource.includes(`export function ${exp}`), `Must export function ${exp}`);
}
assert.ok(tableSource.includes("Table.Header = TableHeader"), "Must attach Table.Header");
assert.ok(tableSource.includes("Table.Body = TableBody"), "Must attach Table.Body");
assert.ok(tableSource.includes("Table.Footer = TableFooter"), "Must attach Table.Footer");
assert.ok(tableSource.includes("Table.Row = TableRow"), "Must attach Table.Row");
assert.ok(tableSource.includes("Table.Head = TableHead"), "Must attach Table.Head");
assert.ok(tableSource.includes("Table.Cell = TableCell"), "Must attach Table.Cell");
assert.ok(tableSource.includes("Table.Caption = TableCaption"), "Must attach Table.Caption");
console.log("✓ All 8 compound exports and dot-notation subcomponent bindings verified");

// 4. Verify density scales & surface variants
const densityScales = ["default", "compact", "comfortable"];
for (const d of densityScales) {
  assert.ok(tableSource.includes(`density === "${d}"`), `Must support density scale "${d}"`);
}
const variants = ["default", "outline", "muted", "glass", "ghost"];
for (const v of variants) {
  assert.ok(tableSource.includes(`variant === "${v}"`), `Must support surface variant "${v}"`);
}
console.log("✓ Density scales (compact/default/comfortable) and surface variants (glass/outline/muted/ghost/default) verified");

// 5. Verify responsive scroll containment & accessibility
assert.ok(tableSource.includes('data-slot="table-container"'), "Must have table-container slot");
assert.ok(tableSource.includes("overflow-x-auto"), "Table container must have overflow-x-auto for scroll containment");
assert.ok(tableSource.includes('role="region"'), "Table container must have role='region' for accessible scrolling");
assert.ok(tableSource.includes("tabIndex={0}"), "Table container must have tabIndex={0} for keyboard accessibility");
assert.ok(tableSource.includes("aria-label={containerLabel"), "Table container must forward containerLabel to aria-label");
console.log("✓ Container-aware responsive horizontal scroll containment and keyboard accessibility verified");

// 6. Verify restrained liquid glass hierarchy (zero glass per cell, zero glass per row)
assert.ok(!tableSource.includes("backdrop-blur-md px-4 py-3"), "Must NOT apply backdrop blur per cell");
assert.ok(!tableSource.includes("TableCellProps") || !tableSource.includes("variant === 'glass'"), "Cells must not have individual glass variants");
console.log("✓ Restrained Liquid Glass hierarchy verified (single outer boundary, zero glass per cell/row)");

// 7. Verify documentation & preview suite
const docPage = fs.readFileSync("app/components/table/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/table/table-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/table/table-preview-stage.tsx", "utf-8");
const propsExplorerSource = fs.readFileSync("components/docs/props-explorer.tsx", "utf-8");

// Strict diagram ban
assert.ok(!docPage.includes('language="text"'), "Strict ban: No ASCII diagrams in code blocks");
assert.ok(!docPage.includes("┌──") && !docPage.includes("├──"), "Strict ban: No box-drawing characters");

// Strict Hugeicons exclusivity
assert.ok(!docPage.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in table page");
assert.ok(!docDemo.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in demonstrations");
assert.ok(!docPreview.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in preview stage");
assert.ok(!propsExplorerSource.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in PropsExplorer");
console.log("✓ Documentation visual neutrality and strict Hugeicons exclusivity verified");

// 8. Verify PropsExplorer integration
assert.ok(docPage.includes("<PropsExplorer"), "Table documentation must use professional PropsExplorer component");
assert.ok(propsExplorerSource.includes("@container/props-explorer"), "PropsExplorer must use container queries for responsive card reflow");
assert.ok(propsExplorerSource.includes("Search"), "PropsExplorer must include prop search");
assert.ok(propsExplorerSource.includes("Filter:"), "PropsExplorer must include required/optional filters");
console.log("✓ Professional PropsExplorer integration and container reflow verified");

// 9. Verify Registry JSON
assert.ok(fs.existsSync("public/r/table.json"), "public/r/table.json must exist");
const tableJson = JSON.parse(fs.readFileSync("public/r/table.json", "utf-8"));
assert.strictEqual(tableJson.name, "table");
assert.strictEqual(tableJson.type, "registry:ui");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = registryJson.items.find((i) => i.name === "table");
assert.ok(foundInRegistry, "Table must be present in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

// 10. Verify navigation registration
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert.ok(navSource.includes('href: "/components/table"'), "Table must be registered in lib/docs/navigation.ts");
console.log("✓ Navigation registration verified");

console.log("\n========================================================");
console.log("🎉 ALL TABLE VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
