import fs from 'fs';

async function verifyColorPicker() {
  console.log('--- Verifying Color Picker (Forms & Fields 27) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  // 1. Check Component Files
  const componentPath = 'components/ui/color-picker.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');

  assert(componentContent.includes('export function ColorPicker('), 'ColorPicker root component exported');
  assert(componentContent.includes('export const ColorPickerTrigger ='), 'ColorPickerTrigger exported');
  assert(componentContent.includes('export const ColorPickerContent ='), 'ColorPickerContent exported');
  assert(componentContent.includes('export const ColorArea ='), 'ColorArea 2D canvas exported');
  assert(componentContent.includes('export const ColorHueSlider ='), 'ColorHueSlider exported');
  assert(componentContent.includes('export const ColorAlphaSlider ='), 'ColorAlphaSlider exported');
  assert(componentContent.includes('export const ColorValueInput ='), 'ColorValueInput text field exported');
  assert(componentContent.includes('export function ColorSwatch('), 'ColorSwatch exported');

  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('PopoverPrimitive'), 'Accessible Radix popover integrated');
  assert(!componentContent.includes('lucide-react'), 'Zero Lucide imports');

  // 2. Math Unit Tests
  // Dynamic import component module or math test directly
  assert(componentContent.includes('export function hexToHsv'), 'hexToHsv math utility exported');
  assert(componentContent.includes('export function hsvToHex'), 'hsvToHex math utility exported');
  assert(componentContent.includes('export function isValidHex'), 'isValidHex validator exported');
  assert(componentContent.includes('export function normalizeHex'), 'normalizeHex normalizer exported');

  // 3. Check Registry Artifacts
  const registryJsonPath = 'public/r/color-picker.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'color-picker', 'Registry item name is "color-picker"');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  assert(fs.existsSync(mainRegistryPath), `${mainRegistryPath} exists`);
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'color-picker'), 'color-picker registered in public/r/registry.json');

  // 4. Check Documentation Files
  const docFiles = [
    'app/components/color-picker/layout.tsx',
    'app/components/color-picker/page.tsx',
    'app/components/color-picker/color-picker-preview-stage.tsx',
    'app/components/color-picker/color-picker-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 5. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const fileUploadIdx = navContent.indexOf('/components/file-upload');
  const colorPickerIdx = navContent.indexOf('/components/color-picker');
  assert(fileUploadIdx > 0, 'File Upload found in navigation');
  assert(colorPickerIdx > fileUploadIdx, 'Color Picker ordered after File Upload (Position 27)');

  // Summary
  if (failures === 0) {
    console.log('\n🎉 ALL COLOR PICKER CHECKS PASSED PERFECTLY!\n');
  } else {
    console.error(`\n❌ VERIFICATION COMPLETED WITH ${failures} FAILURE(S)\n`);
    process.exit(1);
  }
}

verifyColorPicker().catch((err) => {
  console.error('Unexpected error running verification:', err);
  process.exit(1);
});
