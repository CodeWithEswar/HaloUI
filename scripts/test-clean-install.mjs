import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

console.log("=== HaloUI Clean Consumer Installation Test ===\n");

const itemsToTest = ["button", "icon-button", "button-group", "split-button", "toggle", "toggle-group", "floating-action-button", "copy-button", "favorite-button", "segmented-control", "action-bar", "field", "field-group", "label", "input", "input-group", "textarea", "native-select", "select", "combobox", "multi-select", "checkbox", "checkbox-group", "radio-group", "switch", "slider", "range-slider", "input-otp", "number-field", "currency-field", "phone-field", "url-field", "tag-input", "file-input", "file-upload", "color-picker", "rating-input", "date-picker", "date-range-picker", "time-picker", "date-time-picker", "calendar", "form-message", "tabs", "breadcrumb", "pagination", "navigation-menu", "menubar", "sidebar", "sidebar-rail", "dock", "bottom-navigation", "stepper", "command-palette", "tree-navigation", "link-preview", "kbd", "dialog", "alert-dialog", "sheet", "drawer", "popover", "hover-card", "tooltip", "dropdown-menu", "context-menu", "submenu", "command-menu", "spotlight", "lightbox"];

for (const slug of itemsToTest) {
  const registryUrl = `http://localhost:3000/r/${slug}.json`;
  console.log(`Testing registry installation for '${slug}' from ${registryUrl}...`);
  const res = await fetch(registryUrl);
  assert.equal(res.status, 200, `Registry item '${slug}' must respond with 200 OK`);

  const registryData = await res.json();
  assert.equal(registryData.name, slug);
  assert.ok(registryData.files && registryData.files.length >= 2, "Must contain at least 2 files");

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `haloui-${slug}-`));
  try {
    for (const file of registryData.files) {
      const targetPath = path.join(tempDir, file.target);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });

      let content = file.content;
      if (!content) {
        content = fs.readFileSync(path.resolve(file.path), "utf-8");
      }
      fs.writeFileSync(targetPath, content, "utf-8");
    }

    const componentPath = path.join(tempDir, `components/ui/${slug}.tsx`);
    assert.ok(fs.existsSync(componentPath), `${componentPath} must exist after install`);
    console.log(`✓ Installed and verified ${slug}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

console.log("\n========================================================");
console.log("🎉 ALL CLEAN INSTALLATION CHECKS PASSED!");
console.log("========================================================\n");
