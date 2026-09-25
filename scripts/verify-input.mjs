import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Input Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/input.tsx...");
assert.ok(fs.existsSync("components/ui/input.tsx"), "components/ui/input.tsx must exist");
const inputSource = fs.readFileSync("components/ui/input.tsx", "utf8");
assert.ok(inputSource.includes("export function Input"), "Must export Input");
assert.ok(inputSource.includes("export interface InputProps"), "Must export InputProps");
assert.ok(inputSource.includes('data-slot="input"'), "Must define data-slot='input'");
assert.ok(inputSource.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(!inputSource.includes('"use client"'), "Input must be Server Component compatible (no 'use client')");
assert.ok(!inputSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/input.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/input.json"), "public/r/input.json must exist");
const inputJson = JSON.parse(fs.readFileSync("public/r/input.json", "utf8"));
assert.equal(inputJson.name, "input", "Registry item name must be 'input'");
assert.ok(inputJson.files.some(f => f.target === "components/ui/input.tsx"), "Must include components/ui/input.tsx");
assert.ok(inputJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "input"), "registry.json must list 'input'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/input"), "Navigation must route to '/components/input'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/input/page.tsx"), "app/components/input/page.tsx must exist");
assert.ok(fs.existsSync("app/components/input/layout.tsx"), "app/components/input/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/input/input-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/input/input-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/input/input-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/input/input-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryInputFieldDemo"), "Must include PrimaryInputFieldDemo");
assert.ok(demos.includes("InputTypesDemo"), "Must include InputTypesDemo");
assert.ok(demos.includes("InputStatesDemo"), "Must include InputStatesDemo (flagship states)");
assert.ok(demos.includes("ControlledVsUncontrolledDemo"), "Must include ControlledVsUncontrolledDemo");
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

await checkEndpoint("/components/input");
await checkEndpoint("/r/input.json");

console.log("\n========================================================");
console.log("🎉 ALL INPUT QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
