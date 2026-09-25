import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Range Slider Quality Gate Verification ===\n");

// 1. Component Implementation Check
console.log("1. Checking components/ui/range-slider.tsx...");
assert.ok(fs.existsSync("components/ui/range-slider.tsx"), "components/ui/range-slider.tsx must exist");
const source = fs.readFileSync("components/ui/range-slider.tsx", "utf8");
assert.ok(source.includes("SliderPrimitive.Root") || source.includes("@base-ui/react/slider"), "Must compose Base UI SliderPrimitive");
assert.ok(source.includes("export const RangeSlider") || source.includes("function RangeSlider"), "Must declare RangeSlider");
assert.ok(source.includes('data-slot="range-slider"'), "Must define data-slot='range-slider'");
assert.ok(source.includes('data-slot="range-slider-track"'), "Must define data-slot='range-slider-track'");
assert.ok(source.includes('data-slot="range-slider-range"'), "Must define data-slot='range-slider-range'");
assert.ok(source.includes('data-slot="range-slider-thumb-min"'), "Must define lower thumb slot");
assert.ok(source.includes('data-slot="range-slider-thumb-max"'), "Must define upper thumb slot");
assert.ok(source.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(source.includes("useFieldControlProps"), "Must integrate with Field via useFieldControlProps");
assert.ok(source.includes("thumbCollisionBehavior"), "Must support thumb collision configuration");
assert.ok(!source.includes("lucide-react"), "No Lucide icons permitted in HaloUI components");
console.log("✓ components/ui/range-slider.tsx verified cleanly\n");

// 2. Registry Artifacts Check
console.log("2. Checking registry artifacts...");
assert.ok(fs.existsSync("public/r/range-slider.json"), "public/r/range-slider.json must exist");
const itemJson = JSON.parse(fs.readFileSync("public/r/range-slider.json", "utf8"));
assert.equal(itemJson.name, "range-slider", "Registry item name must be 'range-slider'");
assert.ok(itemJson.files.some(f => f.target === "components/ui/range-slider.tsx"), "Must include components/ui/range-slider.tsx");
assert.ok(itemJson.files.some(f => f.target === "styles/halo-tokens.css"), "Must include styles/halo-tokens.css");

const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
assert.ok(registryJson.items.some(i => i.name === "range-slider"), "registry.json must list 'range-slider'");
console.log("✓ Registry artifacts verified\n");

// 3. Navigation Integration Check
console.log("3. Checking navigation integration...");
const navSource = fs.readFileSync("lib/docs/navigation.ts", "utf8");
assert.ok(navSource.includes("Forms & Fields"), "Navigation must include 'Forms & Fields'");
assert.ok(navSource.includes("/components/range-slider"), "Navigation must route to '/components/range-slider'");
console.log("✓ Navigation integration verified\n");

// 4. Documentation & Preview Stage
console.log("4. Checking documentation, previews, and demonstrations...");
assert.ok(fs.existsSync("app/components/range-slider/page.tsx"), "app/components/range-slider/page.tsx must exist");
assert.ok(fs.existsSync("app/components/range-slider/layout.tsx"), "app/components/range-slider/layout.tsx must exist");
assert.ok(fs.existsSync("app/components/range-slider/range-slider-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/range-slider/range-slider-demonstrations.tsx"), "Demonstrations must exist");

const previewStage = fs.readFileSync("app/components/range-slider/range-slider-preview-stage.tsx", "utf8");
assert.ok(previewStage.includes("StageControlSelect"), "Preview stage must use StageControlSelect");
assert.ok(previewStage.includes("telemetry"), "Preview stage must include telemetry");

const demos = fs.readFileSync("app/components/range-slider/range-slider-demonstrations.tsx", "utf8");
assert.ok(demos.includes("PrimaryRangeSliderDemo"), "Must include PrimaryRangeSliderDemo");
assert.ok(demos.includes("AgeIntervalDemo"), "Must include AgeIntervalDemo");
assert.ok(demos.includes("NarrowAndOverlappingDemo"), "Must include NarrowAndOverlappingDemo");
assert.ok(demos.includes("CollisionModesDemo"), "Must include CollisionModesDemo");
assert.ok(demos.includes("DisabledRangeSliderDemo"), "Must include DisabledRangeSliderDemo");

const pageSource = fs.readFileSync("app/components/range-slider/page.tsx", "utf8");
assert.ok(pageSource.includes("Range Slider selects an interval"), "Must include Callout 1");
assert.ok(pageSource.includes("Range Slider vs Two Number Inputs"), "Must include Callout 2");
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

await checkEndpoint("/components/range-slider");
await checkEndpoint("/r/range-slider.json");

// 6. Clean Install Verification
console.log("6. Verifying clean install registry contract...");
assert.equal(itemJson.type, "registry:ui");
assert.ok(itemJson.dependencies.includes("@base-ui/react"), "Must require @base-ui/react dependency");
assert.ok(itemJson.registryDependencies.includes("field"), "Must declare field registry dependency");
console.log("✓ Clean installation contract verified\n");

console.log("========================================================");
console.log("🎉 ALL RANGE SLIDER QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");
