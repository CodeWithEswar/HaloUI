import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 09: Avatar Group Verification Suite ===\n");

// 1. Primitive Source Verification
const source = fs.readFileSync("components/ui/avatar-group.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!source.includes('"use client"'), "components/ui/avatar-group.tsx must NOT contain 'use client'");
assert.ok(!source.includes("'use client'"), "components/ui/avatar-group.tsx must NOT contain 'use client'");
assert.ok(!source.includes("useState"), "components/ui/avatar-group.tsx must NOT use useState");
assert.ok(!source.includes("useEffect"), "components/ui/avatar-group.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Canonical Avatar Dependency & Direction
assert.ok(source.includes('from "@/components/ui/avatar"'), "Must import Avatar types from @/components/ui/avatar");
console.log("✓ Canonical Avatar reuse verified (dependency direction: AvatarGroup -> Avatar)");

// Check Exported Types & Functions
assert.ok(source.includes("export function AvatarGroup"), "Must export AvatarGroup");
assert.ok(source.includes("export function AvatarGroupCount"), "Must export AvatarGroupCount");
assert.ok(source.includes("export type AvatarGroupStacking"), "Must export AvatarGroupStacking");
assert.ok(source.includes("export interface AvatarGroupProps"), "Must export AvatarGroupProps");
assert.ok(source.includes("export interface AvatarGroupCountProps"), "Must export AvatarGroupCountProps");
console.log("✓ AvatarGroup exports and types verified");

// Check Overlap & RTL Support
assert.ok(source.includes("rtl:space-x-reverse"), "Must support RTL space-x-reverse logical spacing");
assert.ok(source.includes("-space-x-1.5"), "Must support sm overlap spacing");
assert.ok(source.includes("-space-x-2"), "Must support default overlap spacing");
assert.ok(source.includes("-space-x-2.5"), "Must support lg overlap spacing");
assert.ok(source.includes("-space-x-3"), "Must support xl overlap spacing");
console.log("✓ Tokenized overlap geometry and RTL logical spacing verified");

// Check Visual Separation & Unclipped Focus Elevation
assert.ok(source.includes("ring-background"), "Must apply ring-background separation knockouts");
assert.ok(source.includes("focus-within:z-20") || source.includes("focus-visible:z-20"), "Must elevate focused avatar to prevent clipping Halo focus rings");
console.log("✓ Separation ring tokens and unclipped focus elevation verified");

// Check Truncation & Overflow Logic
assert.ok(source.includes("max"), "Must support max visible truncation prop");
assert.ok(source.includes("totalCount"), "Must support totalCount pool calculation");
assert.ok(source.includes("aria-hidden=\"true\""), "AvatarGroupCount must be marked aria-hidden='true'");
console.log("✓ Truncation, overflow count computation, and accessible metadata verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/avatar-group/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/avatar-group/avatar-group-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/avatar-group/avatar-group-preview-stage.tsx", "utf-8");

// Strict diagram ban checks
const allDocs = docPage + docDemo + docPreview;
assert.ok(!allDocs.includes('language="text"'), "Prohibited text code blocks must NOT be present in docs");
assert.ok(!allDocs.includes("┌──"), "ASCII box-drawing characters must NOT be present in docs");
assert.ok(!allDocs.includes("├──"), "Unicode tree characters must NOT be present in docs");
assert.ok(!allDocs.includes("└──"), "Unicode tree characters must NOT be present in docs");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// Check Hugeicons in docs
assert.ok(!allDocs.includes("lucide-react"), "Must NOT use lucide-react in docs");
assert.ok(allDocs.includes("@hugeicons/core-free-icons"), "Must use @hugeicons/core-free-icons in docs");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 3. Registry JSON Verification
const registryItem = JSON.parse(fs.readFileSync("public/r/avatar-group.json", "utf-8"));
assert.equal(registryItem.name, "avatar-group");
assert.ok(registryItem.registryDependencies.includes("avatar"), "Must declare registry dependency on 'avatar'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/avatar-group.tsx"), "Must include avatar-group.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "avatar-group");
assert.ok(foundInRegistry, "avatar-group must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL AVATAR GROUP VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
