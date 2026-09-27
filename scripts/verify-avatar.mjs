import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 08: Avatar Verification Suite ===\n");

// 1. Primitive Source Verification
const avatarSource = fs.readFileSync("components/ui/avatar.tsx", "utf-8");

// Check Exports & Compound Primitives
assert.ok(avatarSource.includes("export function Avatar") || avatarSource.includes("Avatar,"), "Must export Avatar");
assert.ok(avatarSource.includes("AvatarImage"), "Must export AvatarImage");
assert.ok(avatarSource.includes("AvatarFallback"), "Must export AvatarFallback");
assert.ok(avatarSource.includes("AvatarBadge"), "Must export AvatarBadge");
assert.ok(avatarSource.includes("AvatarGroup"), "Must export AvatarGroup");
assert.ok(avatarSource.includes("AvatarGroupCount"), "Must export AvatarGroupCount");
assert.ok(avatarSource.includes("export type AvatarSize"), "Must export AvatarSize");
assert.ok(avatarSource.includes("export type AvatarStatus"), "Must export AvatarStatus");
console.log("✓ Avatar primitives and compound exports verified");

// Check Sizing scales
const sizes = ["sm", "default", "lg", "xl"];
for (const s of sizes) {
  assert.ok(avatarSource.includes(`size === "${s}"`), `Must support size '${s}'`);
}
console.log("✓ All 4 sizing scales (sm, default, lg, xl) verified");

// Check Media Fidelity & Optical Edge (no blur or filter over image)
assert.ok(!avatarSource.includes("backdrop-blur-") || !avatarSource.includes("AvatarImage"), "Never place backdrop blur directly over AvatarImage");
assert.ok(avatarSource.includes("ring-1 ring-black/10 dark:ring-white/15"), "Outer perimeter must include hairline optical refraction ring");
console.log("✓ Photographic media fidelity and circular optical rim verified");

// Check Presence Status Presets on AvatarBadge
const statuses = ["online", "away", "busy", "offline"];
for (const st of statuses) {
  assert.ok(avatarSource.includes(`status === "${st}"`), `AvatarBadge must support status '${st}'`);
}
console.log("✓ Presence status presets (online, away, busy, offline) verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/avatar/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/avatar/avatar-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/avatar/avatar-preview-stage.tsx", "utf-8");

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
const registryItem = JSON.parse(fs.readFileSync("public/r/avatar.json", "utf-8"));
assert.equal(registryItem.name, "avatar");
assert.ok(registryItem.dependencies.includes("@base-ui/react"), "Must declare dependency on '@base-ui/react'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/avatar.tsx"), "Must include avatar.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "avatar");
assert.ok(foundInRegistry, "avatar must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL AVATAR VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
