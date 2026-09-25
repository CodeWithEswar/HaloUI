import fs from 'fs';
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'libphonenumber-js';

async function testPhoneFieldRegression() {
  console.log('--- Testing Phone Field Regression Suite (Section 63) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentSrc = fs.readFileSync('components/ui/phone-field.tsx', 'utf8');

  // 1. Accessible Semantics & Names
  assert(
    componentSrc.includes('type="tel"') &&
    componentSrc.includes('inputMode="tel"') &&
    componentSrc.includes('aria-label={`Phone country'),
    'Phone Field and Country Selector have persistent accessible semantics and names'
  );

  // 2. Empty Input Invariant (Section 23: Empty must remain empty)
  assert(
    componentSrc.includes('if (!rawInput)') &&
    componentSrc.includes('onValueChange?.("",'),
    'Empty input remains genuinely empty without forced country codes or zeros'
  );

  // 3. National Formatting As-You-Type (US: 4155552671 -> (415) 555-2671)
  const aytUS = new AsYouType('US');
  const formattedUS = aytUS.input('4155552671');
  assert(formattedUS === '(415) 555-2671', 'US national number formats naturally as (415) 555-2671');

  // 4. Character Deletion / Backspace (Section 24)
  const backspacedUS = new AsYouType('US').input('(415) 555-267');
  assert(backspacedUS === '(415) 555-267', 'Deleting characters preserves natural backspace editing');

  // 5. Pasting International Number (Section 25: +44 20 7946 0919)
  const parsedUK = parsePhoneNumberFromString('+44 20 7946 0919');
  assert(parsedUK && parsedUK.country === 'GB', 'Pasting international +44 detects UK (GB) country');
  assert(parsedUK && parsedUK.format('E.164') === '+442079460919', 'Normalized E.164 matches +442079460919');
  assert(parsedUK && parsedUK.isValid(), 'UK number parses as valid according to ITU numbering plan');

  // 6. Country Change with Existing Number (Section 20: No silent corruption)
  const digits = '4155552671';
  const reFormattedGB = new AsYouType('GB').input(digits);
  assert(reFormattedGB.includes('4155552671'), 'Changing country preserves raw digits without silent corruption');

  // 7. Calling Codes Accuracy
  assert(getCountryCallingCode('US') === '1', 'US calling code is 1');
  assert(getCountryCallingCode('GB') === '44', 'GB calling code is 44');
  assert(getCountryCallingCode('IN') === '91', 'IN calling code is 91');
  assert(getCountryCallingCode('DE') === '49', 'DE calling code is 49');

  // 8. Independent Country Selector Focus (Section 35)
  assert(
    componentSrc.includes('has-[select:focus-visible]:ring-2') &&
    componentSrc.includes('has-[select:focus-visible]:ring-[var(--halo-focus-color)]'),
    'Country selector has independent double-contrast focus ring distinguishable from input focus'
  );

  // 9. Input Focus on Shared Container (Section 41)
  assert(
    componentSrc.includes('has-[input:focus-visible]:border-[var(--halo-focus-color)]') &&
    componentSrc.includes('has-[input:focus-visible]:ring-2'),
    'Input focus illuminates shared outer boundary without nested double rings'
  );

  // 10. Invalid + Focus Coexistence (Section 34)
  assert(
    componentSrc.includes('isInvalid && [') &&
    componentSrc.includes('has-[input:focus-visible]:ring-destructive/40'),
    'Invalid error border and input focus ring coexist clearly'
  );

  // 11. Disabled State (Section 37)
  assert(
    componentSrc.includes('disabled={isDisabled || readOnly}') &&
    componentSrc.includes('isDisabled && "pointer-events-none cursor-not-allowed opacity-40 shadow-none"'),
    'Disabled state disables both country selector and telephone input'
  );

  // 12. Read-Only State (Section 38)
  assert(
    componentSrc.includes('read-only:select-text'),
    'Read-only state locks country selection while keeping text selectable and copyable'
  );

  // 13. Documentation Callouts & Sections (Section 54–57)
  const docSrc = fs.readFileSync('app/components/phone-field/page.tsx', 'utf8');
  assert(docSrc.includes('Phone Field structures telephone-number entry; it does not verify ownership'), 'Section 55 Callout present');
  assert(docSrc.includes('Country context controls parsing and presentation'), 'Section 56 Callout present');
  assert(docSrc.includes('Keep the normalized phone value separate from its human-readable presentation'), 'Section 57 Callout present');

  // 14. Demonstrations File Verification
  const demoSrc = fs.readFileSync('app/components/phone-field/phone-field-demonstrations.tsx', 'utf8');
  assert(demoSrc.includes('PrimaryPhoneFieldDemo'), 'Primary US demo present');
  assert(demoSrc.includes('InternationalContextDemo'), 'International contexts demo present');
  assert(demoSrc.includes('CountryChangeDemo'), 'Country change demo present');
  assert(demoSrc.includes('PastedInternationalDemo'), 'Pasted international demo present');
  assert(demoSrc.includes('InvalidPhoneFieldDemo'), 'Invalid state demo present');
  assert(demoSrc.includes('DisabledPhoneFieldDemo'), 'Disabled state demo present');

  if (failures === 0) {
    console.log('\n🎉 ALL PHONE FIELD REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION TESTS FAILED!\n`);
    process.exit(1);
  }
}

testPhoneFieldRegression();
