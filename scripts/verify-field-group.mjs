import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";

console.log("=== HaloUI Field Group Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/field-group.tsx...");
assert.ok(fs.existsSync("components/ui/field-group.tsx"), "components/ui/field-group.tsx must exist");
const fieldGroupSource = fs.readFileSync("components/ui/field-group.tsx", "utf8");
assert.ok(fieldGroupSource.includes("export function FieldGroup"), "Must export FieldGroup");
assert.ok(fieldGroupSource.includes("export interface FieldGroupProps"), "Must export FieldGroupProps");
assert.ok(fieldGroupSource.includes('data-slot="field-group"'), "Must define data-slot='field-group'");
assert.ok(fieldGroupSource.includes("orientation"), "Must support orientation prop");
assert.ok(!fieldGroupSource.includes('"use client"'), "FieldGroup must be Server Component compatible (no 'use client')");
assert.ok(!fieldGroupSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/field-group.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/field-group.json"), "public/r/field-group.json must exist");
const fieldGroupJson = JSON.parse(fs.readFileSync("public/r/field-group.json", "utf8"));
assert.equal(fieldGroupJson.name, "field-group", "Registry item name must be 'field-group'");
assert.ok(fieldGroupJson.files.some(f => f.target === "components/ui/field-group.tsx"), "Must include components/ui/field-group.tsx");
assert.ok(fieldGroupJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "field-group"), "registry.json must list 'field-group'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/field-group"), "Navigation must route to '/components/field-group'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/field-group/page.tsx"), "app/components/field-group/page.tsx must exist");
assert.ok(fs.existsSync("app/components/field-group/layout.tsx"), "app/components/field-group/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/field-group/field-group-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/field-group/field-group-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/field-group/field-group-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/field-group/field-group-demonstrations.tsx", "utf8");
assert.ok(demos.includes("VerticalGroupDemo"), "Must include VerticalGroupDemo");
assert.ok(demos.includes("HorizontalGroupDemo"), "Must include HorizontalGroupDemo");
assert.ok(demos.includes("MiddleFieldInvalidFocusedDemo"), "Must include MiddleFieldInvalidFocusedDemo (flagship regression)");
assert.ok(demos.includes("FieldSetVsFieldGroupDemo"), "Must include FieldSetVsFieldGroupDemo");
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

await checkEndpoint("/components/field-group");
await checkEndpoint("/r/field-group.json");

console.log("\n========================================================");
console.log("🎉 ALL FIELD GROUP QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
