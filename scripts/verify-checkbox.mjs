import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Checkbox Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/checkbox.tsx...");
assert.ok(fs.existsSync("components/ui/checkbox.tsx"), "components/ui/checkbox.tsx must exist");
const checkSource = fs.readFileSync("components/ui/checkbox.tsx", "utf8");
assert.ok(checkSource.includes("CheckboxPrimitive.Root"), "Must compose Base UI CheckboxPrimitive.Root");
assert.ok(checkSource.includes("CheckboxPrimitive.Indicator"), "Must compose Base UI CheckboxPrimitive.Indicator");
assert.ok(checkSource.includes('data-slot="checkbox"'), "Must define data-slot='checkbox'");
assert.ok(checkSource.includes('data-slot="checkbox-indicator"'), "Must define data-slot='checkbox-indicator'");
assert.ok(checkSource.includes("Tick02Icon"), "Must use Hugeicons Tick02Icon for checked state");
assert.ok(checkSource.includes("MinusSignIcon"), "Must use Hugeicons MinusSignIcon for indeterminate state");
assert.ok(checkSource.includes("HaloIcon"), "Must render through HaloIcon primitive");
assert.ok(!checkSource.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/checkbox.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/checkbox.json"), "public/r/checkbox.json must exist");
const checkJson = JSON.parse(fs.readFileSync("public/r/checkbox.json", "utf8"));
assert.equal(checkJson.name, "checkbox", "Registry item name must be 'checkbox'");
assert.ok(checkJson.files.some(f => f.target === "components/ui/checkbox.tsx"), "Must include components/ui/checkbox.tsx");
assert.ok(checkJson.files.some(f => f.target === "components/icons/halo-icon.tsx"), "Must include components/icons/halo-icon.tsx");
assert.ok(checkJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "checkbox"), "registry.json must list 'checkbox'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/checkbox"), "Navigation must route to '/components/checkbox'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/checkbox/page.tsx"), "app/components/checkbox/page.tsx must exist");
assert.ok(fs.existsSync("app/components/checkbox/layout.tsx"), "app/components/checkbox/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/checkbox/checkbox-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/checkbox/checkbox-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/checkbox/checkbox-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/checkbox/checkbox-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryCheckboxDemo"), "Must include PrimaryCheckboxDemo");
assert.ok(demos.includes("IndeterminateCheckboxDemo"), "Must include IndeterminateCheckboxDemo");
assert.ok(demos.includes("InvalidCheckboxDemo"), "Must include InvalidCheckboxDemo");
assert.ok(demos.includes("DisabledCheckboxDemo"), "Must include DisabledCheckboxDemo");

const pageSource = fs.readFileSync("app/components/checkbox/page.tsx", "utf8");
assert.ok(pageSource.includes("Checkbox represents selection, not an immediate system setting"), "Must include Callout 1");
assert.ok(pageSource.includes("Indeterminate represents a derived partial-selection state"), "Must include Callout 2");
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

await checkEndpoint("/components/checkbox");
await checkEndpoint("/r/checkbox.json");

console.log("\n========================================================");
console.log("🎉 ALL CHECKBOX QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
