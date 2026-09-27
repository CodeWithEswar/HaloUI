import fs from 'node:fs';
import assert from 'node:assert';

console.log("=== HaloUI Data Display 14: Data Table Verification Suite ===\n");

// 1. Verify components/ui/data-table.tsx exists and reuses Table
const dtSource = fs.readFileSync("components/ui/data-table.tsx", "utf-8");
assert.ok(dtSource.includes('from "@/components/ui/table"'), "DataTable MUST import and reuse Table from components/ui/table");
console.log("✓ Reuses Table foundation verified");

// 2. Verify subcomponent exports
const requiredExports = [
  "DataTable",
  "DataTableColumnHeader",
  "DataTableViewOptions",
  "DataTablePagination",
];
for (const exp of requiredExports) {
  assert.ok(dtSource.includes(`export function ${exp}`), `Must export function ${exp}`);
}
console.log("✓ All 4 DataTable subcomponents verified");

// 3. Verify accessible sorting with aria-sort
assert.ok(dtSource.includes("aria-sort="), "DataTableColumnHeader must expose accessible aria-sort attribute");
console.log("✓ Accessible sorting and aria-sort verified");

// 4. Verify selection and floating bulk actions
assert.ok(dtSource.includes("floatingActions"), "DataTable must support floatingActions prop");
assert.ok(dtSource.includes('data-slot="data-table-floating-bar"'), "Must render data-table-floating-bar when rows are selected");
console.log("✓ Row selection and floating bulk actions bar verified");

// 5. Verify documentation & preview suite
const docPage = fs.readFileSync("app/components/data-table/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/data-table/data-table-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/data-table/data-table-preview-stage.tsx", "utf-8");
const docLayout = fs.readFileSync("app/components/data-table/layout.tsx", "utf-8");

// Verify DocsShell wrapping
assert.ok(docLayout.includes("<DocsShell>"), "DataTable layout MUST wrap children in DocsShell");
console.log("✓ DocsShell wrapping verified in layout");

// Strict diagram ban
assert.ok(!docPage.includes('language="text"'), "Strict ban: No ASCII diagrams in code blocks");
assert.ok(!docPage.includes("┌──") && !docPage.includes("├──"), "Strict ban: No box-drawing characters");

// Strict Hugeicons exclusivity
assert.ok(!docPage.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in data-table page");
assert.ok(!docDemo.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in demonstrations");
assert.ok(!docPreview.includes("lucide-react"), "Strict Hugeicons exclusivity: Zero Lucide icons in preview stage");
console.log("✓ Documentation visual neutrality and strict Hugeicons exclusivity verified");

// 6. Verify PropsExplorer integration
assert.ok(docPage.includes("<PropsExplorer"), "DataTable documentation must use professional PropsExplorer component");
console.log("✓ Professional PropsExplorer integration verified");

// 7. Verify Registry JSON
assert.ok(fs.existsSync("public/r/data-table.json"), "public/r/data-table.json must exist");
const dtJson = JSON.parse(fs.readFileSync("public/r/data-table.json", "utf-8"));
assert.strictEqual(dtJson.name, "data-table");
assert.strictEqual(dtJson.type, "registry:ui");
assert.ok(dtJson.registryDependencies.includes("table"), "data-table must declare 'table' in registryDependencies");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = registryJson.items.find((i) => i.name === "data-table");
assert.ok(foundInRegistry, "Data Table must be present in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

// 8. Verify navigation registration
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert.ok(navSource.includes('href: "/components/data-table"'), "Data Table must be registered in lib/docs/navigation.ts");
console.log("✓ Navigation registration verified");

console.log("\n========================================================");
console.log("🎉 ALL DATA TABLE VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
