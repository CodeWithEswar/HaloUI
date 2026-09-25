import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Input Group Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/input-group.tsx...");
assert.ok(fs.existsSync("components/ui/input-group.tsx"), "components/ui/input-group.tsx must exist");
const groupSource = fs.readFileSync("components/ui/input-group.tsx", "utf8");
assert.ok(groupSource.includes("export function InputGroup"), "Must export InputGroup");
assert.ok(groupSource.includes("export function InputGroupAddon"), "Must export InputGroupAddon");
assert.ok(groupSource.includes("export function InputGroupInput"), "Must export InputGroupInput");
assert.ok(groupSource.includes("export function InputGroupButton"), "Must export InputGroupButton");
assert.ok(groupSource.includes("export function InputGroupText"), "Must export InputGroupText");
assert.ok(groupSource.includes('data-slot="input-group"'), "Must define data-slot='input-group'");
assert.ok(groupSource.includes('data-slot="input-group-control"'), "Must define data-slot='input-group-control'");
assert.ok(groupSource.includes('from "@/components/ui/input"'), "Must compose canonical Input primitive");
assert.ok(!groupSource.includes('"use client"'), "InputGroup must be Server Component compatible (no 'use client')");
assert.ok(!groupSource.includes("overflow-hidden"), "No overflow-hidden on InputGroup to prevent clipping action rings/tooltips");
assert.ok(!groupSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/input-group.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/input-group.json"), "public/r/input-group.json must exist");
const groupJson = JSON.parse(fs.readFileSync("public/r/input-group.json", "utf8"));
assert.equal(groupJson.name, "input-group", "Registry item name must be 'input-group'");
assert.ok(groupJson.files.some(f => f.target === "components/ui/input-group.tsx"), "Must include components/ui/input-group.tsx");
assert.ok(groupJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "input-group"), "registry.json must list 'input-group'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/input-group"), "Navigation must route to '/components/input-group'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/input-group/page.tsx"), "app/components/input-group/page.tsx must exist");
assert.ok(fs.existsSync("app/components/input-group/layout.tsx"), "app/components/input-group/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/input-group/input-group-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/input-group/input-group-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/input-group/input-group-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/input-group/input-group-demonstrations.tsx", "utf8");
assert.ok(demos.includes("InvalidActionFocusedDemo"), "Must include InvalidActionFocusedDemo (flagship fixture)");
assert.ok(demos.includes("WebsitePrefixDemo"), "Must include WebsitePrefixDemo");
assert.ok(demos.includes("IconSearchDemo"), "Must include IconSearchDemo");
assert.ok(demos.includes("ActionCopyDemo"), "Must include ActionCopyDemo");
assert.ok(demos.includes("PrefixAndSuffixDemo"), "Must include PrefixAndSuffixDemo");

const pageSource = fs.readFileSync("app/components/input-group/page.tsx", "utf8");
assert.ok(pageSource.includes("Single Canonical Control"), "Must include Callout 1 (Zero duplication)");
assert.ok(pageSource.includes("Addons Never Mutate Form Values"), "Must include Callout 2 (Value mutation warning)");
assert.ok(pageSource.includes("Invalid State with Action Focus"), "Must feature flagship regression section");
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

await checkEndpoint("/components/input-group");
await checkEndpoint("/r/input-group.json");

console.log("\n========================================================");
console.log("🎉 ALL INPUT GROUP QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
