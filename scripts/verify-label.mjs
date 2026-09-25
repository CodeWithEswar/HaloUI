import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Label Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/label.tsx...");
assert.ok(fs.existsSync("components/ui/label.tsx"), "components/ui/label.tsx must exist");
const labelSource = fs.readFileSync("components/ui/label.tsx", "utf8");
assert.ok(labelSource.includes("export function Label"), "Must export Label");
assert.ok(labelSource.includes("export interface LabelProps"), "Must export LabelProps");
assert.ok(labelSource.includes('data-slot="label"'), "Must define data-slot='label'");
assert.ok(!labelSource.includes('"use client"'), "Label must be Server Component compatible (no 'use client')");
assert.ok(!labelSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/label.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/label.json"), "public/r/label.json must exist");
const labelJson = JSON.parse(fs.readFileSync("public/r/label.json", "utf8"));
assert.equal(labelJson.name, "label", "Registry item name must be 'label'");
assert.ok(labelJson.files.some(f => f.target === "components/ui/label.tsx"), "Must include components/ui/label.tsx");
assert.ok(labelJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "label"), "registry.json must list 'label'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/label"), "Navigation must route to '/components/label'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/label/page.tsx"), "app/components/label/page.tsx must exist");
assert.ok(fs.existsSync("app/components/label/layout.tsx"), "app/components/label/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/label/label-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/label/label-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/label/label-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/label/label-demonstrations.tsx", "utf8");
assert.ok(demos.includes("LabelInputAssociationDemo"), "Must include LabelInputAssociationDemo (click regression)");
assert.ok(demos.includes("LabelCheckboxAssociationDemo"), "Must include LabelCheckboxAssociationDemo");
assert.ok(demos.includes("LabelDisabledPeerDemo"), "Must include LabelDisabledPeerDemo");
assert.ok(demos.includes("LabelLongWrappingDemo"), "Must include LabelLongWrappingDemo");
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

await checkEndpoint("/components/label");
await checkEndpoint("/r/label.json");

console.log("\n========================================================");
console.log("🎉 ALL LABEL QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
