import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Native Select Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/native-select.tsx...");
assert.ok(fs.existsSync("components/ui/native-select.tsx"), "components/ui/native-select.tsx must exist");
const selectSource = fs.readFileSync("components/ui/native-select.tsx", "utf8");
assert.ok(selectSource.includes("export function NativeSelect"), "Must export NativeSelect");
assert.ok(selectSource.includes("export interface NativeSelectProps"), "Must export NativeSelectProps");
assert.ok(selectSource.includes('data-slot="native-select-root"'), "Must define data-slot='native-select-root'");
assert.ok(selectSource.includes('data-slot="native-select"'), "Must define data-slot='native-select'");
assert.ok(selectSource.includes('data-slot="native-select-chevron"'), "Must define data-slot='native-select-chevron'");
assert.ok(selectSource.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(selectSource.includes("ArrowDown01Icon"), "Must use Hugeicons ArrowDown01Icon");
assert.ok(selectSource.includes("HaloIcon"), "Must render through HaloIcon primitive");
assert.ok(!selectSource.includes('"use client"'), "NativeSelect must be Server Component compatible (no 'use client')");
assert.ok(!selectSource.includes("readOnly"), "No fake readOnly prop on native select");
assert.ok(!selectSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/native-select.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/native-select.json"), "public/r/native-select.json must exist");
const selectJson = JSON.parse(fs.readFileSync("public/r/native-select.json", "utf8"));
assert.equal(selectJson.name, "native-select", "Registry item name must be 'native-select'");
assert.ok(selectJson.files.some(f => f.target === "components/ui/native-select.tsx"), "Must include components/ui/native-select.tsx");
assert.ok(selectJson.files.some(f => f.target === "components/icons/halo-icon.tsx"), "Must include components/icons/halo-icon.tsx");
assert.ok(selectJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "native-select"), "registry.json must list 'native-select'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/native-select"), "Navigation must route to '/components/native-select'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/native-select/page.tsx"), "app/components/native-select/page.tsx must exist");
assert.ok(fs.existsSync("app/components/native-select/layout.tsx"), "app/components/native-select/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/native-select/native-select-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/native-select/native-select-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/native-select/native-select-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/native-select/native-select-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryCountrySelectDemo"), "Must include PrimaryCountrySelectDemo");
assert.ok(demos.includes("GroupedOptionsSelectDemo"), "Must include GroupedOptionsSelectDemo");
assert.ok(demos.includes("NativeSelectStatesDemo"), "Must include NativeSelectStatesDemo");
assert.ok(demos.includes("ControlledNativeSelectDemo"), "Must include ControlledNativeSelectDemo");

const pageSource = fs.readFileSync("app/components/native-select/page.tsx", "utf8");
assert.ok(pageSource.includes("Native Select intentionally keeps the browser's selection behavior"), "Must include Callout 1");
assert.ok(pageSource.includes("Native Select vs Custom Select / Combobox"), "Must include Callout 2");
assert.ok(pageSource.includes("Platform Picker Styling Boundaries"), "Must include Callout 3");
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

await checkEndpoint("/components/native-select");
await checkEndpoint("/r/native-select.json");

console.log("\n========================================================");
console.log("🎉 ALL NATIVE SELECT QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
