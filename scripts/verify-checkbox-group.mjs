import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Checkbox Group Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/checkbox-group.tsx...");
assert.ok(fs.existsSync("components/ui/checkbox-group.tsx"), "components/ui/checkbox-group.tsx must exist");
const groupSource = fs.readFileSync("components/ui/checkbox-group.tsx", "utf8");
assert.ok(groupSource.includes("CheckboxGroupPrimitive"), "Must compose Base UI CheckboxGroupPrimitive");
assert.ok(groupSource.includes("function CheckboxGroupLabel"), "Must declare CheckboxGroupLabel");
assert.ok(groupSource.includes("function CheckboxGroupDescription"), "Must declare CheckboxGroupDescription");
assert.ok(groupSource.includes("function CheckboxGroupItem"), "Must declare CheckboxGroupItem");
assert.ok(groupSource.includes('data-slot="checkbox-group"'), "Must define data-slot='checkbox-group'");
assert.ok(groupSource.includes("<fieldset"), "Must render semantic fieldset element");
assert.ok(groupSource.includes("<legend"), "Must render semantic legend element");
console.log("✓ components/ui/checkbox-group.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/checkbox-group.json"), "public/r/checkbox-group.json must exist");
const groupJson = JSON.parse(fs.readFileSync("public/r/checkbox-group.json", "utf8"));
assert.equal(groupJson.name, "checkbox-group", "Registry item name must be 'checkbox-group'");
assert.ok(groupJson.files.some(f => f.target === "components/ui/checkbox-group.tsx"), "Must include components/ui/checkbox-group.tsx");
assert.ok(groupJson.files.some(f => f.target === "components/ui/checkbox.tsx"), "Must include components/ui/checkbox.tsx");
assert.ok(groupJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "checkbox-group"), "registry.json must list 'checkbox-group'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/checkbox-group"), "Navigation must route to '/components/checkbox-group'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/checkbox-group/page.tsx"), "app/components/checkbox-group/page.tsx must exist");
assert.ok(fs.existsSync("app/components/checkbox-group/layout.tsx"), "app/components/checkbox-group/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/checkbox-group/checkbox-group-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/checkbox-group/checkbox-group-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/checkbox-group/checkbox-group-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/checkbox-group/checkbox-group-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryCheckboxGroupDemo"), "Must include PrimaryCheckboxGroupDemo");
assert.ok(demos.includes("HorizontalCheckboxGroupDemo"), "Must include HorizontalCheckboxGroupDemo");
assert.ok(demos.includes("InvalidCheckboxGroupDemo"), "Must include InvalidCheckboxGroupDemo");
assert.ok(demos.includes("SelectAllCompositionDemo"), "Must include SelectAllCompositionDemo");
assert.ok(demos.includes("DisabledCheckboxGroupDemo"), "Must include DisabledCheckboxGroupDemo");

const pageSource = fs.readFileSync("app/components/checkbox-group/page.tsx", "utf8");
assert.ok(pageSource.includes("Checkbox Group is for related independent choices"), "Must include Callout 1");
assert.ok(pageSource.includes("Select All is an application composition pattern"), "Must include Callout 3");
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

await checkEndpoint("/components/checkbox-group");
await checkEndpoint("/r/checkbox-group.json");

console.log("\n========================================================");
console.log("🎉 ALL CHECKBOX GROUP QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
