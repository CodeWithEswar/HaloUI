import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";

console.log("=== HaloUI Field Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/field.tsx...");
assert.ok(fs.existsSync("components/ui/field.tsx"), "components/ui/field.tsx must exist");
const fieldSource = fs.readFileSync("components/ui/field.tsx", "utf8");
assert.ok(fieldSource.includes("export function Field"), "Must export Field");
assert.ok(fieldSource.includes("export function FieldLabel"), "Must export FieldLabel");
assert.ok(fieldSource.includes("export function FieldDescription"), "Must export FieldDescription");
assert.ok(fieldSource.includes("export function FieldError"), "Must export FieldError");
assert.ok(fieldSource.includes("export function FieldContent"), "Must export FieldContent");
assert.ok(fieldSource.includes("export function FieldGroup"), "Must export FieldGroup");
assert.ok(fieldSource.includes("export function FieldSet"), "Must export FieldSet");
assert.ok(fieldSource.includes("export function FieldLegend"), "Must export FieldLegend");
assert.ok(fieldSource.includes("export function useFieldContext"), "Must export useFieldContext");
assert.ok(fieldSource.includes("useId()"), "Must use React.useId for automatic accessible ID coordination");
assert.ok(!fieldSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/field.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/field.json"), "public/r/field.json must exist");
const fieldJson = JSON.parse(fs.readFileSync("public/r/field.json", "utf8"));
assert.equal(fieldJson.name, "field", "Registry item name must be 'field'");
assert.ok(fieldJson.files.some(f => f.target === "components/ui/field.tsx"), "Must include components/ui/field.tsx");
assert.ok(fieldJson.files.some(f => f.target === "components/ui/label.tsx"), "Must include components/ui/label.tsx");
assert.ok(fieldJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "field"), "registry.json must list 'field'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/field"), "Navigation must route to '/components/field'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/field/page.tsx"), "app/components/field/page.tsx must exist");
assert.ok(fs.existsSync("app/components/field/layout.tsx"), "app/components/field/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/field/field-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/field/field-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/field/field-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry accordion");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/field/field-demonstrations.tsx", "utf8");
assert.ok(demos.includes("DefaultFieldDemo"), "Must include DefaultFieldDemo");
assert.ok(demos.includes("InvalidFocusedDemo"), "Must include InvalidFocusedDemo (flagship regression)");
assert.ok(demos.includes("DescriptionAndErrorDemo"), "Must include DescriptionAndErrorDemo");
assert.ok(demos.includes("RequiredOptionalDemo"), "Must include RequiredOptionalDemo");
assert.ok(demos.includes("HorizontalFieldDemo"), "Must include HorizontalFieldDemo");
assert.ok(demos.includes("DisabledVsReadOnlyDemo"), "Must include DisabledVsReadOnlyDemo");
assert.ok(demos.includes("ControlVersatilityDemo"), "Must include ControlVersatilityDemo");
console.log("✓ Documentation, preview stage, and demonstrations verified\n");

// 5. Live Server Endpoint Check
console.log("5. Testing live HTTP endpoints on http://localhost:3000...");
const checkEndpoint = (path) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      if (res.statusCode === 200) {
        console.log(`✓ HTTP GET http://localhost:3000${path} -> 200 OK`);
        resolve();
      } else {
        reject(new Error(`Failed ${path}: Status ${res.statusCode}`));
      }
    }).on("error", reject);
  });
};

await checkEndpoint("/components/field");
await checkEndpoint("/r/field.json");

console.log("\n========================================================");
console.log("🎉 ALL FIELD QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
