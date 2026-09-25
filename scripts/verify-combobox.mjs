import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Combobox Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/combobox.tsx...");
assert.ok(fs.existsSync("components/ui/combobox.tsx"), "components/ui/combobox.tsx must exist");
const comboSource = fs.readFileSync("components/ui/combobox.tsx", "utf8");
assert.ok(comboSource.includes("ComboboxPrimitive.Root"), "Must compose Base UI ComboboxPrimitive.Root");
assert.ok(comboSource.includes("function ComboboxInput"), "Must declare ComboboxInput");
assert.ok(comboSource.includes("function ComboboxContent"), "Must declare ComboboxContent");
assert.ok(comboSource.includes("function ComboboxList"), "Must declare ComboboxList");
assert.ok(comboSource.includes("function ComboboxItem"), "Must declare ComboboxItem");
assert.ok(comboSource.includes("function ComboboxEmpty"), "Must declare ComboboxEmpty");
assert.ok(comboSource.includes('data-slot="combobox-content"'), "Must define data-slot='combobox-content'");
assert.ok(comboSource.includes('data-slot="combobox-item"'), "Must define data-slot='combobox-item'");
assert.ok(comboSource.includes('data-slot="combobox-empty"'), "Must define data-slot='combobox-empty'");
assert.ok(comboSource.includes("ArrowDown01Icon"), "Must use Hugeicons ArrowDown01Icon");
assert.ok(comboSource.includes("Cancel01Icon"), "Must use Hugeicons Cancel01Icon");
assert.ok(comboSource.includes("Tick02Icon"), "Must use Hugeicons Tick02Icon");
assert.ok(comboSource.includes("HaloIcon"), "Must render through HaloIcon primitive");
assert.ok(!comboSource.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/combobox.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/combobox.json"), "public/r/combobox.json must exist");
const comboJson = JSON.parse(fs.readFileSync("public/r/combobox.json", "utf8"));
assert.equal(comboJson.name, "combobox", "Registry item name must be 'combobox'");
assert.ok(comboJson.files.some(f => f.target === "components/ui/combobox.tsx"), "Must include components/ui/combobox.tsx");
assert.ok(comboJson.files.some(f => f.target === "components/icons/halo-icon.tsx"), "Must include components/icons/halo-icon.tsx");
assert.ok(comboJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "combobox"), "registry.json must list 'combobox'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/combobox"), "Navigation must route to '/components/combobox'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/combobox/page.tsx"), "app/components/combobox/page.tsx must exist");
assert.ok(fs.existsSync("app/components/combobox/layout.tsx"), "app/components/combobox/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/combobox/combobox-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/combobox/combobox-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/combobox/combobox-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/combobox/combobox-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryFrameworkComboboxDemo"), "Must include PrimaryFrameworkComboboxDemo");
assert.ok(demos.includes("GroupedComboboxDemo"), "Must include GroupedComboboxDemo");
assert.ok(demos.includes("ComboboxStatesDemo"), "Must include ComboboxStatesDemo");
assert.ok(demos.includes("ControlledComboboxDemo"), "Must include ControlledComboboxDemo");

const pageSource = fs.readFileSync("app/components/combobox/page.tsx", "utf8");
assert.ok(pageSource.includes("Combobox combines text entry with option selection"), "Must include Callout 1");
assert.ok(pageSource.includes("Query and committed value are separate pieces of state"), "Must include Callout 2");
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

await checkEndpoint("/components/combobox");
await checkEndpoint("/r/combobox.json");

console.log("\n========================================================");
console.log("🎉 ALL COMBOBOX QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
