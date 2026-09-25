import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Radio Group Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/radio-group.tsx...");
assert.ok(fs.existsSync("components/ui/radio-group.tsx"), "components/ui/radio-group.tsx must exist");
const radioSource = fs.readFileSync("components/ui/radio-group.tsx", "utf8");
assert.ok(radioSource.includes("RadioGroupPrimitive"), "Must compose Base UI RadioGroupPrimitive");
assert.ok(radioSource.includes("RadioPrimitive.Root"), "Must compose Base UI RadioPrimitive.Root");
assert.ok(radioSource.includes("function RadioGroupItem"), "Must declare RadioGroupItem");
assert.ok(radioSource.includes("function RadioGroupLabel"), "Must declare RadioGroupLabel");
assert.ok(radioSource.includes("function RadioGroupOption"), "Must declare RadioGroupOption");
assert.ok(radioSource.includes('data-slot="radio-group"'), "Must define data-slot='radio-group'");
assert.ok(radioSource.includes('data-slot="radio-group-item"'), "Must define data-slot='radio-group-item'");
assert.ok(radioSource.includes("<fieldset"), "Must render semantic fieldset element");
assert.ok(radioSource.includes("<legend"), "Must render semantic legend element");
assert.ok(!radioSource.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/radio-group.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/radio-group.json"), "public/r/radio-group.json must exist");
const radioJson = JSON.parse(fs.readFileSync("public/r/radio-group.json", "utf8"));
assert.equal(radioJson.name, "radio-group", "Registry item name must be 'radio-group'");
assert.ok(radioJson.files.some(f => f.target === "components/ui/radio-group.tsx"), "Must include components/ui/radio-group.tsx");
assert.ok(radioJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "radio-group"), "registry.json must list 'radio-group'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/radio-group"), "Navigation must route to '/components/radio-group'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/radio-group/page.tsx"), "app/components/radio-group/page.tsx must exist");
assert.ok(fs.existsSync("app/components/radio-group/layout.tsx"), "app/components/radio-group/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/radio-group/radio-group-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/radio-group/radio-group-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/radio-group/radio-group-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/radio-group/radio-group-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryRadioGroupDemo"), "Must include PrimaryRadioGroupDemo");
assert.ok(demos.includes("HorizontalRadioGroupDemo"), "Must include HorizontalRadioGroupDemo");
assert.ok(demos.includes("DisabledOptionRadioGroupDemo"), "Must include DisabledOptionRadioGroupDemo");
assert.ok(demos.includes("InvalidRadioGroupDemo"), "Must include InvalidRadioGroupDemo");

const pageSource = fs.readFileSync("app/components/radio-group/page.tsx", "utf8");
assert.ok(pageSource.includes("Radio Group represents mutually exclusive choices"), "Must include Callout 1");
assert.ok(pageSource.includes("Coordinated keyboard navigation"), "Must include Callout 3");
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

await checkEndpoint("/components/radio-group");
await checkEndpoint("/r/radio-group.json");

console.log("\n========================================================");
console.log("🎉 ALL RADIO GROUP QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
