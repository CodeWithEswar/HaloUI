import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Textarea Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/textarea.tsx...");
assert.ok(fs.existsSync("components/ui/textarea.tsx"), "components/ui/textarea.tsx must exist");
const textareaSource = fs.readFileSync("components/ui/textarea.tsx", "utf8");
assert.ok(textareaSource.includes("export function Textarea"), "Must export Textarea");
assert.ok(textareaSource.includes("export interface TextareaProps"), "Must export TextareaProps");
assert.ok(textareaSource.includes('data-slot="textarea"'), "Must define data-slot='textarea'");
assert.ok(textareaSource.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(textareaSource.includes("resize"), "Must support configurable resize");
assert.ok(!textareaSource.includes('"use client"'), "Textarea must be Server Component compatible (no 'use client')");
assert.ok(!textareaSource.includes("field-sizing-content"), "No auto-grow field-sizing-content in base primitive");
assert.ok(!textareaSource.includes("lucide-react"), "No Lucide icons permitted");
console.log("✓ components/ui/textarea.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/textarea.json"), "public/r/textarea.json must exist");
const textareaJson = JSON.parse(fs.readFileSync("public/r/textarea.json", "utf8"));
assert.equal(textareaJson.name, "textarea", "Registry item name must be 'textarea'");
assert.ok(textareaJson.files.some(f => f.target === "components/ui/textarea.tsx"), "Must include components/ui/textarea.tsx");
assert.ok(textareaJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "textarea"), "registry.json must list 'textarea'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/textarea"), "Navigation must route to '/components/textarea'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/textarea/page.tsx"), "app/components/textarea/page.tsx must exist");
assert.ok(fs.existsSync("app/components/textarea/layout.tsx"), "app/components/textarea/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/textarea/textarea-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/textarea/textarea-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/textarea/textarea-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");
assert.ok(!previewStage.includes("StageControlButton"), "No StageControlButton permitted in preview stage");

const demos = fs.readFileSync("app/components/textarea/textarea-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryFeedbackFieldDemo"), "Must include PrimaryFeedbackFieldDemo");
assert.ok(demos.includes("TextareaStatesDemo"), "Must include TextareaStatesDemo");
assert.ok(demos.includes("TextareaResizeDemo"), "Must include TextareaResizeDemo");
assert.ok(demos.includes("TextareaLongContentDemo"), "Must include TextareaLongContentDemo");
assert.ok(demos.includes("TextareaControlledDemo"), "Must include TextareaControlledDemo");

const pageSource = fs.readFileSync("app/components/textarea/page.tsx", "utf8");
assert.ok(pageSource.includes("Textarea is for plain multiline text entry"), "Must include Callout 1");
assert.ok(pageSource.includes("Base Textarea does not auto-grow by default"), "Must include Callout 2");
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

await checkEndpoint("/components/textarea");
await checkEndpoint("/r/textarea.json");

console.log("\n========================================================");
console.log("🎉 ALL TEXTAREA QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
