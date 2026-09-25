import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Select Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/select.tsx...");
assert.ok(fs.existsSync("components/ui/select.tsx"), "components/ui/select.tsx must exist");
const selectSource = fs.readFileSync("components/ui/select.tsx", "utf8");
assert.ok(selectSource.includes("SelectPrimitive.Root"), "Must compose Base UI SelectPrimitive.Root");
assert.ok(selectSource.includes("export function SelectTrigger") || selectSource.includes("function SelectTrigger"), "Must declare SelectTrigger");
assert.ok(selectSource.includes("export function SelectContent") || selectSource.includes("function SelectContent"), "Must declare SelectContent");
assert.ok(selectSource.includes("export function SelectItem") || selectSource.includes("function SelectItem"), "Must declare SelectItem");
assert.ok(selectSource.includes('data-slot="select-trigger"'), "Must define data-slot='select-trigger'");
assert.ok(selectSource.includes('data-slot="select-content"'), "Must define data-slot='select-content'");
assert.ok(selectSource.includes('data-slot="select-item"'), "Must define data-slot='select-item'");
assert.ok(selectSource.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(selectSource.includes("ArrowDown01Icon"), "Must use Hugeicons ArrowDown01Icon");
assert.ok(selectSource.includes("Tick02Icon"), "Must use Hugeicons Tick02Icon");
assert.ok(selectSource.includes("HaloIcon"), "Must render through HaloIcon primitive");
assert.ok(!selectSource.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/select.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/select.json"), "public/r/select.json must exist");
const selectJson = JSON.parse(fs.readFileSync("public/r/select.json", "utf8"));
assert.equal(selectJson.name, "select", "Registry item name must be 'select'");
assert.ok(selectJson.files.some(f => f.target === "components/ui/select.tsx"), "Must include components/ui/select.tsx");
assert.ok(selectJson.files.some(f => f.target === "components/icons/halo-icon.tsx"), "Must include components/icons/halo-icon.tsx");
assert.ok(selectJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "select"), "registry.json must list 'select'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/select"), "Navigation must route to '/components/select'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/select/page.tsx"), "app/components/select/page.tsx must exist");
assert.ok(fs.existsSync("app/components/select/layout.tsx"), "app/components/select/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/select/select-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/select/select-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/select/select-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/select/select-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryFrameworkSelectDemo"), "Must include PrimaryFrameworkSelectDemo");
assert.ok(demos.includes("GroupedOptionsSelectDemo"), "Must include GroupedOptionsSelectDemo");
assert.ok(demos.includes("SelectStatesDemo"), "Must include SelectStatesDemo");
assert.ok(demos.includes("ControlledSelectDemo"), "Must include ControlledSelectDemo");

const pageSource = fs.readFileSync("app/components/select/page.tsx", "utf8");
assert.ok(pageSource.includes("Select is a custom single-value option picker"), "Must include Callout 1");
assert.ok(pageSource.includes("Highlighted vs. Selected State"), "Must explain Highlighted vs Selected");
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

await checkEndpoint("/components/select");
await checkEndpoint("/r/select.json");

console.log("\n========================================================");
console.log("🎉 ALL SELECT QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
