import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Multi Select Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/multi-select.tsx...");
assert.ok(fs.existsSync("components/ui/multi-select.tsx"), "components/ui/multi-select.tsx must exist");
const multiSource = fs.readFileSync("components/ui/multi-select.tsx", "utf8");
assert.ok(multiSource.includes("ComboboxPrimitive.Root"), "Must compose Base UI ComboboxPrimitive.Root");
assert.ok(multiSource.includes("multiple={true}"), "Must set multiple={true} on Root");
assert.ok(multiSource.includes("function MultiSelectTrigger"), "Must declare MultiSelectTrigger");
assert.ok(multiSource.includes("function MultiSelectToken"), "Must declare MultiSelectToken");
assert.ok(multiSource.includes("function MultiSelectTokenRemove"), "Must declare MultiSelectTokenRemove");
assert.ok(multiSource.includes("function MultiSelectValue"), "Must declare MultiSelectValue");
assert.ok(multiSource.includes("function MultiSelectInput"), "Must declare MultiSelectInput");
assert.ok(multiSource.includes("function MultiSelectContent"), "Must declare MultiSelectContent");
assert.ok(multiSource.includes("function MultiSelectList"), "Must declare MultiSelectList");
assert.ok(multiSource.includes("function MultiSelectItem"), "Must declare MultiSelectItem");
assert.ok(multiSource.includes("function MultiSelectEmpty"), "Must declare MultiSelectEmpty");
assert.ok(multiSource.includes("function MultiSelectClear"), "Must declare MultiSelectClear");
assert.ok(multiSource.includes("function MultiSelectSeparator"), "Must declare MultiSelectSeparator");
assert.ok(multiSource.includes("function MultiSelectChevron"), "Must declare MultiSelectChevron");

assert.ok(multiSource.includes('data-slot="multi-select-trigger"'), "Must define data-slot='multi-select-trigger'");
assert.ok(multiSource.includes('data-slot="multi-select-token"'), "Must define data-slot='multi-select-token'");
assert.ok(multiSource.includes('data-slot="multi-select-token-remove"'), "Must define data-slot='multi-select-token-remove'");
assert.ok(multiSource.includes('data-slot="multi-select-content"'), "Must define data-slot='multi-select-content'");
assert.ok(multiSource.includes('data-slot="multi-select-item"'), "Must define data-slot='multi-select-item'");

assert.ok(multiSource.includes("Cancel01Icon"), "Must use Hugeicons Cancel01Icon");
assert.ok(multiSource.includes("Tick02Icon"), "Must use Hugeicons Tick02Icon");
assert.ok(multiSource.includes("ArrowDown01Icon"), "Must use Hugeicons ArrowDown01Icon");
assert.ok(multiSource.includes("HaloIcon"), "Must render through HaloIcon primitive");
assert.ok(!multiSource.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/multi-select.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/multi-select.json"), "public/r/multi-select.json must exist");
const multiJson = JSON.parse(fs.readFileSync("public/r/multi-select.json", "utf8"));
assert.equal(multiJson.name, "multi-select", "Registry item name must be 'multi-select'");
assert.ok(multiJson.files.some(f => f.target === "components/ui/multi-select.tsx"), "Must include components/ui/multi-select.tsx");
assert.ok(multiJson.files.some(f => f.target === "components/icons/halo-icon.tsx"), "Must include components/icons/halo-icon.tsx");
assert.ok(multiJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "multi-select"), "registry.json must list 'multi-select'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/multi-select"), "Navigation must route to '/components/multi-select'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/multi-select/page.tsx"), "app/components/multi-select/page.tsx must exist");
assert.ok(fs.existsSync("app/components/multi-select/layout.tsx"), "app/components/multi-select/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/multi-select/multi-select-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/multi-select/multi-select-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/multi-select/multi-select-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/multi-select/multi-select-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryMultiSelectDemo"), "Must include PrimaryMultiSelectDemo");
assert.ok(demos.includes("GroupedMultiSelectDemo"), "Must include GroupedMultiSelectDemo");
assert.ok(demos.includes("TokenOverflowDemo"), "Must include TokenOverflowDemo");
assert.ok(demos.includes("InvalidMultiSelectDemo"), "Must include InvalidMultiSelectDemo");
assert.ok(demos.includes("DisabledMultiSelectDemo"), "Must include DisabledMultiSelectDemo");

const pageSource = fs.readFileSync("app/components/multi-select/page.tsx", "utf8");
assert.ok(pageSource.includes("Multi Select chooses multiple values from a known option collection"), "Must include Callout 1");
assert.ok(pageSource.includes("Search query and selected values are separate state"), "Must include Callout 2");
assert.ok(pageSource.includes("Tokens represent committed selections, not decorative badges"), "Must include Callout 3");
assert.ok(!pageSource.includes("```text"), "Strictly no ASCII diagrams in documentation");
assert.ok(!pageSource.includes("├──"), "Strictly no ASCII tree diagrams in documentation");
console.log("✓ Documentation, preview stage, and demonstrations verified\n");

// 5. Live Server Endpoint Check
console.log("5. Testing live HTTP endpoints on http://localhost:3000...");
const checkEndpoint = async (path) => {
  const res = await fetch(`http://localhost:3000${path}`);
  if (res.status === 200) {
    console.log(`✓ HTTP GET http://localhost:3000${path} -> 200 OK`);
  } else {
    throw new Error(`Failed ${path}: Status ${res.status}`);
  }
};

await checkEndpoint("/components/multi-select");
await checkEndpoint("/r/multi-select.json");

console.log("\n========================================================");
console.log("🎉 ALL MULTI SELECT QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
