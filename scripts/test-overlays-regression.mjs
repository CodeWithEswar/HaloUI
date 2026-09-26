import assert from "node:assert/strict";

console.log("=== HaloUI Overlays & Menus Shared Regression Test ===\n");

const overlayRoutes = [
  { name: "Dialog", path: "http://localhost:3000/components/dialog" },
  { name: "Alert Dialog", path: "http://localhost:3000/components/alert-dialog" },
  { name: "Sheet", path: "http://localhost:3000/components/sheet" },
  { name: "Drawer", path: "http://localhost:3000/components/drawer" },
  { name: "Popover", path: "http://localhost:3000/components/popover" },
  { name: "Hover Card", path: "http://localhost:3000/components/hover-card" },
  { name: "Tooltip", path: "http://localhost:3000/components/tooltip" },
  { name: "Dropdown Menu", path: "http://localhost:3000/components/dropdown-menu" },
  { name: "Context Menu", path: "http://localhost:3000/components/context-menu" },
  { name: "Submenu", path: "http://localhost:3000/components/submenu" },
  { name: "Command Menu", path: "http://localhost:3000/components/command-menu" },
  { name: "Spotlight", path: "http://localhost:3000/components/spotlight" },
  { name: "Lightbox", path: "http://localhost:3000/components/lightbox" },
  { name: "Link Preview", path: "http://localhost:3000/components/link-preview" },
];

for (const { name, path: routeUrl } of overlayRoutes) {
  process.stdout.write(`Validating SSR for ${name} at ${routeUrl}... `);
  const res = await fetch(routeUrl);
  assert.equal(res.status, 200, `Expected 200 OK for ${name}`);
  const html = await res.text();
  assert.ok(html.length > 50000, `Expected full HTML output for ${name}`);
  assert.ok(!html.includes("Application error") && !html.includes("Unhandled Runtime Error"), `Expected no runtime errors for ${name}`);
  console.log(`✓ 200 OK (${html.length} bytes)`);
}

console.log("\n========================================================");
console.log("🎉 ALL OVERLAYS & MENUS REGRESSION CHECKS PASSED!");
console.log("========================================================\n");
