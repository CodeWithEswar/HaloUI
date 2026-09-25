import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Switch Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/switch.tsx...");
assert.ok(fs.existsSync("components/ui/switch.tsx"), "components/ui/switch.tsx must exist");
const switchSource = fs.readFileSync("components/ui/switch.tsx", "utf8");
assert.ok(switchSource.includes("SwitchPrimitive.Root") || switchSource.includes("@base-ui/react/switch"), "Must compose Base UI SwitchPrimitive.Root");
assert.ok(switchSource.includes("export const Switch") || switchSource.includes("function Switch"), "Must declare Switch");
assert.ok(switchSource.includes('data-slot="switch"'), "Must define data-slot='switch'");
assert.ok(switchSource.includes('data-slot="switch-thumb"'), "Must define data-slot='switch-thumb'");
assert.ok(switchSource.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(switchSource.includes("useFieldControlProps"), "Must integrate with Field via useFieldControlProps");
assert.ok(switchSource.includes("motion-reduce:transition-none"), "Must support reduced motion override");
assert.ok(!switchSource.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/switch.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/switch.json"), "public/r/switch.json must exist");
const switchJson = JSON.parse(fs.readFileSync("public/r/switch.json", "utf8"));
assert.equal(switchJson.name, "switch", "Registry item name must be 'switch'");
assert.ok(switchJson.files.some(f => f.target === "components/ui/switch.tsx"), "Must include components/ui/switch.tsx");
assert.ok(switchJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "switch"), "registry.json must list 'switch'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/switch"), "Navigation must route to '/components/switch'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/switch/page.tsx"), "app/components/switch/page.tsx must exist");
assert.ok(fs.existsSync("app/components/switch/layout.tsx"), "app/components/switch/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/switch/switch-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/switch/switch-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/switch/switch-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");

const demos = fs.readFileSync("app/components/switch/switch-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimarySwitchDemo"), "Must include PrimarySwitchDemo");
assert.ok(demos.includes("SettingsListDemo"), "Must include SettingsListDemo");
assert.ok(demos.includes("SwitchStatesDemo"), "Must include SwitchStatesDemo");
assert.ok(demos.includes("SwitchSizesDemo"), "Must include SwitchSizesDemo");
assert.ok(demos.includes("ControlledSwitchDemo"), "Must include ControlledSwitchDemo");
assert.ok(demos.includes("LabelActivationDemo"), "Must include LabelActivationDemo");

const pageSource = fs.readFileSync("app/components/switch/page.tsx", "utf8");
assert.ok(pageSource.includes("Switch represents an immediate on/off setting"), "Must include Callout 1");
assert.ok(pageSource.includes("Immediate does not mean network-owned"), "Must include Callout 2");
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

await checkEndpoint("/components/switch");
await checkEndpoint("/r/switch.json");

// 6. Clean Install Verification
console.log("6. Verifying clean install registry contract...");
assert.equal(switchJson.type, "registry:ui");
assert.ok(switchJson.dependencies.includes("@base-ui/react"), "Must require @base-ui/react dependency");
assert.ok(switchJson.registryDependencies.includes("field"), "Must declare field registry dependency");
console.log("✓ Clean installation contract verified\n");

console.log("========================================================");
console.log("🎉 ALL SWITCH QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
