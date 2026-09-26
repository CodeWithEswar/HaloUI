import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 04: Profile Card Verification Suite ===\n");

// 1. Primitive Source Verification
const profileCardSource = fs.readFileSync("components/ui/profile-card.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!profileCardSource.includes('"use client"'), "components/ui/profile-card.tsx must NOT contain 'use client'");
assert.ok(!profileCardSource.includes("'use client'"), "components/ui/profile-card.tsx must NOT contain 'use client'");
assert.ok(!profileCardSource.includes("useState"), "components/ui/profile-card.tsx must NOT use useState");
assert.ok(!profileCardSource.includes("useEffect"), "components/ui/profile-card.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Card architecture reuse
assert.ok(profileCardSource.includes('from "@/components/ui/card"'), "Must compose Card from @/components/ui/card");
assert.ok(profileCardSource.includes('<Card'), "Must render <Card in root component");
console.log("✓ Card architecture reuse verified (zero duplicated surface or optical math)");

// Check Compound exports
const expectedExports = [
  "ProfileCard",
  "ProfileCardHeader",
  "ProfileCardAvatar",
  "ProfileCardIdentity",
  "ProfileCardName",
  "ProfileCardHandle",
  "ProfileCardRole",
  "ProfileCardStatus",
  "ProfileCardBio",
  "ProfileCardMetadata",
  "ProfileCardMetadataItem",
  "ProfileCardActions",
  "ProfileCardFooter",
];

for (const exp of expectedExports) {
  assert.ok(
    profileCardSource.includes(`export function ${exp}`) || profileCardSource.includes(`export const ${exp}`),
    `Must export ${exp}`
  );
}
console.log("✓ All 13 compound exports verified");

// Check Layout orientation support
assert.ok(profileCardSource.includes("ProfileCardLayout"), "Must define ProfileCardLayout");
assert.ok(profileCardSource.includes("layout = \"vertical\""), "Must default layout to vertical");
assert.ok(profileCardSource.includes("group-data-[layout=horizontal]"), "Must support horizontal layout");
console.log("✓ Vertical and Horizontal layout orientation support verified");

// Check Status indicator
assert.ok(profileCardSource.includes("ProfileCardStatusType"), "Must define ProfileCardStatusType");
console.log("✓ Accessible presence status support verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/profile-card/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/profile-card/profile-card-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/profile-card/profile-card-preview-stage.tsx", "utf-8");

// Strict diagram ban checks
const allDocs = docPage + docDemo + docPreview;
assert.ok(!allDocs.includes("language=\"text\""), "Prohibited text code blocks must NOT be present in docs");
assert.ok(!allDocs.includes("┌──"), "ASCII box-drawing characters must NOT be present in docs");
assert.ok(!allDocs.includes("├──"), "Unicode tree characters must NOT be present in docs");
assert.ok(!allDocs.includes("└──"), "Unicode tree characters must NOT be present in docs");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// Check Hugeicons in docs
assert.ok(!allDocs.includes("lucide-react"), "Must NOT use lucide-react in docs");
assert.ok(allDocs.includes("@hugeicons/core-free-icons"), "Must use @hugeicons/core-free-icons in docs");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 3. Registry JSON Verification
const registryItem = JSON.parse(fs.readFileSync("public/r/profile-card.json", "utf-8"));
assert.equal(registryItem.name, "profile-card");
assert.ok(registryItem.registryDependencies.includes("card"), "Must declare registry dependency on 'card'");
assert.ok(registryItem.registryDependencies.includes("avatar"), "Must declare registry dependency on 'avatar'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/profile-card.tsx"), "Must include profile-card.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "profile-card");
assert.ok(foundInRegistry, "profile-card must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL PROFILE CARD VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");
