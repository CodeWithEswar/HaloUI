import fs from 'fs';

async function testFileInputRegression() {
  console.log('--- Testing File Input Regression Suite (Section 139 & 140) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentPath = 'components/ui/file-input.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentSrc = fs.readFileSync(componentPath, 'utf8');

  // 1. Native File Semantics (Section 77)
  assert(
    componentSrc.includes('type="file"'),
    'Preserves genuine native <input type="file" /> semantics'
  );
  assert(
    !componentSrc.includes('<div role="button" aria-label="file"'),
    'Does not replace native input with fake div picker'
  );

  // 2. Primary Component Export (Section 72)
  assert(
    componentSrc.includes('export const FileInput =') || componentSrc.includes('export function FileInput('),
    'Exports primary FileInput component'
  );

  // 3. Native Attributes Pass-Through (Section 135)
  assert(
    componentSrc.includes('disabled={isDisabled}') &&
    componentSrc.includes('required={isRequired}') &&
    componentSrc.includes('{...props}'),
    'Native attributes (accept, multiple, capture, name, form) forwarded cleanly'
  );

  // 4. Field Integration & Accessibility (Section 98 & 137)
  assert(
    componentSrc.includes('useFieldControlProps'),
    'Integrated with useFieldControlProps for form field coordination'
  );
  assert(
    componentSrc.includes('aria-describedby={fieldProps["aria-describedby"]}'),
    'Connects aria-describedby for field descriptions and errors'
  );
  assert(
    componentSrc.includes('aria-invalid={isInvalid ? "true" : undefined}'),
    'Applies aria-invalid conditionally for accessible error states'
  );

  // 5. Dual Indicator Visibility (Invalid + Focus) (Section 99)
  assert(
    componentSrc.includes('aria-invalid:border-destructive') &&
    componentSrc.includes('focus-visible:border-[var(--halo-focus-color)]') &&
    componentSrc.includes('focus-visible:ring-2'),
    'Double-contrast Halo Focus Ring and invalid border styling coexist'
  );

  // 6. Native File Selector Button Styling (Section 89)
  assert(
    componentSrc.includes('file:mr-') &&
    componentSrc.includes('file:font-medium') &&
    componentSrc.includes('file:cursor-pointer'),
    'Styles ::file-selector-button pseudoelement matching HaloUI Action buttons'
  );

  // 7. Zero Network / Zero Upload SDKs (Section 113 & 123)
  assert(
    !componentSrc.includes('fetch(') &&
    !componentSrc.includes('XMLHttpRequest') &&
    !componentSrc.includes('createObjectURL') &&
    !componentSrc.includes('aws-sdk') &&
    !componentSrc.includes('uploadcare'),
    'Strictly zero networking, zero object URLs, and zero cloud storage dependencies'
  );

  // 8. Zero Lucide Icons
  assert(
    !componentSrc.includes('lucide-react'),
    'Strictly zero Lucide imports'
  );

  // 9. Sizing Variants
  assert(
    componentSrc.includes('size: {') &&
    componentSrc.includes('sm:') &&
    componentSrc.includes('default:') &&
    componentSrc.includes('lg:'),
    'Supports standard sm, default, lg sizing variants'
  );

  // 10. Change Event & onFilesChange Handler (Section 81)
  assert(
    componentSrc.includes('onChange?.(e)') &&
    componentSrc.includes('onFilesChange'),
    'Emits native onChange event and provides optional onFilesChange callback'
  );

  if (failures === 0) {
    console.log('\n🎉 ALL FILE INPUT REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION CHECKS FAILED!\n`);
    process.exit(1);
  }
}

testFileInputRegression();
